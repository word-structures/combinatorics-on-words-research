const fs = require('fs');
let data = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/claude-intake/_paper4-master-closure-2026-08-29/runs/sixdomain_full.json')).table;

for(let row of data) {
    if (row.domain === "Pt") {
        console.log(`Pt mask: ${row.roleMask} shapes: ${row.shapeSpectrum.length}`);
    }
}
