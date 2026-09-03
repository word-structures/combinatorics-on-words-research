const baseline = JSON.parse(require('fs').readFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery/PROFILE_BASELINE_RUN3C_RECOVERED.json', 'utf8'));
for(let r of baseline) {
    if (r.profile==='OLD') continue;
    if (Math.sign(r.delta_A) !== Math.sign(r.delta_B)) {
        console.log(r.h, r.profile, r.delta_A, r.delta_B);
    }
}
