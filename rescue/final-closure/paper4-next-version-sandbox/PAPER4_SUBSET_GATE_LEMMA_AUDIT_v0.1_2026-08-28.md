# PAPER 4 — Independent subset-gate lemma audit

**Version:** v0.1  
**Date:** 2026-08-28  
**Status:** INDEPENDENT PARALLEL AUDIT — NOT CANONICAL PAPER-4 EVIDENCE  
**Scope:** finite subset-factor mathematics for the current `h6` / `L=40` architecture  
**No manuscript or Git mutation performed.**

## 1. Executive result

The proposed **finite subset-gate idea is mathematically sound**, but the research-plan wording can be sharpened substantially.

The two immediate covers are independently confirmed:

- `AF`: unique factor-maximal cover `faf`; maximum AF-only macro-factor length `R_AF = 3`; for `L=40`, complete natural half-period ceiling `K <= 60`.
- `AEF`: factor-maximal cover `eafea`, `fafea`; maximum AEF-only macro-factor length `R_AEF = 5`; for `L=40`, complete natural half-period ceiling `K <= 100`.

A useful new correction/refinement appears for the no-C stage:

- maximum no-C macro-factor length is indeed **17**;
- however, the unique factor-maximal no-C cover is **not a single 17-block word**;
- the exact factor-maximal cover is

```text
eafea
bdfadfbdfafea
ebdfafeadfbdfafea
```

with lengths `5, 13, 17`.

Thus the global no-C natural ceiling is still `K <= 340` at `L=40`, but an exact complete no-C gate should check all three cover words (or another independently proved equivalent cover), not merely the longest 17-block factor.

## 2. General theorem — finite subset-factor gate

Let `x` be an infinite word over macro alphabet `Gamma`, and let

`H : Gamma -> Sigma^L`

be an `L`-uniform coding.

Fix a role subset `S subset Gamma`, and assume the `S`-only factor language is bounded: there exists `R` such that

`Fact(x) intersect S*`

contains no word of length `R+1`.

Define `C_S` to be the set of **factor-maximal** elements of

`Fact(x) intersect S*`

under ordinary contiguous-factor containment.

Then:

> **Finite subset-gate theorem.**  
> Every factor of `H(x)` whose minimal macro support uses only letters of `S` occurs inside `H(c)` for some `c in C_S`. Conversely, every factor of every `H(c)`, `c in C_S`, occurs in `H(x)`. Therefore the absence of `S`-supported Abelian squares is certified exactly by checking the finitely many words `H(c)`, `c in C_S`.

### Proof

Take an output factor `z` whose minimal macro support is an `S`-only macro word `u`. Then `u in Fact(x) intersect S*`.

Because all `S`-only factors have length at most `R`, the set of `S`-only factors containing `u` is finite and nonempty. Choose a factor-maximal one, say `c`. Then `c in C_S` and `u` is a factor of `c`. Since `H` is a morphism, the aligned block word `H(u)` is a factor of `H(c)`, and hence the original output factor `z` is a factor of `H(c)`.

Conversely, `c in Fact(x)` implies `H(c) in Fact(H(x))`, so every factor found in a cover image is genuine.

This proves the exact equivalence.

### Important strengthening

The theorem does **not** require `x` to be primitive morphic or even recurrent. Boundedness of the `S`-only factor language is enough. Primitivity/morphic structure is useful only for *computing or proving* that bounded language.

## 3. Natural half-period bound

If `c` has macro length `r`, then `H(c)` has length `Lr`.

Any Abelian square `UV` contained in `H(c)` has

`2K = |UV| <= Lr`, where `K = |U| = |V|`.

Therefore it is enough—and exact—to scan

`K <= floor(Lr/2)`.

If `R = max |c|` over the subset cover, the single global ceiling

`K <= floor(LR/2)`

is sufficient.

For the current `L=40` specialization:

