'use strict';
/* FEASIBILITY MEASUREMENT for the exposure-matched R preregistration.
 * Counts |Aset(E_i)| for each of the 60 frozen random non-canonical E.
 * This is OUTCOME-INDEPENDENT: it says nothing about AF_EXISTS. It exists only
 * to fix the per-E quota before the preregistration is written and hashed. */
const fs = require('fs'), G = require('./gate.js'), R = require('./rng.js');
const pools = JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json', 'utf8'));
const POOLE = new Set(pools.E);
function pre(s, cap) { const n = cap + 1, q = [new Int32Array(n), new Int32Array(n), new Int32Array(n)];
  for (let i = 0; i < s.length; i++) { for (let t = 0; t < 3; t++) q[t][i + 1] = q[t][i]; q[s.charCodeAt(i) - 97][i + 1]++; } return q; }
function endClean(q, n, km) { const k2 = Math.min(km, n >> 1);
  for (let k = 2; k <= k2; k++) { const a = n - 2 * k, b = n - k;
    if (q[0][b] - q[0][a] === q[0][n] - q[0][b] && q[1][b] - q[1][a] === q[1][n] - q[1][b] &&
        q[2][b] - q[2][a] === q[2][n] - q[2][b]) return false; } return true; }
function mkGenE(rnd) { return function () {
  const need = G.PROFILE.e.slice(), w = new Uint8Array(40);
  const q = [new Int32Array(41), new Int32Array(41), new Int32Array(41)]; let nodes = 0;
  function rec(m) { if (++nodes > 2e6) return false; if (m === 40) return true;
    const o = [0, 1, 2]; for (let i = 2; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = o[i]; o[i] = o[j]; o[j] = t; }
    for (const c of o) { if (!need[c]) continue; for (let t = 0; t < 3; t++) q[t][m + 1] = q[t][m]; q[c][m + 1]++;
      if (endClean(q, m + 1, 20)) { w[m] = c; need[c]--; if (rec(m + 1)) return true; need[c]++; } } return false; }
  return rec(0) ? Array.from(w).map(x => 'abc'[x]).join('') : null; }; }
/* count only -- identical DFS order to dedup_A.js Alist(), no storage */
function AsetCount(E) { const qA = pre(E, 80), need = G.PROFILE.a.slice(); let n = 0;
  (function rec(m) { if (m === 40) { n++; return; }
    for (let c = 0; c < 3; c++) { if (!need[c]) continue; const pos = 40 + m, nn = pos + 1;
      for (let t = 0; t < 3; t++) qA[t][nn] = qA[t][pos]; qA[c][nn]++;
      if (endClean(qA, nn, 40)) { need[c]--; rec(m + 1); need[c]++; } } })(0);
  return n; }
const Rs = []; { const rnd = R.mk(7788), gen = mkGenE(rnd);
  while (Rs.length < 60) { const E = gen(); if (!E || POOLE.has(E)) continue; Rs.push(E); } }
const rows = []; const t0 = Date.now();
for (let i = 0; i < Rs.length; i++) {
  const t1 = Date.now(); const n = AsetCount(Rs[i]);
  rows.push({ eIndex: i, E_sha: G.sha(Rs[i]).slice(0, 16), asetSize: n, seconds: +((Date.now() - t1) / 1000).toFixed(1) });
  console.log('E[' + i + '] sha=' + rows[i].E_sha + ' |Aset|=' + n + '  (' + rows[i].seconds + 's)');
}
const sizes = rows.map(r => r.asetSize).sort((a, b) => a - b);
const summary = { n: 60, min: sizes[0], max: sizes[59], median: sizes[30],
  mean: +(sizes.reduce((a, b) => a + b, 0) / 60).toFixed(1), total: sizes.reduce((a, b) => a + b, 0),
  p10: sizes[6], p25: sizes[15], seconds: +((Date.now() - t0) / 1000).toFixed(1) };
console.log('\nSUMMARY ' + JSON.stringify(summary));
fs.writeFileSync('../runs/aset_sizes_R.json', JSON.stringify({ summary, rows }, null, 1));
console.log('persisted -> runs/aset_sizes_R.json');
