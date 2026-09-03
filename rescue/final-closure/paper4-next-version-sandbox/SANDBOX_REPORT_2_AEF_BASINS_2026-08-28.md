# Paper 4 — sandbox report #2: corrected survival record and independent AEF basins

**Date:** 2026-08-28
**Scope:** sandbox only. No canonical Paper-4 file, manuscript, evidence artifact, branch or commit touched.
**Supersedes:** the extinction-threshold wording in `SANDBOX_REPORT_2026-08-28.md` §8b.
**Mäkelä:** OPEN. **Novelty:** NOT_ESTABLISHED. **Complete-AEF existence at L=40:** UNRESOLVED.

---

## 1. Final record verified from disk

All counts below were read from persisted files, not from chat memory.

| Quantity | Persisted value | Source |
|---|---|---|
| Run status | `COMPLETED` | `runs/fresh_v2_s20260828/manifest.json` |
| F draws / distinct F | 3,000 / **2,900** | manifest summary |
| F with capped A-search | **0** | manifest summary |
| Fresh complete-AF hits | **15** | `af_hits.jsonl` — 15 lines, 15 distinct IDs |
| Canonical complete-AF pairs | **15** | `fixtures/af_complete_pass.json` |
| Total distinct complete-AF pairs | **30** | `runs/all30_af_pairs.json` |
| E-closure, canonical 15 | 972,075 E nodes, 54 complete E, **0 AEF hits**, all exhaustive | `canonical15_eclosure` |
| E-closure, fresh 15 | 57,602 E nodes, 63 complete E, **0 AEF hits**, all exhaustive | `fresh_v2_eclosure_FINAL` |
| `aef_hits.jsonl` in both closures | 0 lines | direct read |

**Independent recheck:** all 15 fresh complete-AF hits re-confirmed (15/15, 0 rejected) by
`independent_check.js`, which shares no code with the search and re-derives both the
cover and the role profiles from the lift `M' = M_g3 + 10·1·1ᵀ`.

**Frozen:** `FROZEN_RECORD_2026-08-28.sha256` — 24 artifacts (run manifests, AF-hit JSONL,
E-closure outputs, search code, independent checker, fixtures, report).

### 1a. All 39 K≤40 survivors come from the canonical pairs — VERIFIED

Exhaustive check over the 15 fresh complete-AF pairs at the K≤40 AEF gate:

```
fresh pairs: 15
pairs admitting >=1 K<=40-clean E : 0
total K<=40-clean E               : 0
E words reaching length 40 under K<=40 pruning : 155,021
```

155,021 E candidates completed and **none** passed. This is a real zero, not a pruning
artifact. **Confirmed: all 39 K≤40 AEF survivors come entirely from the 15 canonical
AF pairs.**

---

## 2. CORRECTION — the "K = 46 extinction threshold" was wrong

**What the previous report said:** "The extinction threshold is `K = 46`", with derived
phrases "six-unit window between `K = 40` and `K = 46`" and "dies 54 units below the
required ceiling".

**What is actually true.** Exact survival counts, computed at every integer directly from
the witness data (`runs/survivors_30pairs.json`):

| t | N(t) = triples still clean through K ≤ t |
|---:|---:|
| 40 | 39 |
| 41 | 35 |
| 42 | 9 |
| 43 | 9 |
| 44 | 4 |
| **45** | **0** |
| 46 | 0 |

Exact first-bad-K histogram: `{41: 4, 42: 26, 44: 5, 45: 4}` — sum 39. **No triple has
first-bad-K = 43.**

**Corrected formulation:**

> All 39 canonical K≤40 survivors fail by K = 45.

**Cause of the error, recorded not hidden.** My threshold sweep sampled the ceiling on the
grid `{40, 42, 44, 46, 48, 50, 55, 60, 80, 100}`. It never evaluated 41, 43 or 45. Seeing
`N(44) = 4` then `N(46) = 0`, I named the first *tested* zero as the threshold. The gate is
inclusive, so with first-bad-K ≤ 45 for every triple, extinction is complete at **45**.

