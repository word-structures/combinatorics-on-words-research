# Paper 4 — sandbox report, fresh-F → complete-AF → exhaustive complete-AEF

**Date:** 2026-08-28
**Scope:** sandbox only. No canonical file, manuscript, evidence artifact, branch or commit was touched.
**Status:** EXPLORATORY + EXACT-FOR-A-FINITE-SPECIFIED-POPULATION. Nothing here is promoted.
**Mäkelä:** OPEN. **Novelty:** NOVELTY_UNRESOLVED / NOT_ESTABLISHED.

---

## 1. Reconstructed state before this run

### 1a. What the sandbox actually contained

The sandbox held **exactly one package** (4 files + its zip), all three recorded
SHA-256 hashes verified MATCH:

| File | SHA-256 |
|---|---|
| `PAPER4_SUBSET_GATE_INDEPENDENT_NOTE_2026-08-28.md` | `3e95c6d6…` |
| `verify_paper4_subset_covers.py` | `d5bf4966…` |
| `subset_cover_output.json` | `b53646a5…` |

### 1b. Artifacts the task referenced that DO NOT EXIST — fail-closed

Searched the whole worktree. **Absent everywhere, not merely outside the sandbox:**

| Referenced artifact | Status | What it blocks |
|---|---|---|
| `PAPER4_NEXT_VERSION_RESEARCH_PLAN` | **NOT FOUND** | Nothing — the covers it proposes were re-derived from scratch here. |
| Independent long-period AEF39 replay | **NOT FOUND** | Nothing — independently reproduced here (§6). |
| Research-director / audit material | **NOT FOUND as a file** | Nothing computational. |
| "226 A × 102 F → 246 complete-AF pairs → 0 complete-AEF" | **NOT FOUND** | **Blocks crediting that negative milestone.** UNVERIFIED. Not counted anywhere below. |
| "profile-correct A/E/F triple, 0 long-band violations, 9 short-period violations" | **NOT FOUND** | **Blocks the short/long trade-off claim.** UNVERIFIED. |
| Lost fresh-F complete-AF hit | non-evidence by construction | Was the recovery target — now superseded by §7. |

Two stated beliefs therefore rest on nothing retrievable: the 246-pair negative
milestone, and the short/long trade-off witness. Both are recorded as
**UNRESOLVED**, not as background truth.

### 1c. Chronology

- **A — canonical v0.30 state.** Verified in prior audit stages: AEF EXISTS,
  ABFE EXISTS, ABDEF OPEN, complete H NOT FOUND, Mäkelä OPEN, novelty
  NOT_ESTABLISHED, F-exclusion lower bound 38118. All those "exists" claims are
  scoped to the **old K ≤ 40 gate**.
- **B — independently exact-checked here.** Subset covers, K bounds, the
  39-triple collapse, complete-AF satisfiability. §3–§6.
- **C — later exploratory search.** This run's fresh-F campaign. §7–§8.
- **D — proposed next-version architecture.** `F → AF_complete → AEF_complete →
  ADEF_complete → ABDEF_no-C_complete → C → Gate T`. The AF and AEF stages are
  now independently certified (§3–§4). ADEF and no-C stages are **not** certified
  here.
- **E — still requiring promotion/replay.** Everything in §1b, plus the no-C
  17-block cover (regenerated §3 but not audited against the manuscript's
  "macro support" definition).

---

## 2. Inputs and hashes

| Input | SHA-256 |
|---|---|
| `PAPER4_702_FULLNOC_ALL_ABFE_14266.tsv` (canonical, read-only) | `ad4aec2e3282823de429f5fa3804c571cca026cee98eee7466e3236c1ef1e6d6` |
| `verify_paper4_subset_covers.py` | `d5bf49665498aa4777d442c30c040cf87549b69eca4e573e9149048fada10c72` |
| `subset_cover_output.json` | `b53646a544a79b1490df50c5c91b79ecf7c11a873b83c8e383e1aa87652eb098` |

Sandbox code (all new):

