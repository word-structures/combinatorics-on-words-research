const fs = require('fs');
const path = require('path');
const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';
let v = JSON.parse(fs.readFileSync(path.join(dir, 'VERIFICATION_RESULTS_FINAL.json'), 'utf8'));
let rep = fs.readFileSync(path.join(dir, 'DURABLE_RECOVERY_FINAL_REPORT_V2.md'), 'utf8');

// Parse machine-readable block
let block = rep.split('```json\n')[1].split('```')[0];
let parsed = JSON.parse(block);
let status = 'PASS';
for(let k in v) {
    if(JSON.stringify(v[k]) !== JSON.stringify(parsed[k])) {
        status = 'FAIL';
        console.log("Mismatch:", k, v[k], parsed[k]);
    }
}
fs.writeFileSync(path.join(dir, 'REPORT_CONSISTENCY_FINAL.txt'), status);
console.log("REPORT_CONSISTENCY_STATUS = " + status);
