const fs = require('fs');

function analyze(L) {
    let local_configs = [];
    for (let K = 2; K <= 10 * L; K++) {
      for (let s = 0; s < L; s++) {
        let t0 = s; let t1 = s + K; let t2 = s + 2 * K;
        let b0 = Math.floor(t0 / L); let b1 = Math.floor(t1 / L); let b2 = Math.floor(t2 / L);
        let i0 = t0 % L; let i1 = t1 % L; let i2 = t2 % L;

        let r = K % L;
        let q = Math.floor(K / L);
        let c1 = Math.floor((s + r) / L);
        let c2 = Math.floor((s + 2 * r) / L) - c1;

        let b_coin = (b0===b1 ? '0=1' : '0<1') + ',' + (b1===b2 ? '1=2' : '1<2');
        
        let geom_type = '';
        if (c1 === c2) {
            geom_type = (b_coin === '0=1,1=2') ? 'Flat_Coin' : 'Flat_Dist';
        } else if (c1 === 0 && c2 === 1) {
            geom_type = (b_coin === '0=1,1<2') ? 'Up_Coin' : 'Up_Dist';
        } else if (c1 === 1 && c2 === 0) {
            geom_type = (b_coin === '0<1,1=2') ? 'Down_Coin' : 'Down_Dist';
        }
        
        local_configs.push({K, s, domain_key: geom_type, i0, i1, i2, b0, b1, b2, b_coin});
      }
    }

    let domains = [...new Set(local_configs.map(c => c.domain_key))];
    
    let patterns = [];
    let families = new Map();
    
    for (let d of domains) {
        let configs = local_configs.filter(c => c.domain_key === d);
        let sample = configs[0];
        
        for (let r0 = 0; r0 <= 1; r0++) {
          for (let r1 = 0; r1 <= 1; r1++) {
            for (let r2 = 0; r2 <= 1; r2++) {
              
              let valid_count = 0;
              let family_set = new Set();
              
              for (let c of configs) {
                  if (c.b0 === c.b1 && r0 !== r1) continue;
                  if (c.b1 === c.b2 && r1 !== r2) continue;
                  if (c.b0 === c.b2 && r0 !== r2) continue;
                  
                  valid_count++;
                  
                  let coeffs = new Array(L).fill(0);
                  coeffs[c.i0] += r0 * 1;
                  coeffs[c.i1] += r1 * -2;
                  coeffs[c.i2] += r2 * 1;
                  coeffs[0] = 0;
                  
                  let terms = [];
                  for (let i = 1; i < L; i++) {
                      if (coeffs[i] !== 0) terms.push(coeffs[i] + '*x_' + i);
                  }
                  family_set.add(terms.length === 0 ? 'EMPTY' : terms.join(' + '));
              }
              
              if (valid_count > 0) {
                  let pattern_key = d + '|' + r0 + r1 + r2;
                  patterns.push(pattern_key);
                  let family_sorted = Array.from(family_set).sort().join(' ; ');
                  if (!families.has(family_sorted)) {
                      families.set(family_sorted, []);
                  }
                  families.get(family_sorted).push(pattern_key);
              }
            }
          }
        }
    }
    
    return {
       domains: domains.length,
       patterns: patterns.length,
       families: families.size,
       families_obj: families
    };
}

let res = analyze(5);
console.log('L=5: Domains=' + res.domains + ', Patterns=' + res.patterns + ', Families=' + res.families);

