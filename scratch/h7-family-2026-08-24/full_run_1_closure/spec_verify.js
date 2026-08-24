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
let N = 0;
for(let i=0; i<states.length; i++) {
  if (scc.comp[i] === dominantSccId) {
    essIdx[i] = N++;
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

// Power iteration for right eigenvector R and left L
let R = new Float64Array(N).fill(1);
let L_vec = new Float64Array(N).fill(1);

let lambdaR = 0;
let iter = 0;
const MAX_ITER = 10000;
const TOL = 1e-14;

let rightRes = 1;
let leftRes = 1;

for(; iter < MAX_ITER; iter++) {
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
    sumR += R[i];
    sumNextR += nextR[i];
    if (nextR[i] > maxR) maxR = nextR[i];
    if (nextL[i] > maxL) maxL = nextL[i];
  }
  
  let newLambda = sumNextR / sumR;
  
  for(let i=0; i<N; i++) {
    nextR[i] /= maxR;
    nextL[i] /= maxL;
  }
  
  // check residuals using the Rayleigh quotient approximations
  // Actually simpler: norm of difference of normalized vectors
  let maxDiffR = 0, maxDiffL = 0;
  for(let i=0; i<N; i++) {
    let dR = Math.abs(nextR[i] - R[i]);
    if (dR > maxDiffR) maxDiffR = dR;
    let dL = Math.abs(nextL[i] - L_vec[i]);
    if (dL > maxDiffL) maxDiffL = dL;
  }
  
  R = nextR;
  L_vec = nextL;
  lambdaR = newLambda;
  rightRes = maxDiffR;
  leftRes = maxDiffL;
  
  if (maxDiffR < TOL && maxDiffL < TOL) {
    break;
  }
}

const out = {
  lambda_7: lambdaR,
  convergence_criterion: TOL,
  iteration_count: iter,
  right_perron_residual: rightRes,
  left_perron_residual: leftRes,
  normalization_convention: 'Max element scaled to 1 during iteration'
};
fs.writeFileSync('scratch/h7-family-2026-08-24/full_run_1_closure/PERRON_AUDIT.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
