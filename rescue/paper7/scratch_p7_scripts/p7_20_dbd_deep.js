const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');

const alphabet = ['a', 'b', 'c', 'd'];
let X1 = G85['a'];
let X2 = ''; for(let c of X1) X2 += G85[c];
let Y = 'dbd' + X2;

function fullASF(str) {
    return inLanguage(str, 4, 1, alphabet);
}

const candidates = [72, 73, 70];
const MAX_D = 30;

for (let m of candidates) {
    let wm = Y.slice(0, m);
    let frontier = [wm];
    let profile = [];
    
    console.log(`Starting deep search for m=${m} (length ${m})`);
    
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
        console.log(`  Depth ${d}: ${frontier.length}`);
        if (frontier.length === 0) {
            console.log(`=> m=${m} EXTINCT AT DEPTH ${d}`);
            break;
        }
        if (frontier.length > 200000) {
            console.log(`=> m=${m} ABORTED (TOO LARGE)`);
            break;
        }
    }
}
