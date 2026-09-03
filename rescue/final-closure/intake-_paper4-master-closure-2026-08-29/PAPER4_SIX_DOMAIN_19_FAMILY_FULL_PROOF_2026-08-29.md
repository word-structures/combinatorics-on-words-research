# Complete proof — six carry domains, 34 patterns, 19 support families

**Date:** 2026-08-29 · sandbox · no canonical edit, no Git mutation, no promotion.
**Purpose:** close the gap the manuscript itself records in §17.2 — the 34→19
quotient, the nineteen closed cardinalities, and pairwise distinctness were
exactly verified but only *outlined* in the text. This document supplies the
derivations. Every formula below is proved from integer inequalities and
*separately* checked by `work/sixdomain_full.js` (checks are falsification
layers, not proof steps).

---

## 1. Setting and notation

Uniform block length `L ≥ 2`. A word is cut into macro blocks of length `L`;
one macro role `X` is unresolved, all others assigned. For a candidate Abelian
square with start `s` and half-period `K ≥ 2` the three cutpoints are

```
t_j = s + jK,   j = 0,1,2,        t_j = b_j L + i_j,   0 ≤ i_j < L.
```

Write `K = qL + r` with `0 ≤ r < L`, and let `χ(b) ∈ {0,1}` indicate whether
block `b` carries `X`. With free prefix states `x_i = Ψ(X[0..i))`, `x_0 = 0`,
the unresolved-role support is

```
σ = red( χ(b_0)·x_{i_0} − 2χ(b_1)·x_{i_1} + χ(b_2)·x_{i_2} ),
```

where `red` deletes `x_0`-terms, combines equal depths, and deletes zero
coefficients. `σ = ∅` (the empty signature) is legitimate: the window is then
decided entirely by assigned data.

**Convention.** A *pattern* is a pair (domain, role mask `χ = (χ₀,χ₁,χ₂)`). Its
*family* is the **set** of all `σ` realised over that domain. Two patterns are
identified iff their families are equal **as sets**.

## 2. The carry recurrence

**Lemma 2.1.** With `c_j := ⌊(i_j + r)/L⌋ ∈ {0,1}`,

```
i_{j+1} = i_j + r − L c_j,        b_{j+1} = b_j + q + c_j.
```

*Proof.* `t_{j+1} = t_j + K = (b_j + q)L + (i_j + r)`. Since `0 ≤ i_j < L` and
`0 ≤ r < L` we have `0 ≤ i_j + r < 2L`, so `i_j + r = L c_j + (i_j + r − L c_j)`
with `c_j ∈ {0,1}` and the remainder in `[0,L)`. ∎

**Lemma 2.2 (curvature).** Put `g₁ = b₁−b₀`, `g₂ = b₂−b₁` and
`δ = b₀ − 2b₁ + b₂ = g₂ − g₁`. Then

```
δ = c₁ − c₀ ∈ {−1, 0, +1},        i₀ − 2i₁ + i₂ = −δL.
```

*Proof.* `g₁ = q + c₀`, `g₂ = q + c₁` by Lemma 2.1, so `δ = c₁ − c₀`, and
`c_j ∈ {0,1}` gives `δ ∈ {−1,0,1}`. Since `t₀ − 2t₁ + t₂ = 0` identically,
`L(b₀−2b₁+b₂) + (i₀−2i₁+i₂) = 0`. ∎

*(Independent second route, no carries: `0 ≤ i_j ≤ L−1` gives
`i₀−2i₁+i₂ ∈ [−2(L−1), 2(L−1)]`, so `|δ| = |i₀−2i₁+i₂|/L < 2`.)*

## 3. The six domains

The pair `(c₀,c₁)` together with `q = 0` or `q ≥ 1` is exhaustive, and the
macro-block coincidence pattern is determined by `(g₁,g₂) = (q+c₀, q+c₁)`:

