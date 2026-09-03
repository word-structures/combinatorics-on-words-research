# Paper 4 — Claude editorial handoff

**Date:** 2026-08-29  
**Task:** reader-first scientific editorial pass from v1.2 pre-Claude to a proposed v1.3.

## Start here

1. Read `02_EDITOR_PROMPT/PAPER4_CLAUDE_READER_FIRST_EDIT_PROMPT_v1.2_TO_v1.3_2026-08-29.md`.
2. Edit only the manuscript in `01_MANUSCRIPT/` into a proposed **v1.3**.
3. Use `03_EDITORIAL_CONTEXT/` for the reader audit and the new Section 4.2 insertion rationale.
4. Inspect the three PDFs in `04_FIGURES/`.
5. Use `05_REFERENCES/` and `06_PROOF_CLOSURE/` only when a claim needs checking. They are supporting evidence, not a request to reopen the research programme.

## Frozen editorial boundary

The current paper spine is:

three cutpoints → Euclidean carries → six domains → 34 physical patterns → 19 complete reduced support families → affine target loading → case study.

The one new mathematical addition in v1.2 is the exact profile-level feasibility interface in Section 4.2. Claude should decide whether to **include as written, compress, move, or omit from the main text**, but should not strengthen novelty language.

Do not add record-hunt material, microbenchmarks, solver-speedup claims, or empirical converse claims. Do not turn the 19 support families into automaton states or “19 constraints”. Do not imply that the reachable-set corollary is a whole-coding or long-period certificate.

## Expected output

- `PAPER4_MANUSCRIPT_SUBMISSION_CANDIDATE_v1.3_CLAUDE_EDIT_2026-08-29.md`
- `PAPER4_CLAUDE_EDITORIAL_REPORT_v1.3_2026-08-29.md`

If a genuine mathematical contradiction is found, stop and report it instead of silently repairing it.
