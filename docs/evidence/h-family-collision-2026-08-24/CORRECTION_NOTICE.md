# Correction notice — `h=6` finite-`n` reporting incident

**Date:** 2026-08-24
**Classification:** REPORTING-ONLY DEFECT
**Status:** corrected; the wrong figure is preserved below so it cannot re-enter.

This notice is kept per `EPISTEMIC_DISCIPLINE.md` and `AGENTS.md` rule 9. It
records what was reported, what was true, how the gap was found, and what
changed as a result.

---

## 1. What was reported

A figure was reported as the exact all-language word count
`|L_6 ∩ Σ^80|` (that is, `n = 40` in the finite-`n` collision table), described
as an exact `BigInt` result:

```
47,448,834,418,659,691,888,204,652,230,491,879,796          (38 digits)
```

It was accompanied by a claimed collision numerator of

```
964,724,838,634,509,424,169,726,194,726,671,077
```

and by the statement that the run "processed 47 × 10^36 paths with absolute
precision" using `BigUint64Array` storage.

## 2. What is true

An independent arbitrary-precision dynamic program, built on a from-first-
principles reconstruction of the `L_6` window graph, gives

```
|L_6 ∩ Σ^80| = 28,068,484,992,703,808,552,340                (23 digits)
```

The reported figure is too large by roughly **fifteen orders of magnitude**.

## 3. Why it could not have been right

The error is not a transcription slip; the correct and incorrect values do not
resemble one another. Two independent arguments rule the reported figure out:

1. **Growth rate.** The Perron root of the `L_6` essential component,
   `λ_6 = 1.848333978184`, was already independently certified. It forces
   `log₁₀|L_6 ∩ Σ^80| ≈ 80·log₁₀(λ_6) ≈ 21.3`. The correct value has
   `log₁₀ ≈ 22.4` (the extra order of magnitude is the polynomial prefactor);
   the reported value has `log₁₀ ≈ 37.7`.
2. **Impossibility.** The reported value would require `λ_6 ≈ 4.03`. Since
   `L_6 ⊂ Σ*` over a three-letter alphabet, no sublanguage can grow faster
   than `3^n`. A growth rate above 3 is impossible on its face.

## 4. How it was found

The figure was quoted in discussion in support of the claim that the `h=6`
finite-`n` data were exact. It was checked directly rather than accepted:
a short `BigInt` DP was written against an independently constructed graph and
run. The check took one command.

The same check also verified the correct values for `n = 12, 20, 30, 40, 50`,
all five of which reproduce exactly.

## 5. What was and was not affected

**Not affected — the ratios.** The `nR_n^(6)` column
(`0.5515118594, 0.6631690327, 0.7613727853, 0.8133016883, 0.8459133309`) is
identical before and after the correction. It appeared unchanged in manuscript
drafts v0.2 and v0.4. This is the strongest evidence that the underlying
computation was sound and the defect was confined to reporting.

**Not affected — the theorem.** `C_6 = 0.9966608746…` is derived from the
certified graph, lattice, covariance and local-limit argument. It does not
depend on the finite-`n` table, which is validation only.

**Affected — the prose report only.** The absolute counts quoted in discussion
did not correspond to the preserved raw output of the dynamic program.

## 6. Evidence levels after correction

The `h=6` finite-`n` evidence separates into three levels, and the manuscript
(Appendix B) now states them distinctly:

- **all five denominators** independently reproduced by a separate exact
  arbitrary-precision language-count DP;
- **numerators for `n = 12, 20, 30`** independently reproduced by a separate
  arbitrary-precision implementation;
- **numerators for `n = 40, 50` NOT independently recomputed** — the raw
  computation was audited for arithmetic storage safety only (largest observed
  typed-array cell `2,182,364,991,314`, against `2^64 − 1 =
  18,446,744,073,709,551,615`, so no wraparound is possible).

No claim is made that the `n = 40, 50` numerators received a second
independent computation.

## 7. Lesson recorded

The reported figure had every surface feature of a real exact computation: it
was a specific large integer, quoted to the digit, attributed to a named
script, and defended with a plausible implementation detail
(`BigUint64Array`). None of that is evidence. The only thing that settled it
was running an independent computation.

This is the failure mode `AGENTS.md` rule 9 exists to prevent — *a summary of
what a script did is not evidence that it did it* — and it is the same shape as
the row-105 incident that motivated that rule. Recording it here so the
pattern stays visible rather than being absorbed as a one-off.

A related and broader lesson from the same session is recorded in
`docs/research/REFEREE_LOOP_METHOD.md`: several confident status flags in this
work described artifacts that did not exist on disk. The single cheapest
countermeasure is that **no readiness flag is accepted without a file path
that resolves.**
