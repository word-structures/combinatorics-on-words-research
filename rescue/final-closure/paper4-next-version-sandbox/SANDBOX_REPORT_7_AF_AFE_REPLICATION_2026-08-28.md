# Paper 4 — sandbox report #7: preregistered replication of the AF ∩ AFE separation

**Date:** 2026-08-28
**Scope:** sandbox only. No manuscript edited, no canonical evidence changed, no Git mutation. No new E-generation family.
**Mäkelä:** OPEN. **Complete-AEF at L=40:** UNRESOLVED. **L=40 impossibility:** NOT ESTABLISHED. **Novelty:** NOVELTY_UNRESOLVED.

---

## 1. Preregistered deterministic population

`PREREGISTRATION_AF_AFE_REPLICATION_2026-08-28.md`, SHA-256 `9d04c7f2d04ecd99…`, **written
and hashed before any evaluation of the enlarged population.**

- **Rule (identical for H and R):** first `N` distinct A words in the persisted enumeration
  order of `runs/distinctA_H.json` / `runs/distinctA_R.json` (both already frozen).
- **N = 72,454 for both.** H: indices 0…72,453 — the **entire** H distinct-A population.
  R: indices 0…72,453 of 260,798 — symmetric deterministic prefix.
- **3.62×** the previous experiment. Node cap 5,000,000 per A, unchanged.
- No adaptive stopping, no sampling, no result-dependent choices.

Outcome categories A–D were declared in advance and none privileged.

## 2. Projected vs actual compute cost

| | projected | actual | note |
|---|---:|---:|---|
| H | 44.1 min | **50.9 min** (3,054.9 s) | +15 % |
| R | 48.8 min | **41.8 min** (2,510.0 s) | −14 % |

A deviation note (`PREREGISTRATION_DEVIATION_NOTE…`, hashed mid-run) recorded a fear that
the run would take “several hours”, extrapolated from early progress under CPU contention.
**That concern proved unfounded** — throughput recovered and both runs finished close to
projection. The fallback prefix rule defined in that note was **never invoked**; the full
preregistered N was completed for both populations.

## 3. Exact denominators and units

| Unit | H | R |
|---|---:|---:|
| **distinct A** evaluated | 72,454 | 72,454 |
| — AF-positive | **202** | **58** |
| — AF-negative | 72,236 | 72,393 |
| — capped (excluded from ratios) | 16 | 3 |
| — row sum | 72,454 ✅ | 72,454 ✅ |
| **denominator after excluding capped** | 72,438 | 72,451 |
| **(E,A) pairs** whose A is AF-positive | **379** | **58** |
| **(A,F) pairs** — complete-AF F enumerated over AF-positive A | 548 | 233 |

Units are never mixed below. Stages B/C/D were **fully exhaustive** (0 capped) in both
populations.

## 4. AF_EXISTS — unit: distinct A

| | H | R |
|---|---:|---:|
| AF-positive / denominator | 202 / 72,438 | 58 / 72,451 |
| **exact finite ratio** | **0.2789 %** | **0.0801 %** |
| ratio H : R | **3.48 ×** | — |

Previous delimited experiment: 0.245 % vs 0.070 %, ratio 3.5×. **The enrichment replicates
at 3.62× the population size.** These are exact finite ratios over deterministic prefixes;
no statistical generalization is attached.

## 5. AFE_EXISTS — unit: (E,A) pairs whose A is AF-positive

| | H | R |
|---|---:|---:|
| pairs | 379 | 58 |
| `AFE_EXISTS` | **99** | **2** |

## 6. AF_AND_AFE_EXISTS — the replication target

| | H | R |
|---|---:|---:|
| pairs | 379 | 58 |
| **`AF_AND_AFE_EXISTS`** | **48** | **0** |

Previous: **34 vs 0**. Enlarged: **48 vs 0**, with R's AF-positive base having grown 4.1×
(14 → 58) and its (E,A) pair count 4.1× (14 → 58).

## 7. P40 — unit: (E,A) pairs whose A is AF-positive

| | H | R |
|---|---:|---:|
| `P40` (complete-AF + AFE + EAF + FEA, K ≤ 40) | **38** | **0** |

## 8. Replication verdict

> **OUTCOME A — strong finite-population replication.**
> H survives substantially (48) and R remains **exactly zero**, at 3.62× the population
> size and with R's AF-positive base 4.1× larger.

The separation is not a fragile artifact of the first-20,000 ordering. It is, however,
still **exact only for the delimited populations evaluated** — the entire H distinct-A
population, and the first 72,454 of R's 260,798. **No generalization to full R is made.**

## 9. R-side survivors — all of them

R produced **zero** `AF_AND_AFE_EXISTS` survivors, so §6 of the brief (structural
comparison of R-side survivors) has no subjects. The nearest objects are the **two
`AFE_EXISTS`-only** pairs, both persisted (`runs/R_afe_only_survivors.json`):

