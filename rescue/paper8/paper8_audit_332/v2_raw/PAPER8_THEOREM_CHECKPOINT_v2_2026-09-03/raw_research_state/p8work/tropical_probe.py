import numpy as np, scipy.sparse as sp
from collections import deque
Q=np.load('/mnt/data/p8work/a_tilt_quotient_pid4.npz')
rr=Q['rows']; cc=Q['cols']; tar=Q['target'].astype(int); mult=Q['mult'].astype(float); K=len(Q['sizes'])
# hard graph target cost 0/1, minimum target count to reach largest zero-edge SCC
# SCC of normal-only graph
A0=sp.csr_matrix((np.ones(np.sum(tar==0)),(rr[tar==0],cc[tar==0])),shape=(K,K))
from scipy.sparse.csgraph import connected_components
ncomp, labels=connected_components(A0,directed=True,connection='strong')
sizes=np.bincount(labels,minlength=ncomp); giant=int(np.argmax(sizes)); G=np.where(labels==giant)[0]
print('K',K,'giant',len(G),'ncomp',ncomp)
# reverse 0-1 BFS from giant. Edge i->j cost tar, reverse traversal j -> i same cost
rev=[[] for _ in range(K)]
for u,v,t in zip(rr,cc,tar):rev[v].append((u,int(t)))
INF=10**9; d=np.full(K,INF,dtype=int); dq=deque()
for g in G:d[g]=0;dq.append(g)
while dq:
 v=dq.popleft(); dv=d[v]
 for u,w in rev[v]:
  nd=dv+w
  if nd<d[u]:
   d[u]=nd
   (dq.appendleft if w==0 else dq.append)(u)
print('d counts', {int(x):int(np.sum(d==x)) for x in np.unique(d)})
exp=tar+d[cc]-d[rr]
print('exp counts', {int(x):int(np.sum(exp==x)) for x in np.unique(exp)}, 'minmax',exp.min(),exp.max())
# build scaled adjacency at x
def pf(x):
 w=mult*(x**exp)
 r=np.ones(K)
 for it in range(20000):
  nr=np.bincount(rr,weights=w*r[cc],minlength=K)
  mx=nr.max(); nr/=mx
  er=np.max(np.abs(nr-r));r=nr
  if er<1e-14:break
 Ar=np.bincount(rr,weights=w*r[cc],minlength=K)
 s=Ar/r; lam=(s.min()+s.max())/2
 return r,lam,float(s.min()),float(s.max()),it,er
for x in [0,1e-6,1e-3,.1,.5,1]:
 r,lam,lo,hi,it,er=pf(x);print('x',x,'lam',lam,'spread',hi/lo-1,'rmin',r.min(),'rmax',r.max(),'it',it)
# hard fixed vector lower alpha using Atilde(0)^50 and hard r, lambda(1)
r0,lam0,*_=pf(0); r1,lam1,*_=pf(1)
w0=mult*(exp==0)
M=sp.csr_matrix((w0,(rr,cc)),shape=(K,K))
# compute P0 exactly via r0 lam0 and alpha as check
p0=w0*r0[cc]/(lam0*r0[rr]);P0=sp.csr_matrix((p0,(rr,cc)),shape=(K,K))
def alpha(P,m=50,batch=100):
 a=0
 for st in range(0,K,batch):
  jj=np.arange(st,min(st+batch,K));X=np.zeros((K,len(jj)));X[jj,np.arange(len(jj))]=1
  for _ in range(m):X=P@X
  a+=X.min(axis=0).sum()
 return a
print('alpha hard',alpha(P0))
# common path lower with hard vector and lambda1, using similarity-style lower transition not stochastic
# L_ij = A0^50_ij*r0_j/(lam1^50*r0_i). compute columns batches via recurrence on Doob-like R=A0*r0j/(lam1 r0i)
R=sp.csr_matrix((w0*r0[cc]/(lam1*r0[rr]),(rr,cc)),shape=(K,K))
print('rowsum R minmax',np.asarray(R.sum(1)).ravel().min(),np.asarray(R.sum(1)).ravel().max())
print('alpha common r0 lam1',alpha(R))
# edgewise ratio actual P_x / R on exp0 edges
mask=exp==0
for x in [1e-6,.001,.01,.1,.5,1]:
 rx,lx,*_=pf(x)
 ratio=(rx[cc[mask]]/(lx*rx[rr[mask]]))/(r0[cc[mask]]/(lam1*r0[rr[mask]]))
 print('edge ratio x',x,'min',ratio.min(),'p001',np.quantile(ratio,.001),'max',ratio.max())
