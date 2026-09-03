# Paper 4 — sandbox report #4: independent audit of the boundary-projection packages

**Date:** 2026-08-28
**Scope:** sandbox only. No canonical Paper-4 file, manuscript, evidence artifact, branch or commit touched.
**Mäkelä:** OPEN. **Complete-AEF at L=40:** UNRESOLVED. **L=40 impossibility:** NOT ESTABLISHED.
**Novelty:** NOVELTY_UNRESOLVED / NOT_ESTABLISHED.

---

## 1. Reconstructed and frozen input state

`FROZEN_RECORD_2026-08-28.sha256`: **54 of 54 artifacts verify, 0 problems.** All prior
finite state re-confirmed from disk:

| Item | Verified value |
|---|---|
| Canonical K≤40-clean AEF triples | 39 |
| Their first-bad-K | `{41:4, 42:26, 44:5, 45:4}` — all fail **by K = 45** |
| Nearby canonical-E basins | 24 triples, 20 new, extinct at **K = 47** |
| `P40(E)` over the 9 historical E | **true for all 9**; 59 triples total; all 39 canonical rediscovered |
| 60 random non-canonical E | exhaustive over full A **and** full F classes, no caps, **261,910** A completions, **0** K≤40-clean triples |
| Radius-1 shell | **4,670** profile-preserving words → **35** after the sound internal-E filter |
| Shell outcome | **6** `P40`-true (all historical E), **29** non-historical `P40`-false |
| Complete-AEF K≤100 hit | **none** |
| Long-band witness concentration | 63/63 in `eafea`, regime `eaf`, `q=(0,1,2)` |

### 1.1 Wording correction carried forward

The safe finite statement is used throughout:

> **Every NON-HISTORICAL E word in the exact tested radius-1 shell is `P40`-false.**

*Not* "one transposition always destroys productivity" — 6 historical E words are
themselves transpositions of other historical E words and are `P40`-**true**, so that
stronger phrasing is false. Verified from `shell_r1_filtered.json` + `per_e.jsonl`.

`P40(E) := ∃ profile-correct A,F satisfying the required K≤40 AEF constraints together
with the complete-AF prerequisite.` Productivity is **not** treated as an intrinsic
E-only property.

---

## 2. New packages — hashes and unchanged replay

| Package | File | Manifest hash |
|---|---|---|
| v0.1 | `verify_eaf_boundary_projection.py` | **MATCH** |
| v0.1 | `boundary_regimes_L40.json` | **MATCH** |
| v0.1 | `PAPER4_EAF_BOUNDARY_PROJECTION_AUDIT_v0.1_2026-08-28.md` | **MATCH** |
| v0.1 | `README(4).md` | **MATCH** |
| v0.2 | `verify_full_eafea_longband_projection.py` | **MATCH** |
| v0.2 | `PAPER4_FULL_EAFEA_PROJECTION_AUDIT_v0.2_2026-08-28.md` | **MATCH** |
| v0.2 | `PAPER4_LITERATURE_POSITIONING_BOUNDARY_SIEVE_v0.1_2026-08-28.md` | **MATCH** |
| v0.2 | `README(5).md` | **MATCH** |
| v0.2 | `synthetic_projection_probe.json` | **ABSENT — declared in the manifest, not delivered** |

**No hash failed.** One declared artifact was not delivered. The audit's §6 synthetic
price-probe numbers are quoted inline but **cannot be independently verified**; they are
labelled exploratory-only by the package itself and are not used anywhere below.

Self-tests run **unchanged**, both PASS:

```
v0.1  seed 20260828  trials 40  symbolic_direct_comparisons 288000  genuine 3476  PASS
v0.2  seed 20260828  trials 60  comparisons 216000               genuine 2563  PASS
```

### 2.1 Provenance mismatch in the v0.2 audit

The v0.2 audit §4 quotes its exactness regression as
`{"trials": 80, "comparisons": 288000, "genuine_squares_seen": 3369}`.
The **delivered script** has `def selftest(seed=20260828, trials=60)` and produces
`{"trials": 60, "comparisons": 216000, "genuine_squares_seen": 2563}`.

