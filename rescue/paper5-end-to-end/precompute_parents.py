import sympy as sp
from sympy import ZZ
from sympy.polys.matrices import DomainMatrix
from sympy.polys.matrices.normalforms import smith_normal_decomp
from itertools import product
from functools import lru_cache

ROLES = list("abcdef")
OUT = list("abc")
H6 = {'a':'ace','b':'adf','c':'bdf','d':'bdc','e':'afe','f':'bce'}
G3 = {
    'a':'bbbaabaaac','b':'bccacccbcc','c':'ccccbbbcbc',
    'd':'ccccccccaa','e':'bbbbbcabaa','f':'aaaaaaabaa'
}
PROFILES = {r: tuple(G3[r].count(c) for c in OUT) for r in ROLES}

Mh = sp.Matrix([[H6[c].count(r) for c in ROLES] for r in ROLES])
Q = sp.Matrix.vstack(*[v.T for v in (Mh**2).T.nullspace()])
Q_int = Q.applyfunc(lambda x: int(sp.lcm([v.q for v in Q])) * x if hasattr(x, 'q') else x)
for i in range(Q_int.shape[0]): Q_int[i,:] = Q_int[i,:] / sp.gcd(list(Q_int[i,:]))

Mg = sp.Matrix([[G3[c].count(r) for c in OUT] for r in ROLES]).T
dm = DomainMatrix([[ZZ(int(Mg[i,j])) for j in range(6)] for i in range(3)], (3,6), ZZ)
Ddm,Sdm,Tdm = smith_normal_decomp(dm)
D, S, T = Ddm.to_Matrix(), Sdm.to_Matrix(), Tdm.to_Matrix()
B = T[:,3:6]
A = Q_int * B
adjA = A.adjugate()
detA = int(A.det())
qvals = list(product(range(-4,5), range(-4,5), range(-2,3)))

@lru_cache(None)
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

print("Precomputing parents...")
DESC = {r: [(tuple(G3[r][:i].count(c) for c in OUT), tuple(G3[r][i:].count(c) for c in OUT)) for i in range(11)] for r in ROLES}
parents=set()
for a1,a2,a3 in product(ROLES,repeat=3):
    for p1,s1 in DESC[a1]:
        for p2,s2 in DESC[a2]:
            for p3,s3 in DESC[a3]:
                v=tuple(s1[j]+p2[j]-s2[j]-p3[j] for j in range(3))
                ss=dsol(v)
                for d in ss: parents.add((a1,a2,a3,d))
print("Parents:", len(parents))

with open("parents.txt", "w") as f:
    for p in parents:
        f.write(str(p) + "\n")
