const fs = require('fs');

const H6 = { a: 'ace', b: 'adf', c: 'bdf', d: 'bdc', e: 'afe', f: 'bce' };
let src = "a";
for(let i=0; i<6; i++) {
    let n = "";
    for(let c of src) n += H6[c];
    src = n;
}
let sourceRoles = src.split(''); 

let L = 5;

// Generate all valid Parikh profiles that sum to L=5 (for 3 characters)
let all_profiles = [];
for(let i=0; i<=L; i++) {
    for(let j=0; j<=L-i; j++) {
        let k = L - i - j;
        all_profiles.push([i, j, k]);
    }
}

function getRandomProfiles() {
    let p = {};
    for (let c of ['a','b','c','d','e','f']) {
        let idx = Math.floor(Math.random() * all_profiles.length);
        p[c] = all_profiles[idx];
    }
    return p;
}

// We generate 50 random profile assignments and score them!
let best_assignment = null;
let best_score = Infinity;
let worst_score = 0;

console.log("Scoring 50 random profile assignments...");

for (let iter = 0; iter < 50; iter++) {
    let profiles = getRandomProfiles();
    
    let danger_zone = 0;
    let total_windows = 0;
    
    // We check K from 10 to 100
    for (let K = 10; K <= 100; K+=5) { 
        for (let u = 0; u < L; u++) {
            for (let start_idx = 0; start_idx < 100; start_idx++) {
                let m1 = Math.floor((u + K) / L);
                let m2 = Math.floor((u + 2 * K) / L);
                if (start_idx + m2 >= sourceRoles.length) continue;
                
                total_windows++;
                
                // Compute t_bulk (the difference of full blocks between left and right)
                // Left bulk blocks: indices 1 to m1-1 (if m1 > 1)
                // Right bulk blocks: indices m1+1 to m2-1
                let t = [0, 0, 0];
                for (let i = 1; i <= m1 - 1; i++) {
                    let r = sourceRoles[start_idx + i];
                    t[0] += profiles[r][0]; t[1] += profiles[r][1]; t[2] += profiles[r][2];
                }
                for (let i = m1 + 1; i <= m2 - 1; i++) {
                    let r = sourceRoles[start_idx + i];
                    t[0] -= profiles[r][0]; t[1] -= profiles[r][1]; t[2] -= profiles[r][2];
                }
                
                // The maximum possible fractional contribution from the 3 boundaries 
                // (u, v, w) is bounded by L for each boundary. 
                // Actually, worst case: Left gets +L from boundaries, right gets -L.
                // Total worst case difference is 2*L for each character.
                let max_frac = 2 * L;
                
                if (Math.abs(t[0]) > max_frac || Math.abs(t[1]) > max_frac || Math.abs(t[2]) > max_frac) {
                    // Safe elision at the profile level!
                } else {
                    danger_zone++;
                }
            }
        }
    }
    
    if (danger_zone < best_score) {
        best_score = danger_zone;
        best_assignment = profiles;
    }
    if (danger_zone > worst_score) {
        worst_score = danger_zone;
    }
    if (iter % 10 === 0) process.stdout.write('.');
}
console.log("\nDone.");

let report = `# SANDBOX PHASE 2: PROFILE-FIRST FEASIBILITY
**Date:** 2026-08-29

## 1. Engine Objective
Evaluate 50 completely random Parikh profile assignments $(\\rho_a \\dots \\rho_f)$ against the $h_6$ sequence to see if the **pure bulk difference** (without knowing any literal strings) is enough to score and prune entire profile branches.

## 2. Methodology
- **L:** 5
- **K Range:** 10 to 100 (step 5)
- **Coarse Bound:** A window is safe if $|t_{bulk}| > 2L$ for any character.
- **Metric:** Danger Zone density (how many windows could potentially form squares based on profiles alone).

## 3. Results
- **Worst Profile Assignment Danger Zone:** ${worst_score} windows
- **Best Profile Assignment Danger Zone:** ${best_score} windows

**Best Profiles Found:**
\`\`\`json
${JSON.stringify(best_assignment, null, 2)}
\`\`\`

## 4. Conclusion
(To be added based on variance between worst and best).
`;

fs.writeFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/SANDBOX_PHASE2_PROFILE_REPORT.md', report);
