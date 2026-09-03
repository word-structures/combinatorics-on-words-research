# Papers 2 / 3 / 4 — cross-paper theorem-transfer audit

**Date:** 2026-08-28
**Type:** internal structural audit. **No manuscript edited. No canonical evidence changed. No Git mutation. No new computation beyond one 300-trial verification run.**
**Mäkelä:** OPEN. **Complete-AEF at L=40:** UNRESOLVED. **L=40 impossibility:** NOT ESTABLISHED. **Novelty (all three papers):** NOT_ESTABLISHED.

---

## 1. Executive verdict

The three papers are **genuinely distinct**, and the transfer opportunities are **smaller and differently located than the surface vocabulary suggests**.

1. **Paper 4 → Paper 3: one real formal relation, and it is shallow.** Both papers' fundamental contact equation is the *same* discrete second difference with coefficients `(+1,−2,+1)`. But this is because both study Abelian squares — it is the prefix-sum restatement of the definition, not a transferable theorem. **PROVED SAME STRUCTURE, low value.**
2. **Paper 3 → Paper 4: one genuine, non-obvious reverse transfer.** Paper 3's Theorem 4.1 (shift-one rigidity) transfers *verbatim* to Paper 4's windows — verified 5,292/5,292 with zero failures on 300 random block triples. Paper 4's solver does not currently exploit it. **INVESTIGATE.**
3. **A widespread conflation must be avoided.** Paper 3's headline second-order object `η_v = −D_v''(0)/D_v(0)` is an **analytic second derivative in the colour tilt `t`**. Paper 4's second difference is **positional**. These are *different* second-order objects that happen to share the word "second". The correct match for Paper 4's equation is Paper 3's **shift-one/shift-two contact equations**, not `η_v`.
4. **Paper 4 → Paper 2: NO MATERIAL CONNECTION**, and not even an example. Paper 2 requires a mixing SFT with a soft-penalised pattern event and a variance observable; Paper 4's object is a single morphic word with no measure and no perturbation parameter. It is not an instance of Paper 2's setup.
5. **The real unification opportunity does not involve Paper 4 at all.** Papers 2 and 3 share the *same proof architecture* — "explicit finite part + certified centered-return tail ⟹ sign". Paper 3 states it explicitly (Lemma 9.1, Theorem 10.1); Paper 2 has an implementation without the general lemma. **That is the one shared lemma worth extracting, and it is a Paper-2/3 matter.**
6. **Recommendation: do not change course.** Continue Paper 4; log the 2↔3 certification-architecture issue for the next Paper-2/3 session.

---

## 2. Authoritative sources used (hashes)

| File | SHA-256 |
|---|---|
| `paper3-audit/00-canonical/PAPER3_MANUSCRIPT_v0.2_2026-08-26.md` | `0288d3a46a37…` |
| `paper3-audit/00-canonical/30_PAPER3_THEOREM_SKELETON_v0.1_2026-08-26.md` | `5c22457b0673…` |
| `paper3-audit/10-certificates-evidence/34_PAPER3_CYCLIC_CONTACT_AND_NILPOTENCY_THEOREM.md` | `38ea94b9929b…` |
| `paper2-audit/00-canonical/MANUSCRIPT_DRAFT_v0.3(1).md` | `0031318ef840…` |
| `paper2-audit/00-canonical/MANUSCRIPT_DRAFT_v0.2(1).md` | `0b7b5b50de99…` |
| `paper2-audit/00-canonical/31_PAPER2_V3_INTEGRATION_NOTE_2026-08-26.md` | `2358827a0946…` |
| `_paper4-next-version-sandbox/SANDBOX_REPORT_6_AFE_CSP_2026-08-28.md` | `d21cafd0e0f7…` |

### 2.1 Paper-2 authoritative-version conflict — STILL UNRESOLVED

Both drafts carry the internal header **“Manuscript draft v0.2 — 2026-08-25”**. The
`v0.3`-named file is larger (47,748 vs 42,299 bytes). Their section structures differ by
**exactly one added subsection** (`2.2 Mixed-cumulant and susceptibility interpretation`,
after which `2.2 Representation invariance` becomes `2.3`).

