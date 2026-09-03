'use strict';
/* §6 — structural comparison of any R-side AF_AND_AFE_EXISTS survivor against H-side
   survivors.  Reports, per survivor: E, A, all complete-AF F, the AFE witness F,
   whether one F serves both, and the first EAF/FEA failure when P40 still fails. */
const fs = require('fs'), path = require('path');
const G = require('./gate.js');
const C = require('./afe_csp.js');
const build = (v, b) => Array.from(v).map(c => b[c]).join("");
const cl = (s, k) => !G.hasSquareUpTo(s, k);

function endClean(q, n, km) {
  const k2 = Math.min(km, n >> 1);
  for (let k = 2; k <= k2; k++) { const a = n - 2 * k, b = n - k;
    if (q[0][b] - q[0][a] === q[0][n] - q[0][b] && q[1][b] - q[1][a] === q[1][n] - q[1][b] && q[2][b] - q[2][a] === q[2][n] - q[2][b]) return false; }
  return true;
}
/* every complete-AF F for a given A (exhaustive) */
function allCompleteAF(A, cap) {
  const q1 = [new Int32Array(41), new Int32Array(41), new Int32Array(41)];
  const q2 = [new Int32Array(81), new Int32Array(81), new Int32Array(81)];
  for (let i = 0; i < 40; i++) { for (let t = 0; t < 3; t++) q2[t][i + 1] = q2[t][i]; q2[A.charCodeAt(i) - 97][i + 1]++; }
  const need = G.PROFILE.f.slice(), Fw = new Uint8Array(40); const out = []; let nodes = 0, capped = false;
  (function rec(m) {
    if (capped) return;
    if (++nodes > cap) { capped = true; return; }
    if (m === 40) { const F = Array.from(Fw).map(v => "abc"[v]).join(""); if (G.checkAF(A, F).pass) out.push(F); return; }
    for (let c = 0; c < 3; c++) { if (!need[c]) continue;
      for (let t = 0; t < 3; t++) q1[t][m + 1] = q1[t][m]; q1[c][m + 1]++;
      const n2 = 40 + m + 1; for (let t = 0; t < 3; t++) q2[t][n2] = q2[t][n2 - 1]; q2[c][n2]++;
      if (endClean(q1, m + 1, 20) && endClean(q2, n2, 60)) { Fw[m] = c; need[c]--; rec(m + 1); need[c]++; }
      if (capped) return; } })(0);
  return { F: out, capped: capped };
}
function firstBadK(s, kmax) {
  const n = s.length;
  const P0 = new Int32Array(n + 1), P1 = new Int32Array(n + 1), P2 = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) { P0[i + 1] = P0[i]; P1[i + 1] = P1[i]; P2[i + 1] = P2[i];
    const c = s.charCodeAt(i) - 97; if (c === 0) P0[i + 1]++; else if (c === 1) P1[i + 1]++; else P2[i + 1]++; }
  for (let k = 2; k <= kmax && 2 * k <= n; k++) for (let i = 0; i + 2 * k <= n; i++)
    if (P0[i + k] - P0[i] === P0[i + 2 * k] - P0[i + k] && P1[i + k] - P1[i] === P1[i + 2 * k] - P1[i + k] && P2[i + k] - P2[i] === P2[i + 2 * k] - P2[i + k]) return { K: k, s: i };
  return null;
}
function describe(E, A, label) {
  const af = allCompleteAF(A, 20000000);
  const rec = { label: label, E_sha: G.sha(E).slice(0, 16), A_sha: G.sha(A).slice(0, 16), E: E, A: A,
    completeAF_count: af.F.length, completeAF_capped: af.capped, completeAF_F: af.F,
    afeWitness: null, sameFservesBoth: null, perF: [] };
  for (const F of af.F) {
    const bAFE = cl(build("afe", { a: A, e: E, f: F }), 40);
    const bEAF = cl(build("eaf", { a: A, e: E, f: F }), 40);
    const bFEA = cl(build("fea", { a: A, e: E, f: F }), 40);
    rec.perF.push({ F_sha: G.sha(F).slice(0, 16), AFE: bAFE, EAF: bEAF, FEA: bFEA,
      firstBad_EAF: bEAF ? null : firstBadK(build("eaf", { a: A, e: E, f: F }), 40),
      firstBad_FEA: bFEA ? null : firstBadK(build("fea", { a: A, e: E, f: F }), 40) });
    if (bAFE && !rec.afeWitness) { rec.afeWitness = F; rec.sameFservesBoth = true; }
  }
  if (!rec.afeWitness) rec.sameFservesBoth = false;
  return rec;
}
module.exports = { describe, allCompleteAF };
if (require.main === module) {
  const pairsFile = process.argv[2], outFile = process.argv[3];
  const rows = fs.readFileSync(pairsFile, 'utf8').split(/\r?\n/).filter(x => x).map(JSON.parse)
    .filter(r => r.AF_AND_AFE_EXISTS);
  console.log("AF_AND_AFE_EXISTS survivors in " + path.basename(pairsFile) + ": " + rows.length);
  console.log("(this tool needs the full E,A strings; pairs.jsonl stores hashes only —");
  console.log(" invoke describe(E,A,label) directly from the population driver instead.)");
}
