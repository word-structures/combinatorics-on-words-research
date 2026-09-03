from pathlib import Path
import json,numpy as np
from scipy.sparse import coo_matrix
H=Path('/mnt/data/p6v23work');P=65521
OUT=Path('/mnt/data/anchor_mats');OUT.mkdir(exist_ok=True)
states=[x.decode('ascii').rstrip('\x00') for x in np.load(H/'P6_Q2_RAW_STATES_S21.npy')]
classes=np.load(H/'P6_Q2_RAW_TO_EQUITABLE_CLASS_U16.npy').astype(np.int32)
V=np.load('/mnt/data/V65521.npy');N=V.shape[0]
def recency_canon(s):
 o=[]
 for ch in reversed(s):
  if ch not in o:o.append(ch)
  if len(o)==3:break
 for ch in 'abc':
  if ch not in o:o.append(ch)
 mp={o[i]:'abc'[i] for i in range(3)}
 return ''.join(mp[c] for c in s)
def pk(w):return (w.count('a'),w.count('b'),w.count('c'))
def lab(t,a):
 bs=[t[i:i+4] for i in range(a,len(t),4) if i+4<=len(t)]
 ps=[pk(b) for b in bs[-4:]]
 while len(ps)<4:ps.insert(0,None)
 return tuple(ps)
canon=[recency_canon(s) for s in states];phase=np.array([len(s)%4 for s in states],dtype=np.int8)
la=[[lab(t,a) for t in canon] for a in range(4)]
meta=[]
for a0 in range(4):
 for a1 in range(4):
  labels=[la[a1][i] if phase[i]==1 else la[a0][i] for i in range(len(states))]
  mp={};g=np.empty(len(labels),dtype=np.int32)
  for i,x in enumerate(labels):
   if x not in mp:mp[x]=len(mp)
   g[i]=mp[x]
  G=coo_matrix((np.ones(len(g),dtype=np.int64),(g,classes)),shape=(len(mp),N)).tocsr();G.sum_duplicates()
  A=(np.asarray(G.dot(V),dtype=np.int64)%P).astype(np.uint16)
  fn=OUT/f'A_{a0}_{a1}.u16';A.tofile(fn)
  meta.append({'a0':a0,'a1':a1,'groups':len(mp),'rows':A.shape[0],'cols':A.shape[1],'file':str(fn)})
  print(a0,a1,len(mp),flush=True)
Path('/mnt/data/P6_Q2_ANCHOR_POLICY_MATRIX_META_v0.1_2026-08-30.json').write_text(json.dumps(meta,indent=2))
