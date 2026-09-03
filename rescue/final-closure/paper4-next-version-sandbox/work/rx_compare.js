'use strict';
/* PHASE 3 -- matched comparison RX vs quota-matched H.
 * No post-hoc thresholds. Finite-population counts only; nothing is called a
 * probability. Strata are derived by rank truncation, exactly as preregistered. */
const fs = require('fs'), P = require('./persist.js');
const jl = p => fs.readFileSync(p, 'utf8').split(/\r?\n/).filter(x => x).map(JSON.parse);

const rxMan = JSON.parse(fs.readFileSync('../runs/afexRX2/manifest.json', 'utf8'));
const rxPerE = JSON.parse(fs.readFileSync('../runs/afexRX2/perE_af.json', 'utf8'));
const rxPos = jl('../runs/afexRX2/af_positive.jsonl');
const rxBcd = jl('../runs/bcdRX/pairs.jsonl');
const hM = JSON.parse(fs.readFileSync('../runs/h_matched_quota.json', 'utf8'));
const rSizes = JSON.parse(fs.readFileSync('../runs/aset_sizes_R.json', 'utf8')).rows;

/* attach downstream verdicts to RX AF-positive rows by (eIndex, rank) */
const bcdBy = new Map();
for (const b of rxBcd) bcdBy.set(b.eIndex + '|' + b.rank, b);
const rxHits = new Map();                       // eIndex -> [{rank, AFE, both, P40}]
for (const p of rxPos) {
  const b = bcdBy.get(p.eIndex + '|' + p.rank);
  if (!rxHits.has(p.eIndex)) rxHits.set(p.eIndex, []);
  rxHits.get(p.eIndex).push({ rank: p.rank, A_sha: p.A_sha.slice(0, 16),
    AFE: b ? b.AFE_EXISTS : null, both: b ? b.AF_AND_AFE_EXISTS : null, P40: b ? b.P40 : null,
    bcdMissing: !b });
}
const missing = [...rxHits.values()].flat().filter(h => h.bcdMissing).length;
if (missing) console.log('FAIL-CLOSED WARNING: ' + missing + ' RX AF-positive rows have no downstream verdict');

/* RX per-E rows in H's shape */
const rxRows = rxPerE.map(r => ({ eIndex: r.eIndex, E_sha: r.E_sha, trials: r.trials,
  atQuota: r.atQuota, afPositive: r.afPositive, unresolved: r.unresolved,
  hits: rxHits.get(r.eIndex) || [] }));
for (const r of rxRows) {
  r.afe = r.hits.filter(h => h.AFE).length;
  r.both = r.hits.filter(h => h.both).length;
  r.p40 = r.hits.filter(h => h.P40).length;
}
function stratum(rows, q, label) {
  const keep = rows.filter(r => r.trials >= q);
  return { label, quota: q, E: keep.length, trials: keep.length * q,
    afPositive: keep.reduce((a, r) => a + r.hits.filter(h => h.rank < q).length, 0),
    AFE: keep.reduce((a, r) => a + r.hits.filter(h => h.rank < q && h.AFE).length, 0),
    both: keep.reduce((a, r) => a + r.hits.filter(h => h.rank < q && h.both).length, 0),
    eWithAF: keep.filter(r => r.hits.some(h => h.rank < q)).length,
    eWithBoth: keep.filter(r => r.hits.some(h => h.rank < q && h.both)).length };
}
const tot = rows => ({
  E_represented: rows.filter(r => r.trials > 0).length,
  E_atQuota: rows.filter(r => r.atQuota).length,
  trials: rows.reduce((a, r) => a + r.trials, 0),
  afPositive: rows.reduce((a, r) => a + r.afPositive, 0),
  AFE: rows.reduce((a, r) => a + r.afe, 0),
  both: rows.reduce((a, r) => a + r.both, 0),
  P40: rows.reduce((a, r) => a + r.p40, 0),
  eWithAF: rows.filter(r => r.afPositive > 0).length,
  eWithBoth: rows.filter(r => r.both > 0).length,
  unresolved: rows.reduce((a, r) => a + (r.unresolved || 0), 0)
});
const hRows = hM.perE.map(r => ({ ...r, unresolved: 0 }));
const out = {
  prereg_sha256: 'bca2780f881ac23c9057d204f2e4cbc85f67945afd758bb9ef5abbe1e8d3463c',
  quota: 5000,
  RX: { CAP: tot(rxRows), strata: [stratum(rxRows, 5000, 'RX-5000-EQ'), stratum(rxRows, 1000, 'RX-1000-EQ')] },
  H: { CAP: tot(hRows), strata: [stratum(hRows, 5000, 'H-5000-EQ'), stratum(hRows, 1000, 'H-1000-EQ')] },
  oldR_forContrast: { note: 'Report-7 R: single E, 72,454 A trials, 58 AF-positive, 0 AF_AND_AFE. NOT 60 E.' },
  perE: { RX: rxRows, H: hRows }
};
console.log('=== RX (capped quota 5000) ===\n' + JSON.stringify(out.RX.CAP, null, 1));
console.log('=== H  (capped quota 5000) ===\n' + JSON.stringify(out.H.CAP, null, 1));
console.log('=== strata ===\n' + JSON.stringify({ RX: out.RX.strata, H: out.H.strata }, null, 1));
P.writeAtomic('../runs/rx_vs_h_comparison.json', out);

/* per-E CSV */
const csv = ['population,eIndex,E_sha,asetSize,trials,atQuota,afPositive,AFE,AF_AND_AFE,P40,unresolved'];
for (const r of rxRows) csv.push(['RX', r.eIndex, r.E_sha, rSizes[r.eIndex].asetSize, r.trials, r.atQuota,
  r.afPositive, r.afe, r.both, r.p40, r.unresolved].join(','));
for (const r of hRows) csv.push(['H', r.eIndex, r.E_sha, '', r.trials, r.atQuota,
  r.afPositive, r.afe, r.both, r.p40, 0].join(','));
fs.writeFileSync('../runs/rx_vs_h_perE.csv', csv.join('\n') + '\n');
console.log('persisted -> runs/rx_vs_h_comparison.json, runs/rx_vs_h_perE.csv');
