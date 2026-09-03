# Paper 4 — Literature and Novelty Audit

**Version 0.7 — 2026-08-27**  
**Status:** research-grade literature map; novelty remains `NOT_ESTABLISHED` until database-quality citation audit.

## Executive update

The latest audit materially narrows the novelty boundary around the component
search and exact-negative certificate architecture.

Three relevant prior-art clusters must now be cited explicitly:

1. **Transposition graphs** — Chase (1973) already defines the ambient graph
   on fixed-multiplicity words, with edges given by transposition of two
   different symbols.
2. **Unfavourable-factor exhaustive search** — Keränen (2007/2010) already
   uses complete extension trees to certify that an Abelian-square-free factor
   cannot be extended beyond a finite threshold.
3. **Word connected-component/reconfiguration structures** — Grytczuk &
   Stankiewicz (2020) study connected components of word graphs under square
   reduction/duplication, a different move but clear graph-structural prior art.

Therefore Paper 4 should **not** claim invention of:
- transposition graphs;
- the general idea of connected-component analysis on words;
- exhaustive finite negative certificates in pattern avoidance.

The potentially project-specific contribution is narrower:
\[
\boxed{
\text{the induced clean-role component}
+
\text{AF/AFD/ABCF/full-D gate composition}
+
\text{a sound component-exclusion certificate}
}
\]
inside the fixed \(h_6\) block-synthesis problem.

---

## 1. Open-problem status

### Mäkelä's conjecture

Fici & Puzynina, *Abelian combinatorics on words: a survey*,
Computer Science Review 47 (2023), Article 100532,
DOI 10.1016/j.cosrev.2022.100532, states as Conjecture 20:

> There exists an infinite ternary word whose Abelian squares are only
> \(00,11,22\).

The survey states that the conjecture is still unproved.

Rao & Rosenfeld, *Avoiding Two Consecutive Blocks of Same Size and Same Sum
over \(\mathbb Z^2\)*, SIAM J. Discrete Math. 32(4) (2018), 2381–2397,
DOI 10.1137/17M1149377, explicitly describe their result as a **weak
version** of Mäkelä's question.

A targeted 2024–2026 search on 2026-08-27 for the exact conjecture wording,
ternary Abelian squares, Mäkelä + Abelian, and "only 00,11,22" did not find a
later paper claiming a solution.

**Safe wording:** `NO SOLUTION FOUND IN SOURCES SEARCHED`.

**Unsafe wording:** "the problem is definitely still open" without the final
database-quality citation-forward audit.

---

## 2. Classical morphism / template prior art

### Carpi 1993

Arturo Carpi, *On Abelian Power-Free Morphisms*,
International Journal of Algebra and Computation 3(2) (1993), 151–168.

Paper-4 use:
- universal morphism-preservation background;
- commutative-bijectivity / linear-independence barrier;
- explanation why a fixed special source language is necessary in a
  six-to-three setting.

Classification:
`KNOWN`.

### Currie–Rampersad 2012

James D. Currie & Narad Rampersad,
*Fixed points avoiding Abelian k-powers*,
JCTA 119(5) (2012), 942–948,
DOI 10.1016/j.jcta.2012.01.006.

Paper-4 use:
- template;
- parent;
- ancestor;
- finite decidability of fixed-point avoidance under matrix hypotheses.

Important:
Narad Rampersad's publication page links an errata for this paper.
Any numerical bound copied from the paper must be checked against the errata.

Classification:
`KNOWN`.

### Rao–Rosenfeld 2018

Michaël Rao & Matthieu Rosenfeld,
*Avoiding Two Consecutive Blocks of Same Size and Same Sum over \(\mathbb Z^2\)*,
SIAM J. Discrete Math. 32(4) (2018), 2381–2397.

Paper-4 use:
- \(h_6\) morphic core;
- \(g_3\) ternary outer coding;
- period \(>5\) result;
- Proposition 9 / Proposition 10 / Theorem 3 outer-parent framework;
- regression target for Gate T.

Classification:
`KNOWN / CORE PRIOR ART`.

### Eyidoğan–Göral–Tanısalı 2026

Sadık Eyidoğan, Haydar Göral, Nihan Tanısalı,
*Box Progressions, Abelian Power-Free Morphisms and A Sieve Technique for the
Template Method*, arXiv:2605.20504 (2026); Mathematics of Computation, DOI 10.1090/mcom/4246.

Paper-4 relevance:
- modern template-parent sieve;
- quotient-group / arithmetic-progression pruning;
- examples where a fixed point has stronger Abelian-power avoidance than the
  morphism itself.

Classification:
`KNOWN`; potentially relevant to accelerating Gate T.

---

## 3. New closest prior art for the component-search layer

