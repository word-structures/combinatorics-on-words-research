#!/usr/bin/env python3
from itertools import product
from collections import Counter, defaultdict
import statistics, json

ALPH = (0,1,2)
ROLES = list("abcdef")
H6 = {'a':'ace','b':'adf','c':'bdf','d':'bdc','e':'afe','f':'bce'}
COEFFS = (1,-2,1)

def h6_iter(n):
    s='a'
    for _ in range(n):
        s=''.join(H6[c] for c in s)
    return s

SOURCE = h6_iter(6)

def parikh_word(w):
    c=[0,0,0]
    for x in w:
        c[x]+=1
    return tuple(c)

def all_words_profile(rho):
    L=sum(rho)
    out=[]
    def rec(pref, counts):
        if len(pref)==L:
            out.append(tuple(pref)); return
        for a in ALPH:
            if counts[a] < rho[a]:
                cc=list(counts); cc[a]+=1
                rec(pref+[a], tuple(cc))
    rec([], (0,0,0))
    return out

def balanced_word(rho, phase=0):
    rem=list(rho)
    out=[]
    for i in range(sum(rho)):
        order=[(phase+i+j)%3 for j in range(3)]
        avail=[a for a in order if rem[a]>0]
        best=max(avail, key=lambda a: rem[a])
        out.append(best); rem[best]-=1
    return tuple(out)

def profiles_for_L(L):
    if L==5:
        return {'a':(2,1,2),'b':(1,2,2),'c':(2,2,1),'d':(3,1,1),'e':(1,3,1),'f':(1,1,3)}
    if L==6:
        return {'a':(2,2,2),'b':(3,1,2),'c':(2,3,1),'d':(1,2,3),'e':(3,2,1),'f':(1,3,2)}
    if L==8:
        return {'a':(3,2,3),'b':(2,3,3),'c':(3,3,2),'d':(4,2,2),'e':(2,4,2),'f':(2,2,4)}
    raise ValueError(L)

def blocks_for_profiles(ps, unresolved=set()):
    return {r:balanced_word(ps[r],phase=i) for i,r in enumerate(ROLES) if r not in unresolved}

def pv_add(*vs):
    return tuple(sum(v[i] for v in vs) for i in range(3))
def pv_sub(a,b):
    return tuple(a[i]-b[i] for i in range(3))
def pv_scale(c,v):
    return tuple(c*x for x in v)
def prefix_pv(w,d):
    return parikh_word(w[:d])

def matrix_times_d(ps,dct):
    v=[0,0,0]
    for r,coef in dct.items():
        rho=ps[r]
        for i in range(3):
            v[i]+=coef*rho[i]
    return tuple(v)

def source_d(src,m0,m1,m2):
    c1=Counter(src[m0+1:m1])
    c2=Counter(src[m1+1:m2])
    return {r:c2[r]-c1[r] for r in ROLES if c2[r]-c1[r]}

def witness(src,L,start_block,u,K):
    m0=start_block
    m1=start_block+(u+K)//L
    m2=start_block+(u+2*K)//L
    if m2>=len(src): return None
    return (m0,m1,m2,u,(u+K)%L,(u+2*K)%L,
            src[m0],src[m1],src[m2],source_d(src,m0,m1,m2))

def literal_diff(wit,ps,blocks):
    m0,m1,m2,i0,i1,i2,r0,r1,r2,d=wit
    L=sum(next(iter(ps.values())))
    concat=()
    for b in range(m0,m2+1):
        concat += blocks[SOURCE[b]]
    a=i0
    b=(m1-m0)*L+i1
    c=(m2-m0)*L+i2
    return pv_sub(parikh_word(concat[b:c]),parikh_word(concat[a:b]))

def rr_value(wit,ps,blocks):
    m0,m1,m2,i0,i1,i2,r0,r1,r2,d=wit
    P0=prefix_pv(blocks[r0],i0)
    P1=prefix_pv(blocks[r1],i1)
    P2=prefix_pv(blocks[r2],i2)
    S0=pv_sub(ps[r0],P0)
    S1=pv_sub(ps[r1],P1)
    B=pv_sub(pv_add(S1,P2),pv_add(S0,P1))
    return pv_add(matrix_times_d(ps,d),B)

