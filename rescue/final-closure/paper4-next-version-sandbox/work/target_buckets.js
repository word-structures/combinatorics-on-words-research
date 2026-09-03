'use strict';
/* §5 — shared target-bucket formulation on the common FAF signature skeleton.
 *
 * For a signature sigma = ((j_1,c_1),...,(j_r,c_r)) put  L_sigma(x) = sum c_i x_{j_i}.
 * Every concrete window is a FORBIDDEN equality  L_sigma(x) = T.
 * Combined gate:   L_sigma(x)  NOT IN  T_FAF(sigma;A)  union  T_AFE(sigma;A,E).
 *
 * FAF windows: K = 2..floor(3L/2)   (this is exactly the complete-AF gate, K<=60 at L=40)
 * AFE windows: K = 2..L             (the AFE short gate, K<=40 at L=40)
 */
const L = 40;
const PROFILE = { a: [15, 14, 11], e: [13, 16, 11], f: [19, 11, 10] };
const add = (u, w) => [u[0] + w[0], u[1] + w[1], u[2] + w[2]];
const mul = (u, k) => [u[0] * k, u[1] * k, u[2] * k];
function prefixes(w) { const a = [[0, 0, 0]]; for (let i = 0; i < w.length; i++) { const p = a[i].slice(); p[w.charCodeAt(i) - 97]++; a.push(p); } return a; }

/* structural window list per cover, independent of the actual block words */
function structure(cover, kmax) {
  const out = [];
  for (let K = 2; K <= kmax; K++) for (let s = 0; s + 2 * K <= L * cover.length; s++) {
    const coef = [1, -2, 1], cuts = [s, s + K, s + 2 * K];
    const fmap = new Map(); const others = []; let macro = [0, 0, 0];
    for (let t = 0; t < 3; t++) {
      const p = cuts[t]; let q = Math.floor(p / L), d = p - q * L;
      if (q === cover.length) { q = cover.length - 1; d = L; }
      // macro part: sum of full block profiles before q
      let S = [0, 0, 0]; for (let b = 0; b < q; b++) S = add(S, PROFILE[cover[b]]);
      macro = add(macro, mul(S, coef[t]));
      const role = cover[q];
      if (role === 'f') {
        if (d === 0) { /* x_0 = 0 */ }
        else if (d === L) { macro = add(macro, mul(PROFILE.f, coef[t])); }   // x_L = m(F)
        else fmap.set(d, (fmap.get(d) || 0) + coef[t]);
      } else others.push({ role: role, d: d, c: coef[t] });
    }
    const terms = [...fmap.entries()].filter(e => e[1] !== 0).sort((a, b) => a[0] - b[0]);
    out.push({ s: s, K: K, sig: terms.map(e => e[1] + "*x" + e[0]).join("+"), terms: terms, others: others, macro: macro });
  }
  return out;
}
const ST_FAF = structure(['f', 'a', 'f'], Math.floor(3 * L / 2));
const ST_AFE = structure(['a', 'f', 'e'], L);

/* compile forbidden targets for given A (and E for AFE) */
function compileBuckets(A, E) {
  const pA = prefixes(A), pE = E ? prefixes(E) : null;
  const T = new Map();                       // sig -> {faf:Set, afe:Set}
  let deadFAF = false, deadAFE = false;
  function bucket(sig) { if (!T.has(sig)) T.set(sig, { faf: new Set(), afe: new Set() }); return T.get(sig); }
  for (const w of ST_FAF) {
    let C = w.macro.slice();
    for (const o of w.others) { const pv = (o.role === 'a' ? pA : pE)[o.d]; C = add(C, mul(pv, o.c)); }
    const tgt = mul(C, -1);                  // L_sigma(x) = -C is forbidden
    if (w.terms.length === 0) { if (C[0] === 0 && C[1] === 0 && C[2] === 0) deadFAF = true; continue; }
    bucket(w.sig).faf.add(tgt.join(","));
  }
  if (E) for (const w of ST_AFE) {
    let C = w.macro.slice();
    for (const o of w.others) { const pv = (o.role === 'a' ? pA : pE)[o.d]; C = add(C, mul(pv, o.c)); }
    const tgt = mul(C, -1);
    if (w.terms.length === 0) { if (C[0] === 0 && C[1] === 0 && C[2] === 0) deadAFE = true; continue; }
    bucket(w.sig).afe.add(tgt.join(","));
  }
  // term lists per signature for evaluation
  const termsOf = new Map();
  for (const w of ST_FAF) if (w.terms.length) termsOf.set(w.sig, w.terms);
  for (const w of ST_AFE) if (w.terms.length) termsOf.set(w.sig, w.terms);
  return { T: T, termsOf: termsOf, deadFAF: deadFAF, deadAFE: deadAFE };
}
/* evaluate a concrete F against the combined bucket gate */
function bucketVerdict(comp, F) {
  if (comp.deadFAF || comp.deadAFE) return { pass: false, why: "A/E-only obstruction" };
  const x = prefixes(F);
  for (const [sig, sets] of comp.T) {
    const terms = comp.termsOf.get(sig);
    let v = [0, 0, 0];
    for (const [d, c] of terms) { const xv = x[d]; v = [v[0] + c * xv[0], v[1] + c * xv[1], v[2] + c * xv[2]]; }
    const key = v.join(",");
    if (sets.faf.has(key)) return { pass: false, why: "FAF target", sig: sig };
    if (sets.afe.has(key)) return { pass: false, why: "AFE target", sig: sig };
  }
  return { pass: true };
}
module.exports = { L, PROFILE, prefixes, structure, ST_FAF, ST_AFE, compileBuckets, bucketVerdict };
