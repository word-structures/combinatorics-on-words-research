#!/usr/bin/env python3
from collections import defaultdict, Counter
from itertools import combinations
import json

C=(1,-2,1)

def combine(terms):
    d={}
    for i,c in terms:
        if i:
            d[i]=d.get(i,0)+c
    return tuple(sorted((i,c) for i,c in d.items() if c))

def direct_records(mask,L,kmin=2):
    n=len(mask); N=n*L
    out=[]
    for s in range(N):
        maxK=(N-s)//2
        for K in range(kmin,maxK+1):
            bs=[]; rs=[]; terms=[]
            for q,t in enumerate((s,s+K,s+2*K)):
                if t==N:
                    b=n; r=0
                else:
                    b,r=divmod(t,L)
                    if r and mask[b]:
                        terms.append((r,C[q]))
                bs.append(b); rs.append(r)
            out.append((tuple(bs),tuple(rs),combine(terms)))
    return out

def direct_support(mask,L,kmin=2):
    return {sig for _,_,sig in direct_records(mask,L,kmin)}

def motif_support(mask,L,kmin=2):
    n=len(mask); N=n*L
    out=set()
    for b0 in range(n):
      for i0 in range(L):
        t0=b0*L+i0
        for b1 in range(b0,n):
          for i1 in range(L):
            K=(b1*L+i1)-t0
            if K<kmin: continue
            t2=t0+2*K
            if t2>N: continue
            if t2==N: b2=n; i2=0
            else: b2,i2=divmod(t2,L)
            terms=[]
            for q,(b,i) in enumerate(((b0,i0),(b1,i1),(b2,i2))):
                if b<n and i and mask[b]:
                    terms.append((i,C[q]))
            out.add(combine(terms))
    return out

def Cfam(L,delta):
    out=set()
    for i0 in range(1,L):
      for i1 in range(1,L):
        i2=2*i1-i0-L*delta
        if 1<=i2<L:
            sig=combine(((i0,1),(i1,-2),(i2,1)))
            if sig: out.add(sig)
    return out

def curvset(mask):
    B=[i for i,v in enumerate(mask) if v]
    return {a-2*b+c for a,b,c in combinations(B,3) if a-2*b+c in (-1,0,1)}

def triple_actual(mask,L):
    n=len(mask); out=set()
    for bs,rs,sig in direct_records(mask,L,2):
        if any(b>=n for b in bs): continue
        if not (bs[0]<bs[1]<bs[2]): continue
        if all(mask[b] and r for b,r in zip(bs,rs)) and sig:
            out.add(sig)
    return out

def triple_expected(mask,L):
    out=set()
    for d in curvset(mask): out |= Cfam(L,d)
    return out

def outer_actual(mask,L,a,c):
    out=set()
    for bs,rs,sig in direct_records(mask,L,2):
        if bs[0]==a and bs[2]==c and rs[0] and rs[2]:
            out.add(sig)
    return out

def outer_expected(mask,L,a,c):
    d=c-a; out=set()
    if d%2==0:
        m=(a+c)//2
        for i in range(1,L):
          for j in range(1,L):
            if (i-j)%2: continue
            r=(i+j)//2
            terms=[(i,1),(j,1)]
            if mask[m]: terms.append((r,-2))
            out.add(combine(terms))
    else:
        left=(a+c)//2; right=left+1
        for i in range(1,L):
          for j in range(1,L):
            if (d*L+j-i)%2: continue
            s=i+j; terms=[(i,1),(j,1)]
            if s<L:
                r=(L+s)//2
                if mask[left]: terms.append((r,-2))
            elif s>L:
                r=(s-L)//2
                if mask[right]: terms.append((r,-2))
            out.add(combine(terms))
    return out

def eqmask(m,d):
    n=(m-1)*d+1; mask=[0]*n
    for q in range(m): mask[q*d]=1
    return mask

def run():
    R={}
    # exact compiler
    cases=0; fails=[]
    for L in range(4,10):
      for n in range(2,7):
        for bits in range(1<<n):
            mask=[(bits>>i)&1 for i in range(n)]
            a=direct_support(mask,L,2); b=motif_support(mask,L,2); cases+=1
            if a!=b: fails.append((L,n,mask,len(a-b),len(b-a)))
    R["compiler"]={"cases":cases,"failures":fails}

    # triple curvature
    cases=0; fails=[]
    for L in range(4,13):
      for n in range(3,8):
        for bits in range(1<<n):
            mask=[(bits>>i)&1 for i in range(n)]
            if sum(mask)<3: continue
            a=triple_actual(mask,L); b=triple_expected(mask,L); cases+=1
            if a!=b: fails.append((L,n,mask,len(a-b),len(b-a)))
    R["triple_curvature"]={"cases":cases,"failures":fails}

    # count formulas, moderate broad range
    fails=[]; dis=[]
    for L in range(4,101):
        c0,cp,cm=Cfam(L,0),Cfam(L,1),Cfam(L,-1)
        n=L//2
        exp0=((L-2)*(L-2))//4
        expp=n*(n-1)//2
        if (len(c0),len(cp),len(cm))!=(exp0,expp,expp):
            fails.append((L,len(c0),len(cp),len(cm),exp0,expp))
        if c0&cp or c0&cm or cp&cm: dis.append(L)
    R["curvature_counts"]={"L":"4..100","failures":fails,"disjointness_failures":dis}

    # midpoint routing
    cases=0; fails=[]
    for L in range(4,11):
      for n in range(3,8):
        for bits in range(1<<n):
            mask=[(bits>>i)&1 for i in range(n)]
            B=[i for i,v in enumerate(mask) if v]
            for a,c in combinations(B,2):
                if c-a<2: continue
                aa=outer_actual(mask,L,a,c); ee=outer_expected(mask,L,a,c); cases+=1
                if aa!=ee: fails.append((L,n,mask,a,c,len(aa-ee),len(ee-aa)))
    R["midpoint_routing"]={"cases":cases,"failures":fails}

    # AP theorem check
    cases=0; fails=[]
    for L in range(4,21):
      for d in range(2,7):
        for m in range(3,6):
            mask=eqmask(m,d)
            a=triple_actual(mask,L); e=Cfam(L,0); cases+=1
            if a!=e: fails.append((L,d,m,len(a-e),len(e-a)))
    R["AP_three_distinct_saturation"]={"cases":cases,"failures":fails}

    # same-ambient irregular test
    L=10
    base=[1,0,1,0,0,0]; irr=[1,0,1,0,0,1]
    A=direct_support(base,L,1); B=direct_support(irr,L,1); new=B-A
    R["same_ambient_counterexample"]={
        "base_support":len(A),"irregular_support":len(B),
        "new":len(new),"lost":len(A-B),
        "new_equals_Cplus":new==Cfam(L,1),
        "Cplus_size":len(Cfam(L,1)),
        "curvature":0-2*2+5
    }

    # Paper 4 special case
    L=40
    faf=outer_expected([1,0,1],L,0,2)
    R["FAF_L40"]={
        "bridge_supports":len(faf),
        "expected":(L*L)//4,
        "C0":len(Cfam(L,0)),
        "Cplus":len(Cfam(L,1)),
        "Cminus":len(Cfam(L,-1))
    }
    return R

if __name__=="__main__":
    print(json.dumps(run(),indent=2))
