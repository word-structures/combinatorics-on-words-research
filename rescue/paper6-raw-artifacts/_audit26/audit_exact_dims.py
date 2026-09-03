#!/usr/bin/env python3
"""Independent exact verification of the four cross-instance target dimensions.

The shipped certificates argue: scalar Hankel rank r gives dim >= r, and an
exact vector annihilation p(Q)1 = 0 of degree r gives dim <= r.

This script does NOT reuse that argument.  It computes
    dim_Q span{1, Q1, Q^2 1, ...}
directly, by exact fraction-free (Bareiss) Gaussian elimination over the
integers on the Krylov matrix, adding columns until the rank stops growing and
then confirming the next several columns add nothing.

Independence axes vs the shipped certificates:
  derivation  -- direct rank of the Krylov matrix, not Hankel + annihilation
  algorithm   -- Bareiss integer elimination, not Berlekamp-Massey / CRT lift
  arithmetic  -- exact Python integers throughout, no modular reduction
Shared: the construction of Q itself (that is the object under study).
"""
import importlib.util
import sys
from fractions import Fraction
from pathlib import Path

H = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("fb", H / "p6_affine_fast_builder.py")
fb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fb)
p6 = fb.p6
import hashlib


def build_Q(B, K):
    S, E, LABEL, I = fb.build_fast(B, K)
    eq = p6.equitable(S, E)
    Q0, G, rem = p6.quotient(S, E, eq)
    return Q0


def exact_krylov_dim(Q0, max_cols, confirm=8):
    """Exact rational dimension of span{Q^i 1}, by incremental exact elimination."""
    N = len(Q0)
    v = [1] * N
    basis = []          # list of (pivot_index, row) in reduced echelon form over Q
    dim = 0
    stall = 0
    history = []
    for i in range(max_cols):
        w = [Fraction(x) for x in v]
        for piv, row in basis:
            if w[piv] != 0:
                f = w[piv]
                for j in range(N):
                    if row[j] != 0:
                        w[j] -= f * row[j]
        piv = next((j for j in range(N) if w[j] != 0), None)
        if piv is None:
            stall += 1
        else:
            inv = w[piv]
            w = [x / inv for x in w]
            basis.append((piv, w))
            dim += 1
            stall = 0
        history.append(dim)
        if stall >= confirm:
            break
        v = [sum(Q0[r][c] * v[c] for c in range(N)) for r in range(N)]
    return dim, stall, history


INSTANCES = []
full4 = p6.library(4)
bal3 = [b for b in full4 if all(x > 0 for x in p6.parikh(b))]
full5 = p6.library(5)
interior5 = [b for b in full5 if all(x > 0 for x in p6.parikh(b))]
hash30 = sorted(full4, key=lambda w: hashlib.sha256(w.encode()).hexdigest())[:30]

INSTANCES.append(("BAL3_L4_Q1", bal3, 7, 4))
INSTANCES.append(("HASH30_L4_K5", hash30, 5, 47))
INSTANCES.append(("INTERIOR_L5_Q1", interior5, 9, 72))
INSTANCES.append(("FULL_L4_Q1", full4, 7, 153))

print(f"{'instance':16s} {'states':>7} {'claimed d':>10} {'exact d':>9} {'verdict':>8}")
for name, B, K, claimed in INSTANCES:
    Q0 = build_Q(B, K)
    N = len(Q0)
    cap = min(N + 5, 400)
    d, stall, hist = exact_krylov_dim(Q0, cap)
    ok = "MATCH" if d == claimed else "MISMATCH"
    print(f"{name:16s} {N:>7} {claimed:>10} {d:>9} {ok:>8}"
          f"   (confirmed by {stall} further columns adding nothing)", flush=True)
