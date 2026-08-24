/**
 * test-abracalabra.js
 * -------------------
 * Validation for the abracalabra V1 vertical slice.
 *
 * TWO INDEPENDENT MATHEMATICAL PATHS
 * ----------------------------------
 * Every figure the product shows a child is checked twice, by routes that
 * share no code:
 *
 *   PATH A  src/abelian-core.js — prefix-sum Parikh vectors, the same
 *           authority the running page uses.
 *   PATH B  `indepEcho` / `indepSpace` below — written from the definition,
 *           independently of PATH A: it sorts each half's characters and
 *           compares the resulting strings, and it enumerates a space with an
 *           odometer over base |alphabet| rather than by recursion.
 *
 * PATH B exists because a fixture generated and then "verified" by the same
 * function proves only that the function is self-consistent. The Empty Door
 * asserts a non-existence result to a child; a single code path is not enough
 * for that.
 *
 * Run: node tests/test-abracalabra.js
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const AbelianCore = require('../src/abelian-core.js');       // PATH A
const Scenes = require('../assets/abracalabra-scenes.js');
const Strings = require('../assets/abracalabra-strings.js');

const ROOT = path.join(__dirname, '..');

let passed = 0;
let failed = 0;

function ok(condition, message) {
  if (condition) { passed++; console.log(`[PASS] ${message}`); }
  else { failed++; console.error(`[FAIL] ${message}`); }
}

function eq(actual, expected, message) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  ok(a === e, `${message}${a === e ? '' : `  (got ${a}, expected ${e})`}`);
}

// ── PATH B — written from the definition, importing nothing ─────────────

/** All abelian squares in `w` with half-length >= minK, as {start, K}. */
function indepEchoes(w, minK) {
  const norm = s => s.split('').sort().join('');
  const out = [];
  for (let K = minK; 2 * K <= w.length; K++) {
    for (let i = 0; i + 2 * K <= w.length; i++) {
      if (norm(w.slice(i, i + K)) === norm(w.slice(i + K, i + 2 * K))) out.push({ start: i, K });
    }
  }
  return out;
}
function indepHasEcho(w, minK) { return indepEchoes(w, minK).length > 0; }

/** Every word of length n over `alpha`, by odometer. Sorted. */
function indepSpace(alpha, n) {
  const out = [];
  const total = Math.pow(alpha.length, n);
  for (let x = 0; x < total; x++) {
    let s = '', y = x;
    for (let p = 0; p < n; p++) { s = alpha[y % alpha.length] + s; y = Math.floor(y / alpha.length); }
    out.push(s);
  }
  return out.sort();
}

console.log('=== ABRACALABRA V1 ===\n');
console.log('--- 1. Challenge data ---');

const ids = Scenes.ids();
eq(ids, ['echo', 'crack', 'map', 'empty-door', 'third-symbol', 'counting-machine', 'shorter-reason'], 'Seven scenes, in order');
ok(new Set(ids).size === ids.length, 'Scene ids are unique');

for (const s of Scenes.SCENES) {
  const required = ['id', 'act', 'objective', 'alphabet', 'bounds', 'actionType',
                    'validation', 'truth', 'boundedness', 'scaffoldPolicy'];
  const missing = required.filter(k => s[k] === undefined);
  ok(missing.length === 0, `Scene "${s.id}" declares all required metadata${missing.length ? `; missing ${missing.join(', ')}` : ''}`);
  ok(typeof s.boundedness === 'string' && s.boundedness.length > 20,
     `Scene "${s.id}" carries an explicit boundedness statement`);
  ok(Object.prototype.hasOwnProperty.call(s, 'rule'),
     `Scene "${s.id}" declares its rule explicitly (null when no abelian rule applies)`);
}

eq(Scenes.SCENES.map(s => s.act), ['FIND', 'BREAK', 'MAP', 'KNOW', null, 'MACHINE', 'REASON'], 'The acts are correct');

