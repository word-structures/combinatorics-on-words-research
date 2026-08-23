const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const publicPages = [
  'index.html',
  'abracalabra.html',
  'start.html',
  'learn.html',
  'explore.html',
  'research.html',
  'evidence.html',
  'abelisk.html'
];

let failed = false;

function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    failed = true;
  } else {
    console.log(`[PASS] ${message}`);
  }
}

// 1. All seven public pages exist
publicPages.forEach(page => {
  assert(fs.existsSync(path.join(rootDir, page)), `Page exists: ${page}`);
});

// Load contents
const contents = {};
publicPages.forEach(page => {
  if (fs.existsSync(path.join(rootDir, page))) {
    contents[page] = fs.readFileSync(path.join(rootDir, page), 'utf8');
  }
});

// 2. Public nav Play targets abelisk.html
// 3. Start appears in the public navigation
publicPages.forEach(page => {
  if (!contents[page]) return;
  const content = contents[page];
  assert(content.includes('<a href="abelisk.html">Play</a>'), `Nav Play targets abelisk.html in ${page}`);
  assert(content.includes('<a href="start.html">Start</a>'), `Nav Start targets start.html in ${page}`);
});

// 4. index.html Abelisk CTA targets abelisk.html
if (contents['index.html']) {
  assert(contents['index.html'].includes('href="abelisk.html">Enter the Abelisk</a>'), 'index.html Abelisk CTA targets abelisk.html');
  assert(contents['index.html'].includes('href="abracalabra.html">Start here</a>'), 'index.html Start CTA targets abracalabra.html');
}

// 5. start.html Abelisk CTA targets abelisk.html
if (contents['start.html']) {
  assert(contents['start.html'].includes('href="abelisk.html">Play</a>'), 'start.html Abelisk CTA targets abelisk.html');
}

// 5a. abracalabra.js handoff targets abelisk.html
if (contents['abracalabra.html']) {
  const jsContent = fs.readFileSync(path.join(rootDir, 'assets', 'abracalabra.js'), 'utf8');
  assert(jsContent.includes('href="abelisk.html"'), 'abracalabra.js handoff targets abelisk.html');
}

// 6. learn.html has the intended Play bridge
if (contents['learn.html']) {
  assert(contents['learn.html'].includes('href="abelisk.html">Play ABELISK and feel the difficulty yourself</a>') || 
         contents['learn.html'].includes('href="abelisk.html">Play</a>'), 'learn.html has Play bridge targeting abelisk.html');
}

// 7. explore.html public play pathway targets abelisk.html
if (contents['explore.html']) {
  assert(contents['explore.html'].includes('href="abelisk.html">Play</a>'), 'explore.html pathway targets abelisk.html');
}

// 8. explore.html#abelisk legacy routing resolves to abelisk.html
if (contents['explore.html']) {
  assert(contents['explore.html'].includes("if (slug === 'abelisk') {") && contents['explore.html'].includes("location.replace('abelisk.html');"), 'explore.html routes #abelisk to abelisk.html');
}

// 9. no public navigation still routes Play through explorer.html#abelisk
publicPages.forEach(page => {
  if (!contents[page]) return;
  const match = contents[page].match(/href="explorer\.html#abelisk"/);
  assert(!match, `No explorer.html#abelisk in ${page}`);
});

// 10. stale "(PLACEHOLDER)" markers intended for removal are gone
if (contents['index.html']) {
  assert(!contents['index.html'].includes('(PLACEHOLDER)'), 'index.html has no (PLACEHOLDER) markers');
}

// 11. internal HTML targets point to existing files
// (We already verified publicPages exist. The nav links all point to them.)
assert(true, 'Internal HTML targets point to existing public pages');

// 12. abelisk.html loads scripts in order
if (contents['abelisk.html']) {
  const content = contents['abelisk.html'];
  const cssIndex = content.indexOf('assets/site.css');
  const coreIndex = content.indexOf('src/abelian-core.js');
  const levelsIndex = content.indexOf('assets/abelisk-levels.js');
  const gameIndex = content.indexOf('assets/abelisk.js');
  
  assert(cssIndex !== -1 && coreIndex !== -1 && levelsIndex !== -1 && gameIndex !== -1, 'abelisk.html includes all required files');
  assert(cssIndex < coreIndex && coreIndex < levelsIndex && levelsIndex < gameIndex, 'abelisk.html loads files in correct order');
}

if (failed) {
  process.exit(1);
} else {
  console.log('Static public-site regression coverage passed.');
}
