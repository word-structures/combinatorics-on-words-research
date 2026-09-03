# `Aset(E)` — frozen definition and provenance

**Date:** 2026-08-29
**Status:** sandbox. No canonical edit. No Git mutation. No promotion.

**Honest note on ordering.** The definition, the population hashes and the
validation of the derivation were frozen **computationally** in
`runs/aset_E_frozen.json` (produced by `work/aset_freeze.js`) *before* any
obstruction analysis was run. This markdown file is the human-readable
rendering of that frozen artifact; it was authored afterwards and adds nothing
to it.

---

## 1. The mathematical compatibility condition

Alphabet `{a,b,c}`. Fix `L = 40` and the profiles used throughout Paper 4:

```
Psi(E) = (13,16,11)        [PROFILE.e]
Psi(A) = (15,14,11)        [PROFILE.a]
```

Let `W = E·A` (length 80) and let `P(n) = Psi(W[0..n))`.

> **Definition.** `A ∈ Aset(E)` iff `|A| = 40`, `Psi(A) = (15,14,11)`, and
> for every `n ∈ [41,80]` and every `k` with `2 ≤ k ≤ min(40, ⌊n/2⌋)`
> ```
> P(n) − 2·P(n−k) + P(n−2k) ≠ 0.
> ```

Equivalently: `E·A` carries **no abelian square of half-period `k ∈ [2,40]`
ending at any position `n ∈ [41,80]`**.

Every checked window ends at `n ≥ 41`, hence contains at least index 40, the
first letter of `A`. Positions `n ≤ 40` are **not** re-checked: `E` is fixed
input, and was itself generated under the weaker bound `k ≤ 20`.

## 2. What is *not* part of the definition

- **`Alist`/DFS enumeration is an algorithm, not the definition.** The DFS in
  `stage_bcd.js` applies the same test incrementally at `n = 41..80`; because
  each test depends only on the prefix up to `n`, the pruning is exact. The
  predicate above was re-implemented independently (`aset_defs.isCompatible`,
  which recomputes from the whole word) and cross-checked — see §5.
- **No symmetry normalization** is applied. No letter-permutation quotient, no
  reversal, no canonical form.
- **No `F`, no `AF_EXISTS`, no `AFE_EXISTS`.** This stage is strictly upstream
  of every `F`-side gate. Nothing downstream is used anywhere in this analysis.
- **No gate from Reports 7–12** (`AF = faf, K ≤ 60`; `AEF = eafea+fafea,
  K ≤ 100`) participates. The only bound here is `k ≤ 40` over `E·A`.

## 3. Parameter table

| item | value |
|---|---|
| `\|E\|`, `\|A\|` | 40, 40 |
| `Psi(E)` | `(13,16,11)` — verified for all 69 frozen E |
| `Psi(A)` | `(15,14,11)` |
| K range for `E·A` | `2 ≤ k ≤ min(40, ⌊n/2⌋)`, `n ∈ [41,80]` |
| K range used when generating `E` | `2 ≤ k ≤ 20`, positions `n ≤ 40` |
| symmetry normalization | none |
| prefix pruning | exact and sound; not part of the definition |

## 4. Frozen populations

- **Random pool `R`**: mulberry32 (`rng.js`) seed **7788**, generator `mkGenE`,
  rejecting any E in the canonical pool, first **60** accepted. Reproduced
  identically by `dedup_A.js`, `stage_bcd.js`, `target_census.js`,
  `aset_sizes.js` and `aset_defs.popR`.
- **Canonical pool `H`**: the **9** E words in `fixtures/canonical_pools.json`.

Per-E words, SHA-256 hashes, profiles and exact `|Aset(E)|` are frozen in
`runs/aset_E_frozen.json`. Recomputed independently here:

| | E | `|Aset| = 0` | `|Aset| > 0` |
|---|---:|---:|---:|
| R | 60 | **24** | 36 |
| H | 9 | **0** | 9 |

matching Report 11 exactly.

## 5. Validation of the derivation

`work/aset_freeze.js` validated the derived constraint system (§6) against the
raw predicate on **13,800 random profile-correct A words** across all 69 E:
**0 mismatches**. All **45** first witnesses satisfy both the raw predicate and
the derived system.

## 6. The derived constraint system (used by every later phase)

With `p(i) = Psi(E[0..i))`, `x(j) = Psi(A[0..j))`, `x(0) = 0`,
`x(40) = (15,14,11)`, and `n = 40+m`, the condition splits by where the two
earlier cutpoints fall:

| class | range | constraint |
|---|---|---|
| **ternary** | `2k ≤ m` | `x(m) − 2x(m−k) + x(m−2k) ≠ 0` — **independent of E** |
| **binary** | `m < 2k`, `k ≤ m` | `x(m) − 2x(m−k) ≠ p(40) − p(40+m−2k)` |
| **unary** | `k > m` | `x(m) ≠ σ_{2k−m} − 2σ_{k−m}` |

where `σ_r = Psi(last r letters of E) = p(40) − p(40−r)`.

Counts, **identical for every one of the 69 E**:

```
ternary 361 | binary 419 | unary 380     (total 1160)
```

So the **support geometry is fixed and E-independent; only the affine targets
depend on E** — the same "shared skeleton, E-dependent targets" structure found
downstream in Reports 8 and 10, here derived rather than imported.

## 7. Hashes

`runs/aset_E_frozen.json` contains, for each of the 69 E: `population`,
`eIndex`, the word, `E_sha256`, `profile`, `asetSize`, and (where non-empty)
`firstWitness` with `firstWitness_sha256`.

Hashes of the artifacts themselves are recorded in
`FROZEN_RECORD_2026-08-28.sha256`.
