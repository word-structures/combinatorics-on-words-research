'use strict';
/* PHASES 2-4: complete derivation support for the six-domain / 34 / 19 theorem.
 * Everything here is EXACT integer enumeration; it is used to (a) verify each
 * closed-form cardinality derived by hand, (b) emit the 34-row pattern table,
 * (c) certify pairwise distinctness by explicit invariants, (d) probe the
 * small-L boundary. No claim is accepted from this script alone: each formula
 * is derived in the proof document and merely CHECKED here. */
const fs = require('fs');

const fmt = t => t.map(e => (e[1] > 0 ? '+' : '') + e[1] + 'x' + e[0]).join('');
function red(tr, chi) {
  const acc = new Map(); const coef = [1, -2, 1];
  for (let j = 0; j < 3; j++) {
    if (!chi[j]) continue;
    const d = tr[j];
    if (d === 0) continue;                          // x_0 = 0
    acc.set(d, (acc.get(d) || 0) + coef[j]);
  }
  const t = [...acc.entries()].filter(e => e[1] !== 0).sort((a, b) => a[0] - b[0]);
  return fmt(t);
}
/* ---- the six domains, from the carry derivation ------------------------- */
function domains(L) {
  const Zs = [], Pt = [], Mt = [], Z = [], P = [], M = [];
  // q=0, (c0,c1)=(0,0): i=(a, a+r, a+2r), r=K>=2, a+2r<=L-1
  for (let a = 0; a < L; a++) for (let r = 2; a + 2 * r <= L - 1; r++) Zs.push([a, a + r, a + 2 * r]);
  // q=0, (0,1): i=(a, a+r, a+2r-L), r>=2, a+r<=L-1, a+2r>=L
  for (let a = 0; a < L; a++) for (let r = 2; r < L; r++) {
    if (a + r > L - 1) continue; const w = a + 2 * r - L;
    if (w < 0 || w > L - 1) continue; Pt.push([a, a + r, w]);
  }
  // q=0, (1,0): i=(a, a+r-L, a+2r-L), r>=2, a+r>=L, a+2r<=2L-1
  for (let a = 0; a < L; a++) for (let r = 2; r < L; r++) {
    const v = a + r - L, w = a + 2 * r - L;
    if (v < 0 || v > L - 1 || w < 0 || w > L - 1) continue; Mt.push([a, v, w]);
  }
  // full lattice domains (q>=1 realizes every point; proved in the document)
  for (let u = 0; u < L; u++) for (let v = 0; v < L; v++) {
    const wZ = 2 * v - u, wP = 2 * v - L - u, wM = 2 * v + L - u;
    if (wZ >= 0 && wZ < L) Z.push([u, v, wZ]);
    if (wP >= 0 && wP < L) P.push([u, v, wP]);
    if (wM >= 0 && wM < L) M.push([u, v, wM]);
  }
  return { Zs, Pt, Mt, Z, P, M };
}
const CHI = { Zs: [[0, 0, 0], [1, 1, 1]], Pt: [], Mt: [], Z: [], P: [], M: [] };
for (let x = 0; x < 2; x++) for (let y = 0; y < 2; y++) CHI.Pt.push([x, x, y]);
for (let x = 0; x < 2; x++) for (let y = 0; y < 2; y++) CHI.Mt.push([x, y, y]);
for (let p = 0; p < 8; p++) { const c = [(p >> 2) & 1, (p >> 1) & 1, p & 1]; CHI.Z.push(c); CHI.P.push(c); CHI.M.push(c); }

