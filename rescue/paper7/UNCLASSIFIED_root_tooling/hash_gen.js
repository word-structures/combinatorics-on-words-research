const crypto = require('crypto');
const fs = require('fs');

const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25';
const files = fs.readdirSync(dir);
let hashOut = '';
for(let file of files) {
  if (fs.statSync(dir + '/' + file).isFile()) {
    const buf = fs.readFileSync(dir + '/' + file);
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    hashOut += `${hash}  ${file}\n`;
  }
}
fs.writeFileSync(dir + '/SHA256SUMS.txt', hashOut);
