const fs = require('fs');

const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3d2_profile_certificate_repair';
fs.mkdirSync(dir, {recursive: true});

let baselineFile = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_final_certificate/PROFILE_BASELINE_RUN3C.json';
if (!fs.existsSync(baselineFile)) {
    baselineFile = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3b_integrity_audit/reproduction_A/PROFILE_BASELINE_RUN3B.json';
}
const baseline = JSON.parse(fs.readFileSync(baselineFile, 'utf8'));

console.log("Baseline loaded:", baseline.length, "rows.");
