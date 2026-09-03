#!/usr/bin/env python3
from collections import defaultdict
from functools import lru_cache
from itertools import product
import json
import sympy as sp
from sympy import ZZ
from sympy.polys.matrices import DomainMatrix
from sympy.polys.matrices.normalforms import smith_normal_decomp

ROLES = list("abcdef")
OUT = list("abc")
H6 = {'a':'ace','b':'adf','c':'bdf','d':'bdc','e':'afe','f':'bce'}
G3 = {
    'a':'bbbaabaaac','b':'bccacccbcc','c':'ccccbbbcbc',
    'd':'ccccccccaa','e':'bbbbbcabaa','f':'aaaaaaabaa'
}

def M(morph, out, inp):
    return sp.Matrix([[morph[c].count(r) for c in inp] for r in out])

Mh = M(H6, ROLES, ROLES)
Mg = M(G3, OUT, ROLES)
Q = sp.Matrix.vstack(*[v.T for v in (Mh**2).T.nullspace()])
assert Q * (Mh**2) == sp.zeros(3,6)

def apply(word,m):
    return ''.join(m[c] for c in word)

H2 = {r:apply(H6[r],H6) for r in ROLES}
RIDX={r:i for i,r in enumerate(ROLES)}

def qword(w):
    cnt=[w.count(r) for r in ROLES]
    return tuple(int(sum(Q[i,j]*cnt[j] for j in range(6))) for i in range(3))

factor_q=[]
for x,y in product(ROLES,repeat=2):
    for a in range(10):
        for b in range(10):
            factor_q.append(qword(H2[x][a:] + H2[y][:b]))
fmin=[min(v[i] for v in factor_q) for i in range(3)]
fmax=[max(v[i] for v in factor_q) for i in range(3)]
CBOUND=tuple(fmax[i]-fmin[i] for i in range(3))
assert CBOUND == (4,4,2)

dm=DomainMatrix([[ZZ(int(Mg[i,j])) for j in range(6)] for i in range(3)], (3,6), ZZ)
Ddm,Sdm,Tdm=smith_normal_decomp(dm)
D,S,T=Ddm.to_Matrix(),Sdm.to_Matrix(),Tdm.to_Matrix()
B=T[:,3:6]
A=Q*B
adjA=A.adjugate()
detA=int(A.det())

qvals=list(product(range(-4,5),range(-4,5),range(-2,3)))

