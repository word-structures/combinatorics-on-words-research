# Paper-6 boundary-affine compiler audit
# Requires p6_semantics_audit.py in the same directory.
from pathlib import Path
from collections import defaultdict, Counter
from itertools import product
import importlib.util
import hashlib
import time

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("p6", HERE / "p6_semantics_audit.py")
p6 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(p6)

def sub(a,b):
    return tuple(x-y for x,y in zip(a,b))

def geometries(L,K):
    return [(k,j) for k in range(2,K+1)
                  for j in range(1,min(L,2*k-1)+1)]

def requirement(s,k,j):
    q=2*k-j
    if q>len(s):
        return None
    u=s[-q:]
    if j<=k:
        A=u[:k]
        C=u[k:]
        return ("A",sub(p6.parikh(A),p6.parikh(C)))
    return ("B",p6.parikh(u))

def block_value(b,k,j):
    if j<=k:
        return ("A",p6.parikh(b[:j]))
    X=b[:j-k]
    Y=b[j-k:j]
    return ("B",sub(p6.parikh(Y),p6.parikh(X)))

def crossing_forbid4(s,b):
    z=s+b
    boundary=len(s)
    for i in range(max(0,boundary-3),min(boundary,len(z)-3)):
        if i<boundary and i+4>boundary and z[i:i+4] in p6.FORBID4:
            return True
    return False

def affine_legal(s,b,L,K):
    if crossing_forbid4(s,b):
        return False
    for k,j in geometries(L,K):
        r=requirement(s,k,j)
        if r is not None and block_value(b,k,j)==r:
            return False
    return True

def compile_masks(B,L,K):
    masks={}
    for k,j in geometries(L,K):
        d=defaultdict(int)
        for i,b in enumerate(B):
            d[block_value(b,k,j)] |= 1<<i
        masks[(k,j)]=dict(d)

    fmasks={}
    for n in range(4):
        for tup in product("abc",repeat=n):
            suf="".join(tup)
            m=0
            for i,b in enumerate(B):
                if crossing_forbid4(suf,b):
                    m |= 1<<i
            fmasks[suf]=m

    pmasks=defaultdict(int)
    for i,b in enumerate(B):
        pmasks[p6.parikh(b)] |= 1<<i
    return masks,fmasks,dict(pmasks)

def forbidden_mask(s,masks,fmasks,L,K):
    m=fmasks[s[-3:]]
    for k,j in geometries(L,K):
        r=requirement(s,k,j)
        if r is not None:
            m |= masks[(k,j)].get(r,0)
    return m

def main():
    B=p6.library(4)
    K=6
    states,edges,labels,init=p6.build(B,K)

    assert len(B)==60
    assert len(states)==3402
    assert len(geometries(4,6))==19

    mismatches=0
    for s in states:
        for b in B:
            brute = b in labels.get(s,{})
            affine = affine_legal(s,b,4,K)
            if brute != affine:
                mismatches += 1
    assert mismatches==0

    masks,fmasks,pmasks=compile_masks(B,4,K)
    profiles=sorted(pmasks)
    allmask=(1<<len(B))-1

    for s in states:
        legal = allmask ^ (forbidden_mask(s,masks,fmasks,4,K)&allmask)
        bit_counts=tuple((legal&pmasks[p]).bit_count() for p in profiles)
        direct=Counter(p6.parikh(b) for b in labels.get(s,{}))
        direct_counts=tuple(direct[p] for p in profiles)
        assert bit_counts==direct_counts

    print("PASS")
    print("states:",len(states))
    print("blocks:",len(B))
    print("state-block pairs checked:",len(states)*len(B))
    print("boundary geometries:",len(geometries(4,6)))
    print("mismatches:",mismatches)

if __name__=="__main__":
    main()
