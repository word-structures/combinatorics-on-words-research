import numpy as np, sys, json, math
D=np.load('/mnt/data/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');states=D['states'];giant=D['giant_global'];u=D['u'];v=D['v'];ep=D['edge_profile_id'];profiles=D['profiles'];N=len(giant);codes=states[giant];letter=(codes[v]%3==0).astype(float)
pid=int(sys.argv[1]);targ=(ep==pid);keep=~targ
# A0(t) has non-target edges with exp(t letter); B(t) has target edges with exp(t letter)
def qcoef(t):
 ew=np.exp(t*letter); wk=ew*keep
 r=np.ones(N);l=np.ones(N)
 for it in range(5000):
  nr=np.bincount(u,weights=wk*r[v],minlength=N);nl=np.bincount(v,weights=wk*l[u],minlength=N)
  mr=nr.max();ml=nl.max()
  if mr==0 or ml==0:raise RuntimeError('zero')
  nr/=mr;nl/=ml;err=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
  if err<1e-14:break
 Ar=np.bincount(u,weights=wk*r[v],minlength=N);lam=np.dot(l,Ar)/np.dot(l,r)
 # derivative matrix B_t target edges
 num=np.dot(l[u[targ]], ew[targ]*r[v[targ]])
 den=lam*np.dot(l,r)
 return float(num/den),float(lam),it,float(err)
# 5-point stencil on log qcoef, use several h
out={'profile':profiles[pid-1].tolist(),'steps':[]}
for h in [2e-3,1e-3,5e-4,2.5e-4,1.25e-4]:
 vals={k:qcoef(k*h) for k in [-2,-1,0,1,2]};y={k:math.log(vals[k][0]) for k in vals}
 sec=(-y[2]+16*y[1]-30*y[0]+16*y[-1]-y[-2])/(12*h*h)
 first=(y[-2]-8*y[-1]+8*y[1]-y[2])/(12*h)
 out['steps'].append({'h':h,'C0_5pt':sec,'first_5pt':first,'q0':vals[0][0],'lambda0':vals[0][1],'pf_it':vals[0][2],'pf_err':vals[0][3]})
 print(out['profile'],h,sec,first,vals[0],flush=True)
open(f'/mnt/data/h8cp/hard_endpoint_curvature_pid{pid}.json','w').write(json.dumps(out,indent=2))
