'use strict';
/* Preregistered target-value census.
 * Spec: PREREGISTRATION_TARGET_VALUE_CENSUS_2026-08-28.md
 * sha256 c06c0d144c5f47de6d09eea628616f4ade0a47b6e400ec9ff24281643e8b13dc
 * Statistics S1..S10 and hypotheses H1..H4 were fixed before this ran. */
const fs = require('fs'), G = require('./gate.js'), R = require('./rng.js');
const TB = require('./target_buckets.js');
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
    return rec(0) ? Array.from(w).map(v => 'abc'[v]).join('') : null; };
  while (out.length < 60) { const E = gen(); if (!E || POOLE.has(E)) continue; out.push(E); } return out; }

/* S10: membership A in Aset(E), re-implemented from the endClean predicate */
function inAset(E, A) {
  const q = [new Int32Array(81), new Int32Array(81), new Int32Array(81)];
  for (let i = 0; i < 40; i++) { for (let t = 0; t < 3; t++) q[t][i + 1] = q[t][i]; q[E.charCodeAt(i) - 97][i + 1]++; }
  for (let m = 0; m < 40; m++) { const pos = 40 + m, n = pos + 1;
    for (let t = 0; t < 3; t++) q[t][n] = q[t][pos]; q[A.charCodeAt(m) - 97][n]++;
    if (!endClean(q, n, 40)) return false; }
  return true;
}
function stats(comp) {
  let S1 = 0, S2 = 0, S3 = 0, S4 = 0, S5 = 0, S7 = 0, S8 = 0;
  const hist = {};
  for (const [sig, v] of comp.T) {
    if (!v.faf.size && !v.afe.size) continue;
    S1++;
    if (v.faf.size && v.afe.size) S2++;
    let inter = 0; for (const t of v.afe) if (v.faf.has(t)) inter++;
    if (inter) { S3++; S4 += inter; }
    const u = v.faf.size + v.afe.size - inter;
    S5 += u; if (u === 1) S7++; if (u > S8) S8 = u;
    hist[u] = (hist[u] || 0) + 1;
  }
  return { S1, S2, S3, S4, S5, S6: +(S5 / S1).toFixed(5), S7, S8,
           S9: { deadFAF: comp.deadFAF, deadAFE: comp.deadAFE }, hist };
}
function summ(xs) { const s = xs.slice().sort((a, b) => a - b);
  return { n: s.length, min: s[0], max: s[s.length - 1],
    mean: +(s.reduce((a, b) => a + b, 0) / s.length).toFixed(4),
    median: s[s.length >> 1] }; }

const posH = jl('../runs/afexBIG_H/af_positive.jsonl');
const posR = jl('../runs/afexBIG_R/af_positive.jsonl');
const prH = jl('../runs/bcdBIG_H/pairs.jsonl');
const prR = jl('../runs/bcdBIG_R/pairs.jsonl');
const Es = { H: pools.E.slice(), R: popR() };
/* join on the SAME key stage_bcd.js used: G.sha(A).slice(0,16); the A_sha field
   stored in af_positive.jsonl uses a different convention, so recompute. */
const Amaps = { H: new Map(posH.map(p => [G.sha(p.A).slice(0, 16), p.A])),
                R: new Map(posR.map(p => [G.sha(p.A).slice(0, 16), p.A])) };

const out = { prereg_sha256: 'c06c0d144c5f47de6d09eea628616f4ade0a47b6e400ec9ff24281643e8b13dc',
  generated: new Date().toISOString(), populations: {}, hypotheses: {} };
const rows = { H: [], R: [] };
const t0 = Date.now();
for (const [pop, prs] of [['H', prH], ['R', prR]]) {
  for (const r of prs) {
    const A = Amaps[pop].get(r.A_sha), E = Es[pop][r.eIndex];
    if (!A || !E) { console.log('FAIL-CLOSED: missing input pop=' + pop + ' A=' + r.A_sha + ' eIndex=' + r.eIndex); process.exit(2); }
    const st = stats(TB.compileBuckets(A, E));
    rows[pop].push({ A_sha: r.A_sha, E_sha: r.E_sha, eIndex: r.eIndex,
      AFE: r.AFE_EXISTS, BOTH: r.AF_AND_AFE_EXISTS, P40: r.P40, ...st });
  }
}
/* S10 exposure */
const expo = {};
for (const [pop, pos] of [['H', posH], ['R', posR]]) {
  const mult = pos.map(p => Es[pop].filter(E => inAset(E, p.A)).length);
  const h = {}; for (const m of mult) h[m] = (h[m] || 0) + 1;
  expo[pop] = { AF_positive_A: pos.length, Epool: Es[pop].length, ...summ(mult), histogram: h };
}
out.S10_exposure = expo;

for (const pop of ['H', 'R']) {
  const rs = rows[pop];
  out.populations[pop] = { pairs: rs.length,
    S1: summ(rs.map(r => r.S1)), S2: summ(rs.map(r => r.S2)),
    S3: summ(rs.map(r => r.S3)), S4: summ(rs.map(r => r.S4)),
    S5: summ(rs.map(r => r.S5)), S6: summ(rs.map(r => r.S6)),
    S7: summ(rs.map(r => r.S7)), S8: summ(rs.map(r => r.S8)),
    deadAny: rs.filter(r => r.S9.deadFAF || r.S9.deadAFE).length };
}
/* H1 */
const bad1 = [...rows.H, ...rows.R].filter(r => r.S1 !== 1560 || r.S2 !== 1160);
out.hypotheses.H1_skeleton_invariance = { supported: bad1.length === 0, violations: bad1.length,
  sample: bad1.slice(0, 3).map(r => ({ A: r.A_sha, E: r.E_sha, S1: r.S1, S2: r.S2 })) };
/* H2: disjoint ranges required */
const h4 = rows.H.map(r => r.S4), r4 = rows.R.map(r => r.S4);
const h3 = rows.H.map(r => r.S3), r3 = rows.R.map(r => r.S3);
const disjoint = (a, b) => Math.min(...b) > Math.max(...a) || Math.min(...a) > Math.max(...b);
out.hypotheses.H2_collision_discriminator = {
  S4_H: summ(h4), S4_R: summ(r4), S3_H: summ(h3), S3_R: summ(r3),
  rangesDisjoint_S4: disjoint(h4, r4), rangesDisjoint_S3: disjoint(h3, r3),
  supported: disjoint(h4, r4) };
/* H3 */
const hp = rows.H.filter(r => r.BOTH).map(r => r.S4), hn = rows.H.filter(r => !r.BOTH).map(r => r.S4);
out.hypotheses.H3_no_within_H_separation = { S4_H_positive: summ(hp), S4_H_negative: summ(hn),
  rangesOverlap: !disjoint(hp, hn), supported: !disjoint(hp, hn) };
/* H4 */
out.hypotheses.H4_exposure = { H_mean: expo.H.mean, R_mean: expo.R.mean,
  supported: expo.H.mean > 1 && expo.R.mean === 1 };
out.seconds = +((Date.now() - t0) / 1000).toFixed(1);
fs.writeFileSync('../runs/target_census.json', JSON.stringify({ ...out, rows }, null, 1));

console.log(JSON.stringify({ populations: out.populations, S10_exposure: out.S10_exposure, hypotheses: out.hypotheses, seconds: out.seconds }, null, 1));
