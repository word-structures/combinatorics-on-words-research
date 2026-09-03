import numpy as np, scipy.sparse as sp, sys, time
D=np.load('/mnt/data/h8cp/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');u=D['u'];v=D['v'];ep=D['edge_profile_id'];N=len(D['giant_global']);profiles=D['profiles']
pid=int(sys.argv[1]);x=float(sys.argv[2]);wt=np.ones(len(u));wt[ep==pid]=x
r=np.ones(N);l=np.ones(N)
for it in range(5000):
 Ar=np.bincount(u,weights=wt*r[v],minlength=N);ATl=np.bincount(v,weights=wt*l[u],minlength=N);nr=Ar/Ar.max();nl=ATl/ATl.max();err=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
 if err<2e-14:break
Ar=np.bincount(u,weights=wt*r[v],minlength=N);ATl=np.bincount(v,weights=wt*l[u],minlength=N);sr=Ar/r;sl=ATl/l
qedge=wt*r[v]/Ar[u];Q=sp.csr_matrix((qedge,(u,v)),shape=(N,N));pi=l*r;pi/=pi.sum();order=np.argsort(pi)[::-1];K=1000;js=order[:K];alpha=0.;batch=50;t=time.time()
for st in range(0,K,batch):
 jj=js[st:st+batch];X=np.zeros((N,len(jj)));X[jj,np.arange(len(jj))]=1
 for _ in range(50):X=Q@X
 alpha+=X.min(axis=0).sum()
print('profile',profiles[pid-1].tolist(),'x',x,'it',it,'err',err,'kappa-1',sr.max()/sr.min()-1,'alpha1000',alpha,'pi_mass',pi[js].sum(),'time',time.time()-t)
