const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const dir = 'research/verification/profile-response-h2-h7-2026-08-25';
const srcA = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery/reproduction_A';
const srcB = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery/reproduction_B';

let filesA = fs.readdirSync(srcA);
let filesB = fs.readdirSync(srcB);
let setA = new Set(filesA);
let setB = new Set(filesB);

let onlyA = 0;
for (let f of filesA) if (!setB.has(f)) onlyA++;
let onlyB = 0;
for (let f of filesB) if (!setA.has(f)) onlyB++;

let selected = [
    "PROFILE_BASELINE_RUN3C_RECOVERED.csv",
    "PROFILE_BASELINE_RUN3C_RECOVERED.json",
    "QV_INDEPENDENT_AUDIT.json",
    "VARIANCE_AB_FINAL_AUDIT.json"
];

let mismatches = 0;
function sha256(file) {
    return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

for (let f of selected) {
    if (setA.has(f) && setB.has(f)) {
        if (sha256(path.join(srcA, f)) !== sha256(path.join(srcB, f))) mismatches++;
    } else {
        mismatches++;
    }
}

let OUT = {
    files_only_in_A: onlyA,
    files_only_in_B: onlyB,
    selected_files: selected,
    selected_file_mismatches: mismatches,
    status: mismatches === 0 ? 'PASS' : 'FAIL',
    claim_scope: 'SELECTED_PRIMARY_OUTPUTS_BYTE_IDENTICAL'
};

fs.writeFileSync(path.join(dir, 'REPRODUCIBILITY_PACKAGING_CHECK.json'), JSON.stringify(OUT, null, 2));

console.log("REPRO_FILES_ONLY_IN_A =", onlyA);
console.log("REPRO_FILES_ONLY_IN_B =", onlyB);
console.log("REPRO_SELECTED_FILE_COUNT =", selected.length);
console.log("REPRO_SELECTED_MISMATCH_COUNT =", mismatches);
console.log("REPRODUCIBILITY_SCOPE = SELECTED_PRIMARY_OUTPUTS_BYTE_IDENTICAL");
console.log("REPRODUCIBILITY_STATUS =", OUT.status);
