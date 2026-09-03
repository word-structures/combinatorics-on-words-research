const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');
const alphabet = ['a', 'b', 'c', 'd'];

let X1 = G85['a'];
let X2 = ''; for(let c of X1) X2 += G85[c];
let Y = 'ad' + X2.slice(0, 300); // 302 characters of Y

function checkASF(str) {
    return inLanguage(str, 4, 1, alphabet);
}

let frontier = [Y];
let maxD = 200;

for (let d = 1; d <= maxD; d++) {
    let nextF = [];
    for (let s of frontier) {
        for (let c of alphabet) {
            let cand = c + s;
            // optimization: only check squares touching the new left character
            let isAsf = true;
            for (let k = 1; k <= cand.length / 2; k++) {
                let p1 = [0,0,0,0];
                let p2 = [0,0,0,0];
                for (let i = 0; i < k; i++) p1[alphabet.indexOf(cand[i])]++;
                for (let i = 0; i < k; i++) p2[alphabet.indexOf(cand[k+i])]++;
                if (p1[0]===p2[0] && p1[1]===p2[1] && p1[2]===p2[2] && p1[3]===p2[3]) {
                    isAsf = false;
                    break;
                }
            }
            if (isAsf) {
                // to be safe, full check
                // actually we know Y is ASF, so checking the prefix is sufficient
                nextF.push(cand);
            }
        }
    }
    frontier = nextF;
    console.log(`Left-extension Depth ${d}: ${frontier.length}`);
    if (frontier.length === 0) {
        console.log("Extinct!");
        break;
    }
    if (frontier.length > 1000) {
        // trim to prevent explosion
        frontier = frontier.slice(0, 1000);
    }
}
