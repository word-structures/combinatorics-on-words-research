# Paper 4 v0.33 — final required patches before canonical promotion

**Date:** 2026-08-29 · sandbox only · **no manuscript mutation performed here**.
Target: `PAPER4_MANUSCRIPT_v0.33_REFEREE_REPAIR_SANDBOX_2026-08-29.md`
(sha256 `eb17d64669b478afc0d060eb384e956930bc2cfda6a387c8eaf8f1cd33bfbf71`).

Three patches. **None changes any mathematical statement.** P1 is required for
correctness of the record; P2 and P3 are cosmetic.

---

## P1 (REQUIRED) — §13, attach the now-completed `AFE_EXISTS` cross-check

**Current text (§13, immediately after the strata tables):**

> The bucket-gate DFS and the independently written stage DFS agree on all
> \[263/263\] quota-matched canonical H pairs for the **joint** predicate
> `AF_AND_AFE_EXISTS` (44 positive). The `AFE_EXISTS` column reported above has
> not yet received an equivalent two-solver cross-check.

**Replace with:**

> Both reported predicates have independent two-solver agreement on the
> quota-matched canonical H population.
>
> The bucket-gate DFS and the independently written stage DFS agree on all
> \(263/263\) pairs for the joint predicate `AF_AND_AFE_EXISTS` (44 positive).
>
> The `AFE_EXISTS` verdict was subsequently recomputed by a second, AFE-only
> solver — a distinct signature/target-bucket compilation with its own search,
> in which no FAF constraint is ever generated — on all \(263\) pairs. The two
> implementations agree on \(263/263\) cases, comprising all \(86\)
> AFE-positive and \(177\) AFE-negative pairs, with no capped or unresolved
> case. For each of the \(86\) positives one witness \(F\) was additionally
> verified directly from the literal word \(A\cdot F\cdot E\), confirming
> \(\Psi(F)=(19,11,10)\) and the absence of any Abelian square of half-period
> \(K\in[2,40]\); all \(86\) witnesses passed.
>
> That the second route computes `AFE_EXISTS` and not the joint gate is
> established by the \(42\) pairs which are AFE-positive but
> `AF_AND_AFE_EXISTS`-negative: the AFE-only solver returns a witness on every
> one of them.

**Reason.** The final clause of the current text is now factually false. The
cross-check is reported in `SANDBOX_REPORT_AFE_EXISTS_263_CROSSCHECK_2026-08-29.md`
under protocol `e56c3e2d4e33df84090ad53159cb5761de80da81427ddfe726401e5d38479641`,
hashed before execution.

**Also update §17.3**, which currently reads

> - two-solver \(263/263\) agreement on the quota-matched H population for the
>   joint `AF_AND_AFE_EXISTS` predicate;

to

> - two-solver \(263/263\) agreement on the quota-matched H population for the
>   joint `AF_AND_AFE_EXISTS` predicate;
> - independent two-solver \(263/263\) agreement for `AFE_EXISTS` (86 positive,
>   177 negative, 0 unresolved), with literal-word validation of all 86
>   witnesses;

**And Appendix B item 1**, currently

> 1. the `263/263` two-solver agreement is attached only to the joint
>    `AF_AND_AFE_EXISTS` predicate it actually validates;

to

> 1. the joint `263/263` two-solver agreement is attached to the
>    `AF_AND_AFE_EXISTS` predicate it actually validates, and a separate
>    independent `263/263` cross-check is recorded for `AFE_EXISTS`;

**Do not** merge the two checks into a single sentence or a single number: they
are different predicates validated by different runs, and conflating them is the
defect this patch exists to prevent.

---

## P2 (REQUIRED) — §16, orphaned Keränen citation

**Current text (§16):**

> - Keränen used staged prefix algorithms in Abelian-square-free constructions.

The reference supporting this (Keränen, *The Mathematica Journal* 11, 2010) was
removed from the bibliography in the v0.33 pass as unverified — correctly, since
it should not be completed from memory. The surviving Keränen entry (ICALP 1992)
concerns avoidability on four letters, not staged prefix algorithms, so the
sentence is now uncited.

**Choose one:**

- **(a)** delete the bullet until the supporting reference is verified; or
- **(b)** restore a Keränen staged-construction reference **only** once its
  title, venue, volume, year and pages have been confirmed against an
  authoritative source. Do not reconstruct it from memory.

Option (a) is the conservative default and is consistent with the rest of the
v0.33 bibliography pass.

---

## P3 (COSMETIC) — appendix version labels

- Appendix A is headed **"Epistemic ledger for v0.32"** — should be **v0.33**.
- Appendix B is headed **"Editorial changes through v0.32"** — should be
  **v0.33**.

---

## Not to be changed

Verified in this pass and correct as written; no patch should touch them:

- §12.2's frontier finding (`A_d = {1,…,d}` for 38 of 40 depths,
  `max|A_d| = 38`, ternary-forced, multiplicity 1, quotient DAG = full legal
  prefix trie, "maximally history-dependent") — matches my measurement exactly;
- §17.2's separation of outline-proof statements from proved-from-definitions
  statements, and the corresponding Appendix A relabelling;
- §10's arity-zero paragraph (703 of 3,081) and raw-vs-effective paragraph
  (1,238 → 443, 652 discarded) — both match my measurements exactly;
- Lemma 11.1's replacement example (`u=aba`, `v=baa`, continuation `aa`,
  constraint `X₁−2X₃+X₅=0`) — recomputed independently and correct, and a
  genuine `K=2` support;
- §8.1's corrected `L=4` wording;
- §16's generic-machinery novelty disclaimer;
- the bibliography as it now stands, including the conservative replacement of
  the *Math. Comp.* entry by `arXiv:2605.20504` and the removal of the uncertain
  Keränen 2010 entry;
- every numeric entry in the §13 tables, `|W_h|`, Theorem 8.1, and all nineteen
  Table-1 cardinalities.

## Standing constraints unchanged

Mäkelä **OPEN**. `NOVELTY_UNRESOLVED`. `0/137` remains finite evidence and
carries no probability interpretation. No weighted-frontier H/RX mechanism
experiment has been run. Canonical promotion remains an owner decision.
