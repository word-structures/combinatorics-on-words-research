# Paper 4 — sandbox report #6: the exact AFE K≤40 constraint system

**Date:** 2026-08-28
**Scope:** sandbox only. No canonical Paper-4 file, manuscript, evidence artifact, branch or commit touched. Supplied independent packages unmodified.
**Mäkelä:** OPEN. **Complete-AEF at L=40:** UNRESOLVED. **L=40 impossibility:** NOT ESTABLISHED. **Novelty:** NOVELTY_UNRESOLVED.

---

## 0. Corrected denominators and exact units

`FROZEN_RECORD_2026-08-28.sha256`: **87 of 87 artifacts verify, 0 problems.**

### 0.1 AF_EXISTS wording — corrected

> **Exact statement.** Over the **explicitly delimited deterministic subpopulation** of the
> **first 20,000 distinct A words in persisted enumeration order** from each population:
> H yields **49** AF-positive A of 20,000 (1 capped, excluded); R yields **14** of 20,000
> (0 capped, fully exhaustive).

These subpopulations were **not** randomly drawn and are **not** representative by
construction. The 3.5× ratio is **not** generalized to the full H (72,454 distinct A) or
R (260,798 distinct A) populations. Full-population AF-positive rates remain **UNRESOLVED**.

### 0.2 Units for every table (reconstructed from persisted data, all row sums verified)

| Table | Unit | Denominator | Row-sum check |
|---|---|---|---|
| A-population sizes | (E,A) pairs | H 111,613 / R 261,910 | — |
| A-population sizes | distinct A words | H 72,454 / R 260,798 (overlap 971) | — |
| AF_EXISTS (report 5 §3) | **distinct A words** | 20,000 each | H 49+19,950+1 = 20,000 ✅ · R 14+19,986+0 = 20,000 ✅ |
| 3-bit signature (report 5 §4) | **(E,A,F) triples** | H 9 E × 30 complete-AF (A,F) = 270 ✅ · R 60 × 30 = 1,800 ✅ | H 231+39 = 270 ✅ · R 1,800 ✅ |
| Attribution tree (report 5 §5) | **(E,A) pairs whose A is AF-positive** | H 122 / R 14 | H 88+10+0+24 = 122 ✅ · R 14+0+0+0 = 14 ✅ |
| §6 below | **(E,A) pairs whose A is AF-positive** | H 122 / R 14 | ✅ |

Persisted positives match manifest counts exactly in both runs (49/49, 14/14).

---

## 1. Short-gate factorization lemma — FROZEN

> **Lemma (PROVED / independently checked).** In `Fact(h₆^ω(a))` the A/E/F-only trigrams are
> exactly `{afe, eaf, faf, fea}`, and every A/E/F-only unigram and bigram is a factor of one
> of them (`af ⊂ afe`, `fa ⊂ faf`, `ea ⊂ eaf`, `fe ⊂ fea`). For `K ≤ 40` an Abelian square
> has length `≤ 80 ≤ 3L`, so it meets at most three consecutive blocks; if its macro support
> lies in `{a,e,f}` that window is an A/E/F-only macro factor of length `≤ 3`, hence one of
> those four trigrams. Since the complete-AF gate already certifies `H(faf)` for
> `K = 2..60 ⊇ K ≤ 40`, the additional E-dependent `K ≤ 40` obligations reduce **exactly** to
> `H(afe)`, `H(eaf)`, `H(fea)`.

Regenerated from the morphism; nothing assumed. No novelty claim.

---

## 2. Exact AFE constraint hypergraph

Variables `x_j = p_F(j)`, `j = 0..40`, with `x_0 = (0,0,0)`, `x_40 = (19,11,10)`,
`x_{j+1} − x_j ∈ {e_a, e_b, e_c}`. Windows `(s,K)`, `K = 2..40`, cuts `(+1, −2, +1)`.

| | windows | distinct canonical shapes |
|---|---:|---:|
| **total** | **3,081** | **1,221** |
| arity 0 (F-order-independent) | 703 | 1 |
| unary | 1,238 | 80 |
| binary | 798 | 798 |
| ternary | 342 | 342 |

Windows where two cuts hit the same F depth: **0**.

**UNARY** — depths 0..39 (40 of 41 referenced), exactly **2 shapes per depth**, coefficient
histogram `{+1: 40, −2: 40}`.

**BINARY** — 531 distinct unordered depth pairs; span `|j−i|` from **2 to 39** (38 distinct
spans, count `2·(span−1)` at each); coefficient patterns **only** `(−2,1)` ×399 and
`(1,−2)` ×399 — **never** `(1,1)`.

**TERNARY** — 342 distinct depth triples; span `k−i` from 4 to 38; coefficient pattern
**uniformly** `(1,−2,1)`; **all 342 have depths in arithmetic progression** (`j−i = k−j`).

**GLOBAL** — constraint incidence per depth 58…78 (2,702 total); primal graph 41 vertices,
**741 edges**; **max earlier depths referenced when depth d completes: 38** (at d = 39);
max simultaneously-active earlier depths along `j = 0..40`: **38**.