### 3.1 Chase 1973 — transposition graph

Phillip J. Chase, *Transposition Graphs*,
SIAM Journal on Computing 2(2) (1973), 128–133,
DOI 10.1137/0202011.

Chase defines \(G(p_1,\ldots,p_k)\):
- vertices are all words/sequences with prescribed multiplicities
  \(p_1,\ldots,p_k\);
- two vertices are adjacent when one is obtained from the other by
  transposing two different symbols.

This is exactly the **ambient graph** underlying our A-role search for
\[
(p_a,p_b,p_c)=(15,14,11).
\]

Our \(G_A\) is therefore best described as:

> the induced subgraph of Chase's transposition graph
> \(G(15,14,11)\) on internally period-\(2,\ldots,20\)-clean ternary words.

### Consequence

Do not call the transposition graph itself new.

Potentially project-specific:
- the avoidance-induced subgraph for this role;
- its use inside the \(h_6\) block-synthesis problem;
- component-wise AF/AFD/ABCF exclusion certificates.

---

### 3.2 Keränen 2007/2010 — exhaustive unfavourable factors

Veikko Keränen,
*Combinatorics on Words — Suppression of Unfavorable Factors in Pattern
Avoidance*, The Mathematica Journal 11 (2010),
DOI 10.3888/tmj.11.3-4.

Keränen describes exhaustive computer-aided extension trees for
Abelian-square-free factors.

Core logic:
- extend an Abelian-square-free factor to the right and left in every possible
  way up to a chosen bound;
- if every branch dies before the bound, the factor is certainly
  **unfavourable**;
- if branches reach the bound, the factor is only "so-far-favourable".

The 2007 NKS presentation gives a dramatic example in which millions of
branches survive to large lengths and all collapse at the next level.

### Consequence

The general logical pattern
\[
\text{complete finite branch enumeration}
\Rightarrow
\text{exact negative conclusion}
\]
is established prior art in Abelian-square avoidance.

Paper 4's new claim, if any, must be more specific:
- fixed role-incidence block synthesis;
- component closure in a transposition graph;
- staged necessary gates AF/AFD/ABCF/full-D/E;
- independently checkable component certificate.

This prior art is especially important because Veikko also directly suggested
the modern length-40 block-assembly research direction.

---

### 3.3 Shur 2008 — extendable part of a factorial language

Arseny M. Shur,
*Comparing Complexity Functions of a Language and Its Extendable Part*,
RAIRO Theor. Inf. Appl. 42(3) (2008), 647–655,
DOI 10.1051/ita:2008021.

Shur defines right/left/two-sided **extendable parts** as words having
infinitely many corresponding extensions within the language.

### Consequence

Paper 4 should avoid using "extendable" as an informal synonym for
"survives the current finite gate" without qualification.

Recommended terminology:
- `AFD-survivor`;
- `ABCF-survivor`;
- `component survivor`;
- `finite-gate survivor`.

Reserve "extendable" for the established infinite-extension notion or define
the local meaning explicitly.

---

### 3.4 Grytczuk–Stankiewicz 2020 — components of word graphs

Jarosław Grytczuk & Szymon Stankiewicz,
*Square-free reducts of words*, arXiv:2011.12822 (2020).

They define graph structures on finite words using square reduction and
duplication, and prove results about connected components / related words.

The move is **not** our transposition move and the problem is not Abelian
block synthesis.

### Consequence

This is graph-structural analogy, not direct anticipation.

Classification:
`ADJACENT PRIOR ART`.

---

## 4. Keränen's substitution work as computational precedent

Veikko Keränen,
*A powerful abelian square-free substitution over 4 letters*,
Theoretical Computer Science 410 (2009), 3893–3900,
DOI 10.1016/j.tcs.2009.05.027.

The paper reports extensive computational discovery of many new
Abelian-square-free endomorphisms and a substitution with multiple images per
letter.

Relevant lessons for Paper 4:
- computational discovery of image-word systems is established practice;
- multiple image choices / substitutions are established;
- large exact computational campaigns are accepted when the mathematical
  certificate is clear.

This strengthens the need to present Paper 4 not as "we searched a lot" but as
a theorem-backed certificate pipeline.

---

## 5. Current novelty classification

