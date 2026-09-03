const { execSync } = require('child_process');
console.log('Running A...');
execSync('node --stack-size=100000 scratch/profile-response-baseline-h2-h7-2026-08-25/run_1_repaired/reproduction_A/genA.js');
console.log('Running B...');
execSync('node --stack-size=100000 scratch/profile-response-baseline-h2-h7-2026-08-25/run_1_repaired/reproduction_B/genB.js');
console.log('Done.');
