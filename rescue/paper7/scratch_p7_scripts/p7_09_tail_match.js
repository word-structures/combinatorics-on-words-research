const { extensionDepth, inLanguage } = require('../src/unfavourable-factors.js');
const { G85, G98, G109 } = require('../src/morphisms.js');

const wK = 'abcdacbabdabacdacbcdad';
const alphabet = ['a', 'b', 'c', 'd'];
const minK = 1;

// DFS to find one deep continuation
function getContinuation(startWord, targetDepth, mode) {
    let best = startWord;
    function rec(w, depth) {
        if (depth === targetDepth) {
            best = w;
            return true;
        }
        let chars = (mode === 'first') ? alphabet : [...alphabet].reverse();
        for (let c of chars) {
            let next = w + c;
            if (inLanguage(next, 4, minK, alphabet)) {
                if (rec(next, depth + 1)) return true;
            }
        }
        return false;
    }
    rec(startWord, 0);
    return best;
}

const wFirst = getContinuation(wK, 500, 'first');
const wLast = getContinuation(wK, 500, 'last');

console.log("First continuation length:", wFirst.length);
console.log("Last continuation length:", wLast.length);

// Generate prefixes of known fixed points
function iterate(morph, start, iterations) {
    let res = start;
    for(let i=0; i<iterations; i++) {
        let next = '';
        for(let c of res) next += morph[c];
        res = next;
    }
    return res;
}

const p85 = iterate(G85, 'a', 2); // 85^2 = 7225
const p98 = iterate(G98, 'a', 2); // 98^2 = 9604
const p109 = iterate(G109, 'a', 2); 

// Check if continuation aligns with any morphic word
function checkMatch(cand, refWord, name) {
    // cand is length 522. We want to find the longest match of a suffix of cand
    // with a prefix (or factor) of refWord.
    // Or, more broadly, cand = wK + B + Y, where Y is a factor of refWord.
    // Let's just find the longest common substring between cand (ignoring the wK part if needed)
    // and refWord.
    let maxMatch = 0;
    let matchPos = -1;
    let tail = cand.slice(wK.length); // length 500
    
    // Check longest substring of tail that appears in refWord
    for (let len = tail.length; len >= 10; len--) {
        for (let i = 0; i <= tail.length - len; i++) {
            let sub = tail.slice(i, i + len);
            if (refWord.includes(sub)) {
                console.log(`Match in ${name}! Length: ${len}, At tail offset: ${i}`);
                // Check if this match goes to the end of tail
                if (i + len === tail.length) {
                    console.log(`-> This is a TAIL-CAPTURE CANDIDATE!`);
                }
                return;
            }
        }
    }
    console.log(`No match >= 10 found in ${name}`);
}

checkMatch(wFirst, p85, 'G85');
checkMatch(wLast, p85, 'G85');
checkMatch(wFirst, p98, 'G98');
checkMatch(wLast, p98, 'G98');
checkMatch(wFirst, p109, 'G109');
checkMatch(wLast, p109, 'G109');

// We should also allow alphabet permutations.
// But first, let's just do a naive check.
