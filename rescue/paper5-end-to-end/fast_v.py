from itertools import product
OUT = list("abc")
ROLES = list("abcdef")
G3 = {
    'a':'bbbaabaaac','b':'bccacccbcc','c':'ccccbbbcbc',
    'd':'ccccccccaa','e':'bbbbbcabaa','f':'aaaaaaabaa'
}
DESC = {r: [(tuple(G3[r][:i].count(c) for c in OUT), tuple(G3[r][i:].count(c) for c in OUT)) for i in range(11)] for r in ROLES}
vset = set()
for a1,a2,a3 in product(ROLES,repeat=3):
    for p1,s1 in DESC[a1]:
        for p2,s2 in DESC[a2]:
            for p3,s3 in DESC[a3]:
                v=tuple(s1[j]+p2[j]-s2[j]-p3[j] for j in range(3))
                vset.add(v)
print("Unique v:", len(vset))

Mg = [[G3[c].count(r) for c in OUT] for r in ROLES]
# Transpose Mg
Mg = [[Mg[j][i] for j in range(6)] for i in range(3)]

valid_v = set()
# Fast check using a small bounded search, or just dynamic programming
# We want Mg * x = v. Since Mg has non-negative entries, and v has small entries (bounds [4,4,2])
# Actually, v can have negative coordinates. But x is a difference of Parikh vectors, so x can have negative coordinates!
# Let's just use sympy for the 9418 v's, but parallelize or optimize.
