const fs = require('fs');
const crypto = require('crypto');

function hashFile(p) {
    if(!fs.existsSync(p)) return null;
    return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}

const manifestPath = 'C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/paper4-repro-replay-2026-08-29/PAPER4_REPRODUCIBILITY_MANIFEST_2026-08-29.json';
const voidedPath = 'C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/paper4-repro-replay-2026-08-29/PAPER4_VOIDED_RUNS_2026-08-29.md';
let manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

let hash_mismatches = 0;
let missing_files = 0;
let placeholder_fields = 0;

for (let row of manifest) {
    // Check exact_source
    let srcPath = "C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/" + row.exact_source;
    if (!fs.existsSync(srcPath)) missing_files++;
    else if (hashFile(srcPath) !== row.sha256) hash_mismatches++;

    // Check checker
    let chkPath = "C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/" + row.checker;
    if (!fs.existsSync(chkPath)) missing_files++;
    else if (hashFile(chkPath) !== row.checker_sha256) hash_mismatches++;

    // Check replay_output
    let repPath = "C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/" + row.replay_output;
    if (!fs.existsSync(repPath)) missing_files++;
    else if (hashFile(repPath) !== row.replay_output_sha256) hash_mismatches++;

    // Check placeholders
    for (let key in row) {
        if (typeof row[key] === 'string') {
            let val = row[key].toUpperCase();
            if (val.includes('PENDING') || val.includes('UNKNOWN') || val.includes('IF FINISHED')) {
                placeholder_fields++;
            }
        }
    }
}

// Check voided runs
let voidedTxt = fs.readFileSync(voidedPath, 'utf8');
let blacklist_status = (voidedTxt.includes('afexRX') && voidedTxt.includes('VOID_CONCURRENT_WRITERS') && voidedTxt.includes('afexRX2')) ? 'PASS' : 'FAIL';

let result = {
    hash_mismatches,
    missing_files,
    placeholder_fields,
    blacklist_status
};

fs.writeFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/paper4-repro-replay-2026-08-29/PAPER4_REPRODUCIBILITY_MANIFEST_SELF_CHECK_2026-08-29.json', JSON.stringify(result, null, 2));
console.log(result);