**Derived language also corrected:**

- "six-unit window between 40 and 46" → the collapse occupies **K ∈ {41,…,45}**, five
  values, and K = 43 is empty.
- "dies 54 units below the ceiling" → arithmetic also wrong (it came from 100 − 46).
  Replace with the plain statement: **extinct at K = 45, against a certified requirement
  of K ≤ 100.**

---

## 3. Mathematical wording

The subset-gate hypothesis is stated directly:

> **Hypothesis.** `Fact(x) ∩ S*` has bounded word length.

Under it, the maximal `S`-only factors form a finite antichain, every output abelian
square whose intersected macro support lies in `S` is a factor of some `H(v)` for `v` in
that antichain, and checking each `H(v)` for `2 ≤ K ≤ ⌊L·|v|/2⌋` is complete for `S`.
Verified bounds: `AF → faf`, `K ≤ 60`; `AEF → {eafea, fafea}`, `K ≤ 100`.

`AF_complete` is a **computational pre-filter**; it is logically subsumed by
`AEF_complete` once E is assigned, since `faf` is a factor of `fafea`.

---

## 4. New search: joint E → A → F

The previous order (sample F → search A → close E) had poor information yield: 15 fresh
complete-AF pairs produced **zero** K≤40 AEF survivors. The search variable was changed.

**New order E → A → F**, chosen so every level prunes against committed structure. In
`eafea = E A F E A` the prefixes `E`, `E·A`, `E·A·F` are progressively fixed, so pruning
is active from the first letter of A onward. Acceptance requires `H(faf)` clean to K ≤ 60
**and** `H(eafea)`, `H(fafea)` clean to K ≤ 40.

Persistence unchanged: append-only + `fsync` per hit, atomic manifest, content-derived
SHA-256 IDs, resume-safe, seeds and exact domain definitions recorded.

**Positive control (required before any large run).** Fixing E to canonical `E[0]`, the
search must rediscover K≤40-clean AEF states. It does — 12 triples, of which 2 are in the
canonical 39 and 10 are new. Control **PASSED**; the search can find and persist hits.

---

## 5. New K≤40-clean AEF population

Two basins, canonical `E[0]` and canonical `E[1]` (different words, **zero** triple-ID
overlap):

| | triples | in canonical 39 | **new** |
|---|---:|---:|---:|
| basin `E[0]` | 12 | 2 | 10 |
| basin `E[1]` | 12 | 2 | 10 |
| **combined** | **24** | 4 | **20** |

All 24 independently re-confirmed K≤40-clean by the definition-level checker (12/12 and
12/12, 0 rejected).

### A. New triple IDs not among the canonical 39 — **20**

Persisted in `runs/newpop_combined.jsonl` with full records. Contributing **8 new A words**
(outside the old pool of 8) and **1 new F word** (outside the old pool of 7).

### B. Strict-disjoint subset — **0**

No triple has A, E and F all outside the old pools. **By construction:** both basins fix E
to a canonical word, so `E_in_old9 = true` for all 24. This population is genuine
*recombination with new A and F*, **not** a genuinely new basin. Stated plainly so it is
not over-read.

---

## 6. Structural diagnostics

| | canonical 39 | new 24 |
|---|---|---|
| first-bad-K histogram | `{41:4, 42:26, 44:5, 45:4}` | `{45:4, 47:20}` |
| cover | `eafea` ×39 | `eafea` ×24 |
| start-phase | `{7:4, 10:4, 11:16, 21:5, 24:6, 26:4}` | `{7:4, 12:20}` |
| K mod 40 | `{1:4, 2:26, 4:5, 5:4}` | `{5:4, 7:20}` |
| half-Parikh | 6 distinct vectors | `{(18,15,14):20, (16,16,13):4}` |
| survives K ≤ 100 | 0 | 0 |

Survival curves:

