# Paper 6 — focused adversarial audit of the space–time observability theorem

**Scope:** the v2.5 Q2 theorem and the v2.6 cross-instance theorem only.
**Checkpoint:** `PAPER6_ESSENTIAL_RESEARCH_CHECKPOINT_v2.6_2026-08-30.zip`
SHA-256 `546c42c81aeab4a4ae712837e64f33db2b77a29e2e5f2830ccddbd424d27259f`
**Date:** 2026-08-30

**Method.** Conventions checked against the definition by hand. Target
dimensions re-derived by a different exact algorithm. Two new controls run that
the checkpoint does not contain: a genericity null control, and a direct test of
the mechanism behind the single anomaly. Own aggregation, own Krylov build, own
mod-p rank; the shipped C++ rank path was not used.

---

## 0. Headline

The exact mathematics is sound. Every number I checked reproduces. The
certificate logic is valid. The rigor gap I flagged in the previous audit —
no rational upper bound for the profile-only rank — has been **properly
closed**.

Two findings change what the theorem means.

> **1. The row-count optimality is the generic outcome, not a finding.**
> Random partitions with the same family-size distribution attain the same
> bound at every depth where the paper reports optimality — and *beat* the
> profile measurement at the one depth where it fails.
>
> **2. The unique 35-dimensional anomaly is a one-bit phase blindness.**
> Adjoining the single bit `|s| mod 4` to the true-grid measurement raises the
> exact static rank from 1144 to 1179 and closes the persistent gap from 29 to 0.

The paper currently presents the 14 conformances as the phenomenon and the
1 exception as an anomaly. The information content is the other way round, and
the exception is not (yet) Abelian.

---

## A. Left/right conventions — **PASS**

The definition requires, in the Krylov basis `{Q^i 1}` of `V_cnt`, that entry
(block `j`, row `g`, column `i`) of `O_{m,t}` equal `(M Q^j)(Q^i 1)[g] = (G Q^{i+j} 1)[g]`.

The replay builds `V[:,h] = Q^h 1` for `h < D + t − 1` and then

```python
stack = np.vstack([G.dot(V[:, j:j+D]) % PRIME for j in range(t)])
```

Block `j` therefore has entry `(G Q^{j+i} 1)[g]` at row `g`, column `i`.
**Identical to the definition.** No transpose, no shift.

Checked in addition:

- `Q` is applied as `Q.dot(v)` throughout — the operator, never its transpose.
- `G` is applied on the left of state-space vectors, so rows are measurements. Correct orientation.
- `{Q^i 1}_{i<1179}` is a genuine basis of `V_cnt`: the minimal polynomial of `Q|_{V_cnt}` has degree 1179, so the first 1179 powers are independent.
- The block window `a = len(t) % 4` recovers the **true** block grid. Words are multiples of `L = 4` and the memory is `2K−1 = 21` characters, so `|z| − 21 ≡ 3 (mod 4)` always and the grid inside the retained window starts at index 1 — exactly what `21 % 4 = 1` gives. Verified for every state length in `{4,8,12,16,20,21}`.

The generated matrix is genuinely `O_{m,t}`, not a rank-equivalent variant.

---

## B. Exact target dimensions — **PASS**

Re-derived by an algorithm that shares nothing with the shipped argument:
incremental exact elimination over `ℚ` on the Krylov matrix directly, using
Python `Fraction` arithmetic, with continuation for eight further columns to
confirm the rank had stopped growing. The shipped route (scalar Hankel rank for
the lower bound, exact vector annihilation for the upper) was not reused.

| instance | states | claimed `d` | independently recomputed | verdict |
|---|---:|---:|---:|---|
| BAL3 L4 Q1 | 10 | 4 | 4 | MATCH |
| HASH30 L4 K5 | 76 | 47 | 47 | MATCH |
| INTERIOR L5 Q1 | 119 | 72 | 72 | MATCH |
| FULL L4 Q1 | 252 | 153 | 153 | MATCH |

