const fs = require('fs');
const utils = require('./utils.js');

const OUT_DIR = 'scratch/profile-response-baseline-h2-h7-2026-08-25/run_3_formula_correction';

let global_poisson_res = 0;
let global_collatz_width = 0;
let edge_eq_mismatches = 0;
let prof_cls_mismatches = 0;
let prof_edge_residuals = 0;
let unique_dom_scc_status = "PASS";
let dom_period_status = "PASS";
let max_r_res=0, max_l_res=0, max_rs_res=0, max_st_res=0;

// output collections
let profile_baseline_arr = [];
let perron_parry_audit = [];
let variance_method_A_audit = [];
let variance_method_B_audit = [];
let q_partition_audit = [];
let period_audit = [];
let scc_audit = [];
let spotcheck_C = [];

let a_b_disagreement = 0;
let max_slope_spread = 0;

for (let h=2; h<=7; h++) {
    console.log(`Processing h=${h}`);
    const L = 2*h - 1;
    let old_states = [];
    
    // Gen OLD states (avoid K in 2..h-1)
    const total_combinations = Math.pow(3, L);
    for (let i=0; i<total_combinations; i++) {
        let arr = [];
        let temp = i;
        for (let j=0; j<L; j++) {
            arr.unshift(temp % 3);
            temp = Math.floor(temp / 3);
        }
        if (!utils.hasAbelianSquare(arr, 2, h-1)) {
            old_states.push(arr);
        }
    }
    
    if (h === 2) {
        // verify K=1 is not forbidden
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
    let adj = Array.from({length: N}, () => []);
    let deleted_edges = [];
    
    for (let i=0; i<N; i++) {
        for (let x=0; x<3; x++) {
            let next_word = [...old_states[i], x]; // length 2h
            // OLD edges: target state (last 2h-1 chars) is OLD-valid
            let target = next_word.slice(1);
            if (!utils.hasAbelianSquare(target, 2, h-1)) {
                let target_idx = -1;
                // find target index
                // for small L, just string compare or binary search. Let's do string map.
            }
        }
    }
}