- AF: `R=3`, hence `K<=60`.
- AEF: `R=5`, hence `K<=100`.
- no-C/ABDEF: `R=17`, hence global `K<=340`.

For the three no-C cover words individually, the ceilings are `100`, `260`, and `340`.

## 4. Maximal-factor cover lemma

The research plan's proposed “maximal-factor cover” lemma is valid after a terminology refinement.

A cleaner statement is:

> **Factor-maximal cover lemma.**  
> If `Fact(x) intersect S*` has bounded word length, its factor-maximal elements form a finite, sufficient, and irredundant cover of all `S`-only factors under contiguous-factor containment.

The cover is **unique** as the set of maximal elements of this finite factor-poset.

“Irredundant” is preferable to an unqualified “minimal” unless the manuscript explicitly defines the class of allowed covers. If covers are required to consist of actual `S`-only factors and coverage means substring containment, then these maximal elements are forced and the cover is minimum as well.

## 5. Consequence for the three proposed research-plan lemmas

### Proposed Lemma A — finite subset-gate lemma

**Verdict: VALID, AND CAN BE STRENGTHENED.**

The primitive-morphic hypothesis is unnecessary. Replace it by the direct boundedness hypothesis on `Fact(x) intersect S*`.

### Proposed Lemma B — maximal-factor cover

**Verdict: VALID AFTER WORDING REFINEMENT.**

Use “factor-maximal elements” rather than “remaining maximal antichain”. The latter is potentially ambiguous because a poset can have many maximal antichains, while the set of maximal elements here is canonical.

### Proposed Lemma C — staged role-order principle

**Verdict: NOT YET A MATHEMATICAL LEMMA.**

“Choose role order by how strongly each new role enlarges the actual subset-factor context exposed to exact checking” is a sensible search-design principle, but without a formally defined optimization criterion it is not a theorem. Keep it as a heuristic/design principle unless a quantitative objective and proof are added.

## 6. Independent exact h6 factor regeneration

The only hard-coded mathematical input in the verifier is

```text
a -> ace
b -> adf
c -> bdf
d -> bdc
e -> afe
f -> bce
```

The length-2 factor set is regenerated as the least fixed point of:

1. pairs internal to an `h6` image;
2. boundary pairs `last(h6(x)) first(h6(y))` induced by already admitted source pairs `xy`.

This gives exactly the 14 pairs already used by Paper 4:

```text
ac ad af bc bd cb ce dc df ea eb fa fb fe
```

For `n >= 3`, exact length-`n` factors are regenerated recursively from uniformity:

`B_n = union_{v in B_m} Fact_n(h6(v))`

where

`m = ceil((n+2)/3)`.

This equality is exact: an `n`-factor can start at offset at most 2 inside a 3-uniform image block and hence intersects at most `ceil((n+2)/3)` source blocks; conversely every factor of `h6(v)` for an actual source factor `v` occurs in the fixed point.

The independently regenerated factor complexities through length 19 are:

```text
p(1..19) =
6, 14, 22, 30, 38, 44, 52, 60, 66, 74,
82, 90, 98, 106, 112, 118, 124, 130, 138
```

## 7. Exact subset results

### AF

No factor of length 4 lies entirely in `{a,f}`.

The factor-maximal AF-only set is exactly:

```text
faf
```

Hence the proposed AF complete gate is independently confirmed.

### AEF

No factor of length 6 lies entirely in `{a,e,f}`.

The factor-maximal AEF-only set is exactly:

```text
eafea
fafea
```

Hence the proposed AEF complete gate is independently confirmed.

### no-C = ABDEF

No factor of length 18 avoids `c`.

The maximum no-C length is therefore exactly 17.

The factor-maximal no-C set is:

```text
eafea
bdfadfbdfafea
ebdfafeadfbdfafea
```

These three words are pairwise non-containing. Therefore none can be dropped from the canonical **factor-cover** merely because one of the others is longer.

This is the main new refinement from this independent audit.

