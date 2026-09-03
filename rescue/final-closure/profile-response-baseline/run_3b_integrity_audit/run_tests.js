const cp = require('child_process');
const fs = require('fs');

const OUT_DIR = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3b_integrity_audit';
const tests = [
    'node tests/test.js',
    'node tests/test-abelian-core.js'
];
const results = [];
let overall = "SUCCESS";

let stdout_full = "";
let stderr_full = "";

for(let t of tests) {
    try {
        let out = cp.execSync(t, {encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe']});
        results.push({
            command: t,
            exit_code: 0,
            stdout_path: 'TEST_STDOUT.txt',
            stderr_path: 'TEST_STDERR.txt',
            passed: true
        });
        stdout_full += `\n=== ${t} ===\n${out}`;
    } catch(e) {
        results.push({
            command: t,
            exit_code: e.status,
            stdout_path: 'TEST_STDOUT.txt',
            stderr_path: 'TEST_STDERR.txt',
            passed: false
        });
        overall = "FAIL";
        stdout_full += `\n=== ${t} ===\n${e.stdout}`;
        stderr_full += `\n=== ${t} ===\n${e.stderr}`;
    }
}
fs.writeFileSync(`${OUT_DIR}/TEST_RESULTS.json`, JSON.stringify(results, null, 2));
fs.writeFileSync(`${OUT_DIR}/TEST_STDOUT.txt`, stdout_full);
fs.writeFileSync(`${OUT_DIR}/TEST_STDERR.txt`, stderr_full);
console.log(overall);
