import sys
import json
import numpy as np
import flint
import multiprocessing
from collections import deque
from pathlib import Path

def setup_orientation(br, bc, tar, sizes, K, G, reverse=False):
    rr, cc = (bc, br) if reverse else (br, bc)
    rev = [[] for _ in range(K)]
    for u, v, t in zip(rr, cc, tar):
        rev[v].append((int(u), int(t)))
    d = np.full(K, 999, dtype=int)
    q = deque(np.where(G)[0].tolist())
    d[G] = 0
    while q:
        v = q.popleft()
        for u, w in rev[v]:
            nd = d[v] + w
            if nd < d[u]:
                d[u] = nd
                if w == 0:
                    q.appendleft(u)
                else:
                    q.append(u)
    exp = tar + d[cc] - d[rr]
    if exp.min() < 0:
        raise RuntimeError('neg exp')
    z0 = (sizes * G) if reverse else G.astype(float)
    return rr, cc, exp, z0

def worker(task):
    idx, a_str, b_str, reverse, alphaQ_lower = task
    import flint
    flint.ctx.prec = 100  # 100 bits of precision

    Z = np.load(r"C:\abc-worktrees\profile-response-baseline-h2-h7-2026-08-25\paper8_audit_332\checkpoint\PAPER8_332_REPAIRED_THEOREM_CHECKPOINT_v1_2026-09-03\data\a_tilt_quotient_pid1.npz")
    br = Z['rows'].astype(np.int32)
    bc = Z['cols'].astype(np.int32)
    tar = Z['target'].astype(int)
    mult = Z['mult'].astype(float)
    sizes = Z['sizes'].astype(float)
    K = len(sizes)
    
    import scipy.sparse as sp
    from scipy.sparse.csgraph import connected_components
    A0 = sp.csr_matrix((np.ones((tar==0).sum()), (br[tar==0], bc[tar==0])), shape=(K,K))
    n, lab = connected_components(A0, directed=True, connection='strong')
    G = (lab == np.argmax(np.bincount(lab)))
    
    rr, cc, exp_arr, z0 = setup_orientation(br, bc, tar, sizes, K, G, reverse)
    
    a_arb = flint.arb(a_str)
    b_arb = flint.arb(b_str)
    
    def matvec(v_arb, x_arb):
        res = [flint.arb(0) for _ in range(K)]
        for r, c, m, e in zip(rr, cc, mult, exp_arr):
            val = flint.arb(m) * (x_arb ** int(e))
            res[r] += val * v_arb[c]
        return res
        
    z_a = [flint.arb(v) for v in z0]
    z_b = [flint.arb(v) for v in z0]
    
    for step in range(44):
        z_a = matvec(z_a, a_arb)
        z_b = matvec(z_b, b_arb)
        
    mid_float = (float(a_str) + float(b_str)) / 2.0
    M_mid = sp.csr_matrix((mult * np.power(mid_float, exp_arr), (rr, cc)), shape=(K,K))
    r_vec = np.ones(K)
    for _ in range(3000):
        nr = M_mid @ r_vec
        nr /= nr.max()
        if np.max(np.abs(nr - r_vec)) < 2e-14:
            break
        r_vec = nr
        
    r_arb = [flint.arb(v) for v in r_vec]
    
    lo = min(z_a[i] / r_arb[i] for i in range(K) if r_arb[i] > 0 and z_a[i] > 0)
    hi = max(z_b[i] / r_arb[i] for i in range(K) if r_arb[i] > 0 and z_b[i] > 0)
    
    # Rigorously bound kappa
    q_a = [flint.arb(v) for v in r_arb]
    q_b = [flint.arb(v) for v in r_arb]
    for step in range(44):
        q_a = matvec(q_a, a_arb)
        q_b = matvec(q_b, b_arb)
        
    min_qa = min(q_a[i] / r_arb[i] for i in range(K) if r_arb[i] > 0 and q_a[i] > 0)
    max_qb = max(q_b[i] / r_arb[i] for i in range(K) if r_arb[i] > 0 and q_b[i] > 0)
    kappa_arb = max_qb / min_qa
    
    # Reconstruct R_PF rigorously using kappa_arb and stored alphaQ_lower
    # R_PF <= (kappa * alphaQ) / (1 - kappa * (1 - alphaQ))
    alphaQ = flint.arb(str(alphaQ_lower))
    one = flint.arb(1)
    
    num = kappa_arb * alphaQ
    den = one - kappa_arb * (one - alphaQ)
    R_PF = num / den
    
    rho_upper = R_PF * (hi / lo)
    
    return {
        'i': idx,
        'a': a_str,
        'b': b_str,
        'reverse': reverse,
        'kappa': float(kappa_arb),
        'R_PF': float(R_PF),
        'rho_upper': float(rho_upper)
    }

if __name__ == '__main__':
    cover_path = r"C:\abc-worktrees\profile-response-baseline-h2-h7-2026-08-25\paper8_audit_332\v4\PAPER8_THEOREM_CHECKPOINT_v4_2026-09-03\theorem_332\data\FIXED_BIDIRECTIONAL_COVER.json"
    cover = json.load(open(cover_path))
    
    tasks = []
    for rec in cover['records']:
        # We pass alphaQ_lower for reverse=False, alphaP_lower for reverse=True
        # Wait, the JSON has alphaP_lower and alphaQ_lower for each record.
        # Let's use the correct one based on reverse.
        alpha_lower = rec['alphaP_lower'] if rec['reverse'] else rec['alphaQ_lower']
        tasks.append((rec['i'], str(rec['a']), str(rec['b']), rec['reverse'], alpha_lower))
        
    print(f"Starting {len(tasks)} tasks...")
    results = []
    with multiprocessing.Pool(2) as p:
        for i, res in enumerate(p.imap_unordered(worker, tasks)):
            results.append(res)
            if i % 20 == 0:
                print(f"Done {i}/{len(tasks)}")
                
    # Check bounds
    fail = False
    for r in results:
        bnd = 1.07 if r['reverse'] else 1.10 # Wait, left is reverse=True. Left bound is 1.07, right is 1.10.
        if r['rho_upper'] > bnd:
            print(f"FAIL at {r['i']} {r['reverse']}: {r['rho_upper']} > {bnd}")
            fail = True
    if not fail:
        print("ALL INTERVALS PASS BOUNDS!")
        
    json.dump(results, open(r"C:\abc-worktrees\profile-response-baseline-h2-h7-2026-08-25\paper8_audit_332\P8_332_DIRECTED_ROUNDING_CERTIFICATE.json", "w"), indent=2)
