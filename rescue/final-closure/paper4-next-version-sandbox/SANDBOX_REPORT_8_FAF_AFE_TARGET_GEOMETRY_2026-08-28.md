# Paper 4 — sandbox report #8: FAF ∩ AFE target geometry

**Date:** 2026-08-28
**Scope:** sandbox only. No manuscript edited, no canonical evidence changed, no Git mutation. Supplied packages unmodified.
**Mäkelä:** OPEN. **Complete-AEF at L=40:** UNRESOLVED. **L=40 impossibility:** NOT ESTABLISHED. **Novelty:** NOVELTY_UNRESOLVED.

---

## 1. Capped-case closure (POST-REGISTERED — history not rewritten)

**The Report-7 primary result is unchanged.** Its denominators correctly excluded capped
cases; this section is a separate post-hoc study.

**A defect in my own Report-7 runner:** `af_exists_run.js` counted capped A but never
persisted their IDs, so the capped set had to be re-identified by replaying the same
deterministic scan at the same cap (5,000,000). Recorded, not hidden.

| | Report-7 capped | re-found by rescan | resolved | AF-positive | AF-negative | still capped |
|---|---:|---:|---:|---:|---:|---:|
| **R (priority)** | 3 | **3** | **3 — COMPLETE** | **0** | **3** | **0** |
| **H** | 16 | **16** | **16 — COMPLETE** | **0** | **16** | **0** |

The rescan re-found exactly the Report-7 capped counts (3 and 16), an independent
confirmation that the deterministic replay reproduced the original capped set.

Every resolved case needed only 5.2–9.4 M nodes against the 5 M cap — they were marginal,
not hard. **No R-side `AF_AND_AFE_EXISTS` survivor appeared**, so §1's freeze condition was
not triggered.

**Consequence — the closure is now total.** All **19** previously capped A words are resolved
and **every one is AF-negative**. No new AF-positive A appeared in either population, so the
Report-7 **48-vs-0** result is untouched.

Denominators may now be stated over the full preregistered N:

| | AF-positive | denominator | exact ratio |
|---|---:|---:|---:|
| H | 202 | **72,454** (was 72,438) | **0.2788 %** (was 0.2789 %) |
| R | 58 | **72,454** (was 72,451) | **0.0801 %** (unchanged) |

H's 16 capped indices cluster sharply — 11 of 16 fall in 70,214...70,717 — indicating a
structurally hard late region of H's enumeration rather than scattered difficulty.
All 19 resolved with only 5.1-9.4 M nodes against the 5 M cap.

## 2. Package hashes and unchanged replay

| Package | SHA-256 |
|---|---|
| `PAPER4_FAF_AFE_INTERSECTION_v0.1_2026-08-28.zip` | `dcb4d103d9d63cb0…` |
| `PAPER4_FAF_AFE_GENERAL_THEOREM_v0.1_2026-08-28.zip` | `270c02c6ad60f689…` |

**All 8 files in both internal manifests MATCH.** Nothing modified.

Verifiers run **unchanged**, both PASS:

```
verify_faf_afe_intersection.py --selftest : 393,720 comparisons, 16,070 genuine squares, all 8 branch classes exercised, PASS
verify_faf_afe_general_theorem.py        : L = 4..200, zero failures
```

## 3. Independent theorem audit (clean-room, no shared code)

`work/cleanroom_faf_afe.js` derives reduced signatures directly from
`D(s,K) = P(s+2K) − 2P(s+K) + P(s)`, substituting `x_0 = 0`, `x_L = m(F)`.

Tested L = 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 20, 21, 39, **40**, 41, 60, 61, 100, 101, 150, 199, 200 — **odd and even, small and large**:

| claim | result |
|---|---|
| `S_AFE(L) ⊆ S_FAF(L)` | **true for every L tested** |
| `S_FAF \ S_AFE = M_L` | **true for every L tested** (no extras, none missing) |
| `M_L` disjoint from `S_AFE` | **true for every L tested** |
| `\|M_L\| = ⌊L²/4⌋` | **true for every L tested** |
| L = 40: AFE 1161, FAF 1561, diff 400 | **confirmed** |
| AFE and FAF primal graphs identical | **true**, 703 edges at L=40 |
| all non-adjacent pairs present, no adjacent edge | **true for every L tested** |
| unit steps complete to `K_(L−1)`, treewidth `L−2` | **true**: 703 + 38 = 741 = C(39,2) |

**Coefficient-cancellation hunt:** zero FAF signatures contain a `−1` coefficient; zero have
any coefficient outside `{+1, −2, +2}`. Observed patterns at L=40:

```
AFE: {1:39, -2:39, (empty):1, "-2,1":379, "1,-2":379, "1,-2,1":324}          = 1161
FAF: same, plus {2:39, "1,1":361}                                            = 1561
```

