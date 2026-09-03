'use strict';
/* Clean-room audit of PAPER4_OCCURRENCE_GEOMETRY v0.2 -- Task 2 checks 1..14.
 * Emits a compact JSON result summary on stdout (last line) plus a human log. */
const G = require('./geom_core.js');

const out = { checks: {}, counterexamples: [], generated: '2026-08-28' };
let FAIL = 0;
function rec(name, ok, detail) {
  out.checks[name] = { pass: !!ok, detail: detail === undefined ? null : detail };
  if (!ok) FAIL++;
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail !== undefined ? '   ' + JSON.stringify(detail) : ''));
}

/* mask generator: all nonempty subsets of {0..N-1} of size 1..4, N small */
function* masks(N, maxSize) {
  for (let m = 1; m < (1 << N); m++) {
    const B = []; for (let b = 0; b < N; b++) if (m & (1 << b)) B.push(b);
    if (B.length <= maxSize) yield B;
  }
}

/* ---- 1,2,3,5: direct vs closed compiler, odd+even L, all masks ---------- */
(function () {
  let cases = 0, bad = [];
  for (const L of [4, 5, 6, 7, 8, 9, 10, 11, 12, 13]) {
    for (let N = 2; N <= (L <= 9 ? 6 : 5); N++) {
      for (const B of masks(N, 4)) {
        const d = G.directScan(L, N, B, 2, false).set;
        const c = G.compileScan(L, N, B, 2);
        cases++;
        if (!G.eqSet(d, c)) {
          bad.push({ L, N, B, onlyDirect: [...G.diffSet(d, c)].slice(0, 4), onlyCompiler: [...G.diffSet(c, d)].slice(0, 4) });
        }
      }
    }
  }
  rec('C1_direct_vs_closed_compiler', bad.length === 0, { cases, mismatches: bad.length, sample: bad.slice(0, 3) });
})();

/* ---- 3b: block-boundary i=0 and endpoint t=NL handling ------------------ */
(function () {
  // every window with a cut at offset 0 must contribute nothing from that cut;
  // and the only cut reaching b=N must be t=NL with i=0.
  let zeroCutWindows = 0, endpointWindows = 0, violations = 0;
  for (const L of [4, 7, 10]) for (const N of [2, 3, 4, 5]) {
    for (const B of masks(N, 4)) {
      const r = G.directScan(L, N, B, 2, true);
      for (const w of r.windows) {
        if (w.zeroCuts) zeroCutWindows++;
        for (let q = 0; q < 3; q++) {
          const t = w.s + q * w.K, b = Math.floor(t / L), i = t - b * L;
          if (b === N) { endpointWindows++; if (t !== N * L || i !== 0) violations++; }
          if (b > N) violations++;
        }
      }
    }
  }
  rec('C3_boundary_i0_and_endpoint', violations === 0,
    { zeroOffsetWindows: zeroCutWindows, cutsInVirtualBlockN: endpointWindows, violations });
})();

/* ---- 4: K=2 lower boundary --------------------------------------------- */
(function () {
  // (a) compiler and direct agree also at kmin=1;
  // (b) quantify what K=1 would add, i.e. the kmin convention is not silent.
  let bad = 0, addedTotal = 0, cases = 0;
  for (const L of [5, 8, 10]) for (const N of [2, 3, 4]) for (const B of masks(N, 3)) {
    const d1 = G.directScan(L, N, B, 1, false).set, c1 = G.compileScan(L, N, B, 1);
    const d2 = G.directScan(L, N, B, 2, false).set;
    if (!G.eqSet(d1, c1)) bad++;
    addedTotal += G.diffSet(d1, d2).size;
    cases++;
  }
  rec('C4_kmin_boundary', bad === 0, { cases, mismatchesAtKmin1: bad, signaturesOnlyReachableAtK1: addedTotal });
})();

