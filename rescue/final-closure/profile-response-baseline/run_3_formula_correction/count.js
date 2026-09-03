const utils = require('./utils.js');
let count = 0;
for (let h=2; h<=7; h++) {
    const L = 2*h - 1;
    let old_states = [];
    const total = Math.pow(3, L);
    for (let i=0; i<total; i++) {
        let arr = new Array(L);
        let temp = i;
        for (let j=L-1; j>=0; j--) {
            arr[j] = temp % 3;
            temp = Math.floor(temp / 3);
        }
        if (!utils.hasAbelianSquare(arr, 2, h-1)) old_states.push(arr);
    }
    const N = old_states.length;
    let profs = new Set();
    for (let i=0; i<N; i++) {
        for (let x=0; x<3; x++) {
            let nw = [...old_states[i], x];
            if (!utils.hasAbelianSquare(nw.slice(1), 2, h-1)) {
                if (utils.hasAbelianSquare(nw, h, h)) {
                    let p = utils.getParikh(nw.slice(0, h)).sort((a,b)=>b-a).join(',');
                    profs.add(p);
                }
            }
        }
    }
    console.log(`h=${h}: ${Array.from(profs).join(' | ')}`);
    count += profs.size;
}
console.log(`Total classes: ${count}`);
