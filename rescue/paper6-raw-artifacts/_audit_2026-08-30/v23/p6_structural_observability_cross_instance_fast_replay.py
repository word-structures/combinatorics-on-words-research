#!/usr/bin/env python3
"""Fast replay of Paper-6 structural-observability cross-instance ranks.

Rebuilds:
  BAL3 L4 Q1
  FULL L4 Q1
  INTERIOR L5 Q1
  HASH30 L4 K5

Then verifies the measurement ranks over primes 65521 and 65519.

The independently certified exact target dimensions are supplied by:
  P6_CROSS_INSTANCE_EXACT_VECTOR_DIMENSION_CERT_v0.1_2026-08-30.json
and prior FULL-L4-Q1 certificates.

The large FULL-L4-Q2 v2.0 result is replayed separately by:
  p6_q2_recency_frame_onebit_observability_fast_replay.py
"""
from pathlib import Path
import hashlib, importlib.util, itertools, json
import numpy as np
from scipy.sparse import csr_matrix, coo_matrix

H=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location("fb",H/"p6_affine_fast_builder.py")
fb=importlib.util.module_from_spec(spec);spec.loader.exec_module(fb)
p6=fb.p6
PRIMES=(65521,65519)

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

def profile_window(s,L,k,recency):
    if recency:
        mp=recency_map(s)
        t="".join(mp[c] for c in s)
    else:
        t=s
    r=len(t)%L
    blocks=[t[i:i+L] for i in range(r,len(t),L) if len(t[i:i+L])==L]
    ps=[parikh(b) for b in blocks[-k:]]
    return tuple([None]*(k-len(ps))+ps)

def build(B,K):
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
    return raw,classes,Q

def aggregate(labels,classes,N):
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
        if r==n:break
    return r

def check(name,B,K,L,full_dim,zero_mult,descs,expected):
    raw,classes,Q=build(B,K)
    persistent=full_dim-zero_mult
    out={"raw":len(raw),"equitable":Q.shape[0],"measurements":{}}
    for dname,fn in descs.items():
        M,ng=aggregate([fn(s) for s in raw],classes,Q.shape[0])
        vals={}
        for p in PRIMES:
            rf=rank_mod(M.dot(future(Q,p,0,full_dim)),p)
            rp=rank_mod(M.dot(future(Q,p,zero_mult,persistent)),p)
            vals[str(p)]=[rf,rp]
        out["measurements"][dname]={"groups":ng,"ranks":vals}
        assert vals["65521"]==expected[dname]
        assert vals["65519"]==expected[dname]
    return out

full4=p6.library(4)
bal3=[b for b in full4 if all(x>0 for x in p6.parikh(b))]
full5=p6.library(5)
interior5=[b for b in full5 if all(x>0 for x in p6.parikh(b))]
hash30=sorted(full4,key=lambda w:hashlib.sha256(w.encode()).hexdigest())[:30]

out={}
out["BAL3_L4_Q1"]=check(
    "BAL3",bal3,7,4,4,2,
    {
      "recency_p1":lambda s:profile_window(s,4,1,True),
      "recency_p1_bit":lambda s:(profile_window(s,4,1,True),int(s[-1]==s[-2])),
      "recency_p2":lambda s:profile_window(s,4,2,True),
    },
    {"recency_p1":[3,2],"recency_p1_bit":[4,2],"recency_p2":[4,2]}
)
out["FULL_L4_Q1"]=check(
    "FULL",full4,7,4,153,7,
    {
      "recency_p2":lambda s:profile_window(s,4,2,True),
      "recency_p2_bit":lambda s:(profile_window(s,4,2,True),int(s[-1]==s[-2])),
      "recency_p3":lambda s:profile_window(s,4,3,True),
    },
    {"recency_p2":[51,51],"recency_p2_bit":[62,61],"recency_p3":[153,146]}
)
out["INTERIOR_L5_Q1"]=check(
    "INTERIOR",interior5,9,5,72,8,
    {
      "recency_p2":lambda s:profile_window(s,5,2,True),
      "recency_p2_bit":lambda s:(profile_window(s,5,2,True),int(s[-1]==s[-2])),
      "recency_p3":lambda s:profile_window(s,5,3,True),
    },
    {"recency_p2":[26,25],"recency_p2_bit":[34,33],"recency_p3":[72,64]}
)
out["HASH30_L4_K5"]=check(
    "HASH30",hash30,5,4,47,5,
    {
      "recency_p2":lambda s:profile_window(s,4,2,True),
      "recency_p2_bit":lambda s:(profile_window(s,4,2,True),int(s[-1]==s[-2])),
      "fixed_p2":lambda s:profile_window(s,4,2,False),
    },
    {"recency_p2":[41,39],"recency_p2_bit":[44,41],"fixed_p2":[47,42]}
)

print("PASS")
print(json.dumps(out,indent=2))
