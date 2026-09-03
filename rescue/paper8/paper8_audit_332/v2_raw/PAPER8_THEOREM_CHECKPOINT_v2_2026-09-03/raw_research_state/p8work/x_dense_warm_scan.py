import numpy as np, sys, json, time
D=np.load('/mnt/data/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz')
states=D['states'];giant=D['giant_global'];u=D['u'];v=D['v'];ep=D['edge_profile_id'];profiles=D['profiles'];N=len(giant);codes=states[giant];f0=(codes%3==0).astype(float)-1/3
pid=int(sys.argv[1]);p=profiles[pid-1];B=sum((int(z)-8/3)**2 for z in p)
# denser near 0 and regular grid
xs=np.unique(np.concatenate(([1e-8,1e-7,1e-6,1e-5,1e-4,1e-3,1e-2],np.linspace(.025,1,40))))
r=np.ones(N);l=np.ones(N)
def calc(x):
 global r,l
 wt=np.ones(len(u));wt[ep==pid]=x
 for it in range(3000):
  nr=np.bincount(u,weights=wt*r[v],minlength=N);nl=np.bincount(v,weights=wt*l[u],minlength=N);nr/=nr.max();nl/=nl.max();err=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
  if err<2e-13:break
 Ar=np.bincount(u,weights=wt*r[v],minlength=N);lam=np.dot(l,Ar)/np.dot(l,r);l/=np.dot(l,r);pi=l*r;pi/=pi.sum();trans=wt*r[v]/(lam*r[u])
 def P(z):return np.bincount(u,weights=trans*z[v],minlength=N)
 f=f0-np.dot(pi,f0)
 def pois(rhs):
  z=np.zeros(N)
  for k in range(5000):
   nz=rhs+P(z);nz-=np.dot(pi,nz);er=np.max(abs(nz-z));z=nz
   if er<5e-12:break
  return z
 up=pois(f);a=2*np.dot(pi,f*up)-np.dot(pi,f*f);H=2*f*up-f*f;zH=pois(H-np.dot(pi,H))
 targ=ep==pid;base=np.zeros(len(u));base[targ]=r[v[targ]]/(lam*r[u[targ]])
 hbar=np.bincount(u,weights=base,minlength=N);qlog=np.dot(pi,hbar);psi=pois(hbar-qlog)
 ppe=base+trans*(psi[v]-psi[u]-qlog)
 def Pp(z):return np.bincount(u,weights=ppe*z[v],minlength=N)
 term1=np.dot(pi,Pp(zH));y=Pp(up);y-=np.dot(pi,y);zy=pois(y);dadx=term1+2*np.dot(pi,f*zy)
 z=f.copy();C=[np.dot(pi,f*f)]
 for kk in range(1,16):z=P(z);C.append(np.dot(pi,f*z))
 V16=16*C[0]+2*sum((16-k)*C[k] for k in range(1,16));local=-qlog*(V16-4*B/3);gamma=dadx-local
 return dict(x=float(x),lambda_=float(lam),a=float(a),da_dx=float(dadx),qlog=float(qlog),V16=float(V16),local_dx=float(local),gamma_dx=float(gamma),ratio=float(abs(gamma/local)),pf_it=int(it))
arr=[];t0=time.time()
for x in xs:
 z=calc(float(x));arr.append(z);print(pid,x,z['da_dx'],z['ratio'],z['pf_it'],flush=True)
# finite slope of da and ratio across adjacent points
for i in range(1,len(arr)-1):
 x0,x1,x2=arr[i-1]['x'],arr[i]['x'],arr[i+1]['x']
 arr[i]['da_dx_slope_secant2']=(arr[i+1]['da_dx']-arr[i-1]['da_dx'])/(x2-x0)
 arr[i]['ratio_slope_secant2']=(arr[i+1]['ratio']-arr[i-1]['ratio'])/(x2-x0)
out={'profile':p.tolist(),'elapsed':time.time()-t0,'rows':arr}
open(f'/mnt/data/h8cp/x_dense_pid{pid}.json','w').write(json.dumps(out,indent=2))