/* ---- 6: coefficient cancellation at equal local depth ------------------- */
(function () {
  // find windows where two or three cuts share a local depth inside X blocks
  const seenShapes = new Set(); let found2 = 0, found3 = 0, bad = 0;
  for (const L of [5, 6, 8, 10]) for (const N of [3, 4, 5]) for (const B of masks(N, 4)) {
    const r = G.directScan(L, N, B, 2, true);
    for (const w of r.windows) {
      const depths = [];
      for (let q = 0; q < 3; q++) {
        const t = w.s + q * w.K, b = Math.floor(t / L), i = t - b * L;
        if (i !== 0 && B.includes(b)) depths.push(i);
      }
      const uniq = new Set(depths);
      if (depths.length >= 2 && uniq.size < depths.length) {
        if (depths.length === 3 && uniq.size === 1) { found3++; if (w.sig !== '') bad++; }
        else found2++;
        seenShapes.add(G.shapeOf(w.sig));
      }
    }
  }
  rec('C6_equal_depth_cancellation', bad === 0,
    { twoCutsSameDepth: found2, threeCutsSameDepth: found3,
      allThreeSameDepthAlwaysEmpty: bad === 0, reducedShapesSeen: [...seenShapes].sort() });
})();

/* ---- 7: all three curvature branches occur ------------------------------ */
(function () {
  const hit = new Set();
  for (const L of [5, 8]) for (const N of [4, 5, 6]) for (const B of masks(N, 4)) {
    const r = G.directScan(L, N, B, 2, true);
    for (const w of r.windows) {
      if (w.copies !== 3 || w.inc !== 3) continue;
      const bs = [];
      for (let q = 0; q < 3; q++) { const t = w.s + q * w.K; bs.push(Math.floor(t / L)); }
      hit.add(bs[0] - 2 * bs[1] + bs[2]);
    }
  }
  const h = [...hit].sort((a, b) => a - b);
  rec('C7_curvature_branches', h.length === 3 && h[0] === -1 && h[1] === 0 && h[2] === 1, { observed: h });
})();

/* ---- 8,9: C-family closed counts and disjointness ----------------------- */
(function () {
  const rows = []; let badCount = 0, badDisj = 0;
  for (let L = 4; L <= 100; L++) {
    const c0 = G.Cfam(L, 0), cp = G.Cfam(L, 1), cm = G.Cfam(L, -1);
    const n = Math.floor(L / 2);
    const predC0 = Math.floor((L - 2) * (L - 2) / 4);
    const predCp = n * (n - 1) / 2;
    if (c0.size !== predC0 || cp.size !== predCp || cm.size !== predCp) {
      badCount++;
      if (rows.length < 6) rows.push({ L, C0: c0.size, predC0, Cp: cp.size, Cm: cm.size, predCpm: predCp });
    }
    for (const s of cp) if (c0.has(s) || cm.has(s)) { badDisj++; break; }
    for (const s of cm) if (c0.has(s)) { badDisj++; break; }
    if (L === 40) out.checks._L40 = { C0: c0.size, Cplus: cp.size, Cminus: cm.size };
  }
  rec('C8_C_family_counts', badCount === 0, { Lrange: '4..100', failures: badCount, sample: rows });
  rec('C9_C_family_disjoint', badDisj === 0, { Lrange: '4..100', failures: badDisj });
})();

/* ---- 3c: T3(B,L) = union of C_delta over Curv(B) ------------------------ */
(function () {
  let cases = 0, bad = [];
  for (const L of [4, 5, 6, 7, 8, 9, 10, 11, 12]) {
    for (let N = 3; N <= 7; N++) {
      for (const B of masks(N, 4)) {
        if (B.length < 3) continue;
        const T = G.T3direct(L, N, B, 2);
        const cs = G.curvSet(B);
        let pred = new Set();
        for (const d of cs) pred = G.unionSet(pred, G.Cfam(L, d));
        cases++;
        if (!G.eqSet(T, pred)) bad.push({ L, N, B, curv: [...cs], T3: T.size, pred: pred.size,
          onlyT3: [...G.diffSet(T, pred)].slice(0, 3), onlyPred: [...G.diffSet(pred, T)].slice(0, 3) });
      }
    }
  }
  rec('C3c_T3_equals_union_Cdelta', bad.length === 0, { cases, mismatches: bad.length, sample: bad.slice(0, 4) });
})();

