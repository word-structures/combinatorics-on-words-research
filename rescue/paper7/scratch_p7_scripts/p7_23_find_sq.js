const { G85 } = require('../src/morphisms.js');

function applyG85(str) {
    let res = '';
    for(let c of str) res += G85[c];
    return res;
}

let W0 = "dbd";
let W1 = "dbd" + applyG85(W0);

const alphabet = ['a','b','c','d'];

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
                return { start: i, K: K, u: u, v: v, pu: pu };
            }
        }
    }
    return null;
}

let sq = findSquares(W1);
console.log(sq);
