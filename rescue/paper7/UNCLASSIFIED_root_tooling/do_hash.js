const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';

// A & B: EVIDENCE_MANIFEST_FINAL.json
let files = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile() && f !== 'reproduction_A' && f !== 'reproduction_B');
let manifest = {};
for (let f of files) {
    if (f === 'EVIDENCE_MANIFEST_FINAL.json' || f === 'SHA256SUMS_FINAL.txt') continue;
    let content = fs.readFileSync(path.join(dir, f));
    manifest[f] = { 
        sha256: crypto.createHash('sha256').update(content).digest('hex'), 
        size: content.length 
    };
}
fs.writeFileSync(path.join(dir, 'EVIDENCE_MANIFEST_FINAL.json'), JSON.stringify(manifest, null, 2));

// C: SHA256SUMS_FINAL.txt
files = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile());
let sums = '';
for (let f of files) {
    if (f === 'SHA256SUMS_FINAL.txt') continue;
    let content = fs.readFileSync(path.join(dir, f));
    sums += crypto.createHash('sha256').update(content).digest('hex') + '  ' + f + '\n';
}
fs.writeFileSync(path.join(dir, 'SHA256SUMS_FINAL.txt'), sums);

// D: Verify Hashes
let mismatch = 0;
let lines = sums.trim().split('\n');
for (let line of lines) {
    let [hash, file] = line.split('  ');
    let content = fs.readFileSync(path.join(dir, file));
    if (crypto.createHash('sha256').update(content).digest('hex') !== hash) mismatch++;
}
fs.writeFileSync(path.join(dir, 'HASH_MISMATCH_COUNT.txt'), mismatch.toString());
console.log("HASH_MISMATCH_COUNT =", mismatch);
