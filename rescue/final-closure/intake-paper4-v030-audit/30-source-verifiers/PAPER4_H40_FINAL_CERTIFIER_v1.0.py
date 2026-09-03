#!/usr/bin/env python3
"""
Paper 4 one-command fail-closed H40 certifier.

Input:
    six lines
        a WORD
        b WORD
        ...
        f WORD

Default pipeline:
    Gate S/K  prescribed length-40 roles / affine-lift incidence
    Gate F    exact finite p=2..40 check over all 22 actual h6 trigrams
    Gate T    exact outer-parent generation + fail-closed h6 source realizability

Exit codes:
    0  CERTIFIED (finite PASS + Gate T PASS)
    2  mathematical FAIL with exact witness / obstruction
    3+ execution / input / infrastructure failure

Important:
- no h=8 computation
- no D40 data
- a stronger absent-macro-factor pruning condition is never used
"""

from __future__ import annotations
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
from fractions import Fraction

MACROS = "abcdef"
TER = "abc"

ROLES = {
    "a": (15,14,11),
    "b": (11,12,17),
    "c": (10,14,16),
    "d": (12,10,18),
    "e": (13,16,11),
    "f": (19,11,10),
}

G3 = [
    [5,1,0,2,3,9],
    [4,2,4,0,6,1],
    [1,7,6,8,1,0],
]

H6_TRIGRAMS = (
    "ace adf afe bce bdc bdf cbc cbd cea ceb dcb "
    "dfa dfb eac ead eaf ebc ebd fad faf fbd fea"
).split()

EXPECTED_BIGRAMS = set(
    "ac ad af bc bd cb ce dc df ea eb fa fb fe".split()
)

def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()

def parse_input(path: Path):
    H = {}
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        p = line.split()
        if len(p) != 2 or p[0] not in MACROS:
            raise ValueError(f"bad input line: {raw!r}")
        if p[0] in H:
            raise ValueError(f"duplicate role {p[0]}")
        H[p[0]] = p[1]
    if set(H) != set(MACROS):
        raise ValueError(f"need exactly roles {MACROS}; got {''.join(sorted(H))}")
    return H

def parikh(s: str):
    v = [0,0,0]
    for ch in s:
        if ch not in TER:
            raise ValueError(f"non-ternary symbol {ch!r}")
        v[ord(ch)-97] += 1
    return tuple(v)

def rref(mat):
    A = [[Fraction(x) for x in row] for row in mat]
    m, n = len(A), len(A[0])
    row = 0
    pivots = []
    for col in range(n):
        pivot = next((r for r in range(row,m) if A[r][col] != 0), None)
        if pivot is None:
            continue
        A[row], A[pivot] = A[pivot], A[row]
        p = A[row][col]
        A[row] = [x/p for x in A[row]]
        for r in range(m):
            if r != row and A[r][col] != 0:
                f = A[r][col]
                A[r] = [A[r][c] - f*A[row][c] for c in range(n)]
        pivots.append(col)
        row += 1
        if row == m:
            break
    return A, pivots

def profile_kernel_gate(H):
    details = {}
    for x in MACROS:
        if len(H[x]) != 40:
            return False, {"reason":"LENGTH", "role":x, "got":len(H[x]), "expected":40}
        try:
            pv = parikh(H[x])
        except ValueError as e:
            return False, {"reason":"ALPHABET", "role":x, "message":str(e)}
        details[x] = pv
        if pv != ROLES[x]:
            return False, {
                "reason":"PARIKH", "role":x,
                "got":list(pv), "expected":list(ROLES[x])
            }

    M = [[ROLES[x][r] for x in MACROS] for r in range(3)]
    expected = [[G3[r][c] + 10 for c in range(6)] for r in range(3)]
    if M != expected:
        return False, {"reason":"INCIDENCE_AFFINE_LIFT_INTERNAL_ERROR"}

    r1,p1 = rref(G3)
    r2,p2 = rref(M)
    if p1 != p2 or r1 != r2:
        return False, {"reason":"KERNEL_RREF_INTERNAL_ERROR"}

    return True, {
        "roles": {x:list(details[x]) for x in MACROS},
        "incidence": M,
        "kernel_equal_by_exact_rref": True
    }

def prefix_counts(s: str):
    P = [[0,0,0] for _ in range(len(s)+1)]
    for i,ch in enumerate(s):
        P[i+1] = P[i].copy()
        P[i+1][ord(ch)-97] += 1
    return P

