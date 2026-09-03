const fs = require('fs');
const cp = require('child_process');

const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';
if (!fs.existsSync(dir + '/reproduction_A')) fs.mkdirSync(dir + '/reproduction_A', {recursive: true});
if (!fs.existsSync(dir + '/reproduction_B')) fs.mkdirSync(dir + '/reproduction_B', {recursive: true});

console.log("Running Repro A...");
cp.execSync('node --stack-size=100000 generate_run3c.js reproduction_A', {cwd: dir, stdio: 'inherit'});

console.log("Running Repro B...");
cp.execSync('node --stack-size=100000 generate_run3c.js reproduction_B', {cwd: dir, stdio: 'inherit'});

let all_match = true;
const files = [
    'ALL_GRAPH_DOMINANCE_FINAL_AUDIT.json', 'PERIOD_FINAL_AUDIT.json', 'Q_PARTITION_FINAL_AUDIT.json',
    'VARIANCE_AB_FINAL_AUDIT.json', 'PRESSURE_CURVATURE_FINAL_AUDIT.json', 'PROFILE_BASELINE_RUN3C_RECOVERED.json',
    'H5_311_FINAL_SPECTRAL_CERTIFICATE.json', 'PRESENTATION_INVARIANCE_FINAL_AUDIT.json', 'QV_INDEPENDENT_AUDIT.json'
];

for (let file of files) {
    const a = fs.readFileSync(dir + '/reproduction_A/' + file, 'utf8');
    const b = fs.readFileSync(dir + '/reproduction_B/' + file, 'utf8');
    if (a !== b) all_match = false;
}
let repro_audit = {
    exact_match: all_match,
    reproduction_A_dir: "reproduction_A",
    reproduction_B_dir: "reproduction_B"
};
fs.writeFileSync(dir + '/REPRODUCIBILITY_FINAL_AUDIT.json', JSON.stringify(repro_audit, null, 2));

// Copy final files to root of run_3c_durable_recovery
for (let file of files) {
    fs.copyFileSync(dir + '/reproduction_A/' + file, dir + '/' + file);
}
fs.copyFileSync(dir + '/reproduction_A/PROFILE_BASELINE_RUN3C_RECOVERED.csv', dir + '/PROFILE_BASELINE_RUN3C_RECOVERED.csv');

console.log("Done.");
