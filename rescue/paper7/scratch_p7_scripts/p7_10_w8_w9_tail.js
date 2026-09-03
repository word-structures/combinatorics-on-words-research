const { inLanguage } = require('../src/unfavourable-factors.js');
const { G85 } = require('../src/morphisms.js');

const alphabet = ['a', 'b', 'c', 'd'];
const minK = 1;

function getContinuation(startWord, targetDepth, mode) {
    let best = startWord;
    function rec(w, depth) {
        if (depth === targetDepth) { best = w; return true; }
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

let w8 = 'abcabdcb';
let w9 = 'abacabadc';

let c8First = getContinuation(w8, 200, 'first');
let c9First = getContinuation(w9, 200, 'first');

function getPermutations(arr) {
    if (arr.length === 0) return [[]];
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let rest = getPermutations(arr.slice(0, i).concat(arr.slice(i + 1)));
        for (let p of rest) result.push([arr[i]].concat(p));
    }
    return result;
}
const perms = getPermutations(alphabet);

function applyPerm(str, p) {
    let map = {a: p[0], b: p[1], c: p[2], d: p[3]};
    let res = '';
    for(let c of str) res += map[c];
    return res;
}

function checkTail(cand, seedLen, refWord, name) {
    let tail = cand.slice(seedLen);
    let bestLen = 0;
    
    for (let p of perms) {
        let permWord = applyPerm(refWord, p);
        for (let len = tail.length; len >= 10; len--) {
            if (len <= bestLen) break;
            for (let i = 0; i <= tail.length - len; i++) {
                let sub = tail.slice(i, i + len);
                if (permWord.includes(sub)) {
                    if (len > bestLen) {
                        bestLen = len;
                    }
                    break;
                }
            }
        }
    }
    console.log(`Max match for ${name}: ${bestLen}`);
}

let p85 = G85['a'] + G85['b'] + G85['c'] + G85['d']; // good chunk of G85

checkTail(c8First, w8.length, p85, 'w8');
checkTail(c9First, w9.length, p85, 'w9');

// Let's also check suffix compression (C3)
// and forced corridors
