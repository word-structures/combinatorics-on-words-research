const fs = require('fs');
const FORBID4 = ['baac', 'caab', 'abbc', 'cbba', 'accb', 'bcca'];
function isAa2fr(w) {
    if (w.length >= 4 && FORBID4.includes(w.substring(w.length - 4))) return false;
    for (let h = 2; h <= Math.floor(w.length / 2); h++) {
        let left = w.substring(w.length - 2*h, w.length - h);
        let right = w.substring(w.length - h);
        if (left.split('').sort().join('') === right.split('').sort().join('')) return false;
    }
    return true;
}

let chars = ['a', 'b', 'c'];
let current = "";
let maxLen = 0;
let maxW = "";
function dfs(w) {
    if (w.length > maxLen) {
        maxLen = w.length;
        maxW = w;
        if (maxLen % 100 === 0) console.log(maxLen);
    }
    if (maxLen >= 400) return true; // stop early

    // heuristics: random order or specific order
    let order = ['a', 'b', 'c'];
    for (let c of order) {
        if (isAa2fr(w + c)) {
            if (dfs(w + c)) return true;
        }
    }
    return false;
}

dfs("");
fs.writeFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/paper4-to-recordhunt-transfer-2026-08-29/test_word_400.txt", maxW);
console.log("Done");
