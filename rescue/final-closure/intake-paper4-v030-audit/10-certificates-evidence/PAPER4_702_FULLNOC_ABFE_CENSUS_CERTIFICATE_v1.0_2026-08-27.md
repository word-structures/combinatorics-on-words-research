# Paper 4 — 702-AF Full-no-C ABFE Census

**Version 1.0 — 2026-08-27**  
**Status:** `EXACT-CHECKED POPULATION CENSUS`

The canonical input contains 702 exact \((F,A)\) pairs satisfying the
prescribed profiles and the exact AF/FA/FAF gate.

The revised full-no-C extension checks the actual A/E/F contexts
\(EA,FE,AFE,EAF,FEA\) before B search, and B is accepted only after
\(B,FB,EB\) pass.  Every exported B completion is therefore an exact ABFE
scaffold for the no-C factor language.

The 702 rows were processed in 15 chunks.  Chunk 4 (global rows 151--200)
initially exceeded the wall-clock budget and was left unresolved.  It was
subsequently split into ten exact five-row runs; all ten completed with zero
caps and zero ABFE records.

The complete census is

\[
\boxed{14266\text{ exact }ABFE\text{ scaffolds}}.
\]

They are supported by

\[
15\text{ AF pairs},\qquad 7\text{ distinct F words},\qquad
8\text{ distinct A words}.
\]

The richest AF-pair counts are 1146, 987, 979 and 822.

The same exact extension search finds no ABDEF scaffold, so for this canonical
population

\[
\boxed{702AF\to14266ABFE\to0ABDEF}.
\]

This establishes exact AEF and ABFE existence in the prescribed length-40
family, but not ABDEF existence.

**Epistemic label:** `EXACT-CHECKED / ABFE EXISTS / ABDEF OPEN`.
