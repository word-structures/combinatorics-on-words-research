'use strict';
/* PHASE 2 -- find an L-INDEPENDENT distinguishing invariant for every pair of
 * the 19 stable families, so that distinctness stops being finite-range
 * verification. The script does not prove anything; it identifies which
 * invariant separates which pair and checks stability across a wide L range,
 * so the proof document can then argue each invariant structurally. */
const fs = require('fs');
const fmt = t => t.map(e => (e[1] > 0 ? '+' : '') + e[1] + 'x' + e[0]).join('');
function red(tr, chi) {
  const acc = new Map(); const coef = [1, -2, 1];
  for (let j = 0; j < 3; j++) { if (!chi[j]) continue; const d = tr[j]; if (d === 0) continue;
    acc.set(d, (acc.get(d) || 0) + coef[j]); }
  return fmt([...acc.entries()].filter(e => e[1] !== 0).sort((a, b) => a[0] - b[0]));
}
function domains(L) {
  const Zs = [], Pt = [], Mt = [], Z = [], P = [], M = [];
  for (let a = 0; a < L; a++) for (let r = 2; a + 2 * r <= L - 1; r++) Zs.push([a, a + r, a + 2 * r]);
  for (let a = 0; a < L; a++) for (let r = 2; r < L; r++) {
    if (a + r > L - 1) continue; const w = a + 2 * r - L; if (w < 0 || w > L - 1) continue; Pt.push([a, a + r, w]); }
  for (let a = 0; a < L; a++) for (let r = 2; r < L; r++) {
    const v = a + r - L, w = a + 2 * r - L; if (v < 0 || v > L - 1 || w < 0 || w > L - 1) continue; Mt.push([a, v, w]); }
  for (let u = 0; u < L; u++) for (let v = 0; v < L; v++) {
    const wZ = 2 * v - u, wP = 2 * v - L - u, wM = 2 * v + L - u;
    if (wZ >= 0 && wZ < L) Z.push([u, v, wZ]);
    if (wP >= 0 && wP < L) P.push([u, v, wP]);
    if (wM >= 0 && wM < L) M.push([u, v, wM]); }
  return { Zs, Pt, Mt, Z, P, M };
}
const FAM = {  // class -> one representative (domain, mask); families are equal by Theorem 6.3
  'E': ['Z', [0, 0, 0]], 'Zs-A': ['Zs', [1, 1, 1]],
  'Z-O': ['Z', [0, 0, 1]], 'Z-C': ['Z', [0, 1, 0]], 'Z-M': ['Z', [0, 1, 1]],
  'Z-OO': ['Z', [1, 0, 1]], 'Z-A': ['Z', [1, 1, 1]],
  'P-O': ['P', [0, 0, 1]], 'P-C': ['P', [0, 1, 0]], 'P-M': ['P', [0, 1, 1]],
  'P-OO': ['P', [1, 0, 1]], 'P-A': ['P', [1, 1, 1]], 'Pt-M': ['Pt', [1, 1, 0]],
  'M-O': ['M', [0, 0, 1]], 'M-C': ['M', [0, 1, 0]], 'M-M': ['M', [0, 1, 1]],
  'M-OO': ['M', [1, 0, 1]], 'M-A': ['M', [1, 1, 1]], 'Mt-M': ['Mt', [0, 1, 1]]
};
const CARD = {
  'E': L => 1, 'Zs-A': L => Math.floor((L - 3) ** 2 / 4), 'Z-O': L => L, 'Z-C': L => L,
  'Z-M': L => Math.ceil(L * L / 2), 'Z-OO': L => Math.floor((L + 1) ** 2 / 4),
  'Z-A': L => Math.floor((L - 1) ** 2 / 4) + 1, 'P-O': L => L - 1, 'P-C': L => Math.floor(L / 2),
  'P-M': L => Math.floor(L * L / 4), 'P-OO': L => Math.floor(L / 2) * (Math.floor(L / 2) + 1) / 2,
  'P-A': L => Math.floor(L / 2) * (Math.floor(L / 2) + 1) / 2, 'Pt-M': L => Math.floor(L * L / 4) - 1,
  'M-O': L => L - 1, 'M-C': L => Math.floor(L / 2), 'M-M': L => Math.floor(L * L / 4),
  'M-OO': L => Math.floor(L / 2) * (Math.floor(L / 2) + 1) / 2,
  'M-A': L => Math.floor(L / 2) * (Math.floor(L / 2) + 1) / 2, 'Mt-M': L => Math.floor(L * L / 4) - 1
};
function familySet(name, L) {
  const [dom, chi] = FAM[name]; const D = domains(L);
  return new Set(D[dom].map(t => red(t, chi)));
}
/* candidate L-independent invariants */
function inv(S) {
  const shapes = new Set(); let empty = false, maxAr = 0;
  const coefs = new Set();
  for (const s of S) {
    if (s === '') { empty = true; continue; }
    const cs = [...s.matchAll(/([+-]?\d+)x/g)].map(m => +m[1]);
    shapes.add(cs.join(',')); maxAr = Math.max(maxAr, cs.length);
    for (const c of cs) coefs.add(c);
  }
  return {
    hasEmpty: empty,
    maxArity: maxAr,
    shapes: [...shapes].sort().join(';'),
    hasUnaryPlus1: shapes.has('1'), hasUnaryMinus2: shapes.has('-2'),
    hasCoefPlus2: coefs.has(2), hasCoefMinus1: coefs.has(-1),
    hasTernary: maxAr === 3
  };
}
const NAMES = Object.keys(FAM);
const LS = []; for (let L = 5; L <= 80; L++) LS.push(L);
/* per-L invariant tables */
const invByL = new Map();
for (const L of LS) { const m = {}; for (const n of NAMES) m[n] = inv(familySet(n, L)); invByL.set(L, m); }