**Impact on this audit: negligible.** The added subsection does not alter the objects
compared here. I used the `v0.3`-named file as the working-latest and state explicitly that
**which draft is canonical remains an owner decision**, carried forward unresolved from
sandbox report #3.

---

## 3. Paper-2 theorem ledger (its own notation)

- **Question.** Why can a *soft* local penalty have a variance response whose sign is
  controlled by delayed continuation geometry?
- **Objects.** `A_ε(i,j) = A(i,j)e^{−ε g(i,j)}`; Perron data `λ_ε, r_ε, ℓ_ε`; Parry
  `P_ε(i,j) = A_ε(i,j)r_ε(j)/(λ_ε r_ε(i))`; observable `f = 1_{a} − 1/3`; asymptotic
  variance `a(ε) = c_0(ε) + 2Σ_{k≥1} c_k(ε)`; two-parameter pressure `𝒫(t,ε)` with
  `a(ε) = ∂_t²𝒫(0,ε)` and `a'(0) = ∂_ε∂_t²𝒫(0,0)`.
- **Theorems.**
  - Poisson representation `a(0) = 2⟨f,u⟩_π − ⟨f,f⟩_π` (explicitly *no novelty claimed*).
  - **Prop 4.1** one-endpoint covariance identity: `Cov(H_k, 1_G) = (p_G/q)·K` with
    `K = P(Y=C|G) − P(Y=C)`.
  - **Prop 5.1** continuation capacity `N_m = A^m 1`, `Q_m(i,j) = N_m(j)/N_{m+1}(i) → P_ij`.
  - **Prop 5.2** finite projective enclosure.
  - **Thm 6.1** continuation-echo criterion: `E_M > C_rest ⟹ a'(0) < 0`.
  - **Candidate Thm 7.1** h4 `(2,1,1)` mechanism-aware sign reversal.
- **Empirical spine.** `h=4, v=(2,1,1)`: local term positive, `a'(0) ≈ −0.00733732617`;
  reversal localised to lags 9–10.
- **Gaps.** `C_rest` evaluates finite linear-response terms, so the procedure is *sign
  certification*, not a response-free predictor — stated by the paper itself.

## 4. Paper-3 theorem ledger (its own notation)

- **Question.** How does *hard* exclusion of an Abelian profile orbit reorganise fluctuation
  response through short Abelian contacts plus returns?
- **Objects.** `D_v(t) = P_base(t) − P_{hard,v}(t)`; `η_v = −D_v''(0)/D_v(0)`;
  `Δa_v = −D_v''(0)`; `B(v) = Σ(v_i − h/3)²`; `J(v) = Π(v_i − h/3)`; resonance `U(v)`;
  contact graphs `O_1, O_2`; `N_v(z,t) = zO_{1,v}(t) + z²O_{2,v}(t)`; `P^T = Π + Q`.
- **Theorems.**
  - **§4 shift-one rigidity:** `2e_{x_h} = e_{x_0} + e_{x_{2h}}` ⟹ `x_0 = x_h = x_{2h}`.
  - **Thm 4.1:** `deg⁺O_1 ≤ 1`, `deg⁻O_1 ≤ 1` ⟹ `O_1` is disjoint paths and cycles.
  - **Thm 4.2:** `d_1(v) = 1/3 + B(v)/h²`, equivalently `B(v) = h²(d_1(v) − 1/3)`.
  - **§5 shift-two:** `R = 2M − F`; Types I/II; `deg^±O_2 ≤ 2`.
  - **Thm 5.1** unit-transfer resonance `v_i = v_j + 1`.
  - **Thm 6.1** exact `d_2(h,B,J,U)`.
  - **Thm 8.1** recurrence-curvature identity `η_v = H_tt /(z_v log z_v · H_z)`.
  - **Lemma 9.1** blocked geometric tail.
  - **Thm 10.1** finite-depth hard-response criterion: intervals excluding zero ⟹
    `sgn η_v = sgn(H_tt/H_z)`.
  - **Thm 11.1** acyclic support ⟹ `N_v^{d+1} = 0`, `(I+N_v)^{-1} = Σ_{j≤d}(−N_v)^j`.
