const { G85 } = require('../src/morphisms.js');

const alphabet = ['a', 'b', 'c', 'd'];
const boundaries = ['cbd', 'bdb', 'ad', 'bad', 'cad', 'dbd', 'adb'];

function applyG85(str) {
    let res = '';
    for(let c of str) res += G85[c];
    return res;
}

function findSquaresFast(str) {
    let N = str.length;
    // Map chars to 0..3 for speed
    let s = new Int8Array(N);
    for(let i=0; i<N; i++) {
        let c = str[i];
        if(c==='a') s[i]=0;
        else if(c==='b') s[i]=1;
        else if(c==='c') s[i]=2;
        else s[i]=3;
    }
    
    for (let K = 1; K <= Math.floor(N / 2); K++) {
        // use sliding window
        let pu = [0,0,0,0];
        let pv = [0,0,0,0];
        
        for(let j=0; j<K; j++) pu[s[j]]++;
        for(let j=K; j<2*K; j++) pv[s[j]]++;
        
        if (pu[0]===pv[0] && pu[1]===pv[1] && pu[2]===pv[2] && pu[3]===pv[3]) {
            return { start: 0, K: K, u: str.slice(0, K), v: str.slice(K, 2*K) };
        }
        
        for (let i = 1; i <= N - 2*K; i++) {
            // slide window
            pu[s[i-1]]--;
            pu[s[i+K-1]]++;
            
            pv[s[i+K-1]]--;
            pv[s[i+2*K-1]]++;
            
            if (pu[0]===pv[0] && pu[1]===pv[1] && pu[2]===pv[2] && pu[3]===pv[3]) {
                return { start: i, K: K, u: str.slice(i, i+K), v: str.slice(i+K, i+2*K) };
            }
        }
    }
    return null;
}

for (let B of boundaries) {
    console.log(`\n--- Boundary: ${B} ---`);
    let W0 = B;
    let W1 = B + applyG85(W0);
    console.log(`W1 length: ${W1.length}`);
    
    let sq1 = findSquaresFast(W1);
    if (sq1) {
        console.log(`W1 ASF: false (Dies at W1)`);
        console.log(`First failure: start=${sq1.start}, K=${sq1.K}`);
        continue;
    }
    console.log(`W1 ASF: true`);
    
    let W2 = B + applyG85(W1);
    console.log(`W2 length: ${W2.length}`);
    
    let sq2 = findSquaresFast(W2);
    if (sq2) {
        console.log(`W2 ASF: false (Dies at W2)`);
        console.log(`First failure: start=${sq2.start}, K=${sq2.K}`);
        continue;
    }
    console.log(`W2 ASF: true (LOW-GENERATION TOWER SURVIVOR)`);
}
