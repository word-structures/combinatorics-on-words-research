# Theorem candidates — profile-guided prefix-Parikh synthesis

Paper 4 is treated as frozen infrastructure. Everything below is either proved
here, verified here, or explicitly labelled conjecture.

---

## Theorem B (prefix-chain realizability) — **PROVED**

Let `ρ` be a profile with `|ρ|₁ = L`, and let `0 < d₁ < … < d_k < L`. Integer
vectors `Y₁,…,Y_k` occur as the prefix Parikh vectors at depths `d₁,…,d_k` of
some word `y` with `Ψ(y) = ρ` **iff**

```
|Y_j|₁ = d_j  for all j,        0 ≤ Y₁ ≤ Y₂ ≤ … ≤ Y_k ≤ ρ
```

componentwise.

**Proof.** Necessity: prefixes are nested, and the coordinate sum of a prefix
vector is its length. Sufficiency: the consecutive differences
`Y₁, Y₂−Y₁, …, Y_k−Y_{k−1}, ρ−Y_k` are nonnegative integer vectors whose
coordinate sums are the lengths of the corresponding segments; realize each
segment by any word of that profile and concatenate. ∎

This is the statement already used inside the proof of Paper 4's Corollary 7.1;
it is restated because Theorem A rests on it.

**Verification.** 246 chain-satisfying waypoint pairs over four profiles, every
one realizable, 0 failures.

---

## Theorem A (joint prefix-Parikh CSP) — **PROVED**

Fix an `L`-uniform coding, roles `r` with prescribed profiles `ρ_r`, and a
**finite window set** `𝒲`. For each role put

```
D_r = { d ∈ (0,L) : some window of 𝒲 references role r at depth d }.
```

Introduce variables `X⁽ʳ⁾_d` for `d ∈ D_r` with the structural conditions

```
X⁽ʳ⁾_0 = 0,   X⁽ʳ⁾_L = ρ_r,   |X⁽ʳ⁾_d|₁ = d,
X⁽ʳ⁾_d ≤ X⁽ʳ⁾_{d′}  componentwise for d < d′.
```

Then **literal block words `{w_r}` with `Ψ(w_r) = ρ_r` satisfying every window of
`𝒲` exist iff the joint CSP above, together with the disequalities
`σ_W(X) + t_W ≠ 0` for all `W ∈ 𝒲`, is feasible.**

**Proof.** (⇒) Read the prefix vectors of the literal words at the depths of
`D_r`; all conditions hold by construction. (⇐) Given a CSP solution, apply
Theorem B independently to each role to obtain a literal word realizing that
role's waypoints. Every window constraint is a function of the waypoint
variables alone, so its value is unchanged, and all windows of `𝒲` are
satisfied. ∎

The construction handles the required cases automatically:

- **repeated occurrences of one role** share a single chain `X⁽ʳ⁾`, because the
  chain is indexed by *role*, not by occurrence; a window meeting two
  occurrences of `r` simply contributes two depths to `D_r`;
- **distinct roles** have independent chains and are realized independently;
- **several cutpoints in one block** contribute several depths, combined by the
  reduction operation before the constraint is formed;
- **zero and full depth** are substituted as the constants `0` and `ρ_r`.

**Verification.** 300 randomized two-role instances with mixed-role windows,
brute-force literal search against waypoint-CSP feasibility: **0 mismatches**.

**Scope.** Theorem A is exact *relative to the declared window set*. It says
nothing about windows outside `𝒲`; if `𝒲` holds only windows below a
half-period bound, the literal words it produces are certified only below that
bound. This is Paper 4's long-period caveat, inherited unchanged.

**Relation to Paper 4.** Paper 4 classifies the support layer for *one*
unresolved role. Theorem A is the multi-role statement: all roles unresolved at
once, windows allowed to mix roles. The 19-family classification does **not**
transfer verbatim — a mixed-role support is not a single-role signature, and the
multi-role support classification is a strictly larger object which is not
attempted here.

---

## Proposition C (no state-space compression) — **PROVED; the decisive negative**

Suppose the window set `𝒲` contains, for at least one half-period `K`, every
start `s` for which the window lies inside the cover. Then for every role `r`
occurring in the cover,

```
D_r = {1, …, L−1},
```

so the waypoint chain determines the block word exactly, and the joint CSP of
Theorem A is a re-encoding of the literal search with no reduction in state
space.

**Proof.** Fix `K` and a block index `b` carrying role `r`. As `s` ranges over
an interval of length at least `L`, the depth `s mod L` takes every value in
`[0,L−1]`; those in `[1,L−1]` are active by definition. ∎

**Consequence.** The compression factor of the waypoint representation is the
product over gaps of `multinomial(gap length, profile difference)`, which equals
`1` exactly when every gap has length `1`, i.e. when `D_r = L−1`. Any *complete*
gate is closed under all starts, so the factor is always `1`.

