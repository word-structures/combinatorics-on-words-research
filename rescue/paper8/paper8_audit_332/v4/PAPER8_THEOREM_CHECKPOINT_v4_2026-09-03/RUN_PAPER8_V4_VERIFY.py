#!/usr/bin/env python3
from pathlib import Path
from fractions import Fraction
import json, math, sys
ROOT=Path(__file__).resolve().parent
fail=[]
def req(c,m):
    if not c: fail.append(m)
def J(p):
    try:return json.load(open(ROOT/p))
    except Exception as e: fail.append(f'cannot load {p}: {e}'); return None

def parse_poly(p):
    ls=(ROOT/p).read_text().splitlines(); iF=ls.index('F');iG=ls.index('G');iN=ls.index('N0');iD=ls.index('D0');iE=ls.index('ENDPOLY')
    return {'L':int(ls[0].split()[1]),'F':list(map(int,ls[iF+1:iG])),'G':list(map(int,ls[iG+1:iN])),'N':list(map(int,ls[iN+1:iD])),'D':list(map(int,ls[iD+1:iE]))}
def ev(c,x):
    s=0
    for z in reversed(c):s=s*x+z
    return s
def Cend(z,x): return Fraction(ev(z['F'],x),9*ev(z['N'],x)*ev(z['D'],x))
def tail(alpha,M,R,B):
    tau=1-alpha; D=R/alpha; K=(M+D)**2/alpha + 2*(M+D)*D/alpha + 3*D**2
    return 4*K*tau**B

# ---------- 332 ----------
s332=J('theorem_332/data/STRUCTURAL_CROSSCHECK.json'); x332=J('theorem_332/data/EXACT_CROSSCHECK_332.json'); m332=J('common/MONOTONICITY_332.json'); mi332=J('common/MONOTONICITY_332_INTEGER_CROSSCHECK.json'); cov332=J('theorem_332/data/FIXED_BIDIRECTIONAL_COVER.json'); stress332=J('theorem_332/data/ROUND_PAD_STRESS_RECHECK.json'); cand332=J('theorem_332/data/THEOREM_332_CANDIDATE_VERIFICATION_V4.json')
if s332:
    req(s332.get('PASS') is True,'332 structural'); req(s332.get('target_degree_441',{}).get('max')==294,'332 degree'); req(s332.get('a_count_44',{}).get('min')==4 and s332.get('a_count_44',{}).get('max')==29,'332 score envelope')
if x332:req(x332.get('PASS') is True and x332.get('modular_all_pass') is True and x332.get('G_exact_zero') is True,'332 exact crosscheck')
if m332:req(m332.get('PASS') is True and m332.get('global_bernstein_all_positive') is True,'332 monotonicity')
if mi332:req(mi332.get('PASS') is True and mi332.get('all_global_bernstein_positive') is True,'332 independent monotonicity')
if cov332:
    req(cov332.get('PASS') is True and cov332.get('complete') is True and cov332.get('interval_count')==302 and cov332.get('record_count')==604,'332 cover top')
    rec=cov332.get('records',[]); req(len(rec)==604,'332 cover record len'); seen=set(); ints={}; amin=2.0
    for q in rec:
        key=(int(q['i']),bool(q['reverse']));req(key not in seen,f'332 duplicate {key}');seen.add(key); a=Fraction(q['a_fraction']);b=Fraction(q['b_fraction']);ints.setdefault(int(q['i']),(a,b));req(ints[int(q['i'])]==(a,b),f'332 direction endpoints {q["i"]}'); amin=min(amin,float(q['alphaP_lower']));req(float(q['alphaP_lower'])>.90,f'332 alpha {key}')
    req(seen=={(i,r) for i in range(302) for r in (False,True)},'332 keyset')
    if len(ints)==302:
        req(ints[0][0]==0 and ints[301][1]==1,'332 outer endpoints')
        for i in range(301):req(ints[i][1]==ints[i+1][0],f'332 gap {i}')
    req(abs(amin-float(cov332['min_alpha44_lower']))<1e-12,'332 min alpha stored')
if stress332:req(stress332.get('PASS') is True and stress332.get('extended_min_alpha',0)>.90,'332 stress')
if cand332:req(cand332.get('PASS') is True,'332 candidate stored')

