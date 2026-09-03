import numpy as np, sys, time, json
D=np.load('/mnt/data/H8_PROFILE_RESPONSE_CHECKPOINT_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');states=D['states'];giant=D['giant_global'];u=D['u'];v=D['v'];ep=D['edge_profile_id'];profiles=D['profiles'];N=len(giant);codes=states[giant]
pid=int(sys.argv[1])
# deterministic target by appended symbol = target state's last base3 digit
nxt=np.full((N,3),-1,dtype=np.int32); typ=np.full((N,3),-1,dtype=np.int8)
sym=(codes[v]%3).astype(np.int8)
for k in range(len(u)):
 i=int(u[k]);s=int(sym[k]);
 if nxt[i,s]!=-1: raise RuntimeError('not deterministic')
 nxt[i,s]=int(v[k]);typ[i,s]=1 if int(ep[k])==pid else 0
cls=np.zeros(N,dtype=np.int32)
hist=[]
for it in range(100):
 # signature 6 ints: type+1 (0 missing,1 normal,2 target), destination class+1 (0 missing)
 sig=np.empty((N,6),dtype=np.int64)
 for s in range(3):
  sig[:,2*s]=(typ[:,s]+1).astype(np.int64)
  d=nxt[:,s]; sig[:,2*s+1]=np.where(d>=0,cls[np.maximum(d,0)]+1,0)
 # unique rows
 uniq,inv=np.unique(sig,axis=0,return_inverse=True)
 n=int(len(uniq));hist.append(n);print('iter',it,'classes',n,flush=True)
 if n==int(cls.max())+1 and np.array_equal(inv.astype(np.int32),cls):break
 cls=inv.astype(np.int32)
# verify signatures constant in class and build quotient transitions
K=int(cls.max())+1; sizes=np.bincount(cls,minlength=K)
rep=np.full(K,-1,dtype=np.int32)
for i,c in enumerate(cls):
 if rep[c]<0: rep[c]=i
qnxt=np.full((K,3),-1,dtype=np.int32);qtyp=np.full((K,3),-1,dtype=np.int8)
for c,i in enumerate(rep):
 for s in range(3):
  if nxt[i,s]>=0: qnxt[c,s]=cls[nxt[i,s]];qtyp[c,s]=typ[i,s]
# consistency
for i in range(N):
 c=cls[i]
 for s in range(3):
  d=nxt[i,s];qd=-1 if d<0 else cls[d]
  if qd!=qnxt[c,s] or typ[i,s]!=qtyp[c,s]:raise RuntimeError('bad quotient')
np.savez_compressed(f'/mnt/data/h8cp/quotient_pid{pid}.npz',cls=cls,sizes=sizes,nxt=qnxt,typ=qtyp,rep=rep,profile=profiles[pid-1])
meta={'profile':profiles[pid-1].tolist(),'original_states':N,'quotient_states':K,'class_history':hist,'min_class':int(sizes.min()),'max_class':int(sizes.max()),'singleton_classes':int(np.sum(sizes==1))}
open(f'/mnt/data/h8cp/quotient_pid{pid}.json','w').write(json.dumps(meta,indent=2));print(meta)
