from pathlib import Path
from collections import defaultdict
import json, importlib.util, itertools
H=Path('/mnt/data')
spec=importlib.util.spec_from_file_location('fb',H/'p6_affine_fast_builder.py');fb=importlib.util.module_from_spec(spec);spec.loader.exec_module(fb);p6=fb.p6
B=p6.library(4);S,E,L,I=fb.build_fast(B,7);eq=p6.equitable(S,E);Q,G,rem=p6.quotient(S,E,eq);N=len(Q)
reps=[None]*N
for c,ss in G.items():reps[rem[c]]=min(ss)
PERMS=[dict(zip('abc',x)) for x in itertools.permutations('abc')]
def tw(w,mp):return ''.join(mp[c] for c in w)
def canon(W):return min(tuple(sorted(tw(w,mp) for w in W)) for mp in PERMS)
dd=defaultdict(list)
for i,s in enumerate(reps):dd[canon(L[s].keys())].append(i)
groups=list(dd.values());rid=[None]*N
for g,inds in enumerate(groups):
    for i in inds:rid[i]=g

def prof(w):return p6.parikh(w)
def chunks(s,n=4):
    r=len(s)%4;bs=[s[i:i+4] for i in range(r,len(s),4) if len(s[i:i+4])==4]
    ps=[prof(b) for b in bs[-n:]]
    while len(ps)<n:ps.insert(0,None)
    return tuple(ps)
def sub(a,b):return None if a is None or b is None else tuple(x-y for x,y in zip(a,b))
def add(a,b):return tuple(x+y for x,y in zip(a,b))
ps=[chunks(s,4) for s in reps]
D1=[sub(x[-1],x[-2]) if x[-1] is not None and x[-2] is not None else None for x in ps]
vals={
 'response_orbit':rid,
 'last4_profiles':ps,
 'response_plus_D1':[(rid[i],D1[i]) for i in range(N)],
 'response_plus_last4_profiles':[(rid[i],ps[i]) for i in range(N)],
 'exact_current_response':[tuple(sorted(L[s].keys())) for s in reps],
}

def groupids(vals):
    mp={};ids=[]
    for v in vals:
        if v not in mp:mp[v]=len(mp)
        ids.append(mp[v])
    return ids,len(mp)

def matvec(v,p):
    out=[0]*N
    for i,row in enumerate(Q):
        z=0
        for j,w in enumerate(row):
            if w:z += w*v[j]
        out[i]=z%p
    return out

def vec_basis(shift,target,p):
    v=[1]*N
    for _ in range(shift):v=matvec(v,p)
    basis=[];pivs={}
    while len(basis)<target:
        x=v[:]
        while True:
            k=next((i for i,a in enumerate(x) if a%p),None)
            if k is None: raise RuntimeError(('stopped',len(basis)))
            if k in pivs:
                b=pivs[k];fac=x[k]*pow(b[k],p-2,p)%p
                for j in range(k,N):x[j]=(x[j]-fac*b[j])%p
            else:
                inv=pow(x[k],p-2,p);x=[a*inv%p for a in x]
                pivs[k]=x;basis.append(v[:]);break
        v=matvec(v,p)
    return basis

def rank_mod(A,p):
    if not A:return 0
    A=[row[:] for row in A];m=len(A);n=len(A[0]);r=0
    for c in range(n):
        piv=next((i for i in range(r,m) if A[i][c]%p),None)
        if piv is None:continue
        A[r],A[piv]=A[piv],A[r]
        inv=pow(A[r][c],p-2,p)
        for j in range(c,n):A[r][j]=A[r][j]*inv%p
        for i in range(m):
            if i!=r and A[i][c]:
                f=A[i][c]
                for j in range(c,n):A[i][j]=(A[i][j]-f*A[r][j])%p
        r+=1
        if r==m:return r
    return r

def measurement_rank(K,ids,M,p):
    # rows groups x basis columns
    A=[[0]*len(K) for _ in range(M)]
    for j,v in enumerate(K):
        for i,x in enumerate(v):A[ids[i]][j]=(A[ids[i]][j]+x)%p
    return rank_mod(A,p)

out={'date':'2026-08-30','Q1_exact_rational_dimensions':{'full':153,'persistent':146},'primes':{}}
for p in [65521,65519]:
    K=vec_basis(0,153,p);Kp=vec_basis(7,146,p)
    rec={}
    for name,vv in vals.items():
        ids,M=groupids(vv)
        rec[name]={'groups':M,'full_rank':measurement_rank(K,ids,M,p),'persistent_rank':measurement_rank(Kp,ids,M,p)}
        print(p,name,rec[name],flush=True)
    out['primes'][str(p)]=rec
(H/'P6_Q1_STRUCTURAL_OBSERVABILITY_ODDPRIME_v0.1_2026-08-30.json').write_text(json.dumps(out,indent=2))
