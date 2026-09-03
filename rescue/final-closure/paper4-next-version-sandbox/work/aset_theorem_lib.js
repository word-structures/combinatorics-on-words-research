'use strict';
/* Library: closed-form depth-1 obstruction, propagation, shaving, fresh-E generator.
   Rules and derivations are documented in aset_theorem.js / aset_propagate.js. */
const D = require('./aset_defs.js'), R = require('./rng.js'), G = require('./gate.js');
const { LE, LA, KMAX, KMAX_E, PROF_A, PROF_E, parikhPrefix } = D;
const key = v => v[0] + ',' + v[1] + ',' + v[2];
const unkey = s => s.split(',').map(Number);

function blockedLetters(E) {
  const p = parikhPrefix(E);
  const blocked = new Set(), why = {};
  for (let k = 2; k <= 20; k++) {
    const lo = LE + 1 - 2 * k, mid = LE + 1 - k;
    if (lo < 0) continue;
    const d = [p[mid][0] - p[lo][0] - (p[LE][0] - p[mid][0]),
               p[mid][1] - p[lo][1] - (p[LE][1] - p[mid][1]),
               p[mid][2] - p[lo][2] - (p[LE][2] - p[mid][2])];
    for (let c = 0; c < 3; c++)
      if (d[c] === 1 && d[(c + 1) % 3] === 0 && d[(c + 2) % 3] === 0 && !blocked.has(c)) { blocked.add(c); why['abc'[c]] = k; }
  }
  return { blocked: [...blocked].sort().map(c => 'abc'[c]), why };
}
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
  let changed = true, rounds = 0;
  while (changed && rounds < maxRounds) {
    changed = false; rounds++;
    for (let m = 1; m <= LA; m++) for (const kk of [...Dom[m]]) {
      const x = unkey(kk); let ok = false;
      for (let c = 0; c < 3 && !ok; c++) { const y = x.slice(); y[c]--; if (y[c] >= 0 && Dom[m - 1].has(key(y))) ok = true; }
      if (!ok && Dom[m].delete(kk)) changed = true;
    }
    for (let m = LA - 1; m >= 0; m--) for (const kk of [...Dom[m]]) {
      const x = unkey(kk); let ok = false;
      for (let c = 0; c < 3 && !ok; c++) { const y = x.slice(); y[c]++; if (y[c] <= PROF_A[c] && Dom[m + 1].has(key(y))) ok = true; }
      if (!ok && Dom[m].delete(kk)) changed = true;
    }
    for (const b of C.binary) {
      const lo = b.m - b.k;
      if (Dom[lo].size === 1) { const y = unkey([...Dom[lo]][0]);
        const x = [b.t[0] + 2 * y[0], b.t[1] + 2 * y[1], b.t[2] + 2 * y[2]];
        if (Dom[b.m].has(key(x)) && Dom[b.m].delete(key(x))) changed = true; }
      if (Dom[b.m].size === 1) { const x = unkey([...Dom[b.m]][0]);
        const two = [x[0] - b.t[0], x[1] - b.t[1], x[2] - b.t[2]];
        if (!(two[0] % 2 || two[1] % 2 || two[2] % 2)) { const y = [two[0] / 2, two[1] / 2, two[2] / 2];
          if (Dom[lo].has(key(y)) && Dom[lo].delete(key(y))) changed = true; } }
    }
    for (const t of C.ternary) {
      const a = t.m, b2 = t.m - t.k, c2 = t.m - 2 * t.k;
      if (Dom[b2].size === 1 && Dom[c2].size === 1 && Dom[a].size > 0) {
        const y = unkey([...Dom[b2]][0]), z = unkey([...Dom[c2]][0]);
        const x = [2 * y[0] - z[0], 2 * y[1] - z[1], 2 * y[2] - z[2]];
        if (Dom[a].has(key(x)) && Dom[a].delete(key(x))) changed = true; }
      if (Dom[a].size === 1 && Dom[c2].size === 1 && Dom[b2].size > 0) {
        const x = unkey([...Dom[a]][0]), z = unkey([...Dom[c2]][0]);
        const s2 = [x[0] + z[0], x[1] + z[1], x[2] + z[2]];
        if (!(s2[0] % 2 || s2[1] % 2 || s2[2] % 2)) { const y = [s2[0] / 2, s2[1] / 2, s2[2] / 2];
          if (Dom[b2].has(key(y)) && Dom[b2].delete(key(y))) changed = true; } }
      if (Dom[a].size === 1 && Dom[b2].size === 1 && Dom[c2].size > 0) {
        const x = unkey([...Dom[a]][0]), y = unkey([...Dom[b2]][0]);
        const z = [2 * y[0] - x[0], 2 * y[1] - x[1], 2 * y[2] - x[2]];
        if (Dom[c2].has(key(z)) && Dom[c2].delete(key(z))) changed = true; }
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
  const Dom = initDom(E, C);
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
/* fresh non-canonical E, same generator as the frozen pool but a different seed */
function genE(seed, n) {
  const pools = D.pools, POOLE = new Set(pools.E);
  const rnd = R.mk(seed), out = [];
  const gen = () => { const need = PROF_E.slice(), w = new Uint8Array(LE);
    const q = [new Int32Array(41), new Int32Array(41), new Int32Array(41)]; let nodes = 0;
    function rec(m) { if (++nodes > 2e6) return false; if (m === LE) return true;
      const o = [0, 1, 2]; for (let i = 2; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = o[i]; o[i] = o[j]; o[j] = t; }
      for (const c of o) { if (!need[c]) continue; for (let t = 0; t < 3; t++) q[t][m + 1] = q[t][m]; q[c][m + 1]++;
        if (D.endClean(q, m + 1, KMAX_E)) { w[m] = c; need[c]--; if (rec(m + 1)) return true; need[c]++; } } return false; }
    return rec(0) ? Array.from(w).map(x => 'abc'[x]).join('') : null; };
  const seen = new Set();
  while (out.length < n) { const E = gen(); if (!E || POOLE.has(E) || seen.has(E)) continue; seen.add(E); out.push(E); }
  return out;
}
module.exports = { blockedLetters, sigmas, Sm, constraintLists, runProp, initDom, shave, genE };
