import numpy as np, scipy.sparse.linalg as sla, time
D=np.load('/mnt/data/h8cp/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz')
states=D['states']; giant=D['giant_global']; u=D['u']; v=D['v']; N=len(giant)
# PF
r=np.ones(N); l=np.ones(N)
for it in range(10000):
    nr=np.bincount(u,weights=r[v],minlength=N); nl=np.bincount(v,weights=l[u],minlength=N)
    nr/=nr.max(); nl/=nl.max(); err=max(np.max(np.abs(nr-r)),np.max(np.abs(nl-l)));r,l=nr,nl
    if err<3e-14: break
Ar=np.bincount(u,weights=r[v],minlength=N); lam=float(np.dot(l,Ar)/np.dot(l,r)); l/=np.dot(l,r); pi=l*r; pi/=pi.sum()
trans=r[v]/(lam*r[u])
# P and L2(pi) adjoint
def P(x): return np.bincount(u,weights=trans*x[v],minlength=N)
def Ps(x): return np.bincount(v,weights=(l[u]/(lam*l[v]))*x[u],minlength=N)
# check adjoint perhaps
print('PF',lam,it,err,'pi min max',pi.min(),pi.max())
# centered projection in L2pi
def proj(x): return x-np.dot(pi,x)
for m in [1,2,4,8,15,16,20,30,40]:
    def Qmv(x,m=m):
        x=proj(x)
        y=x
        for _ in range(m): y=P(y)
        for _ in range(m): y=Ps(y)
        return proj(y)
    op=sla.LinearOperator((N,N),matvec=Qmv,dtype=np.float64)
    t=time.time()
    vals=sla.eigsh(op,k=2,which='LA',return_eigenvectors=False,tol=2e-5,maxiter=500)
    vals=np.sort(vals)[::-1]
    print('m',m,'eigs',vals,'sing',np.sqrt(np.maximum(vals,0)),'time',time.time()-t,flush=True)
