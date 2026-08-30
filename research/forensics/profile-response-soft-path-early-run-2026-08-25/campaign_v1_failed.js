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
      let t = b; b = a % b; a = t;
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

function solveSCCs(states, adj, weights) {
  const valid_states = states.length;
  const alive = new Int32Array(valid_states).fill(1);
  const struct_adj = new Array(valid_states);
  for (let i = 0; i < valid_states; i++) {
    struct_adj[i] = [];
    for (let k = 0; k < adj[i].length; k++) {
      struct_adj[i].push(adj[i][k]); // Soft graph keeps all edges
    }
  }
  const scc = tarjanSCC([...Array(valid_states).keys()], struct_adj, alive);
  const comp_lambdas = new Float64Array(scc.ncomp).fill(0);
  const comp_sizes = new Int32Array(scc.ncomp).fill(0);
  for (let i = 0; i < valid_states; i++) if (scc.comp[i] !== -1) comp_sizes[scc.comp[i]]++;
  
  for (let cId = 0; cId < scc.ncomp; cId++) {
    if (comp_sizes[cId] === 1) {
      let hasLoop = false, stateIdx = -1;
      for (let i = 0; i < valid_states; i++) {
        if (scc.comp[i] === cId) { stateIdx = i; break; }
      }
      for (let k = 0; k < adj[stateIdx].length; k++) {
        if (adj[stateIdx][k] === stateIdx) { hasLoop = true; break; }
      }
      if (!hasLoop) continue;
    }
    const N_c = comp_sizes[cId];
    const mapToSub = new Int32Array(valid_states).fill(-1);
    const sub_adj = new Array(N_c);
    const sub_weights = new Array(N_c);
    let subIdx = 0;
    for (let i = 0; i < valid_states; i++) if (scc.comp[i] === cId) mapToSub[i] = subIdx++;
    
    for (let i = 0; i < valid_states; i++) {
      if (scc.comp[i] === cId) {
        const u = mapToSub[i];
        const out_a = [], out_w = [];
        for (let k = 0; k < adj[i].length; k++) {
          const target = adj[i][k];
          if (scc.comp[target] === cId) {
            out_a.push(mapToSub[target]); out_w.push(weights[i][k]);
          }
        }
        sub_adj[u] = out_a; sub_weights[u] = out_w;
      }
    }
    
    let R = new Float64Array(N_c).fill(1);
    let lambda = 0;
    for (let iter = 0; iter < 500; iter++) {
      let nextR = new Float64Array(N_c);
      let sumNextR = 0, sumR = 0;
      for(let i=0; i<N_c; i++) {
        for(let k=0; k<sub_adj[i].length; k++) nextR[i] += sub_weights[i][k] * R[sub_adj[i][k]];
        sumNextR += nextR[i]; sumR += R[i];
      }
      lambda = sumNextR / sumR;
      let maxR = 0;
      for(let i=0; i<N_c; i++) if (nextR[i] > maxR) maxR = nextR[i];
      if (maxR === 0) break;
      for(let i=0; i<N_c; i++) R[i] = nextR[i] / maxR;
    }
    comp_lambdas[cId] = lambda;
  }
  
  let max_lambda = -1, dominantSccId = -1;
  for (let cId = 0; cId < scc.ncomp; cId++) {
    if (comp_lambdas[cId] > max_lambda) {
      max_lambda = comp_lambdas[cId];
      dominantSccId = cId;
    }
  }
  return { dominantSccId, max_lambda, maxSccSize: comp_sizes[dominantSccId], scc, valid_states };
}

