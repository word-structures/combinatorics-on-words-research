const fs = require('fs');
const cp = require('child_process');

const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3b_integrity_audit';
fs.mkdirSync(dir + '/reproduction_A', {recursive: true});
fs.mkdirSync(dir + '/reproduction_B', {recursive: true});

console.log("Running Repro A...");
cp.execSync('node --stack-size=100000 generate_run3b.js reproduction_A', {cwd: dir, stdio: 'inherit'});

console.log("Running Repro B...");
cp.execSync('node --stack-size=100000 generate_run3b.js reproduction_B', {cwd: dir, stdio: 'inherit'});

// Compare
let repro_audit = {};
const files = [
    'EDGE_EQUIVALENCE_AUDIT.json', 'PROFILE_CLASSIFICATION_AUDIT.json', 'SCC_SPECTRAL_CERTIFICATES.json',
    'PERIOD_AUDIT.json', 'Q_PARTITION_AUDIT.json', 'VARIANCE_METHOD_A.json', 'VARIANCE_METHOD_B.json',
    'PRESSURE_CURVATURE_SPOTCHECK.json', 'PROFILE_BASELINE_RUN3B.json', 'H5_311_AUDIT.json', 'PRESENTATION_INVARIANCE_AUDIT.json'
];

let all_match = true;
for (let file of files) {
    const a = fs.readFileSync(dir + '/reproduction_A/' + file, 'utf8');
    const b = fs.readFileSync(dir + '/reproduction_B/' + file, 'utf8');
    if (a !== b) all_match = false;
}
repro_audit = {
    exact_match: all_match,
    reproduction_A_dir: "reproduction_A",
    reproduction_B_dir: "reproduction_B"
};
fs.writeFileSync(dir + '/REPRODUCIBILITY_AUDIT.json', JSON.stringify(repro_audit, null, 2));
console.log("Done.");
