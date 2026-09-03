# Veikko Keränen — Intellectual Provenance Note for Papers 2–4

**Date:** 2026-08-27  
**Purpose:** preserve research provenance and separate direct suggestion, later project development, and independent theorem work.

## Source event

Veikko Keränen gave preliminary feedback on the article
*Abelian-square densities under bounded local avoidance: a non-monotone ternary family*.

His message contained two distinct kinds of input:

1. editorial/mathematical exposition feedback;
2. a new computational research suggestion based on length-40 aa2f/aa2fr blocks,
   sparse adjacency/contact structure, and joining blocks into longer words.

This note records how those ideas relate to the three later research lines.

---

## A. Cross-paper methodological influence

Veikko explicitly objected to overloaded notation \(h\), noting that \(h\) and \(g\)
are commonly used for morphisms in Combinatorics on Words.

He also asked that terms such as “primitive” be defined, that the bold
\(\mathbf 1\) be explained, and that graph objects be visualised.

These points should be treated as standing manuscript-design requirements:

- define field-specific concepts locally at first use;
- do not rely on readers guessing which meaning of “primitive” is intended;
- define \(\mathbf1\) explicitly as an all-ones vector when that is its meaning;
- add figures for contact/transition graphs;
- avoid using \(h\) for an unrelated scalar when morphisms \(h\) occur nearby.

### Current notation implication

Paper 4 genuinely uses the Rao–Rosenfeld morphism \(h_6\), which strongly validates
Veikko's original warning.

Paper 3 still uses \(h\) as a profile/half-length parameter in the working draft.
Before submission this should be changed.  Veikko suggested eta or xi, but those
symbols are now already structurally occupied in Paper 3 by \(\eta_v\) and
\(\Xi_v\).  A safer final choice is likely \(n\) for profile size / half-length
and \(\ell\) or \(r\) for bounded cutoffs elsewhere.

---

## B. Paper 2 — Continuation Capacity and Delayed Variance Response

### Veikko's direct conceptual seed

The most direct sentence is his question:

> How does the probability of obtaining a word free from almost abelian squares
> change as a function of the word length?

He also framed the construction in terms of many admissible length-40 chunks
whose longer concatenations survive only with small probability.

### Relation to Paper 2

Paper 2 asks how local avoidance changes the capacity of a state to continue and
how that delayed continuation geometry affects fluctuation response.

Its core quantity
\[
N_m=A^m\mathbf1
\]
is exactly a finite-state continuation-count object: from a current state, how
many length-\(m\) continuations remain admissible?

The paper's present theorem problem — local pattern geometry \(\to\) continuation
capacity \(\to\) delayed correlation \(\to\) variance-response sign — is a much more
spectral/probabilistic development than Veikko proposed explicitly.

### Attribution classification

- **Direct research motivation:** YES.
- **Direct theorem/formula supplied by Veikko:** NO, from this message alone.
- **Conceptual relationship:** MODERATE to STRONG.
- **Most relevant original idea:** survival/continuation probability as word length grows.

A manuscript acknowledgement should credit Veikko for suggesting the
length-dependent survival / continuation question.

---

## C. Paper 3 — Abelian Profile Geometry and Hard Fluctuation Response

### Veikko's direct conceptual seed

Veikko wrote that the corresponding

> adjacency (or contact) matrix would be huge (though sparse)

and separately requested that graph objects be visualised.

### Relation to Paper 3

Paper 3 later developed exact short-contact structures:

- shift-1 contact graph \(O_1\);
- shift-2 contact graph \(O_2\);
- exact degree bounds;
- contact-density formulae \(d_1(v)\) and \(d_2(v)\);
- combined short-contact graph;
- acyclicity / nilpotency for the frozen occurring profiles;
- a finite-depth hard-response certifier built from short contacts plus return tails.

This is not merely a large sparse adjacency matrix implementation.  The eventual
paper turns the vague contact-matrix idea into exact algebraic graph invariants and
uses them inside a fluctuation-response theorem architecture.

### Attribution classification