| File | SHA-256 |
|---|---|
| `work/gate.js` | `387f469c14dfb063a56d10b178beaab3846eccd57f4ef0c50b9f6f60cfb60458` |
| `work/persist.js` | `1ffd17df484a31e73550864e88f21f5209f00488650e637cb42d5f6f342ef45a` |
| `work/rng.js` | `2e363e2ba644bf844fa4e08e80b561fd30f3f1bc8f26887294a2b359b42010c3` |
| `work/run_freshF.js` | `537c0d379516ac0675407f866e3c78a8b7b402fda9c0296ec70f3b884fc5bf4c` |
| `work/close_e_canonical.js` | `98a28639b13d0d646df85239c74c7a2bba1dc4f489e6d8bf348159b2b3f82e30` |
| `work/independent_check.js` | `35c3fff549674848736cfdeda236cc3e67677d4b6252610a75d0512785721588` |
| `work/indep_covers.js` | `e9d1c4b012d3484c336876349fa39539fcc2159ded647d2c3dc654de5226d90a` |
| `work/positive_control.js` | `9f5be6f513a7bf09a7d546a2b0d3f6dc9f682de0fb3fbac847f083a89447c158` |
| `work/count_F.js` | `6e1e08585747b6f4c23f26477caa39589f3919491514820413746230f7203e03` |

**Gate version string** (embedded in every persisted record):
`subset-cover-2026-08-28/h6/L40/AF=faf,K<=60;AEF=eafea+fafea,K<=100`

---

## 3. Independently regenerated h6 AF and AEF subset-factor covers

Their `verify_paper4_subset_covers.py` runs clean (all internal asserts pass) and
reproduces `subset_cover_output.json` **byte-identically**.

I then re-derived everything by a **deliberately different method** (`indep_covers.js`):
JavaScript not Python; direct scan of a generated prefix instead of the
`ceil((n+2)/3)` recursion; the bigram set **derived**, not hardcoded; primitivity
checked; prefix sufficiency demonstrated by saturation.

```
macro morphism primitive: true (A^3 > 0)
prefix 19,683 vs 531,441 — factor counts saturate to n=25: true
derived p(1..8) = [6,14,22,30,38,44,52,60]
derived F2 = ac,ad,af,bc,bd,cb,ce,dc,df,ea,eb,fa,fb,fe   (14, matches; not hardcoded)

AF          R= 3  cover=[faf]                                   none at length 4
AEF         R= 5  cover=[eafea, fafea]                           none at length 6
NO_C_ABDEF  R=17  cover=[eafea, bdfadfbdfafea, ebdfafeadfbdfafea] none at length 18
```

**Complete agreement.** Additionally verified here and not in their script: every
cover word is a genuine factor of the fixed point.

**ESTABLISHED:** the AF cover `faf` and the AEF cover `{eafea, fafea}` are correct
and maximal.

---

## 4. Proof/check of the natural complete K bounds

The argument, checked rather than assumed:

1. An output abelian square occupying `[p, p+2K)` intersects a contiguous run of
   macro positions. If every intersected macro letter lies in `S`, that run is an
   `S`-only macro factor `u`.
2. `S`-only factors are factorial with maximum length `R` (verified `R=3, 5, 17`
   with emptiness at `R+1`; factoriality then rules out every longer length).
   Hence `u` is a factor of some maximal cover word `v`.
3. `H` is uniform, so `H(u)` is a contiguous substring of `H(v)`; the square is a
   factor of `H(v)`.
4. A square inside `H(v)` needs `2K ≤ L·|v|`, so `K ≤ ⌊L·|v|/2⌋`.

Therefore scanning each `H(v)` at all offsets for `2 ≤ K ≤ ⌊L|v|/2⌋` is **complete**
for all obstructions supported on `S`. At `L=40`: **AF ⇒ K ≤ 60**, **AEF ⇒ K ≤ 100**.
**ESTABLISHED.**

Two findings the source note does not state:

- **Per-word, not global, ceilings.** `subset_cover_output.json` reports only
  `max` (`340` for no-C). The actual ceilings are `[100, 260, 340]` — you cannot
  check `K=340` in the 200-letter `H(eafea)` window. Any implementer must use
  `⌊L|v|/2⌋` **per cover word**. Minor but real discrepancy.
