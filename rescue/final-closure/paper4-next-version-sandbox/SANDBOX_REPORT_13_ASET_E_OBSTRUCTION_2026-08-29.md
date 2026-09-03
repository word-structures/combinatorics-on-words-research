# Sandbox Report 13 — the E-level obstruction `Aset(E) = ∅`

**Date:** 2026-08-29
**Status:** sandbox only. No canonical edit. No `MATH_CLAIMS` edit. No Git
mutation. No promotion. `NOVELTY_UNRESOLVED`. Mäkelä **OPEN**.

Definition and provenance: `ASET_E_OBSTRUCTION_DEFINITION_2026-08-29.md`.
Theorem candidate: `ASET_E_OBSTRUCTION_THEOREM_CANDIDATE_2026-08-29.md`.

---

## 1. Phase 0 — frozen inputs

`|Aset(E)|` was recomputed from scratch for all 69 E and reproduces Report 11
exactly: **R 24/60 zero**, **H 0/9 zero**. All 69 E have profile `(13,16,11)`.
Words, hashes, sizes and 45 first witnesses are frozen in
`runs/aset_E_frozen.json`.

The compatibility condition was written mathematically and re-implemented
independently of the DFS, then cross-validated on **13,800 random A across all
69 E: 0 mismatches**.

## 2. Phase 1 — `Aset(E)` as an exact constraint system

With `p(i) = Psi(E[0..i))`, `x(j) = Psi(A[0..j))`, `σ_r = Psi(last r letters of E)`,
and `n = 40+m`, the abelian-square condition splits **exactly** into three classes:

| class | range | constraint | depends on |
|---|---|---|---|
| ternary | `2k ≤ m` | `x(m) − 2x(m−k) + x(m−2k) ≠ 0` | **A only** |
| binary | `m < 2k ≤ 2m` | `x(m) − 2x(m−k) ≠ p(40) − p(40+m−2k)` | A and E |
| unary | `k > m` | `x(m) ≠ σ_{2k−m} − 2σ_{k−m}` | **E only** |

**Counts are identical for all 69 E: 361 ternary, 419 binary, 380 unary.**

Answers to the Phase-1 questions:

1. *Which constraints depend only on E?* The 380 unary targets, plus the target
   values of the 419 binary constraints.
2. *Which are constraints on A alone?* The 361 ternary ones — they are exactly
   "`A` itself has no abelian square of half-period `k ≤ 20`", with no reference
   to `E`.
3. *Which couple E and A?* The binary family, and the unary family only through
   its targets.
4. *Arity?* Unary/binary/ternary in the prefix states, as tabulated.
5. *Expressible in the occurrence-support language?* **Yes, and derived rather
   than imported.** The support geometry `{x(m)}`, `{x(m) − 2x(m−k)}`,
   `{x(m) − 2x(m−k) + x(m−2k)}` is **fixed and E-independent**; only the affine
   targets move with `E`. This is precisely the "shared support skeleton,
   E-dependent forbidden targets" structure established downstream in Reports 8
   and 10 — here it is proved at the upstream `E→A` stage by direct derivation,
   not by importing the Six-Domain theorem.

Two further exact reductions were derived and used (both were initially missed
by me and are recorded as corrections in §5):

- `k = m` makes the binary constraint unary, since `x(0) = 0`:
  **`x(m) ≠ σ_m`** — "`A`'s first `m` letters must not match `E`'s last `m`
  letters in Parikh".
- At `m = 40`, `x(40) = (15,14,11)` is **known**, so binary constraints with
  `k ∈ [21,40]` become unary on `x(40−k)`, `40−k ∈ [0,19]`.

So `Aset(E) ≠ ∅` is exactly: **a monotone lattice path from `(0,0,0)` to
`(15,14,11)` in 40 unit steps, avoiding an E-determined finite set of forbidden
prefix values, forbidden pairs and forbidden triples.**

## 3. Phase 2/4A — exact UNSAT certificates

### 3.1 Cutset certificates

`S_m` = states allowed by the A-profile alone. If `S_m ⊆ U*_m(E)` for some `m`,
depth `m` is severed using E-determined data only, and `Aset(E) = ∅`. This is
an exact cutset certificate, sound irrespective of the binary/ternary
constraints.

Result: **7 of 24** frozen zero-E, all at **depth 1**, and **0 of 45** positives.
Adding the two reductions above (`σ_m`, and the `x(40)`-substituted family)
certified no further cases but preserved soundness. A counting reason explains
why: `|S_m|` grows as `3, 6, 10, 15, 21, …` while the unary count shrinks from
19, so a pure cutset can only occur for `m ≤ 4`.

### 3.2 Propagation and shaving

