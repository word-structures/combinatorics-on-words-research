# Paper 4 — sandbox report #3: boundary algebra, E-productivity, radius-1 shell

**Date:** 2026-08-28
**Scope:** sandbox only. No canonical Paper-4 file, manuscript, evidence artifact, branch or commit touched.
**Mäkelä:** OPEN. **Novelty:** NOT_ESTABLISHED. **Complete-AEF existence at L=40:** UNRESOLVED.
**L=40 impossibility:** NOT ESTABLISHED and not inferable from anything here.

---

## 0. Verification of the incoming evidence

`FROZEN_RECORD_2026-08-28.sha256`: **41 of 41 data artifacts verify**. The only two
mismatches were both the report file, which was edited after being hashed; it has been
re-stamped. All six stated claims re-verified from disk:

| # | Claim | Verified |
|---|---|---|
| 1 | 39 historical triples extinct by K=45 | ✅ first-bad-K `{41:4, 42:26, 44:5, 45:4}`, max 45 |
| 2 | 24 new-basin triples, 20 outside the canonical 39 | ✅ |
| 3 | New triples extinct at K=47, not 45 | ✅ `{45:4, 47:20}` |
| 4 | Strict-disjoint population empty | ✅ 0; all E canonical |
| 5 | 60 random E, exhaustive, 261,910 complete A, 0 hits | ✅ `exhaustiveOverFullAandFProfileClasses: true`, hits file 0 bytes |
| 6 | 63/63 minimal violations in `eafea`; K mod 40 ∈ {1,2,4,5,7} | ✅ cover `{eafea:63}`, K mod 40 `{1:4,2:26,4:5,5:8,7:20}` |

**Wording adopted throughout:** the object is the existential predicate
`P40(E) := ∃ profile-correct A,F such that (A,F) passes the complete-AF gate and (E,A,F)
passes the AEF gate through K ≤ 40`. E is a strong organizing variable; `P40(E)` still
depends on the existence of compatible A and F.

---

## 1. PHASE 1 — the boundary equations, derived

### 1.1 Derivation

With `L = 40`, `H(v)` a concatenation of `|v|` blocks, `S(q) = Σ_{j<q} m(v[j])` and
`p_x(t)` the Parikh vector of the length-`t` prefix of block `x`, position `p = Lq + t`
gives `P(p) = S(q) + p_{v[q]}(t)`. A factor `UV` at start `s` with `|U| = |V| = K` is an
Abelian square iff

```
P(s+2K) − 2P(s+K) + P(s) = 0.
```

Decomposing `s, s+K, s+2K` into `(q0,t0), (q1,t1), (q2,t2)` and separating:

```
[ S(q2) − 2S(q1) + S(q0) ]                            ← macro term  M
  +  [ p_{x2}(t2) − 2 p_{x1}(t1) + p_{x0}(t0) ] = 0   ← boundary term
```

giving the **normalized boundary equation**

```
p_{x2}(t2) − 2 p_{x1}(t1) + p_{x0}(t0) = −M .
```

A **boundary-equation class** is the deterministic key `((x0,t0),(x1,t1),(x2,t2),M)`.

### 1.2 The no-carry identity

When `t0 + 2r < 40` (so `q1 = q0+1`, `q2 = q0+2`), `M` telescopes:

```
M = S(q0+2) − 2S(q0+1) + S(q0) = m(v[q0+1]) − m(v[q0])
```

**Derived identity.** For `K = 40 + r` starting at offset `t` in block `q0` with
`t + 2r < 40`:

```
p_{v[q0]}(t) − 2 p_{v[q0+1]}(t+r) + p_{v[q0+2]}(t+2r) = m(v[q0]) − m(v[q0+1])
```

The required boundary displacement is `m(v[q0]) − m(v[q0+1])` — **independent of `t` and
`r`**. For `eafea` at `q0 = 0`:

```
p_E(t) − 2 p_A(t+r) + p_F(t+2r) = m(E) − m(A) = (−2, 2, 0)
```

