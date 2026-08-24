const { buildContainer } = require('../../src/sft-container.js');

function codeToWord(code, len) {
    const w = new Array(len);
    for (let i = len - 1; i >= 0; i--) {
      w[i] = code % 3;
      code = Math.floor(code / 3);
    }
    return w;
}

function independentEdgePredicate(w14) {
  let a1=0, b1=0, c1=0;
  for (let i=0; i<7; i++) {
    if (w14[i] === 0) a1++; else if (w14[i] === 1) b1++; else c1++;
  }
  let a2=0, b2=0, c2=0;
  for (let i=7; i<14; i++) {
    if (w14[i] === 0) a2++; else if (w14[i] === 1) b2++; else c2++;
  }
  return !(a1 === a2 && b1 === b2 && c1 === c2);
}

const container = buildContainer(7);
const states = container.states;
const adj = container.adj;
const m = 13;
const powPrev = Math.pow(3, m - 1);
const stateIdx = new Int32Array(Math.pow(3, m)).fill(-1);
for(let i=0; i<states.length; i++) stateIdx[states[i]] = i;

let mismatchCount = 0;
let totalTested = 0;

for(let i=0; i<states.length; i++) {
  const code = states[i];
  const suffix = code % powPrev;
  const prodEdges = adj[i];
  
  for(let s=0; s<3; s++) {
    const ncode = suffix * 3 + s;
    if (stateIdx[ncode] !== -1) {
      totalTested++;
      const w14 = codeToWord(code, m);
      w14.push(s);
      
      const indepValid = independentEdgePredicate(w14);
      const targetStateIdx = stateIdx[ncode];
      const prodValid = prodEdges.includes(targetStateIdx);
      
      if (indepValid !== prodValid) {
        mismatchCount++;
      }
    }
  }
}

const fs = require('fs');
fs.writeFileSync('scratch/h7-family-2026-08-24/EDGE_AUDIT.json', JSON.stringify({
  totalTested,
  mismatchCount
}, null, 2));

console.log('MISMATCH: ' + mismatchCount);