**FULL L4 Q1, `d = 153`, specifically:** the short proof is valid. Scalar Hankel
rank 153 gives `d ≥ 153` because a nonzero `153×153` Hankel minor mod `p` is a
nonzero integer minor; the exact degree-153 vector annihilation `p(Q)1 = 0`
gives `d ≤ 153`; the certificate records `vector_residual_nonzero_coordinates = 0`.
My direct computation agrees without using either half.

**FULL L4 Q2, `d = 1179`:** audited in the previous pass and re-confirmed as
sound — Berlekamp–Massey linear complexity 1179 on 4000 terms for the lower
bound; a monic CRT-lifted order-1179 recurrence verified for 2821 consecutive
equations, with `2821 ≥ 2691` forcing it forever by Cayley–Hamilton, for the
upper; plus exact integer vector annihilation with zero residual.

---

## C. Observability indices — **PASS on arithmetic, with a structural caveat**

Family counts reproduced independently: `g₁ = 6`, `g₂ = 51`, `g₃ = 345`,
`g₄ = 1796`. Ranks reproduced with my own mod-p elimination, not the C++ path.

| m | `g_m` | `⌈d/g_m⌉` | rows at `t−1` | rank at `t` | `ν_m` | previous slice ruled out by |
|---:|---:|---:|---:|---:|---:|---|
| 1 | 6 | 197 | 1176 | 1179 | 197 | **row count alone** |
| 2 | 51 | 24 | 1173 | 1179 | 24 | **row count alone** |
| 3 | 345 | 4 | 1035 | 1179 | 4 | **row count alone** |
| 4 | 1796 | 1 | — | 1144 at `t=1`; 1179 at `t=2` | 2 | exact rational rank 1144 |

I reproduce the `m = 3` static rank 329, matching the shipped staircase
`329, 651, 973, 1179`.

**Structural caveat that the manuscript should state.** In 10 of the 15 tested
pairs — every pair with `g_m < d` — the lower bound `ν_m ≥ ⌈d/g_m⌉` is pure
arithmetic and needs no computation. The only computational content there is
that full rank *is* reached the moment enough rows exist. The genuinely
contentful cases are the five with `g_m ≥ d`, where a static measurement is
row-count-permitted:

| instance | `m` | `g_m` | `d` | static suffices? |
|---|---:|---:|---:|---|
| BAL3 L4 Q1 | 2 | 8 | 4 | yes |
| BAL3 L4 Q1 | 3 | 16 | 4 | yes |
| FULL L4 Q1 | 3 | 345 | 153 | yes |
| INTERIOR L5 Q1 | 3 | 98 | 72 | yes |
| HASH30 L4 K5 | 2 | 71 | 47 | yes |
| **FULL L4 Q2** | **4** | **1796** | **1179** | **no — rank 1144** |

So the honest failure rate is **1 in 6 among the cases that could have failed**,
not 1 in 15. Reporting "14/15" mixes ten arithmetically forced rows with five
substantive ones and inflates the apparent regularity.

---

## D. Row-count optimality — **GENERIC LINEAR ALGEBRA EFFECT**

### The theoretical prediction

`V_cnt` is by definition the cyclic subspace generated by `1`, and its minimal
polynomial has degree `d = dim V_cnt`. So `Q|_{V_cnt}` is **non-derogatory**, and
`V_cnt*` is a cyclic `k[x]`-module of dimension `d`. The rows of `O_{m,t}` are
the classes `x^j c_i` for `i ≤ g`, `j < t`. For generic covectors `c_1,…,c_g` in
a cyclic module of dimension `d`,

```
dim span{ x^j c_i : j < t, i ≤ g } = min(tg, d),
```

hence `ν = ⌈d/g⌉`. **Row-count optimality is exactly what genericity predicts
for a cyclic operator.** Conformance is the null hypothesis; only deviation
carries information.

### The null control

