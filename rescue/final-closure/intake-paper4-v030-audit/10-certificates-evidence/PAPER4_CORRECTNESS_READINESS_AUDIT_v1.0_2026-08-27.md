# Paper 4 — Correctness and Readiness Audit

**Version 1.0 — 2026-08-27**  
**Canonical manuscript audited:** `PAPER4_MANUSCRIPT_v0.23_2026-08-27.md`

## Executive verdict

No currently known mathematical contradiction was found in the canonical
Paper-4 theorem/certificate stack.

The strongest current claims are finite exact exclusion results, not a
positive solution of Mäkelä's conjecture.

### Current epistemic state

- positive six-block H: `OPEN`;
- Mäkelä solution: `NOT ACHIEVED`;
- finite \(K=2,\ldots,40\) reduction: `PROVED + EXACT-CHECKED`;
- A-component exclusion theorem: `PROVED`;
- 2138-state A-component: `EXACT-CHECKED + INDEPENDENTLY REPLAYED`;
- D-aware ABDF gate theorem: `PROVED`;
- 40-module D-aware classification:
  `EXACT-CHECKED + INDEPENDENT REPLAY`;
- fixed-F global exclusion theorem: `PROVED`;
- 279-state F-component exclusion: `EXACT-CHECKED`;
- F96 bridge-bearing family:
  `EXACT-CHECKED + INDEPENDENTLY REPLAYED END-TO-END`;
- Gate T mechanism:
  `EXACT-CHECKED BY TWO-SIDED REGRESSION`;
- novelty: `NOVELTY_UNRESOLVED`.

## 1. Mathematical corrections already made

### 1.1 Rank-one kernel lemma

The clean-room proof audit found the missing general hypothesis

\[
sL+\mathbf1^Tu\ne0.
\]

The Paper-4 specialization satisfies this because the new common column sum is
40.

Status: `FIXED`.

### 1.2 Historical cyclic-BC pruning

The historical cyclic-BC predicate implicitly required `BCB`, while

\[
bcb\notin\operatorname{Fact}_3(h_6^\omega(a)).
\]

A stronger local predicate is not automatically a sound necessary gate.

The current pipeline uses only actual macro factors or separately proved
implications.

Status: `FIXED`.

C1 and C2 have corrected replay.  C5 and C8 remain pending and are excluded
from publication-safe aggregate counts.

### 1.3 F96 missing intermediate artifact

The first F96 attack saved output but did not preserve its canonical ACD-D TSV.

This was a reproducibility defect, not a mathematical failure.

The chain was deterministically rebuilt and hashed:

```text
AF_A   3e9c2890502d8d721c94940bcf37d5bb7996ce0658e369d8256d22712043ad5e
AFD_D  e6b6f1e03086cb5ab5096014541c43d77597b990e494ffead8a7e0dbb30ac61b
ACD_D  4be7e05a2b3e07a831793237e0c47e53c3da37c2c301193f371ac8c3f3e9966c
```

All later independent replays use the rebuilt canonical intermediate.

Status: `FIXED`.

## 2. Current gate soundness

Every pruning word in the preferred finite pipeline is an actual factor of the
exact \(h_6\) factor language.

### AF
\[
af,\ fa,\ faf.
\]

### AFD
\[
ad,\ df,\ adf,\ dfa,\ fad.
\]

### ABDF
\[
fb,\ bdf,\ dfb,\ fbd.
\]

### C support
\[
ac,\ dc.
\]

### Full C completion
\[
bc,\ cb,\ cbc,\ bdc,\ cbd,\ dcb.
\]

The historical extra

\[
bcb
\]

is absent and is not used.

Status: `PASS`.

## 3. 2138-state A-component

Independent evidence reproduces:

\[
2138A
\to29\text{ AF-hit A}
\to39AF
\to5AFD
\to0ABCF.
\]

The independent Python BFS reproduces the exact component vertex set and SHA.
Separate AF/AFD/ABCF implementations reproduce the load-bearing classifications.

Status: `PASS`.

## 4. D-aware 40-module theorem

All 40 sound AFD modules represented in the corrected ledger were expanded to
all compatible D words:

\[
40AFD\to407D.
\]

Independent D enumeration reproduces all 407 records.

B-first and D-first searches both give exactly

\[
2
\]

ABDF pairs.

Independent Python C replay gives

\[
0
\]

ABCDF cores.

Status: `PASS`.

## 5. F96 full replay

The unique bridge-bearing family in the 279-F component is independently
replayed at every layer:

\[
\boxed{
50A
\to371D
\to344\text{ C-support}
\to325\text{ bridges}
\to48\text{ prefix-complete C}
\to0\text{ CB}
\to0\text{ ABCDF}.
}
\]

