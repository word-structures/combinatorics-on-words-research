'use strict';
/* FRESH (non-canonical) E -> exhaustive A -> exhaustive F, with FULL CAP ACCOUNTING.
 * Deterministic re-run of freshE_s7788 with the defect fixed: this version records
 * A-level AND F-level cap events for EVERY E (the previous runner tracked the F cap
 * in a dropped local and logged A-capping only every 10th E, so exhaustiveness could
 * not be asserted from its persisted output).
 *
 * Search domain per E:
 *   A : ALL words of length 40 with Parikh (15,14,11), pruned incrementally on E.A (K<=40)
 *   F : ALL words of length 40 with Parikh (19,11,10), pruned incrementally on E.A.F (K<=40)
 * Acceptance: H(faf) clean K<=60  AND  H(eafea), H(fafea) clean K<=40.
 *
 * Usage: node freshE_exhaustive.js <runId> <seed> <numE> <aCap> <fCap>
 */
const fs = require('fs'), path = require('path');
const G = require('./gate.js'), P = require('./persist.js'), R = require('./rng.js');

const runId = process.argv[2], seed = +process.argv[3], NUME = +process.argv[4];
const ACAP = +process.argv[5], FCAP = +process.argv[6];
const RUN = path.join(__dirname, '..', 'runs', runId);
const rnd = R.mk(seed);
const pools = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'canonical_pools.json'), 'utf8'));
const POOLA = new Set(pools.A), POOLE = new Set(pools.E), POOLF = new Set(pools.F), POOLT = new Set(pools.tripleIds);

const manifest = {
  runId, kind: "fresh non-canonical E -> exhaustive A -> exhaustive F (full cap accounting)",
  gateVersion: G.GATE_VERSION, seed, numERequested: NUME, aCap: ACAP, fCap: FCAP,
  profiles: { A: G.PROFILE.a, E: G.PROFILE.e, F: G.PROFILE.f },
  searchDomain: "E: seeded DFS over Parikh(13,16,11), abelian-square-free K<=20, rejected if in the canonical 9. " +
    "A: ENTIRE Parikh(15,14,11) class, pruned on E.A (K<=40). " +
    "F: ENTIRE Parikh(19,11,10) class, pruned on E.A.F (K<=40).",
  acceptance: { completeAF_K: [2, 60], aefK40: [2, 40], covers: { AF: G.AF_COVER, AEF: G.AEF_COVER } },
  capAccounting: "aCapped recorded per E; fCapEvents counted globally and per E; exhaustive iff both are zero",
  codeSha: {
    gate: P.fileSha(path.join(__dirname, 'gate.js')), runner: P.fileSha(__filename),
    persist: P.fileSha(path.join(__dirname, 'persist.js')), rng: P.fileSha(path.join(__dirname, 'rng.js'))
  },
  host: P.host, startedUtc: new Date().toISOString(), status: "RUNNING"
};
P.writeAtomic(path.join(RUN, 'manifest.json'), manifest);
const hits = new P.Appender(path.join(RUN, 'aef40_hits.jsonl'));
const perE = new P.Appender(path.join(RUN, 'per_e.jsonl'));

function endClean(q, n, kmax) {
  const km = Math.min(kmax, n >> 1);
  for (let k = 2; k <= km; k++) {
    const a = n - 2 * k, b = n - k;
    if (q[0][b] - q[0][a] === q[0][n] - q[0][b] &&
        q[1][b] - q[1][a] === q[1][n] - q[1][b] &&
        q[2][b] - q[2][a] === q[2][n] - q[2][b]) return false;
  }
  return true;
}
function genE() {
  const need = G.PROFILE.e.slice(), w = new Uint8Array(40);
  const q = [new Int32Array(41), new Int32Array(41), new Int32Array(41)];
  let nodes = 0;
  function rec(m) {
    if (++nodes > 2e6) return false;
    if (m === 40) return true;
    const o = [0, 1, 2];
    for (let i = 2; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = o[i]; o[i] = o[j]; o[j] = t; }
    for (const c of o) {
      if (!need[c]) continue;
      for (let t = 0; t < 3; t++) q[t][m + 1] = q[t][m];
      q[c][m + 1]++;
      if (endClean(q, m + 1, 20)) { w[m] = c; need[c]--; if (rec(m + 1)) return true; need[c]++; }
    }
    return false;
  }
  return rec(0) ? Array.from(w).map(x => "abc"[x]).join("") : null;
}

let eSeen = 0, eDup = 0, eCanonicalSkipped = 0, found = 0, newT = 0, disjoint = 0;
let gACapped = 0, gFCapEvents = 0, gMaxA = 0, gMaxF = 0;
const eIds = new Set();
const t0 = Date.now();

