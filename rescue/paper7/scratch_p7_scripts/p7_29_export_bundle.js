const fs = require('fs');
const path = require('path');
const { G85 } = require('../src/morphisms.js');

const releaseDir = path.join(__dirname, '..', 'P7_MAIN_THEOREM_RELEASE_v0.1');

// 1. G85.json
fs.writeFileSync(path.join(releaseDir, 'G85.json'), JSON.stringify(G85, null, 2));

// 2. LEFT_DEATH_CERTIFICATE.json
const leftDeath = {
    "s": "abacabadc",
    "extensions": [
        { "letter": "a", "K": 1, "square": "aa", "u": "a", "v": "a", "parikh": [1,0,0,0] },
        { "letter": "b", "K": 2, "square": "baba", "u": "ba", "v": "ba", "parikh": [1,1,0,0] },
        { "letter": "c", "K": 4, "square": "cabacaba", "u": "caba", "v": "caba", "parikh": [2,1,1,0] },
        { "letter": "d", "K": 5, "square": "dabacabadc", "u": "dabac", "v": "abadc", "parikh": [2,1,1,1] }
    ]
};
fs.writeFileSync(path.join(releaseDir, 'LEFT_DEATH_CERTIFICATE.json'), JSON.stringify(leftDeath, null, 2));

// 3. Re-run Closure to export states
const alphabet = ['a', 'b', 'c', 'd'];
function getParikh(str) {
    let p = [0,0,0,0];
    for(let c of str) p[alphabet.indexOf(c)]++;
    return p;
}

let M85 = [getParikh(G85['a']), getParikh(G85['b']), getParikh(G85['c']), getParikh(G85['d'])];
let solve_map = new Map();
for(let x0 = -15; x0 <= 15; x0++) {
for(let x1 = -15; x1 <= 15; x1++) {
for(let x2 = -15; x2 <= 15; x2++) {
for(let x3 = -15; x3 <= 15; x3++) {
    let y0 = x0*M85[0][0] + x1*M85[1][0] + x2*M85[2][0] + x3*M85[3][0];
    let y1 = x0*M85[0][1] + x1*M85[1][1] + x2*M85[2][1] + x3*M85[3][1];
    let y2 = x0*M85[0][2] + x1*M85[1][2] + x2*M85[2][2] + x3*M85[3][2];
    let y3 = x0*M85[0][3] + x1*M85[1][3] + x2*M85[2][3] + x3*M85[3][3];
    solve_map.set(`${y0},${y1},${y2},${y3}`, [x0,x1,x2,x3]);
}}}}
function solve(y) { return solve_map.get(y.join(',')) || null; }

let C = "abacabadcdb";
let Q_set = new Set();
let Q = [];

function addState(dW, c_mid, c_end) {
    let key = `${dW.join(',')}|${c_mid}|${c_end}`;
    if (!Q_set.has(key)) {
        Q_set.add(key);
        Q.push({ dW, c_mid, c_end, id: `S${Q.length}` });
    }
}

for (let i = 0; i < C.length; i++) {
    let p_U_start = getParikh(C.slice(i));
    for (let c_mid of alphabet) {
        for (let o_mid = 0; o_mid < 85; o_mid++) {
            let p_U_end = getParikh(G85[c_mid].slice(0, o_mid));
            let p_V_start = getParikh(G85[c_mid].slice(o_mid));
            for (let c_end of alphabet) {
                for (let o_end = 0; o_end < 85; o_end++) {
                    let p_V_end = getParikh(G85[c_end].slice(0, o_end));
                    let len_diff = (C.length - i) + o_mid - (85 - o_mid) - o_end;
                    if (len_diff % 85 !== 0) continue;
                    let y = [0,0,0,0];
                    for(let k=0; k<4; k++) y[k] = p_V_start[k] + p_V_end[k] - p_U_start[k] - p_U_end[k];
                    let dW = solve(y);
                    if (dW !== null && dW[0]+dW[1]+dW[2]+dW[3] === -len_diff/85) {
                        addState(dW, c_mid, c_end);
                    }
                }
            }
        }
    }
}

let head = 0;
while(head < Q.length) {
    let state = Q[head++];
    let q_target = state.dW;
    let sum_q = q_target[0]+q_target[1]+q_target[2]+q_target[3];
    let p_U_start = getParikh(C);
    
    let c_mid = state.c_mid;
    let g_mid = G85[c_mid];
    for (let o_mid = 0; o_mid < 85; o_mid++) {
        let p_U_end = getParikh(g_mid.slice(0, o_mid));
        let p_V_start = getParikh(g_mid.slice(o_mid));
        
        let c_end = state.c_end;
        let g_end = G85[c_end];
        for (let o_end = 0; o_end < 85; o_end++) {
            let p_V_end = getParikh(g_end.slice(0, o_end));
            let len_diff = C.length + o_mid - (85 - o_mid) - o_end;
            if ((len_diff - sum_q) % 85 !== 0) continue;
            let num_blocks_diff = (sum_q - len_diff) / 85;
            
            let y = [0,0,0,0];
            for(let k=0; k<4; k++) y[k] = q_target[k] - p_U_start[k] - p_U_end[k] + p_V_start[k] + p_V_end[k];
            let dW = solve(y);
            if (dW !== null && dW[0]+dW[1]+dW[2]+dW[3] === num_blocks_diff) {
                addState(dW, state.c_mid, state.c_end);
            }
        }
    }
}

// Write RESIDUAL_STATES.csv
let csvRows = ['ID,dW_a,dW_b,dW_c,dW_d,c_mid,c_end'];
for(let s of Q) {
    csvRows.push(`${s.id},${s.dW.join(',')},${s.c_mid},${s.c_end}`);
}
fs.writeFileSync(path.join(releaseDir, 'RESIDUAL_STATES.csv'), csvRows.join('\n'));

// Generate W2 for base cases (length 80k is too big, let's just do W1 which is 946)
// Since mu = (|U| - |C| - o_mid)/85, |W_U| is 0 when |U| <= 95.
// So W1 (946 chars) easily covers all base cases.
let W1 = C;
for(let c of C) W1 += G85[c];
const baseCases = {
    "C": C,
    "prefix_W1": W1,
    "max_base_length": 190,
    "description": "Prefix W1 contains the first 946 characters of W_infinity. All base cases where |W_U| = 0 require |U| <= 95, meaning the total square length is <= 190. Checking this prefix for Abelian squares and any of the 36 states is sufficient to ground the strict geometric descent."
};
fs.writeFileSync(path.join(releaseDir, 'BASE_CASES.json'), JSON.stringify(baseCases, null, 2));

console.log('Exported data files successfully.');
