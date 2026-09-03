from fractions import Fraction
from pathlib import Path
import json,hashlib,sys
ROOT=Path(__file__).resolve().parent
fail=[]
def req(c,m):
    if not c: fail.append(m)
def load(n):
    p=ROOT/n; req(p.exists(),f'missing {n}')
    if not p.exists(): return None
    try:return json.load(open(p))
    except Exception as e: fail.append(f'parse {n}: {e}'); return None
S=load('STRUCTURAL_CROSSCHECK.json');X=load('EXACT_CROSSCHECK_332.json');M=load('MONOTONICITY_332.json');MI=load('MONOTONICITY_INTEGER_CROSSCHECK.json');C=load('FIXED_BIDIRECTIONAL_COVER.json');RS=load('ROUND_PAD_STRESS_RECHECK.json');T=load('TAIL_BOUND_332.json')
if S:
 req(S.get('PASS') is True,'structural PASS');req(S.get('target_degree_441',{}).get('max')==294,'degree max');req(S.get('a_count_44',{}).get('min')==4 and S.get('a_count_44',{}).get('max')==29,'score envelope');req(S.get('centered_score_44',{}).get('M_num_over3')==43,'M');req(S.get('centered_score_44',{}).get('oscillation')==25,'R')
if X:
 req(X.get('PASS') is True and X.get('modular_all_pass') is True,'modular');req(X.get('G_exact_zero') is True,'G');req(X.get('dense_max_abs_diff',1)<2e-9,'dense crosscheck')
if M:
 req(M.get('PASS') is True and M.get('global_bernstein_all_positive') is True,'monotonicity');req(M.get('global_bernstein_negative_count')==0 and M.get('global_bernstein_zero_count')==0,'monotonicity coeff signs');req(M.get('Qpos_power_degree')==1172,'monotonicity degree')
if MI:
 req(MI.get('PASS') is True and MI.get('all_global_bernstein_positive') is True,'independent monotonicity')
if C:
 req(C.get('PASS') is True and C.get('complete') is True and C.get('all_pass') is True,'cover top PASS');req(C.get('interval_count')==302 and C.get('record_count')==604,'cover counts')
 rec=C.get('records',[]);req(len(rec)==604,'cover records len')
 seen=set(); ints={};amin=None
 for q in rec:
  i=int(q['i']); r=bool(q['reverse']); key=(i,r);req(key not in seen,f'duplicate {key}');seen.add(key)
  a=Fraction(q['a_fraction']);b=Fraction(q['b_fraction']);ints.setdefault(i,(a,b));req(ints[i]==(a,b),f'direction endpoints {i}')
  al=float(q['alphaP_lower']);amin=al if amin is None else min(amin,al);req(al>0.90,f'alpha <=.90 {key}')
 req(seen=={(i,r) for i in range(302) for r in (False,True)},'cover keyset')
 if len(ints)==302:
  req(ints[0][0]==0 and ints[301][1]==1,'cover boundary')
  for i in range(301):req(ints[i][1]==ints[i+1][0],f'gap/overlap {i}')
 req(abs(amin-float(C.get('min_alpha44_lower')))<1e-12,'stored min mismatch')
if RS:
 req(RS.get('PASS') is True,'stress PASS');req(RS.get('extended_min_alpha',0)>0.90,'stress extended min');req(RS.get('PASS_through_1e-4') is True,'stress 1e-4')
if T:
 req(T.get('PASS_ARITHMETIC') is True,'tail arithmetic');q=Fraction(int(T['finite_negC_lower_num']),int(T['finite_negC_lower_den']));tail=Fraction(int(T['tail_num']),int(T['tail_den']));req(q>tail,'final margin')
else:q=tail=None
poly=ROOT/'L220_poly.txt'
if poly.exists() and M and X:
 h=hashlib.sha256(poly.read_bytes()).hexdigest();req(h==M.get('poly_sha256'),'mono poly hash');req(h==X.get('sha256',{}).get('L220_poly.txt'),'crosscheck poly hash')
out={'profile':[3,3,2],'status':'COMPUTER_ASSISTED_THEOREM_PASS' if not fail else 'FAIL','failures':fail,'finite_negC_lower_float':float(q) if q else None,'tail_float':float(tail) if tail else None,'infinite_negC_margin_float':float(q-tail) if q else None,'cover_min_alpha44_lower':C.get('min_alpha44_lower') if C else None,'roundoff_stress_min_alpha':RS.get('extended_min_alpha') if RS else None,'audit_boundary':['independent derivation/review of 4*K*tau^B','fully directed-rounding or ball-arithmetic replay of interval generator','external code review/replay'],'PASS':not fail}
json.dump(out,open(ROOT/'THEOREM_332_CANDIDATE_VERIFICATION_V4.json','w'),indent=2);print(json.dumps(out,indent=2));sys.exit(0 if not fail else 1)
