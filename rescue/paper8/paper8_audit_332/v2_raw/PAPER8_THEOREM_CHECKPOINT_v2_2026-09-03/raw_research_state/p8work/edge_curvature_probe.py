import numpy as np, sys, json, time
D=np.load('/mnt/data/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');states=D['states'];giant=D['giant_global'];u=D['u'];v=D['v'];ep=D['edge_profile_id'];profiles=D['profiles'];N=len(giant);codes=states[giant]; letter=(codes[v]%3==0).astype(float)
pid=int(sys.argv[1]);x=float(sys.argv[2]);dt=float(sys.argv[3]) if len(sys.argv)>3 else 2e-4;targ=(ep==pid)
def pf(t):
 wt=np.ones(len(u));wt[targ]=x;wt*=np.exp(t*letter)
 r=np.ones(N);l=np.ones(N)
 for it in range(3000):
  nr=np.bincount(u,weights=wt*r[v],minlength=N);nl=np.bincount(v,weights=wt*l[u],minlength=N);nr/=nr.max();nl/=nl.max();err=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
  if err<2e-13:break
 Ar=np.bincount(u,weights=wt*r[v],minlength=N);lam=np.dot(l,Ar)/np.dot(l,r);dot=np.dot(l,r);l/=dot
 # stationary edge mass
 me=l[u]*wt*r[v]/lam
 me/=me.sum()
 return me,lam
m0,l0=pf(0);mp,lp=pf(dt);mm,lm=pf(-dt)
idx=np.flatnonzero(targ & (m0>0))
c=(mp[idx]-2*m0[idx]+mm[idx])/(dt*dt*m0[idx])
score=(mp[idx]-mm[idx])/(2*dt*m0[idx])
q0=m0[idx].sum();qpp=((mp[idx].sum()-2*q0+mm[idx].sum())/dt**2);avg=(m0[idx]*c).sum()/q0
out=dict(profile=profiles[pid-1].tolist(),x=x,dt=dt,n_edges=int(len(idx)),q=float(q0),qpp=float(qpp),qpp_over_q=float(qpp/q0),weighted_curv_avg=float(avg),curv_min=float(c.min()),curv_max=float(c.max()),curv_q01=float(np.quantile(c,.01)),curv_q10=float(np.quantile(c,.1)),curv_median=float(np.median(c)),curv_q90=float(np.quantile(c,.9)),curv_q99=float(np.quantile(c,.99)),frac_positive=float(np.mean(c>0)),frac_negative=float(np.mean(c<0)),score_min=float(score.min()),score_max=float(score.max()))
print(json.dumps(out,indent=2))
