const { extensionDepth, inLanguage } = require('../src/unfavourable-factors.js');
const { G85, G98, G109 } = require('../src/morphisms.js');

const wK = 'abcdacbabdabacdacbcdad';
const alphabet = ['a', 'b', 'c', 'd'];
const minK = 1;

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

function iterate(morph, start, iterations) {
    let res = start;
    for(let i=0; i<iterations; i++) {
        let next = '';
        for(let c of res) next += morph[c];
        res = next;
    }
    return res;
}

const p85 = iterate(G85, 'a', 2);
const p98 = iterate(G98, 'a', 2);
const p109 = iterate(G109, 'a', 2);

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

function checkMatchAllPerms(cand, refWord, name) {
    let tail = cand.slice(wK.length);
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
                        console.log(`Match in ${name} (perm ${p.join('')})! Length: ${len}`);
                        if (i + len === tail.length) console.log(`-> TAIL-CAPTURE!`);
                    }
                    break;
                }
            }
        }
    }
}

console.log("Checking permutations...");
checkMatchAllPerms(wFirst, p85, 'G85_First');
checkMatchAllPerms(wLast, p85, 'G85_Last');
checkMatchAllPerms(wFirst, p98, 'G98_First');
checkMatchAllPerms(wLast, p98, 'G98_Last');
checkMatchAllPerms(wFirst, p109, 'G109_First');
checkMatchAllPerms(wLast, p109, 'G109_Last');
