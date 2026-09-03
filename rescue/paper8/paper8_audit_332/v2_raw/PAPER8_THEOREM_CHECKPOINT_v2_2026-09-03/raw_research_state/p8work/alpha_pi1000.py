import numpy as np, scipy.sparse as sp, time, sys
D=np.load('/mnt/data/h8cp/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');u=D['u'];v=D['v'];N=len(D['giant_global'])
r=np.ones(N);l=np.ones(N)
for _ in range(300):
 nr=np.bincount(u,weights=r[v],minlength=N);nl=np.bincount(v,weights=l[u],minlength=N);nr/=nr.max();nl/=nl.max();r,l=nr,nl
Ar=np.bincount(u,weights=r[v],minlength=N);ATl=np.bincount(v,weights=l[u],minlength=N); pi=l*r;pi/=pi.sum()
side=sys.argv[1]
if side=='r': Q=sp.csr_matrix((r[v]/Ar[u],(u,v)),shape=(N,N))
else: Q=sp.csr_matrix((l[u]/ATl[v],(v,u)),shape=(N,N))
order=np.argsort(pi)[::-1];K=1000;js=order[:K];alpha=0.;batch=50;t=time.time()
for st in range(0,K,batch):
 jj=js[st:st+batch];X=np.zeros((N,len(jj)));X[jj,np.arange(len(jj))]=1
 for _ in range(50):X=Q@X
 alpha+=X.min(axis=0).sum()
print(side,'alpha',alpha,'pimass',pi[js].sum(),'time',time.time()-t)
