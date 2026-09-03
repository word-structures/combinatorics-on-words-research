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

def pv(w): return tuple(w.count(c) for c in OUT)

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

def check_target_RR(H):
    # Returns True if it HAS NO parents (i.e. avoids long Abelian squares)
    Mg_x = sp.Matrix([[H[c].count(r) for c in OUT] for r in ROLES]).T
    dsol_x = get_dsol(Mg_x)
    DESC_x = {r: [(pv(H[r][:i]), pv(H[r][i:])) for i in range(11)] for r in ROLES}
    
    # We just need to find ONE valid parent to reject it.
    for a1,a2,a3 in product(ROLES,repeat=3):
        for p1,s1 in DESC_x[a1]:
            for p2,s2 in DESC_x[a2]:
                for p3,s3 in DESC_x[a3]:
                    v = tuple(s1[j]+p2[j]-s2[j]-p3[j] for j in range(3))
                    if dsol_x(v): return False # Has a parent, rejected!
    return True

def all_words(rho):
    L=sum(rho); out=[]
    def rec(pref,rem):
        if len(pref)==L:
            out.append(''.join(pref)); return
        for i,c in enumerate(OUT):
            if rem[i]:
                rr=list(rem); rr[i]-=1
                rec(pref+c,tuple(rr))
    rec('',tuple(rho))
    return out

def run_task_a(role):
    words = all_words(PROFILES[role])
    metrics = {
        "baseline_prefix_nodes": 0,
        "baseline_complete_words": len(words),
        "baseline_short_checks": 0,
        "baseline_final_certificate_calls": 0,
        "accepted": [],
        "rejections": {}
    }
    start = time.time()
    for w in words:
        H_x = G3_baseline.copy()
        H_x[role] = w
        metrics["baseline_short_checks"] += 1
        if not check_short(H_x):
            metrics["rejections"][w] = "REJECTED_SHORT"
            continue
        metrics["baseline_final_certificate_calls"] += 1
        if not check_target_RR(H_x):
            metrics["rejections"][w] = "REJECTED_LONG_PARENT"
            continue
        metrics["accepted"].append(w)
    metrics["baseline_wall_clock"] = time.time() - start
    with open(f"TASK_A_ROLE_{role}_MACHINE.json", "w") as f:
        json.dump(metrics, f, indent=2)
    print(f"Role {role} Accepted:", metrics["accepted"])

run_task_a("f")
run_task_a("d")
