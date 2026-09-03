const { G85 } = require('../src/morphisms.js');

const alphabet = ['a', 'b', 'c', 'd'];
const adj = [
    [-701, -2316, 4059, -531],
    [-531, -701, -2316, 4059],
    [4059, -531, -701, -2316],
    [-2316, 4059, -531, -701]
];
const det = 43435;
const B_P = [1,0,0,1]; // 'ad'

function getParikh(str) {
    let p = [0,0,0,0];
    for(let c of str) p[alphabet.indexOf(c)]++;
    return p;
}

// 1. Recompute max Delta W witness over the full bounds
let maxDeltaW = 0;
let maxWitness = null;
let valid_r_count = 0;
let raw_r_count = 0;
for (let ra = -85; ra <= 168; ra++) {
    for (let rb = -85; rb <= 168; rb++) {
        for (let rc = -85; rc <= 168; rc++) {
            for (let delta of [-1, 0, 1]) {
                let rd = 85*delta - (ra + rb + rc);
                if (rd < -85 || rd > 168) continue;
                raw_r_count++;
                let dw0 = adj[0][0]*ra + adj[0][1]*rb + adj[0][2]*rc + adj[0][3]*rd;
                let dw1 = adj[1][0]*ra + adj[1][1]*rb + adj[1][2]*rc + adj[1][3]*rd;
                let dw2 = adj[2][0]*ra + adj[2][1]*rb + adj[2][2]*rc + adj[2][3]*rd;
                let dw3 = adj[3][0]*ra + adj[3][1]*rb + adj[3][2]*rc + adj[3][3]*rd;
                if (dw0 % det === 0 && dw1 % det === 0 && dw2 % det === 0 && dw3 % det === 0) {
                    valid_r_count++;
                    let dW = [dw0/det, dw1/det, dw2/det, dw3/det];
                    let norm = Math.max(...dW.map(Math.abs));
                    if (norm > maxDeltaW) {
                        maxDeltaW = norm;
                        maxWitness = {r: [ra, rb, rc, rd], dW};
                    }
                }
            }
        }
    }
}
console.log(`[S3] Raw r count: ${raw_r_count}`);
console.log(`[S3] Valid integral r count: ${valid_r_count}`);
console.log(`[S3] Max norm of Delta W: ${maxDeltaW}`);
console.log(`[S3] Witness: r=${maxWitness.r.join(',')}, dW=${maxWitness.dW.join(',')}`);

// 2. Recompute the 2269 valid states mathematically
let prefP = [];
let sufP = [];
for(let c of alphabet) {
    for(let i=0; i<=85; i++) {
        prefP.push(getParikh(G85[c].slice(0, i)).join(','));
        sufP.push(getParikh(G85[c].slice(85-i)).join(','));
    }
}
let prefSet = new Set(prefP);
let sufSet = new Set(sufP);

let distinctStates = 0;
for (let s1 of sufSet) {
    let u_suf = s1.split(',').map(Number);
    for (let p2 of prefSet) {
        let v_pre = p2.split(',').map(Number);
        for (let s3 of sufSet) {
            let v_suf = s3.split(',').map(Number);
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
console.log(`[S4] Feasible states count: ${distinctStates}`);
