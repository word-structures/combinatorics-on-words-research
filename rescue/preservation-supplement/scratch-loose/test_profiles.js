const fs = require('fs');

const lines = fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/claude-intake/_paper4-next-version-sandbox/runs/afexBIG_H/af_positive.jsonl', 'utf8')
    .split('\n')
    .filter(x => x.trim() !== '')
    .map(JSON.parse);

let profiles = {};
for (let obj of lines) {
    let counts = {a:0, b:0, c:0};
    for(let ch of obj.A) counts[ch]++;
    let key = `${counts.a},${counts.b},${counts.c}`;
    profiles[key] = (profiles[key] || 0) + 1;
}

console.log(profiles);