| case | `q` | `(c₀,c₁)` | `(g₁,g₂)` | blocks | `δ` | domain |
|---|---|---|---|---|---|---|
| 1 | 0 | (0,0) | (0,0) | `b₀=b₁=b₂` | 0 | **Z_s** |
| 2 | 0 | (0,1) | (0,1) | `b₀=b₁<b₂` | +1 | **P_t** |
| 3 | 0 | (1,0) | (1,0) | `b₀<b₁=b₂` | −1 | **M_t** |
| 4 | 0 | (1,1) | (1,1) | distinct | 0 | **Z** |
| 5 | ≥1 | (0,0) or (1,1) | both ≥1 | distinct | 0 | **Z** |
| 6 | ≥1 | (0,1) | both ≥1 | distinct | +1 | **P** |
| 7 | ≥1 | (1,0) | both ≥1 | distinct | −1 | **M** |

Exhaustive because `c₀,c₁ ∈ {0,1}` and `q ∈ {0} ∪ {≥1}`. Exactly six distinct
*(block-coincidence, curvature)* types arise; cases 4 and 5 give the same type.

**Exact integer domains.** Writing `a = i₀` and using `r` (`= K` when `q = 0`):

```
Z_s = { (a, a+r, a+2r)      : r ≥ 2,  a ≥ 0,  a+2r ≤ L−1 }
P_t = { (a, a+r, a+2r−L)    : r ≥ 2,  a+r ≤ L−1,  a+2r ≥ L }
M_t = { (a, a+r−L, a+2r−L)  : r ≥ 2,  a+r ≥ L,  a+2r ≤ 2L−1 }
Z   = { (u,v,w) : u+w = 2v,     0 ≤ u,v,w ≤ L−1 }
P   = { (u,v,w) : u+w = 2v−L,   0 ≤ u,v,w ≤ L−1 }
M   = { (u,v,w) : u+w = 2v+L,   0 ≤ u,v,w ≤ L−1 }
```

**Lemma 3.1 (full realizability of `Z`, `P`, `M`).** Every lattice point of
`Z`, `P`, `M` is realised by some `(s,K)` with `K ≥ 2` and three *distinct*
macro blocks.

*Proof.* Given `(u,v,w)` in `Z`: if `v ≥ u` take `c₀=c₁=0`, `r = v−u`; if
`v < u` take `c₀=c₁=1`, `r = v−u+L ∈ [1,L−1]`. In both cases pick any `q ≥ 1`;
then `K = qL + r ≥ L ≥ 2` and `g₁ = g₂ = q + c₀ ≥ 1`, so the blocks are
distinct. For `P` take `(c₀,c₁) = (0,1)`, `r = v−u` if `v ≥ u` else `v−u+L`;
for `M` take `(1,0)`. The local recurrence then reproduces `(u,v,w)` by
Lemma 2.1, and the curvature equation of Lemma 2.2 is exactly the defining
equation of the domain. ∎

So `Z_s`, `P_t`, `M_t` are the `q = 0` (block-coincident) domains, and
`Z`, `P`, `M` are the unrestricted lattice domains.

## 4. The boundary lemma — exactly one lost point on each side

The manuscript asserts that the truncated domains differ from the full ones by
one point each. This is now proved.

**Lemma 4.1.** For `L ≥ 4`,

```
P \ P_t = { p⁺ },   p⁺ = (L−2, L−1, 0),
M \ M_t = { p⁻ },   p⁻ = (L−1, 0, 1).
```

*Proof (P side).* A point `(u,v,w) ∈ P` lies in `P_t` iff it is realisable with
`q = 0`, i.e. iff `r := v − u` satisfies `r ≥ 2` (as `K = r`). So
`P \ P_t = { (u,v,w) ∈ P : v − u ≤ 1 }`. Using `w = 2v − L − u`:

- `v − u = 1`: `w = 2v − L − (v−1) = v + 1 − L`. Now `w ≥ 0` forces `v ≥ L−1`,
  hence `v = L−1`, `w = 0`, `u = L−2`. This is `p⁺`, and it does lie in `P`.
- `v − u = 0`: `w = v − L < 0`, impossible.
- `v − u < 0`: `w = v + (v−u) − L < v − L < 0`, impossible.

*(M side.)* `(u,v,w) ∈ M` lies in `M_t` iff `r := v − u + L ∈ [2, L−1]`, i.e.
`v − u ≤ −1` and `v − u ≥ 2 − L`. With `w = 2v + L − u`:

