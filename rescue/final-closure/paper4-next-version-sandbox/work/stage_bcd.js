'use strict';
/* Stages B/C/D of the preregistered hierarchy, evaluated on the AF-positive A words.
 *   B. AFE_EXISTS(E,A)        : exists profile-correct F satisfying AFE K<=40
 *   C. AF_AND_AFE_EXISTS(E,A) : ... and complete-AF (FAF, K<=60)
 *   D. P40(E,A)               : ... and EAF and FEA at K<=40
 * Unit for B/C/D: (E,A) pairs whose A is AF-positive.
 * Every predicate is decided by exhaustive DFS unless the node cap is hit (recorded). */
const fs = require('fs'), path = require('path');
const G = require('./gate.js'), R = require('./rng.js'), P = require('./persist.js');
const C = require('./afe_csp.js');
const PF = C.PROFILE.f;

function endClean(q, n, km) {
  const k2 = Math.min(km, n >> 1);
  for (let k = 2; k <= k2; k++) { const a = n - 2 * k, b = n - k;
    if (q[0][b] - q[0][a] === q[0][n] - q[0][b] && q[1][b] - q[1][a] === q[1][n] - q[1][b] && q[2][b] - q[2][a] === q[2][n] - q[2][b]) return false; }
  return true;
}
const build = (v, b) => Array.from(v).map(c => b[c]).join("");
const cl = (s, k) => !G.hasSquareUpTo(s, k);

/* one DFS that can answer B, C and D in a single pass */
function stageDFS(A, E, mode, cap) {
  // mode: 'AFE' | 'AF_AFE' | 'P40'
  const cc = C.compile(A, E);
  if (cc.dead) return { exists: false, nodes: 0, capped: false, reason: "A/E-only obstruction" };
  const byMax = new Map();
  for (const b of cc.binary) { const m = Math.max(b.i, b.j); if (!byMax.has(m)) byMax.set(m, []); byMax.get(m).push(b); }
  const x = [[0, 0, 0]]; const need = PF.slice(); const w = new Uint8Array(40);
  const q2 = [new Int32Array(81), new Int32Array(81), new Int32Array(81)];
  if (mode !== 'AFE') for (let i = 0; i < 40; i++) { for (let t = 0; t < 3; t++) q2[t][i + 1] = q2[t][i]; q2[A.charCodeAt(i) - 97][i + 1]++; }
  let nodes = 0, capped = false, found = null;
  function selfClean(d) { for (let k = 2; 2 * k <= d; k++) { const a = x[d - 2 * k], b = x[d - k], c = x[d]; if (b[0] - a[0] === c[0] - b[0] && b[1] - a[1] === c[1] - b[1] && b[2] - a[2] === c[2] - b[2]) return false; } return true; }
  (function rec(d) {
    if (found || capped) return;
    if (++nodes > cap) { capped = true; return; }
    if (d === 40) {
      const F = Array.from(w).map(v => "abc"[v]).join("");
      if (mode !== 'AFE' && !G.checkAF(A, F).pass) return;
      if (mode === 'P40') {
        if (!cl(build("eaf", { a: A, e: E, f: F }), 40)) return;
        if (!cl(build("fea", { a: A, e: E, f: F }), 40)) return;
      }
      found = F; return;
    }
    for (let c = 0; c < 3; c++) {
      if (!need[c]) continue;
      const nx = x[d].slice(); nx[c]++; x[d + 1] = nx;
      let good = selfClean(d + 1);
      if (good) { const u = cc.unary.get(d + 1); if (u && u.has(x[d + 1].join(","))) good = false; }
      if (good) { const bs = byMax.get(d + 1); if (bs) for (const b of bs) { const xi = x[b.i], xj = x[b.j];
        if (b.ci * xi[0] + b.cj * xj[0] + b.C[0] === 0 && b.ci * xi[1] + b.cj * xj[1] + b.C[1] === 0 && b.ci * xi[2] + b.cj * xj[2] + b.C[2] === 0) { good = false; break; } } }
      if (good && mode !== 'AFE') { const n2 = 40 + d + 1; for (let t = 0; t < 3; t++) q2[t][n2] = q2[t][n2 - 1]; q2[c][n2]++; good = endClean(q2, n2, 60); }
      if (good) { w[d] = c; need[c]--; rec(d + 1); need[c]++; }
      if (found || capped) return;
    }
  })(0);
  return { exists: found !== null, witness: found, nodes: nodes, capped: capped };
}

