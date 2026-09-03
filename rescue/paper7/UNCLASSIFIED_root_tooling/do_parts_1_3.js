const fs = require('fs');
const path = require('path');
const dir = 'research/verification/profile-response-h2-h7-2026-08-25';

// 1. REMOVE SUPERSEDED CSV CHECK
let supersededFile = path.join(dir, 'CSV_JSON_PACKAGING_CHECK.json');
let supersededPresent = fs.existsSync(supersededFile);
if (supersededPresent) {
    fs.unlinkSync(supersededFile);
}

// 2. MAKE DELTA_A RECONSTRUCTION AUDIT REAL
let csvText = fs.readFileSync(path.join(dir, 'PROFILE_BASELINE.csv'), 'utf8');
let jsonText = fs.readFileSync(path.join(dir, 'PROFILE_BASELINE.json'), 'utf8');
let jData = JSON.parse(jsonText);

let varAudit = JSON.parse(fs.readFileSync(path.join(dir, 'VARIANCE_AB_AUDIT.json'), 'utf8'));

// Extract OLD_a_A for each h
let oldA = {};
for (let row of varAudit.A) {
    if (row.profile === 'OLD') oldA[row.h] = row.a_A;
}

let maxDeltaAReconDiff = 0;
for (let j of jData) {
    let old_a_a = oldA[j.h];
    let recon_delta_a = j.a_A - old_a_a;
    let diff = Math.abs(recon_delta_a - j.delta_A);
    if (diff > maxDeltaAReconDiff) maxDeltaAReconDiff = diff;
}

// CSV/JSON Check
function parseCSV(text) {
    let result = [];
    let row = [];
    let inQuotes = false;
    let val = '';
    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        if (inQuotes) {
            if (c === '"') {
                if (i + 1 < text.length && text[i+1] === '"') { val += '"'; i++; } 
                else inQuotes = false;
            } else val += c;
        } else {
            if (c === '"') inQuotes = true;
            else if (c === ',') { row.push(val); val = ''; }
            else if (c === '\n' || c === '\r') {
                if (c === '\r' && i+1 < text.length && text[i+1] === '\n') i++;
                row.push(val); if (row.length > 0) result.push(row);
                row = []; val = '';
            } else val += c;
        }
    }
    if (val !== '' || text[text.length-1] === ',') row.push(val);
    if (row.length > 0) result.push(row);
    return result;
}

let parsedCSV = parseCSV(csvText.trim());
let headers = parsedCSV[0];
let dataRows = parsedCSV.slice(1);

let OUT2 = {};
OUT2.row_count = dataRows.length;
let csvMap = new Map();
let duplicate_keys = 0;
for (let r of dataRows) {
    let obj = {};
    for(let i=0; i<headers.length; i++) obj[headers[i]] = r[i];
    let key = `${obj.h},${obj.profile}`;
    if (csvMap.has(key)) duplicate_keys++;
    csvMap.set(key, obj);
}
let jsonMap = new Map();
for (let j of jData) {
    let key = `${j.h},${j.profile}`;
    if (jsonMap.has(key)) duplicate_keys++;
    jsonMap.set(key, j);
}
OUT2.duplicate_count = duplicate_keys;
let csvOnly = 0; for (let k of csvMap.keys()) if (!jsonMap.has(k)) csvOnly++;
OUT2.csv_only_keys = csvOnly;
let jsonOnly = 0; for (let k of jsonMap.keys()) if (!csvMap.has(k)) jsonOnly++;
OUT2.json_only_keys = jsonOnly;

let mismatches = 0;
let maxDiff = 0;
let undef = 0;
for (let k of csvMap.keys()) {
    if (jsonMap.has(k)) {
        let c = csvMap.get(k);
        let j = jsonMap.get(k);
        if (parseInt(c.h) !== j.h) mismatches++;
        if (c.profile !== j.profile) mismatches++;
        if ((c.is_most_balanced === 'true') !== j.is_most_balanced) mismatches++;
        let checkNum = (cv, jv) => {
            let diff = Math.abs(parseFloat(cv) - jv);
            if (diff > maxDiff) maxDiff = diff;
            if (diff > 1e-12) mismatches++;
        };
        checkNum(c.B, j.B);
        checkNum(c.q_v, j.q_v);
        checkNum(c.a_A, j.a_A);
        checkNum(c.a_B, j.a_B);
        checkNum(c.delta_A, j.delta_A);
        checkNum(c.delta_B, j.delta_B);
        
        for (let val of Object.values(c)) {
            if (val === 'undefined' || val === 'NaN' || val === 'Infinity') undef++;
        }
        for (let val of Object.values(j)) {
            if (val === undefined || Number.isNaN(val) || val === Infinity) undef++;
        }
    }
}
OUT2.field_mismatch_count = mismatches;
OUT2.max_numeric_difference = maxDiff;
OUT2.undefined_value_count = undef;
OUT2.max_delta_A_reconstruction_difference = maxDeltaAReconDiff;
let dPass = maxDeltaAReconDiff <= 1e-12;

