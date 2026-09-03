const fs = require('fs');
function analyze(L) {
    let patterns = new Set();
    
    for (let K = 2; K <= 10 * L; K++) {
      for (let s = 0; s < L; s++) {
        let t0 = s; let t1 = s + K; let t2 = s + 2 * K;
        let i0 = t0 % L; let i1 = t1 % L; let i2 = t2 % L;

        if (i0 === i1 || i1 === i2 || i0 === i2) continue; // STRICT

        let i_order = [];
        if (i0 < i1) i_order.push('0<1'); else if (i0 > i1) i_order.push('0>1'); else i_order.push('0=1');
        if (i1 < i2) i_order.push('1<2'); else if (i1 > i2) i_order.push('1>2'); else i_order.push('1=2');
        if (i0 < i2) i_order.push('0<2'); else if (i0 > i2) i_order.push('0>2'); else i_order.push('0=2');
        let geom = i_order.join(',');
        
        let sorted = [i0, i1, i2].filter(x => x > 0);
        sorted.sort((a,b)=>a-b);
        let unique_sorted = [...new Set(sorted)];
        
        for (let r0 = 0; r0 <= 1; r0++) {
          for (let r1 = 0; r1 <= 1; r1++) {
            for (let r2 = 0; r2 <= 1; r2++) {
              if (r0 === 0 && r1 === 0 && r2 === 0) continue;

              let coeffs = new Array(L).fill(0);
              coeffs[i0] += r0 * 1;
              coeffs[i1] += r1 * -2;
              coeffs[i2] += r2 * 1;
              coeffs[0] = 0;

              let terms = [];
              for (let idx = 0; idx < unique_sorted.length; idx++) {
                let val = unique_sorted[idx];
                if (coeffs[val] !== 0) {
                  terms.push(coeffs[val] + '*x' + (idx+1));
                }
              }
              if (terms.length > 0) {
                patterns.add(geom + ' | ' + r0 + r1 + r2);
              }
            }
          }
        }
      }
    }
    return patterns.size;
}
console.log('Patterns without b_coin:', analyze(5));

