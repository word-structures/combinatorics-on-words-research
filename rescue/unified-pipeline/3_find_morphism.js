const fs = require('fs');

function isLocallyValid(str) {
    const N = str.length;
    for (let p = 2; p <= Math.floor(N / 2); p++) {
        for (let i = 0; i <= N - 2 * p; i++) {
            let u = str.substring(i, i + p);
            let v = str.substring(i + p, i + 2 * p);
            
            let counts = {a:0, b:0, c:0};
            for(let ch of u) counts[ch]++;
            for(let ch of v) counts[ch]--;
            
            if (counts.a === 0 && counts.b === 0 && counts.c === 0) {
                return false;
            }
        }
    }
    return true;
}

function findMorphism() {
    const lines = fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/claude-intake/_paper4-next-version-sandbox/runs/afexBIG_H/af_positive.jsonl', 'utf8')
        .split('\n')
        .filter(x => x.trim() !== '')
        .map(JSON.parse);
        
    const blocks = lines.map(obj => obj.A);
    const N = blocks.length;
    console.log(`Loaded ${N} blocks.`);
    
    const validPairs = [[0,1], [0,2], [1,0], [1,2], [2,0], [2,1]]; // ab, ac, ba, bc, ca, cb
    
    let candidates = [];
    
    // Iterate over all triplets
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            for (let k = j + 1; k < N; k++) {
                let B = [blocks[i], blocks[j], blocks[k]];
                
                let safe = true;
                for (let pair of validPairs) {
                    let concat = B[pair[0]] + B[pair[1]]; // Length 80
                    if (!isLocallyValid(concat)) {
                        safe = false;
                        break;
                    }
                }
                
                if (safe) {
                    candidates.push([i, j, k]);
                    console.log(`Found candidate triplet: ${i}, ${j}, ${k}`);
                    // Break early just to see if we find ANY
                    if (candidates.length >= 10) {
                        console.log("Stopping after 10 candidates.");
                        return;
                    }
                }
            }
        }
    }
    console.log(`Total candidates found: ${candidates.length}`);
}

findMorphism();
