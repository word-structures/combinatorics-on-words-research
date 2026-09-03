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
        
        let res = mapWindow({ L, start: u, K, sourceRoles, concreteBlocks, unresolvedRole, rho });
        let chiStr = res.chi.join('');
        let cid = rowToClass.get(res.domain + "|" + chiStr);
        let sigStr = res.sigma.map(x => x.d + ':' + x.a).join('|');
        if (sigStr === "") sigStr = "0:0";
        
        let inReachableSet = false;
        let rs = null;
        if (cid !== undefined && Ldata[cid]) {
            let rhoKey = rho.join(',');
            let sigList = Ldata[cid][rhoKey];
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
        
        let anySquareExists = false;
        let squareWitness = "";
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
                squareWitness = word;
                break;
            }
        }
        
        if (!inReachableSet && anySquareExists) {
            console.log(`FALSE SAFE! u=${u}, K=${K}`);
            console.log(`Mapper Output: domain=${res.domain}, chi=${chiStr}, sig=${sigStr}, t=${res.t}`);
            console.log(`Class ID=${cid}, rs_length=${rs ? rs.length : 'NULL'}`);
            
            // let's manually verify the signature for the witness
            let testBlocks = [...concreteBlocks];
            for (let i = 0; i < sourceRoles.length; i++) {
                if (sourceRoles[i] === unresolvedRole) testBlocks[i] = squareWitness;
            }
            let fullStr = testBlocks.join('');
            let pL = getParikh(fullStr.substring(u, u + K));
            let pR = getParikh(fullStr.substring(u + K, u + 2 * K));
            console.log(`Literal diff: [${pR[0]-pL[0]}, ${pR[1]-pL[1]}, ${pR[2]-pL[2]}]`);
            
            // eval sig
            let sigEval = [0,0,0];
            for(let term of res.sigma) {
                let p = getParikh(squareWitness.substring(0, term.d));
                for(let i=0; i<3; i++) sigEval[i] += term.a * p[i];
            }
            let formula = [res.t[0] + sigEval[0], res.t[1] + sigEval[1], res.t[2] + sigEval[2]];
            console.log(`Formula sig(X) + t: ${formula}`);
            console.log(`SigEval: ${sigEval}`);
        }
    }
}
