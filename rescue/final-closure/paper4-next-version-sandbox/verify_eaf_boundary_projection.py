#!/usr/bin/env python3
from __future__ import annotations
from collections import defaultdict
import argparse, json, random

L = 40
PROFILE = {
    "a": (15,14,11),
    "b": (11,12,17),
    "c": (10,14,16),
    "d": (12,10,18),
    "e": (13,16,11),
    "f": (19,11,10),
}
E_PROFILE = PROFILE["e"]
A_PROFILE = PROFILE["a"]
F_PROFILE = PROFILE["f"]

def vadd(a,b): return tuple(x+y for x,y in zip(a,b))
def vsub(a,b): return tuple(x-y for x,y in zip(a,b))
def vmul(k,a): return tuple(k*x for x in a)

def prefix_parikh(w):
    p=[(0,0,0)]
    cur=[0,0,0]
    idx={"a":0,"b":1,"c":2}
    for ch in w:
        cur=cur.copy()
        cur[idx[ch]] += 1
        p.append(tuple(cur))
    return p

def parikh(w):
    return prefix_parikh(w)[-1]

def random_profile_word(profile, rng):
    letters=["a"]*profile[0]+["b"]*profile[1]+["c"]*profile[2]
    rng.shuffle(letters)
    return "".join(letters)

def direct_residual(w,s,K):
    p=prefix_parikh(w)
    return tuple(p[s+2*K][i]-2*p[s+K][i]+p[s][i] for i in range(3))

def role_at(v,q,u):
    if q==len(v) and u==0:
        return "END"
    return v[q]

def block_prefix(blocks,role,u):
    if role=="END":
        assert u==0
        return (0,0,0)
    return prefix_parikh(blocks[role])[u]

def symbolic_equation(v,s,K):
    assert 0 <= s and s+2*K <= len(v)*L
    q,t=divmod(s,L)
    q1,u1=divmod(s+K,L)
    q2,u2=divmod(s+2*K,L)
    S1=(0,0,0)
    for i in range(q,q1):
        S1=vadd(S1,PROFILE[v[i]])
    S2=(0,0,0)
    for i in range(q,q2):
        S2=vadd(S2,PROFILE[v[i]])
    macro=vadd(S2,vmul(-2,S1))
    return {
        "s":s,"K":K,"r":K-L,
        "q":q,"t":t,"q1":q1,"u1":u1,"q2":q2,"u2":u2,
        "roles":[role_at(v,q,t),role_at(v,q1,u1),role_at(v,q2,u2)],
        "macro":list(macro),
    }

def eval_symbolic(eq,blocks):
    r0,r1,r2=eq["roles"]
    b0=block_prefix(blocks,r0,eq["t"])
    b1=block_prefix(blocks,r1,eq["u1"])
    b2=block_prefix(blocks,r2,eq["u2"])
    return vadd(vadd(b0,vmul(-2,b1)),vadd(b2,tuple(eq["macro"])))

