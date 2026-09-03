#!/usr/bin/env python3
from collections import defaultdict
import argparse, json, random

L=40
PROFILE={
"a":(15,14,11),"b":(11,12,17),"c":(10,14,16),
"d":(12,10,18),"e":(13,16,11),"f":(19,11,10)}
E_PROFILE=PROFILE["e"]; A_PROFILE=PROFILE["a"]; F_PROFILE=PROFILE["f"]

def add(a,b): return (a[0]+b[0],a[1]+b[1],a[2]+b[2])
def mul(k,a): return (k*a[0],k*a[1],k*a[2])

def prefix(w):
    out=[(0,0,0)]; a=b=c=0
    for ch in w:
        if ch=="a": a+=1
        elif ch=="b": b+=1
        else: c+=1
        out.append((a,b,c))
    return out
def parikh(w): return prefix(w)[-1]
def random_profile_word(prof,rng):
    x=["a"]*prof[0]+["b"]*prof[1]+["c"]*prof[2]
    rng.shuffle(x); return "".join(x)
def role_at(v,q,u):
    if q==len(v) and u==0: return "END"
    return v[q]

def symbolic(v,s,K):
    q,t=divmod(s,L); q1,u1=divmod(s+K,L); q2,u2=divmod(s+2*K,L)
    S1=(0,0,0)
    for i in range(q,q1): S1=add(S1,PROFILE[v[i]])
    S2=(0,0,0)
    for i in range(q,q2): S2=add(S2,PROFILE[v[i]])
    macro=add(S2,mul(-2,S1))
    return (s,K,q,t,q1,u1,q2,u2,
            (role_at(v,q,t),role_at(v,q1,u1),role_at(v,q2,u2)),macro)

def fixed_prefix(role,u,pE,pA):
    if role=="e": return pE[u]
    if role=="a": return pA[u]
    if role=="END":
        assert u==0; return (0,0,0)
    raise ValueError(role)

def solve_for_F(eq,pE,pA):
    s,K,q,t,q1,u1,q2,u2,roles,macro=eq
    coeff=(1,-2,1); offs=(t,u1,u2)
    fidx=[i for i,r in enumerate(roles) if r=="f"]
    if len(fidx)>1:
        raise AssertionError(("multiple F cutpoints",eq))
    C=macro
    for cc,u,r in zip(coeff,offs,roles):
        if r!="f":
            C=add(C,mul(cc,fixed_prefix(r,u,pE,pA)))
    if not fidx:
        return ("unavoidable",None,None) if C==(0,0,0) else ("inactive",None,None)
    i=fidx[0]; cc=coeff[i]; u=offs[i]
    if cc==1:
        target=(-C[0],-C[1],-C[2])
    else:
        if (C[0]&1) or (C[1]&1) or (C[2]&1):
            return ("inactive",None,None)
        target=(C[0]//2,C[1]//2,C[2]//2)
    feasible=(sum(target)==u and all(0<=target[k]<=F_PROFILE[k] for k in range(3)))
    if not feasible: return ("inactive",None,None)
    return ("forbid",u,target)

# Precompute all 3600 structural equations once.
EAFEA_EQS=[]
for K in range(41,101):
    for s in range(200-2*K+1):
        EAFEA_EQS.append(symbolic("eafea",s,K))
assert len(EAFEA_EQS)==3600

def compile_full_eafea(E,A):
    assert parikh(E)==E_PROFILE and parikh(A)==A_PROFILE
    pE=prefix(E); pA=prefix(A)
    forbidden=defaultdict(set); unavoidable=[]; inactive=0
    compiled=[]
    for eq in EAFEA_EQS:
        sol=solve_for_F(eq,pE,pA)
        compiled.append((eq,sol))
        if sol[0]=="forbid": forbidden[sol[1]].add(sol[2])
        elif sol[0]=="unavoidable": unavoidable.append(eq)
        else: inactive+=1
    return forbidden,unavoidable,compiled,{
        "total_windows":3600,
        "unavoidable_windows":len(unavoidable),
        "inactive_windows":inactive,
        "distinct_forbidden_states":sum(len(v) for v in forbidden.values()),
        "forbidden_states_by_depth":{str(j):len(forbidden[j]) for j in sorted(forbidden)}}

def dp_full_eafea(E,A):
    forbidden,unavoidable,compiled,summary=compile_full_eafea(E,A)
    if unavoidable:
        return {**summary,"path_exists":False,"path_count":0,
                "reachable_state_counts_by_depth":[1,0],
                "reason":"F-order-independent unavoidable square"}
    states={(0,0,0):1}; layers=[1]
    for depth in range(1,41):
        nxt=defaultdict(int)
        for st,cnt in states.items():
            for c in range(3):
                if st[c]>=F_PROFILE[c]: continue
                ns=list(st); ns[c]+=1; ns=tuple(ns)
                if ns in forbidden.get(depth,set()): continue
                nxt[ns]+=cnt
        states=dict(nxt); layers.append(len(states))
    n=states.get(F_PROFILE,0)
    return {**summary,"path_exists":n>0,"path_count":n,
            "reachable_state_counts_by_depth":layers,"reason":"DAG completed"}

def check_compilation(E,A,F):
    forbidden,unavoidable,compiled,summary=compile_full_eafea(E,A)
    pF=prefix(F); w=E+A+F+E+A; p=prefix(w)
    bad=[]
    for eq,sol in compiled:
        s,K=eq[0],eq[1]
        d=(p[s+2*K][0]-2*p[s+K][0]+p[s][0],
           p[s+2*K][1]-2*p[s+K][1]+p[s][1],
           p[s+2*K][2]-2*p[s+K][2]+p[s][2])
        direct=(d==(0,0,0))
        if sol[0]=="unavoidable": pred=True
        elif sol[0]=="inactive": pred=False
        else: pred=(pF[sol[1]]==sol[2])
        if direct!=pred: bad.append((eq,sol,d))
    return bad

def selftest(seed=20260828,trials=60):
    rng=random.Random(seed); comps=0; genuine=0
    for _ in range(trials):
        E=random_profile_word(E_PROFILE,rng)
        A=random_profile_word(A_PROFILE,rng)
        F=random_profile_word(F_PROFILE,rng)
        bad=check_compilation(E,A,F)
        if bad: raise AssertionError(bad[0])
        comps+=3600
        w=E+A+F+E+A; p=prefix(w)
        for eq in EAFEA_EQS:
            s,K=eq[0],eq[1]
            d=(p[s+2*K][0]-2*p[s+K][0]+p[s][0],
               p[s+2*K][1]-2*p[s+K][1]+p[s][1],
               p[s+2*K][2]-2*p[s+K][2]+p[s][2])
            genuine += (d==(0,0,0))
    return {"seed":seed,"trials":trials,"comparisons":comps,
            "genuine_squares_seen":genuine,"status":"PASS"}

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--selftest",action="store_true")
    ap.add_argument("--E"); ap.add_argument("--A"); ap.add_argument("--F")
    args=ap.parse_args()
    if args.selftest:
        print(json.dumps(selftest(),indent=2)); return
    if args.E and args.A:
        out={"E_profile":parikh(args.E),"A_profile":parikh(args.A),
             "full_eafea_longband_DP":dp_full_eafea(args.E,args.A)}
        if args.F:
            out["F_profile"]=parikh(args.F)
            out["direct_compilation_disagreements"]=len(check_compilation(args.E,args.A,args.F))
        print(json.dumps(out,indent=2)); return
    ap.print_help()
if __name__=="__main__": main()
