const fs = require('fs');

function compileToPaper4Algebra(dagPath) {
    if (!fs.existsSync(dagPath)) {
        console.error("Missing DAG file");
        process.exit(1);
    }
    const dagData = JSON.parse(fs.readFileSync(dagPath, 'utf8'));
    const L = dagData.L;
    const alphabet = dagData.alphabet;
    
    console.log(`Compiling DAG with ${alphabet.length} blocks to Paper 4 Algebra...`);
    
    // Compute Parikh profiles for each block
    let profiles = alphabet.map(b => {
        let counts = {a: 0, b: 0, c: 0};
        for(let ch of b) counts[ch] = (counts[ch] || 0) + 1;
        return counts;
    });
    
    let supportFamilyMap = [];
    
    // We mock the mapping to the 19 families as a proof-of-concept
    // A true compilation requires exact boundary alignment (cutpoints).
    console.log(`Computed ${profiles.length} Parikh profiles.`);
    
    // Check if the system is uniform (all blocks have same profile)
    let isUniform = true;
    let baseProf = profiles[0];
    for (let p of profiles) {
        if (p.a !== baseProf.a || p.b !== baseProf.b || p.c !== baseProf.c) {
            isUniform = false;
            break;
        }
    }
    
    if (isUniform) {
        console.log(`[Geometric Result] Block system is PARIKH-UNIFORM: [a:${baseProf.a}, b:${baseProf.b}, c:${baseProf.c}].`);
        console.log(`This simplifies Paper 4 support families drastically.`);
    } else {
        console.log(`[Geometric Result] Block system has VARIABLE profiles. Full 19-family affine projection is required.`);
    }
    
    fs.writeFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/structure-discovery-2026-08-29/paper4_compiled_system.json", JSON.stringify({
        L: L,
        isUniform: isUniform,
        profiles: profiles
    }, null, 2));
    
    console.log("Saved algebraic system summary to paper4_compiled_system.json");
}

const dagPath = "C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/structure-discovery-2026-08-29/transition_dag.json";
compileToPaper4Algebra(dagPath);
