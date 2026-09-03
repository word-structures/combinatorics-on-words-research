#!/usr/bin/env python3
from pathlib import Path
import hashlib,sys
root=Path(__file__).resolve().parent
manifest=root/'SHA256SUMS.txt'
if not manifest.exists():
 print('FAIL missing SHA256SUMS.txt');sys.exit(10)
issues=[]; n=0
for ln in manifest.read_text().splitlines():
 if not ln.strip():continue
 try:h,rel=ln.split('  ',1)
 except ValueError:issues.append('malformed:'+ln);continue
 p=root/rel
 if not p.is_file():issues.append('missing:'+rel);continue
 got=hashlib.sha256(p.read_bytes()).hexdigest();n+=1
 if got!=h:issues.append('hash:'+rel)
print(('PASS' if not issues else 'FAIL'),f'files={n}',*(issues[:20]))
sys.exit(0 if not issues else 10)
