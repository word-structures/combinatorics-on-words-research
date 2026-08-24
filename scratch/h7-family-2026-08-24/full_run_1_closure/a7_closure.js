const fs = require('fs');
const { buildContainer, tarjanSCC } = require('../../../src/sft-container.js');

const container = buildContainer(7);
const states = container.states;
const adj = container.adj;
const alive = new Int32Array(states.length).fill(1);
const scc = tarjanSCC([...Array(states.length).keys()], adj, alive);

const sizes = new Int32Array(scc.ncomp);
for(let i=0; i<states.length; i++) if(scc.comp[i] !== -1) sizes[scc.comp[i]]++;
const dominantSccId = Array.from(sizes).indexOf(Math.max(...sizes));

const essIdx = new Int32Array(states.length).fill(-1);
const essStates = [];
let N = 0;
for(let i=0; i<states.length; i++) {
  if (scc.comp[i] === dominantSccId) {
    essIdx[i] = N++;
    essStates.push(states[i]);
  }
}

const essAdj = new Array(N);
for(let i=0; i<states.length; i++) {
  if (scc.comp[i] === dominantSccId) {
    const out = [];
    for(let t of adj[i]) {
      if (scc.comp[t] === dominantSccId) out.push(essIdx[t]);
    }
    essAdj[essIdx[i]] = out;
  }
}

// Method A: Green-Kubo / Poisson
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
for(let i=0; i<N; i++) L_vec[i] /= dot; // so sum(L * R) = 1

let pi = new Float64Array(N);
for(let i=0; i<N; i++) pi[i] = L_vec[i] * R[i];

// Check stationarity residual: pi * P = pi
let statRes = 0;
for(let j=0; j<N; j++) {
  let p_in = 0;
  // This requires incoming edges or full O(N^2), let's just do it directly:
}
for(let i=0; i<N; i++) {
  for(let j of essAdj[i]) {
    const p_ij = R[j] / (lambda * R[i]);
    // actually, pi[i] * P_ij is the mass from i to j. We sum it on j.
  }
}
let sum_in = new Float64Array(N);
for(let i=0; i<N; i++) {
  for(let j of essAdj[i]) {
    sum_in[j] += pi[i] * (R[j] / (lambda * R[i]));
  }
}
for(let i=0; i<N; i++) {
  let d = Math.abs(sum_in[i] - pi[i]);
  if (d > statRes) statRes = d;
}

// Observables for a, b, c
let f = [new Float64Array(N), new Float64Array(N), new Float64Array(N)];
let means = [0,0,0];
for(let i=0; i<N; i++) {
  const c = essStates[i] % 3;
  f[c][i] = 1;
}
for(let c=0; c<3; c++) {
  for(let i=0; i<N; i++) means[c] += pi[i] * f[c][i];
}
let centering_check = Math.abs(means[0] - 1/3) + Math.abs(means[1] - 1/3) + Math.abs(means[2] - 1/3);

let f_tilde = [new Float64Array(N), new Float64Array(N), new Float64Array(N)];
for(let c=0; c<3; c++) {
  for(let i=0; i<N; i++) f_tilde[c][i] = f[c][i] - means[c];
}

// Poisson solver for a and b
let z = [new Float64Array(N), new Float64Array(N)];
for(let c=0; c<2; c++) {
  for(let i=0; i<N; i++) z[c][i] = f_tilde[c][i];
}

let solverRes = 1;
let poissIter = 0;
for(; poissIter < 5000; poissIter++) {
  let nextZ = [new Float64Array(N), new Float64Array(N)];
  let maxD = 0;
  for(let c=0; c<2; c++) {
    for(let i=0; i<N; i++) {
      let pz = 0;
      for(let j of essAdj[i]) pz += (R[j] / (lambda * R[i])) * z[c][j];
      nextZ[c][i] = f_tilde[c][i] + pz;
      let d = Math.abs(nextZ[c][i] - z[c][i]);
      if (d > maxD) maxD = d;
    }
  }
  z = nextZ;
  solverRes = maxD;
  if (maxD < 1e-13) break;
}

let cov = [[0,0], [0,0]];
for(let c1=0; c1<2; c1++) {
  for(let c2=0; c2<2; c2++) {
    let s = 0;
    for(let i=0; i<N; i++) {
      let pz2 = 0;
      for(let j of essAdj[i]) pz2 += (R[j] / (lambda * R[i])) * z[c2][j];
      let pz1 = 0;
      for(let j of essAdj[i]) pz1 += (R[j] / (lambda * R[i])) * z[c1][j];
      
      s += pi[i] * f_tilde[c1][i] * f_tilde[c2][i] + pi[i] * f_tilde[c1][i] * pz2 + pi[i] * f_tilde[c2][i] * pz1;
    }
    cov[c1][c2] = s;
  }
}
const a7_methodA = cov[0][0];
const s3_residual = Math.abs(cov[0][1] - (-0.5 * a7_methodA)) + Math.abs(cov[1][1] - a7_methodA);

// Method B: long-baseline moment DP
let C_arr = new Float64Array(N).fill(1);
let S_arr = new Float64Array(N);
let V_arr = new Float64Array(N);

const varAt = {};
for(let iter=1; iter<=6000; iter++) {
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
  
  if (iter === 2000 || iter === 4000 || iter === 6000) {
    let totS = 0, totV = 0;
    for(let i=0; i<N; i++) { totS += S_arr[i]; totV += V_arr[i]; }
    varAt[iter] = totV - totS*totS;
  }
}

const a7_baseline1 = (varAt[4000] - varAt[2000]) / 2000.0;
const a7_baseline2 = (varAt[6000] - varAt[4000]) / 2000.0;
const a7_methodB = a7_baseline2;
const maxPairwiseDiff = Math.max(Math.abs(a7_methodA - a7_baseline1), Math.abs(a7_methodA - a7_baseline2), Math.abs(a7_baseline1 - a7_baseline2));

const out = {
  A7_METHOD_A: a7_methodA,
  A7_METHOD_B: a7_methodB,
  MAX_PAIRWISE_DIFF: maxPairwiseDiff,
  ERROR_ESTIMATE: maxPairwiseDiff,
  METHOD_A_DETAILS: {
    centering_check,
    stationarity_residual: statRes,
    convergence_criterion: 1e-13,
    solver_residual: solverRes,
    solver_iterations: poissIter,
    S3_covariance_matrix: cov,
    S3_residual: s3_residual,
    symbol_frequencies_drift: centering_check
  },
  METHOD_B_DETAILS: {
    var_2000: varAt[2000],
    var_4000: varAt[4000],
    var_6000: varAt[6000],
    baseline_2000_4000: a7_baseline1,
    baseline_4000_6000: a7_baseline2
  }
};

fs.writeFileSync('scratch/h7-family-2026-08-24/full_run_1_closure/A7_NUMERICAL_AUDIT.json', JSON.stringify(out, null, 2));