/* E populations, reproduced deterministically */
function Aset(E) {
  const s = new Set();
  const q = [new Int32Array(81), new Int32Array(81), new Int32Array(81)];
  for (let i = 0; i < 40; i++) { for (let t = 0; t < 3; t++) q[t][i + 1] = q[t][i]; q[E.charCodeAt(i) - 97][i + 1]++; }
  const need = G.PROFILE.a.slice(), Aw = new Uint8Array(40);
  (function rec(m) { if (m === 40) { s.add(Array.from(Aw).map(v => "abc"[v]).join("")); return; }
    for (let c = 0; c < 3; c++) { if (!need[c]) continue; const pos = 40 + m, n = pos + 1;
      for (let t = 0; t < 3; t++) q[t][n] = q[t][pos]; q[c][n]++;
      if (endClean(q, n, 40)) { Aw[m] = c; need[c]--; rec(m + 1); need[c]++; } } })(0);
  return s;
}
function popE(which) {
  const pools = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'canonical_pools.json'), 'utf8'));
  if (which === 'H') return pools.E.slice();
  const POOLE = new Set(pools.E); const out = []; const r2 = R.mk(7788);
  const gen = () => { const need = G.PROFILE.e.slice(), w = new Uint8Array(40);
    const q = [new Int32Array(41), new Int32Array(41), new Int32Array(41)]; let nodes = 0;
    function rec(m) { if (++nodes > 2e6) return false; if (m === 40) return true;
      const o = [0, 1, 2]; for (let i = 2; i > 0; i--) { const j = Math.floor(r2() * (i + 1)); const t = o[i]; o[i] = o[j]; o[j] = t; }
      for (const c of o) { if (!need[c]) continue; for (let t = 0; t < 3; t++) q[t][m + 1] = q[t][m]; q[c][m + 1]++;
        if (endClean(q, m + 1, 20)) { w[m] = c; need[c]--; if (rec(m + 1)) return true; need[c]++; } } return false; }
    return rec(0) ? Array.from(w).map(v => "abc"[v]).join("") : null; };
  while (out.length < 60) { const E = gen(); if (!E || POOLE.has(E)) continue; out.push(E); }
  return out;
}

function run(which, posFile, runId, cap) {
  const Es = popE(which);
  const pos = fs.readFileSync(posFile, 'utf8').split(/\r?\n/).filter(x => x).map(JSON.parse);
  const Amap = new Map();
  Es.forEach((E, i) => { for (const A of Aset(E)) { if (!Amap.has(A)) Amap.set(A, []); Amap.get(A).push(i); } });
  const RUN = path.join(__dirname, '..', 'runs', runId);
  const man = { runId: runId, kind: "stages B/C/D on AF-positive A", population: which,
    afPositiveA: pos.length, nodeCap: cap, unit: "(E,A) pairs whose A is AF-positive",
    codeSha: { gate: P.fileSha('gate.js'), afe: P.fileSha('afe_csp.js'), runner: P.fileSha(__filename) },
    host: P.host, startedUtc: new Date().toISOString(), status: "RUNNING" };
  P.writeAtomic(path.join(RUN, 'manifest.json'), man);
  const out = new P.Appender(path.join(RUN, 'pairs.jsonl'));
  let pairs = 0, bAFE = 0, cBoth = 0, dP40 = 0, capped = 0;
  for (const p of pos) {
    const es = Amap.get(p.A) || [];
    for (const ei of es) {
      const E = Es[ei]; pairs++;
      const rB = stageDFS(p.A, E, 'AFE', cap);
      const rC = stageDFS(p.A, E, 'AF_AFE', cap);
      const rD = stageDFS(p.A, E, 'P40', cap);
      if (rB.capped || rC.capped || rD.capped) capped++;
      if (rB.exists) bAFE++;
      if (rC.exists) cBoth++;
      if (rD.exists) dP40++;
      out.write({ id: G.sha("BCD|" + which + "|" + E + "|" + p.A), population: which,
        E_sha: G.sha(E).slice(0, 16), A_sha: G.sha(p.A).slice(0, 16), eIndex: ei,
        AFE_EXISTS: rB.exists, AF_AND_AFE_EXISTS: rC.exists, P40: rD.exists,
        afeWitness: rB.witness || null, bothWitness: rC.witness || null, p40Witness: rD.witness || null,
        sameF: (rB.witness && rC.witness) ? (rB.witness === rC.witness) : null,
        capped: rB.capped || rC.capped || rD.capped, ts: new Date().toISOString() });
    }
  }
  man.status = "COMPLETED"; man.finishedUtc = new Date().toISOString();
  man.summary = { population: which, afPositiveA: pos.length, pairs: pairs,
    AFE_EXISTS: bAFE, AF_AND_AFE_EXISTS: cBoth, P40: dP40, capped: capped, allExhaustive: capped === 0 };
  P.writeAtomic(path.join(RUN, 'manifest.json'), man); out.close();
  console.log(JSON.stringify(man.summary, null, 1));
  return man.summary;
}
module.exports = { run, stageDFS };
if (require.main === module) run(process.argv[2], process.argv[3], process.argv[4], +(process.argv[5] || 20000000));
