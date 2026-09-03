'use strict';
/* PHASE 4 -- reachability mechanism.
 * Selection rule: PHASE4_SELECTION_RULE_2026-08-28.md
 * sha256 c3a570a1c26ac24fd495b9961a4d4d4215e62cded97fab64aabf32a081db5518
 * Modes:  --scan   instrument every RX AF-positive pair (for branch R2)
 *         --cases  detailed instrumentation of the three selected cases
 * Does NOT resume the deprecated per-signature greedy UNSAT-core extraction. */
const fs = require('fs'), G = require('./gate.js'), R = require('./rng.js'), P = require('./persist.js');
const TB = require('./target_buckets.js');
const L = TB.L, PF = TB.PROFILE.f, CAP = 3e7;
const jl = p => fs.readFileSync(p, 'utf8').split(/\r?\n/).filter(x => x).map(JSON.parse);
const pools = JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json', 'utf8'));
const POOLE = new Set(pools.E);
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
    return rec(0) ? Array.from(w).map(x => 'abc'[x]).join('') : null; };
  while (out.length < 60) { const E = gen(); if (!E || POOLE.has(E)) continue; out.push(E); } return out; }

/* instrumented exact DFS over F, with Phase-4 measurements 1..7 */
function instrument(comp, detail) {
  const byMax = new Map();
  for (const [sig, sets] of comp.T) {
    if (!sets.faf.size && !sets.afe.size) continue;
    const terms = comp.termsOf.get(sig);
    const mx = Math.max(...terms.map(t => t[0]));
    if (!byMax.has(mx)) byMax.set(mx, []);
    byMax.get(mx).push({ sig, terms, faf: sets.faf, afe: sets.afe });
  }
  const x = [[0, 0, 0]]; const need = PF.slice(); const w = new Uint8Array(L);
  let nodes = 0, capped = false, found = null, deepest = 0;
  const extinctByDepth = new Array(L + 2).fill(0);
  const killCount = new Map(), arity = { 1: 0, 2: 0, 3: 0 };
  const fam = { fafOnly: 0, afeOnly: 0, bothSameValue: 0 };
  const valHist = new Map();
  let deepestNode = null;
  (function rec(d) {
    if (found || capped) return;
    if (++nodes > CAP) { capped = true; return; }
    if (d > deepest) deepest = d;
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
        if (inF || inA) { hit = { sig: b.sig, key, inF, inA, arity: b.terms.length,
          fafN: b.faf.size, afeN: b.afe.size }; break; }
      }
      if (hit) {
        killCount.set(hit.sig, (killCount.get(hit.sig) || 0) + 1);
        arity[hit.arity]++;
        if (hit.inF && hit.inA) fam.bothSameValue++; else if (hit.inF) fam.fafOnly++; else fam.afeOnly++;
        valHist.set(hit.key, (valHist.get(hit.key) || 0) + 1);
        kills.push({ letter: 'abc'[c], sig: hit.sig, value: hit.key, arity: hit.arity,
          inFAF: hit.inF, inAFE: hit.inA, fafTargets: hit.fafN, afeTargets: hit.afeN });
      } else { anyOk = true; w[d] = c; need[c]--; rec(d + 1); need[c]++; }
      if (found || capped) return;
    }
    if (!anyOk && kills.length) {
      extinctByDepth[d]++;
      if (!deepestNode || d > deepestNode.depth) {
        deepestNode = { depth: d,
          prefix: Array.from(w.slice(0, d)).map(v => 'abc'[v]).join(''),
          prefixParikh: x[d].slice(), remainingProfile: need.slice(), kills };
      }
    }
  })(0);
  const res = { sat: found !== null, nodes, capped, deathDepth: found ? null : deepest,
    totalExtinctionNodes: extinctByDepth.reduce((a, b) => a + b, 0),
    distinctKillers: killCount.size, killerArity: arity, rejectionFamily: fam };
  if (detail) {
    res.extinctionByDepth = extinctByDepth.slice(0, L + 1);
    res.prefixStateBeforeFinalExtinction = deepestNode;
    res.topKillers = [...killCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)
      .map(([sig, n]) => ({ sig, rejections: n, arity: comp.termsOf.get(sig).length,
        fafTargets: comp.T.get(sig).faf.size, afeTargets: comp.T.get(sig).afe.size }));
    res.topTargetValues = [...valHist.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6)
      .map(([v, n]) => ({ value: v, kills: n }));
  }
  return res;
}

