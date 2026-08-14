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
 * 4. Completing the final level reaches the completion screen without
 *    throwing (regression test, jsdom-driven, real abelisk.html/js).
 */

const path = require('path');
const { JSDOM } = require('jsdom');
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

// --- Regression: completing the final level must not throw ---
//
// Invariant under test: completing the final level reaches the completion
// state and does not attempt to load a nonexistent level.
//
// This loads the real abelisk.html and its real scripts (unmodified) in
// jsdom and drives the game through all six levels' solutionWitness data,
// the same data section 1-3 above already validated against AbelianCore.
// It is a regression test for a concrete failure: nextLevel() past the
// final level called loadLevel(), which read `.startingWord` off
// `window.AbeliskLevels[state.currentLevelIndex]` (undefined past the last
// index) and threw, so the completion screen was never reached.
async function runFinalLevelRegressionTest() {
  console.log('\n=== ABELISK FINAL-LEVEL REGRESSION (jsdom) ===\n');

  const htmlPath = path.join(__dirname, '../abelisk.html');
  const dom = await JSDOM.fromFile(htmlPath, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'file://' + htmlPath.replace(/\\/g, '/'),
  });
  const { window } = dom;

  let uncaught = null;
  window.addEventListener('error', (e) => {
    uncaught = (e.error && e.error.message) || e.message;
  });

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  await new Promise((resolve) => {
    if (window.document.readyState === 'complete') resolve();
    else window.addEventListener('load', resolve);
  });
  await wait(50); // let the deferred scripts' DOMContentLoaded handler render onboarding

  // Skip onboarding the same way a player does: advanceOnboarding('complete').
  window.advanceOnboarding('complete');
  await wait(50);

  for (const level of AbeliskLevels) {
    for (const letter of level.solutionWitness) {
      window.playLetter(letter);
      await wait(10);
    }
    const continueBtn = [...window.document.querySelectorAll('button')].find(
      (b) => b.textContent.trim() === 'Continue'
    );
    if (!continueBtn) {
      console.error(`[FAIL] Level ${level.id} did not reach a completable state (no Continue button).`);
      failed++;
      break;
    }
    passed++;
    continueBtn.click();
    await wait(10);
  }
  await wait(50);

  if (uncaught !== null) {
    console.error(`[FAIL] Completing the final level must not throw. Got: ${uncaught}`);
    failed++;
  } else {
    passed++;
    console.log('  [PASS] No uncaught error while advancing through all six levels.');
  }

  const completionHeading = window.document.querySelector('#abelisk-complete h2');
  if (!completionHeading || completionHeading.textContent !== 'You can see the hidden echoes now') {
    console.error('[FAIL] After the final level, the completion screen (#abelisk-complete) must render.');
    failed++;
  } else {
    passed++;
    console.log('  [PASS] Completion screen reached after the final level.');
  }

  window.close();
}

runFinalLevelRegressionTest()
  .catch((err) => {
    console.error(`[FAIL] Final-level regression test crashed: ${err.stack || err.message}`);
    failed++;
  })
  .finally(() => {
    console.log(`\n=== ABELISK MVP VALIDATION (TOTAL): ${passed} passed, ${failed} failed ===`);
    if (failed > 0) {
      process.exit(1);
    }
  });
