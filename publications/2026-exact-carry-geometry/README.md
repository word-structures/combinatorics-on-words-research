# Exact Carry Geometry for Abelian-Square Constraints under Partial Uniform Block Assignment

## Author

Joonas Huhta
Word Structures project
wordstructures.org · Finland
2026

## Read the paper

[Download PDF](exact-carry-geometry-partial-uniform-block-assignment.pdf)

## Main result

The paper classifies the carry geometry of Abelian-square constraints in an
L-uniform coding with exactly one unresolved source role. For every `L ≥ 5`,
under that hypothesis, there are:

- exactly **6** physical carry domains;
- exactly **34** physically realizable domain/mask patterns;
- exactly **19** equivalence classes of complete reduced unresolved-support
  sets.

The `6 → 34 → 19` chain is the paper's classification result: each arrow is a
projection, and each number counts the classes that survive it.

## Scope and claim boundaries

- the nineteen families are **not** automaton states;
- this is **not** a nineteen-period global certificate;
- the length-40 construction is an application and case study, **not** a
  hypothesis of the theorem;
- "19" is minimal only under equality of complete reduced unresolved-support
  sets — it is not a general automaton or representation-minimality claim;
- the paper does **not** solve Mäkelä's conjecture.

## Novelty status

The project's literature searches have not found a direct counterpart to the
explicit role-projected `6 → 34 → 19` classification under partial uniform
block assignment. That is a statement about the sources this project has
opened, not a claim of priority — see `LITERATURE_COVERAGE.md` for the search
scope and its residual risk.

## Publication status

Preprint v1.1, released from this repository on 2026-08-31.

Not submitted to a journal, not peer reviewed, no DOI, and not deposited on
arXiv. "Published" here means published *by this repository*, and nothing
more.

## Canonical research package

This directory is the reader-facing entry. The canonical package — the paper's
single source of truth — is:

- **Package:** [`papers/paper4/`](../../papers/paper4/)
- **Status and lifecycle gates:** [`papers/paper4/PAPER_STATUS.md`](../../papers/paper4/PAPER_STATUS.md)
- **Manuscript source:** [`papers/paper4/manuscript/PAPER4_PREPRINT_v1.1_2026-08-29.md`](../../papers/paper4/manuscript/PAPER4_PREPRINT_v1.1_2026-08-29.md)
- **Reproducibility:** [`papers/paper4/reproducibility/`](../../papers/paper4/reproducibility/)
- **Audit:** [`papers/paper4/audit/`](../../papers/paper4/audit/)
- **Build:** [`papers/paper4/build/`](../../papers/paper4/build/)

The manuscript source lives in the canonical package and is not duplicated
here. The PDF in this directory is a byte-for-byte copy of the canonical PDF,
present so that a reader can open the paper without navigating the research
tree; it is not a separately built artifact.

## Frozen artifact hashes

SHA-256, computed from the files in the canonical package:

```
71b185e10e2014ad3b88c1789695eea1a5434089121d0ee221269ab16b85995e  PAPER4_PREPRINT_v1.1_2026-08-29.md
bad59a391fe81aef370c296cc03f2515abbad58faf5f2d8f2b056d08b3cd1bd8  PAPER4_PREPRINT_v1.1_2026-08-29.pdf
```

The PDF in this directory carries the second hash exactly. The full provenance
manifest, including figures and the build command, is
[`papers/paper4/audit/PAPER4_V1.1_HASHES.sha256`](../../papers/paper4/audit/PAPER4_V1.1_HASHES.sha256).

## Citation

Huhta, J. (2026).
Exact carry geometry for Abelian-square constraints
under partial uniform block assignment.
Word Structures project.
