/**
 * abracalabra-scenes.js
 * ---------------------
 * Declarative scene/challenge data for the abracalabra V1 vertical slice.
 *
 * This file carries NO mathematical logic and NO story text.
 *
 *   - Mathematical authority lives in `src/abelian-core.js` (AbelianCore).
 *     Every scene names the AbelianCore entry point that decides it.
 *   - Child-facing prose lives in `assets/abracalabra-strings.js`, keyed by
 *     scene id. Nothing here is shown to a player verbatim.
 *
 * What this file IS: the exact, machine-checkable specification of each
 * challenge — alphabet, rule, bounds, expected truth condition, witnesses.
 * `tests/test-abracalabra.js` re-derives every stated figure below by an
 * independent route and fails if any disagrees.
 *
 * CONVENTION WARNING
 * ------------------
 * Scenes 1-3 use minK = 2, the same convention as the Abelisk game
 * (`assets/abelisk-levels.js`): two identical letters side by side are NOT an
 * echo. Scene 4 deliberately uses a DIFFERENT rule, minK = 1, under which a
 * doubled letter IS an echo. These are two distinct declared rules, not a
 * revision of the Abelisk convention. The UI states the change explicitly in
 * the scene where it happens, and `conventionNote` below records why.
 */
(function(global) {
  'use strict';

  /**
   * @typedef {Object} Scene
   * @property {string}   id            - Stable identifier; also the strings key.
   * @property {string}   act           - Evidence-grammar act: FIND | BREAK | MAP | KNOW.
   * @property {string}   objective     - Mathematical objective (English, canonical).
   * @property {string[]} alphabet      - Allowed symbols.
   * @property {Object}   rule          - { minK, maxK } forbidden abelian-square half-lengths, or null when no abelian rule applies.
   * @property {Object}   bounds        - Everything finite about the task.
   * @property {string}   actionType    - What the child does.
   * @property {string}   validation    - The AbelianCore entry point (or 'none') that decides this scene.
   * @property {Object}   truth         - The expected, machine-checkable result.
   * @property {string}   boundedness   - What a success here does and does not establish.
   * @property {string}   scaffoldPolicy- When help appears, and what it must never do.
   */

  var SCENES = [

    // ── 1 ────────────────────────────────────────────────────────────────
    {
      id: 'echo',
      act: 'FIND',
      objective:
        'Locate an abelian square inside a fixed strip: two adjacent blocks ' +
        'of equal length whose Parikh vectors agree.',
      alphabet: ['a', 'b', 'c'],
      rule: { minK: 2, maxK: null },
      bounds: {
        strip: 'cabba',
        stripLength: 5,
        // A candidate window is a factor of even length 2K with K >= 2.
        candidateWindowCount: 1, // only [1,5) has length 4; length 6 does not fit in 5
        searchIsExhaustibleByHand: true
      },
      actionType: 'select-window',
      validation: 'AbelianCore.findAllAbelianSquares',
      truth: {
        // Every abelian square in `strip` with half-length >= 2, as {start, K}.
        echoes: [{ start: 1, K: 2 }],
        echoCount: 1,
        witness: { start: 1, K: 2, left: 'ab', right: 'ba' }
      },
      boundedness:
        'Finding one echo establishes that an echo exists in this strip. ' +
        'It establishes nothing about any other strip.',
      scaffoldPolicy:
        'No hint before the first attempt. After two windows that are not ' +
        'echoes, the inventory trays stay visible between attempts. The ' +
        'interface never marks the correct window.'
    },

    // ── 2 ────────────────────────────────────────────────────────────────
    {
      id: 'crack',
      act: 'BREAK',
      objective:
        'Refute the universal claim "every abelian square is an ordinary ' +
        'square uu" by constructing an abelian square whose halves are ' +
        'Parikh-equal but not identical as strings.',
      alphabet: ['a', 'b', 'c'],
      rule: { minK: 2, maxK: null },
      bounds: {
        blockLengths: [2, 3],          // so the built word has length 4 or 6
        wordLengths: [4, 6],
        // |Sigma|^4 + |Sigma|^6 = 81 + 729
        candidateSpaceSize: 810,
        searchIsExhaustibleByHand: false
      },
      actionType: 'build-word',
      validation: 'AbelianCore.parikhVector + AbelianCore.parikhEqual',
      truth: {
        // The claim under attack, stated formally.
        claim: 'for all adjacent equal-length blocks u,v: parikh(u) = parikh(v) implies u = v',
        claimIsFalse: true,
        // A build refutes the claim iff parikh(left) = parikh(right) AND left !== right.
        refutationCondition: 'parikhEqual(left, right) && left !== right',
        knownCounterexamples: ['abba', 'abccba', 'bccb'],
        // Builds that ARE abelian squares but do NOT refute the claim.
        consistentWithClaim: ['abab', 'aabaab'],
        repairedClaim: 'for all adjacent equal-length blocks u,v: u,v is an echo iff parikh(u) = parikh(v)'
      },
      boundedness:
        'One counterexample refutes a universal claim. It does not tell you ' +
        'which claim is true instead, and it does not tell you how many ' +
        'counterexamples there are.',
      scaffoldPolicy:
        'The artefact never supplies a counterexample. If the child builds a ' +
        'valid echo whose halves read alike, the interface says so and leaves ' +
        'the claim standing.'
    },

    // ── 3 ────────────────────────────────────────────────────────────────
    {
      id: 'map',
      act: 'MAP',
      objective:
        'Generate every word of length 3 over a two-letter alphabet, and ' +
        'state the count with a per-position argument rather than by ' +
        'exhausting ideas.',
      alphabet: ['a', 'b'],
      rule: null,                       // no abelian condition in this scene
      bounds: {
        wordLength: 3,
        alphabetSize: 2,
        spaceSize: 8,                   // 2^3
        searchIsExhaustibleByHand: true
      },
      actionType: 'generate-and-count',
      validation: 'none (pure enumeration; no abelian predicate applies)',
      truth: {
        // Sorted, so a test can compare without depending on generation order.
        completeSpace: ['aaa', 'aab', 'aba', 'abb', 'baa', 'bab', 'bba', 'bbb'],
        spaceSize: 8,
        perPositionChoices: [2, 2, 2],
        countArgument: '2 * 2 * 2 = 8'
      },
      boundedness:
        'The count is exact for length 3 over two letters. It is not a claim ' +
        'about any other length or alphabet.',
      scaffoldPolicy:
        'Free generation first. The organising view appears only after the ' +
        'child has generated words and been asked "are these all of them?". ' +
        'The organiser groups what the child has produced; it never displays ' +
        'an empty slot for a word the child has not found, and never names a ' +
        'missing word.'
    },

    // ── 4 ────────────────────────────────────────────────────────────────
    {
      id: 'empty-door',
      act: 'KNOW',
      objective:
        'Establish, by covering the whole finite space, that no word of ' +
        'length 4 over {a,b} avoids all abelian squares of half-length K >= 1.',
      alphabet: ['a', 'b'],
      rule: { minK: 1, maxK: null },
      conventionNote:
        'minK = 1 here, NOT the minK = 2 used by Abelisk and by scenes 1-3. ' +
        'Under minK = 1 a doubled letter (aa, bb) is itself an abelian square ' +
        'with halves of length 1. This is a separate declared rule for this ' +
        'door, chosen because it is the only variant whose whole space is ' +
        'small enough (16 words) for a child to account for by hand. It is ' +
        'not a change to the Abelisk convention and must never be presented ' +
        'as one.',
      bounds: {
        wordLength: 4,
        alphabetSize: 2,
        spaceSize: 16,                  // 2^4
        parentLength: 3,
        parentSpaceSize: 8,
        searchIsExhaustibleByHand: true
      },
      actionType: 'cover-space',
      validation: 'AbelianCore.checkWord(word, 1, undefined, [a,b])',
      truth: {
        survivorCount: 0,
        survivors: [],
        // Length-3 prefixes that already contain an echo under minK = 1.
        // Neither of their two extensions can survive: an echo in a factor is
        // still there after appending.
        deadParents: ['aaa', 'aab', 'abb', 'baa', 'bba', 'bbb'],
        // Length-3 prefixes with no echo under minK = 1.
        liveParents: ['aba', 'bab'],
        // The four words the live parents produce, all of which die.
        liveParentChildren: ['abaa', 'abab', 'baba', 'babb'],
        coverageIdentity: '6 dead parents * 2 + 4 children of live parents = 16'
      },
      boundedness:
        'Establishes exactly this: among the sixteen words of length 4 over ' +
        '{a,b}, none avoids all abelian squares with K >= 1. It says nothing ' +
        'about other lengths, other alphabets, or other rules, and nothing ' +
        'about any infinite word.',
      scaffoldPolicy:
        'The child attempts free construction first, and the interface calls ' +
        'those failures "not found", never "impossible". The coverage counter ' +
        'reports how much of the space the child has accounted for; it never ' +
        'reports whether the conclusion follows. That step is the child\'s.'
    }
  ];

  var API = {
    SCENES: SCENES,
    /** @param {string} id @returns {?Scene} */
    byId: function(id) {
      for (var i = 0; i < SCENES.length; i++) {
        if (SCENES[i].id === id) return SCENES[i];
      }
      return null;
    },
    ids: function() {
      return SCENES.map(function(s) { return s.id; });
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
  } else {
    global.AbracalabraScenes = API;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
