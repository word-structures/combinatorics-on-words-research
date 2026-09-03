'use strict';
/* ============================================================================
 * CLEAN-ROOM occurrence-geometry core  (Report 9)
 *
 * Written from the definitions only. Shares no code with
 *   verify_occurrence_geometry_v02.py   (not read before this file was written)
 * and no code with the earlier cleanroom_faf_afe.js beyond the shared
 * mathematical definition of a signature.
 *
 * MODEL
 *   Output word = N macro blocks, each of length L.
 *   B subset of {0..N-1} = macro positions carrying the UNRESOLVED role X.
 *   All other blocks are assigned: their Parikh data is constant and
 *   contributes only to the affine target, never to the free-variable support.
 *
 *   Free variables:  x_i = P_X(i)  for 1 <= i <= L-1.
 *   x_0 = 0 (empty prefix) and x_L = m(X) (whole block) are constants.
 *
 *   Abelian square, start s, half-period K:
 *       P(s) - 2P(s+K) + P(s+2K) = 0,      coefficients (1,-2,1).
 *
 * DECOMPOSITION CONVENTION (half-open, exactly as v0.2 section 1):
 *       t = bL + i,   0 <= i < L.
 *   The only cut that can yield b = N is t = NL, and it then has i = 0, so the
 *   indicator 1_{i != 0} already deletes it. No separate endpoint rule is
 *   needed. (This is checked explicitly in the audit.)
 *
 * SIGNATURE = the reduced linear form sum_i c_i x_i after combining equal
 *   depths and deleting zero coefficients. The empty form "" is a legal
 *   signature: it marks a window whose constraint has NO free variables.
 * ==========================================================================*/

function bump(acc, i, c) { acc.set(i, (acc.get(i) || 0) + c); }
function fmt(acc) {
  const t = [...acc.entries()].filter(e => e[1] !== 0).sort((a, b) => a[0] - b[0]);
  return t.map(e => e[1] + '*x' + e[0]).join('+');
}
function maskArray(N, B) {
  const isX = new Array(N + 2).fill(false);
  for (const b of B) isX[b] = true;
  return isX;
}

/* ---------------------------------------------------------------------------
 * ROUTE 1 -- direct (s,K) enumeration.  Ground truth.
 * -------------------------------------------------------------------------*/
function directScan(L, N, B, kmin, keepWindows) {
  const isX = maskArray(N, B);
  const total = N * L;
  const coef = [1, -2, 1];
  const S = new Set();
  const wins = keepWindows ? [] : null;
  const classOf = new Map();          // sig -> Set of structural class tags
  for (let K = kmin; 2 * K <= total; K++) {
    for (let s = 0; s + 2 * K <= total; s++) {
      const acc = new Map();
      const copies = new Set();
      let qpat = '';
      let zeroCuts = 0;
      for (let q = 0; q < 3; q++) {
        const t = s + q * K;
        const b = Math.floor(t / L), i = t - b * L;
        if (i === 0) { zeroCuts++; continue; }
        if (!isX[b]) continue;
        bump(acc, i, coef[q]); copies.add(b); qpat += q;
      }
      const sig = fmt(acc);
      S.add(sig);
      const tag = copies.size + 'c' + qpat.length + 'i:' + (qpat || '-');
      if (!classOf.has(sig)) classOf.set(sig, new Set());
      classOf.get(sig).add(tag);
      if (keepWindows) wins.push({ s, K, sig, copies: copies.size, inc: qpat.length, qpat, zeroCuts });
    }
  }
  return { set: S, windows: wins, classOf };
}

/* ---------------------------------------------------------------------------
 * ROUTE 2 -- closed macro/local compiler.
 * Enumerates macro block TRIPLES and solves the curvature law for i_2.
 * Never scans (s,K).  Complexity O(N^3 L^2) instead of O(N^2 L^2 * NL).
 * -------------------------------------------------------------------------*/
