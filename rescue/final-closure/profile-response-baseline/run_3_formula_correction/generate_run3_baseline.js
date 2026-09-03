const fs = require('fs');
const utils = require('./utils.js');

const OUT_DIR = process.argv[2] || 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3_formula_correction';

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, {recursive: true});

let global_poisson_res = 0;
let global_collatz_width = 0;
let edge_eq_mismatches = 0;
let prof_cls_mismatches = 0;
let prof_edge_residuals = 0;
let unique_dom_scc_status = "PASS";
let dom_period_status = "PASS";
let max_r_res=0, max_l_res=0, max_rs_res=0, max_st_res=0;
let max_poisson_res = 0;
let ab_disagreement = 0;
let max_slope_spread = 0;

let profile_baseline_arr = [];
let perron_parry_audit = [];
let variance_method_A_audit = [];
let variance_method_B_audit = [];
let q_partition_audit = [];
let period_audit = [];
let scc_audit = [];
let spotcheck_C = [];
let edge_eq_audit = [];
let prof_cls_audit = [];

for (let h=2; h<=7; h++) {
    console.log(`Processing h=${h}`);
    const L = 2*h - 1;
    let old_states = [];
    
    const total_combinations = Math.pow(3, L);
    for (let i=0; i<total_combinations; i++) {
        let arr = new Array(L);
        let temp = i;
        for (let j=L-1; j>=0; j--) {
            arr[j] = temp % 3;
            temp = Math.floor(temp / 3);
        }
        if (!utils.hasAbelianSquare(arr, 2, h-1)) {
            old_states.push(arr);
        }
    }
    
    if (h === 2) {
        let k1_forbidden = true;
        for (let s of old_states) {
            if (utils.hasAbelianSquare(s, 1, 1)) {
                k1_forbidden = false;
                break;
            }
        }
        if (k1_forbidden) throw new Error("K=1 was forbidden in h=2");
    }

    const N = old_states.length;
    const old_map = new Map();
    for (let i=0; i<N; i++) old_map.set(old_states[i].join(''), i);
    
    let adj = Array.from({length: N}, () => []);
    let edge_map = new Map(); // src_tgt => target state
    
    for (let i=0; i<N; i++) {
        for (let x=0; x<3; x++) {
            let next_word = [...old_states[i], x];
            let target_str = next_word.slice(1).join('');
            if (old_map.has(target_str)) {
                adj[i].push(old_map.get(target_str));
                
                // EDGE EQUIVALENCE CHECK
                let e1_has = utils.hasAbelianSquare(next_word, h, h);
                let e2_has = false;
                // E2: target is old valid (already checked), and length 2h is Kh square
                const counts = [0,0,0];
                for(let k=0; k<h; k++) counts[next_word[k]]++;
                for(let k=0; k<h; k++) counts[next_word[h+k]]--;
                if (counts[0]===0 && counts[1]===0 && counts[2]===0) e2_has = true;
                
                if (e1_has !== e2_has) edge_eq_mismatches++;
                
                if (e1_has) {
                    edge_map.set(`${i}_${old_map.get(target_str)}`, next_word);
                }
            }
        }
    }
    
    edge_eq_audit.push({h: h, mismatch_count: edge_eq_mismatches});
    
    // Group deleted edges by profile
    let profile_edges = new Map();
    let edge_count_h = 0;
    
    for (let [edge_key, next_word] of edge_map.entries()) {
        edge_count_h++;
        const U = next_word.slice(0, h);
        const V = next_word.slice(h, 2*h);
        const pU = utils.getParikh(U);
        const pV = utils.getParikh(V);
        const p3 = [0,0,0];
        for(let j=0; j<h; j++) p3[U[j]]++;
        
        if (!utils.arraysEqual(pU, pV) || !utils.arraysEqual(pU, p3)) {
            prof_cls_mismatches++;
        }
        
        // Canonicalize descending
        let p_canon = [...pU].sort((a,b) => b - a);
        let key = p_canon.join(',');
        if (!profile_edges.has(key)) profile_edges.set(key, {p: p_canon, edges: []});
        profile_edges.get(key).edges.push(edge_key);
    }
    
    prof_cls_audit.push({h: h, mismatch_count: prof_cls_mismatches});
    
    let sum_deleted = 0;
    for (let val of profile_edges.values()) sum_deleted += val.edges.length;
    if (sum_deleted !== edge_count_h) prof_edge_residuals++;

    function solveGraph(graph_adj, profile_name, prof_arr) {
        const sccs = utils.tarjanSCC(graph_adj);
        
        // identify directed cycles in SCC
        let recurrent_sccs = [];
        for (let scc of sccs) {
            let has_out = false;
            let in_scc = new Uint8Array(N);
            for (let u of scc) in_scc[u] = 1;
            
            let has_cycle = false;
            for (let u of scc) {
                for (let v of graph_adj[u]) {
                    if (!in_scc[v]) has_out = true;
                    else has_cycle = true;
                }
            }
            if (has_cycle) recurrent_sccs.push(scc);
        }
        
        let cand_sccs = [];
        for (let scc of recurrent_sccs) {
            const right_spec = utils.computeSpectral(graph_adj, scc, 'right');
            cand_sccs.push({ scc, lambda_upper: right_spec.lambda_upper, lambda_lower: right_spec.lambda_lower, spec: right_spec });
        }
        
        cand_sccs.sort((a,b) => b.lambda_lower - a.lambda_lower);
        
        if (cand_sccs.length === 0) { console.log("NO RECURRENT SCCS FOR PROFILE " + profile_name);
            return null; // no recurrent SCCs?
        }
        
        const top_scc = cand_sccs[0];
        let dominance_margin = 0;
        if (cand_sccs.length > 1) {
            dominance_margin = top_scc.lambda_lower - cand_sccs[1].lambda_upper;
            if (dominance_margin <= 0) {
                unique_dom_scc_status = "UNRESOLVED";
            }
        }
        
        const left_spec = utils.computeSpectral(graph_adj, top_scc.scc, 'left');
        
        scc_audit.push({
            h: h, profile: profile_name,
            total_sccs: sccs.length,
            recurrent_sccs: cand_sccs.length,
            dominance_margin: dominance_margin,
            collatz_width: top_scc.lambda_upper - top_scc.lambda_lower,
            lambda: top_scc.spec.lambda
        });
        
        const period = utils.getPeriod(graph_adj, top_scc.scc);
        period_audit.push({h: h, profile: profile_name, period});
        if (period !== 1) dom_period_status = "FAIL";
        
        let K_nodes = top_scc.scc.length;
        let r = top_scc.spec.vec;
        let l = left_spec.vec;
        let lambda = top_scc.spec.lambda;
        
        let l_dot_r = 0;
        for(let i=0; i<K_nodes; i++) l_dot_r += l[i]*r[i];
        for(let i=0; i<K_nodes; i++) l[i] /= l_dot_r;
        let pi = new Float64Array(K_nodes);
        for(let i=0; i<K_nodes; i++) pi[i] = l[i]*r[i];
        
        const out = top_scc.spec.out;
        
        let P_row_sum_res = 0;
        let P_stat_res = 0;
        let next_pi = new Float64Array(K_nodes);
        let P_func = (i, j) => r[j] / (lambda * r[i]);
        
        for(let i=0; i<K_nodes; i++) {
            let rs = 0;
            for(let j of out[i]) {
                let pij = P_func(i, j);
                rs += pij;
                next_pi[j] += pi[i] * pij;
            }
            if (Math.abs(rs - 1) > P_row_sum_res) P_row_sum_res = Math.abs(rs - 1);
        }
        for(let i=0; i<K_nodes; i++) {
            if (Math.abs(next_pi[i] - pi[i]) > P_stat_res) P_stat_res = Math.abs(next_pi[i] - pi[i]);
        }
        
        let ar_res = 0, la_res = 0;
        for(let i=0; i<K_nodes; i++) {
            let sr = 0; for(let j of top_scc.spec.out[i]) sr += r[j];
            let sl = 0; for(let u of left_spec.out[i]) sl += l[u]; // out for left is inp for right
            if (Math.abs(sr - lambda*r[i]) > ar_res) ar_res = Math.abs(sr - lambda*r[i]);
            if (Math.abs(sl - lambda*l[i]) > la_res) la_res = Math.abs(sl - lambda*l[i]);
        }
        
        max_r_res = Math.max(max_r_res, ar_res);
        max_l_res = Math.max(max_l_res, la_res);
        max_rs_res = Math.max(max_rs_res, P_row_sum_res);
        max_st_res = Math.max(max_st_res, P_stat_res);
        
        // Observable f = 1_{w=0} - mu
        let mu = 0;
        for(let i=0; i<K_nodes; i++) {
            let w = old_states[top_scc.scc[i]][L-1]; // last symbol
            if (w === 0) mu += pi[i];
        }
        
        let f = new Float64Array(K_nodes);
        for(let i=0; i<K_nodes; i++) {
            let w = old_states[top_scc.scc[i]][L-1];
            f[i] = (w === 0 ? 1 : 0) - mu;
        }
        
        const mA = utils.solveVarianceMethodA(K_nodes, out, P_func, f, pi);
        max_poisson_res = Math.max(max_poisson_res, mA.poisson_res);
        
        const mB = utils.solveVarianceMethodB(K_nodes, out, P_func, f, pi);
        max_slope_spread = Math.max(max_slope_spread, mB.max_spread);
        
        let a_A = mA.a_A;
        let a_B = mB.a_B;
        ab_disagreement = Math.max(ab_disagreement, Math.abs(a_A - a_B));
        
        variance_method_A_audit.push({h, profile: profile_name, a_A, a_check: mA.a_check, poisson_res: mA.poisson_res, mu});
        variance_method_B_audit.push({h, profile: profile_name, a_B, spread: mB.max_spread});
        
        let q_h = 0;
        if (profile_name === "OLD") {
            // direct calc of q_h
            let q_sum = 0;
            for(let i=0; i<K_nodes; i++) {
                for(let j of out[i]) {
                    let full_idx = top_scc.scc[i] + "_" + top_scc.scc[j];
                    if (edge_map.has(full_idx)) {
                        q_sum += pi[i] * P_func(i, j);
                    }
                }
            }
            q_h = q_sum;
        }
        
        return { lambda, a_A, a_B, q_h, sccNodes: top_scc.scc, out, P_func, pi, r, l };
    }

    const res_old = solveGraph(adj, "OLD");
    
    // Most balanced check
    let b_vals = [];
    for(let [key, val] of profile_edges.entries()) {
        b_vals.push({key, val: utils.exactB(val.p, h)});
    }
    b_vals.sort((a,b) => a.val - b.val);
    let most_balanced_b = b_vals.length > 0 ? b_vals[0].val : -1;
    
    let a_old = res_old.a_A;
    let a_old_B = res_old.a_B;
    
    // Method C for OLD
    const C_old = utils.solveVarianceMethodC(res_old.sccNodes.length, res_old.out, (i,j) => {
        return (old_states[res_old.sccNodes[j]][L-1] === 0 ? 1 : 0);
    });
    spotcheck_C.push({h, profile: "OLD", a_C: C_old, a_A: a_old});
    
    // Smallest abs(delta A) non-most balanced profile
    let profiles_data = [];
    
    for (let [key, val] of profile_edges.entries()) {
        let p_adj = Array.from({length: N}, () => []);
        for(let i=0; i<N; i++) {
            for(let tgt of adj[i]) {
                let e_key = i + "_" + tgt;
                if (!val.edges.includes(e_key)) p_adj[i].push(tgt);
            }
        }
        const res_p = solveGraph(p_adj, key, val.p);
        
        const q_v_arr = val.edges;
        let q_v = 0;
        for(let e of q_v_arr) {
            const parts = e.split("_");
            const i = res_old.sccNodes.indexOf(parseInt(parts[0]));
            const j = res_old.sccNodes.indexOf(parseInt(parts[1]));
            if (i !== -1 && j !== -1) {
                // Must ensure transition j is correctly found in out[i]
                q_v += res_old.pi[i] * res_old.P_func(i, res_old.out[i].indexOf(j));
            }
        }
        
        profiles_data.push({
            h: h,
            profile: key,
            p: val.p,
            exact_b: utils.exactB(val.p, h),
            is_most_balanced: (utils.exactB(val.p, h) === most_balanced_b),
            lambda: res_p.lambda,
            a_A: res_p.a_A,
            a_B: res_p.a_B,
            delta_a_A: res_p.a_A - a_old,
            delta_a_B: res_p.a_B - a_old_B,
            q_v: q_v,
            res_p
        });
    }
    
    let sum_q_v = 0;
    for(let d of profiles_data) sum_q_v += d.q_v;
    q_partition_audit.push({h, q_h_sum: sum_q_v, q_h_direct: res_old.q_h, diff: Math.abs(sum_q_v - res_old.q_h)});
    
    let cand_for_C = profiles_data.filter(d => !d.is_most_balanced);
    cand_for_C.sort((a,b) => Math.abs(a.delta_a_A) - Math.abs(b.delta_a_A));
    let to_c_check = profiles_data.filter(d => d.is_most_balanced);
    if(cand_for_C.length > 0) to_c_check.push(cand_for_C[0]);
    
    for(let d of to_c_check) {
        const C_p = utils.solveVarianceMethodC(d.res_p.sccNodes.length, d.res_p.out, (i,j) => {
            return (old_states[d.res_p.sccNodes[j]][L-1] === 0 ? 1 : 0);
        });
        spotcheck_C.push({h, profile: d.profile, a_C: C_p, a_A: d.a_A});
    }
    
    profiles_data.forEach(d => {
        let ev = Math.max(Math.abs(d.delta_a_A - d.delta_a_B), max_slope_spread, 1e-9);
        let cert = (Math.abs(d.delta_a_A) > 10 * ev) && (Math.sign(d.delta_a_A) === Math.sign(d.delta_a_B));
        
        let B_val = utils.exactB(d.p, h);
        
        profile_baseline_arr.push({
            h: h,
            profile: d.profile,
            lambda: d.lambda,
            a_A: d.a_A,
            a_B: d.a_B,
            delta_A: d.delta_a_A,
            q_v: d.q_v,
            rho_a: d.delta_a_A / d.q_v,
            exact_b: B_val,
            is_most_balanced: d.is_most_balanced,
            sign_certified: cert,
            ev: ev
        });
    });
}

