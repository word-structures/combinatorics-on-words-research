const fs = require('fs');

function findMacroAlphabet(wordPath) {
    if (!fs.existsSync(wordPath)) {
        console.error("File not found:", wordPath);
        process.exit(1);
    }
    const word = fs.readFileSync(wordPath, 'utf8').trim();
    const N = word.length;
    console.log(`Analyzing word of length ${N}`);

    const maxL = Math.min(120, Math.floor(N / 2));
    
    let bestL = -1;
    let minCollapseRatio = 1.0;
    
    console.log("L\tUnique Blocks\tTotal Blocks\tRatio");
    for (let L = 4; L <= maxL; L++) {
        let uniqueBlocks = new Set();
        let totalBlocks = Math.floor(N / L);
        for (let i = 0; i < totalBlocks; i++) {
            let block = word.substring(i * L, (i + 1) * L);
            uniqueBlocks.add(block);
        }
        
        let ratio = uniqueBlocks.size / totalBlocks;
        if (ratio < 0.5) {
            console.log(`${L}\t${uniqueBlocks.size}\t\t${totalBlocks}\t\t${ratio.toFixed(3)}`);
        }
        
        if (ratio < minCollapseRatio) {
            minCollapseRatio = ratio;
            bestL = L;
        }
    }
    
    console.log(`\nBest candidate L: ${bestL} (Ratio: ${minCollapseRatio.toFixed(3)})`);
    
    if (bestL !== -1 && minCollapseRatio < 0.5) {
        let uniqueBlocks = new Set();
        let totalBlocks = Math.floor(N / bestL);
        for (let i = 0; i < totalBlocks; i++) {
            let block = word.substring(i * bestL, (i + 1) * bestL);
            uniqueBlocks.add(block);
        }
        fs.writeFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/structure-discovery-2026-08-29/macro_alphabet.json", JSON.stringify({
            L: bestL,
            alphabet: Array.from(uniqueBlocks)
        }, null, 2));
        console.log(`Saved macro alphabet to macro_alphabet.json`);
    }
}

const targetPath = process.argv[2] || "C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/paper4-to-recordhunt-transfer-2026-08-29/test_word_400.txt";
findMacroAlphabet(targetPath);