**Verification.** `D_r = L−1` for `L = 5, 6, 8, 10, 12, 16, 20, 40` at every
`K_max ∈ {2L, 3L}`. Restricting to a **single** half-period `K = 7` still gives
`D_r = L−1`. Only restricting the *start set* reduces it — `s = 0` alone gives
`D_r = 8` at `L = 12` — and a complete gate cannot restrict starts.

---

## Theorem D (long-period elision density) — **PARTLY PROVED, PARTLY CONJECTURE**

### D.1 The exact half — PROVED

For a reduced signature `σ = Σ_j a_j x_{d_j}` and profile `ρ`, each coordinate
`i` of `σ(X)` lies between `−(Σ negative a_j)·ρ_i` and `(Σ positive a_j)·ρ_i`;
for the `(1,−2,1)` pattern this is `[−2ρ_i, 2ρ_i]`. Hence

```
R_σ(ρ) ⊆ box(2ρ).
```

So **any window whose bulk target `t` has `|t_i| > 2ρ_i` for some `i` is safely
elided**, with no computation of the reachable set at all. This is exact,
one-way, and needs no conjecture.

### D.2 The growth half — exponent proved, constant measured

Let `N(b)` be the vector of source-letter counts in the first `b` blocks and `P`
the profile matrix. The bulk target of a window whose cutpoints lie in blocks
`b, b+g, b+2g` is `P·(N(b) − 2N(b+g) + N(b+2g))`.

For the Rao–Rosenfeld source `h₆` the incidence matrix has **exact**
characteristic polynomial

```
x³ (x − 3)(x² − 3),
```

so the spectrum is `{3, √3, −√3, 0, 0, 0}`. Since `|λ₂| = √3 > 1` and
`log√3 / log3 = 1/2`, the source discrepancy grows with exponent `1/2`.

Measured along `h₆^ω(a)` over 531,441 letters, `max_b |P·D(b)|_∞` grows as
`c·√g` with `c ∈ [10,15]` for `g` from `1` to `16384` — four orders of
magnitude, stable constant.

Both `√3`-eigenvectors **survive** the Paper-4 profile map, with
`|Pv|/|v| = 8.51` and `7.34`; the growing modes are not annihilated.

### D.3 The density statement — CONJECTURE

> **Conjecture D.** For a source that is the fixed point of a primitive
> substitution with `|λ₂| > 1`, and a profile map `P` not annihilating the
> `λ₂`-eigenspace, the fraction of windows with block gap `g` that are *not*
> safely elidable decays like `Θ(L / (c√g))`.

Measured non-elidable fraction at `L = 40`, `ρ = (19,11,10)`:

| g | 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| fraction | 1.000 | 1.000 | .981 | .901 | .652 | .311 | .295 | .117 | .0202 | .0179 | .0066 | .0037 | .0034 |

The decay is consistent with `1/√g` but is **not proved**. The obstruction is
precise: a bound on `max_b |P·D(b)|` does not control the *distribution* of
`P·D(b)` over `b`, which is what a density claim requires. Closing it needs a
deviation result for Birkhoff sums of the substitution — the point at which the
existing literature on substitution discrepancy would have to be brought in.

### D.4 What this does *not* explain

The reported rise in elision density as `K` grows to `100` is **not** explained
by this mechanism at `L = 40`. At `K ≤ 100` the block gap is `g ≤ 2`, where the
measured non-elidable fraction is exactly `1.00000`. The mechanism engages only
near `g = 16…32`, i.e. `K = 640…1280` at `L = 40`.

Any effect observed at `K ≤ 100` therefore has a different cause — most
plausibly on the *support* side, where particular `(s,K)` yield a short or empty
reduced signature and short signatures have small reachable sets. It must be
re-measured before being attributed to anything.

---

## Design principle (profile choice from the substitution spectrum) — WELL POSED

Since `R_σ(ρ) ⊆ box(2ρ)` while the bulk target is `P·D`, elision is easiest when
`P` carries the growing discrepancy modes far from the origin. This gives an
explicit objective over candidate profile matrices:

```
maximize    min_{unit v ∈ E_{λ₂}} |P v|
subject to  P nonnegative integer, all column sums L, plus construction constraints.
```

For the current Paper-4 profiles the objective is non-zero (`7.34`, `8.51`), so
the modes survive — but this looks inherited rather than designed: Paper 4's
rank-one lift preserves the kernel of the shorter coding's incidence matrix, so
whether the modes survive was fixed by the original Rao–Rosenfeld choice, not by
the lift.

The principle is mathematically meaningful and computable. It is **not**
established that maximizing it improves any end-to-end search.
