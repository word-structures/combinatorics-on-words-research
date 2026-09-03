'use strict';
/* §7 — is  complete-AF + AFE + EAF  =>  FEA  a theorem, or only empirical on this basin?
   Search for a counterexample: (A,E,F) with complete-AF, AFE clean, EAF clean, FEA dirty. */
const G = require('./gate.js');
const C = require('./afe_csp.js');
const fs = require('fs');
const build = (v, b) => Array.from(v).map(c => b[c]).join("");
const cl = (s, k) => !G.hasSquareUpTo(s, k);
function bits(E, A, F) {
  return { AFE: cl(build("afe", { a: A, e: E, f: F }), 40),
           EAF: cl(build("eaf", { a: A, e: E, f: F }), 40),
           FEA: cl(build("fea", { a: A, e: E, f: F }), 40) };
}
/* (a) exhaustive over the finite AF-positive population already enumerated */
const pools = JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json', 'utf8'));
const canonAF = JSON.parse(fs.readFileSync('../fixtures/af_complete_pass.json', 'utf8'));
const freshAF = JSON.parse(fs.readFileSync('../runs/fresh_v2_af_FINAL.json', 'utf8'));
const AFpairs = canonAF.map(x => ({ A: x.A, F: x.F })).concat(freshAF.map(x => ({ A: x.A, F: x.F })));
let n = 0, ce = 0; const examples = [];
for (const E of pools.E) for (const p of AFpairs) {
  n++; const b = bits(E, p.A, p.F);
  if (b.AFE && b.EAF && !b.FEA) { ce++; if (examples.length < 3) examples.push({ E: E, A: p.A, F: p.F }); }
}
console.log("(a) finite AF-positive basin: (E,A,F) triples tested = " + n + "   AFE&EAF&!FEA counterexamples = " + ce);

/* (b) targeted synthetic search: perturb known K<=40-clean triples, keep complete-AF,
       and look for AFE&EAF passing but FEA failing */
const known = fs.readFileSync('../runs/canon39.jsonl', 'utf8').split(/\r?\n/).filter(x => x).map(JSON.parse)
  .concat(fs.readFileSync('../runs/newpop_combined.jsonl', 'utf8').split(/\r?\n/).filter(x => x).map(JSON.parse));
let tested = 0, found = 0; const found2 = [];
const seen = new Set();
for (const t of known) {
  const key = t.A + t.E + t.F; if (seen.has(key)) continue; seen.add(key);
  for (const role of ["E", "A", "F"]) {
    const w = t[role];
    for (let i = 0; i < 40; i++) for (let j = i + 1; j < 40; j++) {
      if (w[i] === w[j]) continue;
      const arr = w.split(""); const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp; const nw = arr.join("");
      const A = role === "A" ? nw : t.A, E = role === "E" ? nw : t.E, F = role === "F" ? nw : t.F;
      if (!G.checkAF(A, F).pass) continue;             // require complete-AF
      tested++;
      const b = bits(E, A, F);
      if (b.AFE && b.EAF && !b.FEA) { found++; if (found2.length < 3) found2.push({ A: A, E: E, F: F }); }
    }
  }
}
console.log("(b) perturbation search with complete-AF enforced: tested = " + tested + "   counterexamples = " + found);

/* (c) also record the reverse implications for symmetry */
let bAFE_FEA = 0, bEAF_FEA = 0;
for (const t of known.slice(0, 20)) {
  for (let i = 0; i < 40; i++) for (let j = i + 1; j < 40; j++) {
    if (t.F[i] === t.F[j]) continue;
    const arr = t.F.split(""); const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp; const F = arr.join("");
    if (!G.checkAF(t.A, F).pass) continue;
    const b = bits(t.E, t.A, F);
    if (b.AFE && b.FEA && !b.EAF) bAFE_FEA++;
    if (b.EAF && b.FEA && !b.AFE) bEAF_FEA++;
  }
}
console.log("(c) for symmetry: AFE&FEA&!EAF = " + bAFE_FEA + "   EAF&FEA&!AFE = " + bEAF_FEA);

const total = ce + found;
if (total === 0) {
  console.log("\nNO COUNTEREXAMPLE FOUND over " + (n + tested) + " complete-AF triples tested.");
  console.log("STATUS: EMPIRICAL ONLY on this basin. No proof derived; not a theorem.");
} else {
  console.log("\nCOUNTEREXAMPLE(S) FOUND -> the implication is FALSE. Preserved:");
  console.log(JSON.stringify(examples.concat(found2).slice(0, 3), null, 1));
  fs.writeFileSync('../runs/fea_counterexamples.json', JSON.stringify(examples.concat(found2), null, 1));
}
