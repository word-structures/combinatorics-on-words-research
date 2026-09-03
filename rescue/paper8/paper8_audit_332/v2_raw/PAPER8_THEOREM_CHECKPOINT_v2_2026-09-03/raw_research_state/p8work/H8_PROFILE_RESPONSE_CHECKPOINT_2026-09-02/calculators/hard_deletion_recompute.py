#!/usr/bin/env python3
"""Recompute H8 hard-deletion responses from the stored lifted L7 graph checkpoint.
Independent outputs: Perron/Poisson-Green-Kubo and moment-growth DP.
"""
from pathlib import Path
import numpy as np, json, argparse
from scipy.sparse import csr_matrix
from scipy.sparse.csgraph import connected_components
ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/'data'
D=np.load(DATA/'H8_L7_LIFTED_GRAPH_CHECKPOINT.npz')
states_all=D['states']; giant_global=D['giant_global']; U0=D['u']; V0=D['v']; EP0=D['edge_profile_id']; profiles=D['profiles']
codes0=states_all[giant_global]

def largest_scc_subgraph(keep):
    u=U0[keep]; v=V0[keep]; n=len(codes0)
    A=csr_matrix((np.ones(len(u),dtype=np.int8),(u,v)),shape=(n,n))
    nscc,lab=connected_components(A,directed=True,connection='strong',return_labels=True)
    sizes=np.bincount(lab,minlength=nscc); gid=int(np.argmax(sizes)); nodes=np.flatnonzero(lab==gid)
    rem=np.full(n,-1,dtype=np.int32); rem[nodes]=np.arange(len(nodes),dtype=np.int32)
    m=(lab[u]==gid)&(lab[v]==gid)
    return codes0[nodes], rem[u[m]], rem[v[m]], dict(scc_count=int(nscc),dominant_states=int(len(nodes)),dominant_edges=int(m.sum()),second_scc=int(np.partition(sizes,-2)[-2]) if len(sizes)>1 else 0)

def calc(codes,u,v,tol=3e-14):
    N=len(codes)
    r=np.ones(N); l=np.ones(N)
    for it in range(10000):
        nr=np.bincount(u,weights=r[v],minlength=N); nl=np.bincount(v,weights=l[u],minlength=N)
        nr/=nr.max(); nl/=nl.max(); err=max(np.max(np.abs(nr-r)),np.max(np.abs(nl-l)))
        r,l=nr,nl
        if err<tol:break
    Ar=np.bincount(u,weights=r[v],minlength=N)
    lam=float(np.dot(l,Ar)/np.dot(l,r)); l/=np.dot(l,r); pi=l*r;pi/=pi.sum()
    trans=r[v]/(lam*r[u])
    def Pmv(x): return np.bincount(u,weights=trans*x[v],minlength=N)
    f=(codes%3==0).astype(float)-1/3
    f-=np.dot(pi,f)
    x=np.zeros(N)
    for k in range(20000):
        nx=f+Pmv(x); nx-=np.dot(pi,nx); er=np.max(np.abs(nx-x)); x=nx
        if er<2e-13:break
    a=2*float(np.dot(pi,f*x))-float(np.dot(pi,f*f))
    # independent moment growth DP on path counts, normalized every iteration
    c=np.ones(N); s=np.zeros(N); vv=np.zeros(N); prev=0.0; slopes=[]
    letter=(codes%3==0).astype(float)
    for nstep in range(1,2501):
        nc=np.bincount(v,weights=c[u],minlength=N)
        ns=np.bincount(v,weights=s[u]+letter[v]*c[u],minlength=N)
        nv=np.bincount(v,weights=vv[u]+2*letter[v]*s[u]+letter[v]*c[u],minlength=N)
        z=nc.sum(); c=nc/z; s=ns/z; vv=nv/z
        mean=s.sum(); second=vv.sum(); var=second-mean*mean
        slope=var-prev; prev=var
        if nstep>2400: slopes.append(slope)
    a_dp=float(np.mean(slopes[-50:]))
    return dict(lambda_=lam,a_green_kubo=a,a_moment_dp=a_dp,method_diff=abs(a-a_dp),pf_iterations=it,poisson_iterations=k)

def main():
    out={}
    # baseline
    codes,u,v,meta=largest_scc_subgraph(np.ones(len(U0),dtype=bool))
    base=calc(codes,u,v); out['baseline']={**meta,**base}
    a0=base['a_green_kubo']
    for pid,p in enumerate(profiles,1):
        keep=EP0!=pid; codes,u,v,meta=largest_scc_subgraph(keep); z=calc(codes,u,v)
        z['profile']=p.tolist(); z['delta']=z['a_green_kubo']-a0
        out[','.join(map(str,p.tolist()))]={**meta,**z}
        print(p.tolist(),out[','.join(map(str,p.tolist()))],flush=True)
    (DATA/'H8_HARD_DELETION_RECOMPUTED.json').write_text(json.dumps(out,indent=2))
if __name__=='__main__':main()
