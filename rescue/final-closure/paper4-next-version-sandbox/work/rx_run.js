'use strict';
/* PHASE 2 -- exposure-matched R run, population RX.
 * Spec: PREREGISTRATION_EXPOSURE_MATCHED_R_2026-08-28.md
 * sha256 bca2780f881ac23c9057d204f2e4cbc85f67945afd758bb9ef5abbe1e8d3463c
 * Quota Q=5000 per E, deterministic Alist prefix order, AF cap 5e6 with
 * automatic re-decision at 2e9, downstream cap 2e7. Old R artifacts untouched. */
const fs = require('fs'), path = require('path');
const G = require('./gate.js'), R = require('./rng.js'), P = require('./persist.js');
const { afExists } = require('./af_exists.js');
const { stageDFS } = require('./stage_bcd.js');

const Q = 5000, AF_CAP = 5e6, AF_CAP2 = 2e9, BCD_CAP = 2e7;
const RUN = path.join(__dirname, '..', 'runs', 'afexRX2');

/* --- single-instance guard -------------------------------------------------
 * The first afexRX attempt was corrupted by two concurrent writers. Take an
 * exclusive lock (O_EXCL) and refuse to start if another run holds it. */
fs.mkdirSync(RUN, { recursive: true });
const LOCK = path.join(RUN, 'RUN.lock');
try {
  const fd = fs.openSync(LOCK, 'wx');
  fs.writeSync(fd, JSON.stringify({ pid: process.pid, startedUtc: new Date().toISOString() }));
  fs.closeSync(fd);
} catch (e) {
  console.error('REFUSING TO START: lock present at ' + LOCK + ' -> ' + fs.readFileSync(LOCK, 'utf8'));
  console.error('Another run is in progress, or a previous run did not clean up. Fail-closed.');
  process.exit(3);
}
process.on('exit', () => { try { fs.unlinkSync(LOCK); } catch (e) {} });

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
/* first Q words of Alist(E), same DFS order as dedup_A.js, early exit */
function AlistFirst(E, Q) {
  const out = []; const qA = pre(E, 80), need = G.PROFILE.a.slice(), Aw = new Uint8Array(40);
  let done = false;
  (function rec(m) { if (done) return;
    if (m === 40) { out.push(Array.from(Aw).map(x => 'abc'[x]).join('')); if (out.length >= Q) done = true; return; }
    for (let c = 0; c < 3; c++) { if (!need[c]) continue; const pos = 40 + m, n = pos + 1;
      for (let t = 0; t < 3; t++) qA[t][n] = qA[t][pos]; qA[c][n]++;
      if (endClean(qA, n, 40)) { Aw[m] = c; need[c]--; rec(m + 1); need[c]++; }
      if (done) return; } })(0);
  return out;
}
const Rs = []; { const rnd = R.mk(7788), gen = mkGenE(rnd);
  while (Rs.length < 60) { const E = gen(); if (!E || POOLE.has(E)) continue; Rs.push(E); } }

const man = { runId: 'afexRX2', kind: 'exposure-matched R (population RX): AF_EXISTS over a per-E quota',
  population: 'RX', preregSha: 'bca2780f881ac23c9057d204f2e4cbc85f67945afd758bb9ef5abbe1e8d3463c',
  quota: Q, afNodeCap: AF_CAP, afRecheckCap: AF_CAP2, bcdNodeCap: BCD_CAP,
  gateVersion: G.GATE_VERSION, eSeed: 7788, ePoolSize: 60,
  codeSha: { gate: P.fileSha('gate.js'), solver: P.fileSha('af_exists.js'),
             stages: P.fileSha('stage_bcd.js'), runner: P.fileSha(__filename) },
  host: P.host, startedUtc: new Date().toISOString(), status: 'RUNNING' };
P.writeAtomic(path.join(RUN, 'manifest.json'), man);

/* AF-positive and capped rows are rare and are fsynced per record (Appender).
 * The per-trial audit log is high-volume, so it uses a buffered stream flushed
 * at each E boundary: per-record fsync on ~75k rows dominated the voided run. */
