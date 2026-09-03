# Paper 6 — adversarial referee audit of checkpoint v2.3

**Auditor role:** hostile independent referee / research auditor
**Artifact:** `PAPER6_ESSENTIAL_RESEARCH_CHECKPOINT_v2.3_2026-08-30.zip`
SHA-256 `aadfeb37d33d2782b419a7c2a7ffe84e2836b7a24dd94e75c1746f2ebdbd04dc`
**Date:** 2026-08-30
**Method:** independent re-derivation and re-computation. FT1/FT2/gauge were
re-verified in JavaScript written from the theorem statements alone, sharing no
code path with the checkpoint. Rank claims were re-computed with an
independently written mod-p elimination and additional primes. The shipped
replays were also run as-is.

---

## 0. Headline

The exact certificate chain is **sound** and reproduces exactly. FT1, FT2 and
the `S_2 ↔ ε` identity are **correct**. The v2.3 "rigor correction" about
modular ranks is **already the right call**.

The audit nevertheless produces one finding that the checkpoint does not
anticipate and that materially weakens its central narrative:

> **An equally simple descriptor — the four length-4 windows anchored at
> offset 0 of the stored 21-character suffix, with no adjacency bit at all —
> achieves exact rational rank 1179/1179 and 1167/1167.**
> Verified over five primes. The bit is therefore not canonical, and the
> "geometry predicts the decoration" story does not survive as stated.

Grade of the mathematics: high. Grade of the *interpretation*: needs repair.

---

## 1. Reconstruction of the logical chain — PASS

| link | status |
|---|---|
| selected-library Abelian avoidance → weighted cutoff automaton | PASS (classical machinery, correctly used) |
| automaton → stable weighted equitable quotient (2691) | PASS |
| quotient → exact count classes (2689) | PASS, certified separately |
| quotient → exact future dimension 1179 = 12 + 1167 | **PASS, exactly certified** |
| bounded-defect / affine boundary geometry → `R_{k,1} = S_{2k-1} − 2S_{k-1}` | PASS as a definition; see §2.4 |
| fragment transport (FT1) | **PASS, independently verified** |
| fragment activation (FT2) | **PASS, independently verified** |
| recency gauge → `S_2 ↔ ε` | **PASS, exact identity** |
| FULL-L4/Q2 staircase K9/K10/K11 → S_0/S_1/S_2 | PASS as indexing; see §3 |
| `4 profiles + S_2` ⇒ exact observability | **PASS, exact** |
| `S_2` is *the* required decoration | **FAIL — see §5** |

---

## 2. Line-by-line audit of the theorem seed

### 2.1 FT1 — matched-block fragment transport — **PASS**

Claim: for `|U| = qL`, `δ_m(sU,tU) = 0` for `m ≤ qL` and `δ_{m−qL}(s,t)` for `m > qL`.

Independently brute-forced over all histories of length 0–6 on a ternary
alphabet, `L ∈ {1,2,3,4}`, `q ∈ {1,2}`, sampled continuations, all `m`:

```
FT1: 964,426,038 instances, failures = 0
```

Boundary cases:
- `m = qL` is consistent across both branches, since `δ_0 = 0`. No ambiguity.
- Empty fragments (`m = 0`) behave correctly.

**One missing hypothesis.** The proof text says the last `m` symbols "consist
of the same `qL`-symbol continuation preceded by the final `m−qL` symbols of the
original histories". That requires `|s|, |t| ≥ m − qL`, or the saturation
convention `suf_n(w) = w` for `n ≥ |w|`. Under saturation the identity holds
unconditionally (this is what I verified). **NEEDS CLOSURE (editorial):** state
the convention explicitly in §1 of the seed.

### 2.2 FT2 — remainder-fragment activation — **PASS**

Claim: for `k = qL + r`, `1 ≤ r < L`,
`R_{k,1}(sU) − R_{k,1}(tU) = δ_{qL+2r−1}(s,t) − 2δ_{r−1}(s,t)`.

