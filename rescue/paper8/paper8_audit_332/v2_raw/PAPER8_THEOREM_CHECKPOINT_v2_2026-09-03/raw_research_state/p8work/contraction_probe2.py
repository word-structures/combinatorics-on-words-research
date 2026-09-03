import numpy as np, scipy.sparse.linalg as sla, time
D=np.load('/mnt/data/h8cp/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz')
states=D['states']; giant=D['giant_global']; u=D['u']; v=D['v']; N=len(giant)
r=np.ones(N); l=np.ones(N)
for it in range(10000):
 nr=np.bincount(u,weights=r[v],minlength=N); nl=np.bincount(v,weights=l[u],minlength=N);nr/=nr.max();nl/=nl.max();err=max(np.max(abs(nr-r)),np.max(abs(nl-l)));r,l=nr,nl
 if err<3e-14:break
Ar=np.bincount(u,weights=r[v],minlength=N);lam=float(np.dot(l,Ar)/np.dot(l,r));l/=np.dot(l,r);pi=l*r;pi/=pi.sum(); sp=np.sqrt(pi); trans=r[v]/(lam*r[u])
def P(x):return np.bincount(u,weights=trans*x[v],minlength=N)
def Ps(x):return np.bincount(v,weights=(l[u]/(lam*l[v]))*x[u],minlength=N)
# Euclidean transformed operators H = S P S^-1; H^T=S^-1? Actually y=S x; H y=S P(S^-1 y)
def H(y):return sp*P(y/sp)
def HT(y):return sp*Ps(y/sp)
const=sp/np.linalg.norm(sp)
def proj(y):return y-const*np.dot(const,y)
for m in [1,2,4,8,15,16,20,30,40]:
 def Q(y,m=m):
  y=proj(y)
  for _ in range(m): y=H(y)
  for _ in range(m): y=HT(y)
  return proj(y)
 op=sla.LinearOperator((N,N),matvec=Q,rmatvec=Q,dtype=float)
 t=time.time(); vals=sla.eigsh(op,k=3,which='LA',return_eigenvectors=False,tol=1e-7,maxiter=1000);vals=np.sort(vals)[::-1]
 print('m',m,'vals',vals,'sing',np.sqrt(np.maximum(vals,0)),'time',time.time()-t,flush=True)
