const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');

const alphabet = ['a', 'b', 'c', 'd'];

function applyG85(str) {
    let res = '';
    for(let c of str) res += G85[c];
    return res;
}

function fullASF(str) {
    return inLanguage(str, 4, 1, alphabet);
}

let W0 = "dbd";
let W1 = "dbd" + applyG85(W0);
let W2 = "dbd" + applyG85(W1);

console.log(`W0 length: ${W0.length}`);
console.log(`W0 ASF: ${fullASF(W0)}`);

console.log(`W1 length: ${W1.length}`);
console.log(`W1 ASF: ${fullASF(W1)}`);

console.log(`W2 length: ${W2.length}`);
console.log(`W2 ASF: ${fullASF(W2)}`);
