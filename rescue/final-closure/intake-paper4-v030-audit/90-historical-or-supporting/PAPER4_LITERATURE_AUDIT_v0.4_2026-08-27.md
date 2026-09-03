# Paper 4 Literature and Novelty Audit

**Version 0.4 — 2026-08-27**

**Purpose:** consolidate the literature state relevant specifically to Paper 4 / Block Assembly.  
**Rule:** “not found in sources checked” is not equivalent to “not in the literature”.  
**Novelty status:** NOT_ESTABLISHED.

## 1. Executive verdict

The project already had a serious literature map, but it was fragmented between
`LITERATURE_COVERAGE.md`, the Block Assembly theory/reduction notes, the Mäkelä/Rao correction note, and later FORBID4/template audits.

The old coverage file also contains a now-stale status: it records Currie–Rampersad (2012) full-text content as unverified. On 2026-08-27 the arXiv full text was directly opened and the template/parent/ancestor machinery was checked.

The literature foundation is therefore **strong enough to guide research and draft a manuscript**, but **not yet strong enough to claim novelty or submit**.

## 2. Core problem status

### Rao–Rosenfeld 2018 — VERIFIED primary source

Their paper states Mäkelä's ternary question as:

- avoid Abelian squares \(uv\) with \(|u|\ge2\) over three letters;
- their result becomes positive when 2 is replaced by 6.

Their Theorem 10 states that
\[
g_3(h_6^\omega(a))
\]
avoids Abelian squares of period more than 5.

Their Theorem 11 gives the corresponding infinite ternary existence result for period \(>5\).

Their paper explicitly calls this a weak answer to the original problem.

Therefore the project's safe baseline remains:

\[
\boxed{\text{Mäkelä period-}\ge2\text{ ternary problem is not treated as solved.}}
\]

### Rao 2015 ambiguity

The project's separate correction note records an internally inconsistent sentence in Rao 2015. It must not be used to claim the ternary period-\(\ge2\) question is impossible or solved.

## 3. Template / parent / ancestor prior art

### Currie–Rampersad 2012 — VERIFIED primary source, updated status

Direct full-text audit confirms:

- Section 3 defines \(k\)-templates.
- The Abelian \(k\)-power target is a special template.
- A parent relation is defined by pulling a template backward through the morphism.
- Lemma 3.3 gives computation of parents.
- “Ancestor” is the transitive closure of the parent relation.
- Their contraction hypothesis bounds ancestor Parikh-difference vectors and yields finitely many ancestors.
- Theorem 4.1 gives decidability of Abelian \(k\)-power freeness under their hypotheses.

**Important:** Narad Rampersad's errata page lists corrections to this paper, including the length bound used in the proof of Lemma 5 / Theorem 6. Any manuscript use of the precise finite factor bound must follow the corrected formula.

Consequence for Paper 4:
the generic notions of template, parent, ancestor, inverse-parent reduction and finite decision are **prior art**.

## 4. Rao–Rosenfeld 2018 long-image machinery — VERIFIED primary source

The relevant stronger outer-coding result is not merely Currie–Rampersad.

Rao–Rosenfeld Proposition 9 gives a finite set containing the templates realizable by \(h\) that can be parents under an outer morphism \(g\), under the condition
\[
E_e(M_h)\cap\ker(M_g)=\{0\}.
\]

Proposition 10 says that if no parent of the Abelian-power target template by \(g\) is realizable by \(h\), then
\[
g(\mathrm{Fact}^\infty(h))
\]
avoids Abelian \(k\)-powers of period larger than
\[
\max_a |g(a)|.
\]

Theorem 3 gives decidability of avoidance above any prescribed period threshold under the same expanding-space/kernel condition.

This is the load-bearing prior art for the final \(>40\) Gate T.

## 5. 2026 sieve development — VERIFIED at abstract / bibliographic level

Eyidoğan–Göral–Tanısalı, arXiv:2605.20504, develops:

- new sufficient conditions for Abelian power-free morphisms;
- a sieve combined with the Currie–Rampersad template method;
- reduction in the number of parents that must be examined.

The work is directly relevant as a computational acceleration / comparison point for Paper 4's long-template stage.

Current public information identifies it as a 2026 preprint and as accepted / to appear in Mathematics of Computation.

What is **not** established from the current audit:
that their sieve directly subsumes the project's fixed-length affine block-module factorization.


## 5A. Full-text audit of the 2026 sieve paper — COMPLETED

The full arXiv v2 (dated 28 July 2026) was read at the load-bearing Section 3,
not merely at abstract level.

The paper explicitly reintroduces the Currie–Rampersad objects:

- Definition 3.1: \(k\)-templates;
- Definition 3.2: realizations;
- Definition 3.3: parents under a morphism;
- Definition 3.4: ancestors.