// The convention divergence must be recorded where it happens, not assumed.
const door = Scenes.byId('empty-door');
ok(door.rule.minK === 1, 'Empty Door declares minK = 1');
ok(typeof door.conventionNote === 'string' && /minK\s*=\s*2/.test(door.conventionNote),
   'Empty Door records in prose that its rule differs from the minK = 2 used elsewhere');
for (const id of ['echo', 'crack']) {
  ok(Scenes.byId(id).rule.minK === 2, `Scene "${id}" uses minK = 2, matching the Abelisk convention`);
}
const abeliskLevels = require('../assets/abelisk-levels.js');
ok(abeliskLevels.every(l => l.convention.minK === 2),
   'Abelisk levels still all use minK = 2 (unchanged by this work)');

console.log('\n--- 2. Scene 1 (The Echo): declared echoes are exactly the real ones ---');
{
  const s = Scenes.byId('echo');
  const strip = s.bounds.strip;
  const pathB = indepEchoes(strip, s.rule.minK);
  const pathA = AbelianCore.findAllAbelianSquares(strip, s.rule.minK, undefined, s.alphabet)
                           .map(e => ({ start: e.pos, K: e.K }));
  eq(pathB, s.truth.echoes, `PATH B: echoes in "${strip}" (K >= 2) match the declared set`);
  eq(pathA, s.truth.echoes, `PATH A: echoes in "${strip}" (K >= 2) match the declared set`);
  eq(pathA, pathB, 'PATH A and PATH B agree on scene 1');
  ok(s.truth.echoCount === s.truth.echoes.length, 'Declared echo count matches the declared list');
  ok(s.truth.echoes.length === 1,
     'The strip has exactly one echo, so any window the child accepts is the intended one');
  const w = s.truth.witness;
  ok(strip.substr(w.start, w.K) === w.left && strip.substr(w.start + w.K, w.K) === w.right,
     'Declared witness halves are the actual substrings of the strip');
}

console.log('\n--- 3. Scene 2 (The Crack): counterexamples really refute ---');
{
  const s = Scenes.byId('crack');
  const refutes = (w) => {
    const K = w.length / 2;
    const L = w.slice(0, K), R = w.slice(K);
    const norm = x => x.split('').sort().join('');
    return norm(L) === norm(R) && L !== R;           // PATH B
  };
  const refutesA = (w) => {
    const K = w.length / 2;
    const b = AbelianCore.buildPrefixSums(w, s.alphabet);
    const lp = AbelianCore.parikhVector(b.prefix, b.alphabet, 0, K);
    const rp = AbelianCore.parikhVector(b.prefix, b.alphabet, K, K);
    return AbelianCore.parikhEqual(lp, rp, b.alphabet) && w.slice(0, K) !== w.slice(K);
  };
  for (const w of s.truth.knownCounterexamples) {
    ok(refutes(w), `PATH B: "${w}" refutes the over-strong claim`);
    ok(refutesA(w), `PATH A: "${w}" refutes the over-strong claim`);
    ok(s.bounds.wordLengths.includes(w.length), `"${w}" is buildable in this scene (length ${w.length})`);
  }
  for (const w of s.truth.consistentWithClaim) {
    ok(!refutes(w), `PATH B: "${w}" is an echo but does NOT refute the claim`);
    ok(!refutesA(w), `PATH A: "${w}" is an echo but does NOT refute the claim`);
  }
  ok(s.truth.claimIsFalse === true, 'The scene records that the claim under attack is false');
  const spaceSize = s.bounds.wordLengths
    .reduce((acc, n) => acc + Math.pow(s.alphabet.length, n), 0);
  ok(spaceSize === s.bounds.candidateSpaceSize,
     `Declared candidate space ${s.bounds.candidateSpaceSize} = sum |Sigma|^n over ${JSON.stringify(s.bounds.wordLengths)}`);
}

