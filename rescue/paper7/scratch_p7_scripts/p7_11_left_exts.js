const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');

let X = G85['a'] + G85['b'] + G85['c']; // 255 chars
const alphabet = ['a', 'b', 'c', 'd'];

function getLeftExtensions(w, maxD) {
    let frontier = [w];
    for (let d = 1; d <= maxD; d++) {
        let nextF = [];
        for (let s of frontier) {
            for (let c of alphabet) {
                if (inLanguage(c + s, 4, 1, alphabet)) nextF.push(c+s);
            }
        }
        frontier = nextF;
        if (frontier.length === 0) return [];
    }
    // extract just the added parts
    return frontier.map(s => s.slice(0, maxD));
}

let d1 = getLeftExtensions(X.slice(0, 50), 1);
console.log("Left extensions of X[0..50] (len 1):", d1);

let d2 = getLeftExtensions(X.slice(0, 50), 2);
console.log("Left extensions of X[0..50] (len 2):", d2);

// Check if any of these left extensions are exceptional (i.e. die at some depth)
// For each extension of length 2, let's see how deep it can go
for (let ext of d2) {
    let cand = ext + X.slice(0, 50);
    // how deep can this cand be extended to the left?
    let frontier = [cand];
    let extinctDepth = -1;
    for (let d = 1; d <= 20; d++) {
        let nextF = [];
        for (let s of frontier) {
            for (let c of alphabet) {
                if (inLanguage(c + s, 4, 1, alphabet)) nextF.push(c+s);
            }
        }
        frontier = nextF;
        if (frontier.length === 0) {
            extinctDepth = d;
            break;
        }
    }
    console.log(`Extension ${ext}: left extinct at depth ${extinctDepth}`);
}