Its Lemma 3.5 improves the inverse-parent **length bound** by replacing a coarse
\(mk\Delta\)-type contribution with a quantity based on cumulative Parikh-difference
vectors, allowing cancellation.

The actual sieve is more specific than “discard many parents.”  In their examples,
prefixes and suffixes are mapped to a finite quotient group.  An assumed Abelian
power forces the corresponding boundary values to form an arithmetic progression
in that quotient.  Most progressions are impossible or collapse to a smaller
preimage occurrence, leaving only a very small set of parent templates that need
full template processing.  For the Proposition 3.6 example they report a reduction
from 1,953,162 parents to 8 potentially realizable parents and from 1,953,289
ancestors to 224.

### Consequence for Paper 4

This sieve is **prior art for structural pruning of parent/template searches** and
must be cited if we accelerate Gate T in a comparable way.

It does **not**, in the portions audited, present the Paper-4 length-40 six-role
affine lift, the fixed \(h_6\) BC/AF module decomposition, or the conditional
fixed-Parikh block synthesis used here.

Therefore the safe classification is:

- `KNOWN`: template-parent sieve via algebraic / quotient constraints;
- `POTENTIALLY ADAPTABLE`: use such a sieve inside the future \(>40\) Gate T;
- `NOVELTY_UNRESOLVED`: the present block-assembly/module synthesis.

## 5B. Open-problem cross-check from the 2023 survey — VERIFIED primary/full text

Fici and Puzynina's *Abelian Combinatorics on Words: a Survey* records the
Rao–Rosenfeld ternary word whose longest Abelian squares have length 10 and then
states Mäkelä's ternary conjecture as still unproved:

\[
\text{there exists an infinite ternary word whose only Abelian squares are }
00,11,22.
\]

This provides an independent 2023 field-level confirmation of the problem status
after Rao–Rosenfeld 2018.

A targeted 2024–2026 search performed on 2026-08-27 found no later source clearly
claiming a solution of this conjecture.  This is a search result, **not** a proof
that no such work exists.



## 5C. Carpi barrier: why the six-letter fixed core is mathematically necessary

This audit found a structural point that should be made explicit in the
manuscript.

Carpi's theorem gives sufficient conditions for a morphism to preserve Abelian
\(n\)-power-freeness.  For source alphabets of cardinality at least six, the
conditions are also necessary.  Condition (C2) is commutative bijectivity:
\[
\Psi(q(u))=\Psi(q(v))\Longrightarrow \Psi(u)=\Psi(v).
\]
Equivalently, the Parikh vectors of the letter images are linearly independent.

For a morphism
\[
q:\Sigma_6^*\to\Sigma_3^*,
\]
those six image vectors lie in \(\mathbb Z^3\).  They cannot be linearly
independent.  Consequently no six-to-three morphism can preserve
Abelian-square-freeness for **all** Abelian-square-free source words.

This is also consistent with Keränen's later discussion of Carpi's
characterization, which notes that an Abelian-square-free morphism with a
six-letter source cannot even have a four-letter range.

### Consequence for Paper 4

The restriction to
\[
\operatorname{Fact}(h_6^\omega(a))
\]
is not merely a computational shortcut.  It is the mechanism that escapes the
universal-preservation obstruction.  Rao--Rosenfeld's outer morphism \(g_3\)
is the direct prior-art model for this escape.

Classification:

- universal six-to-three Abelian-square-free morphism: `IMPOSSIBLE / KNOWN`;
- fixed-core six-to-three outer coding: `KNOWN POSSIBLE ABOVE A THRESHOLD`
  from Rao--Rosenfeld;
- the present length-40 exact synthesis targeting threshold \(2\):
  `OPEN / NOVELTY_UNRESOLVED`.

## 5D. Terminology audit: “affine morphism” is already used

Andrade and Mol (WORDS 2025; arXiv 2408.15390) use **affine morphism** in their
work on additive-power-free rich words, where image length and image sum are
linear functions of the source letter.

That usage is not the same as the project's rank-one incidence perturbation
\[
M'=sM+u\mathbf1^T.
\]

Therefore Paper 4 should avoid presenting “affine lift” as named terminology.
Recommended wording:

> **kernel-preserving rank-one incidence lift**

The identity itself remains elementary:
\[
\ker(sM+u\mathbf1^T)=\ker M
\]
under the equal-column-sum condition used in the manuscript.

## 5E. Citation-forward update around Rao--Rosenfeld

The targeted post-2018 search located later work citing Rao--Rosenfeld,
including the 2024 SIAM paper by Currie--Mol--Rampersad--Shallit on Abelian
4-powers and 2024/2025 work on Abelian/additive powers in rich words.  These
works confirm continued use of the standard Abelian-power and template
toolkit, but the sources checked do not claim a solution of Mäkelä's original
ternary square problem.