const MODE = process.argv[2] || '--scan';
const Rs = popR();
const rxPos = jl('../runs/afexRX2/af_positive.jsonl');

if (MODE === '--scan') {
  const rows = [];
  for (const p of rxPos) {
    const E = Rs[p.eIndex], A = p.A;
    const comp = TB.compileBuckets(A, E);
    const r = instrument(comp, false);
    rows.push({ eIndex: p.eIndex, rank: p.rank, A_sha: p.A_sha.slice(0, 16),
      sat: r.sat, deathDepth: r.deathDepth, nodes: r.nodes, capped: r.capped,
      extinctionNodes: r.totalExtinctionNodes, distinctKillers: r.distinctKillers });
    console.log('RX e=' + p.eIndex + ' rank=' + p.rank + ' sat=' + r.sat +
      ' death=' + r.deathDepth + ' nodes=' + r.nodes + (r.capped ? ' CAPPED' : ''));
  }
  P.writeAtomic('../runs/rx_reach_scan.json', { cap: CAP, rows });
  const un = rows.filter(r => !r.sat && !r.capped);
  un.sort((a, b) => b.deathDepth - a.deathDepth || a.eIndex - b.eIndex || a.rank - b.rank);
  console.log('\ndeepest-surviving RX unsat case (branch R2): ' + JSON.stringify(un[0]));
  console.log('capped: ' + rows.filter(r => r.capped).length + '  sat: ' + rows.filter(r => r.sat).length);
} else {
  /* --cases: three selected cases, full detail */
  const sel = JSON.parse(fs.readFileSync('../runs/phase4_selected.json', 'utf8'));
  const posH = jl('../runs/afexBIG_H/af_positive.jsonl');
  const Amap = new Map(posH.map(p => [G.sha(p.A).slice(0, 16), p.A]));
  const out = [];
  for (const c of sel.cases) {
    if (c.status === 'ABSENT') { out.push(c); console.log(c.label + ': ABSENT'); continue; }
    const E = c.population === 'RX' ? Rs[c.eIndex] : pools.E[c.eIndex];
    const A = c.population === 'RX'
      ? (rxPos.find(p => p.eIndex === c.eIndex && p.rank === c.rank) || {}).A
      : Amap.get(c.A_sha);
    if (!E || !A) { console.log('FAIL-CLOSED: missing E/A for ' + c.label); process.exit(2); }
    const comp = TB.compileBuckets(A, E);
    let active = 0, shared = 0, coll = 0, collV = 0;
    for (const [s, v] of comp.T) { if (!v.faf.size && !v.afe.size) continue; active++;
      if (v.faf.size && v.afe.size) shared++;
      let n = 0; for (const t of v.afe) if (v.faf.has(t)) n++;
      if (n) { coll++; collV += n; } }
    const r = instrument(comp, true);
    out.push({ ...c, E_sha: G.sha(E).slice(0, 16), A_sha: G.sha(A).slice(0, 16),
      staticControls: { activeSignatures: active, sharedSignatures: shared,
        collidingSignatures: coll, collidingTargetValues: collV }, solve: r });
    console.log('--- ' + c.label + ' sat=' + r.sat + ' death=' + r.deathDepth +
      ' nodes=' + r.nodes + ' extinction=' + r.totalExtinctionNodes +
      ' arity=' + JSON.stringify(r.killerArity) + ' fam=' + JSON.stringify(r.rejectionFamily));
    if (r.prefixStateBeforeFinalExtinction)
      console.log('    prefix before final extinction: ' + JSON.stringify(r.prefixStateBeforeFinalExtinction).slice(0, 500));
  }
  P.writeAtomic('../runs/reach_mechanism_traces.json', { selectionRuleSha: 'c3a570a1c26ac24fd495b9961a4d4d4215e62cded97fab64aabf32a081db5518', cases: out });
  console.log('persisted -> runs/reach_mechanism_traces.json');
}
