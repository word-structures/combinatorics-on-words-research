#!/usr/bin/env python3
from collections import defaultdict, Counter
import argparse, json, random

L=40
PROFILE={"a":(15,14,11),"e":(13,16,11),"f":(19,11,10)}
A_PROFILE=PROFILE["a"]; E_PROFILE=PROFILE["e"]; F_PROFILE=PROFILE["f"]

def add(a,b): return (a[0]+b[0],a[1]+b[1],a[2]+b[2])
def mul(k,a): return (k*a[0],k*a[1],k*a[2])

def prefix(w):
    out=[(0,0,0)]
    cur=[0,0,0]; idx={"a":0,"b":1,"c":2}
    for ch in w:
        cur=cur.copy(); cur[idx[ch]]+=1; out.append(tuple(cur))
    return out

def parikh(w): return prefix(w)[-1]

def random_profile_word(profile,rng):
    w=["a"]*profile[0]+["b"]*profile[1]+["c"]*profile[2]
    rng.shuffle(w); return "".join(w)

def symbolic_global_prefix(v,n,pA,pE):
    q,u=divmod(n,L)
    coeff=defaultdict(int); C=(0,0,0)
    for i in range(q):
        C=add(C,PROFILE[v[i]])
    if q < len(v) and u:
        role=v[q]
        if role=="f": coeff[u]+=1
        elif role=="a": C=add(C,pA[u])
        elif role=="e": C=add(C,pE[u])
    return dict(coeff),C

def combine(terms):
    coeff=defaultdict(int); C=(0,0,0)
    for k,cd,c in terms:
        for j,v in cd.items(): coeff[j]+=k*v
        C=add(C,mul(k,c))
    return tuple(sorted((j,c) for j,c in coeff.items() if c)),C

def compile_window(v,s,K,pA,pE):
    a0=symbolic_global_prefix(v,s,pA,pE)
    a1=symbolic_global_prefix(v,s+K,pA,pE)
    a2=symbolic_global_prefix(v,s+2*K,pA,pE)
    coeff,C=combine([(1,a0[0],a0[1]),(-2,a1[0],a1[1]),(1,a2[0],a2[1])])
    return {"cover":v,"s":s,"K":K,"coeff":coeff,"constant":C,"arity":len(coeff)}

def compile_gate(v,kmax,pA,pE):
    n=len(v)*L
    return [compile_window(v,s,K,pA,pE)
            for K in range(2,kmax+1)
            for s in range(n-2*K+1)]

def direct_square(v,s,K,A,E,F):
    blocks={"a":A,"e":E,"f":F}
    w="".join(blocks[r] for r in v)
    p=prefix(w)
    d=(p[s+2*K][0]-2*p[s+K][0]+p[s][0],
       p[s+2*K][1]-2*p[s+K][1]+p[s][1],
       p[s+2*K][2]-2*p[s+K][2]+p[s][2])
    return d==(0,0,0)

def eval_compiled(rec,F):
    pF=prefix(F)
    d=list(rec["constant"])
    for j,c in rec["coeff"]:
        x=pF[j]
        d[0]+=c*x[0]; d[1]+=c*x[1]; d[2]+=c*x[2]
    return tuple(d)==(0,0,0)

def geometry_class(rec,cover):
    left=rec["s"]; right=rec["s"]+2*rec["K"]
    for i,role in enumerate(cover):
        if i*L <= left and right <= (i+1)*L:
            return "internal_"+role
    return "cross_boundary"

def cutpoint_arity(v,s,K):
    c=0
    for pos in (s,s+K,s+2*K):
        q,u=divmod(pos,L)
        if q<len(v) and v[q]=="f": c+=1
    return c

def anatomy():
    A="a"*15+"b"*14+"c"*11
    E="a"*13+"b"*16+"c"*11
    pA=prefix(A); pE=prefix(E)
    out={}
    for v,kmax in (("faf",60),("afe",40)):
        recs=compile_gate(v,kmax,pA,pE)
        out[v]={
            "windows":len(recs),
            "cutpoint_arity":dict(sorted(Counter(cutpoint_arity(v,r["s"],r["K"]) for r in recs).items())),
            "free_variable_arity":dict(sorted(Counter(r["arity"] for r in recs).items())),
            "distinct_structural_signatures":len({(r["arity"],r["coeff"]) for r in recs}),
            "geometry":dict(Counter(geometry_class(r,v) for r in recs))
        }
    return out

def selftest(seed=20260828,trials=60):
    rng=random.Random(seed); comparisons=0; genuine=0
    branches=Counter()
    for _ in range(trials):
        A=random_profile_word(A_PROFILE,rng)
        E=random_profile_word(E_PROFILE,rng)
        F=random_profile_word(F_PROFILE,rng)
        pA=prefix(A); pE=prefix(E)
        for v,kmax in (("faf",60),("afe",40)):
            for rec in compile_gate(v,kmax,pA,pE):
                d=direct_square(v,rec["s"],rec["K"],A,E,F)
                c=eval_compiled(rec,F)
                comparisons+=1; genuine+=int(d); branches[(v,rec["arity"])]+=1
                if d!=c: raise AssertionError(("mismatch",v,rec))
    return {"seed":seed,"trials":trials,"comparisons":comparisons,
            "genuine_squares_seen":genuine,
            "branch_counts":{str(k):v for k,v in sorted(branches.items(),key=lambda kv:str(kv[0]))},
            "status":"PASS"}

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--selftest",action="store_true")
    ap.add_argument("--anatomy",action="store_true")
    args=ap.parse_args()
    if args.selftest: print(json.dumps(selftest(),indent=2))
    elif args.anatomy: print(json.dumps(anatomy(),indent=2))
    else: ap.print_help()

if __name__=="__main__": main()