I replaced the profile partition by a **random** partition of the same 218,298
raw histories with the same number of families and the same family-size
distribution, and recomputed at `t = ⌈d/g_m⌉`, three seeds:

| m | `g_m` | `⌈d/g⌉` | profile rank at `t` | random ranks at `t` |
|---:|---:|---:|---:|---|
| 1 | 6 | 197 | 1179 | 1179, 1179, 1179 |
| 2 | 51 | 24 | 1179 | 1179, 1179, 1179 |
| 3 | 345 | 4 | 1179 | 1179, 1179, 1179 |
| 4 | 1796 | 1 | **1144** | **1179, 1179, 1179** |

Two conclusions, both sharp:

1. **At `m = 1, 2, 3` the profile measurement and a structureless random
   partition of the same shape have identical observability indices.** The
   optimality carries no Abelian information whatsoever.
2. **At `m = 4` the profile measurement is *worse* than random.** Random
   partitions achieve `ν = 1`; the profiles need `ν = 2`. The anomaly is a
   deficiency of the structured descriptor, not a structure it possesses.

### Confound checklist requested

| confound | verdict |
|---|---|
| automatic from cyclicity of `V_cnt`? | **yes, essentially** — cyclicity is what makes `⌈d/g⌉` the generic value |
| automatic for a generic measurement? | **yes** — confirmed by direct null control |
| profile rows close to random after quotienting? | **yes at m = 1,2,3** — indistinguishable in this statistic |
| recency gauge artificially maximizes independence? | not needed as an explanation; random unlabelled partitions do equally well |
| same result for random partitions of matched size distribution? | **yes**, 3/3 seeds at every depth |
| transient/initialization effect? | partly — see §F; 6 of the 35 hidden dimensions are transient, 29 are persistent |
| HASH30 fixed-orientation control comparable? | yes, and it is the right control for an asymmetric library; it behaves like the others |
| other natural structural measurements that fail badly? | not tested here; the one that fails is the true-grid policy |

**Classification: GENERIC LINEAR ALGEBRA EFFECT.**

Not "mixture": the mixture reading would require the conformances to carry
*some* Abelian signal, and the null control shows they carry none. The single
non-generic datum is the `m = 4` failure, and §E shows that it is not Abelian
either.

---

## E. The unique Q2 exception — **the mechanism is one bit of phase**

### The linear algebra is correct

`rank[M₄; M₄Q]|_V = dim V − dim(V ∩ ker M₄ ∩ ker M₄Q) = 1179 − dim(H₄ ∩ ker M₄Q)`.
So `rank = 1179` **is** `H₄ ∩ ker(M₄Q) = {0}`. Valid, and it is rank–nullity, nothing more.

The exact static rank 1144 is now genuinely certified: 652 row relations, each
carrying a nonzero coefficient on its own unique dependent family row and
otherwise only the fixed 1144 pivot rows — hence independent — verified against
all 1179 exact integer future columns with zero residual. That gives
`rank_ℚ ≤ 1796 − 652 = 1144`, and modular rank 1144 gives the reverse. **This
closes the gap I flagged in the previous audit. PASS.**

The minimal-static-repair bound is also correct: `k` added rows raise rank by at
most `k`, so `k ≥ 35`, and 35 phase-contrast rows attain it.

### What the anomaly actually is

The v2.6 grid document reports that all 15 successful anchor policies split
every one of the 1228 phase-mixed grid families, and that this set is exactly
their common intersection. That points at the mechanism, and it is decisive when
tested directly. I adjoined the single bit `|s| mod 4` to the true-grid
four-profile measurement:

| measurement | families | full rank | gap / 1179 | persistent rank | gap / 1167 |
|---|---:|---:|---:|---:|---:|
| m = 4 true grid | 1796 | 1144 | 35 | 1138 | 29 |
| **m = 4 true grid + phase bit** | 3024 | **1179** | **0** | **1167** | **0** |

