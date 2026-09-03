const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const filesToHash = [
    'src/morphisms.js',
    'scratch/p7_27_fast_search.js',
    'scratch/p7_27R_auditor.js',
    'P7_27_CANDIDATE.json',
    'P7_27_LEFT_DEAD_SEED_RIGHT_INFINITY_PROGRAM.md',
    'P7_27R_MAIN_SEPARATION_AUDIT.md'
];

let manifest = {
    timestamp: new Date().toISOString(),
    files: {}
};

let sha256sums = "";

for (let file of filesToHash) {
    let fullPath = path.join(__dirname, '..', file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath);
        let hash = crypto.createHash('sha256').update(content).digest('hex');
        manifest.files[file] = {
            sha256: hash,
            size: content.length
        };
        sha256sums += `${hash}  ${file}\n`;
    } else {
        console.log(`Missing: ${fullPath}`);
    }
}

fs.writeFileSync('../P7_MAIN_THEOREM_FREEZE_MANIFEST.json', JSON.stringify(manifest, null, 2));
fs.writeFileSync('../P7_MAIN_THEOREM_SHA256SUMS.txt', sha256sums);
console.log("Freeze complete.");
