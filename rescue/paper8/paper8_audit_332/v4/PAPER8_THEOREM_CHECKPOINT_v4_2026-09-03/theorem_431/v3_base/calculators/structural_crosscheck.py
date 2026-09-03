import numpy as np, scipy.sparse as sp, json, struct, hashlib
from collections import deque
from scipy.sparse.csgraph import connected_components
from scipy.sparse.linalg import eigs
ROOT='/mnt/data/paper8_resume/theorem_431'
NPZ='/mnt/data/paper8_resume/unpacked/PAPER8_THEOREM_CHECKPOINT_v2_2026-09-03/raw_research_state/p8work/a_tilt_quotient_pid3.npz'
q=np.load(NPZ); rr0=q['rows'].astype(np.int32);cc0=q['cols'].astype(np.int32);tar=q['target'].astype(np.uint8);aedge=q['aedge'].astype(np.uint8);sizes=q['sizes'].astype(np.int64);K=len(sizes);E=len(rr0)
# Binary export equality
with open(f'{ROOT}/pid3_edges.bin','rb') as f:
 kb,eb=struct.unpack('<II',f.read(8));rr=np.frombuffer(f.read(4*eb),dtype='<i4').copy();cc=np.frombuffer(f.read(4*eb),dtype='<i4').copy();tt=np.frombuffer(f.read(eb),dtype='u1').copy();aa=np.frombuffer(f.read(eb),dtype='u1').copy(); trailing=f.read()
szb=np.fromfile(f'{ROOT}/pid3_sizes.bin',dtype='<i8')
export_ok=(kb==K and eb==E and not trailing and np.array_equal(rr,rr0) and np.array_equal(cc,cc0) and np.array_equal(tt,tar) and np.array_equal(aa,aedge) and np.array_equal(szb,sizes))
# target degree max-plus for 353 edges. Start at any state; each edge adds target flag.
def path_minmax(weight,steps):
    lo=np.zeros(K,dtype=np.int32); hi=np.zeros(K,dtype=np.int32)
    INF=10**9
    for _ in range(steps):
        nlo=np.full(K,INF,dtype=np.int32); nhi=np.full(K,-INF,dtype=np.int32)
        # edges are sparse and all source states allowed at start; propagate exact extrema
        np.minimum.at(nlo,cc,lo[rr]+weight)
        np.maximum.at(nhi,cc,hi[rr]+weight)
        lo,hi=nlo,nhi
    return int(lo.min()),int(hi.max())
target_min353,target_max353=path_minmax(tar.astype(np.int32),353)
a_min44,a_max44=path_minmax(aedge.astype(np.int32),44)
# Hard endpoint SCCs (target edges removed)
mask=tar==0
A0=sp.csr_matrix((np.ones(mask.sum()),(rr0[mask],cc0[mask])),shape=(K,K))
nc,lab=connected_components(A0,directed=True,connection='strong');cs=np.bincount(lab,minlength=nc)
comp_records=[]
for c in range(nc):
    nodes=np.where(lab==c)[0]; sub=A0[nodes][:,nodes]; ie=int(sub.nnz)
    cyc=(len(nodes)>1 or (len(nodes)==1 and sub[0,0]!=0))
    rho=0.0
    if cyc:
        if len(nodes)==1: rho=float(sub[0,0])
        elif len(nodes)<=3: rho=float(max(abs(np.linalg.eigvals(sub.toarray()))))
        else: rho=float(abs(eigs(sub,k=1,which='LM',return_eigenvectors=False,tol=1e-12,maxiter=200000)[0]))
    comp_records.append({'component':int(c),'size':int(len(nodes)),'internal_edges':ie,'has_cycle':bool(cyc),'rho':rho})
comp_records.sort(key=lambda z:(z['rho'],z['size']),reverse=True)
# Tropical exponents independently both directions
def tropical(reverse=False):
    r,c=(cc0,rr0) if reverse else (rr0,cc0)
    A=sp.csr_matrix((np.ones(mask.sum()),(r[mask],c[mask])),shape=(K,K))
    n,l=connected_components(A,directed=True,connection='strong');ss=np.bincount(l,minlength=n);G=np.where(l==np.argmax(ss))[0]
    rev=[[] for _ in range(K)]
    for u,v,t in zip(r,c,tar): rev[int(v)].append((int(u),int(t)))
    INF=10**9;d=np.full(K,INF,dtype=np.int64);dq=deque()
    for g in G:d[g]=0;dq.append(int(g))
    while dq:
        v=dq.popleft()
        for u,w in rev[v]:
            nd=int(d[v])+w
            if nd<d[u]:
                d[u]=nd
                (dq.appendleft(u) if w==0 else dq.append(u))
    assert np.all(d<INF)
    ex=tar.astype(np.int64)+d[c]-d[r]
    vals,cnts=np.unique(ex,return_counts=True)
    return {'min':int(ex.min()),'max':int(ex.max()),'hist':{str(int(v)):int(n) for v,n in zip(vals,cnts)},'zero_scc_giant_size':int(len(G)),'distance_max':int(d.max())}
out={
 'profile':q['profile'].astype(int).tolist(),'K':K,'E':E,'mult_all_one':bool(np.all(q['mult']==1)),
 'binary_export_exact_match':bool(export_ok),'class_size_sum':int(sizes.sum()),
 'target_degree_353':{'min':target_min353,'max':target_max353,'chosen_cap':158,'cap_safe':target_max353<=158},
 'a_count_44':{'min':a_min44,'max':a_max44,'claimed_min':4,'claimed_max':29,'claim_exact':a_min44==4 and a_max44==29},
 'centered_score_44':{'min_num_over3':3*a_min44-44,'max_num_over3':3*a_max44-44,'M_num_over3':max(abs(3*a_min44-44),abs(3*a_max44-44)),'oscillation':a_max44-a_min44},
 'hard_scc_count':int(nc),'hard_components_top':comp_records[:12],
 'hard_unique_dominant_cyclic_scc': bool(comp_records[0]['rho']>comp_records[1]['rho'] if len(comp_records)>1 else True),
 'tropical_forward':tropical(False),'tropical_reverse':tropical(True)
}
out['PASS']=bool(out['binary_export_exact_match'] and out['profile']==[4,3,1] and out['mult_all_one'] and out['target_degree_353']['cap_safe'] and out['a_count_44']['claim_exact'] and out['tropical_forward']['min']>=0 and out['tropical_reverse']['min']>=0)
json.dump(out,open(f'{ROOT}/STRUCTURAL_CROSSCHECK.json','w'),indent=2)
print(json.dumps(out,indent=2))
if not out['PASS']: raise SystemExit(1)