Substitutions checked by hand:
- `2k−1 = 2qL + 2r − 1 > qL` for all `q ≥ 1, r ≥ 1` ⇒ first term
  `δ_{2k−1−qL} = δ_{qL+2r−1}`. ✔
- `k−1 = qL + r − 1 ≥ qL` since `r ≥ 1`. At `r = 1` this is exactly `m = qL`,
  landing on the zero branch, and the claimed value `δ_{r−1} = δ_0 = 0` agrees. ✔
  No off-by-one.

Independently brute-forced, `L ∈ {2,3,4,5}`, `q ∈ {1,2}`, all `1 ≤ r < L`:

```
FT2: 119,464,900 instances, failures = 0
```

**Hypothesis is not tight.** Only `r ≥ 1` is used; `r < L` is Euclidean
bookkeeping. I verified the identity also holds at `r = L`
(9,557,192 instances, 0 failures). Harmless, worth a remark.

### 2.3 What FT2 proves, and what it does not — **the key scope point**

FT2 proves an **identity**, namely that after `q` matched blocks the future
`j=1` requirement difference decomposes as

```
deep term  δ_{qL+2r−1}(s,t)      −  2 · shallow term δ_{r−1}(s,t).
```

It therefore establishes that `S_{r−1}` is **a geometrically available input
channel** with coefficient `−2`.

It does **not** establish that `S_{r−1}` is:
- necessary for observability;
- non-redundant given the deep term `δ_{qL+2r−1}`;
- the unique or canonical decoration.

The seed says this in §4 and is right to. But note a point the seed does not
make: the deep term is at depth `qL + 2r − 1 = 13` at K11, which is **not**
determined by the four block profiles either. So FT2's own decomposition
already shows the profile family is not closed under the channel it exposes.

**Verdict: FT2 is an activation-availability theorem, not a necessity
theorem.** Any manuscript sentence implying otherwise must be removed.

### 2.4 `R_{k,1} = S_{2k−1} − 2S_{k−1}` — **NEEDS CLOSURE**

This is asserted to "follow directly from the general Paper-6 boundary-affine
formula", which is not reproduced in the checkpoint. Everything downstream
depends on it. A referee cannot check it here. **Fix:** include the derivation,
with its hypotheses (which `j`, which crossing configuration, and what happens
when the square straddles more than one block boundary).

### 2.5 Recency gauge and `S_2 ↔ ε` — **PASS (exact)**

Independently verified on all 1089 ternary histories of length 2–6:

```
S_1 ≠ (1,0,0):                              0
S_2 mismatch against ε:                     0
S_2 outside {(2,0,0),(1,1,0)}:              0
observed S_2 values: (2,0,0) | (1,1,0)
```

The identity is exact, as claimed.

**Well-definedness gap — NEEDS CLOSURE.** The gauge names the "second-most
recent distinct symbol" and the "third". For histories not containing all three
letters these are undefined; the shipped code breaks the tie by an arbitrary
`"abc"` fallback. This does not affect `S_1` or `S_2`, but it does affect the
block profiles. State the tie-break in the theorem, or restrict the gauge's
domain.

### 2.6 FULL-L4 / q=2 staircase — **PASS as indexing**

`k = 2·4 + r`, `r ∈ {1,2,3}` ⇒ `k ∈ {9,10,11}` and activated depth `r−1 ∈
{0,1,2}`. Reproduced. The recency gauge kills `S_0` and `S_1`, so K11 is
indeed the first `q=2` cutoff exposing a non-constant gauged fragment.

This is a correct **coincidence of indices**. It is not, by itself, evidence
that the fragment is what closes the observability gap. §5 shows it is not.

---

## 3. Theorem versus explanation — **the strict answer**

> *Does FT2 prove that `S_2` is necessary at K11 for future observability, or
> does it only identify `S_2` as a geometrically available future input channel?*

**It only identifies an available channel.** Strictly:

1. FT2 is an identity about affine requirement differences. Nothing in it
   quantifies over measurement families or ranks.
2. The rank evidence cannot supply necessity either, because of the direction
   of the modular inequality — see below.
3. And §5 exhibits a descriptor with no bit at all that attains the same exact
   rank, which refutes necessity outright.

### The modular-rank direction — the checkpoint is right, and can be stated harder

`rank_p(M) ≤ rank_ℚ(M)`. The profile-only result `1144` mod 65521 and 65519
therefore gives only

```
rank_ℚ(profile-only) ≥ 1144.
```

It is **formally consistent with `rank_ℚ = 1179`**, i.e. with the profile-only
measurement already being complete over ℚ and both primes being unlucky. Two
primes make that implausible, not impossible.

The checkpoint's §9 says exactly this and refuses the upper bound. **PASS on
rigor.** But its proposed manuscript wording —

> "profile-only measurements are strongly rank-deficient in two independent
> modular reductions"

— still invites the wrong reading. A reader takes "rank-deficient" as a fact
about the rational rank.

**Strongest manuscript-safe statement available today:**

> Over `𝔽_{65521}` and `𝔽_{65519}` the profile-only family measurement has rank
> 1144 and the `S_2`-decorated measurement has rank 1179. Since modular rank
> bounds rational rank only from below, these computations certify
> `rank_ℚ ≥ 1144` for the profile-only measurement and, combined with the
> independently exact target dimension 1179, certify `rank_ℚ = 1179` exactly
> for the decorated one. No rational upper bound for the profile-only
> measurement has been certified, so the profile-only measurement is **not**
> proved incomplete.

I have added five primes (65521, 65519, 1000003, 999983, 2147483647); all give
1144. This strengthens the evidence and changes nothing about its logical type.

**Concrete closure task (cheap, decisive):** exhibit one explicit nonzero
integer vector `u ∈ ℤ^1179` with `M_profile · K_{1179} · u = 0` verified in exact
integer arithmetic. That gives `rank_ℚ ≤ 1178 < 1179` and converts the whole
claim to a theorem. Route: nullspace mod several primes → CRT + rational
reconstruction → exact Horner verification `Σ u_i Q^i 1` with Python big ints
(the shipped `p6_q2_vector_krylov_exact_cert.py` already demonstrates that this
scale of exact verification runs in ~3.5 s).

---

## 4. Observability certificates — **PASS**

### 4.1 The exactness logic is valid

The argument is:

1. all matrices integer;
2. full rank 1179 mod an odd prime ⇒ a nonzero 1179×1179 integer minor ⇒
   `rank_ℚ ≥ 1179`;
3. the **domain** `V_cnt` has exact rational dimension 1179, so `rank_ℚ ≤ 1179`;
4. hence exactly 1179.

Step 3 is the load-bearing one and it is genuinely certified:

- **Lower bound:** Berlekamp–Massey linear complexity 1179 on 4000 terms
  (> 2·1179) reduced mod 1000000009 and 11 further primes ⇒ nonzero Hankel
  minor ⇒ `≥ 1179`. Valid.
- **Upper bound:** a CRT-lifted **monic** (`C[0] = 1`, checked) integer
  recurrence of order 1179, verified exactly for 2821 consecutive equations.
  Since the error sequence is generated by the 2691-dimensional quotient and
  `2821 ≥ 2691`, Cayley–Hamilton forces it forever. Valid.
- **Vector version:** `Σ_j C[d−j] Q^j 1 = 0` verified in exact integer
  arithmetic, `nonzero_coordinates = 0`, `max_abs_residual = 0`. I re-derived
  the accumulation order and it matches the stated identity. Valid.

**Verdict: the "exact rational" label on 1179/1179 and 1167/1167 is earned.**

### 4.2 Reproduction

The shipped replay was run unmodified:

```
no_bit 1144 | one_bit 1179 | full_age 1179 | persistent 1167   (both primes)
```