/* choose, for each pair, a separator that works for EVERY tested L */
const CANDS = [
  ['cardinality', (a, b, L, I) => CARD[a](L) !== CARD[b](L)],
  ['contains empty signature', (a, b, L, I) => I[a].hasEmpty !== I[b].hasEmpty],
  ['max arity', (a, b, L, I) => I[a].maxArity !== I[b].maxArity],
  ['has unary +1', (a, b, L, I) => I[a].hasUnaryPlus1 !== I[b].hasUnaryPlus1],
  ['has unary -2', (a, b, L, I) => I[a].hasUnaryMinus2 !== I[b].hasUnaryMinus2],
  ['has coefficient +2', (a, b, L, I) => I[a].hasCoefPlus2 !== I[b].hasCoefPlus2],
  ['has coefficient -1', (a, b, L, I) => I[a].hasCoefMinus1 !== I[b].hasCoefMinus1],
  ['has ternary signature', (a, b, L, I) => I[a].hasTernary !== I[b].hasTernary],
  ['shape spectrum', (a, b, L, I) => I[a].shapes !== I[b].shapes]
];
const rows = []; const unresolved = [];
for (let i = 0; i < NAMES.length; i++) for (let j = i + 1; j < NAMES.length; j++) {
  const a = NAMES[i], b = NAMES[j];
  let chosen = null;
  for (const [nm, f] of CANDS) {
    if (LS.every(L => f(a, b, L, invByL.get(L)))) { chosen = nm; break; }
  }
  if (!chosen) unresolved.push([a, b]);
  const sameCard = LS.every(L => CARD[a](L) === CARD[b](L));
  rows.push({ a, b, sameCardinalityAllL: sameCard, separator: chosen || 'NONE UNIFORM' });
}
console.log('=== pairs: ' + rows.length + ' ===');
console.log('pairs with NO uniform separator: ' + unresolved.length +
  (unresolved.length ? ' ' + JSON.stringify(unresolved) : ''));
const bySep = {}; for (const r of rows) bySep[r.separator] = (bySep[r.separator] || 0) + 1;
console.log('separator usage: ' + JSON.stringify(bySep, null, 1));
const sameCard = rows.filter(r => r.sameCardinalityAllL);
console.log('\n=== pairs with EQUAL cardinality for all tested L (' + sameCard.length + ') ===');
for (const r of sameCard) console.log('  ' + r.a.padEnd(6) + ' vs ' + r.b.padEnd(6) + '  ->  ' + r.separator);

/* structural facts underpinning the invariants, checked across L */
console.log('\n=== structural facts (checked L=5..80) ===');
const facts = { 'P has no point with v=0': true, 'M has no point with u=0 or w=0': true,
  'Z attains u=v=w=0': true, 'M attains v=0': true, 'P attains w=0': true,
  'P has u,w <= L-2': true, 'M has v <= floor(L/2)-1': true };
for (const L of LS) {
  const D = domains(L);
  if (D.P.some(t => t[1] === 0)) facts['P has no point with v=0'] = false;
  if (D.M.some(t => t[0] === 0 || t[2] === 0)) facts['M has no point with u=0 or w=0'] = false;
  if (!D.Z.some(t => t[0] === 0 && t[1] === 0 && t[2] === 0)) facts['Z attains u=v=w=0'] = false;
  if (!D.M.some(t => t[1] === 0)) facts['M attains v=0'] = false;
  if (!D.P.some(t => t[2] === 0)) facts['P attains w=0'] = false;
  if (D.P.some(t => t[0] > L - 2 || t[2] > L - 2)) facts['P has u,w <= L-2'] = false;
  if (D.M.some(t => t[1] > Math.floor(L / 2) - 1)) facts['M has v <= floor(L/2)-1'] = false;
}
for (const [k, v] of Object.entries(facts)) console.log('  ' + (v ? 'HOLDS' : 'FAILS') + '  ' + k);

const csv = ['family_A,family_B,same_cardinality_all_L,distinguishing_invariant'];
for (const r of rows) csv.push([r.a, r.b, r.sameCardinalityAllL, '"' + r.separator + '"'].join(','));
fs.writeFileSync('../PAPER4_19_FAMILY_DISTINCTNESS_TABLE_2026-08-29.csv', csv.join('\n') + '\n');
fs.writeFileSync('../runs/distinctness_symbolic.json', JSON.stringify({ rows, unresolved, facts, bySep }, null, 1));
console.log('\npersisted -> PAPER4_19_FAMILY_DISTINCTNESS_TABLE_2026-08-29.csv');
