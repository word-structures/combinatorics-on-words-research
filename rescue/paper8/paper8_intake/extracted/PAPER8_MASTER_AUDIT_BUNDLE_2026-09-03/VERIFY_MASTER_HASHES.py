#!/usr/bin/env python3
import hashlib, pathlib, sys
root=pathlib.Path(__file__).resolve().parent
manifest=root/'MASTER_SHA256SUMS.txt'
issues=[]; n=0
for line in manifest.read_text().splitlines():
    if not line.strip(): continue
    h, rel=line.split('  ',1); p=root/rel
    if not p.is_file(): issues.append(f'missing {rel}'); continue
    hh=hashlib.sha256(p.read_bytes()).hexdigest(); n+=1
    if hh!=h: issues.append(f'hash mismatch {rel}')
if issues:
    print('\n'.join(issues)); sys.exit(1)
print(f'PASS files={n}')
