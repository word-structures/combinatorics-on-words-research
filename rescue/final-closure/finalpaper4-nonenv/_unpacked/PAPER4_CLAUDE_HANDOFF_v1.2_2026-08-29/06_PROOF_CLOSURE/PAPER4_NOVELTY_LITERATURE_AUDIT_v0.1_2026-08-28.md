# Paper 4 — targeted novelty / literature audit

**Version:** v0.1  
**Date:** 2026-08-28  
**Scope:** FAF–AFE support theorem, midpoint excess family, shared-support/enlarged-target-set formulation, and neighboring Paper-4 machinery.  
**Status:** literature-positioning audit only. **NOVELTY_UNRESOLVED.**

## Executive verdict

The plausible novelty is narrower than the broad vocabulary suggests.

Definitely prior art:
- Abelian-power conditions via Parikh-vector differences / second differences.
- Prefix/suffix Parikh corrections across morphism boundaries.
- Finite template/ancestor reductions for morphic Abelian-power avoidance.
- Structural sieving before expensive template checking.
- Counter/Parikh paths with linear or Presburger constraints as an abstract solver formalism.

The strongest prior-art warning is **Carpi 1993**. A later explicit restatement of Carpi's condition for Abelian power-free morphisms contains

`psi(p_{j+1}) - 2 psi(p_j) + psi(p_{j-1})`

for prefixes of morphism images. Therefore Paper 4 should **not** claim novelty for prefix-Parikh second-difference constraints as such.

The closest later layers are Currie–Rampersad 2012 (template parents with prefix/suffix boundary corrections), Rao–Rosenfeld 2018 (generalized template method and the exact `h6` / Mäkelä weak-result context), Keränen 2002/2003 and Carpi 1999 (prefix-based algorithms and commutatively functional substitutions), and Eyidoğan–Göral–Tanısalı 2026 (explicit sieve technique for the template method).

### Strongest current narrow novelty candidate

No source located in this audit states the following exact result or an obvious equivalent:

> For length-L macro contexts `AFE` and `FAF`, after eliminating fixed F-prefix endpoints, every reduced F-support signature occurring in AFE already occurs in FAF, while the exact excess `S_FAF(L) \ S_AFE(L)` is the same-parity midpoint family, of cardinality `floor(L^2/4)`, with affine law
>
> `x_i + x_j - 2 p_A((i+j)/2) + m(A) - m(F) = 0`.

Likewise, no exact published match was found for the associated staged interpretation:

> **same support skeleton, enlarged forbidden target sets** under partial block assignment.

This is a **POSSIBLY NEW** candidate, not established novelty.

## Prior-art map

### Carpi 1993 — closest algebraic prior art
Arturo Carpi, *On Abelian Power-Free Morphisms*, IJAC 3(2), 151–168 (1993).

Known:
- effective conditions for Abelian power-free morphisms;
- prefix Parikh vectors;
- exact `(+1,-2,+1)` second-difference pattern.

**Implication:** no novelty claim for affine prefix-Parikh second differences alone.

### Carpi 1999 — substitutions preserving Abelian square freeness
Arturo Carpi, *On Abelian Squares and Substitutions*, TCS 218(1), 61–81 (1999).

Studies substitutions preserving Abelian-square-free words and bounded Abelian squares, including decision algorithms for commutatively functional substitutions.

**Implication:** do not frame Paper 4 as the first profile-equivalent substitution / partial-morphism approach.

### Keränen 2002/2003 and 2009 — computational prefix construction
Keränen explicitly uses Carpi's algorithm for prefixes of morphism images and a modified version in staged DT0L constructions.

**Implication:** the philosophy "construct image words + certify via prefixes + stage the computation" has prior art.

### Currie–Rampersad 2012 — template parents and boundary corrections
Their parent equation splits a repetition condition into a bulk morphism-matrix term and finite prefix/suffix Parikh boundary corrections.

**Implication:** macro + boundary Parikh decomposition is classical template algebra in broad form.

