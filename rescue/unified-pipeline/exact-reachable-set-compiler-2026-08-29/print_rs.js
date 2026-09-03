const fs = require('fs');
let compiledData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/compiled_sets.json'));
let rs = compiledData["5"]["12"]["2,1,2"].find(s => s.signature === "2:1|4:1").reachable;
console.log(rs);
