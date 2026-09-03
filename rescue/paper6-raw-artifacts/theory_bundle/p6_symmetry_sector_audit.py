from pathlib import Path
from itertools import permutations
from collections import defaultdict
import importlib.util, hashlib, json

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('p6',HERE/'p6_semantics_audit.py')
p6=importlib.util.module_from_spec(spec); spec.loader.exec_module(p6)

PERMS=[]
for q in permutations(p6.ALPH):
    mp=dict(zip(p6.ALPH,q)); PERMS.append(mp)

def act(w,mp): return ''.join(mp[c] for c in w)

def orbit_partition(states):
    states=set(states); seen=set(); orbs=[]
    for s in sorted(states):
        if s in seen: continue
        o={act(s,mp) for mp in PERMS}
        if not o<=states:
            raise AssertionError(('state set not invariant',s,o-states))
        seen|=o; orbs.append(sorted(o))
    return orbs

def invariant_library(B):
    S=set(B)
    return all(act(w,mp) in S for w in B for mp in PERMS)

def equiv_commutation(states,labels,B):
    # deterministic labelled transition equivariance on legal selected blocks
    S=set(B); checks=0
    for s in states:
      for mp in PERMS:
        ps=act(s,mp)
        for b,t in labels.get(s,{}).items():
          pb=act(b,mp); checks+=1
          if pb not in S: return False,checks,('library',b,pb)
          pt=labels.get(ps,{}).get(pb)
          if pt!=act(t,mp): return False,checks,('transition',s,b,t,ps,pb,pt,act(t,mp))
    return True,checks,None

def case(name,B,K):
    states,edges,labels,init=p6.build(B,K)
    eq=p6.equitable(states,edges)
    Q,groups,rem=p6.quotient(states,edges,eq)
    kr,_,_=p6.krylov_exact_rank(Q)
    inv=invariant_library(B)
    if inv:
      orbs=orbit_partition(states)
      comm,checks,wit=equiv_commutation(states,labels,B)
      # counting class is invariant on orbits?
      orbit_cross=0
      for o in orbs:
        if len({eq[s] for s in o})!=1: orbit_cross+=1
      return {'library':name,'Kmax':K,'blocks':len(B),'raw_states':len(states),'library_S3_invariant':True,
              'S3_orbits':len(orbs),'orbit_size_hist':{str(k):sum(1 for o in orbs if len(o)==k) for k in sorted(set(map(len,orbs)))},
              'operator_equivariant':comm,'equivariance_transition_checks':checks,'count_classes':len(Q),
              'orbits_crossing_count_classes':orbit_cross,'exact_unary_krylov_rank':kr,
              'raw_to_orbit':len(states)/len(orbs),'orbit_to_count':len(orbs)/len(Q),'count_to_linear':len(Q)/kr}
    return {'library':name,'Kmax':K,'blocks':len(B),'raw_states':len(states),'library_S3_invariant':False,
            'count_classes':len(Q),'exact_unary_krylov_rank':kr,'count_to_linear':len(Q)/kr}

if __name__=='__main__':
    B4=p6.library(4); ps={(2,1,1),(1,2,1),(1,1,2)}
    B5=p6.library(5)
    cases=[
      ('BAL3_L4_AA2FR',[w for w in B4 if p6.parikh(w) in ps],6),
      ('INTERIOR_L5_AA2FR',[w for w in B5 if all(x>=1 for x in p6.parikh(w))],5),
      ('ALL_L4_AA2FR',B4,6),
      ('HASH30_L4_AA2FR',sorted(B4,key=lambda w:(hashlib.sha256(w.encode()).hexdigest(),w))[:30],5),
    ]
    out=[]
    for c in cases:
      print('RUN',c[0],flush=True); x=case(*c); out.append(x); print(json.dumps(x,indent=2),flush=True)
    (HERE/'P6_SYMMETRY_SECTOR_RESULTS_v0.1.json').write_text(json.dumps(out,indent=2))
