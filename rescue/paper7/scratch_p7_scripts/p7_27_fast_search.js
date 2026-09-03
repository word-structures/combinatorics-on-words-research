const { G85 } = require('../src/morphisms.js');
const alphabet = ['a', 'b', 'c', 'd'];

function getParikh(str) {
    let p = [0,0,0,0];
    for(let c of str) p[alphabet.indexOf(c)]++;
    return p;
}
let M85 = [getParikh(G85['a']), getParikh(G85['b']), getParikh(G85['c']), getParikh(G85['d'])];

// Precompute solve lookup table
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

function solve(y) {
    return solve_map.get(y.join(',')) || null;
}

function computeClosure(B) {
    let Q_set = new Set();
    let Q = [];
    
    function addState(dW, c_mid, c_end) {
        let key = `${dW.join(',')}|${c_mid}|${c_end}`;
        if (!Q_set.has(key)) {
            Q_set.add(key);
            Q.push({ dW, c_mid, c_end });
        }
    }
    
    for (let i = 0; i < B.length; i++) {
        let p_U_start = getParikh(B.slice(i));
        for (let c_mid of alphabet) {
            for (let o_mid = 0; o_mid < 85; o_mid++) {
                let p_U_end = getParikh(G85[c_mid].slice(0, o_mid));
                let p_V_start = getParikh(G85[c_mid].slice(o_mid));
                for (let c_end of alphabet) {
                    for (let o_end = 0; o_end < 85; o_end++) {
                        let p_V_end = getParikh(G85[c_end].slice(0, o_end));
                        let len_diff = (B.length - i) + o_mid - (85 - o_mid) - o_end;
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
        if (Q.length > 500) return null; // Increase limit just in case
        let state = Q[head++];
        let q_target = state.dW;
        let sum_q = q_target[0]+q_target[1]+q_target[2]+q_target[3];
        let p_U_start = getParikh(B);
        
        let c_mid = state.c_mid;
        let g_mid = G85[c_mid];
        for (let o_mid = 0; o_mid < 85; o_mid++) {
            let p_U_end = getParikh(g_mid.slice(0, o_mid));
            let p_V_start = getParikh(g_mid.slice(o_mid));
            
            let c_end = state.c_end;
            let g_end = G85[c_end];
            for (let o_end = 0; o_end < 85; o_end++) {
                let p_V_end = getParikh(g_end.slice(0, o_end));
                let len_diff = B.length + o_mid - (85 - o_mid) - o_end;
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
    return Q;
}

let s = "abacabadc";
let queue = [""];

function applyG85(str) {
    let res = '';
    for(let c of str) res += G85[c];
    return res;
}
function isASF(w) {
    let n = w.length;
    let arr = new Int8Array(n);
    for(let i=0; i<n; i++) {
        let c = w[i];
        if(c==='a') arr[i]=0; else if(c==='b') arr[i]=1; else if(c==='c') arr[i]=2; else arr[i]=3;
    }
    for (let K = 1; K <= Math.floor(n / 2); K++) {
        for (let i = 0; i <= n - 2*K; i++) {
            let pu = [0,0,0,0];
            let pv = [0,0,0,0];
            for(let j=0; j<K; j++) pu[arr[i+j]]++;
            for(let j=K; j<2*K; j++) pv[arr[i+j]]++;
            if (pu[0]===pv[0] && pu[1]===pv[1] && pu[2]===pv[2] && pu[3]===pv[3]) return false;
        }
    }
    return true;
}

console.log("Fast search started...");
while(queue.length > 0) {
    let B_str = queue.shift();
    if (B_str.length > 3) continue;
    
    let C = s + B_str;
    if (!isASF(C)) continue;
    
    let W1 = C + applyG85(C);
    if (!isASF(W1)) {
        for(let a of alphabet) queue.push(B_str + a);
        continue;
    }
    
    console.log(`Checking C = ${C} (B = '${B_str}')`);
    let Q = computeClosure(C);
    if (Q !== null) {
        console.log(`FOUND finite closure for C = ${C}: size ${Q.length}`);
        
        let fs = require('fs');
        fs.writeFileSync('P7_27_CANDIDATE.json', JSON.stringify({C, B: B_str, Q}));
        break;
    } else {
        console.log(`Closure for ${C} was too large or infinite.`);
    }
    for(let a of alphabet) queue.push(B_str + a);
}
