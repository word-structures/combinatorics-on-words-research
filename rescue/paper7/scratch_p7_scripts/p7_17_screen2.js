const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');

const alphabet = ['a', 'b', 'c', 'd'];

let X1 = G85['a'];
let X2 = ''; for(let c of X1) X2 += G85[c];
let Y = 'ad' + X2;

function fullASF(str) {
    return inLanguage(str, 4, 1, alphabet);
}

const MAX_D = 8;
const M_START = 81;
const M_END = 128;

let results = [];

for (let m = M_START; m <= M_END; m++) {
    let wm = Y.slice(0, m);
    let frontier = [wm];
    let profile = [];
    
    let died = false;
    for (let d = 1; d <= MAX_D; d++) {
        let nextF = [];
        for (let s of frontier) {
            for (let cL of alphabet) {
                for (let cR of alphabet) {
                    let cand = cL + s + cR;
                    if (fullASF(cand)) {
                        nextF.push(cand);
                    }
                }
            }
        }
        frontier = nextF;
        profile.push(frontier.length);
        if (frontier.length === 0) {
            died = true;
            break;
        }
        if (frontier.length > 50000) {
            profile.push("CAP");
            break;
        }
    }
    console.log(`m=${m} wm=${wm} profile=${profile.join(',')}`);
    results.push({ m, profile, finalSize: frontier.length });
}
