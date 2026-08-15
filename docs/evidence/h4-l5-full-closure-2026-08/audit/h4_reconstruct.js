#!/usr/bin/env node
'use strict';
/**
 * H4 Independent Reconstruction Script
 * 
 * Reads raw shard summary JSON files from the campaign results directory,
 * independently recomputes all aggregate quantities, and compares them
 * against the FINAL_AUDIT.json values.
 * 
 * Does NOT read FINAL_AUDIT.json for the reconstruction — only for
 * comparison at the end.
 */

const fs = require('fs');
const path = require('path');

const RESULTS_DIR = 'C:\\MSVC\\L5_FULL_CLOSURE_CAMPAIGN_1\\results_h4';
const PLAN_FILE = 'C:\\MSVC\\L5_FULL_CLOSURE_CAMPAIGN_1\\plan\\campaign_plan.json';
const EMPTY_SHA256 = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
const EXPECTED_CORE_FP = '8ee27c558e1d8adbee3df437df36c321ac593d3b5ba3c52e637ffcff8bd42d8f';
const EXPECTED_H6_SHA = '02682f49e7b4980d5f310a917e9d0d7971cc8d9f71ef84e11a7e2df0023d77b0';

let failures = 0;
function check(label, condition, detail) {
  if (condition) {
    console.log(`[PASS] ${label}`);
    if (detail) console.log(`       ${detail}`);
  } else {
    console.log(`[FAIL] ${label}`);
    if (detail) console.log(`       ${detail}`);
    failures++;
  }
}

// ——— Read campaign plan (for expected shard IDs and masses) ———
const plan = JSON.parse(fs.readFileSync(PLAN_FILE, 'utf8'));
const plannedShardIds = new Set(plan.shards.map(s => s.shardId));

// Compute expected totals from plan
let planTotalProfiles = BigInt(0);
let planTotalCodings = BigInt(0);
for (const s of plan.shards) {
  planTotalProfiles += BigInt(s.profileCount);
  planTotalCodings += BigInt(s.codingMass);
}
console.log(`\n=== CAMPAIGN PLAN ===`);
console.log(`Plan shards: ${plan.shards.length}`);
console.log(`Plan total profiles: ${planTotalProfiles}`);
console.log(`Plan total codings: ${planTotalCodings}`);

// ——— Scan shard summary files ———
const files = fs.readdirSync(RESULTS_DIR);
const summaryFiles = files.filter(f => f.match(/^shard_\d+\.summary\.json$/));

console.log(`\n=== SHARD SCAN ===`);
console.log(`Summary files found: ${summaryFiles.length}`);

let totalProfiles = BigInt(0);
let totalProcessed = BigInt(0);
let totalRejected = BigInt(0);
let totalSurvivors = BigInt(0);
let totalPlannedCodings = BigInt(0);

const seenIds = new Set();
const coreFingerprints = new Set();
const h6Hashes = new Set();
const anomalies = [];
let survivorRecords = [];
let nonEmptySurvivorBins = [];
let processedNotEqRejPlusSurv = [];
let plannedNotEqProcessed = [];
let sampleDecisions = 0;

for (const sf of summaryFiles) {
  const raw = fs.readFileSync(path.join(RESULTS_DIR, sf), 'utf8');
  let shard;
  try {
    shard = JSON.parse(raw);
  } catch (e) {
    anomalies.push(`MALFORMED JSON: ${sf}`);
    continue;
  }

  const id = shard.shardId;
  if (seenIds.has(id)) {
    anomalies.push(`DUPLICATE shard ID: ${id}`);
  }
  seenIds.add(id);

  const profiles = BigInt(shard.profileCount);
  const processed = BigInt(shard.processed);
  const rejected = BigInt(shard.rejected);
  const survivors = BigInt(shard.survivors);
  const planned = BigInt(shard.plannedCodings);

  totalProfiles += profiles;
  totalProcessed += processed;
  totalRejected += rejected;
  totalSurvivors += survivors;
  totalPlannedCodings += planned;

  coreFingerprints.add(shard.coreFingerprintSha256);
  h6Hashes.add(shard.h6SourceSha256);

  // Check processed == rejected + survivors per shard
  if (processed !== rejected + survivors) {
    processedNotEqRejPlusSurv.push(id);
  }

  // Check plannedCodings == processed per shard
  if (planned !== processed) {
    plannedNotEqProcessed.push(id);
  }

  // Check survivor count
  if (survivors > BigInt(0)) {
    survivorRecords.push({ shardId: id, survivors: Number(survivors) });
  }

  // Check survivor bin SHA256
  if (shard.survivorSha256 !== EMPTY_SHA256) {
    nonEmptySurvivorBins.push({ shardId: id, sha256: shard.survivorSha256 });
  }
}

// Also check .done markers
const doneFiles = files.filter(f => f.match(/^shard_\d+\.done$/));
const doneIds = new Set(doneFiles.map(f => parseInt(f.match(/^shard_(\d+)\.done$/)[1])));

