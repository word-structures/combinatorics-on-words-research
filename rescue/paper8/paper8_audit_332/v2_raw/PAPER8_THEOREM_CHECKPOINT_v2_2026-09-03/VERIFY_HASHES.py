#!/usr/bin/env python3
from pathlib import Path
import hashlib
R=Path(__file__).resolve().parent
for line in (R/'SHA256SUMS.txt').read_text().splitlines():
    h,rel=line.split('  ',1); p=R/rel
    if hashlib.sha256(p.read_bytes()).hexdigest()!=h: raise SystemExit('HASH FAIL: '+rel)
print('PACKAGE_HASH_VERIFICATION = PASS')
