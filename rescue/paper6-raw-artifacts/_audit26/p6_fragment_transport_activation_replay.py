#!/usr/bin/env python3
"""Replay exact fragment-transport / activation identities and Q2 S2-bit identity."""
from pathlib import Path
import random
import numpy as np

H=Path(__file__).resolve().parent

def P(w):
    return (w.count("a"),w.count("b"),w.count("c"))
def sub(a,b):
    return tuple(x-y for x,y in zip(a,b))
def S(s,m):
    return (0,0,0) if m<=0 else P(s[-m:])
def R(s,k):
    a=S(s,2*k-1); b=S(s,k-1)
    return tuple(a[i]-2*b[i] for i in range(3))
def recmap(s):
    o=[]
    for c in reversed(s):
        if c not in o:o.append(c)
        if len(o)==3:break
    for c in "abc":
        if c not in o:o.append(c)
    return {o[i]:"abc"[i] for i in range(3)}

rng=random.Random(20260830)
for L in (3,4,5):
    for q in (1,2,3):
        for r in range(1,L):
            k=q*L+r
            for _ in range(500):
                n=max(80,3*L+2*k+10)
                s="".join(rng.choice("abc") for _ in range(n))
                t="".join(rng.choice("abc") for _ in range(n))
                U="".join(rng.choice("abc") for _ in range(q*L))
                su,tu=s+U,t+U
                lhs=sub(R(su,k),R(tu,k))
                deep=sub(S(s,q*L+2*r-1),S(t,q*L+2*r-1))
                loc=sub(S(s,r-1),S(t,r-1))
                rhs=tuple(deep[i]-2*loc[i] for i in range(3))
                assert lhs==rhs

raw=H/"P6_Q2_RAW_STATES_S21.npy"
if raw.exists():
    states=[x.decode("ascii").rstrip("\x00") for x in np.load(raw)]
    for s in states:
        mp=recmap(s)
        c="".join(mp[x] for x in s)
        got=P(c[-2:])
        exp=(2,0,0) if s[-1]==s[-2] else (1,1,0)
        assert got==exp
    print("Q2 raw S2/adjacency states checked:",len(states))

print("PASS")
print("Fragment transport/activation identities verified.")
