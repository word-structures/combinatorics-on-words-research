import numpy as np, scipy.sparse as sp, itertools, json, sys, math
pid=int(sys.argv[1]);Q=np.load(f'/mnt/data/h8cp/a_tilt_quotient_pid{pid}.npz');cls=Q['cls'];rep=Q['rep'];rows=Q['rows'];cols=Q['cols'];tar=Q['target'];mult=Q['mult'].astype(float);K=len(Q['sizes']);profile=Q['profile']
D=np.load('/mnt/data/H8_PROFILE_RESPONSE_CHECKPOINT_v3_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');states=D['states'];giant=D['giant_global'];codes=states[giant];maxcode=int(states.max())+1;idx=np.full(maxcode,-1,np.int32);idx[codes]=np.arange(len(codes),dtype=np.int32)
perms=list(itertools.permutations([0,1,2]))
def pcode(code,p,n=15):
 digs=[0]*n
 for k in range(n-1,-1,-1):digs[k]=code%3;code//=3
 z=0
 for a in digs:z=3*z+p[a]
 return z
seen=np.zeros(K,bool);orbits=[]
for c in range(K):
 if seen[c]:continue
 vals=set()
 for p in perms:
  j=idx[pcode(int(codes[rep[c]]),p)]
  vals.add(int(cls[j]))
 orb=sorted(vals)
 if len(orb)!=3:raise RuntimeError(('orbit size',c,len(orb)))
 seen[orb]=True;orbits.append(orb)
n=len(orbits);assert 3*n==K
# reordered old indices: triples per orbit
order=np.array([c for o in orbits for c in o],dtype=np.int32);inv=np.empty(K,np.int32);inv[order]=np.arange(K,dtype=np.int32)
# local orthogonal transform columns trivial,std1,std2
Tloc=np.array([[1/math.sqrt(3),2/math.sqrt(6),0],[1/math.sqrt(3),-1/math.sqrt(6),1/math.sqrt(2)],[1/math.sqrt(3),-1/math.sqrt(6),-1/math.sqrt(2)]])
# Build reordered A_normal and B_target
rr=inv[rows];cc=inv[cols]
A0=sp.csr_matrix((mult*(tar==0),(rr,cc)),shape=(K,K));B=sp.csr_matrix((mult*(tar==1),(rr,cc)),shape=(K,K))
# sparse block-diagonal T
tr=[];tc=[];tv=[]
for o in range(n):
 for i in range(3):
  for j in range(3):
   tr.append(3*o+i);tc.append(3*o+j);tv.append(Tloc[i,j])
T=sp.csr_matrix((tv,(tr,tc)),shape=(K,K))
def transform(M):return (T.T@M@T).tocsr()
NA=transform(A0);NB=transform(B)
# new ordering currently interleaves [triv,std,std] per orbit. collect trivial indices and std indices
triv=np.arange(0,K,3);std=np.array([i for i in range(K) if i%3!=0],dtype=np.int32)
def blocks(M):
 TT=M[triv][:,triv];SS=M[std][:,std];TS=M[triv][:,std];ST=M[std][:,triv]
 return TT,SS,TS,ST
Atri,Astd,Ats,Ast=blocks(NA);Btri,Bstd,Bts,Bst=blocks(NB)
def maxabs(M):return 0.0 if M.nnz==0 else float(np.max(np.abs(M.data)))
out={'pid':pid,'profile':profile.tolist(),'H_quotient_states':K,'s3_orbits':n,'trivial_dim':n,'standard_dim':2*n,'cross_A0_maxabs':max(maxabs(Ats),maxabs(Ast)),'cross_B_maxabs':max(maxabs(Bts),maxabs(Bst)),'Atri_nnz':Atri.nnz,'Astd_nnz':Astd.nnz,'Btri_nnz':Btri.nnz,'Bstd_nnz':Bstd.nnz}
print(json.dumps(out,indent=2));open(f'/mnt/data/h8cp/s3_blocks_pid{pid}.json','w').write(json.dumps(out,indent=2))
sp.save_npz(f'/mnt/data/h8cp/s3_Atri_pid{pid}.npz',Atri);sp.save_npz(f'/mnt/data/h8cp/s3_Astd_pid{pid}.npz',Astd);sp.save_npz(f'/mnt/data/h8cp/s3_Btri_pid{pid}.npz',Btri);sp.save_npz(f'/mnt/data/h8cp/s3_Bstd_pid{pid}.npz',Bstd)
