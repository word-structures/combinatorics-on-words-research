#!/usr/bin/env python3
"""Is the exact 35-dimensional 'latent sector' just the memory-origin phase?

The v2.6 grid-alignment document reports that all 15 non-grid anchor policies
split every one of the 1228 phase-mixed grid families, and that this set is
exactly the intersection of what they split.  That points at a much plainer
mechanism than a 35-dimensional Abelian sector: the true-grid measurement is
the unique policy in the class that is BLIND TO THE MEMORY-ORIGIN PHASE
|s| mod 4 in {0,1}.

Direct test: adjoin the single phase bit to the true-grid four-profile
measurement and recompute the static rank.  If the rank jumps 1144 -> 1179,
the hidden sector is recovered by one bit of phase information, and the
'one-step latent sector' is the statement that a block step changes the phase.

Also measures how much of the gap a phase bit alone (no profiles) closes, and
what the phase bit does at depth m = 3.
"""
import json
import sys
from pathlib import Path

import numpy as np
from scipy.sparse import coo_matrix, csr_matrix

R = Path(sys.argv[1])
PRIME = 65521
D = 1179

states = [x.decode("ascii").rstrip("\x00")
          for x in np.load(R / "P6_Q2_RAW_STATES_S21.npy")]
classes = np.load(R / "P6_Q2_RAW_TO_EQUITABLE_CLASS_U16.npy").astype(np.int64)
J = json.loads((R / "P6_Q2_EQUITABLE_QUOTIENT_SPARSE_v0.1_2026-08-30.json").read_text())
rr, cc, dd = [], [], []
for i, row in enumerate(J["rows"]):
    for j, w in row:
        rr.append(i); cc.append(j); dd.append(w)
N = 2691
Q = csr_matrix((np.array(dd, dtype=np.int64), (rr, cc)), shape=(N, N))


def recency_map(s):
    order = []
    for c in reversed(s):
        if c not in order:
            order.append(c)
        if len(order) == 3:
            break
    for c in "abc":
        if c not in order:
            order.append(c)
    return {order[i]: "abc"[i] for i in range(3)}


def parikh(w):
    return (w.count("a"), w.count("b"), w.count("c"))


def grid_label(s, m):
    mp = recency_map(s)
    t = "".join(mp[c] for c in s)
    a = len(t) % 4
    blocks = [t[i:i + 4] for i in range(a, len(t), 4) if i + 4 <= len(t)]
    ps = [parikh(b) for b in blocks[-m:]]
    while len(ps) < m:
        ps.insert(0, None)
    return tuple(ps)


phase = [len(s) % 4 for s in states]
print("memory-origin phases present:", sorted(set(phase)),
      " counts:", {p: phase.count(p) for p in sorted(set(phase))})


def agg(labels):
    mp, gid = {}, np.empty(len(labels), dtype=np.int64)
    for i, x in enumerate(labels):
        if x not in mp:
            mp[x] = len(mp)
        gid[i] = mp[x]
    G = coo_matrix((np.ones(len(gid), dtype=np.int64), (gid, classes)),
                   shape=(len(mp), N)).tocsr()
    G.sum_duplicates()
    return G, len(mp)


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


V = np.empty((N, D), dtype=np.int64)
v = np.ones(N, dtype=np.int64)
for h in range(D):
    V[:, h] = v % PRIME
    v = np.asarray(Q.dot(v)).ravel() % PRIME

g4 = [grid_label(s, 4) for s in states]
g3 = [grid_label(s, 3) for s in states]

CASES = {
    "m=4 true grid (baseline)":        g4,
    "m=4 true grid + phase bit":       list(zip(g4, phase)),
    "m=3 true grid":                   g3,
    "m=3 true grid + phase bit":       list(zip(g3, phase)),
    "phase bit alone":                 phase,
}

print(f"\n{'measurement':34s} {'families':>9} {'static rank':>12} {'gap to 1179':>12}")
out = {}
for name, labels in CASES.items():
    G, g = agg(labels)
    r = rank_mod(G.dot(V), PRIME)
    out[name] = {"families": int(g), "static_rank": int(r)}
    print(f"{name:34s} {g:>9} {r:>12} {D - r:>12}", flush=True)

# how many grid families are phase-mixed?
from collections import defaultdict
seen = defaultdict(set)
for lab, ph in zip(g4, phase):
    seen[lab].add(ph)
mixed = sum(1 for v_ in seen.values() if len(v_) > 1)
print(f"\nphase-mixed m=4 grid families: {mixed} of {len(seen)}")
out["phase_mixed_families"] = int(mixed)
out["total_m4_families"] = int(len(seen))
(R / "AUDIT_PHASE_HYPOTHESIS_RESULTS.json").write_text(json.dumps(out, indent=2))
