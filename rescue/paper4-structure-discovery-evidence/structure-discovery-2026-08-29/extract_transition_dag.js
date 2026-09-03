const fs = require('fs');

function extractTransitionDAG(wordPath, alphabetPath) {
    if (!fs.existsSync(wordPath) || !fs.existsSync(alphabetPath)) {
        console.error("Missing files");
        process.exit(1);
    }
    const word = fs.readFileSync(wordPath, 'utf8').trim();
    const alphaData = JSON.parse(fs.readFileSync(alphabetPath, 'utf8'));
    const L = alphaData.L;
    const alphabet = alphaData.alphabet;
    
    // Map blocks to IDs
    let blockToId = {};
    alphabet.forEach((b, i) => blockToId[b] = i);
    
    // Build transitions
    let transitions = {};
    for(let i=0; i<alphabet.length; i++) transitions[i] = new Set();
    
    let totalBlocks = Math.floor(word.length / L);
    let sequence = [];
    
    for (let i = 0; i < totalBlocks; i++) {
        let block = word.substring(i * L, (i + 1) * L);
        let id = blockToId[block];
        sequence.push(id);
        
        if (i > 0) {
            let prevId = sequence[i - 1];
            transitions[prevId].add(id);
        }
    }
    
    // Compute stats
    let totalEdges = 0;
    let outDegrees = {};
    for(let i=0; i<alphabet.length; i++) {
        let size = transitions[i].size;
        totalEdges += size;
        outDegrees[size] = (outDegrees[size] || 0) + 1;
    }
    
    console.log(`Extracted Transition DAG for L=${L}`);
    console.log(`Nodes (Alphabet size): ${alphabet.length}`);
    console.log(`Edges (Transitions): ${totalEdges}`);
    console.log(`Average Out-Degree: ${(totalEdges / alphabet.length).toFixed(2)}`);
    console.log(`Out-Degree Distribution:`, outDegrees);
    
    // Convert sets to arrays for JSON
    let dag = {};
    for(let i=0; i<alphabet.length; i++) {
        dag[i] = Array.from(transitions[i]);
    }
    
    fs.writeFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/structure-discovery-2026-08-29/transition_dag.json", JSON.stringify({
        L: L,
        alphabet: alphabet,
        transitions: dag
    }, null, 2));
    
    console.log(`Saved transition DAG to transition_dag.json`);
}

const targetPath = "C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/paper4-to-recordhunt-transfer-2026-08-29/test_word_400.txt";
const alphaPath = "C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/structure-discovery-2026-08-29/macro_alphabet.json";
extractTransitionDAG(targetPath, alphaPath);