### 2.1 Two exact simplifications, both verified

1. **The 342 ternary constraints are exactly “F is Abelian-square-free”, and are entirely
   A/E-independent.** Their macro term is `(0,0,0)` with zero A/E terms (all three cuts lie
   inside F), so the relation is the second difference of F's own prefix vector. Verified
   directly: 400/400 random F, “ternary violated” ⟺ `F has an Abelian square (K ≤ 20)`.

2. **The 703 arity-0 windows are exactly “A and E are individually Abelian-square-free”.**
   Verified: 2,000/2,000 random `(A,E)`, `dead` ⟺ `A has a square OR E has a square`.

**Consequence.** After stripping two conditions already enforced upstream in every real
population, the genuinely `(A,E)`-dependent F system is only **80 unary shapes + 798 binary
relations**. That is a far smaller object than “3,081 windows”.

---

## 3. Independent direct-vs-affine validation

Ground truth is direct substring Parikh equality on `H(afe) = A F E`.

```
random profile-correct (A,E,F):  trials 3000   agree 3000   disagree 0
known K<=40-clean triples: 59    both methods AFE-clean: 59   lost: 0
```

**Branch coverage note.** On *random* `(A,E)` the arity-0 obstruction fires **4000/4000**,
so random draws cannot exercise the unary/binary branches at all. Re-running on **real**
`(E,A)` pairs (9 historical E × 30 complete-AF pairs = 270 triples):

```
killed by arity-0 A/E-only obstruction : 0
reaching the F-dependent constraints   : 270
   failure class: unary 223 | binary 8 | ternary 0 | clean 39
direct-vs-affine on all 270 live cases : agree 270, disagree 0
```

The 39 clean cases are exactly the 39 known canonical triples. **All branches exercised;
zero disagreements.**

Typical live compilation size: 38–39 unary depths carrying ~338–351 forbidden states, plus
798 binary relations.

---

## 4. Chosen solver architecture, and why

**Chosen: (A) prefix-letter DFS over F with early activation** of every constraint whose
maximum referenced depth has just been reached.

Justified by the measured structure, not preference:

- The primal graph has 741 edges on 41 vertices and the **active window is 38 deep**, so a
  DP with compressed state (option B) would have to carry almost the entire prefix — no
  compression is available. A fixed-lookback DP is provably insufficient.
- A DFS carries the **full prefix for free**, so every binary/ternary relation can be tested
  exactly at the moment its deepest variable is fixed. No BDD, CP-SAT or SMT machinery is
  needed for a 40-step path with 3 branches.
- Measured cost is small enough that the 122 + 14 pair sweep in §6 completed comfortably.

The mathematical CSP formulation is preserved separately in `afe_csp.js`:
`x_0 = 0`, `x_40 = (19,11,10)`, `x_{j+1} − x_j` a unit vector, `0 ≤ x_j ≤ (19,11,10)`, and
all compiled affine relations avoided.

---

## 5. Exact regression on the delimited AF-positive population

Unit: (E,A,F) triples over the 9 historical E × 30 complete-AF (A,F) pairs.

- **270/270** agreement between the AFE CSP and direct `H(afe)` K≤40.
- **All 39** LEVEL-4/known-clean cases accepted at the AFE stage — none lost.
- Every R case previously attributed to AFE failure is rejected by the CSP (see §6: R's
  14 AF-positive pairs yield `AF_AND_AFE_EXISTS = 0`).

---

## 6. AFE as an existence pre-certifier — the decisive measurement

Unit: **(E,A) pairs whose A is AF-positive** in the delimited subpopulations. No caps.

| | **H** | **R** |
|---|---:|---:|
| (E,A) pairs | 122 | 14 |
| `AFE_EXISTS(E,A)` (AFE geometry alone, no AF requirement) | **46** | **1** |
| `AF_AND_AFE_EXISTS(E,A)` (AFE ∩ complete-AF) | **34** | **0** |
| actual `P40` after EAF/FEA (report 5 LEVEL 4) | **24** | **0** |

Attrition: H `122 → 46 → 34 → 24`; R `14 → 1 → 0 → 0`.

**This is the separation the long band failed to produce.** Report #4's `eafea` K=41..100
projection killed 17.02 % (H) vs 16.27 % (R) — essentially blind. The combined
**AFE ∩ complete-AF** existence predicate gives **34 vs 0**: it accounts for the entire
R-side zero on this population, while leaving 34 H candidates alive.

The separation is *not* explained by AFE geometry alone (46 vs 1 still leaves one R
survivor); it is the **intersection** with complete-AF that closes R to zero.

---

## 7. Is FEA redundant? — empirical only

Tested `complete-AF + AFE + EAF ⟹ FEA`:

- (a) exhaustive over the finite AF-positive basin: 270 triples, **0 counterexamples**;
- (b) targeted perturbation search with complete-AF enforced: **31,231** triples,
  **0 counterexamples**;
- (c) reverse implications for symmetry: `AFE&FEA&¬EAF = 0`, `EAF&FEA&¬AFE = 0`.

