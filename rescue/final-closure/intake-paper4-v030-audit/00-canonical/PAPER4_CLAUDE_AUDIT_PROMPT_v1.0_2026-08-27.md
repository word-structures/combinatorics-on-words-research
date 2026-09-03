# Claude audit prompt — Paper 4 v0.30

You are auditing a computational/theoretical combinatorics-on-words manuscript.
Be adversarial, fail-closed and mathematically explicit.  Do not improve the
story by assumption; distinguish what is proved, exact-computed, heuristic,
incomplete, or novelty-unresolved.

Start with:

- `PAPER4_CLAUDE_AUDIT_MANIFEST_v1.8_2026-08-27.md`
- `PAPER4_MANUSCRIPT_v0.30_2026-08-27.md`
- `PAPER4_MANUSCRIPT_v0.30_NEWCLAIMS_EVIDENCE_MATRIX.md`
- `PAPER4_CONTEXT_HANDOFF_v2.3_2026-08-27.md`

Then inspect every primary artifact referenced by the audit manifest.

## Mandatory audit questions

1. Does the actual h6 no-C factor language justify the claimed exact A/B
   factorization once D,E,F are fixed?
2. Does every exported ABFE record really pass all required no-C contexts
   that do not contain D or C?
3. Is the complete 702-AF replay actually closed despite the initial chunk-4
   timeout?  Verify the ten five-row replacement runs exactly cover global
   rows 151--200 with no gaps or overlaps.
4. Recompute from the exported census:
   - total ABFE rows;
   - number of ABFE-positive AF pairs;
   - distinct F count;
   - distinct A count;
   - richest AF-pair counts.
5. Is `702AF -> 14266ABFE -> 0ABDEF` supported without relying on a capped or
   timed-out branch?
6. Verify that explicit ABFE implies exact AEF existence, and flag any
   remaining manuscript sentence that incorrectly calls AEF existence open.
7. Audit the BDF-first calculations:
   - 12 old ABDF rows -> 3 distinct BDF cores;
   - each core has exactly 12 E solutions under E,FE,EB,EBD;
   - 36 resulting BDEF cores -> 0 A under the complete A-side context list.
8. Audit the local-D calculation:
   - local exact-clean D/DF union size = 8;
   - complete B enumeration -> 5 BDF;
   - complete E enumeration -> 74 BDEF;
   - all 74 -> 0 A.
9. Verify that the 8x100 DEF result is presented only as a finite grid
   diagnostic.
10. Search for any overclaim about:
   - global nonexistence of H;
   - Mäkelä being solved;
   - novelty;
   - universal morphism preservation;
   - timeout/cap cases.
11. Re-run or independently reimplement at least one positive ABFE verifier
   and one negative BDF-first/AExist verifier if the environment permits.
12. Produce a final audit table with columns:
   `Claim | Manuscript location | Evidence | Independent check | Verdict |
   Required edit`.

Verdicts must be one of:
`PASS`, `PASS_WITH_WORDING_EDIT`, `UNVERIFIED`, `FAIL`.

Do not mutate Git.  Do not compute h=8.  Do not use D40.
