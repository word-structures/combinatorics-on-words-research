'use strict';
/* AFE K<=40 exact affine constraint system over x_j = p_F(j), j=0..40, plus an exact solver.
 * Structure established in the hypergraph anatomy:
 *   342 ternary  (1,-2,1), depths in arithmetic progression, macro 0, no A/E terms
 *                => exactly "F is abelian-square-free"; A/E-INDEPENDENT
 *   703 arity-0  => pure (A,E) conditions; if any holds, NO F can work
 *  1238 unary    (80 shapes, coefs +1/-2) => forbidden single prefix states
 *   798 binary   (coefs (-2,1)/(1,-2))    => relations coupling x_i and x_j
 * Solver: prefix DFS over F with early activation of each constraint whose maximum
 * referenced depth has just been reached. DFS carries the whole prefix, so no state
 * compression is needed despite the dense primal graph (active window 38).
 */
const L = 40, V = "afe";
const PROFILE = { a: [15, 14, 11], e: [13, 16, 11], f: [19, 11, 10] };
const add = (u, w) => [u[0] + w[0], u[1] + w[1], u[2] + w[2]];
const mul = (u, k) => [u[0] * k, u[1] * k, u[2] * k];
function decomp(p) { if (p === L * V.length) return [V.length - 1, L]; const q = Math.floor(p / L); return [q, p - L * q]; }
function S(q) { let s = [0, 0, 0]; for (let j = 0; j < q; j++) s = add(s, PROFILE[V[j]]); return s; }
function prefixes(w) { const a = [[0, 0, 0]]; for (let i = 0; i < w.length; i++) { const p = a[i].slice(); p[w.charCodeAt(i) - 97]++; a.push(p); } return a; }

const WIN = [];
for (let K = 2; K <= 40; K++) for (let s = 0; s + 2 * K <= L * V.length; s++) {
  const cuts = [[s, 1], [s + K, -2], [s + 2 * K, 1]];
  const fT = [], other = []; let macro = [0, 0, 0];
  for (const cut of cuts) {
    const p = cut[0], c = cut[1];
    const dq = decomp(p), q = dq[0], t = dq[1];
    macro = add(macro, mul(S(q), c));
    if (V[q] === 'f') fT.push({ c: c, t: t }); else other.push({ role: V[q], t: t, c: c });
  }
  fT.sort((a, b) => a.t - b.t);
  WIN.push({ s: s, K: K, fT: fT, other: other, macro: macro });
}

function compile(A, E) {
  const pA = prefixes(A), pE = prefixes(E);
  const unary = new Map(); const binary = []; let dead = false;
  for (const w of WIN) {
    let C = w.macro.slice();
    for (const o of w.other) { const pv = (o.role === 'a' ? pA : pE)[o.t]; C = [C[0] + pv[0] * o.c, C[1] + pv[1] * o.c, C[2] + pv[2] * o.c]; }
    if (w.fT.length === 0) { if (C[0] === 0 && C[1] === 0 && C[2] === 0) dead = true; continue; }
    if (w.fT.length === 3) continue;                      // == F abelian-square-free
    if (w.fT.length === 1) {
      const c = w.fT[0].c, t = w.fT[0].t;
      const tg = [0, 1, 2].map(k => -C[k] / c);
      if (!tg.every(Number.isInteger)) continue;
      if (tg.some((v, k) => v < 0 || v > PROFILE.f[k])) continue;
      if (tg[0] + tg[1] + tg[2] !== t) continue;
      if (!unary.has(t)) unary.set(t, new Set());
      unary.get(t).add(tg.join(","));
      continue;
    }
    const p = w.fT[0], q = w.fT[1];
    binary.push({ i: p.t, ci: p.c, j: q.t, cj: q.c, C: C });
  }
  return { dead: dead, unary: unary, binary: binary };
}

