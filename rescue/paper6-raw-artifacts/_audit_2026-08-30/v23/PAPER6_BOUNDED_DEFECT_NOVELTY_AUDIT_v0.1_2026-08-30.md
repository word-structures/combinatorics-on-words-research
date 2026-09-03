# PAPER 6 — BOUNDED-DEFECT NOVELTY AUDIT v0.1
**Date:** 2026-08-30  
**Status:** literature boundary audit; not a manuscript claim

## Executive verdict

The newly formalized bounded-defect theorem is mathematically useful, but its
core decomposition is **close to established Abelian-template machinery**.

Do not claim:

> “we discovered for the first time that a long Abelian repetition decomposes
> into a linear bulk term plus bounded prefix/suffix corrections.”

That mechanism is present in the Carpi / Currie–Rampersad / Rao–Rosenfeld
line of work.

The stronger Paper-6 novelty candidate remains:

> use the finite defect-template layer for **selected block languages**, and
> combine it with exact weighted continuation counting, survival entropy,
> profile pushforward, and minimal/black-box future dynamics.

---

# 1. Carpi (1993)

Arturo Carpi, *On Abelian Power-Free Morphisms*, IJAC 3(2), 151–168 (1993),
gave effective conditions for morphisms to preserve Abelian power-freeness.

Later expositions of Carpi's criterion explicitly use second differences of
Parikh vectors of image prefixes.

This is conceptually very close to the Paper-6 boundary correction.

Novelty implication:

- prefix/suffix Parikh corrections across uniform images are classical;
- Paper 6 should cite this lineage rather than present the mechanism as
  unprecedented.

---

# 2. Currie–Rampersad templates

J. D. Currie and N. Rampersad,
*Fixed points avoiding abelian k-powers*,
JCTA 119 (2012), 942–948.

Their template framework records Parikh differences between adjacent factor
pieces.

Rao–Rosenfeld explicitly credit Currie–Rampersad with introducing the
k-template notion.

This is directly relevant because Paper 6's bounded defect is a controlled
nonzero Parikh difference between adjacent equal-length block runs.

---

# 3. Rao–Rosenfeld (2018)

Michaël Rao and Matthieu Rosenfeld,
*Avoiding Two Consecutive Blocks of Same Size and Same Sum over Z^2*,
SIAM J. Discrete Math. 32 (2018), 2381–2397.

Their template parent relation has the form

\[
d_i
=
M_h d_i'
+
\Psi(s_{i+1}p_{i+2})
-
\Psi(s_i p_{i+1}),
\]

i.e.

\[
\text{new difference}
=
\text{linear image of old/bulk difference}
+
\text{boundary prefix/suffix correction}.
\]

That is the closest literature match found so far to the BD1 mechanism.

They also extend the method to additive powers and long Abelian powers.

Therefore the **structural idea of bounded boundary corrections under a
morphism is classical**.

---

# 4. What the present theorem adds as a project tool

The current Paper-6 theorem makes several things explicit for the selected
equal-length block setting:

1. the source language is an arbitrary selected block assembly language, not
   necessarily a fixed point of a morphism;
2. the two bulk objects are the adjacent \(q\)-block profile runs around the
   midpoint block boundary;
3. the defect has the explicit sharp universal bound
   \[
   \|E\|_\infty\le2L-2;
   \]
4. for ternary blocks, the universal defect alphabet has the closed-form size
   \[
   1+3R(R+1);
   \]
5. the decomposition is integrated with the Paper-6 weighted transfer and
   survival-entropy program.

Items 1–5 are useful and may form a new combination, but the literature audit
performed so far is **not enough to claim that each item is individually new**.

---

# 5. Strongest defensible novelty target now

The most defensible Paper-6 target is no longer the bounded-defect identity
alone.

It is the following synthesis.

## Selected-library defect-template survival system

Input:

- an arbitrary finite/regular selected equal-length block language;
- Abelian character safety.

Structural reduction:

\[
\text{character repetition}
\to
\text{finite decorated defect templates on block-profile runs}.
\]

Counting layer:

\[
\text{decorated templates}
\to
\text{weighted future operators}.
\]

Asymptotic layer:

\[
\text{future operators}
\to
\text{relative survival entropy / exact recurrence}.
\]

Compression layer:

\[
\text{literal histories}
\to
\text{profile semantics}
\to
\text{minimal Krylov/Hankel dynamics}.
\]

The literature found so far treats template decidability and morphic
avoidability, but does not by itself supply this selected-library
survival-counting program.

That is where Paper 6 should concentrate its novelty claims.

---

# 6. Recommended manuscript language

Safe wording:

> We use a block-level specialization of the classical Abelian-template
> principle to separate a long Parikh difference into an aggregate block
> component and a bounded boundary correction. In the equal-length selected
> library setting the correction admits the explicit uniform bound
> \(2L-2\). We then use this finite defect layer as the interface to a weighted
> continuation-counting problem.

Avoid wording such as:

> We introduce the first bounded-boundary decomposition for Abelian powers.

That would currently be unsupported.

---

# 7. Novelty grade after this audit

- Bulk + boundary idea by itself: **C / classical in spirit**
- Explicit sharp selected-block specialization: **B candidate**
- Finite defect catalogue as Paper-6 interface: **B+/A- candidate**
- Integration with selected-library survival entropy and exact future-count
  semantics: **A-range research candidate**, still requiring a broader
  literature audit
- Direct scalable solver built from that interface: **highest-value open
  contribution**

## Verdict

This audit **strengthens** Paper 6 by removing a likely overclaim early.

The project should build on template theory rather than compete with it.
