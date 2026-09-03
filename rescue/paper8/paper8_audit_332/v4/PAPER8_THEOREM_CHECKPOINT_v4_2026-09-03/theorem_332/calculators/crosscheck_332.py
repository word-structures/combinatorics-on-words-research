from pathlib import Path
from fractions import Fraction
import hashlib,json,re
P=Path('L220_poly.txt')
lines=P.read_text().splitlines(); iF=lines.index('F');iG=lines.index('G');iN=lines.index('N0');iD=lines.index('D0');iE=lines.index('ENDPOLY')
base={'F':list(map(int,lines[iF+1:iG])),'G':list(map(int,lines[iG+1:iN])),'N0':list(map(int,lines[iN+1:iD])),'D0':list(map(int,lines[iD+1:iE]))}
def pmod_parse(path):
 ls=Path(path).read_text().splitlines(); out={}; marks={'F','G','N0','D0','END'};i=0
 while i<len(ls):
  s=ls[i]
  if s in {'F','G','N0','D0'}:
   name=s;i+=1;a=[]
   while i<len(ls) and ls[i] not in marks and not re.match(r'^(P|L|D|FDEG|GDEG) ',ls[i]): a.append(int(ls[i]));i+=1
   out[name]=a;continue
  if s.startswith('P '):out['P']=int(s.split()[1])
  i+=1
 return out
mods=[]
for prime in [1000000007,1000000009,998244353,1004535809]:
 q=pmod_parse(f'mod_L220_p{prime}.txt'); checks={}
 for name in ['F','G','N0','D0']:
  a,b=base[name],q[name]; checks[name]=len(a)==len(b) and all(x%prime==y for x,y in zip(a,b))
 mods.append({'prime':prime,'checks':checks,'PASS':all(checks.values())})
def ev(c,x):
 s=Fraction(0)
 for z in reversed(c):s=s*x+z
 return s
def C(x):return ev(base['F'],x)/(9*ev(base['N0'],x)*ev(base['D0'],x))
raw=Path('/mnt/data/p8_rebuild/PAPER8_THEOREM_CHECKPOINT_v2_2026-09-03/raw_research_state/p8work/C_dense_pid1.log').read_text().splitlines()
num=[]
for l in raw:
 _,xs,ys,*_=l.split(); x=Fraction(xs); exact=float(C(x)); ref=float(ys); num.append({'x':xs,'C_L220_exact_float':exact,'C_dense_independent':ref,'abs_diff':abs(exact-ref)})
out={
 'profile':[3,3,2], 'L':220,
 'sha256':{fn:hashlib.sha256(Path(fn).read_bytes()).hexdigest() for fn in ['L220_poly.txt','modular_crosscheck_outgoing.cpp','pid1_edges.bin','pid1_sizes.bin']},
 'modular_crosscheck':mods,'modular_all_pass':all(z['PASS'] for z in mods),
 'G_exact_zero':all(z==0 for z in base['G']),
 'independent_dense_comparison':num,
 'dense_max_abs_diff':max(z['abs_diff'] for z in num),
 'PASS':all(z['PASS'] for z in mods) and all(z==0 for z in base['G']) and max(z['abs_diff'] for z in num)<2e-9
}
Path('EXACT_CROSSCHECK_332.json').write_text(json.dumps(out,indent=2));print(json.dumps({k:v for k,v in out.items() if k not in ('independent_dense_comparison','modular_crosscheck')},indent=2))