Exact match to the certificate. **PASS.**

### 4.3 Raw-history aggregation and leakage — **PASS**

The aggregation is built from the **218,298 raw histories**, each mapped to its
equitable class, not from quotient representatives. This is precisely the repair
the earlier failed "quotient-representative profile theorem" needed.

The seed §9 also makes the correct conceptual retreat:

> "predictive state ≠ complete observable coordinate system"

and states explicitly that the label need not define an autonomous history
quotient. **The earlier gauge issue is genuinely fixed.** PASS.

**Residual caution (minor):** because the theorem is about *family sums*, it is
weaker than a sufficient-statistic claim, and the manuscript must never let the
phrase "structural observability" drift back toward "state". The current text
is disciplined; keep it that way.

### 4.4 Overflow and correctness of the shared rank routine — **PASS**

- `Q` has max entry 11 and max row sum 21; with `v < p ≤ 65521`, `Q·v ≤ 1.4e6`.
  No int64 overflow at the primes used.
- I unit-tested the shipped `rank_mod` against an independent GF(p) row
  reduction on 200 random matrices over `p ∈ {7,11,101}`: **0 mismatches**.
  (My first pass flagged four "suspect" cases at `p = 2^31−1`; those were
  overflow in *my test-data generator*, not in `rank_mod`. Recorded as a
  disproved suspicion.)

---

## 5. Implementation independence — **FAIL, and it matters**

### 5.1 There is exactly one rank implementation

`rank_mod` is **character-for-character identical** (up to whitespace) across:

- `p6_q2_recency_frame_onebit_observability_replay.py`
- `p6_q2_recency_frame_onebit_observability_fast_replay.py`
- `p6_structural_observability_cross_instance_replay.py`
- `p6_structural_observability_cross_instance_fast_replay.py`

Every rank number in every certificate flows through this one routine. The
"two primes" replication tests the *arithmetic*, not the *algorithm*.

### 5.2 The "fast replay" is not an independent check

`..._fast_replay.py` loads **precomputed** `G0`, `G1` from `.npz` and skips
descriptor construction entirely. It shares the Krylov builder and the rank
routine. It is a caching optimisation, not a replication: **any descriptor-side
bug is invisible to it.** Do not cite it as independent corroboration.

**Fix:** one genuinely independent rank path (e.g. Wiedemann/Lanczos over
`𝔽_p`, or `sympy`/`galois`, or a C++ path — `rank_mod_u16.cpp` is shipped but
unused by the replays), and one descriptor rebuild from raw states in a second
language. Report the independence axes per `EPISTEMIC_DISCIPLINE.md` §5 rather
than as a binary.

### 5.3 Block-boundary alignment — **suspicion raised, then DISPROVED**

I initially flagged `recent_four_profiles` for computing `r = len(t) % 4` and
blocking from that offset, which for the 98,868 length-21 states windows
positions `[5,21)` rather than `[4,20)`.

**This is not a bug.** Reading the generator (`p6_semantics_audit.py`, lines
30–40): `mem = max(2K−1,3) = 21`, and the state is the sliding suffix
`z[-mem:]`. Words are multiples of `L = 4`, so `|z| − 21 ≡ 3 (mod 4)` always,
and the true block grid inside the stored window starts at index **1** —
exactly what `len(t) % 4 = 1` recovers. The shipped windowing is correct for
every state length in `{4,8,12,16,20,21}`.

Recorded here so it is not re-raised. **DISPROVED.**

---

## 6. The decisive experiment — **FAIL for the narrative**

Because FT2 cannot supply necessity, I tested whether `ε` is special at all.
All runs use the shipped data, my own descriptor builders, my own rank routine.

### 6.1 Alternative decorations (2 primes)

