const fs = require('fs');
let src = fs.readFileSync('scratch/profile-response-baseline-h2-h7-2026-08-25/run_3b_integrity_audit/generate_run3b.js', 'utf8');
const dir = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3c_durable_recovery';

// 1. Fix q_v indexOf bug
src = src.replace("res_old.P_func(i, res_old.out[i].indexOf(j))", "res_old.P_func(i, j)");

// 2. Fix Q_PARTITION output name
src = src.replace("Q_PARTITION_AUDIT.json", "Q_PARTITION_FINAL_AUDIT.json");

let qv_replace = `
          let q_v = 0;
          let q2_v = 0;
          for(let e of val.edges) {
              const parts = e.split("_");
              const i = res_old.sccNodes.indexOf(parseInt(parts[0]));
              const j = res_old.sccNodes.indexOf(parseInt(parts[1]));
              if (i !== -1 && j !== -1) {
                  q_v += res_old.pi[i] * res_old.P_func(i, j);
              }
          }
          // Q2 logic:
          for(let i=0; i<res_old.sccNodes.length; i++) {
              let old_i = res_old.sccNodes[i];
              let s_i = old_states[old_i];
              for(let j of res_old.out[i]) {
                  let old_j = res_old.sccNodes[j];
                  let s_j = old_states[old_j];
                  let w = [...s_i, s_j[L-1]];
                  let p1 = [0,0,0], p2 = [0,0,0];
                  for(let c=0; c<h; c++) p1[w[c]]++;
                  for(let c=0; c<h; c++) p2[w[h+c]]++;
                  if (p1[0]===p2[0] && p1[1]===p2[1] && p1[2]===p2[2]) {
                      let prof = [...p1].sort((a,b)=>b-a).join(',');
                      if (prof === key) {
                          q2_v += res_old.pi[i] * res_old.P_func(i, j);
                      }
                  }
              }
          }
          qv_independent_audit.push({h, profile: key, q1: q_v, q2: q2_v, diff: Math.abs(q_v - q2_v)});
          sum_q_v += q_v;
`;
src = src.replace(/let q_v = 0;[\s\S]*?sum_q_v \+= q_v;/g, qv_replace);
src = "let qv_independent_audit = [];\n" + src;
src = src.replace("fs.writeFileSync(OUT_DIR + '/Q_PARTITION", "fs.writeFileSync(OUT_DIR + '/QV_INDEPENDENT_AUDIT.json', JSON.stringify(qv_independent_audit, null, 2));\n    fs.writeFileSync(OUT_DIR + '/Q_PARTITION");

let methodC_replace = `
      function solveMethodCExplicit(N, out, X_func) {
          function p(t) {
              let r = new Float64Array(N).fill(1);
              let lambda_upper = 1e9, lambda_lower = 0;
              for(let iter=0; iter<5000; iter++) {
                  let next_r = new Float64Array(N);
                  for(let i=0; i<N; i++) {
                      let sum = 0;
                      for(let j of out[i]) sum += Math.exp(t * X_func(i, j)) * r[j];
                      next_r[i] = sum;
                  }
                  let max_ratio = 0, min_ratio = 1e9;
                  for(let i=0; i<N; i++) {
                      if(r[i]>0 && next_r[i]>0) {
                          let ratio = next_r[i]/r[i];
                          if(ratio>max_ratio) max_ratio=ratio;
                          if(ratio<min_ratio) min_ratio=ratio;
                      }
                  }
                  lambda_upper = max_ratio; lambda_lower = min_ratio;
                  if (lambda_upper - lambda_lower <= 1e-11 * lambda_lower) break;
                  r = next_r;
              }
              return Math.log((lambda_upper+lambda_lower)/2);
          }
          let epsilons = [1e-3, 5e-4, 2.5e-4];
          let res = [];
          for(let e of epsilons) {
              let p0=p(0), pe=p(e), p_me=p(-e), p2e=p(2*e), p_m2e=p(-2*e);
              let a_C = (-p2e + 16*pe - 30*p0 + 16*p_me - p_m2e) / (12*e*e);
              res.push({epsilon: e, a_C});
          }
          return res;
      }
      
      let b_vals = [];
      for(let [key, val] of profile_edges.entries()) b_vals.push({key, val: utils.exactB(val.p, h)});
      b_vals.sort((a,b) => a.val - b.val);
      let most_balanced_b = b_vals.length > 0 ? b_vals[0].val : -1;
      
      const C_old = solveMethodCExplicit(res_old.sccNodes.length, res_old.out, (i,j) => old_states[res_old.sccNodes[j]][L-1] === 0 ? 1 : 0);
      spotcheck_C.push({h, profile: "OLD", C_vals: C_old, a_A: res_old.a_A});
`;
src = src.replace(/function solveMethodCExplicit.*?spotcheck_C\.push\(\{h, profile: "OLD".*?\}\);/s, methodC_replace);

