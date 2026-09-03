import numpy as np, scipy.sparse as sp, json, sys, multiprocessing as mp, time
from collections import deque
PATH='/mnt/data/paper8_resume/unpacked/PAPER8_THEOREM_CHECKPOINT_v2_2026-09-03/raw_research_state/p8work/a_tilt_quotient_pid2.npz'
BASE=np.load(PATH); base_rr=BASE['rows'].astype(np.int32);base_cc=BASE['cols'].astype(np.int32);tar=BASE['target'].astype(int);mult=BASE['mult'].astype(float);K=len(BASE['sizes'])
def setup(reverse=False):
 rr,cc=(base_cc,base_rr) if reverse else (base_rr,base_cc)
 A0n=sp.csr_matrix((np.ones(np.sum(tar==0)),(rr[tar==0],cc[tar==0])),shape=(K,K))
 from scipy.sparse.csgraph import connected_components
 ncomp,labels=connected_components(A0n,directed=True,connection='strong');sizes=np.bincount(labels,minlength=ncomp);G=np.where(labels==np.argmax(sizes))[0]
 rev=[[] for _ in range(K)]
 for u,v,t in zip(rr,cc,tar):rev[v].append((int(u),int(t)))
 INF=999;d=np.full(K,INF,dtype=int);dq=deque()
 for g in G:d[g]=0;dq.append(int(g))
 while dq:
  v=dq.popleft()
  for u,w in rev[v]:
   nd=d[v]+w
   if nd<d[u]:
    d[u]=nd
    if w==0:dq.appendleft(u)
    else:dq.append(u)
 exp=tar+d[cc]-d[rr]
 if exp.min()<0:raise RuntimeError(('negative exponent',reverse,int(exp.min())))
 return rr,cc,exp
SET={False:setup(False),True:setup(True)}
def matrix(x,reverse=False):
 rr,cc,exp=SET[reverse]; w=mult*np.power(float(x),exp,dtype=float); return sp.csr_matrix((w,(rr,cc)),shape=(K,K))
def pfvec(x,reverse=False):
 M=matrix(x,reverse);r=np.ones(K)
 for _ in range(3000):
  nr=M@r;mx=nr.max();
  if mx==0:raise RuntimeError('zero')
  nr/=mx; er=np.max(np.abs(nr-r));r=nr
  if er<2e-14:break
 return r
def certify(a,b,m=44,batch=64,reverse=False,round_pad=2e-10):
 mid=(a+b)/2;r=pfvec(mid,reverse);Aa=matrix(a,reverse);Ab=matrix(b,reverse);va=r.copy();vb=r.copy()
 for _ in range(m):va=Aa@va;vb=Ab@vb
 sa=va/r;sb=vb/r;smin=float(sa.min())*(1-round_pad);smax=float(sb.max())*(1+round_pad);kappa=smax/smin;alphaQ=0.;alphaPraw=0.
 for st in range(0,K,batch):
  jj=np.arange(st,min(st+batch,K));X=np.zeros((K,len(jj)));X[jj,np.arange(len(jj))]=1.
  for _ in range(m):X=Aa@X
  X*=1-round_pad;nums=X*r[jj][None,:];qlow=nums/(vb[:,None]*(1+round_pad));plow=nums/(smax*r[:,None]);alphaQ+=float(np.min(qlow,axis=0).sum());alphaPraw+=float(np.min(plow,axis=0).sum())
 alphaQ=max(0,alphaQ)*(1-round_pad);den=1-kappa*(1-alphaQ)
 if den<=0:R=float('inf');alphaP=0.
 else:R=kappa*alphaQ/den;alphaP=alphaPraw/R*(1-round_pad)
 return {'a':a,'b':b,'reverse':reverse,'alphaP_lower':alphaP,'alphaQ_lower':alphaQ,'kappa':kappa,'R':R,'den':den,'smin':smin,'smax':smax}
def task(t):
 a,b,rev=t; r=certify(a,b,reverse=rev); return r

def seg(a,b,w):
 out=[];x=a
 while x < b-1e-14:
  y=min(b,x+w);out.append((round(x,12),round(y,12)));x=y
 return out
intervals=seg(0,.08,.004)+seg(.08,.2,.007)+seg(.2,.3,.011)+seg(.3,.5,.012)+seg(.5,1,.02)
assert abs(intervals[0][0])<1e-15 and abs(intervals[-1][1]-1)<1e-15
for i in range(len(intervals)-1):assert abs(intervals[i][1]-intervals[i+1][0])<1e-12
if __name__=='__main__':
 part=int(sys.argv[1]); parts=int(sys.argv[2]); outp=sys.argv[3]; chunk=intervals[part::parts]; tasks=[(a,b,r) for a,b in chunk for r in (False,True)];t0=time.time()
 ctx=mp.get_context('fork')
 with ctx.Pool(processes=5) as pool: rec=list(pool.imap_unordered(task,tasks,chunksize=1))
 rec.sort(key=lambda z:(z['a'],z['reverse']))
 out={'profile':[4,2,2],'m':44,'round_pad':2e-10,'part':part,'parts':parts,'interval_count_total':len(intervals),'interval_count_part':len(chunk),'records':rec,'min_alphaP':min(z['alphaP_lower'] for z in rec),'seconds':time.time()-t0}
 json.dump(out,open(outp,'w'),indent=2); print(json.dumps({k:v for k,v in out.items() if k!='records'},indent=2),flush=True)