/* ---- 10,11: midpoint routing, even and odd gap -------------------------- */
(function () {
  let evenChecked = 0, evenBad = [], oddChecked = 0, oddBad = [];
  let evenZeroSig = 0;
  for (const L of [4, 5, 6, 7, 8, 9, 10]) {
    for (let N = 3; N <= 7; N++) {
      for (let a = 0; a < N; a++) for (let c = a + 2; c < N; c++) {
        const d = c - a;
        for (const centreIsX of [false, true]) {
          // mask: outer copies X; central block(s) X iff centreIsX
          const B = [a, c];
          if (d % 2 === 0 && centreIsX) B.push((a + c) / 2);
          if (d % 2 === 1 && centreIsX) { B.push(Math.floor((a + c) / 2)); B.push(Math.floor((a + c) / 2) + 1); }
          const isX = G.maskArray(N, B);
          for (let i = 1; i < L; i++) for (let j = 1; j < L; j++) {
            const t0 = a * L + i, t2 = c * L + j;
            if ((t0 + t2) % 2) continue;
            const t1 = (t0 + t2) / 2, K = t1 - t0;
            if (K < 2) continue;
            if (t2 > N * L) continue;
            const b1 = Math.floor(t1 / L), i1 = t1 - b1 * L;
            const acc = new Map();
            G.bump(acc, i, 1);
            if (i1 !== 0 && isX[b1]) G.bump(acc, i1, -2);
            G.bump(acc, j, 1);
            const sig = G.fmt(acc);
            if (d % 2 === 0) {
              evenChecked++;
              const m = (a + c) / 2;
              const okBlock = (b1 === m) && (i1 === (i + j) / 2) && (i % 2 === j % 2);
              let okSig;
              if (!centreIsX) okSig = G.midpointFamily(L).has(sig) && sig === G.fmt(new Map([[Math.min(i, j), 0]])) === false;
              // recompute cleanly:
              if (!centreIsX) okSig = (i === j ? sig === '2*x' + i : sig === '1*x' + Math.min(i, j) + '+1*x' + Math.max(i, j));
              else okSig = (i === j) ? (sig === '') : G.Cfam(L, 0).has(sig);
              if (i === j && centreIsX) evenZeroSig++;
              if (!(okBlock && okSig) && evenBad.length < 5) evenBad.push({ L, N, a, c, i, j, centreIsX, b1, i1, sig });
              if (!(okBlock && okSig)) evenChecked--;      // count only good ones
            } else {
              oddChecked++;
              const ml = Math.floor((a + c) / 2);
              let branch, okBlock, okSig;
              if (i + j < L) { branch = 'low'; okBlock = (b1 === ml && i1 === (L + i + j) / 2); okSig = centreIsX ? G.Cfam(L, 1).has(sig) : sig === '1*x' + Math.min(i, j) + '+1*x' + Math.max(i, j) || (i === j && sig === '2*x' + i); }
              else if (i + j === L) { branch = 'boundary'; okBlock = (b1 === ml + 1 && i1 === 0); okSig = (i === j ? sig === '2*x' + i : sig === '1*x' + Math.min(i, j) + '+1*x' + Math.max(i, j)); }
              else { branch = 'high'; okBlock = (b1 === ml + 1 && i1 === (i + j - L) / 2); okSig = centreIsX ? G.Cfam(L, -1).has(sig) : (i === j ? sig === '2*x' + i : sig === '1*x' + Math.min(i, j) + '+1*x' + Math.max(i, j)); }
              if (!(okBlock && okSig)) { if (oddBad.length < 5) oddBad.push({ L, N, a, c, i, j, centreIsX, branch, b1, i1, sig }); oddChecked--; }
            }
          }
        }
      }
    }
  }
  rec('C10_even_gap_routing', evenBad.length === 0, { verified: evenChecked, failures: evenBad.length, sample: evenBad, degenerate_i_eq_j_with_X_centre_gives_EMPTY_not_C0: evenZeroSig });
  rec('C11_odd_gap_routing', oddBad.length === 0, { verified: oddChecked, failures: oddBad.length, sample: oddBad });
})();

/* ---- 11b: odd-gap n^2 split -------------------------------------------- */
(function () {
  const rows = []; let bad = 0;
  for (let L = 4; L <= 60; L++) {
    const n = Math.floor(L / 2);
    let low = 0, bnd = 0, high = 0;
    for (let i = 1; i < L; i++) for (let j = i; j < L; j++) {
      if (((i + j) % 2) !== (L % 2)) continue;      // t1 must be an integer
      if (i + j < L) low++; else if (i + j === L) bnd++; else high++;
    }
    const ok = low === n * (n - 1) / 2 && bnd === n && high === n * (n - 1) / 2 && (low + bnd + high) === n * n;
    if (!ok) { bad++; if (rows.length < 5) rows.push({ L, n, low, bnd, high, total: low + bnd + high }); }
  }
  rec('C11b_odd_gap_n2_split', bad === 0, { Lrange: '4..60', failures: bad, sample: rows });
})();

