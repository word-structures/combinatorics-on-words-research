const fs = require('fs');

function buildStates(wordPath, L) {
    if (!fs.existsSync(wordPath)) {
        console.error("Missing file", wordPath);
        process.exit(1);
    }
    const word = fs.readFileSync(wordPath, 'utf8').trim();
    const stateLen = 3 * L;
    let states = new Set();
    
    for (let i = 0; i <= word.length - stateLen; i++) {
        states.add(word.substring(i, i + stateLen));
    }
    
    let statesArray = Array.from(states);
    console.log(`Extracted ${statesArray.length} valid 3L states (L=${L}) from word of length ${word.length}`);
    
    fs.writeFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/states.json", JSON.stringify({
        L: L,
        count: statesArray.length,
        states: statesArray
    }, null, 2));
}

const L = 10;
buildStates("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/aa2fr3268.txt", L);
