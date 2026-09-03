from pathlib import Path
from itertools import product
from collections import defaultdict
import importlib.util, hashlib, json, random

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('p6',HERE/'p6_semantics_audit.py'); p6=importlib.util.module_from_spec(spec); spec.loader.exec_module(p6)

def full_states(K):
    mem=max(2*K-1,3)
    return [''.join(x) for x in product(p6.ALPH,repeat=mem) if p6.safe_cutoff(''.join(x),K)]

def char_transitions(sts,K):
    mem=max(2*K-1,3); idx={s:i for i,s in enumerate(sts)}; trans={c:[-1]*len(sts) for c in p6.ALPH}
    for i,s in enumerate(sts):
        for c in p6.ALPH:
            z=s+c
            if p6.safe_cutoff(z,K): trans[c][i]=idx[z[-mem:]]
    return trans

def apply_char(vec,trans_c):
    return [0 if j<0 else vec[j] for j in trans_c]

def addvec(a,b): return [x+y for x,y in zip(a,b)]
def zerovec(n): return [0]*n

def word_step_index(i,w,trans):
    j=i
    for c in w:
        j=trans[c][j]
        if j<0:return -1
    return j

def explicit_apply(vec,B,trans):
    out=[0]*len(vec)
    for i in range(len(vec)):
        z=0
        for w in B:
            j=word_step_index(i,w,trans)
            if j>=0:z+=vec[j]
        out[i]=z
    return out

class Node:
    __slots__=('ch','final')
    def __init__(self): self.ch={}; self.final=False

def build_trie(B):
    nodes=[Node()]
    for w in B:
        q=0
        for c in w:
            if c not in nodes[q].ch:
                nodes[q].ch[c]=len(nodes); nodes.append(Node())
            q=nodes[q].ch[c]
        nodes[q].final=True
    return nodes

def trie_apply(vec,B,trans):
    nodes=build_trie(B); memo={}
    def go(q):
        if q in memo:return memo[q]
        out=vec[:] if nodes[q].final else zerovec(len(vec))
        for c,r in nodes[q].ch.items(): out=addvec(out,apply_char(go(r),trans[c]))
        memo[q]=out; return out
    return go(0),len(nodes),sum(len(n.ch) for n in nodes)

def profile_apply(vec,L,target_profiles,trans):
    unit={'a':(1,0,0),'b':(0,1,0),'c':(0,0,1)}
    cur={(0,0,0):vec[:]}; applications=0
    # prune a partial profile if it cannot fit below any target profile
    targets=list(target_profiles)
    for depth in range(L):
        nxt={}
        for p,v in cur.items():
            for c in p6.ALPH:
                e=unit[c]; q=(p[0]+e[0],p[1]+e[1],p[2]+e[2])
                if not any(all(q[d]<=t[d] for d in range(3)) for t in targets): continue
                av=apply_char(v,trans[c]); applications+=1
                nxt[q]=av if q not in nxt else addvec(nxt[q],av)
        cur=nxt
    out=zerovec(len(vec))
    for p in targets:
        if p in cur: out=addvec(out,cur[p])
    return out,applications,sum(1 for _ in cur)

def audit(name,B,L,K,profile_selected=False):
    sts=full_states(K); trans=char_transitions(sts,K); rng=random.Random(20260829); vec=[rng.randrange(-5,6) for _ in sts]
    explicit=explicit_apply(vec,B,trans)
    trie,nodes,edges=trie_apply(vec,B,trans)
    result={'library':name,'L':L,'Kmax':K,'full_memory_states':len(sts),'blocks':len(B),'trie_nodes':nodes,'trie_edges':edges,
            'trie_apply_matches_explicit':trie==explicit}
    if profile_selected:
        targets=sorted(set(p6.parikh(w) for w in B)); prof,apps,finalcells=profile_apply(vec,L,targets,trans)
        result.update({'target_profiles':[list(x) for x in targets],'profile_dp_char_applications':apps,
                       'profile_dp_matches_explicit':prof==explicit,'all_possible_profiles':(L+2)*(L+1)//2})
    return result

if __name__=='__main__':
    B4=p6.library(4); ps={(2,1,1),(1,2,1),(1,1,2)}; bal=[w for w in B4 if p6.parikh(w) in ps]
    B5=p6.library(5); interior=[w for w in B5 if all(x>=1 for x in p6.parikh(w))]
    hash30=sorted(B4,key=lambda w:(hashlib.sha256(w.encode()).hexdigest(),w))[:30]
    out=[audit('BAL3_L4_AA2FR',bal,4,4,True),audit('INTERIOR_L5_AA2FR',interior,5,5,True),audit('HASH30_L4_AA2FR',hash30,4,5,False)]
    print(json.dumps(out,indent=2)); (HERE/'P6_MATRIXFREE_APPLY_RESULTS_v0.1.json').write_text(json.dumps(out,indent=2))
