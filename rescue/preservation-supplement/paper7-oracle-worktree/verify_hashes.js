const fs = require('fs');
const crypto = require('crypto');

const p7_04_data = JSON.parse(fs.readFileSync('C:\\abc-worktrees\\profile-response-baseline-h2-h7-2026-08-25\\scratch\\p7\\P7_04_DIRECTIONAL_EXTENSION_ORACLE_B_SMALL_FREEZE.json', 'utf8'));

let allPass = true;

for (let len = 23; len <= 32; len++) {
    const txtFile = `C:\\abc-worktrees\\profile-response-baseline-h2-h7-2026-08-25\\scratch\\p7\\p7_frontier_len_${len}.txt`;
    if (!fs.existsSync(txtFile)) {
        console.log(`File not found: ${txtFile}`);
        continue;
    }
    let content = fs.readFileSync(txtFile, 'utf8');
    // Remove all \r just in case
    content = content.replace(/\r/g, '');
    const words = content.split('\n').filter(Boolean); // remove empty lines
    
    // Exact sorting as in Oracle B
    words.sort();
    
    const payload = words.join(',');
    const hash = crypto.createHash('sha256').update(payload).digest('hex');
    
    const record = p7_04_data.find(r => r.length === len);
    
    if (record.sha256 === hash) {
        console.log(`Length ${len}: COUNT MATCH (${words.length}) + SET MATCH + CANONICAL DIGEST MATCH (${hash.substring(0,8)})`);
    } else {
        console.log(`Length ${len}: FAIL. Oracle B hash=${record.sha256}, Oracle A hash=${hash}`);
        allPass = false;
    }
}

if (allPass) {
    console.log("All Gate 1 small checks passed.");
} else {
    console.log("P7_03 FAIL / INVESTIGATE");
    process.exit(1);
}