const posOut = new P.Appender(path.join(RUN, 'af_positive.jsonl'));
const capOut = new P.Appender(path.join(RUN, 'capped.jsonl'));
const pairsFd = fs.openSync(path.join(RUN, 'af_pairs.jsonl'), 'a');
let pairsBuf = [];
const pairsOut = { write: o => { pairsBuf.push(JSON.stringify(o)); },
  flush: () => { if (pairsBuf.length) { fs.writeSync(pairsFd, pairsBuf.join('\n') + '\n'); pairsBuf = []; }
                 fs.fsyncSync(pairsFd); },
  close: () => { pairsOut.flush(); fs.closeSync(pairsFd); } };

const memo = new Map();                 // A -> {exists, witness, nodes, capped, recheckNodes}
const perE = []; let trials = 0, afPos = 0, unresolved = 0, recheck = 0;
const t0 = Date.now();
for (let ei = 0; ei < 60; ei++) {
  const E = Rs[ei], Esha = G.sha(E).slice(0, 16);
  const As = AlistFirst(E, Q);
  const row = { eIndex: ei, E_sha: Esha, asetTruncated: As.length, atQuota: As.length === Q,
                trials: 0, afPositive: 0, unresolved: 0 };
  for (let rank = 0; rank < As.length; rank++) {
    const A = As[rank]; trials++; row.trials++;
    let r = memo.get(A);
    if (r === undefined) {
      r = afExists(A, AF_CAP);
      if (r.capped) {                                  // preregistered fail-closed rule
        capOut.write({ stage: 'first', A, A_sha: G.sha(A), eIndex: ei, nodes: r.nodes, ts: new Date().toISOString() });
        recheck++;
        const r2 = afExists(A, AF_CAP2);
        r = { exists: r2.exists, witness: r2.witness, nodes: r2.nodes, capped: r2.capped, recheck: true };
        capOut.write({ stage: 'recheck', A, A_sha: G.sha(A), eIndex: ei, nodes: r2.nodes,
                       resolved: !r2.capped, exists: r2.exists, ts: new Date().toISOString() });
      }
      memo.set(A, r);
    }
    if (r.capped) { unresolved++; row.unresolved++; }
    else if (r.exists) { afPos++; row.afPositive++;
      posOut.write({ id: G.sha('RX|' + E + '|' + A), A, A_sha: G.sha(A), F_witness: r.witness,
                     eIndex: ei, E_sha: Esha, rank, nodes: r.nodes, ts: new Date().toISOString() }); }
    pairsOut.write({ eIndex: ei, E_sha: Esha, A_sha: G.sha(A).slice(0, 16), rank,
                     afPositive: r.capped ? null : r.exists, capped: !!r.capped, nodes: r.nodes });
  }
  perE.push(row);
  pairsOut.flush();                       // durable at every E boundary
  fs.writeFileSync(path.join(RUN, 'perE_partial.json'), JSON.stringify(perE, null, 1));
  console.log('E[' + ei + '] sha=' + Esha + ' trials=' + row.trials + (row.atQuota ? ' (AT QUOTA)' : '') +
              ' afPositive=' + row.afPositive + ' unresolved=' + row.unresolved +
              '  [cum ' + afPos + '/' + trials + ', ' + ((Date.now() - t0) / 60000).toFixed(1) + ' min]');
}
pairsOut.close(); posOut.close(); capOut.close();
man.summary = { population: 'RX', quota: Q, eRepresented: perE.filter(r => r.trials > 0).length,
  eAtQuota: perE.filter(r => r.atQuota).length, trials, distinctA: memo.size,
  afPositive: afPos, unresolved, cappedRechecked: recheck,
  eWithAFpositive: perE.filter(r => r.afPositive > 0).length,
  seconds: +((Date.now() - t0) / 1000).toFixed(1) };
man.perE = perE; man.status = 'AF_COMPLETED';
P.writeAtomic(path.join(RUN, 'manifest.json'), man);
console.log('\nAF PASS ' + JSON.stringify(man.summary, null, 1));
fs.writeFileSync(path.join(RUN, 'perE_af.json'), JSON.stringify(perE, null, 1));
