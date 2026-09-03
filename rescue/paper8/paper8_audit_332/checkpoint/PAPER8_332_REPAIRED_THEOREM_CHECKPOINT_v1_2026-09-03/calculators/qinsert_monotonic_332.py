from pathlib import Path
from math import comb
from fractions import Fraction
import json,hashlib
P=Path('/mnt/data/PAPER8_BURN_REPAIR/PAPER8_THEOREM_CHECKPOINT_v4_2026-09-03/theorem_332/data/L220_poly.txt')
L=P.read_text().splitlines()
def sec(a,b):
 i=L.index(a)+1;j=L.index(b);return [int(x) for x in L[i:j]]
N=sec('N0','D0');D=sec('D0','ENDPOLY')
def deriv(a):return [(i+1)*a[i+1] for i in range(len(a)-1)]
def conv(a,b):
 z=[0]*(len(a)+len(b)-1)
 for i,x in enumerate(a):
  if x:
   for j,y in enumerate(b):
    if y:z[i+j]+=x*y
 return z
A=conv(deriv(N),D);B=conv(N,deriv(D));nmax=max(len(A),len(B));Q=[(A[i] if i<len(A) else 0)-(B[i] if i<len(B) else 0) for i in range(nmax)]
while len(Q)>1 and Q[-1]==0:Q.pop()
n=len(Q)-1; neg=zero=0
for i in range(n+1):
 s=sum(Q[k]*comb(n-k,i-k) for k in range(min(i,len(Q)-1)+1))
 neg+=s<0;zero+=s==0
q0=Fraction(N[0],D[0]);q1=Fraction(sum(N),sum(D))
out={'profile':[3,3,2],'object':'q_insert_L220=N0/D0','derivative_numerator_degree':n,'bernstein_negative_count':neg,'bernstein_zero_count':zero,'all_positive':neg==0 and zero==0,'q0_num':q0.numerator,'q0_den':q0.denominator,'q0_float':float(q0),'q1_float':float(q1),'poly_sha256':hashlib.sha256(P.read_bytes()).hexdigest(),'PASS':neg==0 and zero==0}
json.dump(out,open('/mnt/data/PAPER8_BURN_REPAIR/QINSERT_MONOTONIC_332.json','w'),indent=2);print(json.dumps(out,indent=2))
