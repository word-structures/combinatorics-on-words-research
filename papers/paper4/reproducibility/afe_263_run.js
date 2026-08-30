'use strict';
/* PHASE 3/4/5 -- the 263-pair AFE_EXISTS cross-check.
 * Protocol sha256 e56c3e2d4e33df84090ad53159cb5761de80da81427ddfe726401e5d38479641
 * Population frozen before execution; not altered after any discrepancy. */
const fs = require('fs'), crypto = require('crypto');
const X = require('./afe_only_crosscheck.js');
const G = require('./gate.js');
const jl = p => fs.readFileSync(p, 'utf8').split(/\r?\n/).filter(x => x).map(JSON.parse);
const pools = JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json', 'utf8'));
const posH = jl('../runs/afexBIG_H/af_positive.jsonl');
const hM = JSON.parse(fs.readFileSync('../runs/h_matched_quota.json', 'utf8'));
const bcd = jl('../runs/bcdBIG_H/pairs.jsonl');
const CAP = 2e9;                                   // cap -> UNRESOLVED, never UNSAT
const sha = s => crypto.createHash('sha256').update(s).digest('hex');

const Amap = new Map(posH.map(p => [G.sha(p.A).slice(0, 16), p.A]));
const bcdBy = new Map(); for (const b of bcd) bcdBy.set(b.eIndex + '|' + b.A_sha, b);
const pairs = [];
for (const row of hM.perE) for (const h of row.hits) {
  const b = bcdBy.get(row.eIndex + '|' + h.A_sha), A = Amap.get(h.A_sha);
  if (!b || !A) { console.log('FAIL-CLOSED: missing input ' + row.eIndex + '|' + h.A_sha); process.exit(2); }
  pairs.push({ eIndex: row.eIndex, E_sha: row.E_sha, A_sha: h.A_sha, rank: h.rank,
    A, E: pools.E[row.eIndex], primaryAFE: b.AFE_EXISTS, joint: b.AF_AND_AFE_EXISTS });
}
if (pairs.length !== 263) { console.log('FAIL-CLOSED: population is ' + pairs.length + ', expected 263'); process.exit(2); }

const rows = []; let agree = 0, secPos = 0, unresolved = 0, witnessFail = 0, deadAFE = 0;
const t0 = Date.now();
for (let i = 0; i < pairs.length; i++) {
  const p = pairs[i];
  const comp = X.compileAFE(p.A, p.E);
  if (comp.deadAFE) deadAFE++;
  const r = X.afeOnlySolve(comp, CAP);
  let wsha = null, litOK = null;
  if (r.capped) { unresolved++; }
  else if (r.sat) {
    secPos++;
    const prof = X.profileOf(r.witness);
    const lc = X.literalAFEclean(p.A, r.witness, p.E);
    litOK = prof[0] === 19 && prof[1] === 11 && prof[2] === 10 && lc.clean;
    if (!litOK) { witnessFail++; console.log('WITNESS FAILURE at ' + p.eIndex + '|' + p.A_sha + ' ' + JSON.stringify(lc)); }
    wsha = sha(r.witness);
  }
  const secondary = r.capped ? null : r.sat;
  const match = secondary === p.primaryAFE;
  if (match) agree++;
  rows.push({ population: 'H', eIndex: p.eIndex, E_sha: p.E_sha, A_sha: p.A_sha, rank: p.rank,
    pairId: p.eIndex + '|' + p.A_sha, primaryAFE: p.primaryAFE, secondaryAFE: secondary,
    joint: p.joint, match, nodes: r.nodes, capped: r.capped, witnessSha: wsha, witnessLiteralOK: litOK });
  if (!match) {
    console.log('\n*** MISMATCH -- STOPPING ***');
    console.log(JSON.stringify({ pairId: rows[rows.length - 1].pairId, E: p.E, A: p.A,
      primaryAFE: p.primaryAFE, secondaryAFE: secondary, nodes: r.nodes, capped: r.capped }, null, 1));
    fs.writeFileSync('../runs/afe_263_MISMATCH.json', JSON.stringify({ pair: p, result: r, rows }, null, 1));
    process.exit(4);
  }
}
const secs = ((Date.now() - t0) / 1000).toFixed(1);
const summary = { total: rows.length, primaryPositive: rows.filter(r => r.primaryAFE).length,
  secondaryPositive: secPos, agreement: agree, unresolved, witnessFailures: witnessFail,
  deadAFEinstances: deadAFE, jointPositive: rows.filter(r => r.joint).length, seconds: +secs };
console.log('\n=== PHASE 3 SUMMARY ===');
console.log(JSON.stringify(summary, null, 1));
console.log('SUCCESS CONDITION (sec=86, agree=263, unresolved=0): ' +
  (secPos === 86 && agree === 263 && unresolved === 0 && witnessFail === 0));

/* PHASE 5 -- deterministic negative-side controls, re-run uncapped */
const negs = rows.filter(r => r.primaryAFE === false);
const byNodes = negs.slice().sort((a, b) => a.nodes - b.nodes);
const ctl = [negs[0], negs[negs.length - 1], byNodes[0], byNodes[byNodes.length - 1], byNodes[byNodes.length >> 1]];
console.log('\n=== PHASE 5 negative controls (uncapped re-run) ===');
const ctlOut = [];
for (const c of ctl) {
  const p = pairs.find(q => (q.eIndex + '|' + q.A_sha) === c.pairId);
  const r2 = X.afeOnlySolve(X.compileAFE(p.A, p.E), Number.MAX_SAFE_INTEGER);
  const ok = r2.sat === false && r2.capped === false;
  ctlOut.push({ pairId: c.pairId, nodes: r2.nodes, sat: r2.sat, capped: r2.capped, exhaustive: ok });
  console.log('  ' + c.pairId + '  nodes=' + r2.nodes + ' sat=' + r2.sat + ' capped=' + r2.capped + ' exhaustive=' + ok);
}
fs.writeFileSync('../runs/afe_263_crosscheck.json', JSON.stringify({ summary, negativeControls: ctlOut, rows }, null, 1));

/* CSV */
const csv = ['population,eIndex,E_sha,A_sha,rank,pairId,primary_AFE_EXISTS,secondary_AFE_EXISTS,joint_AF_AND_AFE,match,nodes,cap_status,witness_sha256,witness_literal_ok'];
for (const r of rows) csv.push(['H', r.eIndex, r.E_sha, r.A_sha, r.rank, '"' + r.pairId + '"',
  r.primaryAFE, r.secondaryAFE === null ? 'UNRESOLVED' : r.secondaryAFE, r.joint, r.match, r.nodes,
  r.capped ? 'CAPPED' : 'exact', r.witnessSha || '', r.witnessLiteralOK === null ? '' : r.witnessLiteralOK].join(','));
fs.writeFileSync('../AFE_EXISTS_263_CROSSCHECK_RESULTS_2026-08-29.csv', csv.join('\n') + '\n');
console.log('\npersisted -> runs/afe_263_crosscheck.json, AFE_EXISTS_263_CROSSCHECK_RESULTS_2026-08-29.csv');
