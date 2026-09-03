# Sandbox Report 9 — Occurrence-Geometry v0.2 audit, and the minimal motif basis

**Date:** 2026-08-28
**Status:** sandbox only. No canonical manuscript edit. No Git mutation. No theorem promotion.
**Novelty:** `NOVELTY_UNRESOLVED` (unchanged).
**Mäkelä:** OPEN (unchanged). No statement here bears on L = 40 impossibility.

---

## 1. Task 1 — immutability and provenance

### 1.1 Located inputs

| artifact | path | sha256 |
|---|---|---|
| occurrence-geometry package | `_paper4-next-version-sandbox/PAPER4_OCCURRENCE_GEOMETRY_v0.2_2026-08-28.zip` | `4e4d6e3b4186dd9e93a1c5565f7b23750ec846f129b36adbc5baf255c8fe6579` |
| novelty audit | `PAPER4_NOVELTY_LITERATURE_AUDIT_v0.1_2026-08-28.md` | `9176f47d9779fe5bacf0fc41ce60b3b1b774a3880fe6071e322f7b7b63c5fcba` |
| deep research report | `deep-research-report (2).md` | `c92e016670c225562999ac3d535d8a60e565e68ef22b606f182083d1527cd914` |

Unpacked read-only into `_geom_pkg/paper4_occurrence_geometry_v02/`. Source zip untouched.

### 1.2 Manifest verification — MATCH

All four declared files match `SHA256SUMS.json` exactly:

| file | declared = actual |
|---|---|
| `PAPER4_OCCURRENCE_GEOMETRY_THEOREM_v0.2_2026-08-28.md` | `886c1122fb35688d…` ✅ |
| `verify_occurrence_geometry_v02.py` | `f13bc0b890e80e0a…` ✅ |
| `occurrence_geometry_checks_v02.json` | `d55f97625bc1d44c…` ✅ |
| `README.md` | `1f3120048cb805d9…` ✅ |

### 1.3 Supplied verifier reproduces its own delivered results — MATCH

`verify_occurrence_geometry_v02.py` run unchanged reproduces
`occurrence_geometry_checks_v02.json` **byte-identically** (all seven top-level
keys MATCH). This is cleaner provenance than the v0.2 boundary-projection
package audited in Report 4, which had a declared-but-undelivered file and
quoted trial counts that disagreed with the delivered script.

### 1.4 Provenance limitation — recorded, not worked around

The **v0.1 repeated-role package is not present in the sandbox.** The v0.2
README and §0 assert that v0.1's irregular-spacing probe was defective
(“support 51” vs the corrected 10). I can and do verify the **corrected**
v0.2 experiment independently (§2, check C13), but I **cannot** verify the
description of the v0.1 defect. Recorded as `V01_NOT_PRESENT`; the
supersession claim is accepted only as far as v0.2 stands on its own.

---

## 2. Task 2 — clean-room mathematical replay

Written from the definitions before reading `verify_occurrence_geometry_v02.py`.
Three independent routes:

- **R1 `directScan`** — direct `(s,K)` enumeration (ground truth).
- **R2 `compileScan`** — closed macro/local compiler: enumerates macro block
  **triples**, solves the curvature law for `i₂`, never scans `(s,K)`.
- **R3 motif-family predictors** — §4/§5 closed forms.

Files: `work/geom_core.js`, `work/geom_audit.js`, `work/geom_probe.js`.
Results: `geom_audit_results.json`, `geom_probe_results.json`.

### 2.1 Check results

