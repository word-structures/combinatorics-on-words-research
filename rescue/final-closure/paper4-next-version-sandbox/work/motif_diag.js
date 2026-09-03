'use strict';
/* Diagnose the UNDER/OVER of the capped-type basis, and test the padded
 * (truncation-free) variant that matches Paper 4's actual infinite-word setting. */
const G = require('./geom_core.js');
const out = {};
const KMIN = 2;

function typeKeyRaw(delta, g1, g2, c0, c1, c2) { return [delta, g1, g2, c0 ? 1 : 0, c1 ? 1 : 0, c2 ? 1 : 0].join('|'); }
function typeKeyCap(delta, g1, g2, c0, c1, c2) { return [delta, Math.min(g1, 2), Math.min(g2, 2), c0 ? 1 : 0, c1 ? 1 : 0, c2 ? 1 : 0].join('|'); }

const cache = new Map();
function F(tau, L) {
  const ck = tau + '@' + L; if (cache.has(ck)) return cache.get(ck);
  const [delta, g1, g2, c0, c1, c2] = tau.split('|').map(Number);
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
  cache.set(ck, S); return S;
}
/* types realizable in a concrete word of N blocks, WITH the ambient bound */
function typesOf(L, N, B, keyFn) {
  const isX = G.maskArray(N, B); const T = new Set();
  for (let b0 = 0; b0 <= N; b0++) for (let b1 = b0; b1 <= N; b1++) for (let b2 = b1; b2 <= N; b2++) {
    const g1 = b1 - b0, g2 = b2 - b1, delta = g2 - g1;
    if (delta < -1 || delta > 1) continue;
    let ok = false;
    for (let i0 = 0; i0 < L && !ok; i0++) for (let i1 = 0; i1 < L && !ok; i1++) {
      const i2 = 2 * i1 - i0 - delta * L;
      if (i2 < 0 || i2 >= L) continue;
      const K = (b1 - b0) * L + i1 - i0; if (K < KMIN) continue;
      if (b2 * L + i2 > N * L) continue;
      ok = true;
    }
    if (ok) T.add(keyFn(delta, g1, g2, isX[b0], isX[b1], isX[b2]));
  }
  return T;
}
function predict(L, N, B, keyFn) {
  let S = new Set(); for (const t of typesOf(L, N, B, keyFn)) S = G.unionSet(S, F(t, L)); return S;
}

/* ---- D1: diagnose a specific OVER and a specific UNDER ------------------ */
(function () {
  const diag = { over: [], under: [] };
  for (let L = 3; L <= 8 && (diag.over.length < 2 || diag.under.length < 2); L++)
    for (let N = 2; N <= 5; N++)
      for (let m = 1; m < (1 << N); m++) {
        const B = []; for (let b = 0; b < N; b++) if (m & (1 << b)) B.push(b);
        const d = G.directScan(L, N, B, KMIN, false).set, p = predict(L, N, B, typeKeyCap);
        const miss = G.diffSet(d, p), extra = G.diffSet(p, d);
        if (extra.size && diag.over.length < 2) diag.over.push({ L, N, B, spurious: [...extra].slice(0, 3) });
        if (miss.size && diag.under.length < 2) diag.under.push({ L, N, B, missing: [...miss].slice(0, 3) });
      }
  out.D1 = diag;
  console.log('D1 OVER sample: ' + JSON.stringify(diag.over));
  console.log('D1 UNDER sample: ' + JSON.stringify(diag.under));
})();

/* ---- D2: capped vs uncapped gap class ---------------------------------- */
(function () {
  let capUnder = 0, capOver = 0, rawUnder = 0, rawOver = 0, cases = 0;
  for (let L = 3; L <= 11; L++) for (let N = 2; N <= 6; N++)
    for (let m = 1; m < (1 << N); m++) {
      const B = []; for (let b = 0; b < N; b++) if (m & (1 << b)) B.push(b);
      const d = G.directScan(L, N, B, KMIN, false).set;
      const pc = predict(L, N, B, typeKeyCap), pr = predict(L, N, B, typeKeyRaw);
      cases++;
      if (G.diffSet(d, pc).size) capUnder++;   if (G.diffSet(pc, d).size) capOver++;
      if (G.diffSet(d, pr).size) rawUnder++;   if (G.diffSet(pr, d).size) rawOver++;
    }
  out.D2_cap_vs_raw = { cases, capped: { under: capUnder, over: capOver }, rawGaps: { under: rawUnder, over: rawOver } };
  console.log('D2 capped-gap types: under=' + capUnder + ' over=' + capOver +
              ' | raw-gap types: under=' + rawUnder + ' over=' + rawOver + '  (of ' + cases + ')');
})();

/* ---- D3: padded ambient (Paper 4's actual setting is an infinite word) -- */
(function () {
  // embed the mask in a word padded on the right with assigned blocks, so that
  // right-edge truncation never removes a window
  const res = {};
  for (const pad of [0, 1, 2, 3, 4, 6]) {
    let under = 0, over = 0, cases = 0, sample = [];
    for (let L = 3; L <= 10; L++) for (let N = 2; N <= 5; N++)
      for (let m = 1; m < (1 << N); m++) {
        const B = []; for (let b = 0; b < N; b++) if (m & (1 << b)) B.push(b);
        const NP = N + pad;
        const d = G.directScan(L, NP, B, KMIN, false).set;
        const p = predict(L, NP, B, typeKeyRaw);
        cases++;
        const mi = G.diffSet(d, p), ex = G.diffSet(p, d);
        if (mi.size) { under++; if (sample.length < 3) sample.push({ kind: 'UNDER', L, N, B, x: [...mi].slice(0, 3) }); }
        if (ex.size) { over++; if (sample.length < 6) sample.push({ kind: 'OVER', L, N, B, x: [...ex].slice(0, 3) }); }
      }
    res['pad' + pad] = { cases, under, over, exact: under === 0 && over === 0, sample };
    console.log('D3 pad=' + pad + ': under=' + under + ' over=' + over + ' of ' + cases + (under === 0 && over === 0 ? '  EXACT' : ''));
  }
  out.D3_padded = res;
})();

require('fs').writeFileSync(__dirname + '/../motif_diag_results.json', JSON.stringify(out, null, 1));
