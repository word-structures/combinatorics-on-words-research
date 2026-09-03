#!/usr/bin/env python3
from pathlib import Path
import hashlib,sys
R=Path(__file__).resolve().parent
m=R/'SHA256SUMS.txt'
fail=[];n=0
for line in m.read_text().splitlines():
    if not line.strip():continue
    h,rel=line.split('  ',1);p=R/rel;n+=1
    if not p.is_file():fail.append('missing '+rel);continue
    got=hashlib.sha256(p.read_bytes()).hexdigest()
    if got!=h:fail.append(f'hash {rel}: {got} != {h}')
print(('PASS' if not fail else 'FAIL'), 'files=',n)
for x in fail:print(x)
sys.exit(0 if not fail else 1)
