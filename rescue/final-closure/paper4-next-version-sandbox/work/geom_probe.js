'use strict';
/* Isolate the two C3c / C14 failures and hunt for genuine counterexamples
 * beyond the ranges tested by the v0.2 package. */
const G = require('./geom_core.js');
const out = {};
const noEmpty = S => { const T = new Set(S); T.delete(''); return T; };

/* ---- P1: is the ONLY discrepancy the empty signature? ------------------ */
(function () {
  let cases = 0, badWithEmpty = 0, badWithoutEmpty = 0, sample = [];
  for (const L of [4, 5, 6, 7, 8, 9, 10, 11, 12]) for (let N = 3; N <= 7; N++) {
    for (let m = 1; m < (1 << N); m++) {
      const B = []; for (let b = 0; b < N; b++) if (m & (1 << b)) B.push(b);
      if (B.length < 3 || B.length > 4) continue;
      const T = G.T3direct(L, N, B, 2), cs = G.curvSet(B);
      let pred = new Set(); for (const d of cs) pred = G.unionSet(pred, G.Cfam(L, d));
      cases++;
      if (!G.eqSet(T, pred)) badWithEmpty++;
      if (!G.eqSet(noEmpty(T), pred)) {
        badWithoutEmpty++;
        if (sample.length < 5) sample.push({ L, N, B, curv: [...cs],
          onlyT3: [...G.diffSet(noEmpty(T), pred)].slice(0, 4),
          onlyPred: [...G.diffSet(pred, noEmpty(T))].slice(0, 4) });
      }
    }
  }
  out.P1_T3_modulo_empty = { cases, failuresWithEmpty: badWithEmpty, failuresWithoutEmpty: badWithoutEmpty, sample };
  console.log('P1 T3 = U C_delta  (empty sig excluded):', badWithoutEmpty === 0 ? 'HOLDS' : 'FAILS',
    JSON.stringify(out.P1_T3_modulo_empty).slice(0, 300));
})();

/* ---- P2: same for AP saturation --------------------------------------- */
(function () {
  let cases = 0, bad = 0, sample = [];
  for (const L of [4, 5, 6, 7, 8, 9, 10, 11, 13]) for (const d of [2, 3, 4, 5])
    for (const a of [0, 1, 2]) for (const k of [3, 4, 5]) {
      const B = []; for (let t = 0; t < k; t++) B.push(a + t * d);
      const N = B[B.length - 1] + 1; if (N > 16) continue;
      const T = noEmpty(G.T3direct(L, N, B, 2)), C0 = G.Cfam(L, 0);
      cases++;
      if (!G.eqSet(T, C0)) { bad++; if (sample.length < 5) sample.push({ L, d, a, k, N, T3: T.size, C0: C0.size,
        onlyT3: [...G.diffSet(T, C0)].slice(0, 3), onlyC0: [...G.diffSet(C0, T)].slice(0, 3) }); }
    }
  out.P2_AP_saturation_modulo_empty = { cases, failures: bad, sample };
  console.log('P2 AP saturation (empty sig excluded):', bad === 0 ? 'HOLDS' : 'FAILS', JSON.stringify(out.P2_AP_saturation_modulo_empty).slice(0, 300));
})();

/* ---- P3: when exactly is the empty signature realizable on 3 distinct X? */
(function () {
  const rows = [];
  for (const L of [4, 5, 6, 8]) for (let N = 3; N <= 6; N++)
    for (let m = 1; m < (1 << N); m++) {
      const B = []; for (let b = 0; b < N; b++) if (m & (1 << b)) B.push(b);
      if (B.length < 3) continue;
      const r = G.directScan(L, N, B, 2, true);
      let n = 0, ex = null;
      for (const w of r.windows) if (w.copies === 3 && w.inc === 3 && w.sig === '') { n++; if (!ex) ex = { s: w.s, K: w.K }; }
      if (n) rows.push({ L, N, B, emptyWindows: n, example: ex, hasAP: [...G.curvSet(B)].includes(0) });
    }
  const allHaveAP = rows.every(r => r.hasAP);
  out.P3_empty_signature_windows = { masksWithEmptyT3Window: rows.length, allSuchMasksContainMacroAP: allHaveAP, sample: rows.slice(0, 6) };
  console.log('P3 empty-sig windows exist for', rows.length, 'masks; all contain a 3-term macro AP:', allHaveAP);
})();

