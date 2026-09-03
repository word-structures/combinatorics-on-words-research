// dynamic_topology_mapper.js

function getParikh(str) {
    let p = [0, 0, 0];
    for (let i = 0; i < str.length; i++) {
        p[parseInt(str[i])]++;
    }
    return p;
}

function mapWindow({ L, start, K, sourceRoles, concreteBlocks, unresolvedRole, rho }) {
    let u = start;
    let v = (u + K) % L;
    let w = (u + 2 * K) % L;
    
    let m1 = Math.floor((u + K) / L);
    let m2 = Math.floor((u + 2 * K) / L);
    
    let q = Math.floor(K / L);
    let r = K % L;
    
    let domain = "";
    if (m2 === 2 * m1) {
        if (q === 0 && r >= 2 && u + 2 * r <= L - 1) domain = "Zs";
        else domain = "Z";
    } else if (m2 === 2 * m1 + 1) {
        if (q === 0 && r >= 2 && u + r <= L - 1 && u + 2 * r >= L) domain = "Pt";
        else domain = "P";
    } else if (m2 === 2 * m1 - 1) {
        if (q === 0 && r >= 2 && u + r >= L && u + 2 * r <= 2 * L - 1) domain = "Mt";
        else domain = "M";
    }
    
    let chi = [
        sourceRoles[0] === unresolvedRole ? 1 : 0,
        sourceRoles[m1] === unresolvedRole ? 1 : 0,
        sourceRoles[m2] === unresolvedRole ? 1 : 0
    ];
    
    let t = [0, 0, 0];
    
    if (m1 > 0) {
        let pB0 = (sourceRoles[0] === unresolvedRole) ? rho : getParikh(concreteBlocks[0]);
        for(let i=0; i<3; i++) t[i] += pB0[i];
        for (let i = 1; i < m1; i++) {
            let pBi = (sourceRoles[i] === unresolvedRole) ? rho : getParikh(concreteBlocks[i]);
            for(let j=0; j<3; j++) t[j] += pBi[j];
        }
    }
    if (m2 > m1) {
        let pBm1 = (sourceRoles[m1] === unresolvedRole) ? rho : getParikh(concreteBlocks[m1]);
        for(let i=0; i<3; i++) t[i] -= pBm1[i];
        for (let i = m1 + 1; i < m2; i++) {
            let pBi = (sourceRoles[i] === unresolvedRole) ? rho : getParikh(concreteBlocks[i]);
            for(let j=0; j<3; j++) t[j] -= pBi[j];
        }
    }
    
    let depths = [u, v, w];
    let coefs = [-1, +2, -1];
    let blocks = [0, m1, m2];
    
    let abstractSigMap = new Map();
    
    for (let i = 0; i < 3; i++) {
        let d = depths[i];
        let c = coefs[i];
        let b = blocks[i];
        
        if (d === 0) continue;
        
        if (chi[i] === 1) {
            abstractSigMap.set(d, (abstractSigMap.get(d) || 0) + c);
        } else {
            let prefix = concreteBlocks[b].substring(0, d);
            let pPrefix = getParikh(prefix);
            for(let j=0; j<3; j++) t[j] += c * pPrefix[j];
        }
    }
    
    let sigma = [];
    for (let [d, a] of abstractSigMap.entries()) {
        if (a !== 0) sigma.push({ d, a });
    }
    sigma.sort((a, b) => a.d - b.d);
    
    let p4_sigma = sigma.map(term => ({ d: term.d, a: -term.a }));
    let p4_t = t.map(val => -val);
    
    return {
        domain,
        chi,
        sigma: p4_sigma,
        t: p4_t
    };
}

module.exports = { mapWindow, getParikh };
