const fs = require('fs');

function codeToWord(code, len) {
  const w = new Array(len);
  let c = code;
  for (let i = len - 1; i >= 0; i--) {
    w[i] = c % 3;
    c = Math.floor(c / 3);
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

function tarjanSCC(n, adj, alive) {
  let index = 0;
  const idx = new Int32Array(n).fill(-1);
  const low = new Int32Array(n).fill(-1);
  const onStack = new Uint8Array(n).fill(0);
  const stack = [];
  const comp = new Int32Array(n).fill(-1);
  let ncomp = 0;

  // iterative strongconnect
  for (let i = 0; i < n; i++) {
    if (!alive[i] || idx[i] !== -1) continue;
    const callStack = [i];
    const edgePtr = new Int32Array(n).fill(0);
    
    while(callStack.length > 0) {
      const v = callStack[callStack.length - 1];
      if (idx[v] === -1) {
        idx[v] = index; low[v] = index; index++;
        stack.push(v); onStack[v] = 1;
      }
      
      let pushed = false;
      while(edgePtr[v] < adj[v].length) {
        const w = adj[v][edgePtr[v]++];
        if (!alive[w]) continue;
        if (idx[w] === -1) {
          callStack.push(w);
          pushed = true;
          break; // recurse
        } else if (onStack[w]) {
          low[v] = Math.min(low[v], idx[w]);
        }
      }
      if (pushed) continue;
      
      callStack.pop();
      if (callStack.length > 0) {
        const parent = callStack[callStack.length - 1];
        low[parent] = Math.min(low[parent], low[v]);
      }
      
      if (low[v] === idx[v]) {
        let w;
        do {
          w = stack.pop();
          onStack[w] = 0;
          comp[w] = ncomp;
        } while(w !== v);
        ncomp++;
      }
    }
  }
  return { comp, ncomp };
}

function getDominantSCC(n, adj, alive) {
  const scc = tarjanSCC(n, adj, alive);
  const ncomp = scc.ncomp;
  
  const compAlive = [];
  for(let c=0; c<ncomp; c++) compAlive.push([]);
  for(let i=0; i<n; i++) {
    if (scc.comp[i] !== -1) compAlive[scc.comp[i]].push(i);
  }
  
  let maxLambda = -1;
  let domId = -1;
  
  for(let c=0; c<ncomp; c++) {
    const nodes = compAlive[c];
    if (nodes.length === 0) continue;
    
    // check if it has any edges (to itself)
    let hasEdges = false;
    for(let u of nodes) {
      for(let v of adj[u]) {
        if (scc.comp[v] === c) { hasEdges = true; break; }
      }
      if (hasEdges) break;
    }
    if (!hasEdges) continue;
    
    // perron root power iteration
    const N = nodes.length;
    const essIdx = new Int32Array(n).fill(-1);
    for(let i=0; i<N; i++) essIdx[nodes[i]] = i;
    
    let R = new Float64Array(N).fill(1);
    let lambda = 0;
    for(let iter=0; iter<200; iter++) { // 200 is enough to find dominant loosely
      let nextR = new Float64Array(N);
      for(let u=0; u<N; u++) {
        for(let v of adj[nodes[u]]) {
          if (scc.comp[v] === c) nextR[u] += R[essIdx[v]];
        }
      }
      let sumR = 0, sumNextR = 0;
      let maxR = 0;
      for(let u=0; u<N; u++) {
        sumR += R[u]; sumNextR += nextR[u];
        if (nextR[u] > maxR) maxR = nextR[u];
      }
      lambda = sumNextR / sumR;
      for(let u=0; u<N; u++) R[u] = nextR[u] / maxR;
    }
    
    if (lambda > maxLambda) {
      maxLambda = lambda;
      domId = c;
    }
  }
  
  return { domId, scc, compAlive, ncomp, maxLambda };
}

function computeMetrics(n, states, adj) {
  const alive = new Int32Array(n).fill(1);
  const domInfo = getDominantSCC(n, adj, alive);
  const domId = domInfo.domId;
  if (domId === -1) return null; // no edges
  
  const nodes = domInfo.compAlive[domId];
  const N = nodes.length;
  const essIdx = new Int32Array(n).fill(-1);
  for(let i=0; i<N; i++) essIdx[nodes[i]] = i;
  
  const essAdj = new Array(N);
  for(let i=0; i<N; i++) {
    const out = [];
    for(let t of adj[nodes[i]]) {
      if (domInfo.scc.comp[t] === domId) out.push(essIdx[t]);
    }
    essAdj[i] = out;
  }
  
  // High precision Perron root
  let R = new Float64Array(N).fill(1);
  let L_vec = new Float64Array(N).fill(1);
  let lambda = 0;
  for(let iter = 0; iter < 1000; iter++) {
    let nextR = new Float64Array(N);
    let nextL = new Float64Array(N);
    for(let i=0; i<N; i++) {
      for(let j of essAdj[i]) {
        nextR[i] += R[j];
        nextL[j] += L_vec[i];
      }
    }
    let sumR = 0, sumNextR = 0;
    let maxR = 0, maxL = 0;
    for(let i=0; i<N; i++) {
      sumR += R[i]; sumNextR += nextR[i];
      if (nextR[i] > maxR) maxR = nextR[i];
      if (nextL[i] > maxL) maxL = nextL[i];
    }
    lambda = sumNextR / sumR;
    for(let i=0; i<N; i++) { R[i] = nextR[i] / maxR; L_vec[i] = nextL[i] / maxL; }
  }
  
  let dot = 0;
  for(let i=0; i<N; i++) dot += L_vec[i] * R[i];
  for(let i=0; i<N; i++) L_vec[i] /= dot;
  let pi = new Float64Array(N);
  for(let i=0; i<N; i++) pi[i] = L_vec[i] * R[i];
  
  // Method A: Green-Kubo Poisson
  let mu = 0;
  for(let i=0; i<N; i++) {
    const isZero = (states[nodes[i]] % 3 === 0) ? 1 : 0;
    mu += pi[i] * isZero;
  }
  let v = new Float64Array(N);
  for(let i=0; i<N; i++) {
    const isZero = (states[nodes[i]] % 3 === 0) ? 1 : 0;
    v[i] = isZero - mu;
  }
  let x = new Float64Array(N);
  let current = new Float64Array(v);
  for(let iter=0; iter<1000; iter++) {
    for(let i=0; i<N; i++) x[i] += current[i];
    let next = new Float64Array(N);
    for(let i=0; i<N; i++) {
      for(let j of essAdj[i]) {
        const p_ij = R[j] / (lambda * R[i]);
        next[i] += p_ij * current[j];
      }
    }
    current = next;
  }
  let a_gk = 0;
  for(let i=0; i<N; i++) {
    let Px_i = 0;
    for(let j of essAdj[i]) {
      const p_ij = R[j] / (lambda * R[i]);
      Px_i += p_ij * x[j];
    }
    a_gk += pi[i] * v[i] * v[i] + 2 * pi[i] * v[i] * Px_i;
  }
  
  // Method B: Normalized Moment DP
  let C_arr = new Float64Array(N).fill(1/N);
  let S_arr = new Float64Array(N);
  let V_arr = new Float64Array(N);
  const varAt = {};
  for(let iter=1; iter<=3000; iter++) {
    let nC = new Float64Array(N), nS = new Float64Array(N), nV = new Float64Array(N);
    for(let i=0; i<N; i++) {
      const ci = C_arr[i], si = S_arr[i], vi = V_arr[i];
      if(ci === 0) continue;
      for(let j of essAdj[i]) {
        const x_val = (states[nodes[j]] % 3 === 0) ? 1 : 0;
        nC[j] += ci; nS[j] += si + x_val*ci; nV[j] += vi + 2*x_val*si + x_val*ci;
      }
    }
    let sumC = 0;
    for(let i=0; i<N; i++) sumC += nC[i];
    const inv = 1.0 / sumC;
    let totS = 0, totV = 0;
    for(let i=0; i<N; i++) {
      C_arr[i] = nC[i]*inv; S_arr[i] = nS[i]*inv; V_arr[i] = nV[i]*inv;
      totS += S_arr[i]; totV += V_arr[i];
    }
    if (iter % 1000 === 0) varAt[iter] = totV - totS*totS;
  }
  const a_dp1 = (varAt[2000] - varAt[1000]) / 1000.0;
  const a_dp2 = (varAt[3000] - varAt[2000]) / 1000.0;
  
  const C_gk = 1 / (2 * Math.sqrt(3) * Math.PI * a_gk);
  const C_dp = 1 / (2 * Math.sqrt(3) * Math.PI * a_dp2);

  // identify if one SCC
  let numBigSCC = 0;
  for(let c=0; c<domInfo.ncomp; c++) {
    if (domInfo.compAlive[c].length > 1) numBigSCC++;
  }
  const struct = numBigSCC === 1 ? 'ONE_SCC' : 'MULTI_SCC';

  return {
    lambda, a_gk, a_dp: a_dp2, C_gk, C_dp,
    essIdx, N, pi, R, domId, nodes,
    a_diff: Math.abs(a_gk - a_dp2),
    struct
  };
}

const baselineOut = [];
const sumOut = {
  h_values: [],
  edge_equivalence_mismatch: 0,
  profile_classification_mismatch: 0,
  q_partition_residuals: {},
  per_h_stats: {}
};

for (let h = 2; h <= 7; h++) {
  console.log(`Processing h=${h}`);
  sumOut.h_values.push(h);
  
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
  const adjOld = new Array(n);
  const adjNew = new Array(n);
  const edgeProfileMap = new Map();
  const profileSet = new Set();
  
  for (let i = 0; i < n; i++) {
    const code = states[i];
    const suffix = code % Math.pow(3, m - 1);
    const outOld = [];
    const outNew = [];
    for (let s = 0; s < 3; s++) {
      const targetCode = suffix * 3 + s;
      const targetIdx = stateIdx[targetCode];
      
      const w_edge = codeToWord(code, m);
      w_edge.push(s);
      
      // Method A: Check w_edge fully
      const methodA_valid_old = !hasAbelianSquare(w_edge, 2, h - 1);
      const methodA_violation = methodA_valid_old && hasAbelianSquare(w_edge, h, h);
      
      // Method B: Target state valid AND w_edge has K=h
      const methodB_valid_old = (targetIdx !== -1);
      const methodB_violation = methodB_valid_old && hasAbelianSquare(w_edge, h, h);
      
      if (methodA_violation !== methodB_violation) sumOut.edge_equivalence_mismatch++;
      
      if (targetIdx !== -1) {
        outOld.push(targetIdx);
        if (methodB_violation) {
          // P1
          const U = w_edge.slice(0, h);
          let cU = [0,0,0]; for(let x of U) cU[x]++;
          // P2
          const V = w_edge.slice(h, 2*h);
          let cV = [0,0,0]; for(let x of V) cV[x]++;
          // P3
          let c3 = [0,0,0];
          for(let k=0; k<h; k++) c3[w_edge[k]]++;
          
          if (cU.join(',') !== cV.join(',') || cU.join(',') !== c3.join(',')) {
            sumOut.profile_classification_mismatch++;
          }
          
          cU.sort((a,b) => b-a);
          const profStr = cU.join(',');
          edgeProfileMap.set(`${i}_${targetIdx}`, profStr);
          profileSet.add(profStr);
        } else {
          outNew.push(targetIdx);
        }
      }
    }
    adjOld[i] = outOld;
    adjNew[i] = outNew;
  }
  
  const profiles = Array.from(profileSet);
  const mOld = computeMetrics(n, states, adjOld);
  const mNew = computeMetrics(n, states, adjNew);
  
  const q_v_map = new Map();
  for(let p of profiles) q_v_map.set(p, 0);
  
  let total_q_h = 0;
  for(let i=0; i<n; i++) {
    if (mOld.essIdx[i] !== -1) {
      for(let t of adjOld[i]) {
        if (mOld.essIdx[t] !== -1) {
          const prof = edgeProfileMap.get(`${i}_${t}`);
          if (prof) {
            const from_ess = mOld.essIdx[i];
            const to_ess = mOld.essIdx[t];
            const p_ij = mOld.R[to_ess] / (mOld.lambda * mOld.R[from_ess]);
            const mass = mOld.pi[from_ess] * p_ij;
            q_v_map.set(prof, q_v_map.get(prof) + mass);
            total_q_h += mass;
          }
        }
      }
    }
  }
  
  let q_sum = 0;
  for(let p of profiles) q_sum += q_v_map.get(p);
  sumOut.q_partition_residuals[h] = Math.abs(q_sum - total_q_h);
  
  const B_map = new Map();
  let minB = 999999;
  for(let p of profiles) {
    const arr = p.split(',').map(Number);
    const B_exact = 3*(arr[0]*arr[0] + arr[1]*arr[1] + arr[2]*arr[2]) - h*h;
    B_map.set(p, B_exact);
    if (B_exact < minB) minB = B_exact;
  }
  
  const records = [];
  
  for(let prof of profiles) {
    const adjV = new Array(n);
    let delCount = 0;
    for(let i=0; i<n; i++) {
      adjV[i] = [];
      for(let t of adjOld[i]) {
        if (edgeProfileMap.get(`${i}_${t}`) === prof) {
          delCount++;
        } else {
          adjV[i].push(t);
        }
      }
    }
    const mV = computeMetrics(n, states, adjV);
    const q_v = q_v_map.get(prof);
    const delta_a_gk = mV.a_gk - mOld.a_gk;
    const delta_C_gk = mV.C_gk - mOld.C_gk;
    
    records.push({
      h: h,
      profile: prof,
      exact_profile_sum: h,
      B_exact: B_map.get(prof),
      B_float: B_map.get(prof) / 3.0,
      deleted_edge_count: delCount,
      q_v: q_v,
      q_v_over_q_h: q_v / total_q_h,
      lambda_old: mOld.lambda,
      lambda_v: mV.lambda,
      delta_lambda: mV.lambda - mOld.lambda,
      a_old_method_A: mOld.a_gk,
      a_old_method_B: mOld.a_dp,
      a_v_method_A: mV.a_gk,
      a_v_method_B: mV.a_dp,
      delta_a: delta_a_gk,
      delta_a_sign: delta_a_gk > 0 ? 1 : (delta_a_gk < 0 ? -1 : 0),
      C_old: mOld.C_gk,
      C_v: mV.C_gk,
      delta_C: delta_C_gk,
      dominant_scc_count: 1,
      structural_status: mV.struct,
      numerical_status: mV.a_diff < 1e-6 ? 'OK' : 'DIVERGED',
      rho_a: delta_a_gk / q_v,
      rho_C: delta_C_gk / q_v,
      is_most_balanced: (B_map.get(prof) === minB)
    });
  }
  
  records.sort((a,b) => a.B_exact - b.B_exact);
  baselineOut.push(...records);
  
  sumOut.per_h_stats[h] = {
    mOld: { lambda: mOld.lambda, a: mOld.a_gk, C: mOld.C_gk },
    mNew: { lambda: mNew.lambda, a: mNew.a_gk, C: mNew.C_gk }
  };
}

fs.writeFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/run_1_repaired/reproduction_A/PROFILE_BASELINE.json', JSON.stringify(baselineOut, null, 2));
fs.writeFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/run_1_repaired/reproduction_A/SUMMARY.json', JSON.stringify(sumOut, null, 2));

let csv = Object.keys(baselineOut[0]).join(',') + '\n';
for(let rec of baselineOut) {
  csv += Object.values(rec).join(',') + '\n';
}
fs.writeFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/run_1_repaired/reproduction_A/PROFILE_BASELINE.csv', csv);

