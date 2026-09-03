#!/usr/bin/env python3
import json,sys,hashlib
from pathlib import Path

def parse_gmp(p):
    lines=Path(p).read_text().splitlines(); sec=None; q={s:[] for s in ['F','G','N0','D0']}; meta={}
    for ln in lines:
        if ln in q: sec=ln; continue
        if ln in ('ENDPOLY','END'): sec=None; continue
        if sec and ln.lstrip('-').isdigit(): q[sec].append(int(ln)); continue
        if sec is None:
            z=ln.split()
            if len(z)==2 and z[1].lstrip('-').isdigit(): meta[z[0]]=int(z[1])
    return meta,q

def parse_mod(p):
    lines=Path(p).read_text().splitlines(); sec=None; q={s:[] for s in ['F','G','N0','D0']}; meta={}
    for ln in lines:
        if ln in q: sec=ln; continue
        if ln=='END': sec=None; continue
        if sec and ln.isdigit(): q[sec].append(int(ln)); continue
        if sec is None:
            z=ln.split()
            if len(z)==2 and z[1].isdigit(): meta[z[0]]=int(z[1])
    return meta,q

gmp=sys.argv[1]; mods=sys.argv[2:-1] if sys.argv[-1].endswith('.json') else sys.argv[2:]
meta,gq=parse_gmp(gmp)
res=[]; allpass=True
for mp in mods:
    mm,mq=parse_mod(mp); P=mm['P']; sect={}; ok=True
    for s in ['F','G','N0','D0']:
        # trailing zeros are semantically coefficients too; modular F/G are trimmed, GMP F/G are as emitted
        ga=gq[s]
        ma=mq[s]
        # normalize trailing zeros for F/G only
        if s in ('F','G'):
            while len(ga)>1 and ga[-1]==0: ga=ga[:-1]
            while len(ma)>1 and ma[-1]==0: ma=ma[:-1]
        n=max(len(ga),len(ma)); mismatch=[]
        for i in range(n):
            gv=(ga[i] if i<len(ga) else 0)%P
            mv=(ma[i] if i<len(ma) else 0)
            if gv!=mv:
                mismatch.append({'i':i,'gmp_mod':gv,'modular':mv})
                if len(mismatch)>=5: break
        secok=(len(ga)==len(ma) and not mismatch)
        sect[s]={'gmp_count':len(ga),'modular_count':len(ma),'PASS':secok,'first_mismatches':mismatch}
        ok &= secok
    res.append({'prime':P,'file':str(mp),'sha256':hashlib.sha256(Path(mp).read_bytes()).hexdigest(),'sections':sect,'PASS':ok})
    allpass &= ok
out={'gmp_poly':gmp,'gmp_sha256':hashlib.sha256(Path(gmp).read_bytes()).hexdigest(),'modular_runs':res,'prime_count':len(res),'PASS':allpass and len(res)>=4}
outp=Path(sys.argv[-1]) if sys.argv[-1].endswith('.json') else Path('MODULAR_CROSSCHECK_332_BURNED.json')
outp.write_text(json.dumps(out,indent=2))
print(json.dumps(out,indent=2))
sys.exit(0 if out['PASS'] else 10)
