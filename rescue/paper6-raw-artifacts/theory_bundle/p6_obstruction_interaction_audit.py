from itertools import combinations
from collections import defaultdict
from pathlib import Path
import importlib.util, json, hashlib
import numpy as np

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('p6',HERE/'p6_semantics_audit.py')
p6=importlib.util.module_from_spec(spec); spec.loader.exec_module(p6)

P=1000003

def sub(a,b): return tuple(x-y for x,y in zip(a,b))

def geoms(L,K):
    return [(k,j) for k in range(2,K+1) for j in range(1,min(L,2*k-1)+1)]

def coord(s,k,j):
    q=2*k-j
    if q>len(s): return ('ABSENT',)
    u=s[-q:]
    if j<=k:
        A=u[:k]; C=u[k:]
        return sub(p6.parikh(A),p6.parikh(C))
    return p6.parikh(u)

def structural_rows(states,L,K,include_last3=True):
    gs=geoms(L,K)
    rows=[]
    for s in states:
        vals=[coord(s,k,j) for k,j in gs]
        if include_last3: vals.append(('L3',s[-3:]))
        rows.append(tuple(vals))
    names=[f'D_{k}_{j}' for k,j in gs]
    if include_last3: names.append('last3')
    return names,rows

class ModBasis:
    def __init__(self,n,p=P):
        self.n=n; self.p=p; self.basis={}  # pivot -> normalized vector
    def reduce(self,v):
        v=np.fromiter((int(x % self.p) for x in v), dtype=np.int64, count=self.n)
        for piv in sorted(self.basis):
            if v[piv]:
                v=(v - v[piv]*self.basis[piv])%self.p
        return v
    def add(self,v):
        v=self.reduce(v)
        nz=np.flatnonzero(v)
        if len(nz)==0: return False
        piv=int(nz[0]); inv=pow(int(v[piv]),self.p-2,self.p)
        v=(v*inv)%self.p
        # maintain reduced form: kill pivot in existing basis vectors
        for q,b in list(self.basis.items()):
            if b[piv]: self.basis[q]=(b-b[piv]*v)%self.p
        self.basis[piv]=v
        return True
    @property
    def rank(self): return len(self.basis)
    def contains(self,v): return not np.any(self.reduce(v))

def add_partition_indicators(basis, rows, coord_idx):
    groups=defaultdict(list)
    for i,row in enumerate(rows):
        key=tuple(row[j] for j in coord_idx)
        groups[key].append(i)
    for inds in groups.values():
        v=np.zeros(basis.n,dtype=np.int64); v[inds]=1
        basis.add(v)
    return len(groups)

def krylov_raw(states,edges,need=200):
    sts=sorted(states); idx={s:i for i,s in enumerate(sts)}; n=len(sts)
    v=[1]*n; vecs=[]
    for _ in range(need):
        vecs.append(v)
        nv=[0]*n
        for i,s in enumerate(sts):
            nv[i]=sum(w*v[idx[t]] for t,w in edges.get(s,{}).items())
        v=nv
    # modular rank determine exact-ish dimension; exact dimensions known elsewhere
    A=[[vecs[j][i] for j in range(min(need,n))] for i in range(n)]
    r=p6.mod_rank_and_pivots(A,P)[0]
    return sts,vecs,r

def library_named(name):
    if name=='BAL3_L4_AA2FR':
        B4=p6.library(4); ps={(2,1,1),(1,2,1),(1,1,2)}
        return [w for w in B4 if p6.parikh(w) in ps],4
    if name=='ALL_L4_AA2FR': return p6.library(4),4
    if name=='INTERIOR_L5_AA2FR':
        B=p6.library(5); return [w for w in B if all(x>=1 for x in p6.parikh(w))],5
    if name=='HASH30_L4_AA2FR':
        B=p6.library(4)
        B=sorted(B,key=lambda w:(hashlib.sha256(w.encode()).hexdigest(),w))[:30]
        return B,4
    raise ValueError(name)

def audit(name,K,max_degree=2):
    B,L=library_named(name)
    states,edges,labels,init=p6.build(B,K)
    sts,vecs,kr=krylov_raw(states,edges,need=min(len(states)+1,220))
    names,rows=structural_rows(sts,L,K,True)
    basis=ModBasis(len(sts))
    basis.add(np.ones(len(sts),dtype=np.int64))
    res=[]
    target_vecs=vecs[:kr]
    def contained_count(): return sum(basis.contains(v) for v in target_vecs)
    res.append({'degree':0,'feature_rank_mod':basis.rank,'krylov_vectors_contained':contained_count(),'krylov_rank_mod':kr})
    # cumulative degree <=d; enumerate subsets exactly degree d
    for d in range(1,max_degree+1):
        subsets=list(combinations(range(len(names)),d))
        total_parts=0
        for subidx in subsets:
            total_parts+=add_partition_indicators(basis,rows,subidx)
        res.append({'degree':d,'feature_rank_mod':basis.rank,'partition_indicator_columns_generated':total_parts,
                    'krylov_vectors_contained':contained_count(),'krylov_rank_mod':kr})
        if contained_count()==kr: break
    return {'library':name,'Kmax':K,'block_count':len(B),'states':len(states),'structural_coordinates':len(names),
            'coordinate_names':names,'results':res}

if __name__=='__main__':
    cases=[('BAL3_L4_AA2FR',6,3),('INTERIOR_L5_AA2FR',5,3),('HASH30_L4_AA2FR',5,3)]
    out=[]
    for c in cases:
        print('RUN',c,flush=True); r=audit(*c); out.append(r); print(json.dumps(r,indent=2),flush=True)
    (HERE/'P6_OBSTRUCTION_INTERACTION_RESULTS_v0.1.json').write_text(json.dumps(out,indent=2))
