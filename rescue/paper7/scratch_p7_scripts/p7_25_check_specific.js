const { G85 } = require('../src/morphisms.js');
const alphabet = ['a', 'b', 'c', 'd'];
function getParikh(str) {
    let p = [0,0,0,0];
    for(let c of str) p[alphabet.indexOf(c)]++;
    return p;
}

let U = "ad" + G85['a'] + G85['d'].slice(0, 75);
let V = G85['d'].slice(75) + G85['a'] + G85['d'].slice(0, 67);

let pU = getParikh(U);
let pV = getParikh(V);

console.log("U length:", U.length);
console.log("V length:", V.length);
console.log("pU:", pU);
console.log("pV:", pV);
console.log("Equal?", pU.join(',') === pV.join(','));
