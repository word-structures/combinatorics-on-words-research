import numpy as np, json, math, sys, time
from pathlib import Path
BASE=Path('/mnt/data/H8_PROFILE_RESPONSE_CHECKPOINT_v3_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz')
D=np.load(BASE); states=D['states']; giant=D['giant_global']; u=D['u']; v=D['v']; ep=D['edge_profile_id']; profiles=D['profiles']; N=len(giant); codes=states[giant]
sym=(codes[v]%3).astype(np.int8)

def pf_original(pid,x,t,r0=None,l0=None,tol=2e-13,maxit=5000):
    wt=np.exp(t*(sym==0).astype(float)); wt=wt*np.where(ep==pid,x,1.0)
    r=np.ones(N) if r0 is None else r0.copy(); l=np.ones(N) if l0 is None else l0.copy()
    r/=r.max(); l/=l.max()
    for it in range(maxit):
        nr=np.bincount(u,weights=wt*r[v],minlength=N); nl=np.bincount(v,weights=wt*l[u],minlength=N)
        sr=nr.max(); sl=nl.max(); nr/=sr; nl/=sl
        err=max(np.max(np.abs(nr-r)),np.max(np.abs(nl-l)))
        r,l=nr,nl
        if err<tol: break
    Ar=np.bincount(u,weights=wt*r[v],minlength=N)
    lam=float(np.dot(l,Ar)/np.dot(l,r))
    return lam,r,l,it,err

def pf_quot(pid,x,t,r0=None,l0=None,tol=2e-13,maxit=5000):
    Q=np.load(f'/mnt/data/h8cp/quotient_pid{pid}.npz'); nxt=Q['nxt']; typ=Q['typ']; K=nxt.shape[0]
    # flatten valid deterministic labeled transitions
    cc,ss=np.where(nxt>=0); dd=nxt[cc,ss]; tt=typ[cc,ss]
    wt=np.exp(t*(ss==0).astype(float))*np.where(tt==1,x,1.0)
    r=np.ones(K) if r0 is None else r0.copy(); l=np.ones(K) if l0 is None else l0.copy(); r/=r.max(); l/=l.max()
    for it in range(maxit):
        nr=np.bincount(cc,weights=wt*r[dd],minlength=K); nl=np.bincount(dd,weights=wt*l[cc],minlength=K)
        nr/=nr.max(); nl/=nl.max(); err=max(np.max(np.abs(nr-r)),np.max(np.abs(nl-l))); r,l=nr,nl
        if err<tol: break
    Ar=np.bincount(cc,weights=wt*r[dd],minlength=K)
    lam=float(np.dot(l,Ar)/np.dot(l,r))
    return lam,r,l,it,err

xs=[1.0,0.5,0.01]
ts=[-0.05,0.0,0.05]
out={'points':[],'max_abs_lambda_diff':0.0,'max_rel_lambda_diff':0.0}
for pid,p in enumerate(profiles,1):
    print('PROFILE',p.tolist(),flush=True)
    for x in xs:
        ro=lo=rq=lq=None
        for t in ts:
            t0=time.time(); ao,ro,lo,io,eo=pf_original(pid,x,t,ro,lo); aq,rq,lq,iq,eq=pf_quot(pid,x,t,rq,lq)
            ad=abs(ao-aq); rd=ad/abs(ao)
            rec={'profile':p.tolist(),'pid':pid,'x':x,'t':t,'lambda_original':ao,'lambda_quotient':aq,'abs_diff':ad,'rel_diff':rd,'iters_original':io,'iters_quotient':iq,'resid_original':eo,'resid_quotient':eq}
            out['points'].append(rec); out['max_abs_lambda_diff']=max(out['max_abs_lambda_diff'],ad); out['max_rel_lambda_diff']=max(out['max_rel_lambda_diff'],rd)
            print(x,t,ao,aq,'diff',ad,'sec',time.time()-t0,flush=True)
# pressure-curvature finite difference at h=1e-3 from the audited lambdas, grouped
by={}
for r in out['points']:
    by[(r['pid'],r['x'],r['t'])]=r
# separate high-accuracy curvature at t +/- 1e-3 for x=1,.1,.01, quotient and original
out['curvature_points']=[]; maxcd=0
for pid,p in enumerate(profiles,1):
  for x in [1.0,0.1,0.01]:
    vals={}
    for t in [-1e-3,0.0,1e-3]:
      ao,_,_,_,_=pf_original(pid,x,t,tol=5e-14); aq,_,_,_,_=pf_quot(pid,x,t,tol=5e-14)
      vals[t]=(ao,aq)
    h=1e-3
    co=(math.log(vals[h][0])-2*math.log(vals[0.0][0])+math.log(vals[-h][0]))/h**2
    cq=(math.log(vals[h][1])-2*math.log(vals[0.0][1])+math.log(vals[-h][1]))/h**2
    d=abs(co-cq); maxcd=max(maxcd,d)
    out['curvature_points'].append({'profile':p.tolist(),'pid':pid,'x':x,'curvature_original':co,'curvature_quotient':cq,'abs_diff':d})
    print('CURV',p.tolist(),x,co,cq,d,flush=True)
out['max_abs_curvature_diff']=maxcd
Path('/mnt/data/h8cp/quotient_equivalence_audit.json').write_text(json.dumps(out,indent=2))
print('MAX',out['max_abs_lambda_diff'],out['max_abs_curvature_diff'])
