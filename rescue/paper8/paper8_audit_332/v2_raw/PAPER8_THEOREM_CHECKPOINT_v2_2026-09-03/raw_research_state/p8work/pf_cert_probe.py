import numpy as np, scipy.sparse as sp, math
D=np.load('/mnt/data/h8cp/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');u=D['u'];v=D['v'];N=len(D['giant_global'])
# right
r=np.ones(N);l=np.ones(N)
for it in range(1000):
 nr=np.bincount(u,weights=r[v],minlength=N);nl=np.bincount(v,weights=l[u],minlength=N)
 nr/=nr.max();nl/=nl.max();err=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
 if err<2e-14:break
Ar=np.bincount(u,weights=r[v],minlength=N); ATl=np.bincount(v,weights=l[u],minlength=N)
sr=Ar/r; sl=ATl/l
print('it',it,'err',err)
print('right s min max spread rel',sr.min(),sr.max(),sr.max()-sr.min(),sr.max()/sr.min()-1)
print('left s min max spread rel',sl.min(),sl.max(),sl.max()-sl.min(),sl.max()/sl.min()-1)
# Row normalized Qr exactly by computed row sums; Ql on transpose
qr_edge=r[v]/Ar[u]
ql_edge=l[u]/ATl[v] # transpose row index v -> col u
Qr=sp.csr_matrix((qr_edge,(u,v)),shape=(N,N));Ql=sp.csr_matrix((ql_edge,(v,u)),shape=(N,N))
# verify row sums
print('Qr rows',np.asarray(Qr.sum(1)).min(),np.asarray(Qr.sum(1)).max())
print('Ql rows',np.asarray(Ql.sum(1)).min(),np.asarray(Ql.sum(1)).max())

def alpha_selected(Q, stationary_proxy, m=50,K=300):
 order=np.argsort(stationary_proxy)[::-1];js=order[:K];alpha=0;mins_all=[]
 for st in range(0,K,30):
  jj=js[st:st+30];X=np.zeros((N,len(jj)));X[jj,np.arange(len(jj))]=1
  for _ in range(m):X=Q@X
  mins=X.min(axis=0);alpha+=mins.sum();mins_all.extend(mins.tolist())
 return alpha,min(mins_all),max(mins_all)
# proxy endpoints choose r or l values, arbitrary selection is okay
ar=alpha_selected(Qr,r); al=alpha_selected(Ql,l)
print('alpha right',ar,'alpha left',al)
# conservative alpha .005 and projective ratio bound formula
for name,s,alpha in [('r',sr,0.005),('l',sl,0.005)]:
 kappa=s.max()/s.min();n=50; kn=kappa**n
 denom=1-kn*(1-alpha)
 R=(kn**2-kn*(1-alpha))/denom
 print(name,'kappa',kappa,'kn',kn,'Rbound',R,'relspread',R-1,'denom',denom)
