'use strict';
/* Package-local verifier for Appendices C and D.
 * Self-contained: builds the memory-9 window graph from first principles.
 * No external data files, no cross-worktree paths, no repository imports.
 *
 * Establishes and PRINTS every quantity claimed in Appendices C and D:
 *   C : |E_in|=180, |E_out|=180, boundary=360, |E(H)|=366, nu(H)=tau(H)=102,
 *       restricted pool 132, forced 84, residual 18 disjoint K2, redundant 12,
 *       restricted minimum 102.   Emits an explicit matching and cover.
 *   D : 22 S3 orbits all of size 6, minimum 17 orbits = 102 transitions,
 *       8 S3-optima; 11 reversal pairs, minimum 9 pairs = 18 orbits =
 *       108 transitions, 2 S3+reversal optima.
 *
 * Usage:  node verify_scissor_and_symmetry.js
 */
const fs = require('fs'), path = require('path');
const M = 9, POW = Math.pow(3, M), POWPREV = Math.pow(3, M - 1);
const wordOf = c => { const a = new Array(M); for (let k = M - 1; k >= 0; k--) { a[k] = c % 3; c = (c / 3) | 0; } return a; };
const enc = w => w.reduce((c, x) => c * 3 + x, 0);
function hasAbSq(w, lo, hi) {
  for (let K = lo; K <= hi; K++) { if (2 * K > w.length) break;
    for (let i = 0; i + 2 * K <= w.length; i++) { let d0 = 0, d1 = 0, d2 = 0;
      for (let j = 0; j < K; j++) { const c = w[i + j]; if (c === 0) d0++; else if (c === 1) d1++; else d2++; }
      for (let j = K; j < 2 * K; j++) { const c = w[i + j]; if (c === 0) d0--; else if (c === 1) d1--; else d2--; }
      if (!d0 && !d1 && !d2) return true; } }
  return false;
}
// ---- memory-9 valid states: avoid K in [2,4] --------------------------------
const idx = new Int32Array(POW).fill(-1), states = [];
for (let c = 0; c < POW; c++) if (!hasAbSq(wordOf(c), 2, 4)) { idx[c] = states.length; states.push(c); }
const N = states.length;
// ---- L4 graph (all overlaps) and the K=5 rejection classification -----------
const L4 = Array.from({ length: N }, () => []), rej311 = new Set(), rejAny = new Set();
let L4edges = 0;
for (let i = 0; i < N; i++) {
  const c = states[i], suf = c % POWPREV, w = wordOf(c);
  for (let s = 0; s < 3; s++) {
    const j = idx[suf * 3 + s]; if (j < 0) continue;
    L4[i].push(j); L4edges++;
    const w2 = w.concat([s]), p = [0, 0, 0], q = [0, 0, 0];
    for (let k = 0; k < 5; k++) p[w2[k]]++;
    for (let k = 5; k < 10; k++) q[w2[k]]++;
    if (p[0] === q[0] && p[1] === q[1] && p[2] === q[2]) { rejAny.add(i * N + j);
      if (p.slice().sort((a, b) => b - a).join() === '3,1,1') rej311.add(i * N + j); }
  }
}
// ---- L5 = L4 minus all K=5 rejected; essentialize to get CORE ---------------
const L5 = L4.map((row, i) => row.filter(j => !rejAny.has(i * N + j)));
const alive = new Uint8Array(N).fill(1);
for (;;) { let ch = false; const ind = new Int32Array(N);
  for (let i = 0; i < N; i++) { if (!alive[i]) continue; let o = 0;
    for (const j of L5[i]) if (alive[j]) { o++; ind[j]++; } if (!o) { alive[i] = 0; ch = true; } }
  for (let i = 0; i < N; i++) if (alive[i] && !ind[i]) { alive[i] = 0; ch = true; } if (!ch) break; }
const CORE = alive, LOST = []; for (let i = 0; i < N; i++) if (!CORE[i]) LOST.push(i);
const lidx = new Int32Array(N).fill(-1); LOST.forEach((v, k) => lidx[v] = k);
// ---- boundary ---------------------------------------------------------------
const Ein = [], Eout = []; let lostInternal = 0;
for (let i = 0; i < N; i++) for (const j of L4[i]) {
  if (CORE[i] && !CORE[j]) Ein.push([i, j]);
  else if (!CORE[i] && CORE[j]) Eout.push([i, j]);
  else if (!CORE[i] && !CORE[j]) lostInternal++;
}
const nL = Ein.length, nR = Eout.length;
// ---- LOST-induced DAG, reflexive reachability, and H ------------------------
const LA = LOST.map(v => L4[v].filter(j => !CORE[j]).map(j => lidx[j]));
const RCH = LOST.map(() => new Uint8Array(LOST.length));
for (let s = 0; s < LOST.length; s++) { const st = [s]; RCH[s][s] = 1;
  while (st.length) { const v = st.pop(); for (const w of LA[v]) if (!RCH[s][w]) { RCH[s][w] = 1; st.push(w); } } }
