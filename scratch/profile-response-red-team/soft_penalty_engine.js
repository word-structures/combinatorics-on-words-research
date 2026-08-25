const fs = require('fs');
const { tarjanSCC } = require("../../src/sft-container.js");

function codeToWord(code, len) {
  const w = new Array(len);
  for (let i = len - 1; i >= 0; i--) { w[i] = code % 3; code = Math.floor(code / 3); }
  return w;
}

function hasAbelianSquare(w, klo, khi) {
  const n = w.length;
  for (let K = klo; K <= khi; K++) {
    for (let i = 0; i + 2 * K <= n; i++) {
      let da = 0, db = 0, dc = 0;
      for (let j = 0; j < K; j++) { const c = w[i + j]; if (c === 0) da++; else if (c === 1) db++; else dc++; }
      for (let j = K; j < 2 * K; j++) { const c = w[i + j]; if (c === 0) da--; else if (c === 1) db--; else dc--; }
      if (da === 0 && db === 0 && dc === 0) return true;
    }
  }
  return false;
}

function getOrbit(profile) {
  // return all unique permutations of the profile array
  let p = [...profile];
  let orbit = new Set();
  const perms = [
    [0,1,2], [0,2,1], [1,0,2], [1,2,0], [2,0,1], [2,1,0]
  ];
  for (let perm of perms) {
    let cp = [p[perm[0]], p[perm[1]], p[perm[2]]];
    orbit.add(cp.join(','));
  }
  return orbit;
}

function buildSoftContainer(h, targetProfileOrbitStrArr, epsilon) {
  const m = 2 * h - 1;
  const raw = Math.pow(3, m);
  const stateIdx = new Int32Array(raw).fill(-1);
  const states = [];
  
  for (let code = 0; code < raw; code++) {
    if (!hasAbelianSquare(codeToWord(code, m), 2, h - 1)) {
      stateIdx[code] = states.length;
      states.push(code);
    }
  }
  const n = states.length;
  
  const targetOrbit = new Set(targetProfileOrbitStrArr);
  const adj = new Array(n);
  const weights = new Array(n);
  
  const penalty = Math.exp(-epsilon);
  
  for (let i = 0; i < n; i++) {
    const code = states[i];
    const ncodeBase = (code % Math.pow(3, m - 1)) * 3;
    const out_adj = [];
    const out_w = [];
    const w2k_base = codeToWord(code, m);
    
    for (let s = 0; s < 3; s++) {
      const ncode = ncodeBase + s;
      if (stateIdx[ncode] === -1) continue;
      
      const w2k = w2k_base.slice(); w2k.push(s);
      
      let da = 0, db = 0, dc = 0;
      for (let j = 0; j < h; j++) { const c = w2k[j]; if (c === 0) da++; else if (c === 1) db++; else dc++; }
      for (let j = h; j < 2 * h; j++) { const c = w2k[j]; if (c === 0) da--; else if (c === 1) db--; else dc--; }
      
      let weight = 1.0;
      if (da === 0 && db === 0 && dc === 0) {
        // It's an Abelian square of half-length h!
        // Profile of the first half:
        let pa = 0, pb = 0, pc = 0;
        for (let j = 0; j < h; j++) { const c = w2k[j]; if (c === 0) pa++; else if (c === 1) pb++; else pc++; }
        let pStr = [pa, pb, pc].join(',');
        
        if (targetOrbit.has(pStr)) {
          weight = penalty;
        }
      }
      
      if (weight > 0) {
        out_adj.push(stateIdx[ncode]);
        out_w.push(weight);
      }
    }
    adj[i] = out_adj;
    weights[i] = out_w;
  }
  
  return { states, adj, weights };
}

module.exports = { buildSoftContainer, getOrbit };
