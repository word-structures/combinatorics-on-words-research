# Paper 4 — preprint PDF v1.1 submission audit

**Manuscript:** *Exact Carry Geometry for Abelian-Square Constraints under Partial
Uniform Block Assignment*
**Audited artifact:** `PAPER4_PREPRINT_v1.1_2026-08-29.pdf` (25 pages)
**Predecessor:** `PAPER4_PREPRINT_v1.0_2026-08-29.pdf` (25 pages), retained unmodified
**Audit performed:** 2026-08-29 / 2026-08-30

---

## 0. Result

The mathematics is unchanged. Three non-mathematical edits were applied to the
frozen Markdown source; the PDF was rebuilt from that source with a TeX-based
toolchain; every page listed in the audit scope was inspected as a rendered
image.

**PAPER 4 v1.1: SUBMISSION-READY.**

---

## 1. Provenance

The source of record is the frozen Markdown that produced v1.0:

| role | file | SHA-256 |
|:--|:--|:--|
| frozen scientific source | `PAPER4_PREPRINT_v1.0_2026-08-29.md` | `a2886a45…d3d608` |
| v1.1 source | `PAPER4_PREPRINT_v1.1_2026-08-29.md` | `71b185e1…85995e` |
| figure 1 | `FIG1_SIX_CARRY_DOMAINS.pdf` | `a3084877…9fb8ec` |
| figure 2 in text | `FIG3_FIRST_HIT_PREFIX_TREE.pdf` | `7f060236…6c2186` |
| v1.1 output | `PAPER4_PREPRINT_v1.1_2026-08-29.pdf` | `bad59a39…cd1bd8` |
| v1.0 output | `PAPER4_PREPRINT_v1.0_2026-08-29.pdf` | `63c15d33…9b9df8` |

Full manifest: `PAPER4_V1.1_HASHES.sha256`.

**Two provenance facts, stated plainly.**

1. The stated v1.0 PDF hash `63c15d33…9b9df8` **verified exactly**.
2. The stated consolidated-manuscript v1.4 hash
   `6df6d6a76736ec479d6dbb7352a5f299735c69c887bf0cf19117f9f6389d1af6`
   **was not located**. This does **not** establish a scientific mismatch, and no
   scientific content was altered on account of it. Per instruction, the search
   was not continued; provenance for v1.1 is instead anchored to hashes computed
   directly from the files used in this build. The manuscript itself asserts no
   specific historical hash, so nothing in the text required correction.

**There is no maintained LaTeX source.** The PDF metadata records
`Creator = "LaTeX via pandoc"`, `Producer = "pdfTeX-1.40.26"`: the `.tex` is a
pandoc intermediate, generated and discarded. Per instruction it was not
reconstructed. The Markdown is the source of record.

### Toolchain reproducibility check

Before any edit, the **unchanged** frozen source was rebuilt with the newly
installed toolchain (pandoc 3.11 + MiKTeX-pdfTeX 4.23). The rebuild produced
**25 pages**, and its extracted text was **identical to v1.0's after whitespace
normalisation**. The toolchain therefore reproduces v1.0 faithfully, so every
layout difference in v1.1 is attributable to the three intended edits.

---

## 2. Defect ledger

### A. Confirmed visible defect — fixed

| id | location | symptom | evidence | correction |
|:--|:--|:--|:--|:--|
| **A1** | v1.0 pp. 9–10, nineteen-family table | The table split across a page boundary leaving **one row (`Mt-CO`) alone on p. 10** beneath a repeated header. For a table whose claim is "exactly nineteen", presenting 18 + 1 is an avoidable reading blemish. | Rendered p. 9 and p. 10 of v1.0 inspected as images. | Column widths declared on the Markdown separator row so that **no description cell wraps**. The table shortened from 31 to 20 typeset rows and now sits **unbroken on p. 9**. No cell content, no font size, and no page break was changed; page count stays 25. |

### B. Confirmed metadata / provenance defect — fixed

| id | location | symptom | evidence | correction |
|:--|:--|:--|:--|:--|
| **B1** | Title page | Author block read `Joonas Huhta` only; the required project identity was absent. | Rendered p. 1 of v1.0. | Author block now reads, on three centred lines: `Joonas Huhta` / `Word Structures project` / `wordstructures.org · Finland`. No university, department, title, ORCID, email or funding line is stated or implied. |
| **B2** | §11.1 | The sentence "This document is the first complete typeset preprint version (v1.0, 29 August 2026)" was **correct for v1.0** but is self-invalidating on any re-issue. | Source line 1498. | Sentence removed; the surrounding repository statement is unchanged. §11.1 is now version-neutral and needs no maintenance on future re-issues. Version identity lives in the filename and the hash manifest. |

