#!/usr/bin/env python3
"""
Independent exact verifier for Paper 4 subset-factor gates.

No project code is imported.  The only hard-coded mathematical input is h6.

Method:
  1. Regenerate the exact length-2 factor language as the least fixed point of
     internal image pairs plus substitution-boundary propagation.
  2. For n >= 3, regenerate exact B_n recursively using uniformity:
        B_n = union_{v in B_m} Fact_n(h6(v)),
        m = ceil((n+2)/3).
  3. For a role subset S, find the first n with no S-only factor.
     If this is R+1, every S-only factor has length <= R.
  4. Collect all S-only factors of lengths 1..R and retain the unique
     factor-maximal elements under substring containment.

This verifies the finite macro covers only.  It does not search block words.
"""

from functools import lru_cache
from math import ceil

H6 = {
    "a": "ace",
    "b": "adf",
    "c": "bdf",
    "d": "bdc",
    "e": "afe",
    "f": "bce",
}
ALPHABET = tuple(sorted(H6))
Q = 3

def factors(s, n):
    return {s[i:i+n] for i in range(len(s)-n+1)}

def exact_B2():
    # Every pair in the fixed point is either internal to an h6 image,
    # or crosses an h6-image boundary induced by a source pair.
    pairs = set()
    for x in ALPHABET:
        pairs |= factors(H6[x], 2)

    changed = True
    while changed:
        changed = False
        for xy in tuple(pairs):
            boundary = H6[xy[0]][-1] + H6[xy[1]][0]
            if boundary not in pairs:
                pairs.add(boundary)
                changed = True
    return frozenset(pairs)

B2 = exact_B2()

@lru_cache(None)
def B(n):
    if n == 1:
        return frozenset(ALPHABET)
    if n == 2:
        return B2
    m = ceil((n + (Q - 1)) / Q)  # ceil((n+2)/3)
    out = set()
    for v in B(m):
        hv = "".join(H6[ch] for ch in v)
        out |= factors(hv, n)
    return frozenset(out)

def factor_maximal(words):
    words = set(words)
    return tuple(sorted(
        (u for u in words if not any(u != v and u in v for v in words)),
        key=lambda s: (len(s), s)
    ))

def subset_cover(S, search_limit=100):
    S = set(S)
    first_empty = None
    for n in range(1, search_limit + 1):
        s_only = {u for u in B(n) if set(u) <= S}
        if not s_only:
            first_empty = n
            break
    if first_empty is None:
        raise RuntimeError("No bounded subset-run length found within search limit.")

    R = first_empty - 1
    all_s = set()
    counts = {}
    for n in range(1, R + 1):
        here = {u for u in B(n) if set(u) <= S}
        counts[n] = len(here)
        all_s |= here

    cover = factor_maximal(all_s)

    # Fail-closed checks.
    assert not any(set(u) <= S for u in B(R + 1))
    for u in all_s:
        assert any(u in c for c in cover), (u, cover)
    for i, c in enumerate(cover):
        for j, d in enumerate(cover):
            if i != j:
                assert c not in d
    return R, cover, counts, len(all_s)

def main():
    expected_B2 = {
        "ac","ad","af","bc","bd","cb","ce","dc","df","ea","eb","fa","fb","fe"
    }
    assert set(B2) == expected_B2

    # Independent exact factor-complexity values through 19.
    complexity = {n: len(B(n)) for n in range(1, 20)}

    cases = {
        "AF": set("af"),
        "AEF": set("aef"),
        "noC_ABDEF": set("abdef"),
    }

    print("Exact B2:", " ".join(sorted(B2)))
    print("Factor complexity p(n), n=1..19:")
    print(" ".join(f"{n}:{complexity[n]}" for n in range(1,20)))
    print()

    for name, S in cases.items():
        R, cover, counts, total = subset_cover(S)
        print(name)
        print("  max S-only factor length R =", R)
        print("  first forbidden all-S length =", R+1)
        print("  factor-maximal cover:")
        for c in cover:
            print(f"    {c}  (length {len(c)})")
        print("  number of distinct S-only factors through R =", total)
        print("  per-length counts =", counts)
        print()

    # Expected Paper-4-specific results.
    assert subset_cover(set("af"))[0:2] == (3, ("faf",))
    assert subset_cover(set("aef"))[0:2] == (5, ("eafea", "fafea"))
    assert subset_cover(set("abdef"))[0:2] == (
        17,
        ("eafea", "bdfadfbdfafea", "ebdfafeadfbdfafea")
    )

    L = 40
    print("Natural complete half-period ceilings for L=40:")
    for name, S in cases.items():
        R, cover, _, _ = subset_cover(S)
        print(f"  {name}: global K <= {L*R//2}")
        for c in cover:
            print(f"    {c}: K <= {L*len(c)//2}")

if __name__ == "__main__":
    main()
