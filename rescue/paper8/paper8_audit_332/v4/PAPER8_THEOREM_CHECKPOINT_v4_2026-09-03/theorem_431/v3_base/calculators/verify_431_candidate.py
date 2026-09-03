from fractions import Fraction
import json, math, os
ROOT='/mnt/data/paper8_resume/theorem_431'

def seg(a,b,w):
 out=[];x=a
 while x < b-1e-14:
  y=min(b,x+w);out.append((round(x,12),round(y,12)));x=y
 return out
expected=seg(0,.08,.004)+seg(.08,.2,.007)+seg(.2,.3,.011)+seg(.3,.5,.012)+seg(.5,1,.02)
assert len(expected)==90 and expected[0][0]==0 and expected[-1][1]==1
for i in range(89): assert abs(expected[i][1]-expected[i+1][0])<1e-12
allrec=[]
for p in range(4):
 fn=f'{ROOT}/cover_part{p}of4.json'; assert os.path.exists(fn),fn
 j=json.load(open(fn)); assert j['profile']==[4,3,1] and j['m']==44 and j['part']==p and j['parts']==4 and j['interval_count_total']==90
 allrec.extend(j['records'])
assert len(allrec)==180, len(allrec)
seen={}
for r in allrec:
 key=(round(r['a'],12),round(r['b'],12),bool(r['reverse']))
 assert key not in seen,key; seen[key]=r
 assert math.isfinite(r['alphaP_lower']) and r['alphaP_lower']>0
for a,b in expected:
 for rev in (False,True): assert (a,b,rev) in seen,(a,b,rev)
alpha_obs=min(r['alphaP_lower'] for r in allrec); weakest=min(allrec,key=lambda r:r['alphaP_lower'])
alpha=Fraction(91,100); tau=1-alpha; assert Fraction.from_float(alpha_obs)>alpha
# score envelope for 44 steps: 4 <= N_a <= 29; centered Y=N_a-44/3 => [-32/3,43/3]
M=Fraction(43,3); R=Fraction(25,1); D=R/alpha
K=(M+D)**2/alpha + 2*(M+D)*D/alpha + 3*D**2
blocks=4; Etail=4*K*tau**blocks
fin=json.load(open(f'{ROOT}/L176_subdivision10.json')); assert fin['profile']==[4,3,1] and fin['L']==176 and fin['subdivision']==10 and fin['G_nonzero_count']==0 and fin['all_numerator_bernstein_positive']
Cfin=Fraction(int(fin['global_record']['C_lower_num']),int(fin['global_record']['C_lower_den']))
Cinf=Cfin-Etail
out={
 'profile':[4,3,1], 'cover_intervals':len(expected), 'cover_records':len(allrec), 'min_observed_alpha44_lower':alpha_obs, 'weakest_record':weakest,
 'theorem_alpha_used':'91/100','tau':'9/100','block_length':44,'finite_radius_L':176,'full_blocks_each_side':blocks,
 'score_M':'43/3','oscillation_R':'25','tail_K_num':str(K.numerator),'tail_K_den':str(K.denominator),'tail_upper_num':str(Etail.numerator),'tail_upper_den':str(Etail.denominator),'tail_upper_float':float(Etail),
 'finite_C_lower_num':str(Cfin.numerator),'finite_C_lower_den':str(Cfin.denominator),'finite_C_lower_float':float(Cfin),
 'infinite_C_lower_num':str(Cinf.numerator),'infinite_C_lower_den':str(Cinf.denominator),'infinite_C_lower_float':float(Cinf),
 'PASS': Cinf>0 and alpha_obs>float(alpha)
}
json.dump(out,open(f'{ROOT}/THEOREM_431_CANDIDATE_VERIFICATION.json','w'),indent=2)
print(json.dumps({k:v for k,v in out.items() if not k.endswith('_num') and not k.endswith('_den')},indent=2))
if not out['PASS']: raise SystemExit(1)
