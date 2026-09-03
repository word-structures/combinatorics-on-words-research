const fs = require('fs');
const path = require('path');
const dir = 'research/verification/profile-response-h2-h7-2026-08-25';

let csvText = fs.readFileSync(path.join(dir, 'PROFILE_BASELINE.csv'), 'utf8');
let jsonText = fs.readFileSync(path.join(dir, 'PROFILE_BASELINE.json'), 'utf8');

let lines = csvText.trim().split('\n');
console.log("CSV_HEADER =", lines[0]);
console.log("CSV_FIRST_DATA_ROW =", lines[1]);

let jData = JSON.parse(jsonText);
console.log("JSON_FIRST_ROW =", JSON.stringify(jData[0]));

// RFC4180 CSV parser
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
                result.push(row);
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
OUT.csv_row_count = dataRows.length;
OUT.json_row_count = jData.length;

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

OUT.duplicate_keys = duplicate_keys;

let csvOnly = 0;
for (let k of csvMap.keys()) if (!jsonMap.has(k)) csvOnly++;
OUT.only_in_csv = csvOnly;

let jsonOnly = 0;
for (let k of jsonMap.keys()) if (!csvMap.has(k)) jsonOnly++;
OUT.only_in_json = jsonOnly;

let mismatches = 0;
let maxDiff = 0;

for (let k of csvMap.keys()) {
    if (jsonMap.has(k)) {
        let c = csvMap.get(k);
        let j = jsonMap.get(k);
        
        let c_h = parseInt(c.h);
        if (c_h !== j.h) mismatches++;
        if (c.profile !== j.profile) mismatches++;
        
        let diffA = Math.abs(parseFloat(c.a_A) - j.a_A);
        if (diffA > maxDiff) maxDiff = diffA;
        if (diffA > 1e-12) mismatches++;
        
        let diffB = Math.abs(parseFloat(c.a_B) - j.a_B);
        if (diffB > maxDiff) maxDiff = diffB;
        if (diffB > 1e-12) mismatches++;
        
        let diffDA = Math.abs(parseFloat(c.delta_A) - j.delta_A);
        if (diffDA > maxDiff) maxDiff = diffDA;
        if (diffDA > 1e-12) mismatches++;
        
        if (c.delta_B !== '' && c.delta_B !== 'undefined' && j.delta_B !== undefined) {
            let diffDB = Math.abs(parseFloat(c.delta_B) - j.delta_B);
            if (diffDB > maxDiff) maxDiff = diffDB;
            if (diffDB > 1e-12) mismatches++;
        }
        
        let diffQ = Math.abs(parseFloat(c.q_v) - j.q_v);
        if (diffQ > maxDiff) maxDiff = diffQ;
        if (diffQ > 1e-12) mismatches++;
    }
}

OUT.field_mismatches = mismatches;
OUT.max_numeric_difference = maxDiff;

OUT.status = (OUT.csv_row_count === OUT.json_row_count &&
              OUT.duplicate_keys === 0 &&
              OUT.only_in_csv === 0 &&
              OUT.only_in_json === 0 &&
              OUT.field_mismatches === 0) ? 'PASS' : 'FAIL';

fs.writeFileSync(path.join(dir, 'CSV_JSON_PACKAGING_CHECK.json'), JSON.stringify(OUT, null, 2));

console.log("CSV_ROW_COUNT =", OUT.csv_row_count);
console.log("JSON_ROW_COUNT =", OUT.json_row_count);
console.log("CSV_JSON_DUPLICATE_COUNT =", OUT.duplicate_keys);
console.log("CSV_ONLY_KEY_COUNT =", OUT.only_in_csv);
console.log("JSON_ONLY_KEY_COUNT =", OUT.only_in_json);
console.log("CSV_JSON_FIELD_MISMATCH_COUNT =", OUT.field_mismatches);
console.log("CSV_JSON_MAX_NUMERIC_DIFFERENCE =", OUT.max_numeric_difference);
console.log("CSV_JSON_STATUS =", OUT.status);
