'use strict';
/* PHASE 4/5 -- closed-form depth-1 obstruction, plus singleton shaving (SAC).
 *
 * DEPTH-1 SUFFIX OBSTRUCTION (closed form).
 * For k = 2..20 put
 *      d_k(E) = Psi( E[41-2k .. 41-k) )  -  Psi( E[41-k .. 40) ).
 * The first block has length k, the second length k-1, so |d_k| = 1: either
 * d_k = e_alpha for a letter alpha, or d_k has a negative coordinate.
 * Setting A[0] = alpha makes W = E.A carry an abelian square of half-period k
 * ending at position 41 exactly when d_k = e_alpha. Hence
 *
 *      BLOCKED(E) := { alpha : exists k in [2,20] with d_k(E) = e_alpha }
 *      BLOCKED(E) = {a,b,c}   ==>   Aset(E) = empty.
 *
 * SHAVING (singleton arc consistency): for each state x in D_m, assume
 * D_m = {x}, re-propagate, and delete x if that collapses. Sound, and strictly
 * stronger than plain propagation.
 */
const fs = require('fs'), D = require('./aset_defs.js');
const { LE, LA, KMAX, PROF_A, parikhPrefix } = D;
const key = v => v[0] + ',' + v[1] + ',' + v[2];
const unkey = s => s.split(',').map(Number);

/* ---- closed-form depth-1 test ------------------------------------------ */
function blockedLetters(E) {
  const p = parikhPrefix(E);
  const blocked = new Set(), why = {};
  for (let k = 2; k <= 20; k++) {
    const lo = LE + 1 - 2 * k, mid = LE + 1 - k;          // block1 = E[lo..mid), block2 = E[mid..40)
    if (lo < 0) continue;
    const d = [p[mid][0] - p[lo][0] - (p[LE][0] - p[mid][0]),
               p[mid][1] - p[lo][1] - (p[LE][1] - p[mid][1]),
               p[mid][2] - p[lo][2] - (p[LE][2] - p[mid][2])];
    for (let c = 0; c < 3; c++) {
      const isUnit = d[c] === 1 && d[(c + 1) % 3] === 0 && d[(c + 2) % 3] === 0;
      if (isUnit && !blocked.has(c)) { blocked.add(c); why['abc'[c]] = k; }
    }
  }
  return { blocked: [...blocked].sort().map(c => 'abc'[c]), why };
}
/* ---- propagation (same rules as aset_propagate.js) --------------------- */
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
    } return out;
}
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
  } return { ternary, binary, unary };
}
function runProp(C, Dom, maxRounds) {
  const del = (m, kk) => Dom[m].delete(kk);
  let changed = true, rounds = 0;
  while (changed && rounds < maxRounds) {
    changed = false; rounds++;
    for (let m = 1; m <= LA; m++) for (const kk of [...Dom[m]]) {
      const x = unkey(kk); let ok = false;
      for (let c = 0; c < 3 && !ok; c++) { const y = x.slice(); y[c]--; if (y[c] >= 0 && Dom[m - 1].has(key(y))) ok = true; }
      if (!ok && del(m, kk)) changed = true;
    }
    for (let m = LA - 1; m >= 0; m--) for (const kk of [...Dom[m]]) {
      const x = unkey(kk); let ok = false;
      for (let c = 0; c < 3 && !ok; c++) { const y = x.slice(); y[c]++; if (y[c] <= PROF_A[c] && Dom[m + 1].has(key(y))) ok = true; }
      if (!ok && del(m, kk)) changed = true;
    }
    for (const b of C.binary) {
      const lo = b.m - b.k;
      if (Dom[lo].size === 1) { const y = unkey([...Dom[lo]][0]);
        const x = [b.t[0] + 2 * y[0], b.t[1] + 2 * y[1], b.t[2] + 2 * y[2]];
        if (Dom[b.m].has(key(x)) && del(b.m, key(x))) changed = true; }
      if (Dom[b.m].size === 1) { const x = unkey([...Dom[b.m]][0]);
        const two = [x[0] - b.t[0], x[1] - b.t[1], x[2] - b.t[2]];
        if (!(two[0] % 2 || two[1] % 2 || two[2] % 2)) { const y = [two[0] / 2, two[1] / 2, two[2] / 2];
          if (Dom[lo].has(key(y)) && del(lo, key(y))) changed = true; } }
    }
    for (const t of C.ternary) {
      const a = t.m, b2 = t.m - t.k, c2 = t.m - 2 * t.k;
      if (Dom[b2].size === 1 && Dom[c2].size === 1 && Dom[a].size > 0) {
        const y = unkey([...Dom[b2]][0]), z = unkey([...Dom[c2]][0]);
        const x = [2 * y[0] - z[0], 2 * y[1] - z[1], 2 * y[2] - z[2]];
        if (Dom[a].has(key(x)) && del(a, key(x))) changed = true; }
      if (Dom[a].size === 1 && Dom[c2].size === 1 && Dom[b2].size > 0) {
        const x = unkey([...Dom[a]][0]), z = unkey([...Dom[c2]][0]);
        const s2 = [x[0] + z[0], x[1] + z[1], x[2] + z[2]];
        if (!(s2[0] % 2 || s2[1] % 2 || s2[2] % 2)) { const y = [s2[0] / 2, s2[1] / 2, s2[2] / 2];
          if (Dom[b2].has(key(y)) && del(b2, key(y))) changed = true; } }
      if (Dom[a].size === 1 && Dom[b2].size === 1 && Dom[c2].size > 0) {
        const x = unkey([...Dom[a]][0]), y = unkey([...Dom[b2]][0]);
        const z = [2 * y[0] - x[0], 2 * y[1] - x[1], 2 * y[2] - x[2]];
        if (Dom[c2].has(key(z)) && del(c2, key(z))) changed = true; }
    }
    for (let m = 0; m <= LA; m++) if (Dom[m].size === 0) return { empty: true, depth: m };
  }
  return { empty: false };
}
function initDom(E, C) {
  const Dom = []; for (let m = 0; m <= LA; m++) Dom.push(new Set(Sm(m).map(key)));
  Dom[0] = new Set([key([0, 0, 0])]); Dom[LA] = new Set([key(PROF_A)]);
  for (const u of C.unary) Dom[u.m].delete(key(u.t));
  for (const b of C.binary) if (b.k === b.m) Dom[b.m].delete(key(b.t));
  return Dom;
}
function shave(E, maxDepth, maxRounds) {
  const C = constraintLists(E);
  let Dom = initDom(E, C);
  let r = runProp(C, Dom, maxRounds);
  if (r.empty) return { certified: true, via: 'propagation', depth: r.depth, shaved: 0 };
  let shaved = 0, changed = true, passes = 0;
  while (changed && passes < 6) {
    changed = false; passes++;
    for (let m = 1; m <= Math.min(maxDepth, LA - 1); m++) {
      for (const kk of [...Dom[m]]) {
        if (Dom[m].size === 1) break;
        const test = Dom.map(s => new Set(s));
        test[m] = new Set([kk]);
        if (runProp(C, test, maxRounds).empty) { Dom[m].delete(kk); shaved++; changed = true; }
      }
      if (Dom[m].size === 0) return { certified: true, via: 'shaving', depth: m, shaved };
    }
    r = runProp(C, Dom, maxRounds);
    if (r.empty) return { certified: true, via: 'shaving+propagation', depth: r.depth, shaved };
  }
  return { certified: false, shaved, sizes: Dom.map(d => d.size) };
}

