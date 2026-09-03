const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const dir = 'research/verification/profile-response-h2-h7-2026-08-25';
const srcDir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';

// FINAL FILE INTEGRITY
let allFiles = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile() && f !== 'EVIDENCE_MANIFEST.json' && f !== 'SHA256SUMS.txt');
let integrityFails = 0;
let badValueCount = 0;
for (let f of allFiles) {
    let buf = fs.readFileSync(path.join(dir, f));
    if (buf.includes(0x00) || buf.includes(0x07)) integrityFails++;
    try {
        let txt = new TextDecoder('utf8', {fatal: true}).decode(buf);
        if ((f === 'PROFILE_BASELINE.json' || f === 'PROFILE_BASELINE.csv') && (txt.includes('undefined') || txt.includes('NaN') || txt.includes('Infinity'))) {
            if (f !== 'CAPSULE.md') badValueCount++; // CAPSULE might have prose, wait no prose mentions undefined except the old schema which is removed
        }
    } catch(e) { integrityFails++; }
    if (f.endsWith('.json')) {
        try { JSON.parse(buf.toString('utf8')); }
        catch(e) { integrityFails++; }
    }
}
let integStatus = (integrityFails === 0 && badValueCount === 0) ? 'PASS' : 'FAIL';
let pCheck = { FILE_INTEGRITY_STATUS: integStatus, BAD_VALUE_COUNT: badValueCount };
fs.writeFileSync(path.join(dir, 'FILE_INTEGRITY_PACKAGING_CHECK.json'), JSON.stringify(pCheck, null, 2));


// MANIFEST BUILD
const directMap = {
    "PROFILE_SIGN_FINAL_CERTIFICATE.json": null, // Wait, PROFILE_SIGN_CERTIFICATE is now GENERATED_PACKAGING_METADATA!
    "QV_INDEPENDENT_AUDIT.json": "QV_INDEPENDENT_AUDIT.json",
    "Q_PARTITION_FINAL_AUDIT.json": "Q_PARTITION_AUDIT.json",
    "VARIANCE_AB_FINAL_AUDIT.json": "VARIANCE_AB_AUDIT.json",
    "PRESSURE_CURVATURE_FINAL_AUDIT.json": "PRESSURE_CURVATURE_AUDIT.json",
    "ALL_GRAPH_DOMINANCE_FINAL_AUDIT.json": "GRAPH_COMPONENT_AUDIT.json",
    "H5_311_FINAL_SPECTRAL_CERTIFICATE.json": "H5_311_SPECTRAL_CERTIFICATE.json",
    "PERIOD_FINAL_AUDIT.json": "PERIOD_AUDIT.json",
    "PRESENTATION_INVARIANCE_FINAL_AUDIT.json": "PRESENTATION_INVARIANCE_AUDIT.json",
    "DIRECT_WORD_PROFILE_ENUMERATION.json": "DIRECT_WORD_PROFILE_ENUMERATION.json",
    "GRAPH_EDGE_PROFILE_ENUMERATION.json": "GRAPH_EDGE_PROFILE_ENUMERATION.json",
    "PROFILE_SET_COMPARISON_FINAL.json": "PROFILE_SET_COMPARISON.json",
    "REPRODUCIBILITY_FINAL_AUDIT.json": "REPRODUCIBILITY_AUDIT.json",
    "TEST_RESULTS_FINAL.json": "TEST_RESULTS.json",
    "TEST_STDOUT_FINAL.txt": "TEST_STDOUT.txt",
    "TEST_STDERR_FINAL.txt": "TEST_STDERR.txt"
};

function sha256(file) {
    return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

let manifest = {};
let directCount = 0, directMismatch = 0;
let transCount = 0;
let metaCount = 0;

for (let srcName in directMap) {
    let canName = directMap[srcName];
    if (!canName) continue;
    let srcFile = path.join(srcDir, srcName);
    let canFile = path.join(dir, canName);
    let srcH = sha256(srcFile);
    let canH = sha256(canFile);
    let byteId = (srcH === canH);
    if (!byteId) directMismatch++;
    directCount++;
    manifest[canName] = {
        classification: "DIRECT_DURABLE_COPY",
        canonical_path: canName,
        durable_source_path: srcDir + '/' + srcName,
        source_sha256: srcH,
        canonical_sha256: canH,
        byte_identical: byteId
    };
}

let transformed = ["PROFILE_BASELINE.json", "PROFILE_BASELINE.csv"];
for (let canName of transformed) {
    let canFile = path.join(dir, canName);
    transCount++;
    manifest[canName] = {
        classification: "TRANSFORMED_CANONICAL_DATA",
        canonical_path: canName,
        durable_source_path: "scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery/PROFILE_BASELINE_RUN3C_RECOVERED.json and VARIANCE_AB_FINAL_AUDIT.json",
        source_sha256: "N/A",
        canonical_sha256: sha256(canFile),
        byte_identical: false,
        transformation: "schema-normalized deterministic derivation"
    };
}

let meta = ["CAPSULE.md", "PROFILE_BASELINE_SCHEMA_AUDIT.json", "PROFILE_SIGN_CERTIFICATE.json", "REPRODUCIBILITY_PACKAGING_CHECK.json", "FILE_INTEGRITY_PACKAGING_CHECK.json"];
for (let canName of meta) {
    let canFile = path.join(dir, canName);
    metaCount++;
    manifest[canName] = {
        classification: "GENERATED_PACKAGING_METADATA",
        canonical_path: canName,
        durable_source_path: "NEW",
        source_sha256: "N/A",
        canonical_sha256: sha256(canFile),
        byte_identical: false
    };
}

fs.writeFileSync(path.join(dir, 'EVIDENCE_MANIFEST.json'), JSON.stringify(manifest, null, 2));

// SHA256SUMS.txt
let filesToHash = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile() && f !== 'SHA256SUMS.txt');
let sums = '';
for (let f of filesToHash) {
    sums += sha256(path.join(dir, f)) + '  ' + f + '\n';
}
fs.writeFileSync(path.join(dir, 'SHA256SUMS.txt'), sums);

// Validate Hashes
let mismatch = 0;
let lines = sums.trim().split('\n');
let sumFiles = new Set();
for (let line of lines) {
    let [hash, file] = line.split('  ');
    if (sha256(path.join(dir, file)) !== hash) mismatch++;
    sumFiles.add(file);
}

let dirFiles = new Set(filesToHash);
let uncovered = 0;
for (let f of dirFiles) if (!sumFiles.has(f)) uncovered++;
for (let f of sumFiles) if (!dirFiles.has(f)) uncovered++;
let manStat = (directMismatch === 0 && uncovered === 0 && dirFiles.size === Object.keys(manifest).length + 1) ? 'PASS' : 'FAIL';

console.log("DIRECT_COPY_COUNT =", directCount);
console.log("DIRECT_COPY_HASH_MISMATCH_COUNT =", directMismatch);
console.log("TRANSFORMED_FILE_COUNT =", transCount);
console.log("GENERATED_METADATA_COUNT =", metaCount);
console.log("MANIFEST_STATUS =", manStat);

console.log("PACKAGE_FILE_COUNT =", dirFiles.size + 1); // including SHA256SUMS
console.log("SHA256_FILE_COUNT =", sumFiles.size);
console.log("PACKAGE_UNCOVERED_FILE_COUNT =", uncovered);
console.log("HASH_MISMATCH_COUNT =", mismatch);
console.log("HASH_STATUS =", (mismatch === 0 && uncovered === 0) ? 'PASS' : 'FAIL');
console.log("FILE_INTEGRITY_STATUS =", integStatus);
