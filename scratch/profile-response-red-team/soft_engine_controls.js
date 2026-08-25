const fs = require('fs');
const { tarjanSCC } = require('../../src/sft-container.js');
const { buildSoftContainer, getOrbit } = require('./soft_penalty_engine.js');

function computePeriod(adj) {
  const n = adj.length;
  if (n === 0) return 1;
  const depth = new Int32Array(n).fill(-1);
  depth[0] = 0;
  const q = [0];
  let head = 0;
  
  function gcd(a, b) {
    while (b !== 0) {
      let t = b;
      b = a % b;
      a = t;
    }
    return a;
  }
  
  let period = 0;
  while (head < q.length) {
    const u = q[head++];
    for (const v of adj[u]) {
      if (depth[v] === -1) {
        depth[v] = depth[u] + 1;
        q.push(v);
      } else {
        const diff = Math.abs(depth[u] + 1 - depth[v]);
        if (diff > 0) period = period === 0 ? diff : gcd(period, diff);
      }
    }
  }
  return period === 0 ? 1 : period;
}

function solveSCCs(states, adj, weights, hard_deletion) {
  const valid_states = states.length;
  const alive = new Int32Array(valid_states).fill(1);
  
  const struct_adj = new Array(valid_states);
  for (let i = 0; i < valid_states; i++) {
    struct_adj[i] = [];
    for (let k = 0; k < adj[i].length; k++) {
      if (hard_deletion && weights[i][k] < 1.0) continue; // Hard deletion drops penalized edges
      // Finite soft graph retains ALL positive edges. Since all weights are exp(-eps) > 0, we retain all.
      struct_adj[i].push(adj[i][k]);
    }
  }
  
  const scc = tarjanSCC([...Array(valid_states).keys()], struct_adj, alive);
  const number_of_sccs = scc.ncomp;
  
  // Compute spectral radius (lambda) for each cyclic SCC
  const comp_lambdas = new Float64Array(scc.ncomp).fill(0);
  const comp_sizes = new Int32Array(scc.ncomp).fill(0);
  for (let i = 0; i < valid_states; i++) if (scc.comp[i] !== -1) comp_sizes[scc.comp[i]]++;
  
  for (let cId = 0; cId < scc.ncomp; cId++) {
    if (comp_sizes[cId] === 1) {
      // Check if self-loop
      let hasLoop = false;
      let stateIdx = -1;
      for (let i = 0; i < valid_states; i++) {
        if (scc.comp[i] === cId) { stateIdx = i; break; }
      }
      for (let k = 0; k < adj[stateIdx].length; k++) {
        if ((!hard_deletion || weights[stateIdx][k] === 1.0) && adj[stateIdx][k] === stateIdx) {
          hasLoop = true; break;
        }
      }
      if (!hasLoop) continue; // Acyclic
    }
    
    // Power iteration for lambda
    const N_c = comp_sizes[cId];
    const mapToSub = new Int32Array(valid_states).fill(-1);
    const sub_adj = new Array(N_c);
    const sub_weights = new Array(N_c);
    
    let subIdx = 0;
    for (let i = 0; i < valid_states; i++) {
      if (scc.comp[i] === cId) mapToSub[i] = subIdx++;
    }
    
    for (let i = 0; i < valid_states; i++) {
      if (scc.comp[i] === cId) {
        const u = mapToSub[i];
        const out_a = [];
        const out_w = [];
        for (let k = 0; k < adj[i].length; k++) {
          const target = adj[i][k];
          if ((!hard_deletion || weights[i][k] === 1.0) && scc.comp[target] === cId) {
            out_a.push(mapToSub[target]);
            out_w.push(weights[i][k]);
          }
        }
        sub_adj[u] = out_a;
        sub_weights[u] = out_w;
      }
    }
    
    let R = new Float64Array(N_c).fill(1);
    let lambda = 0;
    for (let iter = 0; iter < 500; iter++) {
      let nextR = new Float64Array(N_c);
      let sumNextR = 0, sumR = 0;
      for(let i=0; i<N_c; i++) {
        for(let k=0; k<sub_adj[i].length; k++) {
          nextR[i] += sub_weights[i][k] * R[sub_adj[i][k]];
        }
        sumNextR += nextR[i];
        sumR += R[i];
      }
      lambda = sumNextR / sumR;
      let maxR = 0;
      for(let i=0; i<N_c; i++) if (nextR[i] > maxR) maxR = nextR[i];
      if (maxR === 0) break;
      for(let i=0; i<N_c; i++) R[i] = nextR[i] / maxR;
    }
    comp_lambdas[cId] = lambda;
  }
  
  let max_lambda = -1;
  let second_max_lambda = -1;
  let dominantSccId = -1;
  for (let cId = 0; cId < scc.ncomp; cId++) {
    if (comp_lambdas[cId] > max_lambda) {
      second_max_lambda = max_lambda;
      max_lambda = comp_lambdas[cId];
      dominantSccId = cId;
    } else if (comp_lambdas[cId] > second_max_lambda && Math.abs(comp_lambdas[cId] - max_lambda) > 1e-12) {
      second_max_lambda = comp_lambdas[cId];
    }
  }
  
  let unique_dominant = true;
  for (let cId = 0; cId < scc.ncomp; cId++) {
    if (cId !== dominantSccId && Math.abs(comp_lambdas[cId] - max_lambda) < 1e-12) {
      unique_dominant = false;
    }
  }
  
  const cyclic_scc_count = comp_lambdas.filter(l => l > 0).length;
  const dominance_margin = max_lambda - Math.max(0, second_max_lambda);
  const maxSccSize = comp_sizes[dominantSccId];
  
  return { dominantSccId, max_lambda, second_max_lambda, unique_dominant, cyclic_scc_count, dominance_margin, maxSccSize, scc, number_of_sccs, struct_adj, valid_states };
}

