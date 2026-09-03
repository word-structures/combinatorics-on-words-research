const fs = require('fs');
const path = require('path');
const { G85 } = require('../src/morphisms.js');

const releaseDir = path.join(__dirname, '..', 'P7_MAIN_THEOREM_RELEASE_v0.1');
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

let statesCsv = fs.readFileSync(path.join(releaseDir, 'RESIDUAL_STATES.csv'), 'utf-8');
let Q = [];
for (let line of statesCsv.trim().split('\n').slice(1)) {
    let parts = line.split(',');
    Q.push({
        id: parts[0],
        dW: [parseInt(parts[1]), parseInt(parts[2]), parseInt(parts[3]), parseInt(parts[4])],
        c_mid: parts[5],
        c_end: parts[6]
    });
}
let C = "abacabadcdb";
let p_U_start_seed = getParikh(C);

let transitions = ['TargetID,c_mid,o_mid,c_end,o_end,SourceID,Source_dW_a,Source_dW_b,Source_dW_c,Source_dW_d'];

// Seed transitions (Target is Abelian Square)
for (let i = 0; i < C.length; i++) {
    let p_U_start = getParikh(C.slice(i));
    for (let c_mid of alphabet) {
        let g_mid = G85[c_mid];
        for (let o_mid = 0; o_mid < 85; o_mid++) {
            let p_U_end = getParikh(g_mid.slice(0, o_mid));
            let p_V_start = getParikh(g_mid.slice(o_mid));
            for (let c_end of alphabet) {
                let g_end = G85[c_end];
                for (let o_end = 0; o_end < 85; o_end++) {
                    let p_V_end = getParikh(g_end.slice(0, o_end));
                    let len_diff = (C.length - i) + o_mid - (85 - o_mid) - o_end;
                    if (len_diff % 85 !== 0) continue;
                    let y = [0,0,0,0];
                    for(let k=0; k<4; k++) y[k] = p_V_start[k] + p_V_end[k] - p_U_start[k] - p_U_end[k];
                    let dW = solve(y);
                    if (dW !== null && dW[0]+dW[1]+dW[2]+dW[3] === -len_diff/85) {
                        let src = Q.find(s => s.dW.join(',') === dW.join(',') && s.c_mid === c_mid && s.c_end === c_end);
                        transitions.push(`ABELIAN_SQUARE,${c_mid},${o_mid},${c_end},${o_end},${src.id},${dW.join(',')}`);
                    }
                }
            }
        }
    }
}

// Internal transitions
for (let state of Q) {
    let q_target = state.dW;
    let sum_q = q_target[0]+q_target[1]+q_target[2]+q_target[3];
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
            for(let k=0; k<4; k++) y[k] = q_target[k] - p_U_start_seed[k] - p_U_end[k] + p_V_start[k] + p_V_end[k];
            let dW = solve(y);
            if (dW !== null && dW[0]+dW[1]+dW[2]+dW[3] === num_blocks_diff) {
                let src = Q.find(s => s.dW.join(',') === dW.join(',') && s.c_mid === state.c_mid && s.c_end === state.c_end);
                let srcId = src ? src.id : 'ABELIAN_SQUARE';
                transitions.push(`${state.id},${c_mid},${o_mid},${c_end},${o_end},${srcId},${dW.join(',')}`);
            }
        }
    }
}
fs.writeFileSync(path.join(releaseDir, 'RESIDUAL_TRANSITIONS.csv'), transitions.join('\n'));
console.log('Total transitions generated: ' + (transitions.length - 1));
