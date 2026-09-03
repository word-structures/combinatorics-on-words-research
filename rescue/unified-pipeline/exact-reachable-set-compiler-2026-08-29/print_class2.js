const fs = require('fs');
let compiledData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/compiled_sets.json'));
let Ldata = compiledData["5"]["2"];
let rho = Object.keys(Ldata)[0];
let sigs = Ldata[rho].map(x => x.signature);
console.log(sigs);