function computeVarianceInScc(states, adj, weights, hard_deletion, sccResult) {
  const { dominantSccId, max_lambda, maxSccSize, scc, valid_states, struct_adj } = sccResult;
  const N = maxSccSize;
  const mapToEss = new Int32Array(valid_states).fill(-1);
  const ess_states = [];
  
  for (let i = 0; i < valid_states; i++) {
    if (scc.comp[i] === dominantSccId) {
      mapToEss[i] = ess_states.length;
      ess_states.push(states[i]);
    }
  }
  
  const ess_adj = new Array(N);
  const ess_weights = new Array(N);
  for (let i = 0; i < valid_states; i++) {
    if (scc.comp[i] === dominantSccId) {
      const u = mapToEss[i];
      const out_a = [];
      const out_w = [];
      for (let k = 0; k < adj[i].length; k++) {
        const target = adj[i][k];
        if ((!hard_deletion || weights[i][k] === 1.0) && scc.comp[target] === dominantSccId) {
          out_a.push(mapToEss[target]);
          out_w.push(weights[i][k]);
        }
      }
      ess_adj[u] = out_a;
      ess_weights[u] = out_w;
    }
  }
  
  const period = computePeriod(ess_adj);
  
  // Power iteration for R, L and exact lambda
  let R = new Float64Array(N).fill(1);
  let L_vec = new Float64Array(N).fill(1);
  let lambda = 0;
  for(let iter = 0; iter < 4000; iter++) {
    let nextR = new Float64Array(N);
    let nextL = new Float64Array(N);
    for(let i=0; i<N; i++) {
      for(let k=0; k<ess_adj[i].length; k++) {
        let j = ess_adj[i][k];
        let w = ess_weights[i][k];
        nextR[i] += w * R[j];
        nextL[j] += w * L_vec[i];
      }
    }
    let sumR = 0, sumNextR = 0;
    for(let i=0; i<N; i++) {
      sumR += R[i];
      sumNextR += nextR[i];
    }
    lambda = sumNextR / sumR;
    let maxR = 0, maxL = 0;
    for(let i=0; i<N; i++) {
      if(nextR[i] > maxR) maxR = nextR[i];
      if(nextL[i] > maxL) maxL = nextL[i];
    }
    for(let i=0; i<N; i++) {
      R[i] = nextR[i] / maxR;
      L_vec[i] = nextL[i] / maxL;
    }
  }
  
  let dot = 0;
  for(let i=0; i<N; i++) dot += L_vec[i] * R[i];
  for(let i=0; i<N; i++) L_vec[i] /= dot;
  
  let pi = new Float64Array(N);
  let raw_mean = 0;
  for(let i=0; i<N; i++) {
    pi[i] = L_vec[i] * R[i];
    let isA = (ess_states[i] % 3 === 0) ? 1 : 0;
    raw_mean += pi[i] * isA;
  }
  const mean_residual = Math.abs(raw_mean - 1/3);
  
  let f_tilde = new Float64Array(N);
  for(let i=0; i<N; i++) {
    let isA = (ess_states[i] % 3 === 0) ? 1 : 0;
    f_tilde[i] = isA - raw_mean; // Center by computed mean
  }
  
  // (I - P + Pi) g = f -> g_k+1 = f + P g_k - Pi g_k
  // We can just do g_k+1 = f + P g_k
  let g = new Float64Array(N).fill(0);
  for(let iter=0; iter<3000; iter++) {
    let nextG = new Float64Array(N);
    for(let i=0; i<N; i++) {
      let pg = 0;
      for(let k=0; k<ess_adj[i].length; k++) {
        let j = ess_adj[i][k];
        let w = ess_weights[i][k];
        pg += (w * R[j] / (lambda * R[i])) * g[j];
      }
      nextG[i] = f_tilde[i] + pg;
    }
    
    // Pi g should be 0, but subtract it for numerical stability
    let mean_g = 0;
    for(let i=0; i<N; i++) mean_g += pi[i] * nextG[i];
    for(let i=0; i<N; i++) nextG[i] -= mean_g;
    
    g = nextG;
  }
  
  let f_f = 0, f_g = 0;
  for(let i=0; i<N; i++) {
    f_f += pi[i] * f_tilde[i] * f_tilde[i];
    f_g += pi[i] * f_tilde[i] * g[i];
  }
  const a_GK = 2 * f_g - f_f;
  
  // Method B: Finite-horizon moment recurrence
  let c = new Float64Array(N).fill(1);
  let s = new Float64Array(N);
  let v = new Float64Array(N);
  let a_DP = 0;
  let prev_var = 0;

  for (let iter = 1; iter <= 4000; iter++) {
    let next_c = new Float64Array(N);
    let next_s = new Float64Array(N);
    let next_v = new Float64Array(N);
    for(let i=0; i<N; i++) {
      const ci = c[i], si = s[i], vi = v[i];
      if (ci === 0) continue;
      for(let k=0; k<ess_adj[i].length; k++) {
        let j = ess_adj[i][k];
        let w = ess_weights[i][k];
        const x = (ess_states[j] % 3 === 0) ? 1 : 0;
        next_c[j] += w * ci;
        next_s[j] += w * (si + x * ci);
        next_v[j] += w * (vi + 2 * x * si + x * ci);
      }
    }
    let sum_c = 0;
    for(let i=0; i<N; i++) sum_c += next_c[i];
    const inv = 1.0 / sum_c;
    for(let i=0; i<N; i++) {
      c[i] = next_c[i] * inv;
      s[i] = next_s[i] * inv;
      v[i] = next_v[i] * inv;
    }
    
    let tot_s = 0, tot_v = 0;
    for(let i=0; i<N; i++) { tot_s += s[i]; tot_v += v[i]; }
    const variance = tot_v - tot_s * tot_s;
    a_DP = variance - prev_var;
    prev_var = variance;
  }

  return { lambda, a_GK, a_DP, diff: Math.abs(a_GK - a_DP), raw_mean, mean_residual, period };
}

