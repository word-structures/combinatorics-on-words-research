import numpy as np, sys, itertools, json
D=np.load('/mnt/data/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');states=D['states'];giant=D['giant_global'];u=D['u'];v=D['v'];ep=D['edge_profile_id'];profiles=D['profiles'];N=len(giant);codes=states[giant]; letter=(codes[v]%3==0).astype(float)
pid=int(sys.argv[1]);x=float(sys.argv[2]);dt=2e-4;targ=(ep==pid)
def pf(t):
 wt=np.ones(len(u));wt[targ]=x;wt*=np.exp(t*letter);r=np.ones(N);l=np.ones(N)
 for it in range(3000):
  nr=np.bincount(u,weights=wt*r[v],minlength=N);nl=np.bincount(v,weights=wt*l[u],minlength=N);nr/=nr.max();nl/=nl.max();err=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
  if err<2e-13:break
 Ar=np.bincount(u,weights=wt*r[v],minlength=N);lam=np.dot(l,Ar)/np.dot(l,r);l/=np.dot(l,r);me=l[u]*wt*r[v]/lam;me/=me.sum();return me
m0=pf(0);mp=pf(dt);mm=pf(-dt);idx=np.flatnonzero(targ & (m0>0));curv=(mp[idx]-2*m0[idx]+mm[idx])/(dt*dt*m0[idx]);mass=m0[idx]
def decode(code,n=15):
 w=[0]*n
 for k in range(n-1,-1,-1):w[k]=int(code%3);code//=3
 return w
perms=list(itertools.permutations([0,1,2]))
def canon(w):return min(tuple(p[a] for a in w) for p in perms)
groups={}
for pos,e in enumerate(idx):
 w=decode(int(codes[u[e]]));w.append(int(codes[v[e]]%3));k=canon(w);g=groups.setdefault(k,[0.,0.,[]]);g[0]+=mass[pos]*curv[pos];g[1]+=mass[pos];g[2].append(float(curv[pos]))
rows=[]
for k,(sc,sm,cs) in groups.items():rows.append((sc/sm,sm,k,min(cs),max(cs)))
rows.sort()
for z in rows[:10]:
 print('avg',z[0],'mass',z[1],'word',''.join(map(str,z[2])),'indminmax',z[3],z[4])
