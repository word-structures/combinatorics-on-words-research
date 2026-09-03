# Primary-literature novelty audit — six-domain / 34 / 19 classification

**Date:** 2026-08-29 · sandbox · no promotion.
**Verdict up front: `NOVELTY_UNRESOLVED` stands. I could not clear Carpi 1993.**

---

## 1. What was searched, and how

The target theorem was translated into eight independent formulations before
searching, so as not to search only Paper-4 vocabulary:

1. equally spaced cutpoints in a constant-length substitution ⇒ carry-pair
   classification;
2. unresolved-role prefix support of a Parikh second difference;
3. role-occurrence mask / coloured cutpoint motif classification;
4. finite complete catalogue of coefficient supports under one unresolved block
   role;
5. the six domains `Z_s, P_t, M_t, Z, P, M`;
6. the exact `34 → 19` quotient;
7. the exact family cardinalities;
8. occurrence-support classification under partial morphism assignment.

Sources were **fetched**, not taken from search snippets, wherever the full text
was reachable. This matters: search-summary layers in this project have twice
returned factually wrong statements that had to be corrected against extracted
primary text.

## 2. Findings against the named targets

### 2.1 Eyidoğan–Göral–Tanısalı 2026 — **NO MATCH** (highest prior risk, cleared)

`arXiv:2605.20504v2`, *Box Progressions, Abelian Power-Free Morphisms and A
Sieve Technique for the Template Method* (submitted 19 May 2026, revised 27 Jul
2026). Fetched. The paper develops box-progression conditions and a sieve that
reduces the number of parent templates to examine.

On the specific questions: it does **not** classify coefficient supports or
support families; does **not** use Euclidean-division carries `K = qL + r`,
carry bits, or a case classification of cutpoint positions across constant-length
blocks; and contains **no** finite catalogue of support patterns.

This was the flagged terminology-collision risk (their use of arithmetic
progressions in prefix data). The collision is **terminological, not
mathematical**.

### 2.2 Currie–Rampersad 2012 — **ADJACENT ONLY**

`arXiv:1106.1842`, *Fixed points avoiding Abelian k-powers*. Fetched full PDF.
They give a general decidability framework via `k`-templates and ancestors —
**a single decision procedure, not an enumeration of coefficient pattern
classes**. Explicitly: no case-splitting by where cutpoints fall relative to
morphism block boundaries, no `K = qL + r` carries, and no finite catalogue of
admissible support types.

Relation: they supply the *ambient machinery* (Parikh templates, boundary
corrections, parent reduction) that Paper 4 already disclaims as prior art. The
support **classification** is not there.

### 2.3 Carpi 1993 — **UNRESOLVED, and this is the blocker**

*On Abelian Power-Free Morphisms*, IJAC 3(2) (1993), 151–168. The paper is
paywalled (World Scientific) and I could not obtain the full text. I attempted
to recover the exact conditions through the 2026 restatement; **the PDF text
extraction failed** on precisely the section restating Carpi's C1–C3.

What is established from secondary but consistent sources: Carpi's criterion
uses prefix Parikh vectors and the second difference
`ψ(x_{j+1}) − 2ψ(x_j) + ψ(x_{j−1})`, and is a characterisation for alphabets of
size ≥ 6. Paper 4 already disclaims novelty for that algebra.

**The open question is narrower and sharper.** Earlier project material reports
that Carpi's condition (C3) carries an integer parameter `δ_j ∈ {0,1}`. Paper 4
has a carry curvature `δ = c₁ − c₀ ∈ {−1,0,+1}`. These are close enough in form
that they may be the same parameter under a different normalisation. **Until
Carpi 1993 is read directly, the possibility that Paper 4's `δ` is Carpi's `δ_j`
cannot be excluded.**

Note what this would and would not do. Even if `δ` is Carpi's parameter, that
would affect §7 of the manuscript (the curvature law), **not** the `34 → 19`
support-family quotient, for which nothing resembling an equivalent was found
anywhere. The realistic downside is a narrowing of the claim, not its collapse.

