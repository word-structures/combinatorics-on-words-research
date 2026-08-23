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
 *
 * Scenes 5-7 continue with minK = 1.  Scene 7 returns to the binary alphabet
 * for the structural-argument comparison with scene 4.
 *
 * DOOR GROUPING
 * -------------
 * Scenes 6 and 7 (counting-machine, shorter-reason) are pedagogically grouped
 * as "Door 6, Part 1 of 2" and "Door 6, Part 2 of 2" — they compare two ways
 * of establishing the same kind of bounded conclusion.  The doorInfo property
 * on each scene encodes this so the shell can display it without hard-coding
 * scene indices.
 *
 * RULE PLATE
 * ----------
 * Every scene carries a `rulePlate` object with { mode, alphabet, description }
 * so the persistent Rule Plate component knows what to display.  Modes are:
 *   FLOOR     — looking for echoes (nothing forbidden)
 *   NONE      — no abelian rule applies
 *   THRESHOLD — every echo is forbidden
 */
(function(global) {
  'use strict';

  /**
   * @typedef {Object} Scene
   * @property {string}   id            - Stable identifier; also the strings key.
   * @property {string}   act           - Evidence-grammar act: FIND | BREAK | MAP | KNOW | MACHINE | REASON.
   * @property {string}   objective     - Mathematical objective (English, canonical).
   * @property {string[]} alphabet      - Allowed symbols.
   * @property {Object}   rule          - { minK, maxK } forbidden abelian-square half-lengths, or null when no abelian rule applies.
   * @property {Object}   bounds        - Everything finite about the task.
   * @property {string}   actionType    - What the child does.
   * @property {string}   validation    - The AbelianCore entry point (or 'none') that decides this scene.
   * @property {Object}   truth         - The expected, machine-checkable result.
   * @property {string}   boundedness   - What a success here does and does not establish.
   * @property {string}   scaffoldPolicy- When help appears, and what it must never do.
   * @property {Object}   rulePlate     - { mode, alphabet, description } for the persistent Rule Plate.
   * @property {Object}   doorInfo      - { door, totalDoors, part?, totalParts? } for the shell topbar.
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
      rulePlate: {
        mode: 'FLOOR',
        alphabet: ['a', 'b', 'c'],
        description: 'looking-for-echoes'
      },
      doorInfo: { door: 1, totalDoors: 6 },
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
      rulePlate: {
        mode: 'FLOOR',
        alphabet: ['a', 'b', 'c'],
        description: 'looking-for-echoes'
      },
      doorInfo: { door: 2, totalDoors: 6 },
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
      rulePlate: {
        mode: 'NONE',
        alphabet: ['a', 'b'],
        description: 'no-rule'
      },
      doorInfo: { door: 3, totalDoors: 6 },
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
      rulePlate: {
        mode: 'THRESHOLD',
        alphabet: ['a', 'b'],
        description: 'strict-rule'
      },
      doorInfo: { door: 4, totalDoors: 6 },
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
    },

    // ── 5 ────────────────────────────────────────────────────────────────
    {
      id: 'third-symbol',
      act: null,
      objective:
        'Explore ternary strict abelian-square avoidance by building words ' +
        'one symbol at a time over {a,b,c} with minK = 1. Discover that ' +
        'longer words are possible than in the binary case, and that all ' +
        'paths die at length 8.',
      alphabet: ['a', 'b', 'c'],
      rule: { minK: 1, maxK: null },
      rulePlate: {
        mode: 'THRESHOLD',
        alphabet: ['a', 'b', 'c'],
        description: 'strict-rule'
      },
      doorInfo: { door: 5, totalDoors: 6 },
      conventionNote:
        'Same minK = 1 rule as scene 4. Only the alphabet has changed: ' +
        '{a,b,c} instead of {a,b}. The Rule Plate makes this explicit.',
      bounds: {
        maxWordLength: 8,
        alphabetSize: 3,
        // Survivor profile: how many words of each length survive.
        // These are covered by the existing canonical ledger row 1.
        survivorProfile: [3, 6, 12, 18, 30, 30, 18, 0],
        longestSurvivorLength: 7,
        survivorsAtLength7: 18,
        searchIsExhaustibleByHand: false
      },
      actionType: 'append-builder',
      validation: 'AbelianCore.branchMask + AbelianCore.checkSuffix',
      truth: {
        // The complete survivor profile for ternary strict (minK=1).
        survivorProfile: [3, 6, 12, 18, 30, 30, 18, 0],
        longestSurvivorLength: 7,
        survivorsAtLength7: 18,
        noSurvivorsAtLength8: true
      },
      boundedness:
        'The child builds finitely many words. The survivor profile is a ' +
        'bounded computation over a finite space. It says nothing about ' +
        'other rules or infinite words.',
      scaffoldPolicy:
        'The frontier shows which next symbols are legal and which create ' +
        'an echo, with witnesses. No announcement of impossibility at ' +
        'length 8 is made before the child has personally tried to extend ' +
        'or restart enough for the question to arise. Attempt states are ' +
        'not "wrong answers".'
    },

    // ── 6a ───────────────────────────────────────────────────────────────
    {
      id: 'counting-machine',
      act: 'MACHINE',
      objective:
        'Show, by bounded exhaustive computation, the complete survivor ' +
        'profile for ternary strict abelian-square avoidance (minK = 1) ' +
        'up to length 8. The machine genuinely derives the profile, not ' +
        'merely animates hard-coded bars.',
      alphabet: ['a', 'b', 'c'],
      rule: { minK: 1, maxK: null },
      rulePlate: {
        mode: 'THRESHOLD',
        alphabet: ['a', 'b', 'c'],
        description: 'strict-rule'
      },
      doorInfo: { door: 6, totalDoors: 6, part: 1, totalParts: 2 },
      bounds: {
        maxLength: 8,
        alphabetSize: 3,
        searchIsExhaustibleByHand: false
      },
      actionType: 'delegated-enumerate',
      validation: 'AbelianCore.checkWord for every word of each length',
      truth: {
        survivorProfile: [3, 6, 12, 18, 30, 30, 18, 0],
        totalWordsChecked: 9840
        // 3 + 9 + 27 + 81 + 243 + 729 + 2187 + 6561 = 9840
      },
      boundedness:
        'The machine covers the same finite space the child explored by ' +
        'hand, but exhaustively. The result is a bounded computation. It ' +
        'says nothing about lengths beyond 8 or about infinite words.',
      scaffoldPolicy:
        'The child must choose to let the machine run. The profile is ' +
        'derived live, not displayed from a constant. The evidence card ' +
        '"THE MACHINE CHECKED THEM ALL" is a player-facing epistemic ' +
        'category, not a MATH_CLAIMS status.'
    },

    // ── 6b ───────────────────────────────────────────────────────────────
    {
      id: 'shorter-reason',
      act: 'REASON',
      objective:
        'Guide the child to a structural argument for why no word of ' +
        'length 4 over {a,b} avoids all abelian squares with K >= 1, ' +
        'without checking all sixteen words individually. The argument: ' +
        'minK = 1 forces strict alternation; only abab and baba remain; ' +
        'both contain ab|ab as a K = 2 abelian square.',
      alphabet: ['a', 'b'],
      rule: { minK: 1, maxK: null },
      rulePlate: {
        mode: 'THRESHOLD',
        alphabet: ['a', 'b'],
        description: 'strict-rule'
      },
      doorInfo: { door: 6, totalDoors: 6, part: 2, totalParts: 2 },
      conventionNote:
        'Returns to the binary alphabet {a,b} from scene 4. Same minK = 1 ' +
        'rule. The child now finds a structural reason for the same result ' +
        'they established by exhaustive coverage in the Empty Door.',
      bounds: {
        wordLength: 4,
        alphabetSize: 2,
        spaceSize: 16,
        searchIsExhaustibleByHand: true
      },
      actionType: 'guided-argument',
      validation: 'AbelianCore.checkWord + structural reasoning steps',
      truth: {
        // The binary strict profile, same result as scene 4 but now
        // understood structurally.
        binaryStrictProfile: [2, 2, 2, 0],
        // The structural argument:
        forcedAlternation: true,
        // Under minK = 1, consecutive equal letters are forbidden.
        // So every valid word must alternate: no two adjacent letters equal.
        alternatingWords4: ['abab', 'baba'],
        // Both alternating length-4 words contain a K=2 abelian square.
        abab_echo: { pos: 0, K: 2, left: 'ab', right: 'ab' },
        baba_echo: { pos: 0, K: 2, left: 'ba', right: 'ba' },
        // The guided steps:
        steps: [
          { question: 'equal-neighbours', correctAnswer: 'no' },
          { question: 'what-must-word-do', correctAnswer: 'alternate' },
          { question: 'which-words-alternate', correctAnswer: 'abab-baba' },
          { question: 'show-echo', correctAnswer: 'both-have-echo' }
        ]
      },
      boundedness:
        'The structural argument establishes the same result as scene 4 ' +
        '(no survivor of length 4 over {a,b} under minK = 1) by a ' +
        'different route: logical deduction rather than exhaustive search. ' +
        'It says nothing about other lengths, alphabets, or rules.',
      scaffoldPolicy:
        'The guided proof cannot be skipped. Each step requires the child ' +
        'to select the correct answer before proceeding. Wrong answers ' +
        'are corrected, not punished. The evidence card "I KNOW WHY" is ' +
        'a player-facing epistemic category, not a MATH_CLAIMS status.'
    }
  ];

  /**
   * The Cliff data: survivor-count profiles for display.
   * Wall 3 is intentionally empty — its emptiness is foreshadowing.
   */
  var CLIFF = {
    walls: [
      {
        id: 'binary-strict',
        label: '2 symbols · every echo counts',
        alphabet: ['a', 'b'],
        rule: { minK: 1 },
        profile: [2, 2, 2, 0]
      },
      {
        id: 'ternary-strict',
        label: '3 symbols · every echo counts',
        alphabet: ['a', 'b', 'c'],
        rule: { minK: 1 },
        profile: [3, 6, 12, 18, 30, 30, 18, 0]
      },
      {
        id: 'ternary-doubles-allowed',
        label: '3 symbols · doubles allowed',
        alphabet: ['a', 'b', 'c'],
        rule: { minK: 2 },
        profile: null   // intentionally empty
      }
    ]
  };

  var API = {
    SCENES: SCENES,
    CLIFF: CLIFF,
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
