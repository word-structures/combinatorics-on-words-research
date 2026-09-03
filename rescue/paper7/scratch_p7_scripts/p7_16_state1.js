const { G85 } = require('../src/morphisms.js');

let X1 = G85['a'];
let X2 = ''; for (let c of X1) X2 += G85[c];
let X3 = ''; for (let c of X2) X3 += G85[c];
let N = X3.length;
const alphabet = ['a', 'b', 'c', 'd'];

let parikh = { a: new Int32Array(N+1), b: new Int32Array(N+1), c: new Int32Array(N+1), d: new Int32Array(N+1) };
for (let i = 0; i < N; i++) {
    parikh.a[i+1] = parikh.a[i] + (X3[i] === 'a' ? 1 : 0);
    parikh.b[i+1] = parikh.b[i] + (X3[i] === 'b' ? 1 : 0);
    parikh.c[i+1] = parikh.c[i] + (X3[i] === 'c' ? 1 : 0);
    parikh.d[i+1] = parikh.d[i] + (X3[i] === 'd' ? 1 : 0);
}

// U' is a prefix of X0, so it starts at index 0 and ends at mid.
// V' starts at mid and ends at end.
// We need P(U') - P(V') = [-2, 1, 0, 0]
// This means:
// a: U'_a - V'_a = -2
// b: U'_b - V'_b = 1
// c: U'_c - V'_c = 0
// d: U'_d - V'_d = 0
// Also |U'| - |V'| = -1  =>  mid - 0 - (end - mid) = -1  =>  2*mid - end = -1  =>  end = 2*mid + 1

let found = false;
for (let mid = 0; mid < Math.floor(N/2); mid++) {
    let end = 2 * mid + 1;
    if (end > N) break;
    
    let U_a = parikh.a[mid];
    let U_b = parikh.b[mid];
    let U_c = parikh.c[mid];
    let U_d = parikh.d[mid];
    
    let V_a = parikh.a[end] - parikh.a[mid];
    let V_b = parikh.b[end] - parikh.b[mid];
    let V_c = parikh.c[end] - parikh.c[mid];
    let V_d = parikh.d[end] - parikh.d[mid];
    
    if (U_a - V_a === -2 && U_b - V_b === 1 && U_c - V_c === 0 && U_d - V_d === 0) {
        console.log(`Found State 1 near-square! mid=${mid}, end=${end}`);
        found = true;
    }
}
if (!found) console.log("State 1 near-square NEVER occurs as a prefix in X3!");
