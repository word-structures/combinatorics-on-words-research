const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');
const alphabet = ['a', 'b', 'c', 'd'];

let X1 = G85['a'];
let X2 = ''; for(let c of X1) X2 += G85[c];

function fullASF(str) { return inLanguage(str, 4, 1, alphabet); }

const boundaries = ['cbd', 'bdb', 'ad', 'bad', 'cad', 'dbd', 'adb'];
const M_START = 3;
const M_END = 20; // smaller range for quick comparison
const MAX_BAL_D = 7;
const MAX_LEFT_D = 12;

let results = {};

for (let B of boundaries) {
    console.log(`\nTesting boundary ${B}`);
    let Y = B + X2;
    results[B] = { balanced: [], left: [] };
    
    // Balanced Screen
    let minBal = Infinity;
    for (let m = M_START; m <= M_END; m++) {
        let wm = Y.slice(0, m);
        let frontier = [wm];
        for (let d = 1; d <= MAX_BAL_D; d++) {
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
            if (frontier.length > 30000) {
                frontier = frontier.slice(0, 30000); // cap to keep memory low
            }
        }
        minBal = Math.min(minBal, frontier.length);
    }
    console.log(`  Min balanced frontier at d=${MAX_BAL_D}: ${minBal}`);
    results[B].minBal = minBal;
    
    // Left Screen
    let minLeft = Infinity;
    for (let m = M_START; m <= M_END; m++) {
        let wm = Y.slice(0, m);
        let frontier = [wm];
        for (let d = 1; d <= MAX_LEFT_D; d++) {
            let nextF = [];
            for (let s of frontier) {
                for (let cL of alphabet) {
                    let cand = cL + s;
                    if (fullASF(cand)) nextF.push(cand);
                }
            }
            frontier = nextF;
            if (frontier.length > 10000) {
                frontier = frontier.slice(0, 10000);
            }
        }
        minLeft = Math.min(minLeft, frontier.length);
    }
    console.log(`  Min left frontier at d=${MAX_LEFT_D}: ${minLeft}`);
    results[B].minLeft = minLeft;
}
