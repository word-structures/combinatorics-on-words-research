const fs = require('fs');

const proportional = JSON.parse(fs.readFileSync('scratch/claude-intake/paper6/proportional_relations.json', 'utf8'));

let shift_cases = [];
for (let r of proportional) {
    if (r.depLabel.includes('None') || r.pivLabel.includes('None')) continue;
    
    // Parse
    let depP = r.depLabel.split('), (').map(s => s.replace(/[\(\)]/g, '').split(', ').map(Number));
    let pivP = r.pivLabel.split('), (').map(s => s.replace(/[\(\)]/g, '').split(', ').map(Number));

    shift_cases.push({ depP, pivP });
}

let identical_at_4 = 0;
let identical_at_3 = 0;
let identical_at_2 = 0;
let identical_at_1 = 0;

for (let c of shift_cases) {
    let match4 = c.depP[3].join(',') === c.pivP[3].join(',');
    let match3 = c.depP[2].join(',') === c.pivP[2].join(',');
    let match2 = c.depP[1].join(',') === c.pivP[1].join(',');
    let match1 = c.depP[0].join(',') === c.pivP[0].join(',');

    if (match4) identical_at_4++;
    if (match3) identical_at_3++;
    if (match2) identical_at_2++;
    if (match1) identical_at_1++;
}

console.log(`Out of ${shift_cases.length}:`);
console.log(`Identical at Step 4: ${identical_at_4}`);
console.log(`Identical at Step 3: ${identical_at_3}`);
console.log(`Identical at Step 2: ${identical_at_2}`);
console.log(`Identical at Step 1: ${identical_at_1}`);

