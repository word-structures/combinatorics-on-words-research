import numpy as np, scipy.sparse as sp, json, sys, time
from collections import deque
PATH='/mnt/data/paper8_resume/unpacked/PAPER8_THEOREM_CHECKPOINT_v2_2026-09-03/raw_research_state/p8work/a_tilt_quotient_pid2.npz'
B=np.load(PATH); br=B['rows'].astype(np.int32);bc=B['cols'].astype(np.int32);tar=B['target'].astype(np.int64);mult=B['mult'].astype(np.longdouble);K=len(B['sizes'])
def setup(reverse):
 r,c=(bc,br) if reverse else (br,bc)
 A0=sp.csr_matrix((np.ones(np.sum(tar==0)),(r[tar==0],c[tar==0])),shape=(K,K))
 from scipy.sparse.csgraph import connected_components
 n,l=connected_components(A0,directed=True,connection='strong');ss=np.bincount(l,minlength=n);G=np.where(l==np.argmax(ss))[0]
 rev=[[] for _ in range(K)]
 for u,v,t in zip(r,c,tar):rev[int(v)].append((int(u),int(t)))
 INF=10**9;d=np.full(K,INF,dtype=np.int64);q=deque()
 for g in G:d[g]=0;q.append(int(g))
 while q:
  v=q.popleft()
  for u,w in rev[v]:
   z=d[v]+w
   if z<d[u]:d[u]=z;(q.appendleft(u) if w==0 else q.append(u))
 ex=tar+d[c]-d[r];assert ex.min()>=0
 return r,c,ex
SET={False:setup(False),True:setup(True)}
def mat(x,rev):
 r,c,e=SET[rev]; x=np.longdouble(x);w=mult*(x**e.astype(np.int64));return sp.csr_matrix((w,(r,c)),shape=(K,K),dtype=np.longdouble)
def pf(x,rev):
 A=mat(x,rev);r=np.ones(K,dtype=np.longdouble)
 for _ in range(5000):
  z=A@r;m=z.max();z/=m;err=np.max(np.abs(z-r));r=z
  if err<np.longdouble('1e-17'):break
 return r
def cert(a,b,rev,m=44,batch=128,pad=np.longdouble('1e-14')):
 a=np.longdouble(str(a));b=np.longdouble(str(b));r=pf((a+b)/2,rev);Aa=mat(a,rev);Ab=mat(b,rev)
 va=r.copy();vb=r.copy()
 for _ in range(m):va=Aa@va;vb=Ab@vb
 smin=(va/r).min()*(1-pad);smax=(vb/r).max()*(1+pad);kap=smax/smin;aq=np.longdouble(0);ap=np.longdouble(0)
 for st in range(0,K,batch):
  jj=np.arange(st,min(st+batch,K));X=np.zeros((K,len(jj)),dtype=np.longdouble);X[jj,np.arange(len(jj))]=1
  for _ in range(m):X=Aa@X
  X*=1-pad;nums=X*r[jj][None,:];ql=nums/(vb[:,None]*(1+pad));pl=nums/(smax*r[:,None]);aq+=np.min(ql,axis=0).sum(dtype=np.longdouble);ap+=np.min(pl,axis=0).sum(dtype=np.longdouble)
 aq*=1-pad;den=1-kap*(1-aq);R=kap*aq/den;alpha=ap/R*(1-pad)
 return {'a':float(a),'b':float(b),'reverse':rev,'alphaP_longdouble':float(alpha),'alphaQ':float(aq),'kappa':float(kap),'den':float(den)}
if __name__=='__main__':
 tests=[(0,0.004,False)]
 out=[]
 for t in tests:
  s=time.time();z=cert(*t);z['seconds']=time.time()-s;out.append(z);print(z,flush=True)
 json.dump({'dtype':str(np.dtype(np.longdouble)),'eps':float(np.finfo(np.longdouble).eps),'pad':1e-14,'records':out,'min_alpha':min(x['alphaP_longdouble'] for x in out),'theorem_alpha':0.89,'PASS':min(x['alphaP_longdouble'] for x in out)>0.89},open('/mnt/data/paper8_resume/theorem_422/LONGDOUBLE_SELECTED_INTERVAL_RECHECK.json','w'),indent=2)
