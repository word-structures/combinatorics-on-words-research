#!/usr/bin/env python3
from pathlib import Path
import numpy as np, json
ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/'data'
D=np.load(DATA/'H8_L7_LIFTED_GRAPH_CHECKPOINT.npz')
states=D['states']; giant=D['giant_global']; u=D['u']; v=D['v']; ep=D['edge_profile_id']; profiles=D['profiles']
N=len(giant); codes=states[giant]; f0=(codes%3==0).astype(float)-1/3
base=json.loads((DATA/'H8_RESOLVENT_SOFT_DERIVATIVES.json').read_text())

def calc(eps,pid):
    ew=np.exp(-eps*(ep==pid)); r=np.ones(N); l=np.ones(N)
    for it in range(2000):
        nr=np.bincount(u,weights=ew*r[v],minlength=N); nl=np.bincount(v,weights=ew*l[u],minlength=N)
        nr/=nr.max(); nl/=nl.max(); err=max(np.max(np.abs(nr-r)),np.max(np.abs(nl-l))); r,l=nr,nl
        if err<4e-14: break
    Ar=np.bincount(u,weights=ew*r[v],minlength=N); lam=float(np.dot(l,Ar)/np.dot(l,r)); l/=np.dot(l,r); pi=l*r;pi/=pi.sum()
    trans=ew*r[v]/(lam*r[u])
    def Pmv(x):return np.bincount(u,weights=trans*x[v],minlength=N)
    f=f0-np.dot(pi,f0); x=np.zeros(N)
    for k in range(3000):
        nx=f+Pmv(x); nx-=np.dot(pi,nx); er=np.max(np.abs(nx-x)); x=nx
        if er<3e-13:break
    return 2*float(np.dot(pi,f*x))-float(np.dot(pi,f*f))

delta=1e-4; out=[]
for pid,p in enumerate(profiles,1):
    am=calc(-delta,pid); ap=calc(delta,pid); d=(ap-am)/(2*delta); rr=base['profiles'][pid-1]['a_prime']
    rec={'profile':p.tolist(),'delta':delta,'a_minus':am,'a_plus':ap,'central_derivative':d,'resolvent_a_prime':rr,'abs_diff':abs(d-rr)}
    print(rec,flush=True);out.append(rec)
(DATA/'H8_SOFT_DERIVATIVE_FINITE_DIFFERENCE_REPLAY.json').write_text(json.dumps(out,indent=2))
