'use strict';
/* TASK 4 (constructive part) -- the candidate basis is false; test the repair.
 *
 * ROOT CAUSES found by motif_basis.js:
 *   (R1) v0.2 section 5 assumes macro gap d >= 2, so ADJACENT X copies are
 *        uncovered;
 *   (R2) Curv(B) is indexed by triples of DISTINCT X positions, but three
 *        cutpoints may hit only one or two copies and still produce a
 *        curvature-family signature whose delta is not in Curv(B).
 *
 * REPAIRED CANONICAL BASIS
 *   Index motifs by the finite type
 *       tau = ( delta, min(g1,2), min(g2,2), chi(b0), chi(b1), chi(b2) )
 *   where g1 = b1-b0, g2 = b2-b1, delta = g2-g1, chi = X-membership.
 *   Claim: the support skeleton is the union of F(tau,L) over the types
 *   realizable in the mask, and F(tau,L) does NOT depend on the concrete
 *   block positions -- only on tau and L.
 */
const G = require('./geom_core.js');
const out = {};

const KMIN = 2;
function typeKey(delta, g1, g2, c0, c1, c2) {
  return [delta, Math.min(g1, 2), Math.min(g2, 2), c0 ? 1 : 0, c1 ? 1 : 0, c2 ? 1 : 0].join('|');
}
/* signature family of a type, computed from L alone */
const famCache = new Map();
function F(tau, L) {
  const ck = tau + '@' + L;
  if (famCache.has(ck)) return famCache.get(ck);
  const [delta, g1c, g2c, c0, c1, c2] = tau.split('|').map(Number);
  const S = new Set();
  // representative gaps: capped class 2 stands for "any gap >= 2"
  const g1 = g1c, g2 = g2c;
  for (let i0 = 0; i0 < L; i0++)
    for (let i1 = 0; i1 < L; i1++) {
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
  famCache.set(ck, S);
  return S;
}
/* types realizable in a concrete mask */
function typesOf(L, N, B) {
  const isX = G.maskArray(N, B);
  const T = new Set();
  for (let b0 = 0; b0 <= N; b0++)
    for (let b1 = b0; b1 <= N; b1++)
      for (let b2 = b1; b2 <= N; b2++) {
        const g1 = b1 - b0, g2 = b2 - b1, delta = g2 - g1;
        if (delta < -1 || delta > 1) continue;
        // realizability: some (i0,i1,i2) with K>=KMIN and t2 <= N*L
        let ok = false;
        for (let i0 = 0; i0 < L && !ok; i0++)
          for (let i1 = 0; i1 < L && !ok; i1++) {
            const i2 = 2 * i1 - i0 - delta * L;
            if (i2 < 0 || i2 >= L) continue;
            const K = b1 * L + i1 - (b0 * L + i0);
            if (K < KMIN) continue;
            if (b2 * L + i2 > N * L) continue;
            ok = true;
          }
        if (ok) T.add(typeKey(delta, g1, g2, isX[b0], isX[b1], isX[b2]));
      }
  return T;
}
function repairedPredict(L, N, B) {
  let S = new Set();
  for (const tau of typesOf(L, N, B)) S = G.unionSet(S, F(tau, L));
  return S;
}

/* ---- E1: does the repaired basis reproduce the skeleton exactly? ------- */
(function () {
  let cases = 0, over = 0, under = 0, sample = [];
  for (let L = 3; L <= 13; L++)
    for (let N = 2; N <= 6; N++)
      for (let m = 1; m < (1 << N); m++) {
        const B = []; for (let b = 0; b < N; b++) if (m & (1 << b)) B.push(b);
        const direct = G.directScan(L, N, B, KMIN, false).set;
        const pred = repairedPredict(L, N, B);
        cases++;
        const miss = G.diffSet(direct, pred), extra = G.diffSet(pred, direct);
        if (miss.size) { under++; if (sample.length < 4) sample.push({ kind: 'UNDER', L, N, B, missing: [...miss].slice(0, 4) }); }
        if (extra.size) { over++; if (sample.length < 8) sample.push({ kind: 'OVER', L, N, B, spurious: [...extra].slice(0, 4) }); }
      }
  out.E1_repaired_basis = { cases, undercount: under, overcount: over, exact: under === 0 && over === 0, sample };
  console.log('E1 repaired canonical basis: ' + (under === 0 && over === 0 ? 'EXACT' : 'under=' + under + ' over=' + over) + ' over ' + cases + ' masks');
  if (sample.length) console.log('   ' + JSON.stringify(sample.slice(0, 3)));
})();

/* ---- E2: how large is the canonical type catalogue? -------------------- */
(function () {
  const all = new Set();
  for (let L = 4; L <= 12; L++) for (let N = 2; N <= 7; N++)
    for (let m = 1; m < (1 << N); m++) {
      const B = []; for (let b = 0; b < N; b++) if (m & (1 << b)) B.push(b);
      for (const t of typesOf(L, N, B)) all.add(t);
    }
  // classify each type by how many X incidences it can contribute
  const rows = [...all].sort().map(t => {
    const p = t.split('|').map(Number);
    return { type: t, delta: p[0], g1: p[1], g2: p[2], chi: [p[3], p[4], p[5]],
             xCuts: p[3] + p[4] + p[5], famSizeL10: F(t, 10).size };
  });
  const nontrivial = rows.filter(r => r.xCuts > 0);
  out.E2_catalogue = { totalTypes: all.size, typesWithAtLeastOneXcut: nontrivial.length,
    byXcuts: [0, 1, 2, 3].map(k => ({ xCuts: k, types: rows.filter(r => r.xCuts === k).length })),
    rows: nontrivial };
  console.log('E2 canonical type catalogue: ' + all.size + ' types total, ' + nontrivial.length + ' with >=1 X incidence');
})();

/* ---- E3: root-cause confirmation -------------------------------------- */
(function () {
  // R1: adjacent-pair masks produce midpoint-shaped signatures with no d>=2 pair
  const L = 8, N = 2, B = [0, 1];
  const direct = G.directScan(L, N, B, KMIN, false).set;
  const bridges = [...direct].filter(s => /^1\*x\d+\+1\*x\d+$/.test(s) || /^2\*x\d+$/.test(s));
  // R2: delta realized by cut-triples vs Curv(B) over distinct positions
  const r = G.directScan(L, N, B, KMIN, true);
  const deltasSeen = new Set();
  for (const w of r.windows) {
    if (!w.inc) continue;
    const bs = []; for (let q = 0; q < 3; q++) { const t = w.s + q * w.K; bs.push(Math.floor(t / L)); }
    deltasSeen.add(bs[0] - 2 * bs[1] + bs[2]);
  }
  out.E3_root_causes = {
    R1_adjacent_pair: { mask: { L, N, B }, hasGapGE2Pair: false, bridgeShapedSignatures: bridges.length, sample: bridges.slice(0, 4) },
    R2_curvature_index: { CurvB_distinctTriples: [...G.curvSet(B)], deltasActuallyRealized: [...deltasSeen].sort((a, b) => a - b) }
  };
  console.log('E3 root causes: ' + JSON.stringify(out.E3_root_causes));
})();

require('fs').writeFileSync(__dirname + '/../motif_repair_results.json', JSON.stringify(out, null, 1));
