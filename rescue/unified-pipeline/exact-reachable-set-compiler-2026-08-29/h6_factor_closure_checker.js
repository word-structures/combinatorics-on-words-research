// h6_morphic_factor_closure.js
const fs = require('fs');

const H6 = {
    a: 'ace', b: 'adf', c: 'bdf', d: 'bdc', e: 'afe', f: 'bce'
};
const alphabet = ['a','b','c','d','e','f'];

// A. Complete F2 Closure
let F2 = new Set();
// Base F2: all length-2 subwords strictly inside h6(X) for X in F1
for (let X of alphabet) {
    let mapped = H6[X];
    F2.add(mapped.substring(0, 2));
    F2.add(mapped.substring(1, 3));
}

let F2_size = 0;
while (F2.size > F2_size) {
    F2_size = F2.size;
    let newF2 = new Set(F2);
    for (let XY of Array.from(F2)) {
        let X = XY[0];
        let Y = XY[1];
        let hX = H6[X];
        let hY = H6[Y];
        // The boundary length-2 factor is the last char of hX and first char of hY
        newF2.add(hX[2] + hY[0]);
    }
    F2 = newF2;
}
let F2_arr = Array.from(F2).sort();

// B. Complete F3 from complete F2
// For q=3, m=3, max source length is ceil((2+3)/3) = 2.
// So F3 is fully contained in h6(XY) for XY in F2.
let F3 = new Set();
for (let XY of F2_arr) {
    let mapped = H6[XY[0]] + H6[XY[1]]; // length 6
    for (let i = 0; i <= mapped.length - 3; i++) {
        F3.add(mapped.substring(i, i+3));
    }
}
let F3_arr = Array.from(F3).sort();

// C. Complete F5 from complete F3
// For q=3, m=5, max source length is ceil((2+5)/3) = 3.
// So F5 is fully contained in h6(XYZ) for XYZ in F3.
let F5 = new Set();
for (let XYZ of F3_arr) {
    let mapped = H6[XYZ[0]] + H6[XYZ[1]] + H6[XYZ[2]]; // length 9
    for (let i = 0; i <= mapped.length - 5; i++) {
        F5.add(mapped.substring(i, i+5));
    }
}
let F5_arr = Array.from(F5).sort();

let output = {
    F2_complete: "PROVED",
    F3_complete: "PROVED",
    F5_complete: "PROVED",
    F2_size: F2_arr.length,
    F3_size: F3_arr.length,
    F5_size: F5_arr.length,
    F5_factors: F5_arr
};

fs.writeFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/h6_factor_closure_output.json', JSON.stringify(output, null, 2));
console.log(`F2: ${F2_arr.length}, F3: ${F3_arr.length}, F5: ${F5_arr.length}`);
