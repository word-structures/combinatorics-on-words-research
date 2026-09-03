const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');

const alphabet = ['a', 'b', 'c', 'd'];

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

let w8 = 'abcabdcb'; // known left-extinct at depth 2
let g85w8 = '';
for (let c of w8) g85w8 += G85[c];

console.log("Length of g85(w8):", g85w8.length);

// Check if g85(w8) is left extinct
let d = getLeftDepth(g85w8.slice(0, 150), 30); // use prefix to save time, since left extinction only depends on the left boundary
console.log(`Left depth of g85(w8) prefix: ${d}`);

let fullD = getLeftDepth(g85w8, 10);
console.log(`Left depth of full g85(w8) to depth 10: ${fullD}`);
