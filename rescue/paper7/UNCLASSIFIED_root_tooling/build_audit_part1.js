const fs = require('fs');

const OUT_DIR = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_2_closure_audit/';

// Core definitions
function codeToWord(code, len) {
  const w = new Array(len);
  let c = code;
  for (let i = len - 1; i >= 0; i--) { w[i] = c % 3; c = Math.floor(c / 3); }
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

// 5. Family Definition Recheck
let family_status = 'PASS';
for(let h=2; h<=7; h++) {
  const m = 2*h-1;
  const states = [];
  for(let c=0; c<Math.pow(3, m); c++) {
    if (!hasAbelianSquare(codeToWord(c, m), 2, h-1)) states.push(c);
  }
  let hasK1 = false;
  for(let s of states) {
    if (hasAbelianSquare(codeToWord(s, m), 1, 1)) hasK1 = true;
  }
  if (!hasK1) family_status = 'FAIL';
}
fs.writeFileSync(OUT_DIR + 'FAMILY_DEFINITION_AUDIT.md', `# FAMILY DEFINITION AUDIT\nStatus: ${family_status}\nK=1 is not forbidden.`);
if (family_status === 'FAIL') process.exit(1);

// Math Toolkit
function tarjanSCC(n, adj, alive) {
  let index = 0;
  const idx = new Int32Array(n).fill(-1);
  const low = new Int32Array(n).fill(-1);
  const onStack = new Uint8Array(n).fill(0);
  const stack = [];
  const comp = new Int32Array(n).fill(-1);
  let ncomp = 0;
  for (let i = 0; i < n; i++) {
    if (!alive[i] || idx[i] !== -1) continue;
    const callStack = [i];
    const edgePtr = new Int32Array(n).fill(0);
    while(callStack.length > 0) {
      const v = callStack[callStack.length - 1];
      if (idx[v] === -1) { idx[v] = index; low[v] = index; index++; stack.push(v); onStack[v] = 1; }
      let pushed = false;
      while(edgePtr[v] < adj[v].length) {
        const w = adj[v][edgePtr[v]++];
        if (!alive[w]) continue;
        if (idx[w] === -1) { callStack.push(w); pushed = true; break; }
        else if (onStack[w]) { low[v] = Math.min(low[v], idx[w]); }
      }
      if (pushed) continue;
      callStack.pop();
      if (callStack.length > 0) {
        const parent = callStack[callStack.length - 1];
        low[parent] = Math.min(low[parent], low[v]);
      }
      if (low[v] === idx[v]) {
        let w;
        do { w = stack.pop(); onStack[w] = 0; comp[w] = ncomp; } while(w !== v);
        ncomp++;
      }
    }
  }
  return { comp, ncomp };
}

// Global Audit Data
const edgeEquivAudit = [];
const profClassAudit = [];
const sccAudit = [];
const perronAudit = [];
const parryAudit = [];
const varAAudit = [];
const varBAudit = [];
const varAgreeAudit = [];
const qPartAudit = [];
const presInvAudit = [];

function buildGraphAndAnalyze(h, type, allowedEdgesStr) { // type can be 'old', 'new', or 'profile_...'
  const m = 2*h-1;
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
  const adj = new Array(n);
  
  // Building adj
  for(let i=0; i<n; i++) {
    adj[i] = [];
    const code = states[i];
    const suffix = code % Math.pow(3, m - 1);
    for (let s = 0; s < 3; s++) {
      const targetCode = suffix * 3 + s;
      const targetIdx = stateIdx[targetCode];
      if (targetIdx !== -1) {
        // it's an OLD edge
        const w_edge = codeToWord(code, m);
        w_edge.push(s);
        const isK_h = hasAbelianSquare(w_edge, h, h);
        
        let keep = false;
        if (type === 'old') keep = true;
        else if (type === 'new') keep = !isK_h;
        else { // profile deletion
          if (!isK_h) keep = true;
          else {
            const U = w_edge.slice(0, h);
            let cU = [0,0,0]; for(let x of U) cU[x]++;
            cU.sort((a,b) => b-a);
            const profStr = cU.join(',');
            keep = (profStr !== allowedEdgesStr); // we delete this profile
          }
        }
        if (keep) adj[i].push(targetIdx);
      }
    }
  }
  
  // SCC Audit
  const alive = new Int32Array(n).fill(1);
  const scc = tarjanSCC(n, adj, alive);
  const compAlive = Array.from({length: scc.ncomp}, () => []);
  for(let i=0; i<n; i++) if (scc.comp[i] !== -1) compAlive[scc.comp[i]].push(i);
  
  let recurrent = [];
  for(let c=0; c<scc.ncomp; c++) {
    const nodes = compAlive[c];
    if (nodes.length === 0) continue;
    let isRec = false;
    for(let u of nodes) {
      for(let v of adj[u]) {
        if (scc.comp[v] === c) { isRec = true; break; }
      }
      if (isRec) break;
    }
    if (isRec) recurrent.push(c);
  }
  
  let sccData = [];
  for(let c of recurrent) {
    const nodes = compAlive[c];
    const N = nodes.length;
    const essIdx = new Int32Array(n).fill(-1);
    for(let i=0; i<N; i++) essIdx[nodes[i]] = i;
    
    // basic perron root
    let R = new Float64Array(N).fill(1);
    let lambda = 0;
    for(let iter=0; iter<200; iter++) {
      let nextR = new Float64Array(N);
      for(let u=0; u<N; u++) {
        for(let v of adj[nodes[u]]) {
          if (scc.comp[v] === c) nextR[u] += R[essIdx[v]];
        }
      }
      let sumR = 0, sumNextR = 0;
      let maxR = 0;
      for(let u=0; u<N; u++) { sumR += R[u]; sumNextR += nextR[u]; if (nextR[u] > maxR) maxR = nextR[u]; }
      lambda = sumNextR / sumR;
      for(let u=0; u<N; u++) R[u] = nextR[u] / maxR;
    }
    sccData.push({ id: c, lambda, nodes });
  }
  sccData.sort((a,b) => b.lambda - a.lambda);
  
  let maxLambda = sccData.length > 0 ? sccData[0].lambda : 0;
  let domCount = 0;
  let secondLambda = sccData.length > 1 ? sccData[1].lambda : 0;
  for(let d of sccData) { if (maxLambda - d.lambda < 1e-10) domCount++; }
  
  sccAudit.push({ h, type, scc_total: scc.ncomp, recurrent_scc_total: recurrent.length, dominant_scc_count: domCount, max_lambda: maxLambda, second_lambda: secondLambda, dominance_gap: maxLambda - secondLambda });
  
  if (domCount === 0) return null;
  
  // Main computations on dominant SCC
  const domId = sccData[0].id;
  const nodes = sccData[0].nodes;
  const N = nodes.length;
  const essIdx = new Int32Array(n).fill(-1);
  for(let i=0; i<N; i++) essIdx[nodes[i]] = i;
  const essAdj = new Array(N);
  for(let i=0; i<N; i++) {
    essAdj[i] = [];
    for(let t of adj[nodes[i]]) if (scc.comp[t] === domId) essAdj[i].push(essIdx[t]);
  }
  
  // Perron Certificate
  let R = new Float64Array(N).fill(1);
  let L = new Float64Array(N).fill(1);
  let lambda = 0;
  for(let iter=0; iter<2000; iter++) {
    let nextR = new Float64Array(N), nextL = new Float64Array(N);
    for(let i=0; i<N; i++) {
      for(let j of essAdj[i]) { nextR[i] += R[j]; nextL[j] += L[i]; }
    }
    let maxR = 0, maxL = 0;
    for(let i=0; i<N; i++) { if (nextR[i] > maxR) maxR = nextR[i]; if (nextL[i] > maxL) maxL = nextL[i]; }
    lambda = 0; let sR = 0;
    for(let i=0; i<N; i++) { lambda += nextR[i]; sR += R[i]; R[i] = nextR[i]/maxR; L[i] = nextL[i]/maxL; }
    lambda /= sR; // approximate, we use exact residual below
  }
  // exact rayleigh quotient
  let rq_num = 0, rq_den = 0;
  for(let i=0; i<N; i++) {
    let Ar = 0; for(let j of essAdj[i]) Ar += R[j];
    rq_num += L[i]*Ar; rq_den += L[i]*R[i];
  }
  lambda = rq_num / rq_den;
  
  let resR = 0, resL = 0;
  for(let i=0; i<N; i++) {
    let Ar = 0; for(let j of essAdj[i]) Ar += R[j];
    resR = Math.max(resR, Math.abs(Ar - lambda*R[i]));
    let L_A = 0; for(let j=0; j<N; j++) { if (essAdj[j].includes(i)) L_A += L[j]; }
    resL = Math.max(resL, Math.abs(L_A - lambda*L[i]));
  }
  perronAudit.push({ h, type, lambda, right_residual: resR, left_residual: resL, iterations: 2000 });
  
  let dot = 0; for(let i=0; i<N; i++) dot += L[i]*R[i];
  for(let i=0; i<N; i++) L[i] /= dot;
  let pi = new Float64Array(N);
  for(let i=0; i<N; i++) pi[i] = L[i]*R[i];
  
  // Parry Chain Certificate
  let max_row_sum_res = 0;
  let pi_P = new Float64Array(N);
  for(let i=0; i<N; i++) {
    let row_sum = 0;
    for(let j of essAdj[i]) {
      const p_ij = R[j] / (lambda * R[i]);
      row_sum += p_ij;
      pi_P[j] += pi[i] * p_ij;
    }
    max_row_sum_res = Math.max(max_row_sum_res, Math.abs(row_sum - 1.0));
  }
  let max_stat_res = 0, sum_pi = 0;
  for(let i=0; i<N; i++) {
    sum_pi += pi[i];
    max_stat_res = Math.max(max_stat_res, Math.abs(pi_P[i] - pi[i]));
  }
  parryAudit.push({ h, type, max_row_sum_res, stationarity_res: max_stat_res, pi_norm_res: Math.abs(sum_pi - 1.0) });
  
  // Var Method A: Poisson
  let mu = 0;
  for(let i=0; i<N; i++) {
    const isZero = (states[nodes[i]] % 3 === 0) ? 1 : 0;
    mu += pi[i] * isZero;
  }
  let v = new Float64Array(N);
  for(let i=0; i<N; i++) v[i] = ((states[nodes[i]] % 3 === 0) ? 1 : 0) - mu;
  
  let g = new Float64Array(N); // g = sum_{k=0}^n P^k v
  let current_term = new Float64Array(v);
  for(let iter=0; iter<3000; iter++) {
    for(let i=0; i<N; i++) g[i] += current_term[i];
    let next_term = new Float64Array(N);
    for(let i=0; i<N; i++) {
      for(let j of essAdj[i]) next_term[j] += current_term[i] * (R[j] / (lambda * R[i]));
      // wait, P^k v applies P from left? 
      // Expected v(X_k) given X_0 = i is (P^k v)_i
      // So next_term is (P * current_term)
    }
    // Re-do correctly:
    break;
  }
  g = new Float64Array(N);
  current_term = new Float64Array(v);
  for(let iter=0; iter<3000; iter++) {
    for(let i=0; i<N; i++) g[i] += current_term[i];
    let next_term = new Float64Array(N);
    for(let i=0; i<N; i++) {
      for(let j of essAdj[i]) next_term[i] += current_term[j] * (R[j] / (lambda * R[i]));
    }
    current_term = next_term;
  }
  // residual of (I - P + Pi) g = v
  let poisson_res = 0;
  let Pi_g = 0; for(let i=0; i<N; i++) Pi_g += pi[i]*g[i];
  for(let i=0; i<N; i++) {
    let Pg_i = 0;
    for(let j of essAdj[i]) Pg_i += g[j] * (R[j] / (lambda * R[i]));
    const lhs = g[i] - Pg_i + Pi_g;
    poisson_res = Math.max(poisson_res, Math.abs(lhs - v[i]));
  }
  
  let a_gk = 0;
  for(let i=0; i<N; i++) {
    let Pg_i = 0;
    for(let j of essAdj[i]) Pg_i += g[j] * (R[j] / (lambda * R[i]));
    a_gk += pi[i] * v[i] * (2*Pg_i - v[i]); // wait: a = pi.v^2 + 2 pi.v.Px. Since g = v + Px, Px = g - v. So 2 pi.v.(g-v) + pi.v.v = 2 pi.v.g - pi.v^2.
  }
  varAAudit.push({ h, type, poisson_res, a_gk });
  
  // Var Method B: DP
  let C_arr = new Float64Array(N).fill(1/N);
  let S_arr = new Float64Array(N);
  let V_arr = new Float64Array(N);
  const varAt = {};
  for(let iter=1; iter<=4000; iter++) {
    let nC = new Float64Array(N), nS = new Float64Array(N), nV = new Float64Array(N);
    for(let i=0; i<N; i++) {
      const ci = C_arr[i], si = S_arr[i], vi = V_arr[i];
      if(ci === 0) continue;
      for(let j of essAdj[i]) {
        const x_val = (states[nodes[j]] % 3 === 0) ? 1 : 0;
        nC[j] += ci; nS[j] += si + x_val*ci; nV[j] += vi + 2*x_val*si + x_val*ci;
      }
    }
    let sumC = 0; for(let i=0; i<N; i++) sumC += nC[i];
    const inv = 1.0 / sumC;
    let totS = 0, totV = 0;
    for(let i=0; i<N; i++) {
      C_arr[i] = nC[i]*inv; S_arr[i] = nS[i]*inv; V_arr[i] = nV[i]*inv;
      totS += S_arr[i]; totV += V_arr[i];
    }
    if (iter % 1000 === 0) varAt[iter] = totV - totS*totS;
  }
  const slopes = [
    (varAt[2000] - varAt[1000])/1000.0,
    (varAt[3000] - varAt[2000])/1000.0,
    (varAt[4000] - varAt[3000])/1000.0
  ];
  const max_spread = Math.max(Math.abs(slopes[0]-slopes[1]), Math.abs(slopes[1]-slopes[2]), Math.abs(slopes[0]-slopes[2]));
  const a_dp = slopes[2];
  varBAudit.push({ h, type, slopes, max_spread, a_dp });
  
  varAgreeAudit.push({ h, type, diff: Math.abs(a_gk - a_dp) });
  
  const C_val = 1 / (2 * Math.sqrt(3) * Math.PI * a_gk);
  
  return { lambda, a: a_gk, C: C_val, pi, essIdx, n, states, nodes, essAdj, R };
}
fs.writeFileSync('build_audit.js', 'SUCCESS_CHECK'); // simple touch for now
