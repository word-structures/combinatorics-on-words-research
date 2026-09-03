const { G85 } = require('../src/morphisms.js');

const alphabet = ['a', 'b', 'c', 'd'];
const adj = [
    [-701, -2316, 4059, -531],
    [-531, -701, -2316, 4059],
    [4059, -531, -701, -2316],
    [-2316, 4059, -531, -701]
];
const det = 43435;

function getParikh(str) {
    let p = [0,0,0,0];
    for(let c of str) p[alphabet.indexOf(c)]++;
    return p;
}

// Precompute prefixes of G85
let g85_prefixes = {};
for (let c of alphabet) {
    g85_prefixes[c] = [];
    for (let k = 0; k <= 85; k++) {
        g85_prefixes[c].push(getParikh(G85[c].slice(0, k)));
    }
}

let visited = new Set();
let queue = [[-2, 1, 0, 0]];
visited.add(queue[0].join(','));

let allTransitions = [];

while(queue.length > 0) {
    let Delta = queue.shift();
    
    // Check all alignments
    for (let c1 of alphabet) {
        for (let k1 = 0; k1 <= 85; k1++) {
            let p_U = g85_prefixes[c1][k1];
            for (let c2 of alphabet) {
                for (let k2 = 0; k2 <= 85; k2++) {
                    let p_V = g85_prefixes[c2][k2];
                    
                    let ra = Delta[0] + p_V[0] - 2*p_U[0];
                    let rb = Delta[1] + p_V[1] - 2*p_U[1];
                    let rc = Delta[2] + p_V[2] - 2*p_U[2];
                    let rd = Delta[3] + p_V[3] - 2*p_U[3];
                    
                    let dw0 = adj[0][0]*ra + adj[0][1]*rb + adj[0][2]*rc + adj[0][3]*rd;
                    let dw1 = adj[1][0]*ra + adj[1][1]*rb + adj[1][2]*rc + adj[1][3]*rd;
                    let dw2 = adj[2][0]*ra + adj[2][1]*rb + adj[2][2]*rc + adj[2][3]*rd;
                    let dw3 = adj[3][0]*ra + adj[3][1]*rb + adj[3][2]*rc + adj[3][3]*rd;
                    
                    if (dw0 % det === 0 && dw1 % det === 0 && dw2 % det === 0 && dw3 % det === 0) {
                        let dW_prime = [dw0/det, dw1/det, dw2/det, dw3/det];
                        let key = dW_prime.join(',');
                        
                        allTransitions.push({
                            from: Delta,
                            to: dW_prime,
                            c1, k1, c2, k2
                        });
                        
                        // We can ignore [0,0,0,0] because it's an exact square, which is forbidden
                        if (key !== "0,0,0,0" && !visited.has(key)) {
                            visited.add(key);
                            queue.push(dW_prime);
                        }
                    }
                }
            }
        }
    }
}

console.log(`Reachable near-square differences starting from [-2,1,0,0]: ${visited.size}`);
console.log("Nodes:", Array.from(visited));