Sound propagation on the A-prefix lattice with `D_0 = {(0,0,0)}` and
`D_40 = {(15,14,11)}` known, using adjacency, unary deletion, and binary/ternary
deletion when the partner domains are singletons; then **singleton shaving**
(assume `D_m = {x}`, re-propagate, delete `x` if it collapses).

| stage | frozen zero-E certified | false positives on 45 positive-E |
|---|---:|---:|
| cutset only | 7 / 24 | 0 |
| + propagation | 18 / 24 | 0 |
| + shaving | 23 / 24 | 0 |
| + deep shaving | **24 / 24** | **0** |

Certification routes: 18 propagation, 5 shaving+propagation, 1 deep shaving.

### 3.3 The refutation trees are tiny

For most zero-E the exhaustive DFS is minuscule — a genuine finite certificate
in its own right, not "the search exhausted":

| DFS nodes | 1 | 2–32 | 2,601 | 17,767 | 122,667 | 124,307 |
|---|---:|---:|---:|---:|---:|---:|
| zero-E | 9 | 11 | 1 | 1 | 1 | 1 |

Nine zero-E die at the very first letter (1 node). The deepest survivor,
`R[38]`, reaches depth **39 of 40** before dying — the frozen example showing
that no bounded-depth local rule can be complete (Phase 4C).

### 3.4 Do the 24 share one obstruction type?

**No — a small catalogue, not a single mechanism.**

| type | count | description |
|---|---:|---|
| **I** depth-1 letter block | 7 | all three first letters forbidden; closed form, §4 |
| **II** shallow collapse | 11 | dies by depth ≤ 6; propagation suffices |
| **III** mid-depth collapse | 4 | dies at depth 8–16; needs shaving |
| **IV** deep collapse | 2 | survives to depth 37–39; needs deep shaving or search |

## 4. Phase 4/5 — closed-form obstruction, and the level achieved

Rewriting the depth-1 cut in terms of `E`'s suffix gives a criterion with **no
solver in it** (proof in the theorem-candidate file):

> For `k = 2..20` let `d_k(E) = Psi(E[41−2k..41−k)) − Psi(E[41−k..40))`, which
> has coordinate sum 1. Put `BLOCKED(E) = { α : ∃k, d_k(E) = e_α }`. Then
> **`BLOCKED(E) = {a,b,c} ⟹ Aset(E) = ∅`.**

Reason: `A[0] = α` completes an abelian square of half-period `k` ending at
position 41 exactly when `d_k(E) = e_α`.

**Level achieved:**

- **LEVEL 1 — YES.** Two exact sufficient obstructions: the closed-form
  depth-1 criterion (`O(1)`, proved), and the propagation/shaving certifier
  (sound, no search).
- **LEVEL 2 — NO.** No finite obstruction catalogue with an *iff* was found.
- **LEVEL 3 — NO.**
- **LEVEL 4 — NO.** The certifier is **incomplete**: on fresh E it left
  **6 of 188** zero-`Aset` cases undecided even with deep shaving.

## 5. Corrections to my own work in this session

- I first classified `k = m` as a binary constraint; with `x(0) = 0` it is
  unary (`x(m) ≠ σ_m`). Corrected before any certificate was computed.
- I first ignored that `x(40)` is known, which turns 20 binary constraints into
  unary ones at depths 0–19. Corrected likewise.
- My first propagation implementation read a stale domain size inside the
  ternary rule and crashed on an emptied domain. Fixed by re-reading sizes at
  each branch; all reported numbers come from the fixed version.

## 6. Phase 6 — adversarial test

**400 fresh E**, generator seed **991133** frozen before any evaluation,
canonical pool excluded, duplicates excluded.

| quantity | value |
|---|---:|
| fresh E | 400 |
| zero-`Aset` | 188 |
| positive-`Aset` | 212 |
| `BLOCKED(E) = Σ` fires | 52 |
| …of which `Aset(E) = ∅` | **52 (all)** |
| **theorem violations** | **0** |
| certifier false positives (cheap setting) | **0** |
| certifier false positives (deep shaving, 40 positives) | **0** |
| zero-`Aset` E left undecided (cheap) | 22 / 188 |
| zero-`Aset` E left undecided (deep) | **6 / 188** |

The search for counterexamples was aimed at exactly the two failure modes that
matter — a zero-`Aset` E violating the obstruction, and a positive-`Aset` E
satisfying it — and found neither in 469 total E. The theorem was **not** tuned
after seeing results; it was proved first and then tested.

## 7. Phase 7 — why do all 9 canonical E avoid it?

**Answer: B — a consequence of the H construction. It is a selection effect,
and it should not be presented as evidence that canonical E are special.**