### C. Extraction-only — **not** PDF defects, no change made

Each of these appeared as a defect in `pdftotext` output and was **disproved** by
inspecting the rendered page.

| id | apparent symptom | verdict |
|:--|:--|:--|
| **C1** | Figure 1 appeared to be missing `κ`, `≥` and the minus sign (`= 0`, `q 1`, `=1`). | **Renders correctly**: `κ = 0`, `κ = +1`, `κ = −1`, `q ≥ 1`, `c₀c₁` all present and correct. The figure's embedded font subset carries no `ToUnicode` mapping for those three glyph classes, so they extract as nothing. Visual output is right; see residual note R1. |
| **C2** | Figure 2 (file `FIG3`) labels appeared overprinted on one baseline, extracting as `comapllleptiroonfisleb-ecolomwptahtiisblperefix`. | **Renders correctly** as two properly separated lines, "all profile-compatible" / "completions below this prefix". The string is two text runs at nearly equal *y* being interleaved by the extractor. |
| **C3** | Nineteen-family table appeared to have its family, description and cardinality columns offset by whole rows. | **Renders correctly in v1.0**; every family, description and cardinality is on its proper row. Artifact of `-layout` reflow across wrapped cells. (Separate from A1, which is about the page break, not alignment.) |
| **C4** | Population and strata tables appeared row-shifted (`RX` counts landing on the `H` line). | **Render correctly**: `RX` 75,111 / 36 / 137 / 0 / 0 and `H` 31,775 / 9 / 263 / 86 / 44. |
| **C5** | References appeared to have broken diacritics (`Eyidoan`, `G?ral`, `Ker?nen`). | Latin-1 extraction artifact. UTF-8 extraction **and** the rendered page both show `Eyidoğan`, `Göral`, `Tanısalı`, `Keränen` correctly. |
| **C6** | Equation numbers `(3.2)`, `(3.8)`, `(10.3)` appeared detached from their equations. | Reading-order artifact. Correctly positioned in the rendered pages. |

### D. Unused artifact — not part of the preprint

| id | artifact | status |
|:--|:--|:--|
| **D1** | `FIG2_SUPPORT_COMPILER_PIPELINE.pdf` | **Not referenced by the canonical source.** The manuscript includes only `FIG1_SIX_CARRY_DOMAINS.pdf` and `FIG3_FIRST_HIT_PREFIX_TREE.pdf` (source lines 415 and 1388). Its absence from the PDF is correct, not a defect. Not inserted, not repaired, not shipped. |

### E. Unresolved — no blocker

| id | item | status |
|:--|:--|:--|
| **E1** | Origin of the stated v1.4 manuscript hash | Not located; search discontinued per instruction. Carries no scientific consequence: the manuscript text asserts no hash, and v1.1 provenance rests entirely on hashes computed here. |

### R. Residual observations — accepted, not changed

| id | observation | why not changed |
|:--|:--|:--|
| **R1** | Inside Figure 1, `κ`, `≥` and `−` are not text-searchable or copy-pasteable. | Accessibility nit only; the figure is visually correct and the same glyphs are fully searchable throughout the body text. Regenerating the figure would alter a file that renders correctly, against the "no unnecessary change" constraint. |
| **R2** | `75 111` (thin space) in the §-appendix display vs `75,111` (comma) in the table immediately below it. | Internal style inconsistency, both forms correct. Changing a displayed numeral risks reading as a content edit. Flagged for owner decision. |
| **R3** | Three underfull `\hbox`es in §11.1. | Caused by the long unbreakable `\texttt{https://…}` URL. Cosmetic looseness; inherited from unchanged source text. |
| **R4** | One overfull `\hbox`, **1.07 pt** (≈0.4 mm), in the population-table header. | Imperceptible; confirmed visually on the rendered page. Inherited from unchanged source text. |

---

## 3. Changes applied — complete list

Exactly three edits to the source. Nothing else was touched.

| # | source line | class | change |
|:--|:--|:--|:--|
| 1 | 4 | METADATA | `author: - "Joonas Huhta"` → three-line block adding `Word Structures project` and `wordstructures.org · Finland` |
| 2 | 687 | TYPOGRAPHY | table separator `\|---\|---\|---:\|` → `\|:-------\|:-------------------------\|-------------:\|` (declares column widths; fixes A1) |
| 3 | 1498 | CLARIFICATION | removed the trailing sentence "This document is the first complete typeset preprint version (v1.0, 29 August 2026)." |

