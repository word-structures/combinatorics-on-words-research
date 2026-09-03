const fs = require('fs');

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

function tarjanSCC(nodes, adj, alive) {
  let index = 0;
  const idx = new Int32Array(nodes.length).fill(-1);
  const low = new Int32Array(nodes.length).fill(-1);
  const onStack = new Uint8Array(nodes.length).fill(0);
  const stack = [];
  const comp = new Int32Array(nodes.length).fill(-1);
  let ncomp = 0;

  function strongconnect(v) {
    idx[v] = index;
    low[v] = index;
    index++;
    stack.push(v);
    onStack[v] = 1;

    for (let i = 0; i < adj[v].length; i++) {
      const w = adj[v][i];
      if (!alive[w]) continue;
      if (idx[w] === -1) {
        strongconnect(w);
        low[v] = Math.min(low[v], low[w]);
      } else if (onStack[w]) {
        low[v] = Math.min(low[v], idx[w]);
      }
    }

    if (low[v] === idx[v]) {
      let w;
      do {
        w = stack.pop();
        onStack[w] = 0;
        comp[w] = ncomp;
      } while (w !== v);
      ncomp++;
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    if (alive[nodes[i]] && idx[nodes[i]] === -1) {
      strongconnect(nodes[i]);
    }
  }
  return { comp, ncomp };
}

function computeMetrics(n, states, adj) {
  // Essentialize
  const alive = new Int32Array(n).fill(1);
  const scc = tarjanSCC([...Array(n).keys()], adj, alive);
  const sizes = new Int32Array(scc.ncomp);
  for(let i=0; i<n; i++) if(scc.comp[i] !== -1) sizes[scc.comp[i]]++;
  const domId = Array.from(sizes).indexOf(Math.max(...sizes));
  
  const essIdx = new Int32Array(n).fill(-1);
  const essStates = [];
  let N = 0;
  for(let i=0; i<n; i++) {
    if (scc.comp[i] === domId) {
      essIdx[i] = N++;
      essStates.push(states[i]);
    }
  }
  
  const essAdj = new Array(N);
  for(let i=0; i<n; i++) {
    if (scc.comp[i] === domId) {
      const out = [];
      for(let t of adj[i]) {
        if (scc.comp[t] === domId) out.push(essIdx[t]);
      }
      essAdj[essIdx[i]] = out;
    }
  }

  // DP exact moment
  let C_arr = new Float64Array(N).fill(1);
  let S_arr = new Float64Array(N);
  let V_arr = new Float64Array(N);

  let varAt = {};
  for(let iter=1; iter<=2000; iter++) {
    let nC = new Float64Array(N), nS = new Float64Array(N), nV = new Float64Array(N);
    for(let i=0; i<N; i++) {
      const ci = C_arr[i], si = S_arr[i], vi = V_arr[i];
      if(ci === 0) continue;
      for(let j of essAdj[i]) {
        const x = (essStates[j] % 3 === 0) ? 1 : 0;
        nC[j] += ci; nS[j] += si + x*ci; nV[j] += vi + 2*x*si + x*ci;
      }
    }
    let sumC = 0;
    for(let i=0; i<N; i++) sumC += nC[i];
    const inv = 1.0 / sumC;
    for(let i=0; i<N; i++) { C_arr[i] = nC[i]*inv; S_arr[i] = nS[i]*inv; V_arr[i] = nV[i]*inv; }
    
    if (iter === 1000 || iter === 2000) {
      let totS = 0, totV = 0;
      for(let i=0; i<N; i++) { totS += S_arr[i]; totV += V_arr[i]; }
      varAt[iter] = totV - totS*totS;
    }
  }
  const a = (varAt[2000] - varAt[1000]) / 1000.0;
  
  // Perron root
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
  for(let i=0; i<N; i++) L_vec[i] /= dot; // sum(L * R) = 1
  let pi = new Float64Array(n);
  for(let i=0; i<N; i++) pi[essIdx.indexOf(i)] = L_vec[i] * R[i]; // map back to original indices
  
  // P[i][j] = R_j / (lambda R_i) -- probability
  
  

  const C = 1 / (2 * Math.sqrt(3) * Math.PI * a);
  
  return {
    lambda, a, C, essIdx, N, pi, R, domId, scc,
    struct: (sizes[domId] > 0 && Array.from(sizes).filter(x => x > 0).length === 1) ? 'ONE_SCC' : 'MULTI_SCC'
  };
}

const baselineOut = [];
const summaryOut = {
  h_values: [],
  total_profile_classes: 0,
  most_balanced_positive_count: 0,
  most_balanced_total: 0,
  other_negative_count: 0,
  other_total: 0,
  per_h_q_sum_residuals: {},
  per_h_profile_counts: {},
  per_h_rho_a_monotonicity: {},
  per_h_rho_C_monotonicity: {},
  h8_run: false
};

for (let h = 2; h <= 7; h++) {
  console.log('Processing h=', h);
  summaryOut.h_values.push(h);
  
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
  const edgeProfileMap = new Map(); // from_to -> profile string
  const profileSet = new Set();
  
  for (let i = 0; i < n; i++) {
    const code = states[i];
    const suffix = code % Math.pow(3, m - 1);
    const outOld = [];
    const outNew = [];
    for (let s = 0; s < 3; s++) {
      const targetCode = suffix * 3 + s;
      const targetIdx = stateIdx[targetCode];
      if (targetIdx !== -1) {
        outOld.push(targetIdx);
        
        const w_edge = codeToWord(code, m);
        w_edge.push(s);
        
        if (hasAbelianSquare(w_edge, h, h)) {
          let counts = [0, 0, 0];
          for(let j=0; j<h; j++) counts[w_edge[m + 1 - h + j - 1]]++; 
          counts.sort((a,b) => b-a);
          const profStr = counts.join(',');
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
  summaryOut.total_profile_classes += profiles.length;
  summaryOut.per_h_profile_counts[h] = profiles.length;
  
  // Base metrics
  const mOld = computeMetrics(n, states, adjOld);
  const mNew = computeMetrics(n, states, adjNew);
  
  let total_q_h = 0;
  // Compute q_v for all v
  const q_v_map = new Map();
  for(let p of profiles) q_v_map.set(p, 0);
  
  for(let i=0; i<n; i++) {
    if (mOld.essIdx[i] !== -1) {
      for(let t of adjOld[i]) {
        if (mOld.essIdx[t] !== -1) {
          const prof = edgeProfileMap.get(`${i}_${t}`);
          if (prof) {
            // it is a deleted edge inside essential SCC
            const from_ess = mOld.essIdx[i];
            const to_ess = mOld.essIdx[t];
            const p_ij = mOld.R[to_ess] / (mOld.lambda * mOld.R[from_ess]);
            const mass = mOld.pi[i] * p_ij;
            q_v_map.set(prof, q_v_map.get(prof) + mass);
            total_q_h += mass;
          }
        }
      }
    }
  }
  
  let q_sum = 0;
  for(let p of profiles) q_sum += q_v_map.get(p);
  summaryOut.per_h_q_sum_residuals[h] = Math.abs(q_sum - total_q_h);
  
  const entropy_drop_h = Math.log(mOld.lambda / mNew.lambda);
  
  let minB = 999999;
  const B_map = new Map();
  for(let p of profiles) {
    const arr = p.split(',').map(Number);
    const B = (arr[0] - h/3)**2 + (arr[1] - h/3)**2 + (arr[2] - h/3)**2;
    B_map.set(p, B);
    if (B < minB) minB = B;
  }
  
  const records = [];
  
  for(let prof of profiles) {
    const adjV = new Array(n);
    let delCount = 0;
    for(let i=0; i<n; i++) {
      adjV[i] = [];
      for(let t of adjOld[i]) {
        const eProf = edgeProfileMap.get(`${i}_${t}`);
        if (eProf === prof) {
          delCount++;
        } else {
          adjV[i].push(t);
        }
      }
    }
    
    const mV = computeMetrics(n, states, adjV);
    const q_v = q_v_map.get(prof);
    const delta_a = mV.a - mOld.a;
    const delta_C = mV.C - mOld.C;
    
    records.push({
      h: h,
      profile: prof,
      B: B_map.get(prof),
      deleted_edge_count: delCount,
      q_v: q_v,
      q_v_ratio: q_v / total_q_h,
      lambda_old: mOld.lambda,
      lambda_v: mV.lambda,
      a_old: mOld.a,
      a_v: mV.a,
      delta_a: delta_a,
      C_old: mOld.C,
      C_v: mV.C,
      delta_C: delta_C,
      rho_a: delta_a / q_v,
      rho_C: delta_C / q_v,
      structural_status: mV.struct
    });
  }
  
  // Add h2 nonadditivity
  if (h === 2 && profiles.length === 2) {
    // Both deleted is mNew
    const a_both = mNew.a;
    const p1 = records[0].a_v;
    const p2 = records[1].a_v;
    const interaction_a = (a_both - mOld.a) - ((p1 - mOld.a) + (p2 - mOld.a));
    summaryOut.h2_interaction_a = interaction_a;
    summaryOut.h2_nonadditivity_status = Math.abs(interaction_a) > 1e-4 ? 'STRONG_NONADDITIVE' : 'WEAK_ADDITIVE';
  }
  
  records.sort((a,b) => a.B - b.B);
  
  // Check most balanced rule
  for(let rec of records) {
    const isMostBalanced = Math.abs(rec.B - minB) < 1e-9;
    if (isMostBalanced) {
      summaryOut.most_balanced_total++;
      if (rec.delta_a > 0) summaryOut.most_balanced_positive_count++;
    } else {
      summaryOut.other_total++;
      if (rec.delta_a < 0) summaryOut.other_negative_count++;
    }
  }
  
  // Check monotonicity
  let rho_a_dec = true, rho_a_noninc = true;
  let rho_C_dec = true, rho_C_noninc = true;
  if (records.length > 1) {
    for(let i=0; i<records.length-1; i++) {
      if (records[i].rho_a <= records[i+1].rho_a) rho_a_dec = false;
      if (records[i].rho_a < records[i+1].rho_a) rho_a_noninc = false;
      
      // Actually rho_a and rho_C have opposite signs. delta_a > 0 means delta_C < 0
      // So if rho_a is decreasing, rho_C might be increasing.
      // Let's check non-increasing for both, or just decreasing/increasing.
      if (records[i].rho_C <= records[i+1].rho_C) rho_C_dec = false;
      if (records[i].rho_C < records[i+1].rho_C) rho_C_noninc = false;
    }
  } else {
    rho_a_dec = false; rho_a_noninc = false;
    rho_C_dec = false; rho_C_noninc = false;
  }
  
  summaryOut.per_h_rho_a_monotonicity[h] = rho_a_dec ? 'STRICTLY_DECREASING' : (rho_a_noninc ? 'NON_INCREASING' : 'NEITHER');
  
  // Wait, if rho_a is decreasing, rho_C should be INCREASING!
  let rho_C_inc = true, rho_C_nondec = true;
  if (records.length > 1) {
    for(let i=0; i<records.length-1; i++) {
      if (records[i].rho_C >= records[i+1].rho_C) rho_C_inc = false;
      if (records[i].rho_C > records[i+1].rho_C) rho_C_nondec = false;
    }
  } else {
    rho_C_inc = false; rho_C_nondec = false;
  }
  summaryOut.per_h_rho_C_monotonicity[h] = rho_C_inc ? 'STRICTLY_INCREASING' : (rho_C_nondec ? 'NON_DECREASING' : 'NEITHER');
  
  baselineOut.push(...records);
}



fs.writeFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/PROFILE_BASELINE.json', JSON.stringify(baselineOut, null, 2));
fs.writeFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/SUMMARY.json', JSON.stringify(summaryOut, null, 2));

// write CSV
let csv = Object.keys(baselineOut[0]).join(',') + '\n';
for(let rec of baselineOut) {
  csv += Object.values(rec).join(',') + '\n';
}
fs.writeFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/PROFILE_BASELINE.csv', csv);