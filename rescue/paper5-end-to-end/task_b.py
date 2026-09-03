from collections import Counter
from itertools import product
import time
import json
import sympy as sp
from sympy import ZZ
from sympy.polys.matrices import DomainMatrix
from sympy.polys.matrices.normalforms import smith_normal_decomp

ROLES = list("abcdef")
OUT = list("abc")
H6 = {'a':'ace','b':'adf','c':'bdf','d':'bdc','e':'afe','f':'bce'}
G3_baseline = {
    'a':'bbbaabaaac','b':'bccacccbcc','c':'ccccbbbcbc',
    'd':'ccccccccaa','e':'bbbbbcabaa','f':'aaaaaaabaa'
}
PROFILES = {r: tuple(G3_baseline[r].count(c) for c in OUT) for r in ROLES}

def is_abelian_square_free(w):
    for i in range(len(w)):
        for L in range(1, (len(w)-i)//2 + 1):
            if Counter(w[i:i+L]) == Counter(w[i+L:i+2*L]): return False
    return True

# Prepare short checks
src = "a"
for _ in range(4): src = "".join(H6[c] for c in src)
sf_words = set()
for L in range(1, 4):
    for i in range(len(src)-L):
        w = src[i:i+L]
        if is_abelian_square_free(w): sf_words.add(w)

def check_short(H):
    for w in sf_words:
        hw = "".join(H[c] for c in w)
        if not is_abelian_square_free(hw): return False
    return True

Mh = sp.Matrix([[H6[c].count(r) for c in ROLES] for r in ROLES])
Q = sp.Matrix.vstack(*[v.T for v in (Mh**2).T.nullspace()])
Q_int = Q.applyfunc(lambda x: int(sp.lcm([v.q for v in Q])) * x if hasattr(x, 'q') else x)
for i in range(Q_int.shape[0]): Q_int[i,:] = Q_int[i,:] / sp.gcd(list(Q_int[i,:]))

def get_dsol(Mg):
    dm = DomainMatrix([[ZZ(int(Mg[i,j])) for j in range(6)] for i in range(3)], (3,6), ZZ)
    Ddm,Sdm,Tdm = smith_normal_decomp(dm)
    D, S, T = Ddm.to_Matrix(), Sdm.to_Matrix(), Tdm.to_Matrix()
    B = T[:,3:6]
    A = Q_int * B
    adjA = A.adjugate()
    detA = int(A.det())
    qvals = list(product(range(-4,5), range(-4,5), range(-2,3)))
    def dsol(v):
        vv=sp.Matrix(v)
        sv=S*vv
        if int(sv[2]) % 10: return tuple()
        y=sp.Matrix([int(sv[0]),int(sv[1]),int(sv[2])//10,0,0,0])
        x0=T*y
        q0=Q_int*x0
        out=[]
        for q in qvals:
            rhs=sp.Matrix(q)-q0
            num=adjA*rhs
            if all(int(num[i]) % detA == 0 for i in range(3)):
                z=sp.Matrix([int(num[i])//detA for i in range(3)])
                x=x0+B*z
                if Mg*x == vv: out.append(tuple(int(x[i]) for i in range(6)))
        return tuple(out)
    return dsol

def pv(w): return tuple(w.count(c) for c in OUT)
def add(a,b): return tuple(a[i]+b[i] for i in range(3))
def sub(a,b): return tuple(a[i]-b[i] for i in range(3))
def scale(c,a): return tuple(c*a[i] for i in range(3))
def prefix(w,d): return pv(w[:d])

def check_target_RR(H):
    Mg_x = sp.Matrix([[H[c].count(r) for c in OUT] for r in ROLES]).T
    dsol_x = get_dsol(Mg_x)
    DESC_x = {r: [(pv(H[r][:i]), pv(H[r][i:])) for i in range(11)] for r in ROLES}
    for a1,a2,a3 in product(ROLES,repeat=3):
        for p1,s1 in DESC_x[a1]:
            for p2,s2 in DESC_x[a2]:
                for p3,s3 in DESC_x[a3]:
                    v = tuple(s1[j]+p2[j]-s2[j]-p3[j] for j in range(3))
                    if dsol_x(v): return False
    return True

def geom(a1,a2,a3,i1,i2,i3,u):
    C = sub(PROFILES[a1], PROFILES[a2])
    dd = {}
    for coef, r, d in zip((-1, 2, -1), (a1, a2, a3), (i1, i2, i3)):
        if r == u:
            if d == 0: pass
            elif d == 10: C = add(C, scale(coef, PROFILES[r]))
            else: dd[d] = dd.get(d, 0) + coef
        else:
            C = add(C, scale(coef, prefix(G3_baseline[r], d)))
    return C, tuple(sorted((d, c) for d, c in dd.items() if c))

def reach_chain_with_prefix(rho, norm, z):
    d_z = len(z)
    pv_z = pv(z)
    for i in range(3):
        if pv_z[i] > rho[i]: return frozenset()
    choices = []
    for d, c in norm:
        if d <= d_z:
            choices.append([prefix(z, d)])
        else:
            valid_y = []
            for a in range(rho[0] - pv_z[0] + 1):
                for b in range(rho[1] - pv_z[1] + 1):
                    cc = (d - d_z) - a - b
                    if 0 <= cc <= rho[2] - pv_z[2]:
                        valid_y.append((pv_z[0]+a, pv_z[1]+b, pv_z[2]+cc))
            choices.append(valid_y)
    out = set()
    for ys in product(*choices):
        if not all(all(ys[j][i] <= ys[j+1][i] for i in range(3)) for j in range(len(ys)-1)):
            continue
        v = (0,0,0)
        for y, (d,c) in zip(ys, norm):
            v = add(v, scale(c, y))
        out.add(v)
    return frozenset(out)

# Need the fixed parent states (C, norm) for the target role
def get_parent_states(role):
    states = set()
    for a1,a2,a3 in product(ROLES, repeat=3):
        for i1,i2,i3 in product(range(11), repeat=3):
            C, norm = geom(a1, a2, a3, i1, i2, i3, role)
            if norm:
                states.add((C, norm))
    return states

# We also need to know which boundary targets `v` are valid.
# Wait! In Guided Synthesis, the target is PARTIALLY specified, so Mg_x is NOT fixed!
# The whole point of the partial target bridge is:
# "For a genuine RR outer-parent witness... parent possible iff -M_H d - C_G in sum_r R_sigma(rho_r)"
# Actually, the FULL_RR experiment computed exactly this.
# Instead of `dsol_x(v)` for unknown Mg_x, the method uses the original Mg? 
# Wait, if `H(r)` is unknown, then `Mg` is unknown.
# Ah! "The total Parikh profiles of H's images are fixed, so M_H is fixed."
# Because M_H only depends on the PROFILES, and we are searching for completions of a FIXED profile!
# So Mg is FIXED!
# So `dsol` from the baseline Mg is valid!

Mg_fixed = sp.Matrix([[G3_baseline[c].count(r) for c in OUT] for r in ROLES]).T
dsol_fixed = get_dsol(Mg_fixed)

def valid_v(v): return bool(dsol_fixed(v))

def run_task_b(role):
    rho = PROFILES[role]
    states = get_parent_states(role)
    
    metrics = {
        "guided_prefix_nodes": 0,
        "guided_reachable_queries": 0,
        "guided_infeasibility_prunes": 0,
        "guided_complete_words": 0,
        "guided_final_certificate_calls": 0,
        "accepted": [],
        "rejections": {}
    }
    
    def search(z, rem):
        metrics["guided_prefix_nodes"] += 1
        
        if len(z) < sum(rho):
            # Check feasibility for prefix z
            # A branch is pruned ONLY IF infeasibility of EVERY completion is proved.
            # That means, IF there is a parent constraint (C, norm) such that ALL reachable completions
            # yield a valid parent `v`.
            # Wait, we want to REJECT parents.
            # If for a completion x, `v(x) = C + sigma(x)` is valid (has parent), then x is rejected by RR.
            # The branch can be pruned if FOR EVERY completion x, there is SOME parent constraint that rejects it.
            # But the condition says: "prune ONLY if infeasibility of every completion is proved."
            # The standard sieve checks if there's a SINGLE parent constraint (C, norm) such that ALL completions x from z
            # satisfy `valid_v(C + sigma(x))`. If so, EVERY completion will be rejected by this constraint!
            # Wait, we want to AVOID parents. So if `valid_v(C + sigma(x))` is True for ALL completions, then NO completion avoids it!
            # R_sigma(rho | z) gives the set of all possible `sigma(x)` for completions of z.
            # If for some (C, norm), ALL elements `rv` in R_sigma(rho | z) make `valid_v(C + rv)` TRUE,
            # then EVERY completion will definitely trigger this parent, so it's a guaranteed Abelian square, prune!
            
            pruned = False
            for C, norm in states:
                metrics["guided_reachable_queries"] += 1
                R = reach_chain_with_prefix(rho, norm, z)
                if not R: 
                    # If R is empty, it means no valid chains exist. This shouldn't happen unless prefix violates something.
                    continue
                # Do all completions trigger this parent?
                if all(valid_v(add(C, rv)) for rv in R):
                    metrics["guided_infeasibility_prunes"] += 1
                    pruned = True
                    break
            
            if pruned: return
            
            for i, c in enumerate(OUT):
                if rem[i] > 0:
                    rr = list(rem); rr[i] -= 1
                    search(z + c, tuple(rr))
        else:
            # Leaf
            metrics["guided_complete_words"] += 1
            H_x = G3_baseline.copy()
            H_x[role] = z
            if not check_short(H_x):
                metrics["rejections"][z] = "REJECTED_SHORT"
                return
            
            metrics["guided_final_certificate_calls"] += 1
            if not check_target_RR(H_x):
                metrics["rejections"][z] = "REJECTED_LONG_PARENT"
                return
            
            metrics["accepted"].append(z)

    start = time.time()
    search("", rho)
    metrics["guided_wall_clock"] = time.time() - start
    
    with open(f"TASK_B_ROLE_{role}_MACHINE.json", "w") as f:
        json.dump(metrics, f, indent=2)
    print(f"Role {role} (Guided) Accepted:", metrics["accepted"])

run_task_b("f")
run_task_b("d")
