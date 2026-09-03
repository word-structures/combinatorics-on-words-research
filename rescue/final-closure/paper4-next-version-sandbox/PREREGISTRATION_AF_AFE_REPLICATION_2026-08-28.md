# Preregistration — AF_AND_AFE_EXISTS replication

**Written and hashed BEFORE any evaluation of the enlarged population.**
**Date:** 2026-08-28

## Hypothesis under replication

The delimited first-20,000-distinct-A experiment gave
`AF_AND_AFE_EXISTS` = **H 34 vs R 0** ((E,A) pairs whose A is AF-positive).
That result is exact only for that delimited population and is **not** generalized.

## Preregistered population — fixed before seeing any result

- **Enumeration rule (identical for H and R):** the first `N` distinct A words in the
  persisted enumeration order of `runs/distinctA_H.json` and `runs/distinctA_R.json`.
  These files are already frozen in `FROZEN_RECORD_2026-08-28.sha256`.
- **N = 72,454 for BOTH populations.**
  - H: indices `0 … 72,453` — this is the **entire** H distinct-A population (72,454).
  - R: indices `0 … 72,453` of 260,798 — a symmetric deterministic prefix.
- **Ratio to the previous experiment:** 3.62× larger per population.
- **Node cap per A:** `5,000,000` — identical to the first-20k run, so the first 20,000
  indices must reproduce the earlier counts exactly (regression condition).
- **No adaptive stopping.** No result-dependent change of `N`, cap, order or rule.
- **No sampling.** The population is a deterministic prefix, not a sample.
- **Capped cases** are recorded and **excluded from exact denominators**.

## Projected compute cost (from the completed first-20k runs)

| | observed ms/A | N | projected |
|---|---:|---:|---:|
| H | 36.56 | 72,454 | ≈ 2,649 s ≈ **44.1 min** |
| R | 40.38 | 72,454 | ≈ 2,926 s ≈ **48.8 min** |

Run in parallel; projected wall clock ≈ **49 min** (subject to CPU contention).

## Predicate hierarchy to evaluate

- **A.** `AF_EXISTS(A)` — unit: distinct A. Cached by deterministic A ID.
- **B.** `AFE_EXISTS(E,A)` — unit: (E,A) pairs whose A is AF-positive.
- **C.** `AF_AND_AFE_EXISTS(E,A)` — same unit.
- **D.** `P40(E,A)` — ∃F satisfying complete-AF + AFE + EAF + FEA through K ≤ 40.

## Outcome categories — declared in advance, none privileged

- **A.** H survives substantially, R remains exactly 0 → finite-population replication.
- **B.** R becomes nonzero but strongly depleted → the 34-vs-0 was a finite-population
  cliff; quantify the revised effect.
- **C.** H and R converge → separation was population-order-specific; drop AFE as the
  main mechanism.
- **D.** A complete-AEF positive appears → STOP, freeze, replay independently.

## Regression conditions (must hold before and after)

- all 8 canonical AF-positive A controls recovered;
- all 59 known K≤40-clean AEF triples recovered;
- all Report-6 `AF_AND_AFE_EXISTS` positives recovered;
- the first-20,000 prefix reproduces H 49 / R 14 AF-positive exactly.

Zero known-positive loss permitted.
