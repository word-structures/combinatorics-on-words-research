const fs = require('fs');
const cp = require('child_process');

const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3_formula_correction';
fs.mkdirSync(dir + '/reproduction_A', {recursive: true});
fs.mkdirSync(dir + '/reproduction_B', {recursive: true});

console.log("Running Repro A...");
cp.execSync('node --stack-size=100000 generate_run3_baseline.js reproduction_A', {cwd: dir, stdio: 'inherit'});

console.log("Running Repro B...");
cp.execSync('node --stack-size=100000 generate_run3_baseline.js reproduction_B', {cwd: dir, stdio: 'inherit'});

console.log("Done.");
