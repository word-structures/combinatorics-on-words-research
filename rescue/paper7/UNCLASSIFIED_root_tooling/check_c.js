const pc = JSON.parse(require('fs').readFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery/PRESSURE_CURVATURE_FINAL_AUDIT.json', 'utf8'));
for(let i=0; i<pc.length; i++) {
    if (!pc[i].C_vals) console.log("Missing C_vals at index", i, pc[i]);
}
