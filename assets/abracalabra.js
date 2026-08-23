/**
 * abracalabra.js
 * --------------
 * State machine, rendering and interaction for the abracalabra V1 vertical
 * slice (four scenes, ~10-20 minutes).
 *
 * SEPARATION OF RESPONSIBILITIES — this is deliberate and load-bearing:
 *
 *   src/abelian-core.js          the only mathematical authority. Nothing in
 *                                this file decides whether two blocks form an
 *                                abelian square; it asks AbelianCore.
 *   assets/abracalabra-scenes.js the exact task specification and every
 *                                expected figure, machine-checked by
 *                                tests/test-abracalabra.js.
 *   assets/abracalabra-strings.js child-facing prose, EN canonical + FI.
 *   this file                    state, DOM, and the interaction grammar.
 *
 * IT DOES NOT TOUCH ABELISK. No symbol here is shared with assets/abelisk.js,
 * and abelisk.html does not load this file. The two products share exactly
 * one thing: AbelianCore.
 *
 * PRIVACY: no storage of any kind. No localStorage, no sessionStorage, no
 * cookies, no network calls, no timing records. Reloading the page starts
 * over, and that is the whole persistence design for V1.
 *
 * A NOTE ON WHAT THE SOFTWARE KNOWS vs WHAT THE CHILD KNOWS. In scene 3 and
 * scene 4 this module always knows the complete truth (the full space, the
 * survivor count). It must never present that knowledge as the child's. The
 * counters below report COVERAGE — how much of the space the child has
 * accounted for — and never whether a conclusion follows. Drawing the
 * conclusion is a separate, explicit choice the child makes.
 */

