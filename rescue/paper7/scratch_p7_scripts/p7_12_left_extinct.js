const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');
const alphabet = ['a', 'b', 'c', 'd'];

let X = G85['a'] + G85['b']; 

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

let candidates = ['ad', 'adb', 'bdb', 'bad', 'cad', 'cbd', 'dbd'];

for (let B of candidates) {
    let extinct = false;
    // Check increasing m
    for (let m = 5; m <= 50; m += 5) {
        let w_m = B + X.slice(0, m);
        let ld = getLeftDepth(w_m, 25);
        if (ld !== -1) {
            console.log(`B = '${B}': w_${m} is LEFT EXTINCT at depth ${ld}!`);
            extinct = true;
            break;
        }
    }
    if (!extinct) {
        console.log(`B = '${B}': Survived left extinction to depth 25 for all m <= 50`);
    }
}