def const_sigma_for_role(wit,ps,assigned,role):
    m0,m1,m2,i0,i1,i2,r0,r1,r2,d=wit
    C=pv_add(matrix_times_d(ps,d),pv_sub(ps[r1],ps[r0]))
    terms=[]
    for coef,r,dep in zip(COEFFS,(r0,r1,r2),(i0,i1,i2)):
        if r==role:
            terms.append((coef,dep))
        else:
            C=pv_add(C,pv_scale(coef,prefix_pv(assigned[r],dep)))
    return C,tuple(terms)

def const_sigmas_multi(wit,ps,assigned,roleset):
    m0,m1,m2,i0,i1,i2,r0,r1,r2,d=wit
    C=pv_add(matrix_times_d(ps,d),pv_sub(ps[r1],ps[r0]))
    terms={r:[] for r in roleset}
    for coef,r,dep in zip(COEFFS,(r0,r1,r2),(i0,i1,i2)):
        if r in roleset:
            terms[r].append((coef,dep))
        else:
            C=pv_add(C,pv_scale(coef,prefix_pv(assigned[r],dep)))
    return C,{r:tuple(v) for r,v in terms.items()}

def sig_value(word,terms):
    v=(0,0,0)
    for coef,dep in terms:
        v=pv_add(v,pv_scale(coef,prefix_pv(word,dep)))
    return v

def normalize_terms(terms):
    dd=defaultdict(int)
    for coef,d in terms:
        if d!=0: dd[d]+=coef
    return tuple(sorted((d,c) for d,c in dd.items() if c))

def sig_value_norm(word,norm):
    v=(0,0,0)
    for dep,coef in norm:
        v=pv_add(v,pv_scale(coef,prefix_pv(word,dep)))
    return v

def fixed_completion_oracle(L,starts=20):
    ps=profiles_for_L(L); blocks=blocks_for_profiles(ps)
    bad=[]; n=0
    for K in range(L,3*L+1):
        for u in range(L):
            for st in range(starts):
                wit=witness(SOURCE,L,st,u,K)
                a=rr_value(wit,ps,blocks); b=literal_diff(wit,ps,blocks)
                if a!=b: bad.append((st,u,K,a,b))
                n+=1
    return {"L":L,"comparisons":n,"mismatches":len(bad),"first_mismatches":bad[:3]}

def q0_scope_control(L,starts=10):
    ps=profiles_for_L(L); blocks=blocks_for_profiles(ps)
    n=Counter(); bad=Counter()
    for K in range(2,L):
        for u in range(L):
            for st in range(starts):
                wit=witness(SOURCE,L,st,u,K)
                m0,m1,m2=wit[:3]
                if m0==m1==m2: pat="all_same_occurrence"
                elif m0==m1: pat="same_01"
                elif m1==m2: pat="same_12"
                else: pat="three_distinct_occurrences"
                n[pat]+=1
                if rr_value(wit,ps,blocks)!=literal_diff(wit,ps,blocks):
                    bad[pat]+=1
    return {"L":L,"cases":dict(n),"algebra_mismatches":dict(bad)}

def one_unresolved_oracle(L,role='a',starts=30):
    ps=profiles_for_L(L)
    assigned=blocks_for_profiles(ps,{role})
    words=all_words_profile(ps[role])
    lit=set(); par=set(); sigcounts=Counter(); rss={}
    for K in range(L,3*L+1):
        for u in range(L):
            for st in range(starts):
                wit=witness(SOURCE,L,st,u,K); key=(st,u,K)
                C,terms=const_sigma_for_role(wit,ps,assigned,role)
                norm=normalize_terms(terms); sigcounts[norm]+=1
                if norm not in rss:
                    rss[norm]={sig_value_norm(w,norm) for w in words}
                if pv_scale(-1,C) in rss[norm]:
                    par.add(key)
                blocks=dict(assigned)
                for w in words:
                    blocks[role]=w
                    if literal_diff(wit,ps,blocks)==(0,0,0):
                        lit.add(key); break
    total=sum(sigcounts.values())
    return {
        "L":L,"unresolved_role":role,"profile":ps[role],
        "literal_words":len(words),"witnesses":total,
        "literal_possible_witnesses":len(lit),
        "parametric_possible_witnesses":len(par),
        "missing":len(lit-par),"spurious":len(par-lit),
        "excluded_by_parametric_sieve":total-len(par),
        "excluded_pct":100*(total-len(par))/total,
        "unique_normalized_signatures":len(sigcounts),
        "literal_witness_word_candidate_pairs":total*len(words),
        "reachable_precompute_word_evals":len(sigcounts)*len(words),
        "membership_queries":total,
        "mean_unique_reachable_set_size":statistics.mean(len(v) for v in rss.values())
    }