(function() {
  'use strict';

  var AC = window.AbelianCore;
  var SCENES = window.AbracalabraScenes;
  var STRINGS = window.AbracalabraStrings;

  var appEl = document.getElementById('abracalabra-app');

  // ── State ────────────────────────────────────────────────────────────

  var state = null;

  function freshSceneState(id) {
    switch (id) {
      case 'echo':
        return { selStart: null, selEnd: null, result: null, attempts: 0, phase: 'find' };
      case 'crack':
        return { slots: ['', '', '', ''], blockLen: 2, result: null, phase: 'build', repairWrong: false };
      case 'map':
        return { slots: ['', '', ''], wall: [], phase: 'free', notice: null,
                 claimed: null, guide: [null, null, null], sortBy: 'none',
                 // The organiser is offered only after the door has asked
                 // "are these all of them?", and never taken away again.
                 organiser: false };
      case 'empty-door':
        return { slots: ['', '', '', ''], tried: [], notice: null, phase: 'try',
                 parents: {}, covered: {}, whyAsked: false, whyWrong: false,
                 finalWrong: null };
      default:
        return {};
    }
  }

  function freshState(lang) {
    return {
      lang: lang || 'fi',
      view: 'opening',
      sceneIndex: 0,
      earned: [],
      scene: freshSceneState(SCENES.SCENES[0].id),
      confirmRestart: false,
      focusTarget: null
    };
  }

  // ── String helpers ───────────────────────────────────────────────────

  function t() {
    var pack = STRINGS.pack(state.lang);
    var node = pack;
    for (var i = 0; i < arguments.length; i++) {
      if (node == null) return '';
      node = node[arguments[i]];
    }
    return node == null ? '' : node;
  }

  function fmt(str, vals) {
    return String(str).replace(/\{(\w+)\}/g, function(m, k) {
      return Object.prototype.hasOwnProperty.call(vals || {}, k) ? String(vals[k]) : m;
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function(c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c];
    });
  }

  // ── Mathematical queries (all delegated to AbelianCore) ──────────────

  /**
   * Parikh comparison of the two halves of word[start .. start+len-1].
   * PRECONDITION: len is even.
   */
  function halves(word, start, len, alphabet) {
    var K = len / 2;
    var built = AC.buildPrefixSums(word, alphabet);
    var lp = AC.parikhVector(built.prefix, built.alphabet, start, K);
    var rp = AC.parikhVector(built.prefix, built.alphabet, start + K, K);
    return {
      K: K,
      left: word.substr(start, K),
      right: word.substr(start + K, K),
      leftParikh: lp,
      rightParikh: rp,
      equal: AC.parikhEqual(lp, rp, built.alphabet)
    };
  }

  /** First abelian square in `word` under the given rule, or null. */
  function firstEcho(word, rule, alphabet) {
    return AC.checkWord(word, rule.minK, rule.maxK || undefined, alphabet).violation;
  }

  // ── Small view components ────────────────────────────────────────────

  function cell(ch, extraClass, attrs) {
    return '<span class="ab-cell ab-cell--' + esc(ch) + ' ' + (extraClass || '') + '"' +
      (attrs || '') + '>' + esc(ch) + '</span>';
  }

  function wordCells(word, extraClass) {
    var out = '';
    for (var i = 0; i < word.length; i++) out += cell(word[i], extraClass);
    return out;
  }

  /** Spaced letters so a screen reader reads them one at a time. */
  function spell(word) { return String(word).split('').join(' '); }

  function inventory(parikh, alphabet, label) {
    var rows = alphabet.map(function(ch) {
      return '<span class="ab-inv__row"><span class="ab-inv__sym ab-cell ab-cell--' + ch +
        '">' + ch + '</span><span class="ab-inv__n">' + (parikh[ch] || 0) + '</span></span>';
    }).join('');
    return '<div class="ab-inv"><span class="ab-inv__label">' + esc(label) + '</span>' +
      '<div class="ab-inv__rows">' + rows + '</div></div>';
  }

  /** Slot builder used by scenes 2, 3 and 4. Click/select only, no dragging. */
  function slotBuilder(slots, alphabet, opts) {
    opts = opts || {};
    var out = '<div class="ab-build">';
    out += '<div class="ab-slots" role="group" aria-label="' + esc(opts.slotsLabel || 'Slots') + '">';
    for (var i = 0; i < slots.length; i++) {
      if (opts.divideAfter === i) out += '<span class="ab-divider" aria-hidden="true"></span>';
      var filled = slots[i] !== '';
      out += '<button type="button" class="ab-slot ' + (filled ? 'ab-cell ab-cell--' + slots[i] : 'ab-slot--empty') +
        '" data-act="slot" data-arg="' + i + '" aria-label="' +
        esc(fmt(opts.slotLabel || 'Slot {n}: {v}', { n: i + 1, v: filled ? slots[i] : '—' })) + '">' +
        (filled ? esc(slots[i]) : '<span aria-hidden="true">·</span>') + '</button>';
    }
    out += '</div>';
    out += '<div class="ab-keys" role="group" aria-label="' + esc(opts.keysLabel || 'Symbols') + '">';
    alphabet.forEach(function(ch) {
      out += '<button type="button" class="ab-key ab-key--' + ch + '" data-act="key" data-arg="' + ch +
        '" aria-label="' + esc(fmt(opts.keyLabel || 'Place {v}', { v: ch })) + '">' + ch + '</button>';
    });
    out += '<button type="button" class="ab-btn ab-btn--quiet" data-act="clear">' + esc(t('ui', 'clear')) + '</button>';
    out += '</div></div>';
    return out;
  }

  function noticeBox(text, kind) {
    if (!text) return '';
    return '<p class="ab-notice ab-notice--' + (kind || 'neutral') + '">' + esc(text) + '</p>';
  }

  function actCard(actName) {
    var a = t('acts', actName);
    return '<div class="ab-act" tabindex="-1" id="ab-act">' +
      '<p class="ab-act__name">' + esc(a.name) + '</p>' +
      '<p class="ab-act__line">' + esc(a.line) + '</p>' +
      '<button type="button" class="ab-btn" data-act="advance">' + esc(t('ui', 'continue')) + '</button>' +
      '</div>';
  }

  // ── Scene 1 — The Echo (FIND) ────────────────────────────────────────

  function renderEcho(scene) {
    var s = state.scene;
    var strip = scene.bounds.strip;
    var alphabet = scene.alphabet;
    var out = '';

    out += '<p class="ab-intro">' + esc(t('scenes', 'echo', 'intro')) + '</p>';
    out += '<p class="ab-prompt">' + esc(t('scenes', 'echo', 'prompt')) + '</p>';
    out += '<p class="ab-rule">' + esc(t('scenes', 'echo', 'rule')) + '</p>';

    var lo = s.selStart, hi = s.selEnd;
    out += '<div class="ab-strip" role="group" aria-label="' + esc(spell(strip)) + '">';
    for (var i = 0; i < strip.length; i++) {
      var cls = 'ab-cell ab-cell--' + strip[i];
      if (lo !== null && hi !== null && i >= lo && i <= hi) cls += ' is-selected';
      else if (lo !== null && hi === null && i === lo) cls += ' is-anchor';
      out += '<button type="button" class="ab-stripcell ' + cls + '" data-act="pick" data-arg="' + i +
        '" aria-pressed="' + (lo !== null && hi !== null && i >= lo && i <= hi) + '"' +
        ' aria-label="' + esc(strip[i] + ' (' + (i + 1) + ')') + '">' + strip[i] + '</button>';
    }
    out += '</div>';

    if (s.phase === 'find') {
      if (lo !== null && hi === null) {
        out += noticeBox(fmt(t('scenes', 'echo', 'selecting'), { n: lo + 1 }));
      } else if (!s.result) {
        out += noticeBox(t('scenes', 'echo', 'help'));
      }
      if (s.result && !s.result.equal) {
        out += renderHalves(s.result, alphabet);
        out += noticeBox(s.attempts > 1
          ? t('scenes', 'echo', 'attemptFailAgain')
          : t('scenes', 'echo', 'attemptFail'), 'attempt');
      }
      if (s.error) out += noticeBox(s.error, 'error');
    } else {
      out += renderHalves(s.result, alphabet);
      out += '<div class="ab-resolve">';
      out += '<p class="ab-resolve__head">' + esc(t('scenes', 'echo', 'success')) + '</p>';
      out += '<p>' + esc(t('scenes', 'echo', 'successBody')) + '</p>';
      out += '<p class="ab-naming">' + esc(t('scenes', 'echo', 'naming')) + '</p>';
      out += '</div>';
      out += actCard('FIND');
    }
    return out;
  }

  function renderHalves(r, alphabet) {
    if (!r) return '';
    return '<div class="ab-halves">' +
      '<div class="ab-half"><div class="ab-half__cells">' + wordCells(r.left) + '</div>' +
      inventory(r.leftParikh, alphabet, t('scenes', 'echo', 'leftLabel')) + '</div>' +
      '<div class="ab-half"><div class="ab-half__cells">' + wordCells(r.right) + '</div>' +
      inventory(r.rightParikh, alphabet, t('scenes', 'echo', 'rightLabel')) + '</div>' +
      '</div>';
  }

  function echoPick(i) {
    var s = state.scene;
    var scene = currentScene();
    s.error = null;
    if (s.phase !== 'find') return;

    if (s.selStart === null || s.selEnd !== null) {
      s.selStart = i; s.selEnd = null; s.result = null;
      announce(fmt(t('scenes', 'echo', 'selecting'), { n: i + 1 }));
      return;
    }
    if (i === s.selStart) { s.selStart = null; return; }

    var lo = Math.min(i, s.selStart), hi = Math.max(i, s.selStart);
    var len = hi - lo + 1;
    if (len % 2 !== 0) { s.error = t('scenes', 'echo', 'errOdd'); s.selStart = null; return; }
    if (len < 4) { s.error = t('scenes', 'echo', 'errShort'); s.selStart = null; return; }

    s.selStart = lo; s.selEnd = hi;
    s.result = halves(scene.bounds.strip, lo, len, scene.alphabet);
    s.attempts++;
    if (s.result.equal) {
      s.phase = 'found';
      state.focusTarget = '#ab-act';
      announce(t('scenes', 'echo', 'success'));
    } else {
      announce(t('scenes', 'echo', 'attemptFail'));
    }
  }

  // ── Scene 2 — The Crack (BREAK) ──────────────────────────────────────

  function renderCrack(scene) {
    var s = state.scene;
    var out = '';
    out += '<p class="ab-intro">' + esc(t('scenes', 'crack', 'intro')) + '</p>';
    out += '<blockquote class="ab-claim' + (s.phase !== 'build' ? ' is-cracked' : '') + '">' +
      esc(t('scenes', 'crack', 'claim')) + '</blockquote>';

    if (s.phase === 'build') {
      out += '<p class="ab-prompt">' + esc(t('scenes', 'crack', 'prompt')) + '</p>';
      out += '<div class="ab-blocklen" role="group" aria-label="' + esc(t('scenes', 'crack', 'help')) + '">';
      scene.bounds.blockLengths.forEach(function(L) {
        out += '<button type="button" class="ab-btn ab-btn--quiet' + (s.blockLen === L ? ' is-on' : '') +
          '" data-act="blocklen" data-arg="' + L + '" aria-pressed="' + (s.blockLen === L) + '">' +
          esc(fmt(t('scenes', 'crack', 'blockLen'), { n: L })) + '</button>';
      });
      out += '</div>';
      out += slotBuilder(s.slots, scene.alphabet, {
        divideAfter: s.blockLen,
        slotsLabel: t('scenes', 'crack', 'help')
      });
      out += '<p><button type="button" class="ab-btn" data-act="test">' + esc(t('ui', 'check')) + '</button></p>';
      if (s.notice) out += noticeBox(s.notice, s.noticeKind || 'attempt');
      if (s.result && s.result.shown) out += renderCrackHalves(s.result, scene.alphabet);
    } else {
      out += renderCrackHalves(s.result, scene.alphabet);
      out += '<div class="ab-resolve">';
      out += '<p class="ab-resolve__head">' + esc(t('scenes', 'crack', 'success')) + '</p>';
      out += '<p>' + esc(t('scenes', 'crack', 'successBody')) + '</p>';
      out += '<p class="ab-naming">' + esc(t('scenes', 'crack', 'oneEnough')) + '</p>';
      out += '</div>';

      if (s.phase === 'repair') {
        out += '<p class="ab-intro">' + esc(t('scenes', 'crack', 'repairIntro')) + '</p>';
        out += '<blockquote class="ab-claim ab-claim--repaired">' + esc(t('scenes', 'crack', 'repairedClaim')) + '</blockquote>';
        out += '<p class="ab-prompt">' + esc(t('scenes', 'crack', 'repairQuestion')) + '</p>';
        out += '<div class="ab-options">' +
          '<button type="button" class="ab-opt" data-act="repair" data-arg="yes">' + esc(t('scenes', 'crack', 'repairYes')) + '</button>' +
          '<button type="button" class="ab-opt" data-act="repair" data-arg="no">' + esc(t('scenes', 'crack', 'repairNo')) + '</button>' +
          '</div>';
        if (s.repairWrong) out += noticeBox(t('scenes', 'crack', 'repairWrong'), 'attempt');
      } else {
        out += noticeBox(t('scenes', 'crack', 'repairRight'), 'good');
        out += actCard('BREAK');
      }
    }
    return out;
  }

  function renderCrackHalves(r, alphabet) {
    if (!r) return '';
    return '<div class="ab-halves">' +
      '<div class="ab-half"><div class="ab-half__cells">' + wordCells(r.left) + '</div>' +
      inventory(r.leftParikh, alphabet, t('scenes', 'echo', 'leftLabel')) + '</div>' +
      '<div class="ab-half"><div class="ab-half__cells">' + wordCells(r.right) + '</div>' +
      inventory(r.rightParikh, alphabet, t('scenes', 'echo', 'rightLabel')) + '</div>' +
      '</div>';
  }

  function crackTest() {
    var s = state.scene, scene = currentScene();
    s.notice = null;
    var word = s.slots.join('');
    if (word.length !== s.blockLen * 2) { s.notice = t('scenes', 'crack', 'errIncomplete'); return; }

    var r = halves(word, 0, word.length, scene.alphabet);
    r.shown = true;
    s.result = r;

    if (!r.equal) {
      s.notice = t('scenes', 'crack', 'resultNotEcho');
      s.noticeKind = 'attempt';
    } else if (r.left === r.right) {
      s.notice = t('scenes', 'crack', 'resultConsistent');
      s.noticeKind = 'attempt';
    } else {
      s.phase = 'repair';
      state.focusTarget = '.ab-opt';
      announce(t('scenes', 'crack', 'success'));
      return;
    }
    announce(s.notice);
  }

  function crackRepair(answer) {
    var s = state.scene;
    if (answer === 'no') {
      s.phase = 'done';
      state.focusTarget = '#ab-act';
      announce(t('scenes', 'crack', 'repairRight'));
    } else {
      s.repairWrong = true;
      announce(t('scenes', 'crack', 'repairWrong'));
    }
  }

  // ── Scene 3 — The Map (MAP) ──────────────────────────────────────────

  function sortWall(wall, mode) {
    if (mode === 'none') return [{ key: null, words: wall.slice() }];
    var keyOf;
    if (mode === 'first') keyOf = function(w) { return w[0]; };
    else if (mode === 'last') keyOf = function(w) { return w[w.length - 1]; };
    else keyOf = function(w) { return String((w.match(/a/g) || []).length); };

    var map = {}, order = [];
    wall.forEach(function(w) {
      var k = keyOf(w);
      if (!map[k]) { map[k] = []; order.push(k); }
      map[k].push(w);
    });
    order.sort();
    return order.map(function(k) { return { key: k, words: map[k] }; });
  }

  function renderMap(scene) {
    var s = state.scene;
    var out = '';
    out += '<p class="ab-intro">' + esc(t('scenes', 'map', 'intro')) + '</p>';
    out += '<p class="ab-prompt">' + esc(t('scenes', 'map', 'prompt')) + '</p>';

    if (s.phase !== 'done') {
      out += slotBuilder(s.slots, scene.alphabet, { slotsLabel: t('scenes', 'map', 'help') });
      out += '<p><button type="button" class="ab-btn" data-act="add">' + esc(t('scenes', 'map', 'addBtn')) + '</button>';
      if (s.phase === 'free' && s.wall.length >= 3) {
        out += ' <button type="button" class="ab-btn ab-btn--quiet" data-act="done">' + esc(t('scenes', 'map', 'doneBtn')) + '</button>';
      }
      out += '</p>';
      if (s.notice) out += noticeBox(s.notice, s.noticeKind || 'neutral');
    }

    // The wall
    out += '<div class="ab-wall"><p class="ab-wall__label">' + esc(t('scenes', 'map', 'wallLabel')) +
      ' <span class="ab-wall__count">' + esc(fmt(t('scenes', 'map', 'wallCount'), { n: s.wall.length })) + '</span></p>';
    if (s.organiser) {
      out += '<div class="ab-sort" role="group" aria-label="' + esc(t('scenes', 'map', 'organiseBy')) + '">' +
        '<span class="ab-sort__label">' + esc(t('scenes', 'map', 'organiseBy')) + '</span>';
      [['none', 'organiseOff'], ['first', 'organiseFirst'], ['last', 'organiseLast'], ['countA', 'organiseCountA']]
        .forEach(function(pair) {
          out += '<button type="button" class="ab-btn ab-btn--quiet' + (s.sortBy === pair[0] ? ' is-on' : '') +
            '" data-act="sort" data-arg="' + pair[0] + '" aria-pressed="' + (s.sortBy === pair[0]) + '">' +
            esc(t('scenes', 'map', pair[1])) + '</button>';
        });
      out += '</div>';
    }
    var groups = sortWall(s.wall.slice().sort(), s.sortBy);
    groups.forEach(function(g) {
      out += '<div class="ab-group">';
      if (g.key !== null) out += '<span class="ab-group__key">' + esc(g.key) + '</span>';
      out += '<div class="ab-group__words">';
      g.words.forEach(function(w) {
        out += '<span class="ab-word" aria-label="' + esc(spell(w)) + '">' + wordCells(w) + '</span>';
      });
      out += '</div></div>';
    });
    out += '</div>';

    if (s.phase === 'asked') {
      out += '<div class="ab-resolve">';
      out += '<p class="ab-resolve__head">' + esc(t('scenes', 'map', 'question')) + '</p>';
      out += '<p>' + esc(t('scenes', 'map', 'questionBody')) + '</p>';
      out += '<p class="ab-prompt">' + esc(t('scenes', 'map', 'countPrompt')) + '</p>';
      out += '<p class="ab-numrow"><input type="number" min="1" max="999" class="ab-num" id="ab-count"' +
        ' value="' + esc(s.countDraft || '') + '"' +
        ' aria-label="' + esc(t('scenes', 'map', 'countPrompt')) + '" placeholder="' +
        esc(t('scenes', 'map', 'countPlaceholder')) + '">' +
        '<button type="button" class="ab-btn" data-act="count">' + esc(t('scenes', 'map', 'countSubmit')) + '</button></p>';
      out += '</div>';
    }

    if (s.phase === 'guide') {
      out += '<div class="ab-resolve">';
      out += '<p>' + esc(t('scenes', 'map', 'guideIntro')) + '</p>';
      ['guide1', 'guide2', 'guide3'].forEach(function(k, idx) {
        out += '<p class="ab-guide"><span>' + esc(t('scenes', 'map', k)) + '</span>';
        [1, 2, 3].forEach(function(n) {
          out += '<button type="button" class="ab-btn ab-btn--quiet' + (s.guide[idx] === n ? ' is-on' : '') +
            '" data-act="guide" data-arg="' + idx + ':' + n + '" aria-pressed="' + (s.guide[idx] === n) + '">' + n + '</button>';
        });
        out += '</p>';
      });
      if (s.guide.every(function(v) { return v !== null; })) {
        var prod = s.guide[0] * s.guide[1] * s.guide[2];
        out += '<p class="ab-naming">' + esc(fmt(t('scenes', 'map', 'guideResult'),
          { a: s.guide[0], b: s.guide[1], c: s.guide[2], n: prod })) + '</p>';
        out += '<p><button type="button" class="ab-btn" data-act="guidedone" data-arg="' + prod + '">' +
          esc(t('scenes', 'map', 'countSubmit')) + '</button></p>';
      }
      out += '</div>';
    }

    if (s.phase === 'done') {
      out += '<div class="ab-resolve">';
      out += '<p class="ab-resolve__head">' + esc(t('scenes', 'map', 'success')) + '</p>';
      out += '<p>' + esc(t('scenes', 'map', 'successBody')) + '</p>';
      out += '</div>';
      out += actCard('MAP');
    }
    return out;
  }

  function mapAdd() {
    var s = state.scene, scene = currentScene();
    s.notice = null;
    var w = s.slots.join('');
    if (w.length !== scene.bounds.wordLength) {
      s.notice = t('scenes', 'map', 'errIncomplete'); s.noticeKind = 'error'; return;
    }
    if (s.wall.indexOf(w) !== -1) {
      s.notice = fmt(t('scenes', 'map', 'duplicate'), { word: w });
      s.noticeKind = 'attempt';
    } else {
      s.wall.push(w);
      s.notice = fmt(t('scenes', 'map', 'added'), { word: w });
      s.noticeKind = 'good';
    }
    s.slots = new Array(scene.bounds.wordLength).fill('');
    announce(s.notice);
  }

  /**
   * The child commits a claimed total. The software knows the true size, but
   * what it reports back is only the comparison between the child's own claim
   * and the child's own wall — never "here is the answer".
   */
  function mapCount(claimed) {
    var s = state.scene, scene = currentScene();
    var truth = scene.bounds.spaceSize;
    s.claimed = claimed;
    s.notice = null;

    if (claimed !== truth) {
      s.phase = 'guide';
      s.guide = [null, null, null];
      announce(t('scenes', 'map', 'guideIntro'));
      return;
    }
    if (s.wall.length < truth) {
      s.notice = fmt(t('scenes', 'map', 'claimedShort'), { claim: claimed, have: s.wall.length });
      s.noticeKind = 'attempt';
      s.phase = 'free';
      announce(s.notice);
      return;
    }
    s.phase = 'done';
    state.focusTarget = '#ab-act';
    announce(t('scenes', 'map', 'success'));
  }

  // ── Scene 4 — The Empty Door (KNOW) ──────────────────────────────────

  function parentWords(scene) {
    return SCENES.byId('map').truth.completeSpace.slice();
  }

  function childrenOf(parent, alphabet) {
    return alphabet.map(function(ch) { return parent + ch; });
  }

  function coverageCount() {
    return Object.keys(state.scene.covered).length;
  }

  function echoRange(word, rule, alphabet) {
    var v = firstEcho(word, rule, alphabet);
    if (!v) return null;
    return { from: v.pos + 1, to: v.pos + 2 * v.K, K: v.K };
  }

  function renderEmptyDoor(scene) {
    var s = state.scene;
    var out = '';
    out += '<p class="ab-intro">' + esc(t('scenes', 'empty-door', 'intro')) + '</p>';
    out += '<blockquote class="ab-claim ab-claim--rule">' + esc(t('scenes', 'empty-door', 'rule')) + '</blockquote>';
    out += '<p class="ab-rule ab-rule--warn">' + esc(t('scenes', 'empty-door', 'ruleNote')) + '</p>';

    if (s.phase === 'try') {
      out += '<p class="ab-prompt">' + esc(t('scenes', 'empty-door', 'prompt')) + '</p>';
      out += slotBuilder(s.slots, scene.alphabet, { slotsLabel: t('scenes', 'empty-door', 'help') });
      out += '<p><button type="button" class="ab-btn" data-act="try">' + esc(t('scenes', 'empty-door', 'tryBtn')) + '</button></p>';
      if (s.notice) out += noticeBox(s.notice, s.noticeKind || 'attempt');
      out += renderTried(s);
    }

    if (s.phase === 'asked') {
      out += renderTried(s);
      out += '<div class="ab-resolve">';
      out += '<p class="ab-resolve__head">' + esc(t('scenes', 'empty-door', 'notFound')) + '</p>';
      out += '<p class="ab-prompt">' + esc(t('scenes', 'empty-door', 'notFoundQuestion')) + '</p>';
      out += '<div class="ab-options">' +
        '<button type="button" class="ab-opt" data-act="guess" data-arg="yes">' + esc(t('scenes', 'empty-door', 'optYes')) + '</button>' +
        '<button type="button" class="ab-opt" data-act="guess" data-arg="no">' + esc(t('scenes', 'empty-door', 'optNo')) + '</button>' +
        '<button type="button" class="ab-opt" data-act="guess" data-arg="unsure">' + esc(t('scenes', 'empty-door', 'optUnsure')) + '</button>' +
        '</div></div>';
    }

    if (s.phase === 'guessed') {
      out += renderTried(s);
      out += '<div class="ab-resolve">' + noticeBox(s.guessResponse, 'good') +
        '<button type="button" class="ab-btn" data-act="tomap">' + esc(t('ui', 'continue')) + '</button></div>';
    }

    if (s.phase === 'map' || s.phase === 'why' || s.phase === 'final' || s.phase === 'done') {
      out += renderTree(scene);
    }

    if (s.phase === 'why') {
      out += '<div class="ab-resolve">';
      out += noticeBox(fmt(t('scenes', 'empty-door', 'parentDeadFirst'), { word: s.whyWord }), 'neutral');
      out += '<p class="ab-prompt">' + esc(t('scenes', 'empty-door', 'whyQuestion')) + '</p>';
      out += '<div class="ab-options">' +
        '<button type="button" class="ab-opt" data-act="why" data-arg="a">' + esc(t('scenes', 'empty-door', 'whyA')) + '</button>' +
        '<button type="button" class="ab-opt" data-act="why" data-arg="b">' + esc(t('scenes', 'empty-door', 'whyB')) + '</button>' +
        '</div>';
      if (s.whyWrong) out += noticeBox(t('scenes', 'empty-door', 'whyWrong'), 'attempt');
      out += '</div>';
    }

    if (s.phase === 'final') {
      out += '<div class="ab-resolve">';
      out += '<p class="ab-resolve__head">' + esc(t('scenes', 'empty-door', 'nothingSurvived')) + '</p>';
      out += '<p class="ab-prompt ab-prompt--lock">' + esc(t('scenes', 'empty-door', 'finalLock')) + '</p>';
      out += '<div class="ab-options">' +
        '<button type="button" class="ab-opt" data-act="final" data-arg="1">' + esc(t('scenes', 'empty-door', 'final1')) + '</button>' +
        '<button type="button" class="ab-opt" data-act="final" data-arg="2">' + esc(t('scenes', 'empty-door', 'final2')) + '</button>' +
        '<button type="button" class="ab-opt" data-act="final" data-arg="3">' + esc(t('scenes', 'empty-door', 'final3')) + '</button>' +
        '</div>';
      if (s.finalWrong) out += noticeBox(s.finalWrong, 'attempt');
      out += '</div>';
    }

    if (s.phase === 'done') {
      out += '<div class="ab-resolve ab-resolve--final">';
      out += '<p class="ab-resolve__head">' + esc(t('scenes', 'empty-door', 'success')) + '</p>';
      (t('scenes', 'empty-door', 'successLines') || []).forEach(function(line) {
        out += '<p class="ab-line">' + esc(line) + '</p>';
      });
      out += '<p class="ab-conclusion">' + esc(t('scenes', 'empty-door', 'successConclusion')) + '</p>';
      out += '<p class="ab-bounded">' + esc(t('scenes', 'empty-door', 'bounded')) + '</p>';
      out += '</div>';
      out += actCard('KNOW');
    }
    return out;
  }

  function renderTried(s) {
    if (!s.tried.length) return '';
    var out = '<div class="ab-tried"><p class="ab-wall__label">' + esc(t('scenes', 'empty-door', 'triedLabel')) + '</p><ul>';
    s.tried.forEach(function(rec) {
      out += '<li><span class="ab-word" aria-label="' + esc(spell(rec.word)) + '">' + wordCells(rec.word) +
        '</span> <span class="ab-tried__why"><span aria-hidden="true">×</span> ' +
        esc(fmt(t('scenes', 'empty-door', 'echoAt'), { from: rec.from, to: rec.to })) + '</span></li>';
    });
    out += '</ul></div>';
    return out;
  }

  function renderTree(scene) {
    var s = state.scene;
    var total = scene.bounds.spaceSize;
    var out = '<div class="ab-tree">';
    out += '<p class="ab-intro">' + esc(t('scenes', 'empty-door', 'mapIntro')) + '</p>';
    out += '<p>' + esc(t('scenes', 'empty-door', 'mapBody')) + '</p>';
    out += '<p class="ab-coverage" role="status">' +
      esc(fmt(t('scenes', 'empty-door', 'coverage'), { n: coverageCount(), total: total })) + '</p>';

    parentWords(scene).forEach(function(p) {
      var st = s.parents[p];
      out += '<div class="ab-node' + (st ? ' is-' + st.kind : '') + '">';
      out += '<span class="ab-word" aria-label="' + esc(spell(p)) + '">' + wordCells(p) + '</span>';
      if (!st) {
        out += '<button type="button" class="ab-btn ab-btn--quiet" data-act="node" data-arg="' + p + '">' +
          esc(t('scenes', 'empty-door', 'nodeTest')) + '</button>';
      } else if (st.kind === 'dead') {
        out += '<span class="ab-node__state" data-state="dead"><span aria-hidden="true">×</span> ' +
          esc(fmt(t('scenes', 'empty-door', 'parentDead'), { word: p })) + '</span>';
      } else {
        out += '<span class="ab-node__state" data-state="live"><span aria-hidden="true">·</span> ' +
          esc(fmt(t('scenes', 'empty-door', 'parentLive'), { word: p })) + '</span>';
        out += '<div class="ab-children">';
        childrenOf(p, scene.alphabet).forEach(function(c) {
          var cov = s.covered[c];
          out += '<span class="ab-child' + (cov ? ' is-dead' : '') + '">';
          out += '<span class="ab-word" aria-label="' + esc(spell(c)) + '">' + wordCells(c) + '</span>';
          if (cov) {
            out += '<span class="ab-node__state" data-state="dead"><span aria-hidden="true">×</span> ' +
              esc(fmt(t('scenes', 'empty-door', 'echoAt'), { from: cov.from, to: cov.to })) + '</span>';
          } else {
            out += '<button type="button" class="ab-btn ab-btn--quiet" data-act="node" data-arg="' + c + '">' +
              esc(t('scenes', 'empty-door', 'nodeTest')) + '</button>';
          }
          out += '</span>';
        });
        out += '</div>';
      }
      out += '</div>';
    });
    out += '</div>';
    return out;
  }

  function emptyDoorTry() {
    var s = state.scene, scene = currentScene();
    s.notice = null;
    var w = s.slots.join('');
    if (w.length !== scene.bounds.wordLength) {
      s.notice = t('scenes', 'empty-door', 'errIncomplete'); s.noticeKind = 'error'; return;
    }
    var already = s.tried.some(function(r) { return r.word === w; });
    if (already) {
      s.notice = fmt(t('scenes', 'empty-door', 'attemptDuplicate'), { word: w });
      s.noticeKind = 'attempt';
      announce(s.notice);
      return;
    }
    var range = echoRange(w, scene.rule, scene.alphabet);
    if (!range) {
      // Unreachable given the scene's verified truth (survivorCount = 0), but
      // the UI must never depend on that: if the mathematics ever changed, a
      // survivor would surface here rather than be silently swallowed.
      s.notice = fmt(t('scenes', 'empty-door', 'unexpectedSurvivor'), { word: w });
      s.noticeKind = 'error';
      s.survivorFound = w;
      announce(s.notice);
      return;
    }
    s.tried.push({ word: w, from: range.from, to: range.to });
    s.covered[w] = { from: range.from, to: range.to, via: 'tried' };
    s.notice = fmt(t('scenes', 'empty-door', 'attemptFail'), { word: w, from: range.from, to: range.to });
    s.noticeKind = 'attempt';
    s.slots = new Array(scene.bounds.wordLength).fill('');
    announce(s.notice);

    if (s.tried.length >= 3) { s.phase = 'asked'; state.focusTarget = '.ab-opt'; }
  }

  function emptyDoorGuess(which) {
    var s = state.scene;
    s.guessResponse = t('scenes', 'empty-door',
      which === 'yes' ? 'respYes' : which === 'no' ? 'respNo' : 'respUnsure');
    s.phase = 'guessed';
    announce(s.guessResponse);
  }

  function emptyDoorNode(word) {
    var s = state.scene, scene = currentScene();
    var range = echoRange(word, scene.rule, scene.alphabet);

    if (word.length === scene.bounds.parentLength) {
      if (range) {
        s.parents[word] = { kind: 'dead', from: range.from, to: range.to };
        childrenOf(word, scene.alphabet).forEach(function(c) {
          s.covered[c] = { from: range.from, to: range.to, via: 'parent' };
        });
        if (!s.whyAsked) {
          s.whyAsked = true;
          s.whyWord = word;
          s.phase = 'why';
          state.focusTarget = '.ab-opt';
          return;
        }
      } else {
        s.parents[word] = { kind: 'live' };
      }
    } else {
      if (range) s.covered[word] = { from: range.from, to: range.to, via: 'tested' };
      else s.survivorFound = word;
    }
    announce(fmt(t('scenes', 'empty-door', 'coverage'),
      { n: coverageCount(), total: scene.bounds.spaceSize }));
    maybeAllCovered();
  }

  function maybeAllCovered() {
    var s = state.scene, scene = currentScene();
    if (s.phase === 'why') return;
    if (coverageCount() >= scene.bounds.spaceSize && !s.survivorFound) {
      s.phase = 'final';
      state.focusTarget = '.ab-opt';
      announce(t('scenes', 'empty-door', 'nothingSurvived'));
    }
  }

  function emptyDoorWhy(which) {
    var s = state.scene;
    if (which === 'a') {
      s.whyWrong = false;
      s.phase = 'map';
      announce(t('scenes', 'empty-door', 'whyRight'));
      maybeAllCovered();
    } else {
      s.whyWrong = true;
      announce(t('scenes', 'empty-door', 'whyWrong'));
    }
  }

  function emptyDoorFinal(which) {
    var s = state.scene;
    if (which === '2') {
      s.finalWrong = null;
      s.phase = 'done';
      state.focusTarget = '#ab-act';
      announce(t('scenes', 'empty-door', 'success'));
    } else {
      s.finalWrong = t('scenes', 'empty-door', which === '1' ? 'finalResp1' : 'finalResp3');
      announce(s.finalWrong);
    }
  }

  // ── Shell ────────────────────────────────────────────────────────────

  function currentScene() { return SCENES.SCENES[state.sceneIndex]; }

  function renderShell(inner, opts) {
    opts = opts || {};
    var out = '<div class="ab-shell">';
    out += '<div class="ab-topbar">';
    out += '<span class="ab-brand">' + esc(t('ui', 'productName')) + '</span>';
    if (opts.chamber) {
      out += '<span class="ab-chapter">' + esc(fmt(t('ui', 'chamberOf'),
        { n: state.sceneIndex + 1, total: SCENES.SCENES.length })) + '</span>';
    }
    out += '<span class="ab-topbar__spacer"></span>';
    out += '<span class="ab-lang" role="group" aria-label="' + esc(t('ui', 'languageLabel')) + '">';
    STRINGS.codes().forEach(function(code) {
      out += '<button type="button" class="ab-btn ab-btn--quiet' + (state.lang === code ? ' is-on' : '') +
        '" data-act="lang" data-arg="' + code + '" aria-pressed="' + (state.lang === code) + '">' +
        esc(STRINGS.pack(code).meta.label) + '</button>';
    });
    out += '</span>';
    if (opts.chamber) {
      out += '<button type="button" class="ab-btn ab-btn--quiet" data-act="restart">' + esc(t('ui', 'restart')) + '</button>';
    }
    out += '</div>';

    if (state.confirmRestart) {
      out += '<div class="ab-resolve" id="ab-confirm" tabindex="-1"><p>' + esc(t('ui', 'restartConfirm')) + '</p>' +
        '<div class="ab-options">' +
        '<button type="button" class="ab-opt" data-act="restart-yes">' + esc(t('ui', 'restartYes')) + '</button>' +
        '<button type="button" class="ab-opt" data-act="restart-no">' + esc(t('ui', 'restartNo')) + '</button>' +
        '</div></div>';
    }

    if (opts.chamber) {
      out += '<h2 class="ab-title" id="ab-title" tabindex="-1">' + esc(opts.title) + '</h2>';
      out += '<ol class="ab-earned" aria-label="' + esc(t('ui', 'howDoYouKnow')) + '">';
      state.earned.forEach(function(a) {
        out += '<li class="ab-earned__item">' + esc(t('acts', a, 'name')) + '</li>';
      });
      out += '</ol>';
    }
    out += inner;
    out += '<p class="ab-privacy">' + esc(t('ui', 'privacyNote')) + '</p>';
    out += '</div>';
    return out;
  }

  function renderOpening() {
    var inner = '<div class="ab-opening" id="ab-opening" tabindex="-1">' +
      '<p class="ab-opening__lede">' + esc(t('opening', 'lede')) + '</p>' +
      '<p class="ab-opening__tagline">' + esc(t('ui', 'tagline')) + '</p>' +
      '<p>' + esc(t('opening', 'body')) + '</p>' +
      '<button type="button" class="ab-btn ab-btn--big" data-act="enter">' + esc(t('opening', 'enter')) + '</button>' +
      '</div>';
    return renderShell(inner, {});
  }

  function renderOutro() {
    var inner = '<div class="ab-outro" id="ab-outro" tabindex="-1">' +
      '<h2 class="ab-title">' + esc(t('outro', 'title')) + '</h2>' +
      '<p>' + esc(t('outro', 'body1')) + '</p>' +
      '<p>' + esc(t('outro', 'body2')) + '</p>' +
      '<p class="ab-bounded">' + esc(t('outro', 'body3')) + '</p>' +
      '<ol class="ab-earned ab-earned--full">';
    state.earned.forEach(function(a) {
      inner += '<li class="ab-earned__item"><strong>' + esc(t('acts', a, 'name')) + '</strong> ' +
        esc(t('acts', a, 'line')) + '</li>';
    });
    inner += '</ol>' +
      '<p class="ab-outlinks">' +
      '<a class="ab-btn" href="abelisk.html">' + esc(t('outro', 'abelisk')) + '</a> ' +
      '<a class="ab-btn ab-btn--quiet" href="learn.html">' + esc(t('outro', 'learn')) + '</a> ' +
      '<button type="button" class="ab-btn ab-btn--quiet" data-act="restart-yes">' + esc(t('outro', 'again')) + '</button>' +
      '</p></div>';
    return renderShell(inner, {});
  }

  function render() {
    // Keep the container's lang in step with the delivery pack, so a screen
    // reader switches voice with the toggle.
    appEl.setAttribute('lang', state.lang);
    if (state.view === 'opening') {
      appEl.innerHTML = renderOpening();
    } else if (state.view === 'outro') {
      appEl.innerHTML = renderOutro();
    } else {
      var scene = currentScene();
      var body;
      if (scene.id === 'echo') body = renderEcho(scene);
      else if (scene.id === 'crack') body = renderCrack(scene);
      else if (scene.id === 'map') body = renderMap(scene);
      else body = renderEmptyDoor(scene);
      appEl.innerHTML = renderShell(body, { chamber: true, title: t('scenes', scene.id, 'title') });
    }
    restoreFocus();
  }

  function restoreFocus() {
    if (!state.focusTarget) return;
    var el = null;
    try { el = document.querySelector(state.focusTarget); } catch (e) { el = null; }
    // The control may have been removed by the very action that used it (a
    // tested node, a filled slot). Fall back to the heading rather than
    // silently dropping focus on <body>.
    if (!el) {
      el = document.getElementById('ab-title') ||
           document.getElementById('ab-outro') ||
           document.getElementById('ab-opening');
    }
    state.focusTarget = null;
    if (el && typeof el.focus === 'function') el.focus();
  }

  function announce(message) {
    var a = document.getElementById('ab-announcer');
    if (!a) return;
    a.textContent = '';
    window.setTimeout(function() { a.textContent = message; }, 60);
  }

  function advance() {
    var scene = currentScene();
    if (state.earned.indexOf(scene.act) === -1) state.earned.push(scene.act);
    if (state.sceneIndex + 1 < SCENES.SCENES.length) {
      state.sceneIndex++;
      state.scene = freshSceneState(currentScene().id);
      // The wall from scene 3 is carried into scene 4 as the tree's parents,
      // which is why the child does not have to list sixteen words by hand.
      state.focusTarget = '#ab-title';
    } else {
      state.view = 'outro';
      state.focusTarget = '#ab-outro';
    }
  }

  // ── Event delegation ─────────────────────────────────────────────────

  function onClick(ev) {
    var btn = ev.target.closest ? ev.target.closest('[data-act]') : null;
    if (!btn || !appEl.contains(btn)) return;
    var act = btn.getAttribute('data-act');
    var arg = btn.getAttribute('data-arg');
    var s = state.scene;

    // The whole view is rebuilt on every action, so anything the child has
    // typed has to be lifted into state first or it is lost on re-render.
    var countEl = document.getElementById('ab-count');
    if (countEl && s) s.countDraft = countEl.value;

    switch (act) {
      case 'lang':
        state.lang = arg; break;
      case 'restart':
        state.confirmRestart = true; state.focusTarget = '#ab-confirm'; break;
      case 'restart-no':
        state.confirmRestart = false; break;
      case 'restart-yes': {
        var lang = state.lang;
        state = freshState(lang);
        break;
      }
      case 'enter':
        state.view = 'scene'; state.sceneIndex = 0;
        state.scene = freshSceneState(SCENES.SCENES[0].id);
        break;
      case 'advance':
        advance(); break;

      case 'pick':
        echoPick(Number(arg)); break;

      case 'slot':
        s.slots[Number(arg)] = ''; break;
      case 'key': {
        var idx = s.slots.indexOf('');
        if (idx !== -1) s.slots[idx] = arg;
        break;
      }
      case 'clear':
        s.slots = s.slots.map(function() { return ''; }); s.notice = null; break;
      case 'blocklen':
        s.blockLen = Number(arg);
        s.slots = new Array(s.blockLen * 2).fill('');
        s.result = null; s.notice = null;
        break;
      case 'test':
        crackTest(); break;
      case 'repair':
        crackRepair(arg); break;

      case 'add':
        mapAdd(); break;
      case 'done':
        s.phase = 'asked'; s.organiser = true; state.focusTarget = '#ab-count'; break;
      case 'sort':
        s.sortBy = arg; break;
      case 'count': {
        var input = document.getElementById('ab-count');
        var v = input ? Number(input.value) : NaN;
        if (!input || input.value === '' || !isFinite(v)) {
          s.notice = t('scenes', 'map', 'errNotNumber'); s.noticeKind = 'error';
        } else {
          mapCount(v);
        }
        break;
      }
      case 'guide': {
        var parts = arg.split(':');
        s.guide[Number(parts[0])] = Number(parts[1]);
        break;
      }
      case 'guidedone':
        mapCount(Number(arg)); break;

      case 'try':
        emptyDoorTry(); break;
      case 'guess':
        emptyDoorGuess(arg); break;
      case 'tomap':
        s.phase = 'map'; break;
      case 'node':
        emptyDoorNode(arg); break;
      case 'why':
        emptyDoorWhy(arg); break;
      case 'final':
        emptyDoorFinal(arg); break;
      default:
        return;
    }

    // render() replaces the whole subtree, which drops focus to <body>. A
    // keyboard user pressing Enter on the "b" key would otherwise have to tab
    // back in from the top of the page after every single symbol. Unless the
    // action already chose where attention should go, put focus back on the
    // control that was just used — or, if it no longer exists, on the heading.
    if (!state.focusTarget) {
      state.focusTarget = '[data-act="' + act + '"]' +
        (arg !== null && arg !== undefined ? '[data-arg="' + arg + '"]' : '');
    }
    render();
  }

  // ── Boot ─────────────────────────────────────────────────────────────

  function boot() {
    if (!AC || !SCENES || !STRINGS) {
      appEl.innerHTML = '<p>abracalabra could not start: a required module did not load.</p>';
      return;
    }
    // Content default is set on the app container's own data-default-lang,
    // deliberately independent of the page's <html lang>: the surrounding
    // page chrome (nav, footer) stays English (site-wide policy), while the
    // game content defaults to Finnish for the classroom pilot. Any
    // recognised pack code works here; anything else falls back to 'fi'.
    var declared = appEl.getAttribute('data-default-lang');
    var lang = STRINGS.codes().indexOf(declared) !== -1 ? declared : 'fi';
    state = freshState(lang);
    appEl.addEventListener('click', onClick);
    render();
  }

  document.addEventListener('DOMContentLoaded', boot);

  // Read-only handle for tests. Exposes state for inspection; every mutation
  // still has to go through a real DOM event, so a test cannot drive the game
  // down a path a player could not reach.
  window.Abracalabra = {
    peek: function() { return state; },
    scenes: function() { return SCENES.SCENES; }
  };

})();
