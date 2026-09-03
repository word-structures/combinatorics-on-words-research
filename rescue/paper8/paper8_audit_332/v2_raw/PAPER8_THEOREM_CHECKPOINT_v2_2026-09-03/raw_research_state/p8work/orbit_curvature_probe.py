import numpy as np, sys, itertools, json
D=np.load('/mnt/data/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');states=D['states'];giant=D['giant_global'];u=D['u'];v=D['v'];ep=D['edge_profile_id'];profiles=D['profiles'];N=len(giant);codes=states[giant]; letter=(codes[v]%3==0).astype(float)
pid=int(sys.argv[1]);x=float(sys.argv[2]);dt=2e-4;targ=(ep==pid)
def pf(t):
 wt=np.ones(len(u));wt[targ]=x;wt*=np.exp(t*letter)
 r=np.ones(N);l=np.ones(N)
 for it in range(3000):
  nr=np.bincount(u,weights=wt*r[v],minlength=N);nl=np.bincount(v,weights=wt*l[u],minlength=N);nr/=nr.max();nl/=nl.max();err=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
  if err<2e-13:break
 Ar=np.bincount(u,weights=wt*r[v],minlength=N);lam=np.dot(l,Ar)/np.dot(l,r);l/=np.dot(l,r);me=l[u]*wt*r[v]/lam;me/=me.sum();return me
m0=pf(0);mp=pf(dt);mm=pf(-dt);idx=np.flatnonzero(targ & (m0>0));curv=(mp[idx]-2*m0[idx]+mm[idx])/(dt*dt*m0[idx]);mass=m0[idx]
# decode source state length15 + appended target last symbol
def decode(code,n=15):
 w=[0]*n
 for k in range(n-1,-1,-1):w[k]=int(code%3);code//=3
 return w
perms=list(itertools.permutations([0,1,2]))
def canon(w):
 cs=[]
 for p in perms:
  z=tuple(p[a] for a in w);cs.append(z)
 return min(cs)
groups={}
for pos,e in enumerate(idx):
 w=decode(int(codes[u[e]]));w.append(int(codes[v[e]]%3));k=canon(w);g=groups.setdefault(k,[0.0,0.0,0]);g[0]+=mass[pos]*curv[pos];g[1]+=mass[pos];g[2]+=1
av=np.array([a/b for a,b,n in groups.values()]); gm=np.array([b for a,b,n in groups.values()]); sizes=np.array([n for a,b,n in groups.values()])
out={'profile':profiles[pid-1].tolist(),'x':x,'n_edges':len(idx),'n_orbits':len(groups),'orbit_sizes':{str(int(k)):int(v) for k,v in zip(*np.unique(sizes,return_counts=True))},'orbit_avg_min':float(av.min()),'orbit_avg_max':float(av.max()),'orbit_avg_q10':float(np.quantile(av,.1)),'orbit_avg_median':float(np.median(av)),'orbit_avg_q90':float(np.quantile(av,.9)),'frac_orbits_positive':float(np.mean(av>0)),'frac_orbits_negative':float(np.mean(av<0)),'mass_fraction_positive_orbits':float(gm[av>0].sum()/gm.sum()),'mass_fraction_negative_orbits':float(gm[av<0].sum()/gm.sum()),'weighted_orbit_average':float(np.dot(gm,av)/gm.sum())}
print(json.dumps(out,indent=2))
open(f'/mnt/data/h8cp/orbitcurv_pid{pid}_x{x}.json','w').write(json.dumps(out,indent=2))
