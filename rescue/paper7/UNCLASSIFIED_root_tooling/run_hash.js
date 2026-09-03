const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const outDir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_2_closure_audit/';
const files = fs.readdirSync(outDir).filter(f => fs.statSync(outDir+f).isFile());
files.sort();
let md = '# OUTPUT HASHES\n';
for(let f of files) {
  const buf = fs.readFileSync(outDir+f);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  md += `${hash}  ${f}\n`;
}
fs.writeFileSync(outDir + 'OUTPUT_HASHES.md', md);
console.log('Hashes generated.');