### 1.3 Witness classification

All **63** witnesses (39 canonical + 24 new-basin) were assigned to classes:

- **7 distinct boundary-equation classes** explain all 63.
- **All 63 have role triple `eaf` and `q = (0,1,2)`.**
- **All 63 have the identical macro vector `M = (2, −2, 0) = m(A) − m(E)`.**
- Every witness satisfies `t1 = t0 + r`, `t2 = t0 + 2r` — i.e. all are in the no-carry
  regime, as the identity predicts.

| class `(E:t0 | A:t1 | F:t2)` | witnesses | population |
|---|---:|---|
| `e12 \| a19 \| f26` | 20 | new basins |
| `e11 \| a13 \| f15` | 16 | canonical |
| `e7 \| a12 \| f17` | 8 | **both** |
| `e24 \| a26 \| f28` | 6 | canonical |
| `e21 \| a25 \| f29` | 5 | canonical |
| `e26 \| a27 \| f28` | 4 | canonical |
| `e10 \| a12 \| f14` | 4 | canonical |

Concrete end-to-end check on witness `44daa453…`: cover `eafea`, `K = 44`, `r = 4`,
`s = 21`, `q = (0,1,2)`, offsets `(21,25,29)` satisfying `t+r, t+2r`; symbolic residual
`(0,0,0)`; direct half-Parikh `(18,14,12) = (18,14,12)`. ✅

### 1.4 Independent check — PASS

`phase1_independent_check.js` shares no code with the derivation: it rebuilds `H(v)` as an
actual string, slices both halves as substrings, counts letters directly, and compares
that boolean against the symbolic residual.

```
40 random profile-correct block triples × 2 covers × all (s,r) with K = 40+r
comparisons 252,720    agree 252,720    disagree 0
genuine Abelian squares exercised: 2,943   (so the test is not vacuous)
```

**The symbolic boundary equation is exactly equivalent to direct Parikh equality on every
tested `(v,s,r)`.**

### 1.5 Why every failure is in `eafea` — derived, not fitted

First, a hypothesis I tested and **refuted**: that smaller `|M|₁` makes the equation easier
to satisfy. Over 300 random profile-correct block triples the collision rate is **flat**:

| `\|M\|₁` | 4 | 8 | 12 | 40 |
|---|---|---|---|---|
| rate | 1.04e-2 | 1.36e-2 | 1.08e-2 | 1.02e-2 |

So `|M|₁` does not drive the phenomenon. The actual explanation is structural:

1. `eafea = E A F E A` and `fafea = F A F E A` **share blocks 1–4** (`afea`). Every
   3-block regime not touching block 0 is *identical* in both covers.
2. `fafea`'s block-0 regime `q=(0,1,2)` is the window `H(faf) = F A F` — **already
   certified clean for K ≤ 60 by the complete-AF gate**. It cannot produce a failure at
   K ≤ 60.
3. `fafea`'s only other low-`|M|₁` regime, `ffa` at `q=(0,2,4)`, is **first reachable at
   K = 61** (it needs two carries).
4. Therefore in the band **K ∈ [41,60]**, `eaf` at `q=(0,1,2)` in `eafea` is the *only*
   three-block window carrying a constraint that is both cover-specific and not already
   certified by an earlier gate.

Every observed first failure lies at K ≤ 47, inside that band. **This answers question C:
the K = 40+r failures collapse to one identity family, instantiated in 7 offset classes,
all in the single uncertified regime.**

*(Reporting note: the raw "cover = eafea" statistic alone would have been ambiguous, since
my scanner breaks ties toward the first cover. The equation-class assignment resolves it —
all 63 are genuinely in the eafea-specific `q=(0,1,2)` regime.)*

---

## 2. PHASE 2 — E-word productivity

All nine historical E words evaluated exhaustively (full A class; full F class per
surviving A):

