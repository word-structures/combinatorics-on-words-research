const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');
const alphabet = ['a', 'b', 'c', 'd'];

let X1 = G85['a'];
let X2 = ''; for (let c of X1) X2 += G85[c];

function getLeftDepth(w, maxD) {
    let frontier = [w];
    for (let d = 1; d <= maxD; d++) {
        let nextF = [];
        for (let s of frontier) {
            for (let c of alphabet) {
                if (inLanguage(c + s, 4, 1, alphabet)) nextF.push(c+s);
            }
        }
        frontier = nextF;
        if (frontier.length === 0) return d;
    }
    return -1; // survived
}

let B = 'ad';
for (let m = 5; m <= 150; m += 5) {
    let w_m = B + X2.slice(0, m);
    let ld = getLeftDepth(w_m, 12);
    console.log(`m=${m}: left depth up to 12 -> ${ld}`);
}