function computeVarianceInScc(states, adj, weights, sccResult) {
  const { dominantSccId, max_lambda, maxSccSize, scc, valid_states } = sccResult;
  const N = maxSccSize;
  const mapToEss = new Int32Array(valid_states).fill(-1);
  const ess_states = [];
  for (let i = 0; i < valid_states; i++) {
    if (scc.comp[i] === dominantSccId) {
      mapToEss[i] = ess_states.length;
      ess_states.push(states[i]);
    }
  }
  
  const ess_adj = new Array(N), ess_weights = new Array(N);
  for (let i = 0; i < valid_states; i++) {
    if (scc.comp[i] === dominantSccId) {
      const u = mapToEss[i];
      const out_a = [], out_w = [];
      for (let k = 0; k < adj[i].length; k++) {
        const target = adj[i][k];
        if (scc.comp[target] === dominantSccId) {
          out_a.push(mapToEss[target]); out_w.push(weights[i][k]);
        }
      }
      ess_adj[u] = out_a; ess_weights[u] = out_w;
    }
  }
  
  let R = new Float64Array(N).fill(1), L_vec = new Float64Array(N).fill(1), lambda = 0;
  for(let iter = 0; iter < 4000; iter++) {
    let nextR = new Float64Array(N), nextL = new Float64Array(N);
    for(let i=0; i<N; i++) {
      for(let k=0; k<ess_adj[i].length; k++) {
        let j = ess_adj[i][k], w = ess_weights[i][k];
        nextR[i] += w * R[j]; nextL[j] += w * L_vec[i];
      }
    }
    let sumR = 0, sumNextR = 0;
    for(let i=0; i<N; i++) { sumR += R[i]; sumNextR += nextR[i]; }
    lambda = sumNextR / sumR;
    let maxR = 0, maxL = 0;
    for(let i=0; i<N; i++) { if(nextR[i] > maxR) maxR = nextR[i]; if(nextL[i] > maxL) maxL = nextL[i]; }
    for(let i=0; i<N; i++) { R[i] = nextR[i] / maxR; L_vec[i] = nextL[i] / maxL; }
  }
  
  let dot = 0;
  for(let i=0; i<N; i++) dot += L_vec[i] * R[i];
  for(let i=0; i<N; i++) L_vec[i] /= dot;
  
  let pi = new Float64Array(N), raw_mean = 0;
  for(let i=0; i<N; i++) {
    pi[i] = L_vec[i] * R[i];
    raw_mean += pi[i] * ((ess_states[i] % 3 === 0) ? 1 : 0);
  }
  
  let f_tilde = new Float64Array(N);
  for(let i=0; i<N; i++) {
    f_tilde[i] = ((ess_states[i] % 3 === 0) ? 1 : 0) - raw_mean;
  }
  
  let g = new Float64Array(N).fill(0);
  for(let iter=0; iter<3000; iter++) {
    let nextG = new Float64Array(N);
    for(let i=0; i<N; i++) {
      let pg = 0;
      for(let k=0; k<ess_adj[i].length; k++) {
        let j = ess_adj[i][k], w = ess_weights[i][k];
        pg += (w * R[j] / (lambda * R[i])) * g[j];
      }
      nextG[i] = f_tilde[i] + pg;
    }
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
  return { lambda, a_GK: 2 * f_g - f_f };
}

function runCampaign() {
  console.log("Loading baseline profiles...");
  const baselineData = JSON.parse(fs.readFileSync('../../research/verification/profile-response-h2-h7-2026-08-25/PROFILE_BASELINE.json', 'utf8'));
  const eps_grid = [0, 0.1, 0.5, 1.0, 2.0, 5.0, 10.0, 50.0, 100.0];
  
  const campaign_results = [];

  for (let item of baselineData) {
    console.log(\`Evaluating h=\${item.h} profile=(\${item.profile})...\`);
    const h = item.h;
    const profile_arr = item.profile.split(',').map(Number);
    const orbit = getOrbit(profile_arr);
    
    let a_0 = 0;
    const sweep = [];
    let strict_monotonic = true;
    let prev_delta = 0;

    for (let eps of eps_grid) {
      console.log(\`  -> eps=\${eps}\`);
      const soft = buildSoftContainer(h, Array.from(orbit), eps);
      const scc = solveSCCs(soft.states, soft.adj, soft.weights);
      const res = computeVarianceInScc(soft.states, soft.adj, soft.weights, scc);
      
      if (eps === 0) a_0 = res.a_GK;
      const current_delta = res.a_GK - a_0;
      
      sweep.push({
        eps,
        lambda: res.lambda,
        a_GK: res.a_GK,
        delta: current_delta
      });
      
      // Strict sign tracking: 
      // Ensure the sign of current_delta (if significant) doesn't contradict the hard delta
      if (Math.abs(current_delta) > 1e-8 && Math.abs(item.delta_A) > 1e-8) {
        if (Math.sign(current_delta) !== Math.sign(item.delta_A)) {
          strict_monotonic = false;
        }
      }
      
      // Also check local monotonicity roughly
      if (eps > 0 && Math.abs(item.delta_A) > 1e-8) {
        if (Math.sign(item.delta_A) > 0 && current_delta < prev_delta - 1e-8) strict_monotonic = false;
        if (Math.sign(item.delta_A) < 0 && current_delta > prev_delta + 1e-8) strict_monotonic = false;
      }
      prev_delta = current_delta;
    }
    
    campaign_results.push({
      h: item.h,
      profile: item.profile,
      hard_delta: item.delta_A,
      sweep,
      strict_monotonic
    });
  }
  
  fs.writeFileSync('soft_path_campaign_results.json', JSON.stringify(campaign_results, null, 2));
  console.log("Campaign finished. Results written.");
}

runCampaign();