# ---------- shared 90-interval cover verifier for 422/431 ----------
def seg(a,b,w):
    out=[];x=a
    while x < b-1e-14:
        y=min(b,x+w);out.append((round(x,12),round(y,12)));x=y
    return out
expected=seg(0,.08,.004)+seg(.08,.2,.007)+seg(.2,.3,.011)+seg(.3,.5,.012)+seg(.5,1,.02)
req(len(expected)==90,'90 cover construction')
def verify90(base,profile,ath):
    allrec=[]
    for p in range(4):
        q=J(f'{base}/data/cover_part{p}of4.json')
        if q:
            req(q.get('profile')==profile and q.get('m')==44 and q.get('part')==p and q.get('parts')==4 and q.get('interval_count_total')==90,f'{profile} cover part {p} metadata'); allrec.extend(q.get('records',[]))
    req(len(allrec)==180,f'{profile} record count')
    seen={};
    for r in allrec:
        key=(round(r['a'],12),round(r['b'],12),bool(r['reverse']));req(key not in seen,f'{profile} duplicate');seen[key]=r;req(math.isfinite(r['alphaP_lower']) and r['alphaP_lower']>ath,f'{profile} alpha')
    for a,b in expected:
        for rev in (False,True):req((a,b,rev) in seen,f'{profile} missing {(a,b,rev)}')
    return min(r['alphaP_lower'] for r in allrec) if allrec else -1
amin422=verify90('theorem_422',[4,2,2],.89)
amin431=verify90('theorem_431/v3_base',[4,3,1],.91)
c422=J('theorem_422/data/THEOREM_422_CANDIDATE_VERIFICATION.json');mod422=J('theorem_422/data/MODULAR_CROSSCHECK.json');str422=J('theorem_422/data/STRUCTURAL_CROSSCHECK.json');m422=J('common/MONOTONICITY_422.json')
if c422:req(c422.get('PASS') is True,'422 candidate')
if mod422:req(mod422.get('PASS') is True,'422 modular')
if str422:req(str422.get('PASS') is True,'422 structural')
if m422:req(m422.get('PASS') is True and m422.get('C_prime_strictly_positive') is True,'422 monotonicity')

c431old=J('theorem_431/v3_base/data/THEOREM_431_CANDIDATE_VERIFICATION.json'); mod431=J('theorem_431/L220_upgrade/data/MODULAR_CROSSCHECK_431_L220.json');m431=J('common/MONOTONICITY_431_L220.json');str431=J('theorem_431/v3_base/data/STRUCTURAL_CROSSCHECK.json')
if c431old:req(c431old.get('PASS') is True,'431 v3 candidate')
if mod431:req(mod431.get('PASS') is True,'431 L220 modular')
if m431:req(m431.get('PASS') is True and m431.get('C_prime_strictly_positive') is True,'431 L220 monotonicity')
if str431:req(str431.get('PASS') is True,'431 structural')
# Bind L220 upgrade to exact same cover graph as v3.
try:
    req((ROOT/'theorem_431/L220_upgrade/data/pid3_edges.bin').read_bytes()==(ROOT/'theorem_431/v3_base/data/pid3_edges.bin').read_bytes(),'431 edges graph mismatch')
    req((ROOT/'theorem_431/L220_upgrade/data/pid3_sizes.bin').read_bytes()==(ROOT/'theorem_431/v3_base/data/pid3_sizes.bin').read_bytes(),'431 sizes mismatch')
except Exception as e: fail.append(f'431 graph bind: {e}')

# ---------- 521 ----------
base=J('theorem_521/data/finite_context_exact_pid4_L180_bernstein.json');sub=J('theorem_521/data/L180_exact_subdivision_20.json');final=J('theorem_521/data/THEOREM_521_FINAL_CERTIFICATE.json');hard=J('theorem_521/data/hard_endpoint_structure.json');mod521=J('theorem_521/new_modular/MODULAR_CROSSCHECK_521_L180.json');m521=J('common/MONOTONICITY_521.json')
if base:req(base.get('L')==180 and base.get('BERNSTEIN_ALL_POSITIVE') is True and base.get('G_nonzero_count')==0,'521 finite base')
if sub:req(sub.get('L')==180 and sub.get('subdivision')==20 and sub.get('all_numerator_bernstein_positive') is True,'521 subdivision')
# cover chunks
fwd=[];rev=[]
for fn in ['fwd200_000_050.json','fwd200_050_100.json','fwd200_100_150.json','fwd200_150_200.json','rev500_000_050.json','rev500_050_100.json','rev200_040_090.json','rev200_090_140.json','rev200_140_190.json','rev200_190_200.json']:
    q=J('theorem_521/raw_interval_chunks/'+fn)
    if q:req(q.get('all_pass') is True,'521 chunk '+fn);(fwd if fn.startswith('fwd') else rev).extend(q.get('intervals',[]))
