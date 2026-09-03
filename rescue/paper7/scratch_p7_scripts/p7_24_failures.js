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
            if (pu.join(',') === pv.join(',')) {
                return { start: i, K: K, u: u, v: v };
            }
        }
    }
    return null;
}

for (let B of boundaries) {
    let W0 = B;
    let W1 = B + applyG85(W0);
    let sq1 = findSquares(W1);
    if (sq1) {
        console.log(`B=${B}, W1 failure: start=${sq1.start}, K=${sq1.K}, halves=${sq1.u}|${sq1.v}`);
    }
}
