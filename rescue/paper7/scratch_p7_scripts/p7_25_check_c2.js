const { G85 } = require('../src/morphisms.js');

let Q = [
    [1,0,0,0], [0,1,0,0], [0,0,1,0], [0,0,0,0], [0,1,-1,0], [0,0,0,1], [1,-1,0,0],
    [1,0,-1,0], [0,0,-1,1], [0,-1,1,0], [0,0,1,-1], [0,-1,0,1], [0,1,0,-1],
    [-1,0,1,0], [-1,0,0,1], [1,0,0,-1], [-1,0,0,0], [0,0,0,-1]
];

function applyG85(str) {
    let res = '';
    for(let c of str) res += G85[c];
    return res;
}

let W0 = "ad";
let W1 = "ad" + applyG85(W0);
let W2 = "ad" + applyG85(W1);
let W3 = "ad" + applyG85(W2);

const alphabet = ['a','b','c','d'];

function checkPrefixAnchoredNearSquares(str, states) {
    let N = str.length;
    let s = new Int8Array(N);
    for(let i=0; i<N; i++) {
        let c = str[i];
        if(c==='a') s[i]=0; else if(c==='b') s[i]=1; else if(c==='c') s[i]=2; else s[i]=3;
    }
    
    // For each state, we look for U (prefix) and V' (following c_mid).
    // |U| = L1, |V'| = L2. L1 - L2 = sum(q).
    // So if we pick L1, then L2 = L1 - sum(q).
    // This must be > 0.
    // U = str[0 .. L1-1].
    // c_mid = str[L1].
    // V' = str[L1+1 .. L1+1+L2-1].
    
    let occurrences = [];
    
    for (let q of states) {
        let sum_q = q[0]+q[1]+q[2]+q[3];
        
        let pU = [0,0,0,0];
        // We will increment L1 from 1 upwards
        for (let L1 = 1; L1 < N/2; L1++) {
            pU[s[L1-1]]++;
            
            let L2 = L1 - sum_q;
            if (L2 <= 0) continue;
            if (L1 + 1 + L2 > N) break; // out of bounds
            
            let pV = [0,0,0,0];
            for (let j = 0; j < L2; j++) {
                pV[s[L1 + 1 + j]]++;
            }
            
            let match = true;
            for(let k=0; k<4; k++) {
                if (pU[k] - pV[k] !== q[k]) {
                    match = false;
                    break;
                }
            }
            
            if (match) {
                occurrences.push({ q, L1, L2 });
            }
        }
    }
    return occurrences;
}

let res2 = checkPrefixAnchoredNearSquares(W2, Q);
console.log(`W2 has ${res2.length} occurrences`);
if (res2.length > 0) console.log(res2);

// Check base case K <= 255 for internal squares? W2 is ASF, so it has no internal squares!
// And we just verified it has no prefix-anchored near-squares from Q? Let's see!
