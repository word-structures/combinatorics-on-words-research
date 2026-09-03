'use strict';
/* PHASE 2b / 4A -- EFFECTIVE unary constraints and the cutset certificate.
 *
 * Write sigma_r = Psi(last r letters of E)  (sigma_0 = 0, sigma_40 = Psi(E)).
 * Three families of constraints act on a SINGLE prefix state x(m):
 *
 *  (U1) genuine unary, k > m :
 *          x(m) != sigma_{2k-m} - 2 sigma_{k-m}
 *       for m < k <= min(40, floor((40+m)/2)).
 *
 *  (U2) binary with k = m, i.e. x(m-k) = x(0) = 0 :
 *          x(m) != sigma_m                       for 2 <= m <= 40.
 *       "A's first m letters must not match E's last m letters in Parikh."
 *
 *  (U3) binary at m = 40, where x(40) = (15,14,11) is KNOWN :
 *          x(40-k) != ( (15,14,11) - sigma_{2k-40} ) / 2      for 21 <= k <= 40,
 *       i.e. a forbidden value for the state at depth 40-k in [0,19]
 *       (only when the division is exact and the result is a legal state).
 *
 * Let S_m be the states allowed by the A-profile alone. Then
 *      S_m  subset of  U*_m(E)   for some m   ==>   Aset(E) = empty
 * is an exact CUTSET certificate depending on E alone.
 */
const fs = require('fs'), D = require('./aset_defs.js');
const { LE, LA, KMAX, PROF_A, parikhPrefix } = D;
const key = v => v[0] + ',' + v[1] + ',' + v[2];

function sigmas(E) {                     // sigma_r for r = 0..40
  const p = parikhPrefix(E), P = p[LE], out = [];
  for (let r = 0; r <= LE; r++) out.push([P[0] - p[LE - r][0], P[1] - p[LE - r][1], P[2] - p[LE - r][2]]);
  return out;
}
function Sm(m) {
  const out = [];
  for (let a = Math.max(0, m - PROF_A[1] - PROF_A[2]); a <= Math.min(PROF_A[0], m); a++)
    for (let b = Math.max(0, m - a - PROF_A[2]); b <= Math.min(PROF_A[1], m - a); b++) {
      const c = m - a - b; if (c >= 0 && c <= PROF_A[2]) out.push([a, b, c]);
    }
  return out;
}
/* effective unary forbidden sets, per depth, with provenance */
function effectiveUnary(E) {
  const s = sigmas(E), U = new Map();
  const add = (m, t, src) => {
    if (!U.has(m)) U.set(m, new Map());
    const k = key(t);
    if (!U.get(m).has(k)) U.get(m).set(k, []);
    U.get(m).get(k).push(src);
  };
  for (let m = 1; m <= LA; m++) {
    const n = LE + m, kmax = Math.min(KMAX, n >> 1);
    for (let k = m + 1; k <= kmax; k++) {                                   // U1
      const t = [s[2 * k - m][0] - 2 * s[k - m][0], s[2 * k - m][1] - 2 * s[k - m][1], s[2 * k - m][2] - 2 * s[k - m][2]];
      add(m, t, 'U1:k=' + k);
    }
    if (m >= 2 && m <= kmax) add(m, s[m], 'U2:k=' + m);                     // U2
  }
  for (let k = 21; k <= 40; k++) {                                          // U3
    const m = LA - k, r = 2 * k - LA;
    const t = [PROF_A[0] - s[r][0], PROF_A[1] - s[r][1], PROF_A[2] - s[r][2]];
    if (t[0] % 2 || t[1] % 2 || t[2] % 2) continue;
    const h = [t[0] / 2, t[1] / 2, t[2] / 2];
    if (h[0] < 0 || h[1] < 0 || h[2] < 0) continue;
    if (h[0] + h[1] + h[2] !== m) continue;
    add(m, h, 'U3:k=' + k);
  }
  return U;
}
const frozen = JSON.parse(fs.readFileSync('../runs/aset_E_frozen.json', 'utf8'));
const out = [];
for (const r of frozen.rows) {
  const U = effectiveUnary(r.E);
  let cut = null;
  for (let m = 1; m <= LA; m++) {
    const S = Sm(m), mm = U.get(m) || new Map();
    const surv = S.filter(x => !mm.has(key(x)));
    if (surv.length === 0) {
      cut = { depth: m, statesAtDepth: S.length,
        cover: S.map(x => ({ state: key(x), witnesses: mm.get(key(x)) })) };
      break;
    }
  }
  out.push({ population: r.population, eIndex: r.eIndex, E_sha256: r.E_sha256,
    asetSize: r.asetSize, cutDepth: cut ? cut.depth : null, certificate: cut });
}
const zeros = out.filter(r => r.asetSize === 0), pos = out.filter(r => r.asetSize > 0);
const certified = zeros.filter(r => r.cutDepth !== null);
const falsePos = pos.filter(r => r.cutDepth !== null);
console.log('=== effective-unary cutset certificate ===');
console.log('zero-Aset E certified : ' + certified.length + ' / ' + zeros.length);
const h = {}; for (const r of certified) h[r.cutDepth] = (h[r.cutDepth] || 0) + 1;
console.log('  cut-depth histogram : ' + JSON.stringify(h));
console.log('positive-Aset E wrongly certified (must be 0): ' + falsePos.length);
console.log('still uncertified zeros: ' + (zeros.length - certified.length) +
  '  eIndices: ' + JSON.stringify(zeros.filter(r => r.cutDepth === null).map(r => r.eIndex)));
/* how close do the uncertified ones get? minimum surviving states over depths */
for (const r of zeros.filter(x => x.cutDepth === null)) {
  const U = effectiveUnary(frozen.rows.find(f => f.population === r.population && f.eIndex === r.eIndex).E);
  let best = { m: null, surv: 1e9 };
  for (let m = 1; m <= LA; m++) {
    const S = Sm(m), mm = U.get(m) || new Map();
    const n = S.filter(x => !mm.has(key(x))).length;
    if (n < best.surv) best = { m, surv: n, total: S.length };
  }
  r.minSurviving = best;
}
console.log('uncertified zeros, min surviving states per depth:');
for (const r of zeros.filter(x => x.cutDepth === null))
  console.log('  e=' + r.eIndex + '  depth ' + r.minSurviving.m + ': ' + r.minSurviving.surv + '/' + r.minSurviving.total + ' survive');
fs.writeFileSync('../runs/aset_effective_unary.json', JSON.stringify({ rows: out }, null, 1));
console.log('persisted -> runs/aset_effective_unary.json');
