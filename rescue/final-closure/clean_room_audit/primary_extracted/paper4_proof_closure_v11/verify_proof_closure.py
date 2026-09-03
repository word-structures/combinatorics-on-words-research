#!/usr/bin/env python3
from itertools import product
from collections import defaultdict
import json, math

def red(terms):
    d={}
    for i,c in terms:
        if i != 0:
            d[i]=d.get(i,0)+c
    return tuple(sorted((i,c) for i,c in d.items() if c))

def triples_Z(L):
    return [(u,v,w) for u in range(L) for v in range(L) for w in range(L)
            if u+w==2*v]

def triples_P(L):
    return [(u,v,w) for u in range(L) for v in range(L) for w in range(L)
            if u+w==2*v-L]

def triples_M(L):
    return [(u,v,w) for u in range(L) for v in range(L) for w in range(L)
            if u+w==2*v+L]

def triples_Zs(L):
    return [(a,a+h,a+2*h)
            for h in range(2,(L-1)//2+1)
            for a in range(0,L-2*h)]

def project(T,chi):
    out=set()
    for u,v,w in T:
        terms=[]
        if chi[0]: terms.append((u,1))
        if chi[1]: terms.append((v,-2))
        if chi[2]: terms.append((w,1))
        out.add(red(terms))
    return frozenset(out)

def families(L):
    Z=triples_Z(L); P=triples_P(L); M=triples_M(L); Zs=triples_Zs(L)
    pp=(L-2,L-1,0)
    pm=(L-1,0,1)
    Pt=[t for t in P if t!=pp]
    Mt=[t for t in M if t!=pm]
    return {
      "E": frozenset([tuple()]),
      "Zs-A": project(Zs,(1,1,1)),
      "Z-O": project(Z,(0,0,1)),
      "Z-C": project(Z,(0,1,0)),
      "Z-M": project(Z,(0,1,1)),
      "Z-OO": project(Z,(1,0,1)),
      "Z-A": project(Z,(1,1,1)),
      "P-O": project(P,(0,0,1)),
      "P-C": project(P,(0,1,0)),
      "P-M": project(P,(0,1,1)),
      "P-OO": project(P,(1,0,1)),
      "P-A": project(P,(1,1,1)),
      "Pt-M": project(Pt,(1,1,0)),
      "M-O": project(M,(1,0,0)),
      "M-C": project(M,(0,1,0)),
      "M-M": project(M,(0,1,1)),
      "M-OO": project(M,(1,0,1)),
      "M-A": project(M,(1,1,1)),
      "Mt-M": project(Mt,(0,1,1)),
    }

ORDER=[
 "E","Zs-A",
 "Z-O","Z-C","Z-M","Z-OO","Z-A",
 "P-O","P-C","P-M","P-OO","P-A","Pt-M",
 "M-O","M-C","M-M","M-OO","M-A","Mt-M"
]

def formula(name,L):
    n=L//2
    return {
      "E":1,
      "Zs-A":((L-3)*(L-3))//4,
      "Z-O":L,
      "Z-C":L,
      "Z-M":(L*L+1)//2,
      "Z-OO":((L+1)*(L+1))//4,
      "Z-A":((L-1)*(L-1))//4+1,
      "P-O":L-1,
      "P-C":n,
      "P-M":(L*L)//4,
      "P-OO":n*(n+1)//2,
      "P-A":n*(n+1)//2,
      "Pt-M":(L*L)//4-1,
      "M-O":L-1,
      "M-C":n,
      "M-M":(L*L)//4,
      "M-OO":n*(n+1)//2,
      "M-A":n*(n+1)//2,
      "Mt-M":(L*L)//4-1,
    }[name]

def shape(sig):
    return tuple(sorted(c for _,c in sig))

def domain(L,g,d):
    out=set()
    for a in range(L):
        for h in range(-(L-1),L):
            i1=a+h
            i2=a+2*h-d*L
            if 0<=i1<L and 0<=i2<L and g*L+h>=2:
                out.add((a,h))
    return frozenset(out)

def domain_triples(L,g,d):
    return frozenset((a,a+h,a+2*h-d*L) for a,h in domain(L,g,d))

def direct_sig(mask,L,s,K):
    ts=(s,s+K,s+2*K)
    terms=[]
    coeff=(1,-2,1)
    bis=[]; loc=[]
    for q,t in enumerate(ts):
        b,i=divmod(t,L)
        bis.append(b);loc.append(i)
        if mask[b] and i:
            terms.append((i,coeff[q]))
    return red(terms),bis,loc

def classify_window(L,s,K):
    q,r=divmod(K,L)
    i0=s%L
    i1=(i0+r)%L
    c0=(i0+r)//L
    i2=(i1+r)%L
    c1=(i1+r)//L
    if q==0 and (c0,c1)==(0,0): return "Zs"
    if q==0 and (c0,c1)==(0,1): return "Pt"
    if q==0 and (c0,c1)==(1,0): return "Mt"
    d=c1-c0
    return {0:"Z",1:"P",-1:"M"}[d]

def family_for(label,chi):
    if chi==(0,0,0): return "E"
    table={
      ("Zs",(1,1,1)):"Zs-A",
      ("Pt",(0,0,1)):"P-O",
      ("Pt",(1,1,0)):"Pt-M",
      ("Pt",(1,1,1)):"P-A",
      ("Mt",(1,0,0)):"M-O",
      ("Mt",(0,1,1)):"Mt-M",
      ("Mt",(1,1,1)):"M-A",
    }
    if (label,chi) in table: return table[(label,chi)]
    if label in ("Z","P","M"):
        base={
          (0,0,1):"O",(1,0,0):"O",
          (0,1,0):"C",
          (0,1,1):"M",(1,1,0):"M",
          (1,0,1):"OO",
          (1,1,1):"A"
        }[chi]
        return f"{label}-{base}"
    raise KeyError((label,chi))

def small_family_count(L):
    # Use exact tau semantics to expose the small-L phase.
    def f_tau(g,d,chi):
        out=set()
        for a in range(L):
            for h in range(-(L-1),L):
                i1=a+h;i2=a+2*h-d*L
                if 0<=i1<L and 0<=i2<L and g*L+h>=2:
                    out.add(red([(a,1)]*(chi[0])+
                                [(i1,-2)]*(chi[1])+
                                [(i2,1)]*(chi[2])))
        return frozenset(out)
    vals=[]
    for g in (0,1,2):
        for d in (-1,0,1):
            if g+d<0: continue
            for chi in product((0,1),repeat=3):
                if g==0 and chi[0]!=chi[1]: continue
                if g+d==0 and chi[1]!=chi[2]: continue
                vals.append(f_tau(g,d,chi))
    return len(set(vals))

def run():
    failures=[]
    formula_checks=0
    distinct_checks=0
    fingerprint_checks=0

    # Pure family-set checks over a wide range.
    for L in list(range(5,101))+[128,160,200]:
        F=families(L)
        if set(F)!=set(ORDER):
            failures.append(("family-name-set",L))
        for name in ORDER:
            formula_checks+=1
            if len(F[name])!=formula(name,L):
                failures.append(("formula",L,name,len(F[name]),formula(name,L)))
        distinct_checks+=1
        if len(set(F.values()))!=19:
            failures.append(("distinct",L,len(set(F.values()))))
        fp=[(len(F[n]),tuple(sorted(set(shape(s) for s in F[n])))) for n in ORDER]
        fingerprint_checks+=1
        if len(set(fp))!=19:
            failures.append(("size+shape-fingerprint",L))

        # Six domain identities.
        if domain_triples(L,0,0)!=frozenset(triples_Zs(L)):
            failures.append(("Zs-domain",L))
        P=frozenset(triples_P(L)); M=frozenset(triples_M(L)); Z=frozenset(triples_Z(L))
        if domain_triples(L,1,0)!=Z or domain_triples(L,2,0)!=Z:
            failures.append(("Z-full-domain",L))
        if domain_triples(L,1,1)!=P or domain_triples(L,2,1)!=P:
            failures.append(("P-full-domain",L))
        if domain_triples(L,2,-1)!=M:
            failures.append(("M-full-domain",L))
        if domain_triples(L,0,1)!=P-{(L-2,L-1,0)}:
            failures.append(("Pt-one-point",L))
        if domain_triples(L,1,-1)!=M-{(L-1,0,1)}:
            failures.append(("Mt-one-point",L))

    # Direct absolute-window attack, independently from triple-set definitions.
    direct_windows=0
    masks_tested=0
    direct_fail=[]
    for L in range(5,11):
        N=6
        F=families(L)
        for bits in product((0,1),repeat=N):
            masks_tested+=1
            total=N*L
            for s in range(total):
                # strict t2<total removes the artificial finite right endpoint
                for K in range(2,(total-1-s)//2+1):
                    t2=s+2*K
                    if t2>=total: continue
                    sig,b,loc=direct_sig(bits,L,s,K)
                    label=classify_window(L,s,K)
                    chi=(bits[b[0]],bits[b[1]],bits[b[2]])
                    try:
                        name=family_for(label,chi)
                    except Exception:
                        direct_fail.append(("unclassified",L,bits,s,K,label,chi,b,loc))
                        break
                    if sig not in F[name]:
                        direct_fail.append(("signature-not-in-family",L,bits,s,K,label,chi,name,sig,b,loc))
                        break
                    direct_windows+=1
                if direct_fail: break
            if direct_fail: break
        if direct_fail: break

    # Critical equality/difference checks used in 34->19 proof.
    critical=[]
    for L in range(5,101):
        Z=triples_Z(L);P=triples_P(L);M=triples_M(L)
        pp=(L-2,L-1,0);pm=(L-1,0,1)
        Pt=[t for t in P if t!=pp];Mt=[t for t in M if t!=pm]
        checks=[
          ("P-outer",project(Pt,(0,0,1)),project(P,(0,0,1))),
          ("P-all",project(Pt,(1,1,1)),project(P,(1,1,1))),
          ("M-outer",project(Mt,(1,0,0)),project(M,(1,0,0))),
          ("M-all",project(Mt,(1,1,1)),project(M,(1,1,1))),
        ]
        for tag,a,b in checks:
            if a!=b: critical.append((L,tag))
        fullP=project(P,(1,1,0));trP=project(Pt,(1,1,0))
        if fullP-trP != {red([(L-2,1),(L-1,-2)])} or trP-fullP:
            critical.append((L,"Pt-mixed-difference"))
        fullM=project(M,(0,1,1));trM=project(Mt,(0,1,1))
        if fullM-trM != {red([(1,1)])} or trM-fullM:
            critical.append((L,"Mt-mixed-difference"))

    out={
      "status":"PASS" if not failures and not direct_fail and not critical else "FAIL",
      "formula_checks":formula_checks,
      "distinct_family_checks":distinct_checks,
      "size_shape_fingerprint_checks":fingerprint_checks,
      "direct_masks_tested":masks_tested,
      "direct_windows_classified":direct_windows,
      "general_failures":failures,
      "direct_window_failures":direct_fail,
      "critical_34_to_19_failures":critical,
      "small_L_realizable_family_counts":{str(L):small_family_count(L) for L in range(2,8)}
    }
    return out

if __name__=="__main__":
    print(json.dumps(run(),indent=2))
