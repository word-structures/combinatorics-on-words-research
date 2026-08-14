/**
 * abelisk-levels.js
 * -----------------
 * Deterministic level data for the Abelisk MVP.
 * 
 * Defines the teaching progression. It intentionally contains no logic
 * and no mathematical authority (which belongs to AbelianCore).
 */
(function(global) {
  'use strict';

  const AbeliskLevels = [
    {
      id: 1,
      title: "Quantity vs Order",
      teachingObjective: "Recognize that 'ab' and 'ba' have the same quantities despite different order.",
      startingWord: "a",
      targetExtensions: 2,
      convention: { minK: 2 },
      scaffolds: {
        showCounts: true,
        showHalves: true,
        showDanger: true
      },
      // Used by tests to ensure level is completable. Must be verified by core.
      solutionWitness: ["b", "c"]
    },
    {
      id: 2,
      title: "The Danger Zone",
      teachingObjective: "Spot when the word is about to repeat its counts.",
      startingWord: "aba",
      targetExtensions: 3,
      convention: { minK: 2 },
      scaffolds: {
        showCounts: true,
        showHalves: true,
        showDanger: false
      },
      solutionWitness: ["c", "b", "c"]
    },
    {
      id: 3,
      title: "Without the Danger Overlay",
      teachingObjective: "Extend safely without the danger highlight.",
      startingWord: "bc",
      targetExtensions: 4,
      convention: { minK: 2 },
      scaffolds: {
        showCounts: true,
        showHalves: true,
        showDanger: false
      },
      solutionWitness: ["a", "b", "c", "b"]
    },
    {
      id: 4,
      title: "Counting on your own",
      teachingObjective: "Extend safely with counts hidden (re-enable if needed).",
      startingWord: "caba",
      targetExtensions: 3,
      convention: { minK: 2 },
      scaffolds: {
        showCounts: false,
        showHalves: true,
        showDanger: false
      },
      solutionWitness: ["a", "a", "c"]
    },
    {
      id: 5,
      title: "Repair and Extend",
      teachingObjective: "Repair from a bad move, or avoid it, without any overlays.",
      startingWord: "abc",
      targetExtensions: 4,
      convention: { minK: 2 },
      scaffolds: {
        showCounts: false,
        showHalves: false,
        showDanger: false
      },
      solutionWitness: ["a", "a", "a", "b"]
    },
    {
      id: 6,
      title: "The Pattern Without Help",
      teachingObjective: "Transfer the capability to a longer unfamiliar word without scaffolds.",
      startingWord: "abacab",
      targetExtensions: 5,
      convention: { minK: 2 },
      scaffolds: {
        showCounts: false,
        showHalves: false,
        showDanger: false
      },
      solutionWitness: ["b", "b", "a", "a", "a"]
    }
  ];

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = AbeliskLevels;
  } else {
    global.AbeliskLevels = AbeliskLevels;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
