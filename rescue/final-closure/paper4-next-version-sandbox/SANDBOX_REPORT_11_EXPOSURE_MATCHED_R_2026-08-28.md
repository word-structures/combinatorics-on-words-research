# Sandbox Report 11 — exposure-matched R (population `RX`)

**Date:** 2026-08-28 (run completed 2026-08-29 local)
**Status:** sandbox only. No canonical edit. No Git mutation. No promotion.
**Preregistration:** `PREREGISTRATION_EXPOSURE_MATCHED_R_2026-08-28.md`,
sha256 `bca2780f881ac23c9057d204f2e4cbc85f67945afd758bb9ef5abbe1e8d3463c`,
**hashed before any AF_EXISTS evaluation of `RX`.**
**Deviations:** `PREREGISTRATION_EXPOSURE_MATCHED_R_DEVIATION_NOTE_2026-08-28.md` (D1–D7).
`NOVELTY_UNRESOLVED`. Mäkelä **OPEN**.

Naming is kept strictly separate throughout: **`R`** = the Report-7 population
(single E); **`RX`** = this exposure-matched population. No old artifact was
overwritten.

---

## 1. Phase 1 — the preferred design was infeasible, and that is itself a result

A feasibility measurement made **before** the preregistration
(`work/aset_sizes.js`, outcome-independent: it measures `|Aset(E)|` only) found:

| | R pool (60 random E) | H (9 canonical E) |
|---|---|---|
| `\|Aset(E)\|` min / median / max | **0** / 12 / 129,911 | 201 / 3,513 / 50,593 |
| total (E,A) pairs | 261,910 | 111,613 |
| **E with `\|Aset\| = 0`** | **24 of 60** | **0 of 9** |
| E with `\|Aset\| ≥ 1000` | 21 | 7 |
| E with `\|Aset\| ≥ 5000` | 10 | 4 |

**24 of the 60 random E admit no compatible A word at all.** An exactly equal
quota across all 60 therefore forces quota 0. No new E were generated; the
infeasibility is a property of the frozen 60 and is preserved as a finding.

Adopted design: **capped quota `Q = 5000`** per E (each E contributes its first
`min(5000, |Aset(E)|)` A words in deterministic `Alist` DFS order), with two
**nested exact-equal-exposure strata** derived by rank truncation at no extra
compute.

## 2. Phase 2 — execution

Two defects of mine occurred and are documented in full in the deviation note:

- **D5** — the first run (`afexRX`) was corrupted by **two concurrent writer
  processes** (42,647 rows for 22,564 distinct keys). It is **retained, not
  deleted**, marked `runs/afexRX/VOID.json` = `VOID_CONCURRENT_WRITERS`, and all
  its counts and timings are void. Only its per-row `nodes` values were reused,
  as a cost model, never as a result.
- **D6** — `persist.js`'s `Appender` fsyncs per record; writing one record per
  trial (~75k fsyncs) dominated runtime (~640 ms/trial against ~45 ms/trial
  predicted). Corrected in `afexRX2`: rare evidentiary rows keep per-record
  fsync; the high-volume audit log is buffered and fsynced at every E boundary.
  Result: **21.8 ms/trial**, a 29× speedup, with durability at E granularity.

The clean run `afexRX2` took an exclusive `O_EXCL` lock and completed:

| | value |
|---|---|
| trials | **75,111** (exactly as preregistered) |
| E represented | **36** of 60 |
| E at exact quota | **10** |
| distinct A | 74,879 |
| **unresolved** | **0** |
| capped, auto-re-decided at 2·10⁹ | 6 — all resolved |
| runtime | 2,454 s |

**D7 — the fail-closed cap rule was observed working**, first in the voided run
(eIndex 12, rank 66 hit the 5·10⁶ cap; the automatic 2·10⁹ re-decision resolved
it AF-negative in 6,483,407 nodes in ~4 s) and then 6 more times in `afexRX2`.
No case was silently dropped and none was counted as negative while unresolved.

## 3. Phase 3 — matched comparison

