'use strict';
/* PHASE 0 -- freeze the exact E populations and the Aset predicate.
 *
 * MATHEMATICAL DEFINITION (derived from stage_bcd.js Aset(), NOT copied from it)
 * ---------------------------------------------------------------------------
 * Let E, A be words of length 40 over {a,b,c} with
 *     Psi(E) = (13,16,11)   [PROFILE.e]
 *     Psi(A) = (15,14,11)   [PROFILE.a]
 * Let W = E.A (length 80) and let P(n) = Parikh vector of W[0..n).
 *
 *     A in Aset(E)
 *   iff
 *     for every n in [41,80] and every k with 2 <= k <= min(40, floor(n/2)):
 *         P(n) - 2 P(n-k) + P(n-2k) != 0.
 *
 * i.e. E.A carries no abelian square of half-period k in [2,40] ENDING at any
 * position n in [41,80]. Positions n <= 40 are NOT re-checked (E is fixed and
 * was itself generated under a different, weaker bound km=20).
 *
 * This module exposes that predicate directly, plus an independent counter, so
 * that the enumeration algorithm and the compatibility condition stay separate.
 */
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const G = require('./gate.js'), R = require('./rng.js');
const pools = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'canonical_pools.json'), 'utf8'));
const POOLE = new Set(pools.E);

const LE = 40, LA = 40, KMAX = 40, KMAX_E = 20;
const PROF_E = G.PROFILE.e, PROF_A = G.PROFILE.a;

function parikhPrefix(w) {
  const q = [[0, 0, 0]];
  for (let i = 0; i < w.length; i++) { const p = q[i].slice(); p[w.charCodeAt(i) - 97]++; q.push(p); }
  return q;
}
/* the predicate, written straight from the definition (no DFS, no pruning) */
function isCompatible(E, A) {
  const P = parikhPrefix(E + A);
  for (let n = LE + 1; n <= LE + LA; n++) {
    const kmax = Math.min(KMAX, n >> 1);
    for (let k = 2; k <= kmax; k++) {
      const a = n - 2 * k, b = n - k;
      if (P[n][0] - 2 * P[b][0] + P[a][0] === 0 &&
          P[n][1] - 2 * P[b][1] + P[a][1] === 0 &&
          P[n][2] - 2 * P[b][2] + P[a][2] === 0) return false;
    }
  }
  return true;
}
/* independent brute-force counter over ALL profile-correct A (no pruning at all).
   Only usable for validation on tiny scales -- included to keep the algorithm
   honest, never used as the production counter. */
function asetCountBrute(E, limit) {
  let n = 0, seen = 0;
  const w = new Uint8Array(LA), need = PROF_A.slice();
  (function rec(m) {
    if (limit && seen > limit) return;
    if (m === LA) { seen++; if (isCompatible(E, Array.from(w).map(v => 'abc'[v]).join(''))) n++; return; }
    for (let c = 0; c < 3; c++) { if (!need[c]) continue; w[m] = c; need[c]--; rec(m + 1); need[c]++; }
  })(0);
  return n;
}
/* production counter: same DFS as stage_bcd.js Aset(), counting only */
function endClean(q, n, km) {
  const k2 = Math.min(km, n >> 1);
  for (let k = 2; k <= k2; k++) { const a = n - 2 * k, b = n - k;
    if (q[0][b] - q[0][a] === q[0][n] - q[0][b] && q[1][b] - q[1][a] === q[1][n] - q[1][b] &&
        q[2][b] - q[2][a] === q[2][n] - q[2][b]) return false; }
  return true;
}
function asetCount(E) {
  const q = [new Int32Array(81), new Int32Array(81), new Int32Array(81)];
  for (let i = 0; i < LE; i++) { for (let t = 0; t < 3; t++) q[t][i + 1] = q[t][i]; q[E.charCodeAt(i) - 97][i + 1]++; }
  const need = PROF_A.slice(); let n = 0;
  (function rec(m) { if (m === LA) { n++; return; }
    for (let c = 0; c < 3; c++) { if (!need[c]) continue; const pos = LE + m, nn = pos + 1;
      for (let t = 0; t < 3; t++) q[t][nn] = q[t][pos]; q[c][nn]++;
      if (endClean(q, nn, KMAX)) { need[c]--; rec(m + 1); need[c]++; } } })(0);
  return n;
}
/* first witness in the deterministic DFS order, or null */
function firstWitness(E) {
  const q = [new Int32Array(81), new Int32Array(81), new Int32Array(81)];
  for (let i = 0; i < LE; i++) { for (let t = 0; t < 3; t++) q[t][i + 1] = q[t][i]; q[E.charCodeAt(i) - 97][i + 1]++; }
  const need = PROF_A.slice(), w = new Uint8Array(LA); let found = null;
  (function rec(m) { if (found) return;
    if (m === LA) { found = Array.from(w).map(v => 'abc'[v]).join(''); return; }
    for (let c = 0; c < 3; c++) { if (!need[c]) continue; const pos = LE + m, nn = pos + 1;
      for (let t = 0; t < 3; t++) q[t][nn] = q[t][pos]; q[c][nn]++;
      if (endClean(q, nn, KMAX)) { w[m] = c; need[c]--; rec(m + 1); need[c]++; }
      if (found) return; } })(0);
  return found;
}
/* the frozen populations */
function popR() {
  const out = []; const rnd = R.mk(7788);
  const gen = () => { const need = PROF_E.slice(), w = new Uint8Array(LE);
    const q = [new Int32Array(41), new Int32Array(41), new Int32Array(41)]; let nodes = 0;
    function rec(m) { if (++nodes > 2e6) return false; if (m === LE) return true;
      const o = [0, 1, 2]; for (let i = 2; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = o[i]; o[i] = o[j]; o[j] = t; }
      for (const c of o) { if (!need[c]) continue; for (let t = 0; t < 3; t++) q[t][m + 1] = q[t][m]; q[c][m + 1]++;
        if (endClean(q, m + 1, KMAX_E)) { w[m] = c; need[c]--; if (rec(m + 1)) return true; need[c]++; } } return false; }
    return rec(0) ? Array.from(w).map(x => 'abc'[x]).join('') : null; };
  while (out.length < 60) { const E = gen(); if (!E || POOLE.has(E)) continue; out.push(E); }
  return out;
}
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
module.exports = { LE, LA, KMAX, KMAX_E, PROF_E, PROF_A, parikhPrefix, isCompatible,
  asetCount, asetCountBrute, firstWitness, popR, endClean, sha, pools };
