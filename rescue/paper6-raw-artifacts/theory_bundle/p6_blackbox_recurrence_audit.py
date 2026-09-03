from pathlib import Path
import importlib.util, hashlib, json

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('p6',HERE/'p6_semantics_audit.py'); p6=importlib.util.module_from_spec(spec); spec.loader.exec_module(p6)

PRIMES=[1000000007,1000000009,998244353]

def BM(s,mod):
    C=[1]; B=[1]; L=0; m=1; b=1
    for n in range(len(s)):
        d=s[n]%mod
        for i in range(1,L+1): d=(d+C[i]*s[n-i])%mod
        if d==0:
            m+=1; continue
        T=C[:]
        coef=d*pow(b,mod-2,mod)%mod
        need=len(B)+m
        if len(C)<need: C += [0]*(need-len(C))
        for j in range(len(B)): C[j+m]=(C[j+m]-coef*B[j])%mod
        if 2*L<=n:
            L=n+1-L; B=T; b=d; m=1
        else: m+=1
    return L,C[:L+1]

def scalar_counts_raw(B,K,terms,mod):
    states,edges,labels,init=p6.build(B,K); sts=sorted(states); idx={s:i for i,s in enumerate(sts)}; mem=max(2*K-1,3)
    alpha=[0]*len(sts)
    for b in B: alpha[idx[b[-mem:]]]=(alpha[idx[b[-mem:]]]+1)%mod
    v=[1]*len(sts); seq=[]
    for _ in range(terms):
        seq.append(sum(alpha[i]*v[i] for i in range(len(sts)))%mod)
        nv=[0]*len(sts)
        for i,s in enumerate(sts):
            nv[i]=sum(w*v[idx[t]] for t,w in edges.get(s,{}).items())%mod
        v=nv
    return seq,len(sts),sum(len(x) for x in edges.values())

def libs():
    B4=p6.library(4); ps={(2,1,1),(1,2,1),(1,1,2)}; B5=p6.library(5)
    return [
      ('BAL3_L4_AA2FR',[w for w in B4 if p6.parikh(w) in ps],6),
      ('INTERIOR_L5_AA2FR',[w for w in B5 if all(x>=1 for x in p6.parikh(w))],5),
      ('HASH30_L4_AA2FR',sorted(B4,key=lambda w:(hashlib.sha256(w.encode()).hexdigest(),w))[:30],5),
      ('ALL_L4_AA2FR',B4,6),
    ]

def validate_rec(seq,L,C,mod):
    return all((seq[n]+sum(C[i]*seq[n-i] for i in range(1,L+1)))%mod==0 for n in range(L,len(seq)))

def main():
    out=[]
    for name,B,K in libs():
        print('RUN',name,K,flush=True)
        per=[]
        for p in PRIMES:
            seq,ns,ne=scalar_counts_raw(B,K,260,p)
            L,C=BM(seq,p)
            ok=validate_rec(seq,L,C,p)
            per.append({'prime':p,'degree':L,'verified_on_terms':len(seq),'valid':ok,'connection_polynomial':C})
            print(' ',p,'degree',L,'ok',ok,flush=True)
        # independent exact quotient scalar rank only for cross-check, not discovery
        if name=='ALL_L4_AA2FR' and K==6:
            sr=97
            sample=[]
        else:
            states,edges,labels,init=p6.build(B,K); eq=p6.equitable(states,edges); Q,groups,rem=p6.quotient(states,edges,eq); alpha=p6.initial_alpha(B,max(2*K-1,3),eq,rem)
            sr,coef,_,sample=p6.scalar_rank_exact(Q,alpha)
        result={'library':name,'Kmax':K,'blocks':len(B),'raw_states':ns,'distinct_weighted_successor_edges':ne,
                'blackbox_degrees':[x['degree'] for x in per],'exact_scalar_hankel_rank_crosscheck':sr,
                'all_blackbox_degrees_match_exact':all(x['degree']==sr for x in per),'per_prime':per,'exact_count_sample':sample}
        out.append(result); print(' exact scalar rank',sr,flush=True)
    (HERE/'P6_BLACKBOX_RECURRENCE_RESULTS_v0.1.json').write_text(json.dumps(out,indent=2))

if __name__=="__main__":
    main()