- **Empirical spine.** 15 occurring profile classes at `h=2..7`; 6/6 minimum-`B` positive,
  9/9 others negative — explicitly *evidence, not a law*.

## 5. Frozen Paper-4 checkpoint

**PROVED / ESTABLISHED STRUCTURE (items 1–10 as listed in the task).** All ten are recorded
as established in sandbox reports #3–#6, notably: the kernel-preserving lift
`M' = sM + u1ᵀ` with `M'd = sMd` for `1ᵀd = 0`; macro+boundary decomposition; complete
subset-factor covers; the short AEF factorisation `{afe, eaf, faf, fea}` reducing (given
complete-AF) to `afe + eaf + fea`; the single-occurrence-role long-band projection; the AFE
affine prefix-Parikh CSP `x_j = p_F(j)`; the AFE anatomy with arity-0 ≡ “A and E internally
Abelian-square-free” and ternary ≡ “F internally Abelian-square-free”; the second-difference
form; the finite path `x_0 → … → x_40`.

**FINITE-POPULATION ONLY, kept strictly separate.**
`AF_AND_AFE_EXISTS` H 34 vs R 0 — exact only for the delimited AF-positive populations.
First-20k AF-positive enrichment (49/20,000 vs 14/20,000) — **not representative**.
Long-band `eafea` projection does **not** explain H/R selectivity (17.02 % vs 16.27 %).
`complete-AF + AFE + EAF ⟹ FEA` — **empirical only** (0 counterexamples in 31,501 triples).
Complete-AEF existence **unresolved**; L=40 impossibility **not established**.

---

## 6. Paper 4 → Paper 3 formal comparison

### 6.A Discrete second difference — **PROVED SAME STRUCTURE (shallow)**

Paper 4, for prefix Parikh `P` of `H(v)` and cuts `s, s+K, s+2K`:

```
P(s+2K) − 2P(s+K) + P(s) = 0.                                        (P4)
```

Paper 3, an Abelian square of half-length `h` at position `s` in `w ∈ L_{h−1}`:

```
Ψ(w[s..s+h)) = Ψ(w[s+h..s+2h))  ⟺  P(s+2h) − 2P(s+h) + P(s) = 0.     (P3)
```

`(P4)` and `(P3)` are the **same equation** with `K ↔ h`. Paper 3's §4 relation is exactly
the **first difference of (P3) in `s`**:

```
[(P3) at s+1] − [(P3) at s]
  = e_{w[s+2h]} − 2e_{w[s+h]} + e_{w[s]} = 0,
```

which is Paper 3's `2e_{x_h} = e_{x_0} + e_{x_{2h}}`. Likewise Paper 3's shift-two relation
`R = 2M − F` is `F − 2M + R = 0` — again the `(+1,−2,+1)` pattern, one order coarser
(length-two Parikh vectors instead of unit vectors).

**Verdict: literally the same object after the change of variables `K ↔ h`.** But the value
is low: `(P4)`/`(P3)` is the prefix-sum restatement of “Abelian square”, shared by any paper
about Abelian squares. It is a common definition, not a transferable theorem.

### 6.A′ The conflation to avoid — **NO MATERIAL CONNECTION**

Paper 3's headline second-order quantity is

```
η_v = −D_v''(0)/D_v(0),        D_v(t) = P_base(t) − P_hard,v(t),
```

an **analytic second derivative in the colour tilt `t`**, i.e. an asymptotic-variance object.
Paper 4's second difference is **positional**, over letter indices, with no measure, no
tilt, and no analytic parameter anywhere in the construction.

These are different second-order objects. `B(v)`, `J(v)`, `U(v)`, `Ξ_v`, `D_v`, `η_v` have
**no counterpart in Paper 4**. Any claim of the form “both papers study second-order Parikh
structure” would be an equivocation on the word “second”.

### 6.B Affine prefix-Parikh contacts — **FORMALLY RELATED**

