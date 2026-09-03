const fs = require('fs');
const path = require('path');
const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';

let src = fs.readFileSync(path.join(dir, 'verify_durable_evidence.js'), 'utf8');

src = src.replace(`for (let c of pc) {
    for (let cval of c.C_vals) {`, `let ccount = 0;
for (let c of pc) {
    if (!c.C_vals) continue;
    ccount++;
    for (let cval of c.C_vals) {`);
src = src.replace(`res.METHOD_C_CASE_COUNT = pc.length;`, `res.METHOD_C_CASE_COUNT = ccount;`);

fs.writeFileSync(path.join(dir, 'verify_durable_evidence.js'), src);
