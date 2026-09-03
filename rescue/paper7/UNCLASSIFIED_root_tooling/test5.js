const fs = require('fs');
const proportional = JSON.parse(fs.readFileSync('scratch/claude-intake/paper6/proportional_relations.json', 'utf8'));

let patterns = {};
for (let r of proportional) {
    if (r.depLabel.includes('None') || r.pivLabel.includes('None')) continue;
    let depP = r.depLabel.split('), (').map(s => s.replace(/[\(\)]/g, '').split(', ').map(Number));
    let pivP = r.pivLabel.split('), (').map(s => s.replace(/[\(\)]/g, '').split(', ').map(Number));

    let diffs = [];
    for(let i=0; i<4; i++) {
        let d = [depP[i][0]-pivP[i][0], depP[i][1]-pivP[i][1], depP[i][2]-pivP[i][2]];
        diffs.push(`(${d.join(',')})`);
    }
    let sig = diffs.join(' -> ');
    patterns[sig] = (patterns[sig] || 0) + 1;
}

let sorted = Object.entries(patterns).sort((a,b) => b[1] - a[1]);
for(let i=0; i<15; i++) {
    if(sorted[i]) console.log(sorted[i][1], "times:", sorted[i][0]);
}
