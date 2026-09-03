import numpy as np
D=np.load('/mnt/data/h8cp/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');states=D['states'];giant=D['giant_global'];u=D['u'];v=D['v'];ep=D['edge_profile_id'];profiles=D['profiles'];N=len(giant);codes=states[giant]
r=np.ones(N);l=np.ones(N)
for _ in range(300):
 nr=np.bincount(u,weights=r[v],minlength=N);nl=np.bincount(v,weights=l[u],minlength=N);nr/=nr.max();nl/=nl.max();r,l=nr,nl
Ar=np.bincount(u,weights=r[v],minlength=N);lam=np.dot(l,Ar)/np.dot(l,r);l/=np.dot(l,r);pi=l*r;pi/=pi.sum();trans=r[v]/(lam*r[u])
def P(x):return np.bincount(u,weights=trans*x[v],minlength=N)
def Ps(x):return np.bincount(v,weights=(l[u]/(lam*l[v]))*x[u],minlength=N)
def pois(rhs,adj=False,tol=1e-14):
 x=np.zeros(N);mv=Ps if adj else P
 for it in range(10000):
  nx=rhs+mv(x);nx-=np.dot(pi,nx);er=np.max(abs(nx-x));x=nx
  if er<tol:break
 # equation residual
 res=rhs-(x-mv(x));res-=np.dot(pi,res)
 return x,it,er,np.max(abs(res)),np.ptp(res)
f=(codes%3==0).astype(float)-1/3
up,*ru=pois(f);wp,*rw=pois(f,True)
print('f sup osc',abs(f).max(),np.ptp(f));print('u sup osc',abs(up).max(),np.ptp(up),'info',ru);print('w sup osc',abs(wp).max(),np.ptp(wp),'info',rw)
H=2*f*up-f*f;Hc=H-np.dot(pi,H);zH,*rh=pois(Hc)
print('H sup osc',abs(Hc).max(),np.ptp(Hc));print('zH sup osc',abs(zH).max(),np.ptp(zH),'info',rh)
for pid,p in enumerate(profiles,1):
 g=(ep==pid).astype(float);gbar=np.bincount(u,weights=trans*g,minlength=N);q=np.dot(pi,gbar);psi,*rp=pois(q-gbar)
 d=-g+q+psi[v]-psi[u]
 def Pp(x):return np.bincount(u,weights=trans*d*x[v],minlength=N)
 y=Pp(up);y-=np.dot(pi,y);zy,*ry=pois(y)
 print('profile',p.tolist(),'q',q,'psi sup osc',abs(psi).max(),np.ptp(psi),'dmax',abs(d).max(),'Ppu sup',abs(y).max(),'zy sup osc',abs(zy).max(),np.ptp(zy),'poisin',rp,ry)
