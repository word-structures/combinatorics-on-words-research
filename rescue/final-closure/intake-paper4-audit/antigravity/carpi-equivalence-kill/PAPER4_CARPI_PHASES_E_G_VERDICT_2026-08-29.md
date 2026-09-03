# Phase E–G: Theorem Type Comparison, Terminology Search, and Final Verdict

**Date:** 2026-08-29
**Status:** ADVERSARIAL — final assessment

## Phase E: Theorem Type Classification

### Carpi 1993 — Theorem type

**Question answered:** Given a uniform morphism h: Gamma* -> Sigma*, is h abelian k-power-free?

**Mathematical object:** A BOOLEAN CRITERION for a specific morphism. The output is: "h preserves abelian k-power-freeness" or "it does not."

**Scope:** The morphism is FULLY SPECIFIED. Every block image h(a) is known. The theorem gives conditions (C1, C2, C3) on h such that h(w) is abelian k-power-free whenever w is.

**Algebra used:** Parikh-vector prefix sums, boundary prefix/suffix decompositions, and a finitary check over bounded-length factors.

### Paper 4 — Theorem type

**Question answered:** Given a uniform L-block code with one unresolved role X, what is the complete geometric classification of all possible unresolved-support coefficient structures?

**Mathematical object:** A FINITE CATALOGUE of algebraic support families with closed cardinalities.

**Scope:** The code is PARTIALLY SPECIFIED. Some block roles are assigned, one is not. The theorem classifies the constraint support geometry independently of the assigned data.

**Algebra used:** Euclidean carry arithmetic on arithmetic progressions, role-projected prefix-depth signatures, and a quotient by complete-set equality.

### Comparison

| Property | Carpi | Paper 4 |
|---|---|---|
| Input | A fully specified morphism h | A partially specified block code |
| Output | Yes/No (is h ASF-preserving?) | A catalogue of 19 support families |
| Hypothesis about source word | Source word is ASF | No source word — direct construction |
| Role of the morphism | Central (it IS the morphism) | Peripheral (the macro language is fixed) |
| What is classified | Nothing — it is a criterion | The support geometry under partial assignment |
| Partial assignment | Not considered | The entire point |

**Verdict:** These are **incomparable specializations** of the same general Parikh algebra. Carpi gives a criterion; Paper 4 gives a classification. One is not a corollary of the other.

The closest analogy: Carpi is to Paper 4 as the general theory of linear equations is to a specific classification of lattice points in a polytope family. Both use linear algebra, but they solve different problems.

## Phase F: Terminology Search

Searched narrowly for:
1. "Carpi condition C3 support types" — no classification of support types found.
2. "Abelian morphism boundary cases" — boundary cases exist in Carpi but are organized by delta (boundary/interior), not by carries.
3. "Template coefficient classes" — Currie-Rampersad template method classifies PARENTS, not support families. Different object.
4. "Prefix-difference support classification" — no prior classification found.
5. "Partial morphism assignment" — not found as a concept in the literature.
6. "Coloured template supports" — not found.
7. "Constant-length template boundary classification" — Eyidogan-Goral-Tanisali 2026 discuss boundary configurations for their sieve, but use Carpi's delta framework, not carries. Their partition is by boundary type, not by carry geometry.

**No exact or equivalent prior classification found.**

The closest existing framework is the template method of Currie-Rampersad, which also partitions constraints by block alignment. But the template method:
- Classifies PARENTS (source words that could produce a violation).
- Does not consider partial assignment.
- Does not produce a support-family quotient.
- Does not separate support geometry from target data.

## Phase G: Final Adversarial Verdict

### Level Assessment

LEVEL 0 — Everything follows directly from Carpi.
  REJECTED. Carpi does not have partial assignment, carries, or support families.

LEVEL 1 — Carry domains are old, role patterns new.
  PARTIALLY APPLICABLE. The AP constraint and Delta in {-1,0,+1} are classical.
  But the specific six-domain partition by carry pairs is NOT in the literature.
  The carry observation is elementary but the exact six-case organization is new.

LEVEL 2 — Carry domains and role patterns are routine, 19-family quotient new.
  CLOSEST FIT. The six domains are an elementary consequence of Euclidean division
  applied to the AP constraint. The role patterns (34) follow mechanically once chi
  is defined. The 19-family quotient requires a new equivalence relation and non-trivial
  bookkeeping.

LEVEL 3 — The exact complete-support classification as a whole is new.
  TOO STRONG. The ingredients (AP constraint, Euclidean division, Parikh algebra)
  are classical. The novelty is in the specific combination and the support/target separation.

### FINAL VERDICT: C

**CARRY/SECOND-DIFFERENCE ALGEBRA IS PRIOR ART,
BUT ROLE-PROJECTED SUPPORT CLASSIFICATION IS NOT DERIVED FROM IT.**

Specifically:
- The (+1, -2, +1) prefix second difference is classical (explicitly acknowledged by Paper 4).
- The curvature Delta in {-1, 0, +1} is an elementary consequence of the AP constraint.
- The six carry domains are an elementary Euclidean partition, but are NOT stated as such in the literature.
- The partial-assignment concept (occurrence mask chi, support/target separation) is NOT in Carpi or any located prior work.
- The 34-pattern count and the 19-family quotient are NOT derivable from any examined prior framework.

### Safe Novelty Sentence for Paper 4

"The underlying Parikh prefix second-difference algebra and the three-valued macro curvature are classical. The present contribution is the exact role-projected support classification under partial assignment: the carry-domain partition into six geometric cases, the 34 physically realizable role/domain patterns arising from block-coincidence constraints on the occurrence mask, and the 19-family quotient by complete reduced support-set equality. These objects do not appear in Carpi's criterion for morphism preservation [Carpi 1993], in the Currie-Rampersad template method [CR 2012], or in the recent Eyidogan-Goral-Tanisali sieve [EGT 2026], all of which address the fully-specified-morphism problem rather than partial assignment under staged synthesis."

### Epistemic Qualification

This verdict is issued without full primary-source access to Carpi 1993 (DOI: 10.1142/S021819679300010X; paywalled). The analysis is based on:
1. Web search descriptions of Carpi's conditions C1–C3.
2. The Eyidogan-Goral-Tanisali 2026 paper's discussion of Carpi.
3. First-principles mathematical reconstruction of what Carpi's framework can and cannot produce.

If primary-source access reveals that Carpi explicitly considers partial block assignment or carry-based domain partitions, this verdict must be revised. Based on all available evidence, this is unlikely: Carpi's paper addresses a different mathematical question (morphism preservation criterion vs partial-assignment support classification).

STATUS: NOVELTY_UNRESOLVED -> NOVELTY PROVISIONALLY SUPPORTED at Level C.
Full resolution requires primary-source access and specialist confirmation.
