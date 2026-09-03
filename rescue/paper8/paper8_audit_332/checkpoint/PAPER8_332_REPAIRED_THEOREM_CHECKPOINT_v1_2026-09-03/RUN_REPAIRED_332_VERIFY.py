#!/usr/bin/env python3
from fractions import Fraction
from pathlib import Path
import hashlib,json,sys
ROOT=Path(__file__).resolve().parent
D=ROOT/'data'
issues=[]
def req(p):
    if not p.exists(): issues.append(f'missing:{p.relative_to(ROOT)}'); return False
    return True
def load(name):
    p=D/name
    if not req(p): return None
    try:return json.loads(p.read_text())
    except Exception as e: issues.append(f'bad_json:{name}:{e}');return None
# exact run
if req(ROOT/'raw_logs/332_giant_burn220_score308.exit'):
    if (ROOT/'raw_logs/332_giant_burn220_score308.exit').read_text().strip()!='0':issues.append('exact_run_exit_nonzero')
if req(ROOT/'raw_logs/332_giant_burn220_score308.log'):
    s=(ROOT/'raw_logs/332_giant_burn220_score308.log').read_text()
    for tok in ['burn 220 scored 308','Dmid 558 Dfull 705','Fdeg 1408 Gdeg 0','Exit status: 0']:
        if tok not in s: issues.append('exact_log_missing:'+tok)
# exact threshold certificate
half=load('BURNED_HALF_CERT_332_GMP.json')
poly=D/'BURNED_L220_R308_POLY.txt'
if req(poly) and half:
    sha=hashlib.sha256(poly.read_bytes()).hexdigest()
    if half.get('poly_sha256')!=sha: issues.append('threshold_poly_hash_mismatch')
    checks={
      'PASS':True,'G_zero':True,'N0_nonnegative_coeffs':True,'D0_nonnegative_coeffs':True,
      'bernstein_positive':1410,'bernstein_zero':0,'bernstein_negative':0,'first_nonpositive_index':-1,'H_degree':1409}
    for k,v in checks.items():
      if half.get(k)!=v:issues.append(f'threshold_{k}_mismatch:{half.get(k)}!={v}')
# fixed cover fail-closed
cover=load('FIXED_BIDIRECTIONAL_COVER.json')
if cover:
    if not cover.get('PASS') or not cover.get('complete') or not cover.get('all_pass'):issues.append('fixed_cover_not_pass')
    if cover.get('m')!=44 or cover.get('interval_count')!=302 or cover.get('record_count')!=604:issues.append('fixed_cover_metadata')
    recs=cover.get('records',[])
    if len(recs)!=604:issues.append('fixed_cover_record_len')
    by={}
    for r in recs:
      if not (float(r.get('alphaP_lower',-1))>0.90):issues.append(f'alpha_not_gt_090:{r.get("i")}:{r.get("reverse")}')
      by.setdefault(r.get('i'),{})[bool(r.get('reverse'))]=r
    if set(by)!=set(range(302)):issues.append('fixed_cover_interval_ids')
    last=Fraction(0)
    for i in range(302):
      d=by.get(i,{})
      if set(d)!={False,True}:issues.append(f'fixed_cover_directions:{i}');continue
      a=Fraction(d[False]['a_fraction']); b=Fraction(d[False]['b_fraction'])
      if Fraction(d[True]['a_fraction'])!=a or Fraction(d[True]['b_fraction'])!=b:issues.append(f'fixed_cover_direction_range:{i}')
      if a!=last:issues.append(f'fixed_cover_gap:{i}:{last}->{a}')
      if not b>a:issues.append(f'fixed_cover_nonpositive_width:{i}')
      last=b
    if last!=1:issues.append(f'fixed_cover_end:{last}')
# one-block projective certificate alignment
proj=load('BOUNDARY_PROJECTIVE_332_BURN1.json'); summ=load('ONE_BLOCK_PROJECTIVE_332_SUMMARY.json')
if proj and cover:
    pr=proj.get('records',[])
    if len(pr)!=604:issues.append('projective_record_len')
    cmap={(int(r['i']),bool(r['reverse'])):r for r in cover['records']}
    maxf=maxr=0.0
    for q in pr:
      key=(int(q['i']),bool(q['reverse'])); r=cmap.get(key)
      if r is None:issues.append(f'projective_missing_cover:{key}');continue
      if float(q['a'])!=float(r['a']) or float(q['b'])!=float(r['b']) or float(q['R_pf'])!=float(r['R']):issues.append(f'projective_cover_mismatch:{key}')
      if q['reverse']:maxr=max(maxr,float(q['boundary_rho_upper']))
      else:maxf=max(maxf,float(q['boundary_rho_upper']))
    # reverse=True is LEFT; reverse=False is RIGHT
    if not (maxr < 1.07):issues.append(f'left_oneblock_not_lt_1.07:{maxr}')
    if not (maxf < 1.10):issues.append(f'right_oneblock_not_lt_1.10:{maxf}')
    if summ:
      if not summ.get('PASS') or summ.get('theorem_bounds')!={'left':'107/100','right':'11/10'}:issues.append('projective_summary')
