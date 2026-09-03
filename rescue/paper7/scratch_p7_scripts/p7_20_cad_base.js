const { G85 } = require('../src/morphisms.js');

let X1 = G85['a'];
let X2 = ''; for(let c of X1) X2 += G85[c];

let Y = 'cad' + X2; 
let K_0 = 255; 

console.log(`Verifying base cases K <= ${K_0} for cad*X`);
let counterExamples = 0;

for (let K = 1; K <= K_0; K++) {
    let P_U = [0,0,0,0];
    let P_V = [0,0,0,0];
    
    for(let i=0; i<K; i++) {
        let cu = Y[i];
        let cv = Y[K+i];
        if (cu === 'a') P_U[0]++; else if (cu === 'b') P_U[1]++; else if (cu === 'c') P_U[2]++; else if (cu === 'd') P_U[3]++;
        if (cv === 'a') P_V[0]++; else if (cv === 'b') P_V[1]++; else if (cv === 'c') P_V[2]++; else if (cv === 'd') P_V[3]++;
    }
    
    if (P_U[0]===P_V[0] && P_U[1]===P_V[1] && P_U[2]===P_V[2] && P_U[3]===P_V[3]) {
        console.log(`Counterexample found at K=${K}`);
        counterExamples++;
    }
}

console.log(`Complete. Counterexamples: ${counterExamples}`);
