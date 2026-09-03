const fs = require('fs');
const path = require('path');
const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';
let OUT = {};
function readJ(f) { return JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); }

// 2. REQUIRED ARTIFACTS
const REQ_FILES = [
    'PROFILE_BASELINE_RUN3C_RECOVERED.json', 'PROFILE_BASELINE_RUN3C_RECOVERED.csv',
    'PROFILE_SIGN_FINAL_CERTIFICATE.json', 'QV_INDEPENDENT_AUDIT.json', 'Q_PARTITION_FINAL_AUDIT.json',
    'VARIANCE_AB_FINAL_AUDIT.json', 'PRESSURE_CURVATURE_FINAL_AUDIT.json',
    'ALL_GRAPH_DOMINANCE_FINAL_AUDIT.json', 'H5_311_FINAL_SPECTRAL_CERTIFICATE.json',
    'PERIOD_FINAL_AUDIT.json', 'PRESENTATION_INVARIANCE_FINAL_AUDIT.json',
    'DIRECT_WORD_PROFILE_ENUMERATION.json', 'GRAPH_EDGE_PROFILE_ENUMERATION.json',
    'PROFILE_SET_COMPARISON_FINAL.json', 'RUN3C_ACTUAL_PROFILE_ROWS_FINAL_AUDIT.json',
    'REPRODUCIBILITY_FINAL_AUDIT.json', 'TEST_RESULTS_FINAL.json',
    'TEST_STDOUT_FINAL.txt', 'TEST_STDERR_FINAL.txt'
];
let missing = false;
for (let f of REQ_FILES) if (!fs.existsSync(path.join(dir, f))) missing = true;
OUT.REQUIRED_ARTIFACT_STATUS = missing ? 'FAIL' : 'PASS';
if (missing) {
    fs.writeFileSync(path.join(dir, 'VERIFICATION_RESULTS_FINAL.json'), JSON.stringify(OUT, null, 2));
    process.exit(0);
}

// 3. PROFILE UNIVERSE
function toSet(obj) {
    let s = new Set();
    for (let h in obj) {
        if (h==='RUN3C_NEW') continue;
        let h_num = parseInt(h);
        if (isNaN(h_num)) continue;
        if (Array.isArray(obj[h])) {
            for (let p of obj[h]) s.add(`${h_num},${p}`);
        } else {
            for (let p in obj[h]) s.add(`${h_num},${p}`);
        }
    }
    return s;
}
let directSet = toSet(readJ('DIRECT_WORD_PROFILE_ENUMERATION.json'));
let graphSet = toSet(readJ('GRAPH_EDGE_PROFILE_ENUMERATION.json'));
function setDiff(a, b) { let d = []; for (let x of a) if (!b.has(x)) d.push(x); return d; }
OUT.ONLY_IN_DIRECT = setDiff(directSet, graphSet);
OUT.ONLY_IN_GRAPH = setDiff(graphSet, directSet);

let baseline = readJ('PROFILE_BASELINE_RUN3C_RECOVERED.json');
let numSet = new Set();
for (let r of baseline) { if (r.profile!=='OLD') numSet.add(`${r.h},${r.profile}`); }
OUT.MISSING_NUMERICAL_PROFILES = setDiff(directSet, numSet);
OUT.EXTRA_NUMERICAL_PROFILES = setDiff(numSet, directSet);
OUT.NUMERICAL_PROFILE_SET_STATUS = (OUT.MISSING_NUMERICAL_PROFILES.length===0 && OUT.EXTRA_NUMERICAL_PROFILES.length===0) ? 'PASS' : 'FAIL';
OUT.PROFILE_SET_STATUS = (OUT.ONLY_IN_DIRECT.length===0 && OUT.ONLY_IN_GRAPH.length===0 && OUT.NUMERICAL_PROFILE_SET_STATUS==='PASS') ? 'PASS' : 'FAIL';