Both are PASS and the mathematical conclusion is unaffected, but **the document's quoted
regression block was not produced by the delivered script.** Recorded, not repaired.

---

## 3. Independent proof audit — single-occurrence role projection

Re-derived from `P(s+2K) − 2P(s+K) + P(s) = 0` in my own notation
(`cleanroom_eafea_projection.js`), sharing no code with the supplied verifier.

**Setup.** `P(p) = S(q) + p_{v[q]}(t)` for `p = Lq + t`. The second difference is
`Σᵢ cᵢ·P(cutᵢ)` with `c = (+1, −2, +1)`. Each `S(q)` is a sum of *fixed role profiles* —
so it is X-order-independent, including any complete `H(X)` blocks crossed. X-order
dependence enters **only** through terms with `v[qᵢ] = X`.

**Key step.** Consecutive cut points differ by `K`. `H(X)` occupies one interval of
exactly `L` positions. If `K > L`, two cut points differing by `K ≥ L+1` cannot both lie
in an interval of length `L`. Hence at most one cut point lies in `H(X)`.

**Verified, not assumed:** over all 3,600 `eafea` long-band windows, the count of windows
with ≥2 cut points inside the unique F block is **0** (820 have none, 2,780 have exactly
one).

**Consequently** each window is either X-order-independent (`kind ∈ {UNAVOIDABLE,
INACTIVE}`) or reduces to `c·p_X(j) + C = 0` with `c ∈ {+1, −2}`, i.e. forbids one prefix
state `p_X(j) = −C/c`.

**Hidden assumptions I checked and which are genuinely required:**

1. **Exactly one occurrence of X in the cover** — with two occurrences the argument fails
   (see §7, `fafea` has 1,600 two-prefix windows).
2. **Uniform block length L** — the interval-length argument needs `|H(X)| = L`.
3. **`K > L` strictly** — at `K = L` two cuts can share a block.
4. **Fixed total profile `m(X)`** — otherwise `S(q)` is not a constant.
5. **Finite cover** — needed for the window set to be finite.
6. **Integrality**, which the informal statement omits: for `c = −2` the target `−C/2`
   must be integral *componentwise*, else the window is **vacuous**, not forbidding.
7. **Feasibility**: the target must satisfy `0 ≤ target ≤ m(X)` componentwise **and**
   `Σ target = j`, else again vacuous.
8. **Boundary convention**: a cut exactly on a block boundary yields `p_X(0) = 0`, which
   is order-independent — handled, not a special case.

Points 6–8 are load-bearing: without them the compilation over-forbids. With them the
lemma is correct as stated. **Status: DERIVED / EXACT. No novelty claimed.**

Independent window count: **3,600** for `eafea`, `K = 41..100`. Closed form
`Σ_{j=1..60}(121 − 2j) = 7260 − 3660 = 3600`. ✅ matches the package.

---

## 4. Clean-room direct-vs-projected validation

`cleanroom_equiv_test.js` compares **direct substring Parikh equality** (ground truth)
against **my own** compiled projection — never against the supplied code:

```
trials 80   windows/trial 3600   comparisons 288,000
agree 288,000   disagree 0   genuine Abelian squares seen 3,046
window kinds exercised: UNAVOIDABLE 263, INACTIVE 227,729, FORBID 60,008
```

All three branches exercised, so the test is non-vacuous in every case.

**Constructive exactness** (`dp_constructive_check.js`) — the stronger property:

```
sampled (E,A) pairs 60
DP-survives -> F extracted from the DAG: 32; all 32 verified DIRECTLY free of K=41..100 squares
order-independent unavoidable cases: 28; all 28 confirmed square-bearing for random F
construction failures: 0
```

**Mandatory soundness control on the real triples** (`dp_controls.js`): for all 63 known
K≤40-clean triples, "the actual F hits a DP-forbidden state" ⟺ "H(eafea) really contains a
K=41..100 square". **39/39 and 24/24 agree, 0 disagreements.**

