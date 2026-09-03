const fs = require('fs');
const path = require('path');
const dir = 'research/verification/profile-response-h2-h7-2026-08-25';
let OUT_A = {};
let OUT_B = {};
function readJ(f) { return JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); }

let baseline = readJ('PROFILE_BASELINE.json');
let csvText = fs.readFileSync(path.join(dir, 'PROFILE_BASELINE.csv'), 'utf8');
let csvRows = csvText.trim().split('\n').slice(1);
OUT_A.CSV_ROW_COUNT = csvRows.length;
OUT_A.JSON_ROW_COUNT = baseline.length;
let statusA = csvRows.length === baseline.length ? 'PASS' : 'FAIL';

for (let i = 0; i < csvRows.length; i++) {
    let r = csvRows[i].replace(/"/g, '').split(',');
    let j = baseline[i];
    if (parseInt(r[0]) !== j.h) statusA = 'FAIL';
    if (r[1] !== j.profile) statusA = 'FAIL';
    if (Math.abs(parseFloat(r[2]) - j.a_A) > 1e-12) statusA = 'FAIL';
    if (Math.abs(parseFloat(r[3]) - j.a_B) > 1e-12) statusA = 'FAIL';
    if (Math.abs(parseFloat(r[4]) - j.delta_A) > 1e-12) statusA = 'FAIL';
    if (r[5] !== '' && r[5] !== 'undefined' && j.delta_B !== undefined && Math.abs(parseFloat(r[5]) - j.delta_B) > 1e-12) statusA = 'FAIL';
    if (Math.abs(parseFloat(r[7]) - j.q_v) > 1e-12) statusA = 'FAIL';
}
OUT_A.CSV_JSON_STATUS = statusA;
fs.writeFileSync(path.join(dir, 'CSV_JSON_PACKAGING_CHECK.json'), JSON.stringify(OUT_A, null, 2));

let statusB = 'PASS';
let files = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile());
for(let f of files) {
    if(f === 'CSV_JSON_PACKAGING_CHECK.json' || f === 'FILE_INTEGRITY_PACKAGING_CHECK.json') continue;
    let buf = fs.readFileSync(path.join(dir, f));
    if(buf.includes(0x00) || buf.includes(0x07)) { statusB = 'FAIL'; console.log("NUL/BEL in", f); }
    try {
        new TextDecoder('utf8', {fatal: true}).decode(buf);
    } catch(e) { statusB = 'FAIL'; console.log("UTF8 fail in", f); }
    if(f.endsWith('.json')) {
        try { JSON.parse(buf.toString('utf8')); }
        catch(e) { statusB = 'FAIL'; console.log("JSON parse fail in", f); }
    }
}
OUT_B.FILE_INTEGRITY_STATUS = statusB;
fs.writeFileSync(path.join(dir, 'FILE_INTEGRITY_PACKAGING_CHECK.json'), JSON.stringify(OUT_B, null, 2));
console.log("Packaging checks A & B done.");
