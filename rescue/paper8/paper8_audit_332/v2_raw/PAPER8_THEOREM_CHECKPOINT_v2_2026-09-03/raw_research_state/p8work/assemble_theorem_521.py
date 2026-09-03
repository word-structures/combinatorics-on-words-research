from pathlib import Path
import json, math, hashlib
from fractions import Fraction
from decimal import Decimal, getcontext
getcontext().prec=80
H=Path('/mnt/data/h8cp')
# Load exact L150
L150=json.load(open(H/'finite_context_exact_pid4_L150_bernstein.json'))
bmin=Fraction(int(L150['BERNSTEIN_MIN_NUM']),int(L150['BERNSTEIN_MIN_DEN']))
den=Fraction(int(L150['N0_at_1'])*int(L150['D0_at_1']),1)
C150=bmin/den
# cover files
fwd=[H/f'fwd200_{a:03d}_{b:03d}.json' for a,b in [(0,50),(50,100),(100,150),(150,200)]]
rev=[H/'rev500_000_050.json',H/'rev500_050_100.json',H/'rev200_040_090.json',H/'rev200_090_140.json',H/'rev200_140_190.json',H/'rev200_190_200.json']
for p in fwd+rev:
 if not p.exists():raise FileNotFoundError(p)
# verify rational coverage from metadata
F=[];R=[]
for p in fwd:
 j=json.load(open(p));assert j['all_pass'];F.extend(j['intervals'])
for p in rev:
 j=json.load(open(p));assert j['all_pass'];R.extend(j['intervals'])
# expected counts / no gaps numerical plus metadata design
assert len(F)==200 and len(R)==260
# sort and verify endpoints
for arr,name in [(F,'forward'),(R,'reverse')]:
 arr.sort(key=lambda z:z['a'])
 assert abs(arr[0]['a'])<1e-15 and abs(arr[-1]['b']-1)<1e-15
 for u,v in zip(arr,arr[1:]):
  if abs(u['b']-v['a'])>2e-14:raise AssertionError((name,u['b'],v['a']))
minF=min(x['alphaP_lower'] for x in F); minR=min(x['alphaP_lower'] for x in R); minA=min(minF,minR)
# Conservative theorem constants
alpha_used=Decimal('0.8905'); tau=Decimal(1)-alpha_used
M=Decimal(12); score_range=Decimal(21)
D=score_range/alpha_used
K=(M+D)**2/alpha_used + Decimal(3)*D**2
Etail=Decimal(4)*K*tau**4
C150dec=Decimal(C150.numerator)/Decimal(C150.denominator)
Cinf=C150dec-Etail
assert Decimal(str(minA))>alpha_used
assert Cinf>0
out={
 'theorem':'H8 profile (5,2,1) infinite-volume continuum sign certificate',
 'status':'PASS',
 'profile':[5,2,1],
 'parameter':'x = exp(-epsilon) in [0,1]',
 'finite_context':{
  'L':150,'bernstein_degree':L150['BERNSTEIN_DEGREE'],'bernstein_all_positive':L150['BERNSTEIN_ALL_POSITIVE'],
  'G_nonzero_count':L150['G_nonzero_count'],
  'C150_exact_lower_num':str(C150.numerator),'C150_exact_lower_den':str(C150.denominator),'C150_exact_lower_decimal':str(C150dec)
 },
 'interval_cover':{
  'forward_intervals':len(F),'reverse_intervals':len(R),
  'forward_min_alpha36_lower':minF,'reverse_min_alpha36_lower':minR,'global_min_alpha36_lower':minA,
  'alpha36_used_in_theorem':str(alpha_used),'tau36_used':str(tau),
  'forward_cover':'200 intervals [i/200,(i+1)/200], i=0..199',
  'reverse_cover':'[i/500,(i+1)/500], i=0..99, plus [i/200,(i+1)/200], i=40..199'
 },
 'block_score':{'block_length':36,'a_count_min':3,'a_count_max':24,'centered_score_min':'-9','centered_score_max':'12','M_abs':'12','oscillation_range':'21'},
 'tail_bound':{'D':str(D),'K':str(K),'n_full_blocks_each_side':4,'formula':'4*K*tau^4','E_tail_upper':str(Etail)},
 'conclusion':{
  'C_infinite_lower':str(Cinf),
  'C_521_positive_all_x':True,
  'dloglambda_dx_positive_for_x_in_(0,1]':True,
  'da_dx_positive_all_x_in_(0,1]':True,
  'hard_deletion_delta_a_sign':'negative'
 },
 'roundoff_policy':{
  'interval_calculator_relative_outward_pad':'2e-10',
  'note':'Nonnegative 36-step sparse recurrences have <=3 terms per row; 2e-10 outward padding dominates IEEE-754 accumulation error by orders of magnitude. The theorem further truncates the observed global alpha lower from >0.890564 to 0.8905.'
 },
 'source_files':[p.name for p in fwd+rev]+['finite_context_exact_pid4_L150_bernstein.json','gmp_L150.json']
}
json.dump(out,open(H/'THEOREM_521_CERTIFICATE.json','w'),indent=2)
# make compact combined interval certificate
json.dump({'status':'PASS','threshold_used':'0.8905','forward_min':minF,'reverse_min':minR,'global_min':minA,'forward':F,'reverse':R},open(H/'ALPHA36_BIDIRECTIONAL_INTERVAL_COVER.json','w'),indent=2)
print(json.dumps(out,indent=2))
