# Preregistration — exposure-matched R experiment (population `RX`)

**Date:** 2026-08-28
**Status:** sandbox. No canonical edit. No Git mutation. No promotion.
**Written and hashed BEFORE any AF_EXISTS evaluation of population `RX`.**

Naming is kept distinct from the earlier experiment throughout:
`R` = the Report-7 population (single E, `afexBIG_R`, `bcdBIG_R`).
**`RX`** = this exposure-matched population (`afexRX`, `bcdRX`). No old artifact
is overwritten.

---

## 0. Feasibility measurement performed BEFORE this preregistration

`work/aset_sizes.js` → `runs/aset_sizes_R.json`, `runs/aset_sizes_H.json`.
This measures `|Aset(E)|` only. It is **outcome-independent**: it says nothing
about `AF_EXISTS`, and was used solely to fix the quota.

| | R (60 random E) | H (9 canonical E) |
|---|---|---|
| min / median / max | 0 / 12 / 129,911 | 201 / 3,513 / 50,593 |
| total (E,A) pairs | 261,910 | 111,613 |
| E with `\|Aset\| = 0` | **24** | 0 |
| E with `\|Aset\| ≥ 1000` | 21 | 7 |
| E with `\|Aset\| ≥ 5000` | 10 | 5 |

**The preferred design — an equal quota for every one of the 60 E — is
infeasible**: 24 of the 60 random E admit **no** compatible A word at all, so
exact equality across all 60 forces quota 0. No new E are generated (the task
permits generation only if necessary; it is not necessary — the frozen 60 are
used, and the infeasibility is a property of those E, which is itself a
result worth preserving). The design below is the nearest feasible
approximation, with exact-equal-exposure strata nested inside it.

---

## 1. E population — frozen, not regenerated

The **already frozen 60 random non-canonical E** from the prior R experiment:
mulberry32 (`rng.js`) seed **7788**, generator `mkGenE`, rejecting any E in the
canonical pool, first 60 accepted. Reproduced identically by `dedup_A.js`,
`stage_bcd.js`, `r_mechanism.js`, `target_census.js` and `aset_sizes.js`.
E-indices `0…59` refer to that fixed order.

H's 9 canonical E come from `fixtures/canonical_pools.json`, unchanged.

## 2. Exposure-matching rule — fixed before evaluation

**Quota `Q = 5000`.** Each E contributes its first `min(Q, |Aset(E)|)` distinct
compatible A words. A is deduplicated within each E by construction (`Alist`
enumerates distinct words). Pair identity `(E, A)` is preserved; the same A may
legitimately appear under two different E and is **not** globally collapsed.

Choice of `Q` is on feasibility grounds only:

| Q | E represented | E at exact quota | total A trials | est. runtime |
|---:|---:|---:|---:|---|
| 1000 | 36 | 21 | 23,117 | ~13 min |
| **5000** | **36** | **10** | **75,111** | **~43 min** |

`Q = 5000` is selected because it maximises trials within one hour at the
Report-7 measured cost (34.6 ms/A at cap 5·10⁶) while capping the largest E's
share at **6.7 %** of the run (it was **100 %** in the Report-7 R experiment).

**Nested strata.** Because the A-ordering is a deterministic prefix order, the
first 1000 of each E are a prefix of the first 5000. One `Q = 5000` run
therefore contains these strata exactly, by truncation, with no extra compute:

- **RX-5000-EQ** — the 10 E with `|Aset| ≥ 5000`, exactly 5,000 each = 50,000 trials. Exact equal exposure.
- **RX-1000-EQ** — the 21 E with `|Aset| ≥ 1000`, exactly 1,000 each = 21,000 trials. Exact equal exposure.
- **RX-CAP** — all 36 represented E, `min(5000, |Aset|)` each = 75,111 trials. Capped, unequal for small E.

**RX-1000-EQ is the primary analysis object** (largest exactly-balanced E set).
RX-CAP is the primary count object. RX-5000-EQ is a secondary check.

## 3. A-word ordering rule — deterministic, non-adaptive

`Alist(E)` from `work/dedup_A.js`: depth-first over positions `0…39`, letters
tried in the fixed order `a, b, c`, subject to the A-profile `(15,14,11)` and
`endClean(q, n, 40)` on `E·A` at every position `n = 41…80`. The first
`min(Q,|Aset|)` words in that order are taken. **No sampling, no randomness, no
adaptivity, no reordering by any observed outcome.**

## 4. AF_EXISTS evaluation — Report-7 semantics, unchanged

