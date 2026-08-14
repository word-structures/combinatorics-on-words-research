#!/usr/bin/env node
'use strict';
/*
 * Stage-A soundness at PROFILE level, with string-level ground truth.
 * Independent of scripts/parikh-block-filter.js (nothing imported).
 *
 * Modes:
 *   sweep  <L> <n> <mMin> <mMax> [--limit N]   full/limited profile-tuple sweep
 *   inv    <L> <n> <mMin> <mMax> <samples>     profile-invariance: all concrete
 *                                              codings of randomly chosen profile tuples
 *   adver  <L> <n> <mMin> <mMax>               adversarial/extreme profile probe
 */

const H6 = { a: 'ace', b: 'adf', c: 'bdf', d: 'bdc', e: 'afe', f: 'bce' };
const S6 = ['a', 'b', 'c', 'd', 'e', 'f'];

function h6Source(n) {
  let cur = [0];
  const img = S6.map(x => [...H6[x]].map(c => S6.indexOf(c)));
  for (let i = 0; i < n; i++) {
    const next = [];
    for (const s of cur) for (const t of img[s]) next.push(t);
    cur = next;
  }
  return cur;
}

function collectDiffs(src, mMin, mMax) {
  const n = src.length;
  const seen = new Map();
  let allZeroHits = 0;
  for (let m = mMin; m <= mMax; m++) {
    for (let b = 0; b + 2 * m <= n; b++) {
      const v = new Array(6).fill(0);
      for (let i = 0; i < m; i++) v[src[b + i]]++;
      for (let i = 0; i < m; i++) v[src[b + m + i]]--;
      if (v.every(x => x === 0)) { allZeroHits++; continue; }
      seen.set(v.join(','), v);
    }
  }
  return { diffs: [...seen.values()], allZeroHits };
}

// profiles = compositions of L into 3 parts, independently generated
function profiles(L) {
  const out = [];
  for (let na = 0; na <= L; na++)
    for (let nb = 0; nb <= L - na; nb++)
      out.push([na, nb, L - na - nb]);
  return out;
}

// predicate: M_g . d == 0 for some d, where columns are the profiles themselves
function predElim(cols, diffs) {
  for (const d of diffs) {
    let x = 0, y = 0, z = 0;
    for (let j = 0; j < 6; j++) {
      const dj = d[j]; if (dj === 0) continue;
      x += cols[j][0] * dj; y += cols[j][1] * dj; z += cols[j][2] * dj;
    }
    if (x === 0 && y === 0 && z === 0) return d;
  }
  return null;
}

// ground truth: materialise coded word, count windows directly
function truthSquare(src, coding, L, mMin, mMax) {
  const W = [];
  for (const s of src) for (const ch of coding[s]) W.push(ch);
  const n = src.length;
  for (let m = mMin; m <= mMax; m++) {
    const half = m * L;
    for (let b = 0; b + 2 * m <= n; b++) {
      const p = b * L;
      const c1 = [0, 0, 0], c2 = [0, 0, 0];
      for (let i = 0; i < half; i++) { c1[W[p + i]]++; c2[W[p + half + i]]++; }
      if (c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2]) return { b, m, K: half };
    }
  }
  return null;
}

// canonical concrete word realising a profile: sorted (0s then 1s then 2s)
function repWord(p) {
  const w = [];
  for (let i = 0; i < p[0]; i++) w.push(0);
  for (let i = 0; i < p[1]; i++) w.push(1);
  for (let i = 0; i < p[2]; i++) w.push(2);
  return w;
}

// all distinct permutations of a multiset profile
function allWordsOfProfile(p) {
  const out = [];
  const cur = [];
  const left = [...p];
  (function rec() {
    if (cur.length === p[0] + p[1] + p[2]) { out.push([...cur]); return; }
    for (let s = 0; s < 3; s++) {
      if (left[s] === 0) continue;
      left[s]--; cur.push(s);
      rec();
      cur.pop(); left[s]++;
    }
  })();
  return out;
}

const mode = process.argv[2];
const L = parseInt(process.argv[3], 10);
const n = parseInt(process.argv[4], 10);
const mMin = parseInt(process.argv[5], 10);
const mMax = parseInt(process.argv[6], 10);

const src = h6Source(n);
const { diffs, allZeroHits } = collectDiffs(src, mMin, mMax);
const P = profiles(L);
const D = P.length;

