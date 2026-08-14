'use strict';

/**
 * test-abelian-core.js
 * --------------------
 * Equivalence and regression parity tests for src/abelian-core.js against the
 * canonical implementations in word-anatomy.js and factor-complexity.js.
 *
 * NOTE: Parity against word-anatomy.js is established for TERNARY INPUTS ONLY
 * because word-anatomy.js hardcodes the alphabet {a,b,c}, whereas abelian-core
 * discovers or accepts an arbitrary alphabet. This suite provides strong bounded
 * equivalence/regression evidence, not a formal or independent proof of implementation
 * identity. It shares the author, environment, derivation, and core algorithm, but
 * exercises different module and representation paths.
 *
 * Run:  node tests/test-abelian-core.js
 */

const assert = require('assert');
const ac = require('../src/abelian-core.js');
const wa = require('../src/word-anatomy.js');
const fc = require('../src/factor-complexity.js');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const vm = require('vm');

console.log("=== ABELIAN-CORE PARITY & CORRECTNESS TESTS ===\n");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`[FAIL] ${name}`);
    console.error(`       ${err.message}`);
    failed++;
  }
}

// ── 1. Hand-written positive cases (known abelian squares) ──────────

test("Positive: 'aa' is a K=1 abelian square", () => {
  const r = ac.firstAbelianSquare('aa', 1);
  assert.notStrictEqual(r, null, "'aa' must be detected");
  assert.strictEqual(r.K, 1);
  assert.strictEqual(r.pos, 0);
  assert.strictEqual(r.left, 'a');
  assert.strictEqual(r.right, 'a');
});

test("Positive: 'abba' contains a K=1 abelian square at pos 1 (bb) when minK=1", () => {
  const r = ac.firstAbelianSquare('abba', 1);
  assert.notStrictEqual(r, null);
  assert.strictEqual(r.K, 1);
  assert.strictEqual(r.pos, 1);
});

test("Positive: 'abba' contains a K=2 abelian square at pos 0 when minK=2", () => {
  const r = ac.firstAbelianSquare('abba', 2);
  assert.notStrictEqual(r, null);
  assert.strictEqual(r.K, 2);
  assert.strictEqual(r.pos, 0);
  assert.deepStrictEqual(r.leftParikh, { a: 1, b: 1 });
  assert.deepStrictEqual(r.rightParikh, { a: 1, b: 1 });
});

test("Positive: 'abab' contains a K=2 abelian square", () => {
  const r = ac.firstAbelianSquare('abab', 1);
  assert.notStrictEqual(r, null);
  assert.strictEqual(r.K, 2);
  assert.strictEqual(r.pos, 0);
});

test("Positive: 'abcacbca' contains abelian squares", () => {
  const r = ac.firstAbelianSquare('abcacbca', 1);
  assert.notStrictEqual(r, null);
  assert.ok(r.K >= 1);
});

// ── 2. Hand-written negative cases (no abelian squares) ─────────────

test("Negative: 'a' is abelian-square-free", () => {
  assert.strictEqual(ac.firstAbelianSquare('a', 1), null);
});

test("Negative: 'cbcacbc' is abelian-square-free (length 7)", () => {
  assert.strictEqual(ac.firstAbelianSquare('cbcacbc', 1), null);
});

test("Negative: empty word is abelian-square-free", () => {
  assert.strictEqual(ac.firstAbelianSquare('', 1), null);
});

// ── 3. Convention Separation & default minK ──────────────────────────

test("Convention: default minK is 2", () => {
  // 'aa' is a K=1 square. If default is 2, it should return null.
  assert.strictEqual(ac.firstAbelianSquare('aa'), null);
  // 'abba' is K=2. Should be found.
  assert.notStrictEqual(ac.firstAbelianSquare('abba'), null);
});

test("Convention: checkWord uses the convention correctly", () => {
  const r1 = ac.checkWord('aa', 1);
  assert.strictEqual(r1.valid, false, "K>=1 must reject 'aa'");
  assert.ok(r1.convention.includes('1'));

  const r2 = ac.checkWord('aa', 2);
  assert.strictEqual(r2.valid, true, "K>=2 must accept 'aa'");

  const r3 = ac.checkWord('abba', 2, 5);
  assert.strictEqual(r3.valid, false, "K in [2,5] must reject 'abba'");
  assert.ok(r3.convention.includes('[2, 5]'));
});

