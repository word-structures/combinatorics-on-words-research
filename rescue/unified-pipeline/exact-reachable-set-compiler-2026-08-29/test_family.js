const fs = require('fs');
const { mapWindow } = require('./dynamic_topology_mapper.js');

let catalogueData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/claude-intake/_paper4-master-closure-2026-08-29/runs/sixdomain_full.json')).table;

let rowToClass = new Map();
for(let row of catalogueData) {
    let key = row.domain + "|" + row.roleMask;
    rowToClass.set(key, row.classId);
}

let compiledData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/compiled_sets.json'));

let wrong = 0;
let L = 5;

let K_vals = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let sourceRoles = ['a','b','a','c','a','b','a','c','b'];
let concreteBlocks = ["00012", "01122", "02222", "11111", "01010", "11100", "22211", "00220", "11221"];

for (let K of K_vals) {
    for (let u = 0; u < L; u++) {
        let m2 = Math.floor((u + 2 * K) / L);
        if (m2 >= sourceRoles.length) continue;
        
        let res = mapWindow({ L, start: u, K, sourceRoles, concreteBlocks, unresolvedRole: 'a' });
        
        let chiStr = res.chi.join('');
        let key = res.domain + "|" + chiStr;
        let expectedClass = rowToClass.get(key);
        if (expectedClass === undefined) continue;
        
        let sigStr = res.sigma.map(x => x.d + ':' + x.a).join('|');
        if (sigStr === "") sigStr = "0:0";
        
        let found = false;
        let cData = compiledData[L][expectedClass];
        if (!cData) continue;
        let rho = Object.keys(cData)[0];
        for(let s of cData[rho]) {
            if (s.signature === sigStr || (sigStr==="0:0" && s.signature==="")) found = true;
        }
        
        if (!found && sigStr !== "0:0") {
            wrong++;
        }
    }
}
let out = { wrong_family_assignments: wrong };
fs.writeFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/PHYSICAL_FAMILY_ASSIGNMENT_PARITY_2026-08-29.json', JSON.stringify(out, null, 2));
console.log("wrong_family_assignments = " + wrong);
