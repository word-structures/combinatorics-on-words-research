const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');

let X = G85['a'] + G85['b'] + G85['c']; 
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
    return frontier.map(s => s.slice(0, maxD));
}

let d3 = getLeftExtensions(X.slice(0, 150), 3);
console.log("Left extensions of X[0..150] (len 3):", d3);

for (let ext of d3) {
    let cand = ext + X.slice(0, 150);
    let frontier = [cand];
    let extinctDepth = -1;
    for (let d = 1; d <= 25; d++) {
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
