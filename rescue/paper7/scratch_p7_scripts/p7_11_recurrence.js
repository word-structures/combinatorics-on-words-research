const { G85 } = require('../src/morphisms.js');

const alphabet = ['a', 'b', 'c', 'd'];

function isPrimitive(morph) {
    let matrix = {};
    for (let c of alphabet) {
        matrix[c] = {a:0, b:0, c:0, d:0};
        for (let x of morph[c]) matrix[c][x]++;
    }
    console.log("Matrix:", matrix);
    // For G85, it's known to be uniform (length 85) and it contains all letters.
    // If every image contains all letters, it's strictly positive, hence primitive.
    let primitive = true;
    for (let c of alphabet) {
        for (let x of alphabet) {
            if (matrix[c][x] === 0) primitive = false;
        }
    }
    return primitive;
}

console.log("G85 primitive:", isPrimitive(G85));
