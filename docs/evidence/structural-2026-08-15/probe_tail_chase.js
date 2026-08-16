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

function is_aa2f_prefix(w) {
    let p = [[0,0,0]];
    for (let i = 0; i < w.length; i++) {
        let next = [...p[p.length-1]];
        next[w.charCodeAt(i)-97]++;
        p.push(next);
    }
    for (let len = 2; len <= Math.floor(w.length / 2); len++) {
        for (let i = 0; i <= w.length - 2 * len; i++) {
            let mid = i + len;
            let end = i + 2 * len;
            if (p[mid][0] - p[i][0] === p[end][0] - p[mid][0] &&
                p[mid][1] - p[i][1] === p[end][1] - p[mid][1] &&
                p[mid][2] - p[i][2] === p[end][2] - p[mid][2]) return false;
        }
    }
    return true;
}

function is_aa2f(w) {
    let a = is_aa2f_direct(w);
    let b = is_aa2f_prefix(w);
    if (a !== b) throw new Error("Predicate disagreement on " + w);
    return a;
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
    for (let c of ['a','b','c']) {
        if (!is_aa2f(w + c)) {
            let wit = get_witnesses_with_letter(w + c, c);
            wit.forEach(obj => r_list.push(obj));
        }
    }
    return { r_list };
}

let w = "abccaabacbbaa";
console.log("=== EXACT FORCED CHAIN RECONSTRUCTION ===");
let states = [];
let R_sets = [];

let step = 0;
while (true) {
    let valids = [];
    for (let c of ['a','b','c']) {
        if (is_aa2f(w + c)) valids.push(c);
    }
    
    let R_det = get_R_detailed(w);
    let R_mapped = Array.from(new Set(R_det.r_list.map(x=>x.K))).sort((a,b)=>a-b);
    let witnesses = {};
    for (let c of ['a','b','c']) {
        if (!valids.includes(c)) {
            witnesses[c] = R_det.r_list.filter(x=>x.blocked_c===c).map(x=>x.K).sort((a,b)=>a-b);
        }
    }
    
    console.log(`Step ${step} | len ${w.length} | w = ${w}`);
    console.log(`  Legal next: [${valids.join(',')}]`);
    if (valids.length === 1) {
        console.log(`  Forced letter: ${valids[0]}`);
    }
    console.log(`  R(w) = [${R_mapped.join(',')}]`);
    console.log(`  Witnesses: ${JSON.stringify(witnesses)}`);
    
    if (valids.length === 1) {
        states.push(w);
        R_sets.push(R_mapped);
        w += valids[0];
        step++;
        if (step > 500) {
            console.log("\nRIGHT-CENSORED AT +500");
            break;
        }
    } else {
        console.log(`\nNatural termination length: ${step} steps (Total len ${w.length})`);
        break;
    }
}

console.log("\n=== REVALIDATION OF s=5 HALL DEFICIENCY ===");
if (step >= 6) { // we need states 0,1,2,4,5
    let I = [0,1,2,4,5];
    let union = new Set();
    I.forEach(idx => R_sets[idx].forEach(k => union.add(k)));
    console.log(`I = ${JSON.stringify(I)}`);
    for(let idx of I) console.log(`R_${idx} = [${R_sets[idx].join(',')}]`);
    console.log(`Union size: ${union.size}`);
    console.log(`Deficiency = ${I.length} - ${union.size} = ${I.length - union.size}`);
} else {
    console.log("Run terminated before step 5! Cannot revalidate.");
}

console.log("\n=== PREFIX SCALE CREDIT ===");
let min_q = 999;
let omega_j = new Set();
for (let j = 1; j <= R_sets.length; j++) {
    R_sets[j-1].forEach(k => omega_j.add(k));
    let q = omega_j.size - j;
    if (q < min_q) min_q = q;
}
console.log(`Minimum q_j over the run: ${min_q}`);

console.log("\n=== TERMINAL SUPPORT INEQUALITY ===");
if (step <= 500) {
    // naturally terminated
    let r = R_sets.length;
    let omega_C = new Set();
    R_sets.forEach(set => set.forEach(k => omega_C.add(k)));
    console.log(`|Omega(C)| = ${omega_C.size}`);
    console.log(`|C| = ${r}`);
    console.log(`Diff: ${omega_C.size - r}`);
} else {
    console.log("Not complete, terminal support N/A");
}

