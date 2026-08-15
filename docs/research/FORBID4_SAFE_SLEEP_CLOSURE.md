# FORBID4: SAFE-SLEEP CLOSURE

This document closes the FORBID4 optimization cycle. Both practical safe-sleep architectures failed the deep-seed production performance gate, despite sound mathematics. The project is now resetting toward structural research.

## [MATH]

The internally proved candidate-state formulation is clean and exact:

```
B_K(w) = P(n) - 2P(n+1-K) + P(n+1-2K)
```

Candidate `x` closes a `K`-square if and only if:

```
B_K(w) + e_x = 0
```

An internal hostile audit established:
- An append update has an L1 norm change of `<= 4`.
- Safe-sleep distance lemma holds.
- Wake delay is `q = max(1, ceil(D/4))`.
- Safely skipped intermediate states is `s = max(0, ceil(D/4)-1)`.
- Clean `B_K`-distance `D` is always even.
- Direct reconstruction after sleep is exact.
- Early wake is safe.
- Deadlines are subtree-scoped.
- Branch-local deadlines require rollback on DFS pop.

*(Note: This is an internal structural result, not a published literature theorem or novelty claim.)*

## [IMPLEMENTATION]

Two C++ safe-sleep architectures were investigated natively.

### A. EVENT-DRIVEN TIMING WHEEL
The hostile source audit found that the frame-scoped rollback/subtree discipline appeared sound, sibling deadline leakage was closed, witness K was control-flow irrelevant, and packed Parikh arithmetic was sound. 

However, the audited `B_K` algorithm was *not* implemented exactly. The inspected timing-wheel prototype used a shifted `S_K`-based certificate (`S_K(N) = P(N)-2P(N-K)+P(N-2K)`) that was separately shown conservative by hostile source audit. Furthermore, K activation/insertion had redundant duplicate work, threshold conventions were inconsistent, fixed scratch arrays lacked explicit bound checks, `primeWheel` had root-only special handling, and baseline provenance in one A/B chain was not fully pinned.

### B. FLAT DEADLINE SCAN
The later architecture introduced:
- Flat contiguous `wake[K]`.
- Flat exact undo trail.
- No timing wheel, heap, or bucket structure.
- Full ascending long-K scan retained.
- Sleeping K reduced to a simple wake comparison.
- Exact `B_K` candidate-state arithmetic used.

An initial component-sum bug was found by strict path parity and corrected (`ca = -1 - cb - cc` rather than `ca = -cb - cc`). After correction, there were zero path/hash/counter mismatches across the tested fixed-step budgets.

*(Note: Prototype source is not committed to the repository, per conventions for failed prototypes.)*

## [PERFORMANCE]

Both architectures were benchmarked on the real deep-seed authoritative workload (Veikko-v5 lazy-production search shape, starting frontier length approximately 1900, fixed-step A/B, identical trajectory within each reported comparison).

### TIMING-WHEEL SAFE-SLEEP (1M steps)
- **Baseline**: ~1.66 s
- **Safe-sleep**: ~6.84 s
- **Long-K exact evaluations**: 1,107,950,086 -> 12,688,555 (~98.85% reduction)
- **Whole-search**: ~4.11x slower

### FLAT-DEADLINE SAFE-SLEEP (1M steps)
- **Baseline**: ~1.3833 s
- **Flat**: ~4.6836 s
- **Long-K exact evaluations**: 1,107,950,086 -> 178,321,463 (~83.9% reduction)
- **Additional flat work**: 
  - Wake comparisons: 929,628,623
  - Undo writes: 171,736,531
  - Undo restorations: 171,736,531
- **Whole-search**: ~3.39x slower

**Interpretation:**
Both tested always-on safe-sleep execution architectures failed the production performance gate on the measured deep record-hunt workload. The engineering observation is that proof/work compression does not equal runtime compression. 

### MICROARCHITECTURAL LANGUAGE
The flat variant replaced many exact long-K calculations with nearly one billion deadline comparisons and hundreds of millions of undo-state writes/restorations. In the measured workload, that bookkeeping cost more wall-clock time than the baseline arithmetic it replaced.

## [CAVEATS]
- No worst-case complexity improvement was proved.
- No lower bound on exact checking was proved.
- There is no statement that safe-sleep can never be made faster.
- The baseline provenance caveat from the earlier timing-wheel audit remains.
- Performance claims are strictly scoped to the tested implementations and workloads.

## [STATUS]

- **SAFE-SLEEP MATHEMATICS**: RETAIN AS INTERNAL STRUCTURAL RESULT
- **TIMING-WHEEL IMPLEMENTATION**: PERFORMANCE FAIL — CLOSED
- **FLAT-DEADLINE IMPLEMENTATION**: PERFORMANCE FAIL — CLOSED
- **SAFE-SLEEP PRODUCTION OPTIMIZATION LINE**: CLOSED FOR NOW
- **REOPEN CONDITION**: only if a future mathematically decisive experiment requires it or a qualitatively different near-zero-state-cost representation emerges.
