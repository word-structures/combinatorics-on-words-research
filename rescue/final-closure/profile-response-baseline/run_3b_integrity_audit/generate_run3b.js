const fs = require('fs');
const utils = require('./utils.js');

const OUT_DIR = process.argv[2];
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, {recursive: true});

let edge_eq_audit = [];
let prof_cls_audit = [];
let scc_audit = [];
let period_audit = [];
let q_partition_audit = [];
let variance_method_A_audit = [];
let variance_method_B_audit = [];
let spotcheck_C = [];
let profile_baseline_arr = [];

let h5_311_audit = null;

for (let h=2; h<=7; h++) {
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
        if (!utils.hasAbelianSquare(arr, 2, h-1)) old_states.push(arr);
    }
    
    const N = old_states.length;
    const old_map = new Map();
    for (let i=0; i<N; i++) old_map.set(old_states[i].join(''), i);
    
    let adj = Array.from({length: N}, () => []);
    let edge_map = new Map();
    let edge_eq_mismatches = 0;
    
    for (let i=0; i<N; i++) {
        for (let x=0; x<3; x++) {
            let next_word = [...old_states[i], x];
            let target_str = next_word.slice(1).join('');
            if (old_map.has(target_str)) {
                adj[i].push(old_map.get(target_str));
                let e1 = utils.hasAbelianSquare(next_word, h, h);
                let e2 = false;
                const counts = [0,0,0];
                for(let k=0; k<h; k++) counts[next_word[k]]++;
                for(let k=0; k<h; k++) counts[next_word[h+k]]--;
                if (counts[0]===0 && counts[1]===0 && counts[2]===0) e2 = true;
                if (e1 !== e2) edge_eq_mismatches++;
                if (e1) edge_map.set(`${i}_${old_map.get(target_str)}`, next_word);
            }
        }
    }
    
    edge_eq_audit.push({h: h, mismatch_count: edge_eq_mismatches});
    
    let profile_edges = new Map();
    let prof_cls_mismatches = 0;
    
    for (let [edge_key, next_word] of edge_map.entries()) {
        const U = next_word.slice(0, h);
        const V = next_word.slice(h, 2*h);
        const pU = utils.getParikh(U);
        const pV = utils.getParikh(V);
        if (!utils.arraysEqual(pU, pV)) prof_cls_mismatches++;
        let p_canon = [...pU].sort((a,b) => b - a);
        let key = p_canon.join(',');
        if (!profile_edges.has(key)) profile_edges.set(key, {p: p_canon, edges: []});
        profile_edges.get(key).edges.push(edge_key);
    }
    prof_cls_audit.push({h: h, mismatch_count: prof_cls_mismatches});
    
    function solveGraph(graph_adj, profile_name, prof_arr) {
        const sccs = utils.tarjanSCC(graph_adj);
        let cyclic_sccs = [];
        for (let scc of sccs) {
            let in_scc = new Uint8Array(N);
            for (let u of scc) in_scc[u] = 1;
            let has_cycle = false;
            for (let u of scc) {
                for (let v of graph_adj[u]) {
                    if (in_scc[v]) { has_cycle = true; break; }
                }
                if (has_cycle) break;
            }
            if (has_cycle) cyclic_sccs.push(scc);
        }
        
        let cand_sccs = [];
        for (let scc of cyclic_sccs) {
            const spec = utils.computeSpectral(graph_adj, scc, 'right');
            cand_sccs.push({ scc, lambda: spec.lambda, spec });
        }
        cand_sccs.sort((a,b) => b.lambda - a.lambda);
        
        if (h === 5 && profile_name === '3,1,1') {
            h5_311_audit = {
                number_of_cyclic_sccs: cyclic_sccs.length,
                spectral_radii: cand_sccs.map(c => c.lambda),
                infinite_path_exists: cyclic_sccs.length > 0,
                H5_311_LANGUAGE: cyclic_sccs.length > 0 ? "INFINITE" : "FINITE",
                asymptotic_variance_defined: cyclic_sccs.length > 0
            };
        }
        
        if (cand_sccs.length === 0) return null;
        
        const top_scc = cand_sccs[0];
        const left_spec = utils.computeSpectral(graph_adj, top_scc.scc, 'left');
        
        scc_audit.push({
            h, profile: profile_name, total_sccs: sccs.length, cyclic_sccs: cand_sccs.length, lambda: top_scc.lambda
        });
        
        const period = utils.getPeriod(graph_adj, top_scc.scc);
        period_audit.push({h, profile: profile_name, period});
        
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
        let P_func = (i, j) => r[j] / (lambda * r[i]);
        
        let mu = 0;
        for(let i=0; i<K_nodes; i++) {
            if (old_states[top_scc.scc[i]][L-1] === 0) mu += pi[i];
        }
        let f = new Float64Array(K_nodes);
        for(let i=0; i<K_nodes; i++) f[i] = (old_states[top_scc.scc[i]][L-1] === 0 ? 1 : 0) - mu;
        
        const mA = utils.solveVarianceMethodA(K_nodes, out, P_func, f, pi);
        const mB = utils.solveVarianceMethodB(K_nodes, out, P_func, f, pi);
        
        variance_method_A_audit.push({h, profile: profile_name, a_A: mA.a_A, a_check: mA.a_check});
        variance_method_B_audit.push({h, profile: profile_name, a_B: mB.a_B, spread: mB.max_spread});
        
        let q_h = 0;
        if (profile_name === "OLD") {
            for(let i=0; i<K_nodes; i++) {
                for(let j of out[i]) {
                    if (edge_map.has(top_scc.scc[i] + "_" + top_scc.scc[j])) q_h += pi[i] * P_func(i, j);
                }
            }
        }
        
        return { lambda, a_A: mA.a_A, a_B: mB.a_B, q_h, sccNodes: top_scc.scc, out, P_func, pi, r, l };
    }

    const res_old = solveGraph(adj, "OLD");
    
    // Method C explicit outputs
    function solveMethodCExplicit(N, out, X_func) {
        function p(t) {
            let r = new Float64Array(N).fill(1);
            let lambda_upper = 1e9, lambda_lower = 0;
            for(let iter=0; iter<10000; iter++) {
                let next_r = new Float64Array(N);
                let max_r = 0;
                for(let i=0; i<N; i++) {
                    let sr = 0;
                    for(let j of out[i]) sr += r[j] * Math.exp(t * X_func(i, j));
                    next_r[i] = sr;
                    if (sr > max_r) max_r = sr;
                }
                let cu = 0, cl = 1e9;
                for(let i=0; i<N; i++) {
                    let ratio = next_r[i] / r[i];
                    if(ratio > cu) cu = ratio;
                    if(ratio < cl) cl = ratio;
                }
                lambda_upper = cu;
                lambda_lower = cl;
                for(let i=0; i<N; i++) r[i] = next_r[i] / max_r;
                if ((lambda_upper - lambda_lower) / lambda_lower < 1e-12) break;
            }
            return Math.log((lambda_upper + lambda_lower)/2);
        }
        const e = 1e-3;
        const p0 = p(0), pe = p(e), pme = p(-e), p2e = p(2*e), pm2e = p(-2*e);
        const a_C = (-p2e + 16*pe - 30*p0 + 16*pme - pm2e) / (12 * e * e);
        return { e, p_m2e: pm2e, p_me: pme, p_0: p0, p_e: pe, p_2e: p2e, a_C };
    }
    
    let b_vals = [];
    for(let [key, val] of profile_edges.entries()) b_vals.push({key, val: utils.exactB(val.p, h)});
    b_vals.sort((a,b) => a.val - b.val);
    let most_balanced_b = b_vals.length > 0 ? b_vals[0].val : -1;
    
    const C_old = solveMethodCExplicit(res_old.sccNodes.length, res_old.out, (i,j) => old_states[res_old.sccNodes[j]][L-1] === 0 ? 1 : 0);
    spotcheck_C.push({h, profile: "OLD", epsilon: C_old.e, p_m2e: C_old.p_m2e, p_me: C_old.p_me, p_0: C_old.p_0, p_e: C_old.p_e, p_2e: C_old.p_2e, a_C: C_old.a_C, a_A: res_old.a_A});
    
    let sum_q_v = 0;
    for (let [key, val] of profile_edges.entries()) {
        let p_adj = Array.from({length: N}, () => []);
        for(let i=0; i<N; i++) {
            for(let tgt of adj[i]) {
                if (!val.edges.includes(i + "_" + tgt)) p_adj[i].push(tgt);
            }
        }
        const res_p = solveGraph(p_adj, key, val.p);
        if (!res_p) continue;
        
        let q_v = 0;
        for(let e of val.edges) {
            const parts = e.split("_");
            const i = res_old.sccNodes.indexOf(parseInt(parts[0]));
            const j = res_old.sccNodes.indexOf(parseInt(parts[1]));
            if (i !== -1 && j !== -1) {
                q_v += res_old.pi[i] * res_old.P_func(i, res_old.out[i].indexOf(j));
            }
        }
        sum_q_v += q_v;
        
        let is_most_balanced = utils.exactB(val.p, h) === most_balanced_b;
        profile_baseline_arr.push({
            h, profile: key,
            a_A: res_p.a_A, a_B: res_p.a_B,
            delta_A: res_p.a_A - res_old.a_A,
            q_v, is_most_balanced
        });
        
        if (is_most_balanced || h === 2) {
            const C_p = solveMethodCExplicit(res_p.sccNodes.length, res_p.out, (i,j) => old_states[res_p.sccNodes[j]][L-1] === 0 ? 1 : 0);
            spotcheck_C.push({h, profile: key, epsilon: C_p.e, p_m2e: C_p.p_m2e, p_me: C_p.p_me, p_0: C_p.p_0, p_e: C_p.p_e, p_2e: C_p.p_2e, a_C: C_p.a_C, a_A: res_p.a_A});
        }
    }
    q_partition_audit.push({h, q_h_sum: sum_q_v, q_h_direct: res_old.q_h});
}

