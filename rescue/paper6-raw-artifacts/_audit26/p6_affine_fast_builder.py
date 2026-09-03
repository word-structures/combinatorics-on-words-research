from pathlib import Path
from collections import defaultdict, deque
import importlib.util, json, time

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('p6',HERE/'p6_semantics_audit.py'); p6=importlib.util.module_from_spec(spec); spec.loader.exec_module(p6)

def sub(a,b): return tuple(x-y for x,y in zip(a,b))

def geometries(L,K): return [(k,j) for k in range(2,K+1) for j in range(1,min(L,2*k-1)+1)]

def requirement(s,k,j):
    q=2*k-j
    if q>len(s): return None
    u=s[-q:]
    if j<=k:
        A=u[:k]; C=u[k:]
        return ('A',sub(p6.parikh(A),p6.parikh(C)))
    return ('B',p6.parikh(u))

def block_value(b,k,j):
    if j<=k: return ('A',p6.parikh(b[:j]))
    X=b[:j-k]; Y=b[j-k:j]
    return ('B',sub(p6.parikh(Y),p6.parikh(X)))

def crossing_forbid4(s,b):
    z=s+b; boundary=len(s)
    for i in range(max(0,boundary-3),min(boundary,len(z)-3)):
        if i<boundary and i+4>boundary and z[i:i+4] in p6.FORBID4: return True
    return False

def compile_masks(B,L,K):
    masks={}
    for kj in geometries(L,K):
        d=defaultdict(int)
        for i,b in enumerate(B): d[block_value(b,*kj)] |= 1<<i
        masks[kj]=dict(d)
    fmasks={}
    # only suffixes actually queried, but all <=3 is tiny
    from itertools import product
    for n in range(4):
        for tup in product(p6.ALPH,repeat=n):
            suf=''.join(tup); m=0
            for i,b in enumerate(B):
                if crossing_forbid4(suf,b): m |= 1<<i
            fmasks[suf]=m
    return masks,fmasks

def build_fast(B,K):
    L=len(B[0]); mem=max(2*K-1,3); masks,fmasks=compile_masks(B,L,K); allmask=(1<<len(B))-1
    init={w[-mem:] for w in B}; seen=set(init); q=deque(init)
    edges=defaultdict(lambda:defaultdict(int)); labels=defaultdict(dict)
    while q:
        s=q.popleft(); bad=fmasks[s[-3:]]
        for kj in geometries(L,K):
            r=requirement(s,*kj)
            if r is not None: bad |= masks[kj].get(r,0)
        legal=allmask & ~bad
        while legal:
            bit=legal & -legal; i=bit.bit_length()-1; legal-=bit; b=B[i]
            t=(s+b)[-mem:]
            edges[s][t]+=1; labels[s][b]=t
            if t not in seen: seen.add(t); q.append(t)
    return seen,edges,labels,init

def main():
    B=p6.library(4); out=[]
    for K in range(7,12):
        t=time.time(); st,e,l,i=build_fast(B,K); dt=time.time()-t
        out.append({'Kmax':K,'block_range_Q_complete':(K+1)//4-1 if (K+1)%4==0 else None,'raw_states':len(st),'distinct_edges':sum(len(x) for x in e.values()),'weighted_transitions':sum(sum(x.values()) for x in e.values()),'seconds':dt})
        print(out[-1],flush=True)
    path=HERE/'P6_AFFINE_FAST_BUILDER_K7_K11_RESULTS_v0.1_2026-08-30.json'; path.write_text(json.dumps(out,indent=2),encoding='utf-8')
if __name__=='__main__': main()
