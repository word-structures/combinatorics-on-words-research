const fs = require('fs');
let L = 6;
let count = 0;
let seqs = new Set();
for (let r = 0; r < L; r++) {
    for (let s = 0; s < L; s++) {
        let seq = '';
        for (let j = 0; j < L; j++) {
            let c = Math.floor((s + (j+1)*r)/L) - Math.floor((s + j*r)/L);
            seq += c;
        }
        seqs.add(r + '|' + seq);
    }
}
console.log('L=' + L + ' count=' + seqs.size);

