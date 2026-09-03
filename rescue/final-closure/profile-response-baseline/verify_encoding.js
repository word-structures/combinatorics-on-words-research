const fs = require('fs');

const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25';
const files = fs.readdirSync(dir);
let failed = false;

for (const file of files) {
  if (file.endsWith('.js') || file.endsWith('.txt') || file.endsWith('.json') || file.endsWith('.csv') || file.endsWith('.md')) {
    const filename = dir + '/' + file;
    const buf = fs.readFileSync(filename);
    let hasNul = false, hasBel = false, hasControl = false;
    let validUTF8 = true;
    for (let i = 0; i < buf.length; i++) {
        const b = buf[i];
        if (b === 0x00) hasNul = true;
        if (b === 0x07) hasBel = true;
        if (b < 0x20 && b !== 0x0A && b !== 0x0D && b !== 0x09) hasControl = true;
    }
    try {
        const txt = buf.toString('utf8');
        if (txt.includes('\uFFFD')) validUTF8 = false;
    } catch (e) { validUTF8 = false; }
    if (!validUTF8 || hasNul || hasBel || hasControl) {
        console.error(`ERROR: Integrity check failed for ${filename}`);
        failed = true;
    }
  }
}
if (failed) process.exit(1);
console.log('ENCODING VERIFICATION PASSED.');