| E idx | `P40(E)` | K≤40 hits | canonical | new | seconds |
|---:|---|---:|---:|---:|---:|
| 0 | true | 12 | 2 | 10 | 101 |
| 1 | true | 12 | 2 | 10 | 249 |
| 2 | true | 2 | 2 | 0 | — |
| 3 | true | 2 | 2 | 0 | 8 |
| 4 | true | 8 | 8 | 0 | 39 |
| 5 | true | 8 | 8 | 0 | 77 |
| 6 | true | 5 | 5 | 0 | 124 |
| 7 | true | 5 | 5 | 0 | 80 |
| 8 | true | 5 | 5 | 0 | 79 |
| **total** | **9/9** | **59** | **39** | **20** | |

**Reconciliation is exact: all 39 canonical triples rediscovered, 0 missing**, plus 20 new.

### 2.1 Correction to a claim I made earlier this session

I briefly reported "E[2] is unproductive; P40 is not uniform". **That was wrong.** It came
from reading `manifest.summary.aefK40Hits`, which counts *writes* to the append-only hits
file — and `pc_E2` was executed twice, so the second run's identical hits were deduplicated
and counted as 0. Recounting from the hits files themselves (the authoritative source)
gives 2 hits for E[2] and **P40(E) = true for all 9**. The summary field under-reports on
re-runs; the persisted data was correct throughout.

### 2.2 Exact E features — a negative result

Features chosen because they appear *in the Phase-1 equations* (prefix Parikh vectors),
not by arbitrary selection. Comparing the 9 historical E against the 60 random E from the
exhaustive-zero run:

| feature | historical (9) | random (60) |
|---|---:|---:|
| max prefix drift from linear | 3.294 | 3.127 |
| mean absolute drift | 3.194 | 3.075 |

**No separation.** Prefix-drift magnitude does not distinguish productive from
unproductive E. Question D is **not** answered by these features; the discriminator
remains unidentified.

The 9 historical E words are themselves tightly clustered — E[0]/E[1], E[2]/E[3],
E[4]/E[5] have identical prefix Parikh vectors at t = 10, 20, 30.

---

## 3. PHASE 3 — radius-1 profile-preserving shell

### 3.1 Exact shell size and a sound pre-filter

A single transposition of two unequal symbols preserves the profile `(13,16,11)` and gives
Hamming distance 2. Per seed: `C(40,2) − [C(13,2)+C(16,2)+C(11,2)] = 780 − 253 = **527**`.
Union over all 9 seeds, deduplicated: **4,670**.

Full closure of 4,670 was not affordable. Rather than sample and call it a census, a
**sound necessary pre-filter** was derived: `E` is a block of `H(eafea)`, so any Abelian
square inside `E` alone (necessarily `K ≤ 20`) is an AEF-gate violation. Hence

> `P40(E)` ⟹ `E` is Abelian-square-free for `K = 2..20`.

This reduces 4,670 → **35** candidates.

**Positive-control retention verified:** all 9 historical E are Abelian-square-free, and
**6 of them appear in the shell** (a historical E can be a transposition of another). All
6 are retained by the filter. The filter discards nothing that could be productive.

### 3.2 Exact closure — COMPLETE (35 / 35)

| | value |
|---|---:|
| candidates closed | **35 / 35** |
| **`P40(E)` true** | **6** |
| `P40(E)` false | 29 |
| K≤40 hits | 44 |
| — in canonical 39 | 24 |
| — new | 20 |
| strict-disjoint | **0** |
| E words outside the historical pool of 9 | **0** |

**The decisive observation: all 6 `P40`-true candidates are historical E words. All 29
radius-1 perturbations are `P40`-false — without exception.**

**Soundness of the negatives:** exactly one candidate hit a cap over the whole run (index 1,
F-level, 4.0×10⁸ nodes) — and it is `P40`-**true**, a verdict a cap cannot invalidate.
**All 29 `P40`-false verdicts were reached exhaustively**, with no A-level or F-level cap.
The run-level `exhaustive:false` flag refers solely to that one positive candidate.

Long-band diagnostic on the 44 hits: first-bad-K `{42:20, 45:4, 47:20}`, cover `eafea`
×44, K mod 40 `{2:20, 5:4, 7:20}`, **0 surviving through K ≤ 100**.

