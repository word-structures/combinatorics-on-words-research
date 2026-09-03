'use strict';
/* §2b: characterise the arity-0 class.
   §6: AFE_EXISTS(E,A) and AF_AND_AFE_EXISTS(E,A) on the delimited AF-positive populations.
   §7: is complete-AF + AFE + EAF => FEA a theorem or only empirical? */
const C = require('./afe_csp.js');
const G = require('./gate.js');
const R = require('./rng.js');
const fs = require('fs');
const PF = C.PROFILE.f;

/* ---------- arity-0 characterisation ---------- */
function mul(a) { return function () { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const rnd = mul(555);
function rw(p) { const b = []; for (let c = 0; c < 3; c++) for (let i = 0; i < p[c]; i++) b.push("abc"[c]); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = b[i]; b[i] = b[j]; b[j] = t; } return b.join(""); }
let ag = 0, dg = 0;
for (let i = 0; i < 2000; i++) {
  const A = rw(C.PROFILE.a), E = rw(C.PROFILE.e);
  const dead = C.compile(A, E).dead;
  const pred = G.hasSquareUpTo(A, 20) || G.hasSquareUpTo(E, 20);
  if (dead === pred) ag++; else dg++;
}
console.log("arity-0 'dead' == (A has ab-square OR E has ab-square):  agree " + ag + "  disagree " + dg);
console.log(dg === 0 ? "  => the 703 arity-0 windows are exactly 'A and E individually abelian-square-free'"
                     : "  => NOT equivalent; arity-0 carries more than the two self-conditions");

/* ---------- AFE_EXISTS and AF_AND_AFE_EXISTS ---------- */
function endClean(q, n, km) {
  const k2 = Math.min(km, n >> 1);
  for (let k = 2; k <= k2; k++) { const a = n - 2 * k, b = n - k;
    if (q[0][b] - q[0][a] === q[0][n] - q[0][b] && q[1][b] - q[1][a] === q[1][n] - q[1][b] && q[2][b] - q[2][a] === q[2][n] - q[2][b]) return false; }
  return true;
}
/* combined: AFE K<=40 affine system AND complete-AF (F A F, K<=60) */
function afeAndAfExists(A, E, cap) {
  const cc = C.compile(A, E);
  if (cc.dead) return { exists: false, nodes: 0, capped: false };
  const byMax = new Map();
  for (const b of cc.binary) { const m = Math.max(b.i, b.j); if (!byMax.has(m)) byMax.set(m, []); byMax.get(m).push(b); }
  const x = [[0, 0, 0]]; const need = PF.slice(); const w = new Uint8Array(40);
  const q2 = [new Int32Array(81), new Int32Array(81), new Int32Array(81)];   // A then F-prefix (for FAF)
  for (let i = 0; i < 40; i++) { for (let t = 0; t < 3; t++) q2[t][i + 1] = q2[t][i]; q2[A.charCodeAt(i) - 97][i + 1]++; }
  let nodes = 0, capped = false, found = null;
  function selfClean(d) { for (let k = 2; 2 * k <= d; k++) { const a = x[d - 2 * k], b = x[d - k], c = x[d]; if (b[0] - a[0] === c[0] - b[0] && b[1] - a[1] === c[1] - b[1] && b[2] - a[2] === c[2] - b[2]) return false; } return true; }
  (function rec(d) {
    if (found || capped) return;
    if (++nodes > cap) { capped = true; return; }
    if (d === 40) { const F = Array.from(w).map(v => "abc"[v]).join(""); if (G.checkAF(A, F).pass) found = F; return; }
    for (let c = 0; c < 3; c++) {
      if (!need[c]) continue;
      const nx = x[d].slice(); nx[c]++; x[d + 1] = nx;
      const n2 = 40 + d + 1; for (let t = 0; t < 3; t++) q2[t][n2] = q2[t][n2 - 1]; q2[c][n2]++;
      let good = selfClean(d + 1);
      if (good) { const u = cc.unary.get(d + 1); if (u && u.has(x[d + 1].join(","))) good = false; }
      if (good) { const bs = byMax.get(d + 1); if (bs) for (const b of bs) { const xi = x[b.i], xj = x[b.j];
        if (b.ci * xi[0] + b.cj * xj[0] + b.C[0] === 0 && b.ci * xi[1] + b.cj * xj[1] + b.C[1] === 0 && b.ci * xi[2] + b.cj * xj[2] + b.C[2] === 0) { good = false; break; } } }
      if (good) good = endClean(q2, n2, 60);
      if (good) { w[d] = c; need[c]--; rec(d + 1); need[c]++; }
      if (found || capped) return;
    }
  })(0);
  return { exists: found !== null, witness: found, nodes: nodes, capped: capped };
}

/* populations */
const pools = JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json', 'utf8'));
const POOLE = new Set(pools.E);
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
const Rs = []; {
  const r2 = R.mk(7788);
  const gen = () => { const need = G.PROFILE.e.slice(), w = new Uint8Array(40);
    const q = [new Int32Array(41), new Int32Array(41), new Int32Array(41)]; let nodes = 0;
    function rec(m) { if (++nodes > 2e6) return false; if (m === 40) return true;
      const o = [0, 1, 2]; for (let i = 2; i > 0; i--) { const j = Math.floor(r2() * (i + 1)); const t = o[i]; o[i] = o[j]; o[j] = t; }
      for (const c of o) { if (!need[c]) continue; for (let t = 0; t < 3; t++) q[t][m + 1] = q[t][m]; q[c][m + 1]++;
        if (endClean(q, m + 1, 20)) { w[m] = c; need[c]--; if (rec(m + 1)) return true; need[c]++; } } return false; }
    return rec(0) ? Array.from(w).map(v => "abc"[v]).join("") : null; };
  while (Rs.length < 60) { const E = gen(); if (!E || POOLE.has(E)) continue; Rs.push(E); }
}
function runPop(label, Es, posFile) {
  const pos = fs.readFileSync(posFile, 'utf8').split(/\r?\n/).filter(x => x).map(JSON.parse);
  const Amap = new Map();
  Es.forEach((E, i) => { for (const A of Aset(E)) { if (!Amap.has(A)) Amap.set(A, []); Amap.get(A).push(i); } });
  let pairs = 0, afe = 0, both = 0, cap = 0;
  for (const p of pos) {
    const es = Amap.get(p.A) || [];
    for (const ei of es) {
      const E = Es[ei]; pairs++;
      const r1 = C.afeExists(p.A, E, 20000000);
      const r2r = afeAndAfExists(p.A, E, 20000000);
      if (r1.capped || r2r.capped) cap++;
      if (r1.exists) afe++;
      if (r2r.exists) both++;
    }
  }
  console.log("\n" + label + "  (unit: (E,A) pairs whose A is AF-positive)");
  console.log("  pairs                       : " + pairs);
  console.log("  AFE_EXISTS(E,A)             : " + afe);
  console.log("  AF_AND_AFE_EXISTS(E,A)      : " + both);
  console.log("  capped                      : " + cap);
  return { pairs: pairs, afe: afe, both: both };
}
runPop("POPULATION H", pools.E, '../runs/afex_H/af_positive.jsonl');
runPop("POPULATION R", Rs, '../runs/afex_R/af_positive.jsonl');
