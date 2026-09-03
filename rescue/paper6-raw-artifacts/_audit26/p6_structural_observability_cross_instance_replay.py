#!/usr/bin/env python3
"""Paper-6 structural observability cross-instance replay.

Rebuilds the four small/medium controls from the exact Abelian cutoff compiler:
  BAL3 L4 Q1
  FULL L4 Q1
  INTERIOR L5 Q1
  HASH30 L4 K5

The large FULL L4 Q2 result is replayed separately by
p6_q2_recency_frame_onebit_observability_fast_replay.py.

Requires sibling:
  p6_semantics_audit.py
  p6_affine_fast_builder.py

Requires numpy/scipy.
"""
from pathlib import Path
import hashlib, importlib.util, itertools, json
import numpy as np
from scipy.sparse import csr_matrix, coo_matrix

H=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location("fb",H/"p6_affine_fast_builder.py")
fb=importlib.util.module_from_spec(spec); spec.loader.exec_module(fb)
p6=fb.p6
PRIMES=(65521,65519)

def symmetry_group(B):
    S=set(B); out=[]
    for pp in itertools.permutations("abc"):
        mp=dict(zip("abc",pp))
        if {"".join(mp[c] for c in w) for w in B}==S:
            out.append("".join(pp))
    return out

def recency_map(s):
    order=[]
    for ch in reversed(s):
        if ch not in order: order.append(ch)
        if len(order)==3: break
    for ch in "abc":
        if ch not in order: order.append(ch)
    return {order[i]:"abc"[i] for i in range(3)}

def parikh(w):
    return (w.count("a"),w.count("b"),w.count("c"))

def profile_window(s,L,k,recency=True):
    if recency:
        mp=recency_map(s)
        t="".join(mp[c] for c in s)
    else:
        t=s
    r=len(t)%L
    blocks=[t[i:i+L] for i in range(r,len(t),L) if len(t[i:i+L])==L]
    ps=[parikh(b) for b in blocks[-k:]]
    return tuple([None]*(k-len(ps))+ps)

def quotient_sparse(B,K):
    S,E,LABEL,I=fb.build_fast(B,K)
    eq=p6.equitable(S,E)
    Q0,G,rem=p6.quotient(S,E,eq)
    N=len(Q0)
    rr=[];cc=[];dd=[]
    for i,row in enumerate(Q0):
        for j,w in enumerate(row):
            if w:
                rr.append(i);cc.append(j);dd.append(w)
    Q=csr_matrix((np.array(dd,dtype=np.int64),(rr,cc)),shape=(N,N))
    raw=sorted(S)
    classes=np.array([rem[eq[s]] for s in raw],dtype=np.int32)
    return raw,classes,Q,Q0

def exact_future_dimension(Q0):
    r,coeff,ranks=p6.krylov_exact_rank(Q0)
    z=0
    for c in coeff:
        if c==0: z+=1
        else: break
    return r,z,r-z,ranks

def aggregation(labels,classes,N):
    d={};g=np.empty(len(labels),dtype=np.int32)
    for i,x in enumerate(labels):
        if x not in d:d[x]=len(d)
        g[i]=d[x]
    return coo_matrix(
        (np.ones(len(g),dtype=np.int64),(g,classes)),
        shape=(len(d),N)
    ).tocsr(),len(d)

def future(Q,p,start,count):
    N=Q.shape[0]
    v=np.ones(N,dtype=np.int64)
    for _ in range(start):
        v=np.asarray(Q.dot(v)).ravel()%p
    V=np.empty((N,count),dtype=np.int64)
    for h in range(count):
        V[:,h]=v
        v=np.asarray(Q.dot(v)).ravel()%p
    return V

def rank_mod(X,p):
    X=np.asarray(X,dtype=np.int64).copy()%p
    m,n=X.shape;r=0
    for c in range(n):
        nz=np.flatnonzero(X[r:,c])
        if len(nz)==0: continue
        z=r+int(nz[0])
        if z!=r:X[[r,z]]=X[[z,r]]
        inv=pow(int(X[r,c]),p-2,p)
        X[r,c:]=X[r,c:]*inv%p
        if r+1<m:
            fac=X[r+1:,c].copy()
            ids=np.flatnonzero(fac)
            if len(ids):
                ii=r+1+ids
                X[ii,c:]=(X[ii,c:]-fac[ids,None]*X[r,c:][None,:])%p
        r+=1
        if r==n: break
    return r

def measure(B,K,L,descriptors):
    raw,classes,Q,Q0=quotient_sparse(B,K)
    full,z,persistent,_=exact_future_dimension(Q0)
    rec={"raw":len(raw),"equitable":Q.shape[0],"full":full,"zero":z,"persistent":persistent,
         "symmetry_group":symmetry_group(B),"measurements":{}}
    for name,labeller in descriptors.items():
        labels=[labeller(s) for s in raw]
        M,ng=aggregation(labels,classes,Q.shape[0])
        vals={}
        for p in PRIMES:
            rf=rank_mod(M.dot(future(Q,p,0,full)),p)
            rp=rank_mod(M.dot(future(Q,p,z,persistent)),p)
            vals[str(p)]=[rf,rp]
        rec["measurements"][name]={"groups":ng,"ranks_full_persistent":vals}
    return rec

full4=p6.library(4)
bal3=[b for b in full4 if all(x>0 for x in p6.parikh(b))]
full5=p6.library(5)
interior5=[b for b in full5 if all(x>0 for x in p6.parikh(b))]
hash30=sorted(full4,key=lambda w:hashlib.sha256(w.encode()).hexdigest())[:30]

out={}
out["BAL3_L4_Q1"]=measure(bal3,7,4,{
    "recency_p1":lambda s:profile_window(s,4,1,True),
    "recency_p1_bit":lambda s:(profile_window(s,4,1,True),int(s[-1]==s[-2])),
    "recency_p2":lambda s:profile_window(s,4,2,True),
})
out["FULL_L4_Q1"]=measure(full4,7,4,{
    "recency_p2":lambda s:profile_window(s,4,2,True),
    "recency_p2_bit":lambda s:(profile_window(s,4,2,True),int(s[-1]==s[-2])),
    "recency_p3":lambda s:profile_window(s,4,3,True),
})
out["INTERIOR_L5_Q1"]=measure(interior5,9,5,{
    "recency_p2":lambda s:profile_window(s,5,2,True),
    "recency_p2_bit":lambda s:(profile_window(s,5,2,True),int(s[-1]==s[-2])),
    "recency_p3":lambda s:profile_window(s,5,3,True),
})
out["HASH30_L4_K5"]=measure(hash30,5,4,{
    "recency_p2":lambda s:profile_window(s,4,2,True),
    "recency_p2_bit":lambda s:(profile_window(s,4,2,True),int(s[-1]==s[-2])),
    "fixed_p2":lambda s:profile_window(s,4,2,False),
})

assert out["BAL3_L4_Q1"]["measurements"]["recency_p2"]["ranks_full_persistent"]["65521"]==[4,2]
assert out["FULL_L4_Q1"]["measurements"]["recency_p3"]["ranks_full_persistent"]["65521"]==[153,146]
assert out["INTERIOR_L5_Q1"]["measurements"]["recency_p3"]["ranks_full_persistent"]["65521"]==[72,64]
assert out["HASH30_L4_K5"]["measurements"]["fixed_p2"]["ranks_full_persistent"]["65521"]==[47,42]
assert out["HASH30_L4_K5"]["measurements"]["recency_p2_bit"]["ranks_full_persistent"]["65521"]==[44,41]

print("PASS")
print(json.dumps(out,indent=2))
