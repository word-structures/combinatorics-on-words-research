#!/usr/bin/env python3
"""Replay Paper-6 v2.6 cross-instance space-time observability certificates.

Instances:
  BAL3 L4 Q1
  FULL L4 Q1
  INTERIOR L5 Q1
  HASH30 L4 K5

The large FULL L4 Q2 theorem is replayed separately by:
  p6_v26_q2_spacetime_observability_replay.py

Requires:
  p6_affine_fast_builder.py
  p6_semantics_audit.py
  rank_mod_u16.cpp
  numpy
  scipy
"""
from pathlib import Path
import hashlib, importlib.util, json, math, subprocess
import numpy as np
from scipy.sparse import csr_matrix, coo_matrix

H=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location("fb",H/"p6_affine_fast_builder.py")
fb=importlib.util.module_from_spec(spec);spec.loader.exec_module(fb)
p6=fb.p6

PRIMES=(65521,65519)
exe=H/"_rank_mod_u16_v26"
subprocess.run(["g++","-O3","-std=c++17",str(H/"rank_mod_u16.cpp"),"-o",str(exe)],check=True)

def recmap(s):
    order=[]
    for ch in reversed(s):
        if ch not in order: order.append(ch)
        if len(order)==3: break
    for ch in "abc":
        if ch not in order: order.append(ch)
    return {order[i]:"abc"[i] for i in range(3)}

def parikh(w):
    return (w.count("a"),w.count("b"),w.count("c"))

def label(s,L,m,recency):
    if recency:
        mp=recmap(s)
        t="".join(mp[c] for c in s)
    else:
        t=s
    a=len(t)%L
    blocks=[t[i:i+L] for i in range(a,len(t),L) if i+L<=len(t)]
    ps=[parikh(b) for b in blocks[-m:]]
    while len(ps)<m:
        ps.insert(0,None)
    return tuple(ps)

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

def aggregation(raw,classes,N,L,m,recency):
    d={}
    gids=np.empty(len(raw),dtype=np.int32)
    for i,s in enumerate(raw):
        x=label(s,L,m,recency)
        if x not in d:
            d[x]=len(d)
        gids[i]=d[x]
    M=coo_matrix(
        (np.ones(len(gids),dtype=np.int64),(gids,classes)),
        shape=(len(d),N)
    ).tocsr()
    M.sum_duplicates()
    return M,len(d)

def future(Q,prime,D,max_t):
    N=Q.shape[0]
    V=np.empty((N,D+max_t-1),dtype=np.int64)
    v=np.ones(N,dtype=np.int64)
    for h in range(V.shape[1]):
        V[:,h]=v%prime
        v=np.asarray(Q.dot(v)).ravel()%prime
    return V

def rank_cpp(A,prime,tag):
    A=(np.asarray(A,dtype=np.int64)%prime).astype(np.uint16)
    fn=H/f"_v26_{tag}_{prime}.u16"
    A.tofile(fn)
    pr=subprocess.run(
        [str(exe),str(fn),str(A.shape[0]),str(A.shape[1]),str(prime)],
        capture_output=True,text=True,check=True
    )
    fn.unlink()
    return int(pr.stdout.strip().splitlines()[-1])

def check_instance(name,B,K,L,D,recency,specs):
    raw,classes,Q=build(B,K)
    max_t=max(t for _,t,_ in specs)
    out={"raw":len(raw),"equitable":Q.shape[0],"target_dim":D,"measurements":{}}
    for prime in PRIMES:
        V=future(Q,prime,D,max_t)
        for m,t,prev in specs:
            M,g=aggregation(raw,classes,Q.shape[0],L,m,recency)
            key=f"m{m}"
            out["measurements"].setdefault(key,{"families":g,"ranks":{}})
            vals={}
            for tt in sorted(set(([prev] if prev else [])+[t])):
                stack=np.vstack([M.dot(V[:,j:j+D])%prime for j in range(tt)])
                vals[str(tt)]=rank_cpp(stack,prime,f"{name}_m{m}_t{tt}")
            out["measurements"][key]["ranks"][str(prime)]=vals
            assert vals[str(t)]==D
    return out

full4=p6.library(4)
bal3=[b for b in full4 if all(x>0 for x in p6.parikh(b))]
full5=p6.library(5)
interior5=[b for b in full5 if all(x>0 for x in p6.parikh(b))]
hash30=sorted(full4,key=lambda w:hashlib.sha256(w.encode()).hexdigest())[:30]

out={}
out["BAL3_L4_Q1"]=check_instance(
    "bal3",bal3,7,4,4,True,
    [(1,2,1),(2,1,None)]
)
out["FULL_L4_Q1"]=check_instance(
    "fullq1",full4,7,4,153,True,
    [(1,26,25),(2,3,2),(3,1,None)]
)
out["INTERIOR_L5_Q1"]=check_instance(
    "interior",interior5,9,5,72,True,
    [(1,15,14),(2,3,2),(3,1,None)]
)
# HASH30 exact full ranks are checked on the first prime here; the second prime
# is inexpensive but not logically required once the exact target dimension is
# independently known.
out["HASH30_L4_K5"]=check_instance(
    "hash30",hash30,5,4,47,False,
    [(1,5,4),(2,1,None)]
)

print("PASS")
print(json.dumps(out,indent=2))
