const fs = require('fs');

// Generate ternary square-free word using a known morphism
// a -> abc, b -> ac, c -> b
function generateTernarySF(iters) {
    let w = "a";
    for(let i=0; i<iters; i++) {
        let next = "";
        for(let ch of w) {
            if(ch==='a') next += 'abc';
            if(ch==='b') next += 'ac';
            if(ch==='c') next += 'b';
        }
        w = next;
    }
    return w;
}

const sourceWord = generateTernarySF(8); // length > 1000
const L = 4;
const H = 2 * L - 1; // 7

// We need source factors.
// Local check needs factors up to length 5.
let localFactors = new Set();
for(let i=0; i<=sourceWord.length - 5; i++) {
    localFactors.add(sourceWord.substring(i, i+5));
}
const localFactorsArr = Array.from(localFactors);

// Global check: let's say we check factors up to length 10.
let globalFactors = new Set();
for(let len=2; len<=10; len++) {
    for(let i=0; i<=sourceWord.length - len; i++) {
        globalFactors.add(sourceWord.substring(i, i+len));
    }
}
const globalFactorsArr = Array.from(globalFactors);

// Pool of target blocks: L=4, no xx (aa, bb, cc)
let pool = [];
const chars = ['0', '1', '2'];
for(let c1 of chars) {
    for(let c2 of chars) {
        if(c1 === c2) continue;
        for(let c3 of chars) {
            if(c2 === c3) continue;
            for(let c4 of chars) {
                if(c3 === c4) continue;
                // Check no abelian square of period 2 (e.g. 0101)
                let str = c1+c2+c3+c4;
                let c = {0:0, 1:0, 2:0};
                c[str[0]]++; c[str[1]]++; c[str[2]]--; c[str[3]]--;
                if(c[0]===0 && c[1]===0 && c[2]===0) continue;
                pool.push(str);
            }
        }
    }
}
console.log(`Pool size: ${pool.length}`); // Should be small

// BASELINE SOLVER
function runBaseline() {
    let candidates = 0;
    let solutions = [];
    let start = Date.now();
    let localChecks = 0;
    
    for(let i=0; i<pool.length; i++) {
        for(let j=0; j<pool.length; j++) {
            for(let k=0; k<pool.length; k++) {
                candidates++;
                let map = {'a': pool[i], 'b': pool[j], 'c': pool[k]};
                
                // Local Check
                let safe = true;
                for(let f of localFactorsArr) {
                    let str = "";
                    for(let ch of f) str += map[ch];
                    // Check up to length 4L-2 = 14
                    for (let p = 1; p <= H; p++) {
                        for (let idx = 0; idx <= str.length - 2 * p; idx++) {
                            localChecks++;
                            let u = str.substring(idx, idx + p);
                            let v = str.substring(idx + p, idx + 2 * p);
                            let counts = {0:0, 1:0, 2:0};
                            for(let ch of u) counts[ch]++;
                            for(let ch of v) counts[ch]--;
                            if (counts[0] === 0 && counts[1] === 0 && counts[2] === 0) {
                                safe = false; break;
                            }
                        }
                        if(!safe) break;
                    }
                    if(!safe) break;
                }
                
                if(safe) solutions.push([i,j,k]);
            }
        }
    }
    return {time: Date.now() - start, solutions, candidates, checks: localChecks};
}

// PAPER4 SOLVER (Profile Pruning)
function runPaper4() {
    let candidates = 0;
    let solutions = [];
    let start = Date.now();
    let localChecks = 0;
    let profileKills = 0;
    
    // Precompute profiles
    let profiles = pool.map(b => {
        let p = {0:0, 1:0, 2:0};
        for(let ch of b) p[ch]++;
        return p;
    });
    
    // Support schema: for each factor of even length, left half profile must not exactly match right half profile
    // Actually, if the bulk difference is > L, it can never form an abelian square!
    let schemaFactors = [];
    for(let f of globalFactorsArr) {
        if(f.length % 2 === 0) {
            schemaFactors.push({
                left: f.substring(0, f.length/2),
                right: f.substring(f.length/2)
            });
        }
    }
    
    for(let i=0; i<pool.length; i++) {
        for(let j=0; j<pool.length; j++) {
            for(let k=0; k<pool.length; k++) {
                candidates++;
                
                // Paper 4 Partial-Assignment Profile Gate
                let p_map = {'a': profiles[i], 'b': profiles[j], 'c': profiles[k]};
                let profileSafe = true;
                
                for(let sf of schemaFactors) {
                    let d0 = 0, d1 = 0, d2 = 0;
                    for(let ch of sf.left) { d0 += p_map[ch][0]; d1 += p_map[ch][1]; d2 += p_map[ch][2]; }
                    for(let ch of sf.right) { d0 -= p_map[ch][0]; d1 -= p_map[ch][1]; d2 -= p_map[ch][2]; }
                    
                    // If all components are exactly 0, this is a dangerous block-aligned abelian square!
                    if(d0 === 0 && d1 === 0 && d2 === 0) {
                        profileSafe = false;
                        profileKills++;
                        break;
                    }
                }
                
                if(!profileSafe) continue;
                
                let map = {'a': pool[i], 'b': pool[j], 'c': pool[k]};
                
                // Local Check
                let safe = true;
                for(let f of localFactorsArr) {
                    let str = "";
                    for(let ch of f) str += map[ch];
                    // Check up to length 4L-2 = 14
                    for (let p = 1; p <= H; p++) {
                        for (let idx = 0; idx <= str.length - 2 * p; idx++) {
                            localChecks++;
                            let u = str.substring(idx, idx + p);
                            let v = str.substring(idx + p, idx + 2 * p);
                            let counts = {0:0, 1:0, 2:0};
                            for(let ch of u) counts[ch]++;
                            for(let ch of v) counts[ch]--;
                            if (counts[0] === 0 && counts[1] === 0 && counts[2] === 0) {
                                safe = false; break;
                            }
                        }
                        if(!safe) break;
                    }
                    if(!safe) break;
                }
                
                if(safe) solutions.push([i,j,k]);
            }
        }
    }
    return {time: Date.now() - start, solutions, candidates, checks: localChecks, profileKills};
}

console.log("Running Baseline...");
let res1 = runBaseline();
console.log(res1);

console.log("Running Paper 4...");
let res2 = runPaper4();
console.log(res2);

const output = {
    baseline: res1,
    paper4: res2,
    parity: res1.solutions.length === res2.solutions.length
};
fs.writeFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/SMALL_L_SOURCE_SYNTHESIS_COMPARISON_2026-08-29.json", JSON.stringify(output, null, 2));

