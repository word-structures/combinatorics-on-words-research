#!/usr/bin/env python3
"""
Paper 3 exact short-contact / cyclic-contact reproducibility check.

Governance:
- NO Git access.
- NO h=8 computation.
- NO D40 data.
- Enumerates only h=2,...,7.

Checks baseline-admissible h-Abelian-square profile targets, their shift-1
and shift-2 contact graphs, combined short-contact support, and cyclic
Abelian-square-free half-words for h=3,...,7.
"""

from itertools import product
from collections import defaultdict, deque

ABC = (0, 1, 2)

def parikh(w):
    c = [0, 0, 0]
    for x in w:
        c[x] += 1
    return tuple(c)

def has_abelian_square_period(w, k):
    L = 2*k
    for i in range(len(w) - L + 1):
        if parikh(w[i:i+k]) == parikh(w[i+k:i+L]):
            return True
    return False

def baseline_allowed(w, h):
    # L_{h-1}: forbid nontrivial Abelian-square half-lengths 2,...,h-1.
    return not any(has_abelian_square_period(w, k) for k in range(2, h))

def targets_by_profile(h):
    halves = defaultdict(list)
    for x in product(ABC, repeat=h):
        halves[parikh(x)].append(x)

    out = defaultdict(list)
    for p, xs in halves.items():
        profile = tuple(sorted(p, reverse=True))
        for x in xs:
            for y in xs:
                w = x + y
                if baseline_allowed(w, h):
                    out[profile].append(w)
    return out

def graph_stats(adj):
    vertices = list(adj)
    E = sum(len(adj[v]) for v in vertices)

    # Tarjan SCCs
    index = 0
    stack, on_stack = [], set()
    idx, low, sccs = {}, {}, []

    def visit(v):
        nonlocal index
        idx[v] = low[v] = index
        index += 1
        stack.append(v)
        on_stack.add(v)
        for u in adj[v]:
            if u not in idx:
                visit(u)
                low[v] = min(low[v], low[u])
            elif u in on_stack:
                low[v] = min(low[v], idx[u])
        if low[v] == idx[v]:
            comp = []
            while True:
                u = stack.pop()
                on_stack.remove(u)
                comp.append(u)
                if u == v:
                    break
            sccs.append(comp)

    for v in vertices:
        if v not in idx:
            visit(v)

    cyclic = []
    for comp in sccs:
        if len(comp) > 1 or (len(comp) == 1 and comp[0] in adj[comp[0]]):
            cyclic.append(comp)

    max_path = None
    if not cyclic:
        indeg = {v: 0 for v in vertices}
        for v in vertices:
            for u in adj[v]:
                indeg[u] += 1
        q = deque(v for v in vertices if indeg[v] == 0)
        dist = {v: 0 for v in vertices}
        seen = 0
        while q:
            v = q.popleft()
            seen += 1
            for u in adj[v]:
                dist[u] = max(dist[u], dist[v] + 1)
                indeg[u] -= 1
                if indeg[u] == 0:
                    q.append(u)
        assert seen == len(vertices)
        max_path = max(dist.values(), default=0)

    return {
        "V": len(vertices),
        "E": E,
        "cycles": len(cyclic),
        "cycle_sizes": sorted(len(c) for c in cyclic),
        "max_path": max_path,
    }

def contact_graphs(words):
    S = set(words)
    O1 = {w: set() for w in words}
    O2 = {w: set() for w in words}

    for w in words:
        # Shift 1: the overlap criterion forces the appended symbol to equal
        # the removed symbol, hence the candidate is the one-step rotation.
        u = w[1:] + w[:1]
        if u in S:
            O1[w].add(u)

        # Shift 2: enumerate only the 9 possible appended ordered pairs.
        for ab in product(ABC, repeat=2):
            u = w[2:] + ab
            if u in S:
                O2[w].add(u)

    short = {w: O1[w] | O2[w] for w in words}
    return O1, O2, short

def cyclic_abelian_square_free(x):
    h = len(x)
    periodic = x * 3
    for start in range(h):
        for k in range(1, h):
            if parikh(periodic[start:start+k]) == parikh(periodic[start+k:start+2*k]):
                return False
    return True

def fmt(s):
    if s["cycles"]:
        return f'V={s["V"]} E={s["E"]} cycles={s["cycles"]} sizes={s["cycle_sizes"]}'
    return f'V={s["V"]} E={s["E"]} acyclic max_path={s["max_path"]}'

print("PAPER 3 SHORT-CONTACT EXACT RECHECK")
print("Governance: h=2..7 only; NO h=8; NO D40; NO Git")
print()

for h in range(2, 8):
    print(f"h={h}")
    groups = targets_by_profile(h)
    for profile in sorted(groups, reverse=True):
        words = groups[profile]
        O1, O2, short = contact_graphs(words)
        s1, s2, ss = map(graph_stats, (O1, O2, short))
        print(f"  profile={profile} targets={len(words)}")
        print(f"    O1:    {fmt(s1)}")
        print(f"    O2:    {fmt(s2)}")
        print(f"    O1+O2: {fmt(ss)}")
        if h in (6, 7):
            assert ss["cycles"] == 0
            print(f"    NILPOTENCY: N^(d+1)=0 with d={ss['max_path']}")
    print()

print("CYCLIC ABELIAN-SQUARE-FREE HALF-WORDS")
for h in range(3, 8):
    count = sum(
        1 for x in product(ABC, repeat=h)
        if cyclic_abelian_square_free(x)
    )
    print(f"  h={h}: {count}")

print()
print("ASSERTIONS")
# Exact finite-family claims used in the addendum.
expected_cyclic = {3: 6, 4: 12, 5: 0, 6: 0, 7: 0}
for h, expected in expected_cyclic.items():
    got = sum(
        1 for x in product(ABC, repeat=h)
        if cyclic_abelian_square_free(x)
    )
    assert got == expected

for h in (6, 7):
    groups = targets_by_profile(h)
    for words in groups.values():
        _, _, short = contact_graphs(words)
        assert graph_stats(short)["cycles"] == 0

print("  cyclic counts h=3..7: PASS")
print("  combined O1+O2 acyclic for every h=6,7 profile: PASS")
print("  No h=8 evaluated.")
print("ALL CHECKS PASS")
