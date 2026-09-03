const fs = require('fs');

function getDomains(L) {
    let Z = [], P = [], M = [], Zs = [], Pt = [], Mt = [];
    
    // Unrestricted
    for (let u = 0; u < L; u++) {
        for (let v = 0; v < L; v++) {
            for (let w = 0; w < L; w++) {
                if (u + w === 2 * v) Z.push([u, v, w]);
                if (u + w === 2 * v - L) P.push([u, v, w]);
                if (u + w === 2 * v + L) M.push([u, v, w]);
            }
        }
    }
    
    // Truncated
    for (let a = 0; a < L; a++) {
        for (let r = 2; r <= L; r++) {
            // Zs
            if (a + 2 * r <= L - 1) Zs.push([a, a + r, a + 2 * r]);
            
            // Pt
            if (a + r <= L - 1 && a + 2 * r >= L && a + 2 * r - L < L) Pt.push([a, a + r, a + 2 * r - L]);
            
            // Mt
            if (a + r >= L && a + r - L < L && a + 2 * r <= 2 * L - 1 && a + 2 * r - L < L) Mt.push([a, a + r - L, a + 2 * r - L]);
        }
    }
    
    return { Z, P, M, Zs, Pt, Mt };
}

function red(u, v, w, c0, c1, c2) {
    let counts = {};
    if (c0 !== 0 && u !== 0) counts[u] = (counts[u] || 0) + c0;
    if (c1 !== 0 && v !== 0) counts[v] = (counts[v] || 0) - 2 * c1;
    if (c2 !== 0 && w !== 0) counts[w] = (counts[w] || 0) + c2;
    
    let parts = [];
    for (let k in counts) {
        if (counts[k] !== 0) {
            parts.push(`${counts[k]}e_${k}`);
        }
    }
    if (parts.length === 0) return "0";
    return parts.sort().join(" + ");
}

function getFamily(domain, c0, c1, c2) {
    let set = new Set();
    for (let pt of domain) {
        set.add(red(pt[0], pt[1], pt[2], c0, c1, c2));
    }
    return Array.from(set).sort();
}

function runTest() {
    let allPassed = true;
    for (let L = 5; L <= 100; L++) {
        let doms = getDomains(L);
        let families = {
            "E": getFamily(doms.Z, 0, 0, 0),
            "Zs-A": getFamily(doms.Zs, 1, 1, 1),
            "Z-O": getFamily(doms.Z, 0, 0, 1),
            "Z-C": getFamily(doms.Z, 0, 1, 0),
            "Z-M": getFamily(doms.Z, 0, 1, 1),
            "Z-OO": getFamily(doms.Z, 1, 0, 1),
            "Z-A": getFamily(doms.Z, 1, 1, 1),
            "P-O": getFamily(doms.P, 0, 0, 1),
            "P-C": getFamily(doms.P, 0, 1, 0),
            "P-M": getFamily(doms.P, 0, 1, 1),
            "P-OO": getFamily(doms.P, 1, 0, 1),
            "P-A": getFamily(doms.P, 1, 1, 1),
            "Pt-M": getFamily(doms.Pt, 1, 1, 0),
            "M-O": getFamily(doms.M, 1, 0, 0),
            "M-C": getFamily(doms.M, 0, 1, 0),
            "M-M": getFamily(doms.M, 0, 1, 1),
            "M-OO": getFamily(doms.M, 1, 0, 1),
            "M-A": getFamily(doms.M, 1, 1, 1),
            "Mt-M": getFamily(doms.Mt, 0, 1, 1)
        };
        
        let keys = Object.keys(families);
        if (keys.length !== 19) throw "Not 19 families";
        
        for (let i = 0; i < keys.length; i++) {
            for (let j = i + 1; j < keys.length; j++) {
                let f1 = families[keys[i]];
                let f2 = families[keys[j]];
                if (f1.length === f2.length && JSON.stringify(f1) === JSON.stringify(f2)) {
                    console.log(`L=${L} COLLISION: ${keys[i]} === ${keys[j]}`);
                    fs.writeFileSync('PAPER4_19_FAMILY_DISTINCTNESS_CHECK_RESULTS_2026-08-29.json', JSON.stringify({
                        status: "FAILED",
                        L: L,
                        collision: [keys[i], keys[j]],
                        f1: f1
                    }, null, 2));
                    process.exit(1);
                }
            }
        }
    }
    
    fs.writeFileSync('PAPER4_19_FAMILY_DISTINCTNESS_CHECK_RESULTS_2026-08-29.json', JSON.stringify({
        status: "PASS",
        L_tested: [5, 100],
        message: "All 19 families distinct for all tested L"
    }, null, 2));
    console.log("All L passed!");
}

runTest();
