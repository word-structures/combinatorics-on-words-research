const fs = require('fs');

function computeVariance(P, f) {
    const N = P.length;
    // 1. Find pi
    let pi = new Array(N).fill(1/N);
    for (let iter=0; iter<1000; iter++) {
        let next = new Array(N).fill(0);
        for (let i=0; i<N; i++) {
            for (let j=0; j<N; j++) {
                next[j] += pi[i] * P[i][j];
            }
        }
        pi = next;
    }
    
    // 2. Solve (I - P + Pi) g = f
    // Using iteration: g_{n+1} = f + P g_n - Pi(f + P g_n)
    let g = new Array(N).fill(0);
    for (let iter=0; iter<2000; iter++) {
        let Pg = new Array(N).fill(0);
        for (let i=0; i<N; i++) {
            for (let j=0; j<N; j++) {
                Pg[i] += P[i][j] * g[j];
            }
        }
        let next_g = new Array(N).fill(0);
        let pi_dot = 0;
        for (let i=0; i<N; i++) {
            next_g[i] = f[i] + Pg[i];
            pi_dot += pi[i] * next_g[i];
        }
        for (let i=0; i<N; i++) {
            next_g[i] -= pi_dot;
        }
        g = next_g;
    }
    
    let a_A = 0;
    let a_A_check = 0;
    for (let i=0; i<N; i++) {
        a_A += 2 * pi[i] * f[i] * g[i] - pi[i] * f[i] * f[i];
        
        let Pg_i = 0;
        for (let j=0; j<N; j++) Pg_i += P[i][j] * g[j];
        a_A_check += pi[i] * f[i] * f[i] + 2 * pi[i] * f[i] * Pg_i;
    }
    
    return { a: a_A, a_check: a_A_check };
}

let status = "PASS";
let diffA = 0, diffB = 0, diffC1 = 0, diffC2 = 0;

// Fixture A
const PA = [[0.5, 0.5], [0.5, 0.5]];
const fA = [-0.5, 0.5];
const resA = computeVariance(PA, fA);
diffA = Math.abs(resA.a - 0.25);
if (diffA > 1e-12 || Math.abs(resA.a - resA.a_check) > 1e-12) status = "FAIL";

// Fixture B
const PB = [[0.7, 0.3], [0.4, 0.6]];
const fB = [-3/7, 4/7];
const exactB = 156/343;
const resB = computeVariance(PB, fB);
diffB = Math.abs(resB.a - exactB);
if (diffB > 1e-11 || Math.abs(resB.a - resB.a_check) > 1e-11) status = "FAIL";

// Fixture C.1
const PC1 = [[1/3, 1/3, 1/3], [1/3, 1/3, 1/3], [1/3, 1/3, 1/3]];
const fC1 = [2/3, -1/3, -1/3];
const exactC = 2/9;
const resC1 = computeVariance(PC1, fC1);
diffC1 = Math.abs(resC1.a - exactC);
if (diffC1 > 1e-12 || Math.abs(resC1.a - resC1.a_check) > 1e-12) status = "FAIL";

// Fixture C.2 (h=2 old common memory)
// States: 3^3 = 27 (x,y,z). Transitions: (x,y,z) -> (y,z,w) with prob 1/3.
// Observable is 1_{w=0} - 1/3.
// Since the state is (y,z,w), the newly emitted symbol is the last one (w).
const states = [];
for(let x=0; x<3; x++)
  for(let y=0; y<3; y++)
    for(let z=0; z<3; z++)
      states.push([x,y,z]);
const PC2 = Array.from({length: 27}, () => new Array(27).fill(0));
const fC2 = new Array(27).fill(0);
for (let i=0; i<27; i++) {
    const s1 = states[i];
    for (let w=0; w<3; w++) {
        // target is (s1[1], s1[2], w)
        const target = s1[1]*9 + s1[2]*3 + w;
        PC2[i][target] = 1/3;
    }
    fC2[i] = (s1[2] === 0 ? 1 : 0) - 1/3;
}
const resC2 = computeVariance(PC2, fC2);
diffC2 = Math.abs(resC2.a - exactC);
if (diffC2 > 1e-12 || Math.abs(resC2.a - resC2.a_check) > 1e-12) status = "FAIL";

const results = {
    status, diffA, diffB, diffC1, diffC2,
    a_check_diff: Math.abs(resA.a - resA.a_check)
};
fs.writeFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/run_3_formula_correction/VARIANCE_UNIT_TEST_RESULTS.json', JSON.stringify(results, null, 2));
console.log(status);