def two_unresolved_oracle(L=5,roles=('a','b'),starts=12):
    ps=profiles_for_L(L); rs=set(roles)
    assigned=blocks_for_profiles(ps,rs)
    words={r:all_words_profile(ps[r]) for r in roles}
    lit=set(); par=set(); total=0
    for K in range(L,3*L+1):
        for u in range(L):
            for st in range(starts):
                total+=1
                wit=witness(SOURCE,L,st,u,K); key=(st,u,K)
                C,terms=const_sigmas_multi(wit,ps,assigned,rs)
                vals={r:{sig_value(w,terms[r]) for w in words[r]} for r in roles}
                sums={(0,0,0)}
                for r in roles:
                    sums={pv_add(a,b) for a in sums for b in vals[r]}
                if pv_scale(-1,C) in sums: par.add(key)
                found=False
                for wa in words[roles[0]]:
                    if found: break
                    for wb in words[roles[1]]:
                        blocks=dict(assigned); blocks[roles[0]]=wa; blocks[roles[1]]=wb
                        if literal_diff(wit,ps,blocks)==(0,0,0):
                            found=True; break
                if found: lit.add(key)
    return {
        "L":L,"unresolved_roles":roles,
        "literal_words_each":{r:len(words[r]) for r in roles},
        "cartesian_completions_per_witness":len(words[roles[0]])*len(words[roles[1]]),
        "witnesses":total,
        "literal_possible_witnesses":len(lit),
        "minkowski_possible_witnesses":len(par),
        "missing":len(lit-par),"spurious":len(par-lit)
    }

def shared_word_control(L=5,role='a',starts=10):
    ps=profiles_for_L(L); assigned=blocks_for_profiles(ps,{role})
    words=all_words_profile(ps[role]); candidates=[]
    for K in range(L,3*L+1):
        for u in range(L):
            for st in range(starts):
                wit=witness(SOURCE,L,st,u,K)
                C,terms=const_sigma_for_role(wit,ps,assigned,role)
                bad=set(); blocks=dict(assigned)
                for w in words:
                    blocks[role]=w
                    if literal_diff(wit,ps,blocks)==(0,0,0):
                        bad.add(w)
                if bad and len(bad)<len(words):
                    candidates.append((wit,C,terms,bad))
    survivors=set(words); chosen=[]
    for cand in candidates:
        new=survivors-cand[3]
        if len(new)>=3 and len(new)<len(survivors):
            chosen.append(cand); survivors=new
    param=set(words)
    for wit,C,terms,bad in chosen:
        param={w for w in param if pv_add(C,sig_value(w,terms))!=(0,0,0)}
    return {
        "L":L,"profile":ps[role],"initial_words":len(words),
        "joint_constraints_selected":len(chosen),
        "literal_survivors":len(survivors),
        "parametric_shared_word_survivors":len(param),
        "solution_set_symmetric_difference":len(survivors^param)
    }

def main():
    result={
        "source":"h6^6(a)","source_blocks":len(SOURCE),
        "scope":"RR bridge theorem test uses q>=1 / distinct source boundary occurrences",
        "P0_fixed_completion":[fixed_completion_oracle(L) for L in (5,6,8)],
        "P0_q0_scope_control":[q0_scope_control(L) for L in (5,6,8)],
        "P1_P2_one_unresolved":[one_unresolved_oracle(L) for L in (5,6,8)],
        "P3_two_unresolved":two_unresolved_oracle(),
        "P4_shared_word_control":shared_word_control()
    }
    with open("PARTIAL_TARGET_PARENT_CLEANROOM_RESULTS.json","w") as f:
        json.dump(result,f,indent=2)
    print(json.dumps(result,indent=2))

if __name__=="__main__":
    main()
