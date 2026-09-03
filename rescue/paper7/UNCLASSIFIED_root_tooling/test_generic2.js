function codeToWord(code, len) {
  const w = new Array(len);
  for (let i = len - 1; i >= 0; i--) {
    w[i] = code % 3;
    code = Math.floor(code / 3);
  }
  return w;
}

function hasAbelianSquare(w, klo, khi) {
  const n = w.length;
  for (let K = klo; K <= khi; K++) {
    if (2*K > n) continue;
    for (let i = 0; i + 2 * K <= n; i++) {
      let da = 0, db = 0, dc = 0;
      for (let j = i; j < i + K; j++) { const c = w[j]; if (c === 0) da++; else if (c === 1) db++; else dc++; }
      for (let j = i + K; j < i + 2 * K; j++) { const c = w[j]; if (c === 0) da--; else if (c === 1) db--; else dc--; }
      if (da === 0 && db === 0 && dc === 0) return true;
    }
  }
  return false;
}

function buildGeneric(h) {
  const m = 2 * h - 1;
  const raw = Math.pow(3, m);
  const stateIdx = new Int32Array(raw).fill(-1);
  const states = [];
  
  // Old system avoids K=2 .. h-1
  for (let code = 0; code < raw; code++) {
    if (!hasAbelianSquare(codeToWord(code, m), 2, h - 1)) {
      stateIdx[code] = states.length;
      states.push(code);
    }
  }
  
  const n = states.length;
  const adj = new Array(n);
  const deletedEdges = []; 
  const powPrev = Math.pow(3, m - 1);
  
  let del = 0;
  for (let i = 0; i < n; i++) {
    const code = states[i];
    const out = [];
    const suffix = code % powPrev;
    for (let s = 0; s < 3; s++) {
      const targetCode = suffix * 3 + s;
      const targetIdx = stateIdx[targetCode];
      if (targetIdx !== -1) {
        const w_edge = codeToWord(code, m);
        w_edge.push(s);
        
        // Edge belongs to L_{h-1}. Does it violate K=h?
        if (hasAbelianSquare(w_edge, h, h)) {
          let counts = [0, 0, 0];
          for(let j=0; j<h; j++) counts[w_edge[m + 1 - h + j - 1]]++; 
          // wait, the square of half-length h is exactly the last 2h symbols!
          // So the second block of length h is the last h symbols.
          // The first block is the h symbols before that.
          counts = [0,0,0];
          for(let j=0; j<h; j++) counts[w_edge[m + 1 - h + j - 1]]++;
          counts.sort((a,b) => b-a);
          deletedEdges.push({ from: i, to: targetIdx, profile: counts.join(',') });
          del++;
        } else {
          out.push(targetIdx);
        }
      }
    }
    adj[i] = out;
  }
  
  return { n, states, adj, stateIdx, deletedEdges, del };
}

console.log(buildGeneric(2).del);
console.log(buildGeneric(3).del);
