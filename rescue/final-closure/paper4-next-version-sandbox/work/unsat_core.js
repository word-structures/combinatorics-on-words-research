'use strict';
/* §6 — combined-gate DFS over F with a selectable subset of signature buckets,
   path-width profile by depth, and minimal UNSAT-core extraction. */
const TB = require('./target_buckets.js');
const L = TB.L, PF = TB.PROFILE.f;

/* activeSigs: Set of signature strings to enforce (null = all) */
function solve(comp, activeSigs, cap) {
  if (comp.deadFAF || comp.deadAFE) return { sat: false, nodes: 0, deathDepth: 0, widths: [], capped: false };
  const byMax = new Map();
  for (const [sig, sets] of comp.T) {
    if (activeSigs && !activeSigs.has(sig)) continue;
    if (sets.faf.size === 0 && sets.afe.size === 0) continue;
    const terms = comp.termsOf.get(sig);
    const mx = Math.max(...terms.map(t => t[0]));
    if (!byMax.has(mx)) byMax.set(mx, []);
    byMax.get(mx).push({ sig: sig, terms: terms, faf: sets.faf, afe: sets.afe });
  }
  const x = [[0, 0, 0]]; const need = PF.slice(); const w = new Uint8Array(L);
  let nodes = 0, capped = false, found = null, deepest = 0;
  const widths = new Array(L + 1).fill(0);
  (function rec(d) {
    if (found || capped) return;
    if (++nodes > cap) { capped = true; return; }
    if (d > deepest) deepest = d;
    widths[d]++;
    if (d === L) { found = Array.from(w).map(v => "abc"[v]).join(""); return; }
    for (let c = 0; c < 3; c++) {
      if (!need[c]) continue;
      const nx = x[d].slice(); nx[c]++; x[d + 1] = nx;
      let ok = true;
      const bs = byMax.get(d + 1);
      if (bs) for (const b of bs) {
        let v = [0, 0, 0];
        for (const [dd, cc] of b.terms) { const xv = x[dd]; v = [v[0] + cc * xv[0], v[1] + cc * xv[1], v[2] + cc * xv[2]]; }
        const key = v.join(",");
        if (b.faf.has(key) || b.afe.has(key)) { ok = false; break; }
      }
      if (ok) { w[d] = c; need[c]--; rec(d + 1); need[c]++; }
      if (found || capped) return;
    }
  })(0);
  return { sat: found !== null, witness: found, nodes: nodes, capped: capped,
           deathDepth: found ? null : deepest, widths: widths };
}
/* core via binary search on the depth-ordered prefix, then bounded greedy shrink */
function minimalCore(comp, cap) {
  const all = [...comp.T.keys()].filter(s => { const v = comp.T.get(s); return v.faf.size || v.afe.size; })
    .sort((a, b) => {
      const ma = Math.max(...comp.termsOf.get(a).map(t => t[0]));
      const mb = Math.max(...comp.termsOf.get(b).map(t => t[0]));
      return ma - mb || comp.termsOf.get(a).length - comp.termsOf.get(b).length;
    });
  if (solve(comp, new Set(all), cap).sat) return { unsat: false };
  // binary search: smallest prefix length that is already UNSAT
  let lo = 1, hi = all.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    const r = solve(comp, new Set(all.slice(0, mid)), cap);
    if (r.capped) return { capped: true };
    if (!r.sat) hi = mid; else lo = mid + 1;
  }
  let cur = new Set(all.slice(0, lo));
  // bounded greedy shrink
  for (const s of [...cur]) {
    const trial = new Set(cur); trial.delete(s);
    const r = solve(comp, trial, cap);
    if (!r.capped && !r.sat) cur.delete(s);
  }
  return { unsat: true, core: [...cur], size: cur.size, prefixLen: lo, totalSigs: all.length };
}
function classify(core, comp) {
  const kinds = { unary: 0, binary: 0, ternary: 0 };
  let midpoint = 0, shared = 0, fafOnly = 0, afeOnly = 0;
  for (const s of core) {
    const terms = comp.termsOf.get(s);
    if (terms.length === 1) kinds.unary++; else if (terms.length === 2) kinds.binary++; else kinds.ternary++;
    const coefs = terms.map(t => t[1]);
    const isMid = (terms.length === 1 && coefs[0] === 2) ||
                  (terms.length === 2 && coefs[0] === 1 && coefs[1] === 1);
    if (isMid) midpoint++;
    const v = comp.T.get(s);
    if (v.faf.size && v.afe.size) shared++;
    else if (v.faf.size) fafOnly++;
    else afeOnly++;
  }
  return { kinds: kinds, midpointSignatures: midpoint, bothConstrain: shared, fafTargetsOnly: fafOnly, afeTargetsOnly: afeOnly };
}
module.exports = { solve, minimalCore, classify };
