# Full Rao–Rosenfeld-style parent-superset × partial-target experiment
**Date:** 2026-08-29  
**Status:** clean-room research experiment; Paper 4 unchanged

## Question

Can the Paper-4 partial-target reachable-set layer reproduce, *without knowing
the literal unresolved target image*, the union of all Rao–Rosenfeld outer
parent templates that could occur under any profile-compatible completion?

And does it reduce meaningful work?

## Source and fixed-target control

Source:
`h6: a→ace, b→adf, c→bdf, d→bdc, e→afe, f→bce`.

Target control:
the published 10-uniform ternary `g3`.

The finite RR-style candidate generator was rebuilt from the published parent
equation and integer linear algebra.  A rational contracted projection

```
Q = [ 0 -2  1  1  0  0
     -1  1 -1  0  1  0
     -1 -1  1  0  0  1 ]
```

satisfies `Q Mh^2 = 0`.

Because complete `h6^2` images vanish under Q, every factor's Q-value is
determined by at most one suffix and one prefix of length-9 superblocks.
Exact enumeration gives factor-difference bounds

```
|Q d| <= (4,4,2).
```

For every source boundary-letter triple and every split of the three `g3`
images, the generator solves the published parent equation with Smith normal
form and retains every integer `d` inside these source-realizability bounds.

### Fixed g3 candidate universe

| quantity | count |
|---|---:|
| raw boundary split choices | 287,496 |
| distinct target vectors `v` | 9,418 |
| `v` with bounded integer solutions | 677 |
| bounded solution witnesses | 23,615 |
| **unique parent templates** | **9,925** |

Rao–Rosenfeld report that their computation gives **at most 16,214** parents by
`g3` realizable by `h6`.

The 9,925 figure is **not claimed to reproduce their exact implementation**.
It is a tighter RR-style finite superset obtained with a different rational
projection and exact `h6^2` factor bounds.  The smaller number is therefore not
a contradiction.

## Main test: one target role unresolved

For each source role in turn, its literal `g3` image was erased while its total
Parikh profile remained fixed.  All other target images remained literal.

Two independent oracles were compared:

**Literal-union oracle.** Enumerate all words with the prescribed profile and
collect the reachable boundary values / parent templates obtainable by at least
one literal completion.

**Parametric oracle.** Do not enumerate target words.  Enumerate only monotone
prefix-Parikh chains at the at-most-three cut depths and compute the exact
reachable set of the Paper-4 support signature.

### Exact parent-set parity

| role | profile | literal words | literal parent union | parametric parent union | missing | spurious |
|---|---|---:|---:|---:|---:|---:|
| a | (5,4,1) | 1,260 | 15,009 | 15,009 | **0** | **0** |
| b | (1,2,7) | 360 | 13,931 | 13,931 | **0** | **0** |
| c | (0,4,6) | 210 | 13,275 | 13,275 | **0** | **0** |
| d | (2,0,8) | 45 | 12,211 | 12,211 | **0** | **0** |
| e | (3,6,1) | 840 | 14,751 | 14,751 | **0** | **0** |
| f | (9,1,0) | 10 | 11,548 | 11,548 | **0** | **0** |

For every role, all **541** support signatures occurring in the full outer
split enumeration also had exact literal-chain versus monotone-Parikh-chain
reachable-set parity.

Direct word-by-word full parent generation was additionally run for roles
`f,d,c,b` (10, 45, 210 and 360 literal completions respectively).  Every direct
union again matched the parametric parent union with missing=0 and spurious=0.

## Does the exact reachable set shrink the parent set?

Compare the exact monotone-chain reachable set with a weaker relaxation that
allows prefix Parikh vectors at different depths to be chosen independently.

| role | coarse parents | exact parents | removed | parent reduction |
|---|---:|---:|---:|---:|
| a | 15,477 | 15,009 | 468 | 3.02% |
| b | 14,393 | 13,931 | 462 | 3.21% |
| c | 13,466 | 13,275 | 191 | 1.42% |
| d | 12,356 | 12,211 | 145 | 1.17% |
| e | 15,211 | 14,751 | 460 | 3.02% |
| f | 11,641 | 11,548 | 93 | 0.80% |

This is the experiment's main **negative** result: at the level of *unique
parent-template count*, exact chain consistency gives only a modest 0.8–3.2%
reduction over a sensible coarse profile relaxation.

So the bridge is **not** a dramatic parent-count sieve on this example.

## Where the computational gain actually appears

The important gain is that “some literal completion realizes this parent”
can be answered without enumerating all literal completions.

For each role, the 541 support signatures were precomputed in two ways:

| role | literal signature×word evaluations | valid Parikh-chain tuples | ratio | chain time | literal time | microbenchmark |
|---|---:|---:|---:|---:|---:|---:|
| a | 681,660 | 18,857 | 2.77% | 0.093 s | 1.963 s | **21.0×** |
| b | 194,760 | 11,210 | 5.76% | 0.052 s | 0.556 s | **10.8×** |
| c | 113,610 | 6,757 | 5.95% | 0.027 s | 0.323 s | **12.1×** |
| d | 24,345 | 3,629 | 14.91% | 0.014 s | 0.071 s | **5.0×** |
| e | 454,440 | 16,018 | 3.52% | 0.079 s | 1.367 s | **17.4×** |
| f | 5,410 | 1,837 | 33.96% | 0.007 s | 0.016 s | **2.3×** |

These are Python microbenchmarks, not end-to-end solver speedups.

But they expose the real algorithmic distinction:

- literal completion count for a balanced length-L profile is multinomial and
  grows exponentially in L;
- one Paper-4 parent witness uses at most three prefix depths;
- for a fixed output alphabet, exact prefix-Parikh chain enumeration at a fixed
  number of depths is polynomial in L.

Thus the partial-target bridge has a plausible **asymptotic synthesis advantage**
even though it does not compress the full block-word search state and only
modestly shrinks the unique parent-template set.

## Critical interpretation

### Passed

1. Full finite RR-style matrix/boundary candidate generation was implemented.
2. The parametric parent-union criterion reproduced the literal-completion union
   for all six `g3` profiles with **0 missing and 0 spurious parents**.
3. The same held under direct full word-by-word parent generation in four
   nontrivial controls.
4. Reachable-set precomputation was materially cheaper than literal word
   enumeration already at L=10.

### Did not pass

The hope that exact reachability would itself collapse the unique parent set by
an order of magnitude did **not** materialize.  The reduction over a coarse
profile relaxation was only about 1–3%.

### Still missing

This experiment stops before the complete recursive ancestor/realizability
closure and before an actual morphism-synthesis search.

The next decisive test is therefore end-to-end:

```
profile assignment
  -> partial-target parent constraints
  -> target-word synthesis
  -> fixed-target RR ancestor certificate
```

versus

```
literal target-word enumeration
  -> fixed-target RR ancestor certificate for each candidate
```

with identical final morphism solution sets.

## Verdict

**A-/B+ — EXACT PARAMETRIC PARENT UNION CONFIRMED; PRACTICAL CONTRIBUTION SHIFTS FROM “PARENT-COUNT SIEVE” TO “AVOID LITERAL COMPLETION ENUMERATION.”**

This is now credible Paper-5 material at the theorem/algorithm level, but one
end-to-end synthesis benchmark is still required before claiming a strong
practical solver contribution.
