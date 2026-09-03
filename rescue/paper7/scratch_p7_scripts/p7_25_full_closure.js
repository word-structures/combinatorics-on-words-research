const { G85 } = require('../src/morphisms.js');
const alphabet = ['a', 'b', 'c', 'd'];

function getParikh(str) {
    let p = [0,0,0,0];
    for(let c of str) p[alphabet.indexOf(c)]++;
    return p;
}

let M85 = [
    getParikh(G85['a']), getParikh(G85['b']),
    getParikh(G85['c']), getParikh(G85['d'])
];

function solve(y) {
    for(let x0 = -10; x0 <= 10; x0++) {
    for(let x1 = -10; x1 <= 10; x1++) {
    for(let x2 = -10; x2 <= 10; x2++) {
    for(let x3 = -10; x3 <= 10; x3++) {
        if (x0*M85[0][0] + x1*M85[1][0] + x2*M85[2][0] + x3*M85[3][0] !== y[0]) continue;
        if (x0*M85[0][1] + x1*M85[1][1] + x2*M85[2][1] + x3*M85[3][1] !== y[1]) continue;
        if (x0*M85[0][2] + x1*M85[1][2] + x2*M85[2][2] + x3*M85[3][2] !== y[2]) continue;
        if (x0*M85[0][3] + x1*M85[1][3] + x2*M85[2][3] + x3*M85[3][3] !== y[3]) continue;
        return [x0, x1, x2, x3];
    }}}}
    return null;
}

let B = "ad";
let Q_set = new Set();
let Q = [];
let transitions = [];

function addState(q, source, parent) {
    let key = q.join(',');
    if (!Q_set.has(key)) {
        Q_set.add(key);
        Q.push(q);
        console.log(`Added state: [${key}] from ${source}`);
    }
    if (parent) {
        transitions.push({ from: parent, to: key, source: source });
    }
}

// 1. Initial crossing squares (q_target = 0)
for (let i = 0; i < B.length; i++) {
    let p_U_start = getParikh(B.slice(i));
    for (let c_mid of alphabet) {
        let g_mid = G85[c_mid];
        for (let o_mid = 0; o_mid < 85; o_mid++) {
            let p_U_end = getParikh(g_mid.slice(0, o_mid));
            let p_V_start = getParikh(g_mid.slice(o_mid));
            for (let c_end of alphabet) {
                let g_end = G85[c_end];
                for (let o_end = 0; o_end < 85; o_end++) {
                    let p_V_end = getParikh(g_end.slice(0, o_end));
                    let len_diff = (B.length - i) + o_mid - (85 - o_mid) - o_end;
                    if (len_diff % 85 !== 0) continue;
                    
                    let y = [0,0,0,0];
                    for(let k=0; k<4; k++) y[k] = p_V_start[k] + p_V_end[k] - p_U_start[k] - p_U_end[k];
                    
                    let dW = solve(y);
                    if (dW !== null && dW[0]+dW[1]+dW[2]+dW[3] === -len_diff/85) {
                        addState(dW, `Crossing_square`, null);
                    }
                }
            }
        }
    }
}

// 2. Closure under F_ad(W)
// If F_ad(W) contains a prefix-anchored near-square q_target in Q:
// U is a prefix of F_ad(W), c_mid separates, V follows.
// U length and V length difference is sum(q_target).
let head = 0;
while(head < Q.length) {
    let q_target = Q[head++];
    let sum_q = q_target[0]+q_target[1]+q_target[2]+q_target[3];
    
    // U is prefix of B + g85(W). So U starts at index 0 of B.
    let p_U_start = getParikh(B);
    for (let c_mid of alphabet) {
        let g_mid = G85[c_mid];
        for (let o_mid = 0; o_mid < 85; o_mid++) {
            let p_U_end = getParikh(g_mid.slice(0, o_mid));
            let p_V_start = getParikh(g_mid.slice(o_mid));
            for (let c_end of alphabet) {
                let g_end = G85[c_end];
                for (let o_end = 0; o_end < 85; o_end++) {
                    let p_V_end = getParikh(g_end.slice(0, o_end));
                    
                    // |U| - |V| = sum_q
                    // |U| = |B| + 85|W_U| + o_mid
                    // |V| = (85 - o_mid) + 85|W_V| + o_end
                    let len_diff = B.length + o_mid - (85 - o_mid) - o_end;
                    if ((len_diff - sum_q) % 85 !== 0) continue;
                    let num_blocks_diff = (sum_q - len_diff) / 85;
                    
                    // P(U) - P(V) = q_target
                    // P(U) = p_U_start + p_U_end + M85*W_U
                    // P(V) = p_V_start + p_V_end + M85*W_V
                    let y = [0,0,0,0];
                    for(let k=0; k<4; k++) {
                        y[k] = q_target[k] - p_U_start[k] - p_U_end[k] + p_V_start[k] + p_V_end[k];
                    }
                    
                    let dW = solve(y);
                    if (dW !== null && dW[0]+dW[1]+dW[2]+dW[3] === num_blocks_diff) {
                        addState(dW, `Closure from ${q_target.join(',')}`, q_target.join(','));
                    }
                }
            }
        }
    }
}
console.log(`Total states: ${Q.length}`);
