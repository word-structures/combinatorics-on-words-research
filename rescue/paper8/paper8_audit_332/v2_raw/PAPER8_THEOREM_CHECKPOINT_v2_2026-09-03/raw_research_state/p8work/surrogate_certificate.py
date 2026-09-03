import numpy as np, json, math
from pathlib import Path
D=np.load('/mnt/data/h8cp/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');states=D['states'];giant=D['giant_global'];u=D['u'];v=D['v'];ep=D['edge_profile_id'];profiles=D['profiles'];N=len(giant);codes=states[giant]
# approximate Perron right vector only
r=np.ones(N)
for it in range(1000):
 Ar=np.bincount(u,weights=r[v],minlength=N); nr=Ar/Ar.max(); err=np.max(abs(nr-r)); r=nr
 if err<2e-14:break
Ar=np.bincount(u,weights=r[v],minlength=N);s=Ar/r;smin=float(s.min());smax=float(s.max());kappa=smax/smin
# exact row-normalized surrogate in real arithmetic defined by float r
qedge=r[v]/Ar[u]
def Q(x):return np.bincount(u,weights=qedge*x[v],minlength=N)
def QT(x):return np.bincount(v,weights=qedge*x[u],minlength=N)
# stationary mu by power
mu=np.ones(N)/N
for jt in range(10000):
 nm=QT(mu); nm/=nm.sum(); ermu=np.max(abs(nm-mu));mu=nm
 if ermu<2e-15:break
print('r it',it,'cw',smin,smax,'kappa-1',kappa-1,'mu it',jt,'err',ermu,'rows',np.bincount(u,weights=qedge,minlength=N).min(),np.bincount(u,weights=qedge,minlength=N).max())
f=(codes%3==0).astype(float)-1/3; f-=np.dot(mu,f)
def pois(rhs,tol=1e-14):
 x=np.zeros(N)
 for k in range(10000):
  nx=rhs+Q(x);nx-=np.dot(mu,nx);er=np.max(abs(nx-x));x=nx
  if er<tol:break
 res=rhs-(x-Q(x));res-=np.dot(mu,res)
 return x,dict(it=k,step=float(er),res_sup=float(np.max(abs(res))),res_osc=float(np.ptp(res)))
u0,ru=pois(f);a=2*np.dot(mu,f*u0)-np.dot(mu,f*f)
# V16
z=f.copy(); C=[np.dot(mu,f*f)]
for kk in range(1,16):z=Q(z);C.append(np.dot(mu,f*z))
V16=16*C[0]+2*sum((16-k)*C[k] for k in range(1,16))
H=2*f*u0-f*f;zH,rh=pois(H-np.dot(mu,H))
out={'cw':{'smin':smin,'smax':smax,'kappa':kappa},'mu_iter':{'it':jt,'err':float(ermu)},'a_Q':float(a),'V16_Q':float(V16),'poisson_u':ru,'poisson_zH':rh,'profiles':[]}
for pid,p in enumerate(profiles,1):
 g=(ep==pid).astype(float);gbar=np.bincount(u,weights=qedge*g,minlength=N);q=float(np.dot(mu,gbar));psi,rp=pois(q-gbar);d=-g+q+psi[v]-psi[u];ppedge=qedge*d
 def Qp(x):return np.bincount(u,weights=ppedge*x[v],minlength=N)
 term1=float(np.dot(mu,Qp(zH)));y=Qp(u0);y-=np.dot(mu,y);zy,ry=pois(y);term2=2*float(np.dot(mu,f*zy));apr=term1+term2
 B=float(sum((int(x)-8/3)**2 for x in p));local=q*(V16-4*B/3);gamma=apr-local
 out['profiles'].append({'profile':p.tolist(),'q_Q':q,'local_Q':local,'a_prime_Q':apr,'Gamma_Q':gamma,'ratio':abs(gamma/local),'psi_osc':float(np.ptp(psi)),'dmax':float(np.max(abs(d))),'zH_osc':float(np.ptp(zH)),'u_osc':float(np.ptp(u0)),'zy_osc':float(np.ptp(zy)),'poisson_psi':rp,'poisson_zy':ry})
 print(p.tolist(),'local',local,'apr',apr,'gamma',gamma,'ratio',abs(gamma/local))
Path('/mnt/data/h8cp/surrogate_certificate_results.json').write_text(json.dumps(out,indent=2))
