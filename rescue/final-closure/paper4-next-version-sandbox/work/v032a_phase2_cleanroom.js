'use strict';
/* CLEAN-ROOM audit of v0.32a Phase-II (weighted frontier-DAG) claims A-F.
 * Written from the manuscript statements only; no supplied verifier consulted.
 *
 * Model (scaled down): alphabet {a,b,c}, target profile h, |word| = |h|_1.
 * Constraints are affine on prefix Parikh vectors X_0..X_n:
 *      sum_j alpha_j X_{d_j}  IN  T        (forbidden)
 * closed at max_j d_j. A word is SAT iff no constraint is violated.
 * First-hit depth of an unsatisfying word = smallest d such that some
 * constraint closed at d is violated by the length-d prefix.
 *
 * Claims audited:
 *  A  blocked child cylinder mass may be multiplied by state multiplicity N
 *  B  quotient preserves first-hit semantics
 *  C  Z + sum_d M_d = |W_h|
 *  D  A_surv = sum_{d=0}^{n-1} S_d = E[T], T=n for words with no earlier hit
 *  E  N_eff(d) computable from quotient multiplicities (N w^2, not (N w)^2)
 *  F  Z = 0 certifies UNSAT
 */
const key = v => v.join(',');
const fact = n => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
function multinom(n, p) { let r = fact(n); for (const x of p) r /= fact(x); return r; }

