# Deviation note — AF_AND_AFE_EXISTS replication run

**Written while the run is in progress, before its results are known.**
**Date:** 2026-08-28

## What deviated

**Compute cost only. The preregistered population is UNCHANGED: N = 72,454 for both H and R,
same enumeration rule, same node cap 5,000,000.**

The preregistration projected ≈44 min (H) and ≈49 min (R) from the single-process
first-20k runs (36.56 and 40.38 ms/A). Actual throughput is substantially lower because
the two populations are being evaluated **in parallel on a contended machine**, alongside
foreground regression work that ran during the same window.

Observed progress at the time of writing (indices only — used to estimate cost, not to
decide anything):

| run | index reached | fraction of 72,454 |
|---|---:|---:|
| `afexBIG_H` | ≈ 8,757 | ≈ 12 % |
| `afexBIG_R` | ≈ 3,455 | ≈ 4.8 % |

Revised estimate: several hours rather than ≈50 min.

## Decision

**No change to N, the cap, the ordering rule, or the predicate hierarchy.** The run is
allowed to continue to the full preregistered N. Background runs persist across turns and
their persistence is append-only and resume-safe, so no result is at risk.

## Fallback rule — fixed now, in advance

If the run must be reported before completion, the reported population will be the
**symmetric deterministic prefix of length `min(index_H, index_R)`** actually completed by
both runs at the cutoff moment.

That rule is determined **solely by compute progress**, never by the observed
positive/negative counts. It is recorded here in advance precisely so that the cutoff
cannot be chosen after seeing which cutoff would be more favourable.

If that symmetric prefix turns out to be **smaller than the original 20,000**, the
replication will be reported as **NOT ACHIEVED** rather than presented as a weaker
replication — a shorter prefix is not evidence about the enlarged population.

## What is not affected

- the preregistered outcome categories A/B/C/D remain as written and none is privileged;
- capped cases remain excluded from exact denominators;
- the regression conditions remain mandatory both before and after.