Exact A, D, C-support and bridge record sets equal the primary sets.

Status: `PASS`.

## 6. 279-state F-component theorem

Two independent BFS implementations give:

\[
|C_F|=279,
\]

1792 directed adjacency incidences, maximum degree 12, and identical SHA256

```text
d472bc85fb1a4a383a8e90d7cde919a949a84503ab267678f2eb58ef5e10e8c6
```

The complete component classification is

\[
279F
\to24\text{ AF-positive F}
\to470\text{ family-counted AF-A}
\to971\text{ AFD-D}
\to757\text{ C-support records}
\to325\text{ bridges}
\to0\text{ ABCDF}.
\]

255 F words are globally AF-empty.

Only F96 has bridges, and F96 has full independent replay.

Therefore every F in this component is globally excluded over the complete
A-profile space.

Status: `PASS / EXACT-CHECKED`.

## 7. Conservative global F ledger

The prior 41 fixed-F exclusions and the 279-state F component overlap in one
word.  One additional Attack-5 fixed F belongs to neither.

Hence at least

\[
\boxed{320}
\]

distinct length-40 F-role words are globally excluded as \(H(f)\).

This is a finite lower bound, not a global classification.

Status: `PASS`.

## 8. Long-period Gate T

The canonical fail-closed source-realizability program was recompiled and
rerun during this audit.

### Negative regression: Rao--Rosenfeld \(g_3\)

\[
11023\text{ initial outer parents}
\to
45720\text{ ancestor closure}
\to
0\text{ realizable}.
\]

### Positive witness control: known-bad H40

The certifier finds

```text
word = cbce
template = [eps,b,e], d=(0,0,0,0,0,0)
```

and rejects the candidate.

Status: `PASS / TWO-SIDED REGRESSION`.

## 9. Literature correctness

### Secure anchors

- Carpi 1993 gives the effective characterization for Abelian-power-free
  preserving morphisms when the source alphabet has at least six letters.
- Rao--Rosenfeld 2018 explicitly call their result a weak version of Mäkelä's
  question.
- Fici--Puzynina 2023 state Mäkelä's ternary \(00,11,22\)-only conjecture as
  still unproved.
- Eyidoğan--Göral--Tanısalı 2026 is now listed by Mathematics of Computation
  under DOI `10.1090/mcom/4246`.

A targeted 2024--2026 search found no source claiming a solution of the exact
Mäkelä conjecture.

Safe manuscript wording remains:

`no solution found in sources checked through 2026-08-27`.

### Remaining literature risk

A database-quality specialist citation-forward audit is still required before
using strong priority language such as "we introduce" or "first".

Status: `PASS FOR RESEARCH / NOVELTY_UNRESOLVED FOR SUBMISSION`.

## 10. Manuscript consistency corrections

The v0.23 manuscript fixes the following stale presentation:

- old abstract describing only early BC/ABCF work;
- historical "current 18-component result" wording;
- temporary "full Gate T OPEN" wording from before §8.14;
- obsolete AF→ABCF-centered search architecture;
- stale "to appear" wording for the 2026 Mathematics of Computation paper;
- grammar `an rank-one` → `a rank-one`.

Current-status sections now report the 279-F and 320-F results.

Status: `PASS`.

## 11. Remaining blockers before submission

### B1 — no positive construction

No six-block H has passed both the finite and long-period certificates.

This blocks a Mäkelä-solution paper.

### B2 — novelty audit

The exact component/fixed-F/D-bridge composition has not been established as
novel by a specialist database audit.

This blocks strong novelty claims.

### B3 — historical C5/C8 replay debt

C5 and C8 still lack corrected replay after the cyclic-BC correction.

They are excluded from conservative current ledgers, so this is not a
soundness blocker for the present aggregate claims, but it should be closed or
clearly archived before submission.

### B4 — final H independent replay

If a positive H is found, it must receive an independent finite-gate verifier
and an independently inspectable Gate-T certificate.

### B5 — one-command archival certifier

The mathematical pieces exist, but submission-quality reproducibility would
benefit from one fail-closed command that runs:
profile checks → 22-trigram finite gate → Gate T → witness/PASS certificate.

## 12. Non-blocking improvements

- add figures for the \(h_6\) factor graph, A/F transposition components and
  the D-bridge pipeline;
- add a compact theorem dependency diagram;
- move historical search chronology to an appendix and shorten §8 in the main
  paper;
- provide machine-readable certificate manifests for every headline result;
- decide whether the final non-breakthrough title should emphasize
  "Exact Block-Synthesis Certificates".
