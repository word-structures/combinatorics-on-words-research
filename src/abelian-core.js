'use strict';

/**
 * abelian-core.js
 * ---------------
 * Browser-usable deterministic abelian-square detection core for the Abelisk MVP.
 *
 * PROVENANCE
 * ----------
 * The mathematical logic here is extracted from, not invented independently of,
 * the two canonical implementations in this repository:
 *
 *   word-anatomy.js   firstAbelianSquare()   — O(n^2) prefix-sum Parikh comparison
 *   factor-complexity.js   noAbelianSquare() — suffix-checkable DFS variant
 *
 * Both use the same mathematics: build per-letter prefix sums, then for each
 * candidate half-length K check whether the two adjacent halves have identical
 * Parikh vectors. This module exposes the same logic with a richer return type
 * that carries enough structure for an explanatory UI.
 *
 * CONVENTION SEPARATION
 * ---------------------
 * The mathematical DEFINITION of an abelian square is: a word u·v where |u|=|v|
 * and u,v are anagrams (same Parikh vector). This is a fact, not a game rule.
 *
 * Which half-lengths K a particular game MODE chooses to forbid is a CONVENTION:
 *   - K >= 1  (full abelian-square-freeness; finite on 3 letters, max length 7)
 *   - K >= 2  (Mäkelä's aa2f; open question on 3 letters)
 *   - K in [2,5]  (the [2,5]-container SFT studied in this project)
 *
 * The API keeps these separate: the core detects all abelian squares, and every
 * consumer explicitly supplies its own minK / maxK filter.
 *
 * BROWSER COMPATIBILITY
 * ---------------------
 * No Node.js APIs. No require() of other project modules. No framework.
 * UMD-lite IIFE exposing a single window/globalThis.AbelianCore namespace.
 * No ESM support.
 */