if (mode === 'sweep') {
  const limArg = process.argv.find(a => a.startsWith('--limit='));
  const total = Math.pow(D, 6);
  const limit = limArg ? parseInt(limArg.split('=')[1], 10) : total;
  const step = limit >= total ? 1 : Math.floor(total / limit);

  let elim = 0, surv = 0, falseRej = 0, falseSurv = 0, tested = 0;
  let firstFR = null, firstFS = null;

  for (let c = 0; c < total; c += step) {
    let r = c; const idx = new Array(6);
    for (let j = 5; j >= 0; j--) { idx[j] = r % D; r = Math.floor(r / D); }
    const cols = idx.map(i => P[i]);
    const coding = idx.map(i => repWord(P[i]));

    const d = predElim(cols, diffs);
    const t = truthSquare(src, coding, L, mMin, mMax);
    tested++;
    if (d) elim++; else surv++;
    if (d && !t) { falseRej++; if (!firstFR) firstFR = { idx, cols, d }; }
    if (!d && t) { falseSurv++; if (!firstFS) firstFS = { idx, cols, t }; }
  }
  console.log(JSON.stringify({
    mode, L, n, srcLen: src.length, mMin, mMax, distinctDiffs: diffs.length, allZeroHits,
    D, totalProfileTuples: total, tested, exhaustive: step === 1,
    eliminated: elim, survived: surv,
    falseRejections: falseRej, falseSurvivals: falseSurv,
    firstFalseRejection: firstFR, firstFalseSurvival: firstFS
  }, null, 2));
}

if (mode === 'inv') {
  const samples = parseInt(process.argv[7] || '40', 10);
  let checked = 0, inconsistent = 0, predMismatch = 0;
  const bad = [];
  for (let s = 0; s < samples; s++) {
    const idx = Array.from({ length: 6 }, () => Math.floor(Math.random() * D));
    const cols = idx.map(i => P[i]);
    const predD = predElim(cols, diffs);
    const wordSets = idx.map(i => allWordsOfProfile(P[i]));
    // cap the cross-product so a sample stays bounded
    const counts = wordSets.map(w => w.length);
    const combos = counts.reduce((a, b) => a * b, 1);
    if (combos > 20000) { s--; continue; }
    let verdicts = new Set();
    for (let c = 0; c < combos; c++) {
      let r = c; const pick = new Array(6);
      for (let j = 5; j >= 0; j--) { pick[j] = r % counts[j]; r = Math.floor(r / counts[j]); }
      const coding = pick.map((k, j) => wordSets[j][k]);
      const t = truthSquare(src, coding, L, mMin, mMax);
      verdicts.add(t ? 1 : 0);
      checked++;
    }
    if (verdicts.size > 1) { inconsistent++; bad.push({ idx, cols }); }
    const groundElim = verdicts.has(1) && verdicts.size === 1;
    if ((!!predD) !== groundElim) { predMismatch++; }
  }
  console.log(JSON.stringify({
    mode, L, n, mMin, mMax, D, sampledProfileTuples: samples,
    concreteCodingsChecked: checked,
    profileTuplesWithInconsistentVerdict: inconsistent,
    predicateVsGroundMismatches: predMismatch,
    examples: bad.slice(0, 3)
  }, null, 2));
}

if (mode === 'adver') {
  // extreme / adversarial profiles
  const extremes = [];
  for (const p of P) if (p.includes(L) || p.filter(x => x === 0).length === 1) extremes.push(p);
  const cases = [];
  // all-same extreme profile across all 6 letters
  for (const p of P) cases.push({ label: `all letters -> ${p.join('/')}`, cols: Array(6).fill(p) });
  // identical Parikh, different internal order (order-sensitivity probe)
  const orderProbe = [];
  for (const p of P) {
    const ws = allWordsOfProfile(p);
    if (ws.length >= 2) orderProbe.push({ p, a: ws[0], b: ws[ws.length - 1] });
  }
  let elimCount = 0, frCount = 0;
  const details = [];
  for (const c of cases) {
    const d = predElim(c.cols, diffs);
    const coding = c.cols.map(repWord);
    const t = truthSquare(src, coding, L, mMin, mMax);
    if (d) elimCount++;
    if (d && !t) { frCount++; details.push({ ...c, d, note: 'FALSE REJECTION' }); }
  }
  // order-sensitivity: same profile tuple, two different concrete orderings
  let orderDisagreements = 0;
  for (const op of orderProbe) {
    const colsAll = Array(6).fill(op.p);
    const cA = Array(6).fill(op.a), cB = Array(6).fill(op.b);
    const tA = truthSquare(src, cA, L, mMin, mMax);
    const tB = truthSquare(src, cB, L, mMin, mMax);
    if ((!!tA) !== (!!tB)) orderDisagreements++;
  }
  console.log(JSON.stringify({
    mode, L, n, mMin, mMax,
    extremeProfilesTested: cases.length, eliminated: elimCount,
    falseRejections: frCount, details,
    orderProbePairs: orderProbe.length,
    orderSensitivityDisagreements: orderDisagreements
  }, null, 2));
}