// PRESENTATION INVARIANCE (h=3, L=3 vs L=5)
function buildOld(L, avoidK) {
    let states = [];
    for(let i=0; i<Math.pow(3, L); i++) {
        let arr = new Array(L);
        let temp = i;
        for(let j=L-1; j>=0; j--) { arr[j] = temp % 3; temp = Math.floor(temp/3); }
        if (!utils.hasAbelianSquare(arr, 2, avoidK)) states.push(arr);
    }
    const N = states.length;
    let adj = Array.from({length: N}, () => []);
    let map = new Map();
    for(let i=0; i<N; i++) map.set(states[i].join(''), i);
    for(let i=0; i<N; i++) {
        for(let x=0; x<3; x++) {
            let nw = [...states[i], x];
            if (map.has(nw.slice(1).join(''))) adj[i].push(map.get(nw.slice(1).join('')));
        }
    }
    return { states, adj };
}

let invar = [];
const p3 = buildOld(3, 2);
const p5 = buildOld(5, 2);

function spectral(g) {
    let sccs = utils.tarjanSCC(g.adj);
    let scc = sccs.reduce((max, s) => s.length > max.length ? s : max, []);
    let spec = utils.computeSpectral(g.adj, scc, 'right');
    return spec.lambda;
}

invar.push({
    model: "h=3 L_2",
    length_3_states: p3.states.length,
    length_5_states: p5.states.length,
    length_3_lambda: spectral(p3),
    length_5_lambda: spectral(p5)
});