(function(global) {

// ── Public types (documented by JSDoc, not TypeScript) ──────────────

/**
 * @typedef {Object} AbelianSquareEvidence
 * @property {number} K       - Half-length of the abelian square.
 * @property {number} pos     - Starting position (0-indexed) in the word.
 * @property {string} left    - The left half (word[pos..pos+K-1]).
 * @property {string} right   - The right half (word[pos+K..pos+2K-1]).
 * @property {Object} leftParikh  - Per-letter counts of the left half.
 * @property {Object} rightParikh - Per-letter counts of the right half.
 * @property {string} [convention] - Human-readable description of the applied convention (attached by check methods).
 * @property {string} [appendedLetter] - The letter that completed the square (attached by checkSuffix).
 * @property {number} [appendedIndex] - The index of the appended letter (attached by checkSuffix).
 */

/**
 * @typedef {Object} CheckResult
 * @property {boolean} valid          - True if the word passes the given convention.
 * @property {?AbelianSquareEvidence} violation - First violation found, or null.
 * @property {string} convention      - Human-readable description of the applied convention.
 */

// ── Core implementation ─────────────────────────────────────────────

/**
 * Build per-letter prefix-sum arrays for a word.
 * Returns a Map from each letter to an Int32Array of length n+1, where
 * prefix[letter][i] = count of `letter` in word[0..i-1].
 *
 * @param {string} word
 * @param {string[]} [explicitAlphabet] - If provided, the Parikh vectors will be dense over this alphabet.
 *   PRECONDITION: If explicitAlphabet is provided, it must contain every symbol occurring in word.
 *   Letters not included in explicitAlphabet are ignored by the Parikh comparison, so omitting symbols can produce a false abelian-square result.
 * @returns {{ alphabet: string[], prefix: Map<string, Int32Array> }}
 */
function buildPrefixSums(word, explicitAlphabet) {
  const n = word.length;

  // Discover alphabet from the word itself, or use the explicit one.
  let alphabet;
  if (explicitAlphabet) {
    alphabet = [...explicitAlphabet];
  } else {
    const letterSet = new Set();
    for (let i = 0; i < n; i++) letterSet.add(word[i]);
    alphabet = Array.from(letterSet).sort();
  }

  const prefix = new Map();
  for (const ch of alphabet) {
    prefix.set(ch, new Int32Array(n + 1));
  }

  for (let i = 0; i < n; i++) {
    for (const ch of alphabet) {
      prefix.get(ch)[i + 1] = prefix.get(ch)[i] + (word[i] === ch ? 1 : 0);
    }
  }

  return { alphabet, prefix };
}

/**
 * Compute the Parikh vector (per-letter counts) of word[start..start+len-1].
 *
 * @param {Map<string, Int32Array>} prefix - Prefix-sum arrays from buildPrefixSums.
 * @param {string[]} alphabet
 * @param {number} start - Start index (inclusive).
 * @param {number} len   - Length of the substring.
 * @returns {Object} - e.g. { a: 3, b: 1, c: 2 }
 */
function parikhVector(prefix, alphabet, start, len) {
  const result = {};
  for (const ch of alphabet) {
    const p = prefix.get(ch);
    result[ch] = p[start + len] - p[start];
  }
  return result;
}

/**
 * Check whether two Parikh vectors are identical.
 *
 * @param {Object} p1
 * @param {Object} p2
 * @param {string[]} alphabet
 * @returns {boolean}
 */
function parikhEqual(p1, p2, alphabet) {
  for (const ch of alphabet) {
    if ((p1[ch] || 0) !== (p2[ch] || 0)) return false;
  }
  return true;
}

/**
 * Find ALL abelian squares in a word with half-length in [minK, maxK].
 *
 * This is the exhaustive O(n^2) scan: for every half-length K in the range,
 * for every starting position i where a factor of length 2K fits, compare
 * the Parikh vectors of the two halves.
 *
 * @param {string} word
 * @param {number} [minK=2]  - Minimum half-length to check (defaults to 2, matching word-anatomy.js).
 * @param {number} [maxK]    - Maximum half-length (default: floor(n/2)).
 * @param {string[]} [explicitAlphabet]
 * @returns {AbelianSquareEvidence[]} - All violations found, ordered by (K, pos).
 */
function findAllAbelianSquares(word, minK = 2, maxK, explicitAlphabet) {
  const n = word.length;
  if (maxK === undefined) maxK = Math.floor(n / 2);
  maxK = Math.min(maxK, Math.floor(n / 2));
  if (minK > maxK) return [];

  const { alphabet, prefix } = buildPrefixSums(word, explicitAlphabet);
  const results = [];

  for (let K = minK; K <= maxK; K++) {
    for (let i = 0; i + 2 * K <= n; i++) {
      const leftP = parikhVector(prefix, alphabet, i, K);
      const rightP = parikhVector(prefix, alphabet, i + K, K);
      if (parikhEqual(leftP, rightP, alphabet)) {
        results.push({
          K,
          pos: i,
          left: word.slice(i, i + K),
          right: word.slice(i + K, i + 2 * K),
          leftParikh: leftP,
          rightParikh: rightP,
        });
      }
    }
  }

  return results;
}

/**
 * Find the FIRST abelian square in a word with half-length in [minK, maxK].
 *
 * Scans K from minK upward, positions from left to right. Returns null if
 * no violation exists.
 *
 * @param {string} word
 * @param {number} [minK=2]
 * @param {number} [maxK]
 * @param {string[]} [explicitAlphabet]
 * @returns {?AbelianSquareEvidence}
 */
function firstAbelianSquare(word, minK = 2, maxK, explicitAlphabet) {
  const n = word.length;
  if (maxK === undefined) maxK = Math.floor(n / 2);
  maxK = Math.min(maxK, Math.floor(n / 2));
  if (minK > maxK) return null;

  const { alphabet, prefix } = buildPrefixSums(word, explicitAlphabet);

  for (let K = minK; K <= maxK; K++) {
    for (let i = 0; i + 2 * K <= n; i++) {
      const leftP = parikhVector(prefix, alphabet, i, K);
      const rightP = parikhVector(prefix, alphabet, i + K, K);
      if (parikhEqual(leftP, rightP, alphabet)) {
        return {
          K,
          pos: i,
          left: word.slice(i, i + K),
          right: word.slice(i + K, i + 2 * K),
          leftParikh: leftP,
          rightParikh: rightP,
        };
      }
    }
  }

  return null;
}

/**
 * Check a word under a specific avoidance convention.
 *
 * @param {string} word
 * @param {number} [minK=2]  - Minimum half-length forbidden.
 * @param {number} [maxK]    - Maximum half-length forbidden (default: unbounded).
 * @param {string[]} [explicitAlphabet]
 * @returns {CheckResult}
 */
function checkWord(word, minK = 2, maxK, explicitAlphabet) {
  const convention = maxK !== undefined
    ? `abelian squares with half-length K in [${minK}, ${maxK}] forbidden`
    : `abelian squares with half-length K >= ${minK} forbidden`;

  const violation = firstAbelianSquare(word, minK, maxK, explicitAlphabet);
  if (violation) {
    violation.convention = convention;
  }
  return {
    valid: violation === null,
    violation,
    convention,
  };
}

/**
 * Check whether appending a single letter to a word creates a NEW abelian square
 * that wasn't present in the original word.
 *
 * PRECONDITION: The word (excluding the last letter) is assumed to already be
 * valid under the supplied convention. This function only checks for violations
 * that are anchored at the suffix (i.e. involving the newly appended letter).
 *
 * @param {string} word   - The FULL word including the appended letter.
 * @param {number} [minK=2]
 * @param {number} [maxK]
 * @param {string[]} [explicitAlphabet]
 * @returns {?AbelianSquareEvidence} - The new violation, or null if the append is safe.
 */
function checkSuffix(word, minK = 2, maxK, explicitAlphabet) {
  const n = word.length;
  if (maxK === undefined) maxK = Math.floor(n / 2);
  maxK = Math.min(maxK, Math.floor(n / 2));
  if (minK > maxK) return null;

  // We only need prefix sums for the suffix-touching windows.
  // For efficiency, build them once over the whole word.
  const { alphabet, prefix } = buildPrefixSums(word, explicitAlphabet);

  for (let K = minK; K <= maxK; K++) {
    // The abelian square must end at position n, i.e. start at n - 2K.
    const i = n - 2 * K;
    if (i < 0) continue;

    const leftP = parikhVector(prefix, alphabet, i, K);
    const rightP = parikhVector(prefix, alphabet, i + K, K);
    if (parikhEqual(leftP, rightP, alphabet)) {
        return {
          K,
          pos: i,
          left: word.slice(i, i + K),
          right: word.slice(i + K, i + 2 * K),
          leftParikh: leftP,
          rightParikh: rightP,
          appendedLetter: word[n - 1],
          appendedIndex: n - 1,
        };
    }
  }

  return null;
}

/**
 * For a given valid base word, compute the branching mask: which letters
 * from the given alphabet can be appended without creating a NEW forbidden
 * abelian square?
 *
 * PRECONDITION: The base word is assumed already valid under the supplied
 * convention. This function only performs a suffix check for each candidate letter.
 *
 * @param {string} word      - Current word.
 * @param {string[]} alphabet - e.g. ['a', 'b', 'c'].
 * @param {number} [minK=2]  - Minimum forbidden half-length.
 * @param {number} [maxK]    - Maximum forbidden half-length.
 * @returns {{ letter: string, allowed: boolean, violation: ?AbelianSquareEvidence }[]}
 */
function branchMask(word, alphabet, minK = 2, maxK) {
  return alphabet.map(letter => {
    const extended = word + letter;
    const violation = checkSuffix(extended, minK, maxK, alphabet);
    if (violation) {
      violation.convention = maxK !== undefined
        ? `abelian squares with half-length K in [${minK}, ${maxK}] forbidden`
        : `abelian squares with half-length K >= ${minK} forbidden`;
    }
    return {
      letter,
      allowed: violation === null,
      violation,
    };
  });
}

// ── Named convention presets ────────────────────────────────────────

/** Full abelian-square-freeness (K >= 1). Finite on 3 letters. */
const CONVENTION_ASF = { minK: 1, label: 'abelian-square-free (K ≥ 1)' };

/** Mäkelä's aa2f convention (K >= 2). Open question on 3 letters. */
const CONVENTION_AA2F = { minK: 2, label: 'aa2f (K ≥ 2, period-1 squares allowed)' };

/** The [2,5]-container convention studied in this project. */
const CONVENTION_CONTAINER = { minK: 2, maxK: 5, label: '[2,5]-container (K ∈ [2,5])' };

const AbelianCore = {
  buildPrefixSums,
  parikhVector,
  parikhEqual,
  findAllAbelianSquares,
  firstAbelianSquare,
  checkWord,
  checkSuffix,
  branchMask,
  CONVENTION_ASF,
  CONVENTION_AA2F,
  CONVENTION_CONTAINER,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AbelianCore;
} else {
  global.AbelianCore = AbelianCore;
}

})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
