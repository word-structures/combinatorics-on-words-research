# Paper 4 — reader/pedagogy audit before hostile referee

**Date:** 2026-08-29  
**Scope:** exposition only unless a genuine mathematical contradiction is found.

## Why this pass was necessary

Feedback on an earlier paper correctly identified a recurring risk: mathematically
correct work can still be unnecessarily difficult to read if field-specific
notation collides, basic terms are left implicit, or the reader is asked to
reverse-engineer a computational acronym.

The v1.0 Paper-4 submission candidate still had several examples of exactly that
risk.

## Defects found in v1.0 and repaired in v1.1

1. **The symbol \(h\) had three roles.**
   It appeared as the morphism \(h_6\), as the local step
   \(h=i_1-i_0\), and as the fixed Parikh profile in the AFE section.
   This is especially undesirable in Combinatorics on Words, where \(h\) is
   conventionally used for morphisms.

   **Repair:** morphism \(h_6\) is retained; the local step is now
   \(\eta\); the fixed profile is \(\rho\).

2. **The symbol \(\delta\) collided with Carpi's \(\delta_j\) selectors.**

   **Repair:** Paper-4 macro curvature is now \(\kappa\); Carpi's
   \(\delta_j\) retains its source notation.

3. **The bold \(\mathbf 1\) was undefined.**

   **Repair:** the rank-one-lift proposition now explicitly defines
   \(\mathbf 1\) as the all-ones column vector.

4. **Several core concepts appeared before a reader-facing definition.**

   **Repair:** Section 2 now explicitly defines factor, prefix,
   \(\operatorname{Fact}(w)\), \(L\)-uniform coding, role, partial assignment,
   local depth, occurrence mask, reduced support signature, affine target,
   profile, support family and \(e_\alpha\).

5. **The reader had no concrete example before the six-domain theorem.**

   **Repair:** Section 3 now includes the \(L=5,K=2\) same-block example
   \((0,2,4)\), showing explicitly how
   \(x_0-2x_2+x_4\) reduces to \(-2x_2+x_4\).

6. **The distinction 34 versus 19 was easy to misread.**

   **Repair:** the manuscript now states explicitly that 34 counts physical
   domain/mask cases whereas 19 counts equality classes of complete reduced
   support sets.

7. **The main theorem lacked a visibly delimited proof paragraph.**

   **Repair:** Theorem 4.2 now ends with an explicit proof combining the
   six-domain partition, role count, truncation identities and the all-\(L\)
   distinctness result.

8. **The depth moment was introduced as if self-explanatory.**

   **Repair:** it is now described explicitly as a coefficient-weighted sum of
   prefix depths and used only as a separating invariant.

9. **The subset-gate section reused \(x\) both for a source word and for prefix
   variables.**

   **Repair:** the source word is now \(w\).  "Factor-maximal",
   \(S^*\), and "minimal macro support" are defined in place.

10. **The application used unexplained internal acronyms and predicate names.**

    v1.0 contained `AF-positive`, `AFE`, `joint AF/AFE`, and `P40` in a
    submission-facing table without defining them.

    **Repair:** Section 11 now defines the three predicates in plain language:
    AF-compatible, AFE-completable and jointly completable.  The unexplained
    `P40` column is removed from the manuscript body.

11. **The population labels \(H\) and \(RX\) could invite a probability reading.**

    **Repair:** both are defined as frozen deterministic populations, the
    historical/canonical selection of \(H\) is stated explicitly, and the
    non-probabilistic interpretation is repeated.

12. **The manuscript had no visual guide to the new geometry or reachability object.**

    **Repair:** three vector figures are supplied:
    - six carry domains;
    - the 3-cutpoint → 6-domain → 34-pattern → 19-family → target compiler;
    - a schematic first-hit prefix tree showing how a blocked prefix removes a
      full cylinder of profile-compatible completions.

13. **The literature paragraph still contained an avoidable global-priority
    formulation ("to our knowledge ... has not previously been isolated").**

    **Repair:** v1.1 states what theorem this paper proves and what surrounding
    machinery it does not claim, without making a stronger absence-of-prior-art
    assertion than the specialist audit supports.

## Remaining questions for the next external comb

The next reviewer should not start by rewriting the mathematics.  The most
valuable remaining questions are reader-facing:

- Does every symbol have one stable meaning?
- Is every nonstandard term defined before theorem use?
- Can a Combinatorics-on-Words reader understand the theorem without knowing the
  project history?
- Can a mathematically trained reader reproduce the logic of 6 → 34 → 19 from
  the prose and figures before reading the appendices?
- Is the distinction between support, target and semantic feasibility impossible
  to confuse?
- Are Sections 8--11 clearly a case study rather than hidden hypotheses of the
  general theorem?
- Can Section 11 be shortened further without losing the empirical value?
- Does any sentence accidentally turn a finite observation into probability,
  nonexistence, minimality, complexity or novelty?
- Are Figures 1--3 mathematically faithful and sufficient, or is any one of
  them redundant?

A mathematical contradiction overrides all editorial instructions and must be
reported fail-closed.
