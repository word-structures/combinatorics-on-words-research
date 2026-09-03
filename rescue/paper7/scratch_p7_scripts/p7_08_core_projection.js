const fs = require('fs');

const alphabet = ['a', 'b', 'c', 'd'];

function getParikh(s) {
    let counts = {a:0, b:0, c:0, d:0};
    for(let i=0; i<s.length; i++) counts[s[i]]++;
    return counts;
}

function hasAbelianSquareEndingHere(s, max_h) {
    const len = s.length;
    for (let k = 1; k <= max_h; k++) {
        if (len < 2*k) continue;
        let right = s.slice(len - k, len);
        let left = s.slice(len - 2*k, len - k);
        let pR = getParikh(right);
        let pL = getParikh(left);
        if (pR.a === pL.a && pR.b === pL.b && pR.c === pL.c && pR.d === pL.d) {
            return true;
        }
    }
    return false;
}

function analyzeRecurrentSCC(h) {
    const L = Math.max(1, 2*h - 1);
    
    // We just do a DFS to find the language states
    // However, finding the full language of length L is easier:
    let states = [];
    function buildValid(prefix) {
        if (prefix.length === L) {
            states.push(prefix);
            return;
        }
        for (let c of alphabet) {
            let cand = prefix + c;
            if (!hasAbelianSquareEndingHere(cand, h)) {
                buildValid(cand);
            }
        }
    }
    
    // Actually, just generating from scratch is not constrained by wK.
    // Let's generate from wK as before.
    const wK = 'abcdacbabdabacdacbcdad';
    if (L > wK.length) return null;
    
    let startState = wK.slice(-L);
    let visited = new Set();
    let edges = new Map(); 
    
    let q = [startState];
    visited.add(startState);
    
    while(q.length > 0) {
        let u = q.shift();
        edges.set(u, []);
        for (let c of alphabet) {
            let cand = u + c;
            if (!hasAbelianSquareEndingHere(cand, h)) {
                let v = cand.slice(-L);
                edges.get(u).push(v);
                if (!visited.has(v)) {
                    visited.add(v);
                    q.push(v);
                }
            }
        }
    }
    
    let index = 0;
    let indices = new Map();
    let lowlink = new Map();
    let onStack = new Set();
    let stack = [];
    let sccs = [];
    
    function strongconnect(v) {
        indices.set(v, index);
        lowlink.set(v, index);
        index++;
        stack.push(v);
        onStack.add(v);
        
        let neighbors = edges.get(v) || [];
        for (let w of neighbors) {
            if (!indices.has(w)) {
                strongconnect(w);
                lowlink.set(v, Math.min(lowlink.get(v), lowlink.get(w)));
            } else if (onStack.has(w)) {
                lowlink.set(v, Math.min(lowlink.get(v), indices.get(w)));
            }
        }
        
        if (lowlink.get(v) === indices.get(v)) {
            let scc = [];
            let w;
            do {
                w = stack.pop();
                onStack.delete(w);
                scc.push(w);
            } while (w !== v);
            sccs.push(scc);
        }
    }
    
    for (let v of visited) {
        if (!indices.has(v)) strongconnect(v);
    }
    
    let recurrentSccs = sccs.filter(scc => scc.length > 1 || (edges.get(scc[0]) || []).includes(scc[0]));
    let maxScc = recurrentSccs.reduce((max, scc) => scc.length > max.length ? scc : max, []);
    return new Set(maxScc);
}

let prevScc = null;
for (let h = 1; h <= 8; h++) {
    let scc = analyzeRecurrentSCC(h);
    if (!scc) break;
    
    console.log(`\n--- h = ${h} ---`);
    console.log(`Recurrent Core size: ${scc.size}`);
    
    if (prevScc) {
        // Project current SCC down to h-1
        // State length at h is 2h-1, state length at h-1 is 2(h-1)-1 = 2h-3
        // So drop the first 2 characters
        let projected = new Set();
        for (let state of scc) {
            projected.add(state.slice(2));
        }
        console.log(`Projection size to h-${h-1}: ${projected.size}`);
        
        // Is it surjective onto the previous core?
        let missing = 0;
        for (let state of prevScc) {
            if (!projected.has(state)) missing++;
        }
        console.log(`Missing from previous core: ${missing}`);
    }
    
    prevScc = scc;
}
