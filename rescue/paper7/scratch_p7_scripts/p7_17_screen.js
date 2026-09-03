const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');

const alphabet = ['a', 'b', 'c', 'd'];

let X1 = G85['a'];
let X2 = ''; for(let c of X1) X2 += G85[c];
let Y = 'ad' + X2;

function checkASF(str) {
    // fast Abelian square checker
    const len = str.length;
    for (let k = 1; k <= len / 2; k++) {
        let p1 = {a:0, b:0, c:0, d:0};
        let p2 = {a:0, b:0, c:0, d:0};
        
        // initial window
        for (let i = 0; i < k; i++) {
            p1[str[len - 2*k + i]]++;
            p2[str[len - k + i]]++;
        }
        if (p1.a===p2.a && p1.b===p2.b && p1.c===p2.c && p1.d===p2.d) return false;
        
        // Only need to check squares touching the endpoints! 
        // Wait, the string is grown on BOTH sides. So we must check all squares?
        // Actually, inLanguage from unfavourable-factors does a full check. Let's just use it!
    }
    return true; 
}

function fullASF(str) {
    return inLanguage(str, 4, 1, alphabet);
}

const MAX_D = 8; // Start with 8 to get a quick landscape, then we can do 10 for the best ones
const M_START = 3;
const M_END = 80;

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
            // Cap to avoid OOM in broad screen
            profile.push("CAP");
            break;
        }
    }
    console.log(`m=${m} wm=${wm} profile=${profile.join(',')}`);
    results.push({ m, profile, finalSize: frontier.length });
}
