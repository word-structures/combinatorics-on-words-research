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
    Q_int[i,:] = Q_int[i,:] / sp.gcd(list(Q_int[i,:]))

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
adjA = A.adjugate()
detA = int(A.det())

qvals = list(product(range(-4,5), range(-4,5), range(-2,3))) # Using the CBOUND (4,4,2)

unique_v = set()
solution_witnesses = set()
unique_parents = set()

# Raw splits are combinations of prefix and suffix of length 10.
# A boundary target v is a vector of length 3 (difference in Parikh vectors).
# The code in full_rr_partial_target_experiment.py has fixed_g3 numbers.
# We will just generate from qvals.
# qvals are the possible values for q = Q * v.
# To find solutions for a given v, we need D * y = S * v.
# Since we only iterate qvals (which is Q * v), we can just test all v in some box?
# Rao-Rosenfeld: We don't iterate v directly. We know Mg * x = v. So Q * Mg * x = Q * v.
# Wait, Q * Mh^2 = 0. The equation is Parikh(L) = M_H * d + v.
# Multiply by Q: Q * Parikh(L) = Q * M_H * d + Q * v => 0 = 0 + Q * v.
# So Q * v MUST BE 0. Wait, no. The equation is for the difference between the two blocks of an occurrence.
# Actually, the boundary target v has bounded Q-projection.
# The previous script had:
# def dsol(v):
#    sv=S*v
#    if sv[2] % 10: return ()
#    y = sp.Matrix([sv[0], sv[1], sv[2]//10, 0, 0, 0])
#    x0 = T * y
#    q0 = Q * x0
#    ...
#    if Mg*x == v: out.append(x)
# But how did it iterate `v`?
# In full_rr_partial_target_experiment.py, how is `v` generated?
# Ah, it iterates `word_boundary_vectors`.
