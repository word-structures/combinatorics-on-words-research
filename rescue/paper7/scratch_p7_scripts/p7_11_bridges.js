const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');

let X = G85['a'];
for (let c of G85['a']) X += G85[c]; // This is length 85 + 7225? No, X is just getting appended.
// Let's generate g85^2(a) properly:
let p1 = G85['a'];
let p2 = '';
for (let c of p1) p2 += G85[c];

const alphabet = ['a', 'b', 'c', 'd'];

function testBridge(b) {
    let cand = b + p2.slice(0, 1000); // Test against first 1000 chars of X
    if (inLanguage(cand, 4, 1, alphabet)) {
        return true;
    }
    return false;
}

let validB = [];
for (let c of alphabet) {
    if (testBridge(c)) validB.push(c);
}
console.log("Length 1 bridges:", validB);

for (let c1 of alphabet) {
    for (let c2 of alphabet) {
        let b = c1 + c2;
        if (testBridge(b)) validB.push(b);
    }
}
console.log("Length 1 & 2 bridges:", validB);

// Test if left-extinct
for (let b of validB) {
    let cand = b + p2.slice(0, 30);
    // Let's see if cand is left-extinct at some depth
    let frontier = [cand];
    let extinctDepth = -1;
    for (let d=1; d<=15; d++) {
        let nextF = [];
        for (let w of frontier) {
            for (let c of alphabet) {
                if (inLanguage(c + w, 4, 1, alphabet)) nextF.push(c+w);
            }
        }
        frontier = nextF;
        if (frontier.length === 0) {
            extinctDepth = d;
            break;
        }
    }
    console.log(`Bridge ${b}: left extinct at depth ${extinctDepth}`);
}

