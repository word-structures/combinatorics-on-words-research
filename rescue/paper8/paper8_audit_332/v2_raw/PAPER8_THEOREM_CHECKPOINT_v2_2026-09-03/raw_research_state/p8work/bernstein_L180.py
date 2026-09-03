from fractions import Fraction
from math import comb
import json
lines=open('/mnt/data/p8work/L180_new.txt').read().splitlines();i=lines.index('F');j=lines.index('G');F=[int(x) for x in lines[i+1:j]];G=[]
# G ends before N0AT1
k=j+1
while k<len(lines) and not lines[k].startswith('N0AT1'):
    G.append(int(lines[k]));k+=1
N0=int(next(x.split()[1] for x in lines if x.startswith('N0AT1')));D0=int(next(x.split()[1] for x in lines if x.startswith('D0AT1')))
n=len(F)-1
B=[]
for ii in range(n+1):
    s=Fraction(0)
    for kk in range(ii+1):
        if F[kk]: s += Fraction(F[kk]*comb(ii,kk), comb(n,kk))
    B.append(s)
mn=min(B);mi=B.index(mn)
# F is 9-scaled curvature numerator
Clo=mn/Fraction(9*N0*D0,1)
out={'L':180,'F_degree':n,'F_negative_count':sum(x<0 for x in F),'G_nonzero_count':sum(x!=0 for x in G),'BERNSTEIN_ALL_POSITIVE':all(x>0 for x in B),'BERNSTEIN_MIN_INDEX':mi,'BERNSTEIN_MIN_NUM':str(mn.numerator),'BERNSTEIN_MIN_DEN':str(mn.denominator),'BERNSTEIN_MIN_FLOAT':float(mn),'N0_at_1':str(N0),'D0_at_1':str(D0),'C180_EXACT_LOWER_NUM':str(Clo.numerator),'C180_EXACT_LOWER_DEN':str(Clo.denominator),'C180_EXACT_LOWER_FLOAT':float(Clo),'F_coefficients_scaled9':[str(x) for x in F], 'BERNSTEIN_COEFFICIENTS_scaled9':[{'num':str(x.numerator),'den':str(x.denominator)} for x in B]}
json.dump(out,open('/mnt/data/h8cp/finite_context_exact_pid4_L180_bernstein.json','w'),indent=2)
print(json.dumps({k:v for k,v in out.items() if k not in ['F_coefficients_scaled9','BERNSTEIN_COEFFICIENTS_scaled9']},indent=2))
