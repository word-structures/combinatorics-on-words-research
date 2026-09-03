const { extensionDepth, factorsOfLength } = require('../src/unfavourable-factors.js');
const alphabet = ['a', 'b', 'c', 'd'];
const minK = 1;
const CAP = 40;

function analyzeCandidates(N) {
    const factors = factorsOfLength(N, alphabet, minK);
    console.log(`Length ${N}, total factors: ${factors.length}`);
    let rows = [];
    for (const u of factors) {
        const L = extensionDepth(u, 'left', alphabet, minK, CAP);
        const R = extensionDepth(u, 'right', alphabet, minK, CAP);
        rows.push({ u, L, R });
    }
    
    // Candidates for one-sided question: one side dies, other side reaches CAP
    let asymmetric = rows.filter(r => (r.L < CAP && r.R === CAP) || (r.R < CAP && r.L === CAP));
    
    console.log(`Length ${N}, asymmetric candidates: ${asymmetric.length}`);
    
    // Group by permutation symmetry
    // First, let's just print a few to see them
    for (let i = 0; i < Math.min(10, asymmetric.length); i++) {
        console.log(`  ${asymmetric[i].u}: L=${asymmetric[i].L}, R=${asymmetric[i].R}`);
    }
    return asymmetric;
}

console.log("--- n=8 ---");
analyzeCandidates(8);
console.log("\n--- n=9 ---");
analyzeCandidates(9);