req(len(fwd)==200 and len(rev)==260,'521 cover counts')
for arr,name in ((fwd,'fwd'),(rev,'rev')):
    arr.sort(key=lambda z:z['a'])
    if arr:
        req(abs(arr[0]['a'])<1e-14 and abs(arr[-1]['b']-1)<1e-14,'521 '+name+' endpoints')
        for u,v in zip(arr,arr[1:]):req(abs(u['b']-v['a'])<2e-12,'521 '+name+' gap')
        for z in arr:req(z['alphaP_lower']>.89,'521 '+name+' alpha')
if final:req(final.get('STATUS')=='COMPUTER_ASSISTED_THEOREM_PASS','521 final status')
if hard:
    rec=next((z for z in hard if z.get('profile')==[5,2,1]),None);req(rec is not None and rec.get('all_nondominant_singleton') and rec.get('nondominant_internal_same_scc_edges')==0 and rec.get('transient_dag_acyclic'),'521 hard endpoint')
if mod521:req(mod521.get('PASS') is True,'521 new modular')
if m521:req(m521.get('PASS') is True and m521.get('C_prime_strictly_positive') is True,'521 monotonicity')

# ---------- exact envelope ordering ----------
paths={'332':'theorem_332/data/L220_poly.txt','422':'theorem_422/data/L220_poly.txt','431':'theorem_431/L220_upgrade/data/L220_poly.txt','521':'theorem_521/../theorem_521_data_dummy'}
# 521 exact polynomial is added separately under new_modular.
paths['521']='theorem_521/new_modular/L180_poly.txt'
zs={k:parse_poly(v) for k,v in paths.items()}
tails={
 '332':tail(Fraction(9,10),Fraction(43,3),Fraction(25),5),
 '422':tail(Fraction(89,100),Fraction(43,3),Fraction(25),5),
 '431':tail(Fraction(91,100),Fraction(43,3),Fraction(25),5),
 '521':tail(Fraction(89,100),Fraction(12),Fraction(21),5),
}
env={}
for k,z in zs.items():
    c0=Cend(z,0);c1=Cend(z,1);req(c0<c1,f'{k} exact endpoint monotone direction'); env[k]=(c0-tails[k],c1+tails[k])
req(env['332'][1]<0,'332 sign envelope');req(env['422'][0]>0,'422 sign envelope');req(env['431'][0]>0,'431 sign envelope');req(env['521'][0]>0,'521 sign envelope')
gaps={'332_to_422':env['422'][0]-env['332'][1],'422_to_431':env['431'][0]-env['422'][1],'431_to_521':env['521'][0]-env['431'][1]}
for k,g in gaps.items():req(g>0,'ordering gap '+k)

out={'PAPER8_V4_VERIFICATION':'PASS' if not fail else 'FAIL','failures':fail,'min_alpha':{'332':cov332.get('min_alpha44_lower') if cov332 else None,'422':amin422,'431':amin431,'521':min([z['alphaP_lower'] for z in fwd+rev]) if fwd and rev else None},'infinite_envelopes':{k:[float(a),float(b)] for k,(a,b) in env.items()},'ordering_gaps':{k:float(v) for k,v in gaps.items()},'audit_boundary':['common 4*K*tau^B derivation external audit pending','fully directed-rounding / ball-arithmetic interval replay pending','external code review/replay pending'],'novelty_status':'NOT_ESTABLISHED','H9_opened':False,'PASS':not fail}
json.dump(out,open(ROOT/'PAPER8_V4_VERIFICATION.json','w'),indent=2);print(json.dumps(out,indent=2));sys.exit(0 if not fail else 1)
