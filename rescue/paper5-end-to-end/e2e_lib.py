import time
import json
import tracemalloc
from collections import Counter
from itertools import product
from ast import literal_eval
import sys

ROLES = list("abcdef")
OUT = list("abc")
H6 = {'a':'ace','b':'adf','c':'bdf','d':'bdc','e':'afe','f':'bce'}
G3 = {
    'a':'bbbaabaaac','b':'bccacccbcc','c':'ccccbbbcbc',
    'd':'ccccccccaa','e':'bbbbbcabaa','f':'aaaaaaabaa'
}
PROFILES = {r: tuple(G3[r].count(c) for c in OUT) for r in ROLES}

# Load parents
parents = set()
with open("parents.txt") as f:
    for line in f:
        parents.add(literal_eval(line.strip()))

def is_abelian_square_free(w):
    for i in range(len(w)):
        for L in range(1, (len(w)-i)//2 + 1):
            if Counter(w[i:i+L]) == Counter(w[i+L:i+2*L]): return False
    return True

src = "a"
for _ in range(5):
    src = "".join(H6[c] for c in src)
sf_words = set()
for L in range(1, 6):
    for i in range(len(src)-L):
        w = src[i:i+L]
        if is_abelian_square_free(w): sf_words.add(w)

def check_short(H):
    for w in sf_words:
        hw = "".join(H[c] for c in w)
        if not is_abelian_square_free(hw): return False
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

def add(a,b): return tuple(a[i]+b[i] for i in range(3))
def scale(c,a): return tuple(c*a[i] for i in range(3))
def sub(a,b): return tuple(a[i]-b[i] for i in range(3))
def pv(w): return tuple(w.count(c) for c in OUT)
def prefix(w,d): return pv(w[:d])

def geom(a1,a2,a3,i1,i2,i3,u):
    C=sub(PROFILES[a1],PROFILES[a2])
    dd={}
    for coef,r,d in zip((-1,2,-1),(a1,a2,a3),(i1,i2,i3)):
        if r==u:
            if d==0: pass
            elif d==10: C=add(C,scale(coef,PROFILES[r]))
            else:
                if d not in dd: dd[d]=0
                dd[d]+=coef
        else:
            C=add(C,scale(coef,prefix(G3[r],d)))
    return C,tuple(sorted((d,c) for d,c in dd.items() if c))

@lru_cache(None)
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
