import sympy as sp
from sympy import ZZ
from sympy.polys.matrices import DomainMatrix
from sympy.polys.matrices.normalforms import smith_normal_decomp

ROLES = list("abcdef")
OUT = list("abc")
G3 = {
    'a':'bbbaabaaac','b':'bccacccbcc','c':'ccccbbbcbc',
    'd':'ccccccccaa','e':'bbbbbcabaa','f':'aaaaaaabaa'
}
Mg = sp.Matrix([[G3[c].count(r) for c in ROLES] for r in OUT])
print("Mg:\n", Mg)

dm = DomainMatrix([[ZZ(int(Mg[i,j])) for j in range(6)] for i in range(3)], (3,6), ZZ)
Ddm,Sdm,Tdm = smith_normal_decomp(dm)
D, S, T = Ddm.to_Matrix(), Sdm.to_Matrix(), Tdm.to_Matrix()

print("D:\n", D)
