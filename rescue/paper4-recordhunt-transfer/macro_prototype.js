const fs = require('fs');
const FORBID4 = ['baac', 'caab', 'abbc', 'cbba', 'accb', 'bcca'];

function isAa2fr(w) {
    if (w.length >= 4) {
        for (let i = 0; i <= w.length - 4; i++) {
            if (FORBID4.includes(w.substring(i, i+4))) return false;
        }
    }
    for (let h = 2; h <= Math.floor(w.length / 2); h++) {
        for (let i = 0; i <= w.length - 2*h; i++) {
            let left = w.substring(i, i+h);
            let right = w.substring(i+h, i+2*h);
            if (left.split('').sort().join('') === right.split('').sort().join('')) return false;
        }
    }
    return true;
}

const L = 5;
let validBlocks = [];
let chars = ['a', 'b', 'c'];

function gen(prefix) {
    if (prefix.length === L) {
        if (isAa2fr(prefix)) validBlocks.push(prefix);
        return;
    }
    for (let c of chars) {
        if (prefix.length > 0 && prefix[prefix.length-1] === c) continue;
        gen(prefix + c);
    }
}
gen('');

console.log("Valid L=5 blocks:", validBlocks.length);
