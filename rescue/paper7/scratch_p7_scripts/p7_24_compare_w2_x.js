const { G85 } = require('../src/morphisms.js');

let X = 'a';
for(let i=0; i<4; i++) {
    let res = '';
    for(let c of X) res += G85[c];
    X = res;
}
// X is a large prefix of g85^w(a)

function applyG85(str) {
    let res = '';
    for(let c of str) res += G85[c];
    return res;
}

let W0 = "ad";
let W1 = "ad" + applyG85(W0);
let W2 = "ad" + applyG85(W1);

let matchLen = 0;
while(matchLen < W2.length && matchLen < X.length && W2[matchLen] === X[matchLen]) {
    matchLen++;
}

console.log(`W2 matches X up to index: ${matchLen}`);
console.log(`W2[0..10]: ${W2.slice(0,10)}`);
console.log(`X[0..10]:  ${X.slice(0,10)}`);
