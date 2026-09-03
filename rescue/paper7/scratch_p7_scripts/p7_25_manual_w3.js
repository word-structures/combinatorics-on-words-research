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

let W3_prefix = B + applyG85(W2.slice(0, 50)); 
let U = W3_prefix.slice(0, 162);
let V = W3_prefix.slice(162, 324);

const alphabet = ['a','b','c','d'];
function getParikh(str) {
    let p = [0,0,0,0];
    for(let c of str) p[alphabet.indexOf(c)]++;
    return p;
}

let pU = getParikh(U);
let pV = getParikh(V);

console.log("U length:", U.length);
console.log("V length:", V.length);
console.log("pU:", pU);
console.log("pV:", pV);
console.log("Equal?", pU.join(',') === pV.join(','));

console.log("U end:", U.slice(-10));
console.log("V start:", V.slice(0, 10));

// Wait, the fast square finder in p7_25_recheck_w3.js started K from 1 to N/2.
// Did it find it?