const H = Ein.map(() => []); let Hedges = 0;
for (let a = 0; a < nL; a++) { const hh = lidx[Ein[a][1]];
  for (let b = 0; b < nR; b++) if (RCH[hh][lidx[Eout[b][0]]]) { H[a].push(b); Hedges++; } }
// ---- maximum matching (Kuhn) and Konig cover --------------------------------
const mR = new Int32Array(nR).fill(-1), mL = new Int32Array(nL).fill(-1);
const aug = (u, vis) => { for (const v of H[u]) { if (vis[v]) continue; vis[v] = 1;
  if (mR[v] === -1 || aug(mR[v], vis)) { mR[v] = u; mL[u] = v; return true; } } return false; };
let nu = 0; for (let u = 0; u < nL; u++) if (aug(u, new Uint8Array(nR))) nu++;
const ZL = new Uint8Array(nL), ZR = new Uint8Array(nR), st = [];
for (let u = 0; u < nL; u++) if (mL[u] === -1) { ZL[u] = 1; st.push([0, u]); }
while (st.length) { const [side, x] = st.pop();
  if (side === 0) { for (const v of H[x]) if (mL[x] !== v && !ZR[v]) { ZR[v] = 1; st.push([1, v]); } }
  else { const u = mR[x]; if (u !== -1 && !ZL[u]) { ZL[u] = 1; st.push([0, u]); } } }
const coverL = [], coverR = [];
for (let u = 0; u < nL; u++) if (!ZL[u]) coverL.push(u);
for (let v = 0; v < nR; v++) if (ZR[v]) coverR.push(v);
const tau = coverL.length + coverR.length;
// certificate checks
let uncovered = 0; const inCL = new Uint8Array(nL), inCR = new Uint8Array(nR);
coverL.forEach(u => inCL[u] = 1); coverR.forEach(v => inCR[v] = 1);
for (let u = 0; u < nL; u++) for (const v of H[u]) if (!inCL[u] && !inCR[v]) uncovered++;
const matching = []; const usedL = new Set(), usedR = new Set(); let matchOK = true;
for (let u = 0; u < nL; u++) if (mL[u] !== -1) { const v = mL[u];
  if (usedL.has(u) || usedR.has(v) || !H[u].includes(v)) matchOK = false;
  usedL.add(u); usedR.add(v); matching.push([u, v]); }
// ---- restricted (3,1,1) pool ------------------------------------------------
const poolL = Ein.map(([i, j]) => rej311.has(i * N + j)), poolR = Eout.map(([i, j]) => rej311.has(i * N + j));
const poolSize = poolL.filter(Boolean).length + poolR.filter(Boolean).length;
const HR = Array.from({ length: nR }, () => []); for (let u = 0; u < nL; u++) for (const v of H[u]) HR[v].push(u);
const forcedL = new Uint8Array(nL), forcedR = new Uint8Array(nR);
for (let u = 0; u < nL; u++) if (poolL[u] && H[u].some(v => !poolR[v])) forcedL[u] = 1;
for (let v = 0; v < nR; v++) if (poolR[v] && HR[v].some(u => !poolL[u])) forcedR[v] = 1;
const forcedCount = forcedL.reduce((a, b) => a + b, 0) + forcedR.reduce((a, b) => a + b, 0);
// feasibility: every H-edge must have >=1 pool endpoint
let infeasible = 0; for (let u = 0; u < nL; u++) for (const v of H[u]) if (!poolL[u] && !poolR[v]) infeasible++;
// residual: H-edges with both endpoints in pool and neither forced
const resAdj = new Map(); let resEdges = 0;
for (let u = 0; u < nL; u++) { if (!poolL[u] || forcedL[u]) continue;
  for (const v of H[u]) { if (!poolR[v] || forcedR[v]) continue; resEdges++;
    const A = 'L' + u, B = 'R' + v;
    if (!resAdj.has(A)) resAdj.set(A, []); if (!resAdj.has(B)) resAdj.set(B, []);
    resAdj.get(A).push(B); resAdj.get(B).push(A); } }