| E (sha16) | A (sha16) | complete-AF F count | of those AFE-clean | AF_AND_AFE |
|---|---|---:|---:|---|
| `933c0dee15dd32a3` | `8dfaaf7687802e0f` | 1 (exhaustive) | **0** | false |
| `933c0dee15dd32a3` | `2a3ec65a1945021b` | 1 (exhaustive) | **0** | false |

Both share the same E. For each, an AFE-feasible F **does** exist and a complete-AF F
**does** exist, but they are different words:

> **For these two (E,A), the complete-AF F set and the AFE-feasible F set are disjoint.**

That is the precise mechanism by which R reaches `AFE_EXISTS = 2` yet
`AF_AND_AFE_EXISTS = 0`.

### 9.1 A structural explanation that does NOT work

The natural guess — that R fails because its A words admit fewer complete-AF F — is
**false**:

| complete-AF F per AF-positive A | H | R |
|---|---|---|
| min / median / max | 1 / 2 / 13 | 1 / 1 / 25 |
| mean | 2.71 | **4.02** |
| total F enumerated | 548 | 233 |
| A with exactly one F | 73 (36.1 %) | 37 (63.8 %) |

R's distribution is bimodal (many singletons, a few with 12–25) and its **mean is higher**
than H's. So the separation is not about how many complete-AF F exist; it is about whether
any of them satisfies the E-dependent AFE constraints. **REFUTED as an explanation.**

## 10. Regression — PASS both before and after

| Condition | Result |
|---|---|
| 8 canonical AF-positive A controls | **8 / 8** recovered (pre-run) |
| 59 known K≤40-clean AEF triples | **59 / 59** recovered, 0 lost (pre-run) |
| AFE affine-vs-direct on known triples | **0** mismatches (pre-run) |
| First-20,000 prefix reproduces earlier AF-positive counts | **H 49, R 14 — exact**, 0 old positives lost |
| Report-6 `AF_AND_AFE_EXISTS` positives | **34 / 34** recovered |
| Report-6 `P40` positives | **24 / 24** recovered |
| Stage B/C/D evaluator vs Report-6 numbers | reproduces **H 122/46/34/24, R 14/1/0/0 exactly** |

Zero known-positive loss.

## 11. Epistemic labels

| Claim | Label |
|---|---|
| Preregistered population, rule and cap fixed before evaluation | **ESTABLISHED** (hashed pre-run) |
| H 202 / R 58 AF-positive; ratios 0.2789 % / 0.0801 % | **EXACT for the delimited deterministic prefixes** (capped excluded) |
| `AF_AND_AFE_EXISTS` = H 48 vs R 0 | **EXACT for those populations**; replication of the earlier 34 vs 0 |
| `P40` = H 38 vs R 0 | **EXACT for those populations** |
| Stages B/C/D fully exhaustive (0 capped) | **ESTABLISHED** |
| For the 2 R AFE-only pairs, complete-AF and AFE-feasible F sets are disjoint | **ESTABLISHED, exact** (F sets enumerated exhaustively) |
| “R fails because it has fewer complete-AF F” | **REFUTED** — R's mean is higher (4.02 vs 2.71) |
| Separation generalizes to full R (260,798 distinct A) | **UNRESOLVED** — 72,454 of 260,798 evaluated |
| Complete-AEF existence at L=40 | **UNRESOLVED** — no complete-AEF hit; stop condition not triggered |
| L=40 impossibility | **NOT ESTABLISHED**; no finite negative licenses it |

## 12. Exact next action

Per §7 of the brief, the replication has landed, so the next target is **not** another
population increase. It is to characterize **why AF ∩ AFE compatibility differs**.

The concrete object is the **intersection geometry** between

- the complete-AF constraints on `H(faf) = F A F` for `K ≤ 60`, and
- the AFE affine unary/binary constraints on `x_j = p_F(j)` for `K ≤ 40`,

and the specific question is whether that intersection can be expressed as **one combined
affine prefix-CSP over F**. Report #6 already established the AFE side exactly (80 unary
shapes + 798 binary relations, after removing the arity-0 and ternary classes that are
A/E- and F-internal conditions). The missing half is the same compilation for `FAF`, where
`F` occurs **twice**, so — as with `fafea` — binary coupling between two F-prefix states is
expected and must be counted before choosing a representation.

The two R AFE-only pairs are the sharpest available test cases: for them the two feasible
sets are provably disjoint, so any correct combined CSP must certify emptiness on exactly
those inputs.

Do **not** build the `fafea` CSP, expand the Hamming radius, add B or D, or start a new
E-generation family.

Raw solver data and logs remain under `runs/`, separate from this report.
