#!/usr/bin/env python3
"""Clean-room reconstruction for the Paper 7 v0.2 finite certificate.

This program intentionally does not import or parse the submitted verifier or any
submitted CSV certificate.  Its inputs are the displayed boundary word and the
four displayed morphism images.  All linear algebra uses fractions and integers.
"""

from __future__ import annotations

from collections import Counter, defaultdict
from fractions import Fraction
import hashlib
import json


ALPHABET = "abcd"
C = "abacabadcdb"
S = "abacabadc"
G = {
    "a": "abcacdcbcdcadcdbdabacabadbabcbdbcbacbcdcacbabdabacadcbcdcacdbcbacbcdcacdcbdcdadbdcbca",
    "b": "bcdbdadcdadbadacabcbdbcbacbcdcacdcbdcdadbdcbcabcbdbadcdadbdacdcbdcdadbdadcadabacadcdb",
    "c": "cdacabadabacbabdbcdcacdcbdcdadbdadcadabacadcdbcdcacbadabacabdadcadabacabadbabcbdbadac",
    "d": "dabdbcbabcbdcbcacdadbdadcadabacabadbabcbdbadacdadbdcbabcbdbcabadbabcbdbcbacbcdcacbabd",
}


def pv(word: str) -> tuple[int, int, int, int]:
    counts = Counter(word)
    return tuple(counts[a] for a in ALPHABET)


def add(*vectors: tuple[int, ...]) -> tuple[int, ...]:
    return tuple(sum(items) for items in zip(*vectors))


def sub(left: tuple[int, ...], *rights: tuple[int, ...]) -> tuple[int, ...]:
    return tuple(items[0] - sum(items[1:]) for items in zip(left, *rights))


def determinant(matrix: tuple[tuple[int, ...], ...]) -> int:
    a = [[Fraction(x) for x in row] for row in matrix]
    det = Fraction(1)
    for col in range(len(a)):
        pivot = next((row for row in range(col, len(a)) if a[row][col]), None)
        if pivot is None:
            return 0
        if pivot != col:
            a[col], a[pivot] = a[pivot], a[col]
            det *= -1
        value = a[col][col]
        det *= value
        a[col] = [x / value for x in a[col]]
        for row in range(col + 1, len(a)):
            factor = a[row][col]
            if factor:
                a[row] = [x - factor * y for x, y in zip(a[row], a[col])]
    assert det.denominator == 1
    return det.numerator


def inverse_matrix(matrix: tuple[tuple[int, ...], ...]) -> tuple[tuple[Fraction, ...], ...]:
    n = len(matrix)
    aug = [
        [Fraction(x) for x in matrix[row]]
        + [Fraction(int(row == col)) for col in range(n)]
        for row in range(n)
    ]
    for col in range(n):
        pivot = next(row for row in range(col, n) if aug[row][col])
        aug[col], aug[pivot] = aug[pivot], aug[col]
        value = aug[col][col]
        aug[col] = [x / value for x in aug[col]]
        for row in range(n):
            if row == col:
                continue
            factor = aug[row][col]
            if factor:
                aug[row] = [x - factor * y for x, y in zip(aug[row], aug[col])]
    return tuple(tuple(aug[row][n:]) for row in range(n))


def morph(word: str) -> str:
    return "".join(G[x] for x in word)


def prefix_vectors(word: str) -> list[tuple[int, int, int, int]]:
    out = [(0, 0, 0, 0)]
    current = [0, 0, 0, 0]
    for x in word:
        current[ALPHABET.index(x)] += 1
        out.append(tuple(current))
    return out


def interval_pv(prefix: list[tuple[int, ...]], start: int, end: int) -> tuple[int, ...]:
    return tuple(prefix[end][i] - prefix[start][i] for i in range(4))