const seen = new Set(), comps = [];
for (const k of resAdj.keys()) { if (seen.has(k)) continue; const q = [k]; seen.add(k); const c = [];
  while (q.length) { const x = q.pop(); c.push(x); for (const y of resAdj.get(x)) if (!seen.has(y)) { seen.add(y); q.push(y); } } comps.push(c); }
const allK2 = comps.every(c => c.length === 2);
const redundant = poolSize - forcedCount - resAdj.size;
// ---- S3 and reversal orbits on the 132-pool ---------------------------------
const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
const permS = (i, p) => idx[enc(wordOf(states[i]).map(x => p[x]))];
const revS = i => idx[enc(wordOf(states[i]).slice().reverse())];
const keyIn = new Map(Ein.map(([i, j], k) => [i * N + j, 'L' + k]));
const keyOut = new Map(Eout.map(([i, j], k) => [i * N + j, 'R' + k]));
const look = (i, j) => keyIn.get(i * N + j) || keyOut.get(i * N + j) || null;
const poolVerts = []; for (let u = 0; u < nL; u++) if (poolL[u]) poolVerts.push('L' + u);
for (let v = 0; v < nR; v++) if (poolR[v]) poolVerts.push('R' + v);
const orbOf = new Map(), orbits = [];
for (const k of poolVerts) { if (orbOf.has(k)) continue;
  const isL = k[0] === 'L', x = +k.slice(1), [i, j] = isL ? Ein[x] : Eout[x];
  const o = new Set(); for (const p of perms) { const t = look(permS(i, p), permS(j, p)); if (!t) throw new Error('S3 not closed'); o.add(t); }
  const id = orbits.length; orbits.push([...o]); for (const q of o) orbOf.set(q, id); }
const revOrb = orbits.map(o => { const k = o[0], isL = k[0] === 'L', x = +k.slice(1), [i, j] = isL ? Ein[x] : Eout[x];
  const t = look(revS(j), revS(i)); if (!t) throw new Error('reversal not closed'); return orbOf.get(t); });
const pairs = []; const seenO = new Set();
for (let o = 0; o < orbits.length; o++) { if (seenO.has(o)) continue; const r = revOrb[o]; seenO.add(o); seenO.add(r); pairs.push(r === o ? [o] : [o, r]); }
// quotient conflict graph: orbit-level edges (loops = orbit forced by non-pool partner)
const QE = new Set();
for (let u = 0; u < nL; u++) for (const v of H[u]) {
  const A = poolL[u] ? orbOf.get('L' + u) : null, B = poolR[v] ? orbOf.get('R' + v) : null;
  if (A === null && B === null) continue;
  if (A === null) QE.add(B + ':' + B); else if (B === null) QE.add(A + ':' + A);
  else QE.add(Math.min(A, B) + ':' + Math.max(A, B)); }
const Q = [...QE].map(s => s.split(':').map(Number));
const K = orbits.length;
let s3best = 99, s3cnt = 0, s3sols = [];
for (let mask = 0; mask < (1 << K); mask++) { let pc = 0; for (let b = 0; b < K; b++) if (mask >> b & 1) pc++;
  if (pc > s3best) continue; if (!Q.every(([a, b]) => (mask >> a & 1) || (mask >> b & 1))) continue;
  if (pc < s3best) { s3best = pc; s3cnt = 1; s3sols = [mask]; } else { s3cnt++; s3sols.push(mask); } }
let rvBest = 99, rvCnt = 0, rvPairs = 0;
for (let mask = 0; mask < (1 << pairs.length); mask++) { let pc = 0, np = 0; const sel = new Set();
  for (let b = 0; b < pairs.length; b++) if (mask >> b & 1) { pc += pairs[b].length; np++; pairs[b].forEach(o => sel.add(o)); }
  if (pc > rvBest) continue; if (!Q.every(([a, b]) => sel.has(a) || sel.has(b))) continue;
  if (pc < rvBest) { rvBest = pc; rvCnt = 1; rvPairs = np; } else rvCnt++; }
