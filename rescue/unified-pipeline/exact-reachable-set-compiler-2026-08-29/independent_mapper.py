import json

def get_parikh(s):
    p = [0,0,0]
    for c in s: p[int(c)] += 1
    return p

def format_sigma(sig_map):
    res = []
    for d in sorted(sig_map.keys()):
        if sig_map[d] != 0:
            res.append({'d': d, 'a': sig_map[d]})
    return res

def map_window(L, start, K, sourceRoles, concreteBlocks, unresolvedRole, rho):
    u = start
    v = (u + K) % L
    w = (u + 2*K) % L
    
    q = K // L
    r = K % L
    
    m1 = (u + K) // L
    m2 = (u + 2*K) // L
    
    # Domain
    domain = ""
    if m2 == 2 * m1:
        if q == 0 and r >= 2 and u + 2 * r <= L - 1:
            domain = "Zs"
        else:
            domain = "Z"
    elif m2 == 2 * m1 + 1:
        if q == 0 and r >= 2 and u + r <= L - 1 and u + 2 * r >= L:
            domain = "Pt"
        else:
            domain = "P"
    elif m2 == 2 * m1 - 1:
        if q == 0 and r >= 2 and u + r >= L and u + 2 * r <= 2 * L - 1:
            domain = "Mt"
        else:
            domain = "M"
            
    # Role mask
    chi = [
        1 if sourceRoles[0] == unresolvedRole else 0,
        1 if sourceRoles[m1] == unresolvedRole else 0,
        1 if sourceRoles[m2] == unresolvedRole else 0
    ]
    
    # t
    t = [0, 0, 0]
    
    if m1 > 0:
        pB0 = rho if sourceRoles[0] == unresolvedRole else get_parikh(concreteBlocks[0])
        for i in range(3): t[i] += pB0[i]
        for i in range(1, m1):
            pBi = rho if sourceRoles[i] == unresolvedRole else get_parikh(concreteBlocks[i])
            for j in range(3): t[j] += pBi[j]
            
    if m2 > m1:
        pBm1 = rho if sourceRoles[m1] == unresolvedRole else get_parikh(concreteBlocks[m1])
        for i in range(3): t[i] -= pBm1[i]
        for i in range(m1 + 1, m2):
            pBi = rho if sourceRoles[i] == unresolvedRole else get_parikh(concreteBlocks[i])
            for j in range(3): t[j] -= pBi[j]
            
    # Fractional
    depths = [u, v, w]
    coefs = [-1, 2, -1]
    blocks = [0, m1, m2]
    
    sig_map = {}
    for d, c, b, ch in zip(depths, coefs, blocks, chi):
        if d == 0: continue
        if ch == 1:
            sig_map[d] = sig_map.get(d, 0) + c
        else:
            prefix = concreteBlocks[b][:d]
            pPrefix = get_parikh(prefix)
            for j in range(3): t[j] += c * pPrefix[j]
            
    # Convert to P4 sign convention
    p4_sigma = {}
    for d, a in sig_map.items():
        if a != 0: p4_sigma[d] = -a
        
    p4_t = [-x for x in t]
    
    return {
        "domain": domain,
        "chi": "".join(map(str, chi)),
        "sigma": format_sigma(p4_sigma),
        "t": p4_t,
        "q": q,
        "r": r
    }
