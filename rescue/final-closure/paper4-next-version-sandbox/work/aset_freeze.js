'use strict';
/* PHASE 0 + PHASE 1
 * (0) freeze the 60 random + 9 canonical E, hash them, recompute |Aset(E)|.
 * (1) derive the constraint system on A for fixed E and VALIDATE the derivation
 *     against the raw predicate isCompatible().
 *
 * DERIVATION (see report section 2). With
 *     p(i) = Parikh of E[0..i)          i in [0,40]
 *     x(j) = Parikh of A[0..j)          j in [0,40],  x(0)=0, x(40)=(15,14,11)
 * and n = 40+m, the condition  P(n) - 2P(n-k) + P(n-2k) != 0  splits by where
 * the two earlier cutpoints fall:
 *
 *   TERNARY  (2k <= m)      x(m) - 2x(m-k) + x(m-2k) != 0
 *                           -- pure A condition, INDEPENDENT of E
 *   BINARY   (m < 2k, k<=m) x(m) - 2x(m-k) != p(40) - p(40+m-2k)
 *                           -- support depends on (m,k); target depends on E
 *   UNARY    (k > m)        x(m) != 2p(40+m-k) - p(40+m-2k) - p(40)
 *                           -- support is x(m) alone; target determined by E
 *
 * with k ranging over 2 <= k <= min(40, floor((40+m)/2)).
 */
const fs = require('fs'), D = require('./aset_defs.js');
const { LE, LA, KMAX, PROF_A, parikhPrefix, isCompatible, sha } = D;

const eq0 = v => v[0] === 0 && v[1] === 0 && v[2] === 0;
const sub = (u, w) => [u[0] - w[0], u[1] - w[1], u[2] - w[2]];

/* ---- the derived constraint system, built from E alone ------------------ */
function constraints(E) {
  const p = parikhPrefix(E);
  const ternary = [], binary = [], unary = [];
  for (let m = 1; m <= LA; m++) {
    const n = LE + m, kmax = Math.min(KMAX, n >> 1);
    for (let k = 2; k <= kmax; k++) {
      if (2 * k <= m) {
        ternary.push({ m, k });                                   // E-independent
      } else if (k <= m) {
        const j = LE + m - 2 * k;                                 // 0 <= j < 40
        binary.push({ m, k, target: sub(p[LE], p[j]) });           // x(m)-2x(m-k) != target
      } else {
        const j1 = LE + m - k, j2 = LE + m - 2 * k;
        if (j2 < 0) continue;                                      // excluded by k <= n/2
        unary.push({ m, k, target: sub(sub([2 * p[j1][0], 2 * p[j1][1], 2 * p[j1][2]], p[j2]), p[LE]) });
      }
    }
  }
  return { p, ternary, binary, unary };
}
/* evaluate the derived system on a concrete A */
function derivedCompatible(C, A) {
  const x = parikhPrefix(A);
  for (const t of C.ternary) {
    const v = [x[t.m][0] - 2 * x[t.m - t.k][0] + x[t.m - 2 * t.k][0],
               x[t.m][1] - 2 * x[t.m - t.k][1] + x[t.m - 2 * t.k][1],
               x[t.m][2] - 2 * x[t.m - t.k][2] + x[t.m - 2 * t.k][2]];
    if (eq0(v)) return false;
  }
  for (const b of C.binary) {
    const v = [x[b.m][0] - 2 * x[b.m - b.k][0], x[b.m][1] - 2 * x[b.m - b.k][1], x[b.m][2] - 2 * x[b.m - b.k][2]];
    if (v[0] === b.target[0] && v[1] === b.target[1] && v[2] === b.target[2]) return false;
  }
  for (const u of C.unary) {
    if (x[u.m][0] === u.target[0] && x[u.m][1] === u.target[1] && x[u.m][2] === u.target[2]) return false;
  }
  return true;
}
/* ---- populations -------------------------------------------------------- */
const Rs = D.popR(), Hs = D.pools.E.slice();
const t0 = Date.now();
const rows = [];
for (const [pop, list] of [['R', Rs], ['H', Hs]]) {
  for (let i = 0; i < list.length; i++) {
    const E = list[i];
    rows.push({ population: pop, eIndex: i, E, E_sha256: sha(E),
      profile: [(E.match(/a/g) || []).length, (E.match(/b/g) || []).length, (E.match(/c/g) || []).length],
      asetSize: D.asetCount(E) });
  }
}
console.log('|Aset| recomputed for ' + rows.length + ' E in ' + ((Date.now() - t0) / 1000).toFixed(1) + 's');
const zeroR = rows.filter(r => r.population === 'R' && r.asetSize === 0).length;
const zeroH = rows.filter(r => r.population === 'H' && r.asetSize === 0).length;
console.log('R zero: ' + zeroR + '/60   H zero: ' + zeroH + '/9');
const profOK = rows.every(r => r.profile[0] === 13 && r.profile[1] === 16 && r.profile[2] === 11);
console.log('all E have profile (13,16,11): ' + profOK);