I independently reproduce the 1228 phase-mixed families out of 1796.

And the phase is not an abstract label. Measured directly:

```
phase 0  ->  state lengths {4, 8, 12, 16, 20}   (119,430 histories)
phase 1  ->  state length  {21}                 ( 98,868 histories)
```

The memory is the sliding suffix `z[-21:]`. Phase 0 is every state whose word is
shorter than the memory — the start of a word, before the window saturates.
Phase 1 is the saturated regime. **The true-grid descriptor is the unique policy
in the 16-policy class that cannot tell a pre-saturation state from a saturated
one**, because re-aligning to the true block grid is exactly what discards that
distinction.

So the honest reading of the headline:

> The 35 "invisible future directions" are one bit of bookkeeping about where
> the retained memory window starts relative to the block grid. One block step
> reveals it because a block step saturates the window.

That is a property of the **memory model**, not of Abelian avoidance.

### Static–dynamic duality

`R₃₅|_{H₄}` and `M₄Q|_{H₄}` are both injective on the same 35-dimensional space,
so they are two coordinate systems on it. This is true and it is a restatement
of rank–nullity, exactly as the document itself concedes. It is not a
theorem-level statement. It should be a remark.

One caution on "35 is the exact minimal static repair": minimal **in added
rows**. Informationally the repair is *one bit*, which as a partition refinement
happens to add 1228 rows. Row count and information content are being used
interchangeably in the current text, and they disagree by three orders of
magnitude here.

---

## F. Persistent versus full space — **state both; the effect is not transient-only**

| space | `dim` | m=4 static rank | gap |
|---|---:|---:|---:|
| full future | 1179 | 1144 | 35 |
| persistent | 1167 | 1138 | 29 |

29 of the 35 hidden dimensions are persistent, 6 transient. The two-time stack
reaches full rank 1167 on the persistent block as well. So the phenomenon is
**not** a transient artefact of `V_cnt`, and stating it on the full space is not
misleading in that specific sense.

But note the tension with §E: the *mechanism* is a distinction between
pre-saturation and saturated states, which is a start-of-word effect, while the
*hidden subspace* is mostly persistent. Both statements are true and the
manuscript should carry both. Report the spectrum on **both** spaces.

---

## G. Novelty boundary — narrower than the paper's own narrow claim

Excluded from any novelty claim, as the document already states: observability
matrices and indices, row-count lower bounds, Krylov/Hankel dimension, delayed
measurements, generic full-rank/transversality, static–dynamic coordinate
equivalence.

The remaining question was whether an exact, near-row-count-optimal space–time
spectrum for coarse Parikh-profile measurements is a new combinatorial
phenomenon.

**On the present evidence, no.** The near-optimality is reproduced by random
partitions, so it is not a property of Parikh profiles; and the single deviation
is a phase-blindness of the memory encoding, so it is not a property of Abelian
avoidance either. What survives as genuinely Paper-6-specific is what survived
the previous audit:

| item | status |
|---|---|
| exact `d = 1179` and the semantic hierarchy | **PLAUSIBLY NEW, system-specific** |
| exact `d` for the four Q1/K5 instances | **PLAUSIBLY NEW, system-specific** |
| exact `rank_ℚ M₄ = 1144` with a 652-relation certificate | **PLAUSIBLY NEW, system-specific**; the certificate construction is a genuine piece of work |
| count-equivalent / non-equitable pair | **PLAUSIBLY NEW, system-specific** |
| the spectrum `197, 24, 4, 2` | **GENERIC** — reproduced by random partitions |
| row-count optimality at `m = 1,2,3` | **GENERIC** |
| the 35-dimensional latent sector | **NOT ABELIAN** — one bit of memory phase |
| static–dynamic duality | **CLASSICAL** — rank–nullity |
| 15/16 anchor-policy theorem | **real, and the most interesting item**: it identifies phase-mixing as the discriminant |

---

## H. Verdict

