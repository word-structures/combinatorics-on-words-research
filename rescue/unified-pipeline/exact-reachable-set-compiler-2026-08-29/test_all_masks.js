const fs = require('fs');

function computePhysicalSignatures(L) {
    let physicalSigs = new Set();
    // Generate all physical (u,v,w) triples
    for (let u = 0; u < L; u++) {
        for (let K = 2 * L; K <= 4 * L; K++) {
            let v = (u + K) % L;
            let w = (u + 2 * K) % L;
            
            // To simulate all physical edge cases where a boundary might land on a block edge (making X_d = 0),
            // we apply all 8 subsets of the terms.
            for (let i=0; i<8; i++) {
                let chi = [(i>>2)&1, (i>>1)&1, i&1];
                
                // Truncate P+ and P- (from Paper 4 topological proof: these points are unreachable by non-degenerate squares)
                let isPplus = (u === L - 2 && v === L - 1 && w === 0);
                let isPminus = (u === L - 1 && v === 0 && w === 1);
                if ((isPplus || isPminus) && Math.floor((u + 2 * K) / L) === 2 * Math.floor((u + K) / L) + 1) {
                    // It's the P domain topology.
                    // Actually, let's just strictly exclude these points if they are topologically forbidden.
                    // But wait, the Paper 4 catalogue ONLY excludes them for specific masks!
                }
                
                let coefs = [1, -2, 1];
                let acc = new Map();
                let tr = [u, v, w];
                for (let j=0; j<3; j++) {
                    if (chi[j] === 0) continue;
                    let d = tr[j];
                    if (d === 0) continue;
                    acc.set(d, (acc.get(d) || 0) + coefs[j]);
                }
                let sig = [];
                for (let [d, a] of acc.entries()) {
                    if (a !== 0) sig.push({ d, a });
                }
                sig.sort((a,b) => a.d - b.d);
                let key = sig.map(x => x.d + ':' + x.a).join('|');
                physicalSigs.add(key);
            }
        }
    }
    return physicalSigs;
}

let catalogueData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/compiled_sets.json'));

let missing_physical = 0;
let extra_compiled = 0;

for (let L = 5; L <= 8; L++) {
    let physical = computePhysicalSignatures(L);
    let compiled = new Set();
    let Ldata = catalogueData[L];
    for (let cid in Ldata) {
        for (let rho in Ldata[cid]) {
            for (let sigObj of Ldata[cid][rho]) {
                compiled.add(sigObj.signature);
            }
        }
    }
    
    let missing = Array.from(compiled).filter(x => !physical.has(x));
    let extra = Array.from(physical).filter(x => !compiled.has(x));
    
    console.log(`L=${L}: Missing=${missing.length}, Extra=${extra.length}`);
    missing_physical += missing.length;
}
