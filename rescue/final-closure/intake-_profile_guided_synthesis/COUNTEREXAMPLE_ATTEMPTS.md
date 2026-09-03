# Counterexample attempts

Each claim was attacked before being accepted. This records what was tried, what
survived, and what broke.

---

## 1. Theorem B — attacked, survived

**Attack.** Enumerate every waypoint pair `(Y_{d₁}, Y_{d₂})` satisfying the
chain condition, over four profiles, and test whether each is actually realized
by some word of that profile.

**Result.** 246 chain-satisfying pairs, **0 non-realizable**. No counterexample.

**Why it cannot fail.** The proof is constructive: the segment differences are
forced to be nonnegative with the right coordinate sums, and any word with those
segment profiles works. There is no room for an obstruction.

---

## 2. Theorem A — attacked, survived

**Attack.** 300 randomized instances with **two** roles, profiles of length 4–5,
and 1–4 windows per instance whose terms deliberately mix roles (so that a
constraint can couple two distinct unknown blocks). Compare exhaustive literal
search over all pairs of block words against waypoint-CSP feasibility.

**Result.** **0 mismatches.**

**Where I expected it to break, and why it did not.** The natural worry is that
realizing each role independently could create a *new* violation not visible in
the waypoints. It cannot: every constraint in `𝒲` is by construction a function
of the waypoint variables alone, so filling the gaps between waypoints cannot
change any constraint value. The gap-filling is invisible to `𝒲`.

**Where it does break.** Theorem A is false the moment one asks about windows
*outside* `𝒲`. Filling gaps arbitrarily will in general create Abelian squares
at half-periods not declared. This is not a defect of the theorem but a
statement about what it certifies, and it is the reason the architecture cannot
by itself close long periods.

---

## 3. Compression claim — **attacked and BROKEN**

**Claim under attack.** That the waypoint formulation compresses the search
relative to enumerating literal block words.

**Attack.** Measure `D_r`, the number of distinct active cutpoint depths, for
honest window sets at `L = 5, 6, 8, 10, 12, 16, 20, 40`.

**Result.** `D_r = L−1` in **every** case. The waypoint chain is the entire
prefix chain, which is in bijection with the block word. Compression factor
exactly `1`.

**Attempts to rescue it.**

| restriction tried | `D_r` at `L=12` | verdict |
|---|---|---|
| all starts, `K ∈ [2,24]` | 11 / 11 | no compression |
| **single** `K = 7`, all starts | 11 / 11 | no compression — restricting `K` does nothing |
| `K ∈ [2,24]`, `s ≡ 0 mod 12` | 11 / 11 | no compression |
| single start `s = 0`, all `K` | 8 / 11 | *some* compression |

Only restricting the **start set** helps, and a complete gate cannot restrict
starts — every start is a real window. Proposition C in
`THEOREM_CANDIDATES.md` turns this into a proof.

**Status: the compression idea is refuted for complete window sets.** It is not
recoverable by tuning `K`, by choosing the cover, or by choosing `L`.

**Independent corroboration.** This reproduces, from a different direction, the
finding already recorded in Paper 4 §9.2: in the length-40 system the exact
frontier quotient has multiplicity `1` at every realized state and coincides
with the prefix trie. Two unrelated measurements of the same underlying fact.

---

## 4. The `h₆` spectrum — first computation WRONG, corrected

**What happened.** A QR-iteration estimate returned the spectrum
`{3, 0, 0, 0, 0, 0}`, which would have made the source discrepancy bounded and
**killed the Target-D mechanism outright**. I nearly reported that as a negative
result.

**The check that caught it.** Computing the characteristic polynomial exactly by
Faddeev–LeVerrier gives

```
x⁶ − 3x⁵ − 3x⁴ + 9x³  =  x³ (x − 3)(x² − 3),
```

so the true spectrum is `{3, √3, −√3, 0, 0, 0}`. The QR routine had failed to
converge and produced garbage; the exact polynomial also matches
`trace(M) = 3` and `rank(M) = 4`.

**Lesson recorded.** The eigenvalue that decides this entire research line is
`√3`, and a floating-point routine reported it as `0`. Any future use of the
spectrum here should go through the integer characteristic polynomial.

---

## 5. Observation #3 (density rising with `K ≤ 100`) — **attacked and NOT reproduced**

**Attack.** Measure directly the fraction of windows not elidable by the exact
box bound, at `L = 40` with `ρ = (19,11,10)`, as a function of block gap `g`.

**Result.** At `g ≤ 2` — which is where `K ≤ 100` lives when `L = 40` — the
non-elidable fraction is exactly **1.00000**. Nothing is elided. The measured
transition is at `g ≈ 16–32`, i.e. `K ≈ 640–1280`.

**Conclusion.** The discrepancy mechanism cannot be the explanation of the
reported effect at `K ≤ 100`. Either the observation was made at much smaller
`L` (where the crossover is immediate — at `L = 5` the box radius is ~6 and the
bulk target exceeds it almost at once, which would explain the 327/354 figure),
or it is a support-side effect, or it is an artifact. **It should not be cited
as evidence for the mechanism until re-measured with `L` and `g` reported
separately.**

---

## 6. Profile annihilation — attacked, survived

**Attack.** If the profile map `P` annihilated the `√3`-eigenspace, the growing
discrepancy modes would never reach target space and Theorem D would be vacuous
for this construction.

**Result.** Both `√3`-eigenvectors survive: `|Pv|/|v| = 8.51` and `7.34`. Not
annihilated.

**Residual concern.** This appears to be inherited rather than chosen. Paper 4's
rank-one lift preserves the kernel of the shorter coding's incidence matrix, so
survival was decided by the original Rao–Rosenfeld profile choice. A different
construction could easily annihilate the modes without anyone noticing, and
nothing in the current pipeline would flag it.

---

## Summary

| claim | verdict |
|---|---|
| Theorem B (chain realizability) | survives; proved |
| Theorem A (joint CSP ⟺ literal) | survives; proved and verified |
| waypoint **compression** | **refuted** for complete window sets |
| exact box-bound elision | survives; proved |
| discrepancy grows like `√g` | survives; exponent proved, constant measured |
| density decays like `1/√g` | plausible, **not proved** |
| observation #3 at `K ≤ 100` | **not reproduced** at `L = 40` |
| profile does not annihilate `λ₂` modes | survives for the current profiles |
