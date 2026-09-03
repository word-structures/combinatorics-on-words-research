const fs = require('fs');
const { mapWindow, getParikh } = require('./dynamic_topology_mapper.js');
const compiledData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/compiled_sets.json'));
let catalogueData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/claude-intake/_paper4-master-closure-2026-08-29/runs/sixdomain_full.json')).table;
let rowToClass = new Map();
for(let row of catalogueData) { rowToClass.set(row.domain + "|" + row.roleMask, row.classId); }

const H6 = { a: 'ace', b: 'adf', c: 'bdf', d: 'bdc', e: 'afe', f: 'bce' };
let src = "a";
for(let i=0; i<6; i++) {
    let n = "";
    for(let c of src) n += H6[c];
    src = n;
}
let sourceRoles = src.split(''); 

let L = 5;
let Ldata = compiledData[L];

let profiles = { a: [2, 1, 2], b: [1, 2, 2], c: [2, 2, 1], d: [3, 1, 1], e: [1, 3, 1], f: [1, 1, 3] };
let concreteBlocksDict = { a: "00122", b: "01221", c: "01122", d: "00012", e: "01112", f: "01222" };
let unresolvedRole = 'a';
let rho = profiles[unresolvedRole];

let undefined_cid = 0;
let missing_sig = 0;
let danger_zone = 0;

for (let K = 10; K <= 100; K++) {
    for (let u = 0; u < L; u++) {
        for (let start_idx = 0; start_idx < 100; start_idx++) {
            let m2 = start_idx + Math.floor((u + 2 * K) / L);
            if (m2 >= sourceRoles.length) continue;
            
            let windowRoles = sourceRoles.slice(start_idx, m2 + 1);
            let windowBlocks = windowRoles.map(r => concreteBlocksDict[r]);
            
            let res = mapWindow({ L, start: u, K, sourceRoles: windowRoles, concreteBlocks: windowBlocks, unresolvedRole, rho });
            
            let layerD_safe = false;
            let chiStr = res.chi.join('');
            let cid = rowToClass.get(res.domain + "|" + chiStr);
            if (cid === undefined) {
                undefined_cid++;
            } else if (Ldata[cid]) {
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
                if (!rs) {
                    missing_sig++;
                } else {
                    let minusTStr = res.t.map(x => -x).join(',');
                    if (!rs.includes(minusTStr)) {
                        layerD_safe = true;
                    }
                }
            }
            
            if (!layerD_safe) danger_zone++;
        }
    }
}
console.log({ undefined_cid, missing_sig, danger_zone });