| Paper-4 object | Current classification |
|---|---|
| transposition graph | KNOWN — Chase 1973 |
| induced clean A-role subgraph | SPECIALIZATION; novelty unresolved |
| graph connected-component analysis on words | KNOWN in other move systems |
| exhaustive exact negative branch search | KNOWN methodology — Keränen |
| "extendable part" terminology | KNOWN — Shur |
| \(h_6\) core | KNOWN — Rao–Rosenfeld |
| \(g_3\), period \(>5\) | KNOWN — Rao–Rosenfeld |
| template / parent / ancestor | KNOWN |
| modern parent sieve | KNOWN — 2026 |
| rank-one incidence lift | ELEMENTARY |
| length-40 six-role design | PROJECT-SPECIFIC; novelty unresolved |
| 22-trigram \(K\le40\) specialization | PROJECT DERIVATION; novelty unresolved |
| AF/AFD/ABCF/full-D factorization | PROJECT-SPECIFIC; novelty unresolved |
| component-exclusion theorem for this gated synthesis | POSSIBLY NEW COMPOSITION; novelty unresolved |
| h6-specific \(Q\)-coordinate Gate-T reduction | POSSIBLY NEW SPECIALIZATION; novelty unresolved |
| positive Mäkelä construction | NOT ACHIEVED |

---

## 6. Strongest candidate contributions after this audit

The paper should not sell individual familiar ingredients as novelty.

The strongest potentially original package is:

\[
\boxed{
\begin{array}{c}
\text{Rao--Rosenfeld fixed }h_6\text{ core}\\
+\text{ prescribed length-40 ternary role incidence}\\
+\text{ exact finite seam/trigram reduction}\\
+\text{ staged AF/AFD/ABCF/full-D synthesis}\\
+\text{ component-wise exact certificates}\\
+\text{ executable long-period outer-parent certificate}.
\end{array}
}
\]

Novelty of the **composition and specialization** remains to be independently
audited.

---

## 7. 2024–2026 forward-search result

Targeted searches performed on 2026-08-27 included:
- `"Mäkelä" ternary abelian squares`;
- exact phrase `"only Abelian squares are 00 11 22"`;
- infinite ternary word + Abelian squares + 2025/2026;
- `h6`, `g3`, outer morphism, template parent;
- block concatenation / contact graph;
- transposition / reconfiguration graph + word avoidance.

No 2024–2026 source was found that clearly claims:
- a positive solution of Mäkelä's original ternary conjecture;
- the exact six-role length-40 incidence construction;
- the exact AF/AFD/ABCF component pipeline;
- the present h6-specific Gate-T \(Q\)-coordinate reduction.

This is **search evidence only**, not a proof of novelty.

---


## 7A. Targeted novelty search after the soundness correction

A second targeted search was performed after replacing the historical
cyclic-BC gate by the exact actual-language ABCF gate.

Queries combined:
- transposition graph + pattern avoidance;
- transposition graph + square-free / Abelian-square-free words;
- Abelian-square block morphism + compatibility graph;
- template method + component graph;
- generalized eigenspace / kernel / Smith decomposition + Abelian template
  parents.

### Result

The closest sources remain:

1. **Chase 1973** for the ambient fixed-content transposition graph;
2. **Keränen 2010** for exhaustive exact negative extension search;
3. **Currie--Rampersad / Rao--Rosenfeld** for template-parent/ancestor
   decidability and outer morphisms;
4. **Eyidoğan--Göral--Tanısalı 2026** for modern parent sieving.

No source found in this targeted search combines:

\[
\text{an induced avoidance subgraph of a fixed-content transposition graph}
\]
with
\[
\text{role-specific block compatibility gates}
\]
and
\[
\text{a fixed morphic-core outer-coding certificate}.
\]

Likewise, no searched source was found that uses the specific integer
coordinate system

\[
QM_{h_6}^2=0
\]

with exact bounded \(Q\)-coordinates to specialize the Rao--Rosenfeld
outer-parent enumeration.

### Safe novelty language

Allowed:

> “We use an induced subgraph of Chase's transposition graph and combine
> exhaustive component closure with role-specific compatibility gates in the
> fixed \(h_6\) outer-coding problem.  We have not found this exact
> composition in the sources checked.”

Not yet allowed:

> “We introduce the first component-certificate method for pattern avoidance.”

or

> “Our \(Q\)-coordinate Gate-T reduction is new.”

Both remain

\[
\boxed{\texttt{NOVELTY\_UNRESOLVED}}.
\]

## 7B. Soundness correction as a literature-facing lesson

The historical cyclic-BC bug illustrates a point that should be explicit in
the computational-method section:

> a stronger local avoidance predicate is not automatically sound as a
> pruning predicate in a restricted morphic language.

If the macro factor is absent from
\(\operatorname{Fact}(h_6^\omega(a))\), requiring its image to be clean can
remove a valid coding.

Therefore every gate in the final paper must be traceable to one of:

1. an actual \(h_6\) bigram/trigram;
2. a mathematically proved implication from actual factors.

This traceability rule should be part of the published certificate format.


## 8. Remaining literature tasks before submission

### LIT-F1 — database-quality citing-paper export

