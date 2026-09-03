from pathlib import Path
from collections import defaultdict
import json, importlib.util, numpy as np, sys
from scipy.sparse import csr_matrix
H=Path('/mnt/data'); p=int(sys.argv[1]) if len(sys.argv)>1 else 65521
D=json.load(open(H/'P6_Q2_EQUITABLE_QUOTIENT_SPARSE_v0.1_2026-08-30.json'));rows=D['rows'];N=len(rows)
O=json.load(open(H/'P6_Q2_TWISTED_RESPONSE_ORBITS_FULL_v0.1_2026-08-30.json'));reps=O['representatives']
spec=importlib.util.spec_from_file_location('fb',H/'p6_affine_fast_builder.py');fb=importlib.util.module_from_spec(spec);spec.loader.exec_module(fb);p6=fb.p6
rr=[];cc=[];dd=[]
for i,row in enumerate(rows):
 for j,w in row:rr.append(i);cc.append(j);dd.append(w)
Q=csr_matrix((np.array(dd,dtype=np.int64),(rr,cc)),shape=(N,N),dtype=np.int64)
def labs(s,k):
 r=len(s)%4;bs=[s[i:i+4] for i in range(r,len(s),4) if len(s[i:i+4])==4]
 ps=[p6.parikh(b) for b in bs[-k:]]
 while len(ps)<k:ps.insert(0,None)
 return tuple(ps)
gid={};M={}
for k in range(1,5):
 mp={};ids=[]
 for s in reps:
  x=labs(s,k)
  if x not in mp:mp[x]=len(mp)
  ids.append(mp[x])
 gid[k]=np.array(ids,dtype=np.int32);M[k]=len(mp)
 print('k',k,'groups',M[k])
As={k:np.empty((M[k],1179),dtype=np.uint16) for k in range(1,5)}
v=np.ones(N,dtype=np.int64)
for n in range(1179):
 for k in range(1,5):As[k][:,n]=(np.bincount(gid[k],weights=v,minlength=M[k]).astype(np.int64)%p).astype(np.uint16)
 v=np.asarray(Q.dot(v)).reshape(-1)%p
 if n%200==0:print('col',n,flush=True)
meta={'prime':p,'windows':{}}
for k in range(1,5):
 fn=f'P6_Q2_LAST{k}_PROFILE_MEASUREMENT_FULL_MOD{p}.u16';As[k].tofile(H/fn)
 fnp=f'P6_Q2_LAST{k}_PROFILE_MEASUREMENT_PERSISTENT_MOD{p}.u16';As[k][:,12:].copy().tofile(H/fnp)
 meta['windows'][str(k)]={'groups':M[k],'full_file':fn,'persistent_file':fnp}
(H/f'P6_Q2_PROFILE_WINDOW_MEASUREMENT_MOD{p}_META.json').write_text(json.dumps(meta,indent=2))