| # | check | verdict | evidence |
|---|---|---|---|
| C1 | direct vs **independent** closed compiler | **PASS** | 886 masks, `L=4..13`, `N=2..6`, 0 mismatches |
| C2 | odd and even `L` | **PASS** | both parities throughout |
| C3 | block boundary `i=0`, endpoint `t=NL` | **PASS** | 14,633 zero-offset windows, 2,305 cuts in virtual block `N`, 0 violations |
| C4 | `K=2` lower boundary | **PASS** | compiler agrees at `kmin=1` too; 366 signatures reachable only at `K=1` |
| C5 | adjacent and non-adjacent macro gaps | **PASS** | included in C1 mask sweep |
| C6 | equal-depth coefficient cancellation | **PASS** | 2,877 two-cut and 425 three-cut collisions; all-three-same-depth **always** reduces to the empty signature |
| C7 | all three curvature branches | **PASS** | `{-1,0,+1}` all realized |
| C8 | `C`-family closed counts | **PASS** | `L=4..100`, 0 failures; extended to `L=512` (probe P6) |
| C9 | `C`-family pairwise disjointness | **PASS** | `L=4..100`, 0 failures |
| C10 | even-gap midpoint routing | **PASS** | 6,248 verified configurations |
| C11 | odd-gap low/boundary/high routing | **PASS** | 3,692 verified configurations |
| C11b | odd-gap `n²` split | **PASS** | `L=4..60`, `C(n,2)+n+C(n,2)=n²` exact |
| C12 | FAF `L=40` → 400 bridges | **PASS** | `S_FAF∖S_AFE` = 400 = `M_L` = `⌊L²/4⌋` |
| C13 | same-ambient `{0,2}→{0,2,5}` | **PASS with a convention caveat** (§2.3) | +10, −0, added set = `C₊₁(10)` exactly |
| C14 | AP saturation, three-distinct scope | **PASS modulo the empty signature** (§2.2) | 0 failures over 252 cases once `0` excluded |
| C14b | `h=1` shape count `L−3` | **PASS** | `L=5..60`; 37 at `L=40` |

`|C₀|=361`, `|C₊₁|=|C₋₁|=190` at `L=40`, as claimed.

### 2.2 Counterexample hunt beyond the tested ranges

The package tested `L=4..12`, 2–7 blocks. I extended to:

- **382 randomized masks**, `L ≤ 25`, `N ≤ 10`, deterministic seed — **no counterexamples**
  to either the compiler identity or `T₃ = ⋃C_δ`;
- **count formulas to `L=512`** — all match.

**Two apparent failures were found, and both isolate to one object: the empty signature.**

`C_δ(L)` is defined in §3 as the set of **nonzero** signatures. But a window
whose three cutpoints hit three *distinct* X copies at the *same local depth*
has `1−2+1 = 0`: its free-variable support is **identically empty**. Such a
window is in `T₃` under §3's own description (“three distinct X copies”) but
cannot be in `⋃C_δ`.

Measured exactly:

| statement | with empty signature | excluding empty signature |
|---|---:|---:|
| `T₃(B,L) = ⋃_{δ∈Curv(B)} C_δ(L)` | 567 / 1134 fail | **0 / 1134 fail** |
| AP saturation `T₃ = C₀(L)` | 112 / 112 fail | **0 / 252 fail** |

Realizability is fully characterized: over 148 masks carrying such a window,
**every one contains a three-term macro AP** — as it must, since equal local
depths force `δ=0`.

**This is not a false theorem.** The supplied Python encodes the correct,
tightened statement (`triple_actual` filters `... and sig`, silently dropping
the zero signature). The **prose in §3 and §7 does not state that restriction.**
Verdict: **TRUE BUT CONDITIONS NEED TIGHTENING.**

The excluded object is *not* negligible: a window with empty support is a
constraint with no free variables — it is satisfied or violated by the
assigned data alone. That is exactly the `deadFAF` / `deadAFE` condition
Report 8 relies on. Dropping it from the classification is legitimate only if
it is stated and handled separately.

### 2.3 The `K ≥ 1` vs `K ≥ 2` convention — a real inconsistency

The package uses `kmin=2` **everywhere except** the §0/§8 headline experiment,
where `direct_support(mask,L,1)` is called with `kmin=1`. Reproduced exactly:

| convention | base `{0,2}` | irregular `{0,2,5}` | added | lost | added = `C₊₁(10)` |
|---|---:|---:|---:|---:|---|
| `K ≥ 1` (as published) | **141** | **151** | 10 | 0 | yes |
| `K ≥ 2` (Paper 4's own gate) | 134 | 144 | 10 | 0 | yes |

The **conclusion is convention-robust** (+10, equal to `C₊₁(10)`, 0 lost). The
**published counts 141 → 151 are not**: under Paper 4's own half-period-≥2
convention they are 134 → 144. Since Mäkelä's Question 2 concerns half-period
≥ 2, `K = 1` windows are outside Paper 4's problem. Flagged as an internal
inconsistency to fix in exposition.

Separately verified (probe P4): both the FAF and AFE support sets **saturate
by `K = 40`** at `L = 40`, so the Report-8 gate caps (`K ≤ 60` FAF, `K ≤ 40`
AFE) do not truncate either skeleton. The 400-excess is identical under
`K ≤ 40` and `K ≤ 60`.

---

## 3. Task 3 — proof audit, line by line

| § | claim | classification | note |
|---|---|---|---|
| 1 | arbitrary-mask cutpoint motif compiler; ≤ 3 X incidences | **PROVED FROM DEFINITIONS** | immediate from `(1,−2,1)` and `1_{i≠0}`. See 3.1 on the evidence claim. |
| 2 | `L·δ + (i₀−2i₁+i₂) = 0`, `δ ∈ {−1,0,+1}` | **PROVED FROM DEFINITIONS** | `i₀−2i₁+i₂ ∈ [−2(L−1), 2(L−1)]` ⟹ `|δ| < 2`. Correct. |
| 3 | `T₃(B,L) = ⋃_{δ∈Curv(B)} C_δ(L)` | **TRUE BUT CONDITIONS NEED TIGHTENING** | must restrict `T₃` to nonzero signatures (§2.2) |
| 4 | `|C₀| = ⌊(L−2)²/4⌋`, `|C_{±1}| = C(⌊L/2⌋,2)` | **PROVED FROM DEFINITIONS** | verified to `L=512`. Counts **reduced signatures**, and this matters (3.2). |
| 4 | pairwise disjointness | **PROVED FROM DEFINITIONS** | the `−2` coefficient identifies `i₁` uniquely; 2-term reductions differ in sign order |
| 5 | even-gap routing | **TRUE BUT CONDITIONS NEED TIGHTENING** | fails to state the `i=j` degenerate case (3.3) |
| 5 | odd-gap low/boundary/high routing | **PROVED FROM DEFINITIONS** | `i+j=L` handled correctly (3.4) |
| 5 | `C(n,2)+n+C(n,2) = n²` split | **PROVED FROM DEFINITIONS** | verified `L=4..60` |
| 6 | FAF excess = `⌊L²/4⌋` = 400 at `L=40` | **PROVED FROM DEFINITIONS**, independently confirmed | matches Report 8 exactly |
| 7 | AP saturation `T₃ = C₀(L)` | **TRUE BUT CONDITIONS NEED TIGHTENING** | same empty-signature restriction; also see 3.5 on the `K` range |
| 8 | irregular spacing adds `C₊₁` | **COMPUTATIONALLY VERIFIED**, conclusion robust | published counts use `K≥1` (§2.3) |
| 12 | “arbitrary repetition saturation FALSIFIED” | **CORRECT** | independently reproduced |

### 3.1 “at most three X incidences” — not confused, but under-evidenced

The §1 statement is correct and is **not** conflated with “at most three X
copies in the mask”: incidences are cutpoints, and §3 separately handles three
*distinct* copies. Two riders:

- after cancellation the count can be **zero**, not just “at most three”
  (§2.2). §1's “at most” is literally true but the degenerate case is never
  named.
- §1 claims an “independently coded macro/local compiler agrees with direct
  `(s,K)` enumeration”. Reading `motif_support` in the supplied Python, it
  enumerates `b₀,i₀,b₁,i₁` and derives `t₂` — a **reparametrization of the same
  window scan**, sharing the same decomposition, not an independent derivation.
  My R2 compiler *is* independent (block triples + solving the curvature law
  for `i₂`) and also agrees, over 886 + 382 masks. **The claim survives; the
  package's own evidence for it was weaker than stated.**

### 3.2 Count formulas count *reduced* signatures — and this is load-bearing

For even `L`, `C_{±1}` contains degenerate members with `i₀ = i₂`, giving
two-term forms `2x_i − 2x_{i±L/2}`. These are counted. At `L=10`, 4 of the 10
members of `C₊₁(10)` are of this shape. The formula `C(⌊L/2⌋,2)` is correct
**for reduced signatures**; a raw-triple count would differ. §4 does not say
which is meant. Minor exposition gap; no mathematical error.

### 3.3 §5 even-gap, `i = j` — genuine exposition defect

§5 states: “If `m` is X: support is `x_i − 2x_r + x_j ∈ C₀(L)`.” When `i = j`
we get `r = i` and the support is `x_i − 2x_i + x_i = 0`, the **zero
signature**, which is **not** in `C₀(L)` by §3's own definition. Measured:
**924 such configurations** in the C10 sweep. Same root cause as §2.2.
The assigned-centre branch is unaffected (`i=j` correctly gives `2x_i ∈ M_L`).

### 3.4 Odd-gap `i+j = L` — handled correctly

`t₁ = m_ℓL + (L+i+j)/2`. At `i+j = L` this is `(m_ℓ+1)L`, i.e. offset 0 in the
next block, so the middle free prefix vanishes and the support is `x_i + x_j`
irrespective of that block's role. Verified: 3,692 configurations, 0 failures.
No hidden exception.

### 3.5 Curvature argument at `i = 0` — no change

The half-open convention `t = bL + i, 0 ≤ i < L` makes `i = 0` an ordinary
value; the indicator `1_{i≠0}` removes the term. The only cut that can reach
block `N` is `t = NL`, which has `i = 0` and is removed by the same indicator
— so **no separate endpoint rule is needed**, and `χ(N)` never has to be
defined. Verified: 2,305 such cuts, 0 violations. The package's Python uses an
explicit `t==N` branch instead; both agree.

### 3.6 Does any support-family equality depend silently on `K ≥ 1` vs `K ≥ 2`?

**Yes — in exactly one place, and it is the headline count** (§2.3). Two further
findings:

- In §3's realizability construction the required half-period is
  `K = (b₁−b₀)L + i₁ − i₀ ≥ L − (L−2) = 2`. The `K ≥ 2` convention is therefore
  **exactly tight** — the classification would be unchanged at `K ≥ 1` but has
  no margin.
- AP saturation (§7) sets `K = gL + (i₁−i₀)` with `g ≥ d ≥ 2`, so `K ≥ L+2`.
  **Under a capped gate (`K ≤ L`, as in the AFE stage) the AP-saturation
  windows do not exist at all.** §7 is stated in an uncapped ambient and is
  correct there; it must not be transported into a capped gate unexamined.

---

## 4. Task 4 — minimal motif basis: **FALSE**, with a constructive repair

Files: `work/motif_basis.js`, `work/motif_repair.js`, `work/motif_diag.js`,
`work/motif_finite.js`. Results: `motif_basis_results.json`,
`motif_repair_results.json`, `motif_diag_results.json`, `motif_finite_results.json`.

### 4.A Completeness — refuted

Each of the three named families was given its **full closed-form content with
ambient restrictions relaxed** (the most generous reading). Any direct window
signature outside that generous union is a counterexample no tightening can repair.

**2,448 of 2,952 masks contain signatures outside the union.**

**Frozen minimal counterexample** (minimal in `L`, in block count, and in `|B|`):

```
L = 3,  N = 2 blocks,  B = {0, 1}   (two ADJACENT X copies)
s = 0,  K = 2
cuts:  q=0 -> t=0, b=0, i=0   (dropped, x_0 = 0)
       q=1 -> t=2, b=0, i=2   (coefficient -2)
       q=2 -> t=4, b=1, i=1   (coefficient +1)
signature:  1*x1 + -2*x2
in one-copy family:      NO   (cuts lie in different blocks, and the +1 depth
                               is SMALLER than the -2 depth, impossible within
                               one copy where t increases)
in outer-pair family:    NO   (section 5 assumes gap d >= 2; here d = 1, and the
                               contributing cuts are {q1,q2}, not the outer pair)
in curvature family:     NO   (Curv(B) is empty: |B| = 2 < 3)
```

Frozen to `motif_basis_results.json → A3_frozen_counterexample`.

**Two independent root causes:**

- **R1 — gap-1 pairs.** §5's midpoint routing assumes `d ≥ 2`. For adjacent X
  copies the “central block” *is* one of the two copies. Measured on `L=8,
  B={0,1}`: 4 bridge-shaped signatures (`1*x1+1*x7`, `2*x4`, …) exist although
  the mask contains **no** pair of gap ≥ 2.
- **R2 — wrong curvature index set.** `Curv(B)` ranges over triples of
  *distinct* X positions. But three cutpoints can hit **two** copies (two in
  one, one in another) and still produce a curvature-family signature. On
  `L=8, B={0,1}`: `Curv(B) = ∅` while the curvatures **actually realized** are
  `{−1, 0, +1}`.

### 4.B Redundancy

At `L=10`: `|oneCopy| = 83`, `|C₀| = 16`, `|C₊₁| = |C₋₁| = 10`, `|M_L| = 25`.

- `oneCopy ∩ C₀ = 9` — the one-copy three-cut motifs are a **proper subset** of
  `C₀` (same `δ=0` law, but additionally `K`-bounded by the block length). This
  is the only real overlap.
- `oneCopy ∩ C_{±1} = 0`, `oneCopy ∩ M_L = 0`, `M_L ∩ C_δ = 0` for all `δ`.

So the families are nearly disjoint; the redundancy is one-directional and partial.

### 4.C Minimality — each class is necessary

| removed class | witness mask | skeleton | signatures lost |
|---|---|---:|---:|
| one-copy | `L=8, N=4, B={0}` | 29 | **28** |
| outer-pair | `L=8, N=4, B={0,2}` | 58 | **17** |
| curvature (`δ=0`, AP mask) | `L=8, N=6, B={0,2,4}` | 64 | **2** |
| curvature (`δ=+1`, irregular) | `L=8, N=6, B={0,2,5}` | 90 | **19** |

Every class carries signatures no other class produces, so **no class is
redundant** — the basis is incomplete, not over-complete.

### 4.D Canonical catalogue — exactly 13 reduced shapes

Over `L=4..11`, `N=2..6`, all masks, the complete list of reduced coefficient
shapes is (with the minimal number of distinct X copies that realizes each):

| shape | example | copies | cuts | windows |
|---|---|---:|---|---:|
| `EMPTY` | `` | 0 | — | 88,080 |
| `1` | `1*x2` | 1 | q0 | 93,252 |
| `-2` | `-2*x2` | 1 | q1 | 38,360 |
| `1,-2` | `1*x1+-2*x3` | 1 | q0,q1 | 38,114 |
| `-2,1` | `-2*x1+1*x3` | 1 | q1,q2 | 38,114 |
| `1,1` | `1*x1+1*x3` | 2 | q0,q2 | 23,892 |
| `1,-2,1` | `1*x1+-2*x2+1*x3` | 3 | q0,q1,q2 | 20,540 |
| `1,1,-2` | `1*x1+1*x2+-2*x4` | **2** | q0,q1,q2 | 10,260 |
| `-2,1,1` | `-2*x1+1*x3+1*x4` | **2** | q0,q1,q2 | 10,260 |
| `-1` | `-1*x1` | **2** | q0,q1 | 7,176 |
| `2` | `2*x2` | 2 | q0,q2 | 5,280 |
| `2,-2` | `2*x1+-2*x3` | 2 | q0,q1,q2 | 1,710 |
| `-2,2` | `-2*x1+2*x3` | 2 | q0,q1,q2 | 1,710 |

**Nine of these thirteen escape the candidate basis on some mask**:
`2,-2`, `2`, `-2,2`, `1,-2`, `1,1`, `-2,1`, `-1`, `1,1,-2`, `-2,1,1`.
The shapes with `copies = 2` but three contributing cuts (`1,1,-2`, `-2,1,1`)
are exactly root cause R2; `-1` is the cross-copy equal-depth cancellation.

### 4.E Closed compiler — **YES**, and the catalogue is finite

A closed compiler exists and is exact: R2 (`compileScan`) reproduces the direct
skeleton on every mask tested (886 systematic + 382 randomized, 0 mismatches),
using only block triples and the curvature law — no `(s,K)` enumeration.

Pushing further, the repaired canonical basis is

```
tau = ( g1 , delta , chi(b0), chi(b1), chi(b2) ),
      g1 = b1 - b0 >= 0,  delta = g2 - g1 in {-1,0,+1},  chi = X-membership
```

with `F(tau, L)` depending only on `tau` and `L`. Measured behaviour:

| variant | undercount | overcount |
|---|---:|---:|
| gap class capped at 2 (my first attempt — **wrong**, breaks `δ = g₂−g₁`) | 69 / 1071 | 158 / 1071 |
| **raw gaps** | **0 / 1071** | 158 / 1071 |
| raw gaps, right-padding ≥ 4 blocks | **0 / 448** | **0 / 448** |

The overcount is **entirely right-edge truncation** (`t₂ ≤ NL`): it decays
101 → 32 → 16 → 8 → 0 as padding goes 0 → 4 and stays 0 at padding 6.
**Paper 4's actual object is an infinite word, where truncation never applies.**

And the catalogue is genuinely finite: `F(tau,L)` is **constant for `g₁ ≥ 2`**
(verified for `L ∈ {3..12,15,20,40}`, `g₁ = 3..8` against `g₁ = 2`, 0 failures).
So the type space collapses to

```
g1 in {0, 1, >=2}  x  delta in {-1,0,+1}  x  chi in {0,1}^3   =  64 slots
```

which realize **29 distinct signature families — the same 29 at `L = 8`, `L = 10`
and `L = 40`.** The catalogue size is independent of `L`.

**Candidate statement (NOT promoted, needs its own literature pass):**

> For a uniform block system of block length `L` with one unresolved role `X`
> at macro positions `B`, embedded with at least four blocks of right padding
> (in particular, in an infinite word), the reduced `X`-support skeleton is
> exactly `⋃_{τ realizable} F(τ,L)`, where `τ = (g₁, δ, χ(b₀), χ(b₁), χ(b₂))`,
> `F` depends only on `τ` and `L`, and `F` is constant in `g₁` for `g₁ ≥ 2`, so
> the catalogue has at most 64 type slots realizing 29 distinct families.

This **replaces** the three ad-hoc families with one indexed catalogue and
repairs both R1 and R2 by construction. Status: **computationally verified over
1,309 masks; not proved; not promoted.**

---

## 5. Task 5 — relation to classical template theory

Sources used: the supplied deep-research report and novelty audit. I did **not**
re-run web searches; twice in this project WebSearch/WebFetch summaries were
factually wrong and had to be corrected against extracted primary text, and no
primary PDF for these specific claims is open in the sandbox. Every label below
is therefore **at most** as strong as the supplied audit permits.

| new v0.2 candidate | label | reasoning |
|---|---|---|
| ≤ 3 X incidences per constraint | **KNOWN** | immediate corollary of the `(+1,−2,+1)` prefix-Parikh second difference, which the audit places squarely in Carpi 1993 |
| curvature `δ ∈ {−1,0,+1}` | **NEEDS SPECIALIST CHECK — high collision risk** | the modern restatement of Carpi 1993 Prop. 1 (C3) already carries a second difference *with an integer parameter `δⱼ ∈ {0,1}`*. That is close enough in form that `δ` may be Carpi's parameter in a different normalization. **This must be checked before any promotion.** |
| `T₃ = ⋃C_δ` exact classification | **POSSIBLY NEW** | prior art gives the raw affine equation; the exact support-set classification is the added combinatorial geometry (question 3 of the task: **yes**, this is the gap prior art leaves) |
| closed counts `⌊(L−2)²/4⌋`, `C(⌊L/2⌋,2)` | **POSSIBLY NEW, weak** | routine lattice-point counts once the objects are defined; novelty lives in the objects, not the counting |
| midpoint routing (general gap) | **POSSIBLY NEW** | strict generalization of the FAF/AFE midpoint-excess theorem, which the deep report already rates POSSIBLY NEW after failing to locate an analogue |
| FAF as even-gap/assigned-centre branch | **POSSIBLY NEW** | inherits the status of the theorem it specializes |
| **AP saturation `T₃ = C₀`** | **NEEDS SPECIALIST CHECK — highest collision risk** | Eyidoğan–Göral–Tanısalı 2026 make *arithmetic progressions in prefix data* central to both their sufficient conditions and their sieve. §7 is exactly a statement about three-term APs in prefix depths. Terminology collision is near-certain; mathematical collision is unresolved. |
| repaired 29-family type catalogue (§4.E, mine) | **NOVELTY UNASSESSED** | new object, produced today, not yet searched |

**Narrowest defensible novelty claim after this audit** — narrower than v0.2 §11:

> Not the second-difference algebra, not boundary corrections, not sieving, and
> not arithmetic progressions in prefix data. At most: the *exact classification
> of the reduced support skeleton of a staged uniform block system as a function
> of the occurrence mask alone*, together with the finite motif catalogue that
> compiles it.

Project status stays **`NOVELTY_UNRESOLVED`**.

---

## 6. Strict summary

### A. Which geometry claims survived?

All of them, mathematically. Independently reproduced with three routes over
886 systematic masks, 382 randomized masks (`L ≤ 25`, `N ≤ 10`), count formulas
to `L = 512`, and 6,248 + 3,692 routing configurations: **zero counterexamples
to any theorem.** §1, §2, §4 (counts and disjointness), §5 odd-gap, §6, and the
§8 falsification are clean.

### B. Which failed or needed tightening?

Nothing failed. Four items need tightening, all documented above with exact
measurements:

1. **§3 and §7** must restrict `T₃` to **nonzero** signatures — 567/1134 and
   112/112 apparent failures collapse to 0/1134 and 0/252 once the empty
   signature is excluded. The supplied verifier already encodes the restriction;
   the prose does not.
2. **§5 even-gap** mis-states the `i = j` case (924 configurations): the support
   is the zero signature, not a member of `C₀(L)`.
3. **§0/§8 counts 141 → 151 use `K ≥ 1`** while every other check uses `K ≥ 2`.
   Under Paper 4's own half-period-≥2 convention the counts are **134 → 144**.
   The conclusion (+10 = `C₊₁(10)`, 0 lost) is convention-robust.
4. **§1's evidence claim** overstates: the package's “independent compiler” is a
   reparametrization of the same scan. An actually independent compiler agrees.

Theorem promotion is **not** blocked by any of these — but none is promoted here.

### C. Is the minimal motif basis theorem true, false, or unresolved?

**FALSE**, decisively, with a frozen minimal counterexample at
`L = 3`, `N = 2`, `B = {0,1}`, `s = 0`, `K = 2`, signature `1*x1 + -2*x2`
— outside all three families under the most generous reading. Two independent
root causes (gap-1 pairs; `Curv(B)` indexed over distinct triples only).
**A constructive repair is verified computationally** (§4.E): a finite catalogue
of 64 type slots realizing 29 `L`-independent families, exact under right-padding.

### D. What exact novelty remains plausible after literature attack?

Only the **exact occurrence-mask support classification** and its finite motif
catalogue. Two specific high-risk collisions must be cleared first by specialist
reading: the curvature parameter `δ` against **Carpi 1993 Prop. 1 (C3)**, and AP
saturation against **Eyidoğan–Göral–Tanısalı 2026**. `NOVELTY_UNRESOLVED`.

### E. What did we learn about H/R target-value selectivity?

Reported separately in **Report 10**. Headline: the geometry package's §10
prediction is confirmed at population scale (support skeleton is structurally
fixed — now verified on all 437 pairs, not 10), and the leading target-value
hypothesis it motivated was **preregistered and refuted**.

### F. What should be promoted later into `MATH_CLAIMS`?

Nothing today. Candidates, in descending confidence, each conditional on the
stated blocker:

1. Curvature law `δ ∈ {−1,0,+1}` — blocker: Carpi C3 comparison.
2. `T₃ = ⋃C_δ` **with the nonzero restriction stated** — blocker: none mathematical; needs the tightened statement.
3. Closed counts and disjointness — blocker: none mathematical.
4. Midpoint-routing theorem **with the `i=j` case stated** — blocker: none mathematical.
5. FAF `⌊L²/4⌋` = 400 as the even-gap/assigned-centre branch — already independently confirmed twice (Report 8, here).
6. The repaired 29-family catalogue — blocker: not proved, and unsearched.

### G. What must NOT yet be promoted?

- Any novelty claim whatsoever — `NOVELTY_UNRESOLVED` stands.
- AP saturation, until the 2026 sieve paper is read line by line.
- The curvature law as *new*, until Carpi 1993 Prop. 1 is read line by line.
- The minimal motif basis as stated in v0.2 §12 — it is **false**.
- The repaired catalogue — computationally verified only.
- Any statement about Mäkelä, about `L = 40` impossibility, or about the
  §0/§8 support counts under the `K ≥ 1` convention.

---

## 7. Files produced

| file | role |
|---|---|
| `work/geom_core.js` | clean-room direct scan + closed compiler + families |
| `work/geom_audit.js` | Task-2 checks C1–C14b |
| `work/geom_probe.js` | isolation + counterexample hunt beyond tested ranges |
| `work/motif_basis.js` | Task-4 A–D, falsification |
| `work/motif_repair.js` | repaired canonical basis |
| `work/motif_diag.js` | over/under diagnosis, padding sweep |
| `work/motif_finite.js` | `g₁`-stabilisation, catalogue size |
| `geom_audit_results.json`, `geom_probe_results.json` | check results |
| `motif_basis_results.json` | includes `A3_frozen_counterexample` |
| `motif_repair_results.json`, `motif_diag_results.json`, `motif_finite_results.json` | repair evidence |

All under `_paper4-next-version-sandbox/`. Nothing canonical was touched; no
supplied package was modified; Git was not mutated.