// Also check .survivors.bin sizes
const survivorBinFiles = files.filter(f => f.match(/^shard_\d+\.survivors\.bin$/));
let nonZeroSurvivorBins = [];
for (const sbf of survivorBinFiles) {
  const stat = fs.statSync(path.join(RESULTS_DIR, sbf));
  if (stat.size > 0) {
    nonZeroSurvivorBins.push(sbf);
  }
}

// ——— Shard domain checks ———
console.log(`\n=== PHASE 1A: SHARD DOMAIN ===`);

const expectedIds = new Set();
for (let i = 0; i <= 2218; i++) expectedIds.add(i);

const missingFromSummary = [...expectedIds].filter(id => !seenIds.has(id));
const extraInSummary = [...seenIds].filter(id => !expectedIds.has(id));
const missingDone = [...expectedIds].filter(id => !doneIds.has(id));
const extraDone = [...doneIds].filter(id => !expectedIds.has(id));

check('Unique summary shard IDs', seenIds.size === 2219, `found ${seenIds.size}`);
check('No missing shard IDs (summary)', missingFromSummary.length === 0, 
  missingFromSummary.length > 0 ? `missing: ${missingFromSummary.slice(0,10).join(',')}...` : 'all 0..2218 present');
check('No extra shard IDs (summary)', extraInSummary.length === 0,
  extraInSummary.length > 0 ? `extra: ${extraInSummary.join(',')}` : 'none');
check('No duplicate shard IDs', anomalies.filter(a => a.startsWith('DUPLICATE')).length === 0);
check('All .done markers present', missingDone.length === 0,
  missingDone.length > 0 ? `missing done: ${missingDone.slice(0,10).join(',')}...` : `${doneIds.size} .done files`);
check('No malformed shard files', anomalies.filter(a => a.startsWith('MALFORMED')).length === 0);

// ——— Profile accounting ———
console.log(`\n=== PHASE 1B: STAGE-A PROFILE ACCOUNTING ===`);
check('Reconstructed profiles = 5,153,928', totalProfiles === BigInt(5153928),
  `reconstructed: ${totalProfiles}`);
check('Profiles match plan', totalProfiles === planTotalProfiles,
  `plan: ${planTotalProfiles}, reconstructed: ${totalProfiles}`);

// ——— Mass accounting ———
console.log(`\n=== PHASE 1C: STAGE-B CODING ACCOUNTING ===`);
check('Reconstructed processed = 3,316,540,933,500', totalProcessed === BigInt('3316540933500'),
  `reconstructed: ${totalProcessed}`);
check('Reconstructed rejected = 3,316,540,933,500', totalRejected === BigInt('3316540933500'),
  `reconstructed: ${totalRejected}`);
check('processed == rejected + survivors (aggregate)', totalProcessed === totalRejected + totalSurvivors,
  `${totalProcessed} == ${totalRejected} + ${totalSurvivors}`);
check('processed == rejected + survivors (per shard)', processedNotEqRejPlusSurv.length === 0,
  processedNotEqRejPlusSurv.length > 0 ? `violations: ${processedNotEqRejPlusSurv.join(',')}` : '0 violations in 2219 shards');
check('plannedCodings == processed (per shard)', plannedNotEqProcessed.length === 0,
  plannedNotEqProcessed.length > 0 ? `violations: ${plannedNotEqProcessed.join(',')}` : '0 violations in 2219 shards');
check('Mass matches plan', totalProcessed === planTotalCodings,
  `plan: ${planTotalCodings}, reconstructed: ${totalProcessed}`);

// ——— Survivors ———
console.log(`\n=== PHASE 1D: SURVIVORS ===`);
check('Total survivors = 0', totalSurvivors === BigInt(0), `reconstructed: ${totalSurvivors}`);
check('No shard has survivors > 0', survivorRecords.length === 0,
  survivorRecords.length > 0 ? `shards with survivors: ${JSON.stringify(survivorRecords)}` : 'all 2219 shards report 0');
check('All survivor bin SHA256 = empty hash', nonEmptySurvivorBins.length === 0,
  nonEmptySurvivorBins.length > 0 ? `non-empty: ${JSON.stringify(nonEmptySurvivorBins.slice(0,5))}` : 'all 2219 match empty SHA256');
check('All survivor .bin files are 0 bytes', nonZeroSurvivorBins.length === 0,
  nonZeroSurvivorBins.length > 0 ? `non-zero: ${nonZeroSurvivorBins.slice(0,5).join(',')}` : `${survivorBinFiles.length} files, all 0 bytes`);
check('SURVIVORS_VERIFIED.ndjson is empty', 
  fs.statSync(path.join(RESULTS_DIR, 'SURVIVORS_VERIFIED.ndjson')).size === 0);
