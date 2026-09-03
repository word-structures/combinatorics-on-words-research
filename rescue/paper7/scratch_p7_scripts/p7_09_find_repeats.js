const { inLanguage } = require('../src/unfavourable-factors.js');
const alphabet = ['a', 'b', 'c', 'd'];
const wK = 'abcdacbabdabacdacbcdad';
let best = wK;
function rec(w, depth) {
    if (depth === 500) { best = w; return true; }
    for (let c of alphabet) {
        if (inLanguage(w+c, 4, 1, alphabet)) {
            if (rec(w+c, depth+1)) return true;
        }
    }
    return false;
}
rec(wK, 0);

let tail = best.slice(wK.length);

function findRepeats(str) {
    let maxLen = 0;
    let bestSub = '';
    let count = 0;
    // suffix tree or simple loop since length is small (500)
    for (let len = 50; len >= 10; len--) {
        let seen = new Map();
        for (let i = 0; i <= str.length - len; i++) {
            let sub = str.slice(i, i+len);
            seen.set(sub, (seen.get(sub) || 0) + 1);
        }
        for (let [sub, c] of seen) {
            if (c > 1) {
                console.log(`Repeated (len ${len}, count ${c}): ${sub}`);
                if (len > maxLen) { maxLen = len; bestSub = sub; count = c; }
            }
        }
        if (maxLen > 0) break; // found max length
    }
}

console.log("Analyzing Tail Repeats:");
findRepeats(tail);

console.log("\nAnalyzing Full String Repeats:");
findRepeats(best);
