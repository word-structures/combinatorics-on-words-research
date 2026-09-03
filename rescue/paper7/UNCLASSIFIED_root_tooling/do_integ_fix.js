const fs = require('fs');
const path = require('path');
const dir = 'research/verification/profile-response-h2-h7-2026-08-25';
let allFiles = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile() && f !== 'EVIDENCE_MANIFEST.json' && f !== 'SHA256SUMS.txt');
let integrityFails = 0;
let badValueCount = 0;
for (let f of allFiles) {
    let buf = fs.readFileSync(path.join(dir, f));
    if (buf.includes(0x00) || buf.includes(0x07)) { integrityFails++; }
    try {
        let txt = new TextDecoder('utf8', {fatal: true}).decode(buf);
        // Only check scientific data artifacts
        if (f === 'PROFILE_BASELINE.json' || f === 'PROFILE_BASELINE.csv') {
            if (txt.includes('undefined') || txt.includes('NaN') || txt.includes('Infinity')) {
                badValueCount++;
            }
        }
    } catch(e) { integrityFails++; }
    if (f.endsWith('.json')) {
        try { JSON.parse(buf.toString('utf8')); }
        catch(e) { integrityFails++; }
    }
}
let integStatus = (integrityFails === 0 && badValueCount === 0) ? 'PASS' : 'FAIL';
let pCheck = JSON.parse(fs.readFileSync(path.join(dir, 'FILE_INTEGRITY_PACKAGING_CHECK.json'), 'utf8'));
pCheck.FILE_INTEGRITY_STATUS = integStatus;
pCheck.BAD_VALUE_COUNT = badValueCount;
fs.writeFileSync(path.join(dir, 'FILE_INTEGRITY_PACKAGING_CHECK.json'), JSON.stringify(pCheck, null, 2));

console.log("FILE_INTEGRITY_STATUS =", integStatus);
