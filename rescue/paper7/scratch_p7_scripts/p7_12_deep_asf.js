const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');
const alphabet = ['a', 'b', 'c', 'd'];

console.log("Generating G85^3(a)...");
let X1 = G85['a'];
let X2 = ''; for (let c of X1) X2 += G85[c];
let X3 = ''; for (let c of X2) X3 += G85[c];

let cand = 'ad' + X3.slice(0, 5000);
console.log("Checking cand of length", cand.length);
let isASF = true;
let failLen = -1;

for (let i = 2; i <= cand.length; i++) {
    if (!inLanguage(cand.slice(0, i), 4, 1, alphabet)) {
        isASF = false;
        failLen = i;
        break;
    }
}
if (isASF) console.log("ad+X is ASF up to length", cand.length);
else console.log("FAILED at length", failLen);

let cand2 = 'bad' + X3.slice(0, 5000);
let isASF2 = true;
for (let i = 3; i <= cand2.length; i++) {
    if (!inLanguage(cand2.slice(0, i), 4, 1, alphabet)) {
        isASF2 = false;
        failLen = i;
        break;
    }
}
if (isASF2) console.log("bad+X is ASF up to length", cand2.length);
else console.log("bad+X FAILED at length", failLen);
