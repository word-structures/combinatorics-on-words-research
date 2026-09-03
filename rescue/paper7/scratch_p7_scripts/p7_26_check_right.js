const { G85 } = require('../src/morphisms.js');
const alphabet = ['a', 'b', 'c', 'd'];

function count_right_extensions(W, max_d) {
    let n = W.length;
    let w_arr = new Int8Array(n);
    for(let i=0; i<n; i++) {
        let c = W[i];
        if(c==='a') w_arr[i]=0; else if(c==='b') w_arr[i]=1; else if(c==='c') w_arr[i]=2; else w_arr[i]=3;
    }
    
    let frontier = [[]];
    let counts = [];
    for(let d=1; d<=max_d; d++) {
        let next_frontier = [];
        for (let v of frontier) {
            for(let b=0; b<4; b++) {
                let v_new = [...v, b];
                let L = n + d;
                
                let match = false;
                for (let K = 1; K <= Math.floor(L / 2); K++) {
                    let pu = [0,0,0,0];
                    let pv = [0,0,0,0];
                    let get_char = (idx) => idx < n ? w_arr[idx] : v_new[idx - n];
                    for(let j=L-2*K; j<L-K; j++) pu[get_char(j)]++;
                    for(let j=L-K; j<L; j++) pv[get_char(j)]++;
                    if (pu[0]===pv[0] && pu[1]===pv[1] && pu[2]===pv[2] && pu[3]===pv[3]) {
                        match = true;
                        break;
                    }
                }
                if (!match) next_frontier.push(v_new);
            }
        }
        counts.push(next_frontier.length);
        frontier = next_frontier;
    }
    return counts;
}

for(let c of alphabet) {
    console.log(`Right extensions for g85(${c}):`, count_right_extensions(G85[c], 6));
}
