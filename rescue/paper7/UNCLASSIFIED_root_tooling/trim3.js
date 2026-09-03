const fs = require('fs');
const file = 'papers/paper4/reproducibility/PAPER4_REPRODUCIBILITY_SHA256SUMS_2026-08-29.txt';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/[ \t]+\r?\n/g, '\n').replace(/\r\n/g, '\n');
fs.writeFileSync(file, content);