### 2.4 Rao–Rosenfeld 2018 — **ADJACENT ONLY** (ancestry, not the theorem)

Supplies the six-letter core `h₆`, the projection `g₃`, and the long-period
decision framework Paper 4 builds on. Paper 4 already positions itself as
building on this rather than replacing it. No support classification.

### 2.5 Keränen — **ADJACENT ONLY**

The ICALP 1992 four-letter result is cited for the avoidability background. The
staged-prefix-algorithm material (2002/2003/2010) could not be verified to a
primary source, which is why v0.33 **removed** the corresponding bullet rather
than cite it loosely. That removal was correct and should stand.

### 2.6 Broader sweeps — **NO MATCH**

Searches across mechanical/Sturmian/Christoffel and rational-rotation language,
Parikh/counter automata, semilinear and Presburger formulations, and
partial-word constraint compilation produced **no** source classifying the
possible coefficient supports of Abelian-repetition constraints under a
partially assigned uniform morphism. The nearest hits (`Parikh-collinear fixed
points`, `abelian periodicity of purely morphic words`, `avoiding abelian
powers cyclically`) concern complexity or periodicity of morphic words, not
support classification.

## 3. Assessment

| formulation | closest prior art | relation |
|---|---|---|
| second-difference prefix algebra | Carpi 1993 | **EXACT MATCH — already disclaimed** |
| boundary/bulk Parikh split | Currie–Rampersad 2012 | **SAME ALGEBRA, DIFFERENT THEOREM** |
| AP structure in prefix data | Eyidoğan et al. 2026 | **ADJACENT ONLY** (terminology) |
| carries of a rational rotation | mechanical-word literature | **KNOWN, already disclaimed** |
| carry curvature `δ ∈ {−1,0,+1}` | Carpi 1993 (C3, `δ_j ∈ {0,1}`) | **UNRESOLVED — cannot exclude** |
| six carry domains | — | **NO MATCH FOUND** |
| 34 realizable role/domain patterns | — | **NO MATCH FOUND** |
| `34 → 19` quotient | — | **NO MATCH FOUND** |
| the nineteen closed cardinalities | — | **NO MATCH FOUND** |
| first-hit/frontier/DAG machinery | generic CSP & automata | **KNOWN — already disclaimed in v0.33 §16** |

## 4. Conclusion and the narrowest defensible claim

No equivalent of the six-domain / 34-pattern / 19-family classification was
located. Two of the three highest-risk sources were fetched and cleared
directly. **One was not:** Carpi 1993 remains unread, and with it the `δ`
question.

The narrowest defensible framing, which does **not** depend on resolving Carpi:

> Not the second-difference algebra, not boundary corrections, not template
> sieving, not mechanical-word carries, and not first-hit/frontier machinery.
> The candidate contribution is the **exact classification of the reduced
> support skeleton of an Abelian-square constraint system under a partial
> uniform block assignment** — six carry domains, 34 realizable role/domain
> patterns, exactly 19 complete support families for `L ≥ 5`, with closed
> cardinalities — together with its use as a compiler in a staged synthesis.

**Status: `NOVELTY_UNRESOLVED`.** The single blocking action is to read Carpi
1993 pp. 151–168 directly and compare its condition (C3) parameter with the
carry curvature of §7. This is a library task, not a research task, and it is
the highest-value next step for the paper.

## 5. Honest limits of this audit

- I could not obtain Carpi 1993. Any statement here about its contents is
  second-hand and is labelled as such.
- The 2026 paper's Carpi restatement did not extract from the PDF; my clearance
  of that paper rests on its abstract and body-level content, not on its
  restatement section.
- A negative literature search establishes only that no equivalent was found in
  the sources and terminology audited. It cannot prove absence — especially
  here, where an equivalent could be phrased in older template, ancestor,
  boundary-vector, or partial-word vocabulary.
- No claim in this audit should be used to upgrade novelty status.