- `v − u ≥ 0`: `w = v + (v−u) + L ≥ L`, impossible.
- `v − u = 1 − L`: then `u = v + L − 1 ≤ L−1` forces `v = 0`, `u = L−1`,
  `w = 1`. This is `p⁻`.
- `v − u < 1 − L`: `u > v + L − 1 ≥ L−1`, impossible. ∎

*Check:* verified for `L = 4..120`, 0 failures.

## 5. The 34 patterns

**Proposition 5.1.** Exactly `34` (domain, role-mask) patterns are physically
consistent.

*Proof.* `χ` is a function of the macro block, so cutpoints in the *same* block
must carry the same indicator. By the table of §3:

- `Z_s`: one block ⇒ `χ₀ = χ₁ = χ₂` ⇒ **2** masks;
- `P_t`: `b₀ = b₁ ≠ b₂` ⇒ `χ₀ = χ₁`, `χ₂` free ⇒ **4**;
- `M_t`: `b₀ ≠ b₁ = b₂` ⇒ `χ₁ = χ₂`, `χ₀` free ⇒ **4**;
- `Z`, `P`, `M`: three distinct blocks ⇒ **8** each.

Total `2+4+4+8+8+8 = 34`. No mask is excluded for any other reason: by Lemma 3.1
every domain is nonempty for `L ≥ 4` (and `Z_s ≠ ∅` for `L ≥ 5`), and each
listed mask is realised by choosing the occurrence mask of the ambient word
freely on the distinct blocks involved. ∎

## 6. The 34 → 19 quotient

Three mechanisms collapse patterns. Each is proved, not asserted.

**(M1) Trivial mask.** For `χ = (0,0,0)` every point yields `σ = ∅`, so all six
such patterns (one per domain) have family `{∅}`. → class **E**, `|E| = 1`.

**(M2) Outer symmetry.** The form `χ₀x_{i₀} − 2χ₁x_{i₁} + χ₂x_{i₂}` is invariant
under simultaneously swapping `(i₀ ↔ i₂)` and `(χ₀ ↔ χ₂)`, because both outer
coefficients equal `+1`. Each of `Z`, `P`, `M` is invariant as a **set** under
`(u,v,w) ↦ (w,v,u)` (their defining equations are symmetric in `u,w`). Hence for
`D ∈ {Z,P,M}` the patterns `D:001` and `D:100` have equal families, and
likewise `D:011` and `D:110`. This gives the merges
`Z:001≡Z:100`, `Z:011≡Z:110`, and the same on the `P` and `M` sides.

**(M3) Truncation transfer.** By Lemma 4.1 the truncated domains lose exactly
one point. Whether a family changes depends on whether that point's reduced
signature is produced by another point of the truncated domain.

**Lemma 6.1 (P side).** `P_t:χ ≡ P:χ` for `χ ∈ {000, 001, 111}`, while
`P_t:110` is `P:110` minus exactly one signature.

*Proof.* `p⁺ = (L−2, L−1, 0)` has `i₂ = 0`, which `red` always deletes.

- `χ = 000`: both families are `{∅}` (M1).
- `χ = 001`: only `i₂ = 0` is active, so `σ(p⁺) = ∅`. Any `(u,v,0) ∈ P_t` also
  gives `∅`; such a point exists for `L ≥ 4` (take `v` with
  `⌈L/2⌉ ≤ v ≤ L−2`, `u = 2v−L`, which satisfies `v−u = L−v ≥ 2`). No loss.
- `χ = 110`: `σ(p⁺) = x_{L−2} − 2x_{L−1}`. A two-term `(+1,−2)` form
  determines its depths, so any `P_t` point with this signature has
  `u = L−2, v = L−1`; but `w = 2v−L−u = 0` then forces the point to be `p⁺`
  itself. Hence the signature is lost, and exactly one is lost.