for (let ei = 0; ei < NUME; ei++) {
  const E = genE();
  if (!E) continue;
  if (POOLE.has(E)) { eCanonicalSkipped++; continue; }      // must be NON-canonical
  const eid = G.sha("E|" + E);
  if (eIds.has(eid)) { eDup++; continue; }
  eIds.add(eid); eSeen++;

  const qA = [new Int32Array(81), new Int32Array(81), new Int32Array(81)];
  for (let i = 0; i < 40; i++) { for (let t = 0; t < 3; t++) qA[t][i + 1] = qA[t][i]; qA[E.charCodeAt(i) - 97][i + 1]++; }
  const needA = G.PROFILE.a.slice(), Aw = new Uint8Array(40);
  let aNodes = 0, aCapped = false, aComplete = 0, fCapThisE = 0, maxFThisE = 0, hitsThisE = 0;

  (function recA(m) {
    if (++aNodes > ACAP) { aCapped = true; return; }
    if (m === 40) {
      aComplete++;
      const A = Array.from(Aw).map(x => "abc"[x]).join("");
      const qF = [new Int32Array(121), new Int32Array(121), new Int32Array(121)];
      const EA = E + A;
      for (let i = 0; i < 80; i++) { for (let t = 0; t < 3; t++) qF[t][i + 1] = qF[t][i]; qF[EA.charCodeAt(i) - 97][i + 1]++; }
      const needF = G.PROFILE.f.slice(), Fw = new Uint8Array(40);
      let fNodes = 0, fCapped = false;
      (function recF(m2) {
        if (++fNodes > FCAP) { fCapped = true; return; }
        if (m2 === 40) {
          const F = Array.from(Fw).map(x => "abc"[x]).join("");
          if (!G.checkAF(A, F).pass) return;
          for (const v of G.AEF_COVER) if (G.hasSquareUpTo(G.build(v, { a: A, e: E, f: F }), 40)) return;
          const tid = G.aefId(A, E, F);
          const isNew = !POOLT.has(tid);
          const dj = !POOLA.has(A) && !POOLE.has(E) && !POOLF.has(F);
          const rec3 = {
            id: tid, kind: "AEF_CLEAN_K40", A, E, F,
            gateVersion: G.GATE_VERSION, aefK: [2, 40], afK: [2, 60],
            overlap: { A_in_old8: POOLA.has(A), E_in_old9: POOLE.has(E), F_in_old7: POOLF.has(F), inCanonical39: !isNew, strictDisjoint: dj },
            provenance: { runId, seed, eIndex: ei, method: "fresh non-canonical E -> exhaustive A -> exhaustive F" },
            A_sha: G.sha(A), E_sha: G.sha(E), F_sha: G.sha(F), ts: new Date().toISOString()
          };
          if (hits.write(rec3)) { found++; hitsThisE++; if (isNew) newT++; if (dj) disjoint++; }
          return;
        }
        for (let c = 0; c < 3; c++) {
          if (!needF[c]) continue;
          const pos = 80 + m2, n = pos + 1;
          for (let t = 0; t < 3; t++) qF[t][n] = qF[t][pos];
          qF[c][n]++;
          if (endClean(qF, n, 40)) { Fw[m2] = c; needF[c]--; recF(m2 + 1); needF[c]++; }
          if (fCapped) return;
        }
      })(0);
      if (fCapped) { fCapThisE++; gFCapEvents++; }
      if (fNodes > maxFThisE) maxFThisE = fNodes;
      return;
    }
    for (let c = 0; c < 3; c++) {
      if (!needA[c]) continue;
      const pos = 40 + m, n = pos + 1;
      for (let t = 0; t < 3; t++) qA[t][n] = qA[t][pos];
      qA[c][n]++;
      if (endClean(qA, n, 40)) { Aw[m] = c; needA[c]--; recA(m + 1); needA[c]++; }
      if (aCapped) return;
    }
  })(0);

  if (aCapped) gACapped++;
  if (aNodes > gMaxA) gMaxA = aNodes;
  if (maxFThisE > gMaxF) gMaxF = maxFThisE;
  perE.write({
    ei, eId: eid.slice(0, 16), E_sha: G.sha(E), aNodes, aComplete, aCapped,
    fCapEvents: fCapThisE, maxFNodes: maxFThisE,
    exhaustive: (!aCapped && fCapThisE === 0), aefK40Hits: hitsThisE,
    ts: new Date().toISOString()
  });
}

manifest.status = "COMPLETED";
manifest.finishedUtc = new Date().toISOString();
manifest.summary = {
  eExamined: eSeen, eDuplicates: eDup, eCanonicalSkipped,
  aefK40Hits: found, notInCanonical39: newT, strictDisjointTriples: disjoint,
  eWithACapped: gACapped, fLevelCapEvents: gFCapEvents,
  maxANodes: gMaxA, maxFNodes: gMaxF, aCap: ACAP, fCap: FCAP,
  exhaustiveOverFullAandFProfileClasses: (gACapped === 0 && gFCapEvents === 0),
  seconds: +((Date.now() - t0) / 1000).toFixed(1)
};
P.writeAtomic(path.join(RUN, 'manifest.json'), manifest);
hits.close(); perE.close();
console.log(JSON.stringify(manifest.summary, null, 1));