The 2026 Eyidoğan--Göral--Tanısalı paper explicitly discusses the phenomenon
that a morphism itself may fail a stronger Abelian-power-free property while
its fixed point satisfies it, and cites the Rao--Rosenfeld \(h_6\) example as
part of that line of inquiry.

This strengthens, but does not complete, the novelty audit.


## 6. Other required background clusters

Before submission the bibliography must cover at least:

1. Keränen's four-letter Abelian-square-free construction.
2. Dekking and Carpi on Abelian power-free morphisms.
3. Currie–Rampersad template decidability.
4. Rao 2015 for broader Abelian / k-Abelian context, with the correction note.
5. Rao–Rosenfeld 2018 for \(h_6\), \(g_3\), the kernel criterion and period \(>5\).
6. Fici–Puzynina survey for field-level context and open-problem framing.
7. modern additive-square / group-repetition work relevant to the affine \(\mathbb Z^2\) interpretation.
8. Eyidoğan–Göral–Tanısalı 2026 for the newest template-sieve development.
9. computational / exact search literature only where it supports methodology rather than novelty claims.

## 7. What the current literature sweep did NOT find

A targeted 2024–2026 web sweep did not reveal a paper that clearly:

- solves Mäkelä's original ternary period-\(\ge2\) Abelian-square question;
- gives the project's exact six-role length-40 affine lift;
- gives the exact BC/AF module factorization currently used in the search.

This is **not an exhaustive novelty proof**.

Allowed wording:
> “No such result was found in the sources and searches checked.”

Forbidden wording:
> “No one has done this before.”

## 8. Novelty classification by component

| Component | Current classification |
|---|---|
| \(h_6^\omega(a)\) macro core | KNOWN |
| \(g_3\) and period \(>5\) construction | KNOWN |
| template / parent / ancestor method | KNOWN |
| outer morphism kernel condition | KNOWN |
| 2026 parent sieve idea | KNOWN |
| rank-one incidence lift \(M'=sM+u1^T\) | ELEMENTARY; avoid “affine morphism” terminology |
| fixed-length boundary correction equation | CLOSE TO STANDARD TEMPLATE FORM; project derivation exact, novelty unresolved |
| bare finite contact graph periodicity obstruction | STANDARD / ELEMENTARY |
| exact length-40 six-role synthesis on the restricted \(h_6\) language | POSSIBLY PROJECT-SPECIFIC; novelty unresolved |
| AF/AFD/ABCF and swap-component search | PROJECT-SPECIFIC COMPUTATIONAL ARCHITECTURE; novelty unresolved |
| successful six-block certified coding | NOT YET FOUND |
| solution of Mäkelä's problem | NOT ACHIEVED |

## 9. What is still needed for a submission-ready literature review

### LIT-1 — normalize the old coverage ledger

Update `LITERATURE_COVERAGE.md` so it no longer says Currie–Rampersad full text is unverified.

### LIT-2 — primary-source audit of the newest sieve paper — SUBSTANTIALLY COMPLETE

Section 3, including the definitions, improved inverse-parent lemma and the
load-bearing sieve example, has now been audited from arXiv v2. Before submission,
the final citation pass should still check the exact theorem dependencies used by
any Gate-T adaptation.

### LIT-3 — citation-forward / citation-backward search around Rao–Rosenfeld 2018 — PARTIALLY COMPLETE

Targeted web/citation searches have now checked the main post-2018 terms and
located relevant 2024–2026 Abelian-power/template work without finding a
claimed solution of Mäkelä's original problem.

Still required before submission:
- a database-quality forward-citation export (MathSciNet / zbMATH / Scopus /
  Web of Science or equivalent);
- manual inspection of every citation whose title/abstract is plausibly about
  ternary Abelian squares, \(g_3\), \(h_6\), or outer morphisms.

### LIT-4 — search the exact structural vocabulary

Search combinations equivalent to:
- constant-length block coding + Abelian squares;
- boundary Parikh correction;
- affine template;
- fixed morphic core + outer coding;
- kernel-preserving incidence perturbation;
- seam compatibility / block assembly.

### LIT-5 — final novelty table

For every theorem/lemma in the eventual manuscript, attach:
- closest prior result;
- exact source location;
- difference;
- claim status: KNOWN / ELEMENTARY / POSSIBLY NEW / NOVELTY UNRESOLVED.

## 10. Current overall assessment

Research literature readiness:
\[
\boxed{9/10}
\]

Manuscript novelty readiness:
\[
\boxed{7.5/10}
\]

The gap is not ignorance of the central literature. The gap is the stronger standard required before saying that the length-40 synthesis or module decomposition is new.

The literature review is therefore:
- **done enough to proceed with research:** YES;
- **documented:** YES, now consolidated here;
- **submission-ready:** NO;
- **safe for novelty claims:** NO, novelty remains NOT_ESTABLISHED.
