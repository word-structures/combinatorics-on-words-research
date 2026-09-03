const { execSync } = require('child_process');
console.log("Running A...");
execSync('node scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery/generate_run3c.js scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery/reproduction_A');
console.log("Running B...");
execSync('node scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery/generate_run3c.js scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery/reproduction_B');
console.log("Done");
