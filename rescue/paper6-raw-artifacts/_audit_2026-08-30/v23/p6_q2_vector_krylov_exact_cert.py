#!/usr/bin/env python3
from pathlib import Path
import json, time
H=Path(__file__).resolve().parent
Qd=json.loads((H/'P6_Q2_EQUITABLE_QUOTIENT_SPARSE_v0.1_2026-08-30.json').read_text())
Q=[dict(r) for r in Qd['rows']]
C=json.loads((H/'P6_BLOCKRANGE_Q2_EXACT_RECURRENCE_CERT_v0.1_2026-08-30.json').read_text())['connection_polynomial_coefficients_C0_to_C1179']
d=len(C)-1
N=len(Q)

def step(v):
    return [sum(w*v[j] for j,w in row.items()) for row in Q]

v=[1]*N
acc=[0]*N
start=time.time()
maxdigits=1
for j in range(d+1):
    a=C[d-j]
    if a:
        acc=[x+a*y for x,y in zip(acc,v)]
    if j<d:
        v=step(v)
        if j in (0,9,99,499,999,1178):
            maxdigits=max(maxdigits,max(len(str(abs(x))) for x in v if x))
            print('j',j+1,'elapsed',time.time()-start,'maxdigits',maxdigits,flush=True)
nonzero=[(i,x) for i,x in enumerate(acc) if x]
res={
 'date':'2026-08-30',
 'library':'ALL_L4_AA2FR','Q':2,'Kmax':11,
 'equitable_classes':N,
 'polynomial_degree':d,
 'vector_polynomial_identity':'Q^d 1 + C[1] Q^(d-1)1 + ... + C[d] 1 = 0',
 'nonzero_coordinates':len(nonzero),
 'max_abs_residual':max([abs(x) for _,x in nonzero],default=0),
 'exact_vector_krylov_rank_conclusion':d if not nonzero else None,
 'lower_bound_reason':'scalar Hankel rank is exactly 1179, hence vector Krylov rank >=1179',
 'upper_bound_reason':'exact integer vector polynomial annihilation gives vector Krylov rank <=1179' if not nonzero else None,
 'elapsed_seconds':time.time()-start,
 'max_intermediate_decimal_digits_sampled':maxdigits,
}
out=H/'P6_Q2_VECTOR_KRYLOV_EXACT_CERT_v0.1_2026-08-30.json'
out.write_text(json.dumps(res,indent=2),encoding='utf-8')
print(json.dumps(res,indent=2))
