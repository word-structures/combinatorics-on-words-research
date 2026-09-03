const fs = require('fs');
const path = require('path');
const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';

let src = fs.readFileSync(path.join(dir, 'verify_durable_evidence.js'), 'utf8');

src = src.replace(`res.METHOD_C_CASE_COUNT = ccount;`, `// removed`);
src = src.replace(`fs.writeFileSync(path.join(dir, 'VERIFICATION_RESULTS.json')`, `res.METHOD_C_CASE_COUNT = ccount;\nfs.writeFileSync(path.join(dir, 'VERIFICATION_RESULTS.json')`);

fs.writeFileSync(path.join(dir, 'verify_durable_evidence.js'), src);