function afeExists(A, E, cap) {
  const cc = compile(A, E);
  if (cc.dead) return { exists: false, reason: "A/E-only obstruction", nodes: 0, capped: false };
  const byMax = new Map();
  for (const b of cc.binary) { const m = Math.max(b.i, b.j); if (!byMax.has(m)) byMax.set(m, []); byMax.get(m).push(b); }
  const PF = PROFILE.f;
  const x = [[0, 0, 0]]; const need = PF.slice(); const w = new Uint8Array(40);
  let nodes = 0, capped = false, found = null;
  function selfClean(d) {
    for (let k = 2; 2 * k <= d; k++) {
      const a = x[d - 2 * k], b = x[d - k], c = x[d];
      if (b[0] - a[0] === c[0] - b[0] && b[1] - a[1] === c[1] - b[1] && b[2] - a[2] === c[2] - b[2]) return false;
    }
    return true;
  }
  function ok(d) {
    if (!selfClean(d)) return false;
    const u = cc.unary.get(d); if (u && u.has(x[d].join(","))) return false;
    const bs = byMax.get(d);
    if (bs) for (const b of bs) {
      const xi = x[b.i], xj = x[b.j];
      if (b.ci * xi[0] + b.cj * xj[0] + b.C[0] === 0 &&
          b.ci * xi[1] + b.cj * xj[1] + b.C[1] === 0 &&
          b.ci * xi[2] + b.cj * xj[2] + b.C[2] === 0) return false;
    }
    return true;
  }
  const u0 = cc.unary.get(0);
  if (u0 && u0.has("0,0,0")) return { exists: false, reason: "x_0 forbidden", nodes: 0, capped: false };
  (function rec(d) {
    if (found || capped) return;
    if (++nodes > cap) { capped = true; return; }
    if (d === 40) { found = Array.from(w).map(v => "abc"[v]).join(""); return; }
    for (let c = 0; c < 3; c++) {
      if (!need[c]) continue;
      const nx = x[d].slice(); nx[c]++; x[d + 1] = nx;
      if (ok(d + 1)) { w[d] = c; need[c]--; rec(d + 1); need[c]++; }
      if (found || capped) return;
    }
  })(0);
  return { exists: found !== null, witness: found, nodes: nodes, capped: capped,
           stats: { unaryDepths: cc.unary.size, unaryStates: Array.from(cc.unary.values()).reduce((s, y) => s + y.size, 0), binary: cc.binary.length } };
}

function afeDirect(A, E, F) {
  const H = A + F + E;
  for (let K = 2; K <= 40; K++) for (let s = 0; s + 2 * K <= H.length; s++) {
    const c1 = [0, 0, 0], c2 = [0, 0, 0];
    for (let t = 0; t < K; t++) { c1[H.charCodeAt(s + t) - 97]++; c2[H.charCodeAt(s + K + t) - 97]++; }
    if (c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2]) return { square: true, K: K, s: s };
  }
  return { square: false };
}

function afeAffine(A, E, F) {
  const cc = compile(A, E);
  if (cc.dead) return true;
  const x = prefixes(F);
  for (let d = 2; d <= 40; d++) for (let k = 2; 2 * k <= d; k++) {
    const a = x[d - 2 * k], b = x[d - k], c = x[d];
    if (b[0] - a[0] === c[0] - b[0] && b[1] - a[1] === c[1] - b[1] && b[2] - a[2] === c[2] - b[2]) return true;
  }
  for (const entry of cc.unary) { const d = entry[0], set = entry[1]; if (set.has(x[d].join(","))) return true; }
  for (const b of cc.binary) {
    const xi = x[b.i], xj = x[b.j];
    if (b.ci * xi[0] + b.cj * xj[0] + b.C[0] === 0 &&
        b.ci * xi[1] + b.cj * xj[1] + b.C[1] === 0 &&
        b.ci * xi[2] + b.cj * xj[2] + b.C[2] === 0) return true;
  }
  return false;
}

module.exports = { compile, afeExists, afeDirect, afeAffine, WIN, prefixes, PROFILE };