/* ---- 12: FAF at L=40 recovers exactly 400 bridge signatures ------------- */
(function () {
  const L = 40;
  const faf = G.directScan(L, 3, [0, 2], 2, false).set;     // F A F
  const afe = G.directScan(L, 3, [1], 2, false).set;         // A F E  (F in block 1)
  const M = G.midpointFamily(L);
  const d = G.diffSet(faf, afe);
  rec('C12_FAF_L40_400_bridges', d.size === 400 && G.eqSet(d, M) && M.size === Math.floor(L * L / 4),
    { FAF_sigs: faf.size, AFE_sigs: afe.size, excess: d.size, midpointFamily: M.size, floorL2over4: Math.floor(L * L / 4), equal: G.eqSet(d, M) });
})();

/* ---- 13: same-ambient {0,2} -> {0,2,5} at L=10, six blocks -------------- */
(function () {
  const L = 10, N = 6;
  const res = {};
  for (const kmin of [1, 2]) {
    const s0 = G.directScan(L, N, [0, 2], kmin, false).set;
    const s1 = G.directScan(L, N, [0, 2, 5], kmin, false).set;
    const added = G.diffSet(s1, s0), lost = G.diffSet(s0, s1);
    const cp = G.Cfam(L, 1);
    res['kmin' + kmin] = {
      base: s0.size, ext: s1.size, added: added.size, lost: lost.size,
      addedEqualsCplus1: G.eqSet(added, cp), Cplus1size: cp.size,
      baseNoEmpty: s0.size - (s0.has('') ? 1 : 0), extNoEmpty: s1.size - (s1.has('') ? 1 : 0)
    };
  }
  const r = res.kmin2;
  rec('C13_same_ambient_irregular_spacing', r.added === 10 && r.lost === 0 && r.addedEqualsCplus1, res);
  out.checks._claimed_141_151 = { note: 'v0.2 claims support 141 -> 151', measured: res };
})();

/* ---- 14: AP saturation, three-distinct-X scope -------------------------- */
(function () {
  let cases = 0, bad = [];
  for (const L of [4, 5, 6, 7, 8, 9, 10]) {
    for (const d of [2, 3, 4]) {
      for (const a of [0, 1]) {
        for (const k of [3, 4, 5]) {                        // number of AP terms
          const B = []; for (let t = 0; t < k; t++) B.push(a + t * d);
          const N = B[B.length - 1] + 1;
          if (N > 14) continue;
          const T = G.T3direct(L, N, B, 2);
          const C0 = G.Cfam(L, 0);
          cases++;
          if (!G.eqSet(T, C0)) bad.push({ L, d, a, k, N, T3: T.size, C0: C0.size,
            onlyT3: [...G.diffSet(T, C0)].slice(0, 3), onlyC0: [...G.diffSet(C0, T)].slice(0, 3) });
        }
      }
    }
  }
  rec('C14_AP_saturation_three_distinct', bad.length === 0, { cases, failures: bad.length, sample: bad.slice(0, 5) });
})();

/* ---- 14b: the h=1 shape count L-3 -------------------------------------- */
(function () {
  // "locally allowed period-1 second-difference shapes": i0,i1,i2 consecutive
  // i.e. i1 = i0+1, i2 = i0+2, all in [1,L-1]  ->  i0 in [1, L-3]
  const rows = []; let bad = 0;
  for (let L = 5; L <= 60; L++) {
    let n = 0;
    for (let i0 = 1; i0 + 2 <= L - 1; i0++) n++;
    if (n !== L - 3) { bad++; if (rows.length < 4) rows.push({ L, n, pred: L - 3 }); }
  }
  rec('C14b_h1_shape_count_Lminus3', bad === 0, { Lrange: '5..60', failures: bad, sample: rows, atL40: 37 });
})();

out.FAILURES = FAIL;
console.log('\n=== clean-room checks: ' + FAIL + ' failure(s) ===');
require('fs').writeFileSync(__dirname + '/../geom_audit_results.json', JSON.stringify(out, null, 1));
