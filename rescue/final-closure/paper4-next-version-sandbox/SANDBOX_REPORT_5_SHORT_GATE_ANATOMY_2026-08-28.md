# Paper 4 — sandbox report #5: K≤40 short-gate anatomy and the true F-stage bottleneck

**Date:** 2026-08-28
**Scope:** sandbox only. No canonical Paper-4 file, manuscript, evidence artifact, branch or commit touched. Supplied independent packages unmodified.
**Mäkelä:** OPEN. **Complete-AEF at L=40:** UNRESOLVED. **L=40 impossibility:** NOT ESTABLISHED. **Novelty:** NOVELTY_UNRESOLVED.

---

## 0. Frozen input state

`FROZEN_RECORD_2026-08-28.sha256`: **72 of 72 artifacts verify, 0 problems.** Supplied
packages re-hashed and unmodified (`b96e201c4e9f0847`, `f09146afaa39f1c1`).

Preserved from report #4 as **useful negative results**:

- supplied-package provenance defects: `synthetic_projection_probe.json` declared but never
  delivered; v0.2 audit §4 quotes `trials 80 / 288000 / 3369` while the delivered script
  has `trials=60` and yields `216000 / 2563`;
- independent clean-room replay of the projection: 288,000 comparisons, 0 disagreements;
- **3,600-window single-occurrence theorem established** (with the integrality, feasibility
  and boundary conditions made explicit);
- **the long-band projection does NOT explain H-vs-R selectivity**: 17.02 % vs 16.27 %;
- the 380-equation `EAF` family is mainly a witness explanation: 2.02 % of 17.02 %;
- `fafea` has 1,600 binary-prefix windows — **deferred, not built**.

---

## 1. Exact short AEF factor-language lemma

Regenerated from the morphism, nothing assumed. A/E/F-only macro factors:

```
n=1: a, e, f                    n=4: afea, eafe, fafe
n=2: af, ea, fa, fe             n=5: eafea, fafea
n=3: afe, eaf, faf, fea         n=6: (none)  -> R = 5
```

The A/E/F-only **trigrams are exactly {afe, eaf, faf, fea}** — matching the claim — and
every A/E/F-only unigram and bigram is contained in one of them (`af⊂afe`, `fa⊂faf`,
`ea⊂eaf`, `fe⊂fea`).

**Reduction.** For `K ≤ 40` a square has length `≤ 80 ≤ 3L`, so it lies in at most three
consecutive blocks. If its macro support is inside `{a,e,f}`, that window is an A/E/F-only
macro factor of length `≤ 3`, hence one of the four trigrams. The complete-AF gate already
certifies `H(faf)` for `K = 2..60 ⊇ K ≤ 40`.

> **Short-gate factorization lemma (DERIVED / EXACT).** Given `(A,F)` complete-AF, the new
> E-dependent `K ≤ 40` obligations reduce **exactly** to `H(afe)`, `H(eaf)`, `H(fea)`
> for `K ≤ 40`. No further A/E/F trigram is needed.