function analyse(L) {
  const D = domains(L), pats = [];
  for (const name of ['Zs', 'Pt', 'Mt', 'Z', 'P', 'M'])
    for (const chi of CHI[name]) {
      const S = new Set();
      for (const t of D[name]) S.add(red(t, chi));
      pats.push({ name, chi: chi.join(''), S, key: S.size + '#' + [...S].sort().join('|') });
    }
  const fam = new Map();
  for (const p of pats) { if (!fam.has(p.key)) fam.set(p.key, { members: [], size: p.S.size, S: p.S }); fam.get(p.key).members.push(p.name + ':' + p.chi); }
  return { D, pats, fam };
}
/* ---- closed forms derived in the proof document ------------------------- */
const F = {
  'E': L => 1,
  'Zs-A': L => Math.floor((L - 3) * (L - 3) / 4),
  'Z-O': L => L,
  'Z-C': L => L,
  'Z-M': L => Math.ceil(L * L / 2),
  'Z-OO': L => Math.floor((L + 1) * (L + 1) / 4),
  'Z-A': L => Math.floor((L - 1) * (L - 1) / 4) + 1,
  'P-O': L => L - 1,
  'P-C': L => Math.floor(L / 2),
  'P-M': L => Math.floor(L * L / 4),
  'P-OO': L => (Math.floor(L / 2) + 1) * Math.floor(L / 2) / 2,
  'P-A': L => (Math.floor(L / 2) + 1) * Math.floor(L / 2) / 2,
  'Pt-M': L => Math.floor(L * L / 4) - 1,
  'M-O': L => L - 1,
  'M-C': L => Math.floor(L / 2),
  'M-M': L => Math.floor(L * L / 4),
  'M-OO': L => (Math.floor(L / 2) + 1) * Math.floor(L / 2) / 2,
  'M-A': L => (Math.floor(L / 2) + 1) * Math.floor(L / 2) / 2,
  'Mt-M': L => Math.floor(L * L / 4) - 1
};
/* canonical naming of a class by its member patterns */
function nameOf(members) {
  const m = members.join(',');
  if (m.includes('Zs:000')) return 'E';
  if (m === 'Zs:111') return 'Zs-A';
  if (m === 'Z:001,Z:100') return 'Z-O';
  if (m === 'Z:010') return 'Z-C';
  if (m === 'Z:011,Z:110') return 'Z-M';
  if (m === 'Z:101') return 'Z-OO';
  if (m === 'Z:111') return 'Z-A';
  if (m === 'Pt:001,P:001,P:100') return 'P-O';
  if (m === 'P:010') return 'P-C';
  if (m === 'P:011,P:110') return 'P-M';
  if (m === 'P:101') return 'P-OO';
  if (m === 'Pt:111,P:111') return 'P-A';
  if (m === 'Pt:110') return 'Pt-M';
  if (m === 'Mt:100,M:001,M:100') return 'M-O';
  if (m === 'M:010') return 'M-C';
  if (m === 'M:011,M:110') return 'M-M';
  if (m === 'M:101') return 'M-OO';
  if (m === 'Mt:111,M:111') return 'M-A';
  if (m === 'Mt:011') return 'Mt-M';
  return 'UNNAMED[' + m + ']';
}
/* ---- 1. structural counts across L -------------------------------------- */
console.log('=== structure by L ===');
const byL = [];
for (const L of [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 20, 40]) {
  const r = analyse(L);
  byL.push({ L, patterns: r.pats.length, families: r.fam.size });
  console.log('L=' + String(L).padStart(2) + ' patterns=' + r.pats.length + ' families=' + r.fam.size);
}
/* ---- 2. the exactly-one-boundary-point lemma ---------------------------- */
console.log('\n=== P\\P_t and M\\M_t (proved: exactly one point each) ===');
let bad = 0;
for (let L = 4; L <= 120; L++) {
  const D = domains(L);
  const setPt = new Set(D.Pt.map(t => t.join(','))), setMt = new Set(D.Mt.map(t => t.join(',')));
  const dP = D.P.filter(t => !setPt.has(t.join(','))), dM = D.M.filter(t => !setMt.has(t.join(',')));
  const okP = dP.length === 1 && dP[0][0] === L - 2 && dP[0][1] === L - 1 && dP[0][2] === 0;
  const okM = dM.length === 1 && dM[0][0] === L - 1 && dM[0][1] === 0 && dM[0][2] === 1;
  if (!okP || !okM) { bad++; if (bad < 4) console.log('  L=' + L + ' P diff ' + JSON.stringify(dP) + ' M diff ' + JSON.stringify(dM)); }
}
console.log('  L=4..120: p+=(L-2,L-1,0), p-=(L-1,0,1), failures = ' + bad);
/* ---- 3. cardinality formulas -------------------------------------------- */
console.log('\n=== closed-form cardinality check, L=5..200 ===');
let cardFail = [];
for (let L = 5; L <= 200; L++) {
  const r = analyse(L);
  for (const v of r.fam.values()) {
    const nm = nameOf(v.members);
    if (!F[nm]) { cardFail.push({ L, nm, size: v.size, reason: 'unnamed class' }); continue; }
    if (F[nm](L) !== v.size) cardFail.push({ L, nm, expected: F[nm](L), got: v.size });
  }
  if (r.fam.size !== 19) cardFail.push({ L, reason: 'family count ' + r.fam.size });
}
console.log('  failures: ' + cardFail.length + (cardFail.length ? ' ' + JSON.stringify(cardFail.slice(0, 5)) : ''));
/* ---- 4. pairwise distinctness by explicit invariants -------------------- */
function invariants(S) {
  const shapes = new Set(); let maxAr = 0, hasEmpty = false, coefs = new Set();
  for (const s of S) {
    if (s === '') { hasEmpty = true; shapes.add('E'); continue; }
    const cs = [...s.matchAll(/([+-]?\d+)x/g)].map(m => +m[1]);
    shapes.add(cs.join(',')); maxAr = Math.max(maxAr, cs.length);
    for (const c of cs) coefs.add(c);
  }
  return { shapeSpectrum: [...shapes].sort().join(';'), maxArity: maxAr, hasEmpty,
           coefSet: [...coefs].sort((a, b) => a - b).join(','), size: S.size };
}
console.log('\n=== pairwise distinctness, L=5..60 ===');
let distFail = [], sepBy = { shape: 0, card: 0, both: 0 };
for (let L = 5; L <= 60; L++) {
  const r = analyse(L);
  const fams = [...r.fam.values()].map(v => ({ nm: nameOf(v.members), inv: invariants(v.S) }));
  for (let i = 0; i < fams.length; i++) for (let j = i + 1; j < fams.length; j++) {
    const a = fams[i].inv, b = fams[j].inv;
    const shapeDiff = a.shapeSpectrum !== b.shapeSpectrum;
    const cardDiff = a.size !== b.size;
    if (!shapeDiff && !cardDiff) distFail.push({ L, a: fams[i].nm, b: fams[j].nm });
    else if (shapeDiff && cardDiff) sepBy.both++;
    else if (shapeDiff) sepBy.shape++;
    else sepBy.card++;
  }
}
console.log('  pairs not separated by (shape spectrum, cardinality): ' + distFail.length +
  (distFail.length ? ' ' + JSON.stringify(distFail.slice(0, 5)) : ''));
