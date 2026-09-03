const fs = require('fs');

const H6 = {
    a: 'ace',
    b: 'adf',
    c: 'bdf',
    d: 'bdc',
    e: 'afe',
    f: 'bce'
};

function iterate(word) {
    let next = "";
    for (let i = 0; i < word.length; i++) next += H6[word[i]];
    return next;
}

function extractFactors(maxM) {
    let w = "a";
    let prevFactors = new Set();
    
    // Iterate to build the word
    let iters = 0;
    while (iters < 10) {
        w = iterate(w);
        let currentFactors = new Set();
        
        for (let m = 1; m <= maxM; m++) {
            for (let i = 0; i <= w.length - m; i++) {
                currentFactors.add(w.substring(i, i + m));
            }
        }
        
        if (iters > 0 && currentFactors.size === prevFactors.size) {
            console.log(`Stabilized at iteration ${iters} with word length ${w.length}`);
            
            // Organize by length
            let result = {};
            for (let m = 1; m <= maxM; m++) result[m] = [];
            for (let f of currentFactors) {
                result[f.length].push(f);
            }
            
            fs.writeFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/source_factor_validation.json", JSON.stringify(result, null, 2));
            console.log("Factors saved to source_factor_validation.json");
            
            for (let m = 1; m <= maxM; m++) {
                console.log(`Length ${m} factors: ${result[m].length}`);
            }
            return;
        }
        
        prevFactors = currentFactors;
        iters++;
    }
}

extractFactors(5);
