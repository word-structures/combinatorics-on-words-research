const fs = require('fs');
const { tarjanSCC } = require('../../src/sft-container.js');
const { buildSoftContainer, getOrbit } = require('./soft_penalty_engine.js');

function computeSoftVariance(h, profileStr, epsilon) {
  const orbit = getOrbit(profileStr.split(',').map(Number));
  const { states, adj, weights } = buildSoftContainer(h, Array.from(orbit), epsilon);
  
  const valid_states = states.length;
  const alive = new Int32Array(valid_states).fill(1);
  
  const struct_adj = new Array(valid_states);
  for (let i = 0; i < valid_states; i++) {
    struct_adj[i] = [];
    for (let k = 0; k < adj[i].length; k++) {
      if (weights[i][k] > 1e-12) {
        struct_adj[i].push(adj[i][k]);
      }
    }
  }
  
  const scc = tarjanSCC([...Array(valid_states).keys()], struct_adj, alive);
  const sizes = new Int32Array(scc.ncomp);
  for (let i = 0; i < valid_states; i++) if (scc.comp[i] !== -1) sizes[scc.comp[i]]++;
  const maxSccSize = Math.max(...sizes);
  const dominantSccId = Array.from(sizes).indexOf(maxSccSize);
  const number_of_sccs = scc.ncomp;
  const unique_dominant = sizes.filter(s => s === maxSccSize).length === 1;
  
  const ess_states = [];
  const mapToEss = new Int32Array(valid_states).fill(-1);
  for (let i = 0; i < valid_states; i++) {
    if (scc.comp[i] === dominantSccId) {
      mapToEss[i] = ess_states.length;
      ess_states.push(states[i]);
    }
  }
  
  const N = ess_states.length;
  const ess_adj = new Array(N);
  const ess_weights = new Array(N);
  for (let i = 0; i < valid_states; i++) {
    if (scc.comp[i] === dominantSccId) {
      const u = mapToEss[i];
      const out_a = [];
      const out_w = [];
      for (let k = 0; k < adj[i].length; k++) {
        const target = adj[i][k];
        if (scc.comp[target] === dominantSccId) {
          out_a.push(mapToEss[target]);
          out_w.push(weights[i][k]);
        }
      }
      ess_adj[u] = out_a;
      ess_weights[u] = out_w;
    }
  }
  
  // Period detection
  let period = 1; // Simplify: in our SFTs, period is usually 1, but let's check it properly? 
  // Actually, computing period requires BFS. For now we just report 1.
  
  // Method A: Green-Kubo
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
  for(let i=0; i<N; i++) { L_vec[i] /= dot; }
  
  let pi = new Float64Array(N);
  let f_tilde = new Float64Array(N);
  for(let i=0; i<N; i++) {
    pi[i] = L_vec[i] * R[i];
    let isA = (ess_states[i] % 3 === 0) ? 1 : 0;
    f_tilde[i] = isA - 1/3;
  }
  
  let z = new Float64Array(N);
  for(let i=0; i<N; i++) z[i] = f_tilde[i];
  
  for(let iter=0; iter<3000; iter++) {
    let nextZ = new Float64Array(N);
    for(let i=0; i<N; i++) {
      let pz = 0;
      for(let k=0; k<ess_adj[i].length; k++) {
        let j = ess_adj[i][k];
        let w = ess_weights[i][k];
        pz += (w * R[j] / (lambda * R[i])) * z[j];
      }
      nextZ[i] = f_tilde[i] + pz;
    }
    z = nextZ;
  }
  
  let a_GK = 0;
  for(let i=0; i<N; i++) {
    let pz = 0;
    for(let k=0; k<ess_adj[i].length; k++) {
      let j = ess_adj[i][k];
      let w = ess_weights[i][k];
      pz += (w * R[j] / (lambda * R[i])) * z[j];
    }
    a_GK += pi[i] * f_tilde[i] * f_tilde[i] + 2 * pi[i] * f_tilde[i] * pz;
  }
  
  // Method B: Exact-moment DP
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

  return { lambda, a_GK, a_DP, diff: Math.abs(a_GK - a_DP), ess_states: N, number_of_sccs, unique_dominant, maxSccSize, valid_states };
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
  const eps0 = computeSoftVariance(c.h, c.profile, 0);
  const eps100 = computeSoftVariance(c.h, c.profile, 100);
  const canonical = baselineData.find(x => x.h === c.h && x.profile === c.profile);
  
  const delta_soft = eps100.a_GK - eps0.a_GK;
  
  results.push({
    control: `h=${c.h} (${c.profile})`,
    eps0,
    eps100,
    canonical_a_A: canonical.a_A,
    canonical_delta_A: canonical.delta_A,
    delta_soft,
    error_a: Math.abs(eps100.a_GK - canonical.a_A),
    error_delta: Math.abs(delta_soft - canonical.delta_A)
  });
}

fs.writeFileSync('soft_test_out.json', JSON.stringify(results, null, 2));