@lru_cache(None)
def dsol(v):
    vv=sp.Matrix(v)
    sv=S*vv
    if int(sv[2]) % 10:
        return tuple()
    y=sp.Matrix([int(sv[0]),int(sv[1]),int(sv[2])//10,0,0,0])
    x0=T*y
    q0=Q*x0
    out=[]
    for q in qvals:
        rhs=sp.Matrix(q)-q0
        num=adjA*rhs
        if all(int(num[i]) % detA == 0 for i in range(3)):
            z=sp.Matrix([int(num[i])//detA for i in range(3)])
            x=x0+B*z
            if Mg*x == vv:
                out.append(tuple(int(x[i]) for i in range(6)))
    return tuple(out)

def pv(w):
    return tuple(w.count(c) for c in OUT)

PROFILES={r:pv(G3[r]) for r in ROLES}
DESC={r:[(pv(G3[r][:i]),pv(G3[r][i:])) for i in range(11)] for r in ROLES}

def fixed_parent_set():
    parents=set(); vset=set(); witness_solutions=0
    for a1,a2,a3 in product(ROLES,repeat=3):
        for p1,s1 in DESC[a1]:
            for p2,s2 in DESC[a2]:
                for p3,s3 in DESC[a3]:
                    v=tuple(s1[j]+p2[j]-s2[j]-p3[j] for j in range(3))
                    vset.add(v)
                    ss=dsol(v)
                    witness_solutions += len(ss)
                    for d in ss:
                        parents.add((a1,a2,a3,d))
    return parents,vset,witness_solutions

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

WORDS={r:all_words(PROFILES[r]) for r in ROLES}

def add(a,b): return tuple(a[i]+b[i] for i in range(3))
def scale(c,a): return tuple(c*a[i] for i in range(3))
def sub(a,b): return tuple(a[i]-b[i] for i in range(3))

@lru_cache(None)
def comp(rho,d):
    out=[]
    for a in range(rho[0]+1):
        for b in range(rho[1]+1):
            c=d-a-b
            if 0<=c<=rho[2]:
                out.append((a,b,c))
    return tuple(out)

def prefix(w,d): return pv(w[:d])

def geom(a1,a2,a3,i1,i2,i3,u):
    C=sub(PROFILES[a1],PROFILES[a2])
    dd=defaultdict(int)
    for coef,r,d in zip((-1,2,-1),(a1,a2,a3),(i1,i2,i3)):
        if r==u:
            if d==0: pass
            elif d==10: C=add(C,scale(coef,PROFILES[r]))
            else: dd[d]+=coef
        else:
            C=add(C,scale(coef,prefix(G3[r],d)))
    return C,tuple(sorted((d,c) for d,c in dd.items() if c))

@lru_cache(None)
def reach_chain(rho,norm):
    if not norm: return frozenset({(0,0,0)})
    choices=[comp(rho,d) for d,c in norm]
    out=set()
    for ys in product(*choices):
        if not all(all(ys[j][i]<=ys[j+1][i] for i in range(3))
                   for j in range(len(ys)-1)):
            continue
        v=(0,0,0)
        for y,(d,c) in zip(ys,norm):
            v=add(v,scale(c,y))
        out.add(v)
    return frozenset(out)

@lru_cache(None)
def reach_independent(rho,norm):
    if not norm: return frozenset({(0,0,0)})
    out=set()
    for ys in product(*[comp(rho,d) for d,c in norm]):
        v=(0,0,0)
        for y,(d,c) in zip(ys,norm):
            v=add(v,scale(c,y))
        out.add(v)
    return frozenset(out)

@lru_cache(None)
def reach_literal(role,norm):
    out=set()
    for w in WORDS[role]:
        v=(0,0,0)
        for d,c in norm:
            v=add(v,scale(c,prefix(w,d)))
        out.add(v)
    return frozenset(out)

def partial_set(role, mode):
    rho=PROFILES[role]
    parents=set()
    signatures=set()
    for a1,a2,a3 in product(ROLES,repeat=3):
        states=set()
        for i1,i2,i3 in product(range(11),repeat=3):
            states.add(geom(a1,a2,a3,i1,i2,i3,role))
        for C,norm in states:
            signatures.add(norm)
            if mode=="chain": R=reach_chain(rho,norm)
            elif mode=="literal": R=reach_literal(role,norm)
            else: R=reach_independent(rho,norm)
            for rv in R:
                v=add(C,rv)
                for d in dsol(v):
                    parents.add((a1,a2,a3,d))
    return parents,signatures

fixed,vset,witness_solutions=fixed_parent_set()
res={
    "Q":[[int(Q[i,j]) for j in range(6)] for i in range(3)],
    "Q_Mh2_zero":True,
    "bounds":CBOUND,
    "fixed_g3":{
        "raw_splits":6**3*11**3,
        "unique_v":len(vset),
        "nonempty_v":sum(bool(dsol(v)) for v in vset),
        "solution_witnesses":witness_solutions,
        "unique_parents":len(fixed)
    },
    "roles":{}
}
for r in ROLES:
    exact,sigs=partial_set(r,"chain")
    literal,_=partial_set(r,"literal")
    coarse,_=partial_set(r,"coarse")
    sig_mismatch=sum(
        reach_chain(PROFILES[r],s)!=reach_literal(r,s) for s in sigs
    )
    res["roles"][r]={
        "profile":PROFILES[r],
        "literal_words":len(WORDS[r]),
        "signatures":len(sigs),
        "signature_mismatches":sig_mismatch,
        "exact_parents":len(exact),
        "literal_parents":len(literal),
        "coarse_parents":len(coarse),
        "missing":len(literal-exact),
        "spurious":len(exact-literal),
        "coarse_only":len(coarse-exact)
    }

with open("REPRODUCED_COUNTS.json","w") as f:
    json.dump(res,f,indent=2)
print(json.dumps(res,indent=2))
