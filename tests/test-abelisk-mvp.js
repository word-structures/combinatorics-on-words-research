/**
 * test-abelisk-mvp.js
 * -------------------
 * Validates the deterministic level data for the Abelisk MVP against the
 * mathematical authority of AbelianCore.
 * 
 * Verifies that:
 * 1. Every level's starting word is valid.
 * 2. Every level's solution witness is a valid path to completion.
 * 3. The solution witness reaches the exact target extension length.
 */

const AbelianCore = require('../src/abelian-core.js');
const AbeliskLevels = require('../assets/abelisk-levels.js');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    failed++;
  } else {
    passed++;
  }
}

console.log('=== ABELISK MVP LEVEL VALIDATION ===\n');

for (const level of AbeliskLevels) {
  console.log(`Checking Level ${level.id}: ${level.title}`);
  
  const minK = level.convention.minK;
  const maxK = level.convention.maxK;
  const alphabet = ['a', 'b', 'c'];
  
  // 1. Check starting word
  const startCheck = AbelianCore.checkWord(level.startingWord, minK, maxK, alphabet);
  assert(startCheck.valid, `Level ${level.id} starting word '${level.startingWord}' must be valid.`);
  
  // 2. Walk the solution witness
  let currentWord = level.startingWord;
  let witnessValid = true;
  
  for (const letter of level.solutionWitness) {
    const attemptedWord = currentWord + letter;
    const violation = AbelianCore.checkSuffix(attemptedWord, minK, maxK, alphabet);
    
    if (violation) {
      console.error(`[FAIL] Level ${level.id} solution witness fails on letter '${letter}'. Created square of half-length ${violation.K}.`);
      witnessValid = false;
      failed++;
      break;
    }
    currentWord = attemptedWord;
  }
  
  if (witnessValid) {
    assert(true, `Level ${level.id} solution witness is a valid mathematical path.`);
  }
  
  // 3. Check target extensions matches witness length
  assert(
    level.solutionWitness.length === level.targetExtensions, 
    `Level ${level.id} witness length (${level.solutionWitness.length}) must exactly match target extensions (${level.targetExtensions}).`
  );
  
  if (witnessValid && level.solutionWitness.length === level.targetExtensions && startCheck.valid) {
    console.log(`  [PASS] Level ${level.id} machine-validated against AbelianCore.\n`);
  }
}

console.log(`=== ABELISK MVP VALIDATION: ${passed} passed, ${failed} failed ===`);

if (failed > 0) {
  process.exit(1);
}
