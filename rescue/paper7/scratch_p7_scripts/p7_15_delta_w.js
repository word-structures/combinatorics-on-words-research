const adj = [
    [-701, -2316, 4059, -531],
    [-531, -701, -2316, 4059],
    [4059, -531, -701, -2316],
    [-2316, 4059, -531, -701]
];
const det = 43435;

// r = v_pre + v_suf - u_suf - B
// lengths: v_pre in [0,84], v_suf in [0,84], u_suf in [0,84]
// sum(r) = 85 * delta, delta in [-1, 0, 1]

let maxDeltaW = 0;
let validDeltaWs = new Set();
let r_count = 0;
let valid_r_count = 0;

// To be exact, let's just find the max/min of Adj * r
// What are the absolute bounds on r_i?
// r_i = v_pre_i + v_suf_i - u_suf_i - B_i
// v_pre_i + v_suf_i can be up to 168 (actually at most 168 total, so for one char up to 168)
// u_suf_i up to 84.
// B is 'ad', so B_a = 1, B_d = 1.
// So r_i in [-85, 168] roughly.
// But sum(r) = -85, 0, or 85.

for (let ra = -85; ra <= 168; ra++) {
    for (let rb = -85; rb <= 168; rb++) {
        for (let rc = -85; rc <= 168; rc++) {
            let rd = -85; // will check all, but let's constrain by sum
            for (let delta of [-1, 0, 1]) {
                let current_rd = 85*delta - (ra + rb + rc);
                if (current_rd < -85 || current_rd > 168) continue;
                
                r_count++;
                
                let dw0 = adj[0][0]*ra + adj[0][1]*rb + adj[0][2]*rc + adj[0][3]*current_rd;
                let dw1 = adj[1][0]*ra + adj[1][1]*rb + adj[1][2]*rc + adj[1][3]*current_rd;
                let dw2 = adj[2][0]*ra + adj[2][1]*rb + adj[2][2]*rc + adj[2][3]*current_rd;
                let dw3 = adj[3][0]*ra + adj[3][1]*rb + adj[3][2]*rc + adj[3][3]*current_rd;
                
                if (dw0 % det === 0 && dw1 % det === 0 && dw2 % det === 0 && dw3 % det === 0) {
                    valid_r_count++;
                    let dW = [dw0/det, dw1/det, dw2/det, dw3/det];
                    let norm = Math.max(...dW.map(Math.abs));
                    if (norm > maxDeltaW) maxDeltaW = norm;
                    validDeltaWs.add(dW.join(','));
                }
            }
        }
    }
}

console.log("Total r vectors checked:", r_count);
console.log("Valid integral Delta W vectors:", valid_r_count);
console.log("Unique Delta W vectors:", validDeltaWs.size);
console.log("Max norm of Delta W:", maxDeltaW);
