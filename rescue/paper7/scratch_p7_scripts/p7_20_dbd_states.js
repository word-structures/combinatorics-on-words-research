const { G85 } = require('../src/morphisms.js');

const alphabet = ['a', 'b', 'c', 'd'];
const adj = [
    [-701, -2316, 4059, -531],
    [-531, -701, -2316, 4059],
    [4059, -531, -701, -2316],
    [-2316, 4059, -531, -701]
];
const det = 43435;
const P_dbd = [0, 1, 0, 2];

function getParikh(str) {
    let p = [0,0,0,0];
    for(let c of str) p[alphabet.indexOf(c)]++;
    return p;
}

let distinctStates = 0;
let states = [];
let allDiscrepancies = new Set();

for (let c1 of alphabet) {
    for (let k1 = 0; k1 <= 85; k1++) {
        let p_U = getParikh(G85[c1].slice(0, k1));
        
        for (let c2 of alphabet) {
            for (let k2 = 0; k2 <= 85; k2++) {
                let p_V = getParikh(G85[c2].slice(0, k2));
                
                // M * dW' = P(p_V) - 2 P(p_U) - P(dbd)
                let ra = p_V[0] - 2*p_U[0] - P_dbd[0];
                let rb = p_V[1] - 2*p_U[1] - P_dbd[1];
                let rc = p_V[2] - 2*p_U[2] - P_dbd[2];
                let rd = p_V[3] - 2*p_U[3] - P_dbd[3];
                
                let dw0 = adj[0][0]*ra + adj[0][1]*rb + adj[0][2]*rc + adj[0][3]*rd;
                let dw1 = adj[1][0]*ra + adj[1][1]*rb + adj[1][2]*rc + adj[1][3]*rd;
                let dw2 = adj[2][0]*ra + adj[2][1]*rb + adj[2][2]*rc + adj[2][3]*rd;
                let dw3 = adj[3][0]*ra + adj[3][1]*rb + adj[3][2]*rc + adj[3][3]*rd;
                
                if (dw0 % det === 0 && dw1 % det === 0 && dw2 % det === 0 && dw3 % det === 0) {
                    distinctStates++;
                    let dW_prime = [dw0/det, dw1/det, dw2/det, dw3/det];
                    states.push({c1, k1, c2, k2, dW_prime});
                    allDiscrepancies.add(dW_prime.join(','));
                }
            }
        }
    }
}
console.log(`dbd constrained states: ${distinctStates}`);
console.log("Unique Parikh discrepancies:");
console.log(Array.from(allDiscrepancies));
