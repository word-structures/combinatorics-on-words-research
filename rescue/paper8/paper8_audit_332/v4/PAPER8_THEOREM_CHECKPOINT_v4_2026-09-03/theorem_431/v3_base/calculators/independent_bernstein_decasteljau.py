from fractions import Fraction
from math import comb
from pathlib import Path
import json, sys
poly_path=Path(sys.argv[1]); ref_path=Path(sys.argv[2]); out_path=Path(sys.argv[3])
ls=poly_path.read_text().splitlines(); iF=ls.index('F');iG=ls.index('G');iN=ls.index('N0');iD=ls.index('D0');iE=ls.index('ENDPOLY')
F=[int(x) for x in ls[iF+1:iG]];G=[int(x) for x in ls[iG+1:iN]];N=[int(x) for x in ls[iN+1:iD]];D=[int(x) for x in ls[iD+1:iE]]
while len(F)>1 and F[-1]==0:F.pop()
while len(G)>1 and G[-1]==0:G.pop()
while len(N)>1 and N[-1]==0:N.pop()
while len(D)>1 and D[-1]==0:D.pop()
assert not any(G), 'G must vanish identically'
assert all(x>=0 for x in N) and all(x>=0 for x in D), 'path-count denominator coefficients must be nonnegative'
n=len(F)-1
# Independent route: convert once to global Bernstein coefficients on [0,1], then use exact de Casteljau subdivision.
B=[]
for i in range(n+1):
    s=Fraction(0)
    for k in range(i+1):
        if F[k]: s += Fraction(F[k]*comb(i,k), comb(n,k))
    B.append(s)

def split_bern(b,t):
    levels=[list(b)]
    for _ in range(len(b)-1):
        p=levels[-1]
        levels.append([(1-t)*p[j]+t*p[j+1] for j in range(len(p)-1)])
    left=[levels[j][0] for j in range(len(b))]
    right=[levels[len(b)-1-j][j] for j in range(len(b))]
    return left,right

def eval_nonneg(c,x):
    # Exact Horner; coefficients verified >=0.
    s=Fraction(0)
    for z in reversed(c):s=s*x+z
    return s

records=[]; rem=B
for i in range(10):
    # rem is polynomial on [i/10,1]; split off next tenth at relative t=1/(10-i).
    if i<9:
        left,rem=split_bern(rem,Fraction(1,10-i))
    else:
        left=rem
    mn=min(left); idx=left.index(mn); b=Fraction(i+1,10)
    den=9*eval_nonneg(N,b)*eval_nonneg(D,b)
    lo=mn/den
    records.append({'i':i,'bern_min_index':idx,'F_lower_num':str(mn.numerator),'F_lower_den':str(mn.denominator),'C_lower_num':str(lo.numerator),'C_lower_den':str(lo.denominator),'C_lower_float':float(lo)})
ref=json.load(open(ref_path)); assert len(ref['records'])==10
checks=[]
for a,b in zip(records,ref['records']):
    ok=(a['F_lower_num']==b['F_lower_num'] and a['F_lower_den']==b['F_lower_den'] and a['C_lower_num']==b['C_lower_num'] and a['C_lower_den']==b['C_lower_den'] and a['bern_min_index']==b['bern_min_index'])
    checks.append(ok)
out={'method':'global Bernstein + exact sequential de Casteljau','degree':n,'G_identically_zero':True,'N_nonnegative':True,'D_nonnegative':True,'recordwise_exact_match':all(checks),'records':records,'PASS':all(checks) and all(Fraction(int(r['F_lower_num']),int(r['F_lower_den']))>0 for r in records)}
json.dump(out,open(out_path,'w'),indent=2)
print(json.dumps({k:v for k,v in out.items() if k!='records'},indent=2))
if not out['PASS']: raise SystemExit(1)