def abelian_squares(word: str):
    prefix = prefix_vectors(word)
    for half in range(1, len(word) // 2 + 1):
        for start in range(0, len(word) - 2 * half + 1):
            middle = start + half
            end = middle + half
            left = interval_pv(prefix, start, middle)
            right = interval_pv(prefix, middle, end)
            if left == right:
                yield {
                    "start": start,
                    "half_period": half,
                    "factor": word[start:end],
                    "left": word[start:middle],
                    "right": word[middle:end],
                    "parikh": left,
                }


def first_abelian_square(word: str):
    return next(abelian_squares(word), None)


def crossing_squares(word: str, boundary: int):
    prefix = prefix_vectors(word)
    for start in range(boundary):
        max_half = (len(word) - start) // 2
        for half in range(1, max_half + 1):
            end = start + 2 * half
            if end <= boundary:
                continue
            middle = start + half
            if interval_pv(prefix, start, middle) == interval_pv(prefix, middle, end):
                yield (start, half, end)


def canonical_digest(rows) -> str:
    encoded = "\n".join(
        json.dumps(row, separators=(",", ":"), sort_keys=True)
        for row in rows
    ).encode("ascii")
    return hashlib.sha256(encoded).hexdigest()


M = tuple(pv(G[a]) for a in ALPHABET)
M_INVERSE = inverse_matrix(M)
DET_M = determinant(M)
M_ADJUGATE = tuple(
    tuple(int(M_INVERSE[i][j] * DET_M) for j in range(4)) for i in range(4)
)
G_PREFIX_PV = {a: prefix_vectors(G[a]) for a in ALPHABET}
G_TOTAL_PV = {a: G_PREFIX_PV[a][-1] for a in ALPHABET}
C_PREFIX_PV = prefix_vectors(C)
OFFSETS = {
    (source, target): tuple(i for i, value in enumerate(G[source]) if value == target)
    for source in ALPHABET
    for target in ALPHABET
}


def solve_integral_row(rhs: tuple[int, ...]) -> tuple[int, ...] | None:
    numerators = tuple(
        sum(rhs[i] * M_ADJUGATE[i][j] for i in range(4)) for j in range(4)
    )
    if any(value % DET_M for value in numerators):
        return None
    return tuple(value // DET_M for value in numerators)


def derive_seed_rows():
    rows = []
    states = set()
    for i in range(len(C)):
        c_suffix = interval_pv(C_PREFIX_PV, i, len(C))
        for x in ALPHABET:
            for r in range(85):
                gx_prefix = G_PREFIX_PV[x][r]
                gx_suffix = sub(G_TOTAL_PV[x], gx_prefix)
                for y in ALPHABET:
                    for t in range(86):
                        gy_prefix = G_PREFIX_PV[y][t if t <= 85 else 85]
                        rhs = sub(add(gx_suffix, gy_prefix), c_suffix, gx_prefix)
                        q = solve_integral_row(rhs)
                        if q is None:
                            continue
                        row = (i, x, r, y, t, *q)
                        rows.append(row)
                        states.add((*q, x, y))
    rows.sort()
    return rows, sorted(states)


def derive_transitions(states):
    rows = set()
    for state in states:
        q = state[:4]
        x, y = state[4:]
        for h in ALPHABET:
            for r in OFFSETS[(h, x)]:
                for k in ALPHABET:
                    for t in OFFSETS[(k, y)]:
                        rhs = add(
                            sub(q, C_PREFIX_PV[-1], G_PREFIX_PV[h][r]),
                            sub(G_TOTAL_PV[h], G_PREFIX_PV[h][r + 1]),
                            G_PREFIX_PV[k][t],
                        )
                        q_prime = solve_integral_row(rhs)
                        if q_prime is None:
                            continue
                        rows.add((*q, x, y, h, r, k, t, *q_prime))
    return sorted(rows)


def residual_occurrences(word: str, state_set):
    prefix = prefix_vectors(word)
    hits = []
    for j in range(len(word)):
        p_a = interval_pv(prefix, 0, j)
        for k in range(j + 1, len(word)):
            p_b = interval_pv(prefix, j + 1, k)
            q = sub(p_a, p_b)
            state = (*q, word[j], word[k])
            if state in state_set:
                hits.append((j, k, state))
    return hits


def state_graph_cycles(states, transitions):
    graph = defaultdict(set)
    for row in transitions:
        target = (*row[:4], row[4], row[5])
        source = (*row[-4:], row[6], row[8])
        graph[target].add(source)

    index = 0
    stack = []
    on_stack = set()
    indices = {}
    lowlink = {}
    cyclic_components = []

    def visit(v):
        nonlocal index
        indices[v] = lowlink[v] = index
        index += 1
        stack.append(v)
        on_stack.add(v)
        for w in graph[v]:
            if w not in indices:
                visit(w)
                lowlink[v] = min(lowlink[v], lowlink[w])
            elif w in on_stack:
                lowlink[v] = min(lowlink[v], indices[w])
        if lowlink[v] == indices[v]:
            component = []
            while True:
                w = stack.pop()
                on_stack.remove(w)
                component.append(w)
                if w == v:
                    break
            if len(component) > 1 or (component and component[0] in graph[component[0]]):
                cyclic_components.append(sorted(component))

    for state in states:
        if state not in indices:
            visit(state)
    return cyclic_components


def main():
    print("P7 CLEAN-ROOM RECONSTRUCTION")
    print("submitted verifier/CSV inputs read: NO")
    print("morphism image lengths:", {a: len(G[a]) for a in ALPHABET})
    print("morphism symbols:", {a: sorted(set(G[a])) for a in ALPHABET})
    sigma = str.maketrans("abcd", "bcda")
    print(
        "cyclic image relation:",
        G["b"] == G["a"].translate(sigma),
        G["c"] == G["b"].translate(sigma),
        G["d"] == G["c"].translate(sigma),
    )
    print("incidence matrix:", M)
    print("incidence determinant:", determinant(M))

    print("S first square:", first_abelian_square(S))
    for letter in ALPHABET:
        witness = first_abelian_square(letter + S)
        print(f"left extension {letter}+S:", witness)

    print("C length:", len(C), "first square:", first_abelian_square(C))
    w0 = C
    w1 = C + morph(w0)
    w2 = C + morph(w1)
    expanded_w2 = C + morph(C) + morph(morph(C))
    print("tower lengths:", [len(w0), len(w1), len(w2)])
    print("nested prefixes:", w1.startswith(w0), w2.startswith(w1))
    print("W2 algebraic expansion matches:", w2 == expanded_w2)
    print("W1 first square:", first_abelian_square(w1))
    w2_crossing = next(crossing_squares(w2, len(C)), None)
    print("W2 crossing square:", w2_crossing)

    seed_rows, states = derive_seed_rows()
    state_set = set(states)
    print("seed parameter rows (t=0..85):", len(seed_rows))
    print("unique residual states:", len(states))
    print("seed digest:", canonical_digest(seed_rows))
    print("state digest:", canonical_digest(states))
    sums = sorted({sum(state[:4]) for state in states})
    print("state q coordinate sums:", sums)

    transitions = derive_transitions(states)
    outside = []
    for row in transitions:
        source = (*row[-4:], row[6], row[8])
        if source not in state_set:
            outside.append((row, source))
    print("recursive transition rows:", len(transitions))
    print("transition digest:", canonical_digest(transitions))
    print("transition sources outside Q:", len(outside))

    target_alignment_counts = Counter((*row[:4], row[4], row[5]) for row in transitions)
    print("maximum integral alignment multiplicity for one target state:", max(target_alignment_counts.values(), default=0))
    ambiguous_targets = sorted(
        (target, count) for target, count in target_alignment_counts.items() if count > 1
    )
    print("targets with multiple integral alignments:", ambiguous_targets)
    cycles = state_graph_cycles(states, transitions)
    print("state-only cyclic SCC count:", len(cycles))
    print("state-only cyclic SCCs:", cycles)

    descent_rows = []
    for row in transitions:
        h, r, k = row[6], row[7], row[8]
        q_prime = row[-4:]
        min_a = sum(max(value, 0) for value in q_prime)
        min_b = sum(max(-value, 0) for value in q_prime)
        target_j = len(C) + 85 * min_a + r
        margin = target_j - min_a
        algebraic_source_span_lower_bound = min_a + 1 + min_b + 1
        descent_rows.append(
            (
                margin,
                algebraic_source_span_lower_bound,
                target_j,
                min_a,
                h,
                r,
                k,
                row,
            )
        )
    descent_rows.sort()
    print("minimum exact descent margin:", descent_rows[0][0] if descent_rows else None)
    print("worst descent row:", descent_rows[0] if descent_rows else None)
    print("nondecreasing transition occurrence possible:", any(row[0] <= 0 for row in descent_rows))

    short_square_prefix_length = (len(C) - 1) + 2 * (85 - 1)
    max_same_block_k = max(2 * (83 + s) + 1 - s for s in sums)
    max_c_first_k = max(2 * (len(C) - 1) + 1 - s for s in sums)
    residual_prefix_length = max(max_same_block_k, max_c_first_k) + 1
    independently_sufficient = max(short_square_prefix_length, residual_prefix_length)
    print("short-square sufficient prefix length:", short_square_prefix_length)
    print("nonrecursive-residual sufficient prefix length:", residual_prefix_length)
    print("independently sufficient common prefix length:", independently_sufficient)
    print("submitted 190 bound has slack:", 190 - independently_sufficient)

    base = w1[:190]
    print("base actual length:", len(base))
    print("base first square:", first_abelian_square(base))
    base_hits = residual_occurrences(base, state_set)
    print("base residual hits:", len(base_hits), base_hits[:1])
    c_hits = residual_occurrences(C, state_set)
    print("C residual hits:", len(c_hits), c_hits[:1])

    seed_t85 = sum(1 for row in seed_rows if row[4] == 85)
    seed_t0 = sum(1 for row in seed_rows if row[4] == 0)
    print("seed rows with t=85:", seed_t85)
    print("seed rows with t=0:", seed_t0)

    prefixless_counterexample = C + morph("b")
    print(
        "prefixless v0.1 counterexample V=b, first square in Cg(V):",
        first_abelian_square(prefixless_counterexample),
    )


if __name__ == "__main__":
    main()