The 400 excess is **exactly** `39` doubled-prefix + `361` same-parity-pair signatures.

**Midpoint affine equation verified on real blocks:** `x_i + x_j − 2p_A((i+j)/2) + m(A) − m(F) = 0`
agreed with the direct second difference on **80,000 / 80,000** checks, 0 disagreements.

### 3.1 One defect found — in the proof text, not the theorem

Section 6 of the supplied proof asserts:

> “If `K <= L`, all free variables come from at most one F copy.”

**This is false as written.** Clean-room enumeration at L=40 finds **400 FAF windows with
`K ≤ L` in which both F copies contribute free variables** (e.g. `K = L`, `t_0 = i`,
`t_2 = 2L + i`, giving `2x_i`).

**The theorem is unaffected**: all 400 such signatures lie in `M_L`, which is exactly where
the theorem places them. Whenever both F copies contribute, `t_1 = L + (i+j)/2` lies strictly
inside A, so the signature is always `x_i + x_j` with `i ≡ j (mod 2)` — regardless of `K`.
The case split should be “both F copies contribute / at most one does”, not “`K ≤ L` / `K > L`”.

**Status: exposition defect, documented; theorem promotion not blocked.**

## 4. Theorem verdict

> **MATHEMATICALLY CORRECT** — every claimed identity independently reproduced clean-room
> across L = 4…200, including odd/even, boundary depths 0 and L, K = 2 and maximal K, and an
> explicit coefficient-cancellation search. One proof-exposition slip (§3.1), no
> counterexample to any theorem statement.
>
> **NOVELTY: NOVELTY_UNRESOLVED** — correctness is labelled separately from novelty, and no
> novelty search was performed in this phase.

## 5. §4 reconciliation — the two arity conventions

Both reproduced exactly by my own code, **totals identical (3081)**:

| convention | 0 | 1 | 2 | 3 | total |
|---|---:|---:|---:|---:|---:|
| **cutpoint** (Report 6) | 703 | 1238 | 798 | 342 | 3081 |
| **free-variable** (package) | 724 | 1275 | 758 | 324 | 3081 |

They differ because a cut at F-depth 0 or L loses its free variable after substituting
`x_0 = 0`, `x_L = m(F)`. **No false comparison exists**; Report 6 and the package are
counting different (both valid) things.

*(Numerical coincidence worth flagging so it is not over-read: the 703 arity-0 windows and
the 703 primal-graph edges are unrelated quantities that happen to share a value.)*

## 6. Shared target-bucket formulation — validated

`L_σ(x) ∉ T_FAF(σ;A) ∪ T_AFE(σ;A,E)` was checked against the reference predicate
(complete-AF `K ≤ 60` **and** AFE `K ≤ 40`):

```
2,000 random controls : 2,000 agree, 0 disagree
59 known K<=40-clean triples : 59 pass the bucket gate, 0 lost, 0 reference mismatches
```

The 59 positives are the non-vacuous half of this test.

## 7. The two R near-miss pairs

Both share E `933c0dee15dd32a3`; A = `8dfaaf7687802e0f`, `2a3ec65a1945021b`. Each has
exactly **one** complete-AF F, and it is not AFE-clean (Report 7). Bucket probes:

| probe | both R pairs |
|---|---|
| active signatures / shared / midpoint | **1560 / 1160 / 400** |
| combined gate | **UNSAT**, 153,895 nodes, not capped |
| **(Q4) last feasible depth** | **35** of 40 |
| **(Q6) without the 400 midpoint signatures** | **still UNSAT, same depth 35** |
| FAF targets only | **SAT** |
| AFE targets only | **SAT** |

**Answers.** **Q6 (flagged as especially important): the fatal core does NOT involve the
FAF-only midpoint family — it lies entirely among signatures shared with AFE.**
**Q1/Q2/Q3: not answered.** Minimal-UNSAT-core extraction (binary search + greedy shrink)
did **not complete** within the session; it is reported as unfinished rather than estimated.
**Q5** likewise remains open pending that core.

## 8. Matched H controls

Four `AF_AND_AFE_EXISTS`-positive and four AFE-only-negative H pairs, same probes:

| group | full | death depth | without midpoints | FAF only | AFE only | signatures |
|---|---|---:|---|---|---|---|
| H positive (×4) | **SAT** | — | SAT | SAT | SAT | 1560 / 1160 / 400 |
| H negative (×4) | **UNSAT** | **32** | UNSAT, depth 32 | SAT | SAT | 1560 / 1160 / 400 |
| R near-miss (×2) | **UNSAT** | **35** | UNSAT, depth 35 | SAT | SAT | 1560 / 1160 / 400 |

## 9. Midpoint-family role — measured, not assumed

Across **all 10** probed pairs (2 R + 8 H), removing the 400 FAF-only midpoint signatures
**never** changed SAT/UNSAT and **never** changed the extinction depth.

