const fs = require('fs');

function is_aa2f_direct(w) {
    for (let len = 2; len <= Math.floor(w.length / 2); len++) {
        for (let i = 0; i <= w.length - 2 * len; i++) {
            let c1 = [0,0,0], c2 = [0,0,0];
            for (let j = 0; j < len; j++) c1[w.charCodeAt(i+j)-97]++;
            for (let j = 0; j < len; j++) c2[w.charCodeAt(i+len+j)-97]++;
            if (c1[0]===c2[0] && c1[1]===c2[1] && c1[2]===c2[2]) return false;
        }
    }
    return true;
}

function get_witnesses_with_letter(w, c_appended) {
    let res = [];
    let n = w.length;
    for (let len = 2; len <= Math.floor(n / 2); len++) {
        let i = n - 2 * len;
        let c1 = [0,0,0], c2 = [0,0,0];
        for (let j = 0; j < len; j++) c1[w.charCodeAt(i+j)-97]++;
        for (let j = 0; j < len; j++) c2[w.charCodeAt(i+len+j)-97]++;
        if (c1[0]===c2[0] && c1[1]===c2[1] && c1[2]===c2[2]) {
            res.push({ K: len, blocked_c: c_appended });
        }
    }
    return res;
}

function get_R_detailed(w) {
    let r_list = [];
    let valid_c = '';
    for (let c of ['a','b','c']) {
        if (!is_aa2f_direct(w + c)) {
            let wit = get_witnesses_with_letter(w + c, c);
            wit.forEach(obj => r_list.push(obj));
        } else {
            valid_c = c;
        }
    }
    return { r_list, valid_c };
}

let MAX_N = 18;

let complete_subset_tests = 0;
let censored_subset_tests = 0;
let total_runs_ge_3 = 0;
let max_observed_run_len = 0;

let hall_deficient = false;
let s3_consecutive = null;
let s3_partly = null;
let s3_fully = null;
let min_deficient_size = 999;

let smallest_new_tight = null;

function subset_to_array(mask, r) {
    let res = [];
    for (let i = 0; i < r; i++) if (mask & (1 << i)) res.push(i);
    return res;
}

function process_run(C, is_complete) {
    let r = C.r;
    if (r >= 3) total_runs_ge_3++;
    if (r > max_observed_run_len) max_observed_run_len = r;
    
    for (let mask = 1; mask < (1 << r); mask++) {
        let I = subset_to_array(mask, r);
        if (I.length < 3) continue;
        
        if (is_complete) complete_subset_tests++;
        else censored_subset_tests++;
        
        let union_set = new Set();
        for (let i of I) {
            for (let obj of C.R_detailed[i].r_list) union_set.add(obj.K);
        }
        let deficiency = I.length - union_set.size;
        
        if (deficiency > 0) {
            hall_deficient = true;
            if (I.length < min_deficient_size) min_deficient_size = I.length;
            
            if (I.length === 3) {
                let i = I[0], j = I[1], k = I[2];
                let is_j_i = (j === i + 1);
                let is_k_j = (k === j + 1);
                let spec = { w: C.states[0], I, R: I.map(idx => C.R_detailed[idx]) };
                
                if (is_j_i && is_k_j) {
                    if (!s3_consecutive) s3_consecutive = spec;
                } else if (!is_j_i && !is_k_j) {
                    if (!s3_fully) s3_fully = spec;
                } else {
                    if (!s3_partly) s3_partly = spec;
                }
            }
        } else if (deficiency === 0 && !is_complete) {
            if (!smallest_new_tight || I.length < smallest_new_tight.size) {
                smallest_new_tight = { 
                    w: C.states[0], I, size: I.length, 
                    R_sets: I.map(idx => Array.from(new Set(C.R_detailed[idx].r_list.map(o=>o.K)))) 
                };
            }
        }
    }
}

function dfs(w, current_corridor) {
    let valids = [];
    for (let c of ['a','b','c']) {
        if (is_aa2f_direct(w + c)) valids.push(c);
    }
    
    let is_forced = (valids.length === 1);

    if (is_forced) {
        let next_corridor = { 
            r: current_corridor.r + 1, 
            R_detailed: [...current_corridor.R_detailed, get_R_detailed(w)],
            states: [...current_corridor.states, w]
        };
        if (w.length < MAX_N) {
            dfs(w + valids[0], next_corridor);
        } else {
            process_run(next_corridor, false);
        }
    } else {
        if (current_corridor.r > 0) {
            process_run(current_corridor, true);
        }
        if (w.length < MAX_N) {
            for (let v of valids) {
                dfs(w + v, { r: 0, R_detailed: [], states: [] });
            }
        }
    }
}

console.log("Starting DFS for G006-L LOCAL HALL MICROPROBE...");
dfs("", { r: 0, R_detailed: [], states: [] });

console.log("\n=== COMPARE WITH OLD CENSUS ===");
console.log("Nontrivial subset tests in COMPLETE runs:", complete_subset_tests);
console.log("Nontrivial subset tests in MAX_N-ended runs:", censored_subset_tests);
console.log("Total tests:", complete_subset_tests + censored_subset_tests);
console.log("Did added runs change Hall verdict?", hall_deficient);
console.log("Total observed forced runs length >= 3:", total_runs_ge_3);
console.log("Maximum observed run length:", max_observed_run_len);

console.log("\n=== s=3 TARGET ===");
console.log("s3_consecutive:", s3_consecutive ? JSON.stringify(s3_consecutive) : "None");
console.log("s3_partly:", s3_partly ? JSON.stringify(s3_partly) : "None");
console.log("s3_fully:", s3_fully ? JSON.stringify(s3_fully) : "None");

console.log("\n=== GENERAL MINIMAL DEFICIENCY ===");
console.log("Any Hall deficient subset?", hall_deficient);
if (hall_deficient) console.log("Smallest deficient size:", min_deficient_size);

console.log("\n=== NEWLY EXPOSED TIGHT CONFIGURATION ===");
console.log("Smallest Hall-tight config from censored runs:", smallest_new_tight ? JSON.stringify(smallest_new_tight) : "None");
