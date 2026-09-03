# Protocol — independent `AFE_EXISTS` cross-check on the 263 quota-matched H pairs

**Date:** 2026-08-29
**Status:** sandbox. No canonical edit. No `MATH_CLAIMS` edit. No Git mutation.
**Written and hashed BEFORE any new `AFE_EXISTS` verdict is computed.**

Purpose: close the single computational validation gap identified in
`SANDBOX_REPORT_PAPER4_v032A_REFEREE_AUDIT_2026-08-29.md` (defect **D1**) — the
existing 263/263 two-solver agreement validates `AF_AND_AFE_EXISTS`, **not** the
manuscript-headline predicate `AFE_EXISTS`.

---

## 1. Predicate under test — `AFE_EXISTS` ONLY

```
AFE_EXISTS(E,A)  ==  there exists F in Sigma^40 with Psi(F) = (19,11,10)
                     such that the word  A . F . E  contains no abelian square
                     of half-period K in [2,40] at any start s with s + 2K <= 120.
```

**This is not `AF_AND_AFE_EXISTS`.** No FAF/complete-AF condition, no `K <= 60`
band, no `P40` condition participates. Any accidental reproduction of the joint
predicate is a **STOP** condition (see §6).

## 2. Population — frozen, not re-selected

The **263** quota-matched canonical-H `(E,A)` pairs already used in the
manuscript, namely the `hits` rows of `runs/h_matched_quota.json` (quota
`Q = 5000` applied to the 9 canonical E, filtered from the frozen exhaustive H
results). Verified before writing this protocol: **263 rows, 86 with
`AFE = true`, 44 with `both = true`.**

The population is **fixed now** and will not be altered after any discrepancy
is seen.

| input | sha256 |
|---|---|
| `runs/h_matched_quota.json` | `011a5e9fb138581161c41848dd50348998198e47080368ace50d0fce6fa29c41` |
| `runs/bcdBIG_H/pairs.jsonl` | `dee9e146c56219e8192b1a11f3323494db358665b264dba3bdaf4245204d5b67` |
| `runs/afexBIG_H/af_positive.jsonl` | `c57fb73449f54e05ce9bf815ca7323185fd6feaa0a76bf9154007a05ec1e948a` |
| `fixtures/canonical_pools.json` | `dc18bceb804990d70cbb1ef9e077ed6e027535b22dec152af70c3fd1526196fb` |
| `work/stage_bcd.js` (primary solver) | `e99564c5f124dff5dcdc9c0d8e64d782e7339526bba81b66decf5b53de2fc5f8` |
| `work/afe_csp.js` (primary compiler) | `bd6964a90e5d570ca97dcbd786a73f37c67e776d7c6b588fc264295f1d768b0f` |
| `work/target_buckets.js` (secondary compiler) | `8b60db62e12ae7904d33459609fb8bbe4fd0ec16f9f01fe4c85ffb70bd1b94ed` |
| `work/gate.js` | `387f469c14dfb063a56d10b178beaab3846eccd57f4ef0c50b9f6f60cfb60458` |
| `PAPER4_MANUSCRIPT_v0.33_...zip` | `6fa400d65d45f00992615df522ee009a8c482073238eb2ff1881a1d94414a7c2` |
| `PAPER4_MANUSCRIPT_v0.33_...md` | `eb17d64669b478afc0d060eb384e956930bc2cfda6a387c8eaf8f1cd33bfbf71` |
| `PAPER4_v0.33_CHANGELOG_2026-08-29.md` | `a58fb6884f04f28eaa7a6401b1737e348bf3ac415b471f7fa4a5eb863b2decc2` |

## 3. Frozen primary verdicts — expected counts fixed in advance

Primary solver: `stage_bcd.stageDFS(A, E, 'AFE', cap = 2e7)`, whose verdicts are
persisted as the `AFE_EXISTS` field of `runs/bcdBIG_H/pairs.jsonl` and carried
into `runs/h_matched_quota.json`. It compiles constraints with
`afe_csp.compile` and checks, at each new depth `d+1`: `selfClean` (ternary),
`cc.unary.get(d+1)`, and the binary relations closing at `d+1`.

```
expected primary positive  =  86
expected primary negative  = 177
expected total             = 263
```

## 4. Secondary solver — AFE-only bucket gate

Route: the **signature/target-bucket** framework of Report 12
(`work/target_buckets.js`), which enumerates windows and represents constraints
completely differently from `afe_csp.js` — reduced signature strings mapping to
forbidden target sets, rather than a unary map plus a binary list plus an
in-DFS `selfClean`.