> **The midpoint family is irrelevant to every case tested.** It is real mathematics and a
> genuine part of `S_FAF`, but it is not a source of AF feasibility, not disproportionately
> present in the fatal region, and not implicated in H/R separation — on this evidence.

## 10. Mechanism verdict

The §8 hypothesis was: *selectivity arises from compatibility of forbidden affine TARGETS on
a common FAF support skeleton, not from different support topology.*

- **Topology half: CONFIRMED, and more strongly than claimed.** The support skeleton is
  **numerically identical for every (E,A) tested** — 1560 active signatures, 1160 shared,
  400 midpoint, in all 10 cases, H and R alike. It cannot carry any selectivity.
- **Target half: CONFIRMED as the operative mechanism.** In every negative case FAF-only is
  SAT and AFE-only is SAT; only their **union** is UNSAT. Emptiness is always produced by
  target collision on shared supports, never by either family alone.
- **But the mechanism does not by itself separate H from R.** H-negative pairs behave
  *exactly* like the R pairs (UNSAT, both families individually SAT, midpoints irrelevant,
  late extinction). The mechanism explains the **predicate**; the population difference is
  that H reaches SAT for some (E,A) and R for none. **That residue is UNRESOLVED.**

## 11. Solver implications

- Treewidth `L−2 = 38` on the raw prefix variables is **independently confirmed** — a generic
  low-treewidth DP on raw prefix variables is ruled out.
- **But compression clearly exists in another representation.** The bucket-based DFS proved
  emptiness in **153,895 nodes**, far below the 20–30 M caps, because the shared skeleton
  deduplicates constraints and membership is an O(1) hash lookup per signature.
- Deduplication is substantial: 3,081 + 3,600 windows collapse to **1,560** distinct active
  signature buckets.
- Not yet benchmarked against the Report-6 specialised DFS; correctness was the gate here.

## 12. Epistemic labels

| Claim | Label |
|---|---|
| Package manifests match; verifiers pass unchanged | **ESTABLISHED** |
| `S_AFE ⊆ S_FAF`; `S_FAF \ S_AFE = M_L`; `\|M_L\| = ⌊L²/4⌋`; primal graph `K_(L−1)`, treewidth `L−2` | **PROVED / independently reproduced clean-room, L = 4…200** |
| Proof §6 “K ≤ L” sentence | **FALSE AS WRITTEN** — exposition defect; theorem unaffected |
| Midpoint affine equation | **ESTABLISHED**, 80,000/80,000 |
| L=40 counts 1161 / 1561 / 400; both arity conventions reconciled | **ESTABLISHED, exact** |
| Bucket gate ≡ (complete-AF ∧ AFE) | **ESTABLISHED**, 0 disagreements, 0 positives lost |
| Capped closure: 19/19 resolved (R 3, H 16), all AF-negative, 0 still capped | **ESTABLISHED, exact** |
| H capped closure | **COMPLETE** — 16 of 16, all AF-negative, 0 still capped |
| Support topology identical across all probed (E,A) | **ESTABLISHED for the 10 probed pairs** |
| Emptiness always requires both families | **ESTABLISHED for the 10 probed pairs** |
| Midpoints irrelevant | **EMPIRICAL**, 10/10 probed pairs |
| Target geometry explains H-vs-R **population** difference | **NOT ESTABLISHED** — H-negative pairs are indistinguishable from R pairs |
| Minimal UNSAT cores (Q1/Q2/Q3/Q5) | **UNRESOLVED** — extraction did not complete |
| Novelty | **NOVELTY_UNRESOLVED** |
| Complete-AEF existence / L=40 impossibility | **UNRESOLVED / NOT ESTABLISHED** |

## 13. Exact next action

1. ~~Finish the H capped closure~~ — **DONE**; all 19 capped cases resolved AF-negative, and
   the Report-7 denominators are now the full 72,454 for both populations.
2. **Complete the minimal UNSAT-core extraction**, which is the one commissioned item left
   open. The full-bucket solve is fast (≈154 k nodes); the cost was in repeating it per
   candidate signature. A better route is to instrument a single solve to record which
   signatures actually fired on the surviving frontier, and take the core from that trace
   rather than by repeated re-solving.
3. **Then attack the real residue**: the mechanism explains why any given (E,A) fails, but
   not why H ever succeeds and R never does. Since the support skeleton is provably
   identical, the discriminator must live in the **target values** `T_FAF(σ;A)` and
   `T_AFE(σ;A,E)` — specifically in how many shared signatures have colliding targets. That
   statistic is cheap to compute over the Report-7 populations and is the first candidate
   that could actually separate H from R.

Do **not** build `fafea`, expand the Hamming radius, add B or D, or start a new population.

Raw data and logs remain under `runs/`, separate from this report.
