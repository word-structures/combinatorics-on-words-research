'use strict';
/**
 * Gate 0 replay wrapper — Paper 4 structure discovery.
 *
 * WHY THIS FILE EXISTS
 * The three producer scripts in `as-found/` are preserved byte-identically as
 * historical evidence. They hard-code absolute paths from the machine that
 * originally ran them (`C:/abc-worktrees/.../scratch/...`), so from a fresh
 * clone they cannot run. Editing them to fix that would alter evidence.
 *
 * This wrapper instead rewrites those path literals **in memory only**,
 * executes each stage against the canonical input in `inputs/`, writes into a
 * scratch directory, and compares the regenerated outputs with the as-found
 * ones. Nothing under `as-found/` is ever modified or overwritten.
 *
 * WHAT A PASS MEANS
 * Packaging integrity: the preserved producers, run on the preserved input,
 * still reproduce the preserved outputs. That is all. It is NOT new scientific
 * evidence, and it does not re-derive or re-validate the Paper 4 theorem — see
 * `papers/paper4/reproducibility/README.md`, "Scientific Scope".
 *
 * Usage:  node replay_gate0.js
 * Exit:   0 = all three stages reproduce byte-identical outputs.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');

const HERE = __dirname;
const ASFOUND = path.join(HERE, 'as-found');
const INPUTS = path.join(HERE, 'inputs');

// The absolute prefix baked into the preserved scripts.
const OLD_SCRATCH = 'C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch';

const STAGES = [
  // Stage 1's as-found output is KNOWN STALE — see README.md, "Stage 1 discrepancy".
  // It holds 66 blocks; the canonical input yields 42, and those 42 are exactly the
  // alphabet embedded in the as-found transition_dag.json. So stage 1 is checked
  // against the DAG's alphabet (the value actually consumed downstream), not against
  // the stale file.
  { script: 'find_macro_alphabet.js',       output: 'macro_alphabet.json',        compare: 'chain' },
  { script: 'extract_transition_dag.js',    output: 'transition_dag.json',        compare: 'bytes' },
  { script: 'compile_to_paper4_algebra.js', output: 'paper4_compiled_system.json', compare: 'bytes' },
];

const sha256 = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');

const work = fs.mkdtempSync(path.join(os.tmpdir(), 'p4-gate0-'));
const sd = path.join(work, 'structure-discovery-2026-08-29');
const rh = path.join(work, 'paper4-to-recordhunt-transfer-2026-08-29');
fs.mkdirSync(sd, { recursive: true });
fs.mkdirSync(rh, { recursive: true });
fs.copyFileSync(path.join(INPUTS, 'test_word_400.txt'), path.join(rh, 'test_word_400.txt'));

let failures = 0;
console.log('Paper 4 — Gate 0 replay (packaging check, not new evidence)');
console.log('scratch: ' + work + '\n');

for (const { script, output, compare } of STAGES) {
  const src = fs.readFileSync(path.join(ASFOUND, script), 'utf8');
  // In-memory only: repoint the baked-in scratch prefix at the temp tree.
  const patched = src.split(OLD_SCRATCH).join(work.split(path.sep).join('/'));
  try {
    vm.runInNewContext(
      patched,
      { require, module: { exports: {} }, exports: {}, console, process, __dirname: sd, __filename: path.join(sd, script), Buffer },
      { filename: script }
    );
  } catch (err) {
    console.log('  FAIL  ' + script + ' — ' + err.message);
    failures++;
    continue;
  }
  const produced = path.join(sd, output);
  const expected = path.join(ASFOUND, output);
  if (!fs.existsSync(produced)) {
    console.log('  FAIL  ' + script + ' — did not produce ' + output);
    failures++;
    continue;
  }
  if (compare === 'chain') {
    // Compare against what the next stage actually consumed.
    const gen = JSON.parse(fs.readFileSync(produced, 'utf8')).alphabet;
    const dag = JSON.parse(fs.readFileSync(path.join(ASFOUND, 'transition_dag.json'), 'utf8')).alphabet;
    const G = new Set(gen), D = new Set(dag);
    const same = G.size === D.size && [...G].every(x => D.has(x));
    const stale = JSON.parse(fs.readFileSync(expected, 'utf8')).alphabet.length;
    // The promoted active Stage-1 artifact must also match byte-for-byte.
    const active = path.join(HERE, 'replayed', 'macro_alphabet.json');
    const activeOk = fs.existsSync(active) && sha256(active) === sha256(produced);
    if (!activeOk) {
      console.log('  FAIL  ' + script + ' — replayed/macro_alphabet.json does not match this run');
      failures++;
      continue;
    }
    if (same) {
      console.log('  OK    ' + script.padEnd(28) + '-> ' + G.size + ' blocks == transition_dag.json alphabet');
      console.log('        replayed/macro_alphabet.json reproduced byte-identically (authoritative Stage 1)');
      console.log('        (as-found macro_alphabet.json holds ' + stale + ' blocks and is NOT authoritative — see README)');
    } else {
      console.log('  FAIL  ' + script + ' — replayed alphabet does not match the DAG alphabet');
      failures++;
    }
    continue;
  }
  const a = sha256(produced), b = sha256(expected);
  if (a === b) {
    console.log('  OK    ' + script.padEnd(28) + '-> ' + output + '  ' + a.slice(0, 16) + '…');
  } else {
    console.log('  FAIL  ' + script + ' — ' + output + ' differs');
    console.log('        produced ' + a);
    console.log('        as-found ' + b);
    failures++;
  }
}

console.log('\n' + (failures === 0
  ? 'GATE 0 REPLAY OK — stages 2 and 3 byte-identical; stage 1 reproduces the alphabet the DAG actually consumed (its as-found file is separately recorded as stale).'
  : 'GATE 0 REPLAY FAILED — ' + failures + ' stage(s).'));
process.exit(failures === 0 ? 0 : 1);