Mandatory properties, fixed here:

1. **No FAF constraint participates.** Only the `.afe` target sets of
   `compileBuckets` are retained; every `.faf` set is discarded, and `deadFAF`
   is ignored while `deadAFE` is honoured.
2. **No stored AFE verdict is read** by the secondary route.
3. Target buckets are compiled independently from `(A,E)`.
4. Exact closing-depth semantics: each signature is evaluated when its
   maximum referenced depth is first assigned.
5. **Arity-0 constraints are included** via `deadAFE`.
6. Endpoint reductions preserved (`x_0 = 0`; a cut at depth `L` folds
   `m(F)` into the affine target).
7. Equal-depth coefficients are combined and zero coefficients removed before
   the signature is formed.
8. F profile enforced exactly as `(19,11,10)`.
9. **No cap may be read as UNSAT.** If a cap is hit the pair is `UNRESOLVED`
   and must be re-decided at a higher cap before the final comparison. The
   primary run needed `cap = 2e7`; the secondary run uses `cap = 2e9`, which
   for these 263 cases is expected to be effectively uncapped.

## 5. Equality criterion

For each of the 263 pairs:

```
match  :=  secondary_AFE_EXISTS(E,A)  ==  frozen_primary_AFE_EXISTS(E,A)
```

**Success condition, fixed in advance:**

```
secondary positive = 86
agreement          = 263 / 263
unresolved         = 0
```

Anything else is a failure of this protocol, not an occasion to adjust it.

## 6. STOP conditions

- **Joint-predicate collapse.** If the secondary solver returns 44 positives
  (or otherwise reproduces `AF_AND_AFE_EXISTS`), STOP. Do not repair silently.
  Control C4 of §7 exists precisely to detect this.
- **Any mismatch.** STOP immediately; freeze pair identity, `E`, `A`, both
  constraint manifests, both verdicts, the smallest direct witness or UNSAT
  divergence, and all hashes into
  `AFE_EXISTS_263_CROSSCHECK_COUNTEREXAMPLE_2026-08-29.md`. Do **not** proceed
  to manuscript promotion.
- **Residual unresolved case.** Any pair still capped after the higher-cap
  re-decision is reported as `UNRESOLVED` and excluded from neither numerator
  nor denominator silently; its presence blocks the success condition.

## 7. Pre-run controls (Phase 2) — fixed before the full run

| id | control | purpose |
|---|---|---|
| C1 | ≥3 known AFE-positive H pairs | secondary must return SAT |
| C2 | ≥3 known AFE-negative H pairs | secondary must return UNSAT |
| C3 | any pair with `deadAFE` (arity-0 obstruction), if present | exercises the empty-support class |
| C4 | **≥1 pair with `AFE_EXISTS = true` and `AF_AND_AFE_EXISTS = false`** | **proves the secondary route is AFE-only and not the joint gate** |

For every control the primary AFE verdict, the secondary AFE verdict, and the
joint verdict are all recorded. C4 is the decisive one: on such a pair the
AFE-only answer must be **SAT** while the joint answer is **UNSAT**. The
population contains `86 − 44 = 42` such pairs, so C4 is available.

## 8. Phase 4 — literal witness validation for the positives

For each secondary SAT verdict, one `F` witness is retained and checked by a
**third**, solver-free route that works directly from the literal word:

1. `Psi(F) = (19,11,10)`;
2. `A.F.E` has no abelian square of half-period `K in [2,40]` at any start
   `s` with `s + 2K <= 120`, tested by direct Parikh comparison;
3. no cached or solver-internal predicate is consulted.

Witnesses are hashed into a canonical table. All `F` witnesses are **not**
enumerated; one checked witness per SAT pair suffices.

## 9. Phase 5 — negative-side control only

A small deterministic control set (smallest pair id, largest pair id,
shallowest extinction, deepest extinction, one near the median) is re-run with
the cap removed to confirm the secondary search really closes every branch.
Full UNSAT certificates for all 177 negatives are **not** built, and no
minimum-UNSAT-core work is restarted.

## 10. Prohibitions reaffirmed

No weighted-frontier H/RX mechanism experiment. No new RX sampling. No new E
pool. No new A pool. No minimum-UNSAT-core extraction. No manuscript mutation.
No Git mutation. No canonical promotion. No probability interpretation —
`0/137` remains finite evidence. Mäkelä **OPEN**. `NOVELTY_UNRESOLVED`.
