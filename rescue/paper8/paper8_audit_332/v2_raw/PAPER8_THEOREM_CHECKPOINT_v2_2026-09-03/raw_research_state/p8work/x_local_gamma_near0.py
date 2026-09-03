import numpy as np, sys, json, time
D=np.load('/mnt/data/h8cp/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');states=D['states'];giant=D['giant_global'];u=D['u'];v=D['v'];ep=D['edge_profile_id'];profiles=D['profiles'];N=len(giant);codes=states[giant];f0=(codes%3==0).astype(float)-1/3
pid=int(sys.argv[1]);p=profiles[pid-1];B=sum((int(z)-8/3)**2 for z in p)
xs=[1e-8,1e-7,1e-6,1e-5,1e-4]

def calc(x):
 wt=np.ones(len(u));wt[ep==pid]=x;r=np.ones(N);l=np.ones(N)
 for it in range(3000):
  nr=np.bincount(u,weights=wt*r[v],minlength=N);nl=np.bincount(v,weights=wt*l[u],minlength=N);nr/=nr.max();nl/=nl.max();err=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
  if err<4e-13:break
 Ar=np.bincount(u,weights=wt*r[v],minlength=N);lam=np.dot(l,Ar)/np.dot(l,r);l/=np.dot(l,r);pi=l*r;pi/=pi.sum();trans=wt*r[v]/(lam*r[u])
 def P(z):return np.bincount(u,weights=trans*z[v],minlength=N)
 f=f0-np.dot(pi,f0)
 def pois(rhs):
  z=np.zeros(N)
  for k in range(5000):
   nz=rhs+P(z);nz-=np.dot(pi,nz);er=np.max(abs(nz-z));z=nz
   if er<2e-11:break
  return z
 up=pois(f);H=2*f*up-f*f;zH=pois(H-np.dot(pi,H))
 # raw x derivative
 targ=ep==pid;base=np.zeros(len(u));base[targ]=r[v[targ]]/(lam*r[u[targ]])
 hbar=np.bincount(u,weights=base,minlength=N);qlog=np.dot(pi,hbar);psi=pois(hbar-qlog)
 ppe=base+trans*(psi[v]-psi[u]-qlog)
 def Pp(z):return np.bincount(u,weights=ppe*z[v],minlength=N)
 term1=np.dot(pi,Pp(zH));y=Pp(up);y-=np.dot(pi,y);zy=pois(y);dadx=term1+2*np.dot(pi,f*zy)
 # V16 current
 z=f.copy();C=[np.dot(pi,f*f)]
 for kk in range(1,16):z=P(z);C.append(np.dot(pi,f*z))
 V16=16*C[0]+2*sum((16-k)*C[k] for k in range(1,16))
 local_dx=-qlog*(V16-4*B/3)
 gamma_dx=dadx-local_dx
 return dict(x=x,da_dx=float(dadx),qlog=float(qlog),V16=float(V16),Bc=float(.75*V16),local_dx=float(local_dx),gamma_dx=float(gamma_dx),ratio_abs=float(abs(gamma_dx/local_dx)) if local_dx else None)
arr=[]
for x in xs:
 t=time.time();z=calc(x);arr.append(z);print(p.tolist(),z,'sec',time.time()-t,flush=True)
open(f'/mnt/data/h8cp/xlocalgamma_pid{pid}.json','w').write(json.dumps(arr,indent=2))