The identical quota rule was applied to H by **filtering frozen exhaustive
results** — no H re-computation. The containment premise (every A in any
`Alist(E_i^H)` lies in the evaluated H population) was **verified, not assumed**;
0 violations.

### 3.1 Headline table

| | trials | E repr. | AF-positive | **AFE_EXISTS** | **AF∩AFE** | P40 | E with AF+ | E with AF∩AFE |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| **RX** (capped Q=5000) | 75,111 | 36 | **137** | **0** | **0** | 0 | **17** | **0** |
| **H** (capped Q=5000) | 31,775 | 9 | 263 | **86** | **44** | 34 | 9 | 8 |

### 3.2 Exact-equal-exposure strata (equal by construction)

| stratum | E | trials | AF-positive | AFE_EXISTS | AF∩AFE |
|---|---:|---:|---:|---:|---:|
| **RX-5000-EQ** | 10 | 50,000 | 63 | **0** | **0** |
| **H-5000-EQ** | 4 | 20,000 | 78 | 36 | 24 |
| **RX-1000-EQ** | 21 | 21,000 | 45 | **0** | **0** |
| **H-1000-EQ** | 8 | 8,000 | 40 | 19 | **0** |

`RX-1000-EQ` vs `H-1000-EQ` is the cleanest contrast available: comparable
AF-positive yields (45 vs 40) at exactly equal per-E exposure, and
**AFE_EXISTS 0 vs 19**.

Note `H-1000-EQ` has **0** AF∩AFE. H's AF∩AFE hits occur at ranks ≥ 1000 within
each E, so a quota-1000 comparison alone would have shown 0-vs-0 and proved
nothing. Reporting all strata is what makes the result legible.

### 3.3 Per-E structure — extreme heterogeneity

RX AF-positive is highly E-dependent (full table in `runs/rx_vs_h_perE.csv`):

| E | trials | AF-positive | rate |
|---:|---:|---:|---|
| 48 | 239 | 18 | 7.53 % |
| 47 | 2,611 | 35 | 1.34 % |
| 54 | 5,000 | 34 | 0.68 % |
| 36 | 712 | 6 | 0.84 % |
| 12 | 5,000 | 11 | 0.22 % |
| **0** (the Report-7 E) | 5,000 | **4** | **0.08 %** |
| 7, 28 | 5,000 each | 0 | 0 % |

**The single E used by the entire Report-7 R experiment was among the least
productive of the 36.** Nine E at full quota produced between 0 and 34.

## 4. Verdict against the preregistered decision rule

§9 fixed four outcomes in advance. Observed: RX AF∩AFE = **0** with RX
AF-positive = **137 ≥ 20**. That is precisely the **"Persists"** branch.

> **The phenomenon persists under exposure matching, and it sharpens.**

It also **changes form** in a way the old framing obscured: the separation does
not first appear at `AF∩AFE`. It appears one stage earlier, at **`AFE_EXISTS`**:

| | AF-positive | of which AFE_EXISTS |
|---|---:|---|
| H (Q=5000) | 263 | **86 = 32.7 %** |
| RX (Q=5000) | 137 | **0 = 0 %** |

The old R population had 2 AFE-existent pairs out of 58; `RX` has **0 out of
137**, across 17 different random E. The weak AFE foothold does not survive
exposure matching either — it disappears.

## 5. Exposure and denominator differences that remain

Honest residual asymmetries, none of which is repaired by this experiment:

1. **E-pool composition is not matched and cannot be.** 24 of 60 random E admit
   no A at all; all 9 canonical E do. This is a property of the E words, not of
   the design.
2. **Trials are not equal in total**: RX 75,111 vs H 31,775. RX has *more*
   trials and still zero AFE — so this asymmetry runs against the RX side, not
   in its favour.
3. **AF-positive base rates differ**: H 0.828 % vs RX 0.182 % (4.5×). The
   AFE-stage comparison is conditioned on AF-positive and so is not affected by
   this, but the two stages should not be conflated.
