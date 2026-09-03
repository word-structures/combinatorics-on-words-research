#!/usr/bin/env python3
"""Is the 35-dimensional hidden sector a transient/initialization artifact?

The memory-origin phase |s| mod 4 is not an arbitrary bookkeeping label in this
system: phase 0 collects every state of length 4,8,12,16,20 (words shorter than
the 2K-1 = 21 character memory, i.e. the transient start of a word) and phase 1
collects exactly the length-21 states (words of length >= 24, where the sliding
window is saturated).  So "phase" is close to "young word vs mature word".

If the hidden sector lives mostly in the transient sector of V_cnt, the
one-step latent-sector theorem is an initialization effect.  This measures the
gap on the persistent block Q^12 1 ... Q^1178 1 as well as on the full space.
"""
import json
from pathlib import Path

import numpy as np
from scipy.sparse import coo_matrix, csr_matrix

R = Path(__file__).resolve().parent
PRIME = 65521
D, SHIFT, DPERS = 1179, 12, 1167

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


V = np.empty((N, D + 1), dtype=np.int64)
v = np.ones(N, dtype=np.int64)
for h in range(D + 1):
    V[:, h] = v % PRIME
    v = np.asarray(Q.dot(v)).ravel() % PRIME

phase = [len(s) % 4 for s in states]
lens = {}
for s in states:
    lens.setdefault(len(s) % 4, set()).add(len(s))
print("phase -> state lengths:", {k: sorted(v_) for k, v_ in lens.items()})

g4 = [grid_label(s, 4) for s in states]
G4, n4 = agg(g4)
G4p, n4p = agg(list(zip(g4, phase)))

full = V[:, :D]
pers = V[:, SHIFT:SHIFT + DPERS]

rows = [
    ("m=4 true grid", G4, n4),
    ("m=4 true grid + phase bit", G4p, n4p),
]
print(f"\n{'measurement':30s} {'fams':>6} {'full rank':>10} {'gap/1179':>9} "
      f"{'pers rank':>10} {'gap/1167':>9}")
out = {}
for name, G, g in rows:
    rf = rank_mod(G.dot(full), PRIME)
    rp = rank_mod(G.dot(pers), PRIME)
    out[name] = {"families": g, "full_rank": rf, "full_gap": D - rf,
                 "persistent_rank": rp, "persistent_gap": DPERS - rp}
    print(f"{name:30s} {g:>6} {rf:>10} {D - rf:>9} {rp:>10} {DPERS - rp:>9}",
          flush=True)

# two-time stack on the persistent block
S = np.vstack([G4.dot(V[:, j:j + DPERS + 0][:, :DPERS]) % PRIME
               for j in (SHIFT, SHIFT + 1)])
out["m=4 two-time stack, persistent"] = int(rank_mod(S, PRIME))
print("\nm=4 two-time stack restricted to persistent block: rank",
      out["m=4 two-time stack, persistent"], f"of {DPERS}")
(R / "AUDIT_PERSISTENT_PHASE_RESULTS.json").write_text(json.dumps(out, indent=2))