fs.writeFileSync(`${OUT_DIR}/EDGE_EQUIVALENCE_AUDIT.json`, JSON.stringify(edge_eq_audit, null, 2));
fs.writeFileSync(`${OUT_DIR}/PROFILE_CLASSIFICATION_AUDIT.json`, JSON.stringify(prof_cls_audit, null, 2));
fs.writeFileSync(`${OUT_DIR}/SCC_SPECTRAL_CERTIFICATES.json`, JSON.stringify(scc_audit, null, 2));
fs.writeFileSync(`${OUT_DIR}/PERIOD_AUDIT.json`, JSON.stringify(period_audit, null, 2));
fs.writeFileSync(`${OUT_DIR}/Q_PARTITION_AUDIT.json`, JSON.stringify(q_partition_audit, null, 2));
fs.writeFileSync(`${OUT_DIR}/VARIANCE_METHOD_A.json`, JSON.stringify(variance_method_A_audit, null, 2));
fs.writeFileSync(`${OUT_DIR}/VARIANCE_METHOD_B.json`, JSON.stringify(variance_method_B_audit, null, 2));
fs.writeFileSync(`${OUT_DIR}/PRESSURE_CURVATURE_SPOTCHECK.json`, JSON.stringify(spotcheck_C, null, 2));
fs.writeFileSync(`${OUT_DIR}/PROFILE_BASELINE_RUN3B.json`, JSON.stringify(profile_baseline_arr, null, 2));
fs.writeFileSync(`${OUT_DIR}/H5_311_AUDIT.json`, JSON.stringify(h5_311_audit, null, 2));
fs.writeFileSync(`${OUT_DIR}/PRESENTATION_INVARIANCE_AUDIT.json`, JSON.stringify(invar, null, 2));

console.log("DONE");