*(A K≤40-clean triple is **not** a long-band positive control — every one of the 63 has a
long-band square. The correct control is the equivalence above, which is what was tested.)*

**Verdict: the projection is independently established.**

---

## 5. Application to the real persisted populations

E populations reproduced deterministically (same seed and generator as the original
exhaustive runs — the A words themselves were never persisted, only counts); A populations
re-enumerated exhaustively.

| Population | E | (E,A) pairs | DP-empty | fraction killed |
|---|---:|---:|---:|---:|
| **H** — 9 historical E | 9 | 111,613 | 18,999 | **17.02 %** |
| **R** — 60 random non-canonical E | 60 | 261,910 | 42,609 | **16.27 %** |

## 6. Confusion table against the exhaustive F results

| | actual complete-AEF F exists | actual: none |
|---|---|---|
| **DP empty** | **0** ← required, and observed 0 | 42,609 (R) + 18,999 (H) |
| **DP non-empty** | 0 | 219,301 (R) + 92,614 (H) |

The critical cell **DP-empty / actual-F-exists is 0**, as required for soundness. It is
also 0 *a priori* in the strong sense: no complete-AEF triple exists anywhere in the
persisted record, so the cell is empty by construction — the substantive soundness
evidence is §4's constructive check and the 63/63 control, not this table.

---

## 7. How much of the F bottleneck does the projection explain?

| | Population H | Population R |
|---|---:|---:|
| **A.** killed by F-order-independent obstruction | **17.00 %** | **16.17 %** |
| **B.** additionally killed by the forbidden-prefix DAG going empty | **0.027 %** | **0.097 %** |
| **C.** survives the eafea DP, dies in the actual F search | **82.98 %** | **83.73 %** |

Per-E killed fraction: H `min 6.3 % / median 18.7 % / max 99.5 %`;
R `min 0.0 % / median 50.0 % / max 100.0 %`.

### Two findings, both deflationary — stated plainly

**(i) The projection does NOT explain the historical-vs-random selectivity.** The kill
rates differ by **0.75 percentage points** (17.02 % vs 16.27 %). The observed contrast is
absolute — 59 K≤40-clean triples from historical E, **0** from 60 random E across 261,910
A words — and the eafea long band is essentially blind to it. For population R, **219,301
(E,A) pairs survive the DP and every one of them still has zero K≤40-clean F.**

> **This falsifies the hypothesis that the eafea long-band projection is the principal
> source of F selectivity.** The task noted either outcome would be useful; this is the
> negative one.

**(ii) Almost all the DP's pruning is the trivial case.** The elegant forbidden-prefix
DAG adds only **0.03–0.10 %** beyond the F-order-independent check, which is a three-line
test requiring no DAG at all. The DAG machinery is mathematically exact and
constructive — but on this data it is not where the pruning comes from.

---

## 8. 380-subfamily vs the full 3,600-window system

Population H, 111,613 (E,A) pairs:

| | killed |
|---|---:|
| 380-equation no-carry `EAF` subfamily (`q=(0,1,2)`, K=41..59) | 2,254 (2.02 %) |
| Full 3,600-window `eafea` long band | 18,999 (17.02 %) |
| Killed **only** by the full system | 16,745 (**15.00 %**) |
| Killed only by the 380 subfamily | **0** ← correct: the subfamily is a subset |

The full band is **~8.4× stronger**. **The beautiful `EAF` identity is a witness
explanation, not the computational pruning power** — it accounts for one eighth of the
long-band kills.

---

## 9. `fafea` constraint anatomy

`fafea = F A F E A` has F at blocks 0 **and** 2. Exact counts over the same 3,600 windows:

| cut points inside an F block | `eafea` | `fafea` |
|---|---:|---:|
| 0 (order-independent) | 820 | 420 |
| 1 (unary prefix constraint) | 2,780 | 1,580 |
| **2 (binary constraint)** | **0** | **1,600** |
| 3 | 0 | 0 |