## 8. Scientific interpretation

The complete-subset architecture has a clean theorem-level basis:

`assigned role subset`
`-> exact bounded subset-factor language`
`-> factor-maximal finite cover`
`-> exhaustive Abelian-square scan on the cover images`.

This is stronger and cleaner than an arbitrary `K<=40` or `K<=80` search gate because its cutoff is derived from the actual bounded macro support available at that stage.

However, the result should not be oversold:

- it is an elementary locality/finite-poset theorem;
- it does not by itself establish novelty;
- it does not prove existence or nonexistence of any block assignment;
- it does not replace Gate T for squares whose macro support uses roles outside the currently assigned subset;
- it does not make the staged role order optimal.

## 9. Recommended manuscript formulation

A strong next-version organization would be:

1. **Finite subset-factor theorem** — general exact statement.
2. **Factor-maximal cover corollary** — canonical finite test set.
3. **h6 specialization table** — AF, AEF, no-C.
4. Search architecture as an application:
   `F -> AF_complete -> AEF_complete -> ADEF_complete -> ABDEF_no-C-complete -> ...`

Do not call the role-order rule itself a lemma unless it is formalized.

## 10. Reproducibility

Independent verifier:

`verify_paper4_subset_gates.py`

SHA256:

`cf897ce47219592e5278365698f0ec935992f6798cb51a6fc9e4867d1b9c4e96`

Captured output:

```text
Exact B2: ac ad af bc bd cb ce dc df ea eb fa fb fe
Factor complexity p(n), n=1..19:
1:6 2:14 3:22 4:30 5:38 6:44 7:52 8:60 9:66 10:74 11:82 12:90 13:98 14:106 15:112 16:118 17:124 18:130 19:138

AF
  max S-only factor length R = 3
  first forbidden all-S length = 4
  factor-maximal cover:
    faf  (length 3)
  number of distinct S-only factors through R = 5
  per-length counts = {1: 2, 2: 2, 3: 1}

AEF
  max S-only factor length R = 5
  first forbidden all-S length = 6
  factor-maximal cover:
    eafea  (length 5)
    fafea  (length 5)
  number of distinct S-only factors through R = 16
  per-length counts = {1: 3, 2: 4, 3: 4, 4: 3, 5: 2}

noC_ABDEF
  max S-only factor length R = 17
  first forbidden all-S length = 18
  factor-maximal cover:
    eafea  (length 5)
    bdfadfbdfafea  (length 13)
    ebdfafeadfbdfafea  (length 17)
  number of distinct S-only factors through R = 149
  per-length counts = {1: 5, 2: 9, 3: 12, 4: 13, 5: 14, 6: 13, 7: 13, 8: 13, 9: 12, 10: 11, 11: 10, 12: 8, 13: 6, 14: 4, 15: 3, 16: 2, 17: 1}

Natural complete half-period ceilings for L=40:
  AF: global K <= 60
    faf: K <= 60
  AEF: global K <= 100
    eafea: K <= 100
    fafea: K <= 100
  noC_ABDEF: global K <= 340
    eafea: K <= 100
    bdfadfbdfafea: K <= 260
    ebdfafeadfbdfafea: K <= 340
```

## 11. Epistemic status

- General finite subset-factor theorem: **PROVED HERE FROM DEFINITIONS**.
- Factor-maximal cover corollary: **PROVED HERE FROM DEFINITIONS**.
- AF cover `faf`, `R=3`: **INDEPENDENT EXACT COMPUTATION**.
- AEF cover `eafea, fafea`, `R=5`: **INDEPENDENT EXACT COMPUTATION**.
- no-C maximum length `17`: **INDEPENDENT EXACT COMPUTATION**.
- no-C factor-maximal cover of three words: **INDEPENDENT EXACT COMPUTATION**.
- Paper-4 canonical promotion: **NOT PERFORMED**.
- Novelty: **NOT ESTABLISHED**.
