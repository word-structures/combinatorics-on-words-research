const s = 'abacabadc';
const alphabet = ['a','b','c','d'];

function findAbelianSquare(str) {
    let N = str.length;
    let s_arr = new Int8Array(N);
    for(let i=0; i<N; i++) {
        let c = str[i];
        if(c==='a') s_arr[i]=0; else if(c==='b') s_arr[i]=1; else if(c==='c') s_arr[i]=2; else s_arr[i]=3;
    }
    
    // Since we know the extension is at index 0, the square MUST start at index 0 to be the immediate left-death witness.
    for (let K = 1; K <= Math.floor(N / 2); K++) {
        let pu = [0,0,0,0];
        let pv = [0,0,0,0];
        for(let j=0; j<K; j++) pu[s_arr[j]]++;
        for(let j=K; j<2*K; j++) pv[s_arr[j]]++;
        if (pu[0]===pv[0] && pu[1]===pv[1] && pu[2]===pv[2] && pu[3]===pv[3]) {
            return { K: K, u: str.slice(0, K), v: str.slice(K, 2*K) };
        }
    }
    return null;
}

for(let c of alphabet) {
    let sq = findAbelianSquare(c + s);
    console.log(`Witness for ${c} + s: K=${sq.K}, halves=${sq.u}|${sq.v}`);
}
