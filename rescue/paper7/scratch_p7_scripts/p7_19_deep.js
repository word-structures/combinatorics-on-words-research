const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');
const alphabet = ['a', 'b', 'c', 'd'];
let X1 = G85['a'];
let X2 = ''; for(let c of X1) X2 += G85[c];

function fullASF(str) { return inLanguage(str, 4, 1, alphabet); }

const boundaries = ['cbd', 'cad', 'dbd'];
const M_START = 3;
const M_END = 20;

for (let B of boundaries) {
    let Y = B + X2;
    for (let m = M_START; m <= M_END; m++) {
        let wm = Y.slice(0, m);
        let frontier = [wm];
        for (let d = 1; d <= 9; d++) {
            let nextF = [];
            for (let s of frontier) {
                for (let cL of alphabet) {
                    for (let cR of alphabet) {
                        let cand = cL + s + cR;
                        if (fullASF(cand)) nextF.push(cand);
                    }
                }
            }
            frontier = nextF;
            if (frontier.length === 0) {
                console.log(`EXTINCTION! Boundary ${B} m=${m} died at d=${d}`);
                break;
            }
            if (frontier.length > 20000) {
                frontier = frontier.slice(0, 20000);
            }
        }
    }
}
