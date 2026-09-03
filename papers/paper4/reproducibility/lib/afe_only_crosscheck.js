'use strict';
/* AFE_EXISTS independent cross-check -- secondary solver + literal checker.
 * Protocol: AFE_EXISTS_263_CROSSCHECK_PROTOCOL_2026-08-29.md
 * sha256 e56c3e2d4e33df84090ad53159cb5761de80da81427ddfe726401e5d38479641
 *
 * SECONDARY ROUTE (Report-12 bucket-gate framework, AFE ONLY):
 *   window enumeration + reduced-signature/target-bucket representation from
 *   target_buckets.js. Shares no code with afe_csp.js / stage_bcd.js, which
 *   produced the frozen primary verdicts.
 *   - only the AFE cover ['a','f','e'], K in [2,40] is enumerated; no FAF
 *     window is ever built, so requirement 1 of the protocol holds by
 *     construction rather than by filtering;
 *   - arity-0 windows set deadAFE;
 *   - endpoint reductions and equal-depth coefficient combination come from
 *     target_buckets.structure();
 *   - profile enforced as (19,11,10); cap -> UNRESOLVED, never UNSAT.
 *
 * THIRD ROUTE (literal checker): works from the concatenated word A.F.E with
 * no solver state at all.
 */
const fs = require('fs');
const TB = require('./target_buckets.js');
const G = require('./gate.js');
const L = TB.L, PF = TB.PROFILE.f;                     // (19,11,10)

/* ---- AFE-only compile ---------------------------------------------------- */
function compileAFE(A, E) {
  const pA = TB.prefixes(A), pE = TB.prefixes(E);
  const T = new Map();                                  // sig -> Set of forbidden target keys
  const termsOf = new Map();
  let deadAFE = false, arity0 = 0, windows = 0;
  for (const w of TB.ST_AFE) {                          // AFE cover only
    windows++;
    let C = w.macro.slice();
    for (const o of w.others) {
      const pv = (o.role === 'a' ? pA : pE)[o.d];
      C = [C[0] + pv[0] * o.c, C[1] + pv[1] * o.c, C[2] + pv[2] * o.c];
    }
    if (w.terms.length === 0) {                         // arity-0: pure (A,E)
      arity0++;
      if (C[0] === 0 && C[1] === 0 && C[2] === 0) deadAFE = true;
      continue;
    }
    const tgt = [-C[0], -C[1], -C[2]].join(',');        // L_sigma(x) = tgt forbidden
    if (!T.has(w.sig)) { T.set(w.sig, new Set()); termsOf.set(w.sig, w.terms); }
    T.get(w.sig).add(tgt);
  }
  return { T, termsOf, deadAFE, arity0, windows };
}
/* ---- freshly written DFS over F ------------------------------------------ */
function afeOnlySolve(comp, cap) {
  if (comp.deadAFE) return { sat: false, nodes: 0, capped: false, why: 'deadAFE' };
  const byMax = new Map();
  for (const [sig, targets] of comp.T) {
    if (!targets.size) continue;
    const terms = comp.termsOf.get(sig);
    let mx = 0; for (const t of terms) if (t[0] > mx) mx = t[0];
    if (!byMax.has(mx)) byMax.set(mx, []);
    byMax.get(mx).push({ terms, targets });
  }
  const x = [[0, 0, 0]]; const need = PF.slice(); const w = new Uint8Array(L);
  let nodes = 0, capped = false, found = null;
  (function rec(d) {
    if (found || capped) return;
    if (++nodes > cap) { capped = true; return; }
    if (d === L) { found = Array.from(w).map(v => 'abc'[v]).join(''); return; }
    for (let c = 0; c < 3; c++) {
      if (!need[c]) continue;
      const nx = x[d].slice(); nx[c]++; x[d + 1] = nx;
      let ok = true;
      const bs = byMax.get(d + 1);
      if (bs) for (const b of bs) {
        let v0 = 0, v1 = 0, v2 = 0;
        for (const [dd, cc] of b.terms) { const xv = x[dd]; v0 += cc * xv[0]; v1 += cc * xv[1]; v2 += cc * xv[2]; }
        if (b.targets.has(v0 + ',' + v1 + ',' + v2)) { ok = false; break; }
      }
      if (ok) { w[d] = c; need[c]--; rec(d + 1); need[c]++; }
      if (found || capped) return;
    }
  })(0);
  return { sat: found !== null, witness: found, nodes, capped };
}
/* ---- THIRD ROUTE: literal checker, no solver state ----------------------- */
function literalAFEclean(A, F, E) {
  const W = A + F + E;                                  // cover order a,f,e
  const n = W.length;                                   // 120
  const P = [[0, 0, 0]];
  for (let i = 0; i < n; i++) { const p = P[i].slice(); p[W.charCodeAt(i) - 97]++; P.push(p); }
  for (let K = 2; K <= 40; K++)
    for (let s = 0; s + 2 * K <= n; s++) {
      const a = P[s], b = P[s + K], c = P[s + 2 * K];
      if (a[0] - 2 * b[0] + c[0] === 0 && a[1] - 2 * b[1] + c[1] === 0 && a[2] - 2 * b[2] + c[2] === 0)
        return { clean: false, s, K };
    }
  return { clean: true };
}
function profileOf(F) { const p = [0, 0, 0]; for (const ch of F) p[ch.charCodeAt(0) - 97]++; return p; }

module.exports = { compileAFE, afeOnlySolve, literalAFEclean, profileOf, L, PF };
