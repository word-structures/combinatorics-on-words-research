'use strict';
/* Independent direct-vs-affine validation of the AFE K<=40 system.
   Ground truth is direct substring Parikh equality on H(afe) = A F E. */
const C = require('./afe_csp.js');
const G = require('./gate.js');
const fs = require('fs');
function mul(a) { return function () { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const rnd = mul(20260828);
function rw(p) { const b = []; for (let c = 0; c < 3; c++) for (let i = 0; i < p[c]; i++) b.push("abc"[c]); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = b[i]; b[i] = b[j]; b[j] = t; } return b.join(""); }

let n = 0, agree = 0, dis = 0, sqTrue = 0; const bad = [];
for (let i = 0; i < 3000; i++) {
  const A = rw(C.PROFILE.a), E = rw(C.PROFILE.e), F = rw(C.PROFILE.f);
  const d = C.afeDirect(A, E, F).square, a = C.afeAffine(A, E, F);
  n++; if (d === a) { agree++; if (d) sqTrue++; } else { dis++; if (bad.length < 4) bad.push({ i: i, direct: d, affine: a }); }
}
console.log("random profile-correct (A,E,F): " + JSON.stringify({ trials: n, agree: agree, disagree: dis, squaresSeen: sqTrue }));
if (bad.length) console.log("MISMATCHES: " + JSON.stringify(bad));

/* mandatory positive controls */
const known = fs.readFileSync('../runs/canon39.jsonl', 'utf8').split(/\r?\n/).filter(x => x).map(JSON.parse)
  .concat(fs.readFileSync('../runs/newpop_combined.jsonl', 'utf8').split(/\r?\n/).filter(x => x).map(JSON.parse));
const seen = new Set(); let pc = 0, pbad = 0;
for (const t of known) {
  const id = G.aefId(t.A, t.E, t.F); if (seen.has(id)) continue; seen.add(id);
  const d = C.afeDirect(t.A, t.E, t.F).square, a = C.afeAffine(t.A, t.E, t.F);
  if (d === false && a === false) pc++; else pbad++;
}
console.log("known K<=40-clean triples: " + seen.size + "  both methods AFE-clean: " + pc + "  lost/mismatch: " + pbad);

/* exercise each failure class */
const cls = { deadAE: 0, ternary_FnotSqFree: 0, unary: 0, binary: 0, clean: 0 };
for (let i = 0; i < 4000; i++) {
  const A = rw(C.PROFILE.a), E = rw(C.PROFILE.e), F = rw(C.PROFILE.f);
  const cc = C.compile(A, E);
  if (cc.dead) { cls.deadAE++; continue; }
  if (G.hasSquareUpTo(F, 20)) { cls.ternary_FnotSqFree++; continue; }
  const x = C.prefixes(F); let hit = false;
  for (const entry of cc.unary) { if (entry[1].has(x[entry[0]].join(","))) { hit = true; break; } }
  if (hit) { cls.unary++; continue; }
  for (const b of cc.binary) {
    const xi = x[b.i], xj = x[b.j];
    if (b.ci * xi[0] + b.cj * xj[0] + b.C[0] === 0 && b.ci * xi[1] + b.cj * xj[1] + b.C[1] === 0 && b.ci * xi[2] + b.cj * xj[2] + b.C[2] === 0) { hit = true; break; }
  }
  if (hit) cls.binary++; else cls.clean++;
}
console.log("failure classes exercised (4000 draws): " + JSON.stringify(cls));
if (dis || pbad) { console.log("VALIDATION FAILED"); process.exit(2); }
console.log("PASS: affine AFE system exactly matches direct substring Parikh equality; no known positive lost.");