Paper 4's compiled constraints are `Σ_i c_i x_{j_i} + C = 0`, `c_i ∈ {+1,−2}`,
`x_j = p_F(j)` a prefix state. Paper 3's contact relations use the same coefficients but
different variables: unit vectors `e_{x}` (shift-one) and length-two Parikh vectors `F, M, R`
(shift-two). Since `e_{w[s]} = x_{s+1} − x_s`, Paper 3's variables are **discrete
derivatives of Paper 4's**. The two systems are related by differencing, not identical.

- *Does Paper 3 contain an affine contact system in disguise?* Yes — `O_1`, `O_2` are built
  from exactly such relations. But Paper 3 feeds them into a **weighted analytic recurrence**
  (edge weights `O_{1,v}(t)`, for pressure), whereas Paper 4 uses them as **hard forbidden
  constraints**. Same skeleton, different use.
- *Does Paper 4's formulation give a cleaner proof of a Paper-3 lemma?* **No.** Paper 3's
  Theorems 4.1/5.1 are already one-line derivations; nothing is improved.
- *Does Paper 3 contain a theorem generalising Paper 4?* **No.** Theorem 11.1 concerns
  nilpotency of weighted matrices on contact graphs; Paper 4's object is path reachability,
  not a matrix-power problem.

### 6.C Finite path / contact-state system — **ANALOGY ONLY**

Paper 4: path `x_0 → … → x_40`, unit letter increments, forbidden affine contacts;
question = **reachability** (does a word exist).
Paper 3: contact graphs on **target windows** (length-`2h` cylinders); acyclicity ⟹
**nilpotency of a weighted matrix**, an analytic simplification.

The node sets are different objects (prefix states of one block vs. target windows), and the
questions are different (existence vs. matrix inversion). A common abstraction
(“constrained additive path + contact hyperplanes”) can be written down, but it would not
simplify a single existing theorem in either paper. Per the audit rule, no abstraction is
invented.

### 6.D Kernel-preserving lift — **NO MATERIAL CONNECTION**

Paper 4: `M' = sM + u1ᵀ`, and `1ᵀd = 0 ⟹ M'd = sMd`, where `M` is the incidence matrix of a
**constant-length coding** and `d` a difference of macro-letter Parikh vectors of
equal-length factors.

Answering the audit's questions exactly:

- *Are Paper-3 fluctuation vectors automatically in `1⊥`?* **No.** Paper 3's centering is
  `Πf = 0 ⟺ πf = 0` with `Π = 1π` — orthogonality to the **stationary vector `π`**, not to
  `1`. `{f : πf = 0}` ≠ `1⊥` in general.
- *Does the rank-one invariance apply there?* **No.** Paper 3 has **no constant-length
  coding and no incidence matrix of that type**. `P^T = Π + Q` is a spectral decomposition,
  not a rank-one lift; perturbing the adjacency matrix by `u1ᵀ` would change the Perron data
  outright, so it is not a symmetry there.
- *Can a Paper-3 theorem be strengthened to a rank-one family?* **No** — there is no free
  matrix parameter to lift.
- *Is it implicit/trivial in Paper 3?* Neither; it is simply absent.

### 6.E Subset / local factor reductions — **NO MATERIAL CONNECTION**

Paper 4's complete subset-factor gates depend on a **finite macro cover word** and a
constant-length coding. Paper 3 has neither. The transfer is not forced.

---

## 7. Paper 4 → Paper 2 formal comparison

| Paper-4 structure | Paper-2 object | Verdict |
|---|---|---|
| Positional second difference `P(s+2K) − 2P(s+K) + P(s)` | `a(ε) = ∂_t²𝒫(0,ε)`, `a'(0) = ∂_ε∂_t²𝒫(0,0)` | **NO MATERIAL CONNECTION** — analytic derivative in `(t,ε)` vs positional difference |
| DFS completion counts | continuation capacity `N_m = A^m 1` | **ANALOGY ONLY** — `N_m` exists to prove `Q_m → P_ij`, a measure-theoretic limit; Paper 4 has no measure |
| AFE affine CSP | one-endpoint identity `Cov(H_k,1_G) = (p_G/q)K` | **NO MATERIAL CONNECTION** |
| Existence of `H` | echo criterion `E_M > C_rest ⟹ a'(0) < 0` | **NO MATERIAL CONNECTION** |