console.log('  separated by shape only: ' + sepBy.shape + ', by cardinality only: ' + sepBy.card + ', by both: ' + sepBy.both);
/* ---- 5. the 34-row table at L=40 ---------------------------------------- */
const L0 = 40, R0 = analyse(L0);
const classId = new Map(); let ci = 0;
for (const [k, v] of R0.fam) classId.set(k, { id: ++ci, name: nameOf(v.members), size: v.size });
const rows = R0.pats.map((p, idx) => {
  const c = classId.get(p.key);
  const inv = invariants(p.S);
  return { patternId: idx + 1, domain: p.name, roleMask: p.chi, supportSize: p.S.size,
    classId: c.id, className: c.name, shapeSpectrum: inv.shapeSpectrum, maxArity: inv.maxArity,
    containsEmpty: inv.hasEmpty };
});
console.log('\n=== 34-pattern table at L=40: ' + rows.length + ' rows, ' + classId.size + ' classes ===');
const csv = ['pattern_id,domain,role_mask,support_set_size_L40,class_id,class_name,coefficient_shape_spectrum,max_arity,contains_empty_signature'];
for (const r of rows) csv.push([r.patternId, r.domain, '"' + r.roleMask + '"', r.supportSize, r.classId,
  r.className, '"' + r.shapeSpectrum + '"', r.maxArity, r.containsEmpty].join(','));
fs.writeFileSync('../PAPER4_34_PATTERN_TO_19_FAMILY_TABLE_2026-08-29.csv', csv.join('\n') + '\n');
/* ---- 6. why P_t truncates exactly one class ----------------------------- */
console.log('\n=== truncation analysis: which chi masks are changed by removing p+ / p- ===');
for (const L of [8, 20, 40]) {
  const D = domains(L);
  const pPlus = [L - 2, L - 1, 0], pMinus = [L - 1, 0, 1];
  const out = [];
  for (const chi of CHI.Pt) {
    const full = new Set(D.P.map(t => red(t, chi)));
    const trunc = new Set(D.Pt.map(t => red(t, chi)));
    const sig = red(pPlus, chi);
    out.push(chi.join('') + ':' + (full.size === trunc.size ? 'same' : 'LOST[' + (sig === '' ? 'empty' : sig) + ']'));
  }
  console.log('  L=' + L + ' P_t masks -> ' + out.join('  '));
}
fs.writeFileSync('../runs/sixdomain_full.json', JSON.stringify({ byL, cardFailures: cardFail,
  distinctnessFailures: distFail, separation: sepBy, table: rows }, null, 1));
console.log('\npersisted -> PAPER4_34_PATTERN_TO_19_FAMILY_TABLE_2026-08-29.csv, runs/sixdomain_full.json');
