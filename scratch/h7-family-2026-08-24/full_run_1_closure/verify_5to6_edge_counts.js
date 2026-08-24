const { buildContainer, tarjanSCC } = require('../../../src/sft-container.js');
const fs = require('fs');

/**
 * h=7 Closure: Edge deletion verification for the 5 -> 6 transition.
 * 
 * State space selector:
 * The memory length for constructing L_{h} states is 2h-1.
 * For the transition 5->6, the relevant state length is 2(6)-1 = 11.
 * We build the graph over memory length 11 that forbids Abelian squares of half-lengths K <= 5.
 * This represents the valid container L_5 viewed at the resolution of L_6.
 * 
 * Full deleted K=6 edges:
 * We iterate over all valid states and all 3 symbols to form words of length 12.
 * We count the number of valid length-12 extensions that contain an Abelian square of half-length K=6.
 * 
 * Core deleted K=6 edges:
 * We restrict the states to the dominant essential Strongly Connected Component (SCC) of L_5.
 * We count the number of K=6 deleted edges where both the origin state and the target state belong to this essential SCC.
 */

function codeToWord(code, len) {
  const w = new Array(len);
  for (let i = len - 1; i >= 0; i--) {
    w[i] = code % 3;
    code = Math.floor(code / 3);
  }
  return w;
}

function hasAbelianSquare(w, minK, maxK) {
  const n = w.length;
  for (let K = minK; K <= maxK; K++) {
    if (2 * K > n) continue;
    for (let i = 0; i <= n - 2 * K; i++) {
      let a1 = 0, b1 = 0, c1 = 0;
      for (let j = 0; j < K; j++) {
        if (w[i + j] === 0) a1++; else if (w[i + j] === 1) b1++; else c1++;
      }
      let a2 = 0, b2 = 0, c2 = 0;
      for (let j = K; j < 2 * K; j++) {
        if (w[i + j] === 0) a2++; else if (w[i + j] === 1) b2++; else c2++;
      }
      if (a1 === a2 && b1 === b2 && c1 === c2) return true;
    }
  }
  return false;
}

const container = buildContainer(6); // constructs memory length 11, forbidding K <= 5.
const states = container.states;
const stateIdx = new Int32Array(Math.pow(3, 11)).fill(-1);
for(let i=0; i<states.length; i++) stateIdx[states[i]] = i;
const n = states.length;

let fullDeletedEdges = 0;

const adj5 = new Array(n);
for(let i=0; i<n; i++) {
  const code = states[i];
  const suffix = code % Math.pow(3, 10);
  const out = [];
  for(let s=0; s<3; s++) {
    const targetCode = suffix * 3 + s;
    const targetIdx = stateIdx[targetCode];
    if (targetIdx !== -1) {
      out.push(targetIdx);
      
      const w12 = codeToWord(code, 11);
      w12.push(s);
      
      if (hasAbelianSquare(w12, 6, 6)) {
        fullDeletedEdges++;
      }
    }
  }
  adj5[i] = out;
}

const alive = new Int32Array(n).fill(1);
const scc = tarjanSCC([...Array(n).keys()], adj5, alive);
const sizes = new Int32Array(scc.ncomp);
for(let i=0; i<n; i++) if(scc.comp[i] !== -1) sizes[scc.comp[i]]++;
const dominantSccId = Array.from(sizes).indexOf(Math.max(...sizes));

let coreDeletedEdges = 0;
for(let i=0; i<n; i++) {
  if (scc.comp[i] === dominantSccId) {
    const code = states[i];
    const suffix = code % Math.pow(3, 10);
    for(let s=0; s<3; s++) {
      const targetCode = suffix * 3 + s;
      const targetIdx = stateIdx[targetCode];
      if (targetIdx !== -1 && scc.comp[targetIdx] === dominantSccId) {
        const w12 = codeToWord(code, 11);
        w12.push(s);
        if (hasAbelianSquare(w12, 6, 6)) {
          coreDeletedEdges++;
        }
      }
    }
  }
}

console.log('--- 5->6 EDGE DELETION VERIFICATION ---');
console.log('Full deleted K=6 edges: ' + fullDeletedEdges);
console.log('Core deleted K=6 edges: ' + coreDeletedEdges);

if (fullDeletedEdges !== 936) throw new Error("Verification failed: expected 936 full deleted edges.");
if (coreDeletedEdges !== 924) throw new Error("Verification failed: expected 924 core deleted edges.");

console.log('VERIFICATION PASSED.');