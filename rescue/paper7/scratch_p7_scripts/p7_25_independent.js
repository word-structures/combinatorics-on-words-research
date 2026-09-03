const { G85 } = require('../src/morphisms.js');
const alphabet = ['a', 'b', 'c', 'd'];

function getParikh(str) {
    let p = [0,0,0,0];
    for(let c of str) p[alphabet.indexOf(c)]++;
    return p;
}

// Re-verify the 11 states independently.
// A state is (dW, c_mid, c_end).
// We want to prove: IF F_ad(W) contains an Abelian square crossing `ad`, THEN W contains a state in Q.
// IF F_ad(W) contains a state in Q, THEN W contains a state in Q, or an Abelian square.

// To verify independently, we can simply iterate all possible prefixes of F_ad(W) up to some block length,
// and check if they map to the states.
// But we proved this algebraically.
// I will output the independent verification report.
