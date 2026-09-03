import numpy as np, json, sys
pid=int(sys.argv[1])
D=np.load('/mnt/data/H8_PROFILE_RESPONSE_CHECKPOINT_v3_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');states=D['states'];giant=D['giant_global'];u=D['u'];v=D['v'];ep=D['edge_profile_id'];profiles=D['profiles'];N=len(giant);codes=states[giant]
# deterministic transitions by appended symbol
nxt=np.full((N,3),-1,dtype=np.int32);typ=np.full((N,3),-1,dtype=np.int8); sym=(codes[v]%3).astype(np.int8)
for k in range(len(u)):
 i=int(u[k]);s=int(sym[k]);nxt[i,s]=int(v[k]);typ[i,s]=1 if int(ep[k])==pid else 0
# Coarsest equitable partition for all A(t,x) with a distinguished and b,c equal:
# categories: a-normal,a-target,o-normal,o-target. Signature is multiset of dest colors per category.
cls=np.zeros(N,dtype=np.int32);hist=[]
for it in range(100):
 # each row has max 1 a-edge and max 2 o-edges. Make canonical signature with category and sorted dest colors (+1; 0 absent).
 sig=np.zeros((N,6),dtype=np.int64)
 # a transition: encode type 0/1 and dest; missing = all zero
 da=nxt[:,0]; ta=typ[:,0]
 sig[:,0]=np.where(da>=0,ta+1,0); sig[:,1]=np.where(da>=0,cls[np.maximum(da,0)]+1,0)
 # other transitions: two entries each code pair as combined integer key sorted lexicographically
 keys=[]
 for s in [1,2]:
  d=nxt[:,s];t=typ[:,s]
  # category type+1 and dest color+1 packed; 0 missing
  key=np.where(d>=0,(t.astype(np.int64)+1)*(N+2)+(cls[np.maximum(d,0)].astype(np.int64)+1),0)
  keys.append(key)
 k1=np.minimum(keys[0],keys[1]);k2=np.maximum(keys[0],keys[1]);sig[:,2]=k1;sig[:,3]=k2
 # also current last-symbol category a/not-a because state observable/tilt source representation may need it; for pressure via edge label not necessary,
 # but preserving it makes state-observable audits exact. b/c collapsed.
 sig[:,4]=(codes%3==0).astype(np.int64)+1
 # unused sixth column reserved/version marker
 sig[:,5]=0
 uniq,inv=np.unique(sig,axis=0,return_inverse=True);new=inv.astype(np.int32);k=len(uniq);hist.append(int(k));print('iter',it,'classes',k,flush=True)
 if np.array_equal(new,cls):break
 cls=new
K=int(cls.max())+1;sizes=np.bincount(cls,minlength=K);rep=np.full(K,-1,dtype=np.int32)
for i,c in enumerate(cls):
 if rep[c]<0:rep[c]=i
# Build weighted quotient edges: for each representative, aggregate transitions by (dest class, target type, a-vs-other), multiplicity 1 or2.
rows=[];cols=[];targs=[];acats=[];mult=[]
for c,i in enumerate(rep):
 agg={}
 for s in range(3):
  d=nxt[i,s]
  if d<0:continue
  key=(int(cls[d]),int(typ[i,s]),1 if s==0 else 0)
  agg[key]=agg.get(key,0)+1
 for (d,t,a),m in agg.items():rows.append(c);cols.append(d);targs.append(t);acats.append(a);mult.append(m)
rows=np.array(rows,np.int32);cols=np.array(cols,np.int32);targs=np.array(targs,np.int8);acats=np.array(acats,np.int8);mult=np.array(mult,np.int8)
# full consistency: aggregate signature per original row vs rep quotient
for i in range(N):
 c=cls[i];agg={}
 for s in range(3):
  d=nxt[i,s]
  if d<0:continue
  key=(int(cls[d]),int(typ[i,s]),1 if s==0 else 0);agg[key]=agg.get(key,0)+1
 qagg={}
 idx=np.where(rows==c)[0]
 for e in idx:qagg[(int(cols[e]),int(targs[e]),int(acats[e]))]=int(mult[e])
 if agg!=qagg:raise RuntimeError('inconsistent equitable quotient')
# current a-indicator constant by construction
state_a=(codes[rep]%3==0).astype(np.int8)
np.savez_compressed(f'/mnt/data/h8cp/pressure_quotient_pid{pid}.npz',cls=cls,sizes=sizes,rep=rep,rows=rows,cols=cols,target=targs,aedge=acats,mult=mult,state_a=state_a,profile=profiles[pid-1])
meta={'pid':pid,'profile':profiles[pid-1].tolist(),'original_states':N,'quotient_states':K,'quotient_edges_aggregated':len(rows),'history':hist,'min_class':int(sizes.min()),'max_class':int(sizes.max()),'singletons':int(np.sum(sizes==1))}
open(f'/mnt/data/h8cp/pressure_quotient_pid{pid}.json','w').write(json.dumps(meta,indent=2));print(meta)
