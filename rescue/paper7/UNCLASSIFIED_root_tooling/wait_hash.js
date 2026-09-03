const fs = require('fs');

const wait = setInterval(() => {
  if (fs.existsSync('scratch/profile-response-baseline-h2-h7-2026-08-25/run_1_repaired/reproduction_A/SUMMARY.json') &&
      fs.existsSync('scratch/profile-response-baseline-h2-h7-2026-08-25/run_1_repaired/reproduction_B/SUMMARY.json')) {
    clearInterval(wait);
    const A = fs.readFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/run_1_repaired/reproduction_A/PROFILE_BASELINE.json');
    const B = fs.readFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/run_1_repaired/reproduction_B/PROFILE_BASELINE.json');
    const diff = A.equals(B) ? 'SUCCESS' : 'FAIL';
    fs.writeFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/run_1_repaired/REPRODUCIBILITY_AUDIT.json', JSON.stringify({ REPRODUCIBILITY_STATUS: diff }));
    
    // now hash everything
    const { execSync } = require('child_process');
    execSync('node hash_gen2.js');
    console.log('Reproducibility check and hashing finished.');
  }
}, 5000);
