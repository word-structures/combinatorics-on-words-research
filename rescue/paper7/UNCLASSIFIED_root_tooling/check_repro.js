const fs = require('fs');
const path = require('path');
const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';
const A = path.join(dir, 'reproduction_A');
const B = path.join(dir, 'reproduction_B');
let filesA = fs.readdirSync(A);
let filesB = fs.readdirSync(B);

let mismatch = 0;
for (let f of filesA) {
    let a = fs.readFileSync(path.join(A, f), 'utf8');
    let b = fs.readFileSync(path.join(B, f), 'utf8');
    if (a !== b) {
        console.log("Mismatch in", f);
        mismatch++;
    }
}
console.log("REPRODUCTION_MISMATCH_COUNT =", mismatch);
