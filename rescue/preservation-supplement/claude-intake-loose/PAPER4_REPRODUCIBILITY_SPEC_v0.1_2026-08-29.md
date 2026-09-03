# Paper 4 — Reproducibility Specification v0.1

**Date:** 2026-08-29  
**Status:** submission-closure draft; fail-closed; no canonical/Git promotion.

## 1. Purpose

This package is deliberately narrower than the full research archive. It must
let an external reader reproduce or independently verify only the claims needed
by the final Paper 4:

1. six domains / 34 patterns / 19 families;
2. the \(E\to A\) 361/419/380 decomposition;
3. AFE compiler semantics used by the application;
4. the finite RX/H application table;
5. the independent 263/263 `AFE_EXISTS` cross-check.

Exploratory searches, failed mechanisms and old record-hunt ledgers remain in
the research archive, not in the minimal paper supplement.

## 2. Evidence routes

- **P** — symbolic proof; code is only a falsification layer.
- **C1** — primary computation + frozen raw output.
- **C2** — independently written computational replay/checker.
- **L** — literature-dependent statement tied to a primary source or explicitly
  labelled modern restatement.

The final manuscript must not blur these levels.

## 3. Submission-critical claims

| ID | claim | route | expected result |
|---|---|---|---|
| T1 | six physical carry domains | P + C2 | exact six-domain partition |
| T2 | 34 realizable role/domain patterns | P + C2 | `2+4+4+8+8+8 = 34` |
| T3 | exactly 19 stable support families for \(L\ge5\) | P + C2 | 19 |
| T4 | all 19 cardinality formulae | P + C2 | Table-1 formulae |
| T5 | pairwise distinctness for every \(L\ge5\) | P + independent kill | PASS |
| A1 | \(E\to A\) structural counts | P/C1 + predicate check | 361 / 419 / 380 |
| A2 | AFE compiler semantics | C1 + C2 | 342 ternary; 1238 unary raw→443 effective; 798 binary; 703 arity-0; 652 unreachable unary windows dropped |
| X1 | clean RX population | C1 | 75,111; 137 AF+; 0 AFE; 17 productive E; 0 unresolved |
| X2 | quota-matched H population | C1 | 31,775; 263 AF+; 86 AFE; 44 joint; 34 P40 |
| X3 | exact-equal strata | C1 | 63→0; 78→36→24; 45→0; 40→19→0 |
| X4 | AFE-only independent check | C2 | 263/263; 86 positive; 177 negative; 0 unresolved; 86/86 literal witnesses |

X1–X4 are a secondary finite application, not the theorem centre.

## 4. Frozen anchors already known

| artifact | SHA256 |
|---|---|
| Paper-4 v0.33 promotion-candidate manuscript | `bf06dea9c8f10f7c4afb6da0cb69aa949e9d51f5c7dafa229dbdb04aa4a0e82d` |
| exposure-matched RX preregistration | `bca2780f881ac23c9057d204f2e4cbc85f67945afd758bb9ef5abbe1e8d3463c` |
| AFE_EXISTS 263-pair protocol | `e56c3e2d4e33df84090ad53159cb5761de80da81427ddfe726401e5d38479641` |
| Carpi non-identifiability lemma (sandbox) | `e397ef3285187aabb6bbd4a5fec4e51c056294cba400249ebc88053a8ad829dd` |
| all-\(L\) distinctness proof (sandbox) | `efc5d5ec9bd1b51fb7814c7f76dee99b0b13328b6e1f8866a2d929ceb427f856` |

The RX preregistration was frozen before any `AF_EXISTS` evaluation of RX.

## 5. Six-domain / 34 / 19 chain

Authoritative proof package:

- `PAPER4_SIX_DOMAIN_19_FAMILY_FULL_PROOF_2026-08-29.md`
- `PAPER4_34_PATTERN_TO_19_FAMILY_TABLE_2026-08-29.csv`
- `PAPER4_19_FAMILY_DISTINCTNESS_SYMBOLIC_PROOF_2026-08-29.md`
- independent distinctness-kill report + checker + SHA manifest.

Known independent checker names:

- `work/sixdomain_full.js`
- `runs/sixdomain_full.json`
- `work/v032a_sixdomain_check.js`
- `runs/v032a_sixdomain_check.json`

The symbolic proof is the theorem; enumeration is not a proof substitute.

## 6. \(E\to A\) decomposition

Frozen re-derivation:

\[
361\ \text{ternary},\qquad
419\ \text{binary},\qquad
380\ \text{unary}.
\]

The reproduction bundle must retain the exact \(E\)-population hash, the
constraint-generation script, raw class-count output, and independent predicate
comparison.