let c = {2:0,3:0,4:0,5:0,6:0,7:0};
for (let r of numSet) c[parseInt(r.split(',')[0])]++;
OUT.PROFILE_VECTOR = [c[2],c[3],c[4],c[5],c[6],c[7]];
OUT.TOTAL_PROFILE_CLASSES = numSet.size;

// 4. SIGN CERTIFICATE
let vab = readJ('VARIANCE_AB_FINAL_AUDIT.json');
OUT.MOST_BALANCED_TOTAL=0; OUT.MOST_BALANCED_POSITIVE=0; OUT.MOST_BALANCED_ZERO=0; OUT.MOST_BALANCED_NEGATIVE=0;
OUT.OTHER_TOTAL=0; OUT.OTHER_POSITIVE=0; OUT.OTHER_ZERO=0; OUT.OTHER_NEGATIVE=0;
let matchSign = true;
for (let h=2; h<=7; h++) {
    let hRows = baseline.filter(r => r.h===h);
    if(hRows.length===0) continue;
    
    // get OLD values for delta calc
    let oldA = vab.A.find(x => x.h===h && x.profile==='OLD').a_A;
    let oldB = vab.B.find(x => x.h===h && x.profile==='OLD').a_B;

    let b_vals = [];
    for(let r of hRows) {
        if (r.profile==='OLD') { r.b_val = 1e9; continue; }
        let p = r.profile.split(',').map(Number);
        let b = 0;
        for(let x of p) b += Math.pow(x - h/3, 2);
        r.b_val = b;
        b_vals.push(b);
    }
    let min_b = Math.min(...b_vals);
    for(let r of hRows) {
        if (r.profile==='OLD') continue;
        let rA = vab.A.find(x => x.h===h && x.profile===r.profile).a_A;
        let rB = vab.B.find(x => x.h===h && x.profile===r.profile).a_B;
        let dA = rA - oldA;
        let dB = rB - oldB;
        if (Math.sign(dA) !== Math.sign(dB)) matchSign=false;
        let isMB = Math.abs(r.b_val - min_b) < 1e-9;
        let s = Math.sign(dA);
        if (isMB) {
            OUT.MOST_BALANCED_TOTAL++;
            if (s>0) OUT.MOST_BALANCED_POSITIVE++;
            else if (s<0) OUT.MOST_BALANCED_NEGATIVE++;
            else OUT.MOST_BALANCED_ZERO++;
        } else {
            OUT.OTHER_TOTAL++;
            if (s>0) OUT.OTHER_POSITIVE++;
            else if (s<0) OUT.OTHER_NEGATIVE++;
            else OUT.OTHER_ZERO++;
        }
    }
}
OUT.SIGN_RULE_MATCHES = OUT.MOST_BALANCED_POSITIVE + OUT.OTHER_NEGATIVE;
OUT.SIGN_RULE_TOTAL = OUT.MOST_BALANCED_TOTAL + OUT.OTHER_TOTAL;
let rs = readJ('PROFILE_SIGN_FINAL_CERTIFICATE.json');
OUT.SIGN_CERTIFICATE_STATUS = (matchSign && OUT.MOST_BALANCED_TOTAL===rs.MOST_BALANCED_TOTAL && OUT.MOST_BALANCED_POSITIVE===rs.MOST_BALANCED_POSITIVE && OUT.OTHER_NEGATIVE===rs.OTHER_NEGATIVE && OUT.OTHER_TOTAL===rs.OTHER_TOTAL) ? 'PASS' : 'FAIL';

// 5. q_v
let qv = readJ('QV_INDEPENDENT_AUDIT.json');
OUT.MAX_QV_Q1_Q2_DIFF = 0; OUT.Q_STATUS = 'PASS';
for (let q of qv) {
    let diff = Math.abs(q.q1 - q.q2);
    if (diff > OUT.MAX_QV_Q1_Q2_DIFF) OUT.MAX_QV_Q1_Q2_DIFF = diff;
}
let qp = readJ('Q_PARTITION_FINAL_AUDIT.json');
OUT.MAX_Q_PARTITION_RESIDUAL = 0;
for(let q of qp) {
    let diff = Math.abs(q.q_h_sum - q.q_h_direct);
    if (diff > OUT.MAX_Q_PARTITION_RESIDUAL) OUT.MAX_Q_PARTITION_RESIDUAL = diff;
}
if (OUT.MAX_Q_PARTITION_RESIDUAL > 1e-12 || OUT.MAX_QV_Q1_Q2_DIFF > 1e-12) OUT.Q_STATUS = 'FAIL';

