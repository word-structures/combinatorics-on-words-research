from pathlib import Path
import json,re,hashlib
basep=Path('../L220_poly.txt')
ls=basep.read_text().splitlines(); iF=ls.index('F');iG=ls.index('G');iN=ls.index('N0');iD=ls.index('D0');iE=ls.index('ENDPOLY')
base={'F':list(map(int,ls[iF+1:iG])),'G':list(map(int,ls[iG+1:iN])),'N0':list(map(int,ls[iN+1:iD])),'D0':list(map(int,ls[iD+1:iE]))}
def parse(p):
    q=Path(p).read_text().splitlines(); out={}; marks={'F','G','N0','D0','END'};i=0
    while i<len(q):
      s=q[i]
      if s in {'F','G','N0','D0'}:
        name=s;i+=1;a=[]
        while i<len(q) and q[i] not in marks and not re.match(r'^(P|L|D|FDEG|GDEG) ',q[i]):a.append(int(q[i]));i+=1
        out[name]=a;continue
      if s.startswith('P '):out['P']=int(s.split()[1])
      i+=1
    return out
mods=[]
for p in [1000000007,1000000009,998244353,1004535809]:
    q=parse(f'mod_L220_p{p}.txt'); checks={}
    for name in ['F','G','N0','D0']:
      a,b=base[name],q[name]
      checks[name]={'lengths_equal':len(a)==len(b),'coefficients_equal':len(a)==len(b) and all(x%p==y for x,y in zip(a,b)),'n':len(a)}
    mods.append({'prime':p,'checks':checks,'PASS':all(z['coefficients_equal'] for z in checks.values())})
out={'profile':[4,3,1],'L':220,'D':196,'G_exact_zero':all(x==0 for x in base['G']),'modular':mods,'PASS':all(m['PASS'] for m in mods) and all(x==0 for x in base['G']), 'sha256':{f:hashlib.sha256(Path(f).read_bytes()).hexdigest() for f in ['../L220_poly.txt','modular_crosscheck_outgoing.cpp','../pid3_edges.bin','../pid3_sizes.bin']}}
Path('../MODULAR_CROSSCHECK_431_L220.json').write_text(json.dumps(out,indent=2))
print(json.dumps({'PASS':out['PASS'],'G_exact_zero':out['G_exact_zero'],'prime_passes':[m['PASS'] for m in mods],'lengths':{k:len(v) for k,v in base.items()}},indent=2))