Interpretation:
- ternary supports are A-only;
- binary supports couple A,E;
- unary supports have E-dependent targets;
- support geometry is fixed while targets move.

## 7. AFE compiler semantics

Independent audit traced:

```text
stage_bcd.stageDFS(A,E,'AFE',cap)
  -> afe_csp.compile(A,E)
  -> depth-ordered DFS checks
```

with:

| class | count |
|---|---:|
| ternary | 342 |
| unary raw windows | 1,238 |
| unary effective `(depth,target)` pairs | 443 |
| unreachable unary windows dropped | 652 |
| binary | 798 |
| arity-0 | 703 |

Raw windows and effective constraints must never be quoted as interchangeable.

Freeze:
- `work/v032a_impl_semantics.js`
- `runs/v032a_impl_semantics.json`
- exact compiler files used by the application.

## 8. RX finite population

Design: deterministic capped quota \(Q=5000\) per E in `Alist` order.

The first run `afexRX` is **VOID**:
`runs/afexRX/VOID.json = VOID_CONCURRENT_WRITERS`.

Its scientific counts and timings must never be reused.

Authoritative run: `afexRX2`, exclusive `O_EXCL` lock.

Expected:
- 75,111 trials;
- 36 E represented;
- 137 AF-positive;
- 17 E with AF-positive;
- 0 AFE_EXISTS;
- 0 joint;
- 0 P40;
- 0 unresolved;
- 6 capped decisions re-decided at larger cap.

Known chain:

```text
work/aset_sizes.js
runs/aset_sizes_R.json
runs/aset_sizes_H.json
work/rx_run.js
runs/afexRX2/
work/rx_bcd.js
runs/bcdRX/
work/rx_h_matched.js
runs/h_matched_quota.json
work/rx_compare.js
runs/rx_vs_h_comparison.json
runs/rx_vs_h_perE.csv
```

## 9. H comparison

Identical quota rule applied by filtering frozen exhaustive H results; no H
re-computation merely for the comparison.

Expected:
- 31,775 trials;
- 9 E;
- 263 AF-positive;
- 86 AFE_EXISTS;
- 44 joint;
- 34 P40.

Containment of quota-selected A's inside the frozen H population was checked:
0 violations.

## 10. Exact-equal strata

| stratum | E | trials | AF+ | AFE | joint |
|---|---:|---:|---:|---:|---:|
| RX-5000-EQ | 10 | 50,000 | 63 | 0 | 0 |
| H-5000-EQ | 4 | 20,000 | 78 | 36 | 24 |
| RX-1000-EQ | 21 | 21,000 | 45 | 0 | 0 |
| H-1000-EQ | 8 | 8,000 | 40 | 19 | 0 |

These are deterministic finite strata. No probability language is licensed.

## 11. AFE-only independent 263-pair route

Keep predicate histories distinct.

Earlier independent solvers validated `AF_AND_AFE_EXISTS` (44 positives).
The later AFE-only route validated `AFE_EXISTS` itself:

- 263/263 agreement;
- 86 positive;
- 177 negative;
- 0 capped/unresolved;
- 86/86 literal witness checks;
- 42 AFE-positive/joint-negative pairs demonstrate predicate independence.

Expected artifact names:

```text
work/afe_only_crosscheck.js
work/afe_controls.js
work/afe_263_run.js
runs/afe_controls.json
runs/afe_263_crosscheck.json
AFE_EXISTS_263_CROSSCHECK_PROTOCOL_2026-08-29.md
runs/PROTOCOL_AFE_263.sha256
```

## 12. Minimal submission bundle

```text
paper4-repro/
  README.md
  MANIFEST.json
  SHA256SUMS.txt
  theorem/
  e-to-a/
  afe/
  population/
```

The supplement should not ship the whole research scratch tree.

## 13. Current gate

Mathematics is closed. Novelty is sufficiently localized for writing.
Reproducibility remains blocked only on **local capture** of exact historical
paths/hashes/environment and fresh replay outputs.

Run:

```powershell
powershell -ExecutionPolicy Bypass -File PAPER4_CAPTURE_REPRODUCIBILITY.ps1
```

against the actual worktree, freeze the resulting JSON, and resolve any
`missing` or `ambiguous` entry fail-closed.

## 14. Gate to manuscript v1.0

PASS requires:
1. unique frozen source for every computational paper claim;
2. SHA256 for every source/script;
3. replay command + environment;
4. explicit `afexRX` blacklist;
5. predicate-correct 263-pair AFE-only evidence;
6. fresh summary replay of every number retained in the manuscript.

Then proceed directly to submission rewrite.
