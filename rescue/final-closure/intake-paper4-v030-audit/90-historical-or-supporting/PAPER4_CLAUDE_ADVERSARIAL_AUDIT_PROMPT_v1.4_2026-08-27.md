# Claude Adversarial Audit Prompt — Paper 4

**Version 1.4 — includes full 2138 replay and D-aware gate theorem**

You are acting as a hostile-but-fair mathematical referee and computational
reproducibility auditor.

## Mission

Audit the proposed Paper 4 research program:

**Block Assembly over a Morphic Core for Ternary Abelian-Square Avoidance**

Do not improve the prose first. Try to break the mathematics, novelty claims,
and computation.

## Non-negotiable epistemic rules

Use these labels:
- `PROVED`
- `EXACT-CHECKED`
- `NUMERICAL`
- `OPEN`
- `NOVELTY_UNRESOLVED`

Do not infer a positive solution of Mäkelä's conjecture unless one explicit
six-block H passes:
1. all 22 \(h_6\)-trigram checks for every half-period \(2\le K\le40\);
2. the long-period Gate T with zero realizable outer parents;
3. an independent replay.

Do not treat search failure as global nonexistence.

Do not use or request h=8.
Do not use D40.
Do not mutate Git.

## Files to audit, in this order

1. `PAPER4_CLEANROOM_PROOF_AUDIT_v0.1_2026-08-27.md`
2. `PAPER4_COMPONENT_EXCLUSION_THEOREM_v0.1_2026-08-27.md`
3. `PAPER4_GATET_FAILCLOSED_MILESTONE_v0.2_2026-08-27.md`
4. `PAPER4_LITERATURE_AUDIT_v0.5_2026-08-27.md`
5. `PAPER4_CLAIM_PRIORART_EVIDENCE_MATRIX_v0.1_2026-08-27.md`
6. `PAPER4_MANUSCRIPT_v0.12_2026-08-27.md`
7. relevant exact-output/code files referenced by those documents.

## Audit A — clean-room mathematics

### A1 Boundary lemma

Re-derive from scratch:
\[
C(i_2,s_2)-2C(i_1,s_1)+C(i_0,s_0)=0.
\]

Check:
- sign convention;
- carry convention;
- \(K=qL+r\);
- the claim that the two macro intervals differ in length by at most one;
- conversion to equal-length adjacent macro cores;
- whether the finite correction set is genuinely independent of q.

Produce a counterexample if any step fails.

### A2 Rank-one kernel lemma

Audit:
\[
M'=sM+u\mathbf1^T.
\]

Check necessity of:
- original common column sum \(L\ne0\);
- \(s\ne0\);
- new common column sum \(sL+\mathbf1^Tu\ne0\).

