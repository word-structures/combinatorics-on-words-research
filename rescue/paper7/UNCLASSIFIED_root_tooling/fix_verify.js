const fs = require('fs');
const path = require('path');
const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';

let src = fs.readFileSync(path.join(dir, 'verify_durable_evidence.js'), 'utf8');

src = src.replace(`for (let h in vab.A) {
    for (let p in vab.A[h]) {
        let diff = Math.abs(vab.A[h][p].a - vab.B[h][p].a);
        if (diff > maxAbDiff) maxAbDiff = diff;
    }
}`, `
for (let i = 0; i < vab.A.length; i++) {
    let diff = Math.abs(vab.A[i].a_A - vab.B[i].a_B);
    if (diff > maxAbDiff) maxAbDiff = diff;
}
`);
fs.writeFileSync(path.join(dir, 'verify_durable_evidence.js'), src);
