from pathlib import Path
import json,time
from math import comb
ls=Path('L220_poly.txt').read_text().splitlines();iF=ls.index('F');iG=ls.index('G');iN=ls.index('N0');iD=ls.index('D0');iE=ls.index('ENDPOLY')
F=list(map(int,ls[iF+1:iG])); H=[-x for x in F]; N=list(map(int,ls[iN+1:iD])); D=list(map(int,ls[iD+1:iE]))
while len(H)>1 and H[-1]==0:H.pop()
while len(N)>1 and N[-1]==0:N.pop()
while len(D)>1 and D[-1]==0:D.pop()
def conv(a,b):
 z=[0]*(len(a)+len(b)-1)
 for i,x in enumerate(a):
  if x:
   for j,y in enumerate(b):
    if y:z[i+j]+=x*y
 return z
def deriv(a):return [(i+1)*a[i+1] for i in range(len(a)-1)]
ND=conv(N,D); hp=deriv(H); ndp=deriv(ND); A=conv(H,ndp); B=conv(hp,ND); m=max(len(A),len(B)); Q=[(A[i] if i<len(A) else 0)-(B[i] if i<len(B) else 0) for i in range(m)]
while len(Q)>1 and Q[-1]==0:Q.pop()
n=len(Q)-1;t=time.time();neg=zero=0;mins=None;mini=None
# Independent identity: Bernstein b_i = S_i/C(n,i), S_i=sum_{k<=i} a_k*C(n-k,i-k).
for i in range(n+1):
 s=0
 for k in range(i+1):
  if Q[k]: s += Q[k]*comb(n-k,i-k)
 if s<0:neg+=1
 if s==0:zero+=1
 if mins is None or s*comb(n,mini) < mins*comb(n,i): # compare b_i=s/C(n,i)
  mins=s;mini=i
 if i%200==0:print(i,1 if s>0 else (-1 if s<0 else 0),flush=True)
out={'profile':[3,3,2],'degree':n,'identity':'b_i = S_i/binom(n,i), S_i=sum_{k=0}^i a_k binom(n-k,i-k)','negative_integer_numerators':neg,'zero_integer_numerators':zero,'all_global_bernstein_positive':neg==0 and zero==0,'min_bernstein_index':mini,'min_integer_numerator':str(mins),'PASS':neg==0 and zero==0,'seconds':time.time()-t}
Path('MONOTONICITY_INTEGER_CROSSCHECK.json').write_text(json.dumps(out,indent=2));print(json.dumps({k:v for k,v in out.items() if k!='min_integer_numerator'},indent=2))
if not out['PASS']:raise SystemExit(1)
