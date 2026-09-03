from pathlib import Path
import importlib.util, json

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('bb',HERE/'p6_blackbox_recurrence_audit.py'); bb=importlib.util.module_from_spec(spec); spec.loader.exec_module(bb)
spec2=importlib.util.spec_from_file_location('p6',HERE/'p6_semantics_audit.py'); p6=importlib.util.module_from_spec(spec2); spec2.loader.exec_module(p6)

p=1000000007; q=1000000009

def crt2(a,b):
    t=((b-a)%q)*pow(p,-1,q)%q
    x=a+p*t; M=p*q
    if x>M//2: x-=M
    return x

def integer_counts_raw(B,K,terms):
    states,edges,labels,init=p6.build(B,K); sts=sorted(states); idx={s:i for i,s in enumerate(sts)}; mem=max(2*K-1,3)
    alpha=[0]*len(sts)
    for b in B: alpha[idx[b[-mem:]]]+=1
    v=[1]*len(sts); seq=[]
    for _ in range(terms):
        seq.append(sum(alpha[i]*v[i] for i in range(len(sts))))
        nv=[0]*len(sts)
        for i,s in enumerate(sts): nv[i]=sum(w*v[idx[t]] for t,w in edges.get(s,{}).items())
        v=nv
    return seq

B=p6.library(4); K=6
seqp,_,_=bb.scalar_counts_raw(B,K,260,p); Lp,Cp=bb.BM(seqp,p)
seqq,_,_=bb.scalar_counts_raw(B,K,260,q); Lq,Cq=bb.BM(seqq,q)
assert Lp==Lq==97
C=[crt2(Cp[i],Cq[i]) for i in range(98)]
assert C[0]==1
seq=integer_counts_raw(B,K,220)
errors=[]
for n in range(97,len(seq)):
    err=seq[n]+sum(C[i]*seq[n-i] for i in range(1,98))
    if err!=0: errors.append((n,err))
# map to old forward coefficients s[n+97]=sum_j old[j] s[n+j]
forward=[-C[97-j] for j in range(97)]
old=json.load(open(HERE/'P6_ALL_L4_K6_EXACT_LINEAR_CERT.json'))['scalar_coefficients']
result={
 'library':'ALL_L4_AA2FR','Kmax':6,'degree':97,'primes':[p,q],'crt_modulus_bits':(p*q).bit_length(),
 'max_abs_connection_coefficient':max(map(abs,C)),'exact_integer_terms_verified':len(seq)-97,
 'exact_verification_errors':errors,'matches_prior_exact_scalar_certificate':forward==old,
 'connection_coefficients_C_for_s_n_plus_sum_Ci_s_n_minus_i_eq_0':C,
 'forward_coefficients_for_s_n_plus_97_eq_sum_cj_s_n_plus_j':forward,
 'count_prefix':seq[:12]
}
(HERE/'P6_BLACKBOX_EXACT_RECURRENCE_CERT_v0.1.json').write_text(json.dumps(result,indent=2))
print(json.dumps({k:v for k,v in result.items() if 'coefficients' not in k},indent=2))
