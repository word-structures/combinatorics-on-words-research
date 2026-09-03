// compile_all_reachable_sets.js
const fs = require('fs');
const { compileSignatureReachableSet } = require('./reachable_set_compiler.js');
const { getSignatures } = require('./extract_signatures.js');

const alphabetSize = 3;

function getProfiles(L) {
    let profiles = [];
    for(let a=0; a<=L; a++) {
        for(let b=0; b<=L-a; b++) {
            let c = L - a - b;
            profiles.push([a, b, c]);
        }
    }
    return profiles;
}

let allData = {};

for(let L=2; L<=8; L++) {
    console.log("Compiling L =", L);
    let families = getSignatures(L);
    let profiles = getProfiles(L);
    
    allData[L] = {};
    for (let cid in families) {
        allData[L][cid] = {};
        for (let rho of profiles) {
            let rhoKey = rho.join(',');
            allData[L][cid][rhoKey] = [];
            
            for (let sig of families[cid].signatures) {
                let sigKey = sig.map(x => x.d + ':' + x.a).join('|');
                let rs = compileSignatureReachableSet({ L, alphabetSize, rho, signature: sig });
                allData[L][cid][rhoKey].push({
                    signature: sigKey,
                    reachable: rs.map(v => v.join(',')).sort()
                });
            }
        }
    }
}

fs.writeFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/compiled_sets.json', JSON.stringify(allData));
console.log("Done");