### 1. v2.5 Q2 theorem — **NEEDS CLOSURE**

Every stated number is correct and the certificates are valid. The theorem
fails as *stated* only in its interpretation: `ν₁,ν₂,ν₃` are presented as
"time-optimal" structural facts when they are the generic values, and `ν₄ = 2`
is presented as an Abelian latent sector when it is a memory-phase artefact.
Nothing needs recomputing; the framing needs replacing.

### 2. v2.6 cross-instance theorem — **NEEDS CLOSURE**

The four target dimensions are now independently exact (§B) and the ranks
reproduce. But the cross-instance table is offered as replication of a
phenomenon, and the phenomenon it replicates is genericity. Ten of its fifteen
rows are arithmetically forced. It is a correct table that does not support the
inference drawn from it.

### 3. Strongest manuscript-safe Main Theorem

> **Theorem.** Let `B` be the full length-4 aa2fr selected library, `Q` its exact
> 2691-state weighted equitable transition operator at block range 2
> (`K_max = 11`), and `V = span_ℚ{Q^n 1 : n ≥ 0}` the statewise
> continuation-count space. Then `dim_ℚ V = 1179`, with transient part 12 and
> persistent part 1167.
>
> For `m = 1,…,4` let `M_m` be the raw-history family-sum measurement given by
> the `m` most recent recency-gauged, block-grid-aligned length-4 Parikh
> profiles, realizing `g_m = 6, 51, 345, 1796` families, and let `ν_m` be the
> least `t` with `rank_ℚ [M_m; M_mQ; …; M_mQ^{t−1}]|_V = 1179`. Then
> `ν_m = 197, 24, 4, 2`.
>
> For `m = 1,2,3` these coincide with the elementary row-count bound
> `⌈1179/g_m⌉`, which is also attained by random partitions of the same family
> sizes; no structural property of the profiles is asserted.
>
> For `m = 4` the measurement is exceptional: `rank_ℚ M₄|_V = 1144` exactly,
> certified by 652 independent rational row relations verified with zero
> residual against all 1179 integer future columns, so `V ∩ ker M₄` has exact
> dimension 35 (29 of them persistent). Adjoining the single memory-origin bit
> `|s| mod 4` raises the rank to 1179, and among the 16 natural anchor policies
> the block-grid policy is the unique one that fails — precisely the unique one
> that does not separate the two memory-origin phases.

Everything in that statement is certified, and nothing in it claims a phenomenon
the null control refutes.

### 4. Strongest remaining objection

> *You have measured the observability of a bookkeeping choice.* The state space
> mixes pre-saturation histories (lengths 4–20) with saturated ones (length 21),
> and your unique anomaly is exactly the failure to distinguish them. Restrict
> to the recurrent part of the automaton — where every state is saturated — and
> the anomaly plausibly disappears, leaving a spectrum that random partitions
> reproduce. At that point Paper 6's space–time theorem contains no fact about
> Abelian avoidance at all: it is an exact computation of `dim V` for one finite
> system, wrapped in classical observability language.

I could not refute this objection with the material in the checkpoint, and it is
cheap for the authors to settle.

### 5. The one next experiment

**Recompute the full spectrum on the recurrent state space alone**, where every
state is memory-saturated and the phase bit is constant, and in parallel on one
further `(L, B)` instance.

- If the 35-dimensional sector **disappears**, the single non-generic datum in
  the whole package was a start-of-word artefact, and the paper should be
  rebuilt around the exact hierarchy and the certificate technology rather than
  around a space–time spectrum.
- If it **survives** on the recurrent part, there is a real descriptor
  degeneracy to explain, and the right target becomes the 15/16 anchor-policy
  result — *which structural property of a window policy makes it complete* —
  with phase-mixing as the current candidate answer.

This is decidable with the machinery already in the checkpoint
(`p6_semantics_audit.py` already computes the recurrent set) and it separates
the two hypotheses in one run. It should be done before any further
generalization work.
