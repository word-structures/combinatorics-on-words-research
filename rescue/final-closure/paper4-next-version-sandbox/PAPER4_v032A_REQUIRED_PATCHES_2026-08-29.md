# Required patches for Paper 4 v0.33

**Date:** 2026-08-29 · sandbox only · no manuscript mutation performed here.
Target: `PAPER4_MANUSCRIPT_v0.32a_EDITORIAL_SANDBOX_2026-08-29.md`
(sha256 `0d03775a30c067a297df02a58c4e218362e460f4b0673113f0bf2923a953c5f5`).

Each patch below is written so it can be applied verbatim. Nothing here changes
any mathematical statement except where explicitly marked.

---

## P1 (BLOCKING) — §13, misattributed two-solver agreement

**Remove:**

> The bucket-gate DFS and the independently written stage DFS agree on all
> \[263/263\] quota-matched canonical H pairs.

**Replace with:**

> The bucket-gate DFS and the independently written stage DFS agree on all
> \(263/263\) quota-matched canonical H pairs for the **joint** predicate
> `AF_AND_AFE_EXISTS` (44 positive). The `AFE_EXISTS` column reported above has
> not yet received an equivalent two-solver cross-check.

*Alternative, if the owner prefers to keep a validation attached to the headline:*
run the bucket-gate solver against `stageDFS` on the `AFE_EXISTS` predicate over
the same 263 pairs and report that agreement instead. Until then the sentence
above is the accurate one.

**Reason.** `SANDBOX_REPORT_12` line 86 states the agreement is
`sat ⇔ AF_AND_AFE_EXISTS`; its extinction table reads "H (219 UNSAT of 263)",
and `263 − 219 = 44`. §13.1 elevates `AFE_EXISTS` (86) to the headline, so as
written the sentence implies a validation that was never performed.

---

## P2 (BLOCKING) — §12.2, the compression claim

**Remove:**

> This theorem permits exact first-hit geometry without requiring explicit
> enumeration of every prefix.

**Replace with:**

> The identity is exact for any constraint system. Its practical value depends on
> how much the frontier actually merges. For the AFE system at \(L=40\) it merges
> nothing: the \(342\) ternary constraints alone force
> \[
> A_d=\{1,\dots,d\}\quad\text{for }38\text{ of the }40\text{ depths},
> \qquad \max_d|A_d|=38,
> \]
> and since consecutive differences of \(X_1,\dots,X_d\) are unit vectors, the
> frontier state determines the prefix word. Every state therefore has
> multiplicity \(1\) and the quotient DAG coincides with the full legal prefix
> trie. The AFE system is in this precise sense **maximally history-dependent**;
> the weighted identity is used here for its exactness, not for compression.

**Also patch §18.** Remove *"the quotient-DAG theorem now makes its exact mass,
survival curve, and concentration computable without identifying those
quantities with DFS behavior"* and replace the trailing clause with
*"…computable exactly, independently of DFS branch order (though, at \(L=40\),
without state compression — see §12.2)."*

**Also patch Appendix B item 9** to drop any implied efficiency benefit.

**Reason.** Measured, not inferred: `runs/v032a_impl_semantics.json` gives
`|A_d| = 0,1,2,…,37,38,28,0`. Ternary alone yields 38 of 40; binary alone 37.

---

## P3 (BLOCKING) — §17.1 and Appendix A, proof-status labels

**Option A (preferred): supply the missing derivations** in §8 —
(i) the pattern-by-pattern argument for the 34→19 collapse, replacing
*"the remaining pattern equalities follow from outer symmetry and zero-depth
reduction"*; (ii) a derivation for each of the nineteen Table-1 cardinalities;
(iii) the coefficient-shape spectra used for distinctness.

**Option B (if A is not done for v0.33): relabel.** In §17.1 move

- "exact \(34\to19\) support-family quotient and the 19 closed cardinalities"
- "pairwise distinctness of the 19 support families for \(L\ge5\)"

out of *Proved from definitions* into a new subsection **"Exactly verified,
proof written only in outline"**, and change the Appendix A rows

| 19 exact support families | **PROVED + CLEAN-ROOM RECONSTRUCTED** |

to

| 19 exact support families | **EXACTLY VERIFIED; written proof is an outline** |

**Reason.** The statements are true — an independent reconstruction reproduced
34 patterns, 19 families for `L ≥ 5`, the small-`L` sequence `9,15,19,19,19,19`,
and all nineteen cardinalities at `L = 40`. But the manuscript contains no
derivation of any cardinality, and "proved from definitions" is not defensible
for a document that does not contain the proof.

---

## P4 (HIGH) — numbering collision

`### Proposition 12.4 — translation-invariant pure-square mass` (§12.5) collides
with `### Theorem 12.4 — weighted frontier-DAG identity` (§12.2).

