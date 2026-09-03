const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');
const alphabet = ['a', 'b', 'c', 'd'];

let X1 = G85['a'];
let X = X1;

function getTd(w, maxD) {
    let frontier = [w];
    for (let d = 1; d <= maxD; d++) {
        let nextF = [];
        for (let s of frontier) {
            for (let cL of alphabet) {
                for (let cR of alphabet) {
                    let cand = cL + s + cR;
                    if (inLanguage(cand, 4, 1, alphabet)) {
                        nextF.push(cand);
                    }
                }
            }
        }
        frontier = nextF;
        console.log(`  Depth ${d}, frontier size ${frontier.length}`);
        if (frontier.length === 0) return d;
        if (frontier.length > 50000) return -1; // cap
    }
    return -1; // survived
}

let B = 'ad';
for (let m = 3; m <= 6; m++) {
    let wm = B + X.slice(0, m);
    console.log(`Checking B='ad', m=${m}, w_m=${wm}...`);
    let extD = getTd(wm, 10);
    console.log(`-> T_d extinct at d=${extD}`);
}
