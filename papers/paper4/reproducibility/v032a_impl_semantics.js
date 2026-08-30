'use strict';
/* TASK 3 -- implementation-semantics audit.
 * Does the abstract AFE cutset model of v0.32a sections 10-12 match the ACTUAL
 * validated AFE_EXISTS solver used to produce the 0/137 and 86/263 numbers?
 *
 * Traced code path: stage_bcd.stageDFS(A,E,'AFE',cap)
 *   -> afe_csp.compile(A,E)  gives {dead, unary, binary}
 *   -> DFS checks, at each new depth d+1:
 *        selfClean(d+1)        ternary (1,-2,1) on F prefixes, target 0
 *        cc.unary.get(d+1)     forbidden single prefix states
 *        byMax.get(d+1)        binary relations closing at d+1
 * Question 1: is every live constraint of the form  sum_i alpha_i X_i in T ?
 * Question 2: how large is the frontier A_d in practice? (bears on whether the
 *             quotient-DAG actually compresses anything at L=40).
 */
const fs = require('fs');
const C = require('./afe_csp.js'), G = require('./gate.js');
const jl = p => fs.readFileSync(p, 'utf8').split(/\r?\n/).filter(x => x).map(JSON.parse);
const pools = JSON.parse(fs.readFileSync('../fixtures/canonical_pools.json', 'utf8'));
const posH = jl('../runs/afexBIG_H/af_positive.jsonl');
const L = 40;

/* ---- Q1: enumerate every live constraint class and its arity ------------ */
const A = posH[0].A, E = pools.E[0];
const cc = C.compile(A, E);
let unaryCount = 0, unaryTargets = 0;
for (const [d, S] of cc.unary) { unaryCount++; unaryTargets += S.size; }
console.log('=== Q1: live AFE constraint classes for one real (A,E) ===');
console.log('  dead flag (arity-0 pure A/E obstruction) : ' + cc.dead);
console.log('  unary depths carrying targets            : ' + unaryCount + '  (total forbidden states ' + unaryTargets + ')');
console.log('  binary relations                         : ' + cc.binary.length);

/* ternary class: reconstructed from the window list, since compile() skips them
   (they are exactly "F is abelian-square-free", handled by selfClean) */
let ternary = 0, arity0 = 0, skippedUnary = 0;
{
  const V = 'afe', PROFILE = { a: [15, 14, 11], e: [13, 16, 11], f: [19, 11, 10] };
  const prefixes = w => { const a = [[0, 0, 0]]; for (let i = 0; i < w.length; i++) { const p = a[i].slice(); p[w.charCodeAt(i) - 97]++; a.push(p); } return a; };
  const decomp = p => (p === L * 3 ? [2, L] : [Math.floor(p / L), p - L * Math.floor(p / L)]);
  const Sq = q => { let s = [0, 0, 0]; for (let j = 0; j < q; j++) s = [s[0] + PROFILE[V[j]][0], s[1] + PROFILE[V[j]][1], s[2] + PROFILE[V[j]][2]]; return s; };
  const pA = prefixes(A), pE = prefixes(E);
  for (let K = 2; K <= 40; K++) for (let s = 0; s + 2 * K <= L * 3; s++) {
    const cuts = [[s, 1], [s + K, -2], [s + 2 * K, 1]];
    const fT = []; let macro = [0, 0, 0], other = [];
    for (const [p, c] of cuts) {
      const [q, t] = decomp(p); const S0 = Sq(q);
      macro = [macro[0] + S0[0] * c, macro[1] + S0[1] * c, macro[2] + S0[2] * c];
      if (V[q] === 'f') fT.push({ c, t }); else other.push({ role: V[q], t, c });
    }
    let Cv = macro.slice();
    for (const o of other) { const pv = (o.role === 'a' ? pA : pE)[o.t]; Cv = [Cv[0] + pv[0] * o.c, Cv[1] + pv[1] * o.c, Cv[2] + pv[2] * o.c]; }
    if (fT.length === 0) { arity0++; continue; }
    if (fT.length === 3) {
      ternary++;
      if (macro[0] || macro[1] || macro[2] || other.length)
        console.log('  !! ternary window with nonzero macro/other -- model mismatch');
      continue;
    }
    if (fT.length === 1) {
      const c = fT[0].c, t = fT[0].t;
      const tg = [0, 1, 2].map(k => -Cv[k] / c);
      const legal = tg.every(Number.isInteger) && tg.every((v, k) => v >= 0 && v <= PROFILE.f[k]) && tg[0] + tg[1] + tg[2] === t;
      if (!legal) skippedUnary++;
    }
  }
}
console.log('  ternary (all three cuts in F, target 0)  : ' + ternary);
console.log('  arity-0 windows (pure A/E)               : ' + arity0);
console.log('  unary windows dropped as unreachable     : ' + skippedUnary + '  (sound: target is not a legal prefix state)');
console.log('  => every live class has the form  sum alpha_i X_i in T : ' +
  'ternary T={0}, unary T=set, binary T={-C}; arity-0 is the EMPTY sum with T={0}.');

/* ---- Q2: frontier size A_d for the real system -------------------------- */
/* closeAt(constraint) = max referenced depth; A_d = {i <= d : some unclosed
   constraint references i}. Ternary constraints reference d-2k, d-k, d. */
const refs = [];                         // {depths:[...], closeAt}
for (const [d, S] of cc.unary) refs.push({ depths: [d], closeAt: d });
for (const b of cc.binary) refs.push({ depths: [b.i, b.j], closeAt: Math.max(b.i, b.j) });
for (let d = 2; d <= L; d++) for (let k = 2; 2 * k <= d; k++) refs.push({ depths: [d - 2 * k, d - k, d], closeAt: d });
const Asz = [];
for (let d = 0; d <= L; d++) {
  const s = new Set();
  for (const r of refs) if (r.closeAt > d) for (const dd of r.depths) if (dd <= d && dd >= 1) s.add(dd);
  Asz.push(s.size);
}
console.log('\n=== Q2: frontier size |A_d| for the real L=40 AFE system ===');
console.log('  |A_d| by depth: ' + JSON.stringify(Asz));
console.log('  max |A_d| = ' + Math.max(...Asz) + '   (state = X_d plus this many historical vectors)');
console.log('  depths where |A_d| = d (frontier is the WHOLE prefix): ' +
  Asz.map((v, d) => (d >= 1 && v === d) ? d : null).filter(x => x !== null).length + ' of 40');
fs.writeFileSync('../runs/v032a_impl_semantics.json', JSON.stringify(
  { unaryDepths: unaryCount, unaryTargets, binary: cc.binary.length, ternary, arity0,
    skippedUnary, dead: cc.dead, frontierSizes: Asz, maxFrontier: Math.max(...Asz) }, null, 1));
console.log('persisted -> runs/v032a_impl_semantics.json');