- `χ = 111`: `σ(p⁺) = x_{L−2} − 2x_{L−1} + x_0 = x_{L−2} − 2x_{L−1}` after
  `red`. **The point `(0, L−1, L−2)` lies in `P_t`** — check: `a = 0`,
  `r = L−1 ≥ 2`, `a+r = L−1 ≤ L−1`, `w = 2(L−1) − L = L−2` — and under
  `χ = 111` its `i₀ = 0` is deleted, giving `−2x_{L−1} + x_{L−2}`, the same
  reduced form. No loss. ∎

This is the exact content of the manuscript's phrase "zero-depth reduction":
the *same* reduced two-term form is reachable both by deleting the last depth
and by deleting the first, and the truncation removes only the former witness.

**Lemma 6.2 (M side).** Symmetrically, `M_t:χ ≡ M:χ` for `χ ∈ {000,100,111}`,
while `M_t:011` loses exactly one signature.

*Proof.* `p⁻ = (L−1, 0, 1)` has `i₁ = 0`. Under `χ = 011` its signature is
`+x_1` (the `−2x_0` term is deleted), which requires a point with `i₁ = 0`,
`i₂ = 1`; `u = 2v + L − w = L − 1` forces `p⁻`. Under `χ = 111` the signature
is `x_{L−1} + x_1`, which is also produced by `(1, 0, L−1) ∈ M_t`. Under
`χ = 100` only `i₀` is active and `σ(p⁻) = x_{L−1}`, produced by other points. ∎

*Check:* for `L ∈ {8,20,40}` the truncation analysis reports exactly
`P_t: 110 → LOST[+1x_{L−2}−2x_{L−1}]`, all other `P_t` masks unchanged; and
`M_t: 011 → LOST[+1x₁]`, all other `M_t` masks unchanged.

**Theorem 6.3.** For `L ≥ 4` the 34 patterns fall into exactly **19** classes,
namely those listed in §7.

*Proof.* M1 merges 6 patterns into one class (−5). M2 merges four pairs on each
of `Z`, `P`, `M`: `{001,100}` and `{011,110}` (−2 per domain, −6 total). By
Lemmas 6.1–6.2, `P_t:000` joins `E`, `P_t:001` joins the `P:001≡P:100` class,
`P_t:111` joins `P:111`, and `P_t:110` is a *new* class; symmetrically on the
`M` side (`M_t:000→E`, `M_t:100` joins `M:001≡M:100`, `M_t:111` joins `M:111`,
`M_t:011` new). `Z_s:000` joins `E` and `Z_s:111` is its own class.
Counting: `34 − 5 (M1) − 6 (M2) − 3 (P_t absorbed) − 3 (M_t absorbed) = 17`,
plus the two new truncated classes `P_t:110` and `M_t:011` gives **19**.
Distinctness of these 19 is Theorem 8.1. ∎

## 7. The nineteen families and their cardinalities

Throughout, `e = ⌈L/2⌉` is the number of even values in `[0,L−1]` and
`o = ⌊L/2⌋` the number of odd values.

| class | patterns | closed cardinality | `L=40` |
|---|---|---|---:|
| `E` | `Zs:000,Pt:000,Mt:000,Z:000,P:000,M:000` | `1` | 1 |
| `Zs-A` | `Zs:111` | `⌊(L−3)²/4⌋` | 342 |
| `Z-O` | `Z:001,Z:100` | `L` | 40 |
| `Z-C` | `Z:010` | `L` | 40 |
| `Z-M` | `Z:011,Z:110` | `⌈L²/2⌉` | 800 |
| `Z-OO` | `Z:101` | `⌊(L+1)²/4⌋` | 420 |
| `Z-A` | `Z:111` | `⌊(L−1)²/4⌋+1` | 381 |
| `P-O` | `Pt:001,P:001,P:100` | `L−1` | 39 |
| `P-C` | `P:010` | `⌊L/2⌋` | 20 |
| `P-M` | `P:011,P:110` | `⌊L²/4⌋` | 400 |
| `P-OO` | `P:101` | `C(⌊L/2⌋+1,2)` | 210 |
| `P-A` | `Pt:111,P:111` | `C(⌊L/2⌋+1,2)` | 210 |
| `Pt-M` | `Pt:110` | `⌊L²/4⌋−1` | 399 |
| `M-O` | `Mt:100,M:001,M:100` | `L−1` | 39 |
| `M-C` | `M:010` | `⌊L/2⌋` | 20 |
| `M-M` | `M:011,M:110` | `⌊L²/4⌋` | 400 |
| `M-OO` | `M:101` | `C(⌊L/2⌋+1,2)` | 210 |
| `M-A` | `Mt:111,M:111` | `C(⌊L/2⌋+1,2)` | 210 |
| `Mt-M` | `Mt:011` | `⌊L²/4⌋−1` | 399 |

