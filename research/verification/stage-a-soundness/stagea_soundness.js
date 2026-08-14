#!/usr/bin/env node
'use strict';
/*
 * INDEPENDENT Stage-A soundness checker.
 *
 * Deliberately does NOT import scripts/parikh-block-filter.js or any project module.
 * H6 is transcribed from src/morphisms.js (verified: 3-uniform) and re-derived here.
 *
 * Independence strategy:
 *   - h6 iteration built by array push, not string concatenation;
 *   - the GROUND TRUTH is a direct string-level scan of the materialised coded word
 *     (literally counting letters in two adjacent windows), NOT any matrix algebra;
 *   - the PREDICATE UNDER TEST (M_g . d = 0) is computed separately;
 *   - the two are compared per coding. No shared code path between them.
 *
 * FALSE REJECTION = predicate says "eliminate" but no block-aligned abelian square
 *                   actually exists in the coded word. This is the fatal case.
 * FALSE SURVIVAL  = a block-aligned square exists but predicate says "survive".
 *                   Acceptable only if it indicates incomplete d-collection.
 */

const H6 = { a: 'ace', b: 'adf', c: 'bdf', d: 'bdc', e: 'afe', f: 'bce' };
const S6 = ['a', 'b', 'c', 'd', 'e', 'f'];

// ---- h6^n(a) as an array of source-letter indices (independent construction) ----
function h6Source(n) {
  let cur = [0];                       // 'a'
  const img = S6.map(x => [...H6[x]].map(c => S6.indexOf(c)));
  for (let i = 0; i < n; i++) {
    const next = [];
    for (const s of cur) for (const t of img[s]) next.push(t);
    cur = next;
  }
  return cur;
}

// ---- GROUND TRUTH: materialise g(w) and scan windows by direct counting ----
// coding: array of 6 arrays, each of length L, entries in {0,1,2}
function hasBlockAlignedSquare_stringLevel(src, coding, L, mMin, mMax) {
  // materialise the coded word explicitly
  const W = [];
  for (const s of src) for (const ch of coding[s]) W.push(ch);
  const n = src.length;

  for (let m = mMin; m <= mMax; m++) {
    const half = m * L;
    for (let b = 0; b + 2 * m <= n; b++) {
      const p = b * L;
      // count symbols in the two adjacent windows by direct iteration
      const c1 = [0, 0, 0], c2 = [0, 0, 0];
      for (let i = 0; i < half; i++) {
        c1[W[p + i]]++;
        c2[W[p + half + i]]++;
      }
      if (c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2]) {
        return { found: true, b, m, K: half };
      }
    }
  }
  return { found: false };
}

// ---- PREDICATE UNDER TEST: difference set + M_g . d = 0 ----
function collectDiffs(src, mMin, mMax) {
  const n = src.length;
  // running counts, recomputed per window (independent of prefix-array approach)
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

function predicateEliminates(coding, diffs, L) {
  // M_g column j = Parikh_3(g(j))
  const M = coding.map(word => {
    const v = [0, 0, 0];
    for (const ch of word) v[ch]++;
    return v;
  });
  for (const d of diffs) {
    let x = 0, y = 0, z = 0;
    for (let j = 0; j < 6; j++) {
      if (d[j] === 0) continue;
      x += M[j][0] * d[j]; y += M[j][1] * d[j]; z += M[j][2] * d[j];
    }
    if (x === 0 && y === 0 && z === 0) return { elim: true, d };
  }
  return { elim: false };
}

// ---- enumerate every concrete coding g : Sigma_6 -> Sigma_3^L ----
function* allWordsOfLength(L) {
  const total = 3 ** L;
  for (let i = 0; i < total; i++) {
    const w = [];
    let r = i;
    for (let k = 0; k < L; k++) { w.push(r % 3); r = Math.floor(r / 3); }
    yield w;
  }
}

function profileOf(word) {
  const v = [0, 0, 0];
  for (const ch of word) v[ch]++;
  return v.join(',');
}

// ---- main experiment ----
function runExhaustive(L, n, mMin, mMax, opts = {}) {
  const src = h6Source(n);
  const { diffs, allZeroHits } = collectDiffs(src, mMin, mMax);
  const words = [...allWordsOfLength(L)];
  const total = Math.pow(words.length, 6);

  const res = {
    L, n, srcLen: src.length, mMin, mMax,
    distinctDiffs: diffs.length, allZeroHits,
    wordsPerLetter: words.length, totalCodings: total,
    eliminated: 0, survived: 0,
    falseRejections: 0, falseSurvivals: 0,
    firstFalseRejection: null, firstFalseSurvival: null,
    profileVerdict: new Map(), profileInconsistencies: 0
  };

  const idx = new Array(6).fill(0);
  for (let counter = 0; counter < total; counter++) {
    let r = counter;
    for (let j = 5; j >= 0; j--) { idx[j] = r % words.length; r = Math.floor(r / words.length); }
    const coding = idx.map(i => words[i]);

    const pred = predicateEliminates(coding, diffs, L);
    const truth = hasBlockAlignedSquare_stringLevel(src, coding, L, mMin, mMax);

    if (pred.elim) res.eliminated++; else res.survived++;

    if (pred.elim && !truth.found) {
      res.falseRejections++;
      if (!res.firstFalseRejection) {
        res.firstFalseRejection = { coding: coding.map(w => w.join('')), d: pred.d };
      }
    }
    if (!pred.elim && truth.found) {
      res.falseSurvivals++;
      if (!res.firstFalseSurvival) {
        res.firstFalseSurvival = { coding: coding.map(w => w.join('')), witness: truth };
      }
    }

    if (opts.checkProfileInvariance) {
      const key = coding.map(profileOf).join('|');
      const verdict = truth.found ? 1 : 0;
      if (res.profileVerdict.has(key)) {
        if (res.profileVerdict.get(key) !== verdict) res.profileInconsistencies++;
      } else {
        res.profileVerdict.set(key, verdict);
      }
    }
  }
  res.distinctProfileTuples = res.profileVerdict.size;
  delete res.profileVerdict;
  return res;
}

// ---- CLI ----
const L = parseInt(process.argv[2] || '1', 10);
const n = parseInt(process.argv[3] || '4', 10);
const mMin = parseInt(process.argv[4] || '2', 10);
const mMax = parseInt(process.argv[5] || '8', 10);
const checkPI = process.argv.includes('--profile-invariance');

const out = runExhaustive(L, n, mMin, mMax, { checkProfileInvariance: checkPI });
console.log(JSON.stringify(out, null, 2));
