'use strict';
/* PHASE 2 / 4A / 4B -- exact UNSAT certificates for Aset(E) = empty.
 *
 * The UNARY constraints (k > m) forbid explicit VALUES of the prefix state x(m):
 *      x(m) != t   for each t in U_m(E).
 * Let S_m = { x in Z^3_{>=0} : |x| = m, x <= (15,14,11) } be the states allowed
 * by the A-profile alone. Then
 *
 *      S_m subset of U_m(E)  for some m   ==>   Aset(E) = empty.
 *
 * This is a CUTSET certificate in the A-prefix lattice: depth m is severed
 * using only E-determined data. It is sound regardless of the binary/ternary
 * constraints, which can only remove further states.
 *
 * We also compute the exact reachable sets R_m (all constraints, via DFS) to
 * see where the true search dies, and we minimise each certificate to a
 * smallest set of unary constraints (a minimum set cover of S_m).
 */
const fs = require('fs'), D = require('./aset_defs.js');
const { LE, LA, KMAX, PROF_A, parikhPrefix, sha } = D;
const key = v => v[0] + ',' + v[1] + ',' + v[2];

/* profile-feasible states at depth m */
function Sm(m) {
  const out = [];
  for (let a = Math.max(0, m - PROF_A[1] - PROF_A[2]); a <= Math.min(PROF_A[0], m); a++)
    for (let b = Math.max(0, m - a - PROF_A[2]); b <= Math.min(PROF_A[1], m - a); b++) {
      const c = m - a - b;
      if (c >= 0 && c <= PROF_A[2]) out.push([a, b, c]);
    }
  return out;
}
/* unary forbidden targets per depth, from E alone */
function unaryByDepth(E) {
  const p = parikhPrefix(E);
  const U = new Map();                       // m -> Map(key -> [k...])
  for (let m = 1; m <= LA; m++) {
    const n = LE + m, kmax = Math.min(KMAX, n >> 1);
    const mm = new Map();
    for (let k = m + 1; k <= kmax; k++) {
      const j1 = LE + m - k, j2 = LE + m - 2 * k;
      if (j2 < 0) continue;
      const t = [2 * p[j1][0] - p[j2][0] - p[LE][0],
                 2 * p[j1][1] - p[j2][1] - p[LE][1],
                 2 * p[j1][2] - p[j2][2] - p[LE][2]];
      const kk = key(t);
      if (!mm.has(kk)) mm.set(kk, []);
      mm.get(kk).push(k);
    }
    U.set(m, mm);
  }
  return U;
}
/* exact reachable prefix states under ALL constraints (instrumented DFS) */
function reachable(E) {
  const q = [new Int32Array(81), new Int32Array(81), new Int32Array(81)];
  for (let i = 0; i < LE; i++) { for (let t = 0; t < 3; t++) q[t][i + 1] = q[t][i]; q[E.charCodeAt(i) - 97][i + 1]++; }
  const need = PROF_A.slice(); const R = []; for (let m = 0; m <= LA; m++) R.push(new Set());
  let deepest = 0, nodes = 0;
  const st = [0, 0, 0];
  (function rec(m) {
    if (++nodes > 5e7) return;
    R[m].add(key(st)); if (m > deepest) deepest = m;
    if (m === LA) return;
    for (let c = 0; c < 3; c++) { if (!need[c]) continue; const pos = LE + m, nn = pos + 1;
      for (let t = 0; t < 3; t++) q[t][nn] = q[t][pos]; q[c][nn]++;
      if (D.endClean(q, nn, KMAX)) { need[c]--; st[c]++; rec(m + 1); st[c]--; need[c]++; } } })(0);
  return { R, deepest, nodes };
}
/* minimum set cover: fewest unary constraints whose targets cover all of S_m */
function minCover(states, mm) {
  const sKeys = states.map(key);
  const cands = [];                                   // one per distinct target that hits S_m
  for (const [tk, ks] of mm) if (sKeys.includes(tk)) cands.push({ target: tk, k: ks[0], ks });
  if (cands.length < sKeys.length) return null;        // cannot cover
  // each target covers exactly one state, so the cover is forced and minimal
  const covered = new Set(cands.map(c => c.target));
  if (!sKeys.every(s => covered.has(s))) return null;
  return cands.filter(c => sKeys.includes(c.target));
}

const frozen = JSON.parse(fs.readFileSync('../runs/aset_E_frozen.json', 'utf8'));
const out = [];
for (const r of frozen.rows) {
  const U = unaryByDepth(r.E);
  let cutDepth = null, cert = null;
  for (let m = 1; m <= LA; m++) {
    const S = Sm(m), mm = U.get(m);
    const surviving = S.filter(s => !mm.has(key(s)));
    if (surviving.length === 0) {
      cutDepth = m;
      cert = { depth: m, statesAtDepth: S.length, allForbidden: true,
        cover: minCover(S, mm).map(c => ({ state: c.target, k: c.k, allK: c.ks })) };
      break;
    }
  }
  const rec = { population: r.population, eIndex: r.eIndex, E_sha256: r.E_sha256,
    asetSize: r.asetSize, unaryCutDepth: cutDepth, certificate: cert };
  if (r.asetSize === 0) {
    const rr = reachable(r.E);
    rec.dfsDeepestDepth = rr.deepest; rec.dfsNodes = rr.nodes;
    rec.reachableSizes = rr.R.map(s => s.size).slice(0, Math.min(LA, rr.deepest + 2) + 1);
  }
  out.push(rec);
}
const zeros = out.filter(r => r.asetSize === 0);
const pos = out.filter(r => r.asetSize > 0);
console.log('=== PHASE 2: unary cutset certificates ===');
console.log('zero-Aset E              : ' + zeros.length);
console.log('  with a unary cut       : ' + zeros.filter(r => r.unaryCutDepth !== null).length);
console.log('  cut depths             : ' + JSON.stringify(zeros.filter(r => r.unaryCutDepth !== null).map(r => r.unaryCutDepth)));
console.log('  WITHOUT a unary cut    : ' + zeros.filter(r => r.unaryCutDepth === null).length);
console.log('positive-Aset E          : ' + pos.length);
console.log('  with a unary cut (must be 0): ' + pos.filter(r => r.unaryCutDepth !== null).length);
console.log('  DFS deepest depth for zeros : ' + JSON.stringify([...new Set(zeros.map(r => r.dfsDeepestDepth))].sort((a, b) => a - b)));
console.log('  DFS nodes for zeros (max)   : ' + Math.max(...zeros.map(r => r.dfsNodes)));
const hist = {}; for (const r of zeros) hist[r.unaryCutDepth] = (hist[r.unaryCutDepth] || 0) + 1;
console.log('  cut-depth histogram    : ' + JSON.stringify(hist));
console.log('\nS_m sizes at small depth : ' + [1, 2, 3, 4, 5].map(m => m + ':' + Sm(m).length).join('  '));
fs.writeFileSync('../runs/aset_certificates.json', JSON.stringify({ rows: out }, null, 1));
console.log('persisted -> runs/aset_certificates.json');
