const { G85 } = require('../src/morphisms.js');
const alphabet = ['a', 'b', 'c', 'd'];
function getParikh(str) {
    let p = [0,0,0,0];
    for(let c of str) p[alphabet.indexOf(c)]++;
    return p;
}
let M85 = [getParikh(G85['a']), getParikh(G85['b']), getParikh(G85['c']), getParikh(G85['d'])];

function solve(y) {
    for(let x0 = -1; x0 <= 1; x0++) {
    for(let x1 = -1; x1 <= 1; x1++) {
    for(let x2 = -1; x2 <= 1; x2++) {
    for(let x3 = -1; x3 <= 1; x3++) {
        if (x0*M85[0][0] + x1*M85[1][0] + x2*M85[2][0] + x3*M85[3][0] !== y[0]) continue;
        if (x0*M85[0][1] + x1*M85[1][1] + x2*M85[2][1] + x3*M85[3][1] !== y[1]) continue;
        if (x0*M85[0][2] + x1*M85[1][2] + x2*M85[2][2] + x3*M85[3][2] !== y[2]) continue;
        if (x0*M85[0][3] + x1*M85[1][3] + x2*M85[2][3] + x3*M85[3][3] !== y[3]) continue;
        return [x0, x1, x2, x3];
    }}}}
    return null;
}

let B = "ad";
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
                        if (dW.join(',') === '0,0,0,0') {
                            console.log(`[0,0,0,0] from: i=${i}, c_mid=${c_mid}, o_mid=${o_mid}, c_end=${c_end}, o_end=${o_end}`);
                            let U_str = B.slice(i) + " " + g_mid.slice(0, o_mid);
                            let V_str = g_mid.slice(o_mid) + " " + g_end.slice(0, o_end);
                            console.log(`U_str: ${U_str}`);
                            console.log(`V_str: ${V_str}`);
                            console.log(`Lengths: ${U_str.replace(" ","").length}, ${V_str.replace(" ","").length}`);
                        }
                    }
                }
            }
        }
    }
}