- distinct unary shapes: **78**
- distinct binary shapes `c₁·p_F(i) + c₂·p_F(j) = C`: **1,600**
- distinct depth pairs `(i,j)`: **1,410**
- coefficient patterns: `(1,1)` ×380, `(1,−2)` ×1,220
- both cuts in the *same* F block: **0** (as the K>L argument requires)
- depth gap `|i−j|`: min 0, median 10, **max 39**; up to **40** distinct earlier depths
  referenced from a single later depth

**Consequence:** the 2,640-state DAG does **not** extend to `fafea`. A fixed-lookback
sliding window is also insufficient — the gaps span the entire word. The exact object is a
**CSP over the 41 prefix-Parikh variables**, or a DAG augmented with the referenced
earlier states (worst case 40 remembered states, i.e. the full path). The v0.2 audit's §7
caution against assuming the DAG extends is **correct and confirmed**.

No `fafea` solver was built; per instruction, structure was counted first.

---

## 10. Literature positioning

The supplied memo was read as a lead list only. Given §7, the practical case for this
projection as a *search accelerator* is weak on the present data, which lowers the stakes
of the novelty question considerably.

Explicitly **not** claimed novel: Parikh equality; boundary prefix/suffix correction;
template parents/ancestors; early template sieving; generic finite-state or DP methods on
Parikh counts; automata for morphic/automatic-word statistics.

The narrow candidate remains: *staged partial-role projection over an actual finite macro
cover, specifically the single-occurrence-role theorem yielding an exact prefix-Parikh
reachability pre-certifier before the role word is enumerated.* I did not conduct a fresh
external search this phase. **NOVELTY_UNRESOLVED.** Not finding a source is not evidence
of novelty.

---

## 11. Theorem candidates with epistemic labels

| Statement | Label |
|---|---|
| Single-occurrence role projection lemma (with the integrality/feasibility/boundary conditions of §3 made explicit) | **DERIVED / EXACT**, independently re-derived and verified |
| `eafea` K=41..100 compiles to exactly 3,600 windows; ≤1 F cut per window; 2,640-state prefix universe | **ESTABLISHED, exact** |
| DP is constructive: "survives" yields a real F verified free of K=41..100 `eafea` squares | **ESTABLISHED** |
| The projection explains the historical-vs-random E selectivity | **REFUTED** — 17.02 % vs 16.27 % |
| The forbidden-prefix DAG is a strong practical pruner | **REFUTED on this data** — adds 0.03–0.10 % over the trivial check |
| The 380-equation `EAF` identity carries most of the pruning | **REFUTED** — 2.0 % of 17.0 % |
| `fafea` requires a strictly richer formulation than the `eafea` DAG | **ESTABLISHED, exact** (1,600 binary windows) |
| Complete-AEF existence at L=40 | **UNRESOLVED** |
| L=40 impossibility | **NOT ESTABLISHED** |

---

## 12. Exact next recommended experiment

The projection is correct but is not the selectivity mechanism, so building the much more
expensive `fafea` CSP to chase the same effect is not justified yet.

**Recommended:** the discriminator must lie in the **K ≤ 40** gate, not the long band —
that is where historical and random E differ absolutely (59 vs 0). The analogous exact
compilation for `K ≤ 40` has never been done: for `K ≤ 40` a window can contain **two or
three** cut points in one block, so the single-occurrence lemma does not apply, but the
same second-difference decomposition still yields exact finite constraints. Compiling the
K≤40 `eafea` + `fafea` system for fixed `(E,A)` and measuring its kill rate on populations
H and R is the direct test of where the selectivity actually lives — and it reuses all the
machinery validated here.

Concretely: if that compilation separates H from R the way the long band failed to, the
mechanism is identified; if it does not, then selectivity is not a per-`(E,A)` boundary
phenomenon at all and the search variable must change again.

Raw data and logs remain under `runs/`, separate from this report.