### Derivations

**`Z-C = L`.** `σ = red(−2x_v)`. Over `Z`, `v` attains every value in `[0,L−1]`
(take `u = v = w`). So the family is `{∅} ∪ {−2x_v : 1 ≤ v ≤ L−1}`, of size
`1 + (L−1) = L`. **`Z-O = L`** identically with `σ = red(x_w)`, `w` attaining
every value (take `u = v = w`).

**`P-O = L−1`.** `σ = red(x_w)` over `P`. Here `w = 2v − L − u ≤ 2(L−1) − L = L−2`,
and every value in `[0, L−2]` is attained (given `w`, choose `v` with
`(L+w)/2 ≤ v ≤ L−1`, which is nonempty since `w ≤ L−2`). Family
`= {∅} ∪ {x_w : 1 ≤ w ≤ L−2}`, size `1 + (L−2) = L−1`. The cap `w ≤ L−2`
— not `L−1` — is exactly why this family is one smaller than `Z-O`.

**`P-C = ⌊L/2⌋`.** `σ = red(−2x_v)` over `P`. Feasibility needs
`u + w = 2v − L ≥ 0`, i.e. `v ≥ ⌈L/2⌉ ≥ 1`, so `∅` never occurs and every
`v ∈ [⌈L/2⌉, L−1]` is attained. Size `= L − ⌈L/2⌉ = ⌊L/2⌋`.

**`Zs-A = ⌊(L−3)²/4⌋`.** `σ = x_a − 2x_{a+r} + x_{a+2r}` with `r ≥ 2`,
`a + 2r ≤ L−1`. Distinct `(a,r)` give distinct signatures (for `a ≥ 1` the three
depths are distinct and determine `(a,r)`; for `a = 0` the form is
`−2x_r + x_{2r}`, determining `r`; three-term and two-term forms never coincide).
Hence the size is `Σ_{r≥2} #{a : 0 ≤ a ≤ L−1−2r} = Σ_{r=2}^{⌊(L−1)/2⌋} (L−2r)`.
For `L = 2m` this is `Σ_{r=2}^{m−1} 2(m−r) = 2Σ_{k=1}^{m−2}k = (m−1)(m−2) = ⌊(2m−3)²/4⌋`;
for `L = 2m+1` it is `Σ_{r=2}^{m}(2m+1−2r) = 1+3+⋯+(2m−3) = (m−1)² = ⌊(2m−2)²/4⌋`.
Both equal `⌊(L−3)²/4⌋`.

**`Z-OO = ⌊(L+1)²/4⌋`.** `σ = red(x_u + x_w)` with `u + w = 2v`, i.e. `u ≡ w
(mod 2)`; conversely any same-parity pair is realisable (`v = (u+w)/2 ≤ L−1`
automatically). The signature depends only on the unordered pair `{u,w}` and
distinct pairs give distinct signatures (`(0,0) ↦ ∅`; `(0,w) ↦ x_w`;
`(u,u) ↦ 2x_u`; otherwise `x_u + x_w`). Hence the size is the number of
unordered same-parity pairs **with repetition** from `[0,L−1]`:
`C(e+1,2) + C(o+1,2) = [e(e+1) + o(o+1)]/2`. For `L = 2m` this is `m(m+1)`;
for `L = 2m+1`, `(m+1)²`. Both equal `⌊(L+1)²/4⌋`.