Verify the Paper-4 specialization \(L=10,L'=40\).

### A3 Three-block locality

Attack all start phases, especially starts at offsets 1 and 39.
Prove or refute:
a factor of length \(\le2L\) intersects at most three consecutive L-blocks.

### A4 22-trigram theorem

Independently regenerate the exact length-2 and length-3 factor sets of
\(h_6^\omega(a)\).
Do not trust empirical stabilization alone; establish closure.

Then verify the iff statement for \(2\le K\le40\).

## Audit B — component certificate soundness

Treat the A-role graph as an induced subgraph of Chase's classical
transposition graph \(G(15,14,11)\).

Trace a hypothetical valid full coding H through every gate:
- AF;
- AFD;
- ABCF;
- simultaneous full-D;
- E;
- 22-trigram final finite gate.

Your job is to find any gate that could discard a valid H.

### Mandatory regression: cyclic-BC bug

A historical implementation required cyclic cleanliness of \(BC\), which
implicitly checked `BCB`.  But `bcb` is absent from the exact
\(h_6\)-trigram language.

Verify independently:
- `cbc` occurs;
- `bcb` does not occur;
- therefore `BCB clean` is not a justified necessary gate unless separately
  proved implied.

Treat historical C1/C2/C5/C8 as pending corrected replay.

Distinguish:
- theorem soundness;
- completeness of a specific finite enumeration;
- global coverage of the A-role state graph.

The last of these is NOT claimed.

## Audit C — Gate T

### C1 Contracting coordinates

Recompute
\[
Q=
\begin{pmatrix}
0&2&-1&-1&0&0\\
1&-1&1&0&-1&0\\
1&1&-1&0&0&-1
\end{pmatrix}
\]
and verify
\[
QM_{h_6}^2=0.
\]

Independently establish or refute:
\[
|Qd|\le(4,4,2)
\]
for differences of source factors.

### C2 Expanding coordinates

Audit the exact correction maxima and the invariant integer thresholds
\[
3,\quad46,\quad9.
\]

Do not accept floating-point sign decisions.

### C3 Finite ancestor box

Check that the inverse-coordinate bound used for the free-variable cube is a
true upper bound for every integer ancestor vector.

Try to construct a vector outside the box satisfying all spectral bounds.

### C4 g3 negative regression

Independently verify:
- 11023 outer parents in the stated bounded superset;
- ancestor closure;
- finite factor bound;
- zero realizable parents.

Explain why 11023 need not equal Rao–Rosenfeld's published 16214 upper count.

### C5 H40 positive control

Verify directly that the reported `cbce` decomposition really realizes the
reported ancestor template.

A fail-closed certifier should reject this known-bad candidate.

## Audit D — literature / novelty

Explicitly compare Paper 4 against:

- Carpi 1993 — universal Abelian-power-free morphisms;
- Currie–Rampersad 2012 — templates/parents/ancestors;
- Rao–Rosenfeld 2018 — h6/g3 and outer-parent criterion;
- Eyidoğan–Göral–Tanısalı 2026 — parent sieve;
- Chase 1973 — transposition graphs;
- Keränen 2010 — exhaustive unfavourable-factor search;
- Shur 2008 — extendable part of a factorial language;
- Grytczuk–Stankiewicz 2020 — connected components of word graphs.

For each allegedly project-specific item, return:
1. closest source;
2. exact overlap;
3. exact difference;
4. novelty verdict.

Do not write "not in the literature".
Use:
`not found in sources checked`.

## Audit E — positive-result wording

Search the entire manuscript for any sentence that could be read as saying:
- Mäkelä is solved;
- an H40 solution exists;
- the 18 components exhaust the search space;
- the component theorem is a global nonexistence theorem.

Flag every ambiguous sentence.

## Required output

Produce:

### 1. Executive verdict
- mathematical correctness /10;
- computational reproducibility /10;
- literature coverage /10;
- novelty confidence /10;
- submission readiness /10.

### 2. Blocking issues
Only issues that must be fixed before submission.

### 3. Non-blocking improvements

### 4. Claim matrix
For every C01–C22 row:
`PASS / FAIL / NEEDS_SOURCE / NEEDS_INDEPENDENT_REPLAY / NOVELTY_UNRESOLVED`.

### 5. Minimal patch list
Exact manuscript sections/sentences to change.

### 6. Independent-computation requests
List the smallest independent scripts needed to close remaining gaps.

## Referee stance

Praise nothing unless it survives an attack.
A negative audit result is useful.
A counterexample is more valuable than a stylistic suggestion.


## Mandatory current-state reconciliation

Do not audit against the obsolete historical aggregate blindly.

Current status:
- C1 and C2 have been replayed with the corrected actual-language ABCF gate:
  30/30 AFD modules are dead.
- C5 and C8 remain pending corrected replay.
- a new sound run gives
  \[
  392 A\to250 AF\to5 AFD\to5 ABCF\to0 ABCDF.
  \]
- the new full-D result has an independent Python replay.

Explicitly verify that the manuscript's aggregate language matches this state.

Also search every pruning predicate for a macro factor absent from the exact
14-bigram / 22-trigram language. Any such unproved stronger predicate is a
blocking `FAIL`.


## New high-priority audit target: 2138-state component

Audit `PAPER4_ATTACK2_2138_COMPONENT_CERTIFICATE_v1.0_2026-08-27.md`.

Required checks:
1. independently verify the component has exactly 2138 vertices;
2. verify the swap edge predicate is Chase-transposition + internal cleanliness;
3. independently verify only 29 vertices admit any AF module;
4. verify the complete AF total is 39;
5. verify exactly 5 AFD survivors;
6. verify all 5 are corrected-ABCF-dead under
   `FB, AC, BC, CB, CBC`;
7. reject any hidden `BCB` or other absent-macro-factor pruning.

Treat this component as the primary finite-certificate stress test.


## Mandatory D-aware audit

Audit `PAPER4_DAWARE_GATE_THEOREM_AND_40MODULE_CERTIFICATE_v1.0_2026-08-27.md`.

Required attacks:

1. Verify all AFD-D words are exhaustively enumerated, not only first
   witnesses.
2. Check that `fb,bdf,dfb,fbd` are actual \(h_6\) factors.
3. Prove that any full coding must supply a B,D pair retained by ABDF.
4. Independently compare the B-first and D-first enumeration logic.
5. Check the reported exact equality of the two surviving pair sets.
6. Verify the final C conditions:
   `ac,bc,cb,dc,cbc,bdc,cbd,dcb`.
7. Try to find any actual \(h_6\) C/D/B context omitted from this gate.
8. Reject any use of absent factors as necessary pruning.

Current finite claim:
\[
40AFD\to407D\to2ABDF\to0ABCDF.
\]

## Mandatory 2138 replay audit

Audit the independent replay certificate and verify:
- identical component SHA256;
- exact 29 hit-A set;
- exact 39 AF count;
- identical 5 AFD pair set;
- independent corrected ABCF 0/5.
