from fractions import Fraction
from math import comb
import json,sys,time
p=sys.argv[1]; m=int(sys.argv[2]); outp=sys.argv[3]
lines=open(p).read().splitlines();iF=lines.index('F');iG=lines.index('G');iN=lines.index('N0');iD=lines.index('D0');iE=lines.index('ENDPOLY')
F=[int(x) for x in lines[iF+1:iG]];G=[int(x) for x in lines[iG+1:iN]];N0=[int(x) for x in lines[iN+1:iD]];D0=[int(x) for x in lines[iD+1:iE]]
while len(F)>1 and F[-1]==0:F.pop()
while len(G)>1 and G[-1]==0:G.pop()
while len(N0)>1 and N0[-1]==0:N0.pop()
while len(D0)>1 and D0[-1]==0:D0.pop()
L=int(lines[0].split()[1]); print('degrees',len(F)-1,len(G)-1,len(N0)-1,len(D0)-1,'Gnonzero',sum(x!=0 for x in G),flush=True)

def eval_poly(c,x):
 s=Fraction(0)
 for z in reversed(c):s=s*x+z
 return s

def bernstein_subinterval(c,a,b):
 n=len(c)-1; h=b-a; q=[Fraction(0) for _ in range(n+1)]
 ap=[Fraction(1)];hp=[Fraction(1)]
 for k in range(n):ap.append(ap[-1]*a);hp.append(hp[-1]*h)
 for j in range(n+1):
  s=Fraction(0)
  for k in range(j,n+1):
   if c[k]:s+=c[k]*comb(k,j)*ap[k-j]
  q[j]=s*hp[j]
 B=[]
 for ii in range(n+1):
  s=Fraction(0)
  for j in range(ii+1):
   if q[j]:s+=q[j]*Fraction(comb(ii,j),comb(n,j))
  B.append(s)
 return B
records=[];t=time.time()
for ii in range(m):
 a=Fraction(ii,m);b=Fraction(ii+1,m);B=bernstein_subinterval(F,a,b);mn=min(B);mi=B.index(mn)
 # N0,D0 have nonnegative path-count coeffs => increasing on [0,1]; denominator max at b
 den=9*eval_poly(N0,b)*eval_poly(D0,b);lo=mn/den
 records.append({'i':ii,'a':str(a),'b':str(b),'bern_min_index':mi,'F_lower_num':str(mn.numerator),'F_lower_den':str(mn.denominator),'C_lower_num':str(lo.numerator),'C_lower_den':str(lo.denominator),'C_lower_float':float(lo)})
 print(ii,float(lo),'sec',time.time()-t,flush=True)
g=min(records,key=lambda z:z['C_lower_float'])
out={'profile':[4,2,2],'L':L,'subdivision':m,'F_degree':len(F)-1,'G_nonzero_count':sum(x!=0 for x in G),'all_numerator_bernstein_positive':all(Fraction(int(r['F_lower_num']),int(r['F_lower_den']))>0 for r in records),'global_C_lower_float':g['C_lower_float'],'global_record':g,'records':records}
json.dump(out,open(outp,'w'),indent=2);print('GLOBAL',g['C_lower_float'],g['i'],flush=True)