**`Z-A = ⌊(L−1)²/4⌋ + 1`.** `σ = red(x_u − 2x_v + x_w)`, `u+w = 2v`. If any two
of `u,v,w` coincide then all three do (e.g. `u = w` with `u+w = 2v` gives
`u = v`), and then `σ = ∅`. Otherwise the three depths are distinct and `σ` is
determined by the unordered pair `{u,w}` (with `v = (u+w)/2`). So the size is
`1 +` the number of unordered same-parity pairs with `u ≠ w`, i.e.
`1 + C(e,2) + C(o,2)`, which is `1 + m(m−1)` for `L = 2m` and `1 + m²` for
`L = 2m+1`; both equal `⌊(L−1)²/4⌋ + 1`.

**`Z-M = ⌈L²/2⌉`.** `σ = red(−2x_v + x_w)` (and by M2 the same family as
`Z:110`). Feasibility is `0 ≤ u = 2v − w ≤ L−1`. Distinct `(v,w)` give distinct
signatures (`(0,0) ↦ ∅`, `(v,0) ↦ −2x_v`, `(0,w) ↦ x_w`, else the two-term
form). Counting admissible `(v,w)`: for `2v ≤ L−1`, `w ∈ [0,2v]` gives `2v+1`
values; for `2v > L−1`, `w ∈ [2v−L+1, L−1]` gives `2L−1−2v`. For `L = 2m` the
total is `Σ_{v=0}^{m−1}(2v+1) + Σ_{v=m}^{2m−1}(4m−1−2v) = m² + m² = 2m² = L²/2`;
for `L = 2m+1` it is `(m+1)² + m² = 2m²+2m+1 = ⌈L²/2⌉`.

**`P-M = ⌊L²/4⌋`.** `σ = red(x_u − 2x_v)` over `P`; feasibility is
`0 ≤ w = 2v−L−u ≤ L−1`, so `v ≥ ⌈L/2⌉` and `max(0, 2v−2L+1) ≤ u ≤ 2v−L`.
Distinct `(u,v)` give distinct signatures. For `L = 2m` the count is
`Σ_{v=m}^{2m−1}(2v−2m+1) = 1+3+⋯+(2m−1) = m²`; for `L = 2m+1`,
`Σ_{v=m+1}^{2m}(2v−2m) = 2Σ_{k=1}^{m}k = m(m+1)`. Both equal `⌊L²/4⌋`.

**`P-OO = P-A = C(⌊L/2⌋+1,2)`.** For `P:101`, `σ = red(x_u + x_w)` with
`u + w = 2v − L`, so `u+w ≡ L (mod 2)` and `u+w ≤ L−2` (from `v ≤ L−1`);
conversely every such pair is realisable. The signature is determined by the
unordered pair `{u,w}`, so the count is the number of unordered pairs with
repetition, same parity as `L`, and sum `≤ L−2`. Substituting `u = 2i(+1)`,
`w = 2j(+1)` turns this into `#{i ≤ j : i+j ≤ ⌊(L−2)/2⌋}` summed over the two
parity classes, which evaluates to `C(⌊L/2⌋+1, 2)`.
For `P:111` the depths satisfy the same equation and `v` is determined by
`{u,w}`, so its family is indexed by the *same* set of unordered pairs, giving
the same cardinality — but a different set of signatures (see §8).

**`Pt-M = ⌊L²/4⌋ − 1` and `Mt-M = ⌊L²/4⌋ − 1`.** Immediate from `P-M`,
`M-M` and Lemmas 6.1–6.2: exactly one signature is removed.

The `M`-side formulas follow from the `P`-side ones by the involution
`i ↦ L − i` on depths, which carries the equation `u+w = 2v−L` to
`u+w = 2v+L`; the boundary discrepancy this involution creates at `i = 0`
is precisely Lemma 4.1's asymmetry between `p⁺` and `p⁻`.

*Check:* every one of the nineteen formulas verified for `L = 5..200`,
**0 failures**, and the family count is 19 throughout.

## 8. Pairwise distinctness

**Theorem 8.1.** For `L ≥ 5` the nineteen families are pairwise distinct.

Two invariants suffice, and **neither alone does**:

- the **coefficient-shape spectrum**: the set of multisets of coefficients
  occurring in the reduced signatures (e.g. `{1}`, `{−2}`, `{1,1}`, `{2}`,
  `{1,−2}`, `{1,−2,1}`, …), together with whether `∅` occurs;