- **The AEF gate subsumes the AF gate**, since `faf` is a factor of `fafea`.
  Verified structurally and computationally (0 counterexamples on 39 triples).
  So complete-AF is a cheap *pre-filter*, not an independent obligation.

**Scope limit (important):** the method needs `S` a *proper* subset with the
complement recurrent. For `S = Γ` there is no bound. The subset gates can
therefore never replace Gate T — the most they can ever certify here is
`K ≤ 340`, and only for squares avoiding role `c` entirely.

---

## 5. Exact fresh-F generation/search definition

**F domain:** `|F| = 40`, Parikh `(19,11,10)`, `F` itself abelian-square-free for
every `K = 2..20`. (Necessary: `F` is a factor of `H(faf)`.)
Exhaustive enumeration was attempted: **> 6,929,913 members, not exhausted at
5×10⁸ nodes.** The domain is large — sampling is required, not optional.

**F generation:** seeded DFS, letter order shuffled per node by mulberry32
(seed `20260828`), first solution taken, restart on the advancing PRNG state.

**A search (per F):** exhaustive DFS over Parikh `(15,14,11)`, incrementally
pruned on `F·A` (squares ending at each new position, `K ≤ 60`), with the full
`H(faf) = F·A·F` gate verified at completion. Per-F node cap 2×10⁷ — **never hit**.

**E search (per complete-AF pair):** DFS over the **entire** Parikh `(13,16,11)`
class — no sampling — driven on `H(fafea) = F·A·F·E·A` because its 120-letter
prefix is fixed, giving full incremental pruning from E's first letter;
`H(eafea)` verified in full at completion. Sound because no square with `K > 60`
fits inside a 120-letter prefix, and that prefix is already certified by the
complete-AF gate.

**Persistence:** append-only JSONL, `fsync` on every record *before* the search
continues; atomic manifest via temp+rename; content-derived SHA-256 IDs;
resume-safe (existing IDs reloaded on open); seeds and all parameters recorded.

---

## 6. Regression fixtures and controls

| Test | Expectation | Result |
|---|---|---|
| R1 — 15 canonical AF pairs vs complete-AF gate | all accepted | **15/15 confirmed** |
| R2 — 39 canonical AEF triples vs complete-AEF gate | all rejected | **39/39 rejected**, first witnesses recorded |
| R3 — synthetic negatives | rejected | **2/2 rejected** on profile |
| Two independent implementations agree | yes | **yes** — `independent_check.js` shares no code with the search, re-derives covers and re-derives profiles from the lift `M' = M_g3 + 10·1·1ᵀ` |
| PRNG quality | uniform, long period | mean 0.50049, flat deciles, 199,994 distinct in 200k draws |
| Sampler diversity | > 90% distinct | **300/300 = 100%**, 0 invalid |
| **Positive control** — can the search find hits at all? | yes at reduced K | see below |

**Positive control (this matters — it is what makes a 0-hit result meaningful):**

```
KMAX=  6  completeE=  31  HITS=3
KMAX= 10  completeE=  49  HITS=3
KMAX= 20  completeE=1208  HITS=3
KMAX= 40  completeE=3178  HITS=3
KMAX= 60  completeE=  10  HITS=0
KMAX=100  completeE=   0  HITS=0
```

The machinery finds and persists hits whenever they exist. The collapse is
located precisely in the **K ∈ [41,60]** band. A zero at `KMAX=100` is a genuine
negative, not a silent search failure.

**Two defects in my own first runner, found and fixed — recorded, not hidden:**

1. `rng.js` was a mangled 64-bit xorshift128+ running on 32-bit values: short
   period, so the F sampler produced **54 distinct words from 4,000 draws**.
   Replaced with mulberry32. Run `fresh_s20260828` is marked
   **`VOID_DEFECTIVE_SAMPLER`** in its own manifest and is retained as a record,
   **not as evidence**.
2. I had fixtures for the *checker* but none for the *sampler* or the *searcher*.
   Both now exist (diversity test; positive control).

---

## 7. Fresh-F results