| descriptor | groups | rank | gap |
|---|---:|---:|---:|
| profiles only | 1796 | 1144 | 35 |
| + `ε[s₋₁=s₋₂]` (FT2's `S_2`) | 2083 | **1179** | 0 |
| + `ε[s₋₁=s₋₃]` (not predicted) | 2165 | **1179** | 0 |
| + `ε[s₋₂=s₋₃]` (not predicted) | 1985 | **1179** | 0 |
| + `S_3` fragment (FT2's K=12 channel) | 2072 | **1179** | 0 |

Three decorations that FT2 does **not** predict at K11 close the gap, one of
them with *fewer* groups than `ε`.

### 6.2 Null controls, and an honest correction

A pseudo-random hash bit also reached 1179 — but it split 1796 → 3588 groups,
so that control was **confounded by granularity**. I recorded this and ran a
granularity-matched control instead:

| control (2083 groups, matching `ε`) | rank |
|---|---:|
| `ε` (FT2's `S_2`) | **1179** |
| arbitrary split of 287 *randomly chosen* families, seeds 1–5 | **1144, 1144, 1144, 1144, 1144** |
| arbitrary bit splitting exactly the 287 families `ε` splits, seeds 11–13 | **1179, 1179, 1179** |

This is informative in both directions:

- **Granularity alone does not close the gap.** Five matched random splits add
  *exactly zero* rank. `ε` is not a generic refinement.
- **But the labelling inside `ε`'s families is irrelevant.** Splitting the same
  287 families with an arbitrary bit also gives 1179. So `ε`'s content is
  *which families need refining*, not *how*.

### 6.3 The finding that breaks the narrative

| descriptor | groups | rank (5 primes) | persistent |
|---|---:|---|---|
| shipped 4 profiles (correct grid) | 1796 | 1144 ×5 | 1138 ×5 |
| shipped 4 profiles + `ε` | 2083 | 1179 ×5 | 1167 ×5 |
| **4 windows anchored at offset 0 of the stored suffix, no bit** | **2452** | **1179 ×5** | **1167 ×5** |

The third descriptor is a legitimate function of the state (it reads only the
stored 21 characters). It is *deliberately misaligned* with respect to the block
grid, it **cannot see the last character at all** for length-21 states, and it
attains exact rational 1179/1179 and 1167/1167 **with no adjacency bit**.

Primes: 65521, 65519, 1000003, 999983, 2147483647 — all 1179. Combined with the
exact target dimension this is an **exact rational** result, not modular
evidence.

**Consequences.**

1. `S_2` is **not necessary**. Necessity is refuted, not merely unproved.
2. The `whole-block bulk ⊕ cut fragment` decomposition — the conceptual spine of
   the programme — is **not privileged**: a boundary-straddling window with no
   fragment does strictly better than the aligned window with one.
3. FT3's staircase explains why `S_2` is the first non-constant gauged fragment
   at K11. It does **not** explain the observability gap, because the gap is an
   artefact of one particular windowing choice.

---

## 7. Cross-instance evidence — **PASS as falsification, does not support the hypothesis as a theorem**

The replication matrix is well designed and the HASH30 negative control is real
science: over-gauging by a symmetry the library does not have loses exact
information (47 → 41), and restoring the true trivial gauge recovers it. That
genuinely establishes the **`G_B`-aware gauge** component.

Two cautions.

**(a) Several table entries are rank-saturated by group count and carry no
information.** BAL3 with one profile: 3 groups, rank 3. FULL-L4-Q1 with one
profile: 6 groups, rank 6. Two profiles: 51 groups, rank 51. Whenever
`rank = #groups`, the measurement has simply hit the trivial bound. Report
`min(#groups, dim V)` beside every rank so the informative rows are visible.

**(b) The evidence does not support the conjunction as a law.** Across
instances the required depth varies (2, 3, 3, 4) and the bit is needed in
exactly one instance — the one that §6.3 now shows did not need it either.
The honest reading of the matrix is the one the matrix itself states:

> "The one-bit correction is specific to the harder FULL_L4_Q2 calibration…
> it is not a universal axiom."

**Alternative explanations not excluded by the current data:**

1. **Windowing artefact** (now demonstrated, §6.3) — the gap tracks the choice
   of 16-character window, not Abelian geometry.
2. **Gauge repair** — the HASH30 row shows the bit acting as partial repair of
   information destroyed by canonicalization (41 → 44 of 47). The same
   mechanism can explain FULL-L4-Q2 without any fragment story.
3. **Small-instance saturation** — see (a).

---

## 8. Literature and novelty — **PASS on discipline, classification below**

The shipped literature audit is unusually honest: it refuses to infer novelty
from absence, lists what must not be claimed, and names the further databases
required. I agree with its framing and with almost all of its classification.

| Paper-6 contribution | my classification |
|---|---|
| weighted cutoff transfer matrix, Perron growth | **CLASSICAL** |
| Hankel/Krylov minimal future dimension | **CLASSICAL** |
| observable / dual measurement coordinates, PSR/OOM | **CLASSICAL** |
| recency alphabet frame (move-to-front) | **CLASSICAL** |
| Abelian bulk + bounded boundary correction | **DIRECT SPECIALIZATION** (Currie–Rampersad templates, Rao–Rosenfeld) |
| FT1 fragment transport | **DIRECT SPECIALIZATION** — a one-line suffix-Parikh cancellation; do not present as a theorem |
| FT2 activation identity | **DIRECT SPECIALIZATION / SYNTHESIS** — correct and useful bookkeeping, but elementary |
| `S_2 ↔ ε` under recency gauge | **DIRECT SPECIALIZATION** — exact but immediate |
| exact Q2 hierarchy 218298 → 2691 → 2689 → 1179 = 12+1167 | **PLAUSIBLY NEW (system-specific)** — and the strongest asset in the checkpoint |
| count-equivalent but non-equitable pair certificate | **PLAUSIBLY NEW (system-specific)** |
| latent persistent-injection counterexamples | **PLAUSIBLY NEW (system-specific)** |
| `G_B`-aware gauge necessity (HASH30 control) | **SYNTHESIS**, well evidenced |
| "four profiles + one bit" as *the* structural descriptor | **NOT YET ESTABLISHED — and now refuted as canonical** |
| general symmetry-gauged profile-fragment observability | **NOT YET ESTABLISHED** |

**One process note.** The audit's self-assigned grade ("8.9–9.2/10") is not a
referee-usable signal and conflicts with `EPISTEMIC_DISCIPLINE.md` §6. Drop it.

---

## 9. Strongest referee objections

| # | objection | class |
|---|---|---|
| 1 | An unaligned four-window descriptor achieves the same exact 1179/1167 with no bit, so the central "profiles + geometry-activated fragment" story is not supported by the calibration it rests on | **FATAL to the narrative; the exact theorem survives** |
| 2 | Profile-only incompleteness is asserted from modular ranks whose inequality runs the wrong way; no rational upper bound exists | **major but repairable** — one exact kernel witness closes it |
| 3 | `R_{k,1} = S_{2k−1} − 2S_{k−1}` is used throughout but never derived in the checkpoint | **major but repairable** |
| 4 | One rank implementation and one descriptor path underlie every number; the "fast replay" is not independent | **major but repairable** |
| 5 | FT2 is presented as explaining the K11 decoration; it only exhibits an available channel, and §6 shows other channels work | **major but repairable** (rewrite as availability) |
| 6 | Whole result is one finite calibration (L4, full library, Q2) | **major** — acknowledged by the authors |
| 7 | Cross-instance rows where `rank = #groups` are uninformative but presented alongside informative ones | **minor** |
| 8 | Recency gauge undefined for histories missing a letter; tie-break only in code | **minor** |
| 9 | FT1 missing the suffix-saturation convention | **minor** |
| 10 | Self-assigned grade in a research document | **minor** |
| 11 | Earlier quotient-representative gauge error | **already closed by evidence** — v2.3 aggregates raw histories and retreats to family sums correctly |
| 12 | Exactness of 1179/1167 | **already closed by evidence** |
| 13 | Block-boundary misalignment | **already closed** — I raised it and disproved it (§5.3) |

---

## 10. Strongest defensible theorem package today

**(1) General proved theorems**
- FT1 (with the saturation convention stated).
- FT2 (only `r ≥ 1` needed).
- `S_2 ↔ ε` under the recency gauge, on histories where the gauge is defined.
- All three are elementary; present them as lemmas, not headline theorems.

**(2) Exact finite-system theorems** — *the real asset*
- FULL-L4/Q2 exact hierarchy `218298 → 2691 → 2689 → 1179 = 12 + 1167`,
  with the Berlekamp–Massey / CRT / Cayley–Hamilton / vector-annihilation chain.
- Exact count-vs-equitable separation with explicit witnesses.
- `4 recency-gauged profiles + S_2` ⇒ exact rank 1179/1179 and 1167/1167.
- **New, from this audit:** `4 offset-0 windows` alone ⇒ exact 1179/1179 and
  1167/1167, with no decoration.
- Latent persistent-injection counterexamples.

**(3) Modular evidence only**
- profile-only ranks 1144 / 1138 (lower bounds only);
- the K7–K10 staircase ranks;
- all cross-instance ranks.

**(4) Conjectures**
- symmetry-gauged profile-fragment observability (§11 of the seed) — the
  cross-instance data supports its *form*, not any formula for `m` or `R`.

**(5) Computational observations**
- the K9 fourth-profile event and the K11 event;
- `ε`'s 287 families being the ones that matter (§6.2).

**(6) Novelty hypotheses**
- exact selected-library semantic hierarchy;
- `G_B`-gauge necessity;
- Abelian-specific structural measurement — **not** the one-bit form.

---

## 11. Recommended next move — **pivot, but only slightly**

**Do not pursue** the general symmetry-gauged profile-fragment observability
theorem as currently framed. Its motivating calibration does not survive §6.3:
the descriptor family it generalizes is not the one that closes the gap, and a
simpler unaligned descriptor closes it with no fragment at all. Generalizing
from that base would be building on an artefact.

**Single recommended target — descriptor-invariance, not descriptor-derivation:**

> For the FULL-L4/Q2 system, characterise the set of *all* 16-character
> windowing/decoration descriptors that attain exact rank 1179, and determine
> what the successful ones have in common.

Why this is the right move:

- It is **decidable with data already in hand** — the same Krylov matrix, a few
  dozen more rank computations.
- It directly resolves whether the phenomenon is Abelian geometry or windowing
  combinatorics, which is the question a referee will ask first.
- It converts the strongest current asset (an exactly certified finite system)
  into a statement about *which* structural coordinates are complete, which is
  the genuinely publishable form.
- If a common structural invariant emerges, the general theorem becomes
  well-motivated. If none does, the paper is still strong as an exact
  semantic-anatomy result for a selected-library Abelian system — and that is a
  perfectly good paper.

**Prerequisite (cheap, do first):** the exact kernel witness of §3. Until
`rank_ℚ(profile-only) < 1179` is a theorem, the phrase "the profiles are
incomplete" cannot be written at all.

---

## 12. Verdict

| area | label |
|---|---|
| FT1, FT2, `S_2 ↔ ε` | **PASS** |
| exact 1179 / 1167 certificate chain | **PASS** |
| reproducibility of shipped replays | **PASS** |
| raw-history aggregation / earlier gauge repair | **PASS** |
| modular-rank discipline in v2.3 text | **PASS** |
| `R_{k,1}` derivation | **NEEDS CLOSURE** |
| rational upper bound for profile-only | **NEEDS CLOSURE** |
| implementation independence | **FAIL** |
| "S_2 is the required decoration" | **FAIL** |
| general observability conjecture as next target | **DO NOT PROCEED as framed** |

The mathematics that is certified is certified well. The story told about it is
not yet earned.
