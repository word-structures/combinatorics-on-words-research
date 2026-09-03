const fs = require('fs');
const harvest = fs.readFileSync('scratch/claude-intake/negative_results/PAPER4_6_NEGATIVE_RESULTS_HARVEST_2026-08-31.md', 'utf8');

const regex = /## 5\.(\d+) ([^\n]+)\n([\s\S]*?)(?=## 5\.\d+ |$)/g;
let match;
while ((match = regex.exec(harvest)) !== null) {
    let id = match[1];
    let title = match[2];
    let content = match[3];
    console.log(`\n--- Candidate 5.${id}: ${title} ---`);
    console.log(content.substring(0, 300) + '...');
}
