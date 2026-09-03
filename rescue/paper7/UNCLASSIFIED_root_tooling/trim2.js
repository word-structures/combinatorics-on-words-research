const fs = require('fs');
let txt = fs.readFileSync('papers/paper4/README.md', 'utf8');
txt = txt.replace(/ \r?\n/g, '\n');
fs.writeFileSync('papers/paper4/README.md', txt);

let json = fs.readFileSync('papers/paper4/reproducibility/PAPER4_REPRODUCIBILITY_MANIFEST_2026-08-29.json', 'utf8');
json = json.replace(/\n+$/, '\n');
fs.writeFileSync('papers/paper4/reproducibility/PAPER4_REPRODUCIBILITY_MANIFEST_2026-08-29.json', json);