def finite_first_violation(H):
    """
    Exact p=2..40 gate.

    An Abelian square with half-period p<=40 has total length <=80.
    With length-40 blocks, every such factor occurring in H(h6^omega(a))
    lies inside the image of some actual h6 trigram.
    """
    checked_windows = 0
    for tri in H6_TRIGRAMS:
        s = H[tri[0]] + H[tri[1]] + H[tri[2]]
        P = prefix_counts(s)
        n = len(s)
        for p in range(2, 41):
            for st in range(0, n - 2*p + 1):
                checked_windows += 1
                eq = True
                for c in range(3):
                    if P[st+p][c]-P[st][c] != P[st+2*p][c]-P[st+p][c]:
                        eq = False
                        break
                if eq:
                    half1 = [P[st+p][c]-P[st][c] for c in range(3)]
                    return {
                        "trigram": tri,
                        "start": st,
                        "half_period": p,
                        "factor": s[st:st+2*p],
                        "half_parikh": half1,
                        "checked_windows_before_witness": checked_windows,
                    }, checked_windows
    return None, checked_windows

def derive_bigrams_from_trigrams():
    b = set()
    for t in H6_TRIGRAMS:
        b.add(t[:2]); b.add(t[1:])
    return b

def compile_cpp(src: Path, exe: Path):
    cmd = ["g++","-O3","-std=c++17",str(src),"-o",str(exe)]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(
            f"compile failed for {src.name}\nSTDOUT:\n{r.stdout}\nSTDERR:\n{r.stderr}"
        )
    return cmd

def run_cmd(cmd, timeout=120):
    return subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)

