const fs = require('fs');
const { mapWindow, getParikh } = require('./dynamic_topology_mapper.js');
const compiledData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/compiled_sets.json'));

let L = 5;
let K_vals = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let sourceRoles = ['a','b','a','c','a','b','a','c','b'];
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

for (let K of K_vals) {
    for (let u = 0; u < L; u++) {
        let m2 = Math.floor((u + 2 * K) / L);
        if (m2 >= sourceRoles.length) continue;
        
        let res = mapWindow({ L, start: u, K, sourceRoles, concreteBlocks, unresolvedRole });
        
        let chiStr = res.chi.join('');
        let cid = rowToClass.get(res.domain + "|" + chiStr);
        let sigStr = res.sigma.map(x => x.d + ':' + x.a).join('|');
        if (sigStr === "") sigStr = "0:0";
        
        let inReachableSet = false;
        
        if (cid !== undefined && Ldata[cid]) {
            let rhoKey = rho.join(',');
            let sigList = Ldata[cid][rhoKey];
            let rs = null;
            if (sigList) {
                for (let s of sigList) {
                    if (s.signature === sigStr || (sigStr === "0:0" && s.signature === "")) {
                        rs = s.reachable;
                        break;
                    }
                }
            }
            if (rs) {
                let minusTStr = res.t.join(',');
                if (rs.includes(minusTStr)) inReachableSet = true;
            }
        }
        
        let Paper4SafeElision = !inReachableSet;
        
        let anySquareExists = false;
        let squareWitness = "";
        for (let word of allUnresolvedWords) {
            let testBlocks = [...concreteBlocks];
            for (let i = 0; i < sourceRoles.length; i++) {
                if (sourceRoles[i] === unresolvedRole) testBlocks[i] = word;
            }
            
            let fullStr = testBlocks.join('');
            let left = fullStr.substring(u, u + K);
            let right = fullStr.substring(u + K, u + 2 * K);
            let pL = getParikh(left);
            let pR = getParikh(right);
            
            if (pL[0] === pR[0] && pL[1] === pR[1] && pL[2] === pR[2]) {
                anySquareExists = true;
                squareWitness = word;
                break;
            }
        }
        
        if (Paper4SafeElision && anySquareExists) {
            console.log(`FALSE SAFE! u=${u}, K=${K}`);
            console.log(`Mapper Output: domain=${res.domain}, chi=${chiStr}, sig=${sigStr}`);
            console.log(`Target -t: ${res.t}`);
            console.log(`Witness word: ${squareWitness}`);
            
            // Recompute literal Delta for the witness
            let testBlocks = [...concreteBlocks];
            for (let i = 0; i < sourceRoles.length; i++) {
                if (sourceRoles[i] === unresolvedRole) testBlocks[i] = squareWitness;
            }
            let fullStr = testBlocks.join('');
            let pL = getParikh(fullStr.substring(u, u + K));
            let pR = getParikh(fullStr.substring(u + K, u + 2 * K));
            let Delta = [pR[0]-pL[0], pR[1]-pL[1], pR[2]-pL[2]];
            console.log(`Literal Delta (pR - pL): ${Delta}`);
            
            // Recompute the Sigma(X) for this witness
            let m1 = Math.floor((u + K) / L);
            let v = (u + K) % L;
            let w = (u + 2 * K) % L;
            let p_u = getParikh(testBlocks[0].substring(0, u));
            let p_v = getParikh(testBlocks[m1].substring(0, v));
            let p_w = getParikh(testBlocks[m2].substring(0, w));
            console.log(`p_u=${p_u}, p_v=${p_v}, p_w=${p_w}`);
        }
    }
}
