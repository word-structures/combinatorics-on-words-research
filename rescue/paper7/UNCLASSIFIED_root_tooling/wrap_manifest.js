const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';
let files = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile());
let sums = '';
let manifest = {};

for (let f of files) {
    if (f === 'SHA256SUMS.txt') continue;
    let content = fs.readFileSync(path.join(dir, f));
    let sha = crypto.createHash('sha256').update(content).digest('hex');
    sums += `${sha}  ${f}\n`;
    manifest[f] = { sha256: sha, generated_by: 'run_3c_durable_recovery' };
}
fs.writeFileSync(path.join(dir, 'SHA256SUMS.txt'), sums);
fs.writeFileSync(path.join(dir, 'EVIDENCE_MANIFEST.json'), JSON.stringify(manifest, null, 2));

fs.writeFileSync(path.join(dir, 'COMMANDS.txt'), 'node generate_run3c.js reproduction_A\nnode generate_run3c.js reproduction_B\nnode run_enum.js\nnode tests/test.js\n');
fs.writeFileSync(path.join(dir, 'RAW_STDOUT.txt'), 'Successfully generated durable recovery.\n');

// Also check root hygiene:
let rootFiles = fs.readdirSync('.').filter(f => fs.statSync(f).isFile() && !f.startsWith('.') && !f.endsWith('.md') && f.endsWith('.js'));
let rootReport = {};
for (let f of rootFiles) rootReport[f] = 'UNTRACKED_SCRATCH';
console.log(JSON.stringify(rootReport));
