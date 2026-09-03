const { G85 } = require('../src/morphisms.js');

function applyG85(str) {
    let res = '';
    for(let c of str) res += G85[c];
    return res;
}

let W0 = "ad";
let W1 = "ad" + applyG85(W0);
let W2 = "ad" + applyG85(W1);

const alphabet = ['a','b','c','d'];

function checkState(str, targetOffset) {
    let N = str.length;
    let s = new Int8Array(N);
    for(let i=0; i<N; i++) {
        let c = str[i];
        if(c==='a') s[i]=0; else if(c==='b') s[i]=1; else if(c==='c') s[i]=2; else s[i]=3;
    }
    
    // Check if there is any K and any i such that P(u) - P(v) == targetOffset
    // u = str[i .. i+K-1], v = str[i+K .. i+2K-1]
    
    let counter = 0;
    for (let K = 1; K <= Math.floor(N / 2); K++) {
        let pu = [0,0,0,0];
        let pv = [0,0,0,0];
        
        for(let j=0; j<K; j++) pu[s[j]]++;
        for(let j=K; j<2*K; j++) pv[s[j]]++;
        
        let match = true;
        for(let j=0; j<4; j++) if (pu[j] - pv[j] !== targetOffset[j]) match = false;
        if (match) {
            console.log(`State found! K=${K}, start=${0}`);
            counter++;
        }
        
        for (let i = 1; i <= N - 2*K; i++) {
            pu[s[i-1]]--;
            pu[s[i+K-1]]++;
            pv[s[i+K-1]]--;
            pv[s[i+2*K-1]]++;
            
            match = true;
            for(let j=0; j<4; j++) if (pu[j] - pv[j] !== targetOffset[j]) match = false;
            if (match) {
                console.log(`State found! K=${K}, start=${i}`);
                counter++;
                // return to fail fast if we just want to know if it exists
                if (counter > 5) return counter; 
            }
        }
    }
    return counter;
}

console.log("Checking [-2,1,0,0] on W1...");
let c1 = checkState(W1, [-2,1,0,0]);
console.log(`W1 counter: ${c1}`);

console.log("Checking [-2,1,0,0] on W2...");
let c2 = checkState(W2, [-2,1,0,0]);
console.log(`W2 counter: ${c2}`);
