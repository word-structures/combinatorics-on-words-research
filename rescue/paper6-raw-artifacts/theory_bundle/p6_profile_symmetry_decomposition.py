from pathlib import Path
from itertools import permutations
from collections import defaultdict
import importlib.util, json, numpy as np

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('p6',HERE/'p6_semantics_audit.py'); p6=importlib.util.module_from_spec(spec); spec.loader.exec_module(p6)
P=1000003

PERMS=[]
for q in permutations(p6.ALPH):
    mp=dict(zip(p6.ALPH,q))
    # sign of permutation q relative abc
    arr=[p6.ALPH.index(c) for c in q]; inv=sum(arr[i]>arr[j] for i in range(3) for j in range(i+1,3)); sign=-1 if inv%2 else 1
    PERMS.append((mp,sign))

def act(w,mp): return ''.join(mp[c] for c in w)

class Basis:
    def __init__(self,n,p=P): self.n=n; self.p=p; self.b={}
    def reduce(self,v):
        v=np.fromiter((int(x%self.p) for x in v),dtype=np.int64,count=self.n)
        for piv in sorted(self.b):
            if v[piv]: v=(v-v[piv]*self.b[piv])%self.p
        return v
    def add(self,v):
        v=self.reduce(v); nz=np.flatnonzero(v)
        if len(nz)==0:return False
        piv=int(nz[0]); v=(v*pow(int(v[piv]),self.p-2,self.p))%self.p
        for q,b in list(self.b.items()):
            if b[piv]: self.b[q]=(b-b[piv]*v)%self.p
        self.b[piv]=v; return True
    @property
    def rank(self): return len(self.b)
    def vectors(self): return list(self.b.values())

def profile_edges(states,labels):
    out={s:defaultdict(lambda:defaultdict(int)) for s in states}; profs=set()
    for s in states:
        for b,t in labels.get(s,{}).items():
            p=p6.parikh(b); profs.add(p); out[s][p][t]+=1
    return out,sorted(profs)

def apply_T(vec,sts,idx,pedges,p):
    out=[0]*len(sts)
    for i,s in enumerate(sts):
        out[i]=sum(w*int(vec[idx[t]]) for t,w in pedges[s].get(p,{}).items())
    return out

def profile_closure(states,labels):
    sts=sorted(states); idx={s:i for i,s in enumerate(sts)}; pedges,profs=profile_edges(states,labels)
    basis=Basis(len(sts)); one=np.ones(len(sts),dtype=np.int64); basis.add(one)
    queue=[one]
    while queue:
        v=queue.pop(0)
        for p in profs:
            w=apply_T(v,sts,idx,pedges,p)
            if basis.add(w): queue.append(basis.reduce(w)+0) # reduced normalized? issue: add stores normalized, use matching vector
    # redo stable closure using basis vectors until no change, avoiding queue normalization issue
    changed=True
    while changed:
        changed=False
        current=basis.vectors()
        for v in current:
            for p in profs:
                w=apply_T(v,sts,idx,pedges,p)
                if basis.add(w): changed=True
    return sts,basis,profs

def project(v,sts,idx,kind):
    out=np.zeros(len(sts),dtype=np.int64)
    for mp,sign in PERMS:
        weight=1 if kind=='triv' else sign
        # (U_g f)(s)=f(g^-1 s); summing over all g same rank if use g s
        vals=np.fromiter((int(v[idx[act(s,mp)]]) for s in sts),dtype=np.int64,count=len(sts))
        out=(out+weight*vals)%P
    return out

def audit(name,B,K):
    states,edges,labels,init=p6.build(B,K); sts,basis,profs=profile_closure(states,labels); idx={s:i for i,s in enumerate(sts)}
    bt=Basis(len(sts)); bs=Basis(len(sts))
    for v in basis.vectors():
        bt.add(project(v,sts,idx,'triv')); bs.add(project(v,sts,idx,'sign'))
    total=basis.rank; triv=bt.rank; sign=bs.rank; std=total-triv-sign
    # unary exact rank
    eq=p6.equitable(states,edges); Q,g,r=p6.quotient(states,edges,eq); kr,_,_=p6.krylov_exact_rank(Q)
    return {'library':name,'Kmax':K,'raw_states':len(states),'profiles':len(profs),'profile_future_rank_mod':total,
            'trivial_isotypic_rank_mod':triv,'sign_isotypic_rank_mod':sign,'standard_isotypic_rank_mod':std,
            'standard_multiplicity_candidate':std//2 if std%2==0 else None,'exact_unary_krylov_rank':kr,
            'trivial_sector_minus_unary':triv-kr}

if __name__=='__main__':
 B4=p6.library(4); ps={(2,1,1),(1,2,1),(1,1,2)}; Bbal=[w for w in B4 if p6.parikh(w) in ps]
 B5=p6.library(5); Bint=[w for w in B5 if all(x>=1 for x in p6.parikh(w))]
 cases=[('BAL3_L4_AA2FR',Bbal,4),('BAL3_L4_AA2FR',Bbal,6),('INTERIOR_L5_AA2FR',Bint,5)]
 out=[]
 for c in cases:
    print('RUN',c[0],c[2],flush=True); a=audit(*c); out.append(a); print(json.dumps(a,indent=2),flush=True)
 (HERE/'P6_PROFILE_SYMMETRY_DECOMPOSITION_RESULTS_v0.1.json').write_text(json.dumps(out,indent=2))
