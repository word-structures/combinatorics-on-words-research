const { buildContainer, tarjanSCC } = require('../../src/sft-container.js');
const fs = require('fs');

const container = buildContainer(7);
const states = container.states;
const adj = container.adj;
const valid_states = states.length;

const alive = new Int32Array(valid_states).fill(1);
const scc = tarjanSCC([...Array(valid_states).keys()], adj, alive);
const sizes = new Int32Array(scc.ncomp);
for (let i = 0; i < valid_states; i++) if (scc.comp[i] !== -1) sizes[scc.comp[i]]++;
const maxSccSize = Math.max(...sizes);
const dominantSccId = Array.from(sizes).indexOf(maxSccSize);

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
for (let i = 0; i < valid_states; i++) {
  if (scc.comp[i] === dominantSccId) {
    const u = mapToEss[i];
    const out = [];
    for (let target of adj[i]) {
      if (scc.comp[target] === dominantSccId) {
        out.push(mapToEss[target]);
      }
    }
    ess_adj[u] = out;
  }
}

// Method A: Green-Kubo
let R = new Float64Array(N).fill(1);
let L_vec = new Float64Array(N).fill(1);
let lambda = 0;
for(let iter = 0; iter < 4000; iter++) {
  let nextR = new Float64Array(N);
  let nextL = new Float64Array(N);
  for(let i=0; i<N; i++) {
    for(let j of ess_adj[i]) {
      nextR[i] += R[j];
      nextL[j] += L_vec[i];
    }
  }
  let sumR = 0, sumL = 0, sumNextR = 0;
  for(let i=0; i<N; i++) {
    sumR += R[i]; sumL += L_vec[i];
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
    for(let j of ess_adj[i]) {
      pz += (R[j] / (lambda * R[i])) * z[j];
    }
    nextZ[i] = f_tilde[i] + pz;
  }
  z = nextZ;
}

let a_GK = 0;
for(let i=0; i<N; i++) {
  let pz = 0;
  for(let j of ess_adj[i]) {
    pz += (R[j] / (lambda * R[i])) * z[j];
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
    for(let j of ess_adj[i]) {
      const x = (ess_states[j] % 3 === 0) ? 1 : 0;
      next_c[j] += ci;
      next_s[j] += si + x * ci;
      next_v[j] += vi + 2 * x * si + x * ci;
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

const diff = Math.abs(a_GK - a_DP);
const C_free = 3 * Math.sqrt(3) / (4 * Math.PI);
const C_7_GK = 1 / (2 * Math.sqrt(3) * Math.PI * a_GK);
const ratio = (2/9) / a_GK;

const out = {
  lambda,
  a_GK,
  a_DP,
  diff,
  C_7: C_7_GK,
  C_free,
  ratio
};

fs.writeFileSync('scratch/h7-family-2026-08-24/SPECTRAL_RESULTS.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
