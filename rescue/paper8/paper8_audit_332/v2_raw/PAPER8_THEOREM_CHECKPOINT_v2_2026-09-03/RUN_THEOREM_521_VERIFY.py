#!/usr/bin/env python3
from pathlib import Path
from fractions import Fraction
import json, hashlib, sys
ROOT=Path(__file__).resolve().parent
T=ROOT/'theorem_521'; D=T/'data'; C=T/'raw_interval_chunks'

def F(n,d=1): return Fraction(int(n),int(d))
# exact finite context / subdivision
base=json.load(open(D/'finite_context_exact_pid4_L180_bernstein.json'))
assert base['L']==180 and base['BERNSTEIN_ALL_POSITIVE'] is True and base['G_nonzero_count']==0
sub=json.load(open(D/'L180_exact_subdivision_20.json'))
assert sub['L']==180 and sub['subdivision']==20 and sub['all_numerator_bernstein_positive'] is True
assert len(sub['records'])==20
for i,r in enumerate(sub['records']):
    assert r['i']==i
    assert F(r['C_lower_num'],r['C_lower_den'])>0
C180=min(F(r['C_lower_num'],r['C_lower_den']) for r in sub['records'])
assert C180==F(sub['global_record']['C_lower_num'],sub['global_record']['C_lower_den'])
# interval chunks / coverage
files=['fwd200_000_050.json','fwd200_050_100.json','fwd200_100_150.json','fwd200_150_200.json','rev500_000_050.json','rev500_050_100.json','rev200_040_090.json','rev200_090_140.json','rev200_140_190.json','rev200_190_200.json']
fwd=[]; rev=[]
for fn in files:
    j=json.load(open(C/fn)); assert j['all_pass'] is True
    (fwd if fn.startswith('fwd') else rev).extend(j['intervals'])
assert len(fwd)==200 and len(rev)==260
for arr in (fwd,rev):
    arr.sort(key=lambda z:z['a'])
    assert abs(arr[0]['a'])<1e-14 and abs(arr[-1]['b']-1)<1e-14
    for u,v in zip(arr,arr[1:]): assert abs(u['b']-v['a'])<2e-12
minobs=min(z['alphaP_lower'] for z in fwd+rev)
assert minobs>0.89
# exact theorem arithmetic
alpha=Fraction(89,100); tau=Fraction(11,100); M=Fraction(12); R=Fraction(21)
Dpo=R/alpha
K=(M+Dpo)**2/alpha + 2*(M+Dpo)*Dpo/alpha + 3*Dpo**2
Etail=4*K*tau**5
Cinf=C180-Etail
assert Cinf>0
final=json.load(open(D/'THEOREM_521_FINAL_CERTIFICATE.json'))
assert final['STATUS']=='COMPUTER_ASSISTED_THEOREM_PASS'
assert F(final['finite_context_exact']['C180_lower_num'],final['finite_context_exact']['C180_lower_den'])==C180
assert F(final['tail_lemma']['tail_upper_num'],final['tail_lemma']['tail_upper_den'])==Etail
assert F(final['infinite_conclusion']['C_infinite_lower_num'],final['infinite_conclusion']['C_infinite_lower_den'])==Cinf
# hard endpoint structure check for profile 521
hard=json.load(open(D/'hard_endpoint_structure.json'))
rec=next(z for z in hard if z['profile']==[5,2,1])
assert rec['all_nondominant_singleton'] and rec['nondominant_internal_same_scc_edges']==0 and rec['transient_dag_acyclic']
print('THEOREM_521_CHECKPOINT_VERIFICATION = PASS')
print('C180 lower =', float(C180))
print('min stored alpha36 =', minobs)
print('tail upper =', float(Etail))
print('C_infinite lower =', float(Cinf))
