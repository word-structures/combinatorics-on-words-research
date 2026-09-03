'use strict';
/* PHASE 4A -- exact sound constraint propagation on the A-prefix lattice.
 *
 * Domains D_m subset S_m (states allowed by the A-profile) for m = 0..40, with
 * the two ENDPOINTS KNOWN:  D_0 = {(0,0,0)},  D_40 = {(15,14,11)}.
 *
 * Propagation rules, all sound (they never delete a state lying on some valid A):
 *   (R1) unary       : delete forbidden values (families U1,U2,U3).
 *   (R2) adjacency   : x in D_m survives only if it has a predecessor in D_{m-1}
 *                      and a successor in D_{m+1} differing by a unit vector.
 *   (R3) binary (m,k): the pair (y,x) with x - 2y = t is forbidden. Delete x
 *                      from D_m only if D_{m-k} = {y} and x - 2y = t; delete y
 *                      from D_{m-k} only if D_m = {x} and x - 2y = t.
 *   (R4) ternary(m,k): the triple with x(m) - 2x(m-k) + x(m-2k) = 0 is
 *                      forbidden. Delete a state only when the other two
 *                      domains involved are singletons.
 *
 * If any D_m becomes empty, Aset(E) = empty is CERTIFIED, and the deletion
 * trace is a finite, independently checkable refutation.
 */
const fs = require('fs'), D = require('./aset_defs.js');
const { LE, LA, KMAX, PROF_A, parikhPrefix } = D;
const key = v => v[0] + ',' + v[1] + ',' + v[2];
const unkey = s => s.split(',').map(Number);

