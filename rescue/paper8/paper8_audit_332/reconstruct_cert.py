import mpmath
from mpmath import iv
import numpy as np
import json
import scipy.sparse as sp
from scipy.sparse.csgraph import connected_components
import sys

iv.dps = 53  # Double precision should be plenty for this, interval arithmetic guarantees enclosure.

# Load the matrix data
NPZ = r"C:\abc-worktrees\profile-response-baseline-h2-h7-2026-08-25\paper8_audit_332\checkpoint\PAPER8_332_REPAIRED_THEOREM_CHECKPOINT_v1_2026-09-03\data\a_tilt_quotient_pid1.npz"
Z = np.load(NPZ)
br = Z['rows'].astype(np.int32)
bc = Z['cols'].astype(np.int32)
tar = Z['target'].astype(int)
mult = Z['mult'].astype(float)
sizes = Z['sizes'].astype(float)
K = len(sizes)

# Hard dominant SCC
A0 = sp.csr_matrix((np.ones((tar==0).sum()), (br[tar==0], bc[tar==0])), shape=(K,K))
n, lab = connected_components(A0, directed=True, connection='strong')
G = (lab == np.argmax(np.bincount(lab)))

def setup_orientation(reverse=False):
    rr, cc = (bc, br) if reverse else (br, bc)
    from collections import deque
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
    return rr, cc, exp, z0, G

rr_f, cc_f, exp_f, z0_f, G_f = setup_orientation(False)
rr_r, cc_r, exp_r, z0_r, G_r = setup_orientation(True)

def interval_matrix_power(a, b, reverse, steps=44):
    rr, cc, exp_arr, _, _ = (rr_r, cc_r, exp_r, z0_r, G_r) if reverse else (rr_f, cc_f, exp_f, z0_f, G_f)
    
    # We construct the sparse interval matrix bounds explicitly to avoid heavy objects
    # M(x)_{i,j} = mult * x^{exp}
    # Since x in [a,b] >= 0, x^{exp} is monotonic.
    # Lower bound = mult * a^{exp}
    # Upper bound = mult * b^{exp}
    
    a_iv = iv.mpf(str(a))
    b_iv = iv.mpf(str(b))
    
    L_vals = []
    U_vals = []
    for m, e in zip(mult, exp_arr):
        if e == 0:
            val = iv.mpf(m)
        else:
            val = iv.mpf(m) * (iv.mpf([a_iv, b_iv]) ** int(e))
        L_vals.append(val.a) # lower bound
        U_vals.append(val.b) # upper bound
        
    L_csr = sp.csr_matrix((L_vals, (rr, cc)), shape=(K,K))
    U_csr = sp.csr_matrix((U_vals, (rr, cc)), shape=(K,K))
    
    # We need to compute A^44 where A is an interval matrix.
    # Since all elements are >= 0, (AB)_L >= A_L B_L and (AB)_U <= A_U B_U.
    # So we can just matrix-multiply the bounds!
    
    M_L = L_csr
    M_U = U_csr
    
    # We only need M^{44} applied to z0, and M^{44} applied to r.
    # Wait, we need the FULL M^{44} matrix bounds to compute alpha_Q?
    # alpha_Q = sum_j min_i Q_{ij}. We need the dense bounds, or at least min over all i.
    # But K=10191. M^{44} is dense! Dense 10191x10191 is 800MB per matrix, we have L and U, which is fine.
    # Actually, we don't need the full dense matrix. We can do power iterations on vectors.
    return M_L, M_U

# To avoid dense matrices, we can use the specific r vector.
# But wait, alpha_Q requires min_i (A r_j / A r_i)? No, Q_{ij} = A_{ij} r_j / (Ar)_i.
# So alpha_Q >= sum_j min_i (A_{ij}^{lower} r_j / (A^{upper} r)_i ).
# We DO need min_i A_{ij}^{lower}. 
# This means we DO need the j-th column of A^{lower}.
# Is A^{44} fully dense?
# If we compute a few columns of A^{44}, we can find the ones with largest contribution to alpha_Q.
# Wait, alpha_Q is the Birkhoff contraction. A row-stochastic surrogate matrix has positive columns.
# We don't need to sum over ALL j. alpha_Q >= sum_{j in subset} min_i Q_{ij}.
# If we pick a subset of j (e.g. the ones in the dominant SCC), we can get a good enough lower bound!
# Let's just pick one state j that is very well connected (e.g. inside G) and compute A e_j.
pass