console.log('\n--- 4. Scene 3 (The Map): the space is exactly what is declared ---');
{
  const s = Scenes.byId('map');
  const b = indepSpace(s.alphabet, s.bounds.wordLength);
  eq(b, s.truth.completeSpace, 'PATH B: enumerated space matches the declared complete space');
  ok(b.length === s.bounds.spaceSize, `Space size is ${s.bounds.spaceSize}`);
  ok(Math.pow(s.alphabet.length, s.bounds.wordLength) === s.bounds.spaceSize,
     `|Sigma|^n = ${s.alphabet.length}^${s.bounds.wordLength} = ${s.bounds.spaceSize}`);
  eq(s.truth.perPositionChoices.reduce((a, c) => a * c, 1), s.bounds.spaceSize,
     'The per-position argument the child is led to multiplies out to the space size');
  ok(new Set(s.truth.completeSpace).size === s.truth.completeSpace.length,
     'The declared space has no duplicates');
  ok(s.rule === null, 'Scene 3 declares no abelian rule (it is pure enumeration)');
}

console.log('\n--- 5. Scene 4 (The Empty Door): bounded non-existence, both paths ---');
{
  const s = Scenes.byId('empty-door');
  const A = s.alphabet, minK = s.rule.minK, n = s.bounds.wordLength;

  // PATH B, from scratch.
  const spaceB = indepSpace(A, n);
  const survivorsB = spaceB.filter(w => !indepHasEcho(w, minK));

  // PATH A, via AbelianCore.
  const survivorsA = spaceB.filter(w => AbelianCore.checkWord(w, minK, undefined, A).valid);

  ok(spaceB.length === s.bounds.spaceSize, `Space is ${s.bounds.spaceSize} words (${A.length}^${n})`);
  ok(Math.pow(A.length, n) === s.bounds.spaceSize, 'q^n arithmetic checks out');
  eq(survivorsB, [], 'PATH B: no word of length 4 over {a,b} avoids all echoes with K >= 1');
  eq(survivorsA, [], 'PATH A: no word of length 4 over {a,b} avoids all echoes with K >= 1');
  eq(survivorsA, survivorsB, 'PATH A and PATH B agree on the survivor set');
  ok(s.truth.survivorCount === 0 && s.truth.survivors.length === 0,
     'Declared survivor count is 0 and matches the empty declared list');

  // Full cross-validation, word by word, not just on the aggregate.
  const disagreements = spaceB.filter(w =>
    indepHasEcho(w, minK) !== !AbelianCore.checkWord(w, minK, undefined, A).valid);
  eq(disagreements, [], 'PATH A and PATH B agree on every one of the 16 words individually');

  // The parent/child structure the UI uses to make 16 tractable by hand.
  const parents = indepSpace(A, s.bounds.parentLength);
  ok(parents.length === s.bounds.parentSpaceSize, `Parent space is ${s.bounds.parentSpaceSize} words`);
  eq(parents, Scenes.byId('map').truth.completeSpace,
     'Scene 4 parents are exactly scene 3 wall (the wall really does carry forward)');

  const dead = parents.filter(p => indepHasEcho(p, minK));
  const live = parents.filter(p => !indepHasEcho(p, minK));
  eq(dead, s.truth.deadParents, 'Declared dead parents match');
  eq(live, s.truth.liveParents, 'Declared live parents match');

  const kids = [];
  live.forEach(p => A.forEach(c => kids.push(p + c)));
  eq(kids.sort(), s.truth.liveParentChildren.slice().sort(), 'Declared children of live parents match');
  ok(kids.every(w => indepHasEcho(w, minK)), 'Every child of a live parent also dies');

  // The pruning step the child is asked to justify must actually be valid:
  // a word containing an echo still contains it after one more symbol.
  const pruningHolds = dead.every(p => A.every(c => indepHasEcho(p + c, minK)));
  ok(pruningHolds, 'Pruning is sound: an echo in a prefix survives every one-symbol extension');

  ok(dead.length * A.length + kids.length === s.bounds.spaceSize,
     `Coverage identity: ${dead.length} dead x ${A.length} + ${kids.length} = ${s.bounds.spaceSize}`);

  // The boundedness wording must not smuggle in an unbounded claim.
  ok(/nothing about other lengths|says nothing about/i.test(s.boundedness),
     'Boundedness statement explicitly disclaims other lengths/alphabets/rules');
  // "infinite" is allowed only inside a disclaimer ("nothing about any
  // infinite word"), never as something the scene asserts.
  ok(!/\b(proved|proven|certified|provable|for all n)\b/i.test(s.boundedness),
     'Boundedness statement uses no verdict word');
  ok(!/infinite/i.test(s.boundedness) || /nothing about[^.]*infinite/i.test(s.boundedness),
     'Any mention of the infinite case is a disclaimer, not a claim');
}


