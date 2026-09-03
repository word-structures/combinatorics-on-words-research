import numpy as np, json, sys, math, time
from pathlib import Path
pid=int(sys.argv[1]); nlin=int(sys.argv[2]) if len(sys.argv)>2 else 201
Q=np.load(f'/mnt/data/h8cp/quotient_pid{pid}.npz');nxt=Q['nxt'];typ=Q['typ'];profile=Q['profile'];K=nxt.shape[0];cc,ss=np.where(nxt>=0);dd=nxt[cc,ss];tt=typ[cc,ss]; y=(ss==0).astype(float)

def pf_qx(x,t,r=None,l=None,tol=2e-13):
 ew=np.exp(t*y)*np.where(tt==1,x,1.0)
 if r is None:r=np.ones(K)
 if l is None:l=np.ones(K)
 r=r/r.max();l=l/l.max()
 for it in range(3000):
  nr=np.bincount(cc,weights=ew*r[dd],minlength=K);nl=np.bincount(dd,weights=ew*l[cc],minlength=K);nr/=nr.max();nl/=nl.max();er=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
  if er<tol:break
 Ar=np.bincount(cc,weights=ew*r[dd],minlength=K);lam=float(np.dot(l,Ar)/np.dot(l,r)); norm=np.dot(l,r); l=l/norm
 # derivative matrix B_t has target entries exp(t*y), independent of x
 qx=float(np.sum(l[cc[tt==1]]*np.exp(t*y[tt==1])*r[dd[tt==1]])/lam)
 return qx,lam,r,l,it,er

def C_at(x,h=5e-4,warm=None):
 vals={}; states={}
 # use t=0 first, then +/- with warm from zero
 q0,la0,r0,l0,it0,e0=pf_qx(x,0.0,*(warm if warm else (None,None)))
 vals[0.0]=q0
 for t in [-h,h]:
  q,la,r,l,it,e=pf_qx(x,t,r0,l0);vals[t]=q
 C=(math.log(vals[h])-2*math.log(vals[0.0])+math.log(vals[-h]))/(h*h)
 return C,q0,(r0,l0),e0
# linear plus log near zero; descending warm start
xs=np.unique(np.concatenate([np.geomspace(1e-8,1e-2,61),np.linspace(0.01,1.0,nlin)]))
arr=[]; warm=None
for k,x in enumerate(xs[::-1]):
 C,q,warm,er=C_at(float(x),warm=warm);arr.append({'x':float(x),'C':float(C),'qx':float(q),'pf_err':float(er)})
 if k%50==0:print(profile.tolist(),k,x,C,flush=True)
arr=sorted(arr,key=lambda z:z['x']); xa=np.array([z['x'] for z in arr]); ca=np.array([z['C'] for z in arr]); sl=np.diff(ca)/np.diff(xa)
# detect secant sign changes = possible extrema geometry
changes=[]
for i in range(1,len(sl)):
 if sl[i-1]*sl[i]<0:changes.append([float(xa[i]),float(sl[i-1]),float(sl[i])])
summary={'profile':profile.tolist(),'K':K,'n':len(arr),'C_min':float(ca.min()),'x_C_min':float(xa[np.argmin(ca)]),'C_max':float(ca.max()),'x_C_max':float(xa[np.argmax(ca)]),'min_abs_C':float(np.min(abs(ca))),'x_min_abs_C':float(xa[np.argmin(abs(ca))]),'max_abs_secant_slope':float(np.max(abs(sl))),'secant_slope_sign_changes':changes}
out={'summary':summary,'points':arr};Path(f'/mnt/data/h8cp/quotient_C_fd_scan_pid{pid}.json').write_text(json.dumps(out,indent=2));print(summary)
