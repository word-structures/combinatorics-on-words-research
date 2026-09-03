# Paper 4 — editorial report for v1.3

**Date:** 2026-08-29
**Input:** `PAPER4_MANUSCRIPT_SUBMISSION_CANDIDATE_v1.2_PRE_CLAUDE_2026-08-29.md`
(handoff zip sha256 `468053f524ef75660ee53971d26b476c67d90cb99d15d1906017614f569a0086`;
all 15 files verified against `SHA256SUMS.txt`, 15/15 OK).
**Output:** `PAPER4_MANUSCRIPT_SUBMISSION_CANDIDATE_v1.3_CLAUDE_2026-08-29.md`.
v1.2 was not modified.

*Filename note.* The handoff README asks for `..._v1.3_CLAUDE_EDIT_...` and
`PAPER4_CLAUDE_EDITORIAL_REPORT_...`; the task instruction asks for
`..._v1.3_CLAUDE_...` and `PAPER4_CLAUDE_EDIT_REPORT_...`. I followed the task
instruction.

---

## 1. Major structural edits

**The main theorem now appears on page one.** It is stated as *Theorem A* in
§1.1 and proved as Theorem 5.1. A reader can now see the whole claim before any
machinery.

**Sections were regrouped from 14 to 11.** The general theory occupies §§2–6 and
is self-contained; the feasibility interface is §7; applications are §§8–9;
positioning is §10; limitations and conclusion are merged into §11.

**Prior work moved from §6 to §10.** In v1.2 the Carpi discussion sat between the
theorem and its applications, interrupting the argument. A short, honest
positioning paragraph now appears in §1.3, with the technical comparison
deferred.

**The 34→19 step was made to feel inevitable rather than asserted.** This was the
single largest expository gain. v1.2 said only that for masks 001 and 111 "the
deleted signature is reproduced elsewhere in \(P_t\)". v1.3 promotes this to
**Lemma 4.2** with the explicit rescuing witnesses \((0,L-1,L-2)\in P_t\) and
\((1,0,L-1)\in M_t\), and adds a paragraph naming the mechanism: masks 110 and
111 assign the *same* reduced form to \(p^+\) because the zero-depth term is
deleted, but only under 111 does a second point exist whose own zero-depth
deletion reproduces that form. The three identification mechanisms (trivial
mask, outer reversal, truncation transfer) are now numbered and separated.

**Domain definitions completed.** v1.2 gave \(P_t\) and \(M_t\) only in words
("the \(q=0\) positive- and negative-curvature cases"). v1.3 states their exact
integer inequalities (3.9)–(3.10), and Lemma 3.1 now includes the converse
realizability argument for \(Z,P,M\).

**Lemma 3.2 proof expanded** from four lines to a complete elimination on
\(v-u\in\{\ldots,-1,0,1\}\), with each impossible case dismissed explicitly.

**Distinctness restructured.** §6.2 now proves distinctness in two visible steps:
first the coefficient shape separates the six groups, then within each group an
explicit invariant (empty signature, depth moment, or cardinality) finishes. The
supporting structural facts (6.1)–(6.2) are isolated and proved. v1.2's closing
sentence — "for the remaining cross-group comparisons, coefficient type gives an
immediate separation" — has been replaced by the actual argument.

**Applications compressed.** v1.2 §§8–12 (case study, upstream skeleton,
downstream reachability, finite population, reproducibility) became a single §9
with four subsections. The reproducibility material is one paragraph.

**Scope warnings added where they bite,** not only in the discussion: after
Corollary 7.1 and after Lemma 8.1.

## 2. Notation changes

