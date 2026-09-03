import numpy as np, scipy.sparse as sp, json, struct
from collections import deque
from scipy.sparse.csgraph import connected_components
from scipy.sparse.linalg import eigs
ROOT='/mnt/data/paper8_resume/theorem_422'; NPZ='/mnt/data/paper8_resume/unpacked/PAPER8_THEOREM_CHECKPOINT_v2_2026-09-03/raw_research_state/p8work/a_tilt_quotient_pid2.npz'
q=np.load(NPZ);rr0=q['rows'].astype(np.int32);cc0=q['cols'].astype(np.int32);tar=q['target'].astype(np.uint8);aedge=q['aedge'].astype(np.uint8);sizes=q['sizes'].astype(np.int64);K=len(sizes);E=len(rr0)
with open(f'{ROOT}/pid2_edges.bin','rb') as f:
 kb,eb=struct.unpack('<II',f.read(8));rr=np.frombuffer(f.read(4*eb),dtype='<i4').copy();cc=np.frombuffer(f.read(4*eb),dtype='<i4').copy();tt=np.frombuffer(f.read(eb),dtype='u1').copy();aa=np.frombuffer(f.read(eb),dtype='u1').copy();tr=f.read()
szb=np.fromfile(f'{ROOT}/pid2_sizes.bin',dtype='<i8');export_ok=kb==K and eb==E and not tr and np.array_equal(rr,rr0) and np.array_equal(cc,cc0) and np.array_equal(tt,tar) and np.array_equal(aa,aedge) and np.array_equal(szb,sizes)
def mm(w,steps):
 lo=np.zeros(K,dtype=np.int32);hi=np.zeros(K,dtype=np.int32);INF=10**9
 for _ in range(steps):
  nl=np.full(K,INF,dtype=np.int32);nh=np.full(K,-INF,dtype=np.int32);np.minimum.at(nl,cc0,lo[rr0]+w);np.maximum.at(nh,cc0,hi[rr0]+w);lo,hi=nl,nh
 return int(lo.min()),int(hi.max())
tmin,tmax=mm(tar.astype(np.int32),441);amin,amax=mm(aedge.astype(np.int32),44)
mask=tar==0;A0=sp.csr_matrix((np.ones(mask.sum()),(rr0[mask],cc0[mask])),shape=(K,K));nc,lab=connected_components(A0,directed=True,connection='strong');cs=np.bincount(lab,minlength=nc);comps=[]
for c in range(nc):
 nodes=np.where(lab==c)[0];sub=A0[nodes][:,nodes];cyc=len(nodes)>1 or (len(nodes)==1 and sub[0,0]!=0);rho=0.0
 if cyc:
  rho=float(abs(eigs(sub,k=1,which='LM',return_eigenvectors=False,tol=1e-12,maxiter=200000)[0])) if len(nodes)>3 else float(max(abs(np.linalg.eigvals(sub.toarray()))))
 comps.append({'component':int(c),'size':int(len(nodes)),'internal_edges':int(sub.nnz),'has_cycle':bool(cyc),'rho':rho})
comps.sort(key=lambda z:(z['rho'],z['size']),reverse=True)
def trop(reverse=False):
 r,c=(cc0,rr0) if reverse else (rr0,cc0);A=sp.csr_matrix((np.ones(mask.sum()),(r[mask],c[mask])),shape=(K,K));n,l=connected_components(A,directed=True,connection='strong');ss=np.bincount(l,minlength=n);G=np.where(l==np.argmax(ss))[0];rev=[[] for _ in range(K)]
 for u,v,t in zip(r,c,tar):rev[int(v)].append((int(u),int(t)))
 INF=10**9;d=np.full(K,INF,dtype=np.int64);dq=deque()
 for g in G:d[g]=0;dq.append(int(g))
 while dq:
  v=dq.popleft()
  for u,w in rev[v]:
   z=d[v]+w
   if z<d[u]:d[u]=z;(dq.appendleft(u) if w==0 else dq.append(u))
 ex=tar.astype(np.int64)+d[c]-d[r];vals,cnts=np.unique(ex,return_counts=True)
 return {'min':int(ex.min()),'max':int(ex.max()),'hist':{str(int(v)):int(n) for v,n in zip(vals,cnts)},'giant':int(len(G)),'distance_max':int(d.max())}
out={'profile':q['profile'].astype(int).tolist(),'K':K,'E':E,'mult_all_one':bool(np.all(q['mult']==1)),'binary_export_exact_match':bool(export_ok),'class_size_sum':int(sizes.sum()),'target_degree_441':{'min':tmin,'max':tmax,'chosen_cap':111,'cap_safe':tmax<=111},'a_count_44':{'min':amin,'max':amax,'claim_exact':amin==4 and amax==29},'centered_score_44':{'min_num_over3':3*amin-44,'max_num_over3':3*amax-44,'M_num_over3':max(abs(3*amin-44),abs(3*amax-44)),'oscillation':amax-amin},'hard_scc_count':int(nc),'hard_components_top':comps[:10],'tropical_forward':trop(False),'tropical_reverse':trop(True)}
out['PASS']=bool(out['profile']==[4,2,2] and out['mult_all_one'] and export_ok and tmax<=111 and amin==4 and amax==29 and out['tropical_forward']['min']>=0 and out['tropical_reverse']['min']>=0)
json.dump(out,open(f'{ROOT}/STRUCTURAL_CROSSCHECK.json','w'),indent=2);print(json.dumps(out,indent=2))
if not out['PASS']:raise SystemExit(1)
