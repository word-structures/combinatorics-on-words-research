const { G85 } = require('../src/morphisms.js');

let X = G85['a']; // 85 chars
// Count state space components:
// 1. Endpoint residue classes: length of u_suf (0 to 84) = 85
// 2. Midpoint residue classes: length of v_pre (0 to 84) = 85
// 3. Right endpoint residue: length of v_suf (0 to 84) = 85
// But they are not independent! The actual fragments must be valid factors of G85 images.
// How many actual distinct fragment Parikh vectors are there?

let prefParikhs = new Set();
let sufParikhs = new Set();

const alphabet = ['a', 'b', 'c', 'd'];

for (let c of alphabet) {
    let img = G85[c];
    for (let i = 0; i <= 85; i++) {
        let p = {a:0, b:0, c:0, d:0};
        for (let j=0; j<i; j++) p[img[j]]++;
        prefParikhs.add(`${p.a},${p.b},${p.c},${p.d}`);
        
        let s = {a:0, b:0, c:0, d:0};
        for (let j=85-i; j<85; j++) s[img[j]]++;
        sufParikhs.add(`${s.a},${s.b},${s.c},${s.d}`);
    }
}

console.log("Distinct valid prefix Parikh vectors (v_pre):", prefParikhs.size);
console.log("Distinct valid suffix Parikh vectors (u_suf, v_suf):", sufParikhs.size);

// Raw combinations of Parikh vectors:
console.log("Raw state space of Parikh combinations (u_suf * v_pre * v_suf):", sufParikhs.size * prefParikhs.size * sufParikhs.size);

// But we already know there are exactly 36,349 valid Delta W vectors overall, 
// which means the number of valid (u_suf, v_pre, v_suf) combinations that produce an integral Delta W is bounded by the exact matches.