function compileScan(L, N, B, kmin) {
  const isX = maskArray(N, B);
  const total = N * L;
  const S = new Set();
  for (let b0 = 0; b0 <= N; b0++)
    for (let b1 = 0; b1 <= N; b1++)
      for (let b2 = 0; b2 <= N; b2++) {
        const delta = b0 - 2 * b1 + b2;
        if (delta < -1 || delta > 1) continue;      // section 2 curvature law
        for (let i0 = 0; i0 < L; i0++)
          for (let i1 = 0; i1 < L; i1++) {
            const i2 = 2 * i1 - i0 - delta * L;      // local curvature law
            if (i2 < 0 || i2 >= L) continue;
            const t0 = b0 * L + i0, t1 = b1 * L + i1, t2 = b2 * L + i2;
            const K = t1 - t0;
            if (K < kmin) continue;
            if (t2 - t1 !== K) continue;             // identity; kept as a guard
            if (t2 > total) continue;
            const acc = new Map();
            if (i0 !== 0 && isX[b0]) bump(acc, i0, 1);
            if (i1 !== 0 && isX[b1]) bump(acc, i1, -2);
            if (i2 !== 0 && isX[b2]) bump(acc, i2, 1);
            S.add(fmt(acc));
          }
      }
  return S;
}

/* ---------------------------------------------------------------------------
 * Curvature families  C_delta(L)   (v0.2 section 3)
 * "nonzero signatures x_{i0} - 2 x_{i1} + x_{i2} with
 *  i0 - 2 i1 + i2 = -delta*L and 1 <= i_q < L"
 * -------------------------------------------------------------------------*/
function Cfam(L, delta) {
  const S = new Set();
  for (let i0 = 1; i0 < L; i0++)
    for (let i1 = 1; i1 < L; i1++) {
      const i2 = 2 * i1 - i0 - delta * L;
      if (i2 < 1 || i2 > L - 1) continue;
      const acc = new Map();
      bump(acc, i0, 1); bump(acc, i1, -2); bump(acc, i2, 1);
      const s = fmt(acc);
      if (s !== '') S.add(s);
    }
  return S;
}
/* midpoint / assigned-centre bridge family (v0.2 sections 5,6) */
function midpointFamily(L) {
  const M = new Set();
  for (let i = 1; i <= L - 1; i++) M.add('2*x' + i);
  for (let i = 1; i <= L - 1; i++)
    for (let j = i + 1; j <= L - 1; j++)
      if (((j - i) % 2) === 0) M.add('1*x' + i + '+1*x' + j);
  return M;
}
/* macro curvature set of a mask, over triples of DISTINCT X positions */
function curvSet(B) {
  const b = [...B].sort((x, y) => x - y);
  const C = new Set();
  for (let p = 0; p < b.length; p++)
    for (let q = p + 1; q < b.length; q++)
      for (let r = q + 1; r < b.length; r++) {
        const d = b[p] - 2 * b[q] + b[r];
        if (d >= -1 && d <= 1) C.add(d);
      }
  return C;
}
/* T_3(B,L): signatures of windows hitting THREE DISTINCT X copies,
   each at a nonzero local offset.  Measured directly. */
function T3direct(L, N, B, kmin) {
  const r = directScan(L, N, B, kmin, true);
  const S = new Set();
  for (const w of r.windows) if (w.copies === 3 && w.inc === 3) S.add(w.sig);
  return S;
}

/* ---------------------------------------------------------------------------
 * Reduced-shape catalogue of a signature string (Task 4D)
 * -------------------------------------------------------------------------*/
function shapeOf(sig) {
  if (sig === '') return 'EMPTY';
  const cs = sig.split('+').map(t => parseInt(t.split('*')[0], 10));
  return cs.join(',');
}
function eqSet(A, Bs) {
  if (A.size !== Bs.size) return false;
  for (const v of A) if (!Bs.has(v)) return false;
  return true;
}
function diffSet(A, Bs) { const D = new Set(); for (const v of A) if (!Bs.has(v)) D.add(v); return D; }
function unionSet(...xs) { const U = new Set(); for (const x of xs) for (const v of x) U.add(v); return U; }

module.exports = {
  bump, fmt, maskArray, directScan, compileScan, Cfam, midpointFamily,
  curvSet, T3direct, shapeOf, eqSet, diffSet, unionSet
};
