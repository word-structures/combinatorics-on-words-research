'use strict';
/* TASK 6 -- ONE instrumented exact DFS solve per case.
 * Does NOT resume the deprecated per-signature greedy UNSAT-core extraction.
 *
 * Cases (all pre-existing Report-7/8 objects, no new population):
 *   R_NEARMISS   E=933c0dee15dd32a3  A=8dfaaf7687802e0f   (UNSAT, death 35)
 *   H_NEGATIVE   E=bbbbf8344484b388  A=3c206f1d7cff6e1d   (UNSAT, death 32)
 *   H_POSITIVE   E=bbbbf8344484b388  A=77b6a08e535d6dd5   (SAT)
 * H_NEGATIVE and H_POSITIVE share the same E, so they are matched on E exactly.
 */
const fs = require('fs'), G = require('./gate.js'), R = require('./rng.js');
const TB = require('./target_buckets.js');
const L = TB.L, PF = TB.PROFILE.f;
const jl = p => fs.readFileSync(p, 'utf8').split(/\r?\n/).filter(x => x).map(JSON.parse);
const pools = JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json', 'utf8'));
const POOLE = new Set(pools.E);

/* ---- regenerate the R population exactly as in Report 7/8 --------------- */
function endClean(q, n, km) { const k2 = Math.min(km, n >> 1);
  for (let k = 2; k <= k2; k++) { const a = n - 2 * k, b = n - k;
    if (q[0][b] - q[0][a] === q[0][n] - q[0][b] && q[1][b] - q[1][a] === q[1][n] - q[1][b] &&
        q[2][b] - q[2][a] === q[2][n] - q[2][b]) return false; } return true; }
function popR() { const out = []; const r2 = R.mk(7788);
  const gen = () => { const need = G.PROFILE.e.slice(), w = new Uint8Array(40);
    const q = [new Int32Array(41), new Int32Array(41), new Int32Array(41)]; let nodes = 0;
    function rec(m) { if (++nodes > 2e6) return false; if (m === 40) return true;
      const o = [0, 1, 2]; for (let i = 2; i > 0; i--) { const j = Math.floor(r2() * (i + 1)); const t = o[i]; o[i] = o[j]; o[j] = t; }
      for (const c of o) { if (!need[c]) continue; for (let t = 0; t < 3; t++) q[t][m + 1] = q[t][m]; q[c][m + 1]++;
        if (endClean(q, m + 1, 20)) { w[m] = c; need[c]--; if (rec(m + 1)) return true; need[c]++; } } return false; }
    return rec(0) ? Array.from(w).map(v => 'abc'[v]).join('') : null; };
  while (out.length < 60) { const E = gen(); if (!E || POOLE.has(E)) continue; out.push(E); } return out; }

/* ---- instrumented exact DFS -------------------------------------------- */
function instrumented(comp, cap, sampleMax) {
  const byMax = new Map();
  for (const [sig, sets] of comp.T) {
    if (sets.faf.size === 0 && sets.afe.size === 0) continue;
    const terms = comp.termsOf.get(sig);
    const mx = Math.max(...terms.map(t => t[0]));
    if (!byMax.has(mx)) byMax.set(mx, []);
    byMax.get(mx).push({ sig, terms, faf: sets.faf, afe: sets.afe });
  }
  const x = [[0, 0, 0]]; const need = PF.slice(); const w = new Uint8Array(L);
  let nodes = 0, capped = false, found = null, deepest = 0;
  const widths = new Array(L + 2).fill(0);
  const rejByDepth = new Array(L + 2).fill(0);
  const extinctByDepth = new Array(L + 2).fill(0);
  const killCount = new Map();
  const fam = { fafOnly: 0, afeOnly: 0, bothSameValue: 0 };
  const killerSets = new Map();          // sorted killer-signature tuple -> count
  const sample = [];
  (function rec(d) {
    if (found || capped) return;
    if (++nodes > cap) { capped = true; return; }
    if (d > deepest) deepest = d;
    widths[d]++;
    if (d === L) { found = Array.from(w).map(v => 'abc'[v]).join(''); return; }
    const kills = []; let anyOk = false;
    for (let c = 0; c < 3; c++) {
      if (!need[c]) continue;
      const nx = x[d].slice(); nx[c]++; x[d + 1] = nx;
      let hit = null;
      const bs = byMax.get(d + 1);
      if (bs) for (const b of bs) {
        let v = [0, 0, 0];
        for (const [dd, cc] of b.terms) { const xv = x[dd]; v = [v[0] + cc * xv[0], v[1] + cc * xv[1], v[2] + cc * xv[2]]; }
        const key = v.join(',');
        const inF = b.faf.has(key), inA = b.afe.has(key);
        if (inF || inA) { hit = { sig: b.sig, key, inF, inA, arity: b.terms.length, fafN: b.faf.size, afeN: b.afe.size }; break; }
      }
      if (hit) {
        rejByDepth[d]++;
        killCount.set(hit.sig, (killCount.get(hit.sig) || 0) + 1);
        if (hit.inF && hit.inA) fam.bothSameValue++; else if (hit.inF) fam.fafOnly++; else fam.afeOnly++;
        kills.push({ c: 'abc'[c], sig: hit.sig, value: hit.key, inFAF: hit.inF, inAFE: hit.inA,
                     arity: hit.arity, fafTargets: hit.fafN, afeTargets: hit.afeN });
      } else { anyOk = true; w[d] = c; need[c]--; rec(d + 1); need[c]++; }
      if (found || capped) return;
    }
    if (!anyOk && kills.length) {
      extinctByDepth[d]++;
      const key = kills.map(k => k.sig).sort().join(' && ');
      killerSets.set(key, (killerSets.get(key) || 0) + 1);
      if (sample.length < sampleMax) sample.push({ depth: d, prefix: Array.from(w.slice(0, d)).map(v => 'abc'[v]).join(''), kills });
    }
  })(0);
  const topKillers = [...killCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12)
    .map(([sig, n]) => ({ sig, rejections: n, arity: comp.termsOf.get(sig).length,
      fafTargets: comp.T.get(sig).faf.size, afeTargets: comp.T.get(sig).afe.size }));
  const topSets = [...killerSets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)
    .map(([k, n]) => ({ killerSignatures: k, extinctionNodes: n }));
  return { sat: found !== null, witness: found, nodes, capped, deathDepth: found ? null : deepest,
    widths: widths.slice(0, L + 1), rejectionsByDepth: rejByDepth.slice(0, L + 1),
    extinctionNodesByDepth: extinctByDepth.slice(0, L + 1),
    totalExtinctionNodes: extinctByDepth.reduce((a, b) => a + b, 0),
    rejectionFamily: fam, distinctKillerSignatures: killCount.size,
    topKillers, topKillerSets: topSets, frontierSample: sample.slice(0, 3) };
}

