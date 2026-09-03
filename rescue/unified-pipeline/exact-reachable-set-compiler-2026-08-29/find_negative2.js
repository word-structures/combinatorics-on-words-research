const fs = require('fs');
const { mapWindow, getParikh } = require('./dynamic_topology_mapper.js');
const compiledData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/compiled_sets.json'));
let L = 5;
let Ldata = compiledData[L];
let catalogueData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/claude-intake/_paper4-master-closure-2026-08-29/runs/sixdomain_full.json')).table;
let rowToClass = new Map();
for(let row of catalogueData) { rowToClass.set(row.domain + "|" + row.roleMask, row.classId); }

let rho = [2, 1, 2];
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
let allUnresolvedWords = words;
let unresolvedRole = 'a';

let found = false;
for(let attempt = 0; attempt < 50000; attempt++) {
    let concreteBlocks = [];
    for (let i=0; i<9; i++) {
        let b = ""; for(let j=0; j<L; j++) b += Math.floor(Math.random()*3);
        concreteBlocks.push(b);
    }
    
    let sourceRoles = [];
    let roleChars = ['a','b','c','a','a'];
    for(let i=0; i<9; i++) sourceRoles.push(roleChars[Math.floor(Math.random()*roleChars.length)]);
    
    let K = 10 + Math.floor(Math.random()*15);
    let u = Math.floor(Math.random()*L);
    
    let m2 = Math.floor((u + 2 * K) / L);
    if (m2 >= 9) continue;
    
    let res = mapWindow({ L, start: u, K, sourceRoles, concreteBlocks, unresolvedRole, rho });
    let chiStr = res.chi.join('');
    let cid = rowToClass.get(res.domain + "|" + chiStr);
    if (cid === undefined || !Ldata[cid]) continue;
    
    let sigStr = res.sigma.map(x => x.d + ':' + x.a).join('|');
    if (sigStr === "") sigStr = "0:0";
    
    let rhoKey = rho.join(',');
    let sigList = Ldata[cid][rhoKey];
    if (!sigList) continue;
    
    let rs = null;
    for (let s of sigList) {
        if (s.signature === sigStr || (sigStr === "0:0" && s.signature === "")) { rs = s.reachable; break; }
    }
    if (!rs) continue;
    
    let minusTStr = res.t.map(x => -x).join(',');
    if (!rs.includes(minusTStr)) continue;
    
    let anySquareExists = false;
    for (let word of allUnresolvedWords) {
        let testBlocks = [...concreteBlocks];
        for (let i = 0; i < sourceRoles.length; i++) { if (sourceRoles[i] === unresolvedRole) testBlocks[i] = word; }
        let fullStr = testBlocks.join('');
        let pL = getParikh(fullStr.substring(u, u + K));
        let pR = getParikh(fullStr.substring(u + K, u + 2 * K));
        if (pL[0] === pR[0] && pL[1] === pR[1] && pL[2] === pR[2]) { anySquareExists = true; break; }
    }
    
    if (!anySquareExists) {
        console.log(`FOUND NEGATIVE CONTROL at attempt ${attempt}!`);
        console.log(`u=${u}, K=${K}, roles=${sourceRoles.join('')}, chi=${chiStr}, domain=${res.domain}, -t=${minusTStr}`);
        found = true;
        break;
    }
}
if (!found) console.log("Not found in 50000 attempts");