/* cylinder mass of a prefix with current Parikh p under target profile h */
function cyl(h, p) {
  const rem = h.map((x, i) => x - p[i]);
  if (rem.some(x => x < 0)) return 0;
  return multinom(rem.reduce((a, b) => a + b, 0), rem);
}
/* ---- brute force over all profile-h words ------------------------------ */
function allWords(h) {
  const n = h.reduce((a, b) => a + b, 0), out = [], w = [], need = h.slice();
  (function rec(d) {
    if (d === n) { out.push(w.join('')); return; }
    for (let c = 0; c < 3; c++) { if (!need[c]) continue; need[c]--; w.push('abc'[c]); rec(d + 1); w.pop(); need[c]++; }
  })(0);
  return out;
}
function prefixes(word) {
  const a = [[0, 0, 0]];
  for (let i = 0; i < word.length; i++) { const p = a[i].slice(); p[word.charCodeAt(i) - 97]++; a.push(p); }
  return a;
}
/* constraint: {depths:[d...], coefs:[a...], T:Set of key strings}, closed at max depth */
function violated(con, X) {
  let v = [0, 0, 0];
  for (let j = 0; j < con.depths.length; j++) {
    const x = X[con.depths[j]], a = con.coefs[j];
    v = [v[0] + a * x[0], v[1] + a * x[1], v[2] + a * x[2]];
  }
  return con.T.has(key(v));
}
function firstHit(cons, X, n) {
  for (let d = 1; d <= n; d++)
    for (const c of cons) if (c.closeAt === d && violated(c, X)) return d;
  return null;                                   // SAT
}
/* ---- quotient frontier-DAG (manuscript sections 11-12) ------------------ */
function frontierDAG(h, cons, n) {
  const closedAt = new Map();                    // depth -> constraints closing there
  for (const c of cons) { if (!closedAt.has(c.closeAt)) closedAt.set(c.closeAt, []); closedAt.get(c.closeAt).push(c); }
  /* A_d = historical depths < d referenced by a constraint NOT yet closed at d */
  const A = [];
  for (let d = 0; d <= n; d++) {
    const s = new Set();
    for (const c of cons) if (c.closeAt > d) for (const dd of c.depths) if (dd <= d) s.add(dd);
    A.push([...s].sort((a, b) => a - b));
  }
  /* state = (X_d, (X_i)_{i in A_d}) ; multiplicity = # legal prefixes */
  let layer = new Map();
  const rootHist = [[0, 0, 0]];
  layer.set(JSON.stringify([[0, 0, 0], A[0].map(() => [0, 0, 0])]),
    { X: [0, 0, 0], hist: new Map([[0, [0, 0, 0]]]), N: 1 });
  const M = new Array(n + 1).fill(0);
  let Z = 0;
  const blockedGroups = [];                      // {d, N, w}
  for (let d = 0; d < n; d++) {
    const next = new Map();
    for (const st of layer.values()) {
      for (let c = 0; c < 3; c++) {
        const nx = st.X.slice(); nx[c]++;
        if (nx[c] > h[c]) continue;              // profile-inadmissible
        const hist = new Map(st.hist); hist.set(d + 1, nx);
        /* evaluate constraints closing at d+1 */
        let bad = false;
        for (const con of (closedAt.get(d + 1) || [])) {
          let v = [0, 0, 0], ok = true;
          for (let j = 0; j < con.depths.length; j++) {
            const x = hist.get(con.depths[j]); if (!x) { ok = false; break; }
            const a = con.coefs[j];
            v = [v[0] + a * x[0], v[1] + a * x[1], v[2] + a * x[2]];
          }
          if (!ok) throw new Error('frontier state lacks a referenced depth ' + JSON.stringify(con));
          if (con.T.has(key(v))) { bad = true; break; }
        }
        if (bad) {
          const w = cyl(h, nx);
          M[d + 1] += st.N * w;                  // CLAIM A: multiply by multiplicity
          blockedGroups.push({ d: d + 1, N: st.N, w });
          continue;
        }
        /* prune history to A_{d+1} plus current depth */
        const keep = new Map();
        for (const i of A[d + 1]) if (hist.has(i)) keep.set(i, hist.get(i));
        const k = JSON.stringify([nx, [...keep.entries()].sort((a, b) => a[0] - b[0])]);
        if (!next.has(k)) next.set(k, { X: nx, hist: keep, N: 0 });
        next.get(k).N += st.N;
      }
    }
    layer = next;
  }
  for (const st of layer.values()) Z += st.N;
  return { Z, M, blockedGroups, activeWindow: A.map(x => x.length) };
}
/* ---- randomized comparison -------------------------------------------- */
let seed = 20260829;
const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
function randomSystem(n, nCons) {
  const cons = [];
  for (let t = 0; t < nCons; t++) {
    const arity = 1 + Math.floor(rnd() * 3);
    const ds = new Set();
    while (ds.size < arity) ds.add(1 + Math.floor(rnd() * n));
    const depths = [...ds].sort((a, b) => a - b);
    const coefs = depths.map(() => [1, -2, 1, 2, -1][Math.floor(rnd() * 5)]);
    /* forbidden target set: a few random reachable-looking values */
    const T = new Set();
    const nt = 1 + Math.floor(rnd() * 2);
    for (let i = 0; i < nt; i++)
      T.add(key([Math.floor(rnd() * 5) - 2, Math.floor(rnd() * 5) - 2, Math.floor(rnd() * 5) - 2]));
    cons.push({ depths, coefs, T, closeAt: depths[depths.length - 1] });
  }
  return cons;
}

/* targeted constraints: pick a real word, forbid the value its prefixes take.
   Densely applied this drives instances to UNSAT, exercising claim F. */
