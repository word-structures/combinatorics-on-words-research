from pathlib import Path
import importlib.util, hashlib, json
from fractions import Fraction
import sympy as sp

HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('p6',HERE/'p6_semantics_audit.py'); p6=importlib.util.module_from_spec(spec); spec.loader.exec_module(p6)
x=sp.symbols('x')

def make_cases():
 B4=p6.library(4); ps={(2,1,1),(1,2,1),(1,1,2)}
 B5=p6.library(5)
 return [
  ('BAL3_L4_AA2FR',[w for w in B4 if p6.parikh(w) in ps],6),
  ('INTERIOR_L5_AA2FR',[w for w in B5 if all(z>=1 for z in p6.parikh(w))],5),
  ('HASH30_L4_AA2FR',sorted(B4,key=lambda w:(hashlib.sha256(w.encode()).hexdigest(),w))[:30],5),
  ('ALL_L4_AA2FR',B4,5),
  ('ALL_L4_AA2FR',B4,6),
 ]

def matmul(A,B):
 n=len(A); m=len(B); q=len(B[0])
 return [[sum(A[i][k]*B[k][j] for k in range(m)) for j in range(q)] for i in range(n)]

def rank_mod(A,p=1000003): return p6.mod_rank_and_pivots(A,p)[0]

def audit(name,B,K):
 states,edges,labels,init=p6.build(B,K); eq=p6.equitable(states,edges); Q,groups,rem=p6.quotient(states,edges,eq)
 r,coef,ranks=p6.krylov_exact_rank(Q)
 # polynomial x^r - sum c_i x^i
 poly=sp.Poly(x**r-sum(sp.Rational(c.numerator,c.denominator)*x**i for i,c in enumerate(coef)),x)
 # all current coefficients are integral in tested cases; record rational if not
 val=0; qpoly=poly
 while qpoly.nth(0)==0:
  qpoly=sp.Poly(sp.div(qpoly.as_expr(),x)[0],x); val+=1
 # factor degrees over Q
 factors=sp.factor_list(qpoly.as_expr())[1]
 factor_degrees=[(int(sp.degree(f,x)),int(e), str(f) if sp.degree(f,x)<=2 else None) for f,e in factors]
 # ranks Q^k until stable (two consecutive equal) or 20
 ranks_power=[]; X=[row[:] for row in Q]; prev=None; stable_at=None
 for k in range(1,21):
  rr=rank_mod(X); ranks_power.append(rr)
  if prev==rr and stable_at is None: stable_at=k-1
  if stable_at is not None and k>=stable_at+2: break
  prev=rr; X=matmul(X,Q)
 # tail krylov dimension from v_val onward, modular exact candidate and theoretical = r-val if polynomial minimal valuation
 v=[1]*len(Q); vecs=[]
 for n in range(r+val+2):
  if n>=val: vecs.append(v)
  v=p6.matvec(Q,v)
 A=[[vecs[j][i] for j in range(r-val)] for i in range(len(Q))]
 tailrank=rank_mod(A)
 return {
  'library':name,'Kmax':K,'blocks':len(B),'quotient_classes':len(Q),'exact_krylov_rank':r,
  'recurrence_x_valuation':val,'tail_krylov_rank_mod':tailrank,'nonzero_recurrence_degree':r-val,
  'Q_power_ranks':ranks_power,'stable_image_rank_mod':ranks_power[-1],
  'rational_factor_degrees_after_removing_x':factor_degrees,
  'recurrence_coefficients_integral':all(c.denominator==1 for c in coef)
 }

out=[]
for case in make_cases():
 print('RUN',case[0],case[2],flush=True)
 a=audit(*case); out.append(a); print(json.dumps(a,indent=2),flush=True)
(HERE/'P6_ASYMPTOTIC_FUTURE_RESULTS_v0.1.json').write_text(json.dumps(out,indent=2))
