const fs = require('fs');

const wK = 'abcdacbabdabacdacbcdad';
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

function analyzeH(h) {
    const L = Math.max(1, 2*h - 1);
    
    // For h=0, technically no constraints, but min h is 1.
    // If wK is shorter than L, this simple state approach only works after we extend it to length L.
    // Since wK is length 22, it works perfectly for h <= 11.
    if (L > wK.length) {
        console.log(`h=${h} requires suffix length ${L} but wK is only ${wK.length}`);
        return;
    }
    
    let startState = wK.slice(-L);
    
    let visited = new Set();
    let edges = new Map(); // u -> [v1, v2...]
    
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
    
    // Find SCCs using Tarjan's
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
        if (!indices.has(v)) {
            strongconnect(v);
        }
    }
    
    let recurrentSccs = sccs.filter(scc => {
        // SCC is recurrent if it has >1 node OR it has 1 node with a self-loop
        if (scc.length > 1) return true;
        let v = scc[0];
        return (edges.get(v) || []).includes(v);
    });
    
    let numEdges = 0;
    for(let [u, neighbors] of edges) numEdges += neighbors.length;
    
    console.log(`\n--- h = ${h} (state length ${L}) ---`);
    console.log(`Reachable states: ${visited.size}`);
    console.log(`Edges: ${numEdges}`);
    console.log(`Total SCCs: ${sccs.length}`);
    console.log(`Recurrent SCCs: ${recurrentSccs.length}`);
    
    if (recurrentSccs.length > 0) {
        console.log(`Recurrent SCC sizes: ${recurrentSccs.map(s => s.length).join(', ')}`);
        // Check if there is a single giant component
        let maxScc = recurrentSccs.reduce((max, scc) => scc.length > max.length ? scc : max, []);
        console.log(`Largest SCC size: ${maxScc.length}`);
        
        // Find if startState can reach a recurrent SCC
        // Since we only explored reachable states, ANY recurrent SCC found IS reachable from startState!
        console.log(`Infinite right continuation exists in A_4^(<=h)? YES`);
    } else {
        console.log(`Infinite right continuation exists in A_4^(<=h)? NO`);
    }
}

for (let h = 1; h <= 11; h++) {
    analyzeH(h);
}