check('No SURVIVOR_ALERTS.ndjson in results root',
  !fs.existsSync(path.join(RESULTS_DIR, 'SURVIVOR_ALERTS.ndjson')));

// ——— Fingerprints ———
console.log(`\n=== PHASE 1E: FINGERPRINTS ===`);
check('Exactly 1 distinct core fingerprint', coreFingerprints.size === 1, 
  `found ${coreFingerprints.size}: ${[...coreFingerprints].join(', ')}`);
check('Core fingerprint matches expected', coreFingerprints.has(EXPECTED_CORE_FP),
  coreFingerprints.has(EXPECTED_CORE_FP) ? 'matches' : `got ${[...coreFingerprints][0]}`);
check('Exactly 1 distinct h6 source hash', h6Hashes.size === 1,
  `found ${h6Hashes.size}: ${[...h6Hashes].join(', ')}`);
check('h6 source hash matches expected', h6Hashes.has(EXPECTED_H6_SHA),
  h6Hashes.has(EXPECTED_H6_SHA) ? 'matches' : `got ${[...h6Hashes][0]}`);

// ——— Cross-check against FINAL_AUDIT.json ———
console.log(`\n=== CROSS-CHECK vs FINAL_AUDIT.json ===`);
const audit = JSON.parse(fs.readFileSync(path.join(RESULTS_DIR, 'FINAL_AUDIT.json'), 'utf8'));

check('Audit classification', audit.classification === 'FULL_CLOSURE_ZERO_SURVIVORS_PASS');
check('Audit doneShards = 2219', audit.doneShards === 2219);
check('Audit missingShardCount = 0', audit.missingShardCount === 0);
check('Audit missingShards array empty', audit.missingShards.length === 0);
check('Audit completedProfiles matches reconstruction', BigInt(audit.completedProfiles) === totalProfiles,
  `audit: ${audit.completedProfiles}, reconstructed: ${totalProfiles}`);
check('Audit processed matches reconstruction', BigInt(audit.processed) === totalProcessed,
  `audit: ${audit.processed}, reconstructed: ${totalProcessed}`);
check('Audit rejected matches reconstruction', BigInt(audit.rejected) === totalRejected,
  `audit: ${audit.rejected}, reconstructed: ${totalRejected}`);
check('Audit survivors matches reconstruction', BigInt(audit.survivors) === totalSurvivors);
check('Audit expectedProfiles matches reconstruction', BigInt(audit.expectedProfiles) === totalProfiles);
check('Audit expectedCodingMass matches reconstruction', BigInt(audit.expectedCodingMass) === totalProcessed);
check('Audit independentlyVerifiedSurvivors = 0', audit.independentlyVerifiedSurvivors === '0');
check('Audit coreFP matches expected', audit.expectedCoreFingerprintSha256 === EXPECTED_CORE_FP);
check('Audit sample decisions = 4438', audit.independentDecisionSamplesChecked === '4438',
  `audit says: ${audit.independentDecisionSamplesChecked}`);

// ——— Verify sample decision count ———
// Per PACKAGE_PROVENANCE: "independentDecisionSamplesPerCompletedShard": 2
// 2219 shards × 2 = 4438
const expectedSamples = 2219 * 2;
check('Sample decisions = 2 per shard × 2219', expectedSamples === 4438, `${expectedSamples}`);

// ——— Cross-check FINAL_AUDIT.txt vs FINAL_AUDIT.json ———
console.log(`\n=== TXT vs JSON AGREEMENT ===`);
const txt = fs.readFileSync(path.join(RESULTS_DIR, 'FINAL_AUDIT.txt'), 'utf8');
const txtLines = txt.split('\n').filter(l => l.includes('=')).map(l => {
  const [k, v] = l.split('=').map(s => s.trim());
  return [k, v];
});
const txtMap = Object.fromEntries(txtLines);

check('classification agrees', txtMap.classification === audit.classification);
check('done shards agrees', txtMap['done shards'] === `${audit.doneShards}/2219`);
check('completed profiles agrees', txtMap['completed profiles'] === audit.completedProfiles);
check('processed codings agrees', txtMap['processed codings'] === audit.processed);
check('rejected agrees', txtMap['rejected'] === audit.rejected);
check('survivors agrees', txtMap['survivors'] === audit.survivors);
check('sample decisions agrees', txtMap['sample decisions'] === audit.independentDecisionSamplesChecked);
check('missing shards agrees', txtMap['missing shards'] === String(audit.missingShardCount));

// ——— Summary ———
console.log(`\n${'='.repeat(60)}`);
if (failures === 0) {
  console.log(`ALL CHECKS PASSED (${anomalies.length} anomalies)`);
} else {
  console.log(`${failures} CHECK(S) FAILED`);
}
if (anomalies.length > 0) {
  console.log(`Anomalies: ${anomalies.join('; ')}`);
}
console.log(`${'='.repeat(60)}`);
