const fs = require('fs');
const path = require('path');
const dir = 'research/verification/profile-response-h2-h7-2026-08-25';
let allFiles = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile() && f !== 'EVIDENCE_MANIFEST.json' && f !== 'SHA256SUMS.txt');
let integrityFails = 0;
let badValueCount = 0;
for (let f of allFiles) {
    let buf = fs.readFileSync(path.join(dir, f));
    if (buf.includes(0x00) || buf.includes(0x07)) { integrityFails++; console.log("NUL/BEL in", f); }
    try {
        let txt = new TextDecoder('utf8', {fatal: true}).decode(buf);
        if (txt.includes('undefined') || txt.includes('NaN') || txt.includes('Infinity')) {
            if (f !== 'CAPSULE.md') {
                badValueCount++;
                console.log("Bad values (undefined/NaN/Infinity) in", f);
            }
        }
    } catch(e) { integrityFails++; console.log("UTF8 fail in", f); }
    if (f.endsWith('.json')) {
        try { JSON.parse(buf.toString('utf8')); }
        catch(e) { integrityFails++; console.log("JSON parse fail in", f); }
    }
}
console.log("integrityFails =", integrityFails, "badValueCount =", badValueCount);
