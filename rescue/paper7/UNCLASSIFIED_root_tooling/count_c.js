const pc = JSON.parse(require('fs').readFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery/PRESSURE_CURVATURE_FINAL_AUDIT.json', 'utf8'));
let count = 0;
for (let c of pc) if (c.C_vals) count++;
console.log(count);
