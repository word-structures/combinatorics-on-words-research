from fractions import Fraction
from math import comb
import json,time
lines=open('/mnt/data/p8work/L180_poly.txt').read().splitlines()
iF=lines.index('F'); iG=lines.index('G'); iN=lines.index('N0'); iD=lines.index('D0'); iE=lines.index('ENDPOLY')
F=[int(x) for x in lines[iF+1:iG]]
N0=[int(x) for x in lines[iN+1:iD]]
D0=[int(x) for x in lines[iD+1:iE]]
while F and F[-1]==0:F.pop()
while N0 and N0[-1]==0:N0.pop()
while D0 and D0[-1]==0:D0.pop()
print('degrees',len(F)-1,len(N0)-1,len(D0)-1)

def eval_poly(c,x):
 s=Fraction(0)
 for a in reversed(c):s=s*x+a
 return s

def bernstein_subinterval(c,a,b,n=None):
 # polynomial c in power x; substitute x=a+h y to power q(y), pad degree n
 if n is None:n=len(c)-1
 h=b-a;q=[Fraction(0) for _ in range(n+1)]
 # q_j = h^j sum_{k>=j} c_k C(k,j) a^(k-j)
 # precompute powers
 ap=[Fraction(1)];hp=[Fraction(1)]
 for k in range(n):ap.append(ap[-1]*a);hp.append(hp[-1]*h)
 for j in range(n+1):
  s=Fraction(0)
  for k in range(j,min(len(c),n+1)):
   if c[k]:s += c[k]*comb(k,j)*ap[k-j]
  q[j]=s*hp[j]
 B=[]
 for ii in range(n+1):
  s=Fraction(0)
  for j in range(ii+1):
   if q[j]:s += q[j]*Fraction(comb(ii,j),comb(n,j))
  B.append(s)
 return B

def run(m):
 t=time.time();records=[]
 for i in range(m):
  a=Fraction(i,m);b=Fraction(i+1,m)
  B=bernstein_subinterval(F,a,b,len(F)-1);mn=min(B);mi=B.index(mn)
  den=9*eval_poly(N0,b)*eval_poly(D0,b) # nonnegative coeff => upper endpoint
  lo=mn/den
  records.append({'i':i,'a':str(a),'b':str(b),'bern_min_index':mi,'F_lower_num':str(mn.numerator),'F_lower_den':str(mn.denominator),'den_upper_num':str(den.numerator),'den_upper_den':str(den.denominator),'C_lower_num':str(lo.numerator),'C_lower_den':str(lo.denominator),'C_lower_float':float(lo)})
  print(i,float(lo), 'sec',time.time()-t,flush=True)
 g=min(records,key=lambda z:z['C_lower_float'])
 out={'L':180,'subdivision':m,'F_scaled9':True,'all_numerator_bernstein_positive':all(Fraction(int(r['F_lower_num']),int(r['F_lower_den']))>0 for r in records),'global_C_lower_float':g['C_lower_float'],'global_record':g,'records':records}
 json.dump(out,open(f'/mnt/data/h8cp/L180_exact_subdivision_{m}.json','w'),indent=2)
 print('GLOBAL',g['C_lower_float'],g['i'])
run(20)
