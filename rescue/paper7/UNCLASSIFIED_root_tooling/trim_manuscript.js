const fs = require('fs');
const file = 'papers/paper4/manuscript/PAPER4_PREPRINT_v1.1_2026-08-29.md';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/[ \t]+\r?\n/g, '\n');
fs.writeFileSync(file, content);
