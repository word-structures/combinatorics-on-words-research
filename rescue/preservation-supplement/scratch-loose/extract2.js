const fs = require('fs');
const contentPath = 'C:/Users/jvker/.gemini/antigravity/brain/f9632126-720d-4e1f-b68d-df2070f67e9d/.system_generated/steps/21635/content.md';
const text = fs.readFileSync(contentPath, 'utf8');
const words = text.match(/[abc]{1000,}/g);

let word15796 = words.find(w => w.length === 15796);
if (word15796) {
    fs.writeFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/aa2f15796.txt", word15796);
    console.log("Saved aa2f15796.txt");
}
let word25379 = words.find(w => w.length === 25379);
if (word25379) {
    fs.writeFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/aa2f25379.txt", word25379);
    console.log("Saved aa2f25379.txt");
}