`fixtures/canonical_pools.json` contains `A`, `E`, `F` pools together with 39
`tripleIds`: the pools were extracted from *actual historical (A,E,F) triples*.
Checked directly: **for all 9 canonical E, a canonical A from the same pool lies
in `Aset(E)` — 9/9**. So `Aset(E) ≠ ∅` holds for these E *by construction*: they
were selected as blocks that already had a compatible partner.

Supporting evidence that no deeper invariant is needed: `|BLOCKED|` for the 9
canonical E is `{0:1, 1:3, 2:5}` — never 3. Among fresh E, `|BLOCKED| = 3`
occurs 52/400 times. Nine E avoiding a roughly one-in-eight event is entirely
unremarkable. The E profile `(13,16,11)` is identical across all 69 E and
therefore explains nothing (rules out option C).

Outcome **D** (a deeper morphic invariant) is **not supported** by anything
found here, and outcome **A** (accidental) is too weak a description: the
mechanism is selection, and it is exact.

## 8. Phase 8 — value to Paper 4

**Classification: B — a useful Paper-4 lemma**, with one component (§4) at the
low end of C.

The derived three-class constraint system (§2) is the more valuable half: it
shows the "fixed support skeleton + E-dependent targets" architecture is not
special to the `F`-side gates but is *already present one stage earlier*, and it
is obtained by derivation rather than by importing the Six-Domain machinery.

**Does the E-level obstruction explain the H vs RX `AFE_EXISTS` separation?**

**No, and it should not be forced to.** Three reasons, all exact:

1. It is strictly upstream. `Aset(E) = ∅` removes an E from having *any* A, so
   such E contribute **zero trials** to the RX experiment. The 36 represented E
   in Report 11 are, by construction, exactly the ones **without** this
   obstruction.
2. The separation in Report 11 lives **inside** the surviving E: 17 of the 36
   produced AF-positive pairs and none produced an AFE-existent pair. The
   obstruction says nothing about those.
3. The canonical side's escape is a selection effect (§7), not a structural
   advantage that could propagate downstream.

**These are two independent phenomena.** The E-level obstruction explains why 24
of 60 random E never enter the experiment at all; it does not explain why the 36
that do enter behave differently from H.

## 9. Strict summary

- **What determines `Aset(E) = ∅`?** Exactly: non-existence of a monotone
  lattice path `(0,0,0) → (15,14,11)` in 40 unit steps avoiding an E-determined
  set of forbidden prefix values (380 unary), forbidden pairs (419 binary) and
  forbidden triples (361 ternary, E-independent). The support geometry is the
  same for every E; only the targets move.
- **Exact sufficient obstruction (proved):** `BLOCKED(E) = Σ ⟹ Aset(E) = ∅`,
  a closed-form `O(1)` test on the last 39 letters of `E`. Explains 7/24 frozen
  and 52/188 fresh zero cases; 0 violations in 469 E.
- **Certifier (sound, incomplete):** propagation + shaving certifies 24/24
  frozen and 182/188 fresh zero cases, 0 false positives.
- **Not achieved:** any necessary-and-sufficient characterization, any finite
  obstruction catalogue with an *iff*, any complete decision procedure.
- **Canonical H:** avoids the obstruction **by selection**, exactly and
  demonstrably; no deeper invariant is implied.
- **Downstream:** independent of the H vs RX `AFE_EXISTS` separation.

## 10. Must NOT be promoted

- The theorem candidate — proved but unsearched against the literature.
- The certifier — sound but incomplete; it is an algorithm, not a
  characterization.
- Any claim that canonical E are structurally special at this stage. They are
  not, on this evidence; they are selected.
- Any connection between this obstruction and the `AFE_EXISTS` separation.
- Any probability reading of `24/60` versus `0/9`. These are frozen
  finite-population counts.

## 11. Artifacts

| file | role |
|---|---|
| `ASET_E_OBSTRUCTION_DEFINITION_2026-08-29.md` | frozen definition, provenance, parameters |
| `ASET_E_OBSTRUCTION_THEOREM_CANDIDATE_2026-08-29.md` | statement, proof, verification, limitations |
| `work/aset_defs.js` | predicate, independent of the DFS |
| `work/aset_freeze.js`, `runs/aset_E_frozen.json` | populations, hashes, `|Aset|`, witnesses, validation |
| `work/aset_certificates.js`, `runs/aset_certificates.json` | cutset certificates, DFS reachability |
| `work/aset_effective_unary.js`, `runs/aset_effective_unary.json` | effective-unary families |
| `work/aset_propagate.js`, `runs/aset_propagation.json` | propagation certificates + deletion traces |
| `work/aset_theorem.js`, `work/aset_theorem_lib.js`, `runs/aset_theorem.json` | closed form + shaving |
| `work/aset_final.js`, `runs/aset_final.json` | full pass, adversarial test, H analysis |
| `runs/aset_deep_shave.json` | deep-shaving completeness measurement |