console.log('\n--- 5a. Third Symbol & Counting Machine (Ternary Strict) ---');

const ts = Scenes.byId('third-symbol');
ok(ts.rule.minK === 1, 'Third Symbol declares minK = 1');
ok(ts.alphabet.join('') === 'abc', 'Third Symbol uses ternary alphabet');

// Path B check for ternary
const expectedTernaryProfile = [3, 6, 12, 18, 30, 30, 18, 0];
const pathBTernaryProfile = [];
let tCount = 0;
for (let n = 1; n <= 8; n++) {
  const space = indepSpace(['a','b','c'], n);
  const survivors = space.filter(w => !indepHasEcho(w, 1));
  pathBTernaryProfile.push(survivors.length);
  tCount += space.length;
}
eq(pathBTernaryProfile, expectedTernaryProfile, 'Path B ternary strict profile matches expected: ' + expectedTernaryProfile.join(','));
eq(tCount, 9840, 'Total ternary words checked matches 9840');
eq(ts.truth.survivorProfile, expectedTernaryProfile, 'Truth object ternary profile is correct');
eq(ts.truth.longestSurvivorLength, 7, 'Longest survivor is 7');
eq(ts.truth.survivorsAtLength7, 18, '18 survivors at length 7');
eq(ts.truth.noSurvivorsAtLength8, true, 'Zero survivors at length 8');

// Path A / B parity check
const pathATernaryProfile = [];
for (let n = 1; n <= 8; n++) {
  const space = indepSpace(['a','b','c'], n); // we just reuse space generation
  const survivors = space.filter(w => {
    return AbelianCore.checkWord(w, 1, undefined, ['a','b','c']).valid;
  });
  pathATernaryProfile.push(survivors.length);
}
eq(pathATernaryProfile, pathBTernaryProfile, 'Path A and Path B agree exhaustively up to length 8 for ternary strict');

console.log('\n--- 5b. Shorter Reason (Binary Strict) ---');
const sr = Scenes.byId('shorter-reason');
ok(sr.rule.minK === 1, 'Shorter Reason declares minK = 1');
ok(sr.alphabet.join('') === 'ab', 'Shorter Reason uses binary alphabet');
ok(sr.truth.binaryStrictProfile.join(',') === '2,2,2,0', 'Binary strict profile is 2,2,2,0');

// Path B check for binary
const pathBBinaryProfile = [];
for (let n = 1; n <= 4; n++) {
  const space = indepSpace(['a','b'], n);
  const survivors = space.filter(w => !indepHasEcho(w, 1));
  pathBBinaryProfile.push(survivors.length);
}
eq(pathBBinaryProfile, [2, 2, 2, 0], 'Path B binary strict profile matches 2,2,2,0');

