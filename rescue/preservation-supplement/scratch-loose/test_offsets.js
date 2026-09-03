const fs = require('fs');

function findMacroAlphabetWithOffsets(wordPath) {
    const word = fs.readFileSync(wordPath, 'utf8').trim();
    const N = word.length;
    console.log(`Analyzing word of length ${N} with offsets...`);

    const maxL = 120;
    
    let bestL = -1;
    let minCollapseRatio = 1.0;
    
    for (let L = 4; L <= maxL; L++) {
        for (let offset = 0; offset < L; offset++) {
            let uniqueBlocks = new Set();
            let totalBlocks = Math.floor((N - offset) / L);
            if (totalBlocks < 2) continue;
            
            for (let i = 0; i < totalBlocks; i++) {
                let start = offset + i * L;
                let block = word.substring(start, start + L);
                uniqueBlocks.add(block);
            }
            
            let ratio = uniqueBlocks.size / totalBlocks;
            if (ratio < minCollapseRatio) {
                minCollapseRatio = ratio;
                bestL = L;
            }
        }
    }
    console.log(`Best overall candidate L: ${bestL} (Ratio: ${minCollapseRatio.toFixed(3)})`);
}

findMacroAlphabetWithOffsets("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/aa2f25379.txt");
