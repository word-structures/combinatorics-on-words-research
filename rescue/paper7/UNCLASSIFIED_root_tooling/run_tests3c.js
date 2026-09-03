const cp = require('child_process');
const fs = require('fs');

const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';

let res = { test_js: { exit_code: null, command: 'node tests/test.js' }, test_abelian: { exit_code: null, command: 'node tests/test-abelian-core.js' } };

let stdout = '';
let stderr = '';

try {
    let out = cp.execSync('node tests/test.js', {encoding: 'utf8'});
    stdout += out;
    res.test_js.exit_code = 0;
} catch (e) {
    stdout += e.stdout;
    stderr += e.stderr;
    res.test_js.exit_code = e.status;
}

try {
    let out = cp.execSync('node tests/test-abelian-core.js', {encoding: 'utf8'});
    stdout += out;
    res.test_abelian.exit_code = 0;
} catch (e) {
    stdout += e.stdout;
    stderr += e.stderr;
    res.test_abelian.exit_code = e.status;
}

fs.writeFileSync(dir + '/TEST_RESULTS_FINAL.json', JSON.stringify(res, null, 2));
fs.writeFileSync(dir + '/TEST_STDOUT_FINAL.txt', stdout);
fs.writeFileSync(dir + '/TEST_STDERR_FINAL.txt', stderr);