**Is Paper 4 at least an example/test system for Paper 2?** **No.** Paper 2 needs a mixing
SFT with a soft-penalisable event `g` and the observable `f = 1_a − 1/3`. Paper 4's object is
`H(h₆^ω(a))`, a **single morphic word** — zero entropy, no measure, no `ε`. It is not an
instance of Paper 2's framework, so it cannot serve as an example or a counterexample.

The two papers share **subject matter** (ternary Abelian-square avoidance) and **vocabulary**
(“returns”, “capacity”, “state”), not mathematics. That is exactly the inference the audit
brief warns against, and it is declined here.

---

## 8. Reverse transfer: Papers 2/3 → Paper 4

### 8.1 Paper 3 Theorem 4.1 → Paper 4 — **PROVED SAME STRUCTURE, genuine, unexploited**

Paper 3's shift-one derivation applies verbatim to Paper 4's windows: if Abelian squares of
the **same** half-period `K` start at both `s` and `s+1`, then

```
e_{w[s]} − 2e_{w[s+K]} + e_{w[s+2K]} = 0   ⟹   w[s] = w[s+K] = w[s+2K].
```

**Verified computationally** (`work/xpaper_rigidity_test.js`, 300 random profile-correct
`(A,E,F)`): 5,292 adjacent same-`K` square pairs found, **5,292 satisfy the rigidity, 0
failures**. Moreover **3,042 of Paper 4's 3,081 AFE windows have an `(s+1,K)` neighbour**, so
the rule could propagate on 98.7 % of them.

Paper 4's compiled CSP does **not** use this. It is a genuine constraint-propagation rule
available for free. Its practical value is unmeasured: it constrains *co-occurrence* of
violations, which is weaker than a direct pruning rule in an avoidance problem.
**Action: INVESTIGATE** (bounded, ≲1 h).

### 8.2 Does Paper 3 explain the empirical `complete-AF + AFE + EAF ⟹ FEA` coupling?

**No — UNRESOLVED.** Paper 3's contact theorems constrain *targets of one fixed profile
orbit within one shift*. Paper 4's three trigrams are three different macro contexts over a
*coded* word. Paper 3 offers no theorem that would imply the coupling, and none that
suggests a counterexample construction. Nothing transfers.

### 8.3 Does Paper 3 give a better invariant for the `AF_AND_AFE_EXISTS` basin?

**No.** `B, J, U` are invariants of a **half-Parikh profile of a target orbit**. Paper 4's
basin is a set of `(E,A)` pairs of **length-40 block words** whose role profiles are fixed
by the lift. `B(v)` is constant across Paper 4's entire search space (the profiles never
vary), so it has zero discriminating power there. **NO MATERIAL CONNECTION.**

### 8.4 Could Paper 2's continuation capacity rank Paper-4 partial assignments?

**SPECULATIVE, and probably not Paper 2's contribution.** Counting completions of a partial
prefix to guide DFS order is a standard search heuristic; `N_m = A^m 1` on Paper 4's
constraint DAG is just “count completions”. Paper 2's actual contribution is the *limit*
`Q_m → P_ij` and its projective enclosure, both of which need a measure Paper 4 does not
have. Labelling this a Paper-2 transfer would overstate it. **Action: NO ACTION** (any
solver-ordering heuristic stands on its own).

---

## 9. Cross-paper theorem matrix

