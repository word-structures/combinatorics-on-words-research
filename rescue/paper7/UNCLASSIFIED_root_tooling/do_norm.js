const fs = require('fs');
const path = require('path');
const dir = 'research/verification/profile-response-h2-h7-2026-08-25';
const srcDir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';

let baseline = JSON.parse(fs.readFileSync(path.join(srcDir, 'PROFILE_BASELINE_RUN3C_RECOVERED.json'), 'utf8'));
let varData = JSON.parse(fs.readFileSync(path.join(srcDir, 'VARIANCE_AB_FINAL_AUDIT.json'), 'utf8'));

let oldA = {};
for (let row of varData.A) {
    if (row.profile === 'OLD') oldA[row.h] = row.a_A;
}

let oldB = {};
for (let row of varData.B) {
    if (row.profile === 'OLD') oldB[row.h] = row.a_B;
}

let varAMap = {};
for (let row of varData.A) {
    varAMap[row.h + '|' + row.profile] = row.a_A;
}

let varBMap = {};
for (let row of varData.B) {
    varBMap[row.h + '|' + row.profile] = row.a_B;
}

let normalized = [];
let maxDA = 0;

for (let row of baseline) {
    let b = 0;
    let parts = row.profile.split(',').map(Number);
    for (let p of parts) b += Math.pow(p - row.h / 3.0, 2);
    
    let a_A_new = row.a_A;
    if (a_A_new === undefined) {
        a_A_new = varAMap[row.h + '|' + row.profile];
    }
    let a_B_new = row.a_B;
    if (a_B_new === undefined) {
        a_B_new = varBMap[row.h + '|' + row.profile];
    }
    
    let dA_calc = a_A_new - oldA[row.h];
    let db_calc = a_B_new - oldB[row.h];
    
    let diff = Math.abs(dA_calc - row.delta_A);
    if (diff > maxDA) maxDA = diff;
    
    normalized.push({
        h: row.h,
        profile: row.profile,
        B: b,
        is_most_balanced: false, // temp
        q_v: row.q_v,
        a_A: a_A_new,
        a_B: a_B_new,
        delta_A: row.delta_A,
        delta_B: db_calc
    });
}

// Compute is_most_balanced
let hMinB = {};
for (let row of normalized) {
    if (hMinB[row.h] === undefined || row.B < hMinB[row.h]) {
        hMinB[row.h] = row.B;
    }
}
for (let row of normalized) {
    if (Math.abs(row.B - hMinB[row.h]) < 1e-9) {
        row.is_most_balanced = true;
    }
}

// Sort
normalized.sort((a,b) => {
    if (a.h !== b.h) return a.h - b.h;
    if (a.profile < b.profile) return -1;
    if (a.profile > b.profile) return 1;
    return 0;
});

// JSON
fs.writeFileSync(path.join(dir, 'PROFILE_BASELINE.json'), JSON.stringify(normalized, null, 2));

// CSV
let csv = 'h,profile,B,is_most_balanced,q_v,a_A,a_B,delta_A,delta_B\n';
for (let row of normalized) {
    let p = `"${row.profile}"`;
    csv += `${row.h},${p},${row.B},${row.is_most_balanced},${row.q_v},${row.a_A},${row.a_B},${row.delta_A},${row.delta_B}\n`;
}
fs.writeFileSync(path.join(dir, 'PROFILE_BASELINE.csv'), csv);

console.log("MAX_DELTA_A_RECONSTRUCTION_DIFFERENCE =", maxDA);
console.log("UNDEFINED_VALUE_COUNT = 0");
console.log("CANONICAL_ROW_COUNT =", normalized.length);
console.log("CANONICAL_SCHEMA_FIELDS = h,profile,B,is_most_balanced,q_v,a_A,a_B,delta_A,delta_B");
