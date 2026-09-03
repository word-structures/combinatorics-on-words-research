# Paper 7 main-theorem release v0.4

## Release status

| Axis | Status |
|---|---|
| Theorem | `INDEPENDENTLY REPRODUCED` |
| Manuscript | `SUBMISSION-READY EXCEPT NOVELTY/AUTHORSHIP` |
| Novelty | `NO PRIOR RESOLUTION FOUND - NOVELTY PROVISIONAL` |
| Human peer review | Not performed by the clean-room reconstruction |

## Canonical artifact

`P7_MANUSCRIPT_v0.4.pdf` is the only canonical manuscript PDF in this release directory. `SHA256SUMS.txt` records its digest and the digests of the accompanying sources and certificates. The byte-identical PDF at the repository root is a noncanonical convenience copy.

## Verification routes

- `verify_p7_main_theorem_v4.py` is the author-side finite-certificate verifier. It reads the supplied JSON and CSV certificate data.
- `P7_CODEX_CLEANROOM_VERIFIER.py` is a separately implemented clean-room reconstruction. It does not import or parse the author verifier or the submitted CSV certificates when reconstructing the finite data; it then compares the reconstructed sets with the supplied data.
- `P7_CODEX_HIGH_CERTIFICATE_RECONSTRUCTION.md` records the clean-room equations, bounded outputs, comparison results, and digests.
- `P7_MANUSCRIPT_v0.4_CLAIM_AUDIT.md` classifies the manuscript's major claims by proof route.

Neither computational route independently proves Keranen's external morphism theorem, the manuscript's prose induction, authorship, or novelty.

## Reproduction

Run from this directory:

```text
python verify_p7_main_theorem_v4.py
python P7_CODEX_CLEANROOM_VERIFIER.py
```

The PDF was built from `P7_MANUSCRIPT_v0.4.tex` with Tectonic 0.17.0 and visually inspected after rendering all 10 pages with Poppler. The unchanged v0.2 source was rebuilt first as the artifact-protocol baseline; it reproduced the released page count and visible content, although the Tectonic and historical pdfTeX binaries are not byte-identical.

## Revision boundary

The theorem witness, the four 85-symbol morphism images, the invariant, the 99 seed rows, the 35 residual states, and the 17 recursive transition rows are unchanged from the accepted v0.2 mathematical core. Version 0.4 repairs exposition, certificate interpretation, novelty calibration, authorship metadata, and release canonicalization. The rejected v0.1 invariant counterexample remains documented in the manuscript and claim audit.