OUT2.status = (OUT2.row_count === 15 && OUT2.duplicate_count === 0 &&
              OUT2.csv_only_keys === 0 && OUT2.json_only_keys === 0 &&
              OUT2.field_mismatch_count === 0 && OUT2.undefined_value_count === 0 && dPass) ? 'PASS' : 'FAIL';

fs.writeFileSync(path.join(dir, 'PROFILE_BASELINE_SCHEMA_AUDIT.json'), JSON.stringify(OUT2, null, 2));


// 3. MAKE SIGN CERTIFICATE CERTIFY THE ACTUAL CLAIM
let mb_total = 0, mb_pos_a = 0, mb_pos_b = 0, mb_z_a = 0, mb_z_b = 0, mb_neg_a = 0, mb_neg_b = 0;
let oth_total = 0, oth_pos_a = 0, oth_pos_b = 0, oth_z_a = 0, oth_z_b = 0, oth_neg_a = 0, oth_neg_b = 0;
let meth_agree = true;

for (let row of jData) {
    let sA = row.delta_A > 0 ? 1 : (row.delta_A < 0 ? -1 : 0);
    let sB = row.delta_B > 0 ? 1 : (row.delta_B < 0 ? -1 : 0);
    if (sA !== sB) meth_agree = false;
    
    if (row.is_most_balanced) {
        mb_total++;
        if (sA > 0) mb_pos_a++; else if (sA === 0) mb_z_a++; else mb_neg_a++;
        if (sB > 0) mb_pos_b++; else if (sB === 0) mb_z_b++; else mb_neg_b++;
    } else {
        oth_total++;
        if (sA > 0) oth_pos_a++; else if (sA === 0) oth_z_a++; else oth_neg_a++;
        if (sB > 0) oth_pos_b++; else if (sB === 0) oth_z_b++; else oth_neg_b++;
    }
}

let sign_status = (meth_agree &&
                   mb_pos_a === mb_total && mb_pos_b === mb_total &&
                   oth_neg_a === oth_total && oth_neg_b === oth_total &&
                   mb_z_a === 0 && mb_z_b === 0 && mb_neg_a === 0 && mb_neg_b === 0 &&
                   oth_pos_a === 0 && oth_pos_b === 0 && oth_z_a === 0 && oth_z_b === 0) ? 'PASS' : 'FAIL';

let OUT3 = {
    MOST_BALANCED_TOTAL: mb_total,
    MOST_BALANCED_POSITIVE_A: mb_pos_a,
    MOST_BALANCED_POSITIVE_B: mb_pos_b,
    MOST_BALANCED_ZERO_A: mb_z_a,
    MOST_BALANCED_ZERO_B: mb_z_b,
    MOST_BALANCED_NEGATIVE_A: mb_neg_a,
    MOST_BALANCED_NEGATIVE_B: mb_neg_b,
    OTHER_TOTAL: oth_total,
    OTHER_POSITIVE_A: oth_pos_a,
    OTHER_POSITIVE_B: oth_pos_b,
    OTHER_ZERO_A: oth_z_a,
    OTHER_ZERO_B: oth_z_b,
    OTHER_NEGATIVE_A: oth_neg_a,
    OTHER_NEGATIVE_B: oth_neg_b,
    METHOD_SIGN_AGREEMENT: meth_agree,
    SIGN_RULE_STATUS: sign_status
};
fs.writeFileSync(path.join(dir, 'PROFILE_SIGN_CERTIFICATE.json'), JSON.stringify(OUT3, null, 2));

console.log("SUPERSEDED_CSV_CHECK_PRESENT =", supersededPresent ? "YES" : "NO");
console.log("CANONICAL_ROW_COUNT =", OUT2.row_count);
console.log("MAX_DELTA_A_RECONSTRUCTION_DIFFERENCE =", maxDeltaAReconDiff);
console.log("DELTA_A_RECONSTRUCTION_STATUS =", dPass ? "PASS" : "FAIL");

console.log("MOST_BALANCED_TOTAL =", mb_total);
console.log("MOST_BALANCED_POSITIVE_A =", mb_pos_a);
console.log("MOST_BALANCED_POSITIVE_B =", mb_pos_b);
console.log("OTHER_TOTAL =", oth_total);
console.log("OTHER_NEGATIVE_A =", oth_neg_a);
console.log("OTHER_NEGATIVE_B =", oth_neg_b);
console.log("METHOD_SIGN_AGREEMENT =", meth_agree);
console.log("SIGN_RULE_STATUS =", sign_status);