---

## 4. Answers to the primary questions

**A. Is `P40(E)` concentrated in a small Hamming neighborhood of the historical E words?**
Sharper than "concentrated": over the **fully closed** radius-1 shell, `P40` holds for
**exactly** the 6 historical E words present and for **none** of the 29 profile-preserving
distance-2 perturbations. Exact for the complete filtered shell.

**B. Is productivity correlated with a small exact set of boundary signatures?**
Not established. The prefix-drift features derived from the Phase-1 equations do not
separate productive from unproductive E (§2.2). Open.

**C. Do the K=40+r failures collapse to a small set of symbolic classes?**
**Yes — decisively.** All 63 witnesses lie in **one identity family** (`eaf`, `q=(0,1,2)`,
`M = m(A) − m(E) = (2,−2,0)`), realized in **7** offset classes. Derived algebraically and
independently verified on 252,720 comparisons.

**D. A sound necessary condition explaining why 60 random E had huge A populations but
zero F closure?**
**Not achieved.** §1.5 explains *where* the obstruction lives and *why it is in `eafea`*,
but does not yield a necessary condition on E. The 261,910 complete A words with zero F
closure remain unexplained. This is the main open problem from this phase.

**E. Does productivity decay smoothly or sharply with Hamming distance?**
**Sharply — a total cliff at the first step.** Zero of 29 profile-preserving distance-2
perturbations are productive, while all 6 seeds in the shell are. No decay curve exists to
measure: productivity is extinguished by a single transposition.

---

## 5. Epistemic status

| Claim | Status |
|---|---|
| Boundary-equation derivation and no-carry identity | **DERIVED**, independently verified (252,720 comparisons, 0 disagreements) |
| All 63 witnesses in 7 classes, one identity family, `M=(2,−2,0)` | **ESTABLISHED, exact** |
| `eafea`-only explained by gate coverage + shared blocks + carry reachability | **DERIVED** from profiles and cover structure |
| "smaller `\|M\|₁` ⟹ more collisions" | **REFUTED** — collision rate flat |
| `P40(E)` true for all 9 historical E; 59 triples; 39 canonical rediscovered | **ESTABLISHED, exact** |
| Earlier "E[2] unproductive" | **RETRACTED** — summary-field artifact (§2.1) |
| Prefix-drift features separate productive E | **REFUTED** — no separation |
| Radius-1 shell: `P40` exactly on the seeds | **ESTABLISHED, exact — 35/35 closed**, all 29 negatives exhaustive |
| Complete-AEF hit | **NONE FOUND**; 0 of 107 triples examined survive K ≤ 100 |
| Complete-AEF existence at L=40 | **UNRESOLVED** |
| Necessary condition on E explaining the random-E zero | **UNRESOLVED** |
| Mäkelä / novelty | **OPEN / NOT_ESTABLISHED** |

No global impossibility is inferred anywhere. All negatives are scoped to their exact
finite populations.

---

## 6. Recommended next action

1. **Done — the shell is fully closed (35/35).** "`P40` holds exactly on the historical E
   words within the sound-pre-filtered radius-1 shell" is now an exact statement about a
   fully closed, precisely delimited population.
2. **Attack question D directly, since it is the real blocker.** The Phase-1 identity is a
   condition on `(E,A,F)` jointly. The useful object is its *projection*: for fixed `E`,
   the set of `(A,F)` pairs excluded by the `eaf` identity across all `(t,r)`. If that
   projection can be shown to cover the whole `F` class for the random `E` tested, the
   zero-F-closure phenomenon is explained. That is a finite, checkable computation on
   already-persisted data.
3. **Do not widen the Hamming radius yet.** Radius 2 is ~527² ≈ 10⁵ per seed before
   filtering; with productivity apparently zero at radius 1, the informative direction is
   the algebraic projection in (2), not more shell volume.

Raw solver output remains under `runs/`, separate from this report.
