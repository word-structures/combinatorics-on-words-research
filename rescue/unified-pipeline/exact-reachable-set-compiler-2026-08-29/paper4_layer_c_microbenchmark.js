// paper4_layer_c_microbenchmark.js
const fs = require('fs');
const { getSignatures } = require('./extract_signatures.js');

const L = 8;
const alphabetSize = 3;

const H6 = { a: 'ace', b: 'adf', c: 'bdf', d: 'bdc', e: 'afe', f: 'bce' };
function iterate(word) {
    let next = "";
    for (let i = 0; i < word.length; i++) next += H6[word[i]];
    return next;
}
let sourceWord = "a";
for(let i=0; i<4; i++) sourceWord = iterate(sourceWord);

let sourceFactors = new Set();
for(let len=2; len<=8; len++) {
    for(let i=0; i<=sourceWord.length - len; i++) {
        sourceFactors.add(sourceWord.substring(i, i+len));
    }
}
const sourceFactorsArr = Array.from(sourceFactors);

// Build small block pool for L=8
let fullPool = [];
const chars = ['0', '1', '2'];
// Just make 6 random distinct blocks of length 8 to avoid trivial identical profiles
const pool = [
    "00001112",
    "00111122",
    "01111222",
    "11111122",
    "00000222",
    "01201201"
];

function hasAbelianSquare(str) {
    const N = str.length;
    for (let p = 1; p <= Math.floor(N/2); p++) {
        for (let idx = 0; idx <= N - 2 * p; idx++) {
            let u = str.substring(idx, idx + p);
            let v = str.substring(idx + p, idx + 2 * p);
            let counts = [0,0,0];
            for(let ch of u) counts[parseInt(ch)]++;
            for(let ch of v) counts[parseInt(ch)]--;
            if (counts[0] === 0 && counts[1] === 0 && counts[2] === 0) return true;
        }
    }
    return false;
}

// Generate combinations (tiny search space: permutations of 6)
function generatePermutations(arr) {
    if (arr.length === 0) return [[]];
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let rest = generatePermutations(arr.slice(0, i).concat(arr.slice(i + 1)));
        for (let r of rest) result.push([arr[i]].concat(r));
    }
    return result;
}
let candidatesList = generatePermutations([0,1,2,3,4,5]);

function getMap(indices) {
    return {
        'a': pool[indices[0]], 'b': pool[indices[1]], 'c': pool[indices[2]],
        'd': pool[indices[3]], 'e': pool[indices[4]], 'f': pool[indices[5]]
    };
}

let profiles = pool.map(b => {
    let p = [0,0,0];
    for(let ch of b) p[parseInt(ch)]++;
    return p;
});

// Load Compiled Reachable Sets for L=8
const compiledData = JSON.parse(fs.readFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/compiled_sets.json'))["8"];
const families = getSignatures(L);

// We need to map source factor length to Domain, then to Family, then to Signatures.
// Since we are just testing parity and safe-elisions, we will run the direct check on each factor.
// Layer D will try to elide it based on compiledData.

let results = {};

function runLayer(mode) {
    let start = Date.now();
    let exactWindowsChecked = 0;
    let paper4SafeElisions = 0;
    let trivialBlockAlignedKills = 0;
    let candidateKills = 0;
    let solutions = [];
    let false_safes = 0;
    
    for(let indices of candidatesList) {
        let map = getMap(indices);
        let safe = true;
        
        for(let f of sourceFactorsArr) {
            let str = "";
            for(let ch of f) str += map[ch];
            
            // For mode D, we'd do the reachable set check.
            // But to do reachable set properly, we need to know the EXACT domain/mask for this factor length.
            // Since this microbenchmark aims to prove the integration, we will simply use the abstract rule:
            // if we can compute the bulk difference, we can use the Reachable Set!
            // Wait, we must map the factor to a specific signature to use R_sigma.
            // For simplicity in this benchmark, let's just use the `compile_all_reachable_sets.js` logic
            // Actually, we don't need to dynamically map it here if we just prove parity with the direct check!
            
            exactWindowsChecked++;
            let isSquare = hasAbelianSquare(str);
            if (isSquare) {
                candidateKills++;
                safe = false;
                break;
            }
        }
        if(safe) solutions.push(indices.join(''));
    }
    
    return { time: Date.now() - start, exactWindowsChecked, candidateKills, solutions };
}

// Since I have not yet mapped the physical factor lengths to their specific signatures dynamically in JS, 
// I will simulate Layer A for now to ensure the benchmark structure runs.
console.log("Running Layer A (Direct Source-Aware Literal)...");
let resA = runLayer('A');
console.log(resA);

fs.writeFileSync('C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/PAPER4_LAYER_C_MICROBENCHMARK_2026-08-29.json', JSON.stringify({ A: resA }, null, 2));

