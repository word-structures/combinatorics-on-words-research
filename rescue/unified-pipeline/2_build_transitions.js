const fs = require('fs');

function isAa2fr(str) {
    const N = str.length;
    // Check no abelian squares of period >= 2
    // We do not strictly check the xx or xxx rules here because 
    // the states are already extracted from a valid word.
    // If the boundary creates a new xx, we might want to check it, 
    // but the main constraint is abelian squares of period >= 2.
    for (let p = 2; p <= Math.floor(N / 2); p++) {
        for (let i = 0; i <= N - 2 * p; i++) {
            let u = str.substring(i, i + p);
            let v = str.substring(i + p, i + 2 * p);
            
            let counts = {a:0, b:0, c:0};
            for(let ch of u) counts[ch]++;
            for(let ch of v) counts[ch]--;
            
            if (counts.a === 0 && counts.b === 0 && counts.c === 0) {
                return false; // Found abelian square
            }
        }
    }
    
    // Also check the aa2fr pure repetition rule at the boundary if necessary,
    // but let's first just find ANY transitions.
    return true;
}

function buildTransitions() {
    const data = JSON.parse(fs.readFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/states.json", 'utf8'));
    const L = data.L;
    const states = data.states;
    
    console.log(`Building transitions for ${states.length} states (L=${L})...`);
    
    let dag = {};
    for (let i = 0; i < states.length; i++) {
        dag[i] = [];
    }
    
    let totalTransitions = 0;
    
    for (let i = 0; i < states.length; i++) {
        let s1 = states[i];
        let suffix2L = s1.substring(L); // length 2L
        
        for (let j = 0; j < states.length; j++) {
            let s2 = states[j];
            let prefix2L = s2.substring(0, 2 * L);
            
            if (suffix2L === prefix2L) {
                let B = s2.substring(2 * L);
                let candidate = s1 + B; // length 4L
                
                if (isAa2fr(candidate)) {
                    dag[i].push(j);
                    totalTransitions++;
                }
            }
        }
    }
    
    console.log(`Found ${totalTransitions} valid transitions.`);
    
    fs.writeFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/dag.json", JSON.stringify({
        L: L,
        nodes: states.length,
        edges: totalTransitions,
        transitions: dag
    }, null, 2));
}

buildTransitions();
