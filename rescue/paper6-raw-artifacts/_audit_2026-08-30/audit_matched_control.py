#!/usr/bin/env python3
"""Granularity-matched null control for the Paper-6 one-bit result.

The first null control (a hash bit) closed the 35-dimension gap, but it split
almost every profile family (1796 -> 3588 groups), whereas eps splits only 287
(1796 -> 2083).  That comparison is confounded by granularity.

This script builds arbitrary bits that split the SAME NUMBER of families as
eps, chosen with no structural meaning, and asks whether they also close the
gap.  If they do, the FT2/S_2 identification is not what closes it.
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
eps = [int(s[-1] == s[-2]) for s in states]

# base profile group ids
gid, mp = np.empty(len(P), dtype=np.int64), {}
for i, x in enumerate(P):
    g = mp.get(x)
    if g is None:
        g = len(mp); mp[x] = g
    gid[i] = g
NG = len(mp)

# how many base families does eps actually split?
split_by_eps = set()
seen = {}
for i in range(len(P)):
    k = gid[i]
    if k in seen and seen[k] != eps[i]:
        split_by_eps.add(k)
    seen.setdefault(k, eps[i])
n_split = len(split_by_eps)
print(f"base profile families: {NG};  eps splits {n_split} of them")


def aggregation(labels):
    idx, m = np.empty(len(labels), dtype=np.int64), {}
    for i, x in enumerate(labels):
        g = m.get(x)
        if g is None:
            g = len(m); m[x] = g
        idx[i] = g
    M = len(m)
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

# reference: eps
G, M = aggregation(list(zip(P, eps)))
ref = [rank_mod(G.dot(Vs[p]), p) for p in PRIMES]
print(f"{'eps (FT2 S_2)':44s} groups={M:5d} ranks={ref}")

# matched arbitrary controls: split exactly n_split randomly-chosen families,
# using an arbitrary within-family bit (parity of a hash of the raw history)
for seed in (1, 2, 3, 4, 5):
    rng = np.random.default_rng(seed)
    chosen = set(rng.choice(NG, size=n_split, replace=False).tolist())
    bit = [
        (int.from_bytes(states[i].encode(), "little") % 2) if gid[i] in chosen else 0
        for i in range(len(states))
    ]
    G, M = aggregation(list(zip(P, bit)))
    rk = [rank_mod(G.dot(Vs[p]), p) for p in PRIMES]
    print(f"{'matched arbitrary split seed=' + str(seed):44s} groups={M:5d} ranks={rk}",
          flush=True)

# and a control that splits the SAME families eps splits, but arbitrarily
for seed in (11, 12, 13):
    bit = [
        (int.from_bytes(states[i].encode(), "little") % 2) if gid[i] in split_by_eps else 0
        for i in range(len(states))
    ]
    rng = np.random.default_rng(seed)
    perm = rng.permutation(len(states))
    bit = [bit[j] for j in perm]  # decorrelate from history content
    order_bit = [0] * len(states)
    for i in range(len(states)):
        order_bit[i] = bit[i] if gid[i] in split_by_eps else 0
    G, M = aggregation(list(zip(P, order_bit)))
    rk = [rank_mod(G.dot(Vs[p]), p) for p in PRIMES]
    print(f"{'same-families arbitrary bit seed=' + str(seed):44s} groups={M:5d} ranks={rk}",
          flush=True)

print("\ntarget dimension 1179; profiles-only baseline 1144")
