const fs = require('fs');

let catalogueData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/compiled_sets.json'));

let wrong = 0;

for (let L = 5; L <= 8; L++) {
    let sigToClass = new Map();
    let multiClass = 0;
    
    let Ldata = catalogueData[L];
    for (let cid in Ldata) {
        // Just look at the first rho, signatures are the same for all rhos
        let rhos = Object.keys(Ldata[cid]);
        if (rhos.length === 0) continue;
        let rho = rhos[0];
        
        for (let sigObj of Ldata[cid][rho]) {
            let sig = sigObj.signature;
            if (sigToClass.has(sig)) {
                if (sigToClass.get(sig) !== cid) {
                    multiClass++;
                }
            } else {
                sigToClass.set(sig, cid);
            }
        }
    }
    console.log(`L=${L}: multi_class_signatures=${multiClass}`);
}