**No counterexample in 31,501 complete-AF triples. Status: EMPIRICAL ONLY. Not a theorem;
no proof derived.**

This *refines* report #5's finding. Without the complete-AF requirement, mixed signatures
do exist (report #5 found `(1,0,0)` ×26, `(0,1,0)` ×28, `(0,0,1)` ×41 under perturbation).
**Conditional on complete-AF**, no mixed signature has been found. So complete-AF appears to
be what couples the three trigrams — an empirical observation, not an established
implication.

---

## 8. Compute-value recommendation for broader AF_EXISTS

**Recommendation: do NOT spend the ~2.8 hours on full-population `AF_EXISTS`.**

Reasoning by information gain per unit compute:

- Full `AF_EXISTS` expansion would only tighten the 0.245 % / 0.070 % estimates. Those rates
  are a *contributing* factor (3.5× on a delimited subpopulation) but **not** the mechanism:
  R has 14 AF-positive A words and still reaches `P40 = 0`.
- The predicate that actually separates is `AF_AND_AFE_EXISTS`, which is **34 vs 0** — a
  complete separation. Compute spent there is strictly more informative.
- The AFE certifier does not accelerate `AF_EXISTS` itself (the AF search dominates), so
  there is no cost-reduction argument for revisiting it now.

**Preferred next spend:** apply the combined `AF_AND_AFE_EXISTS` certifier to a larger,
explicitly delimited (E,A) population — it is the first predicate whose measured selectivity
matches the observed 59-vs-0 contrast.

---

## 9. Theorem candidates and epistemic labels

| Statement | Label |
|---|---|
| Short-gate factorization lemma (§1) | **PROVED / independently checked** |
| AFE hypergraph counts: 3,081 windows → 703/1,238/798/342, 1,221 distinct shapes | **ESTABLISHED, exact** |
| Ternary class ≡ “F Abelian-square-free”, A/E-independent | **PROVED + verified 400/400** |
| Arity-0 class ≡ “A and E individually Abelian-square-free” | **PROVED + verified 2,000/2,000** |
| Binary coefficient patterns are only `(−2,1)`/`(1,−2)`; ternary only `(1,−2,1)` in arithmetic progression | **ESTABLISHED, exact** |
| Affine AFE CSP ≡ direct substring Parikh equality | **ESTABLISHED** (3,000 random + 270 real + 59 positives, 0 disagreements) |
| Prefix-DFS is the right architecture (active window 38 blocks compression) | **ESTABLISHED from measured structure** |
| `AF_AND_AFE_EXISTS`: H 34 vs R 0 | **EXACT for the delimited AF-positive populations** |
| AF-positive enrichment 3.5× | **EXACT for the first-20,000-distinct-A subpopulations only** |
| `complete-AF + AFE + EAF ⟹ FEA` | **EMPIRICAL ONLY** — 0 counterexamples in 31,501 triples, no proof |
| Complete-AEF existence at L=40 | **UNRESOLVED** |
| Full-population H/R AF-compatible rates | **UNRESOLVED** |
| L=40 feasibility | **UNRESOLVED**; impossibility **NOT ESTABLISHED** |
| Novelty of the staged affine prefix-CSP reduction | **NOVELTY_UNRESOLVED** |

No novelty claim is made. Close prior-art layers (Currie–Rampersad templates;
Rao–Rosenfeld parent/boundary Parikh equations; Eyidoğan–Göral–Tanısalı sieving;
finite/automatic Parikh-state methods) remain unexcluded, and mathematical correctness is
kept separate from novelty throughout.

---

## 10. CROSS_PAPER_TRANSFER_CANDIDATES

Listed only as structures that may later deserve comparison. **No equivalence is claimed and
nothing in Papers 2 or 3 was read or edited for this section.**

1. **Second-difference / boundary-contact geometry.** Every obstruction here is
   `P(s+2K) − 2P(s+K) + P(s) = 0`, a discrete second difference of a Parikh-valued prefix
   function. Whether this is formally related to the second-order Parikh quantities in the
   Paper-2/3 line is **unexamined**.
2. **Affine prefix-Parikh constraint systems.** The compiled objects are affine relations
   `Σ cᵢ·x_{jᵢ} + C = 0` on prefix Parikh vectors with `c ∈ {+1, −2}`. Whether such systems
   arise elsewhere in the project is **unexamined**.
3. **Finite path/contact state systems.** The solver is reachability on a 41-step path with
   forbidden states and forbidden pairs. Comparison with any contact-graph formalism
   elsewhere is **unexamined**.

These are flags for a later, deliberate comparison — not findings.

---

## 11. Exact next action

Apply `AF_AND_AFE_EXISTS` to a larger explicitly delimited (E,A) population and measure
whether the 34-vs-0 separation persists. That predicate is the first one whose selectivity
matches the observed contrast, and it is cheap relative to `AF_EXISTS`.

Do **not** build the `fafea` binary CSP, expand the Hamming radius, start a new population,
or add B or D until that measurement lands.

Raw solver data and logs remain under `runs/`, separate from this report.
