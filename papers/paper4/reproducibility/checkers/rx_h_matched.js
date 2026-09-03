'use strict';
/* PHASE 3 input -- apply the RX quota rule to H by FILTERING frozen results.
 * No H re-computation: AF_EXISTS was already decided exhaustively for the whole
 * H distinct-A population (72,454), and every A in any Alist(E_i^H) lies in it.
 * That containment is VERIFIED here, fail-closed, rather than assumed. */
const fs = require('fs'), G = require('../lib/gate.js'), P = require('../lib/persist.js');
const Q = 5000;
const pools = JSON.parse(fs.readFileSync(__dirname + '/../fixtures/canonical_pools.json', 'utf8'));
const jl = p => fs.readFileSync(p, 'utf8').split(/\r?\n/).filter(x => x).map(JSON.parse);

function pre(s, cap) { const n = cap + 1, q = [new Int32Array(n), new Int32Array(n), new Int32Array(n)];
  for (let i = 0; i < s.length; i++) { for (let t = 0; t < 3; t++) q[t][i + 1] = q[t][i]; q[s.charCodeAt(i) - 97][i + 1]++; } return q; }
function endClean(q, n, km) { const k2 = Math.min(km, n >> 1);
  for (let k = 2; k <= k2; k++) { const a = n - 2 * k, b = n - k;
    if (q[0][b] - q[0][a] === q[0][n] - q[0][b] && q[1][b] - q[1][a] === q[1][n] - q[1][b] &&
        q[2][b] - q[2][a] === q[2][n] - q[2][b]) return false; } return true; }
function AlistFirst(E, Q) {
  const out = []; const qA = pre(E, 80), need = G.PROFILE.a.slice(), Aw = new Uint8Array(40); let done = false;
  (function rec(m) { if (done) return;
    if (m === 40) { out.push(Array.from(Aw).map(x => 'abc'[x]).join('')); if (out.length >= Q) done = true; return; }
    for (let c = 0; c < 3; c++) { if (!need[c]) continue; const pos = 40 + m, n = pos + 1;
      for (let t = 0; t < 3; t++) qA[t][n] = qA[t][pos]; qA[c][n]++;
      if (endClean(qA, n, 40)) { Aw[m] = c; need[c]--; rec(m + 1); need[c]++; }
      if (done) return; } })(0);
  return out;
}
const posH = jl(__dirname + '/../runs/afexBIG_H/af_positive.jsonl');
const AFPOS = new Set(posH.map(p => p.A));
const evaluated = new Set(JSON.parse(fs.readFileSync(__dirname + '/../runs/distinctA_H.json', 'utf8')));
const pairsH = jl(__dirname + '/../runs/bcdBIG_H/pairs.jsonl');
const bcd = new Map();                       // eIndex|A_sha16 -> row
for (const r of pairsH) bcd.set(r.eIndex + '|' + r.A_sha, r);

const perE = []; let notEvaluated = 0, missingBcd = 0;
for (let ei = 0; ei < pools.E.length; ei++) {
  const E = pools.E[ei], As = AlistFirst(E, Q);
  const row = { eIndex: ei, E_sha: G.sha(E).slice(0, 16), trials: As.length, atQuota: As.length === Q,
    afPositive: 0, afe: 0, both: 0, p40: 0, hits: [] };
  for (let rank = 0; rank < As.length; rank++) {
    const A = As[rank];
    if (!evaluated.has(A)) { notEvaluated++; continue; }      // fail-closed guard
    if (!AFPOS.has(A)) continue;
    row.afPositive++;
    const key = ei + '|' + G.sha(A).slice(0, 16);
    const b = bcd.get(key);
    if (!b) { missingBcd++; continue; }
    if (b.AFE_EXISTS) row.afe++;
    if (b.AF_AND_AFE_EXISTS) row.both++;
    if (b.P40) row.p40++;
    // rank is recorded so nested strata (Q=1000 etc.) are derivable by truncation
    row.hits.push({ rank, A_sha: G.sha(A).slice(0, 16), AFE: b.AFE_EXISTS,
                    both: b.AF_AND_AFE_EXISTS, P40: b.P40 });
  }
  perE.push(row);
  console.log('H E[' + ei + '] trials=' + row.trials + (row.atQuota ? ' (AT QUOTA)' : '') +
    ' afPos=' + row.afPositive + ' AFE=' + row.afe + ' BOTH=' + row.both + ' P40=' + row.p40);
}
if (notEvaluated) { console.log('FAIL-CLOSED: ' + notEvaluated + ' quota A words were NOT in the evaluated H population'); process.exit(2); }
if (missingBcd) console.log('WARNING: ' + missingBcd + ' AF-positive quota pairs had no bcd row');

/* exact-equal-exposure stratum: keep only E with at least q available, and
   count only hits at rank < q. Derivable purely by truncation. */
function stratum(rows, q, label) {
  const keep = rows.filter(r => r.trials >= q);
  return { label, quota: q, E: keep.length, trials: keep.length * q,
    afPositive: keep.reduce((a, r) => a + r.hits.filter(h => h.rank < q).length, 0),
    both: keep.reduce((a, r) => a + r.hits.filter(h => h.rank < q && h.both).length, 0),
    eWithBoth: keep.filter(r => r.hits.some(h => h.rank < q && h.both)).length };
}
const summary = {
  quota: Q, eRepresented: perE.filter(r => r.trials > 0).length,
  eAtQuota: perE.filter(r => r.atQuota).length,
  trials: perE.reduce((a, r) => a + r.trials, 0),
  afPositive: perE.reduce((a, r) => a + r.afPositive, 0),
  AFE: perE.reduce((a, r) => a + r.afe, 0),
  both: perE.reduce((a, r) => a + r.both, 0),
  P40: perE.reduce((a, r) => a + r.p40, 0),
  eWithAFpositive: perE.filter(r => r.afPositive > 0).length,
  eWithBoth: perE.filter(r => r.both > 0).length,
  notEvaluated, missingBcd
};
const strata = [stratum(perE, 5000, 'H-5000-EQ'), stratum(perE, 1000, 'H-1000-EQ')];
console.log('\nH MATCHED (Q=' + Q + '): ' + JSON.stringify(summary, null, 1));
console.log('H strata: ' + JSON.stringify(strata, null, 1));
P.writeAtomic(__dirname + '/../runs/h_matched_quota.json', { quota: Q, summary, strata, perE });
console.log('persisted -> runs/h_matched_quota.json');
