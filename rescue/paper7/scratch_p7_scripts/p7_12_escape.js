const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');

const alphabet = ['a', 'b', 'c', 'd'];

console.log("Generating G85^3(a)...");
let X1 = G85['a'];
let X2 = ''; for (let c of X1) X2 += G85[c];
let X3 = ''; for (let c of X2) X3 += G85[c];

const X = X3; 
const X_small = X.slice(0, 10000);

let candidates = [
    'b', 'c', 'd',
    'db', 'ac', 'ad', 'bd',
    'adb', 'bdb', 'cdb', 'dac', 'bad', 'cad', 'abd', 'cbd', 'dbd'
];

console.log("Checking escape lengths...");

function getEscapeLength(B) {
    // Check B + X[0:m]
    for (let m = 1; m <= 500; m++) {
        let cand = B + X.slice(0, m);
        if (!X.includes(cand)) {
            return m;
        }
    }
    return -1; // No escape found up to 500
}

let escaped = [];
for (let B of candidates) {
    let E = getEscapeLength(B);
    if (E === -1) {
        console.log(`B = '${B}': Internal Recurrent Factor (E > 500)`);
    } else {
        console.log(`B = '${B}': ESCAPED at m = ${E}`);
        escaped.push({B, E});
    }
}

console.log("\nChecking if escaped candidates are eventually illegal...");
for (let item of escaped) {
    let B = item.B;
    // We want to test B + X for ASF up to a large length
    let isIllegal = false;
    let failLength = -1;
    // We already know X is ASF, so we only need to check squares that cross the boundary!
    // A crossing square has center in B + X.
    let fullCand = B + X_small; // length ~ 10000
    // Actually, inLanguage is fast enough for ~3000 chars
    // But it checks from scratch.
    
    // incremental check
    let cand = B;
    for (let i = 0; i < 2000; i++) {
        cand += X_small[i];
        if (!inLanguage(cand, 4, 1, alphabet)) {
            isIllegal = true;
            failLength = cand.length;
            break;
        }
    }
    if (isIllegal) {
        console.log(`B = '${B}': Exceptional but eventually illegal at total length ${failLength} (Case B)`);
    } else {
        console.log(`B = '${B}': Survived ASF check to length 2000! (Case C candidate?)`);
    }
}
