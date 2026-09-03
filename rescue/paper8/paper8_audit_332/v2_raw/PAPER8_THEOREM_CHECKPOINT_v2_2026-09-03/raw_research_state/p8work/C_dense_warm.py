import numpy as np, sys, json, time
D=np.load('/mnt/data/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');states=D['states'];giant=D['giant_global'];u=D['u'];v=D['v'];ep=D['edge_profile_id'];profiles=D['profiles'];N=len(giant);codes=states[giant];f0=(codes%3==0).astype(float)-1/3
pid=int(sys.argv[1]); p=profiles[pid-1]; xs=np.concatenate(([1e-6,1e-4,1e-3,1e-2],np.linspace(.025,1,40)));xs=np.unique(xs)
r=np.ones(N);l=np.ones(N);up0=None;zH0=None;psi0=None;zy0=None
rows=[]
for x in xs:
 wt=np.ones(len(u));wt[ep==pid]=x
 for it in range(2000):
  nr=np.bincount(u,weights=wt*r[v],minlength=N);nl=np.bincount(v,weights=wt*l[u],minlength=N);nr/=nr.max();nl/=nl.max();err=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
  if err<3e-13:break
 Ar=np.bincount(u,weights=wt*r[v],minlength=N);lam=np.dot(l,Ar)/np.dot(l,r);l/=np.dot(l,r);pi=l*r;pi/=pi.sum();trans=wt*r[v]/(lam*r[u])
 def P(z): return np.bincount(u,weights=trans*z[v],minlength=N)
 f=f0-np.dot(pi,f0)
 def pois(rhs,init=None):
  z=np.zeros(N) if init is None else init.copy()
  for k in range(3000):
   nz=rhs+P(z);nz-=np.dot(pi,nz);er=np.max(abs(nz-z));z=nz
   if er<1e-11:break
  return z
 up=pois(f,up0);up0=up;H=2*f*up-f*f;zH=pois(H-np.dot(pi,H),zH0);zH0=zH
 targ=ep==pid;base=np.zeros(len(u));base[targ]=r[v[targ]]/(lam*r[u[targ]])
 hbar=np.bincount(u,weights=base,minlength=N);qlog=np.dot(pi,hbar);psi=pois(hbar-qlog,psi0);psi0=psi
 ppe=base+trans*(psi[v]-psi[u]-qlog)
 def Pp(z): return np.bincount(u,weights=ppe*z[v],minlength=N)
 term1=np.dot(pi,Pp(zH));y=Pp(up);y-=np.dot(pi,y);zy=pois(y,zy0);zy0=zy;dadx=term1+2*np.dot(pi,f*zy);C=dadx/qlog
 rows.append({'x':float(x),'C':float(C),'da_dx':float(dadx),'qlog':float(qlog),'pf_it':int(it)})
 print(pid,x,C,it,flush=True)
for i in range(1,len(rows)-1):
 rows[i]['Cprime_sec']=(rows[i+1]['C']-rows[i-1]['C'])/(rows[i+1]['x']-rows[i-1]['x'])
out={'profile':p.tolist(),'rows':rows,'C_min':min(z['C'] for z in rows),'C_max':max(z['C'] for z in rows),'min_abs':min(abs(z['C']) for z in rows)}
open(f'/mnt/data/h8cp/C_dense_pid{pid}.json','w').write(json.dumps(out,indent=2))