*(The length-4 and length-5 A/E/F-only factors matter only for `K > 40`, which is the long
band already handled in report #4.)*

---

## 2. Distinct-A population statistics

| | (E,A) pairs | distinct A | caching gain |
|---|---:|---:|---:|
| **H** — 9 historical E | 111,613 | **72,454** | 1.5× |
| **R** — 60 random E | 261,910 | **260,798** | 1.0× |
| overlap H ∩ R | — | **971** | — |
| union | — | 332,281 | — |

Multiplicity of A across E words: H `min 1 / median 2 / max 4`; R `min 1 / median 1 /
max 3` (259,918 of R's A words occur under exactly one E). **Caching F work by A is worth
1.5× on H and essentially nothing on R.**

---

## 3. Exact `AF_EXISTS(A)` attribution — the first decisive result

`AF_EXISTS(A) := ∃ profile-correct F with H(faf) clean for K ≤ 60`, decided by exhaustive
DFS over F with two sound incremental prunings (F alone; and `A + F-prefix`, which is fully
determined) and the complete gate verified at completion.

**Mandatory positive control: all 8 canonical A words recovered as AF-positive, 8/8, no
caps.** The solver is complete on known positives.

Evaluated over an **exactly delimited deterministic subpopulation** — the first 20,000
distinct A in persisted enumeration order from each population, not a random sample:

| Population | evaluated | AF-positive | rate | capped |
|---|---:|---:|---:|---:|
| **H** | 20,000 | **49** | **0.245 %** | 1 |
| **R** | 20,000 | **14** | **0.070 %** | 0 (fully exhaustive) |

**Neither outcome A nor outcome B holds cleanly — the truth is both.**

- **Outcome A is largely right:** ~99.8 % of A words in *both* populations are already
  AF-negative. LEVEL 0 dominates everything.
- **But outcome B is also real:** historical E words are **3.5× enriched** in AF-positive A
  (0.245 % vs 0.070 %), and R is **not zero** — 14 random-E A words do admit complete-AF F.

*Scope note: 1 of the 20,000 H evaluations hit the node cap and is excluded from the
positive/negative counts; R was fully exhaustive.*

---

## 4. Order-independent 3-bit survival table (K ≤ 40)

Every known complete-AF `(A,F)` pair (15 canonical + 15 fresh) crossed with each
population's E words:

| Population | triples | (0,0,0) | (1,1,1) | mixed |
|---|---:|---:|---:|---:|
| **H** (9 E × 30) | 270 | 231 | **39** | 0 |
| **R** (60 E × 30) | 1,800 | 1,800 | **0** | 0 |

Marginal pass rates: H — AFE 14.44 %, EAF 14.44 %, FEA 14.44 %; R — all 0.00 %.
Separation H − R: **+14.44 pp on each of the three**, identically.

**The three trigrams are perfectly co-extensive on this population — but they are NOT
logically coupled.** Perturbing known `(1,1,1)` triples by one profile-preserving
transposition (15,650 perturbations) produces mixed signatures: `(1,0,0)` ×26,
`(0,1,0)` ×28, `(0,0,1)` ×41. So the perfect split is a **property of the tested
population**, not a theorem, and no single trigram is a systematically weaker link.

---

## 5. Exact attribution tree (AF-positive A words, all complete-AF F enumerated exhaustively)

| | **H** | **R** |
|---|---:|---:|
| AF-positive A | 49 | 14 |
| complete-AF F witnesses enumerated | 134 | 69 |
| (E,A) pairs with AF-positive A | 122 | 14 |
| **LEVEL 1** — AF exists, every F fails **AFE** | **88** (72.1 %) | **14** (100 %) |
| **LEVEL 2** — some F passes AFE, all fail EAF | 10 (8.2 %) | 0 |
| **LEVEL 3** — some passes AFE+EAF, all fail FEA | **0** | **0** |
| **LEVEL 4** — complete K≤40 AEF triple exists | **24** (19.7 %) | **0** |

No caps in either enumeration.

**AFE is the dominant post-AF killer.** Every one of R's 14 AF-positive pairs dies at
LEVEL 1. FEA never kills anything in either population.

---

## 6. Known-positive regression — PASS

The short-gate pipeline (complete-AF + AFE + EAF + FEA at K ≤ 40) was run against every
known K≤40-clean triple:

```
distinct known triples: 59   (39 canonical + 20 later new)
recovered: 59      lost: 0
```

**No known positive lost.** Fail-closed regression satisfied.

---

## 7. Answers to the scientific questions

**Q1 — Do historical E preferentially generate A with complete-AF continuation?**
**Yes, by 3.5×** (0.245 % vs 0.070 %). But this is a modest enrichment on top of a
~99.8 % LEVEL-0 floor common to both populations. It is *a* factor, not *the* factor.

**Q2 — Conditional on complete-AF, which trigram is responsible?**
**AFE.** R: 14/14 die at AFE. H: 88/122 die at AFE, 10 more at EAF, **0 at FEA**.

**Q3 — Is selectivity a property of A's AF basin, or genuinely E-dependent?**
**Both, in two stages.** (i) A's AF-compatible basin gives a 3.5× enrichment; (ii)
conditional on AF-positivity, H reaches LEVEL 4 at **19.7 %** while R reaches it at
**0 %** — the residual separation is genuinely E-dependent and lives in AFE. Neither
stage alone explains the absolute 59-vs-0 contrast.

**Q4 — Can the dominant constraint become a reusable exact pre-certifier?**
Not as the unary DAG used for the long band. See §8.

---

## 8. AFE constraint anatomy (K ≤ 40)

`AFE = A F E`, F is block 1. For `K ≤ 40` several cut points may share a block, so the
`K > L` single-occurrence lemma **does not apply** — confirmed by direct count:

| windows by # cut points inside the F block | AFE | EAF | FEA |
|---|---:|---:|---:|
| 0 (F-order-independent) | 703 | 1,482 | 1,521 |
| 1 (unary prefix constraint) | 1,238 | 819 | 819 |
| **2 (binary)** | **798** | 419 | 399 |
| **3 (ternary)** | **342** | 361 | 342 |
| total | 3,081 | 3,081 | 3,081 |

For AFE: **80** distinct unary shapes, **798** distinct binary shapes (coefficient patterns
`(−2,1)` ×399 and `(1,−2)` ×399), **342** distinct ternary shapes, referencing **40 of 41**
prefix depths.

> **The 2,640-state unary DAG of report #4 does not transfer.** AFE at `K ≤ 40` requires at
> minimum a binary-relation CSP over `p_F(0..40)`, with 342 genuinely ternary constraints
> on top. Representation should be chosen from these counts — a CSP or SAT/SMT encoding
> over the 41 prefix variables, not a prefix-state DAG.

No solver was built; per instruction the anatomy was counted first.

---

## 9. Theorem candidates and epistemic labels

| Statement | Label |
|---|---|
| A/E/F-only trigrams are exactly `{afe, eaf, faf, fea}`; unigrams/bigrams contained in them | **ESTABLISHED, exact** |
| Short-gate factorization lemma: given complete-AF, new K≤40 obligations = `afe, eaf, fea` | **DERIVED / EXACT** |
| All 8 canonical A words are AF-positive (solver positive control) | **ESTABLISHED** |
| AF-positive rate: H 0.245 % vs R 0.070 % (3.5×) | **ESTABLISHED, exact for the delimited 20,000-A subpopulations** |
| ~99.8 % of A words in both populations are AF-negative | **ESTABLISHED for those subpopulations** |
| AFE dominates the post-AF stage; FEA kills nothing | **ESTABLISHED, exact** on the AF-positive sets (no caps) |
| The three trigrams are logically coupled | **REFUTED** — mixed signatures exist under perturbation |
| Short-gate pipeline recovers all 59 known positives | **ESTABLISHED** |
| AFE K≤40 needs ≥ binary CSP (798 binary + 342 ternary windows) | **ESTABLISHED, exact** |
| Selectivity fully explained by AF-basin membership | **REFUTED** — 14 R pairs are AF-positive and still reach 0 |
| Complete-AEF existence at L=40 | **UNRESOLVED** |
| L=40 impossibility | **NOT ESTABLISHED** |

**Novelty.** The long-band projection is *not* promoted after 17.02 % vs 16.27 %; it stands
as a clean structural lemma and exact finite reduction. Close prior-art layers
(Currie–Rampersad templates; Rao–Rosenfeld parent/boundary Parikh equations;
Eyidoğan–Göral–Tanısalı sieving; finite/automatic Parikh-state methods) remain unexcluded.
Mathematical correctness is separated from novelty throughout. **NOVELTY_UNRESOLVED.**

---

## 10. Exact next action

The attribution now points at one target, and only one.

**Compile the AFE `K ≤ 40` system for fixed `(E,A)` and measure its kill rate on the
AF-positive sets of H and R.** This is the direct test: AFE kills 100 % of R's AF-positive
pairs and 72 % of H's, so a compiled AFE certifier is the first constraint whose measured
selectivity actually matches the observed contrast — unlike the long band.

Concretely, in order:

1. Compile the 3,081 AFE windows into unary / binary / ternary `p_F` relations
   (703 are F-order-independent and cost nothing).
2. Regression-test it against the 24 LEVEL-4 pairs — it must accept all of them.
3. Only then measure kill rates on the AF-positive sets.

Two secondary items worth doing cheaply: extend `AF_EXISTS` beyond the first 20,000 A per
population to tighten the 0.245 %/0.070 % estimate (the full 332,281 is ≈ 2.8 h), and
resolve the single capped H evaluation.

Do **not** build the `fafea` binary CSP or a general K≤40 CSP until the AFE measurement
lands.

Raw solver data and logs remain under `runs/`, separate from this report.
