// Independent brute-force audit of Paper 6 FT1 / FT2 / recency-gauge claims.
// Written from the theorem statements only; shares no code path with the
// checkpoint's Python. Definitions used, exactly as in the seed:
//   S_m(s) = Psi(suf_m(s)),  S_0 = 0,  suffix saturates: suf_m(w) = w if m >= |w|
//   delta_m(s,t) = S_m(s) - S_m(t)
//   R_{k,1}(s) = S_{2k-1}(s) - 2 S_{k-1}(s)

const SIG = ['a', 'b', 'c'];

function psi(w) { const v = [0, 0, 0]; for (const ch of w) v[SIG.indexOf(ch)]++; return v; }
function suf(w, m) { return m >= w.length ? w : w.slice(w.length - m); }
function S(w, m) { return m <= 0 ? [0, 0, 0] : psi(suf(w, m)); }
function sub(x, y) { return [x[0] - y[0], x[1] - y[1], x[2] - y[2]]; }
function delta(s, t, m) { return sub(S(s, m), S(t, m)); }
function R(s, k) { const A = S(s, 2 * k - 1), B = S(s, k - 1); return [A[0] - 2 * B[0], A[1] - 2 * B[1], A[2] - 2 * B[2]]; }
function eq(x, y) { return x[0] === y[0] && x[1] === y[1] && x[2] === y[2]; }

function* words(maxLen) {
  for (let n = 0; n <= maxLen; n++) {
    const idx = new Array(n).fill(0);
    while (true) {
      yield idx.map(i => SIG[i]).join('');
      let p = n - 1;
      while (p >= 0 && idx[p] === SIG.length - 1) { idx[p] = 0; p--; }
      if (p < 0) break;
      idx[p]++;
    }
    if (n === 0) continue;
  }
}

const allW = [...words(6)];
console.log(`histories tested: ${allW.length} (lengths 0..6)`);

// ---------------------------------------------------------------- FT1
let ft1Checked = 0, ft1Fail = [];
for (const L of [1, 2, 3, 4]) {
  for (const q of [1, 2]) {
    const U = [...words(q * L)].filter(w => w.length === q * L);
    const Usample = U.filter((_, i) => i % Math.max(1, Math.floor(U.length / 6)) === 0).slice(0, 6);
    for (const u of Usample) {
      for (const s of allW) for (const t of allW) {
        for (let m = 0; m <= s.length + t.length + q * L + 2; m++) {
          const lhs = delta(s + u, t + u, m);
          const rhs = m <= q * L ? [0, 0, 0] : delta(s, t, m - q * L);
          ft1Checked++;
          if (!eq(lhs, rhs)) ft1Fail.push({ L, q, u, s, t, m, lhs, rhs });
        }
      }
    }
  }
}
console.log(`FT1: ${ft1Checked} instances, failures = ${ft1Fail.length}`);
if (ft1Fail.length) console.log('  first failures:', JSON.stringify(ft1Fail.slice(0, 3)));

// ---------------------------------------------------------------- FT2
let ft2Checked = 0, ft2Fail = [];
for (const L of [2, 3, 4, 5]) {
  for (const q of [1, 2]) {
    const U = [...words(q * L)].filter(w => w.length === q * L);
    const Usample = U.filter((_, i) => i % Math.max(1, Math.floor(U.length / 5)) === 0).slice(0, 5);
    for (let r = 1; r < L; r++) {
      const k = q * L + r;
      for (const u of Usample) {
        for (const s of allW) for (const t of allW) {
          const lhs = sub(R(s + u, k), R(t + u, k));
          const d1 = delta(s, t, q * L + 2 * r - 1);
          const d2 = delta(s, t, r - 1);
          const rhs = [d1[0] - 2 * d2[0], d1[1] - 2 * d2[1], d1[2] - 2 * d2[2]];
          ft2Checked++;
          if (!eq(lhs, rhs)) ft2Fail.push({ L, q, r, k, u, s, t, lhs, rhs });
        }
      }
    }
  }
}
console.log(`FT2: ${ft2Checked} instances, failures = ${ft2Fail.length}`);
if (ft2Fail.length) {
  console.log('  first failures:');
  for (const f of ft2Fail.slice(0, 5)) console.log('   ', JSON.stringify(f));
}

// ------------------------------------------------- FT2 boundary probe: r = L (k = (q+1)L)
let probeFail = 0, probeTot = 0;
for (const L of [3, 4]) {
  const q = 2, r = L, k = q * L + r;
  const U = [...words(q * L)].filter(w => w.length === q * L).slice(0, 4);
  for (const u of U) for (const s of allW) for (const t of allW) {
    const lhs = sub(R(s + u, k), R(t + u, k));
    const d1 = delta(s, t, q * L + 2 * r - 1), d2 = delta(s, t, r - 1);
    const rhs = [d1[0] - 2 * d2[0], d1[1] - 2 * d2[1], d1[2] - 2 * d2[2]];
    probeTot++; if (!eq(lhs, rhs)) probeFail++;
  }
}
console.log(`FT2 outside stated range (r = L): ${probeTot} instances, ${probeFail} failures`);

// ---------------------------------------------- recency gauge and the S_2 <-> epsilon identity
function recencyMap(w) {
  const order = [];
  for (let i = w.length - 1; i >= 0; i--) if (!order.includes(w[i])) order.push(w[i]);
  const m = {};
  order.forEach((ch, i) => { m[ch] = SIG[i]; });
  let next = order.length;
  for (const ch of SIG) if (!(ch in m)) m[ch] = SIG[next++];
  return m;
}
function gauge(w) { const m = recencyMap(w); return [...w].map(c => m[c]).join(''); }

let s1Bad = 0, s2Bad = 0, epsBad = 0, tot = 0, s2Values = new Set();
for (const w of allW) {
  if (w.length < 2) continue;
  const g = gauge(w);
  tot++;
  if (!eq(S(g, 1), [1, 0, 0])) s1Bad++;
  const s2 = S(g, 2);
  s2Values.add(s2.join(','));
  const eps = w[w.length - 1] === w[w.length - 2] ? 1 : 0;
  const expected = eps ? [2, 0, 0] : [1, 1, 0];
  if (!eq(s2, expected)) { s2Bad++; if (epsBad < 3) console.log('  S2/eps mismatch:', w, g, s2, expected); }
  if (!eq(s2, [2, 0, 0]) && !eq(s2, [1, 1, 0])) epsBad++;
}
console.log(`recency gauge on ${tot} histories (|w|>=2): S1!=(1,0,0): ${s1Bad}; S2 mismatch vs eps: ${s2Bad}; S2 outside {(2,0,0),(1,1,0)}: ${epsBad}`);
console.log('  observed S2 values:', [...s2Values].join('  |  '));

// -------------------------------------- staircase indexing for L=4, q=2
console.log('\nFULL L4, q=2 staircase (k = qL + r, activated depth r-1):');
for (let r = 1; r < 4; r++) console.log(`  k = ${2 * 4 + r}  ->  r = ${r}  ->  activated fragment S_${r - 1}`);
