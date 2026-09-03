const fs = require('fs');
const { mapWindow, getParikh } = require('./dynamic_topology_mapper.js');
const compiledData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/compiled_sets.json'));

let total_queries = 0;
let true_safe_elisions = 0;
let danger_zone_queries = 0;
let false_safe_elisions = 0;
let witnessed_negatives = 0;

let L = 5;
let K_vals = []; for(let i=10; i<=25; i++) K_vals.push(i);
let sourceRolesPool = [
    ['a','b','a','c','a','b','a','c','b'],
    ['a','a','b','c','c','a','b','a','a'],
    ['b','a','c','b','a','a','c','a','b'],
    ['a','b','c','a','b','c','a','b','c'],
    ['c','a','a','b','b','a','c','a','b'],
    ['b','b','a','a','c','c','a','a','b']
];
let concreteBlocks = ["00012", "01122", "02222", "11111", "01010", "11100", "22211", "00220", "11221"];
let unresolvedRole = 'a';
let rho = [2, 1, 2];

let Ldata = compiledData[L];
let rowToClass = new Map();
let catalogueData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/claude-intake/_paper4-master-closure-2026-08-29/runs/sixdomain_full.json')).table;
for(let row of catalogueData) {
    rowToClass.set(row.domain + "|" + row.roleMask, row.classId);
}

function generateWords(rho) {
    let words = [];
    let chars = "";
    for(let i=0; i<3; i++) chars += i.toString().repeat(rho[i]);
    function permute(str, l, r) {
        if (l === r) words.push(str);
        else {
            let used = new Set();
            for (let i = l; i <= r; i++) {
                if (used.has(str[i])) continue;
                used.add(str[i]);
                let arr = str.split('');
                let temp = arr[l]; arr[l] = arr[i]; arr[i] = temp;
                permute(arr.join(''), l + 1, r);
            }
        }
    }
    permute(chars, 0, chars.length - 1);
    return words;
}
let allUnresolvedWords = generateWords(rho);

for(let sourceRoles of sourceRolesPool) {
    for (let K of K_vals) {
        for (let u = 0; u < L; u++) {
            let m2 = Math.floor((u + 2 * K) / L);
            if (m2 >= sourceRoles.length) continue;
            
            let res = mapWindow({ L, start: u, K, sourceRoles, concreteBlocks, unresolvedRole, rho });
            total_queries++;
            
            let chiStr = res.chi.join('');
            let cid = rowToClass.get(res.domain + "|" + chiStr);
            let sigStr = res.sigma.map(x => x.d + ':' + x.a).join('|');
            if (sigStr === "") sigStr = "0:0";
            
            let inReachableSet = false;
            if (cid !== undefined && Ldata[cid]) {
                let rhoKey = rho.join(',');
                let sigList = Ldata[cid][rhoKey];
                if (sigList) {
                    for (let s of sigList) {
                        if (s.signature === sigStr || (sigStr === "0:0" && s.signature === "")) {
                            let minusTStr = res.t.map(x => -x).join(',');
                            if (s.reachable.includes(minusTStr)) inReachableSet = true;
                            break;
                        }
                    }
                }
            }
            
            let Paper4SafeElision = !inReachableSet;
            
            let anySquareExists = false;
            for (let word of allUnresolvedWords) {
                let testBlocks = [...concreteBlocks];
                for (let i = 0; i < sourceRoles.length; i++) {
                    if (sourceRoles[i] === unresolvedRole) testBlocks[i] = word;
                }
                let fullStr = testBlocks.join('');
                let pL = getParikh(fullStr.substring(u, u + K));
                let pR = getParikh(fullStr.substring(u + K, u + 2 * K));
                if (pL[0] === pR[0] && pL[1] === pR[1] && pL[2] === pR[2]) {
                    anySquareExists = true;
                    break;
                }
            }
            
            if (!Paper4SafeElision) danger_zone_queries++;
            
            if (Paper4SafeElision && anySquareExists) false_safe_elisions++;
            if (!Paper4SafeElision && !anySquareExists) witnessed_negatives++;
            if (Paper4SafeElision && !anySquareExists) true_safe_elisions++;
        }
    }
}

let out = {
    false_safe_elisions,
    true_safe_elisions,
    danger_zone_queries,
    total_queries,
    witnessed_negatives_control: witnessed_negatives
};
fs.writeFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/END_TO_END_SAFE_ELISION_PARITY_2026-08-29.json', JSON.stringify(out, null, 2));
console.log(out);
