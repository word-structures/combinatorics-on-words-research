#!/usr/bin/env python3
from __future__ import annotations
import hashlib, json, pathlib, subprocess, tempfile, zipfile, sys

ROOT = pathlib.Path(__file__).resolve().parent
ARCH = ROOT / "archives"
EXPECTED = {
    "PAPER8_THEOREM_CHECKPOINT_v2_2026-09-03.zip": "5b8a4881b3aa29534f0208fd1a78daaa316f9cd9d727db2cb23afaeb7988935c",
    "PAPER8_THEOREM_CHECKPOINT_v3_2026-09-03.zip": "97982664d1c1c491994118421e7b9d2f7995ad6fccfec9b2516836a4b1314ab1",
    "PAPER8_THEOREM_CHECKPOINT_v4_2026-09-03.zip": "974fe207dfb2e55b73b6d544541f4ef626329eee5ea8c3712f690336a7db0782",
    "PAPER8_332_REPAIRED_THEOREM_CHECKPOINT_v1_2026-09-03.zip": "1de45d3583e65945f5fd35667d2aa7ad6a622203e27ac2ff870effabbc000f3c",
}

def sha256(p: pathlib.Path) -> str:
    h=hashlib.sha256()
    with p.open('rb') as f:
        for b in iter(lambda:f.read(1<<20), b''): h.update(b)
    return h.hexdigest()

def run(cmd, cwd):
    cp=subprocess.run(cmd,cwd=cwd,text=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
    return cp.returncode, cp.stdout

out={"archive_hashes":{},"checkpoint_fast_replay":{},"canonical_warning":{
    "v4_generic_4K_tauB_tail":"REJECTED_NOT_USED",
    "v2_v3_v4_PASS_labels":"HISTORICAL_PACKAGE_PASS_NOT_CURRENT_INFINITE_VOLUME_PROOF",
    "current_repaired_infinite_volume_profile":"(3,3,2)_ONLY"
},"issues":[]}

for name,exp in EXPECTED.items():
    p=ARCH/name
    if not p.exists():
        out["issues"].append(f"missing archive {name}")
        continue
    got=sha256(p)
    ok=(got==exp)
    out["archive_hashes"][name]={"expected":exp,"actual":got,"PASS":ok}
    if not ok: out["issues"].append(f"archive hash mismatch {name}")

if not out["issues"]:
  with tempfile.TemporaryDirectory(prefix="paper8_master_audit_") as td:
    td=pathlib.Path(td)
    for name in EXPECTED:
        with zipfile.ZipFile(ARCH/name) as z: z.extractall(td)
    tests=[
      ("v2_root", [sys.executable,"RUN_THEOREM_521_VERIFY.py"], td/"PAPER8_THEOREM_CHECKPOINT_v2_2026-09-03"),
      ("v2_hash", [sys.executable,"VERIFY_HASHES.py"], td/"PAPER8_THEOREM_CHECKPOINT_v2_2026-09-03"),
      ("v3_root", [sys.executable,"RUN_PAPER8_V3_VERIFY.py"], td/"PAPER8_THEOREM_CHECKPOINT_v3_2026-09-03"),
      ("v4_root", [sys.executable,"RUN_PAPER8_V4_VERIFY.py"], td/"PAPER8_THEOREM_CHECKPOINT_v4_2026-09-03"),
      ("v4_hash", [sys.executable,"VERIFY_HASHES.py"], td/"PAPER8_THEOREM_CHECKPOINT_v4_2026-09-03"),
      ("repaired332_root", [sys.executable,"RUN_REPAIRED_332_VERIFY.py"], td/"PAPER8_332_REPAIRED_THEOREM_CHECKPOINT_v1_2026-09-03"),
      ("repaired332_hash", [sys.executable,"VERIFY_HASHES.py"], td/"PAPER8_332_REPAIRED_THEOREM_CHECKPOINT_v1_2026-09-03"),
    ]
    for label,cmd,cwd in tests:
        rc,txt=run(cmd,cwd)
        ok=rc==0 and ("PASS" in txt or "true" in txt.lower())
        out["checkpoint_fast_replay"][label]={"returncode":rc,"PASS":ok,"tail":"\n".join(txt.splitlines()[-12:])}
        if not ok: out["issues"].append(f"fast replay failed {label}")

out["PASS"]=not out["issues"]
print(json.dumps(out,indent=2))
sys.exit(0 if out["PASS"] else 1)
