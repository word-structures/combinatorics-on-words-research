const fs = require('fs');

function checkShortSquares(word) {
    const N = word.length;
    let found = false;
    for (let p = 2; p <= 40; p++) {
        for (let i = 0; i <= N - 2 * p; i++) {
            let u = word.substring(i, i + p);
            let v = word.substring(i + p, i + 2 * p);
            
            let counts = {a:0, b:0, c:0};
            for(let ch of u) counts[ch]++;
            for(let ch of v) counts[ch]--;
            
            if (counts.a === 0 && counts.b === 0 && counts.c === 0) {
                console.log(`Abelian square found: period=${p}, at idx=${i}`);
                found = true;
                return;
            }
        }
    }
    if (!found) console.log("No abelian squares of period <= 40 found!");
}

const cycleData = JSON.parse(fs.readFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/cycle.json", 'utf8'));
let base = cycleData.generatorWord;
let repeated = base.repeat(100);
console.log(`Checking repeated word of length ${repeated.length} for short squares...`);
checkShortSquares(repeated);
