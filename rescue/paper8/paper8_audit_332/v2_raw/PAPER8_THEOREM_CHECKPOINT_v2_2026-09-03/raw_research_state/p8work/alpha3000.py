import numpy as np, scipy.sparse as sp, time, sys
D=np.load('/mnt/data/h8cp/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');u=D['u'];v=D['v'];N=len(D['giant_global'])
r=np.ones(N);l=np.ones(N)
for _ in range(300):
 nr=np.bincount(u,weights=r[v],minlength=N);nl=np.bincount(v,weights=l[u],minlength=N);nr/=nr.max();nl/=nl.max();r,l=nr,nl
Ar=np.bincount(u,weights=r[v],minlength=N);ATl=np.bincount(v,weights=l[u],minlength=N)
side=sys.argv[1]
if side=='r':
 Q=sp.csr_matrix((r[v]/Ar[u],(u,v)),shape=(N,N));score=r
else:
 Q=sp.csr_matrix((l[u]/ATl[v],(v,u)),shape=(N,N));score=l
order=np.argsort(score)[::-1]
for K in [3000]:
 js=order[:K];alpha=0.;t=time.time(); batch=50
 for st in range(0,K,batch):
  jj=js[st:st+batch];X=np.zeros((N,len(jj)));X[jj,np.arange(len(jj))]=1
  for _ in range(50):X=Q@X
  alpha+=X.min(axis=0).sum()
 print(side,K,'alpha',alpha,'time',time.time()-t,flush=True)
