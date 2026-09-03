'use strict';
/* PHASE 2b -- downstream stages for population RX.
 * For every AF-positive (E,A): AFE_EXISTS, AF_AND_AFE_EXISTS, P40, cap 2e7,
 * identical semantics to Reports 7-10 (stage_bcd.stageDFS).
 * STOP CONDITION: any AF_AND_AFE_EXISTS = true is frozen and hashed at once. */
const fs = require('fs'), path = require('path');
const G = require('./gate.js'), R = require('./rng.js'), P = require('./persist.js');
const { stageDFS } = require('./stage_bcd.js');
const BCD_CAP = 2e7;
const RUN = path.join(__dirname, '..', 'runs', 'bcdRX');
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

const Rs = popR();
const pos = jl('../runs/afexRX2/af_positive.jsonl');
const man = { runId: 'bcdRX', kind: 'stages B/C/D on RX AF-positive (E,A) pairs', population: 'RX',
  preregSha: 'bca2780f881ac23c9057d204f2e4cbc85f67945afd758bb9ef5abbe1e8d3463c',
  nodeCap: BCD_CAP, unit: '(E,A) pairs whose A is AF-positive', afPositivePairs: pos.length,
  codeSha: { gate: P.fileSha('gate.js'), stages: P.fileSha('stage_bcd.js'), runner: P.fileSha(__filename) },
  host: P.host, startedUtc: new Date().toISOString(), status: 'RUNNING' };
P.writeAtomic(path.join(RUN, 'manifest.json'), man);
const out = new P.Appender(path.join(RUN, 'pairs.jsonl'));
let bAFE = 0, cBoth = 0, dP40 = 0, capped = 0; const frozen = [];
const t0 = Date.now();
for (const p of pos) {
  const E = Rs[p.eIndex], A = p.A;
  if (!E || !A) { console.log('FAIL-CLOSED: missing E/A for ' + JSON.stringify(p.A_sha)); process.exit(2); }
  const rB = stageDFS(A, E, 'AFE', BCD_CAP);
  const rC = stageDFS(A, E, 'AF_AFE', BCD_CAP);
  const rD = stageDFS(A, E, 'P40', BCD_CAP);
  if (rB.capped || rC.capped || rD.capped) capped++;
  if (rB.exists) bAFE++;
  if (rC.exists) cBoth++;
  if (rD.exists) dP40++;
  const rec = { id: G.sha('BCDRX|' + E + '|' + A), population: 'RX',
    E_sha: G.sha(E).slice(0, 16), A_sha: G.sha(A).slice(0, 16), eIndex: p.eIndex, rank: p.rank,
    AFE_EXISTS: rB.exists, AF_AND_AFE_EXISTS: rC.exists, P40: rD.exists,
    afeWitness: rB.witness || null, bothWitness: rC.witness || null, p40Witness: rD.witness || null,
    capped: rB.capped || rC.capped || rD.capped, ts: new Date().toISOString() };
  out.write(rec);
  if (rC.exists) {
    /* STOP CONDITION -- freeze and hash immediately */
    const fr = { STOP_CONDITION: 'AF_AND_AFE_EXISTS true in population RX',
      eIndex: p.eIndex, E, A, F: rC.witness,
      E_sha256: G.sha(E), A_sha256: G.sha(A), F_sha256: G.sha(rC.witness),
      triple_sha256: G.sha(E + '|' + A + '|' + rC.witness),
      P40: rD.exists, p40Witness: rD.witness || null,
      afRank: p.rank, foundUtc: new Date().toISOString() };
    frozen.push(fr);
    P.writeAtomic(path.join(RUN, 'STOP_FROZEN_TRIPLE_' + frozen.length + '.json'), fr);
    console.log('\n*** STOP CONDITION FIRED *** ' + JSON.stringify(fr, null, 1) + '\n');
  }
}
out.close();
man.status = 'COMPLETED'; man.finishedUtc = new Date().toISOString();
man.summary = { population: 'RX', afPositivePairs: pos.length, AFE_EXISTS: bAFE,
  AF_AND_AFE_EXISTS: cBoth, P40: dP40, capped, allExhaustive: capped === 0,
  stopConditionFired: frozen.length > 0, frozenTriples: frozen.length,
  seconds: +((Date.now() - t0) / 1000).toFixed(1) };
P.writeAtomic(path.join(RUN, 'manifest.json'), man);
console.log(JSON.stringify(man.summary, null, 1));