### Rao–Rosenfeld 2018 — direct Paper-4 ancestry
This paper introduces the exact six-letter `h6`, proves `h6^omega(a)` Abelian-square-free, gives `g3`, proves `g3(h6^omega(a))` avoids Abelian squares of period >5, and explicitly connects this to Mäkelä.

**Implication:** Paper 4 should position itself as a new staged search / structural refinement built on Rao–Rosenfeld, not as a new overall morphic route.

### Eyidoğan–Göral–Tanısalı 2026 — template sieve
They explicitly develop a sieve that drastically reduces the number of parent/ancestor templates checked.

**Implication:** "cheap exact structural sieve before expensive search" is not itself new.

### Parikh automata / string-constraint literature
Finite-state paths with integer counters and linear/Presburger side constraints are standard abstractions.

**Implication:** "path + Parikh counters + affine constraints" is solver language, not a novelty claim.

## Status table

| Paper-4 concept | Status after audit | Recommended framing |
|---|---|---|
| `P(s+2K)-2P(s+K)+P(s)=0` | KNOWN / definitional | Background |
| Prefix-Parikh second differences | KNOWN — Carpi | Cite, no novelty |
| Boundary Parikh corrections | KNOWN — template method | Specialization |
| Finite ancestor/template reduction | KNOWN | Background |
| Structural sieve | KNOWN | Do not claim |
| Path + counters + affine constraints | KNOWN abstractly | Solver formalism |
| Partial role assignment over macro cover | CLOSE PRIOR ART | Specialist audit |
| Single-occurrence-role long-band projection | POSSIBLY NEW | Keep novelty unresolved |
| `S_AFE(L) subseteq S_FAF(L)` | POSSIBLY NEW | Strong candidate |
| Midpoint excess `floor(L^2/4)` | POSSIBLY NEW | Strong candidate |
| Midpoint affine law | Exact staged form not found | Candidate |
| Shared-support / enlarged-target-set formulation | POSSIBLY NEW as specialization | Narrow claim only |
| Complete subset-factor gates | POSSIBLY NEW | Separate audit needed |
| Rank-one lift invariance | Elementary identity; application may be new | Claim application, not algebra |

## Important negative novelty finding

Paper 4 should **not** present the `(+1,-2,+1)` prefix-Parikh algebra as a new method.

A safer and stronger framing is:

> Starting from classical prefix/template algebra, exploit the special geometry of a staged constant-length partial assignment to derive exact support-inheritance and midpoint-excess results.

## Strongest candidate novelty statement

> In a staged uniform block construction, compare a macro context in which an unresolved role occurs once (`AFE`) with one in which it occurs twice (`FAF`). After eliminating fixed endpoint prefix states, the single-occurrence context's reduced support family is inherited by the repeated-role context. The repeated-role excess is exactly a parity-indexed midpoint family of size `floor(L^2/4)`, and the two gates can be compiled on a common support skeleton by unioning their forbidden affine target sets.

No exact published match was found in this audit.

## Specialist-check shortlist

1. Carpi 1993 — full conditions and proof.
2. Carpi 1999 — decision algorithm for commutatively functional substitutions.
3. Keränen 2002/2003 — modified Carpi prefix algorithm / undesirable patterns.
4. Keränen 2009 — substitution certification details.
5. Currie–Rampersad 2012 — parent equation / boundary corrections.
6. Rao–Rosenfeld 2018 — generalized templates and `h6/g3`.
7. Eyidoğan–Göral–Tanısalı 2026 — sieve and prefix progression conditions.
8. Fici–Puzynina 2023 survey — broader bibliography.

## Bottom line

### Safe now
- The `AFE subset FAF` theorem and exact midpoint excess are credible narrow novelty candidates.
- The shared-support / enlarged-target-set specialization is also a plausible contribution.

### Not safe
- claiming prefix-Parikh second differences are new;
- claiming boundary decomposition is new;
- claiming structural sieving is new;
- claiming finite Parikh-state constraint solving is new;
- claiming the new theorem is definitely absent from the literature.

**Current label: `NOVELTY_UNRESOLVED`, with a credible narrow novelty target.**
