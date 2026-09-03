PAPER 4 — FINAL READER-FIRST / HOSTILE-REFEREE COMB

You are reviewing a nearly submission-ready Combinatorics on Words manuscript.

PRIMARY INPUT:
PAPER4_MANUSCRIPT_SUBMISSION_CANDIDATE_v1.1_READER_FIRST_2026-08-29.md

ALSO READ:
PAPER4_PEDAGOGICAL_READER_AUDIT_v1.1_2026-08-29.md
FIG1_SIX_CARRY_DOMAINS.svg
FIG2_SUPPORT_COMPILER_PIPELINE.svg
FIG3_FIRST_HIT_PREFIX_TREE.svg

ROLE:
Act simultaneously as:
1. a specialist referee in Combinatorics on Words;
2. a careful graduate-level reader encountering the framework for the first time;
3. a notation and exposition editor.

DO NOT start a new research programme.
DO NOT add new experiments.
DO NOT mutate Git/canonical files.
DO NOT broaden the novelty claim.
DO NOT reintroduce project-internal jargon merely because it exists in old notes.

The mathematics has already passed separate proof and reproducibility gates.
However, if you find an actual mathematical contradiction, STOP and report it.

============================================================
PHASE A — NOTATION COLLISION AUDIT
============================================================

Build a symbol table from the manuscript.

Check every symbol for:
- first definition;
- later reuse with a different meaning;
- collision with standard CoW conventions;
- collision between general theorem and case study.

Pay special attention to:
h_6, eta, rho, kappa, delta_j, x_i, e_alpha, chi, q,r,K,L,
Z_s,P_t,M_t,Z,P,M, A..F, B/B', S, W, C_rho.

FAIL if a symbol is materially reused without a clear reset.

============================================================
PHASE B — UNDEFINED-CONCEPT AUDIT
============================================================

Read as if you have NOT seen any project document.

List every term that a mathematically competent CoW reader could reasonably ask:

"What exactly does this mean here?"

Examples:
factor, prefix, role, partial assignment, local depth, occurrence mask,
support signature, reduction, affine target, support family, profile,
factor-maximal, minimal macro support, first-hit blocked edge, frontier state,
profile-correct, cylinder, deterministic quota, literal witness.

For each:
DEFINED BEFORE USE / DEFINED TOO LATE / UNDEFINED / STANDARD ENOUGH.

Do not excuse undefined project-specific language by saying an earlier internal
paper defined it.

============================================================
PHASE C — PEDAGOGICAL LOGIC AUDIT
============================================================

For each main section answer:

1. What question is the reader trying to answer?
2. What new object is introduced?
3. Why is it needed?
4. What is proved?
5. What should the reader remember before continuing?

Flag any section where the proof is correct but the motivation arrives after
the theorem.

Specifically test whether the reader can explain, in their own words:

- why q and the carry bits are different information;
- why q=0 creates truncated domains;
- why there are 34 physical cases but only 19 support families;
- why "support family" is not a set of satisfying words;
- why assigned words change targets but not the support catalogue;
- why the 19 families are not 19 automaton states;
- why the L=40 material is a case study rather than a theorem hypothesis.

============================================================
PHASE D — FIGURE AUDIT
============================================================

Inspect all three supplied figures.

For each determine:
- does it genuinely reduce cognitive load?
- is every symbol in the figure defined in the nearby text?
- does the caption state the mathematical point?
- can it be understood in grayscale?
- is any figure misleading?

Recommend an additional figure only if a genuine comprehension gap remains.
Do not add decorative figures.

============================================================
PHASE E — PROOF-EXPOSITION AUDIT
============================================================

Do NOT merely verify truth.

Ask whether a referee can see where every theorem is actually proved.

Especially inspect:
- Lemma 3.1 six domains;
- Lemma 3.2 one-point truncation;
- Lemma 4.1 34 patterns;
- Theorem 4.2 34→19 classification;
- Section 5 all-L pairwise distinctness;
- Lemma 7.1 subset gate;
- Proposition 9.1;
- Theorem 10.1.

Flag:
- "inspection" steps;
- hidden parity cases;
- undeclared endpoint conventions;
- claims proved only in an appendix but stated as if proved locally;
- examples accidentally doing theorem work.

============================================================
PHASE F — LITERATURE / CLAIM-TONE AUDIT
============================================================

The manuscript may claim the theorem it proves.

It must NOT claim novelty for:
- prefix Parikh vectors;
- (+1,-2,+1) second differences;
- Carpi whole-image corrections;
- Euclidean/mechanical carry arithmetic itself;
- generic template/ancestor methods;
- generic CSP / prefix reachability / quotient DAG methods.

Check every "new", "novel", "first", "exact", "minimal", "complete",
"independent", "general" and "to our knowledge".

For each strong word, classify:
SAFE / NEEDS QUALIFIER / REMOVE.

Do not infer historical novelty from absence in a small bibliography.

============================================================
PHASE G — COMPUTATIONAL-SECTION READABILITY
============================================================

Section 11 is deliberately secondary.

Check whether a reader understands:
- AF-compatible;
- AFE-completable;
- jointly completable;
- H versus RX;
- why H is selected/canonical;
- what 263/263 means;
- what 86/86 means;
- why none of these are probabilities.

If any internal acronym remains unexplained, flag it.

Ask whether the exact-equal-exposure table belongs in the main paper or should
move to a supplement. Give a recommendation.

============================================================
PHASE H — LINE EDIT
============================================================

Produce a conservative edited manuscript only if edits are genuinely helpful.

Do NOT change theorem content.

Allowed:
- definitions;
- paragraph order;
- shorter sentences;
- notation consistency;
- captions;
- reader signposts;
- removal of redundant prose;
- moving secondary tables to appendix/supplement.

Forbidden without explicit blocker:
- new theorem;
- changed hypothesis;
- changed numeric result;
- new novelty claim;
- new computational result.

============================================================
OUTPUTS
============================================================

Create in a fresh sandbox:

PAPER4_FINAL_READER_REFEREE_REPORT_2026-08-29.md
PAPER4_SYMBOL_AND_TERM_LEDGER_2026-08-29.csv
PAPER4_UNDEFINED_CONCEPT_AUDIT_2026-08-29.csv
PAPER4_CLAIM_TONE_AUDIT_2026-08-29.csv

If edits are warranted:
PAPER4_MANUSCRIPT_SUBMISSION_CANDIDATE_v1.2_REFEREE_EDIT_2026-08-29.md
PAPER4_v1.1_TO_v1.2_DIFF_SUMMARY_2026-08-29.md

FINAL VERDICT — choose exactly one:

A. READER-READY — ONLY JOURNAL FORMATTING REMAINS
B. READER-READY AFTER MINOR EDITORIAL REPAIRS
C. PEDAGOGICAL/NOTATIONAL MAJOR REVISION STILL NEEDED
D. MATHEMATICAL CONTRADICTION FOUND — STOP

No Git mutation.