function targetedSystem(h, n, words, count) {
  const cons = [];
  for (let i = 0; i < count; i++) {
    const wd = words[Math.floor(rnd() * words.length)];
    const X = prefixes(wd);
    const arity = 1 + Math.floor(rnd() * 3);
    const ds = new Set();
    while (ds.size < arity) ds.add(1 + Math.floor(rnd() * n));
    const depths = [...ds].sort((a, b) => a - b);
    const coefs = depths.map(() => [1, -2, 1][Math.floor(rnd() * 3)]);
    let v = [0, 0, 0];
    for (let j = 0; j < depths.length; j++) {
      const x = X[depths[j]], a = coefs[j];
      v = [v[0] + a * x[0], v[1] + a * x[1], v[2] + a * x[2]];
    }
    cons.push({ depths, coefs, T: new Set([key(v)]), closeAt: depths[depths.length - 1] });
  }
  return cons;
}
const PROFILES = [[3, 2, 2], [2, 3, 2], [4, 2, 1], [3, 3, 1], [2, 2, 3], [4, 3, 2]];
let trials = 0, failC = 0, failD = 0, failM = 0, failE = 0, failF = 0, sat = 0, unsat = 0;
const samples = [];
for (const h of PROFILES) {
  const n = h.reduce((a, b) => a + b, 0);
  const words = allWords(h), Wh = words.length;
  if (Wh !== multinom(n, h)) throw new Error('|W_h| mismatch');
  for (let t = 0; t < 60; t++) {
    const cons = randomSystem(n, 3 + Math.floor(rnd() * 6));
    if (t % 2 === 1) cons.push(...targetedSystem(h, n, words, 6 + Math.floor(rnd()*25)));
    /* brute force */
    const Mb = new Array(n + 1).fill(0); let Zb = 0;
    const cylByPrefix = new Map();
    let sumT = 0;
    for (const wd of words) {
      const X = prefixes(wd);
      const fh = firstHit(cons, X, n);
      if (fh === null) { Zb++; sumT += n; }
      else { Mb[fh]++; sumT += fh; }
      if (fh !== null) {
        const pk = wd.slice(0, fh);
        cylByPrefix.set(pk, (cylByPrefix.get(pk) || 0) + 1);
      }
    }
    const dag = frontierDAG(h, cons, n);
    trials++;
    if (Zb > 0) sat++; else unsat++;
    /* C: partition identity */
    const tot = dag.Z + dag.M.reduce((a, b) => a + b, 0);
    if (tot !== Wh) { failC++; if (samples.length < 3) samples.push({ kind: 'C', h, tot, Wh }); }
    /* M_d and Z agreement with brute force */
    let md = dag.Z === Zb;
    for (let d = 1; d <= n; d++) if (dag.M[d] !== Mb[d]) md = false;
    if (!md) { failM++; if (samples.length < 6) samples.push({ kind: 'M', h, dagM: dag.M, bruteM: Mb, dagZ: dag.Z, bruteZ: Zb }); }
    /* D: A_surv = E[T] */
    const mu = dag.M.map(x => x / Wh);
    let acc = 0; const S = [1];
    for (let d = 1; d <= n; d++) { acc += mu[d]; S.push(1 - acc); }
    let Asurv = 0; for (let d = 0; d <= n - 1; d++) Asurv += S[d];
    const ET = sumT / Wh;
    if (Math.abs(Asurv - ET) > 1e-9) { failD++; if (samples.length < 9) samples.push({ kind: 'D', h, Asurv, ET }); }
    /* E: N_eff from quotient groups vs from explicit first-hit prefixes */
    for (let d = 1; d <= n; d++) {
      if (dag.M[d] === 0) continue;
      let sq = 0;
      for (const g of dag.blockedGroups) if (g.d === d) sq += g.N * g.w * g.w;
      let sqBrute = 0;
      for (const [pk, cnt] of cylByPrefix) if (pk.length === d) sqBrute += cnt * cnt;
      if (sq !== sqBrute) { failE++; if (samples.length < 12) samples.push({ kind: 'E', h, d, sq, sqBrute }); break; }
    }
    /* F: Z=0 <=> UNSAT */
    if ((dag.Z === 0) !== (Zb === 0)) { failF++; }
  }
}
console.log('=== CLEAN-ROOM PHASE-II AUDIT ===');
console.log('trials: ' + trials + '   (SAT ' + sat + ' / UNSAT ' + unsat + ')');
console.log('C  Z + sum M_d = |W_h|            : ' + (failC ? 'FAIL ' + failC : 'HOLDS'));
console.log('A+B  M_d and Z match brute force  : ' + (failM ? 'FAIL ' + failM : 'HOLDS'));
console.log('D  A_surv = E[T]                  : ' + (failD ? 'FAIL ' + failD : 'HOLDS'));
console.log('E  N_eff second moment (N w^2)    : ' + (failE ? 'FAIL ' + failE : 'HOLDS'));
console.log('F  Z=0 iff UNSAT                  : ' + (failF ? 'FAIL ' + failF : 'HOLDS'));
if (samples.length) console.log('samples: ' + JSON.stringify(samples.slice(0, 4)));
require('fs').writeFileSync('../runs/v032a_phase2_cleanroom.json', JSON.stringify(
  { trials, sat, unsat, failC, failM, failD, failE, failF, samples }, null, 1));
