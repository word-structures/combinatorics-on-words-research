'use strict';
/* CLEAN-ROOM audit of the FAF/AFE support theorem.
 * Shares no code with verify_faf_afe_general_theorem.py.
 * Signatures are derived directly from D(s,K) = P(s+2K) - 2P(s+K) + P(s), by locating
 * each cut in its block and keeping only F-depths in 1..L-1 (x_0 and x_L are substituted).
 *
 * AFE = A F E   -> F occupies [L, 2L]        , K range 2..L
 * FAF = F A F   -> F occupies [0, L], [2L,3L], K range 2..floor(3L/2)
 */
function sigOf(cover, L, s, K) {
  // cover: array of role letters per block, e.g. ['a','f','e'] or ['f','a','f']
  const coef = [1, -2, 1], cuts = [s, s + K, s + 2 * K];
  const acc = new Map();                    // depth -> coefficient
  for (let t = 0; t < 3; t++) {
    const p = cuts[t];
    // locate: block q = floor(p/L), depth d = p - qL ; end convention p = 3L -> (2, L)
    let q = Math.floor(p / L), d = p - q * L;
    if (q === cover.length) { q = cover.length - 1; d = L; }
    if (cover[q] !== 'f') continue;         // non-F blocks contribute constants only
    if (d === 0 || d === L) continue;       // x_0 = 0 and x_L = m(F) are substituted out
    acc.set(d, (acc.get(d) || 0) + coef[t]);
  }
  const terms = [...acc.entries()].filter(e => e[1] !== 0).sort((a, b) => a[0] - b[0]);
  return terms.map(e => e[1] + "*x" + e[0]).join("+");
}
function collect(cover, L, kmax) {
  const S = new Set(); const byWin = [];
  for (let K = 2; K <= kmax; K++) for (let s = 0; s + 2 * K <= 3 * L; s++) {
    const g = sigOf(cover, L, s, K);
    S.add(g); byWin.push({ s: s, K: K, sig: g });
  }
  return { set: S, windows: byWin };
}
function midpointFamily(L) {
  const M = new Set();
  for (let i = 1; i <= L - 1; i++) M.add("2*x" + i);
  for (let i = 1; i <= L - 1; i++) for (let j = i + 1; j <= L - 1; j++)
    if (((j - i) % 2) === 0) M.add("1*x" + i + "+1*x" + j);
  return M;
}
function audit(L) {
  const AFE = collect(['a', 'f', 'e'], L, L);
  const FAF = collect(['f', 'a', 'f'], L, Math.floor(3 * L / 2));
  const M = midpointFamily(L);
  let subset = true; const notIn = [];
  for (const g of AFE.set) if (!FAF.set.has(g)) { subset = false; if (notIn.length < 4) notIn.push(g); }
  const diff = new Set(); for (const g of FAF.set) if (!AFE.set.has(g)) diff.add(g);
  let diffEqM = diff.size === M.size; const extra = [], missing = [];
  for (const g of diff) if (!M.has(g)) { diffEqM = false; if (extra.length < 4) extra.push(g); }
  for (const g of M) if (!diff.has(g)) { diffEqM = false; if (missing.length < 4) missing.push(g); }
  let mDisjointAFE = true; for (const g of M) if (AFE.set.has(g)) mDisjointAFE = false;
  // primal graph on free variables from AFE 2-variable signatures
  const edges = new Set();
  for (const g of AFE.set) {
    const ds = [...g.matchAll(/x(\d+)/g)].map(m => +m[1]);
    if (ds.length === 2) edges.add(Math.min(...ds) + "," + Math.max(...ds));
  }
  let allNonAdj = true, adjPresent = false;
  for (let i = 1; i <= L - 1; i++) for (let j = i + 1; j <= L - 1; j++) {
    const has = edges.has(i + "," + j);
    if (j - i >= 2 && !has) allNonAdj = false;
    if (j - i === 1 && has) adjPresent = true;
  }
  return {
    L: L, AFE_sig: AFE.set.size, FAF_sig: FAF.set.size, diff: diff.size,
    midpoint: M.size, floorL2over4: Math.floor(L * L / 4),
    AFE_subset_FAF: subset, diff_equals_M: diffEqM, M_disjoint_AFE: mDisjointAFE,
    countMatches: M.size === Math.floor(L * L / 4),
    AFE_edges_all_nonadjacent: allNonAdj, AFE_has_adjacent_edge: adjPresent,
    notIn: notIn, extra: extra, missing: missing
  };
}
module.exports = { sigOf, collect, midpointFamily, audit };
if (require.main === module) {
  const Ls = process.argv[2] ? process.argv[2].split(",").map(Number)
    : [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 20, 21, 39, 40, 41, 60, 61, 100, 101, 150, 199, 200];
  let fails = 0;
  console.log("  L   AFEsig  FAFsig   diff  |M_L|  fl(L^2/4)  subset  diff=M  Mdisj  cnt  nonadjOK  adjEdge?");
  for (const L of Ls) {
    const r = audit(L);
    const ok = r.AFE_subset_FAF && r.diff_equals_M && r.M_disjoint_AFE && r.countMatches && r.AFE_edges_all_nonadjacent && !r.AFE_has_adjacent_edge;
    if (!ok) fails++;
    console.log(
      String(r.L).padStart(4), String(r.AFE_sig).padStart(8), String(r.FAF_sig).padStart(7),
      String(r.diff).padStart(6), String(r.midpoint).padStart(6), String(r.floorL2over4).padStart(10),
      String(r.AFE_subset_FAF).padStart(7), String(r.diff_equals_M).padStart(7),
      String(r.M_disjoint_AFE).padStart(6), String(r.countMatches).padStart(5),
      String(r.AFE_edges_all_nonadjacent).padStart(9), String(r.AFE_has_adjacent_edge).padStart(8),
      ok ? "" : "  <== FAIL " + JSON.stringify({ notIn: r.notIn, extra: r.extra, missing: r.missing }));
  }
  console.log("\nfailures: " + fails);
}