- **Direct research motivation:** YES.
- **Terminological/conceptual precursor (“contact matrix”):** STRONG.
- **Direct derivation of the shift-1/shift-2 theorems:** NO.
- **Direct derivation of nilpotency or curvature identities:** NO.
- **Overall influence:** STRONG conceptual seed, followed by independent mathematical development.

A manuscript acknowledgement should explicitly mention Veikko's suggestion to
study sparse contact/adjacency structure of admissible blocks.

---

## D. Paper 4 — Block Assembly over a Morphic Core

### Veikko's direct research suggestion

This is the strongest lineage.

His proposal contained all of the following ingredients:

- length-40 aa2f / aa2fr chunks;
- huge numbers of such chunks;
- joining chunks in parallel;
- “Lego block” imagery;
- alignment around the halfway point;
- an explicit length-80 joined example;
- the observation that only a small fraction of longer assemblies remain
  Abelian-square-free;
- the suggestion to model the process computationally without biological
  complementarity.

### Relation to Paper 4

Paper 4 now uses:

- six prescribed ternary block roles of length 40;
- exact seam and macro-factor compatibility;
- sparse block/contact constraints;
- local assembly of blocks along an infinite nonperiodic morphic core;
- exact bigram/trigram finite gates for periods \(2,\ldots,40\);
- component-based search over admissible length-40 blocks;
- a separate long-period template certificate.

The biological Watson–Crick / CRISPR mechanism was not retained.  What survived
was the mathematical abstraction:

\[
\boxed{\text{many length-40 admissible blocks + compatibility + long assembly}.}
\]

That abstraction is now the central computational architecture of Paper 4.

### Attribution classification

- **Direct research-topic suggestion:** YES, VERY STRONG.
- **Direct ancestor of the block-assembly idea:** YES.
- **Specific Rao–Rosenfeld affine lift:** later project development.
- **Exact period-\(2,\ldots,40\) trigram reduction:** later project development.
- **AFD/ABCF gate architecture and swap-component closure:** later project development.
- **Long-period parent/template certificate:** based on prior literature plus later project synthesis.

A Paper 4 acknowledgement should credit Veikko by name for proposing the
length-40 block-assembly/contact-matrix research direction that motivated this line.

---

## E. Suggested acknowledgement wording

### Paper 2

> We thank Veikko Keränen for discussions that suggested studying how the
> survival probability and continuation capacity of locally Abelian-square-free
> words changes with word length, and for detailed comments on notation and
> exposition.

### Paper 3

> We thank Veikko Keränen for suggesting the sparse contact/adjacency structure
> of length-40 Abelian-square-free blocks as an object of study.  This suggestion
> helped motivate the contact-graph viewpoint developed here.

### Paper 4

> We are especially grateful to Veikko Keränen for proposing a computational
> “block assembly” viewpoint based on length-40 aa2f/aa2fr words and sparse
> compatibility between blocks.  That suggestion was a direct motivation for
> the block-assembly research program developed in this paper.

The final wording should be shown to Veikko before submission if it attributes a
specific idea to him.

---

## F. Authorship boundary

From this single message alone, the strongest justified classification is
**acknowledged intellectual contribution / research suggestion**, not automatic
coauthorship.

Coauthorship would become appropriate if Veikko also makes a substantial
contribution to one or more of:

- theorem formulation or proof;
- construction of the final morphism/coding;
- essential computational method;
- interpretation of results;
- substantial manuscript writing or revision;
- responsibility for the final scientific claims.

If the eventual Paper 4 result solves Mäkelä's problem, the provenance of the
length-40 block-assembly idea should be discussed with Veikko explicitly before
submission, because his initial suggestion is unusually close to the eventual
research architecture.

---

## G. Bottom line

The three-paper genealogy is best summarised as:

\[
\boxed{
\begin{array}{rcl}
\text{Veikko: probability vs. length}
&\longrightarrow&
\text{Paper 2: continuation capacity / delayed response},\\[2mm]
\text{Veikko: sparse contact matrix}
&\longrightarrow&
\text{Paper 3: exact contact geometry / nilpotency},\\[2mm]
\text{Veikko: length-40 Lego block assembly}
&\longrightarrow&
\text{Paper 4: exact length-40 block-assembly program}.
\end{array}}
\]

The strongest direct intellectual lineage is Paper 4.