| change | reason |
|---|---|
| family suffix `M` → `CO` | **`M` was overloaded**: the negative-curvature domain and the "mixed" mask shape, producing the unreadable family name `M-M`. Families are now `Z-CO`, `P-CO`, `M-CO`, `P_t-CO`, `M_t-CO`. |
| §9.1 suffix Parikh `σ_r` → `λ_r` | **`σ` was overloaded**: support signature and suffix vector. |
| §9.1 `d_k(E)` → `θ_k(E)` | `d` is the depth symbol in (7.1). |
| (6.1) `−δ` → `−κ` | v1.2 wrote the curvature as `δ` in one equation after defining it as `κ`; `δ` is reserved for Carpi's selectors. |
| §10.1 `Ψ(F)=h` → `Ψ(F)=ρ` | leftover `h`; the profile is `ρ`. |
| Appendix A.1 `2h`, `(a,h)` → `2η`, `(a,η)` | leftover `h`; the local step is `η`. |

The reader audit had already removed the three-way `h` collision and the
`δ`/`δ_j` collision; the four items above are residues it missed. The preferred
conventions (`h_6`, `ρ`, `κ`, `δ_j`, `e_α`, bold `1` defined at use) are
retained.

## 3. Reachable-set decision: **INCLUDE COMPRESSED**

Lemma 4.3 and Corollary 4.4 of v1.2 are merged into a single **Corollary 7.1**
in its own short section, with the chain-realizability lemma folded into the
proof and stated as the computational reformulation (7.4).

*Why include.* The paper's thesis is that support and target are separable
layers. Without this result §4 ends at the classification and the target side
does not reappear until the application, so the interface is asserted rather
than demonstrated. The corollary makes it exact in one direction, in half a
page, and it uses the classification rather than standing beside it.

*Why compressed.* The chain-realizability statement is a standard nested-Parikh
fact whose interest here is entirely instrumental. As a separate numbered lemma
it competes for attention with the classification; as a proof step it does the
same work invisibly. Compressing also removes one numbered object from a paper
that already carries a lot of them.

The scope paragraph is explicit: one window, one profile, no coding-level or
morphism-level or long-period claim. No benchmark, speedup, empirical-converse,
or sufficiency language was imported.

## 4. Figures

| figure | decision | reason |
|---|---|---|
| FIG1 six carry domains | **retained** as Figure 1 | It is a compact table of exactly the content of Lemma 3.1 — regime, carries, block relation, curvature — and is the one place a reader can see why six domains and not three. Directly supports the main theorem. |
| FIG2 support-compiler pipeline | **dropped** | It renders the chain *cutpoints → 6 → 34 → 19 → targets*, which is already displayed as a boxed formula in §1.1, more precisely and without a figure. Visually pleasant, mathematically redundant. |
| FIG3 first-hit prefix tree | **retained** as Figure 2 | It illustrates the one non-obvious idea in §9.2 — a single blocked prefix deletes an entire cylinder — which the multinomial identity states but does not make visible. |

Both retained figures are referenced in the text and captioned without project
terminology. If space is tight, Figure 2 is the one to cut: it supports a
secondary section.

## 5. Mathematical statements that still concern me

**Two errors I introduced and then caught.** Both were found by checking against
the enumeration rather than by re-reading, and both are worth recording because
they show where this material is treacherous.

1. In Appendix A I rewrote the \(P\to M\) reflection as
   \((u,w)\mapsto(L-u,L-w)\). That is **wrong** and sends points out of range;
   v1.2's \((L-1-u,L-1-w)\) is correct. Verified at \(L=5,6,7\): the
   \((L-1-\cdot)\) map is a bijection \(P\to M\), the \((L-\cdot)\) map is not.
   Reverted, and the induced action on \(v\) is now stated.
2. In §6.2 I argued that \(Z\)-OO is separated from \(P\)-OO and \(M\)-OO by
   containing the moment \(2L-2\). This is **false for even \(L\)**: at
   \(L=6\), \(\mu(Z\text{-OO})\) and \(\mu(M\text{-OO})\) both reach \(10\).
   Replaced by the correct argument — \(P\)-OO and \(M\)-OO are separated by
   moment (they share a cardinality), and each is separated from \(Z\)-OO by
   cardinality, since \(\lfloor(L+1)^2/4\rfloor>\binom{\lfloor
   L/2\rfloor+1}{2}\) for all \(L\ge2\). The overlap is now stated explicitly so
   no later reader repeats the mistake.