/* ---- static target geometry of a compiled pair ------------------------- */
function targetGeometry(comp) {
  let active = 0, shared = 0, collidingSigs = 0, collisionPairs = 0;
  let sumU = 0, sumF = 0, sumA = 0, singleton = 0;
  const uHist = {};
  for (const [sig, v] of comp.T) {
    if (!v.faf.size && !v.afe.size) continue;
    active++;
    if (v.faf.size && v.afe.size) shared++;
    let inter = 0; for (const t of v.afe) if (v.faf.has(t)) inter++;
    if (inter) { collidingSigs++; collisionPairs += inter; }
    const u = v.faf.size + v.afe.size - inter;
    sumU += u; sumF += v.faf.size; sumA += v.afe.size;
    if (u === 1) singleton++;
    uHist[u] = (uHist[u] || 0) + 1;
  }
  return { activeSignatures: active, sharedSignatures: shared,
    signaturesWithFAFAFEcollision: collidingSigs, totalCollidingTargetValues: collisionPairs,
    meanUnionTargets: +(sumU / active).toFixed(4), totalUnionTargets: sumU,
    meanFAFtargets: +(sumF / active).toFixed(4), meanAFEtargets: +(sumA / active).toFixed(4),
    singletonBuckets: singleton, multiTargetBuckets: active - singleton,
    unionSizeHistogram: uHist };
}

/* ---- run the three cases ----------------------------------------------- */
const CAP = 30000000;
const posH = jl('../runs/afexBIG_H/af_positive.jsonl');
const posR = jl('../runs/afexBIG_R/af_positive.jsonl');
const Rs = popR();
const findA = (list, sha) => { const p = list.find(x => G.sha(x.A).slice(0, 16) === sha); return p ? p.A : null; };
const findE = (list, sha) => list.find(e => G.sha(e).slice(0, 16) === sha) || null;

const CASES = [
  { label: 'R_NEARMISS', E: findE(Rs, '933c0dee15dd32a3'), A: findA(posR, '8dfaaf7687802e0f') },
  { label: 'H_NEGATIVE', E: findE(pools.E, 'bbbbf8344484b388'), A: findA(posH, '3c206f1d7cff6e1d') },
  { label: 'H_POSITIVE', E: findE(pools.E, 'bbbbf8344484b388'), A: findA(posH, '77b6a08e535d6dd5') }
];
const out = [];
for (const c of CASES) {
  if (!c.E || !c.A) { console.log('MISSING INPUT for ' + c.label + ' (E=' + !!c.E + ' A=' + !!c.A + ') -- FAIL CLOSED, skipped');
    out.push({ label: c.label, status: 'MISSING_INPUT', E_found: !!c.E, A_found: !!c.A }); continue; }
  const comp = TB.compileBuckets(c.A, c.E);
  const t0 = Date.now();
  const geo = targetGeometry(comp);
  const run = instrumented(comp, CAP, 3);
  const rec = { label: c.label, E_sha: G.sha(c.E).slice(0, 16), A_sha: G.sha(c.A).slice(0, 16),
    seconds: +((Date.now() - t0) / 1000).toFixed(1), targetGeometry: geo, solve: run };
  out.push(rec);
  console.log('--- ' + c.label + ' E=' + rec.E_sha + ' A=' + rec.A_sha);
  console.log('    sat=' + run.sat + ' death=' + run.deathDepth + ' nodes=' + run.nodes +
              ' extinctionNodes=' + run.totalExtinctionNodes + ' distinctKillers=' + run.distinctKillerSignatures);
  console.log('    rejectionFamily=' + JSON.stringify(run.rejectionFamily));
  console.log('    geo: active=' + geo.activeSignatures + ' shared=' + geo.sharedSignatures +
              ' collidingSigs=' + geo.signaturesWithFAFAFEcollision + ' collidingValues=' + geo.totalCollidingTargetValues +
              ' meanUnion=' + geo.meanUnionTargets + ' singleton=' + geo.singletonBuckets);
  console.log('    topKillers=' + JSON.stringify(run.topKillers.slice(0, 4)));
  console.log('    topKillerSets=' + JSON.stringify(run.topKillerSets.slice(0, 3)));
}
fs.writeFileSync('../runs/target_mechanism_probes.json', JSON.stringify(out, null, 1));
console.log('persisted -> runs/target_mechanism_probes.json');