| Paper-4 result / structure | P4 status | Closest Paper-3 object | Rel. | Closest Paper-2 object | Rel. | Evidence | Action | Contamination risk |
|---|---|---|---|---|---|---|---|---|
| Second difference `P(s+2K)−2P(s+K)+P(s)=0` | PROVED | `(P3)` square condition; §4/§5 contacts | **SAME** | `∂_t²𝒫` | **NONE** | `K ↔ h` identity, §6.A | CITE / CROSS-REF LATER | High — must not be read as linking to `η_v` |
| Shift-one rigidity (as a *consumer*) | not used | **Thm 4.1** | **SAME** | — | NONE | 5,292/5,292 verified | **INVESTIGATE** | Low |
| Affine prefix-Parikh CSP `Σc_i x_{j_i}+C=0` | PROVED | `O_1,O_2` relations | **FORMALLY RELATED** | — | NONE | differencing map `e_{w[s]}=x_{s+1}−x_s` | CITE LATER | Medium |
| Finite path `x_0→…→x_40` + forbidden contacts | PROVED | contact graphs / nilpotency | **ANALOGY ONLY** | — | NONE | different node sets, different questions | KEEP PAPER-4 ONLY | Medium |
| Kernel-preserving lift `M'=sM+u1ᵀ` | PROVED | `P^T=Π+Q` | **NONE** | Perron data `λ_ε,r_ε` | **NONE** | `πf=0 ≠ 1ᵀd=0`; no coding in P2/P3 | KEEP PAPER-4 ONLY | Low |
| Subset-factor gates / maximal covers | PROVED | — | **NONE** | — | **NONE** | needs finite macro cover + uniform coding | KEEP PAPER-4 ONLY | Low |
| Short AEF factorisation `{afe,eaf,faf,fea}` | PROVED | — | **NONE** | — | **NONE** | specific to `h₆` cover | KEEP PAPER-4 ONLY | Low |
| Single-occurrence-role projection | PROVED | — | **NONE** | — | **NONE** | needs role occurring once in a cover | KEEP PAPER-4 ONLY | Low |
| AFE anatomy (arity-0 ≡ A,E square-free; ternary ≡ F square-free) | PROVED | — | **NONE** | — | **NONE** | — | KEEP PAPER-4 ONLY | Low |
| `AF_AND_AFE_EXISTS` H 34 vs R 0 | finite population | — | **NONE** | — | **NONE** | — | KEEP PAPER-4 ONLY | High — must never be quoted outside its delimited population |
| Long-band projection kill rate 17.02 %/16.27 % | finite population | — | **NONE** | — | **NONE** | — | NO ACTION | Medium |

---

## 10. Merger / separation assessment

**Paper 2 vs Paper 3 — distinct, but with a genuinely shared proof architecture.**
Distinct question (soft `A_ε = A_0e^{−εg}` derivative vs hard orbit deletion): **yes**.
Distinct main theorem (Thm 6.1 echo criterion vs Thm 10.1 finite-depth criterion): **yes**.
Distinct proof machinery: **partly no** — both are “explicit finite part + certified
remainder ⟹ sign”. Paper 3 states the general tail lemma (9.1); Paper 2 has an
implementation (`C_rest`) without it. Distinct empirical contribution (h4 `(2,1,1)` reversal
and prospective batteries vs the 15-class hard-response family): **yes**.
*Salami risk:* **moderate but defensible** — the perturbations are genuinely different
objects. *Merger risk:* low. The integration note already draws the boundary correctly.
**Verdict: keep separate; extract the shared certification lemma once (see §11).**

**Paper 2 vs Paper 4 — clearly distinct, no shared machinery.**
Different question, theorem, machinery, and empirical contribution. Paper 4 is not even an
instance of Paper 2's framework. *Salami risk: none. Merger risk: none.*

**Paper 3 vs Paper 4 — clearly distinct despite a shared definitional identity.**
Paper 3 asks a measure-theoretic question about fluctuation response; Paper 4 asks a
combinatorial existence question. Shared: the Abelian-square second-difference identity
(definitional) and contact-graph vocabulary. *Salami risk: none* — no single theorem has
been split. *Merger risk: none* — merging would force a thermodynamic paper and an
existence paper into one narrative with no common theorem.

**No pair is one theorem split artificially.**

---

## 11. Common-core candidate — and it is not the one expected

Only one shared lemma is actually supported, and **Paper 4 is not part of it**:

> **Candidate (Papers 2 ∩ 3).** *Finite-depth sign certification.* If a target scalar
> decomposes as an explicitly computable finite part plus a centered-return remainder whose
> norm (and first two derivatives, via Cauchy estimates on a disc `|t| ≤ r`) is bounded by a
> blocked geometric tail `C_bκ^m/(1−κ)`, and the finite part's margin exceeds that bound,
> then the sign of the target is rigorously determined.