Required:
- Rao–Rosenfeld 2018 cited-by list;
- Carpi 1993 cited-by list;
- Currie–Rampersad 2012 cited-by list;
- Keränen 2010 cited-by list.

Preferred sources:
MathSciNet, zbMATH Open, Scopus, Web of Science, Dimensions, or equivalent.

### LIT-F2 — inspect every plausible title/abstract

Search terms:
- ternary Abelian square;
- Mäkelä;
- outer morphism;
- fixed point stronger than morphism;
- block morphism / block substitution;
- transposition graph;
- reconfiguration graph;
- unfavourable/unfavorable factor;
- extendable part;
- template sieve.

### LIT-F3 — theorem-level Carpi locator

Before submission, identify the exact Carpi theorem/proposition and wording
supporting the commutative-bijectivity necessity for source alphabet size
at least six.

### LIT-F4 — component theorem novelty

Specifically ask whether the following exact composition appears elsewhere:

> an induced fixed-Parikh transposition component of pattern-avoiding words,
> exhaustively coupled to multiple role-specific compatibility gates to produce
> a certificate excluding all morphic block codings whose designated image lies
> in the component.

Current audit result:
`NOT FOUND IN SOURCES CHECKED`.

---

## 9. Literature readiness score

Research guidance:
\[
\boxed{9.4/10}
\]

Submission-level novelty readiness:
\[
\boxed{8.0/10}
\]

The remaining gap is mainly database coverage and specialist confirmation,
not lack of known foundational sources.


## 10. Freshness audit — 2026-08-27

A fresh targeted web/database sweep was performed after the 279-F component
result.

### Mäkelä status

The strongest primary/survey anchors remain:

- Rao--Rosenfeld (2018), who explicitly describe their result as a **weak
  version** of Mäkelä's question and prove avoidance only for period \(>5\);
- Fici--Puzynina (2023), Conjecture 20, which states that the ternary
  \(00,11,22\)-only conjecture is still unproved.

Targeted 2024--2026 searches for:
- Mäkelä + ternary + Abelian square;
- the exact `00,11,22` formulation;
- infinite ternary words avoiding nontrivial Abelian squares;

did not locate a later source claiming a solution.

Safe status:

\[
\boxed{\texttt{NO SOLUTION FOUND IN SOURCES SEARCHED AS OF 2026-08-27}}
\]

This remains a literature-search statement, not an exhaustive proof of
openness.

### Eyidoğan--Göral--Tanısalı 2026

The paper

> *Box Progressions, Abelian Power-Free Morphisms and A Sieve Technique for the
> Template Method*

now has Mathematics of Computation DOI

\[
\boxed{\texttt{10.1090/mcom/4246}}.
\]

The AMS Mathematics of Computation listing contains the article.  Therefore
the manuscript should no longer describe it merely as "to appear / accepted
according to authors' public information".

Its direct overlap with Paper 4 is:
- templates, parents and ancestors;
- reducing parent sets by a sieve;
- fixed points that can avoid stronger Abelian powers than the morphism itself.

No source checked contains the exact Paper-4 fixed-content
transposition-component / fixed-F D-bridge synthesis.

### Currie--Mol--Rampersad--Shallit 2024

*Extending Dekking's Construction of an Infinite Binary Word Avoiding Abelian
4-Powers*, SIAM J. Discrete Math. 38(4) (2024), 2913--2925,
DOI 10.1137/23M1558513, gives an algorithm for deciding additive-power
avoidance in a class of morphic sequences.

This is relevant adjacent prior art for the broad "finite algorithmic
certificate for a morphic sequence" theme, but it is not a ternary
Mäkelä construction and does not anticipate the present fixed-content
F-component/D-bridge search.

Classification:
`ADJACENT PRIOR ART`.

### Filimonova--Puzynina 2026

*On abelian periodicity of purely morphic words*, arXiv:2605.30306, studies
algorithmic characterization of Abelian periodicity for purely morphic words,
especially binary morphisms.

This is conceptually relevant to spectral/periodicity discussions but does not
address avoidance of all nontrivial ternary Abelian squares and does not
contain the Paper-4 block-synthesis architecture.

Classification:
`ADJACENT / NOT DIRECT ANTICIPATION`.

## 11. Current literature verdict

No checked source anticipates the exact combined object

\[
\boxed{
\text{fixed }h_6\text{ factor language}
+
\text{length-40 role incidence}
+
\text{fixed-content transposition components}
+
\text{global fixed-F D-bridge exclusion}
+
\text{Rao--Rosenfeld long-period certificate}.
}
\]

The correct novelty status is nevertheless still

\[
\boxed{\texttt{NOVELTY\_UNRESOLVED}}.
\]

Before submission, a specialist citation-forward audit in MathSciNet / zbMATH
Open / Scopus / Web of Science (as available) is still recommended.