4. **`E at quota` differs** (10 RX vs 4 H) because the `|Aset|` distributions
   differ; the exact-equal strata control for this within each population but
   not between them.

These are **finite-population counts from an exhaustive deterministic
enumeration**. Nothing here is a probability, a rate estimate, or a sampling
inference, and no threshold was fitted after seeing data.

## 6. Cross-check obtained free

The bucket-gate DFS (`target_buckets.js`, the Report-8/10 machinery) and the
independent `stageDFS` (`stage_bcd.js`, the Report-7 machinery) agree on
**263 / 263** quota-matched H pairs. Two separately written solvers, same
verdicts.

## 7. Stop condition

**Not fired.** No RX pair reached `AF_AND_AFE_EXISTS`. No complete AEF triple
appeared, so nothing was frozen under §10 and no expansion occurred.

## 8. Strict summary (A–F; G–H in Report 12)

**A. How many of the 60 random E were actually exposed?**
**36.** The other **24 admit no compatible A word at all** (`|Aset| = 0`) and
cannot be exposed by any design. Of the 36, **10** reached the full quota.

**B. Was exposure equal by construction?**
Not across all 60 — that is mathematically impossible here. Equal **by
construction** within the nested strata: `RX-5000-EQ` (10 E × exactly 5,000) and
`RX-1000-EQ` (21 E × exactly 1,000). Across the 36 represented E, exposure is
**capped-equal**: no E may exceed 5,000, versus the Report-7 design in which one
E supplied 100 %.

**C. How many AF-positive and AF∩AFE-positive cases occurred?**
**137 AF-positive**, **0 AFE_EXISTS**, **0 AF∩AFE**, **0 P40**, from 75,111
trials, with **0 unresolved**.

**D. How many distinct E produced them?**
**17 distinct E** produced AF-positive pairs (up from 1). **Zero** E produced an
AF∩AFE pair.

**E. Does 48-vs-0 survive under exposure matching?**
**Yes**, by the rule fixed in advance. RX AF∩AFE = 0 with 137 AF-positive
(threshold 20), so the result is *not* underpowered and the "Persists" branch
applies. It is now supported by 17 random E rather than 1.

**F. What exactly changed?**
- **Scope.** The evidence is no longer "one random E". 36 E exposed, 17
  productive at the AF stage.
- **Stage.** The separation is now located one stage **earlier**: `AFE_EXISTS`
  (86/263 vs 0/137), with AF∩AFE downstream of it. "48 vs 0" is a consequence,
  not the primary phenomenon.
- **Strength.** The old R's 2 AFE-existent pairs vanish: 0 of 137.
- **New E-level structure.** 24 of 60 random E admit *no* compatible A; canonical
  E always do. Some random E are far *more* AF-productive than the Report-7 E
  (7.53 % vs 0.08 %), so the old result was not merely narrow — it was drawn
  from an unusually poor E.
- **What did not change.** The Report-7 finite counts remain exactly valid for
  what they measured.

## 9. Artifacts

| file | role |
|---|---|
| `PREREGISTRATION_EXPOSURE_MATCHED_R_2026-08-28.md` + `runs/PREREG_EXPOSURE_MATCHED_R.sha256` | hashed before execution |
| `PREREGISTRATION_EXPOSURE_MATCHED_R_DEVIATION_NOTE_2026-08-28.md` | D1–D7 |
| `work/aset_sizes.js`, `runs/aset_sizes_R.json`, `runs/aset_sizes_H.json` | feasibility measurement |
| `work/rx_run.js`, `runs/afexRX2/` | clean AF pass (lock, manifest, per-E, capped) |
| `runs/afexRX/` + `VOID.json` | voided first attempt, retained |
| `work/rx_bcd.js`, `runs/bcdRX/` | downstream stages |
| `work/rx_h_matched.js`, `runs/h_matched_quota.json` | quota-matched H, derived |
| `work/rx_compare.js`, `runs/rx_vs_h_comparison.json`, `runs/rx_vs_h_perE.csv` | Phase 3 |
