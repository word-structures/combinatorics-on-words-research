import numpy as np, scipy.sparse as sp, sys, time
D=np.load('/mnt/data/h8cp/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');u=D['u'];v=D['v'];N=len(D['giant_global'])
r=np.ones(N);l=np.ones(N)
for _ in range(300):
 nr=np.bincount(u,weights=r[v],minlength=N);nl=np.bincount(v,weights=l[u],minlength=N);nr/=nr.max();nl/=nl.max();r,l=nr,nl
Ar=np.bincount(u,weights=r[v],minlength=N);ATl=np.bincount(v,weights=l[u],minlength=N);pi=l*r;pi/=pi.sum()
side=sys.argv[1];lo=int(sys.argv[2]);hi=int(sys.argv[3])
Q=sp.csr_matrix(((r[v]/Ar[u]) if side=='r' else (l[u]/ATl[v]), ((u if side=='r' else v),(v if side=='r' else u))),shape=(N,N))
order=np.argsort(pi)[::-1];js=order[lo:hi];alpha=0.;batch=50;t=time.time()
for st in range(0,len(js),batch):
 jj=js[st:st+batch];X=np.zeros((N,len(jj)));X[jj,np.arange(len(jj))]=1
 for _ in range(50):X=Q@X
 alpha+=X.min(axis=0).sum()
print(side,lo,hi,'alpha_block',repr(float(alpha)),'pi_mass',repr(float(pi[js].sum())),'time',time.time()-t)