`afExists(A, cap)` from `work/af_exists.js`, gate
`subset-cover-2026-08-28/h6/L40/AF=faf,K<=60;AEF=eafea+fafea,K<=100`.
`AF_EXISTS(A)` depends on A alone, so it is memoised across E; this is an
implementation optimisation and changes no verdict.

- **Node cap: 5·10⁶** per A (identical to Report 7).
- **Fail-closed rule, fixed now:** any A hitting the cap has its exact id and
  word persisted immediately, and is then **automatically re-decided at
  2·10⁹** inside the same run (the closure procedure Report 8 applied post hoc).
  If it is *still* capped it is reported as `UNRESOLVED`, listed by exact id,
  and excluded from **numerator and denominator alike**, with the exclusion
  stated in every affected table. Capped cases are never silently dropped and
  never counted as negative.

## 5. Downstream evaluation — Reports 7–10 semantics, unchanged

For every AF-positive `(E,A)` pair, `stageDFS` from `work/stage_bcd.js` with
**cap 2·10⁷**, computing exactly:

- `AFE_EXISTS(E,A)` — profile-correct F satisfying the AFE gate `K ≤ 40`;
- `AF_AND_AFE_EXISTS(E,A)` — additionally complete-AF (FAF, `K ≤ 60`);
- `P40(E,A)` — additionally EAF and FEA clean at `K ≤ 40`.

Witnesses are persisted. The same fail-closed rule applies.

## 6. Matched H comparison — derived, not re-run

The **identical quota rule** is applied to H. `AF_EXISTS` was already decided
exhaustively for the **entire** H distinct-A population (72,454), and every A in
any `Alist(E_i^H)` lies in that population, so H's quota'd counts are obtained
by filtering existing frozen results — **no H re-computation, no new H
population.** Same for `AF_AND_AFE_EXISTS` via `runs/bcdBIG_H/pairs.jsonl`.

Under `Q = 5000`, H's capped total is 31,775 trials over 9 E, 5 at exact quota.

## 7. Primary quantities

Reported per E and in total, for RX and for quota-matched H:

1. number of E actually represented (`|Aset| ≥ 1`);
2. A trials per E;
3. AF-positive count per E;
4. AF∩AFE-positive count per E;
5. total AF-positive;
6. total AF∩AFE-positive;
7. number of E with at least one AF-positive;
8. number of E with at least one AF∩AFE-positive.

Plus `AFE_EXISTS` and `P40` totals, and capped/unresolved counts.

## 8. Secondary quantities — descriptive only

Only quantities already motivated by Report 10, and **only as descriptive
controls, not as discriminator hypotheses**:

- extinction depth distribution;
- killer-bucket / reachability trace summaries at extinction nodes;
- static collision statistics (S3/S4 of the Report-10 census).

**No hypothesis is preregistered for any of these.** Report 10 refuted the
static-collision discriminator; nothing here re-tests it as a discriminator.

## 9. Decision rules — fixed before execution

The comparison object is the pair of finite counts, not a probability. No
threshold will be fitted post hoc.

- **Persists.** RX total AF∩AFE-positive = 0, with RX AF-positive ≥ 20.
- **Weakens.** RX AF∩AFE-positive = 0, but RX AF-positive < 20 → underpowered;
  reported as **inconclusive**, not as confirmation.
- **Disappears / changes form.** RX AF∩AFE-positive ≥ 1 → the Report-7 phrasing
  is wrong and is corrected; the STOP CONDITION in §10 fires.
- Per-E distributions are reported in full regardless of outcome.

Denominators are stated exactly. No result is called a probability or a rate
unless a sampling design justifies it; this is an exhaustive deterministic
prefix, so all figures are finite-population counts.

## 10. Stop condition

**If any complete AEF triple appears — i.e. any RX pair with
`AF_AND_AFE_EXISTS = true` — then immediately:**

1. freeze and hash `E`, `A`, `F` (the witness);
2. record the exact run id, E-index, and node counts;
3. **STOP expansion**; run no further population, no further quota, no Phase 4
   beyond the frozen case;
4. additionally test the stronger complete-AEF gate (`eafea` + `fafea`,
   all `K ≤ 100`) on the frozen triple and report the verdict separately.

## 11. Prohibitions reaffirmed

No canonical manuscript edit. No Git mutation. No promotion. No new E. No new
population beyond `RX` as defined. No D. No B enumeration. No F-exclusion
ledger expansion. No Hamming-radius expansion. No fafea CSP construction. No
h = 8. No D40. **No resumption of the deprecated per-signature greedy
UNSAT-core extraction.** `NOVELTY_UNRESOLVED`. Mäkelä OPEN.