**Renumber** the §12.5 statement to **Proposition 12.6** and the following
`Corollary 12.5` to **Corollary 12.7**, then update cross-references (§12.5's
closing sentence and Appendix C's final paragraph both refer to "Section 12").

---

## P5 (HIGH) — §10, the degenerate affine class

**After** *"where the support coefficients come from the occurrence geometry and
\(T\) is a finite forbidden target set determined by assigned data"*, **insert:**

> The empty support is included. A window all of whose cutpoints fall outside the
> unresolved role contributes the empty sum with \(T=\{0\}\): it is decided
> entirely by the assigned data and, when violated, makes the instance
> unsatisfiable before any \(F\) is chosen. At \(L=40\), \(703\) of the \(3081\)
> AFE windows are of this kind.

---

## P6 (HIGH) — §15, undefined "Gate T"; missing ADEF cover

- **"Gate T"** occurs exactly once and is defined nowhere. Either define it at
  first use or delete the final arrow from the §15 chain.
- The chain contains `ADEF_complete`, but the §5 cover table supplies covers only
  for `\{A,F\}`, `\{A,E,F\}` and `\Gamma\setminus\{C\}`. Either add the ADEF
  factor-maximal cover and its ceiling to the table, or mark that stage
  explicitly as *"cover not yet computed"*.

---

## P7 (HIGH) — §2, Carpi attribution

**Replace:**

> Carpi's necessary rank condition for the relevant preservation problem forces a
> commutatively bijective incidence structure, which is impossible for six
> image-Parikh vectors in \(\mathbb Z^3\).

**With** the same statement carrying an exact pointer — proposition/condition
number and the precise hypothesis under which it applies. This sentence carries
the justification for working in the restricted macro language and is currently
unverifiable as written.

---

## P8 (MEDIUM) — Lemma 11.1 example

The witness constraint `X_1 − 2X_2 + X_3 = 0` has half-period \(1\); AFE
constraints require \(K\ge2\), so no such constraint exists in the system.
Replace with a \(K\ge2\) instance (e.g. one referencing depths \(d-4,d-2,d\)) so
the illustration lies inside the model. The lemma and its arithmetic are correct
as they stand; only the witness is out of scope.

---

## P9 (MEDIUM) — §8.1, the `L = 4` sentence

**Replace:**

> At \(L=4\) the count has reached \(19\), but \(Z_s\) is still empty.

**With:**

> At \(L=4\) the quotient already has \(19\) classes, but they are not the \(19\)
> families of Table 1: \(Z_s=\varnothing\) there, so the same-block family is the
> empty set of signatures rather than the family of Table 1. The first genuine
> same-block \(K\ge2\) configuration occurs at \(L=5\), which is why \(L\ge5\) is
> the stable statement.

---

## P10 (MEDIUM) — window counts vs effective constraint counts

Wherever the window classification is quoted, note that at \(L=40\) the \(1238\)
unary **windows** collapse to \(443\) distinct \((\text{depth},\text{target})\)
pairs after aggregation, and a further \(652\) unary windows are discarded
soundly because their target is not a legal prefix state.

---

## P11 (MEDIUM) — §16, novelty boundary

**Add** to the list of things for which novelty is *not* claimed:

> - first-hit prefix-free cuts, future-equivalence state quotients, and layered
>   weighted counting DAGs, which are standard constraint-satisfaction and
>   automata constructions; only their application to the staged AFE system is
>   claimed here.

**Also** demote Theorem 5.1 to *Lemma 5.1* or *Observation 5.1*: its proof is
five lines and it is infrastructure, not a headline result.

---

## P12 (EDITORIAL)

- Move §12.5, §12.6, §8.2 and §4.2 to an appendix.
- Merge §15 into §5 (the two architecture diagrams are near-duplicates).
- Trim §14's opening paragraph, which restates §13.2.
- Complete or flag every bibliography entry; in particular the
  Eyidoğan–Göral–Tanısalı journal/DOI and the Keränen 2010 entry, and add
  volume/pages to Keränen ICALP 1992. **Do not fill these in from memory.**

---

## Not to be changed

The following were checked and are correct; no patch is needed and none should
be applied:

- Proposition 3.1 and the six length-40 profiles;
- the §5 cover ceilings `60 / 100 / 340` and `100 / 260 / 340`;
- Theorem 8.1's six domains and 34 patterns, and every Table-1 cardinality;
- the §8.1 sequence `9, 15, 19, 19, 19, 19`;
- Proposition 9.1 (`361 / 419 / 380`) and Lemma 9.2;
- §9.2's selection-effect statement;
- Theorem 10.1, Lemma 11.1's conclusion, Theorem 11.2, Lemma 12.1,
  Theorem 12.2, Corollary 12.3;
- Theorem 12.4's identity `Z + Σ M_d = |W_h|` and `A_surv = E[T]`, including the
  `T = 40` censoring convention, which is load-bearing and must stay stated;
- `N_eff` via `N w²`; the quotient-DAG and full-trie soundness statements;
- every numeric entry in the §13 tables and `|W_h|`;
- §13.2's finite-population framing.
