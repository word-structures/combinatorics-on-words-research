const fs = require('fs');

function hasAbelianSquare(word, minK, maxK) {
    const n = word.length;
    for (let k = minK; k <= maxK; k++) {
        const len = 2 * k;
        if (len > n) continue;
        for (let i = 0; i <= n - len; i++) {
            const counts = [0, 0, 0];
            for (let j = 0; j < k; j++) counts[word[i + j]]++;
            for (let j = 0; j < k; j++) counts[word[i + k + j]]--;
            if (counts[0] === 0 && counts[1] === 0 && counts[2] === 0) return true;
        }
    }
    return false;
}

function getParikh(word) {
    const c = [0,0,0];
    for (let i=0; i<word.length; i++) c[word[i]]++;
    return c;
}

function exactB(v, h) {
    return 3*(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]) - h*h;
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((v,i) => v === b[i]);
}

function tarjanSCC(adj) {
    const n = adj.length;
    let index = 0;
    const indices = new Int32Array(n).fill(-1);
    const lowlink = new Int32Array(n).fill(-1);
    const onStack = new Uint8Array(n);
    const stack = [];
    const sccs = [];

    function strongconnect(v) {
        indices[v] = index;
        lowlink[v] = index;
        index++;
        stack.push(v);
        onStack[v] = 1;

        for (let i=0; i<adj[v].length; i++) {
            let w = adj[v][i];
            if (indices[w] === -1) {
                strongconnect(w);
                lowlink[v] = Math.min(lowlink[v], lowlink[w]);
            } else if (onStack[w]) {
                lowlink[v] = Math.min(lowlink[v], indices[w]);
            }
        }

        if (lowlink[v] === indices[v]) {
            const scc = [];
            let w;
            do {
                w = stack.pop();
                onStack[w] = 0;
                scc.push(w);
            } while (w !== v);
            sccs.push(scc);
        }
    }

    for (let i=0; i<n; i++) {
        if (indices[i] === -1) strongconnect(i);
    }
    return sccs;
}

function getPeriod(adj, sccNodes) {
    const n = adj.length;
    const inScc = new Uint8Array(n);
    for(let u of sccNodes) inScc[u] = 1;
    
    const levels = new Int32Array(n).fill(-1);
    let gcd = 0;
    function getGcd(a, b) {
        a = Math.abs(a); b = Math.abs(b);
        while (b) { let t = b; b = a % b; a = t; }
        return a;
    }

    const start = sccNodes[0];
    levels[start] = 0;
    const q = [start];
    let head = 0;
    while(head < q.length) {
        let u = q[head++];
        for (let v of adj[u]) {
            if (!inScc[v]) continue;
            if (levels[v] === -1) {
                levels[v] = levels[u] + 1;
                q.push(v);
            } else {
                const diff = Math.abs(levels[u] + 1 - levels[v]);
                if (diff > 0) gcd = getGcd(gcd, diff);
            }
        }
    }
    return gcd === 0 ? 1 : gcd; // if tree, return 1
}

function computeSpectral(adj, sccNodes, direction) {
    const N = sccNodes.length;
    const map = new Int32Array(adj.length).fill(-1);
    for(let i=0; i<N; i++) map[sccNodes[i]] = i;
    
    const out = Array.from({length: N}, () => []);
    const inp = Array.from({length: N}, () => []);
    for(let u of sccNodes) {
        for(let v of adj[u]) {
            if(map[v] !== -1) {
                out[map[u]].push(map[v]);
                inp[map[v]].push(map[u]);
            }
        }
    }
    
    let r = new Float64Array(N).fill(1);
    let lambda_upper = 1e9, lambda_lower = 0;
    
    let iter = 0;
    for(; iter<50000; iter++) {
        let next_r = new Float64Array(N);
        let max_r = 0;
        for(let i=0; i<N; i++) {
            let sr = 0;
            const edges = direction === 'right' ? out[i] : inp[i];
            for(let v of edges) sr += r[v];
            next_r[i] = sr;
            if(sr > max_r) max_r = sr;
        }
        
        let cu = 0, cl = 1e9;
        for(let i=0; i<N; i++) {
            let ratio = next_r[i] / r[i];
            if(ratio > cu) cu = ratio;
            if(ratio < cl) cl = ratio;
        }
        lambda_upper = cu;
        lambda_lower = cl;
        
        for(let i=0; i<N; i++) {
            r[i] = next_r[i] / max_r;
        }
        
        if ((lambda_upper - lambda_lower) / lambda_lower < 1e-11) {
            break;
        }
    }
    
    return {
        lambda: (lambda_upper + lambda_lower) / 2,
        vec: r,
        lambda_upper,
        lambda_lower,
        collatz_width: (lambda_upper - lambda_lower) / lambda_lower,
        out, inp
    };
}

