const fs = require('fs');
const FORBID4 = ['baac', 'caab', 'abbc', 'cbba', 'accb', 'bcca'];

function isAa2fr(w) {
    if (w.length >= 4) {
        let last4 = w.substring(w.length - 4);
        if (FORBID4.includes(last4)) return false;
    }
    for (let h = 2; h <= Math.floor(w.length / 2); h++) {
        let right = w.substring(w.length - h);
        let left = w.substring(w.length - 2*h, w.length - h);
        if (left.split('').sort().join('') === right.split('').sort().join('')) return false;
    }
    return true;
}

const L = 5;
let validBlocks = [];
let chars = ['a', 'b', 'c'];
function gen(prefix) {
    if (prefix.length === L) {
        let valid = true;
        for (let i = 0; i <= prefix.length - 4; i++) {
            if (FORBID4.includes(prefix.substring(i, i+4))) valid = false;
        }
        for (let h = 2; h <= Math.floor(prefix.length / 2); h++) {
            for (let i = 0; i <= prefix.length - 2*h; i++) {
                let left = prefix.substring(i, i+h);
                let right = prefix.substring(i+h, i+2*h);
                if (left.split('').sort().join('') === right.split('').sort().join('')) valid = false;
            }
        }
        if (valid) validBlocks.push(prefix);
        return;
    }
    for (let c of chars) {
        gen(prefix + c);
    }
}
gen('');
console.log("Blocks:", validBlocks.length);

let maxDepth = 0;
let maxWord = "";

function dfs(currentWord, depth) {
    if (depth > maxDepth) {
        maxDepth = depth;
        maxWord = currentWord;
        if (depth % 2 === 0) console.log("Depth", depth, "Len", currentWord.length);
    }
    for (let b of validBlocks) {
        let nextWord = currentWord + b;
        let ok = true;
        for(let j = currentWord.length; j < nextWord.length; j++) {
            if (!isAa2fr(nextWord.substring(0, j+1))) {
                ok = false;
                break;
            }
        }
        if (ok) {
            dfs(nextWord, depth + 1);
        }
    }
}

dfs("", 0);
console.log("Max Depth:", maxDepth);
console.log("Max Word:", maxWord);
