const utils = require('./utils.js');
const h = 5;
const L = 2*h - 1;
let old_states = [];
for (let i=0; i<Math.pow(3, L); i++) {
    let arr = new Array(L);
    let temp = i;
    for (let j=L-1; j>=0; j--) {
        arr[j] = temp % 3;
        temp = Math.floor(temp / 3);
    }
    if (!utils.hasAbelianSquare(arr, 2, h-1)) old_states.push(arr);
}
const N = old_states.length;
const old_map = new Map();
for (let i=0; i<N; i++) old_map.set(old_states[i].join(''), i);

function testProf(prof) {
    let adj = Array.from({length: N}, () => []);
    for (let i=0; i<N; i++) {
        for (let x=0; x<3; x++) {
            let nw = [...old_states[i], x];
            let tgt = nw.slice(1).join('');
            if (old_map.has(tgt)) {
                if (utils.hasAbelianSquare(nw, h, h)) {
                    let p = utils.getParikh(nw.slice(0, h)).sort((a,b)=>b-a).join(',');
                    if (p === prof) continue;
                }
                adj[i].push(old_map.get(tgt));
            }
        }
    }
    const sccs = utils.tarjanSCC(adj);
    let recurrent = [];
    for (let scc of sccs) {
        let has_out = false;
        let in_scc = new Uint8Array(N);
        for (let u of scc) in_scc[u] = 1;
        let has_cycle = false;
        for (let u of scc) {
            for (let v of adj[u]) {
                if (!in_scc[v]) has_out = true;
                else has_cycle = true;
            }
        }
        if (!has_out && has_cycle) recurrent.push(scc);
    }
    console.log(`Prof ${prof} recurrents: ${recurrent.length}`);
}
testProf('3,2,0');
testProf('3,1,1');
testProf('2,2,1');
