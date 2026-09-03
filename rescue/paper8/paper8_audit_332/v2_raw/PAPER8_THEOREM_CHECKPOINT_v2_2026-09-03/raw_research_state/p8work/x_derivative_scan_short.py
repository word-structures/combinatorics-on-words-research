import numpy as np, json, time
from pathlib import Path
D=np.load('/mnt/data/h8cp/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz')
states=D['states']; giant=D['giant_global']; u=D['u']; v=D['v']; ep=D['edge_profile_id']; profiles=D['profiles'];N=len(giant);codes=states[giant]
f0=(codes%3==0).astype(float)-1/3

def calc(x,pid,init=None,tol=3e-13):
    wt=np.ones(len(u)); wt[ep==pid]=x
    if init is None:r=np.ones(N);l=np.ones(N)
    else:r,l=init[0].copy(),init[1].copy()
    for it in range(5000):
        nr=np.bincount(u,weights=wt*r[v],minlength=N);nl=np.bincount(v,weights=wt*l[u],minlength=N)
        nr/=nr.max();nl/=nl.max();err=max(np.max(np.abs(nr-r)),np.max(np.abs(nl-l)));r,l=nr,nl
        if err<tol:break
    Ar=np.bincount(u,weights=wt*r[v],minlength=N);lam=float(np.dot(l,Ar)/np.dot(l,r));l/=np.dot(l,r);pi=l*r;pi/=pi.sum()
    trans=wt*r[v]/(lam*r[u])
    def P(z):return np.bincount(u,weights=trans*z[v],minlength=N)
    def Ps(z):return np.bincount(v,weights=(l[u]*wt/(lam*l[v]))*z[u],minlength=N)
    f=f0-np.dot(pi,f0)
    def pois(rhs, adj=False):
        z=np.zeros(N); mv=Ps if adj else P
        for k in range(10000):
            nz=rhs+mv(z);nz-=np.dot(pi,nz);er=np.max(np.abs(nz-z));z=nz
            if er<5e-12:break
        return z,k,er
    up,_,_=pois(f); wp,_,_=pois(f,True)
    a=2*np.dot(pi,f*up)-np.dot(pi,f*f)
    # raw transfer derivative A' = 1 on target edges
    targ=(ep==pid)
    base=np.zeros(len(u)); base[targ]=r[v[targ]]/(lam*r[u[targ]]) # T'_ij rj/(lam ri)
    hbar=np.bincount(u,weights=base,minlength=N)
    qlog=float(np.dot(pi,hbar)) # lambda'/lambda
    psi,_,_=pois(hbar-qlog)
    pprime_edge=base + trans*(psi[v]-psi[u]-qlog)
    # check rows
    rows=np.bincount(u,weights=pprime_edge,minlength=N)
    H=2*f*up-f*f; Hc=H-np.dot(pi,H);zH,_,_=pois(Hc)
    Ppv=np.bincount(u,weights=pprime_edge*zH[v],minlength=N)
    termpi=float(np.dot(pi,Ppv))
    y=np.bincount(u,weights=pprime_edge*up[v],minlength=N);y-=np.dot(pi,y);zy,_,_=pois(y)
    termz=2*float(np.dot(pi,f*zy)); apr=termpi+termz
    return {'x':x,'lambda':lam,'a':float(a),'da_dx':apr,'qlog':qlog,'rowres':float(np.max(np.abs(rows))),'pferr':float(err)},(r,l)

xs=np.array([0.8,1.0])
import sys
PID=int(sys.argv[1]) if len(sys.argv)>1 else None
out={}
for pid,p in enumerate(profiles,1):
    if PID is not None and pid!=PID: continue
    arr=[];init=None
    for x in xs:
        t=time.time(); z,init=calc(float(x),pid,init);arr.append(z); print(p.tolist(),x,z['da_dx'],'a',z['a'],'sec',time.time()-t,flush=True)
    out[','.join(map(str,p.tolist()))]=arr
Path('/mnt/data/h8cp/xscan.json').write_text(json.dumps(out,indent=2))
