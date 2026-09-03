const fs = require('fs');
const path = require('path');
const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';

fs.unlinkSync(path.join(dir, 'RAW_STDOUT.txt'));
fs.writeFileSync(path.join(dir, 'EXECUTION_NOTE.txt'), 'Generator stdout was output to the background task console and was not explicitly redirected to a file. RAW_STDOUT_STATUS = NOT_CAPTURED.');

fs.writeFileSync(path.join(dir, 'COMMANDS.txt'), 'node tests/test.js\nnode tests/test-abelian-core.js\n');