function sigmas(E) {
  const p = parikhPrefix(E), P = p[LE], out = [];
  for (let r = 0; r <= LE; r++) out.push([P[0] - p[LE - r][0], P[1] - p[LE - r][1], P[2] - p[LE - r][2]]);
  return out;
}
function Sm(m) {
  const out = [];
  for (let a = Math.max(0, m - PROF_A[1] - PROF_A[2]); a <= Math.min(PROF_A[0], m); a++)
    for (let b = Math.max(0, m - a - PROF_A[2]); b <= Math.min(PROF_A[1], m - a); b++) {
      const c = m - a - b; if (c >= 0 && c <= PROF_A[2]) out.push([a, b, c]);
    }
  return out;
}
/* constraint lists in (m,k) form, matching aset_freeze.js exactly */
function constraintLists(E) {
  const p = parikhPrefix(E), s = sigmas(E);
  const ternary = [], binary = [], unary = [];
  for (let m = 1; m <= LA; m++) {
    const n = LE + m, kmax = Math.min(KMAX, n >> 1);
    for (let k = 2; k <= kmax; k++) {
      if (2 * k <= m) ternary.push({ m, k });
      else if (k <= m) binary.push({ m, k, t: [p[LE][0] - p[LE + m - 2 * k][0], p[LE][1] - p[LE + m - 2 * k][1], p[LE][2] - p[LE + m - 2 * k][2]] });
      else unary.push({ m, k, t: [s[2 * k - m][0] - 2 * s[k - m][0], s[2 * k - m][1] - 2 * s[k - m][1], s[2 * k - m][2] - 2 * s[k - m][2]] });
    }
  }
  return { ternary, binary, unary };
}
function propagate(E, maxRounds) {
  const C = constraintLists(E);
  const Dom = []; for (let m = 0; m <= LA; m++) Dom.push(new Set(Sm(m).map(key)));
  Dom[0] = new Set([key([0, 0, 0])]);
  Dom[LA] = new Set([key(PROF_A)]);
  const trace = [];
  const del = (m, k, why) => { if (Dom[m].delete(k)) { trace.push({ depth: m, state: k, rule: why }); return true; } return false; };
  /* R1 once */
  for (const u of C.unary) del(u.m, key(u.t), 'U1 k=' + u.k);
  for (const b of C.binary) if (b.k === b.m) del(b.m, key(b.t), 'U2 k=' + b.k);
  let changed = true, rounds = 0;
  while (changed && rounds < maxRounds) {
    changed = false; rounds++;
    /* R2 adjacency, forward then backward */
    for (let m = 1; m <= LA; m++) for (const kk of [...Dom[m]]) {
      const x = unkey(kk);
      let ok = false;
      for (let c = 0; c < 3 && !ok; c++) { const y = x.slice(); y[c]--; if (y[c] >= 0 && Dom[m - 1].has(key(y))) ok = true; }
      if (!ok && del(m, kk, 'R2 no predecessor')) changed = true;
    }
    for (let m = LA - 1; m >= 0; m--) for (const kk of [...Dom[m]]) {
      const x = unkey(kk);
      let ok = false;
      for (let c = 0; c < 3 && !ok; c++) { const y = x.slice(); y[c]++; if (y[c] <= PROF_A[c] && Dom[m + 1].has(key(y))) ok = true; }
      if (!ok && del(m, kk, 'R2 no successor')) changed = true;
    }
    /* R3 binary with a singleton partner */
    for (const b of C.binary) {
      const lo = b.m - b.k;
      if (Dom[lo].size === 1) {
        const y = unkey([...Dom[lo]][0]);
        const x = [b.t[0] + 2 * y[0], b.t[1] + 2 * y[1], b.t[2] + 2 * y[2]];
        if (Dom[b.m].has(key(x)) && del(b.m, key(x), 'R3 binary k=' + b.k + ' vs singleton@' + lo)) changed = true;
      }
      if (Dom[b.m].size === 1) {
        const x = unkey([...Dom[b.m]][0]);
        const two = [x[0] - b.t[0], x[1] - b.t[1], x[2] - b.t[2]];
        if (two[0] % 2 === 0 && two[1] % 2 === 0 && two[2] % 2 === 0) {
          const y = [two[0] / 2, two[1] / 2, two[2] / 2];
          if (Dom[lo].has(key(y)) && del(lo, key(y), 'R3 binary k=' + b.k + ' vs singleton@' + b.m)) changed = true;
        }
      }
    }
    /* R4 ternary with two singleton partners */
    for (const t of C.ternary) {
      const a = t.m, b2 = t.m - t.k, c2 = t.m - 2 * t.k;
      /* sizes are re-read at each branch: a deletion in an earlier branch can
         empty a domain that a stale size would still report as a singleton */
      const S = () => [a, b2, c2].map(i => Dom[i].size === 1);
      if (S()[1] && S()[2] && Dom[a].size > 0) {
        const y = unkey([...Dom[b2]][0]), z = unkey([...Dom[c2]][0]);
        const x = [2 * y[0] - z[0], 2 * y[1] - z[1], 2 * y[2] - z[2]];
        if (Dom[a].has(key(x)) && del(a, key(x), 'R4 ternary k=' + t.k)) changed = true;
      }
      if (S()[0] && S()[2] && Dom[b2].size > 0) {
        const x = unkey([...Dom[a]][0]), z = unkey([...Dom[c2]][0]);
        const s2 = [x[0] + z[0], x[1] + z[1], x[2] + z[2]];
        if (s2[0] % 2 === 0 && s2[1] % 2 === 0 && s2[2] % 2 === 0) {
          const y = [s2[0] / 2, s2[1] / 2, s2[2] / 2];
          if (Dom[b2].has(key(y)) && del(b2, key(y), 'R4 ternary k=' + t.k)) changed = true;
        }
      }
      if (S()[0] && S()[1] && Dom[c2].size > 0) {
        const x = unkey([...Dom[a]][0]), y = unkey([...Dom[b2]][0]);
        const z = [2 * y[0] - x[0], 2 * y[1] - x[1], 2 * y[2] - x[2]];
        if (Dom[c2].has(key(z)) && del(c2, key(z), 'R4 ternary k=' + t.k)) changed = true;
      }
    }
    for (let m = 0; m <= LA; m++) if (Dom[m].size === 0)
      return { empty: true, depth: m, rounds, trace, sizes: Dom.map(d => d.size) };
  }
  return { empty: false, rounds, sizes: Dom.map(d => d.size), trace };
}
const frozen = JSON.parse(fs.readFileSync('../runs/aset_E_frozen.json', 'utf8'));
const out = [];
for (const r of frozen.rows) {
  const p = propagate(r.E, 60);
  out.push({ population: r.population, eIndex: r.eIndex, E_sha256: r.E_sha256, asetSize: r.asetSize,
    certified: p.empty, emptyDepth: p.empty ? p.depth : null, rounds: p.rounds,
    deletions: p.trace.length, domainSizes: p.sizes,
    totalRemaining: p.sizes.reduce((a, b) => a + b, 0) });
}
const zeros = out.filter(r => r.asetSize === 0), pos = out.filter(r => r.asetSize > 0);
const cert = zeros.filter(r => r.certified), fp = pos.filter(r => r.certified);
console.log('=== propagation certificates ===');
console.log('zero-Aset E certified : ' + cert.length + ' / ' + zeros.length);
const h = {}; for (const r of cert) h[r.emptyDepth] = (h[r.emptyDepth] || 0) + 1;
console.log('  empty-domain depth histogram : ' + JSON.stringify(h));
console.log('positive-Aset E wrongly certified (MUST be 0): ' + fp.length);
if (fp.length) console.log('  ' + JSON.stringify(fp.map(r => r.eIndex)));
console.log('uncertified zeros : ' + JSON.stringify(zeros.filter(r => !r.certified).map(r => r.eIndex)));
console.log('\npositive-E residual domain totals (min/median/max): ' +
  (() => { const v = pos.map(r => r.totalRemaining).sort((a, b) => a - b); return v[0] + ' / ' + v[Math.floor(v.length / 2)] + ' / ' + v[v.length - 1]; })());
fs.writeFileSync('../runs/aset_propagation.json', JSON.stringify({ rows: out }, null, 1));
console.log('persisted -> runs/aset_propagation.json');
