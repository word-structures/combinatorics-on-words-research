const fs = require('fs');
let data = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/compiled_sets.json'));

let L = 8;
let Ldata = data[L];

let csv = ["familyId,rho,numSignatures,minRsig,maxRsig,avgRsig,totalRF,overlapRatio"];

for (let cid in Ldata) {
    for (let rho in Ldata[cid]) {
        let sigs = Ldata[cid][rho];
        let numSignatures = sigs.length;
        if(numSignatures === 0) continue;
        
        let minR = Infinity;
        let maxR = 0;
        let sumR = 0;
        let unionF = new Set();
        
        for (let sig of sigs) {
            let rs = sig.reachable.length;
            if (rs < minR) minR = rs;
            if (rs > maxR) maxR = rs;
            sumR += rs;
            for (let v of sig.reachable) unionF.add(v);
        }
        
        let avgR = (sumR / numSignatures).toFixed(2);
        let totalRF = unionF.size;
        let overlapRatio = totalRF > 0 ? (sumR / totalRF).toFixed(2) : 0;
        
        csv.push([cid, `"${rho}"`, numSignatures, minR, maxR, avgR, totalRF, overlapRatio].join(','));
    }
}

fs.writeFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/REACHABLE_SET_FAMILY_STATISTICS_2026-08-29.csv', csv.join('\n'));
