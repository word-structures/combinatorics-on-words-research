'use strict';
/* Exercise the unary/binary failure branches on REAL (E,A) pairs (random (A,E) are
   essentially always killed by the arity-0 A/E-only obstruction, so they cannot test them). */
const C = require('./afe_csp.js');
const G = require('./gate.js');
const fs = require('fs');

const canonAF = JSON.parse(fs.readFileSync('../fixtures/af_complete_pass.json', 'utf8'));
const freshAF = JSON.parse(fs.readFileSync('../runs/fresh_v2_af_FINAL.json', 'utf8'));
const AFpairs = canonAF.map(x => ({ A: x.A, F: x.F })).concat(freshAF.map(x => ({ A: x.A, F: x.F })));
const pools = JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json', 'utf8'));

let dead = 0, live = 0;
const cls = { ternary_FnotSqFree: 0, unary: 0, binary: 0, clean: 0 };
let liveExamples = 0;
for (const E of pools.E) for (const p of AFpairs) {
  const cc = C.compile(p.A, E);
  if (cc.dead) { dead++; continue; }
  live++;
  const x = C.prefixes(p.F); let hit = null;
  if (G.hasSquareUpTo(p.F, 20)) hit = 'ternary_FnotSqFree';
  if (!hit) for (const en of cc.unary) if (en[1].has(x[en[0]].join(","))) { hit = 'unary'; break; }
  if (!hit) for (const b of cc.binary) {
    const xi = x[b.i], xj = x[b.j];
    if (b.ci * xi[0] + b.cj * xj[0] + b.C[0] === 0 && b.ci * xi[1] + b.cj * xj[1] + b.C[1] === 0 && b.ci * xi[2] + b.cj * xj[2] + b.C[2] === 0) { hit = 'binary'; break; }
  }
  cls[hit || 'clean']++;
  if (liveExamples < 3) { liveExamples++; console.log("  live (E,A): unaryDepths=" + cc.unary.size + " unaryStates=" + Array.from(cc.unary.values()).reduce((s, y) => s + y.size, 0) + " binary=" + cc.binary.length); }
}
console.log("\n(E,A,F) triples over 9 historical E x " + AFpairs.length + " complete-AF pairs = " + (dead + live));
console.log("  killed by arity-0 A/E-only obstruction : " + dead);
console.log("  reaching the F-dependent constraints   : " + live);
console.log("  of those, failure class: " + JSON.stringify(cls));

/* cross-check every live case against the direct checker */
let agree = 0, dis = 0;
for (const E of pools.E) for (const p of AFpairs) {
  const cc = C.compile(p.A, E); if (cc.dead) continue;
  const d = C.afeDirect(p.A, E, p.F).square, a = C.afeAffine(p.A, E, p.F);
  if (d === a) agree++; else dis++;
}
console.log("\nlive-case direct-vs-affine: agree " + agree + "  disagree " + dis);
console.log(dis === 0 ? "PASS" : "FAIL");
