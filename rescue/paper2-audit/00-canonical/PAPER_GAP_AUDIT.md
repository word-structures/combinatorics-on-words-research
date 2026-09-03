# Paper gap audit — issues that were easy to miss

**Purpose:** adversarial checklist before Claude receives the manuscript.

## 1. The strongest wording bug: “response-blind prediction”

The PEX-C4 continuation lower bound is response-blind.  The full certificate is not: its residual term is a bound on the linear response and the present implementation evaluates a long finite response prefix.

**Required wording:** “prospective mechanism-aware sign certification.”

Do not say that H09/H10 were predicted without response computation.

## 2. Holdout independence is weaker than “new family”

H08--H11 were new exact positional subtargets (`x0=x2`), frozen before their certification/reference evaluation.  But:
- the L6 baseline was already exposed;
- the four h7 profile classes were already exposed;
- an earlier battery used the same profiles with `x0=x1`.

They are legitimate prospective exact-subtarget tests, not a statistically independent benchmark family.

## 3. Reference evaluation is not a clean-room implementation

The analytic derivative and finite-difference route use the same finite-state support construction.  Call finite difference a **distinct numerical cross-check**, not an independent verification of the whole graph model.

## 4. Recoding invariance must be explicit

The L6 proof moves between:
- memory-11 baseline for mixing;
- memory-13 target presentation for a 14-symbol event.

The paper needs a clean recoding proposition and a separate proof of
\[
\tau_{13}(n)\le\tau_{11}(n-2).
\]
This is not editorial detail; it is load-bearing.

## 5. The L6 finite-prefix budget is currently the weakest certificate component

The exact quotient, continuation residual, and infinite tail are unusually clean.  The \(7.5\times10^{-4}\) blanket finite-prefix sensitivity budget is conservative but must be turned into a standalone theorem/verified script.

This should be one of Claude's first red-team targets.

## 6. Exact mechanism bookkeeping needs one notation convention

One-endpoint placements, orientations, target shifts, and the factor \(2p_G/q\) are easy sources of off-by-one/factor-two mistakes.  The paper should define a single placement coordinate system once and prove the mapping to lag \(k\).

Do not rely on diagrams alone.

## 7. Color symmetry is an assumption, not decoration

The fixed observable remains centered without an \(\varepsilon\)-dependent mean only because:
- the baseline is \(S_3\)-invariant;
- each target event used in the theorem/certificates is color-permutation invariant.

Every generalized theorem statement must include this hypothesis or include mean-derivative correction terms.

## 8. “Sign reversal” has two possible meanings

In this paper it primarily means:
\[
\text{local contribution}>0,\qquad a'(0)<0.
\]
It should not be confused with a zero crossing of \(a(\varepsilon)-a(0)\) at finite \(\varepsilon\), even though h4 also shows nonmonotonic soft-path behavior.

State the definition early.

## 9. Soft and hard experiments must be quarantined

The 15-profile hard-deletion split helped discover the problem.  It is not evidence for the soft derivative theorem.  Put it in an appendix/history subsection and never use hard \(\Delta a\) to justify a soft-sign claim.

## 10. PEX-C4 is a design rule, not the general theorem

The general theorem allows any finite mechanism family and any valid continuation lower bound.

PEX-C4's:
- depth 4;
- suffix features;
- lags \(W+1,W+2\)

are empirical design choices.  Keeping this separation makes the theorem durable even if PEX-C4 is later improved.

## 11. Multiple testing / researcher degrees of freedom need disclosure

The sequence PEX-3 -> failure -> PEX-C4 -> x0=x1 battery -> x0=x2 battery is scientifically useful, but target selection was adaptive at the research-program level.

The paper should present the complete chronology rather than treating H09/H10 as if they emerged from one immutable protocol written at project start.

## 12. Prospective evidence is methodological support, not the mathematical novelty claim

The mathematical paper should not become an AI-workflow paper.

Use the freeze/reveal chronology as evidence against overfitting, but keep the main contribution mathematical:
continuation-conditioned response and capacity-based certification.

## 13. Literature overlap is closer than the phrase “forbidden patterns affect statistics” suggests

Particularly close neighborhoods:
- Bóna--Maga--Richey: forbidden-word combinatorics -> sign of a mean letter-frequency change;
- Rukhin: overlapping pattern frequencies and covariance in Markov sequences;
- Lind / Guibas--Odlyzko: forbidden-word perturbations and correlation polynomials;
- Cheriyath--Agarwal and Chandgotia--Marcus--Richey--Wu: Perron/Parry structure from forbidden-word combinatorics.

The novelty target must be the narrower bridge to a *certified asymptotic-variance derivative sign*, not any of the ingredients.

## 14. The continuation-capacity lemma itself is standard PF mathematics

Do not call
\[
N_m(j)/N_{m+1}(i)\to P_{ij}
\]
new.  Its paper value is that it turns finite continuation combinatorics into a certifiable mechanism bound in this response problem.

## 15. Tiny prospective sample: no precision/recall claims

H09/H10 give two successful negative certifications.  State exactly that.  Do not turn 2/2 into “100% accuracy.”

H11 is useful: it demonstrates that the certificate is sufficient but incomplete.

## 16. Certificate portability needs machine determinism

Audit:
- integer quotient construction;
- S3 orbit canonicalization;
- outward/downward rounding;
- sparse linear-algebra dependence;
- BLAS/platform variation;
- exact hashes and environment versions.

The publication verifier should not depend on a hidden notebook state.

## 17. AI assistance should be disclosed without making AI an authority

Suggested reproducibility statement:

> AI systems were used for exploratory derivations, code generation, adversarial review, and manuscript drafting.  Mathematical claims are accepted only through explicit derivation, preserved computational evidence, and human-author approval; AI output is not treated as an evidentiary source.

Check the target journal's current disclosure policy before submission.

## 18. A future “fully structural predictor” would be a different theorem

The present certificate is allowed to evaluate response terms in \(C_{\rm rest}\).  A stronger future result would bound the complement using only response-independent structural/operator quantities.

That would justify stronger predictive language, but it is not required for the current paper.

## 19. The paper needs one spine

Do not write:
- Paper A = fascinating h4 anatomy;
- Paper B = generic PEX methodology;
- Paper C = prospective workflow.

Write one story:

> Local profile geometry can be defeated by delayed continuation dynamics; continuation capacity makes that delayed channel quantifiable, and a residual certificate turns it into a sign theorem.  h4 explains the mechanism; the h7 exact subtargets test the frozen certificate architecture.

## 20. Stop condition

Before doing more target hunting:
1. Claude clean-room audit;
2. literature/priority audit;
3. standalone verifier for L6 finite-prefix sensitivity;
4. manuscript revision from audit.

New targets should be justified by a paper question, not by the availability of compute.