// Write outputs
fs.writeFileSync(`${OUT_DIR}/EDGE_EQUIVALENCE_AUDIT.json`, JSON.stringify(edge_eq_audit, null, 2));
fs.writeFileSync(`${OUT_DIR}/PROFILE_CLASSIFICATION_AUDIT.json`, JSON.stringify(prof_cls_audit, null, 2));
fs.writeFileSync(`${OUT_DIR}/SCC_SPECTRAL_CERTIFICATES.json`, JSON.stringify(scc_audit, null, 2));
fs.writeFileSync(`${OUT_DIR}/PERIOD_AUDIT.json`, JSON.stringify(period_audit, null, 2));
fs.writeFileSync(`${OUT_DIR}/Q_PARTITION_AUDIT.json`, JSON.stringify(q_partition_audit, null, 2));
fs.writeFileSync(`${OUT_DIR}/VARIANCE_METHOD_A.json`, JSON.stringify(variance_method_A_audit, null, 2));
fs.writeFileSync(`${OUT_DIR}/VARIANCE_METHOD_B.json`, JSON.stringify(variance_method_B_audit, null, 2));
fs.writeFileSync(`${OUT_DIR}/PRESSURE_CURVATURE_SPOTCHECK.json`, JSON.stringify(spotcheck_C, null, 2));
fs.writeFileSync(`${OUT_DIR}/PROFILE_BASELINE_RUN3.json`, JSON.stringify(profile_baseline_arr, null, 2));

const summary = {
    unique_dom_scc_status,
    dom_period_status,
    edge_eq_mismatches,
    prof_cls_mismatches,
    prof_edge_residuals,
    max_poisson_res,
    ab_disagreement,
    max_slope_spread,
    max_r_res, max_l_res, max_rs_res, max_st_res
};
fs.writeFileSync(`${OUT_DIR}/SUMMARY_RUN3.json`, JSON.stringify(summary, null, 2));
console.log("DONE");
