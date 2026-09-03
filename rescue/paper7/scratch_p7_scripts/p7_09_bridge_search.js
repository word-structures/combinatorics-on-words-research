const { inLanguage } = require('../src/unfavourable-factors.js');
const { G85 } = require('../src/morphisms.js');

const wK = 'abcdacbabdabacdacbcdad';
const alphabet = ['a', 'b', 'c', 'd'];
const minK = 1;

// We want to find B such that wK + B + g85(a) is ASF up to some reasonable length.
// We can just run DFS for B, but at each step check if wK + B + X is valid?
// Instead of full X, we can just use a large prefix of g85^2(a).
let p85 = G85['a'];
for(let c of p85) { } // Let's just generate a 1000-char prefix of g85^2(a)
let X = '';
for(let c of G85['a']) X += G85[c];
X = X.slice(0, 1000);

let bestB = null;

function searchBridge(maxBLen) {
    let q = [{b: '', d: 0}];
    let maxD = 0;
    while(q.length > 0) {
        let {b, d} = q.pop();
        if (d > maxD) {
            maxD = d;
            console.log("Reached depth", d);
        }
        
        // Try appending X
        let candX = wK + b + X;
        // Check if candX is valid up to some length
        // We only need to check the boundary
        let isValid = true;
        // To save time, only check squares ending in the boundary region?
        // Actually, just checking if wK + b is valid is the first step.
        
        if (b.length === maxBLen) {
            // Check full string
            if (inLanguage(candX.slice(0, wK.length + b.length + 100), 4, minK, alphabet)) {
                // deep check
                if (inLanguage(candX, 4, minK, alphabet)) {
                    console.log("FOUND BRIDGE!", b);
                    bestB = b;
                    return;
                }
            }
            continue;
        }
        
        for (let c of alphabet) {
            let nextB = b + c;
            if (inLanguage(wK + nextB, 4, minK, alphabet)) {
                q.push({b: nextB, d: d+1});
            }
        }
    }
}

// searchBridge(5); // Takes too long for standard BFS because tree is huge.
// We can use a DFS to find the bridge.

function dfsBridge(b, maxBLen) {
    if (bestB) return;
    if (b.length === maxBLen) {
        let candX = wK + b + X;
        if (inLanguage(candX.slice(0, wK.length + b.length + 50), 4, minK, alphabet)) {
            if (inLanguage(candX, 4, minK, alphabet)) {
                console.log(`FOUND BRIDGE OF LENGTH ${maxBLen}:`, b);
                bestB = b;
            }
        }
        return;
    }
    
    // To prune, we can check if wK + b + X[0] is valid.
    let prefix = wK + b;
    for (let c of alphabet) {
        let nextP = prefix + c;
        if (inLanguage(nextP, 4, minK, alphabet)) {
            dfsBridge(b+c, maxBLen);
        }
    }
}

for (let len = 0; len <= 12; len++) {
    console.log("Testing bridge length", len);
    dfsBridge('', len);
    if (bestB) break;
}
