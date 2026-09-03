import numpy as np, scipy.sparse as sp, sys, math, json, time
from collections import deque
Q=np.load('/mnt/data/p8work/a_tilt_quotient_pid4.npz')
rr=Q['rows']; cc=Q['cols']; tar=Q['target'].astype(int); mult=Q['mult'].astype(float); K=len(Q['sizes'])
# tropical exponents using normal-only SCC + min target cost to dominant SCC
A0n=sp.csr_matrix((np.ones(np.sum(tar==0)),(rr[tar==0],cc[tar==0])),shape=(K,K))
from scipy.sparse.csgraph import connected_components
ncomp, labels=connected_components(A0n,directed=True,connection='strong'); sizes=np.bincount(labels,minlength=ncomp); giant=np.argmax(sizes); G=np.where(labels==giant)[0]
rev=[[] for _ in range(K)]
for u,v,t in zip(rr,cc,tar):rev[v].append((int(u),int(t)))
INF=999; d=np.full(K,INF,dtype=int); dq=deque()
for g in G:d[g]=0;dq.append(int(g))
while dq:
 v=dq.popleft()
 for u,w in rev[v]:
  nd=d[v]+w
  if nd<d[u]:d[u]=nd;(dq.appendleft(u) if w==0 else dq.append(u))
exp=tar+d[cc]-d[rr]
assert exp.min()>=0 and exp.max()<=2

def A(x):
 w=mult*np.where(exp==0,1.0,np.where(exp==1,x,x*x))
 return sp.csr_matrix((w,(rr,cc)),shape=(K,K))

def pfvec(x):
 M=A(x);r=np.ones(K)
 for it in range(1000):
  nr=M@r;nr/=nr.max();er=np.max(np.abs(nr-r));r=nr
  if er<2e-14:break
 return r

def applypow(M,X,m):
 for _ in range(m):X=M@X
 return X

def certify(a,b,m=36,batch=64,round_pad=2e-10, verbose=False):
 mid=(a+b)/2;r=pfvec(mid);Aa=A(a);Ab=A(b)
 va=r.copy();vb=r.copy()
 for _ in range(m):va=Aa@va;vb=Ab@vb
 sa=va/r;sb=vb/r
 # outward safety: min lower, max upper
 smin=float(sa.min())*(1-round_pad);smax=float(sb.max())*(1+round_pad)
 kappa=smax/smin
 alphaQ=0.0; alphaPraw=0.0
 # q lower denominator vb_i; p lower denominator global smax*r_i
 for st in range(0,K,batch):
  jj=np.arange(st,min(st+batch,K));X=np.zeros((K,len(jj)));X[jj,np.arange(len(jj))]=1.0
  X=applypow(Aa,X,m)
  # shrink all computed nonnegative entries safely
  X*= (1-round_pad)
  nums=X*r[jj][None,:]
  qlow=nums/(vb[:,None]*(1+round_pad))
  plow=nums/(smax*r[:,None])
  alphaQ += float(np.min(qlow,axis=0).sum())
  alphaPraw += float(np.min(plow,axis=0).sum())
 alphaQ=max(0.0,alphaQ)*(1-round_pad)
 denom=1-kappa*(1-alphaQ)
 if denom<=0:
  R=float('inf');alphaP=0
 else:
  R=kappa*alphaQ/denom
  alphaP=alphaPraw/R*(1-round_pad)
 out=dict(a=a,b=b,mid=mid,m=m,kappa=kappa,alphaQ_lower=alphaQ,R_projective_upper=R,alphaP_lower=alphaP,smin=smin,smax=smax,denom=denom)
 if verbose:print(json.dumps(out,indent=2))
 return out

if __name__=='__main__':
 for a,b in [(0,.05),(0,.01),(0,.005),(0,.002),(0,.001),(.5,.55),(.9,.95),(.99,1)]:
  t=time.time();o=certify(a,b);print(a,b,'alphaP',o['alphaP_lower'],'aQ',o['alphaQ_lower'],'k',o['kappa'],'R',o['R_projective_upper'],'sec',time.time()-t)
