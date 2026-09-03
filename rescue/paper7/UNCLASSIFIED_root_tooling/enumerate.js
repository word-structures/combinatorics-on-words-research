const fs = require('fs');

const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3d_profile_identity_crosscheck';
fs.mkdirSync(dir, {recursive: true});

function getParikh(w, start, len) {
    let p = [0,0,0];
    for(let i=0; i<len; i++) p[w[start+i]]++;
    return p;
}

function hasAbelianSquare(w, maxK) {
    for (let k = 2; k <= maxK; k++) {
        for (let i = 0; i <= w.length - 2*k; i++) {
            let p1 = getParikh(w, i, k);
            let p2 = getParikh(w, i+k, k);
            if (p1[0]===p2[0] && p1[1]===p2[1] && p1[2]===p2[2]) return true;
        }
    }
    return false;
}

const profiles = {};
for (let h=2; h<=7; h++) {
    profiles[h] = new Set();
}

function search(w, h, maxH) {
    if (hasAbelianSquare(w, h - 1)) return; // Valid in L_{h-1}
    
    if (w.length === 2*h) {
        let p1 = getParikh(w, 0, h);
        let p2 = getParikh(w, h, h);
        if (p1[0]===p2[0] && p1[1]===p2[1] && p1[2]===p2[2]) {
            let prof = [...p1].sort((a,b)=>b-a).join(',');
            profiles[h].add(prof);
        }
    }
    
    if (w.length < 2*maxH) {
        for (let c=0; c<3; c++) {
            w.push(c);
            // check at current length for maxK = (w.length/2) but only up to maxH-1
            // Actually, we just need to generate all words of length 2h that are in L_{h-1}.
            // So we can just generate length 2h words directly.
            w.pop();
        }
    }
}

// Generate all valid words of length 2h in L_{h-1}
for (let h=2; h<=7; h++) {
    let validWords = [];
    function gen(w, targetLen) {
        if (hasAbelianSquare(w, h - 1)) return;
        if (w.length === targetLen) {
            let p1 = getParikh(w, 0, h);
            let p2 = getParikh(w, h, h);
            if (p1[0]===p2[0] && p1[1]===p2[1] && p1[2]===p2[2]) {
                let prof = [...p1].sort((a,b)=>b-a).join(',');
                profiles[h].add(prof);
            }
            return;
        }
        for (let c=0; c<3; c++) {
            w.push(c);
            gen(w, targetLen);
            w.pop();
        }
    }
    gen([], 2*h);
}

let res = {};
for (let h=2; h<=7; h++) {
    res[h] = [...profiles[h]].sort();
}
console.log(JSON.stringify(res, null, 2));