# exact rational burn + kernel + final margin
burn=load('BURN_ERROR_332_CERT.json'); kern=load('KERNEL_TAIL_332_SAFE.json')
if burn and kern:
    eb=Fraction(int(burn['burn_error_num']),int(burn['burn_error_den']))
    ek=Fraction(int(kern['tail_num']),int(kern['tail_den']))
    et=eb+ek
    stored=Fraction(int(burn['combined_error_num']),int(burn['combined_error_den']))
    if et!=stored:issues.append('combined_error_fraction_mismatch')
    if burn.get('contracted_rho_left')!='1000007/1000000' or burn.get('contracted_rho_right')!='100001/100000':issues.append('contracted_rho_orientation_labels')
    if not (et < Fraction(1,2)):issues.append(f'combined_error_not_lt_half:{et}')
    margin=Fraction(1,2)-et
    if margin!=Fraction(563534714369,4860000000000):issues.append(f'final_margin_unexpected:{margin}')
else: margin=None
# modular full coefficient crosscheck required
mod=load('MODULAR_CROSSCHECK_332_BURNED.json')
if mod:
    if not mod.get('PASS') or int(mod.get('prime_count',0))<4:issues.append('modular_crosscheck_not_full_pass')
    if req(poly) and mod.get('gmp_sha256')!=hashlib.sha256(poly.read_bytes()).hexdigest():issues.append('modular_gmp_hash_mismatch')
    primes=[int(x['prime']) for x in mod.get('modular_runs',[])]
    if len(set(primes))<4:issues.append('modular_prime_uniqueness')
    for rr in mod.get('modular_runs',[]):
      if not rr.get('PASS'):issues.append(f'modular_prime_fail:{rr.get("prime")}')
      for s in ['F','G','N0','D0']:
        if not rr.get('sections',{}).get(s,{}).get('PASS'):issues.append(f'modular_section_fail:{rr.get("prime")}:{s}')

# Directly recompute modular coefficient equality from packaged files (do not trust summary alone).
def parse_poly_text(path, modular=False):
    lines=path.read_text().splitlines(); sec=None; out={z:[] for z in ["F","G","N0","D0"]}; meta={}
    for ln in lines:
        if ln in out: sec=ln; continue
        if ln in ("ENDPOLY","END"): sec=None; continue
        if sec and ln.lstrip("-").isdigit(): out[sec].append(int(ln)); continue
        if sec is None:
            z=ln.split()
            if len(z)==2 and z[1].lstrip("-").isdigit(): meta[z[0]]=int(z[1])
    return meta,out
if req(poly):
    _,gpoly=parse_poly_text(poly)
    for prime in [1000000007,1000000009,998244353,1004535809]:
        mp=D/f"MODULAR_{prime}.txt"
        if not req(mp): continue
        mm,mq=parse_poly_text(mp,True)
        if mm.get("P")!=prime: issues.append(f"modular_prime_header:{prime}")
        for sec in ["F","G","N0","D0"]:
            ga=list(gpoly[sec]); ma=list(mq[sec])
            if sec in ("F","G"):
                while len(ga)>1 and ga[-1]==0: ga.pop()
                while len(ma)>1 and ma[-1]==0: ma.pop()
            if len(ga)!=len(ma): issues.append(f"modular_len:{prime}:{sec}:{len(ga)}!={len(ma)}"); continue
            for i,(a,b) in enumerate(zip(ga,ma)):
                if a%prime!=b:
                    issues.append(f"modular_coeff:{prime}:{sec}:{i}")
                    break

# compile warning logs should be empty
for name in ['certify_half_compile.err','mod_fast_compile.err']:
 p=ROOT/'raw_logs'/name
 if req(p) and p.stat().st_size!=0:issues.append(f'compiler_warnings:{name}')
# final
PASS=not issues
out={'checkpoint':'PAPER8_332_REPAIRED_THEOREM_CHECKPOINT_v1_2026-09-03','status':'INTERNAL_COMPUTER_ASSISTED_THEOREM_PASS' if PASS else 'FAIL','final_C_upper_margin_num':563534714369 if PASS else None,'final_C_upper_margin_den':4860000000000 if PASS else None,'final_statement':'C_332(x) < -563534714369/4860000000000 < 0 for all x in [0,1]' if PASS else None,'external_audit_pending':['directed-rounding/ball-arithmetic replay of interval generator'] if PASS else [],'issues':issues,'PASS':PASS}
(ROOT/'REPAIRED_332_VERIFICATION.json').write_text(json.dumps(out,indent=2))
print(json.dumps(out,indent=2))
sys.exit(0 if PASS else 10)
