'use strict';
/* Independent check of v0.32a Theorem 8.1 (six domains, 34 patterns, 19 families)
 * and of every closed cardinality in Table 1.
 * Built from the domain descriptions in section 8 only. */
const key = t => t.map(e => e[1] + '*x' + e[0]).join('+');
function red(triple, chi, L) {
  const acc = new Map(); const coef = [1, -2, 1];
  for (let j = 0; j < 3; j++) {
    if (!chi[j]) continue;
    const d = triple[j];
    if (d === 0) continue;                    // x_0 = 0
    acc.set(d, (acc.get(d) || 0) + coef[j]);
  }
  const t = [...acc.entries()].filter(e => e[1] !== 0).sort((a, b) => a[0] - b[0]);
  return key(t);
}
/* the six carry domains as triples (i0,i1,i2), with their block-equality pattern */
function domains(L) {
  const Zs = [], Pt = [], Mt = [], Z = [], P = [], M = [];
  // Z_s : q=0, carries 00 : i=(a, a+h, a+2h), h>=2, a+2h < L   (one block)
  for (let a = 0; a < L; a++) for (let h = 2; a + 2 * h < L; h++) Zs.push([a, a + h, a + 2 * h]);
  // P_t : q=0, carries 01 : i=(a, a+r, a+2r-L), r=h>=2, a+h<L, 0<=a+2h-L<L  (b0=b1<b2)
  for (let a = 0; a < L; a++) for (let h = 2; h < L; h++) {
    if (a + h >= L) continue; const i2 = a + 2 * h - L;
    if (i2 < 0 || i2 >= L) continue; Pt.push([a, a + h, i2]);
  }
  // M_t : q=0, carries 10 : i1=a+r-L, i2=a+2r-L, r=h>=2  (b0<b1=b2)
  for (let a = 0; a < L; a++) for (let h = 2; h < L; h++) {
    const i1 = a + h - L, i2 = a + 2 * h - L;
    if (i1 < 0 || i1 >= L || i2 < 0 || i2 >= L) continue; Mt.push([a, i1, i2]);
  }
  // full domains, three distinct blocks
  for (let u = 0; u < L; u++) for (let v = 0; v < L; v++) {
    const wZ = 2 * v - u, wP = 2 * v - L - u, wM = 2 * v + L - u;
    if (wZ >= 0 && wZ < L) Z.push([u, v, wZ]);
    if (wP >= 0 && wP < L) P.push([u, v, wP]);
    if (wM >= 0 && wM < L) M.push([u, v, wM]);
  }
  return { Zs, Pt, Mt, Z, P, M };
}
/* chi patterns allowed by each domain's block-equality structure */
const CHI = {
  Zs: [[0, 0, 0], [1, 1, 1]],                                  // one block
  Pt: [], Mt: [], Z: [], P: [], M: []
};
for (let x = 0; x < 2; x++) for (let y = 0; y < 2; y++) CHI.Pt.push([x, x, y]);   // b0=b1, b2
for (let x = 0; x < 2; x++) for (let y = 0; y < 2; y++) CHI.Mt.push([x, y, y]);   // b0, b1=b2
for (let p = 0; p < 8; p++) { const c = [(p >> 2) & 1, (p >> 1) & 1, p & 1]; CHI.Z.push(c); CHI.P.push(c); CHI.M.push(c); }

function analyse(L) {
  const D = domains(L);
  const patterns = [];
  for (const name of ['Zs', 'Pt', 'Mt', 'Z', 'P', 'M'])
    for (const chi of CHI[name]) {
      const S = new Set();
      for (const t of D[name]) S.add(red(t, chi, L));
      patterns.push({ name, chi: chi.join(''), set: S, sig: S.size + '#' + [...S].sort().join('|') });
    }
  const fam = new Map();
  for (const p of patterns) { if (!fam.has(p.sig)) fam.set(p.sig, { members: [], size: p.set.size }); fam.get(p.sig).members.push(p.name + ':' + p.chi); }
  return { patterns: patterns.length, families: fam.size, fam,
    domainSizes: Object.fromEntries(Object.entries(D).map(([k, v]) => [k, v.length])) };
}
console.log('=== Theorem 8.1 independent check ===');
for (const L of [2, 3, 4, 5, 6, 7, 8, 12, 40]) {
  const r = analyse(L);
  console.log('L=' + String(L).padStart(2) + '  patterns=' + r.patterns + '  families=' + r.families +
    '   |Z_s|=' + r.domainSizes.Zs + ' |P_t|=' + r.domainSizes.Pt + ' |M_t|=' + r.domainSizes.Mt +
    ' |Z|=' + r.domainSizes.Z + ' |P|=' + r.domainSizes.P + ' |M|=' + r.domainSizes.M);
}
/* Table 1 cardinalities at L=40 */
const L = 40, r = analyse(L);
const sizes = [...r.fam.values()].map(v => ({ size: v.size, members: v.members.join(',') })).sort((a, b) => a.size - b.size);
console.log('\n=== family cardinalities at L=40 (independent) ===');
for (const s of sizes) console.log('  ' + String(s.size).padStart(4) + '  <- ' + s.members);
const claimed = [1, 342, 40, 40, 800, 420, 381, 39, 20, 400, 210, 210, 399, 39, 20, 400, 210, 210, 399];
const got = sizes.map(s => s.size).sort((a, b) => a - b);
const cl = claimed.slice().sort((a, b) => a - b);
console.log('\nTable 1 multiset match: ' + (JSON.stringify(got) === JSON.stringify(cl)));
console.log('  claimed: ' + JSON.stringify(cl));
console.log('  actual : ' + JSON.stringify(got));
/* truncation points */
console.log('\np+ = (L-2,L-1,0) in P but not P_t? ' +
  (analyse(L).domainSizes.P - analyse(L).domainSizes.Pt) + ' point(s) difference P vs P_t');
console.log('p- difference M vs M_t: ' + (analyse(L).domainSizes.M - analyse(L).domainSizes.Mt));
require('fs').writeFileSync('../runs/v032a_sixdomain_check.json', JSON.stringify(
  { L40: { patterns: r.patterns, families: r.families, sizes: sizes.map(s => s.size) },
    byL: [2, 3, 4, 5, 6, 7, 8, 12, 40].map(l => { const x = analyse(l); return { L: l, patterns: x.patterns, families: x.families }; }) }, null, 1));
