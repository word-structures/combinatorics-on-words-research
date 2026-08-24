const fs = require('fs');
const path = require('path');

const files = [
    path.join(__dirname, '../../../docs/research/H7_OUTCOME_2026-08-24.md'),
    path.join(__dirname, '../../../docs/research/H7_PROFILE_RESPONSE_EXPLORATORY_2026-08-24.md')
];

let failed = false;

function checkFile(filename) {
    const buf = fs.readFileSync(filename);
    let hasNul = false;
    let hasBel = false;
    let hasControl = false;
    let validUTF8 = true;
    
    // Check for controls
    for (let i = 0; i < buf.length; i++) {
        const b = buf[i];
        if (b === 0x00) hasNul = true;
        if (b === 0x07) hasBel = true;
        if (b < 0x20 && b !== 0x0A && b !== 0x0D && b !== 0x09) hasControl = true;
    }
    
    // Check UTF-8 validity
    try {
        const txt = buf.toString('utf8');
        if (txt.includes('\uFFFD')) {
            validUTF8 = false; // replacement character indicates invalid UTF-8
        }
    } catch (e) {
        validUTF8 = false;
    }
    
    console.log(`Checking ${filename}...`);
    console.log(`  Valid UTF-8: ${validUTF8}`);
    console.log(`  NUL bytes: ${hasNul}`);
    console.log(`  BEL bytes: ${hasBel}`);
    console.log(`  Other C0 controls: ${hasControl}`);
    
    if (!validUTF8 || hasNul || hasBel || hasControl) {
        console.error(`ERROR: Integrity check failed for ${filename}`);
        failed = true;
    }
}

for (const file of files) {
    checkFile(file);
}

if (failed) {
    process.exit(1);
} else {
    console.log('ENCODING VERIFICATION PASSED.');
}