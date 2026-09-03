const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      files.push(name);
    }
  }
  return files;
}

const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_1_repaired';
const allFiles = getFiles(dir).filter(f => !f.endsWith('SHA256SUMS.txt'));
let hashOut = '';
for(let file of allFiles) {
  const buf = fs.readFileSync(file);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  const rel = path.relative(dir, file).replace(/\\/g, '/');
  hashOut += `${hash}  ${rel}\n`;
}
fs.writeFileSync(dir + '/SHA256SUMS.txt', hashOut);
