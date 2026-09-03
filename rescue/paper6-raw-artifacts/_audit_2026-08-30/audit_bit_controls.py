#!/usr/bin/env python3
"""Discriminating control for the Paper-6 FT2 / S_2 explanation.

FT2 predicts that at K=11 (L=4, q=2, r=3) the activated fragment is S_2, i.e.
the adjacency bit eps = 1[s_{-1} = s_{-2}], and that this is why the one-bit
decoration closes the observability gap.

A competing explanation is that the S_3 recency canonicalization destroys
orientation information and eps merely repairs some of it -- in which case
other comparable bits of similar granularity should close the gap too.  The
checkpoint's own HASH30 control shows the bit acting exactly as such a partial
gauge repair (41 -> 44 of 47).

This script tests eps against non-FT2-predicted bits and against null controls.
"""
import json
import sys
from pathlib import Path

import numpy as np
from scipy.sparse import coo_matrix, csr_matrix

H = Path(sys.argv[1])
N_FUT = 1179
PRIMES = (65521, 65519)

states = [x.decode("ascii").rstrip("\x00")
          for x in np.load(H / "P6_Q2_RAW_STATES_S21.npy")]
classes = np.load(H / "P6_Q2_RAW_TO_EQUITABLE_CLASS_U16.npy").astype(np.int64)
D = json.loads((H / "P6_Q2_EQUITABLE_QUOTIENT_SPARSE_v0.1_2026-08-30.json").read_text())
rows = D["rows"]; N = len(rows)
rr, cc, dd = [], [], []
for i, row in enumerate(rows):
    for j, w in row:
        rr.append(i); cc.append(j); dd.append(w)
Q = csr_matrix((np.array(dd, dtype=np.int64), (rr, cc)), shape=(N, N))


def recency_map(s):
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


gauged = ["".join(recency_map(s)[c] for c in s) for s in states]


def profiles(t):
    r = len(t) % 4
    bs = [t[i:i + 4] for i in range(r, len(t), 4) if len(t[i:i + 4]) == 4]
    ps = [parikh(b) for b in bs[-4:]]
    while len(ps) < 4:
        ps.insert(0, None)
    return tuple(ps)


P = [profiles(t) for t in gauged]

# --- candidate decorations -------------------------------------------------
eps_12 = [int(s[-1] == s[-2]) for s in states]                  # FT2's S_2 bit
eps_13 = [int(s[-1] == s[-3]) for s in states]                  # not predicted
eps_23 = [int(s[-2] == s[-3]) for s in states]                  # not predicted
S3frag = [parikh(t[-3:]) for t in gauged]                       # FT2's K=12 channel
S2frag = [parikh(t[-2:]) for t in gauged]                       # == eps_12, sanity
# null control: a deterministic pseudo-random bit with comparable split count
null_bit = [(hash(s) >> 7) & 1 for s in states]
# null control matched to eps_12's marginal (same number of 1s, arbitrary states)
order = np.argsort([hash(s) for s in states])
k1 = sum(eps_12)
matched = np.zeros(len(states), dtype=np.int64)
matched[order[:k1]] = 1
matched_bit = matched.tolist()

VARIANTS = {
    "profiles_only":                 [P],
    "profiles + eps[s-1=s-2] (FT2)": [P, eps_12],
    "profiles + eps[s-1=s-3]":       [P, eps_13],
    "profiles + eps[s-2=s-3]":       [P, eps_23],
    "profiles + S2 fragment":        [P, S2frag],
    "profiles + S3 fragment":        [P, S3frag],
    "profiles + null hash bit":      [P, null_bit],
    "profiles + marginal-matched bit": [P, matched_bit],
}


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


def krylov(p):
    V = np.empty((N, N_FUT), dtype=np.int64)
    v = np.ones(N, dtype=np.int64)
    for h in range(N_FUT):
        V[:, h] = v % p
        v = np.asarray(Q.dot(v)).reshape(-1) % p
    return V


def rank_mod(X, p):
    A = (np.asarray(X, dtype=np.int64) % p).copy()
    m, n = A.shape
    r = 0
    for c in range(n):
        if r >= m:
            break
        nz = np.flatnonzero(A[r:, c])
        if nz.size == 0:
            continue
        k = r + int(nz[0])
        if k != r:
            A[[r, k]] = A[[k, r]]
        A[r, c:] = (A[r, c:] * pow(int(A[r, c]), p - 2, p)) % p
        col = A[r + 1:, c]
        nzf = np.flatnonzero(col)
        if nzf.size:
            ids = r + 1 + nzf
            A[ids, c:] = (A[ids, c:] - col[nzf, None] * A[r, c:][None, :]) % p
        r += 1
    return r


Vs = {p: krylov(p) for p in PRIMES}
print(f"{'descriptor':34s} {'groups':>7s} {'rank(65521)':>12s} {'rank(65519)':>12s}"
      f"  {'gap to 1179':>11s}")
out = {}
for name, comps in VARIANTS.items():
    labels = list(zip(*comps)) if len(comps) > 1 else list(comps[0])
    G, M = aggregation(labels)
    rk = [rank_mod(G.dot(Vs[p]), p) for p in PRIMES]
    out[name] = {"groups": M, "ranks": rk}
    print(f"{name:34s} {M:7d} {rk[0]:12d} {rk[1]:12d}  {1179 - rk[0]:11d}", flush=True)

(H.parent / "AUDIT_BIT_CONTROLS_RESULTS.json").write_text(json.dumps(out, indent=2))
print("\nwritten AUDIT_BIT_CONTROLS_RESULTS.json")
