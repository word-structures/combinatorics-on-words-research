const { G85 } = require('../src/morphisms.js');
let B = "ad";
function applyG85(str) {
    let res = '';
    for(let c of str) res += G85[c];
    return res;
}
let W0 = B;
let W1 = B + applyG85(W0);
let W2 = B + applyG85(W1);

// We only need to check the beginning of W3!
// Since the occurrence is L1=1, L2=1 in W2.
// The square in W3 should cross the boundary!
let W3_prefix = B + applyG85(W2.slice(0, 50)); 
// This is plenty to find the square!

const alphabet = ['a','b','c','d'];
function findSquaresFast(str) {
    let N = str.length;
    let s = new Int8Array(N);
    for(let i=0; i<N; i++) {
        let c = str[i];
        if(c==='a') s[i]=0; else if(c==='b') s[i]=1; else if(c==='c') s[i]=2; else s[i]=3;
    }
    
    for (let K = 1; K <= Math.floor(N / 2); K++) {
        let pu = [0,0,0,0];
        let pv = [0,0,0,0];
        for(let j=0; j<K; j++) pu[s[j]]++;
        for(let j=K; j<2*K; j++) pv[s[j]]++;
        
        if (pu[0]===pv[0] && pu[1]===pv[1] && pu[2]===pv[2] && pu[3]===pv[3]) {
            return { start: 0, K: K };
        }
        for (let i = 1; i <= N - 2*K; i++) {
            pu[s[i-1]]--; pu[s[i+K-1]]++;
            pv[s[i+K-1]]--; pv[s[i+2*K-1]]++;
            if (pu[0]===pv[0] && pu[1]===pv[1] && pu[2]===pv[2] && pu[3]===pv[3]) {
                return { start: i, K: K };
            }
        }
    }
    return null;
}

let sq = findSquaresFast(W3_prefix);
if (sq) {
    console.log(`Square found in W3! start=${sq.start}, K=${sq.K}`);
} else {
    console.log("No square found in W3 prefix.");
}
