# Preregistration — the `h = 7` cutoff

**Date written:** 2026-08-24
**Status:** WRITTEN BEFORE THE COMPUTATION. Not yet run.
**Purpose:** fix in advance what `h = 7` would have to show, so that whatever
it shows cannot be narrated after the fact.

---

## 0. Why preregister this at all

The certified family `h ∈ {2,…,6}` supports one structural observation: the
first increase in `C_h` occurs at the same cutoff as the first strict
`valid > essential` loss, namely `h = 5`. In a five-member family with four
candidate transition positions, that coincidence carries roughly two bits. It
is currently rescued not by its own statistical weight but by the `K=5`
ablation, which exhibits a single half-Parikh class doing both jobs inside one
graph.

`h = 7` is the cheapest available test of whether the observation is more than
a coincidence. It is also the point of maximum narrative danger: run first and
interpret afterwards, and *any* outcome will appear to fit. Hence this file.

**This document must not be edited after the computation is run.** Results go
in a separate report that cites it.

---

## 1. The object

`L_7` = ternary words with no Abelian square of half-length `K ∈ {2,…,7}`.
Canonical memory `m = 2h − 1 = 13`. Raw state space `3^13 = 1,594,323`.

---

## 2. Predictions

### P1 — Implementation check (derivable now, not a test)

> `valid(L_7) = 37,698`.

A valid state is a 13-letter word with no Abelian square of half-length
`K ∈ {2,…,6}`. The largest half-length that fits in 13 letters is 6, so this
condition coincides with "no Abelian square of half-length `≥ 2`". The count of
such words at length 13 was brute-forced during the `h`-family work and is
`37,698`.

**If the builder returns anything else, stop — the implementation is wrong,
and nothing downstream may be interpreted.** This is a gate, not a finding.

### P2 — Recurrent-state loss

> `essential(L_7) < valid(L_7)`, i.e. `h = 7` loses recurrent states.

Both `h = 5` (3114 → 2844) and `h = 6` (11070 → 10128) lose states. The
prediction is that this continues.

### P3 — The variance rate

> `a_7 ∈ [0.065, 0.080]`, point estimate `≈ 0.072`.

Basis: `a_h` for `h = 4,5,6` is `0.16142, 0.12003, 0.09220`, giving successive
ratios `0.7436` and `0.7681`. Continuing at a ratio near `0.78` gives
`a_7 ≈ 0.0922 × 0.78 ≈ 0.0719`.

### P4 — The collision constant

> `C_7 ∈ [1.15, 1.40]`, point estimate `≈ 1.28`, and in particular `C_7 > C_6`.

This follows from P3 via `C_h = 1/(2√3·π·a_h)`, which is an identity, not an
independent prediction.

### P5 — The Perron root

> `λ_7 ∈ [1.75, 1.80]`, point estimate `≈ 1.771`.

Basis: `λ_h = 2.4511, 2.2288, 2.0666, 1.9442, 1.8483` has successive
differences `−0.2223, −0.1622, −0.1224, −0.0959`, whose ratios are
`0.730, 0.755, 0.784`. Continuing at `≈ 0.80` gives a next difference of
about `−0.077`.

### P6 — Structural hypotheses

> The essential graph of `L_7` has a unique dominant SCC, graph period 1
> certified by two coprime-length closed walks at an explicit root, and
> equal-length-cycle projected Parikh differences with `|det| = 1`.

If any of these fails, `C_7` is **not defined by the family's formula** and no
comparison with `C_6` may be made. This is a real possibility and must be
checked before P3–P5 are evaluated.

---

## 3. Falsification conditions

Stated in advance, in decreasing order of consequence for the manuscript.

### F1 — Sharp refutation of the "state loss tracks upturn" reading

> `h = 7` loses recurrent states **and** `C_7 < C_6`.

This would show that recurrent-state loss and collision-constant increase can
occur at the same cutoff and move in opposite directions. The manuscript's
§12.2 framing would have to be rewritten: the `h = 5` coincidence would
demote to a one-off, and the `(3,1,1)` ablation would become the *only*
supporting evidence rather than the stronger of two. **The paper survives
this** — Theorem 6.3 and the certified family are untouched — but its
discussion section changes materially.

### F2 — The structural assumption breaks

> `essential(L_7) = valid(L_7)`, i.e. no state loss at `h = 7`.

This would contradict the implicit "once losing, always losing" reading that
nobody has actually justified. It would make the `h = 5,6` losses look like a
window rather than a threshold, and would substantially weaken any structural
narrative. Whatever `C_7` does in this case is highly informative and should
be reported prominently.

### F3 — Hypothesis failure

> Multiple dominant SCCs, period `> 1`, or lattice covolume `> 1` at `h = 7`.

Then `C_7` is undefined by the present method. This is not a refutation of
anything in the paper — the paper certifies its hypotheses per `h` and claims
nothing beyond `h ≤ 6` — but it would be a strong signal that the family is
not uniform, and would need reporting rather than quiet omission.

### F4 — Prediction miss without structural failure

> Structural hypotheses hold, `C_7 > C_6`, but `C_7` falls outside `[1.15, 1.40]`.

This falsifies the *extrapolation*, not the phenomenon. Report the miss
explicitly; do not silently widen the band afterwards.

---

## 4. What confirmation would and would not buy

If P2–P6 all hold — `h = 7` loses states and `C_7 ≈ 1.28` — this is the third
consecutive `(loses states, increases)` pair. That is **consistent** with the
structural reading but does **not** discriminate it from the simpler
alternative that `a_h` is decreasing for reasons unrelated to state loss, once
`h ≥ 5`.

To actually discriminate, one would need a cutoff that loses states without
increasing `C`, or increases `C` without losing states. Neither is available
in `h ≤ 7`. **Confirmation here should therefore be reported as consistency,
never as support for a causal law.** That restriction stands regardless of how
clean the numbers look.

---

## 5. Cost and feasibility

| step | scale | feasible? |
|---|---|---|
| build states | `3^13 = 1.59M` raw, `~40` checks each | yes, seconds |
| essentialize, SCC, period | `~37.7k` states | yes, trivial |
| lattice certificate | layered DP, `37.7k × (L+1)²` per layer | yes, up to `L ≈ 20` |
| `a_7` (Green–Kubo) | sparse iterations on `~37.7k` states | yes, trivial |
| `a_7` (moment DP cross-check) | three accumulators per state | yes, trivial |
| **finite-`n` validation of `R_n^(7)`** | `37.7k × 61²` doubles `≈ 1.1 GB` | **no**, not at `n = 60` on this machine |

So the spectral quantities are cheap and the asymptotic validation is not.
`h = 7` will therefore arrive with the same evidence gap `h = 6` has: a
derived constant with no independent finite-`n` confirmation. **That gap must
be stated in the result report, not discovered later.**

---

## 6. Explicit non-goals

Running `h = 7` does **not**:

- extend Theorem 6.3, which is stated for `h ∈ {2,…,6}` and would need its own
  certificates to extend;
- bear on Mäkelä's conjecture;
- license any statement about `lim_h λ_h` or `lim_h a_h` from six or seven
  points.

The `λ_h` limit question is interesting and is listed as open in the
manuscript. One more point does not answer it, and extrapolating a limit from
seven terms would be exactly the kind of unforced overreach this file exists to
prevent.

---

## 7. Commitment

Predictions P1–P6 and falsification conditions F1–F4 are fixed as of the date
above. The result report will state, for each, whether it held — including the
ones that did not.
