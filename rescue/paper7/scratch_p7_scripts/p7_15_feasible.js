const { G85 } = require('../src/morphisms.js');

const adj = [
    [-701, -2316, 4059, -531],
    [-531, -701, -2316, 4059],
    [4059, -531, -701, -2316],
    [-2316, 4059, -531, -701]
];
const det = 43435;
const alphabet = ['a', 'b', 'c', 'd'];

function getParikh(str) {
    let p = [0,0,0,0];
    for(let c of str) p[alphabet.indexOf(c)]++;
    return p;
}

let prefP = [];
let sufP = [];
for(let c of alphabet) {
    for(let i=0; i<=85; i++) {
        prefP.push(getParikh(G85[c].slice(0, i)));
        sufP.push(getParikh(G85[c].slice(85-i)));
    }
}

let count = 0;
// Actually B is fixed to 'ad', so P(B) = [1,0,0,1]
let B_P = [1,0,0,1];

// Optimize loop
let sufMap = new Map();
for(let p of sufP) {
    let key = p.join(',');
    if(!sufMap.has(key)) sufMap.set(key, 0);
    sufMap.set(key, sufMap.get(key) + 1);
}
let prefMap = new Map();
for(let p of prefP) {
    let key = p.join(',');
    if(!prefMap.has(key)) prefMap.set(key, 0);
    prefMap.set(key, prefMap.get(key) + 1);
}

let distinctStates = 0;

for(let [k1, c1] of sufMap.entries()) {
    let u_suf = k1.split(',').map(Number);
    for(let [k2, c2] of prefMap.entries()) {
        let v_pre = k2.split(',').map(Number);
        for(let [k3, c3] of sufMap.entries()) {
            let v_suf = k3.split(',').map(Number);
            
            // r = v_pre + v_suf - u_suf - B
            let ra = v_pre[0] + v_suf[0] - u_suf[0] - B_P[0];
            let rb = v_pre[1] + v_suf[1] - u_suf[1] - B_P[1];
            let rc = v_pre[2] + v_suf[2] - u_suf[2] - B_P[2];
            let rd = v_pre[3] + v_suf[3] - u_suf[3] - B_P[3];
            
            let dw0 = adj[0][0]*ra + adj[0][1]*rb + adj[0][2]*rc + adj[0][3]*rd;
            let dw1 = adj[1][0]*ra + adj[1][1]*rb + adj[1][2]*rc + adj[1][3]*rd;
            let dw2 = adj[2][0]*ra + adj[2][1]*rb + adj[2][2]*rc + adj[2][3]*rd;
            let dw3 = adj[3][0]*ra + adj[3][1]*rb + adj[3][2]*rc + adj[3][3]*rd;
            
            if (dw0 % det === 0 && dw1 % det === 0 && dw2 % det === 0 && dw3 % det === 0) {
                distinctStates++;
            }
        }
    }
}

console.log("Feasible valid Delta W combinations (N_feasible):", distinctStates);
