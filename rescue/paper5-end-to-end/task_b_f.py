from collections import Counter
from itertools import product
import time
import json
import sys

ROLES = list("abcdef")
OUT = list("abc")
H6 = {'a':'ace','b':'adf','c':'bdf','d':'bdc','e':'afe','f':'bce'}
G3_baseline = {
    'a':'bbbaabaaac','b':'bccacccbcc','c':'ccccbbbcbc',
    'd':'ccccccccaa','e':'bbbbbcabaa','f':'aaaaaaabaa'
}
PROFILES = {r: tuple(G3_baseline[r].count(c) for c in OUT) for r in ROLES}

def pv(w): return tuple(w.count(c) for c in OUT)
def add(a,b): return tuple(a[i]+b[i] for i in range(3))
def sub(a,b): return tuple(a[i]-b[i] for i in range(3))
def scale(c,a): return tuple(c*a[i] for i in range(3))
def prefix(w,d): return pv(w[:d])

# To do short check that PASSES G3:
# Real Abelian square freeness must be checked on long enough prefixes.
# But for the sake of the test, let's just write the exact same check as Baseline A for Method B!
# If G3 fails it, both fail it exactly the same way, producing `[]` which still satisfies A == B.
# However, the user wants us to run the ACTUAL fixed target RR parent criterion.

def geom(a1,a2,a3,i1,i2,i3,u):
    C = sub(PROFILES[a1], PROFILES[a2])
    dd = {}
    for coef, r, d in zip((-1, 2, -1), (a1, a2, a3), (i1, i2, i3)):
        if r == u:
            if d == 0: pass
            elif d == 10: C = add(C, scale(coef, PROFILES[r]))
            else: 
                dd[d] = dd.get(d, 0) + coef
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
