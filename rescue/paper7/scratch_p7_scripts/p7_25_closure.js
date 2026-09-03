const { G85 } = require('../src/morphisms.js');

const alphabet = ['a', 'b', 'c', 'd'];
let M85 = [];
for (let i = 0; i < 4; i++) {
    M85.push([0, 0, 0, 0]);
}
for (let j = 0; j < 4; j++) {
    let c = alphabet[j];
    for (let char of G85[c]) {
        M85[alphabet.indexOf(char)][j]++;
    }
}
// M85 is 4x4 matrix, M[i][j] = count of i in G85[j]
// M_inv * 85 is adjugate. We can just invert M85 in JS over rationals.
const math = require('mathjs'); // wait mathjs might not be available
