from pathlib import Path
from itertools import product
from collections import defaultdict
import importlib.util, json

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('p6',HERE/'p6_semantics_audit.py')
p6=importlib.util.module_from_spec(spec); spec.loader.exec_module(p6)

def char_step(s,ch,K,mem):
    z=s+ch
    if not p6.safe_cutoff(z,K): return None
    return z[-mem:]

def word_step(s,w,K,mem):
    t=s
    for ch in w:
        t=char_step(t,ch,K,mem)
        if t is None: return None
    return t

def full_memory_states(K):
    mem=max(2*K-1,3)
    return [''.join(x) for x in product(p6.ALPH,repeat=mem) if p6.safe_cutoff(''.join(x),K)]

def aggregate_by_words(states,words,K,mem):
    out={}
    for s in states:
        d=defaultdict(int)
        for w in words:
            t=word_step(s,w,K,mem)
            if t is not None: d[t]+=1
        out[s]=dict(d)
    return out

def audit_full(L,K):
    mem=max(2*K-1,3); states=full_memory_states(K)
    B=p6.library(L); allwords=[''.join(x) for x in product(p6.ALPH,repeat=L)]
    MB=aggregate_by_words(states,B,K,mem)
    AL=aggregate_by_words(states,allwords,K,mem)
    mism=[]
    for s in states:
        if MB[s]!=AL[s]: mism.append(s)
    # unsafe internal words should be globally zero operators
    unsafe=[w for w in allwords if w not in set(B)]
    nonzero_unsafe=[]
    for w in unsafe:
        if any(word_step(s,w,K,mem) is not None for s in states): nonzero_unsafe.append(w)
    return {'L':L,'Kmax':K,'full_memory_states':len(states),'library_blocks':len(B),'all_words':len(allwords),
            'unsafe_internal_words':len(unsafe),'unsafe_words_with_nonzero_operator':nonzero_unsafe,
            'MB_equals_A_power_L_on_all_full_memory_states':not mism,'mismatch_states':len(mism)}

def audit_selected(K=4):
    L=4; mem=max(2*K-1,3); states=full_memory_states(K)
    B4=p6.library(L); ps={(2,1,1),(1,2,1),(1,1,2)}; B=[w for w in B4 if p6.parikh(w) in ps]
    # Verify profile decomposition sums exactly to selected operator.
    total=aggregate_by_words(states,B,K,mem)
    profs=sorted(set(p6.parikh(w) for w in B))
    parts={str(p):aggregate_by_words(states,[w for w in B if p6.parikh(w)==p],K,mem) for p in profs}
    mismatch=0
    for s in states:
        d=defaultdict(int)
        for p in profs:
            for t,n in parts[str(p)][s].items(): d[t]+=n
        if dict(d)!=total[s]: mismatch+=1
    # selected operator differs from full power
    full=aggregate_by_words(states,[''.join(x) for x in product(p6.ALPH,repeat=L)],K,mem)
    differs=sum(total[s]!=full[s] for s in states)
    return {'library':'BAL3_L4_AA2FR','Kmax':K,'full_memory_states':len(states),'selected_blocks':len(B),'profiles':[list(p) for p in profs],
            'profile_components_sum_to_selected_operator':mismatch==0,'profile_sum_mismatch_states':mismatch,
            'selected_operator_differs_from_full_A_power_on_states':differs}

if __name__=='__main__':
    out={'full_recoding':[audit_full(4,4),audit_full(4,6),audit_full(5,5)],'selected_profile_decomposition':audit_selected(4)}
    print(json.dumps(out,indent=2))
    (HERE/'P6_LIBRARY_POLYNOMIAL_RESULTS_v0.1.json').write_text(json.dumps(out,indent=2))
