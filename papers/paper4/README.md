# Exact Carry Geometry for Abelian-Square Constraints under Partial Uniform Block Assignment

**Author:** Joonas Huhta
**Project:** Word Structures project (wordstructures.org · Finland)
**Status:** Preprint v1.1 — submission-ready

## Main result
For every L ≥ 5, with exactly one unresolved source role:
* 6 physical carry domains;
* 34 physically realizable domain/mask patterns;
* exactly 19 equivalence classes of complete reduced unresolved-support sets.

**Scope constraints:**
* The nineteen families are not automaton states.
* This is not a nineteen-period global certificate.
* The length-40 construction is a case study, not the main theorem.

## Files
* `manuscript/PAPER4_PREPRINT_v1.1_2026-08-29.md`: Markdown source
* `manuscript/PAPER4_PREPRINT_v1.1_2026-08-29.pdf`: PDF output
* `figures/`: Figures included in the manuscript
* `build/`: Build instructions and script (`build_paper4.ps1`)
* `reproducibility/`: Verified replay and verification package, including the manifest and test scripts.
* `audit/`: The submission audit report and hash manifest.

## Reproduction
To reproduce the PDF, navigate to `build/` and run `.\build_paper4.ps1` (requires Pandoc 3.11 and MiKTeX-pdfTeX 4.23).
To reproduce the computational claims, refer to the manifest in `reproducibility/PAPER4_REPRODUCIBILITY_MANIFEST_2026-08-29.json` and execute the scripts in the `reproducibility/` directory.

## Version history
* **preprint v1.0** — first complete typeset preprint;
* **preprint v1.1** — metadata + table pagination + version-neutral reproducibility wording; no mathematical change.