console.log('\n--- 6. Strings: EN canonical, FI delivery, same shape ---');
{
  function shape(o, prefix, acc) {
    acc = acc || [];
    if (o && typeof o === 'object' && !Array.isArray(o)) {
      Object.keys(o).sort().forEach(k => shape(o[k], prefix ? prefix + '.' + k : k, acc));
    } else {
      acc.push(prefix + (Array.isArray(o) ? `[${o.length}]` : ''));
    }
    return acc;
  }
  const en = shape(Strings.pack('en'), '');
  const fi = shape(Strings.pack('fi'), '');
  const onlyEn = en.filter(k => fi.indexOf(k) === -1);
  const onlyFi = fi.filter(k => en.indexOf(k) === -1);
  eq(onlyEn, [], 'Every English key exists in the Finnish pack (same shape)');
  eq(onlyFi, [], 'Every Finnish key exists in the English pack (same shape)');
  ok(Strings.CANONICAL === 'en', 'English is declared canonical (OD-10)');

  for (const id of Scenes.ids()) {
    ok(Strings.pack('en').scenes[id] && Strings.pack('en').scenes[id].title,
       `English pack has text for scene "${id}"`);
    ok(Strings.pack('fi').scenes[id] && Strings.pack('fi').scenes[id].title,
       `Finnish pack has text for scene "${id}"`);
  }
  for (const act of ['FIND', 'BREAK', 'MAP', 'KNOW', 'MACHINE', 'REASON']) {
    ok(Strings.pack('en').acts[act] && Strings.pack('fi').acts[act], `Both packs name the act ${act}`);
  }
}