/* ---- P4: AFE K-cap saturation (does K<=L suffice at L=40?) ------------- */
(function () {
  const L = 40, N = 3;
  function scanCapped(B, kmin, kmax) {
    const isX = G.maskArray(N, B); const S = new Set(); const total = N * L;
    for (let K = kmin; K <= kmax && 2 * K <= total; K++)
      for (let s = 0; s + 2 * K <= total; s++) {
        const acc = new Map(); const coef = [1, -2, 1];
        for (let q = 0; q < 3; q++) { const t = s + q * K, b = Math.floor(t / L), i = t - b * L;
          if (i === 0 || !isX[b]) continue; G.bump(acc, i, coef[q]); }
        S.add(G.fmt(acc));
      }
    return S;
  }
  const afe40 = scanCapped([1], 2, 40), afe60 = scanCapped([1], 2, 60);
  const faf60 = scanCapped([0, 2], 2, 60), faf40 = scanCapped([0, 2], 2, 40);
  out.P4_Kcap = { AFE_K40: afe40.size, AFE_K60: afe60.size, AFE_saturatesAt40: G.eqSet(afe40, afe60),
    FAF_K40: faf40.size, FAF_K60: faf60.size, FAF_saturatesAt40: G.eqSet(faf40, faf60),
    excess_K60: G.diffSet(faf60, afe60).size, excess_gateMixed: G.diffSet(faf60, afe40).size };
  console.log('P4 K-cap:', JSON.stringify(out.P4_Kcap));
})();

/* ---- P5: counterexample hunt well beyond the package's tested ranges --- */
(function () {
  // deterministic pseudo-random masks, larger L and N than v0.2 tested
  let seed = 20260828;
  const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  let cases = 0, bad = [];
  for (let trial = 0; trial < 400; trial++) {
    const L = 4 + Math.floor(rnd() * 22);            // L = 4..25
    const N = 3 + Math.floor(rnd() * 8);             // N = 3..10
    const B = []; for (let b = 0; b < N; b++) if (rnd() < 0.45) B.push(b);
    if (!B.length) continue;
    const dS = G.directScan(L, N, B, 2, false).set;
    const cS = G.compileScan(L, N, B, 2);
    cases++;
    if (!G.eqSet(dS, cS)) bad.push({ L, N, B, onlyDirect: [...G.diffSet(dS, cS)].slice(0, 3), onlyCompiler: [...G.diffSet(cS, dS)].slice(0, 3) });
    if (B.length >= 3) {
      const T = noEmpty(G.T3direct(L, N, B, 2));
      let pred = new Set(); for (const d of G.curvSet(B)) pred = G.unionSet(pred, G.Cfam(L, d));
      if (!G.eqSet(T, pred)) bad.push({ kind: 'T3', L, N, B, curv: [...G.curvSet(B)],
        onlyT3: [...G.diffSet(T, pred)].slice(0, 3), onlyPred: [...G.diffSet(pred, T)].slice(0, 3) });
    }
  }
  out.P5_randomized_stress = { cases, failures: bad.length, sample: bad.slice(0, 5) };
  console.log('P5 randomized stress (L<=25, N<=10):', bad.length === 0 ? 'no counterexamples' : 'COUNTEREXAMPLES', cases, 'cases');
})();

/* ---- P6: large-L family counts ---------------------------------------- */
(function () {
  let bad = [];
  for (const L of [101, 128, 199, 200, 256, 401, 512]) {
    const n = Math.floor(L / 2);
    const c0 = G.Cfam(L, 0).size, cp = G.Cfam(L, 1).size, cm = G.Cfam(L, -1).size;
    if (c0 !== Math.floor((L - 2) ** 2 / 4) || cp !== n * (n - 1) / 2 || cm !== n * (n - 1) / 2)
      bad.push({ L, c0, cp, cm, pred0: Math.floor((L - 2) ** 2 / 4), predpm: n * (n - 1) / 2 });
  }
  out.P6_largeL_counts = { tested: [101, 128, 199, 200, 256, 401, 512], failures: bad };
  console.log('P6 large-L counts:', bad.length === 0 ? 'all match' : JSON.stringify(bad));
})();

require('fs').writeFileSync(__dirname + '/../geom_probe_results.json', JSON.stringify(out, null, 1));
