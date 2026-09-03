import numpy as np, scipy.sparse as sp, time
D=np.load('/mnt/data/h8cp/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');u=D['u'];v=D['v'];N=len(D['giant_global'])
r=np.ones(N);l=np.ones(N)
for it in range(500):
 nr=np.bincount(u,weights=r[v],minlength=N);nl=np.bincount(v,weights=l[u],minlength=N);nr/=nr.max();nl/=nl.max();err=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
 if err<2e-14:break
Ar=np.bincount(u,weights=r[v],minlength=N);lam=float(np.dot(l,Ar)/np.dot(l,r));l/=np.dot(l,r);pi=l*r;pi/=pi.sum();trans=r[v]/(lam*r[u])
P=sp.csr_matrix((trans,(u,v)),shape=(N,N))
order=np.argsort(pi)[::-1]
for m in [28,30,32,35,40]:
 for K in [30,100,300]:
  js=order[:K]
  alpha=0.; ratios=[]
  batch=30
  t=time.time()
  for st in range(0,K,batch):
   jj=js[st:st+batch]; X=np.zeros((N,len(jj)))
   X[jj,np.arange(len(jj))]=1.0
   for _ in range(m): X=P@X
   mins=X.min(axis=0); alpha+=mins.sum(); ratios.extend((mins/pi[jj]).tolist())
  print('m',m,'K',K,'alpha',alpha,'minratio',min(ratios),'medratio',np.median(ratios),'time',time.time()-t,flush=True)
