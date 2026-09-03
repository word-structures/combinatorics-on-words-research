from pathlib import Path
import json, math, hashlib
from scipy.sparse import load_npz
H=Path('/mnt/data/p6v23work')
relpath=Path('/mnt/data/P6_Q2_PROFILE_ONLY_ROW_RELATIONS_RECONSTRUCTED_v0.1_2026-08-30.json')
R=json.loads(relpath.read_text())
piv=R['pivot_rows'];dep=R['dependent_rows'];rels=R['relations']
D=json.loads((H/'P6_Q2_EQUITABLE_QUOTIENT_SPARSE_v0.1_2026-08-30.json').read_text());qrows=D['rows'];N=len(qrows)
G=load_npz(H/'P6_Q2_RECENCY_PROFILE_NO_BIT_GROUP_TO_QUOTIENT_v0.1_2026-08-30.npz').tocsr()
# Build each exact relation as a sparse quotient-state row vector r = depcoef*G[dep] + sum coeff*G[pivot]
rel_q=[]; max_q_support=0; max_coeff_digits=0
for j,rel in enumerate(rels):
 d={}
 terms=[(dep[j],rel['dependent_coefficient'])]+[(piv[pos],c) for pos,c in zip(rel['pivot_positions'],rel['pivot_coefficients'])]
 for grow,c in terms:
  max_coeff_digits=max(max_coeff_digits,len(str(abs(c))) if c else 0)
  for kk in range(G.indptr[grow],G.indptr[grow+1]):
   q=int(G.indices[kk]);val=int(G.data[kk])*int(c)
   d[q]=d.get(q,0)+val
 d={q:c for q,c in d.items() if c}
 rel_q.append(d);max_q_support=max(max_q_support,len(d))
# Exact verification on Krylov columns Q^h 1.
Q=[[(int(j),int(w)) for j,w in row] for row in qrows]
v=[1]*N
nonzero=[];maxabs=0;max_digits_v=1
for h in range(1179):
 for r,d in enumerate(rel_q):
  s=sum(c*v[q] for q,c in d.items())
  if s:
   nonzero.append((r,h,s));maxabs=max(maxabs,abs(s))
   if len(nonzero)>=20:break
 if nonzero:break
 max_digits_v=max(max_digits_v,max(len(str(abs(x))) for x in v if x))
 if h<1178:
  v=[sum(w*v[j] for j,w in row) for row in Q]
 if h in (0,99,499,999,1178):print('h',h,'maxdigits',max_digits_v,flush=True)
# Hash helpers
def sha(path):
 hh=hashlib.sha256();
 with open(path,'rb') as f:
  for ch in iter(lambda:f.read(1<<20),b''):hh.update(ch)
 return hh.hexdigest()
out={
 'date':'2026-08-30',
 'system':'FULL_L4_Q2',
 'measurement':'four recency-gauged grid-aligned whole-block profiles',
 'measurement_family_count':1796,
 'certified_independent_row_relations':652,
 'independence_argument':'Each relation has a nonzero coefficient on its own unique dependent family row and uses only the fixed 1144 pivot-family rows otherwise; hence the 652 relations are linearly independent over Q.',
 'upper_bound_rank_Q':1144,
 'modular_lower_bound_rank':1144,
 'modular_lower_bound_primes':[65521,65519,1000003,999983,2147483647],
 'conclusion_rank_Q':1144 if not nonzero else None,
 'future_columns_exactly_checked':1179,
 'exact_relation_residual_nonzeros':len(nonzero),
 'exact_max_abs_residual':maxabs,
 'relation_count':len(rels),
 'total_family_coefficients':sum(1+len(r['pivot_positions']) for r in rels),
 'max_family_coefficient_decimal_digits':max_coeff_digits,
 'max_quotient_support_per_relation':max_q_support,
 'max_future_value_decimal_digits_encountered':max_digits_v,
 'crt_primes_used':R['primes'],
 'crt_modulus_decimal_digits':R['crt_modulus_digits'],
 'artifacts':{
  relpath.name:sha(relpath),
  'P6_Q2_RECENCY_PROFILE_NO_BIT_GROUP_TO_QUOTIENT_v0.1_2026-08-30.npz':sha(H/'P6_Q2_RECENCY_PROFILE_NO_BIT_GROUP_TO_QUOTIENT_v0.1_2026-08-30.npz'),
  'P6_Q2_EQUITABLE_QUOTIENT_SPARSE_v0.1_2026-08-30.json':sha(H/'P6_Q2_EQUITABLE_QUOTIENT_SPARSE_v0.1_2026-08-30.json')
 }
}
Path('/mnt/data/P6_Q2_PROFILE_ONLY_EXACT_RATIONAL_RANK_CERT_v0.1_2026-08-30.json').write_text(json.dumps(out,indent=2))
print('PASS' if not nonzero else 'FAIL',json.dumps(out,indent=2))
