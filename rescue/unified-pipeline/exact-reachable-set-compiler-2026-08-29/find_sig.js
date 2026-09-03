const fs = require('fs');
let compiledData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/compiled_sets.json'));

let targetSig = "1:-2|2:1";
let Ldata = compiledData["5"];

for (let cid in Ldata) {
    let rho = Object.keys(Ldata[cid])[0];
    for (let s of Ldata[cid][rho]) {
        if (s.signature === targetSig) {
            console.log("Found in class: " + cid);
        }
    }
}