def extract_final_status(text: str):
    status = None
    for line in text.splitlines():
        if line.startswith("STATUS "):
            status = line[len("STATUS "):].strip()
    return status

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input", type=Path)
    ap.add_argument("--workdir", type=Path, default=None,
                    help="directory for generated parent/certificate files")
    ap.add_argument("--gate-t-only", action="store_true",
                    help="regression/debug mode: skip finite p=2..40 gate")
    ap.add_argument("--keep-temp", action="store_true")
    ap.add_argument("--outer-src", type=Path,
                    default=Path("/mnt/data/PAPER4_GATET_H40_OUTER_PARENT_GENERATOR_v0.1.cpp"))
    ap.add_argument("--realizability-src", type=Path,
                    default=Path("/mnt/data/PAPER4_GATET_SOURCE_REALIZABILITY_FAILCLOSED_v0.2.cpp"))
    args = ap.parse_args()

    result = {
        "tool":"PAPER4_H40_FINAL_CERTIFIER",
        "version":"1.0",
        "input":str(args.input),
        "input_sha256":None,
        "gate_profile_kernel":"NOT_RUN",
        "gate_finite_p2_p40":"NOT_RUN",
        "gate_T_p_gt_40":"NOT_RUN",
        "status":"INFRASTRUCTURE_ERROR",
    }

    try:
        result["input_sha256"] = sha256_file(args.input)
        H = parse_input(args.input)
    except Exception as e:
        result["status"]="INPUT_ERROR"
        result["error"]=str(e)
        print(json.dumps(result,indent=2))
        return 3

    # Exact h6 factor-language regression embedded in the wrapper.
    derived = derive_bigrams_from_trigrams()
    if derived != EXPECTED_BIGRAMS or len(H6_TRIGRAMS) != 22:
        result["status"]="INTERNAL_FACTOR_LANGUAGE_ERROR"
        result["factor_language"]={
            "derived_bigrams":sorted(derived),
            "expected_bigrams":sorted(EXPECTED_BIGRAMS),
            "trigram_count":len(H6_TRIGRAMS),
        }
        print(json.dumps(result,indent=2))
        return 4

    ok, det = profile_kernel_gate(H)
    result["gate_profile_kernel"] = "PASS" if ok else "FAIL"
    result["profile_kernel_details"] = det
    if not ok:
        result["status"]="MATHEMATICAL_FAIL_PROFILE_KERNEL"
        print(json.dumps(result,indent=2))
        return 2

    if args.gate_t_only:
        result["gate_finite_p2_p40"]="SKIPPED_BY_OPTION"
    else:
        wit, checked = finite_first_violation(H)
        result["finite_windows_checked"] = checked
        if wit is not None:
            result["gate_finite_p2_p40"]="FAIL"
            result["finite_witness"]=wit
            result["status"]="MATHEMATICAL_FAIL_FINITE"
            print(json.dumps(result,indent=2))
            return 2
        result["gate_finite_p2_p40"]="PASS"

    # Work directory.
    temp_obj = None
    if args.workdir:
        work = args.workdir
        work.mkdir(parents=True, exist_ok=True)
    else:
        temp_obj = tempfile.TemporaryDirectory(prefix="paper4_h40_cert_")
        work = Path(temp_obj.name)

    # Persist canonical input in the workdir.
    canonical_input = work / "H40_INPUT.txt"
    canonical_input.write_text(
        "".join(f"{x} {H[x]}\n" for x in MACROS), encoding="utf-8"
    )

    outer_exe = work / "outer_parents"
    real_exe = work / "source_realizability"
    parent_tsv = work / "OUTER_PARENTS.tsv"
    outer_log = work / "OUTER_PARENT_LOG.txt"
    real_log = work / "SOURCE_REALIZABILITY_LOG.txt"

    try:
        c1 = compile_cpp(args.outer_src, outer_exe)
        c2 = compile_cpp(args.realizability_src, real_exe)
        result["compile_commands"]=[c1,c2]

        r1 = run_cmd([str(outer_exe),str(canonical_input),str(parent_tsv)])
        outer_log.write_text(r1.stdout + ("\nSTDERR\n"+r1.stderr if r1.stderr else ""), encoding="utf-8")
        result["outer_parent_exit_code"]=r1.returncode
        result["outer_parent_status"]=extract_final_status(r1.stdout)
        if r1.returncode != 0:
            raise RuntimeError(f"outer-parent generator exit {r1.returncode}")

        result["outer_parent_tsv_sha256"]=sha256_file(parent_tsv)
        result["outer_parent_count"]=sum(1 for _ in parent_tsv.open("r",encoding="utf-8"))

        r2 = run_cmd([str(real_exe),str(parent_tsv)])
        real_log.write_text(r2.stdout + ("\nSTDERR\n"+r2.stderr if r2.stderr else ""), encoding="utf-8")
        st = extract_final_status(r2.stdout)
        result["source_realizability_exit_code"]=r2.returncode
        result["source_realizability_status"]=st

        # Extract useful witness lines when present.
        for key in ["WITNESS_WORD","WITNESS_TEMPLATE","ANCESTOR_CLOSURE_SIZE",
                    "REALIZATION_DECOMPOSITIONS_CHECKED","FACTOR_LENGTH_BOUND",
                    "INITIAL_OUTER_PARENTS"]:
            for line in r2.stdout.splitlines():
                if line.startswith(key+" "):
                    result[key.lower()] = line[len(key)+1:].strip()
                    break

        if r2.returncode == 0 and st == "ALL_OUTER_PARENTS_NONREALIZABLE":
            result["gate_T_p_gt_40"]="PASS"
            result["status"]="CERTIFIED"
            code=0
        elif r2.returncode == 2 and st == "REALIZABLE_OUTER_PARENT_FOUND":
            result["gate_T_p_gt_40"]="FAIL"
            result["status"]="MATHEMATICAL_FAIL_GATE_T"
            code=2
        else:
            result["gate_T_p_gt_40"]="INFRASTRUCTURE_ERROR"
            result["status"]="INFRASTRUCTURE_ERROR_GATE_T"
            code=5

        cert_json = work/"CERTIFICATE.json"
        result["workdir"]=str(work)
        result["artifacts"]={
            "canonical_input":str(canonical_input),
            "outer_parents":str(parent_tsv),
            "outer_log":str(outer_log),
            "source_realizability_log":str(real_log),
            "certificate_json":str(cert_json),
        }
        cert_json.write_text(json.dumps(result,indent=2)+"\n",encoding="utf-8")

        # Compact human-readable certificate.
        md = work/"CERTIFICATE.md"
        md.write_text(
            "# Paper 4 H40 certificate\n\n"
            f"- input SHA256: `{result['input_sha256']}`\n"
            f"- profile/kernel: `{result['gate_profile_kernel']}`\n"
            f"- finite p=2..40: `{result['gate_finite_p2_p40']}`\n"
            f"- Gate T p>40: `{result['gate_T_p_gt_40']}`\n"
            f"- final status: **`{result['status']}`**\n"
            + (f"- Gate-T witness word: `{result.get('witness_word')}`\n"
               if result.get("witness_word") else "")
            + "\nNo h=8 computation. No D40 data.\n",
            encoding="utf-8"
        )
        result["artifacts"]["certificate_md"]=str(md)

        print(json.dumps(result,indent=2))
        return code

    except subprocess.TimeoutExpired as e:
        result["status"]="INFRASTRUCTURE_TIMEOUT"
        result["error"]=str(e)
        print(json.dumps(result,indent=2))
        return 6
    except Exception as e:
        result["status"]="INFRASTRUCTURE_ERROR"
        result["error"]=str(e)
        print(json.dumps(result,indent=2))
        return 7
    finally:
        if temp_obj is not None:
            if args.keep_temp:
                # TemporaryDirectory would delete; copy to a persistent sibling.
                persistent = Path.cwd()/("paper4_h40_cert_saved_"+result["input_sha256"][:12])
                if persistent.exists():
                    shutil.rmtree(persistent)
                shutil.copytree(work,persistent)
                print(f"SAVED_TEMP_WORKDIR {persistent}", file=sys.stderr)
            temp_obj.cleanup()

if __name__ == "__main__":
    raise SystemExit(main())
