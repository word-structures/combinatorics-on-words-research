/**
 * assets/abelisk.js
 * -----------------
 * State machine, DOM rendering, and interaction for Abelisk MVP.
 */

(function() {
  'use strict';

  // Constants
  const ALPHABET = ['a', 'b', 'c'];
  
  // Game State
  let state = {
    onboardingStep: 1, // 1, 2, 3, or 'complete'
    currentLevelIndex: 0,
    currentWord: "",
    extensionsMade: 0,
    hintLevel: 0, // 0 to 4
    failure: null, // { attemptedWord, selectedLetter, evidence }
    focusedElement: null // To restore focus after render
  };

  const appEl = document.getElementById('abelisk-app');

  // --- Core Engine Wrapper ---
  // Ensure we don't accidentally mutate state while checking
  function checkMove(attemptedWord, level) {
    // AbelianCore.checkSuffix assumes the prefix is valid.
    const minK = level.convention.minK || 2;
    const maxK = level.convention.maxK;
    return window.AbelianCore.checkSuffix(attemptedWord, minK, maxK, ALPHABET);
  }

  // --- Rendering Architecture ---

  function render() {
    if (state.onboardingStep !== 'complete') {
      renderOnboarding();
    } else {
      renderGame();
    }
    restoreFocus();
  }

  function setFocus(selector) {
    state.focusedElement = selector;
  }

  function restoreFocus() {
    if (state.focusedElement) {
      const el = document.querySelector(state.focusedElement);
      if (el) el.focus();
      state.focusedElement = null; // Clear after use
    }
  }

  function renderOnboarding() {
    let html = '';
    
    if (state.onboardingStep === 1) {
      html = `
        <div class="wrap section">
          <div class="onboarding level-fade-in">
            <h2 class="onboarding__title">The hidden echo</h2>
            <div class="onboarding__content">
              <p>Look at these two blocks:</p>
              <div class="onboarding__example">
                <div class="word-container">
                  <span class="g-cell g-cell--a">a</span>
                  <span class="g-cell g-cell--b">b</span>
                  <span class="scaffold-marker"></span>
                  <span class="g-cell g-cell--b">b</span>
                  <span class="g-cell g-cell--a">a</span>
                </div>
              </div>
              <p>Read them and they look different: <strong>a b</strong>, then <strong>b a</strong>. The order has changed.</p>
              <p>Count them and nothing has changed at all. Each block holds exactly one <strong>a</strong> and one <strong>b</strong>.</p>
              <p>A repetition you cannot hear by reading &mdash; only by counting. Abelisk calls this a <strong>hidden echo</strong>.</p>
            </div>
            <button class="btn" onclick="advanceOnboarding(2)">I can see the hidden echo</button>
          </div>
        </div>
      `;
    } else if (state.onboardingStep === 2) {
      html = `
        <div class="wrap section">
          <div class="onboarding level-fade-in">
            <h2 class="onboarding__title">Find the hidden echo</h2>
            <div class="onboarding__content">
              <p>One of these pairs is a hidden echo. Which one?</p>
              <p>Count each block. The order does not matter &mdash; only how many of each letter.</p>
              
              <div class="onboarding__options">
                <button class="onboarding-btn" onclick="handleIdentifyAnswer(this, false)">
                  <div class="word-container">
                    <span class="g-cell g-cell--a">a</span><span class="g-cell g-cell--a">a</span>
                    <span class="scaffold-marker"></span>
                    <span class="g-cell g-cell--a">a</span><span class="g-cell g-cell--b">b</span>
                  </div>
                </button>
                <button class="onboarding-btn" onclick="handleIdentifyAnswer(this, true)">
                  <div class="word-container">
                    <span class="g-cell g-cell--c">c</span><span class="g-cell g-cell--b">b</span><span class="g-cell g-cell--a">a</span>
                    <span class="scaffold-marker"></span>
                    <span class="g-cell g-cell--a">a</span><span class="g-cell g-cell--b">b</span><span class="g-cell g-cell--c">c</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (state.onboardingStep === 3) {
      html = `
        <div class="wrap section">
          <div class="onboarding level-fade-in">
            <h2 class="onboarding__title">What mathematicians call it</h2>
            <div class="onboarding__content">
              <div class="onboarding__example">
                <div class="word-container">
                  <span class="g-cell g-cell--a">a</span><span class="g-cell g-cell--b">b</span><span class="g-cell g-cell--c">c</span>
                  <span class="scaffold-marker"></span>
                  <span class="g-cell g-cell--c">c</span><span class="g-cell g-cell--a">a</span><span class="g-cell g-cell--b">b</span>
                </div>
              </div>
              <p>Abelisk calls this a <strong>hidden echo</strong>. Mathematicians call it an <strong>abelian square</strong>.</p>
              <p>What makes these two adjacent blocks one?</p>
              
              <div class="onboarding__options">
                <button class="onboarding-btn" onclick="handleExplainAnswer(this, false)">Because they start and end with different letters.</button>
                <button class="onboarding-btn" onclick="handleExplainAnswer(this, true)">Because they have the exact same letter counts.</button>
                <button class="onboarding-btn" onclick="handleExplainAnswer(this, false)">Because they are three letters long.</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    appEl.innerHTML = html;
  }

  // --- Handlers for Onboarding ---
  window.advanceOnboarding = function(step) {
    if (step === 'complete') {
      // Setup first level
      state.onboardingStep = 'complete';
      state.currentLevelIndex = 0;
      loadLevel();
    } else {
      state.onboardingStep = step;
      render();
    }
  };

  window.handleIdentifyAnswer = function(btn, isCorrect) {
    if (isCorrect) {
      btn.classList.add('is-correct');
      setTimeout(() => advanceOnboarding(3), 600);
    } else {
      btn.classList.add('is-incorrect');
      setTimeout(() => btn.classList.remove('is-incorrect'), 1000);
    }
  };

  window.handleExplainAnswer = function(btn, isCorrect) {
    if (isCorrect) {
      btn.classList.add('is-correct');
      setTimeout(() => advanceOnboarding('complete'), 600);
    } else {
      btn.classList.add('is-incorrect');
      setTimeout(() => btn.classList.remove('is-incorrect'), 1000);
    }
  };

  // --- Game Rendering ---

  function loadLevel() {
    const level = window.AbeliskLevels[state.currentLevelIndex];
    state.currentWord = level.startingWord;
    state.extensionsMade = 0;
    state.hintLevel = 0;
    state.failure = null;
    render();
  }

  function renderGame() {
    const level = window.AbeliskLevels[state.currentLevelIndex];
    if (!level) {
      appEl.innerHTML = `
        <div class="wrap wrap--narrow section">
          <h2>You can see the hidden echoes now</h2>
          <p class="lede">You have finished every teaching level in Abelisk.</p>
          
          <ul class="ways" style="margin-top: 3rem;">
            <li class="ways__item ways__item--learn">
              <h3><a href="learn.html">Learn</a></h3>
              <p>Learn the definition more formally.</p>
            </li>
            <li class="ways__item ways__item--explore">
              <h3><a href="explore.html">Explore</a></h3>
              <p>Explore the structures in the browser.</p>
            </li>
            <li class="ways__item ways__item--research">
              <h3><a href="research.html">Research</a></h3>
              <p>See the open research questions.</p>
            </li>
          </ul>
        </div>
      `;
      return;
    }

    const isLevelComplete = state.extensionsMade >= level.targetExtensions && !state.failure;

    let html = `
      <div class="wrap wrap--narrow stage level-fade-in">
        <p class="level-status">Level ${state.currentLevelIndex + 1} of ${window.AbeliskLevels.length}</p>
        <h2 class="level-title">${level.title}</h2>
        <div class="convention-label">
          <strong>Convention:</strong> 
          Single letter repeats (aa, bb, cc) allowed. 
          In this game, abelian squares whose halves are ${level.convention.minK} or more letters long are forbidden.
        </div>
        ${level.teachingObjective ? `<p class="lede">${level.teachingObjective}</p>` : ''}
    `;

    // Find a violation to use for hints if we are not already in a failure state
    let hintEvidence = null;
    if (!state.failure && state.hintLevel > 0) {
      for (let ch of ALPHABET) {
        let v = checkMove(state.currentWord + ch, level);
        if (v) {
          hintEvidence = v;
          break; // Use the first failing letter's evidence for hints
        }
      }
    }

    const activeEvidence = state.failure ? state.failure.evidence : hintEvidence;
    
    // Determine active scaffolds based on level configuration and hint level
    // Hint level overrides level scaffold if higher
    const showDanger = level.scaffolds.showDanger || state.hintLevel >= 1;
    const showHalves = level.scaffolds.showHalves || state.hintLevel >= 2;
    const showCounts = level.scaffolds.showCounts || state.hintLevel >= 3;

    // Render word
    const wordToRender = state.failure ? state.failure.attemptedWord : state.currentWord;
    
    html += `<div class="word-container" aria-label="Current word: ${wordToRender}">`;
    for (let i = 0; i < wordToRender.length; i++) {
      const char = wordToRender[i];
      let classes = `g-cell g-cell--${char}`;
      
      // Apply scaffolds and highlights
      if (state.failure && i === wordToRender.length - 1) {
        classes += ' is-appended-letter';
      } 
      
      if (activeEvidence && showDanger) {
        // highlight danger zone (the whole square)
        const isHint = !state.failure;
        const startIndex = wordToRender.length + (isHint ? 1 : 0) - (activeEvidence.K * 2);
        if (i >= startIndex) {
          classes += ' is-danger-zone';
        }
      }

      html += `<span class="${classes}">${char}</span>`;

      // Scaffold: auto-halves
      if (activeEvidence && showHalves) {
        const isHint = !state.failure;
        const midIndex = wordToRender.length + (isHint ? 1 : 0) - activeEvidence.K - 1; // index before which to put boundary
        if (i === midIndex) {
          html += `<span class="scaffold-marker"></span>`;
        }
      }
    }
    
    // Scaffolding: Show next slot
    if (!state.failure && !isLevelComplete) {
      html += `<span class="g-cell g-cell--unknown">?</span>`;
    }
    html += `</div>`; // end word-container

    // Render active hints panel if not in failure state
    if (!state.failure && state.hintLevel > 0 && activeEvidence) {
      html += renderHintPanel(activeEvidence, showCounts, state.hintLevel);
    }

    // Render Failure Panel
    if (state.failure) {
      html += renderFailurePanel(state.failure, level);
    } else if (isLevelComplete) {
      html += `
        <div class="failure-panel" style="border-color: var(--green);">
          <p class="failure-panel__header" style="color: var(--green);">The pattern holds.</p>
          <p>You extended the word without creating a forbidden hidden echo.</p>
          <button class="btn" onclick="nextLevel()">Continue</button>
        </div>
      `;
    }

    // Render Controls
    const disabledChoices = state.failure || isLevelComplete ? 'disabled' : '';
    html += `
      <div class="controls-panel">
        <div class="choices">
          <button class="choice-btn choice-btn--a" id="btn-choice-a" onclick="playLetter('a')" ${disabledChoices} aria-label="Place a">a</button>
          <button class="choice-btn choice-btn--b" id="btn-choice-b" onclick="playLetter('b')" ${disabledChoices} aria-label="Place b">b</button>
          <button class="choice-btn choice-btn--c" id="btn-choice-c" onclick="playLetter('c')" ${disabledChoices} aria-label="Place c">c</button>
        </div>
        
        <div class="meta-controls">
          <button class="meta-btn" id="btn-undo" onclick="undo()" ${state.extensionsMade === 0 && !state.failure ? 'disabled' : ''}>${state.failure ? 'Try Again' : 'Undo'}</button>
          <button class="meta-btn" id="btn-hint" onclick="requestHint()" ${state.failure || isLevelComplete || state.hintLevel >= 4 ? 'disabled' : ''}>Hint</button>
        </div>
      </div>
    `;

    html += `</div>`; // end stage
    appEl.innerHTML = html;
    
    if (state.failure) {
      announce("Forbidden move! See explanation panel.");
    }
  }

  function renderFailurePanel(failure, level) {
    const { evidence } = failure;
    const K = evidence.K;
    
    const leftCountsHtml = ALPHABET.map(ch => 
      `<div class="count-row"><span class="chip__swatch chip__swatch--${ch}"></span>${ch}: <strong>${evidence.leftParikh[ch] || 0}</strong></div>`
    ).join('');
    
    const rightCountsHtml = ALPHABET.map(ch => 
      `<div class="count-row"><span class="chip__swatch chip__swatch--${ch}"></span>${ch}: <strong>${evidence.rightParikh[ch] || 0}</strong></div>`
    ).join('');

    return `
      <div class="failure-panel anim-seq-1" tabindex="-1" id="failure-panel">
        <p class="failure-panel__header">Forbidden Abelian Square</p>
        <p class="anim-seq-2">The letter <strong>${failure.selectedLetter}</strong> creates an abelian square (both halves are K = ${K} letters long).</p>
        
        <div class="failure-panel__factor anim-seq-3">
          <div class="failure-panel__half">
            <div class="failure-panel__cells">
              ${evidence.left.split('').map(ch => `<span class="g-cell g-cell--${ch}">${ch}</span>`).join('')}
            </div>
            <div class="failure-panel__counts">${leftCountsHtml}</div>
          </div>
          
          <div class="failure-panel__half">
            <div class="failure-panel__cells">
              ${evidence.right.split('').map((ch, idx) => {
                const isLast = idx === evidence.right.length - 1;
                return `<span class="g-cell g-cell--${ch} ${isLast ? 'is-appended-letter' : ''}">${ch}</span>`;
              }).join('')}
            </div>
            <div class="failure-panel__counts">${rightCountsHtml}</div>
          </div>
        </div>
        
        <p class="failure-panel__conclusion anim-seq-4">Same quantities in both halves. The order may be different &mdash; the matching counts are what make this an abelian square.</p>
      </div>
    `;
  }

  function renderHintPanel(evidence, showCounts, hintLevel) {
    const K = evidence.K;
    
    const leftCountsHtml = ALPHABET.map(ch => 
      `<div class="count-row"><span class="chip__swatch chip__swatch--${ch}"></span>${ch}: <strong>${evidence.leftParikh[ch] || 0}</strong></div>`
    ).join('');
    
    const rightCountsHtml = ALPHABET.map(ch => 
      `<div class="count-row"><span class="chip__swatch chip__swatch--${ch}"></span>${ch}: <strong>${evidence.rightParikh[ch] || 0}</strong></div>`
    ).join('');

    return `
      <div class="failure-panel" style="border-color: var(--gold);">
        <p class="failure-panel__header" style="color: var(--gold);">Hint Active</p>
        <p>A forbidden repetition (K=${K}) is possible here.</p>
        
        ${hintLevel >= 3 || showCounts ? `
        <div class="failure-panel__factor">
          <div class="failure-panel__half">
            <div class="failure-panel__cells">
              ${evidence.left.split('').map(ch => `<span class="g-cell g-cell--${ch}">${ch}</span>`).join('')}
            </div>
            <div class="failure-panel__counts">${leftCountsHtml}</div>
          </div>
          
          <div class="failure-panel__half">
            <div class="failure-panel__cells">
              ${evidence.right.slice(0, -1).split('').map(ch => `<span class="g-cell g-cell--${ch}">${ch}</span>`).join('')}
              <span class="g-cell g-cell--unknown">?</span>
            </div>
            <div class="failure-panel__counts">${rightCountsHtml}</div>
          </div>
        </div>
        ` : ''}

        ${hintLevel >= 4 ? `
        <p class="failure-panel__conclusion">Count the quantities in the left half, then compare to the right half. What letter would perfectly balance the counts?</p>
        ` : ''}
      </div>
    `;
  }

  // --- Actions ---

  window.playLetter = function(letter) {
    if (state.failure) return;

    const level = window.AbeliskLevels[state.currentLevelIndex];
    const attemptedWord = state.currentWord + letter;
    
    const violation = checkMove(attemptedWord, level);
    
    if (violation) {
      // Invariant: currentWord remains unchanged.
      state.failure = {
        attemptedWord,
        selectedLetter: letter,
        evidence: violation
      };
      setFocus('#btn-undo'); // Focus "Try Again"
      render();
    } else {
      state.currentWord = attemptedWord;
      state.extensionsMade++;
      state.failure = null;
      state.hintLevel = 0;
      setFocus('.choice-btn--a'); // Focus choice buttons again
      render();
      announce(`${letter} placed safely.`);
    }
  };

  window.undo = function() {
    if (state.failure) {
      state.failure = null;
      setFocus('.choice-btn--a');
      render();
      announce("Undone. Back to safe word.");
    } else if (state.extensionsMade > 0) {
      state.currentWord = state.currentWord.slice(0, -1);
      state.extensionsMade--;
      setFocus('.choice-btn--a');
      render();
      announce("Undone last letter.");
    }
  };

  window.requestHint = function() {
    const level = window.AbeliskLevels[state.currentLevelIndex];
    let hintEvidence = null;
    for (let ch of ALPHABET) {
      let v = checkMove(state.currentWord + ch, level);
      if (v) {
        hintEvidence = v;
        break;
      }
    }

    if (!hintEvidence) {
      // No unsafe letters yet, don't consume the hint stage
      announce("Nothing dangerous is forming yet. Extend the word once and look again.");
      return;
    }

    if (state.hintLevel < 4) {
      state.hintLevel++;
      setFocus('#btn-hint');
      render();
      announce(`Hint ${state.hintLevel} activated.`);
    }
  };

  window.nextLevel = function() {
    state.currentLevelIndex++;
    setFocus('.choice-btn--a');
    loadLevel();
  };

  function announce(message) {
    const announcer = document.getElementById('a11y-announcer');
    if (announcer) {
      announcer.textContent = message;
    }
  }

  // Kickoff
  document.addEventListener("DOMContentLoaded", () => {
    // Check if AbelianCore is loaded
    if (!window.AbelianCore) {
      appEl.innerHTML = '<div class="wrap section"><p>Error: AbelianCore not loaded.</p></div>';
      return;
    }
    render();
  });

})();
