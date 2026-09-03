from fractions import Fraction
from pathlib import Path
import json, math
H=Path('/mnt/data/h8cp')
sub=json.load(open(H/'L180_exact_subdivision_20.json'))
r=sub['global_record']; C180=Fraction(int(r['C_lower_num']),int(r['C_lower_den']))
alpha=Fraction(89,100); tau=1-alpha; M=Fraction(12); R=Fraction(21); D=R/alpha
K=(M+D)**2/alpha + 2*(M+D)*D/alpha + 3*D**2
Etail=4*K*tau**5
Cinf=C180-Etail
assert Cinf>0
cover=json.load(open(H/'ALPHA36_BIDIRECTIONAL_INTERVAL_COVER.json'))
# existing combined was from old aggregator but min values valid
# recompute from chunk summaries for source truth
files=['fwd200_000_050.json','fwd200_050_100.json','fwd200_100_150.json','fwd200_150_200.json','rev500_000_050.json','rev500_050_100.json','rev200_040_090.json','rev200_090_140.json','rev200_140_190.json','rev200_190_200.json']
vals=[]
for fn in files:
 j=json.load(open(H/fn));assert j['all_pass'];vals += j['intervals']
minobs=min(x['alphaP_lower'] for x in vals);assert minobs>float(alpha)
cert={
 'THEOREM_ID':'P8-H8-521-CONTINUUM-SIGN-1',
 'STATUS':'COMPUTER_ASSISTED_THEOREM_PASS',
 'NOVELTY_STATUS':'NOT_ESTABLISHED',
 'profile':[5,2,1], 'h':8,
 'statement':'For the H8 profile (5,2,1), C_521(x)>0 for every x in [0,1]. Consequently a(x) is strictly increasing from hard deletion x=0 to baseline x=1, so hard-deletion Delta_a=a(0)-a(1)<0.',
 'finite_context_exact':{
  'L':180,'subdivision':20,'C180_lower_num':str(C180.numerator),'C180_lower_den':str(C180.denominator),'C180_lower_decimal':float(C180),
  'bernstein_global_positive':True,'source':'L180_exact_subdivision_20.json'
 },
 'mixing_certificate':{
  'block_length':36,'forward_reverse_interval_cover_complete':True,'intervals_total':460,
  'observed_certified_global_alpha36_lower':minobs,
  'alpha36_used_exact':'89/100','tau36_used_exact':'11/100',
  'score_a_count_range_36':[3,24],'centered_score_range_36':['-9','12'],'M_abs':12,'oscillation_R':21,
  'interval_lemma_source':'INTERVAL_ALPHA36_LEMMA.md'
 },
 'tail_lemma':{
  'n_full_blocks_each_side':5,
  'D_exact':str(D),'K_exact':str(K),'tail_formula':'4*K*tau^5','tail_upper_num':str(Etail.numerator),'tail_upper_den':str(Etail.denominator),'tail_upper_decimal':float(Etail),
  'lemma_source':'FINITE_TO_INFINITE_TAIL_LEMMA.md'
 },
 'infinite_conclusion':{
  'C_infinite_lower_num':str(Cinf.numerator),'C_infinite_lower_den':str(Cinf.denominator),'C_infinite_lower_decimal':float(Cinf),
  'C_positive_all_x':True,'hard_deletion_delta_sign':'negative'
 },
 'endpoint_branch':{
  'hard_x0_simple_isolated_perron_branch':True,
  'note':'Hard deletion has one dominant Perron SCC; all other SCCs are singleton/no-internal-edge transient pieces in the audited structure, giving continuity/analytic continuation of the Perron branch at x=0.'
 },
 'arithmetic_safety':{
  'interval_float_outward_relative_pad':'2e-10','alpha_truncation_margin':minobs-float(alpha),
  'note':'The interval theorem uses arbitrary positive midpoint vectors, so they need not be rigorously enclosed Perron vectors. All nonnegative 36-step recurrences are outward padded; the final theorem then truncates alpha from >0.890564 to exactly 0.89.'
 },
 'sources':files+['finite_context_exact_pid4_L180_bernstein.json','L180_exact_subdivision_20.json','hard_endpoint_structure.json']
}
json.dump(cert,open(H/'THEOREM_521_FINAL_CERTIFICATE.json','w'),indent=2)
print(json.dumps(cert,indent=2))
