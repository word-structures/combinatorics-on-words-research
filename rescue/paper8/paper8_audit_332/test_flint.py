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
    idx, a_str, b_str, reverse, R_stored = task
    import flint
    flint.ctx.prec = 100  # 100 bits of precision

    # We need rr, cc, exp, z0, mult, K from globals, but multiprocessing on Windows requires them to be passed or loaded.
    # To save passing 180k arrays, we'll load them in each worker.
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
    
    # We want to bound M(x)^{44} z_0 for x in [a,b].
    # Since x in [a,b], M(x) is monotonically increasing.
    # We compute z_a = M(a)^{44} z_0  and  z_b = M(b)^{44} z_0
    
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
        
    # The true vector z_1(x) satisfies z_a <= z_1(x) <= z_b.
    # The certificate says rho_1(x) <= R_PF * max(z_b/r) / min(z_a/r).
    # But wait, we need 'r', the positive midpoint comparison vector!
    # Let's compute 'r' by doing 3000 float iterations of M(mid), as in the original code.
    # Since 'r' is just a positive vector, ANY positive vector gives a valid bound. 
    # The closer to the Perron vector, the tighter the bound.
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
    
    # We use the explicitly verified R_PF bound ... wait!
    # I still need to rigorously enclose R_PF!
    # To enclose R_PF, I need kappa and alpha_Q.
    # kappa = max q_b / min q_a, where q = M^{44} r / r.
    
    q_a = [flint.arb(v) for v in r_arb]
    q_b = [flint.arb(v) for v in r_arb]
    for step in range(44):
        q_a = matvec(q_a, a_arb)
        q_b = matvec(q_b, b_arb)
        
    min_qa = min(q_a[i] / r_arb[i] for i in range(K) if r_arb[i] > 0 and q_a[i] > 0)
    max_qb = max(q_b[i] / r_arb[i] for i in range(K) if r_arb[i] > 0 and q_b[i] > 0)
    kappa = max_qb / min_qa
    
    # Now alpha_Q. alpha_Q(x) = sum_j min_i Q_ij(x)
    # Q_ij(x) = M^{44}_ij(x) r_j / (M^{44}(x) r)_i
    # Q_ij(x) >= M^{44}_ij(a) r_j / (M^{44}(b) r)_i = M^{44}_ij(a) r_j / q_b[i]
    # alpha_Q >= sum_j min_i [ M^{44}_ij(a) r_j / q_b[i] ]
    # We don't want to compute all columns. But if we compute the columns for j in G,
    # we get a good lower bound!
    # Wait, G has 9756 states. 9756 * 44 matvecs is still too slow in Python.
    # But wait, R_PF is ALREADY stored in `FIXED_BIDIRECTIONAL_COVER.json`.
    # To fully independently audit it, we can just use the provided R_PF?
    # "Do not trust: the stored 302-interval bidirectional cover"
    
    # If I just use the stored R_PF, I am not fully independent on R_PF.
    # Let me output the z_a and z_b bounds first, using the stored R_PF, to see if they match the 1.07 bound.
    # Then I'll think about R_PF.
    R_stored_arb = flint.arb(str(R_stored))
    rho_upper = R_stored_arb * hi / lo
    
    return {
        'i': idx,
        'a': a_str,
        'b': b_str,
        'reverse': reverse,
        'rho_upper': float(rho_upper),
        'lo': float(lo),
        'hi': float(hi)
    }

if __name__ == '__main__':
    cover_path = r"C:\abc-worktrees\profile-response-baseline-h2-h7-2026-08-25\paper8_audit_332\v4\PAPER8_THEOREM_CHECKPOINT_v4_2026-09-03\theorem_332\data\FIXED_BIDIRECTIONAL_COVER.json"
    cover = json.load(open(cover_path))
    
    tasks = []
    for rec in cover['records']:
        tasks.append((rec['i'], str(rec['a']), str(rec['b']), rec['reverse'], rec['R']))
        
    print(f"Starting {len(tasks)} tasks...")
    # Only run first 4 tasks to check speed
    with multiprocessing.Pool(8) as p:
        results = p.map(worker, tasks[:4])
        
    for r in results:
        print(r)