```
canonical 39 : N(40)=39 N(41)=35 N(42)=9 N(43)=9 N(44)=4 N(45)=0
new 24       : N(40)=24 N(41)=24 N(42)=24 N(43)=24 N(44)=24 N(45)=20 N(46)=20 N(47)=0
```

Three invariants hold across **all 63** triples examined:

1. **Every** first violation occurs in the `eafea` cover. `fafea` never produces the
   minimal violation — 63/63.
2. `K mod 40 ∈ {1,2,4,5,7}` throughout: every failure is `K = 40 + r` with small `r`.
3. Half-Parikh vectors of the violating half concentrate on a handful of values.

---

## 7. Answer to the key scientific question

> Does the K = 41…45 extinction pattern reproduce in new K≤40-clean AEF basins?

**No — not in this population.** The 24 new triples are all still clean at K = 44 where
only 4 canonical triples survive, and 20 of them survive to K = 46. The canonical
population is extinct at 45; the new population is extinct at 47.

This is **interpretation (1): the apparent cliff was population-specific.** The specific
value 45 is a property of the canonical 39, not a constant of the L=40 profile system.

**Two qualifications that must travel with that conclusion:**

- The two basins are **adjacent**, not independent: `E[0]` and `E[1]` differ in only ~3 of
  40 positions, and both are canonical E words. Their *identical* first-bad-K, phase,
  K-mod-40 and half-Parikh signatures indicate local rigidity, not independent replication.
  This is **not yet** the independent-population test.
- The extinction point moved from 45 to 47. It did **not** move toward 100. Both
  populations die far below the certified requirement.

### 7a. Genuinely independent basins: the fresh-E run — CORRECTED

An earlier draft of this section called the fresh-E run "bounded, incomplete" and said it
must not be read as evidence. **That under-claimed the result and is corrected here.**

`freshE_s7788` (seed 7788, 60 random non-canonical E, caps 4×10⁷ per level) **completed**:

```
eExamined 60   eDuplicates 0   aefK40Hits 0   seconds 1160.6
```

For **60 distinct random non-canonical E**, searching the A and F profile classes, the run
found **zero** K≤40-clean AEF triples. Evidence bearing on whether that search was
exhaustive rather than truncated:

- **A level:** `aCapped: false` at every persisted checkpoint (`aNodes` 1 … 259,190 against
  a 4×10⁷ cap).
- **F level:** direct re-measurement over a sample of E and their A-completions gives a
  maximum F-level cost of **1,099,988 nodes** (canonical E[0]) and **451,728** (random
  E[0]) — a **≈36× margin** below the cap.

Two instrumentation defects in the original runner blocked a clean assertion:

1. F-level capping was tracked in a local variable that was never persisted.
2. A-level capping was logged only every 10th E, so 6 of 60 checkpoints existed.

Both are fixed in `freshE_exhaustive.js`, which records A- and F-level cap events for
**every** E. A deterministic re-run at the same seed (`freshE_exh_s7788`) has now
**COMPLETED and settles the question**:

```
eExamined 60   eDuplicates 0   eCanonicalSkipped 0   aefK40Hits 0
eWithACapped 0   fLevelCapEvents 0
maxANodes 3,489,981  (cap 4e7, margin x11.5)
maxFNodes 4,368,791  (cap 4e7, margin x9.2)
exhaustiveOverFullAandFProfileClasses: TRUE      seconds 1096.7
per-E records: 60      E fully exhaustive: 60 / 60
total A-completions: 261,910      aef40_hits.jsonl: 0 bytes
```

**ESTABLISHED, exact for this population:** for **60 distinct random non-canonical E**,
searched **exhaustively over the entire Parikh-(15,14,11) A class and the entire
Parikh-(19,11,10) F class**, there are **zero** K≤40-clean AEF triples. No cap was reached
at any level for any E. The re-run reproduces the original run's zero, validating it too.

