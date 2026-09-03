# Decisive experiment plan

Preregistered. Each rung has a stated prediction and a stated falsifier, fixed
before the run. Quantities that were conflated in the earlier sandbox work are
separated here.

---

## E0 — Re-measurement of the disputed observation (run first)

**Purpose.** Observation #3 (elision density rising with `K` up to 100) was not
reproduced at `L = 40`. Before anything else, establish what was actually seen.

**Design.** For `L ∈ {5, 8, 40}` and `K ∈ [2, 200]`, over real `h₆` source
factors, record for every window: `L`, `K`, block gap `g = ⌊K/L⌋`, the reduced
signature `σ`, `|σ|` (arity), the bulk target `t`, whether the box bound elides
it, and whether the exact reachable set elides it.

**Report separately** — this is the point of the rung — density as a function of
`g`, and density as a function of signature arity.

**Prediction.** At `L = 40` the box-bound density is flat at `0` for `K ≤ 100`
(`g ≤ 2`). At `L = 5` it is already high. Any rise at `L = 40` is attributable to
short signatures, not to bulk growth.

**Falsifier.** Non-trivial box-bound elision at `L = 40, K ≤ 100` would refute
the analysis in `THEOREM_CANDIDATES.md` §D.4 and require re-derivation.

---

## E1 — Exact versus box-bound elision

**Purpose.** Quantify how much the exact reachable set buys over the free box
bound, which costs nothing.

**Design.** `L ∈ {5, 6, 8, 10, 12}`; all windows over genuine source factors;
compute both `R_σ(ρ)` exactly (by the chain enumeration of Theorem B) and the
box bound. Record counts of: elided by box only, elided by exact only, elided by
both, elided by neither.

**Prediction.** The exact set adds materially at small `g`, where the bulk target
is inside the box; at large `g` the box bound already suffices and the exact
computation is wasted work.

**Falsifier.** If "elided by exact only" is negligible at all `g`, the exact
reachable set is not worth computing and the architecture reduces to the free
box bound.

**Why this matters.** If the box bound captures nearly everything, most of the
machinery is unnecessary and the contribution shrinks to §D.1.

---

## E2 — The compression parameter (confirmatory)

**Purpose.** Confirm Proposition C empirically at larger `L`, and search for any
sound window restriction with `D_r < L−1`.

**Design.** `L ∈ {5, 6, 8, 10, 12, 16, 20}`. For each, compute `D_r` and the
compression factor `Π multinomial` for: the complete gate; every single-`K`
gate; and any restricted-start gate that can be justified.

**Prediction.** `D_r = L−1` for every complete or single-`K` gate; compression
factor `1`.

**Falsifier.** A *sound* window set with `D_r < L−1` would reopen the compression
claim. "Sound" means the conclusion drawn from it is still valid for all windows,
not merely for the restricted set.

---

## E3 — Discrepancy growth on other sources

**Purpose.** Test whether the mechanism is about `h₆` specifically or about the
`λ₂` of the source.

**Design.** Take several primitive substitutions with known spectra spanning
`|λ₂| > 1`, `|λ₂| = 1`, `|λ₂| < 1`. For each, measure the growth of
`max_b |P·D(b)|` and the elision density versus `g`, holding `L` fixed.

**Prediction.** Growth exponent `log|λ₂|/log|λ₁|`; elision density rising only
when `|λ₂| > 1`; flat when `|λ₂| < 1`.

**Falsifier.** Rising density for a source with `|λ₂| < 1` would show the
mechanism is misidentified.

**This is the experiment that decides whether Theorem D is a real theorem about
substitutions or a fact about one morphism.**

---

## E4 — Density law and the surviving-window count

**Purpose.** Test Conjecture D quantitatively and measure the quantity that
actually matters for long periods.

**Design.** Fixed `L`, `g` up to `2¹⁶`; measure the non-elidable fraction and fit
against `c/√g`. Then compute the *cumulative* count of surviving windows for all
gaps up to `G`, and test the predicted `Θ(√G)`.

**Prediction.** Fraction `∼ c/√g`; cumulative survivors `∼ 2cLn√G`.

**Falsifier.** A cumulative count growing linearly in `G` would mean elision does
not asymptotically thin the long-period set at all.

---

## E5 — Profile design objective

**Purpose.** Test whether maximizing `min_{v ∈ E_{λ₂}} |Pv|` actually improves
elision, or is merely well posed.

**Design.** Generate candidate profile matrices with the required column sums;
score each by the objective; measure realized elision density at fixed `L, g`.
Correlate score with density.

**Prediction.** Positive monotone relationship.

**Falsifier.** No relationship would mean the design principle is decorative.

**Guard.** An uninformative profile is *not* a bad profile. Report
`certified impossible`, `unresolved`, and `heuristic score` as three separate
columns and never merge them.

---

## E6 — Solver comparison (only after E1–E2)

**Purpose.** Decide the engineering question, given that the state space is not
reduced.

**Design.** Identical instance sets at `L ∈ {8, 10, 12}`; compare CP-SAT,
SAT with order encoding, ILP with indicator variables, and the existing custom
DP. Measure wall-clock, propagations/conflicts, and — separately — the **solution
sets**, which must be identical.

**Prediction.** CP-SAT ≳ custom DP ≫ SAT > ILP. ILP is expected to be worst
because every window is a disequality requiring a disjunction.

**Falsifier.** ILP winning would overturn the constraint-shape analysis.

**Gate.** Any run whose solution set differs from the DP baseline is a
correctness failure and stops the ladder.

---

## Ladder and stopping rules

```
E0  →  E1  →  E2  →  E3  →  E4  →  E5  →  E6
```

`L = 40` is attempted **only** after E3 and E4 have passed at small `L`.

**Stop conditions.**

- E0 fails to reproduce any elision at small `g` for small `L` → the filter is
  weaker than believed; stop and re-derive.
- E1 shows the exact set adds nothing over the box bound → drop the exact
  machinery, keep §D.1, and reduce the scope of any write-up.
- E3 shows density rising for `|λ₂| < 1` → mechanism misidentified; stop.
- Any solver disagreement on solution sets → correctness failure; stop.

**Measurement discipline.** Every rung reports, separately and without merging:
exact safe-window density; box-bound safe density; `D_r`; CSP state count;
literal candidates avoided; wall-clock; branch kills; false-safe count (which
must be `0`); and solution-set equality against the baseline. All source
material is genuine `h₆` factor language, never synthetic role strings.

No probability language is to be attached to any of these finite counts.
