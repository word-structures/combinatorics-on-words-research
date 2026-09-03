#!/usr/bin/env python3
"""Fast replay of the v2.0 Q2 recency-profile one-bit observability ranks."""
from pathlib import Path
import json
import numpy as np
from scipy.sparse import load_npz, csr_matrix

H=Path(__file__).resolve().parent
PRIMES=(65521,65519)
FULL=1179
SHIFT=12
PERSISTENT=1167

D=json.loads((H/"P6_Q2_EQUITABLE_QUOTIENT_SPARSE_v0.1_2026-08-30.json").read_text())
rows=D["rows"]; N=len(rows)
rr=[];cc=[];dd=[]
for i,row in enumerate(rows):
    for j,w in row:
        rr.append(i);cc.append(j);dd.append(w)
Q=csr_matrix((np.array(dd,dtype=np.int64),(rr,cc)),shape=(N,N))

G0=load_npz(H/"P6_Q2_RECENCY_PROFILE_NO_BIT_GROUP_TO_QUOTIENT_v0.1_2026-08-30.npz")
G1=load_npz(H/"P6_Q2_RECENCY_PROFILE_ONEBIT_GROUP_TO_QUOTIENT_v0.1_2026-08-30.npz")
assert G0.shape==(1796,2691)
assert G1.shape==(2083,2691)

def build_future(p):
    V=np.empty((N,FULL),dtype=np.int64)
    v=np.ones(N,dtype=np.int64)
    for h in range(FULL):
        V[:,h]=v%p
        v=np.asarray(Q.dot(v)).reshape(-1)%p
    return V

def rank_mod(X,p):
    X=np.asarray(X,dtype=np.int64).copy()%p
    m,n=X.shape
    r=0
    for c in range(n):
        nz=np.flatnonzero(X[r:,c])
        if len(nz)==0:
            continue
        z=r+int(nz[0])
        if z!=r:
            X[[r,z]]=X[[z,r]]
        inv=pow(int(X[r,c]),p-2,p)
        X[r,c:]=(X[r,c:]*inv)%p
        if r+1<m:
            fac=X[r+1:,c].copy()
            ids=np.flatnonzero(fac)
            if len(ids):
                rowsidx=r+1+ids
                X[rowsidx,c:]=(X[rowsidx,c:]-fac[ids,None]*X[r,c:][None,:])%p
        r+=1
        if r==n:
            break
    return r

out={}
for p in PRIMES:
    V=build_future(p)
    r0=rank_mod(G0.dot(V),p)
    r1=rank_mod(G1.dot(V),p)
    rp=rank_mod(G1.dot(V[:,SHIFT:SHIFT+PERSISTENT]),p)
    out[str(p)]={"no_bit":r0,"one_bit":r1,"persistent":rp}
    assert (r0,r1,rp)==(1144,1179,1167)

print("PASS")
print(json.dumps(out,indent=2))
