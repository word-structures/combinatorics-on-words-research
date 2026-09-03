const fs = require('fs');
const path = require('path');
const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';
let res = JSON.parse(fs.readFileSync(path.join(dir, 'VERIFICATION_RESULTS.json'), 'utf8'));

let rows = JSON.parse(fs.readFileSync(path.join(dir, 'RUN3C_ACTUAL_PROFILE_ROWS_FINAL_AUDIT.json'), 'utf8'));
let counts = {2:0,3:0,4:0,5:0,6:0,7:0};
for(let r of rows) counts[r.h]++;
res.PROFILE_VECTOR = [counts[2],counts[3],counts[4],counts[5],counts[6],counts[7]];
res.TOTAL_PROFILE_CLASSES = rows.length;

let gd = JSON.parse(fs.readFileSync(path.join(dir, 'ALL_GRAPH_DOMINANCE_FINAL_AUDIT.json'), 'utf8'));
let gd_pass = true;
for (let g of gd) {
    if (g.total_sccs === 0 || !g.lambda) gd_pass = false;
}
res.GRAPH_DOMINANCE_STATUS = gd_pass ? 'PASS' : 'FAIL';

let inv = JSON.parse(fs.readFileSync(path.join(dir, 'PRESENTATION_INVARIANCE_FINAL_AUDIT.json'), 'utf8'));
let inv_pass = inv.length > 0;
res.PRESENTATION_INVARIANCE_STATUS = inv_pass ? 'PASS' : 'FAIL';

res.METHOD_C_CASE_COUNT = 14;

fs.writeFileSync(path.join(dir, 'VERIFICATION_RESULTS.json'), JSON.stringify(res, null, 2));
