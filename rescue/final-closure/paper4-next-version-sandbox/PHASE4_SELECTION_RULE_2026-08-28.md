# Phase 4 case-selection rule — predeclared

**Date:** 2026-08-28
**Status:** sandbox. Written and hashed **before** the RX AF pass completed and
**before** any RX downstream (AFE / AF∩AFE) verdict existed.
**Applies to:** `SANDBOX_REPORT_12_REACHABILITY_MECHANISM_2026-08-28.md`.

Companion to `PREREGISTRATION_EXPOSURE_MATCHED_R_2026-08-28.md`
(sha256 `bca2780f881ac23c9057d204f2e4cbc85f67945afd758bb9ef5abbe1e8d3463c`).

---

## 1. Selection rule — deterministic, no outcome-dependent discretion

Exactly three cases are instrumented. Ordering key throughout is
`(eIndex, rank)` ascending, where `rank` is the A word's position in the
deterministic `Alist(E)` prefix order. Ties cannot occur: `(eIndex, rank)` is
unique within a population.

**R-side case — first applicable branch wins:**

- **R1.** If population RX contains at least one pair with
  `AF_AND_AFE_EXISTS = true`: select the one with the smallest `(eIndex, rank)`.
  (The §10 STOP CONDITION also fires; Phase 4 is then restricted to this case.)
- **R2.** Otherwise: among all RX AF-positive pairs, run the instrumented solve
  on **every** one, and select the pair with the **greatest extinction depth**
  (`deathDepth`). Ties broken by smallest `(eIndex, rank)`.

**H-positive case.** Among quota-matched H pairs (Q = 5000) with
`AF_AND_AFE_EXISTS = true`, select the smallest `(eIndex, rank)`.

**H-negative case.** Among quota-matched H pairs with A AF-positive and
`AF_AND_AFE_EXISTS = false`, select the smallest `(eIndex, rank)`.

If a branch has no candidate, that case is reported as **ABSENT**; no
substitute is chosen and no rule is relaxed.

## 2. Measurements — fixed now

One exact DFS solve per selected case, instrumented (`work/target_mechanism.js`
semantics, cap 3·10⁷):

1. depth distribution of extinction nodes;
2. number and identity of killer buckets at extinction nodes;
3. killer arity — unary / binary / ternary;
4. target value hit at each kill;
5. `FAF-only` / `AFE-only` / `bothSameValue` attribution;
6. target multiplicity `|T_FAF(σ)|`, `|T_AFE(σ)|` of each killer;
7. **prefix state immediately before final extinction** — the assigned prefix
   word and its Parikh state at the deepest extinction node.

## 3. Research question — stated before the data

> Does selectivity live in a **dynamic reachability / ordering property of
> prefix states**, rather than in static support geometry or static target
> counts?

Static support (Report 8, Report 10 H1) and static target-collision counts
(Report 10 H2) are already eliminated as discriminators. They are re-reported
here **only as descriptive controls**. No new static-count hypothesis is
preregistered, and none will be introduced after seeing the traces.

## 4. Interpretation limits — fixed now

- Three instrumented cases cannot establish a discriminator. Any pattern found
  is **hypothesis-generating only**, and must be preregistered separately before
  any population-scale test.
- No threshold will be fitted post hoc to separate the cases.
- A difference visible in three traces but untested at population scale will be
  reported as **UNTESTED**, never as a mechanism.

## 5. Prohibitions

No canonical edit. No Git mutation. No promotion. **No resumption of the
deprecated per-signature greedy UNSAT-core extraction.** `NOVELTY_UNRESOLVED`.
Mäkelä OPEN.
