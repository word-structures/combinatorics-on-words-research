from pathlib import Path
from itertools import product
from collections import defaultdict
import importlib.util, json

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('p6',HERE/'p6_semantics_audit.py')
p6=importlib.util.module_from_spec(spec); spec.loader.exec_module(p6)

def char_step(s,ch,K,mem):
 z=s+ch
 if not p6.safe_cutoff(z,K): return None
 return z[-mem:]

def full_states(K):
 mem=max(2*K-1,3)
 return [''.join(x) for x in product(p6.ALPH,repeat=mem) if p6.safe_cutoff(''.join(x),K)]

def profile_dp_from_state(s,L,K,mem):
 # dict (state, profile) -> multiplicity after i chars
 cur={(s,(0,0,0)):1}
 unit={'a':(1,0,0),'b':(0,1,0),'c':(0,0,1)}
 for _ in range(L):
  nxt=defaultdict(int)
  for (t,p),n in cur.items():
   for ch in p6.ALPH:
    u=char_step(t,ch,K,mem)
    if u is None: continue
    e=unit[ch]; q=(p[0]+e[0],p[1]+e[1],p[2]+e[2])
    nxt[(u,q)]+=n
  cur=dict(nxt)
 return cur

def enumerate_profile_from_state(s,L,K,mem):
 out=defaultdict(int)
 for tup in product(p6.ALPH,repeat=L):
  w=''.join(tup); t=s; ok=True
  for ch in w:
   t=char_step(t,ch,K,mem)
   if t is None: ok=False; break
  if ok: out[(t,p6.parikh(w))]+=1
 return dict(out)

def audit(L,K):
 mem=max(2*K-1,3); states=full_states(K); mismatch=0
 for s in states:
  if profile_dp_from_state(s,L,K,mem)!=enumerate_profile_from_state(s,L,K,mem): mismatch+=1
 return {'L':L,'Kmax':K,'full_memory_states':len(states),'profiles_possible':(L+2)*(L+1)//2,
         'coefficient_dp_matches_literal_enumeration_all_states':mismatch==0,'mismatch_states':mismatch}

if __name__=='__main__':
 out=[audit(4,4),audit(5,5)]
 print(json.dumps(out,indent=2)); (HERE/'P6_PROFILE_GENERATING_OPERATOR_RESULTS_v0.1.json').write_text(json.dumps(out,indent=2))