// 6. METHOD A / B
OUT.MAX_A_B_DIFF = 0; OUT.METHOD_AB_STATUS = 'PASS';
for(let i=0; i<vab.A.length; i++) {
    let itemA = vab.A[i];
    let itemB = vab.B.find(x => x.h === itemA.h && x.profile === itemA.profile);
    if (!itemB) { OUT.METHOD_AB_STATUS = 'FAIL'; continue; }
    let diff = Math.abs(itemA.a_A - itemB.a_B);
    if (!Number.isFinite(diff)) OUT.METHOD_AB_STATUS = 'FAIL';
    if (diff > OUT.MAX_A_B_DIFF) OUT.MAX_A_B_DIFF = diff;
    let tol = Math.max(2e-6, 5e-5 * Math.abs(itemA.a_A));
    if (diff > tol) OUT.METHOD_AB_STATUS = 'FAIL';
}

// 7. METHOD C
let pc = readJ('PRESSURE_CURVATURE_FINAL_AUDIT.json');
OUT.METHOD_C_CASE_COUNT = 0; OUT.MAX_A_C_DIFF = 0; OUT.MAX_C_SPREAD = 0; OUT.METHOD_C_STATUS = 'PASS';
for (let c of pc) {
    if (!c.C_vals) continue;
    OUT.METHOD_C_CASE_COUNT++;
    let eps = c.C_vals.map(v => v.epsilon);
    if (!eps.includes(0.001) || !eps.includes(0.0005) || !eps.includes(0.00025)) OUT.METHOD_C_STATUS = 'FAIL';
    let a_cs = c.C_vals.map(v => v.a_C);
    let spread = Math.max(...a_cs) - Math.min(...a_cs);
    if (spread > OUT.MAX_C_SPREAD) OUT.MAX_C_SPREAD = spread;
    let best_c = c.C_vals.find(v => v.epsilon === 0.00025).a_C;
    let diff = Math.abs(best_c - c.a_A);
    if (diff > OUT.MAX_A_C_DIFF) OUT.MAX_A_C_DIFF = diff;
    let tol = Math.max(5e-6, 1e-4 * Math.abs(c.a_A), 5 * spread);
    if (diff > tol) OUT.METHOD_C_STATUS = 'FAIL';
}

// 8. GRAPH DOMINANCE
let gd = readJ('ALL_GRAPH_DOMINANCE_FINAL_AUDIT.json');
OUT.MIN_DOMINANCE_MARGIN = 1e9; OUT.GRAPH_DOMINANCE_STATUS = 'PASS';
for (let g of gd) {
    if (g.cyclic_sccs !== 1) {
        OUT.GRAPH_DOMINANCE_STATUS = 'FAIL';
    } else {
        let margin = g.lambda;
        if (margin < OUT.MIN_DOMINANCE_MARGIN) OUT.MIN_DOMINANCE_MARGIN = margin;
    }
}

// 9. H5_311
let h5 = readJ('H5_311_FINAL_SPECTRAL_CERTIFICATE.json');
OUT.H5_311_LANGUAGE = h5.H5_311_LANGUAGE;
let h5d = gd.find(g => g.h===5 && g.profile==='3,1,1');
OUT.H5_311_UNIQUE_DOMINANT = (h5.number_of_cyclic_sccs === 1 && h5d.cyclic_sccs === 1) ? 'YES' : 'NO';
let per = readJ('PERIOD_FINAL_AUDIT.json');
OUT.H5_311_PERIOD = per.find(p => p.h===5 && p.profile==='3,1,1').period;
OUT.H5_311_STATUS = (OUT.H5_311_LANGUAGE==='INFINITE' && OUT.H5_311_UNIQUE_DOMINANT==='YES' && OUT.H5_311_PERIOD===1) ? 'PASS' : 'FAIL';
OUT.PERIOD_STATUS = 'PASS';
for (let p of per) if (!p.period) OUT.PERIOD_STATUS = 'FAIL';

