#!/usr/bin/env python3
from math import gcd
import json

def decompose(s,K,L,m):
    q,r=divmod(K,L)
    b=[]; i=[]
    for j in range(m+1):
        bj,ij=divmod(s+j*K,L)
        b.append(bj); i.append(ij)
    c=[1 if i[j]+r>=L else 0 for j in range(m)]
    g=[b[j+1]-b[j] for j in range(m)]
    d=[b[j]-2*b[j+1]+b[j+2] for j in range(m-1)]
    return q,r,b,i,c,g,d

def mech(i0,r,L,m):
    return [((i0+(j+1)*r)//L)-((i0+j*r)//L) for j in range(m)]

def carry_identity():
    cases=0; fails=[]
    for L in range(2,26):
      for s in range(0,3*L):
       for K in range(1,4*L+1):
        for m in range(2,8):
            q,r,b,i,c,g,d=decompose(s,K,L,m)
            cm=mech(i[0],r,L,m)
            cases+=1
            ok=(c==cm
                and all(g[j]==q+c[j] for j in range(m))
                and all(d[j]==c[j+1]-c[j] for j in range(m-1))
                and all(i[j]-2*i[j+1]+i[j+2]==-L*d[j] for j in range(m-1)))
            if not ok:
                fails.append((L,s,K,m,q,r,b,i,c,g,d,cm))
                return cases,fails
    return cases,fails

def cyclic_factor_sum(c,a,h):
    n=len(c)
    return sum(c[(a+j)%n] for j in range(h))

def mechanical_checks():
    cases=0; fails=[]
    # All slopes to L=80; selected deterministic intercepts.
    for L in range(2,81):
      for r in range(L):
        g=gcd(L,r) if r else L
        p=1 if r==0 else L//g
        expected_ones=0 if r==0 else r//g
        expected_trans=0 if r==0 else 2*min(r//g,(L-r)//g)
        ints=sorted(set([0,L-1,L//2,(L//3),(2*L//3)]))
        for i0 in ints:
            c=mech(i0,r,L,p)
            cases+=1
            if sum(c)!=expected_ones:
                fails.append(("ones",L,r,i0,p,sum(c),expected_ones,c)); return cases,fails
            trans=sum(c[j]!=c[(j+1)%p] for j in range(p))
            if trans!=expected_trans:
                fails.append(("trans",L,r,i0,p,trans,expected_trans,c)); return cases,fails
            # deterministic balance check over all h and cyclic starts, but only selected intercepts
            for h in range(1,p+1):
                vals=[cyclic_factor_sum(c,a,h) for a in range(p)]
                if max(vals)-min(vals)>1:
                    fails.append(("balance",L,r,i0,p,h,min(vals),max(vals),c)); return cases,fails
    return cases,fails

def curvature_chain_checks():
    cases=0; fails=[]
    for L in range(2,101):
      for r in range(L):
        p=1 if r==0 else L//gcd(L,r)
        for i0 in sorted(set([0,L-1,L//2])):
            c=mech(i0,r,L,p+12)
            d=[c[j+1]-c[j] for j in range(len(c)-1)]
            nz=[x for x in d if x]
            cases+=1
            if any(nz[j]==nz[j+1] for j in range(len(nz)-1)):
                fails.append(("nonzero_not_alternating",L,r,i0,c,d)); return cases,fails
            cp=mech(i0,r,L,p+1)
            dp=[cp[j+1]-cp[j] for j in range(p)]
            if sum(dp)!=0:
                fails.append(("period_curvature_sum",L,r,i0,cp,dp)); return cases,fails
    return cases,fails

def branch_map():
    out={}
    for a,b in [(0,0),(0,1),(1,0),(1,1)]:
        out[f"{a}{b}"]=b-a
    return out

def run():
    a,b=carry_identity()
    c,d=mechanical_checks()
    e,f=curvature_chain_checks()
    return {
      "carry_identity":{"cases":a,"failures":b},
      "mechanical_period_balance":{"cases":c,"failures":d},
      "curvature_chain":{"cases":e,"failures":f},
      "branch_map":branch_map()
    }

if __name__=="__main__":
    print(json.dumps(run(),indent=2))
