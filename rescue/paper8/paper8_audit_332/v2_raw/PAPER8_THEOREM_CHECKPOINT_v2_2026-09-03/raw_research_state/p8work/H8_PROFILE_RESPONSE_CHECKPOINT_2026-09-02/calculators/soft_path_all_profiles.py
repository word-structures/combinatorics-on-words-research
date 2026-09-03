#!/usr/bin/env python3
from pathlib import Path
import numpy as np, json
ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/'data'
D=np.load(DATA/'H8_L7_LIFTED_GRAPH_CHECKPOINT.npz')
states=D['states']; giant=D['giant_global']; u=D['u']; v=D['v']; ep=D['edge_profile_id']; profiles=D['profiles']
N=len(giant); codes=states[giant]; f0=(codes%3==0).astype(float)-1/3

def calc(eps,pid):
    ew=np.exp(-eps*(ep==pid)); r=np.ones(N); l=np.ones(N)
    for it in range(3000):
        nr=np.bincount(u,weights=ew*r[v],minlength=N); nl=np.bincount(v,weights=ew*l[u],minlength=N)
        nr/=nr.max(); nl/=nl.max(); err=max(np.max(np.abs(nr-r)),np.max(np.abs(nl-l)));r,l=nr,nl
        if err<5e-14:break
    Ar=np.bincount(u,weights=ew*r[v],minlength=N); lam=float(np.dot(l,Ar)/np.dot(l,r));l/=np.dot(l,r);pi=l*r;pi/=pi.sum()
    trans=ew*r[v]/(lam*r[u])
    def Pmv(x):return np.bincount(u,weights=trans*x[v],minlength=N)
    f=f0-np.dot(pi,f0);x=np.zeros(N)
    for k in range(4000):
        nx=f+Pmv(x);nx-=np.dot(pi,nx);er=np.max(np.abs(nx-x));x=nx
        if er<4e-13:break
    a=2*float(np.dot(pi,f*x))-float(np.dot(pi,f*f))
    q=float(np.sum((l[u]*ew*r[v]/lam)[ep==pid]))
    return {'epsilon':eps,'lambda':lam,'a':a,'q_epsilon':q}

epss=[0,0.05,0.1,0.25,0.5,1,2,4,8]
out={'epsilon_grid':epss,'profiles':[]}
for pid,p in enumerate(profiles,1):
    arr=[calc(e,pid) for e in epss]
    a0=arr[0]['a']
    for z in arr:z['delta_a']=z['a']-a0
    # secant derivative signs between adjacent nodes
    seg=[]
    for x,y in zip(arr[:-1],arr[1:]):
        d=(y['a']-x['a'])/(y['epsilon']-x['epsilon'])
        seg.append({'from':x['epsilon'],'to':y['epsilon'],'secant_da_depsilon':d,'sign':int(np.sign(d))})
    rec={'profile':p.tolist(),'path':arr,'secants':seg}
    print(p.tolist(),[(z['epsilon'],z['delta_a']) for z in arr],flush=True)
    out['profiles'].append(rec)
(DATA/'H8_SOFT_PATH_ALL_PROFILES_REPLAY.json').write_text(json.dumps(out,indent=2))
