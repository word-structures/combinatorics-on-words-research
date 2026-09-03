const fs = require('fs');
const { mapWindow, getParikh } = require('./dynamic_topology_mapper.js');
const compiledData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/compiled_sets.json'));

let L = 5;
let Ldata = compiledData[L];
let catalogueData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/claude-intake/_paper4-master-closure-2026-08-29/runs/sixdomain_full.json')).table;
let rowToClass = new Map();
for(let row of catalogueData) { rowToClass.set(row.domain + "|" + row.roleMask, row.classId); }

let rho = [2, 1, 2];
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
let max_prefix = 5; // For L=5, max prefix sum is L=5 for each character. Actually max character count in a block is L=5.

let stats = {
    total_windows: 0,
    solution_set_mismatches: 0,
    layer_A_total_squares: 0,
    layer_B_total_squares: 0,
    layer_C_elided_windows: 0,
    layer_C_false_safes: 0,
    layer_D_elided_windows: 0,
    layer_D_false_safes: 0,
    windows_with_squares: 0
};

let start_time = Date.now();

for(let sourceRoles of sourceRolesPool) {
    for (let K = 10; K <= 25; K++) {
        for (let u = 0; u < L; u++) {
            let m2 = Math.floor((u + 2 * K) / L);
            if (m2 >= sourceRoles.length) continue;
            
            stats.total_windows++;
            
            // LAYER A: Literal Brute-Force
            let layerA_solutions = [];
            for (let word of allUnresolvedWords) {
                let testBlocks = [...concreteBlocks];
                for (let i = 0; i < sourceRoles.length; i++) {
                    if (sourceRoles[i] === unresolvedRole) testBlocks[i] = word;
                }
                let fullStr = testBlocks.join('');
                let pL = getParikh(fullStr.substring(u, u + K));
                let pR = getParikh(fullStr.substring(u + K, u + 2 * K));
                if (pL[0] === pR[0] && pL[1] === pR[1] && pL[2] === pR[2]) {
                    layerA_solutions.push(word);
                }
            }
            
            // LAYER B: Source-Aware
            let layerB_solutions = [];
            // We can implement source-aware algebraically.
            // Left Parikh = Prefix(u) + Sum of full blocks + Prefix(v) etc.
            // Since mapWindow already computes t and abstract sigma, we can just evaluate it!
            let res = mapWindow({ L, start: u, K, sourceRoles, concreteBlocks, unresolvedRole, rho });
            for (let word of allUnresolvedWords) {
                let sig_eval = [0,0,0];
                for(let term of res.sigma) {
                    let p = getParikh(word.substring(0, term.d));
                    for(let i=0; i<3; i++) sig_eval[i] += term.a * p[i];
                }
                if (res.t[0] + sig_eval[0] === 0 && res.t[1] + sig_eval[1] === 0 && res.t[2] + sig_eval[2] === 0) {
                    layerB_solutions.push(word);
                }
            }
            
            // LAYER C: Block-Aligned Gate (Component-wise bound)
            let layerC_safe = false;
            // Abstract sigma has maximum absolute bound. 
            // The maximum prefix contribution from any single boundary is L.
            // sum(abs(a)) across sigma terms gives the maximum multiple of L.
            let max_sigma_bound = [0,0,0];
            for(let term of res.sigma) {
                for(let i=0; i<3; i++) max_sigma_bound[i] += Math.abs(term.a) * L; // worst case
            }
            if (Math.abs(res.t[0]) > max_sigma_bound[0] || Math.abs(res.t[1]) > max_sigma_bound[1] || Math.abs(res.t[2]) > max_sigma_bound[2]) {
                layerC_safe = true;
            }
            
            // LAYER D: Paper-4 Reachable-Set Gate
            let layerD_safe = false;
            let chiStr = res.chi.join('');
            let cid = rowToClass.get(res.domain + "|" + chiStr);
            if (cid !== undefined && Ldata[cid]) {
                let rhoKey = rho.join(',');
                let sigList = Ldata[cid][rhoKey];
                let rs = null;
                if (sigList) {
                    for (let s of sigList) {
                        let sigStr = res.sigma.map(x => x.d + ':' + x.a).join('|');
                        if (sigStr === "") sigStr = "0:0";
                        if (s.signature === sigStr || (sigStr === "0:0" && s.signature === "")) {
                            rs = s.reachable;
                            break;
                        }
                    }
                }
                if (rs) {
                    let minusTStr = res.t.map(x => -x).join(',');
                    if (!rs.includes(minusTStr)) {
                        layerD_safe = true;
                    }
                }
            }
            
            // VERIFICATION
            let A_str = layerA_solutions.join(',');
            let B_str = layerB_solutions.join(',');
            if (A_str !== B_str) stats.solution_set_mismatches++;
            
            stats.layer_A_total_squares += layerA_solutions.length;
            stats.layer_B_total_squares += layerB_solutions.length;
            
            if (layerA_solutions.length > 0) stats.windows_with_squares++;
            
            if (layerC_safe) stats.layer_C_elided_windows++;
            if (layerC_safe && layerA_solutions.length > 0) stats.layer_C_false_safes++;
            
            if (layerD_safe) stats.layer_D_elided_windows++;
            if (layerD_safe && layerA_solutions.length > 0) stats.layer_D_false_safes++;
        }
    }
}

let end_time = Date.now();
stats.execution_time_ms = end_time - start_time;

console.log(JSON.stringify(stats, null, 2));
fs.writeFileSync('A_B_C_D_MICROBENCHMARK_2026-08-29.json', JSON.stringify(stats, null, 2));
