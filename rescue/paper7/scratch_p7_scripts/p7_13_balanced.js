const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');
const alphabet = ['a', 'b', 'c', 'd'];

let X1 = G85['a'];
let X = X1; // 85 chars

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
        if (frontier.length === 0) return d;
    }
    return -1; // survived
}

let B = 'ad';
for (let m = 3; m <= 15; m++) {
    let wm = B + X.slice(0, m);
    let extD = getTd(wm, 15);
    console.log(`B='ad', m=${m}, w_m=${wm} -> T_d extinct at d=${extD}`);
}

// Let's also check other candidates
let B2 = 'cbd'; // escaped at m=1
for (let m = 1; m <= 10; m++) {
    let wm = B2 + X.slice(0, m);
    let extD = getTd(wm, 15);
    console.log(`B='cbd', m=${m}, w_m=${wm} -> T_d extinct at d=${extD}`);
}
