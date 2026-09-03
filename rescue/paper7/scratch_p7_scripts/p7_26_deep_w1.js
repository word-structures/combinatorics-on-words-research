const { G85 } = require('../src/morphisms.js');
const alphabet = ['a', 'b', 'c', 'd'];
function applyG85(str) {
    let res = '';
    for(let c of str) res += G85[c];
    return res;
}
let W0 = "ad";
let W1 = "ad" + applyG85(W0);

let X = "a";
for(let i=0; i<4; i++) X = applyG85(X);
let control_full = "ad" + X;
let C1 = control_full.slice(0, W1.length);

function search(W, max_d, name) {
    console.log(`\n--- Searching ${name} (len ${W.length}) ---`);
    let n = W.length;
    // pre-map W
    let w_arr = new Int8Array(n);
    for(let i=0; i<n; i++) {
        let c = W[i];
        if(c==='a') w_arr[i]=0; else if(c==='b') w_arr[i]=1; else if(c==='c') w_arr[i]=2; else w_arr[i]=3;
    }
    
    let frontier = [{u: [], v: []}];
    for(let d=1; d<=max_d; d++) {
        let next_frontier = [];
        for (let node of frontier) {
            for(let a=0; a<4; a++) {
                outer: for(let b=0; b<4; b++) {
                    let u_new = [a, ...node.u];
                    let v_new = [...node.v, b];
                    let L = n + 2*d;
                    
                    // check left squares
                    for (let K = 1; K <= Math.floor(L / 2); K++) {
                        let pu = [0,0,0,0];
                        let pv = [0,0,0,0];
                        // u_new + w_arr + v_new
                        let get_char = (idx) => {
                            if (idx < d) return u_new[idx];
                            if (idx < d + n) return w_arr[idx - d];
                            return v_new[idx - d - n];
                        };
                        for(let j=0; j<K; j++) pu[get_char(j)]++;
                        for(let j=K; j<2*K; j++) pv[get_char(j)]++;
                        if (pu[0]===pv[0] && pu[1]===pv[1] && pu[2]===pv[2] && pu[3]===pv[3]) {
                            continue outer;
                        }
                    }
                    // check right squares
                    for (let K = 1; K <= Math.floor(L / 2); K++) {
                        let pu = [0,0,0,0];
                        let pv = [0,0,0,0];
                        let get_char = (idx) => {
                            if (idx < d) return u_new[idx];
                            if (idx < d + n) return w_arr[idx - d];
                            return v_new[idx - d - n];
                        };
                        for(let j=L-2*K; j<L-K; j++) pu[get_char(j)]++;
                        for(let j=L-K; j<L; j++) pv[get_char(j)]++;
                        if (pu[0]===pv[0] && pu[1]===pv[1] && pu[2]===pv[2] && pu[3]===pv[3]) {
                            continue outer;
                        }
                    }
                    next_frontier.push({u: u_new, v: v_new});
                }
            }
        }
        console.log(`Depth ${d}: ${next_frontier.length} survivors.`);
        if (next_frontier.length === 0) {
            console.log(`EXTINCTION AT DEPTH ${d}!`);
            return {d, frontier};
        }
        frontier = next_frontier;
    }
    return null;
}

search(W1, 20, "W1");
search(C1, 20, "C1");
