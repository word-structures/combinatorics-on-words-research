const { G85 } = require('../src/morphisms.js');
const fs = require('fs');
let data = JSON.parse(fs.readFileSync('P7_27_CANDIDATE.json', 'utf8'));

let C = data.C;
let Q = data.Q;
console.log(`Checking candidate C = ${C}`);

function applyG85(str) {
    let res = '';
    for(let c of str) res += G85[c];
    return res;
}

let W1 = C + applyG85(C);
let W2 = C + applyG85(W1);
let W3 = C + applyG85(W2.slice(0, 50)); // Prefix of W3

const alphabet = ['a','b','c','d'];

function checkC2(str, states) {
    let N = str.length;
    let s = new Int8Array(N);
    for(let i=0; i<N; i++) {
        let c = str[i];
        if(c==='a') s[i]=0; else if(c==='b') s[i]=1; else if(c==='c') s[i]=2; else s[i]=3;
    }
    
    let occurrences = [];
    
    for (let state of states) {
        let q = state.dW;
        let sum_q = q[0]+q[1]+q[2]+q[3];
        
        let pU = [0,0,0,0];
        for (let L1 = 0; L1 < N/2; L1++) {
            if (L1 > 0) pU[s[L1-1]]++;
            
            let L2 = L1 - sum_q;
            if (L2 < 0) continue;
            
            if (L1 >= N || str[L1] !== state.c_mid) continue;
            
            if (L1 + 1 + L2 >= N) continue; // Need c_end at L1 + 1 + L2
            if (str[L1 + 1 + L2] !== state.c_end) continue;
            
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
            if (match) occurrences.push({ q, c_mid: state.c_mid, c_end: state.c_end, L1, L2 });
        }
    }
    return occurrences;
}

let res2 = checkC2(W2, Q);
console.log(`W2 has ${res2.length} C2 occurrences`);

// Let's filter out occurrences that are just base cases (L1=0, L2=0 meaning the char is just c_mid and c_end adjacent)
let valid_res2 = res2.filter(o => o.L1 > 0 || o.L2 > 0);
console.log(`W2 has ${valid_res2.length} non-trivial C2 occurrences`);
if (valid_res2.length > 0) {
    console.log(valid_res2);
} else if (res2.length > 0) {
    console.log("All occurrences are base cases (which reduce to adjacent equal letters if q=0).");
    console.log("Wait, if they are base cases, they must be impossible in ASF words!");
    for(let o of res2) {
        console.log(`Base case: ${o.c_mid} adjacent to ${o.c_end}`);
    }
}

