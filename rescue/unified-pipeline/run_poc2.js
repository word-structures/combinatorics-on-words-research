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
let sourceWord = "a";
for(let i=0; i<4; i++) sourceWord = iterate(sourceWord);

const L = 4;
const H = 2 * L - 1; // 7

// Local factors (length 1 to 5)
let localFactors = new Set();
for(let len=1; len<=5; len++) {
    for(let i=0; i<=sourceWord.length - len; i++) {
        localFactors.add(sourceWord.substring(i, i+len));
    }
}
const localFactorsArr = Array.from(localFactors);

// Global factors for Baseline (length 6 to 12)
let globalFactors = new Set();
for(let len=6; len<=12; len++) {
    for(let i=0; i<=sourceWord.length - len; i++) {
        globalFactors.add(sourceWord.substring(i, i+len));
    }
}
const globalFactorsArr = Array.from(globalFactors);

// Build pool of 6 blocks (L=4)
let fullPool = [];
const chars = ['0', '1', '2'];
for(let c1 of chars) {
    for(let c2 of chars) {
        if(c1 === c2) continue;
        for(let c3 of chars) {
            if(c2 === c3) continue;
            for(let c4 of chars) {
                if(c3 === c4) continue;
                let str = c1+c2+c3+c4;
                let c = {0:0, 1:0, 2:0};
                c[str[0]]++; c[str[1]]++; c[str[2]]--; c[str[3]]--;
                if(c[0]===0 && c[1]===0 && c[2]===0) continue;
                fullPool.push(str);
            }
        }
    }
}
// Take 6 specific blocks to form a small pool
const pool = fullPool.slice(0, 6);

function hasAbelianSquare(str, minK, maxK) {
    const N = str.length;
    for (let p = minK; p <= maxK; p++) {
        for (let idx = 0; idx <= N - 2 * p; idx++) {
            let u = str.substring(idx, idx + p);
            let v = str.substring(idx + p, idx + 2 * p);
            let counts = {0:0, 1:0, 2:0};
            for(let ch of u) counts[ch]++;
            for(let ch of v) counts[ch]--;
            if (counts[0] === 0 && counts[1] === 0 && counts[2] === 0) {
                return true;
            }
        }
    }
    return false;
}

function buildMap(indices) {
    return {
        'a': pool[indices[0]], 'b': pool[indices[1]], 'c': pool[indices[2]],
        'd': pool[indices[3]], 'e': pool[indices[4]], 'f': pool[indices[5]]
    };
}

// Generate combinations
let candidatesList = [];
for(let a=0; a<pool.length; a++)
for(let b=0; b<pool.length; b++)
for(let c=0; c<pool.length; c++)
for(let d=0; d<pool.length; d++)
for(let e=0; e<pool.length; e++)
for(let f=0; f<pool.length; f++) {
    candidatesList.push([a,b,c,d,e,f]);
}

function runBaseline() {
    let start = Date.now();
    let checks = 0;
    let solutions = [];
    
    for(let indices of candidatesList) {
        let map = buildMap(indices);
        let safe = true;
        
        // Local checks (K <= 7) on local factors
        for(let f of localFactorsArr) {
            let str = "";
            for(let ch of f) str += map[ch];
            checks++;
            if(hasAbelianSquare(str, 1, H)) {
                safe = false; break;
            }
        }
        if(!safe) continue;
        
        // Global checks (8 <= K <= 24) on global factors
        for(let f of globalFactorsArr) {
            let str = "";
            for(let ch of f) str += map[ch];
            checks++;
            if(hasAbelianSquare(str, H+1, 24)) {
                safe = false; break;
            }
        }
        if(safe) solutions.push(indices.join(''));
    }
    return {time: Date.now() - start, solutions, checks};
}

function runPaper4() {
    let start = Date.now();
    let checks = 0;
    let solutions = [];
    let trivialKills = 0;
    let fractionalKills = 0;
    
    let profiles = pool.map(b => {
        let p = {0:0, 1:0, 2:0};
        for(let ch of b) p[ch]++;
        return p;
    });
    
    // We only care about fractional boundary bounds (Paper 4) for long periods (global factors).
    // The bulk difference must be > L in at least one component to safely avoid the danger zone.
    // If it's <= L in all components, it enters the danger zone, and we must check the exact string.
    
    for(let indices of candidatesList) {
        let p_map = {
            'a': profiles[indices[0]], 'b': profiles[indices[1]], 'c': profiles[indices[2]],
            'd': profiles[indices[3]], 'e': profiles[indices[4]], 'f': profiles[indices[5]]
        };
        
        let map = buildMap(indices);
        let safe = true;
        
        // 1. Local checks (K <= 7) exactly as before (Paper 4 does not handle K < 2L)
        for(let f of localFactorsArr) {
            let str = "";
            for(let ch of f) str += map[ch];
            checks++;
            if(hasAbelianSquare(str, 1, H)) {
                safe = false; break;
            }
        }
        if(!safe) continue;
        
        // 2. Paper 4 Fractional Boundary Bulk Bound (Global check)
        for(let f of globalFactorsArr) {
            let L_factor = Math.floor(f.length / 2);
            let u = f.substring(0, L_factor);
            let v = f.substring(L_factor, 2*L_factor);
            
            let d0 = 0, d1 = 0, d2 = 0;
            for(let ch of u) { d0 += p_map[ch][0]; d1 += p_map[ch][1]; d2 += p_map[ch][2]; }
            for(let ch of v) { d0 -= p_map[ch][0]; d1 -= p_map[ch][1]; d2 -= p_map[ch][2]; }
            
            let bulk0 = Math.abs(d0);
            let bulk1 = Math.abs(d1);
            let bulk2 = Math.abs(d2);
            
            // Layer 2: Trivial Block-Aligned Gate
            if(bulk0 === 0 && bulk1 === 0 && bulk2 === 0) {
                trivialKills++;
                safe = false; break; // This never happens for h6, but we include it.
            }
            
            // Layer 3: Paper 4 Fractional Boundary Bound
            // The maximum fractional boundary shift for a square is exactly L in any component.
            // If the bulk difference is > L in at least one component, NO boundary shift can cancel it!
            if(bulk0 > L || bulk1 > L || bulk2 > L) {
                // ALGEBRAICALLY SAFE! We do NOT need to check this factor with exact letters!
                fractionalKills++;
                continue; 
            }
            
            // Danger Zone: We must instantiate the exact letters to resolve the boundary cutpoints
            let str = "";
            for(let ch of f) str += map[ch];
            checks++;
            if(hasAbelianSquare(str, H+1, 24)) {
                safe = false; break;
            }
        }
        
        if(safe) solutions.push(indices.join(''));
    }
    return {time: Date.now() - start, solutions, checks, trivialKills, fractionalKills};
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
    parity: JSON.stringify(res1.solutions.sort()) === JSON.stringify(res2.solutions.sort())
};
fs.writeFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/SMALL_L_SOURCE_SYNTHESIS_COMPARISON_2026-08-29.json", JSON.stringify(output, null, 2));