This is a genuine exact negative for a precisely delimited population — not a bounded or
heuristic search. It remains a statement about **60** E words drawn from a class exceeding
10¹⁷, and licenses no claim about random E in general.

**The A-level cost asymmetry is itself a finding.** Random E words are *not* barren at the
A level — random E[0] admits **129,911** complete A words versus **26,646** for canonical
E[0]. Across the 60 random E: **261,910** complete A words in total, 24 E with none, and
**36 E with a nonempty A set but zero hits**. Yet canonical E[0] and E[1] yield 12 triples
each. The selectivity therefore sits at the **F** stage, not the A stage.

**Sharpest structural signal in this run.** Exhaustively:

| E source | E words | K≤40-clean AEF triples |
|---|---:|---:|
| random non-canonical | 60 | **0** |
| canonical (`E[0]`, `E[1]`) | 2 | **24** |

The canonical E words are extraordinarily special. Whatever distinguishes them is the
most concrete lead this run produced, and it is a property of **E**, discoverable without
touching B or D.

---

## 8. Epistemic status

| Claim | Status |
|---|---|
| Final counts (2,900 F / 15 fresh AF / 30 pairs / 0 complete-AEF) | **ESTABLISHED**, verified from disk |
| All 39 K≤40 survivors come from the 15 canonical AF pairs | **ESTABLISHED, exact** |
| N(45) = 0; all 39 canonical fail by K = 45 | **ESTABLISHED, exact** |
| Previous "K = 46 threshold" wording | **RETRACTED** — sweep-grid artifact |
| 24 new K≤40-clean triples, 20 outside the canonical 39 | **ESTABLISHED**, independently re-checked |
| New population extinct at K = 47, not 45 | **ESTABLISHED, exact for that population** |
| The K=41…45 cliff is population-specific | **ESTABLISHED for these two basins** |
| Cliff behaviour in *strictly disjoint* basins | **UNRESOLVED** — 0 such triples found |
| 60 random non-canonical E yield 0 K≤40-clean triples, **exhaustively over the full A and F profile classes** | **ESTABLISHED, exact for that population** — `exhaustiveOverFullAandFProfileClasses: true`, 60/60 E uncapped at both levels |
| Random E in general admits no K≤40-clean triple | **NOT CLAIMED** — 60 E is a finite sample of a class exceeding 10¹⁷ |
| Selectivity sits at the F stage, not the A stage | **ESTABLISHED** for the measured sample (random E[0]: 129,911 complete A, 0 hits) |
| Complete-AEF existence at L=40 | **UNRESOLVED** |
| L=40 infeasibility | **NOT ESTABLISHED**, and not inferable from any finite exhaustion here |

No global impossibility is inferred anywhere. Mäkelä OPEN; novelty NOT_ESTABLISHED.

---

## 9. Recommended next action

1. **Characterise what makes the canonical E words special.** This is now the highest-value
   question: 60 random E give 0 triples exhaustively, 2 canonical E give 24. Seed E from
   *perturbations at increasing Hamming distance* from canonical E words, which sweeps
   continuously from "adjacent" to "disjoint" and makes the independence question
   quantitative rather than binary. The answer is a property of E alone — no B, no D.
2. **Then re-run the diagnostic at each Hamming radius.** If the first-bad-K signature
   drifts smoothly with distance from the canonical basin, the obstruction is a local
   geometric property; if it stays pinned at `K mod 40 ∈ {1,2,4,5,7}` and cover `eafea`,
   that is a structural boundary phenomenon worth deriving analytically.
3. **The `eafea`-only invariant is the sharpest lead.** 63/63 minimal violations land in
   `eafea` and none in `fafea`. `eafea = E A F E A` places two E-blocks 120 apart while
   `fafea = F A F E A` does not repeat E. A derivation of why E-repetition at macro
   distance 3 forces a `K = 40 + r` collision would explain the whole phenomenon rather
   than re-measuring it.

Raw solver output remains under `runs/`, separate from this report.