/* ---- VALIDATION: derived system == raw predicate ------------------------ */
let seed = 424242;
const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
function randA() {
  const w = []; for (let c = 0; c < 3; c++) for (let i = 0; i < PROF_A[c]; i++) w.push('abc'[c]);
  for (let i = w.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = w[i]; w[i] = w[j]; w[j] = t; }
  return w.join('');
}
let checked = 0, mismatch = [];
for (const r of rows) {
  const C = constraints(r.E);
  for (let t = 0; t < 200; t++) {
    const A = randA();
    const a = isCompatible(r.E, A), b = derivedCompatible(C, A);
    checked++;
    if (a !== b && mismatch.length < 5) mismatch.push({ pop: r.population, eIndex: r.eIndex, A, raw: a, derived: b });
    if (a !== b) break;
  }
}
console.log('derivation validation: ' + checked + ' random A tested, mismatches: ' + mismatch.length);
if (mismatch.length) { console.log(JSON.stringify(mismatch, null, 1)); process.exit(2); }

/* also validate on the DFS witnesses themselves (all must be compatible) */
let wMismatch = 0, witnesses = 0;
for (const r of rows) {
  if (!r.asetSize) continue;
  const A = D.firstWitness(r.E); r.firstWitness = A; r.firstWitness_sha256 = A ? sha(A) : null;
  witnesses++;
  const C = constraints(r.E);
  if (!isCompatible(r.E, A) || !derivedCompatible(C, A)) wMismatch++;
}
console.log('first witnesses: ' + witnesses + ', failing either check: ' + wMismatch);
if (wMismatch) process.exit(2);

/* constraint-count profile (identical for every E: support geometry is fixed) */
const c0 = constraints(rows[0].E);
const counts = rows.map(r => { const c = constraints(r.E); return c.ternary.length + '|' + c.binary.length + '|' + c.unary.length; });
console.log('constraint counts ternary|binary|unary = ' + counts[0] +
  '   identical across all 69 E: ' + counts.every(x => x === counts[0]));

fs.writeFileSync('../runs/aset_E_frozen.json', JSON.stringify({
  definition: 'A in Aset(E) iff |A|=40, Psi(A)=(15,14,11), and for all n in [41,80], k in [2,min(40,floor(n/2))]: P(n)-2P(n-k)+P(n-2k) != 0 for W=E.A',
  validation: { randomA_tested: checked, mismatches: 0, firstWitnessesChecked: witnesses,
    constraintCounts: { ternary: c0.ternary.length, binary: c0.binary.length, unary: c0.unary.length },
    constraintCountsIdenticalAcrossE: counts.every(x => x === counts[0]) },
  zeroCounts: { R: zeroR, H: zeroH }, rows
}, null, 1));
console.log('persisted -> runs/aset_E_frozen.json');