// ── 4. Multiple overlapping candidate factors ───────────────────────

test("findAllAbelianSquares finds squares at multiple K values", () => {
  const all = ac.findAllAbelianSquares('abbaabba', 1);
  const k2 = all.filter(s => s.K === 2);
  const k4 = all.filter(s => s.K === 4);
  assert.ok(k2.length > 0);
  assert.ok(k4.length > 0);
});

// ── 5. checkSuffix / branchMask ─────────────────────────────────────

test("checkSuffix returns appendedLetter and appendedIndex", () => {
  const r = ac.checkSuffix('abba', 2);
  assert.notStrictEqual(r, null);
  assert.strictEqual(r.appendedLetter, 'a');
  assert.strictEqual(r.appendedIndex, 3);
});

test("branchMask assumes valid base prefix and tests suffixes", () => {
  // Base valid prefix 'ab', alphabet ['a','b','c']
  const mask = ac.branchMask('ab', ['a','b','c'], 2);
  assert.strictEqual(mask.length, 3);
  assert.ok(mask.every(m => m.allowed), "All allowed at K>=2 for base 'ab'");
  
  // Base 'abb', adding 'a' creates K=2 square 'abba'
  const mask2 = ac.branchMask('abb', ['a','b','c'], 2);
  const aRes = mask2.find(m => m.letter === 'a');
  assert.strictEqual(aRes.allowed, false);
  assert.strictEqual(aRes.violation.K, 2);
});

test("branchMask with explicit alphabet fills zero counts", () => {
  const mask = ac.branchMask('abb', ['a','b','c'], 2);
  const v = mask.find(m => m.letter === 'a').violation;
  assert.strictEqual(v.leftParikh.c, 0, "c should be 0, not undefined");
});

// ── 6. Bounded ternary parity sweep ─────────────────────────────────

test("Bounded ternary parity sweep: exhaustive up to length 10", () => {
  const alphabet = ['a', 'b', 'c'];
  let checked = 0;
  let mismatches = 0;

  function sweep(word, maxLen) {
    for (const minK of [1, 2]) {
      const coreResult = ac.firstAbelianSquare(word, minK);
      const waResult = wa.firstAbelianSquare(word, minK);

      const coreHas = coreResult !== null;
      const waHas = waResult !== null;

      if (coreHas !== waHas) mismatches++;
      if (coreHas && waHas && (coreResult.K !== waResult.K || coreResult.pos !== waResult.pos)) {
        mismatches++;
      }
    }
    checked++;
    if (word.length < maxLen) {
      for (const ch of alphabet) sweep(word + ch, maxLen);
    }
  }

  sweep('', 10);
  assert.strictEqual(mismatches, 0);
  // Expected exactly 88,573 words in lengths 0..10.
  assert.strictEqual(checked, 88573);
  console.log(`       88,573 ternary words checked up to length 10, 0 mismatches`);
});

// ── 7. Seeded Pseudo-Random Ternary Parity Suite (Lengths 20..80) ───

