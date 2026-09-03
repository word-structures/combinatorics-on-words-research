const { G85 } = require('../src/morphisms.js');
const { inLanguage } = require('../src/unfavourable-factors.js');

let p1 = G85['a'];
let p2 = '';
for (let c of p1) p2 += G85[c];

const alphabet = ['a', 'b', 'c', 'd'];

function testBridge(b) {
    let cand = b + p2.slice(0, 150); 
    if (inLanguage(cand, 4, 1, alphabet)) return true;
    return false;
}

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

let q = [{b: '', d: 0}];
let maxD = 6;
let foundExtinct = false;

while(q.length > 0) {
    let {b, d} = q.shift();
    
    if (d > 0) {
        if (testBridge(b)) {
            // Check if left extinct
            // We use a prefix of cand to check left extinction to save time
            let candForExtinctionCheck = b + p2.slice(0, 30); 
            let ld = getLeftDepth(candForExtinctionCheck, 15);
            if (ld !== -1) {
                // verify with more context
                let deepCand = b + p2.slice(0, 150);
                if (getLeftDepth(deepCand, 25) !== -1) {
                    console.log(`FOUND EXCEPTION! Bridge ${b} is left-extinct!`);
                    foundExtinct = true;
                }
            }
        }
    }
    
    if (d < maxD) {
        for (let c of alphabet) {
            // prune if B itself + some context is already invalid
            if (b==='' || inLanguage(b+c + p2.slice(0,10), 4, 1, alphabet)) {
                q.push({b: b+c, d: d+1});
            }
        }
    }
}
if (!foundExtinct) console.log("No left-extinct boundary found up to length " + maxD);
