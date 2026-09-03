# Theorem candidate — depth-1 suffix obstruction for `Aset(E) = ∅`

**Date:** 2026-08-29
**Status:** sandbox theorem **candidate**. Not promoted. Not in `MATH_CLAIMS`.
`NOVELTY_UNRESOLVED` (no literature search was performed for this statement).
Mäkelä **OPEN**.

---

## 1. Definitions

Alphabet `Σ = {a,b,c}`; `Psi` is the Parikh map; `e_α` the unit vector of `α`.

Fix `E ∈ Σ⁴⁰`. For a word `A ∈ Σ⁴⁰` with `Psi(A) = (15,14,11)` put `W = E·A`
and `P(n) = Psi(W[0..n))`. Recall (frozen definition,
`ASET_E_OBSTRUCTION_DEFINITION_2026-08-29.md`)

```
A ∈ Aset(E)  ⟺  ∀ n ∈ [41,80], ∀ k ∈ [2, min(40,⌊n/2⌋)] :
                 P(n) − 2P(n−k) + P(n−2k) ≠ 0.
```

**Definition (suffix deficit).** For `k = 2,…,20` let

```
d_k(E) = Psi( E[41−2k .. 41−k) ) − Psi( E[41−k .. 40) ).
```

The first block has length `k`, the second length `k−1`, so `|d_k(E)| = 1`
(coordinate sum). Hence either `d_k(E) = e_α` for exactly one letter `α`, or
`d_k(E)` has a negative coordinate.

**Definition (blocked set).**

```
BLOCKED(E) = { α ∈ Σ : ∃ k ∈ [2,20] with d_k(E) = e_α }.
```

## 2. Theorem statement

> **Theorem 1 (depth-1 suffix obstruction).**
> For every `E ∈ Σ⁴⁰`,
> ```
> BLOCKED(E) = Σ   ⟹   Aset(E) = ∅.
> ```

> **Lemma 1 (exact first-letter criterion).**
> For any `A` with `Psi(A) = (15,14,11)` and any `k ∈ [2,20]`, the word `E·A`
> has an abelian square of half-period `k` ending at position `41` **iff**
> `d_k(E) = e_{A[0]}`. Consequently
> ```
> A ∈ Aset(E)   ⟹   A[0] ∉ BLOCKED(E),
> ```
> so `Aset(E) = ∅` whenever `BLOCKED(E) = Σ`.

## 3. Proof

**Proof of Lemma 1.** Fix `k ∈ [2,20]` and set `n = 41`. The defining condition
requires `k ≤ min(40, ⌊41/2⌋) = 20`, so every such `k` is tested. Write the two
blocks of the candidate square:

```
B₁ = W[41−2k .. 41−k),      |B₁| = k,
B₂ = W[41−k  .. 41),        |B₂| = k.
```

Since `k ≤ 20` we have `41−2k ≥ 1 > 0` and `41−k ≤ 39 < 40`, so `B₁` lies
entirely inside `E`: `B₁ = E[41−2k .. 41−k)`. The block `B₂` straddles the
boundary at index 40 and, since `41−k ≤ 39`, splits as

```
B₂ = E[41−k .. 40) · A[0],
```

the last `k−1` letters of `E` followed by the first letter of `A`.

`W` has an abelian square of half-period `k` ending at position `41` iff
`Psi(B₁) = Psi(B₂)`, i.e.

```
Psi( E[41−2k .. 41−k) ) = Psi( E[41−k .. 40) ) + e_{A[0]},
```

that is, iff `d_k(E) = e_{A[0]}`. This proves the equivalence. If
`A ∈ Aset(E)` then no such square exists for any `k ∈ [2,20]`, hence
`d_k(E) ≠ e_{A[0]}` for all such `k`, i.e. `A[0] ∉ BLOCKED(E)`. ∎

**Proof of Theorem 1.** Suppose `BLOCKED(E) = Σ` and let `A ∈ Aset(E)`. By
Lemma 1, `A[0] ∉ BLOCKED(E) = Σ`, contradicting `A[0] ∈ Σ`. Hence
`Aset(E) = ∅`. ∎

The proof uses only the definition, the length arithmetic `k ≤ 20`, and the
fact that `Σ` has three letters. It is independent of `Psi(A)`, of `Psi(E)`, and
of every downstream gate.

## 4. Assumptions and scope

1. `|E| = |A| = 40`; the bound `k ≤ 20` at `n = 41` is what confines `B₁` to
   `E`. For general lengths `|E| = |A| = L` the same argument gives
   `k ∈ [2, ⌊(L+1)/2⌋]` and the identical conclusion.
2. `|Σ| = 3` is used only in "`BLOCKED(E) = Σ` is achievable"; the lemma itself
   is alphabet-independent.
3. `Psi(A)` is irrelevant to Lemma 1: the criterion constrains `A[0]` only.
4. The converse is **false in general** — see §6.

## 5. Finite verification (separate from the proof)

The proof above is complete and does not rest on computation. Independently,
the statement was checked on **469 words `E`** (`work/aset_theorem.js`,
`work/aset_final.js`):

| population | E | `BLOCKED(E) = Σ` fires | of those, `Aset(E) = ∅` | violations |
|---|---:|---:|---:|---:|
| frozen R (seed 7788) | 60 | 7 | 7 | **0** |
| frozen H (canonical) | 9 | 0 | — | **0** |
| fresh (seed 991133, frozen before evaluation) | 400 | 52 | 52 | **0** |

`|BLOCKED(E)|` distribution:

| `|BLOCKED|` | 0 | 1 | 2 | 3 |
|---|---:|---:|---:|---:|
| frozen zero-`Aset` E (24) | 0 | 9 | 8 | **7** |
| frozen positive-`Aset` E (45) | 1 | 20 | 24 | **0** |
| fresh E (400) | 9 | 127 | 212 | 52 |

No `E` with `|BLOCKED(E)| = 3` and `Aset(E) ≠ ∅` was found in 469 trials, as
the theorem requires.

## 6. Known limitations

- **Sufficient, not necessary.** Of the 24 frozen zero-`Aset` E, only **7**
  satisfy `BLOCKED(E) = Σ`. Among 188 fresh zero-`Aset` E, only **52** do. The
  converse of Theorem 1 is therefore false: `Aset(E) = ∅` does **not** imply
  `BLOCKED(E) = Σ`.
- **It is a depth-1 statement.** It examines only `A[0]`, i.e. the last 39
  letters of `E`. Obstructions that only manifest deeper are invisible to it;
  one frozen case (`R[38]`) has a search that survives to depth 39 of 40.
- **No literature check.** The statement is elementary and may well be folklore
  or an immediate special case of a known prefix/boundary criterion.
  `NOVELTY_UNRESOLVED`; nothing here should be described as new.
- **It says nothing downstream.** It is upstream of `AF_EXISTS`, `AFE_EXISTS`
  and every `F`-side gate, and must not be used to argue about any of them.

## 7. Companion certifier (not a theorem)

A sound but **incomplete** decision procedure is described in Report 13 §5:
constraint propagation on the A-prefix lattice plus singleton shaving. It
certified **24/24** frozen zero-`Aset` E and **182/188** fresh ones, with **0**
false positives on 85 positive-`Aset` E tested. It is an algorithm with a
soundness argument, not a characterization, and is reported as such.