Paper 3 owns it naturally: Lemma 9.1 and Theorem 10.1 already state it in general form.
Paper 2's `C_rest` construction is the same technique specialised to `a'(0)`.
**Recommended:** Paper 2 cites/specialises Paper 3's Lemma 9.1 rather than re-deriving it.
**Do not create a fourth paper** to house it.

The Paper-3 ∩ Paper-4 identity (second difference + shift-one rigidity) is **too elementary
to deserve a shared lemma**; a one-line cross-reference is sufficient and a shared-lemma
paper would damage clarity.

---

## 12. Proposed changes — NOT APPLIED

```
Paper 3 §4:
  possible strengthening — note that the shift-one rigidity derivation is not specific
  to fixed half-length h: for any equally-spaced cut triple it gives
  w[s] = w[s+K] = w[s+2K].
  reason — it is the same one-line argument, and Paper 4 verified the general form
  holds (5,292/5,292). Low cost, slightly widens Theorem 4.1's stated scope.
  CAUTION — only if it does not disturb the O_1 degree-bound statement, which is what
  the paper actually uses.

Paper 2 §6 / §8:
  possible simplification — cite Paper 3 Lemma 9.1 for the blocked geometric tail
  instead of carrying an independent C_rest bound derivation.
  reason — same technique; removes a duplicated argument and fixes the one real
  duplication between the two papers.

Paper 2 §2:
  housekeeping — the authoritative draft is undetermined; both files carry the header
  "v0.2". Resolve before any further editing.
  reason — unresolved since sandbox report #3; blocks safe manuscript work.

Paper 4 (sandbox):
  keep separate — the lift, subset-factor gates, short AEF factorisation, and the
  single-occurrence projection have no Paper-2/3 counterpart and should not be
  generalised toward them.
  reason — they depend on a constant-length coding over a finite macro cover, which
  neither other paper has.

Paper 4 (sandbox):
  investigate — add the shift-one rigidity rule as constraint propagation in the AFE
  CSP and measure whether it reduces the effective constraint count.
  reason — free, verified, currently unexploited; value unmeasured.
```

---

## 13. Recommended research workflow

**Option A, essentially unchanged: continue Paper 4 as the single active paper.**

Justification against the required criteria:

- *Context-switching cost:* high; Papers 2 and 3 use a thermodynamic vocabulary disjoint
  from Paper 4's combinatorics. Switching now would cost more than the transfers are worth.
- *Theorem-duplication risk:* the only real duplication is Paper 2 ↔ Paper 3 (the tail
  lemma). It does not involve Paper 4 and does not block it.
- *Evidence/provenance contamination:* the acute risk is quoting Paper-4 finite-population
  numbers (H 34 vs R 0; 49/20,000 vs 14/20,000) as general. Flagged in §9 as high risk.
- *Narrative coherence:* no paper's narrative needs to change on account of another.
- *Computational momentum:* Paper 4 has a concrete, cheap, well-posed next step.
- *Distance to publishable state:* Paper 3 is nearest (theorem skeleton complete, audit
  tasks listed); Paper 2 is blocked on an unresolved authoritative version; Paper 4 is
  furthest (no positive existence result).

Option B (pause Paper 4 to repair Paper 3) is **not** warranted — no transfer changes a
Paper-3 theorem. Option C (extract a shared lemma first) is **not** warranted for Paper 4 —
the shared lemma is a Paper-2/3 matter. Option D (alternate 3/4) is **not** warranted — no
computation feeds both.

---

## 14. Exact next action

1. Resume Paper 4 at its own next step (report #6 §11): apply `AF_AND_AFE_EXISTS` to a
   larger explicitly delimited (E,A) population.
2. Optionally, before that, spend ≲1 h on §8.1: add shift-one rigidity propagation to the
   AFE CSP and measure the constraint-count reduction. Bounded; abandon if it does not pay.
3. Log two Paper-2/3 items for the next manuscript session — **not now**: (a) resolve the
   Paper-2 authoritative draft; (b) have Paper 2 cite Paper 3's Lemma 9.1.

No manuscript was edited, no canonical evidence changed, no commit or push performed.