// ---- report -----------------------------------------------------------------
const orbSizes = [...new Set(orbits.map(o => o.length))];
const R = (label, got, want) => { const ok = String(got) === String(want);
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(46)} got ${got}  expected ${want}`); return ok; };
console.log('APPENDIX C -- excursion cover certificate');
let ok = true;
ok &= R('memory-9 valid states', N, 3114);
ok &= R('L4 edges (all overlaps)', L4edges, 6300);
ok &= R('CORE size', N - LOST.length, 2844);
ok &= R('LOST size', LOST.length, 270);
ok &= R('LOST-internal edges (L4)', lostInternal, 216);
ok &= R('|E_in|', nL, 180);
ok &= R('|E_out|', nR, 180);
ok &= R('total boundary', nL + nR, 360);
ok &= R('|E(H)|', Hedges, 366);
ok &= R('maximum matching nu(H)', nu, 102);
ok &= R('minimum vertex cover tau(H)', tau, 102);
ok &= R('cover leaves no H-edge uncovered', uncovered, 0);
ok &= R('matching is disjoint and valid', matchOK, true);
console.log('APPENDIX C -- restricted (3,1,1) pool');
ok &= R('pool size', poolSize, 132);
ok &= R('H-edges with no pool endpoint (infeasible)', infeasible, 0);
ok &= R('forced (partner outside pool)', forcedCount, 84);
ok &= R('residual components', comps.length, 18);
ok &= R('all residual components are K2', allK2, true);
ok &= R('residual edges', resEdges, 18);
ok &= R('redundant pool transitions', redundant, 12);
ok &= R('restricted minimum = forced + residual', forcedCount + comps.length, 102);
console.log('APPENDIX D -- symmetry');
ok &= R('S3 orbits on the pool', orbits.length, 22);
ok &= R('all orbit sizes equal 6', JSON.stringify(orbSizes), '[6]');
ok &= R('minimum S3 orbits', s3best, 17);
ok &= R('minimum S3 transitions (17*6)', s3best * 6, 102);
ok &= R('number of S3 optima', s3cnt, 8);
ok &= R('reversal is an involution on orbits', revOrb.every((r, o) => revOrb[r] === o), true);
ok &= R('reversal pairs', pairs.length, 11);
ok &= R('minimum reversal pairs', rvPairs, 9);
ok &= R('minimum orbits under S3+reversal', rvBest, 18);
ok &= R('minimum transitions under S3+reversal', rvBest * 6, 108);
ok &= R('number of S3+reversal optima', rvCnt, 2);
console.log(ok ? '\nALL CHECKS PASS' : '\n*** SOME CHECKS FAILED ***');
// ---- emit certificates ------------------------------------------------------
const word = i => wordOf(states[i]).map(x => 'abc'[x]).join('');
const outC = {
  generated: new Date().toISOString().slice(0, 10),
  graph: { memory: M, validStates: N, l4Edges: L4edges, core: N - LOST.length, lost: LOST.length, lostInternalEdges: lostInternal },
  boundary: { Ein: nL, Eout: nR, total: nL + nR, Hedges },
  optimum: { nu, tau },
  matching: matching.map(([u, v]) => [word(Ein[u][0]) + '->' + word(Ein[u][1]), word(Eout[v][0]) + '->' + word(Eout[v][1])]),
  cover: { left: coverL.map(u => word(Ein[u][0]) + '->' + word(Ein[u][1])), right: coverR.map(v => word(Eout[v][0]) + '->' + word(Eout[v][1])) },
  restrictedPool: { size: poolSize, forced: forcedCount, residualComponents: comps.length, allK2, redundant, minimum: forcedCount + comps.length }
};
const outD = { generated: outC.generated, s3Orbits: orbits.length, orbitSizes: orbSizes,
  minS3Orbits: s3best, minS3Transitions: s3best * 6, s3Optima: s3cnt,
  reversalPairs: pairs.length, minReversalPairs: rvPairs, minReversalOrbits: rvBest,
  minReversalTransitions: rvBest * 6, reversalOptima: rvCnt,
  orbitRepresentatives: orbits.map((o, k) => ({ orbit: k, size: o.length, reversalPartner: revOrb[k],
    representative: (() => { const q = o[0], isL = q[0] === 'L', x = +q.slice(1), [i, j] = isL ? Ein[x] : Eout[x];
      return (isL ? 'in  ' : 'out ') + word(i) + ' -> ' + word(j); })() })) };
fs.writeFileSync(path.join(__dirname, 'excursion_cover_certificate.json'), JSON.stringify(outC, null, 1));
fs.writeFileSync(path.join(__dirname, 'symmetry_orbits_certificate.json'), JSON.stringify(outD, null, 1));
console.log('\nwrote excursion_cover_certificate.json and symmetry_orbits_certificate.json');
process.exit(ok ? 0 : 1);
