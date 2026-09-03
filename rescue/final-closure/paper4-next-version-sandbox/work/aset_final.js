'use strict';
/* PHASE 5/6/7 -- full certification pass, adversarial test, canonical-H analysis. */
const fs = require('fs'), D = require('./aset_defs.js'), R = require('./rng.js'), G = require('./gate.js');
const T = require('./aset_theorem_lib.js');
const { LE, LA, PROF_A } = D;

const frozen = JSON.parse(fs.readFileSync('../runs/aset_E_frozen.json', 'utf8'));
const out = { frozen: [], adversarial: null, canonicalH: null };

/* ---- full certification pass over all 69 ------------------------------- */
console.log('=== full certification pass (69 frozen E) ===');
for (const r of frozen.rows) {
  const bl = T.blockedLetters(r.E);
  const s = T.shave(r.E, 12, 40);
  out.frozen.push({ population: r.population, eIndex: r.eIndex, E_sha256: r.E_sha256,
    asetSize: r.asetSize, blocked: bl.blocked, depth1: bl.blocked.length === 3,
    certified: s.certified, via: s.certified ? s.via : null, emptyDepth: s.certified ? s.depth : null });
}
const z = out.frozen.filter(r => r.asetSize === 0), p = out.frozen.filter(r => r.asetSize > 0);
console.log('zero-Aset certified : ' + z.filter(r => r.certified).length + ' / ' + z.length);
console.log('  uncertified       : ' + JSON.stringify(z.filter(r => !r.certified).map(r => r.eIndex)));
console.log('positive-Aset wrongly certified (MUST be 0): ' + p.filter(r => r.certified).length);
const via = {}; for (const r of z.filter(x => x.certified)) via[r.via] = (via[r.via] || 0) + 1;
console.log('  certification route histogram: ' + JSON.stringify(via));

/* ---- deep shave attempt on any holdout --------------------------------- */
for (const r of z.filter(x => !x.certified)) {
  const row = frozen.rows.find(f => f.population === r.population && f.eIndex === r.eIndex);
  const t0 = Date.now();
  const s = T.shave(row.E, LA - 1, 60);
  console.log('  deep shave e=' + r.eIndex + ': ' + JSON.stringify({ certified: s.certified, via: s.via, depth: s.depth, shaved: s.shaved }) +
    ' (' + ((Date.now() - t0) / 1000).toFixed(1) + 's)');
  r.deepShave = { certified: s.certified, via: s.via || null, depth: s.depth || null, shaved: s.shaved };
  if (s.certified) { r.certified = true; r.via = 'deep-' + s.via; r.emptyDepth = s.depth; }
}
const z2 = out.frozen.filter(r => r.asetSize === 0);
console.log('AFTER deep shave -> zero-Aset certified: ' + z2.filter(r => r.certified).length + ' / ' + z2.length);

/* ---- Phase 7: canonical H vs random R ---------------------------------- */
const hb = {}, rb = {};
for (const r of out.frozen) { const t = r.population === 'H' ? hb : rb; t[r.blocked.length] = (t[r.blocked.length] || 0) + 1; }
out.canonicalH = { H_blockedHistogram: hb, R_blockedHistogram: rb,
  H_asetSizes: out.frozen.filter(r => r.population === 'H').map(r => r.asetSize),
  H_blocked: out.frozen.filter(r => r.population === 'H').map(r => r.blocked.join('')) };
console.log('\n=== Phase 7: |BLOCKED| histograms ===');
console.log('  canonical H : ' + JSON.stringify(hb));
console.log('  random R    : ' + JSON.stringify(rb));

/* ---- Phase 6: adversarial test on FRESH E, seed frozen before evaluation - */
const ADV_SEED = 991133;                       // frozen here, before any evaluation
console.log('\n=== Phase 6: adversarial test, fresh E, seed ' + ADV_SEED + ' ===');
const fresh = T.genE(ADV_SEED, 400);
console.log('generated ' + fresh.length + ' fresh non-canonical E');
let n0 = 0, nPos = 0, viol1 = [], violSound = [], blockHist = {}, agree = 0;
const advRows = [];
for (const E of fresh) {
  const size = D.asetCount(E);
  const bl = T.blockedLetters(E);
  blockHist[bl.blocked.length] = (blockHist[bl.blocked.length] || 0) + 1;
  const d1 = bl.blocked.length === 3;
  if (size === 0) n0++; else nPos++;
  if (d1 && size > 0) viol1.push({ E_sha: D.sha(E).slice(0, 16), asetSize: size, blocked: bl.blocked });
  const s = T.shave(E, 8, 30);
  if (s.certified && size > 0) violSound.push({ E_sha: D.sha(E).slice(0, 16), asetSize: size, via: s.via });
  if (s.certified === (size === 0)) agree++;
  advRows.push({ E_sha256: D.sha(E), asetSize: size, blocked: bl.blocked, depth1: d1,
    certified: s.certified, via: s.certified ? s.via : null });
}
console.log('  fresh E: zero-Aset ' + n0 + ', positive ' + nPos);
console.log('  |BLOCKED| histogram: ' + JSON.stringify(blockHist));
console.log('  THEOREM violations (BLOCKED={a,b,c} but Aset nonempty): ' + viol1.length);
console.log('  SOUNDNESS violations (certified but Aset nonempty)    : ' + violSound.length);
if (violSound.length) console.log('   ' + JSON.stringify(violSound.slice(0, 3)));
console.log('  certifier agrees with truth on: ' + agree + ' / ' + fresh.length);
const missed = advRows.filter(r => r.asetSize === 0 && !r.certified).length;
console.log('  zero-Aset E NOT certified (incompleteness): ' + missed + ' / ' + n0);
const d1z = advRows.filter(r => r.depth1).length, d1zero = advRows.filter(r => r.depth1 && r.asetSize === 0).length;
console.log('  depth-1 obstruction fires on ' + d1z + ' fresh E, all zero-Aset: ' + (d1z === d1zero));
out.adversarial = { seed: ADV_SEED, n: fresh.length, zero: n0, positive: nPos,
  blockedHistogram: blockHist, theoremViolations: viol1, soundnessViolations: violSound,
  certifierAgreement: agree, zeroNotCertified: missed, rows: advRows };

fs.writeFileSync('../runs/aset_final.json', JSON.stringify(out, null, 1));
console.log('\npersisted -> runs/aset_final.json');
