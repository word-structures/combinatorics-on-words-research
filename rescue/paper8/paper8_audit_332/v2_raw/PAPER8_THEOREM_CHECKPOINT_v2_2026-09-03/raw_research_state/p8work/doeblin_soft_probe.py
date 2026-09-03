import numpy as np, scipy.sparse as sp, sys, time
D=np.load('/mnt/data/h8cp/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');u=D['u'];v=D['v'];ep=D['edge_profile_id'];N=len(D['giant_global']);profiles=D['profiles']
pid=int(sys.argv[1]); x=float(sys.argv[2]); wt=np.ones(len(u));wt[ep==pid]=x
r=np.ones(N);l=np.ones(N)
for it in range(5000):
 nr=np.bincount(u,weights=wt*r[v],minlength=N);nl=np.bincount(v,weights=wt*l[u],minlength=N);nr/=nr.max();nl/=nl.max();err=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
 if err<3e-14:break
Ar=np.bincount(u,weights=wt*r[v],minlength=N);lam=np.dot(l,Ar)/np.dot(l,r);l/=np.dot(l,r);pi=l*r;pi/=pi.sum();trans=wt*r[v]/(lam*r[u]);P=sp.csr_matrix((trans,(u,v)),shape=(N,N));order=np.argsort(pi)[::-1]
for m in [40,50]:
 K=300;js=order[:K];alpha=0;rat=[]
 for st in range(0,K,30):
  jj=js[st:st+30];X=np.zeros((N,len(jj)));X[jj,np.arange(len(jj))]=1
  for _ in range(m):X=P@X
  mins=X.min(axis=0);alpha+=mins.sum(); rat += (mins/pi[jj]).tolist()
 print('profile',profiles[pid-1].tolist(),'x',x,'m',m,'alpha300',alpha,'minratio',min(rat),'med',np.median(rat),'mass300',pi[js].sum())