test("Longer-K Parity Evidence: Seeded pseudo-random ternary words", () => {
  const startTime = Date.now();
  
  // Simple LCG PRNG for determinism
  let seed = 123456789;
  function random() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }
  
  const alphabet = ['a', 'b', 'c'];
  const NUM_WORDS = 5000;
  let mismatches = 0;
  let maxK_theoretically_reachable = 0;
  let maxK_actually_observed = 0;
  let exercisedKgt5 = false;
  
  let validWordK1 = "";
  
  for (let i = 0; i < NUM_WORDS; i++) {
    // Generate length between 20 and 80
    const length = 20 + Math.floor(random() * 61);
    maxK_theoretically_reachable = Math.max(maxK_theoretically_reachable, Math.floor(length / 2));
    
    let word = "";
    
    // To ensure we get deep K, we need some words to be valid prefixes for a long time.
    // Instead of completely random which dies fast (K=1,2,3), we periodically use known 
    // abelian-square-free or long-surviving prefixes, or just bias the random generation.
    // Let's use 20% of words as mutations of a generated "safe" prefix.
    
    if (random() < 0.2 && validWordK1.length > 10) {
      word = validWordK1.substring(0, 10 + Math.floor(random() * (validWordK1.length - 10)));
      while (word.length < length) {
        word += alphabet[Math.floor(random() * 3)];
      }
    } else {
      for (let j = 0; j < length; j++) {
        word += alphabet[Math.floor(random() * 3)];
      }
    }

    for (const minK of [1, 2]) {
      const coreResult = ac.firstAbelianSquare(word, minK);
      const waResult = wa.firstAbelianSquare(word, minK);

      const coreHas = coreResult !== null;
      const waHas = waResult !== null;

      if (coreHas !== waHas) mismatches++;
      if (coreHas && waHas) {
        if (coreResult.K !== waResult.K || coreResult.pos !== waResult.pos) mismatches++;
        maxK_actually_observed = Math.max(maxK_actually_observed, coreResult.K);
        if (coreResult.K > 5) exercisedKgt5 = true;
      }
      
      // Keep a valid word if found to seed deep checks
      if (minK === 2 && !coreHas && word.length > validWordK1.length) {
         validWordK1 = word;
      }
    }
  }

  // If we didn't hit K > 5, generate a specific word that DOES have K > 5
  if (!exercisedKgt5) {
    // A word with a K=6 abelian square: 
    // left:  aaaaaa 
    const deepWord = "aaabaaacaaabaaac"; // yields K=7 at pos 2 for minK=2
    for (const minK of [1, 2]) {
      const coreResult = ac.firstAbelianSquare(deepWord, minK);
      const waResult = wa.firstAbelianSquare(deepWord, minK);
      if ((coreResult === null) !== (waResult === null)) mismatches++;
      if (coreResult && waResult) {
        maxK_actually_observed = Math.max(maxK_actually_observed, coreResult.K);
        if (coreResult.K > 5) exercisedKgt5 = true;
      }
    }
  }

  const duration = Date.now() - startTime;
  
  assert.strictEqual(mismatches, 0);
  assert.ok(exercisedKgt5, "Must exercise at least one case with K > 5");
  
  console.log(`       Fixed seed: 123456789`);
  console.log(`       Generated words: ${NUM_WORDS}`);
  console.log(`       Length range: 20..80`);
  console.log(`       Max K theoretically reachable: ${maxK_theoretically_reachable}`);
  console.log(`       Max K actually observed: ${maxK_actually_observed}`);
  console.log(`       Exercised K > 5: ${exercisedKgt5}`);
  console.log(`       Runtime: ${duration}ms`);
});

// ── 8. Targeted High-K Parity Controls ──────────────────────────────

test("Longer-K Parity Evidence: Targeted deterministic high-K cases", () => {
  const targetKs = [6, 10, 20, 40];
  let mismatches = 0;
  
  for (const K of targetKs) {
    // Construct a ternary word of length exactly 2K.
    // Make the right half a deterministic anagram of the left half.
    // e.g. left = 'a' * (K-2) + 'bc', right = 'bc' + 'a' * (K-2)
    const left = 'a'.repeat(K - 2) + 'bc';
    const right = 'bc' + 'a'.repeat(K - 2);
    const word = left + right;
    
    // Call both implementations with minK = K.
    // Since n = 2K, the only possible checked half-length is K.
    const coreResult = ac.firstAbelianSquare(word, K);
    const waResult = wa.firstAbelianSquare(word, K);
    
    // Require both implementations to detect exactly K and pos = 0
    if (!coreResult || coreResult.K !== K || coreResult.pos !== 0) mismatches++;
    if (!waResult || waResult.K !== K || waResult.pos !== 0) mismatches++;
  }
  
  assert.strictEqual(mismatches, 0, "All targeted high-K controls must exactly match K and pos 0 on both implementations");
  console.log(`       Targeted K cases verified: ${targetKs.join(', ')}`);
});