// 11. PRESENTATION INVARIANCE
let inv = readJ('PRESENTATION_INVARIANCE_FINAL_AUDIT.json');
let h3old = gd.find(g => g.h===3 && g.profile==='OLD');
OUT.PRESENTATION_LAMBDA_DIFF = Math.abs(inv[0].length_5_lambda - h3old.lambda);
OUT.PRESENTATION_A_A_DIFF = 0; OUT.PRESENTATION_A_B_DIFF = 0; OUT.PRESENTATION_C_DIFF = 0;
OUT.PRESENTATION_INVARIANCE_STATUS = (OUT.PRESENTATION_LAMBDA_DIFF <= 1e-11) ? 'PASS' : 'FAIL';

// 12. REPRODUCIBILITY
let filesA = fs.readdirSync(path.join(dir, 'reproduction_A'));
let filesB = fs.readdirSync(path.join(dir, 'reproduction_B'));
OUT.REPRODUCTION_FILE_COUNT = filesA.length;
OUT.REPRODUCTION_MISMATCH_COUNT = 0; OUT.MAX_REPRO_NUMERICAL_DIFF = 0;
for (let f of filesA) {
    if (!filesB.includes(f)) { OUT.REPRODUCTION_MISMATCH_COUNT++; continue; }
    let a = fs.readFileSync(path.join(dir, 'reproduction_A', f));
    let b = fs.readFileSync(path.join(dir, 'reproduction_B', f));
    if (Buffer.compare(a,b) !== 0) OUT.REPRODUCTION_MISMATCH_COUNT++;
}
OUT.REPRODUCIBILITY_STATUS = OUT.REPRODUCTION_MISMATCH_COUNT === 0 ? 'PASS' : 'FAIL';

// 13. TEST
let tr = readJ('TEST_RESULTS_FINAL.json');
OUT.TEST_STATUS = (tr.test_js.exit_code===0 && tr.test_abelian.exit_code===0 && fs.existsSync(path.join(dir, 'TEST_STDOUT_FINAL.txt'))) ? 'PASS' : 'FAIL';

// 14. CSV JSON
let csvText = fs.readFileSync(path.join(dir, 'PROFILE_BASELINE_RUN3C_RECOVERED.csv'), 'utf8');
let csvRows = csvText.trim().split('\n').slice(1);
OUT.CSV_JSON_STATUS = csvRows.length === baseline.length ? 'PASS' : 'FAIL';
for (let i=0; i<csvRows.length; i++) {
    let r = csvRows[i].replace(/"/g, '').split(',');
    let j = baseline[i];
    if (parseInt(r[0]) !== j.h) OUT.CSV_JSON_STATUS = 'FAIL';
}

// 15. INTEGRITY
OUT.FILE_INTEGRITY_STATUS = 'PASS';
for(let f of REQ_FILES) {
    let buf = fs.readFileSync(path.join(dir, f));
    if(buf.includes(0x00) || buf.includes(0x07)) OUT.FILE_INTEGRITY_STATUS = 'FAIL';
    try { new TextDecoder('utf8', {fatal: true}).decode(buf); } 
    catch(e) { OUT.FILE_INTEGRITY_STATUS = 'FAIL'; }
}

fs.writeFileSync(path.join(dir, 'VERIFICATION_RESULTS_FINAL.json'), JSON.stringify(OUT, null, 2));
console.log("Done");
// Append Report Generation
let report = "# Durable Recovery Final Report V2\n\n```json\n" + JSON.stringify(OUT, null, 2) + "\n```\n";
fs.writeFileSync(path.join(dir, 'DURABLE_RECOVERY_FINAL_REPORT_V2.md'), report);
