const { G85 } = require('../src/morphisms.js');
const alphabet = ['a', 'b', 'c', 'd'];

function applyG85(str) {
    let res = '';
    for(let c of str) res += G85[c];
    return res;
}

let W0 = "ad";
let W1 = "ad" + applyG85(W0);
let W2 = "ad" + applyG85(W1);

let X = "a";
for(let i=0; i<4; i++) X = applyG85(X);
let control_full = "ad" + X;
let C2 = control_full.slice(0, W2.length);

function isASF_incremental(w) {
    let n = w.length;
    let s = new Int8Array(n);
    for(let i=0; i<n; i++) {
        let c = w[i];
        if(c==='a') s[i]=0; else if(c==='b') s[i]=1; else if(c==='c') s[i]=2; else s[i]=3;
    }
    for (let K = 1; K <= Math.floor(n / 2); K++) {
        let pu = [0,0,0,0];
        let pv = [0,0,0,0];
        for(let j=0; j<K; j++) pu[s[j]]++;
        for(let j=K; j<2*K; j++) pv[s[j]]++;
        if (pu[0]===pv[0] && pu[1]===pv[1] && pu[2]===pv[2] && pu[3]===pv[3]) return {K: K, type: 'left'};
    }
    for (let K = 1; K <= Math.floor(n / 2); K++) {
        let pu = [0,0,0,0];
        let pv = [0,0,0,0];
        for(let j=n-2*K; j<n-K; j++) pu[s[j]]++;
        for(let j=n-K; j<n; j++) pv[s[j]]++;
        if (pu[0]===pv[0] && pu[1]===pv[1] && pu[2]===pv[2] && pu[3]===pv[3]) return {K: K, type: 'right'};
    }
    return null;
}

function search(W, max_d, name) {
    console.log(`\n--- Searching ${name} (len ${W.length}) ---`);
    let frontier = [{u: "", v: ""}];
    for(let d=1; d<=max_d; d++) {
        let next_frontier = [];
        let start_time = Date.now();
        for (let node of frontier) {
            for(let a of alphabet) {
                for(let b of alphabet) {
                    let w_new = a + node.u + W + node.v + b;
                    let res = isASF_incremental(w_new);
                    if (res === null) {
                        next_frontier.push({u: a + node.u, v: node.v + b});
                    }
                }
            }
        }
        let end_time = Date.now();
        console.log(`Depth ${d}: ${next_frontier.length} survivors. (${end_time - start_time}ms)`);
        if (next_frontier.length === 0) {
            console.log(`EXTINCTION AT DEPTH ${d}!`);
            let fs = require('fs');
            fs.writeFileSync('P7_26_CERTIFICATE_DUMP.json', JSON.stringify({n: 2, depth: d, frontier: frontier}));
            return {d, frontier}; // return the parents
        }
        frontier = next_frontier;
    }
    return null;
}

search(W2, 6, "W2");
search(C2, 6, "C2 (Control for W2)");
