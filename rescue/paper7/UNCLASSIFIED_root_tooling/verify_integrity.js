const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';

let sums = fs.readFileSync(path.join(dir, 'SHA256SUMS.txt'), 'utf8').trim().split('\n');
let mismatch = 0;
for(let line of sums) {
    if (!line) continue;
    let [hash, file] = line.split('  ');
    let content = fs.readFileSync(path.join(dir, file));
    let sha = crypto.createHash('sha256').update(content).digest('hex');
    if (sha !== hash) mismatch++;
}
console.log("HASH_MISMATCH_COUNT =", mismatch);

let integrityStatus = 'PASS';
let files = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile());
for (let f of files) {
    let content = fs.readFileSync(path.join(dir, f));
    // check no NUL, no BEL
    if (content.includes(0x00) || content.includes(0x07)) {
        integrityStatus = 'FAIL';
        console.log("Integrity fail for", f);
    }
    if (f.endsWith('.json')) {
        try { JSON.parse(content.toString('utf8')); }
        catch (e) { integrityStatus = 'FAIL'; console.log("JSON fail for", f); }
    }
    if (f.endsWith('.csv')) {
        let lines = content.toString('utf8').trim().split('\n');
        if (lines.length === 0) integrityStatus = 'FAIL';
    }
}
console.log("FILE_INTEGRITY_STATUS =", integrityStatus);