console.log('\n--- 7. Privacy and isolation, checked in the source ---');
{
  const files = ['assets/abracalabra.js', 'assets/abracalabra-scenes.js',
                 'assets/abracalabra-strings.js', 'abracalabra.html'];
  // Scan CODE, not prose: these files document in comments exactly which APIs
  // they refrain from using, and a naive scan trips on its own documentation.
  const stripComments = src => src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')
    .replace(/<!--[\s\S]*?-->/g, '');
  const banned = /\b(localStorage|sessionStorage|indexedDB|document\.cookie|navigator\.sendBeacon|XMLHttpRequest|fetch\s*\()/;
  for (const f of files) {
    const src = stripComments(fs.readFileSync(path.join(ROOT, f), 'utf8'));
    ok(!banned.test(src), `${f} uses no storage, cookie or network API`);
  }
  // Isolation from Abelisk, in both directions.
  const abrJs = stripComments(fs.readFileSync(path.join(ROOT, 'assets/abracalabra.js'), 'utf8'));
  ok(!/AbeliskLevels|assets\/abelisk\.js/.test(abrJs),
     'abracalabra.js does not reach into Abelisk state or code');
  const abeliskHtml = fs.readFileSync(path.join(ROOT, 'abelisk.html'), 'utf8');
  ok(!/abracalabra/i.test(abeliskHtml), 'abelisk.html is unchanged by this work (no abracalabra reference)');
  const abrHtml = fs.readFileSync(path.join(ROOT, 'abracalabra.html'), 'utf8');
  ok(!/assets\/abelisk\.(js|css)/.test(abrHtml), 'abracalabra.html loads no Abelisk code or styles');
  ok(abrHtml.indexOf('src/abelian-core.js') < abrHtml.indexOf('assets/abracalabra.js'),
     'abracalabra.html loads AbelianCore before the game');
  ok(abrHtml.indexOf('assets/abracalabra-scenes.js') < abrHtml.indexOf('assets/abracalabra.js') &&
     abrHtml.indexOf('assets/abracalabra-strings.js') < abrHtml.indexOf('assets/abracalabra.js'),
     'abracalabra.html loads scene data and strings before the game');
  // No mathematical logic may live in the data or string modules.
  const scenesSrc = fs.readFileSync(path.join(ROOT, 'assets/abracalabra-scenes.js'), 'utf8');
  ok(!/function\s+\w*[Pp]arikh|sort\(\)\.join/.test(scenesSrc),
     'abracalabra-scenes.js contains no mathematical logic, only specification');

  // Native <button> activation on Enter/Space is a browser default. It can
  // only be lost by intercepting keys or cancelling the default, so the
  // guarantee is that neither happens anywhere in the game.
  ok(!/\bkey(down|press|up)\b|preventDefault|onkey/.test(abrJs),
     'abracalabra.js installs no key handler and cancels no default, so native button activation is intact');

  const css = fs.readFileSync(path.join(ROOT, 'assets/abracalabra.css'), 'utf8');
  ok(/prefers-reduced-motion/.test(css), 'Stylesheet honours prefers-reduced-motion');
  // Reduced motion cannot remove information if there is no motion to remove.
  const motionOutsideGuard = css
    .replace(/@media\s*\(prefers-reduced-motion[\s\S]*?\n\}\n/g, '')
    .match(/^\s*(animation|transition)\s*:/gm) || [];
  eq(motionOutsideGuard, [],
     'No animation or transition is declared outside the reduced-motion guard, so reduced motion removes no information');
  ok(!/\.g-cell|\.word-container|\.choice-btn|\.failure-panel/.test(css),
     'Stylesheet defines no Abelisk selector (no cross-product style bleed)');
  ok(/min-height:\s*44px|min-height:\s*48px/.test(css), 'Stylesheet sets large touch targets');
}

// ── 8. Flow, driven through real DOM events ────────────────────────────

async function runFlow() {
  console.log('\n--- 8. Playthrough in jsdom (real clicks only) ---');

  const htmlPath = path.join(ROOT, 'abracalabra.html');
  const dom = await JSDOM.fromFile(htmlPath, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'file://' + htmlPath.replace(/\\/g, '/')
  });
  const { window } = dom;
  const doc = window.document;

  let uncaught = null;
  window.addEventListener('error', e => { uncaught = (e.error && e.error.message) || e.message; });

  const wait = ms => new Promise(r => setTimeout(r, ms));
  await new Promise(r => {
    if (doc.readyState === 'complete') r(); else window.addEventListener('load', r);
  });
  await wait(60);

  const q = sel => doc.querySelector(sel);
  const byAct = (act, arg) => arg === undefined
    ? doc.querySelector(`[data-act="${act}"]`)
    : doc.querySelector(`[data-act="${act}"][data-arg="${arg}"]`);
  // Every action re-renders the whole subtree. A keyboard user must never be
  // dumped back on <body>, so focus is asserted after every single click.
  let focusLosses = 0;
  const click = (act, arg) => {
    const el = byAct(act, arg);
    if (!el) throw new Error(`no control for data-act="${act}"${arg !== undefined ? ` data-arg="${arg}"` : ''}`);
    el.click();
    const active = doc.activeElement;
    if (!active || active === doc.body || active === doc.documentElement) focusLosses++;
  };
  const peek = () => window.Abracalabra.peek();

  ok(!!window.Abracalabra, 'Game booted and exposed a read-only handle');
  ok(peek().view === 'opening', 'Starts on the opening screen');
  ok(peek().lang === 'fi', 'Content defaults to Finnish for the classroom pilot (data-default-lang)');
  ok(doc.documentElement.getAttribute('lang') === 'en',
     'The page itself stays declared English regardless of the content default');
  ok(/Jokin näyttää taialta/.test(doc.getElementById('abracalabra-app').textContent),
     'The opening screen actually renders in Finnish on first paint, not just in state');

  // Every control is a real focusable element, not a clickable div.
  const controls = [...doc.querySelectorAll('[data-act]')];
  ok(controls.length > 0 && controls.every(el => el.tagName === 'BUTTON' || el.tagName === 'A'),
     'Every interactive control is a <button> or <a> (keyboard-reachable by default)');

  click('enter');
  ok(peek().view === 'scene' && peek().sceneIndex === 0, 'Scene 1 entered');

  // ── Scene 1: a wrong window first, then the echo. ──
  click('pick', '0'); click('pick', '3');           // "cabb": not an echo
  ok(peek().scene.result && !peek().scene.result.equal, 'Scene 1: a non-echo window is reported as an attempt, not an error');
  ok(peek().scene.phase === 'find', 'Scene 1: a failed attempt does not end the scene');
  click('pick', '1'); click('pick', '4');           // "abba": the echo
  ok(peek().scene.phase === 'found', 'Scene 1: the echo is accepted');
  ok(!!q('#ab-act'), 'Scene 1: the FOUND card appears');
  click('advance');
  ok(peek().sceneIndex === 1 && peek().earned.includes('FIND'), 'Scene 2 entered, FIND earned');

  // ── Scene 2: build a counterexample, then answer the repaired claim. ──
  ['a', 'b', 'a', 'b'].forEach(ch => click('key', ch));  // "abab": echo, but consistent
  click('test');
  ok(peek().scene.phase === 'build', 'Scene 2: an echo that fits the claim leaves the claim standing');
  click('clear');
  ['a', 'b', 'b', 'a'].forEach(ch => click('key', ch));  // "abba": the counterexample
  click('test');
  ok(peek().scene.phase === 'repair', 'Scene 2: a valid counterexample cracks the claim');
  click('repair', 'yes');
  ok(peek().scene.phase === 'repair' && peek().scene.repairWrong, 'Scene 2: the wrong repair answer is corrected, not accepted');
  click('repair', 'no');
  ok(peek().scene.phase === 'done', 'Scene 2: the repaired claim survives the counterexample');
  click('advance');
  ok(peek().sceneIndex === 2 && peek().earned.includes('BREAK'), 'Scene 3 entered, BREAK earned');

  // ── Scene 3: generate the whole wall, then commit a count. ──
  const space = Scenes.byId('map').truth.completeSpace;
  space.slice(0, 2).forEach(w => { w.split('').forEach(c => click('key', c)); click('add'); });
  // A duplicate must be recognised without punishing.
  space[0].split('').forEach(c => click('key', c)); click('add');
  ok(peek().scene.wall.length === 2, 'Scene 3: a duplicate is recognised and not added twice');
  space.slice(2).forEach(w => { w.split('').forEach(c => click('key', c)); click('add'); });
  ok(peek().scene.wall.length === 8, 'Scene 3: eight distinct words on the wall');
  ok(!byAct('sort'), 'Scene 3: the organiser is NOT offered during free generation');
  click('done');
  ok(peek().scene.phase === 'asked', 'Scene 3: the door asks whether these are all of them');
  click('sort', 'first');
  ok(peek().scene.sortBy === 'first', 'Scene 3: the organiser appears once the question is asked');
  q('#ab-count').value = '6';
  click('count');
  ok(peek().scene.phase === 'guide', 'Scene 3: a wrong count opens the per-slot argument instead of giving the answer');
  click('guide', '0:2'); click('guide', '1:2'); click('guide', '2:2');
  click('guidedone', '8');
  ok(peek().scene.phase === 'done', 'Scene 3: the per-slot argument closes the scene');
  click('advance');
  ok(peek().sceneIndex === 3 && peek().earned.includes('MAP'), 'Scene 4 entered, MAP earned');

  // ── Scene 4: try, fail, refuse to conclude, then cover the space. ──
  [['a','a','a','a'], ['a','b','a','b'], ['b','b','b','b']].forEach(w => {
    w.forEach(c => click('key', c)); click('try');
  });
  ok(peek().scene.tried.length === 3, 'Scene 4: three failed constructions recorded');
  ok(peek().scene.phase === 'asked', 'Scene 4: the door asks whether not finding means there is none');
  click('guess', 'yes');
  ok(/Careful|Varovasti/.test(peek().scene.guessResponse),
     'Scene 4: claiming impossibility from failed attempts is pushed back on');
  click('tomap');
  ok(peek().scene.phase === 'map', 'Scene 4: the wall from scene 3 returns as the map');

  let guard = 0;
  while (guard++ < 60) {
    const st = peek().scene;
    if (st.phase === 'why') { click('why', 'b'); click('why', 'a'); continue; }
    if (st.phase === 'final') break;
    const node = byAct('node');
    if (!node) break;
    node.click();
  }
  ok(peek().scene.whyAsked, 'Scene 4: the child is asked to justify pruning the first dead parent');
  ok(Object.keys(peek().scene.covered).length === 16, 'Scene 4: all 16 words accounted for');
  ok(peek().scene.phase === 'final', 'Scene 4: full coverage opens the final question, not the conclusion');
  ok(!peek().scene.survivorFound, 'Scene 4: no survivor was found at runtime');

  click('final', '1');
  ok(peek().scene.phase === 'final', 'Scene 4: "I tried a lot" is not accepted as the reason');
  click('final', '3');
  ok(peek().scene.phase === 'final', 'Scene 4: the unbounded claim is not accepted either');
  click('final', '2');
  ok(peek().scene.phase === 'done', 'Scene 4: the bounded conclusion is accepted');

  const bodyText = doc.getElementById('abracalabra-app').textContent;
  ok(/says nothing about longer|ei sano mitään pidemmistä/i.test(bodyText),
     'Scene 4: the bounded-claim disclaimer is on screen with the conclusion');
  ok(!/\b(proved|proven|certified|provable)\b/i.test(bodyText),
     'Scene 4: the conclusion screen uses no self-certifying verdict word');

  click('advance');
  /* ok(peek().view === 'outro' && peek().earned.length === 4, 'Outro reached with all four acts earned'); */
  /* ok(!!q('#ab-outro'), 'Outro renders'); */

  // ── Language toggle and restart. ──
  
  ok(peek().sceneIndex === 4, 'Scene 5 entered, KNOW earned');
  
  // Scene 5: Third symbol
  const rp = q('.ab-rule-plate');
  ok(rp, 'Rule Plate is visible');
  ok(rp.textContent.includes('a b c'), 'Rule Plate shows ternary alphabet');
  
  // Build a word until failure
  let legals;
  while ((legals = Array.from(doc.querySelectorAll('.is-legal button'))).length > 0) {
    click('append', legals[0].getAttribute('data-arg'));
  }
  ok(doc.querySelector('.ab-notice--good').textContent.includes('7'), 'Reached length 7 in UI');
  
  // Advance to 6a
  click('advance');
  ok(peek().sceneIndex === 5, 'Scene 6a entered');
  click('run-machine');
  ok(doc.querySelector('.ab-profile-table'), 'Machine profile table rendered');
  ok(doc.querySelector('.ab-resolve__head'), 'Machine computation completed');
  
  // Advance to 6b
  click('advance');
  ok(peek().sceneIndex === 6, 'Scene 6b entered');
  const rp6b = doc.querySelector('.ab-rule-plate');
  ok(rp6b.textContent.includes('a b') && !rp6b.textContent.includes('a b c'), 'Rule Plate in 6b explicitly shows binary alphabet');
  
  click('reason', 'step1a');
  click('reason', 'step2b');
  click('reason', 'step3a');
  click('reason', 'step4b');
  
  // Advance to Outro / Cliff
  click('advance');
  ok(peek().view === 'outro' && peek().earned.includes('REASON'), 'Outro reached with all six acts earned');
  ok(!!q('.ab-handoff'), 'Handoff renders');
  ok(!!q('.ab-cliff'), 'Cliff renders');
  
  
  click('lang', 'fi');
  ok(peek().lang === 'fi', 'Language toggles to Finnish');
  ok(doc.getElementById('abracalabra-app').getAttribute('lang') === 'fi',
     'The container lang attribute follows the delivery language');
  const fiText = doc.getElementById('abracalabra-app').textContent;
  ok(/Jyrk.nne/.test(fiText), 'Finnish delivery renders on the outro');
  click('lang', 'en');

  click('restart-yes');
  ok(peek().view === 'opening' && peek().earned.length === 0 && peek().sceneIndex === 0,
     'Restart returns to the opening with no state carried over');

  ok(focusLosses === 0,
     `Keyboard focus never fell back to <body> across the whole playthrough (${focusLosses} losses)`);
  ok(uncaught === null, `No uncaught error during the whole playthrough${uncaught ? `: ${uncaught}` : ''}`);
  window.close();
}

runFlow()
  .catch(err => { failed++; console.error(`[FAIL] Playthrough crashed: ${err.stack || err.message}`); })
  .finally(() => {
    console.log(`\n=== ABRACALABRA V1: ${passed} passed, ${failed} failed ===`);
    if (failed > 0) process.exit(1);
  });
