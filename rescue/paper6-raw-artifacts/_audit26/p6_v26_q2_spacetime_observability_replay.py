#!/usr/bin/env python3
"""Replay the Paper-6 v2.6 FULL-L4/Q2 space-time observability spectrum.

Expected exact indices:
  m=1 -> 197
  m=2 -> 24
  m=3 -> 4
  m=4 -> 2

Requires sibling:
  P6_Q2_RAW_STATES_S21.npy
  P6_Q2_RAW_TO_EQUITABLE_CLASS_U16.npy
  P6_Q2_EQUITABLE_QUOTIENT_SPARSE_v0.1_2026-08-30.json
  rank_mod_u16.cpp
"""
from pathlib import Path
import json, subprocess
import numpy as np
from scipy.sparse import coo_matrix, csr_matrix

R=Path(__file__).resolve().parent
PRIME=65521
D=1179

states=[x.decode('ascii').rstrip('\x00') for x in np.load(R/'P6_Q2_RAW_STATES_S21.npy')]
classes=np.load(R/'P6_Q2_RAW_TO_EQUITABLE_CLASS_U16.npy').astype(np.int32)
J=json.loads((R/'P6_Q2_EQUITABLE_QUOTIENT_SPARSE_v0.1_2026-08-30.json').read_text())

rr=[];cc=[];dd=[]
for i,row in enumerate(J['rows']):
    for j,w in row:
        rr.append(i);cc.append(j);dd.append(w)
Q=csr_matrix((np.array(dd,dtype=np.int64),(rr,cc)),shape=(2691,2691))

exe=R/'_rank_mod_u16_v26_q2'
subprocess.run(['g++','-O3','-std=c++17',str(R/'rank_mod_u16.cpp'),'-o',str(exe)],check=True)

def recency_map(s):
    order=[]
    for c in reversed(s):
        if c not in order: order.append(c)
        if len(order)==3: break
    for c in 'abc':
        if c not in order: order.append(c)
    return {order[i]:'abc'[i] for i in range(3)}

def parikh(w):
    return (w.count('a'),w.count('b'),w.count('c'))

def label(s,m):
    mp=recency_map(s)
    t=''.join(mp[c] for c in s)
    a=len(t)%4
    blocks=[t[i:i+4] for i in range(a,len(t),4) if i+4<=len(t)]
    ps=[parikh(b) for b in blocks[-m:]]
    while len(ps)<m: ps.insert(0,None)
    return tuple(ps)

def aggregation(m):
    mp={};gids=np.empty(len(states),dtype=np.int32)
    for i,s in enumerate(states):
        x=label(s,m)
        if x not in mp: mp[x]=len(mp)
        gids[i]=mp[x]
    G=coo_matrix((np.ones(len(gids),dtype=np.int64),(gids,classes)),shape=(len(mp),2691)).tocsr()
    G.sum_duplicates()
    return G,len(mp)

def rank_cpp(A,tag):
    A=(np.asarray(A,dtype=np.int64)%PRIME).astype(np.uint16)
    fn=R/f'_v26_q2_{tag}.u16';A.tofile(fn)
    pr=subprocess.run([str(exe),str(fn),str(A.shape[0]),str(A.shape[1]),str(PRIME)],capture_output=True,text=True,check=True)
    fn.unlink()
    return int(pr.stdout.strip().splitlines()[-1])

max_t=197
V=np.empty((2691,D+max_t-1),dtype=np.int64)
v=np.ones(2691,dtype=np.int64)
for h in range(V.shape[1]):
    V[:,h]=v%PRIME
    v=np.asarray(Q.dot(v)).ravel()%PRIME

tests={1:197,2:24,3:4,4:2}
expected_groups={1:6,2:51,3:345,4:1796}
out={}
for m,t in tests.items():
    G,g=aggregation(m);assert g==expected_groups[m]
    stack=np.vstack([G.dot(V[:,j:j+D])%PRIME for j in range(t)])
    r=rank_cpp(stack,f'm{m}_t{t}')
    assert r==D,(m,t,r)
    out[str(m)]={'groups':g,'time_slices':t,'rank_mod65521':r}

print('PASS')
print(json.dumps(out,indent=2))
