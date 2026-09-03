'use strict';
/* Does the motif family F(tau,L) stabilise in the leading gap g1?
 * tau = (g1, delta, chi0, chi1, chi2), g2 = g1 + delta, delta in {-1,0,1}.
 * If F is constant for g1 >= 2, the canonical catalogue is FINITE:
 *   g1 in {0,1,>=2} x delta in {-1,0,1} x chi in {0,1}^3.  */
const G = require('./geom_core.js');
const KMIN = 2;
function fam(g1, delta, c0, c1, c2, L) {
  const g2 = g1 + delta;
  if (g2 < 0) return null;
  const S = new Set();
  for (let i0 = 0; i0 < L; i0++) for (let i1 = 0; i1 < L; i1++) {
    const i2 = 2 * i1 - i0 - delta * L;
    if (i2 < 0 || i2 >= L) continue;
    const K = g1 * L + i1 - i0;
    if (K < KMIN) continue;
    if ((g2 * L + i2 - i1) !== K) continue;
    const acc = new Map();
    if (c0 && i0 !== 0) G.bump(acc, i0, 1);
    if (c1 && i1 !== 0) G.bump(acc, i1, -2);
    if (c2 && i2 !== 0) G.bump(acc, i2, 1);
    S.add(G.fmt(acc));
  }
  return S;
}
const out = { stabilises: true, firstStableG1: null, rows: [], distinctFamilies: {} };
let bad = [];
for (const L of [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20, 40]) {
  for (const delta of [-1, 0, 1])
    for (let p = 0; p < 8; p++) {
      const c0 = (p >> 2) & 1, c1 = (p >> 1) & 1, c2 = p & 1;
      const ref = fam(2, delta, c0, c1, c2, L);
      if (!ref) continue;
      for (let g1 = 3; g1 <= 8; g1++) {
        const f = fam(g1, delta, c0, c1, c2, L);
        if (!G.eqSet(ref, f)) bad.push({ L, delta, chi: [c0, c1, c2], g1, refSize: ref.size, size: f.size });
      }
    }
}
out.stabilises = bad.length === 0;
out.g1_ge2_all_equal = { checked: 'L in {3..12,15,20,40}, g1 = 3..8 vs g1 = 2', failures: bad.length, sample: bad.slice(0, 4) };
console.log('F(tau,L) constant for g1 >= 2: ' + (bad.length === 0 ? 'YES' : 'NO ' + JSON.stringify(bad.slice(0, 3))));

/* size of the finite catalogue and how many types are genuinely distinct */
for (const L of [8, 10, 40]) {
  const seen = new Map(); let types = 0;
  for (const g1 of [0, 1, 2]) for (const delta of [-1, 0, 1]) for (let p = 0; p < 8; p++) {
    const c0 = (p >> 2) & 1, c1 = (p >> 1) & 1, c2 = p & 1;
    const f = fam(g1, delta, c0, c1, c2, L);
    if (!f) continue;
    types++;
    const key = [...f].sort().join('|');
    if (!seen.has(key)) seen.set(key, { g1, delta, chi: [c0, c1, c2], size: f.size, count: 0 });
    seen.get(key).count++;
  }
  out.distinctFamilies['L' + L] = { typeSlots: types, distinctFamilies: seen.size,
    nonEmpty: [...seen.values()].filter(v => !(v.size === 1)).length,
    rows: [...seen.values()].sort((a, b) => b.size - a.size).slice(0, 12) };
  console.log('L=' + L + ': ' + types + ' type slots -> ' + seen.size + ' distinct signature families');
}
require('fs').writeFileSync(__dirname + '/../motif_finite_results.json', JSON.stringify(out, null, 1));
