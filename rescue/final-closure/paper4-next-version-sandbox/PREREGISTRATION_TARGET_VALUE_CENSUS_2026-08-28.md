# Preregistration — target-value census over the fixed Report-7 populations

**Date:** 2026-08-28
**Status:** sandbox. No canonical promotion. No Git mutation.
**Written and hashed BEFORE the census is executed.**

## 0. Provenance of the hypotheses

The hypotheses below were **generated** by three instrumented DFS solves
(`runs/target_mechanism_probes.json`, cases `R_NEARMISS`, `H_NEGATIVE`,
`H_POSITIVE`). They are therefore *not* independent of those three pairs.
This census **tests** them on the full fixed population. Any statistic that
merely reproduces the three generating pairs is not evidence.

## 1. Population — fixed, not chosen now

No new population is created. Exactly the already-frozen Report-7 objects:

| set | file | rows |
|---|---|---:|
| H pairs | `runs/bcdBIG_H/pairs.jsonl` | 379 |
| R pairs | `runs/bcdBIG_R/pairs.jsonl` | 58 |
| H AF-positive A | `runs/afexBIG_H/af_positive.jsonl` | 202 |
| R AF-positive A | `runs/afexBIG_R/af_positive.jsonl` | 58 |
| H E-pool | `fixtures/canonical_pools.json` | 9 |
| R E-pool | regenerated, mulberry32 seed 7788, first 60 non-canonical | 60 |

Total compiles: 437 pairs. At 3.7 ms per `compileBuckets`, ≈ 2 s.
The E-multiplicity statistic adds 202×9 + 58×60 = 5,298 O(L²) membership
tests. The whole census is cheap by construction; no cap is required and
none is applied. Any capped or failed compile is a **fail-closed stop**, not
an imputed value.

## 2. Statistics — defined now, computed once

Per compiled pair `(A,E)`, over the signature buckets `T(σ) = (T_FAF, T_AFE)`:

| id | statistic | definition |
|---|---|---|
| S1 | `activeSignatures` | #{σ : T_FAF(σ) ∪ T_AFE(σ) ≠ ∅} |
| S2 | `sharedSignatures` | #{σ : T_FAF(σ) ≠ ∅ **and** T_AFE(σ) ≠ ∅} |
| S3 | `collidingSignatures` | #{σ : T_FAF(σ) ∩ T_AFE(σ) ≠ ∅} |
| S4 | `collidingTargetValues` | Σ_σ \|T_FAF(σ) ∩ T_AFE(σ)\| |
| S5 | `totalUnionTargets` | Σ_σ \|T_FAF(σ) ∪ T_AFE(σ)\| |
| S6 | `meanUnionTargets` | S5 / S1 |
| S7 | `singletonBuckets` | #{σ : \|T_FAF(σ) ∪ T_AFE(σ)\| = 1} |
| S8 | `maxUnionSize` | max_σ \|T_FAF(σ) ∪ T_AFE(σ)\| |
| S9 | `deadFAF`, `deadAFE` | A/E-only obstruction flags |
| S10 | `E_multiplicity(A)` | #{E in the population's E-pool : A ∈ Aset(E)} |

`Aset(E)` membership is decided by the same `endClean` predicate used by
`stage_bcd.js`: A ∈ Aset(E) iff E·A has no abelian square of half-period
2..40 ending at any position 41..80. This is a re-implementation of the
membership test, not a re-enumeration of `Aset`.

## 3. Hypotheses — fixed before execution

- **H1 (skeleton invariance at population scale).** S1 ≡ 1560 and S2 ≡ 1160
  for **every** pair in both populations.
  *Report 8 established this for 10 pairs only.*
- **H2 (collision discriminator).** R pairs have higher S3 and S4 than H pairs.
- **H3 (collision does not separate within H).** Among H pairs, S3/S4 do not
  separate `AF_AND_AFE_EXISTS = true` from `= false`.
- **H4 (exposure asymmetry).** mean S10 > 1 for H and = 1 for R.

## 4. Decision rules — fixed before execution

- **H1** is refuted by a single pair with S1 ≠ 1560 or S2 ≠ 1160. If refuted,
  every Report-8 statement about an identical support skeleton is
  narrowed to the probed pairs and re-reported.
- **H2** counts as **supported** only if the H and R ranges of S4 are
  **disjoint** (max over one population strictly below min over the other).
  A difference in means with overlapping ranges counts as **NOT SUPPORTED**
  and is reported as a negative result. No post-hoc threshold will be fitted.
- **H3** is **supported** if the H-positive and H-negative S4 ranges overlap.
- **H4** is descriptive; it is reported exactly, and it bounds how strongly
  the pair-level 48-vs-0 may be phrased.

## 5. What this census cannot do

- It cannot license any statement about Mäkelä, about L = 40 impossibility,
  or about novelty.
- It cannot promote any theorem.
- With 58 R pairs against 379 H pairs, a null result is **weak evidence**,
  and will be reported as weak.
- S3/S4 are functions of (A,E) only. They cannot explain F-side search
  dynamics; at most they can correlate with them.

## 6. Prohibitions reaffirmed

No new computational search beyond the statistics above. No new populations.
No D. No B enumeration. No F-exclusion ledger expansion. No Hamming-radius
expansion. No fafea CSP. No h=8. No D40. No per-signature greedy UNSAT-core
extraction.
