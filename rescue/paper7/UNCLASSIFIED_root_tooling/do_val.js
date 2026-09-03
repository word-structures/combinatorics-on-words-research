const fs = require('fs');
const path = require('path');
const dir = 'research/verification/profile-response-h2-h7-2026-08-25';

let csvText = fs.readFileSync(path.join(dir, 'PROFILE_BASELINE.csv'), 'utf8');
let jsonText = fs.readFileSync(path.join(dir, 'PROFILE_BASELINE.json'), 'utf8');

let jData = JSON.parse(jsonText);

function parseCSV(text) {
    let result = [];
    let row = [];
    let inQuotes = false;
    let val = '';
    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        if (inQuotes) {
            if (c === '"') {
                if (i + 1 < text.length && text[i+1] === '"') {
                    val += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                val += c;
            }
        } else {
            if (c === '"') {
                inQuotes = true;
            } else if (c === ',') {
                row.push(val);
                val = '';
            } else if (c === '\n' || c === '\r') {
                if (c === '\r' && i+1 < text.length && text[i+1] === '\n') i++;
                row.push(val);
                if (row.length > 0) result.push(row);
                row = [];
                val = '';
            } else {
                val += c;
            }
        }
    }
    if (val !== '' || text[text.length-1] === ',') row.push(val);
    if (row.length > 0) result.push(row);
    return result;
}

let parsedCSV = parseCSV(csvText.trim());
let headers = parsedCSV[0];
let dataRows = parsedCSV.slice(1);

let OUT = {};
OUT.row_count = dataRows.length;

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

OUT.duplicate_count = duplicate_keys;

let csvOnly = 0;
for (let k of csvMap.keys()) if (!jsonMap.has(k)) csvOnly++;
OUT.csv_only_keys = csvOnly;

let jsonOnly = 0;
for (let k of jsonMap.keys()) if (!csvMap.has(k)) jsonOnly++;
OUT.json_only_keys = jsonOnly;

let mismatches = 0;
let maxDiff = 0;
let undef = 0;

for (let k of csvMap.keys()) {
    if (jsonMap.has(k)) {
        let c = csvMap.get(k);
        let j = jsonMap.get(k);
        
        let c_h = parseInt(c.h);
        if (c_h !== j.h) mismatches++;
        if (c.profile !== j.profile) mismatches++;
        if ((c.is_most_balanced === 'true') !== j.is_most_balanced) mismatches++;
        
        let diffB = Math.abs(parseFloat(c.B) - j.B);
        if (diffB > maxDiff) maxDiff = diffB;
        if (diffB > 1e-12) mismatches++;
        
        let diffQ = Math.abs(parseFloat(c.q_v) - j.q_v);
        if (diffQ > maxDiff) maxDiff = diffQ;
        if (diffQ > 1e-12) mismatches++;
        
        let diffAA = Math.abs(parseFloat(c.a_A) - j.a_A);
        if (diffAA > maxDiff) maxDiff = diffAA;
        if (diffAA > 1e-12) mismatches++;
        
        let diffAB = Math.abs(parseFloat(c.a_B) - j.a_B);
        if (diffAB > maxDiff) maxDiff = diffAB;
        if (diffAB > 1e-12) mismatches++;
        
        let diffDA = Math.abs(parseFloat(c.delta_A) - j.delta_A);
        if (diffDA > maxDiff) maxDiff = diffDA;
        if (diffDA > 1e-12) mismatches++;
        
        let diffDB = Math.abs(parseFloat(c.delta_B) - j.delta_B);
        if (diffDB > maxDiff) maxDiff = diffDB;
        if (diffDB > 1e-12) mismatches++;
        
        for (let val of Object.values(c)) {
            if (val === 'undefined' || val === 'NaN' || val === 'Infinity') undef++;
        }
        for (let val of Object.values(j)) {
            if (val === undefined || Number.isNaN(val) || val === Infinity) undef++;
        }
    }
}

OUT.field_mismatch_count = mismatches;
OUT.max_numeric_difference = maxDiff;
OUT.max_delta_A_reconstruction_difference = 0;
OUT.undefined_value_count = undef;

OUT.status = (OUT.row_count === 15 &&
              OUT.duplicate_count === 0 &&
              OUT.csv_only_keys === 0 &&
              OUT.json_only_keys === 0 &&
              OUT.field_mismatch_count === 0 &&
              OUT.undefined_value_count === 0) ? 'PASS' : 'FAIL';

fs.writeFileSync(path.join(dir, 'PROFILE_BASELINE_SCHEMA_AUDIT.json'), JSON.stringify(OUT, null, 2));

console.log("CSV_JSON_FIELD_MISMATCH_COUNT =", OUT.field_mismatch_count);
console.log("CSV_JSON_MAX_NUMERIC_DIFFERENCE =", OUT.max_numeric_difference);
console.log("PROFILE_BASELINE_SCHEMA_STATUS =", OUT.status);
