const fs = require('fs');
const word = fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/aa2f25379.txt', 'utf8').trim();
let unique = new Set();
let total = Math.floor(word.length / 40);
for(let i=0; i<total; i++) {
    unique.add(word.substring(i*40, (i+1)*40));
}
console.log(`L=40: ${unique.size} unique blocks out of ${total} total blocks. Ratio: ${(unique.size/total).toFixed(3)}`);