def no_carry_eaf_forbidden(E,A):
    assert len(E)==len(A)==L
    assert parikh(E)==E_PROFILE
    assert parikh(A)==A_PROFILE
    pE=prefix_parikh(E)
    pA=prefix_parikh(A)
    delta=vsub(E_PROFILE,A_PROFILE)
    by_j=defaultdict(set)
    records=[]
    for j in range(2,L):
        for r in range(1,j//2+1):
            t=j-2*r
            target=vadd(delta,vadd(vmul(-1,pE[t]),vmul(2,pA[j-r])))
            assert sum(target)==j
            feasible=all(0 <= target[i] <= F_PROFILE[i] for i in range(3))
            rec={"j":j,"r":r,"K":L+r,"t":t,
                 "target":list(target),"target_feasible":feasible}
            records.append(rec)
            if feasible:
                by_j[j].add(target)
    assert len(records)==380
    return by_j,records

def projected_direct_equivalence(E,A,F):
    w=E+A+F
    p=prefix_parikh(w)
    pF=prefix_parikh(F)
    _,records=no_carry_eaf_forbidden(E,A)
    disagreements=[]
    for rec in records:
        t=rec["t"]; K=rec["K"]
        direct=tuple(p[t+2*K][i]-2*p[t+K][i]+p[t][i] for i in range(3))
        is_square=(direct==(0,0,0))
        projected=(pF[rec["j"]]==tuple(rec["target"]))
        if is_square != projected:
            disagreements.append({"record":rec,"direct":direct,"pF":pF[rec["j"]]})
    return disagreements

def projected_violation(E,A,F):
    pF=prefix_parikh(F)
    _,records=no_carry_eaf_forbidden(E,A)
    for rec in records:
        if pF[rec["j"]]==tuple(rec["target"]):
            return rec
    return None

def relaxed_f_prefix_dag(E,A):
    forbidden,_=no_carry_eaf_forbidden(E,A)
    states={(0,0,0):1}
    layer_counts=[1]
    for j in range(L):
        nxt=defaultdict(int)
        for st,count in states.items():
            for c in range(3):
                if st[c] >= F_PROFILE[c]:
                    continue
                ns=list(st); ns[c]+=1; ns=tuple(ns)
                depth=j+1
                if ns in forbidden.get(depth,set()):
                    continue
                nxt[ns]+=count
        states=dict(nxt)
        layer_counts.append(len(states))
    nwords=states.get(F_PROFILE,0)
    return {
        "path_exists":nwords>0,
        "number_of_words_avoiding_projected_family":nwords,
        "reachable_state_counts_by_depth":layer_counts,
        "forbidden_feasible_states_by_depth":{
            str(j):len(forbidden[j]) for j in sorted(forbidden)
        },
        "total_distinct_feasible_forbidden_states":sum(len(x) for x in forbidden.values()),
    }

def regime_summary(v,kmin=41,kmax=100):
    groups={}
    total=0
    for K in range(kmin,kmax+1):
        maxs=len(v)*L-2*K
        if maxs<0:
            continue
        for s in range(maxs+1):
            total+=1
            e=symbolic_equation(v,s,K)
            key=(tuple(e["roles"]),tuple(e["macro"]))
            if key not in groups:
                groups[key]={"count":0,"Kmin":10**9,"Kmax":-1}
            g=groups[key]
            g["count"]+=1
            g["Kmin"]=min(g["Kmin"],K)
            g["Kmax"]=max(g["Kmax"],K)
    out=[]
    for (roles,macro),g in groups.items():
        out.append({
            "roles":list(roles),
            "macro":list(macro),
            "macro_L1":sum(abs(x) for x in macro),
            **g,
        })
    out.sort(key=lambda x:(x["macro_L1"],x["Kmin"],x["roles"],x["macro"]))
    return {"cover":v,"total_windows":total,"regimes":out}

def selftest(seed=20260828,trials=40):
    rng=random.Random(seed)
    comparisons=0
    genuine=0
    for _ in range(trials):
        blocks={r:random_profile_word(PROFILE[r],rng) for r in "aef"}
        for v in ("eafea","fafea"):
            w="".join(blocks[r] for r in v)
            for K in range(41,101):
                maxs=len(w)-2*K
                if maxs<0:
                    continue
                for s in range(maxs+1):
                    eq=symbolic_equation(v,s,K)
                    a=eval_symbolic(eq,blocks)
                    b=direct_residual(w,s,K)
                    comparisons+=1
                    if a!=b:
                        raise AssertionError(("symbolic/direct mismatch",v,s,K,eq,a,b))
                    if b==(0,0,0):
                        genuine+=1
        if projected_direct_equivalence(blocks["e"],blocks["a"],blocks["f"]):
            raise AssertionError("projected/direct mismatch")

    e=regime_summary("eafea",41,100)
    f=regime_summary("fafea",41,100)

    def has(rs,roles,macro,kmin,kmax):
        for x in rs["regimes"]:
            if x["roles"]==list(roles) and x["macro"]==list(macro) and x["Kmin"]==kmin and x["Kmax"]==kmax:
                return True
        return False

    assert has(e,("e","a","f"),(2,-2,0),41,59)
    assert has(f,("f","a","f"),(-4,3,1),41,59)
    assert has(f,("f","f","a"),(-2,2,0),61,99)

    return {
        "seed":seed,
        "trials":trials,
        "symbolic_direct_comparisons":comparisons,
        "genuine_direct_squares_seen":genuine,
        "status":"PASS",
    }

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--selftest",action="store_true")
    ap.add_argument("--json-regimes",action="store_true")
    ap.add_argument("--E")
    ap.add_argument("--A")
    ap.add_argument("--F")
    args=ap.parse_args()

    if args.selftest:
        print(json.dumps(selftest(),indent=2)); return
    if args.json_regimes:
        print(json.dumps({
            "eafea":regime_summary("eafea",41,100),
            "fafea":regime_summary("fafea",41,100),
        },indent=2)); return
    if args.E and args.A:
        result={
            "E_profile":parikh(args.E),
            "A_profile":parikh(args.A),
            "projected_DP":relaxed_f_prefix_dag(args.E,args.A),
        }
        if args.F:
            result["F_profile"]=parikh(args.F)
            result["first_projected_violation"]=projected_violation(args.E,args.A,args.F)
            result["projection_direct_disagreements"]=len(projected_direct_equivalence(args.E,args.A,args.F))
        print(json.dumps(result,indent=2)); return
    ap.print_help()

if __name__=="__main__":
    main()
