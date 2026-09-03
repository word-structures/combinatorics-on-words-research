import numpy as np, scipy.sparse as sp, json, math, time
from collections import deque
from scipy.sparse.csgraph import connected_components
NPZ='/mnt/data/PAPER8_BURN_REPAIR/v2raw/PAPER8_THEOREM_CHECKPOINT_v2_2026-09-03/raw_research_state/p8work/a_tilt_quotient_pid1.npz'
COVER='/mnt/data/PAPER8_BURN_REPAIR/PAPER8_THEOREM_CHECKPOINT_v4_2026-09-03/theorem_332/data/FIXED_BIDIRECTIONAL_COVER.json'
Z=np.load(NPZ); br=Z['rows'].astype(np.int32);bc=Z['cols'].astype(np.int32);tar=Z['target'].astype(int);mult=Z['mult'].astype(float);sizes=Z['sizes'].astype(float);K=len(sizes)
def setup(reverse=False):
 rr,cc=(bc,br) if reverse else (br,bc)
 A0=sp.csr_matrix((np.ones((tar==0).sum()),(rr[tar==0],cc[tar==0])),shape=(K,K));n,lab=connected_components(A0,directed=True,connection='strong');G=(lab==np.argmax(np.bincount(lab)))
 rev=[[] for _ in range(K)]
 for u,v,t in zip(rr,cc,tar):rev[v].append((int(u),int(t)))
 d=np.full(K,999,dtype=int);q=deque(np.where(G)[0].tolist());d[G]=0
 while q:
  v=q.popleft()
  for u,w in rev[v]:
   nd=d[v]+w
   if nd<d[u]: d[u]=nd;(q.appendleft(u) if w==0 else q.append(u))
 exp=tar+d[cc]-d[rr]
 if exp.min()<0:raise RuntimeError('neg exp')
 z0=(sizes*G) if reverse else G.astype(float)
 return rr,cc,exp,z0,G
SET={False:setup(False),True:setup(True)}
def matrix(x,reverse):
 rr,cc,e,_,_=SET[reverse]; return sp.csr_matrix((mult*np.power(float(x),e),(rr,cc)),shape=(K,K))
def pfvec(x,reverse):
 M=matrix(x,reverse);r=np.ones(K)
 for _ in range(3000):
  nr=M@r; mx=nr.max(); nr/=mx
  if np.max(np.abs(nr-r))<2e-14:return nr
  r=nr
 return r
def prop(x,reverse,burn=88):
 M=matrix(x,reverse);z=SET[reverse][3].copy()
 for _ in range(burn):z=M@z
 return z
cover=json.load(open(COVER)); recs=cover['records']; out=[]; worst=0
for idx,rec in enumerate(recs):
 a,b=float(rec['a']),float(rec['b']); rev=bool(rec['reverse']); mid=(a+b)/2
 r=pfvec(mid,rev);za=prop(a,rev);zb=prop(b,rev)
 lo=np.min(za/r); hi=np.max(zb/r)
 rho=float(rec['R'])*hi/lo*(1+5e-10)
 out.append({'i':rec['i'],'a':a,'b':b,'reverse':rev,'R_pf':rec['R'],'boundary_rho_upper':rho,'lo_surrogate':lo,'hi_surrogate':hi})
 worst=max(worst,rho)
 if idx<6 or idx%100==0: print(idx,rev,a,b,'rho-1',rho-1,flush=True)
# pair by interval index
by={}
for q in out: by.setdefault(q['i'],{})[q['reverse']]=q
pairs=[];worst_pair=None
for i,d in sorted(by.items()):
 if len(d)!=2: raise RuntimeError(('missing',i,d.keys()))
 rho=d[False]['boundary_rho_upper']*d[True]['boundary_rho_upper']
 tv=(math.sqrt(rho)-1)/(math.sqrt(rho)+1)
 p={'i':i,'a':d[False]['a'],'b':d[False]['b'],'rho_total_upper':rho,'tv_upper':tv}
 pairs.append(p)
 if worst_pair is None or tv>worst_pair['tv_upper']:worst_pair=p
M2=329476/9
burnerr=2*M2*worst_pair['tv_upper']
res={'burn_steps':88,'block_length':44,'blocks':2,'interval_count':len(pairs),'records':out,'pairs':pairs,'worst_pair':worst_pair,'M2':M2,'burn_error_upper':burnerr,'round_padding_note':'uses stored projective R + 5e-10 outward multiplier; independent directed-rounding audit pending'}
json.dump(res,open('/mnt/data/PAPER8_BURN_REPAIR/BOUNDARY_PROJECTIVE_332_BURN2.json','w'),indent=2)
print('WORST',worst_pair,'burnerr',burnerr)