**Inherited items I checked and did not change.** Table 2 reproduces at \(L=40\)
with 0 mismatches against an independent computation of all nineteen formulas;
the counting identity \(1+1+5+(5+1)+(5+1)=19\) is arithmetically right; the
\(Z\)-A derivation \(|Z\text{-OO}|-L+1=\lfloor(L-1)^2/4\rfloor+1\) is correct;
the \(Z\)-CO count \(2\min(v,L-1-v)+1\) is correct; and (10.1)'s Carpi
specialization is correct once `δ` is read as `κ`.

**One residual scope point.** §5's small-\(L\) remark says \(19\) is reached at
\(L=4\) but with a different family list. That is right, but a hasty reader may
still quote "19 for \(L\ge4\)". The sentence is now explicit that \(Z_s\) is
empty there; I would not weaken it further.

## 6. Literature wording

The Carpi comparison is the most exposed part of the paper, and it is now
stated more conservatively than in v1.2 in one respect and more precisely in
another.

More precise: v1.3 says explicitly that the selectors \(\delta_j\) "play a role
analogous to the carry bits \(c_j\) rather than to the curvature \(\kappa\),
which is a derived quantity", and adds that Carpi's condition quantifies over
prefixes of images that are all *known*, whereas the present setting has one
image unknown. Both statements are supported by the form of the condition.

Still slightly exposed: the sentence "the admissible selector triples in the
arithmetic-progression specialization are therefore not the six physical domains
of Lemma 3.1" is a claim about what Carpi's condition does *not* determine.
The supporting argument given — that local data fixes depths and carries
independently of \(q\) — is sound. But the paper does not claim to have read
Carpi's proof, only the condition, and if a referee has the original to hand
this is where they will look first. I would keep the sentence and be ready to
defend it, rather than soften it into vagueness.

**One bibliographic correction.** The Carpi page range is changed from 151–**168**
to 151–**167**, on the strength of two independent reference lists (Eyidoğan–
Göral–Tanısalı 2026, entry [4]; Rao, *On some generalizations of abelian power
avoidability*, entry [2], which also gives volume 03(2)). The DOI is unchanged.
The other six entries were left as they stand.

No global-priority phrasing appears. The paper says what it proves and lists
what it does not claim.

## 7. Sections still dense for a specialist reader

**§6.2 (distinctness)** is the densest page. It is now a correct and complete
argument, but it is six sub-arguments in sequence. If a further pass is wanted,
the natural move is a summary table — family pair, invariant used, witness —
with the prose reduced to the two or three non-obvious cases. I did not add it
because the section would then be table-heavy immediately after Table 2.

**§9.1** compresses the \(361/419/380\) skeleton into one display. A reader who
wants to verify those counts cannot do so from the paper; they are stated, not
derived. That is defensible for a case study, but it is the place where a
referee may ask for a pointer to the supplement.

**Appendix A** is a sequence of nineteen short derivations with little
signposting. It is complete and checkable, but it reads as a list.

## 8. Recommended next gate

**A hostile referee pass focused on §§3–6 only.** The applications and the
literature section have now had several passes; the classification proof has had
one as a continuous argument. The specific questions to put to that reader are:
does Lemma 3.1's converse realizability argument convince; is Lemma 4.2's
witness construction airtight for all \(L\ge5\); and does §6.2 separate every
pair without a gap. Those three are where the paper's correctness actually
rests.

If external access to Carpi 1993 becomes available before submission, checking
§10.1 against the original is worth more than any further editing.

---

## Verdict

> **B. READY AFTER MINOR OWNER EDITS**

The mathematics is intact and, in two places, better supported than in v1.2: the
truncation transfer now has explicit witnesses and distinctness now has a
complete argument. The two errors introduced during this pass were caught and
corrected before delivery, and both corrections are verified against
enumeration.

It is **B** rather than **A** for author-level reasons only, none of which I
should decide: the author block is unfilled; the reproducibility archive URL and
release identifier in §9.3 are still placeholders; and the Carpi page-range
correction in the references should be confirmed by someone with the volume in
hand rather than inherited from two secondary lists. None of these is a
mathematical or expository blocker.
