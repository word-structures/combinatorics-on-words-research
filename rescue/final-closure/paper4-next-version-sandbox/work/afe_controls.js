'use strict';
/* PHASE 2 -- pre-run controls. Must pass before the 263 run.
 * C4 is decisive: on a pair with AFE_EXISTS=true but AF_AND_AFE_EXISTS=false,
 * the secondary route must return SAT. If it returns UNSAT there, it is
 * silently computing the joint gate and the whole cross-check is void. */
const fs = require('fs');
const X = require('./afe_only_crosscheck.js');
const G = require('./gate.js');
const jl = p => fs.readFileSync(p, 'utf8').split(/\r?\n/).filter(x => x).map(JSON.parse);
const pools = JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json', 'utf8'));
const posH = jl('../runs/afexBIG_H/af_positive.jsonl');
const hM = JSON.parse(fs.readFileSync('../runs/h_matched_quota.json', 'utf8'));
const bcd = jl('../runs/bcdBIG_H/pairs.jsonl');
const CAP = 2e9;

/* A words keyed exactly as stage_bcd.js keyed them */
const Amap = new Map(posH.map(p => [G.sha(p.A).slice(0, 16), p.A]));
const bcdBy = new Map(); for (const b of bcd) bcdBy.set(b.eIndex + '|' + b.A_sha, b);

/* the frozen 263, with primary AFE + joint verdicts attached */
const pairs = [];
for (const row of hM.perE) for (const h of row.hits) {
  const b = bcdBy.get(row.eIndex + '|' + h.A_sha);
  if (!b) { console.log('FAIL-CLOSED: no bcd row for ' + row.eIndex + '|' + h.A_sha); process.exit(2); }
  const A = Amap.get(h.A_sha);
  if (!A) { console.log('FAIL-CLOSED: no A word for ' + h.A_sha); process.exit(2); }
  pairs.push({ eIndex: row.eIndex, E_sha: row.E_sha, A_sha: h.A_sha, rank: h.rank,
    A, E: pools.E[row.eIndex], primaryAFE: b.AFE_EXISTS, joint: b.AF_AND_AFE_EXISTS, P40: b.P40 });
}
console.log('population: ' + pairs.length + ' pairs, primary AFE positive = ' +
  pairs.filter(p => p.primaryAFE).length + ', joint positive = ' + pairs.filter(p => p.joint).length);

function pick(pred, n) { return pairs.filter(pred).slice(0, n); }
const controls = [
  ...pick(p => p.primaryAFE === true && p.joint === true, 3).map(c => ({ ...c, id: 'C1_AFEpos_jointpos' })),
  ...pick(p => p.primaryAFE === false, 3).map(c => ({ ...c, id: 'C2_AFEneg' })),
  ...pick(p => p.primaryAFE === true && p.joint === false, 3).map(c => ({ ...c, id: 'C4_AFEpos_jointNEG' }))
];
console.log('\n=== controls ===');
const out = [];
let fail = 0, deadSeen = 0;
for (const c of controls) {
  const comp = X.compileAFE(c.A, c.E);
  if (comp.deadAFE) deadSeen++;
  const r = X.afeOnlySolve(comp, CAP);
  let lit = null;
  if (r.sat) {
    const prof = X.profileOf(r.witness);
    const lc = X.literalAFEclean(c.A, r.witness, c.E);
    lit = { profileOK: prof[0] === 19 && prof[1] === 11 && prof[2] === 10, clean: lc.clean, detail: lc };
  }
  const match = (r.capped ? null : r.sat) === c.primaryAFE;
  if (!match || (r.sat && (!lit.profileOK || !lit.clean))) fail++;
  out.push({ id: c.id, eIndex: c.eIndex, A_sha: c.A_sha, primaryAFE: c.primaryAFE,
    joint: c.joint, secondaryAFE: r.capped ? 'CAPPED' : r.sat, match, nodes: r.nodes,
    arity0Windows: comp.arity0, deadAFE: comp.deadAFE, literal: lit });
  console.log('  ' + c.id.padEnd(20) + ' e=' + c.eIndex + ' A=' + c.A_sha +
    '  primaryAFE=' + String(c.primaryAFE).padEnd(5) + ' joint=' + String(c.joint).padEnd(5) +
    ' secondaryAFE=' + String(r.capped ? 'CAPPED' : r.sat).padEnd(5) +
    ' match=' + match + ' nodes=' + r.nodes +
    (lit ? ' literal{profile:' + lit.profileOK + ',clean:' + lit.clean + '}' : ''));
}
const c4 = out.filter(o => o.id === 'C4_AFEpos_jointNEG');
console.log('\n=== C4 verdict (AFE-only vs joint separation) ===');
console.log('  C4 controls: ' + c4.length);
console.log('  all C4 secondary = SAT while joint = false: ' +
  (c4.length > 0 && c4.every(o => o.secondaryAFE === true && o.joint === false)));
if (!(c4.length > 0 && c4.every(o => o.secondaryAFE === true && o.joint === false))) {
  console.log('  *** STOP: the secondary route did not distinguish AFE-only from the joint gate ***');
  fail++;
}
console.log('\ncontrol failures: ' + fail + '   (arity-0 windows per instance: ' +
  (out[0] ? out[0].arity0Windows : '?') + ', deadAFE instances seen: ' + deadSeen + ')');
fs.writeFileSync('../runs/afe_controls.json', JSON.stringify({ controls: out, failures: fail }, null, 1));
if (fail) process.exit(3);
console.log('CONTROLS PASSED -- cleared to run the 263.');