Run `fresh_v2_s20260828`, seed `20260828`, target 3,000 F. **COMPLETED.**

| Quantity | Value |
|---|---|
| F draws | 3,000 |
| **Distinct F examined** | **2,900** (100 duplicates; 96.7% distinct) |
| F whose exhaustive A-search hit the node cap | **0** — every A-search was exhaustive |
| **Complete-AF hits found and persisted** | **15** |
| Independently confirmed (separate implementation) | **15/15** |

Two example recovered hits (full records in `runs/fresh_v2_s20260828/af_hits.jsonl`):

```
A = aacaaabbbaacbccaaacbbaaabbbacbbbccabbccc
F = aaabacbbbaaabcaaaccbcccabbbaaacabccaaaba

A = bbbaaacccaaabaacaabbbcbbbabbbcccbacccaaa
F = cbbabbbcbbaaacaaabacbcccaabccaaabaaacaaa
```

**The lost hit is recovered and superseded.** The immediate recovery target is met.

---

## 8. Exhaustive E closure

| Population | Pairs | E nodes | complete E | **complete-AEF hits** | Exhaustive over full E profile class |
|---|---:|---:|---:|---:|:--:|
| Canonical complete-AF (from the hash-verified census) | 15 | 972,075 | 54 | **0** | **yes** |
| Fresh complete-AF (this run) | 15 | 57,602 | 63 | **0** | **yes** |
| **Total distinct AF pairs closed** | **30** | 1,029,677 | 117 | **0** | **yes** |

No pair hit its node cap. "Exhaustive" here means the **entire** Parikh `(13,16,11)`
class was searched — not a sample, not a bounded domain.

**Additional established result:** all 15 canonical AF pairs **pass** the complete-AF
gate at `K ≤ 60` — so complete-AF is satisfiable with the L=40 profiles, and the
bottleneck is located exactly at the **AF → AEF** step.

### 8a. End-to-end validation against historical data

Running this from-scratch harness at the **old** `K ≤ 40` ceiling reproduces the
canonical census exactly:

```
canonical AF pairs with >=1 passing E : 15 / 15     total passing E : 39
fresh     AF pairs with >=1 passing E :  0 / 15     total passing E :  0
canonical census distinct (A,E,F) triples on record : 39     -> exact match
```

The 39 historical triples are precisely the `K ≤ 40` survivors of the 15 canonical
AF pairs. Independent code, independent covers, independent profiles — same 39.
This validates the whole harness against pre-existing evidence.

### 8b. Extinction-threshold sweep — where complete-AEF dies

Exhaustive E closure over all 30 complete-AF pairs, ceiling varied:

| KMAX | pairs with ≥1 passing E | total passing E |
|---:|---:|---:|
| 40 | 15 / 30 | 39 |
| 42 | 7 / 30 | 9 |
| 44 | 2 / 30 | 4 |
| **46** | **0 / 30** | **0** |
| 48, 50, 55, 60, 80, 100 | 0 / 30 | 0 |

**The extinction threshold is `K = 46`.** Complete-AEF collapses to nothing over a
six-unit window between `K = 40` and `K = 46`, while the certified requirement is
`K ≤ 100`.

**ESTABLISHED, exact for these 30 complete-AF pairs.** For this population L=40 is
not marginally short of viable — it dies 54 units below the required ceiling. This
is **not** an L=40 impossibility result: the F domain exceeds 6.93M and only 2,900
F were examined.

---

## 9. The 39-triple collapse, re-established against the correct gate

Against `H(eafea)` and `H(fafea)`, `2 ≤ K ≤ 100` — not the earlier ad-hoc
trigram scan:

```
distinct (A,E,F) triples : 39      wrong role profiles : 0
passing complete-AEF gate: 0       failing : 39
violations: short (K<=40) = 0      long (K>40) = 4414
minimal failing K per triple: histogram {41:4, 42:26, 44:5, 45:4}
```

**ESTABLISHED, exact for this finite population.** Every triple fails, all at
`K ≤ 45`; zero short-period violations, confirming the old `K ≤ 40` gate was
correctly implemented and simply too weak.

