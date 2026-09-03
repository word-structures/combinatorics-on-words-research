#!/usr/bin/env python3
"""Independent audit of the Paper-6 Q2 recency-frame observability certificate.

Two questions:
  (A) Does the certified descriptor match the one the theorem states
      ("four most recent COMPLETE L4 blocks")?  The shipped replay windows
      four length-4 substrings right-aligned to the end of the history, which
      for |s| = 21 straddles the block boundary.
  (B) Is the profile-only rank stable across many primes?  (Lower bound only.)

Independent of the shipped replay: own rank routine, own descriptor builders,
own Krylov construction.  Shares only the input data files.
"""
import json
import sys
from pathlib import Path

import numpy as np
from scipy.sparse import coo_matrix, csr_matrix

H = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent
N_FUT = 1179
N_PERS = 1167
PERS_SHIFT = 12

states = [x.decode("ascii").rstrip("\x00")
          for x in np.load(H / "P6_Q2_RAW_STATES_S21.npy")]
classes = np.load(H / "P6_Q2_RAW_TO_EQUITABLE_CLASS_U16.npy").astype(np.int64)
D = json.loads((H / "P6_Q2_EQUITABLE_QUOTIENT_SPARSE_v0.1_2026-08-30.json").read_text())
rows = D["rows"]
N = len(rows)
rr, cc, dd = [], [], []
for i, row in enumerate(rows):
    for j, w in row:
        rr.append(i); cc.append(j); dd.append(w)
Q = csr_matrix((np.array(dd, dtype=np.int64), (rr, cc)), shape=(N, N))
print(f"states={len(states)}  classes={N}")


def recency_map(s):
    """Most-recent distinct letter -> a, second -> b, third -> c."""
    order = []
    for ch in reversed(s):
        if ch not in order:
            order.append(ch)
        if len(order) == 3:
            break
    for ch in "abc":
        if ch not in order:
            order.append(ch)
    return {order[i]: "abc"[i] for i in range(3)}


def parikh(w):
    return (w.count("a"), w.count("b"), w.count("c"))


def profiles_right_aligned(t):
    """What the shipped replay computes: four length-4 windows ending at |t|."""
    r = len(t) % 4
    bs = [t[i:i + 4] for i in range(r, len(t), 4) if len(t[i:i + 4]) == 4]
    ps = [parikh(b) for b in bs[-4:]]
    while len(ps) < 4:
        ps.insert(0, None)
    return tuple(ps)


def profiles_grid_aligned(t):
    """Four most recent COMPLETE blocks on the grid anchored at position 0."""
    nb = len(t) // 4
    lo = max(0, nb - 4)
    ps = [parikh(t[4 * i:4 * i + 4]) for i in range(lo, nb)]
    while len(ps) < 4:
        ps.insert(0, None)
    return tuple(ps)


def cut_fragment(t):
    """The incomplete trailing block (empty when the history is block-aligned)."""
    return parikh(t[4 * (len(t) // 4):])


gauged = []
for s in states:
    m = recency_map(s)
    gauged.append("".join(m[c] for c in s))

eps = [int(s[-1] == s[-2]) for s in states]
P_right = [profiles_right_aligned(t) for t in gauged]
P_grid = [profiles_grid_aligned(t) for t in gauged]
F_cut = [cut_fragment(t) for t in gauged]

n_diff = sum(1 for a, b in zip(P_right, P_grid) if a != b)
print(f"states where right-aligned != grid-aligned profiles: {n_diff}"
      f"  ({100.0 * n_diff / len(states):.1f}%)")


def aggregation(labels):
    idx, mp = np.empty(len(labels), dtype=np.int64), {}
    for i, x in enumerate(labels):
        g = mp.get(x)
        if g is None:
            g = len(mp); mp[x] = g
        idx[i] = g
    M = len(mp)
    G = coo_matrix((np.ones(len(idx), dtype=np.int64), (idx, classes)),
                   shape=(M, N)).tocsr()
    G.sum_duplicates()
    return G, M


def krylov(p, start, count):
    cols, v = [], np.ones(N, dtype=np.int64)
    for h in range(start + count):
        if h >= start:
            cols.append(v % p)
        v = np.asarray(Q.dot(v)).reshape(-1) % p
    return np.stack(cols, axis=1)


def rank_mod(X, p):
    """Own implementation: column-pivoted Gaussian elimination over F_p."""
    A = (X % p).astype(np.int64)
    m, n = A.shape
    r = 0
    for c in range(n):
        if r >= m:
            break
        piv = np.flatnonzero(A[r:, c])
        if piv.size == 0:
            continue
        k = r + int(piv[0])
        if k != r:
            A[[r, k]] = A[[k, r]]
        A[r, c:] = (A[r, c:] * pow(int(A[r, c]), p - 2, p)) % p
        col = A[r + 1:, c]
        nz = np.flatnonzero(col)
        if nz.size:
            ids = r + 1 + nz
            A[ids, c:] = (A[ids, c:] - col[nz, None] * A[r, c:][None, :]) % p
        r += 1
    return r


VARIANTS = {
    "right_aligned_profiles_only":       [P_right],
    "right_aligned_profiles_plus_eps":   [P_right, eps],
    "grid_aligned_profiles_only":        [P_grid],
    "grid_aligned_profiles_plus_eps":    [P_grid, eps],
    "grid_aligned_profiles_plus_cut":    [P_grid, F_cut],
    "grid_aligned_profiles_cut_plus_eps": [P_grid, F_cut, eps],
}

PRIMES = [65521, 65519, 2147483647, 1000003, 999983]

results = {}
for name, comps in VARIANTS.items():
    labels = list(zip(*comps)) if len(comps) > 1 else list(comps[0])
    G, M = aggregation(labels)
    results[name] = {"groups": M, "full": {}, "persistent": {}}
    for p in PRIMES:
        V = krylov(p, 0, N_FUT)
        results[name]["full"][p] = rank_mod(np.asarray(G.dot(V), dtype=np.int64), p)
        Vp = krylov(p, PERS_SHIFT, N_PERS)
        results[name]["persistent"][p] = rank_mod(np.asarray(G.dot(Vp), dtype=np.int64), p)
    print(f"{name:36s} groups={M:5d}  full={results[name]['full']}  "
          f"pers={results[name]['persistent']}", flush=True)

print()
print("target dims: full 1179, persistent 1167")
(Path(H) / "AUDIT_ALIGNMENT_RESULTS.json").write_text(json.dumps(
    {"n_states": len(states), "n_classes": N,
     "states_where_alignments_differ": n_diff,
     "primes": PRIMES, "results": results}, indent=2, default=str))
print("written AUDIT_ALIGNMENT_RESULTS.json")
