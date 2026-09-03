// print_missing.js
const fs = require('fs');
let catalogueData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/compiled_sets.json'));

const L = 5;

let physicalSigs = new Set();
for (let u = 0; u < L; u++) {
    for (let K = 2 * L; K <= 4 * L; K++) {
        let v = (u + K) % L;
        let w = (u + 2 * K) % L;
        let m1 = Math.floor((u + K) / L);
        let m2 = Math.floor((u + 2 * K) / L);
        let domain = "";
        if (m2 === 2 * m1) {
            if (u <= v && v <= w) domain = "Zs";
            else domain = "Z";
        } else if (m2 === 2 * m1 + 1) {
            domain = "P";
            if (v <= u && w < v) domain = "Pt";
        } else if (m2 === 2 * m1 - 1) {
            domain = "M";
            if (u < v && v <= w) domain = "Mt";
        }
        if (domain === "") continue;
        let masks = [];
        if (["Z", "P", "M"].includes(domain)) {
            for (let i=0; i<8; i++) masks.push([(i>>2)&1, (i>>1)&1, i&1]);
        }
        if (domain === "Zs") masks = [[0,0,0], [1,1,1]];
        if (domain === "Pt") { for(let x=0; x<2; x++) for(let y=0; y<2; y++) masks.push([x, x, y]); }
        if (domain === "Mt") { for(let x=0; x<2; x++) for(let y=0; y<2; y++) masks.push([x, y, y]); }
        let isPplus = (u === L - 2 && v === L - 1 && w === 0);
        let isPminus = (u === L - 1 && v === 0 && w === 1);
        if (domain === "Pt" && (isPplus || isPminus)) continue;
        let coefs = [1, -2, 1];
        for (let chi of masks) {
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

let compiled = new Set();
let Ldata = catalogueData[L];
for (let cid in Ldata) {
    for (let rho in Ldata[cid]) {
        for (let sigObj of Ldata[cid][rho]) {
            compiled.add(sigObj.signature);
        }
    }
}

let missing = Array.from(compiled).filter(x => !physicalSigs.has(x));
console.log("Missing for L=5:");
console.log(missing);
