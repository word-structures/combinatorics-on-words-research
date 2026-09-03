import numpy as np, scipy.sparse as sp
from collections import deque
PATH='/mnt/data/p8_rebuild/PAPER8_THEOREM_CHECKPOINT_v2_2026-09-03/raw_research_state/p8work/a_tilt_quotient_pid1.npz'
BASE=np.load(PATH)
base_rr=BASE['rows'].astype(np.int32);base_cc=BASE['cols'].astype(np.int32);tar=BASE['target'].astype(int);mult=BASE['mult'].astype(float);K=len(BASE['sizes'])
def setup(reverse=False):
 rr,cc=(base_cc,base_rr) if reverse else (base_rr,base_cc)
 A0n=sp.csr_matrix((np.ones(np.sum(tar==0)),(rr[tar==0],cc[tar==0])),shape=(K,K))
 from scipy.sparse.csgraph import connected_components
 ncomp,labels=connected_components(A0n,directed=True,connection='strong');sizes=np.bincount(labels,minlength=ncomp);giant=np.argmax(sizes);G=np.where(labels==giant)[0]
 rev=[[] for _ in range(K)]
 for u,v,t in zip(rr,cc,tar):rev[v].append((int(u),int(t)))
 INF=999;d=np.full(K,INF,dtype=int);dq=deque()
 for g in G:d[g]=0;dq.append(int(g))
 while dq:
  v=dq.popleft()
  for u,w in rev[v]:
   nd=d[v]+w
   if nd<d[u]:d[u]=nd;(dq.appendleft(u) if w==0 else dq.append(u))
 exp=tar+d[cc]-d[rr]
 if exp.min()<0:raise RuntimeError(('negative exp',reverse,exp.min()))
 return rr,cc,exp
SET={False:setup(False),True:setup(True)}
def matrix(x,reverse=False):
 rr,cc,exp=SET[reverse];w=mult*np.power(float(x), exp, dtype=float)
 return sp.csr_matrix((w,(rr,cc)),shape=(K,K))
def pfvec(x,reverse=False):
 M=matrix(x,reverse);r=np.ones(K)
 for _ in range(2000):
  nr=M@r;mx=nr.max()
  if mx==0: raise RuntimeError('zero')
  nr/=mx;er=np.max(np.abs(nr-r));r=nr
  if er<2e-14:break
 return r
def certify(a,b,m=44,batch=256,reverse=False,round_pad=2e-10):
 mid=(a+b)/2;r=pfvec(mid,reverse);Aa=matrix(a,reverse);Ab=matrix(b,reverse)
 va=r.copy();vb=r.copy()
 for _ in range(m):va=Aa@va;vb=Ab@vb
 sa=va/r;sb=vb/r;smin=float(sa.min())*(1-round_pad);smax=float(sb.max())*(1+round_pad);kappa=smax/smin
 alphaQ=0.;alphaPraw=0.
 for st in range(0,K,batch):
  jj=np.arange(st,min(st+batch,K));X=np.zeros((K,len(jj)));X[jj,np.arange(len(jj))]=1.
  for _ in range(m):X=Aa@X
  X*=1-round_pad;nums=X*r[jj][None,:]
  qlow=nums/(vb[:,None]*(1+round_pad));plow=nums/(smax*r[:,None])
  alphaQ+=float(np.min(qlow,axis=0).sum());alphaPraw+=float(np.min(plow,axis=0).sum())
 alphaQ=max(0,alphaQ)*(1-round_pad);den=1-kappa*(1-alphaQ)
 if den<=0:R=float('inf');alphaP=0.
 else:R=kappa*alphaQ/den;alphaP=alphaPraw/R*(1-round_pad)
 return dict(a=a,b=b,reverse=reverse,alphaP_lower=alphaP,alphaQ_lower=alphaQ,kappa=kappa,R=R,den=den,smin=smin,smax=smax)
