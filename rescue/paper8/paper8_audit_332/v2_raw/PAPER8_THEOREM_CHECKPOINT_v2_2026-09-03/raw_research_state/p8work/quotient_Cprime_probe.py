import numpy as np, json, sys, math, time
pid=int(sys.argv[1]); Q=np.load(f'/mnt/data/h8cp/a_tilt_quotient_pid{pid}.npz'); rows=Q['rows']; cols=Q['cols']; targ=Q['target']; aedge=Q['aedge']; mult=Q['mult'].astype(float); profile=Q['profile']; K=len(Q['sizes'])

def qx_at(x,t,r=None,l=None,tol=4e-14):
 ew=mult*np.exp(t*aedge.astype(float))*np.where(targ==1,x,1.0)
 if r is None:r=np.ones(K)
 if l is None:l=np.ones(K)
 r=r/r.max();l=l/l.max()
 for it in range(4000):
  nr=np.bincount(rows,weights=ew*r[cols],minlength=K);nl=np.bincount(cols,weights=ew*l[rows],minlength=K);nr/=nr.max();nl/=nl.max();er=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
  if er<tol:break
 Ar=np.bincount(rows,weights=ew*r[cols],minlength=K);lam=float(np.dot(l,Ar)/np.dot(l,r));l=l/np.dot(l,r)
 mask=targ==1
 qx=float(np.sum(l[rows[mask]]*mult[mask]*np.exp(t*aedge[mask].astype(float))*r[cols[mask]])/lam)
 return qx,r,l

def C5(x,h=0.002):
 vals={}
 # independent warm around t=0
 q0,r0,l0=qx_at(x,0.0);vals[0]=math.log(q0)
 for m in [-2,-1,1,2]:
  q,_,_=qx_at(x,m*h,r0,l0);vals[m]=math.log(q)
 # 5-point second derivative: (-f2+16f1-30f0+16fm1-fm2)/(12h2)
 C=(-vals[2]+16*vals[1]-30*vals[0]+16*vals[-1]-vals[-2])/(12*h*h)
 return C
# probe grid with adaptive x difference
xs=np.concatenate(([1e-4,1e-3,1e-2,.025,.05,.075,.1],np.linspace(.15,1,18)))
out=[]
for x in xs:
 dx=min(2e-3,max(2e-5,x/5))
 if x-dx<=0:
  c0=C5(x);cp=C5(x+dx);der=(cp-c0)/dx;cm=None
 else:
  cm=C5(x-dx);cp=C5(x+dx);c0=C5(x);der=(cp-cm)/(2*dx)
 rec={'x':float(x),'dx':float(dx),'C':float(c0),'Cprime_fd':float(der),'Cminus':None if cm is None else float(cm),'Cplus':float(cp)};out.append(rec);print(profile.tolist(),rec,flush=True)
summary={'profile':profile.tolist(),'K':int(K),'min_Cprime_fd':float(min(z['Cprime_fd'] for z in out)),'x_at_min_Cprime':float(min(out,key=lambda z:z['Cprime_fd'])['x']),'max_Cprime_fd':float(max(z['Cprime_fd'] for z in out))}
open(f'/mnt/data/h8cp/quotient_Cprime_probe_pid{pid}.json','w').write(json.dumps({'summary':summary,'points':out},indent=2));print(summary)