**This does NOT prove L=40 impossible.** It is a statement about 39 specific triples.

---

## 10. Epistemic status of every conclusion

| Claim | Status |
|---|---|
| AF cover `faf`, K ≤ 60; AEF cover `{eafea,fafea}`, K ≤ 100 | **ESTABLISHED** — two independent implementations, different methods/languages |
| Per-word (not global) K ceilings required for the no-C cover | **ESTABLISHED** |
| AEF gate subsumes AF gate | **ESTABLISHED** |
| All 39 canonical triples fail the complete-AEF gate, min K ∈ {41,42,44,45} | **ESTABLISHED, exact for that finite population** |
| All 15 canonical AF pairs pass the complete-AF gate | **ESTABLISHED, exact for that finite population** |
| 30 distinct complete-AF pairs, full E profile class exhausted, 0 complete-AEF | **ESTABLISHED, exact for that finite population** |
| 15 fresh complete-AF hits, independently confirmed | **ESTABLISHED** |
| Harness reproduces the canonical 39 triples exactly at K ≤ 40 | **ESTABLISHED** |
| Extinction threshold K = 46 over these 30 pairs | **ESTABLISHED, exact for that finite population** |
| Complete-AEF existence at L=40 | **UNRESOLVED** |
| L=40 impossibility | **NOT ESTABLISHED — and not supported by anything here** |
| Short/long trade-off witness (9 short violations) | **UNVERIFIED — artifact absent** |
| 226×102 → 246 pairs → 0 hits | **UNVERIFIED — artifact absent** |
| Mäkelä | **OPEN** |
| Novelty | **NOVELTY_UNRESOLVED / NOT_ESTABLISHED** |

No global impossibility is inferred from any finite exhaustion.

---

## 11. Discrepancies with the stated next-version plan

1. **Per-word K ceilings.** `subset_cover_output.json` publishes only the max
   (340). Must be `⌊L|v|/2⌋` per cover word: `[100, 260, 340]`.
2. **AF is not an independent stage.** The AEF gate subsumes it. AF should be
   documented as a pre-filter.
3. **The 226×102/246 population and the short/long trade-off witness do not
   exist** on disk. Neither may be cited until reproduced.
4. **The F domain is large** (> 6.93M, unexhausted). Any plan implying near-exhaustive
   fresh-F coverage needs re-scoping.
5. **The starting population was mis-prioritised.** The 15 canonical AF pairs are
   already certified complete-AF and had never had their E class exhausted. That
   was the cheapest decisive experiment available and it is now done (§8).

---

## 12. Recommended next action

**Do not add D. Do not resume B enumeration. Do not extend the F-exclusion ledger.**
**Do not scale fresh-F further** — §8b shows why it would be uninformative.

The threshold sweep changes the recommendation. Complete-AEF does not fail
*narrowly*: over 30 complete-AF pairs it is extinct by `K = 46`, against a
requirement of `K ≤ 100`. Drawing more fresh F tests the same hypothesis at linear
cost with a 15-in-2,900 hit rate at the AF stage and a measured zero at the AEF
stage. That is the wrong variable.

1. **Establish whether `K = 46` is a population artifact or a structural
   constant.** Re-run the threshold sweep on a genuinely different complete-AF
   population (different seed, and ideally F drawn from a different region of the
   6.93M-member domain). If the threshold sits at 44–48 again, it is a property of
   the L=40 profile system, not of these 30 pairs. Cost: under an hour.
2. **Then attack the mechanism, not the sample.** Ask which structural feature of
   `H(eafea)` / `H(fafea)` forces the `K ∈ [41,46]` collision. `K = 40 + r` with
   small `r` is exactly where the boundary-correction term has maximal freedom to
   cancel a bounded macro residual, so the extinction window is where the theory
   predicts pressure to be highest. A derivation there would explain the cliff
   instead of re-measuring it.
3. **Only then reconsider L.** If the threshold is structural, the productive
   question is whether a different block length in the kernel-preserving lift
   family moves it — not whether more L=40 blocks can be found.

Nothing here licenses an L=40 impossibility claim, and none is made.

Raw solver output is kept separate from this report under `runs/`.