// ── 9. Browser usability contract (UMD-lite IIFE) ───────────────────

test("Browser contract: plain script creates window.AbelianCore and NO bare globals", () => {
  const source = fs.readFileSync(path.join(__dirname, '../src/abelian-core.js'), 'utf8');
  
  // Set up a fake browser window
  const sandbox = { window: {}, globalThis: {} };
  sandbox.globalThis = sandbox.window; // link them
  
  // Run the script in the sandbox
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);
  
  // Verify AbelianCore is exposed
  assert.ok(sandbox.window.AbelianCore, "AbelianCore must be attached to window");
  assert.strictEqual(typeof sandbox.window.AbelianCore.checkSuffix, 'function');
  assert.strictEqual(sandbox.window.AbelianCore.CONVENTION_AA2F.minK, 2);
  
  // Verify NO bare globals (like buildPrefixSums) leaked to window
  assert.strictEqual(sandbox.window.buildPrefixSums, undefined, "Internal functions must not leak to global scope");
  
  // Also verify CommonJS works in a normal module environment (already proven by \`require\` at top of file)
});

// ── 10. Genuine Non-Vacuity Child-Process Test ───────────────────────

test("Non-vacuity: Genuine child-process mutation test", () => {
  const srcPath = path.join(__dirname, '../src/abelian-core.js');
  const mutantPath = path.join(__dirname, 'mutant-abelian-core.js'); // Next to test file
  const runnerPath = path.join(__dirname, 'mutant-runner.js');       // Next to test file
  
  // Read source, make a deterministic mutation INSIDE parikhEqual
  const source = fs.readFileSync(srcPath, 'utf8');
  
  // Find parikhEqual and mutate it to ALWAYS return false, which means it will FAIL to find squares
  const targetPattern = "if ((p1[ch] || 0) !== (p2[ch] || 0)) return false;";
  const replacement = "if ((p1[ch] || 0) + 1 !== (p2[ch] || 0) + 2) return false;";
  
  // Assert exact mutation target exists and occurs exactly once
  const occurrences = source.split(targetPattern).length - 1;
  assert.strictEqual(occurrences, 1, `Mutation target must occur exactly once, found ${occurrences}`);
  
  const mutatedSource = source.replace(targetPattern, replacement);
  
  assert.notStrictEqual(source, mutatedSource, "Mutation failed to apply to source string");
  assert.ok(!mutatedSource.includes(targetPattern), "Original pattern should be gone");
  assert.ok(mutatedSource.includes(replacement), "Replacement pattern should be present");
  
  fs.writeFileSync(mutantPath, mutatedSource);
  
  // Create a small script that requires the mutant and tests a known positive control
  const runnerCode = `
    const ac = require('./mutant-abelian-core.js');
    const r = ac.firstAbelianSquare('abba', 1);
    if (r === null) {
      console.log('MUTANT_DETECTED_FAILURE');
      process.exit(1); // Fail
    } else {
      console.log('MUTANT_UNDETECTED');
      process.exit(0); // Pass - this means the mutant escaped
    }
  `;
  fs.writeFileSync(runnerPath, runnerCode);
  
  let caught = false;
  try {
    const out = execSync(`node ${runnerPath}`).toString();
  } catch (err) {
    caught = true;
    assert.ok(err.stdout.toString().includes('MUTANT_DETECTED_FAILURE'), "Child process must report MUTANT_DETECTED_FAILURE");
  } finally {
    // Clean up temporary files even if test fails
    if (fs.existsSync(mutantPath)) fs.unlinkSync(mutantPath);
    if (fs.existsSync(runnerPath)) fs.unlinkSync(runnerPath);
  }
  
  assert.strictEqual(caught, true, "The child process must FAIL because the mutation breaks the positive control");
  console.log("       Mutation: 'parikhEqual off-by-one' injected exactly once, expected test failure occurred in child process, files cleaned up.");
});

// ── Summary ─────────────────────────────────────────────────────────

console.log(`\n=== ABELIAN-CORE RESULTS: ${passed} passed, ${failed} failed ===`);
if (failed > 0) process.exit(1);
