const crypto = require('crypto');

const asf_word = "abcdcacbdabacabdcdadcbabcbdbcabadabacabdbcacbcadacaba";

function isAbelianSquareFree(word) {
    const n = word.length;
    for (let K = 1; K <= Math.floor(n / 2); K++) {
        for (let i = 0; i <= n - 2 * K; i++) {
            if (isAbelianSquare(word, i, i + K, i + K, i + 2 * K)) {
                return false;
            }
        }
    }
    return true;
}

function isAbelianSquare(word, start1, end1, start2, end2) {
    const counts = { 'a': 0, 'b': 0, 'c': 0, 'd': 0 };
    for (let i = start1; i < end1; i++) counts[word[i]]++;
    for (let i = start2; i < end2; i++) counts[word[i]]--;
    return counts['a'] === 0 && counts['b'] === 0 && counts['c'] === 0 && counts['d'] === 0;
}

function parikh(s) {
    let p = { a: 0, b: 0, c: 0, d: 0 };
    for (let char of s) p[char]++;
    return p;
}

function D(s, K) {
    let p2K = parikh(s.substring(0, 2*K - 1));
    let pK = parikh(s.substring(0, K - 1));
    return {
        a: p2K.a - 2 * pK.a,
        b: p2K.b - 2 * pK.b,
        c: p2K.c - 2 * pK.c,
        d: p2K.d - 2 * pK.d
    };
}

function formatD(d) {
    if (d.a === 1 && d.b === 0 && d.c === 0 && d.d === 0) return 'e_a';
    if (d.a === 0 && d.b === 1 && d.c === 0 && d.d === 0) return 'e_b';
    if (d.a === 0 && d.b === 0 && d.c === 1 && d.d === 0) return 'e_c';
    if (d.a === 0 && d.b === 0 && d.c === 0 && d.d === 1) return 'e_d';
    return JSON.stringify(d);
}

let out = "";
out += `Word: ${asf_word}\n`;
out += `Length: ${asf_word.length}\n`;
out += `ASF: ${isAbelianSquareFree(asf_word)}\n`;
for (let K of [1, 5, 7, 11, 27]) {
    out += `D_${K} = ${formatD(D(asf_word, K))}\n`;
}

const hash = crypto.createHash('sha256').update(out).digest('hex');
out += `SHA256: ${hash}\n`;
console.log(out);