let methodC_push2 = `
          if (is_most_balanced || h === 2 || (h===5 && key==="3,1,1")) {
              const C_p = solveMethodCExplicit(res_p.sccNodes.length, res_p.out, (i,j) => old_states[res_p.sccNodes[j]][L-1] === 0 ? 1 : 0);
              spotcheck_C.push({h, profile: key, C_vals: C_p, a_A: res_p.a_A});
          }
`;
src = src.replace(/if \(is_most_balanced \|\| h === 2\) \{[\s\S]*?a_A: res_p.a_A\}\);\n          \}/g, methodC_push2);

src = src.replace("PRESSURE_CURVATURE_SPOTCHECK.json", "PRESSURE_CURVATURE_FINAL_AUDIT.json");
src = src.replace("SCC_SPECTRAL_CERTIFICATES.json", "ALL_GRAPH_DOMINANCE_FINAL_AUDIT.json");
src = src.replace("H5_311_AUDIT.json", "H5_311_FINAL_SPECTRAL_CERTIFICATE.json");
src = src.replace("PERIOD_AUDIT.json", "PERIOD_FINAL_AUDIT.json");
src = src.replace("PRESENTATION_INVARIANCE_AUDIT.json", "PRESENTATION_INVARIANCE_FINAL_AUDIT.json");
src = src.replace("fs.writeFileSync(OUT_DIR + '/VARIANCE_METHOD_A.json'", "fs.writeFileSync(OUT_DIR + '/VARIANCE_AB_FINAL_AUDIT.json', JSON.stringify({A: variance_method_A_audit, B: variance_method_B_audit}, null, 2));\n    // fs.writeFileSync(OUT_DIR + '/VARIANCE_METHOD_A.json'");
src = src.replace("PROFILE_BASELINE_RUN3B.csv", "PROFILE_BASELINE_RUN3C_RECOVERED.csv");
src = src.replace("PROFILE_BASELINE_RUN3B.json", "PROFILE_BASELINE_RUN3C_RECOVERED.json");

// Finally, we need to generate PROFILE_SIGN_FINAL_CERTIFICATE.json using canonical B = sum_i (v_i-h/3)^2
// We can just append this logic to the end of generate_run3c.js
let sign_cert = `
    let sign_cert = {
        MOST_BALANCED_TOTAL: 0,
        MOST_BALANCED_POSITIVE: 0,
        MOST_BALANCED_ZERO: 0,
        MOST_BALANCED_NEGATIVE: 0,
        OTHER_TOTAL: 0,
        OTHER_POSITIVE: 0,
        OTHER_ZERO: 0,
        OTHER_NEGATIVE: 0
    };
    for(let h=2; h<=7; h++) {
        let rows = profile_baseline_arr.filter(r => r.h === h);
        let min_B = 1e9;
        for(let r of rows) {
            let p = r.profile.split(',').map(Number);
            let b = 0;
            for(let x of p) b += (x - h/3)*(x - h/3);
            if (b < min_B - 1e-9) min_B = b;
            r.b_val = b;
        }
        for(let r of rows) {
            let isMB = Math.abs(r.b_val - min_B) < 1e-9;
            let sign = Math.sign(r.delta_A);
            if (isMB) {
                sign_cert.MOST_BALANCED_TOTAL++;
                if (sign>0) sign_cert.MOST_BALANCED_POSITIVE++;
                else if (sign<0) sign_cert.MOST_BALANCED_NEGATIVE++;
                else sign_cert.MOST_BALANCED_ZERO++;
            } else {
                sign_cert.OTHER_TOTAL++;
                if (sign>0) sign_cert.OTHER_POSITIVE++;
                else if (sign<0) sign_cert.OTHER_NEGATIVE++;
                else sign_cert.OTHER_ZERO++;
            }
        }
    }
    fs.writeFileSync(OUT_DIR + '/PROFILE_SIGN_FINAL_CERTIFICATE.json', JSON.stringify(sign_cert, null, 2));
`;
src = src.replace(/fs.writeFileSync\(OUT_DIR \+ '\/SUMMARY_AUDITED.json'.*?;/s, "fs.writeFileSync(OUT_DIR + '/SUMMARY_RUN3C_DURABLE.json', JSON.stringify(summary, null, 2));\n" + sign_cert);

fs.writeFileSync(dir + '/generate_run3c.js', src);
console.log("Patched generate_run3c.js");
