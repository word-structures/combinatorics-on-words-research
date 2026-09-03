#!/usr/bin/env python3
"""Replay Paper-6 Q2 recency-frame + one-bit observability certificate.

Dependencies:
  numpy, scipy

Required sibling files:
  P6_Q2_RAW_STATES_S21.npy
  P6_Q2_RAW_TO_EQUITABLE_CLASS_U16.npy
  P6_Q2_EQUITABLE_QUOTIENT_SPARSE_v0.1_2026-08-30.json
"""
from pathlib import Path
import json
import numpy as np
from scipy.sparse import coo_matrix, csr_matrix

H = Path(__file__).resolve().parent
N_FUT = 1179
N_PERSISTENT = 1167
PERSISTENT_SHIFT = 12
PRIMES = (65521, 65519)

states_b = np.load(H / "P6_Q2_RAW_STATES_S21.npy")
classes = np.load(H / "P6_Q2_RAW_TO_EQUITABLE_CLASS_U16.npy").astype(np.int32)
states = [x.decode("ascii").rstrip("\x00") for x in states_b]

D = json.loads((H / "P6_Q2_EQUITABLE_QUOTIENT_SPARSE_v0.1_2026-08-30.json").read_text())
rows = D["rows"]
N = len(rows)

rr, cc, dd = [], [], []
for i, row in enumerate(rows):
    for j, w in row:
        rr.append(i); cc.append(j); dd.append(w)

Q = csr_matrix(
    (np.array(dd, dtype=np.int64), (rr, cc)),
    shape=(N, N)
)

def recency_frame(s):
    order = []
    ages = []
    for d, ch in enumerate(reversed(s)):
        if ch not in order:
            order.append(ch)
            ages.append(d)
        if len(order) == 3:
            break
    for ch in "abc":
        if ch not in order:
            order.append(ch)
            ages.append(len(s) + 10 + len(ages))
    mp = {order[i]: "abc"[i] for i in range(3)}
    return mp, tuple(ages)

def parikh(w):
    return (w.count("a"), w.count("b"), w.count("c"))

def recent_four_profiles(s, mp):
    t = "".join(mp[c] for c in s)
    r = len(t) % 4
    bs = [t[i:i+4] for i in range(r, len(t), 4) if len(t[i:i+4]) == 4]
    ps = [parikh(b) for b in bs[-4:]]
    while len(ps) < 4:
        ps.insert(0, None)
    return tuple(ps)

base = []
age_b = []
for s in states:
    mp, ages = recency_frame(s)
    base.append(recent_four_profiles(s, mp))
    age_b.append(ages[1])

assert set(age_b) == {1, 2, 3}
for s, a in zip(states, age_b):
    assert (a == 1) == (s[-1] != s[-2])

def group_ids(vals):
    mp = {}
    ids = np.empty(len(vals), dtype=np.int32)
    for i, x in enumerate(vals):
        g = mp.get(x)
        if g is None:
            g = len(mp)
            mp[x] = g
        ids[i] = g
    return ids, len(mp)

labels_none = base
labels_bit = [(base[i], int(states[i][-1] == states[i][-2])) for i in range(len(states))]
labels_full = [(base[i], age_b[i]) for i in range(len(states))]

def aggregation(labels):
    gids, M = group_ids(labels)
    G = coo_matrix(
        (np.ones(len(gids), dtype=np.int64), (gids, classes)),
        shape=(M, N)
    ).tocsr()
    G.sum_duplicates()
    return G, M

G0, M0 = aggregation(labels_none)
G1, M1 = aggregation(labels_bit)
GF, MF = aggregation(labels_full)

assert (M0, M1, MF) == (1796, 2083, 2226)

def build_future(p, start, count):
    cols = []
    v = np.ones(N, dtype=np.int64)
    for h in range(start + count):
        if h >= start:
            cols.append(v % p)
        v = np.asarray(Q.dot(v)).reshape(-1) % p
    return np.stack(cols, axis=1)

def rank_mod(X, p):
    X = X.copy() % p
    m, nc = X.shape
    r = 0
    for c in range(nc):
        nz = np.flatnonzero(X[r:, c])
        if len(nz) == 0:
            continue
        z = r + int(nz[0])
        if z != r:
            X[[r, z]] = X[[z, r]]
        inv = pow(int(X[r, c]), p - 2, p)
        X[r, c:] = (X[r, c:] * inv) % p
        if r + 1 < m:
            fac = X[r+1:, c].copy()
            nzf = np.flatnonzero(fac)
            if len(nzf):
                ids = r + 1 + nzf
                X[ids, c:] = (
                    X[ids, c:]
                    - fac[nzf, None] * X[r, c:][None, :]
                ) % p
        r += 1
        if r == nc:
            break
    return r

out = {
    "groups": {"no_bit": M0, "one_bit": M1, "full_age": MF},
    "primes": {}
}

for p in PRIMES:
    V = build_future(p, 0, N_FUT)
    Vp = build_future(p, PERSISTENT_SHIFT, N_PERSISTENT)

    r0 = rank_mod(np.asarray(G0.dot(V), dtype=np.int64), p)
    r1 = rank_mod(np.asarray(G1.dot(V), dtype=np.int64), p)
    rf = rank_mod(np.asarray(GF.dot(V), dtype=np.int64), p)
    rp = rank_mod(np.asarray(G1.dot(Vp), dtype=np.int64), p)

    out["primes"][str(p)] = {
        "no_bit_full_rank": r0,
        "one_bit_full_rank": r1,
        "full_age_full_rank": rf,
        "one_bit_persistent_rank": rp
    }

    assert r0 == 1144
    assert r1 == 1179
    assert rf == 1179
    assert rp == 1167

print("PASS")
print(json.dumps(out, indent=2))