function computeControl(h, profileStr) {
  const orbit = getOrbit(profileStr.split(',').map(Number));
  // 1. eps = 0
  const soft0 = buildSoftContainer(h, Array.from(orbit), 0);
  const scc0 = solveSCCs(soft0.states, soft0.adj, soft0.weights, false);
  const res0 = computeVarianceInScc(soft0.states, soft0.adj, soft0.weights, false, scc0);
  
  // 2. eps = 100
  const soft100 = buildSoftContainer(h, Array.from(orbit), 100);
  const scc100 = solveSCCs(soft100.states, soft100.adj, soft100.weights, false);
  const res100 = computeVarianceInScc(soft100.states, soft100.adj, soft100.weights, false, scc100);
  
  // 3. hard
  const sccHard = solveSCCs(soft100.states, soft100.adj, soft100.weights, true);
  const resHard = computeVarianceInScc(soft100.states, soft100.adj, soft100.weights, true, sccHard);

  return { 
    scc100: { 
      cyclic_scc_count: scc100.cyclic_scc_count, 
      maxSccSize: scc100.maxSccSize, 
      unique_dominant: scc100.unique_dominant,
      dominance_margin: scc100.dominance_margin
    },
    res0, res100, resHard 
  };
}

const baselineData = JSON.parse(fs.readFileSync('../../research/verification/profile-response-h2-h7-2026-08-25/PROFILE_BASELINE.json', 'utf8'));

const controls = [
  { h: 2, profile: "1,1,0" },
  { h: 3, profile: "1,1,1" },
  { h: 3, profile: "2,1,0" },
  { h: 5, profile: "3,1,1" }
];

let results = [];
for (let c of controls) {
  const C = computeControl(c.h, c.profile);
  const canonical = baselineData.find(x => x.h === c.h && x.profile === c.profile);
  
  const delta_soft = C.res100.a_GK - C.res0.a_GK;
  
  results.push({
    control: "h=" + c.h + " (" + c.profile + ")",
    eps0: C.res0,
    eps100: C.res100,
    hard: C.resHard,
    scc100: C.scc100,
    canonical_a_A: canonical.a_A,
    canonical_delta_A: canonical.delta_A,
    delta_soft,
    error_a: Math.abs(C.res100.a_GK - C.resHard.a_GK),
    error_lambda: Math.abs(C.res100.lambda - C.resHard.lambda)
  });
}

fs.writeFileSync('soft_test_out.json', JSON.stringify(results, null, 2));

