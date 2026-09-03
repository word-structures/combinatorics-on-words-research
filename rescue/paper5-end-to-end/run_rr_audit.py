import sympy as sp
from sympy import ZZ
from sympy.polys.matrices import DomainMatrix
from sympy.polys.matrices.normalforms import smith_normal_decomp
from itertools import product
import json

ROLES = list("abcdef")
OUT = list("abc")
H6 = {'a':'ace','b':'adf','c':'bdf','d':'bdc','e':'afe','f':'bce'}
Mh = sp.Matrix([[H6[c].count(r) for c in ROLES] for r in ROLES])
Mh2 = Mh**2
ns = Mh2.T.nullspace()
Q = sp.Matrix.vstack(*[v.T for v in ns])
Q_int = Q.applyfunc(lambda x: int(sp.lcm([v.q for v in Q])) * x if hasattr(x, 'q') else x)
for i in range(Q_int.shape[0]):
    row_gcd = sp.gcd(list(Q_int[i,:]))
    Q_int[i,:] = Q_int[i,:] / row_gcd

def apply_h6(w): return "".join(H6[c] for c in w)
H2 = {r: apply_h6(H6[r]) for r in ROLES}

def qword(w):
    cnt = [w.count(r) for r in ROLES]
    return tuple(int(sum(Q_int[i,j]*cnt[j] for j in range(6))) for i in range(3))

factor_q = []
for x, y in product(ROLES, repeat=2):
    for a in range(10):
        for b in range(10):
            suff = H2[x][-a:] if a > 0 else ""
            pref = H2[y][:b]
            factor_q.append(qword(suff + pref))

fmin = [min(v[i] for v in factor_q) for i in range(3)]
fmax = [max(v[i] for v in factor_q) for i in range(3)]
CBOUND = tuple(fmax[i] - fmin[i] for i in range(3))

G3 = {
    'a':'bbbaabaaac','b':'bccacccbcc','c':'ccccbbbcbc',
    'd':'ccccccccaa','e':'bbbbbcabaa','f':'aaaaaaabaa'
}
Mg = sp.Matrix([[G3[c].count(r) for c in OUT] for r in ROLES]).T
dm = DomainMatrix([[ZZ(int(Mg[i,j])) for j in range(6)] for i in range(3)], (3,6), ZZ)
Ddm,Sdm,Tdm = smith_normal_decomp(dm)
D, S, T = Ddm.to_Matrix(), Sdm.to_Matrix(), Tdm.to_Matrix()

B = T[:,3:6]
A = Q_int * B

audit_res = {
    "Q_derived": [[int(x) for x in row] for row in Q_int.tolist()],
    "CBOUND": [int(x) for x in CBOUND],
    "D": [[int(x) for x in row] for row in D.tolist()],
    "A_det": int(A.det())
}
with open("02_RR_PARENT_GENERATOR_MACHINE.json", "w") as f:
    json.dump(audit_res, f, indent=2)

print("Done")
