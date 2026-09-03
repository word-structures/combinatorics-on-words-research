PAPER 4 — CLAUDE READER-FIRST EDITORIAL PASS

PRIMARY INPUT:
PAPER4_MANUSCRIPT_SUBMISSION_CANDIDATE_v1.2_PRE_CLAUDE_2026-08-29.md

SUPPORTING INPUT:
PAPER4_PEDAGOGICAL_READER_AUDIT_v1.1_2026-08-29.md
PAPER4_v1.2_COROLLARY_INSERTION_NOTE_2026-08-29.md
FIG1_SIX_CARRY_DOMAINS.pdf
FIG2_SUPPORT_COMPILER_PIPELINE.pdf
FIG3_FIRST_HIT_PREFIX_TREE.pdf

ROLE

Act as the primary scientific exposition editor for a nearly submission-ready
Combinatorics on Words paper.

The mathematics, symbolic distinctness proof, and reproducibility gates have
already been closed separately.  Your task is not to discover new mathematics.  A small new exact
profile-feasibility lemma/corollary has just been inserted after Theorem 4.2;
your first responsibility is to audit whether it is correct, naturally placed,
and proportionate to the paper.  Otherwise your task is to make the manuscript
maximally readable, self-contained and professionally structured for a
specialist journal.

If you detect an actual mathematical contradiction, STOP and report it.

NO Git mutation.
NO canonical mutation.
NO new experiments.
NO new theorem unless a contradiction forces a repair.
NO stronger novelty language.

============================================================
1. READER SIMULATION
============================================================

Read the paper as a specialist who has never seen the project.

At every new definition/theorem ask:

- What object is being discussed?
- Why is it introduced here?
- Is it defined before use?
- Can the reader see a small example?
- Does the next theorem depend on hidden project history?

The paper must stand alone.

============================================================
2. NOTATION DISCIPLINE
============================================================

Preserve these deliberate choices unless there is a compelling reason:

- h_6 = morphism;
- eta = local depth increment;
- rho = fixed Parikh profile;
- kappa = Paper-4 macro curvature;
- delta_j = Carpi selector variables;
- x_i = unresolved prefix Parikh variables;
- e_alpha = standard unit Parikh vector.

Do not reuse h as a numeric parameter or profile.

Check every bold/vector symbol is defined, especially the all-ones vector.

============================================================
3. DEFINITIONS
============================================================

Verify that the manuscript defines, before substantive use:

factor;
prefix;
Parikh vector;
uniform coding;
role;
partial assignment;
assigned/unresolved role;
local depth;
occurrence mask;
reduced support signature;
affine target;
support family;
profile;
factor-maximal;
minimal macro support;
profile-correct;
first-hit blocked edge;
frontier state;
multinomial notation used in Appendix B.

If a term is standard but potentially ambiguous in Combinatorics on Words,
prefer one short definition over an implicit assumption.

============================================================
4. MAIN THEOREM PEDAGOGY
============================================================

The reader should be able to explain the chain

three cutpoints
→ q,r and carries
→ six physical domains
→ 34 physically realizable masks
→ 19 complete reduced support families
→ affine target loading.

Make the distinction between 34 and 19 impossible to miss.

Do not call the 19 families:
- states;
- minimal automaton;
- 19 total constraints;
- complexity reduction.

They are equality classes of complete reduced support sets.

============================================================
5. NEW PROFILE-FEASIBILITY INSERTION
============================================================

Section 4.2 now introduces:

- the reachable target set R_sigma(rho);
- Lemma 4.3 (prefix-Parikh chain realizability);
- Corollary 4.4 (exact target feasibility for one target-loaded window).

Audit this addition especially hard.

Check that:

1. R_sigma(rho) is defined over the SAME unresolved block word across all
   occurrences of the unresolved role;
2. the prefix-chain lemma is genuinely iff and its constructive direction is
   complete;
3. the target convention is unambiguous;
4. Corollary 4.4 is exactly a SINGLE-WINDOW feasibility statement;
5. the manuscript does not accidentally turn it into a global coding
   certificate or long-period theorem;
6. it does not duplicate Section 10 unnecessarily;
7. the new result improves the support/target interface enough to justify its
   inclusion.

You may recommend one of:

INCLUDE AS WRITTEN / INCLUDE BUT COMPRESS / MOVE TO SECTION 10 / OMIT FROM MAIN
TEXT.

If the mathematics is correct but the statement is close to definitional,
prefer concise presentation rather than inflated novelty language.

No benchmark, record-hunt, speedup, or empirical converse material belongs in
this manuscript addition.

============================================================
6. PROOF PRESENTATION
============================================================

Do not weaken rigor for readability.

Check that these proofs are visibly complete:

- six-domain exhaustiveness;
- one-point truncation;
- 34 role/mask count;
- exact 34→19 quotient;
- all nineteen cardinalities;
- all-L>=5 pairwise distinctness;
- finite subset-factor gate;
- fixed-profile path equivalence.

If an argument is currently split between main text and appendix, make the
cross-reference explicit.

============================================================
7. CASE-STUDY SEPARATION
============================================================

The general theorem must not appear to depend on:

- alphabet size 3;
- block length 40;
- the h_6 source;
- the six A..F profiles;
- the H/RX populations.

Sections 8 onward are a case study/application.

Make that separation visually and rhetorically clear.

============================================================
8. COMPUTATIONAL SECTION
============================================================

Keep Section 11 secondary.

The reader must understand in plain language:

- AF-compatible;
- AFE-completable;
- jointly completable;
- what RX is;
- what H is;
- why H is selected/canonical;
- what 263/263 agreement means;
- why 86/86 refers only to positive literal witnesses;
- why none of the finite counts are probabilities.

Recommend moving the exact-equal-exposure table to the supplement if that
improves the narrative.

============================================================
9. LITERATURE TONE
============================================================

Do not claim novelty for generic ingredients.

Allowed framing:
- "the theorem proved here";
- "the principal structural result";
- precise comparison with Carpi C3;
- precise statement that local C3 data do not determine q.

Avoid:
- "first ever";
- broad "new algebra";
- "to our knowledge" unless the literature basis is explicitly sufficient;
- treating absence of a located analogue as proof of historical novelty.

============================================================
10. FIGURES
============================================================

Inspect all three figures for correctness and usefulness.

Captions should answer:
"What should the reader learn from this figure?"

If a figure duplicates a table without improving comprehension, recommend
removal.

Do not add decorative graphics.

============================================================
11. EDIT
============================================================

Produce a conservative improved manuscript:

PAPER4_MANUSCRIPT_SUBMISSION_CANDIDATE_v1.3_CLAUDE_READER_EDIT_2026-08-29.md

Also produce:

PAPER4_CLAUDE_READER_EDIT_REPORT_2026-08-29.md
PAPER4_v1.2_TO_v1.3_CHANGELOG_2026-08-29.md

For every substantive edit classify it as:
DEFINITION / NOTATION / FLOW / PROOF-EXPOSITION / FIGURE / COMPUTATIONAL-CLARITY /
LITERATURE-TONE.

Do not silently change a theorem statement or number.

FINAL VERDICT:

A. READY FOR ADVERSARIAL REFEREE
B. MINOR READER REPAIRS STILL NEEDED
C. MAJOR EXPOSITION RESTRUCTURE NEEDED
D. MATHEMATICAL CONTRADICTION FOUND — STOP
