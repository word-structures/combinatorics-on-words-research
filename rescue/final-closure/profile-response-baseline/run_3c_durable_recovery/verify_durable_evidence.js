const fs = require('fs');
const path = require('path');

const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';
const reqFiles = [
    'PROFILE_BASELINE_RUN3C_RECOVERED.json', 'PROFILE_BASELINE_RUN3C_RECOVERED.csv',
    'PROFILE_SIGN_FINAL_CERTIFICATE.json', 'QV_INDEPENDENT_AUDIT.json', 'Q_PARTITION_FINAL_AUDIT.json',
    'VARIANCE_AB_FINAL_AUDIT.json', 'PRESSURE_CURVATURE_FINAL_AUDIT.json',
    'ALL_GRAPH_DOMINANCE_FINAL_AUDIT.json', 'H5_311_FINAL_SPECTRAL_CERTIFICATE.json',
    'PERIOD_FINAL_AUDIT.json', 'PRESENTATION_INVARIANCE_FINAL_AUDIT.json',
    'DIRECT_WORD_PROFILE_ENUMERATION.json', 'GRAPH_EDGE_PROFILE_ENUMERATION.json',
    'PROFILE_SET_COMPARISON_FINAL.json', 'REPRODUCIBILITY_FINAL_AUDIT.json',
    'TEST_RESULTS_FINAL.json', 'TEST_STDOUT_FINAL.txt', 'TEST_STDERR_FINAL.txt'
];

let allExist = true;
for (let f of reqFiles) {
    if (!fs.existsSync(path.join(dir, f))) {
        console.error("Missing:", f);
        allExist = false;
    }
}
if (!allExist) {
    res.METHOD_C_CASE_COUNT = ccount;
fs.writeFileSync(path.join(dir, 'VERIFICATION_RESULTS.json'), JSON.stringify({REQUIRED_ARTIFACT_STATUS: 'FAIL'}, null, 2));
    process.exit(0);
}

let res = { REQUIRED_ARTIFACT_STATUS: 'PASS' };

// Profile Vector
let rows = JSON.parse(fs.readFileSync(path.join(dir, 'RUN3C_ACTUAL_PROFILE_ROWS_FINAL_AUDIT.json'), 'utf8'));
res.PROFILE_VECTOR = rows;
res.TOTAL_PROFILE_CLASSES = rows.reduce((a,b)=>a+b, 0);

// Sign Certificate
let signCert = JSON.parse(fs.readFileSync(path.join(dir, 'PROFILE_SIGN_FINAL_CERTIFICATE.json'), 'utf8'));
res.MOST_BALANCED_POSITIVE = signCert.MOST_BALANCED_POSITIVE;
res.OTHER_NEGATIVE = signCert.OTHER_NEGATIVE;
res.SIGN_RULE_MATCHES = signCert.MOST_BALANCED_POSITIVE + signCert.OTHER_NEGATIVE;

// Q_v Q1/Q2
let qv = JSON.parse(fs.readFileSync(path.join(dir, 'QV_INDEPENDENT_AUDIT.json'), 'utf8'));
let maxQvDiff = 0;
for (let q of qv) {
    if (q.diff > maxQvDiff) maxQvDiff = q.diff;
}
res.MAX_QV_Q1_Q2_DIFF = maxQvDiff;

// Q Partition
let qp = JSON.parse(fs.readFileSync(path.join(dir, 'Q_PARTITION_FINAL_AUDIT.json'), 'utf8'));
let maxQpRes = 0;
for (let q of qp) {
    let diff = Math.abs(q.diff_absolute);
    if (diff > maxQpRes) maxQpRes = diff;
}
res.MAX_Q_PARTITION_RESIDUAL = maxQpRes;

// Variance AB
let vab = JSON.parse(fs.readFileSync(path.join(dir, 'VARIANCE_AB_FINAL_AUDIT.json'), 'utf8'));
let maxAbDiff = 0;

for (let i = 0; i < vab.A.length; i++) {
    let diff = Math.abs(vab.A[i].a_A - vab.B[i].a_B);
    if (diff > maxAbDiff) maxAbDiff = diff;
}

res.MAX_A_B_DIFF = maxAbDiff;

// Method C
let pc = JSON.parse(fs.readFileSync(path.join(dir, 'PRESSURE_CURVATURE_FINAL_AUDIT.json'), 'utf8'));
// removed
let maxAcDiff = 0;
let ccount = 0;
for (let c of pc) {
    if (!c.C_vals) continue;
    ccount++;
    for (let cval of c.C_vals) {
        let diff = Math.abs(cval.a_C - c.a_A);
        if (diff > maxAcDiff) maxAcDiff = diff;
    }
}
res.MAX_A_C_DIFF = maxAcDiff;

// Graph Dominance
let gd = JSON.parse(fs.readFileSync(path.join(dir, 'ALL_GRAPH_DOMINANCE_FINAL_AUDIT.json'), 'utf8'));
let domStatus = 'PASS';
for (let k in gd) {
    if (gd[k].status !== 'PASS') domStatus = 'FAIL';
}
res.GRAPH_DOMINANCE_STATUS = domStatus;

// H5 311
let h5 = JSON.parse(fs.readFileSync(path.join(dir, 'H5_311_FINAL_SPECTRAL_CERTIFICATE.json'), 'utf8'));
res.H5_311_LANGUAGE = h5.LANGUAGE;
res.H5_311_UNIQUE_DOMINANT = h5.UNIQUE_DOMINANT;
res.H5_311_PERIOD = h5.PERIOD;

// Presentation Invariance
let inv = JSON.parse(fs.readFileSync(path.join(dir, 'PRESENTATION_INVARIANCE_FINAL_AUDIT.json'), 'utf8'));
let invStatus = 'PASS';
for (let h in inv) {
    if (inv[h].status !== 'PASS') invStatus = 'FAIL';
}
res.PRESENTATION_INVARIANCE_STATUS = invStatus;

// Reproducibility
let repro = JSON.parse(fs.readFileSync(path.join(dir, 'REPRODUCIBILITY_FINAL_AUDIT.json'), 'utf8'));
res.REPRODUCIBILITY_STATUS = repro.exact_match ? 'PASS' : 'FAIL';

// Tests
let tst = JSON.parse(fs.readFileSync(path.join(dir, 'TEST_RESULTS_FINAL.json'), 'utf8'));
if (tst.test_js && tst.test_js.exit_code === 0 && tst.test_abelian && tst.test_abelian.exit_code === 0) {
    res.TEST_STATUS = 'PASS';
} else {
    res.TEST_STATUS = 'FAIL';
}

fs.writeFileSync(path.join(dir, 'VERIFICATION_RESULTS.json'), JSON.stringify(res, null, 2));
console.log("Verification done.");
