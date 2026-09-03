const { G85 } = require('../src/morphisms.js');

const alphabet = ['a', 'b', 'c', 'd'];
const boundaries = ['cbd', 'bdb', 'ad', 'bad', 'cad', 'dbd', 'adb'];

function applyG85(str) {
    let res = '';
    for(let c of str) res += G85[c];
    return res;
}

function findSquares(str) {
    for (let K = 1; K <= Math.floor(str.length / 2); K++) {
        for (let i = 0; i <= str.length - 2*K; i++) {
            let u = str.slice(i, i+K);
            let v = str.slice(i+K, i+2*K);
            let pu = [0,0,0,0];
            let pv = [0,0,0,0];
            for (let c of u) pu[alphabet.indexOf(c)]++;
            for (let c of v) pv[alphabet.indexOf(c)]++;
            if (pu[0]===pv[0] && pu[1]===pv[1] && pu[2]===pv[2] && pu[3]===pv[3]) {
                return { start: i, K: K, u: u, v: v, pu: pu };
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
    
    let sq1 = findSquares(W1);
    if (sq1) {
        console.log(`W1 ASF: false (Dies at W1)`);
        console.log(`First failure: start=${sq1.start}, K=${sq1.K}, halves=${sq1.u}|${sq1.v}`);
        continue;
    }
    console.log(`W1 ASF: true`);
    
    let W2 = B + applyG85(W1);
    console.log(`W2 length: ${W2.length}`);
    
    // Check W2
    let sq2 = findSquares(W2);
    if (sq2) {
        console.log(`W2 ASF: false (Dies at W2)`);
        console.log(`First failure: start=${sq2.start}, K=${sq2.K}, halves=${sq2.u}|${sq2.v}`);
        continue;
    }
    console.log(`W2 ASF: true (LOW-GENERATION TOWER SURVIVOR)`);
}