**MATHEMATICAL changes: ZERO.**

Verified by whole-document text diff of v1.0 against v1.1. After whitespace
normalisation and page-number stripping, the only content differences are the
two added author lines and the one removed sentence. Every other diff hunk is
`pdftotext` reflow caused by the two-line-longer title block and by the table no
longer wrapping. No theorem statement, hypothesis, quantifier, inequality, sign,
variable name, table entry, cardinality formula, count, or reference changed.

Spot-checked invariants, all unchanged: six domains `Zs, Pt, Mt, Z, P, M`;
`2+4+4+8+8+8 = 34`; `1+1+5+(5+1)+(5+1) = 19`; small-`L` counts `9, 15, 19, 19,
19, 19`; the `L = 40` cardinality list `1, 342, 40, 40, 800, 420, 381, 39, 20,
400, 210, 210, 399, 39, 20, 400, 210, 210, 399`; `|W_ρ| = 46 305 405 961 214
400`; population counts `75,111 / 36 / 137 / 0 / 0` and `31,775 / 9 / 263 / 86 /
44`; Carpi pages `151–168`.

### Scope statements — verified intact

The scope guards are present and unweakened in v1.1: the nineteen families are
not automaton states; Theorem 5.1 does not certify every half-period; Corollary
7.1 is a single-window fixed-profile statement; the zero count in `RX` is not a
nonexistence theorem; the general second-difference and whole-image-correction
machinery is attributed to prior work.

---

## 4. Rendered-page audit of v1.1

Renderer: `pdftocairo` (poppler/cairo, shipped with MiKTeX), 150 dpi, all 25
pages rasterised; the pages below inspected as images.

| page | content | verdict |
|:--|:--|:--|
| 1 | Title, author block, abstract | **PASS** — author block correct on three lines; no institutional affiliation implied; `·` renders |
| 6 | Figure 1, six physical domains | **PASS** — `κ = 0`, `κ = +1`, `κ = −1`, `q ≥ 1` all correct; no clipping |
| 9 | Nineteen-family table | **PASS** — all 19 rows unbroken on one page, no wrapped cells, cardinalities right-aligned and correct |
| 18 | Figure 2 (first-hit certificate) | **PASS** — two-line labels correctly separated, no overprinting |
| 24 | Secondary-comparison tables | **PASS** — both tables aligned; all counts correct |
| 25 | References, final page | **PASS** — all 7 entries; diacritics correct; DOIs intact |

**LaTeX log:** no undefined references, no LaTeX warnings, **no missing
characters**. Only R3/R4 above.

**Placeholder scan:** no `TODO`, `FIXME`, `PLACEHOLDER`, `XXX`, `TBD`, or `??`
anywhere in the document text. No internal filenames or debug text.

---

## 5. Remaining blockers

**None.**

No mathematical blocker. No unresolved visible defect. Items R1–R4 are cosmetic
and are recorded for owner decision, not as release conditions. E1 is a
historical-record question with no bearing on the artifact.

---

## 6. Deliverables

| file | description |
|:--|:--|
| `PAPER4_PREPRINT_v1.1_2026-08-29.pdf` | the corrected preprint, 25 pages |
| `PAPER4_PREPRINT_v1.1_2026-08-29.md` | its source |
| `PAPER4_PREPRINT_v1.0_2026-08-29.md` | frozen scientific source (input, unchanged) |
| `FIG1_SIX_CARRY_DOMAINS.pdf` | figure actually included — unchanged, no repair needed |
| `FIG3_FIRST_HIT_PREFIX_TREE.pdf` | figure actually included — unchanged, no repair needed |
| `PAPER4_V1.1_HASHES.sha256` | provenance manifest and build command |
| `PAPER4_V1.1_SUBMISSION_AUDIT.md` | this report |

`PAPER4_PREPRINT_v1.0_2026-08-29.pdf` is retained, unmodified.

---

## 7. Note on version numbering

Manuscript revisions reached consolidated manuscript **v1.4**. Typeset preprint
PDFs are numbered separately: **PDF v1.0** was the first complete typeset
preprint; **PDF v1.1** is this corrected typeset preprint. The two sequences are
independent and must not be conflated. The manuscript retains its frozen date of
29 August 2026; only the calendar date of this audit is later.
