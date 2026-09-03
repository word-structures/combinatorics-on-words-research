import numpy as np, json, sys, math, time
from pathlib import Path
pid=int(sys.argv[1])
QD=np.load(f'/mnt/data/h8cp/quotient_pid{pid}.npz'); cls=QD['cls']; sizes=QD['sizes']; nxt=QD['nxt']; typ=QD['typ']; rep=QD['rep']; profile=QD['profile']
GD=np.load('/mnt/data/H8_PROFILE_RESPONSE_CHECKPOINT_v3_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz'); states=GD['states']; giant=GD['giant_global']; codes=states[giant]
K=nxt.shape[0]
cc,ss=np.where(nxt>=0); dd=nxt[cc,ss]; tt=typ[cc,ss]
lastsym=(codes[rep]%3).astype(np.int8)
# verify class-constant last symbol
mins=np.full(K,3,dtype=np.int8); maxs=np.full(K,-1,dtype=np.int8); origlast=(codes%3).astype(np.int8); np.minimum.at(mins,cls,origlast); np.maximum.at(maxs,cls,origlast)
assert np.all(mins==maxs)
f0=(lastsym==0).astype(float)-1/3

def calc(x,r=None,l=None,tol=5e-13):
    ew=np.where(tt==1,x,1.0)
    if r is None: r=np.ones(K)
    if l is None: l=np.ones(K)
    r=r/r.max(); l=l/l.max()
    for it in range(5000):
        nr=np.bincount(cc,weights=ew*r[dd],minlength=K); nl=np.bincount(dd,weights=ew*l[cc],minlength=K)
        nr/=nr.max(); nl/=nl.max(); err=max(np.max(abs(nr-r)),np.max(abs(nl-l))); r,l=nr,nl
        if err<tol: break
    Ar=np.bincount(cc,weights=ew*r[dd],minlength=K); lam=float(np.dot(l,Ar)/np.dot(l,r)); l=l/np.dot(l,r); pi=l*r; pi/=pi.sum()
    trans=ew*r[dd]/(lam*r[cc])
    def P(z): return np.bincount(cc,weights=trans*z[dd],minlength=K)
    f=f0-np.dot(pi,f0)
    def pois(rhs,ptol=3e-12):
        z=np.zeros(K)
        for j in range(10000):
            nz=rhs+P(z); nz-=np.dot(pi,nz); er=np.max(abs(nz-z)); z=nz
            if er<ptol: break
        return z,j,er
    up,_,_=pois(f); H=2*f*up-f*f; zH,_,_=pois(H-np.dot(pi,H))
    # derivative w.r.t x: only target entries have dA/dx=1
    base=np.zeros(len(cc)); targ=(tt==1); base[targ]=r[dd[targ]]/(lam*r[cc[targ]])
    hbar=np.bincount(cc,weights=base,minlength=K); qlog=float(np.dot(pi,hbar))
    psi,_,_=pois(hbar-qlog)
    ppe=base+trans*(psi[dd]-psi[cc]-qlog)
    def Pp(z): return np.bincount(cc,weights=ppe*z[dd],minlength=K)
    term1=float(np.dot(pi,Pp(zH))); y=Pp(up); y-=np.dot(pi,y); zy,_,_=pois(y); dadx=term1+2*float(np.dot(pi,f*zy))
    C=dadx/qlog
    # V16/local/gamma as diagnostics
    z=f.copy(); cor=[float(np.dot(pi,f*f))]
    for kk in range(1,16): z=P(z); cor.append(float(np.dot(pi,f*z)))
    V16=16*cor[0]+2*sum((16-k)*cor[k] for k in range(1,16))
    B=float(sum((int(z)-8/3)**2 for z in profile)); local_dx=-qlog*(V16-4*B/3); gamma_dx=dadx-local_dx
    return {'x':float(x),'lambda':lam,'qlog':qlog,'da_dx':dadx,'C':C,'V16':V16,'local_dx':local_dx,'gamma_dx':gamma_dx,'ratio_abs':abs(gamma_dx/local_dx) if local_dx else None,'pf_it':it,'pf_err':float(err)},r,l

# Hybrid grid: log-dense near hard endpoint + linear full interval, de-duplicated.
xs=np.unique(np.concatenate([np.geomspace(1e-8,1e-2,49),np.linspace(0.01,1.0,100)]))
arr=[]; r=l=None
# warm start from x=1 downward is safer; compute descending then sort output
for idx,x in enumerate(xs[::-1]):
    rec,r,l=calc(float(x),r,l); arr.append(rec)
    if idx%20==0: print(profile.tolist(),idx,'x',x,'C',rec['C'],'ratio',rec['ratio_abs'],flush=True)
arr=sorted(arr,key=lambda z:z['x'])
Cs=np.array([z['C'] for z in arr]); xs2=np.array([z['x'] for z in arr])
# numerical slopes for geometry only, not certification
sl=np.diff(Cs)/np.diff(xs2)
summary={'profile':profile.tolist(),'quotient_states':int(K),'n_points':len(arr),'C_min':float(Cs.min()),'C_max':float(Cs.max()),'x_at_C_min':float(xs2[np.argmin(Cs)]),'x_at_C_max':float(xs2[np.argmax(Cs)]),'min_abs_C':float(np.min(abs(Cs))),'x_at_min_abs_C':float(xs2[np.argmin(abs(Cs))]),'max_abs_secant_slope':float(np.max(abs(sl))),'max_ratio_abs':float(max(z['ratio_abs'] for z in arr if z['ratio_abs'] is not None))}
out={'summary':summary,'points':arr}
Path(f'/mnt/data/h8cp/quotient_C_scan_pid{pid}.json').write_text(json.dumps(out,indent=2))
print(summary)
