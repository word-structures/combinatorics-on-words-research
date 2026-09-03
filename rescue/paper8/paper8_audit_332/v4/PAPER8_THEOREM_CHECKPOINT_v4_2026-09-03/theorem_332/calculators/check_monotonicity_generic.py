from pathlib import Path
from math import comb
from fractions import Fraction
import json,sys,time
p=Path(sys.argv[1]); profile=list(map(int,sys.argv[2].split(','))); outp=Path(sys.argv[3])
ls=p.read_text().splitlines();iF=ls.index('F');iG=ls.index('G');iN=ls.index('N0');iD=ls.index('D0');iE=ls.index('ENDPOLY')
F=list(map(int,ls[iF+1:iG]));G=list(map(int,ls[iG+1:iN]));N=list(map(int,ls[iN+1:iD]));D=list(map(int,ls[iD+1:iE]))
for a in (F,G,N,D):
 while len(a)>1 and a[-1]==0:a.pop()
def conv(a,b):
 z=[0]*(len(a)+len(b)-1)
 for i,x in enumerate(a):
  if x:
   for j,y in enumerate(b):
    if y:z[i+j]+=x*y
 return z
def der(a):return [(i+1)*a[i+1] for i in range(len(a)-1)]
def ev(a,x):
 s=0
 for z in reversed(a):s=s*x+z
 return s
ND=conv(N,D); A=conv(der(F),ND); B=conv(F,der(ND)); m=max(len(A),len(B)); P=[(A[i] if i<len(A) else 0)-(B[i] if i<len(B) else 0) for i in range(m)]
while len(P)>1 and P[-1]==0:P.pop()
n=len(P)-1;t=time.time();neg=zero=0;min_i=None;min_num=None
for i in range(n+1):
 s=0
 for k in range(i+1):
  if P[k]:s+=P[k]*comb(n-k,i-k)
 if s<0:neg+=1
 if s==0:zero+=1
 if min_num is None or s*comb(n,min_i)<min_num*comb(n,i):min_num=s;min_i=i
 if i%200==0:print(profile,i,1 if s>0 else (-1 if s<0 else 0),flush=True)
C0=Fraction(ev(F,0),9*ev(N,0)*ev(D,0));C1=Fraction(ev(F,1),9*ev(N,1)*ev(D,1))
out={'profile':profile,'L':int(ls[0].split()[1]),'F_degree':len(F)-1,'derivative_numerator_degree':n,'G_exact_zero':not any(G),'N_nonnegative':all(x>=0 for x in N),'D_nonnegative':all(x>=0 for x in D),'bernstein_derivative_negative_count':neg,'bernstein_derivative_zero_count':zero,'C_prime_strictly_positive':neg==0 and zero==0,'C0_float':float(C0),'C1_float':float(C1),'min_bernstein_index':min_i,'PASS':neg==0 and zero==0 and not any(G) and all(x>=0 for x in N) and all(x>=0 for x in D),'seconds':time.time()-t}
outp.write_text(json.dumps(out,indent=2));print(json.dumps(out,indent=2));sys.exit(0 if out['PASS'] else 1)
