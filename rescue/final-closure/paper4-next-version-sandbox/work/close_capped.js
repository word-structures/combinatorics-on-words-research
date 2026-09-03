'use strict';
/* POST-HOC CLOSURE of the Report-7 capped A words.
 *
 * DEFECT BEING REPAIRED: af_exists_run.js counted capped A but never persisted their IDs,
 * so the capped set must be re-identified by replaying the same deterministic scan with the
 * same cap (5,000,000).  Whenever an A caps, it is immediately re-decided with a much larger
 * cap and the outcome is persisted.
 *
 * This is POST-REGISTERED work.  It does not alter the primary preregistered result, whose
 * denominators correctly excluded capped cases.
 */
const fs = require('fs'), path = require('path');
const { afExists } = require('./af_exists.js');
const G = require('./gate.js'), P = require('./persist.js');

const pop = process.argv[2];
const LOW = +(process.argv[3] || 5000000);      // the cap used in Report 7
const HIGH = +(process.argv[4] || 2000000000);  // closure cap
const runId = process.argv[5];
const arr = JSON.parse(fs.readFileSync(`../runs/distinctA_${pop}.json`, 'utf8'));
const N = 72454;
const RUN = path.join(__dirname, '..', 'runs', runId);

const man = {
  runId: runId, kind: "POST-HOC closure of Report-7 capped A words", population: pop,
  note: "Report-7 primary result is unchanged; capped cases were correctly excluded from its denominators.",
  scan: `same deterministic prefix, indices 0..${N - 1}, low cap ${LOW}`,
  closureCap: HIGH,
  codeSha: { gate: P.fileSha('gate.js'), solver: P.fileSha('af_exists.js'), runner: P.fileSha(__filename) },
  host: P.host, startedUtc: new Date().toISOString(), status: "RUNNING"
};
P.writeAtomic(path.join(RUN, 'manifest.json'), man);
const out = new P.Appender(path.join(RUN, 'capped_resolved.jsonl'));

let cappedFound = 0, resolvedPos = 0, resolvedNeg = 0, stillCapped = 0;
const t0 = Date.now();
for (let i = 0; i < Math.min(N, arr.length); i++) {
  const A = arr[i];
  const low = afExists(A, LOW);
  if (!low.capped) continue;
  cappedFound++;
  const hi = afExists(A, HIGH);
  const rec = {
    index: i, population: pop, A: A, A_sha: G.sha(A),
    lowCap: LOW, lowCapNodes: low.nodes,
    closureCap: HIGH, closureNodes: hi.nodes,
    resolved: !hi.capped,
    AF_EXISTS: hi.capped ? null : hi.exists,
    F_witness: (!hi.capped && hi.exists) ? hi.witness : null,
    F_sha: (!hi.capped && hi.exists) ? G.sha(hi.witness) : null,
    ts: new Date().toISOString()
  };
  out.write(rec);
  if (hi.capped) stillCapped++;
  else if (hi.exists) resolvedPos++;
  else resolvedNeg++;
  console.log(`  idx ${i}: lowNodes=${low.nodes} -> ${hi.capped ? "STILL CAPPED" : (hi.exists ? "AF-POSITIVE" : "AF-negative")} (nodes ${hi.nodes})`);
}
man.status = "COMPLETED"; man.finishedUtc = new Date().toISOString();
man.summary = {
  population: pop, scanned: Math.min(N, arr.length), cappedFound: cappedFound,
  resolvedAFpositive: resolvedPos, resolvedAFnegative: resolvedNeg, stillCapped: stillCapped,
  seconds: +((Date.now() - t0) / 1000).toFixed(1)
};
P.writeAtomic(path.join(RUN, 'manifest.json'), man); out.close();
console.log(JSON.stringify(man.summary, null, 1));
