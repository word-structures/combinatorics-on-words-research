const fs = require('fs');

const dataPath = '../../research/verification/profile-response-h2-h7-2026-08-25/PROFILE_BASELINE.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let s_pos = 0, s_neg = 0, s_zero = 0;
let match_A = 0, match_B = 0;

let critical_profiles = [], audit_results = [], algebraic_results = [], diagnostic_results = [];

for (let item of data) {
  const h = item.h;
  const v_arr = item.profile.split(',').map(Number);
  const q_v = item.q_v;
  const delta_A = item.delta_A;
  const delta_B = item.delta_B;
  
  const sum_sq = v_arr.reduce((acc, val) => acc + val * val, 0);
  const B_exact_num = 3 * sum_sq - h * h; 
  const B_v = B_exact_num / 3;
  const S_exact_num = 3 * h - 3 * B_exact_num;
  const S_v = h - B_exact_num;
  
  let S_sign = Math.sign(S_v);
  if (S_v > 0) s_pos++; else if (S_v < 0) s_neg++;
  else {
    s_zero++;
    critical_profiles.push({ profile: item.profile, h: h, delta_A: delta_A, delta_B: delta_B });
  }
  if (S_sign !== 0) {
    if (Math.sign(delta_A) === S_sign) match_A++;
    if (Math.sign(delta_B) === S_sign) match_B++;
  }
  
  audit_results.push({
    h, profile: item.profile, B_computed: B_v, B_match: Math.abs(B_v - item.B) < 1e-12,
    S: S_v, sign_S: S_sign, delta_A, delta_B, q_v
  });
  
  const v1 = v_arr[0], v2 = v_arr[1], v3 = v_arr[2];
  const B_alt_num = (v1-v2)**2 + (v2-v3)**2 + (v3-v1)**2;
  const B_alt_match = (B_alt_num === B_exact_num);
  const x3_1 = 3*v1 - h, x3_2 = 3*v2 - h, x3_3 = 3*v3 - h;
  const sum_x3 = x3_1 + x3_2 + x3_3;
  const J27 = x3_1 * x3_2 * x3_3;
  const P = (v1-v2)**2 * (v2-v3)**2 * (v3-v1)**2;
  const LHS = 54 * P, RHS = Math.pow(B_exact_num, 3) - 2 * Math.pow(J27, 2);
  const algebra_match = (LHS === RHS);
  
  algebraic_results.push({ h, profile: item.profile, B_alt_match, sum_x_zero: (sum_x3 === 0), algebra_match });
  const R_v = delta_A / q_v;
  const R_v_prime = delta_B / q_v;
  diagnostic_results.push({ h, profile: item.profile, R_v, R_v_prime, S: S_v });
}

function computeStats(arr, R_key) {
  const n = arr.length;
  const mean_S = arr.reduce((a, b) => a + b.S, 0) / n;
  const mean_R = arr.reduce((a, b) => a + b[R_key], 0) / n;
  let cov = 0, var_S = 0, var_R = 0;
  for (let item of arr) {
    cov += (item.S - mean_S) * (item[R_key] - mean_R);
    var_S += (item.S - mean_S)**2;
    var_R += (item[R_key] - mean_R)**2;
  }
  const pearson = cov / Math.sqrt(var_S * var_R);
  const slope = cov / var_S;
  const intercept = mean_R - slope * mean_S;
  const R2 = (cov * cov) / (var_S * var_R);
  
  const s_sorted = [...arr].map((x,i)=>({...x, idx:i})).sort((a,b)=>a.S - b.S);
  const r_sorted = [...arr].map((x,i)=>({...x, idx:i})).sort((a,b)=>a[R_key] - b[R_key]);
  let rank_S = new Array(n), rank_R = new Array(n);
  s_sorted.forEach((x, i) => rank_S[x.idx] = i);
  r_sorted.forEach((x, i) => rank_R[x.idx] = i);
  let d2 = 0;
  for(let i=0; i<n; i++) d2 += (rank_S[i] - rank_R[i])**2;
  const spearman = 1 - (6 * d2) / (n * (n*n - 1));
  
  let loo = [];
  for(let i=0; i<n; i++) {
    const loo_arr = arr.filter((_, idx) => idx !== i);
    const m_S = loo_arr.reduce((a, b) => a + b.S, 0) / (n-1);
    const m_R = loo_arr.reduce((a, b) => a + b[R_key], 0) / (n-1);
    let c = 0, v_S = 0;
    for (let item of loo_arr) {
      c += (item.S - m_S) * (item[R_key] - m_R);
      v_S += (item.S - m_S)**2;
    }
    loo.push({ profile: arr[i].profile, excluded_h: arr[i].h, loo_slope: c / v_S });
  }

  return { pearson, spearman, slope, intercept, R2, loo };
}

const stats_A = computeStats(diagnostic_results, 'R_v');
const stats_B = computeStats(diagnostic_results, 'R_v_prime');

const output = {
  phase1_audit: { counts: { s_pos, s_neg, s_zero }, critical_profiles, sign_agreement: { match_A, match_B, total_non_critical: 13 }, details: audit_results },
  phase2_algebra: algebraic_results,
  phase3_diagnostic: { stats_A, stats_B, details: diagnostic_results }
};

fs.writeFileSync('audit_phases_1_3_results.json', JSON.stringify(output, null, 2));