const frozen = JSON.parse(fs.readFileSync('../runs/aset_E_frozen.json', 'utf8'));
const out = [];
for (const r of frozen.rows) {
  const bl = blockedLetters(r.E);
  const depth1 = bl.blocked.length === 3;
  out.push({ population: r.population, eIndex: r.eIndex, E_sha256: r.E_sha256, asetSize: r.asetSize,
    blockedLetters: bl.blocked, blockedWitnessK: bl.why, depth1Obstruction: depth1 });
}
const z = out.filter(r => r.asetSize === 0), p = out.filter(r => r.asetSize > 0);
console.log('=== closed-form depth-1 suffix obstruction ===');
console.log('zero-Aset E with BLOCKED = {a,b,c} : ' + z.filter(r => r.depth1Obstruction).length + ' / ' + z.length);
console.log('positive-Aset E with it (MUST be 0): ' + p.filter(r => r.depth1Obstruction).length);
const bh = {}; for (const r of z) bh[r.blockedLetters.length] = (bh[r.blockedLetters.length] || 0) + 1;
const bp = {}; for (const r of p) bp[r.blockedLetters.length] = (bp[r.blockedLetters.length] || 0) + 1;
console.log('|BLOCKED| histogram, zero-Aset E     : ' + JSON.stringify(bh));
console.log('|BLOCKED| histogram, positive-Aset E : ' + JSON.stringify(bp));

console.log('\n=== shaving on the six propagation-resistant zeros ===');
const resistant = [4, 9, 20, 23, 38, 43];
for (const ei of resistant) {
  const row = frozen.rows.find(f => f.population === 'R' && f.eIndex === ei);
  const t0 = Date.now();
  const s = shave(row.E, 8, 40);
  console.log('  e=' + ei + '  ' + JSON.stringify(s).slice(0, 160) + '  (' + ((Date.now() - t0) / 1000).toFixed(1) + 's)');
  out.find(o => o.population === 'R' && o.eIndex === ei).shaving = s;
}
console.log('\n=== shaving soundness check on positives (must never certify) ===');
let bad = 0;
for (const row of frozen.rows.filter(f => f.asetSize > 0).slice(0, 12)) {
  const s = shave(row.E, 4, 30);
  if (s.certified) { bad++; console.log('  FALSE POSITIVE at ' + row.population + '[' + row.eIndex + ']'); }
}
console.log('  false positives among 12 sampled positive E: ' + bad);
fs.writeFileSync('../runs/aset_theorem.json', JSON.stringify({ rows: out }, null, 1));
console.log('persisted -> runs/aset_theorem.json');