function solveVarianceMethodA(N, out, P_func, f, pi) {
    let g = new Float64Array(N);
    let iter = 0;
    for(; iter<20000; iter++) {
        let Pg = new Float64Array(N);
        for(let i=0; i<N; i++) {
            let sum = 0;
            for(let j of out[i]) sum += P_func(i, j) * g[j];
            Pg[i] = sum;
        }
        let next_g = new Float64Array(N);
        let pidot = 0;
        for(let i=0; i<N; i++) {
            next_g[i] = f[i] + Pg[i];
            pidot += pi[i] * next_g[i];
        }
        for(let i=0; i<N; i++) next_g[i] -= pidot;
        
        let max_diff = 0;
        for(let i=0; i<N; i++) {
            let d = Math.abs(next_g[i] - g[i]);
            if(d > max_diff) max_diff = d;
            g[i] = next_g[i];
        }
        if (max_diff < 1e-12) break;
    }
    
    let Pg = new Float64Array(N);
    for(let i=0; i<N; i++) {
        let sum = 0;
        for(let j of out[i]) sum += P_func(i, j) * g[j];
        Pg[i] = sum;
    }
    
    let poisson_res = 0;
    for(let i=0; i<N; i++) {
        poisson_res = Math.max(poisson_res, Math.abs(g[i] - Pg[i] - f[i]));
    }
    
    let a_A = 0;
    let a_check = 0;
    for(let i=0; i<N; i++) {
        a_A += pi[i] * (2 * f[i] * g[i] - f[i] * f[i]);
        a_check += pi[i] * (f[i] * f[i] + 2 * f[i] * Pg[i]);
    }
    
    return { a_A, a_check, poisson_res, g, Pg };
}

function solveVarianceMethodB(N, out, P_func, f, pi) {
    let S0 = new Float64Array(N).fill(0);
    let S0_2 = new Float64Array(N).fill(0);
    let mass = new Float64Array(N);
    for(let i=0; i<N; i++) mass[i] = pi[i];
    
    const steps = [1000, 2000, 3000, 4000, 5000];
    const vars = [];
    
    for(let n=1; n<=5000; n++) {
        let S1 = new Float64Array(N);
        let S1_2 = new Float64Array(N);
        for(let i=0; i<N; i++) {
            for(let j of out[i]) {
                let p = P_func(i, j);
                S1[j] += p * (S0[i] + f[j]*mass[i]);
                S1_2[j] += p * (S0_2[i] + 2*f[j]*S0[i] + f[j]*f[j]*mass[i]);
            }
        }
        S0 = S1;
        S0_2 = S1_2;
        
        if (steps.includes(n)) {
            let exp_Sn = 0, exp_Sn2 = 0;
            for(let i=0; i<N; i++) {
                exp_Sn += S0[i];
                exp_Sn2 += S0_2[i];
            }
            vars.push(exp_Sn2 - exp_Sn*exp_Sn);
        }
    }
    
    let slopes = [];
    for(let i=0; i<vars.length-1; i++) {
        slopes.push((vars[i+1] - vars[i]) / 1000);
    }
    
    return { a_B: slopes[slopes.length-1], max_spread: Math.max(...slopes) - Math.min(...slopes) };
}

function solveVarianceMethodC(N, out, X_func) {
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
    const val_0 = p(0);
    const val_e = p(e), val_me = p(-e);
    const val_2e = p(2*e), val_m2e = p(-2*e);
    return (-val_2e + 16*val_e - 30*val_0 + 16*val_me - val_m2e) / (12 * e * e);
}

module.exports = {
    hasAbelianSquare, getParikh, exactB, arraysEqual, tarjanSCC, getPeriod,
    computeSpectral, solveVarianceMethodA, solveVarianceMethodB, solveVarianceMethodC
};
