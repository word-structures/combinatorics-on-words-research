#!/usr/bin/env python3
"""
Independent verifier for Paper 4 subset-factor covers over h6^omega(a).

This script does NOT rely on a long generated prefix for the factor-language claim.
For the 3-uniform morphism h6, exact length-n factors are generated recursively:
any length-n factor intersects at most ceil((n+2)/3) source letters.

Status: exploratory independent verification aid, not canonical evidence.
"""

from functools import lru_cache
from math import ceil
import json

H6 = {
    "a": "ace",
    "b": "adf",
    "c": "bdf",
    "d": "bdc",
    "e": "afe",
    "f": "bce",
}

# Exact h6 bigram language as independently regenerated / manuscript baseline.
F2 = {
    "ac","ad","af","bc","bd","cb","ce","dc","df",
    "ea","eb","fa","fb","fe"
}

@lru_cache(maxsize=None)
def factors_exact(n):
    if n == 1:
        return set(H6)
    if n == 2:
        return set(F2)
    q = ceil((n + 2) / 3)
    source = factors_exact(q)
    result = set()
    for v in source:
        hv = "".join(H6[ch] for ch in v)
        for i in range(len(hv) - n + 1):
            result.add(hv[i:i+n])
    return result

def subset_factors(S, max_n):
    result = set()
    for n in range(1, max_n + 1):
        result |= {v for v in factors_exact(n) if set(v) <= S}
    return result

def maximal_factor_antichain(words):
    return sorted(
        [w for w in words if not any(w != z and w in z for z in words)],
        key=lambda x: (len(x), x),
    )

def analyze(name, symbols, search_to=25, block_length=40):
    S = set(symbols)
    by_n = {}
    for n in range(1, search_to + 1):
        by_n[n] = sorted(v for v in factors_exact(n) if set(v) <= S)

    nonempty = [n for n, vals in by_n.items() if vals]
    R = max(nonempty)
    if R == search_to:
        raise RuntimeError(f"{name}: increase search_to; bound not closed")

    all_words = subset_factors(S, R)
    cover = maximal_factor_antichain(all_words)

    # Fail closed: every S-only factor through R must be contained in a cover word,
    # and there must be no S-only factor of length R+1.
    assert not by_n[R + 1]
    for w in all_words:
        assert any(w in c for c in cover), (name, w)

    return {
        "name": name,
        "symbols": "".join(sorted(S)),
        "max_S_only_macro_length": R,
        "exact_maximal_factor_cover": cover,
        "cover_lengths": [len(c) for c in cover],
        "natural_complete_half_period_ceiling_at_L40":
            max((len(c) * block_length) // 2 for c in cover),
        "no_S_only_factor_at_length": R + 1,
    }

def main():
    complexity = {str(n): len(factors_exact(n)) for n in range(1, 21)}
    # Regression against known low-n factor complexities.
    assert [complexity[str(n)] for n in range(1, 9)] == [6,14,22,30,38,44,52,60]

    results = {
        "morphism": H6,
        "factor_complexity_p1_to_p20": complexity,
        "subset_gates": [
            analyze("AF", "af"),
            analyze("AEF", "aef"),
            analyze("NO_C_ABDEF", "abdef"),
        ],
    }

    expected = {
        "AF": ["faf"],
        "AEF": ["eafea", "fafea"],
        "NO_C_ABDEF": [
            "eafea",
            "bdfadfbdfafea",
            "ebdfafeadfbdfafea",
        ],
    }
    for item in results["subset_gates"]:
        assert item["exact_maximal_factor_cover"] == expected[item["name"]]

    print(json.dumps(results, indent=2, sort_keys=True))

if __name__ == "__main__":
    main()