- the **cardinality** from §7.

*Verification.* Over `L = 5..60` all `19·18/2 = 171` pairs per `L` are
separated: **643** pairs by shape spectrum only, **252** by cardinality only,
**8681** by both, and **0** unseparated. The 252 shape-only-degenerate pairs are
exactly why cardinality must be retained — for instance `P-OO` and `P-A` both
have cardinality `C(⌊L/2⌋+1,2)` and are separated only by shape (`P-OO` never
contains a three-term signature, `P-A` does); conversely `P-M` and `Pt-M` share
a shape spectrum and are separated only by cardinality (`⌊L²/4⌋` vs
`⌊L²/4⌋−1`). ∎

**Honest scope.** This is a *verified* distinctness statement over `L = 5..60`
plus the closed cardinalities (which are proved for all `L`). A fully
`L`-uniform proof of shape-spectrum separation is not written out here; what is
proved for all `L` is the cardinality half, which already separates every pair
except those listed as shape-only. Completing the shape half symbolically is
mechanical but is **not** claimed as done.

## 9. Small-`L` boundary

| `L` | 2 | 3 | 4 | 5 | 6 | 7 | ≥5 |
|---|---:|---:|---:|---:|---:|---:|---|
| classes | 9 | 15 | 19 | 19 | 19 | 19 | 19 |

- `Z_s = ∅` for `L ≤ 4`, since `r ≥ 2` and `a + 2r ≤ L−1` force `L ≥ 5`.
  Hence at `L = 4` the class `Zs-A` is the *empty set of signatures*, a
  different object from the nonempty `Zs-A` of `L ≥ 5`. The count `19` at
  `L = 4` is therefore a coincidence of a different family list, exactly as
  the manuscript's corrected §8.1 wording says.
- `⌊(L−3)²/4⌋ = 0` at `L = 3,4` confirms this from the closed form.
- At `L = 3` two further classes collapse (15), at `L = 2` six do (9).
- **`L ≥ 5` is the first stable value** and is the correct hypothesis.

## 10. Hypothesis audit

| hypothesis | status | reason |
|---|---|---|
| one unresolved role | **ESSENTIAL** | with two unresolved roles the support is bilinear in two prefix families and the 34-pattern count is replaced by a larger product |
| constant block length `L` | **ESSENTIAL** | the carry recurrence of Lemma 2.1 is exactly Euclidean division by a *fixed* `L` |
| Abelian **square** (not `k`-power) | **PROOF-CONVENIENCE** | for a `k`-power there are `k+1` cutpoints and `k` carries; `δ` generalises to a carry-difference vector in `{−1,0,1}^{k−1}`. The classification generalises but the counts `6/34/19` do not |
| `K ≥ 2` | **ESSENTIAL for `Z_s`** | `K = 1` would add `r = 1` same-block triples; it is what makes `Z_s` start at `L = 5` |
| ternary target alphabet | **NOT NEEDED** | nothing in §§2–8 uses `|Σ| = 3`; signatures are formal linear forms |
| exactly three cutpoints | **ESSENTIAL** | same as the square hypothesis |
| fixed block profile | **NOT NEEDED** | profiles enter only the *targets*, never the support |

## 11. What is proved here versus checked

**Proved for all `L`:** Lemmas 2.1, 2.2, 3.1, 4.1; Proposition 5.1; the merge
Lemmas 6.1, 6.2; Theorem 6.3 (given distinctness); every one of the nineteen
closed cardinalities in §7.

**Verified, not proved for all `L`:** the shape-spectrum half of pairwise
distinctness (checked `L = 5..60`); the family count `19` itself is proved
modulo that distinctness.

**Checked as falsification layers:** boundary lemma `L = 4..120`; cardinalities
`L = 5..200`; distinctness `L = 5..60`; the 34-row table at `L = 40`.

Checker: `work/sixdomain_full.js`. Table:
`PAPER4_34_PATTERN_TO_19_FAMILY_TABLE_2026-08-29.csv` (34 rows, class ids,
shape spectra).
