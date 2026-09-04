# LITERATURE_COVERAGE.md — what the literature covers and what it does not

**Updated:** 2026-07-30
**Purpose:** prevent redoing the same computation, and make visible
**what has not been systematically studied** — that is often easier to
identify than a new result, and it is where the best research ideas come from.

> **This is a coverage map, not a claims ledger.** Every mathematical claim
> is in `MATH_CLAIMS.md`; this file only records **what has been read and
> what has not**.

## Reading Guide for Newcomers

If you are new to the field and want to understand the context of this project, read these papers in this order:

1. **Keränen (1992 / 2006)**: To understand the origin of abelian square avoidance on 4 letters and the concept of "unfavourable factors".
2. **Rao (2015)**: For the general context of abelian power avoidability.
3. **Rao & Rosenfeld (2015)**: The core source of this project. Read this to understand Mäkelä's conjecture and the construction of the $h_6$ and $g_3$ morphisms.
4. **Andrade & Mol (2024) / Currie et al. (2021)**: For the current state of additive squares and affine equivalence classes.

---

## 1. Two things that must be kept separate, and are constantly conflated

| Formulation | What it requires | May it be said |
|---|---|---|
| *"Checked in source X, not there"* | opening one source and searching it | **yes**, once the source has been opened and the search terms recorded |
| *"Not in the literature"* | an exhaustive search across the whole field | **never**, with this project's resources |

Checking four sources is not a literature search. It is checking four
sources. This table records **source-specific observations**, and the
summary column says at most *"not found in the sources checked"*.

**A second distinction that matters just as much:** the question is not
only *"has a sweep been done"* but **"which space has been swept"**. These
are different things: all words up to length N, all morphisms, all
uniform morphisms, all k-uniform morphisms, all alphabets, all local
configurations. The coverage column names the space, not just yes/no.

---

## 2. Sources opened

Only these have been opened and searched. Everything else is unopened.

| Source | Opened | How |
|---|---|---|
| Petrova & Shur, "Branching Densities of Cube-Free and Square-Free Words", Algorithms 14(4):126 (2021) | 2026-08-16 | PRIMARY FULL TEXT READ. Record only source-supported ordinary-power content: fixed vs branching positions; small/big period split; ternary square-free branching density >= 223/868; square-free large-period fixing density <= 2/h, attributed by PS2021 to PS2015 Lemma 5; small-period regular approximation + minimum-mean-cycle / Karp; large-period arguments depend on ordinary word-period rigidity. NO AA2F TRANSFER ESTABLISHED. |
| Fici & Puzynina, *Abelian Combinatorics on Words: a Survey*, arXiv:2207.09937 | 2026-07-28, 2026-07-30 | ar5iv + PDF, text extracted and searched |
| Rao & Rosenfeld, arXiv:1511.05875 (= SIAM 32(4), DOI `10.1137/17M1149377`) | 2026-07-28 | ar5iv; DOI verified against Crossref 2026-07-30 (row 23) |
| Cassaigne, Currie, Schaeffer & Shallit, arXiv:1106.5204 | 2026-07-30 | abstract + ar5iv full text |
| Lietard & Rosenfeld, DLT 2020, DOI `10.1007/978-3-030-48516-0_15` | 2026-07-30 | open preprint `lirmm.fr/~mrosenfeld/LieRos.pdf`, text extracted (row 63) |
| Andrade & Mol, arXiv:2408.15390 (2024) | 2026-07-30 | HTML full text |
| Lietard, *Évitabilité de puissances additives*, PhD thesis, Univ. de Lorraine 2020 | 2026-07-30 | PDF `docnum.univ-lorraine.fr`, text extracted, keyword search (row 65) |
| Keränen, *Suppression of Unfavourable Factors*, IMS 2006 | earlier | PDF (row 38) |
| ACR 2004, *The Number of Ternary Words Avoiding Abelian Cubes* | earlier | row 48 |
| Adamczewski, *Balances for fixed points of primitive substitutions*, Theoret. Comput. Sci. **307**(1):47–75 (2003), DOI `10.1016/S0304-3975(03)00092-6` | 2026-09-04 | PDF from the author's page, extracted with `pdftotext -layout`. Opened to settle a source-identity correction, not as prior art — see the note below |
| Rao & Rosenfeld, "Avoidability of long k-abelian repetitions", Math. Comput. 85(302):3051–3060 (2016), arXiv:1507.02581 | 2026-08-01 | PDF, text extracted with `pdftotext -layout` (not an AI summary), Theorem 2 and the h2 morphism quoted directly (row 84) — this is Fici & Puzynina Theorem 65's reference [124], the source of the ternary 2-abelian construction |
| Currie & Rampersad, *Fixed points avoiding Abelian k-powers*, JCTA 119(5):942–948 (2012), arXiv:1106.1842 | 2026-08-14 (abstract), **2026-09-04 (full text)** | PDF fetched from arXiv and extracted with `pdftotext -layout`, **not** an AI summary. Section 3 read directly. The 2026-08-14 abstract-only status stood for three weeks and is recorded below rather than overwritten |

**On Currie & Rampersad (added 2026-08-14) — evidence status is split, and the
two halves must not be merged.**

**(A) Bibliographic identity and attribution: VERIFIED.** The record above is
confirmed from the arXiv listing page, and the one-sentence abstract was read
verbatim: *"We show that the problem of whether the fixed point of a morphism
avoids Abelian k-powers is decidable under rather general conditions."* The
attribution of the **template method** to this paper is confirmed from a
*separate* primary source: the abstract of Eyidoğan, Göral & Tanısalı
(arXiv:2605.20504), read verbatim on the same date, states *"Combining
Dekking's result with the template method of Currie and Rampersad, we develop
a sieve technique…"*. This matters here because the project's Rao–Rosenfeld
Proposition 9/11 machinery (rows 30, 31, 45) sits downstream of that method.

**(B) Internal content of the paper: VERIFIED 2026-09-04.** This half was
`UNVERIFIED` from 2026-08-14 until 2026-09-04, on the grounds that the only
full-text read had been an AI-mediated extraction; that chronology is kept
here deliberately rather than rewritten. The PDF has now been fetched and
extracted with `pdftotext -layout`, and **section 3, "Ancestors and
k-templates", was read directly**. Confirmed in the source: the k-template
definition as a (2k)-tuple `[a_1,...,a_{k+1}, d_1,...,d_{k-1}]`; the parent
relation, quoted verbatim — *"We say that $t_2$ is a parent of $t_1$ if"* —
carrying the constraint `ψ(a_{i+1}a_{i+2}) - ψ(a_i a_{i+1}) + D_i M = d_i`;
**Lemma 3.3**, *"Given a k-template $t_1$, we may calculate all of its
parents"*; the inverse-matrix form `D_i = (d_i + ψ(a_i a_{i+1}) -
ψ(a_{i+1}a_{i+2})) M^{-1}`; and *"Let ancestor be the transitive closure of
the parent relation."* Remark 3.4 records that some k-templates have no
parents at all, which is an integrality test rather than an enumeration.

**Scope of what that verifies, stated precisely.** The paper's setting is a
**fixed, fully specified morphism**: Lemma 3.3's proof turns on the candidate
set being *"finite, and may be searched exhaustively"*. So:

- **KNOWN, and now sourced:** fixed morphism plus template / parent / ancestor
  machinery, including parent computation and the ancestor closure.
- **NOT established by this source:** feasibility for a **partially specified**
  target morphism, i.e. whether a parent witness is realizable by *some*
  profile-compatible completion. That question is not asked in this paper, and
  this entry does **not** claim the paper answers it.

**Consequence.** Currie & Rampersad and row 80's Parikh-difference condition
belong to the same broad linear/Parikh algebraic family. The direct source
audit that was pending is now done for section 3 only; the subsumption
question against `OPEN_RESEARCH_QUESTIONS.md` B22 remains open, and no novelty
conclusion in either direction is drawn here.

**Not opened:** Brown & Freedman, *"Arithmetic progressions in lacunary
sets"*, Rocky Mountain J. Math. 17(3):587–596, 1987 — **the citation is now
traced, the paper is not opened; it is the single most important unopened
source (row 65)**. Also: Rao & Rosenfeld, "Avoiding two consecutive blocks of
same size and same sum over 2", SIAM (Theorem 65's other reference, [125] —
**do not confuse with the Math. Comput. 2016 paper above; both are cited by
Theorem 65 but only the Math. Comput. one has been opened, row 84**).
Rosenfeld's PhD thesis (ENS Lyon 2017). **Rao TCS 601 (2015) is Rao SOLO — a
third, distinct paper (3-abelian squares under a finer equivalence) —
opening it does NOT satisfy row 84's citation; it remains genuinely
unopened.** Also unopened: Halbeisen & Hungerbühler (2000), Dekking (1979), Justin (1972),
Pirillo & Varricchio (1994).

**On Adamczewski (added 2026-09-04) — an identity correction, not prior art.**
The paper was opened to resolve a citation defect, and the record above is
taken from the article's own header, which prints the DOI
`10.1016/S0304-3975(03)00092-6` on page 1. Its subject is a *balance* measure:
the abstract states that for fixed points of primitive substitutions *"the
asymptotic behaviour of this measure is in part ruled by the spectrum"* of the
incidence matrix. Section 4 is titled **"Main results"**.

**Source-specific negative check.** A keyword census of the extracted full text
returns **zero** occurrences of `abelian`, `Parikh`, `square-free`, `avoid`,
`template`, `parent`, `ancestor`, `Minkowski` or `reachable`. The overlap that
the preserved 2026-08-29 Paper 5 novelty audit attributed to this author —
bounding *"the Abelian complexity of morphic words"* — **was not found in this
opened source**, and that audit additionally gave a title and a DOI that
resolve to nothing (`NEGATIVE_RESULTS.md` section 38).

**This entry does not make Adamczewski prior art for Paper 5.** The correct
citation was in fact already inside this repository: the Fici & Puzynina survey
extract at `scratch/fici_puzynina_2207.09937.txt` lists it correctly in its
bibliography and says only that *"The balance function of primitive morphic
words has been characterized by Adamczewski"*. Balance asymptotics are
conceptual background at most; nothing here bears on abelian-power avoidance
or on morphism synthesis.

### 2b. Material and visualization sources — NOT citable for claims

Kept deliberately separate from the table above. These are primary-source
*material* (data, images, constructions, exposition) from people working in
the field, not peer-reviewed statements. **No row in `MATH_CLAIMS.md` may
cite anything from here as its source.** Their use is orientation and
context: seeing what the objects look like, and what the field's own
practitioners consider worth displaying.

The separation exists because the failure mode is real and already logged
twice: §11 (a plausible claim with an author's name attached, traced to
nothing) and §19 (a genuine number given an interpretation that did not
survive a baseline comparison). Material that *looks* authoritative is
exactly what slips past.

| Source | What it is | Status |
|---|---|---|
| `algebra.fi/keranen/StructuresGraphicsMusic.html` | Veikko Keränen's own page: structures, graphics and music built from abelian-square-free words. Constructions and visualizations from the author of the 4-letter result (row 3) | **Material only.** Not opened systematically; nothing cited from it |

**Rule for adding here:** a link goes in this subsection, never the table
above, unless someone has opened a peer-reviewed document and recorded the
search terms — the same bar section 5 sets.

---


### 2c. Secondary / partially traced / inaccessible

| Source | Status |
|---|---|
| Currie & Shelton 2003 | bibliographically solid statement; proof text inaccessible |
| Currie 1995 | full text inaccessible |
| Shelton & Soni 1982 | current full-text route access-blocked |
| Carpi 1998 | abstract / statement only; four-letter result; no ternary aa2f transfer |


## 2d. Targeted primary-source audit queue (Profile-Response Mechanism)

**NOVELTY_STATUS = NOT_ESTABLISHED**
The broad methodology of computing asymptotic variance / sensitivity in Markov chains and shifts of finite type is known. The exact 15-case finite sign split for h=2...7 hard deletions has not yet been established as novel.

The following literature leads were identified during the profile-response research intake, but **have not yet been opened under this repository's strict verification standard**. They must be opened and audited before any novelty claim is made.

| Lead / Tradition | Topic / Relevance | Status |
|---|---|---|
| Bóna, Maga & Richey (2026) | One forbidden word / letter-frequency response | **AUDIT-QUEUE** |
| Guibas-Odlyzko | Correlation-polynomial tradition | **AUDIT-QUEUE** |
| Goulden-Jackson | Cluster method | **AUDIT-QUEUE** |
| Parry / Perron | Measure foundations | **AUDIT-QUEUE** |
| Cheriyath / Agarwal / Tikekar | Work on holes / escape / correlation | **AUDIT-QUEUE** |
| Chandgotia-Marcus-Richey-Wu | One-pattern SFT work | **AUDIT-QUEUE** |
| Markov / pressure / Poisson / Green-Kubo | Sensitivity literature | **AUDIT-QUEUE** |
| Drazin / group-inverse | Sensitivity and generalized inverses | **AUDIT-QUEUE** |
| Multivariate pattern correlation | Cumulant literature | **AUDIT-QUEUE** |

## 2e. Targeted primary-source audit queue (Paper 6 bounded-defect and counting line)

**NOVELTY_STATUS = UNDER_REVIEW**
Two standalone Paper 6 novelty claims were **withdrawn** on 2026-09-04: that the bounded
second-difference Parikh-obstacle hierarchy is novel merely by being formulated in bounded
form, and that the Parikh-composition dynamic-programming extension compiler is a novel
algorithm merely by being constructed. The preserved Paper 6 novelty audits report that
the bounded-defect decomposition -- linear bulk plus bounded prefix/suffix corrections --
sits inside an established Abelian-template line, and that counting repetition-avoiding
words and proving exponential growth are likewise established themes. **That overlap is
reported by those audits; it has not been verified from sources this project has opened**
(see the queue below).

**This is a withdrawal of two specific claims, not a verdict on Paper 6.** Broader Paper 6
novelty is *unassessed*, which is not the same as unfavourable, and the later v3.6
graded-transport theorem seed is **not adjudicated here** -- it labels itself
`NOVELTY UNASSESSED` and names its own next gate, a direct equivalence attack against
classical Abelian-template ancestor machinery. The mathematics is untouched: both audits
record the identities and derivations as correct. See `NEGATIVE_RESULTS.md` section 37.

**What this project has actually verified here, and what it has not.** It has read the
preserved audits and can report *their* conclusion. It has **not** opened the external
works those audits name. `AGENTS.md` rule 1 is triggered by writing an
author/year/journal/theorem-number citation into a file at all, not by how that citation
is afterwards labelled, so **the bibliographic details recorded inside those audits are
deliberately not reproduced here.** They remain an unverified literature queue and must be
fetched, opened and quoted before any canonical source claim is made from them.

The audits themselves are the citable object, on
`rescue/paper6-raw-artifacts-2026-09-03` (`79cd7b9`):

| Preserved artifact | What it records | Status |
|---|---|---|
| `rescue/paper6-raw-artifacts/checkpoint_v2.6/PAPER6_BOUNDED_DEFECT_NOVELTY_AUDIT_v0.1_2026-08-30.md` | that the bounded-defect decomposition is close enough to an established Abelian-template line that a first-discovery claim must not be made; names the works it relies on | **AUDIT-QUEUE** (works named inside remain unopened) |
| `rescue/paper6-raw-artifacts/checkpoint_v2.6/PAPER6_COUNTING_NOVELTY_UPDATE_v0.1_2026-08-30.md` | that counting repetition-avoiding words and proving exponential growth are established themes; names the works it relies on | **AUDIT-QUEUE** (works named inside remain unopened) |
| `rescue/paper6-raw-artifacts/checkpoint_v2.6/P6_LITERATURE_REFERENCES_v0.1_2026-08-30.json` | 18 references with URLs, assembled by the Paper 6 literature review | **AUDIT-QUEUE** (none opened by this project) |
| `rescue/paper6-raw-artifacts/checkpoint_v2.6/CLAUDE_ADVERSARIAL_REFEREE_AUDIT_v2.3_2026-08-30.md` | the contribution classification marking the weighted-automaton and Hankel/Krylov apparatus `CLASSICAL`; see `MATH_CLAIMS.md` row 127 | **AUDIT-QUEUE** (works named inside remain unopened) |

Two of the traditions those audits point at already have a status in this file and are
**not** re-cited here: Rao & Rosenfeld appears in section 2 as opened, and Currie &
Rampersad appears there with its evidence status explicitly split. Whether the Paper 6
audits' references coincide with those entries has **not** been checked, and must not be
assumed.

**Consequence for novelty.** `UNDER_REVIEW` is the correct status precisely because the
overlap is reported by an internal audit rather than established from sources this project
has opened. Reaching `REVIEWED_RESIDUAL_RISK` for the Paper 6 line requires opening the
queued works under section 5's maintenance rule and running the subsumption attack; that is
separate evidence work and is not done here.

## 2f. Paper 5 — verification-guided morphism synthesis (novelty review)

**NOVELTY_STATUS = UNDER_REVIEW**
A fresh adversarial review was performed on 2026-09-04: the three sources named
by the preserved 2026-08-29 Paper 5 novelty audit were opened and their
identities falsified, the intended parent/template source was reconstructed and
opened, a recent close source was opened in full, and four candidate novelty
objects were separately attacked for subsumption. The review is **incomplete**,
so this does not reach `REVIEWED_RESIDUAL_RISK`; and it is a real documented
review, so it is no longer the `NOT_ESTABLISHED` default.

**The four candidate objects are kept separate on purpose.** Bundling them is
how a technical refinement gets sold as a theorem.

| # | Candidate novelty object | Current adversarial verdict |
|---|---|---|
| A | Profile-parametric parent feasibility for a **partially specified** morphism: decide whether a parent witness is realizable by *any* profile-compatible completion | **UNRESOLVED**, leaning *technical refinement* |
| B | Exact prefix-Parikh reachable sets, combined across independent roles by **Minkowski sum** | **STRAIGHTFORWARD COMBINATION** |
| C | Polynomial reachable-state enumeration, `O(m L^{2(k-1)})` at fixed alphabet size `k` and arity `m` | **DIRECT COROLLARY** |
| D | Synthesis-time integration — *certify-while-constructing* pruning | **UNRESOLVED** |

*(These verdicts are prose classifications for this review. They are not
repository-wide status tokens, and `NOVELTY_STATUS` above remains the only
enum in play.)*

**Overall: novelty unresolved.** Stated explicitly, because each of these has
been conflated with another at some point in this project's history:

- **No novelty claim is currently authorized for Paper 5**, in any of A–D.
- This says **nothing against the mathematics.** The partial-target parent
  bridge, its `q=0` scope correction, and the exact literal-versus-parametric
  parity results are unaffected by a bibliography failure.
- The historical `07_NOVELTY_AUDIT.md` verdict — *"No matching construction was
  located in the searched sources"* — **carries no novelty weight**, because
  the searched sources were not the papers it named.
- **A and D require a further subsumption attack**, A against Currie &
  Rampersad's parent computation and D against the arXiv:2605.20504 sieve.
- **B and C must not be sold as standalone novelty.** B is a specialisation of
  established semilinear/Parikh machinery; C follows from
  `binom(d+k-1, k-1) ∈ O(L^{k-1})` over `m` depths by inspection.
- The **practical solver contribution is not established** (see below).

**Documented search scope (2026-09-04).** Opened directly: **arXiv:1409.1174 —
which is Lu & Peng on random hypergraphs, IDENTITY_MISMATCH against the Paper 5
audit that cited it as a Currie/Rampersad abelian-pattern source, and not a
source for anything here**; arXiv:1507.02581, whose correct identity was
already recorded above; arXiv:1106.1842 (section 3); arXiv:2605.20504 (full
text); Adamczewski TCS 307(1) (full text); Crossref queried for both
Adamczewski DOIs, one of which **does not resolve**.
Searched but not opened: the Parikh-image / semilinear-set / constraint-
propagation literature, where the general machinery behind object B lives.

**Residual leads, none opened.** The semilinear/Parikh-membership and
constraint-programming literature for object B; any morphism-synthesis or
CSP/SAT/ILP formulation that prunes on partial assignments for objects A and D;
and the citation graph around arXiv:2605.20504, which is recent enough that
follow-up work may already exist. These are the reason this section is
`UNDER_REVIEW` and not stronger.

**Practical value — the audit's distinctions, preserved.**

- The theoretical complexity result is **real under its stated assumptions**;
  the preserved theorem artifact itself notes that overall polynomiality holds
  *"ONLY IF"* template arity and parent length are fixed, and that the joint
  shared-word resolution remains a CSP.
- The measured parent-count reduction over a coarse profile relaxation was
  **0.80%–3.21%** — the experiment's own headline negative.
- The reported **2.3×–21.0× figures are Python microbenchmarks, not end-to-end
  solver speedups**, as the source report says in those words.
- **No memory benefit** is established.
- The strongest surviving framing is conceptual: *certify-while-constructing*,
  i.e. avoiding literal completion enumeration.
- **One end-to-end synthesis benchmark is still required** before any strong
  solver-contribution claim.

The stronger *">80% of branches eliminated"* figure is **deliberately not
imported**: it lives in a directory the project itself named
`invalid_assumed_outputs/`, and no reason for that invalidation is recorded
anywhere in the preserved corpus.

## 3. Coverage table

The **"Space"** column states exactly what has been swept, not just yes/no.

| # | Research question | Found in opened sources | Space the literature covers | Project's own work | More needed |
|---|---|---|---|---|---|
| 16 | ordinary ternary square-free fixed/branching theory vs aa2f blocker / seam programme | **yes** (Petrova & Shur 2021) | known analogy: fixed state ↔ blocker-labelled forced state; possible transferable machinery: small-period automaton / minimum-mean-cycle architecture. Load-bearing failure: pointwise equality, Fine-Wilf, Lyndon-Schützenberger word equations. | none | **yes** — find an Abelian replacement for large-period rigidity / density control. |
| 1 | Ternary abelian-square-free language, exhaustive | **yes** (Fici & Puzynina Prop. 17) | all ternary words, all lengths | row 1, independently reproduced | no |
| 2 | Avoiding abelian squares with 4 letters | **yes** (Keränen, Dekking) | constructions, no exhaustive sweep | rows 3, 40 | no |
| 3 | Mäkelä's conjecture, K ∈ [2,5] | **open** (Fici & Puzynina Conj. 20; R&R Problem 1) | — | rows 4, 7b, 49, 51, 52, 62, 78 | **yes, main goal** |
| 4 | Uniform ternary morphisms, k ≤ 6 | **not found** | — | row 36, exhaustive | not at this k |
| 5 | Uniform images of h₆'s fixed point, L ≤ 5 (full-image scan) | **not found** | — | row 49, exhaustive | L ≥ 6 open at full-image scan; but see row 78's locality-CSP reformulation, which covers L=6's K in [2,5] window exhaustively |
| 6 | Non-uniform morphisms, additive squares, 4→4 | **not found** | length profiles (La,Lb,Lc,Ld) ∈ [1,4]⁴, La ≥ 2, **all 20 open unbalanced affine classes** | rows 68, 69: exhaustive, negative, 1.87 billion morphisms | not in this window — see B13 (auxiliary alphabet) |
| 6b | Non-uniform morphisms, other forms | **not found** | — | not done: profiles > 4, alphabet sizes ≠ 4 | **yes, not done** |
| 6c | Auxiliary-alphabet form for additive squares (h₆ → integer alphabet) | **not found in checked sources** | uniform codings g: Σ₆ → {0,1,2,5}^L, **L ≤ 6**, h₆ fixed, condition all K ≥ 1 | row 77: exhaustive, negative, 10.4 billion symbols at L=6 | **yes** — but only: varying the auxiliary alphabet size m, non-uniform codings, other alphabets, L > 6 |
| 7 | Additive **cubes**, 4-element alphabets | **yes, comprehensively** (Lietard & Rosenfeld 2020, Corollary 1) | all 4-element alphabets as affine classes, except {0,1,2,3} | not done | **no — don't do it** |
| 8 | Additive cubes, {0,1,2,3} | **open** (their Question 1) | — | not done | possible, but their own program found no candidate |
| 9 | Additive **squares**, is there any finite ℤ-alphabet | **open** (their Question 3; quoted verbatim at row 63) | — | rows 53, 54, 59, 64 | **yes** |
| 10 | Additive-square alphabet classification, **unbalanced** classes | **not found in opened sources** | balanced classes covered by B&F 1987 (row 11) | row 54: of the classes that terminated, only {0,1,2,4} is unbalanced | **yes — this is where the gap is** |
| 11 | Balanced alphabets {0,p,q,p+q}: does an infinite word exist | **yes, solved** (Brown & Freedman 1987, traced via the PhD thesis) | all 4-element alphabets with a+d = b+c | row 65: **independently confirmed** on 10 classes; the quantitative constant corrected 50 → 61 | no — but B&F's own paper is unopened |
| 12 | Structure of the K ∈ [2,5] container (SCC, frequencies, factors) | **not found** | — | rows 51, 52, 62 | no — measured loose three times over |
| 13 | AA2FR language | **not found** | — | rows 27, 33, 35 | **yes, essentially untouched** |
| 14 | k-abelian hierarchy | **yes** (Fici & Puzynina Thm 65) | the 2-abelian ternary case is solved | no module | a possible yardstick |
| 15 | Proportion/density of morphisms satisfying Theorem 2.4's affine condition in the search space | **not found in checked sources** | Semantic Scholar's full citation graph for both source papers (2408.15390: 1 citer; 2111.07857: 2 citers) + targeted search terms ("affine morphism fraction/density eligibility additive powers", "how many morphisms affine eigenvalue decidable power-free") | row 73 | **yes — this is a gap if the check holds** |

**Row 15's side observation — source now opened in full (2026-09-04):** the
search found a recent (2026-05, rev. 2026-07) paper, **Eyidoğan, Göral &
Tanısalı, "Box Progressions, Abelian Power-Free Morphisms and A Sieve
Technique for the Template Method", arXiv:2605.20504**. It was abstract-only
until 2026-09-04, when the PDF was fetched and extracted with
`pdftotext -layout`. Verified from the source itself:

- it builds on the Currie–Rampersad template method — *"Combining Dekking's
  result with the template method of Currie and Rampersad, we develop a sieve
  technique"*;
- the sieve's effect, quoted: *"our technique reduces the number of parents and
  ancestors of the morphism in Proposition 3.6 from 1953162 and 1953289 to 8
  and 224, respectively"*;
- its task is **verification of a given morphism** and of its fixed point, over
  a **binary** alphabet — not synthesis, and not additive powers.

**Source-specific negative check.** A keyword census of the extracted full text
found **no occurrence in this opened source** of `Minkowski`, `reachable`,
`prefix-Parikh`, or `partially specified`. That is a statement about this
paper only, and must never be restated as *"does not exist in the
literature"*: the wider subsumption question is open (section 2f).

It still does not answer row 73's question — it measures a different quantity —
but it is now citable substantively, and it is the closest known prior work to
the Paper 5 pruning objects.

**A methodological note on how it was read.** The first automated read of this
paper reported that it "operates on partially specified morphisms" and
"employs Parikh reachable sets". Extracting the actual text disproved both;
the summariser had confabulated in response to a leading question. The claim
above rests on the extracted text, not on that summary — `AGENTS.md` rule 1
and `EPISTEMIC_DISCIPLINE.md` §1 exist for exactly this.

---

## 4. Where the gaps are — the case for rows 6, 10, 13

Three points where nothing was found in the opened sources and where the
project's own machinery is already in place:

1. **Non-uniform morphisms (row 6).** Every sweep this project has done,
   and everything found in the literature, concerns uniform morphisms.
   The non-uniform space is genuinely larger, and nothing has been done
   there.
2. **Additive-square alphabet classification (row 10).** 20 of 31 classes
   remain unresolved, and the unbalanced classes are the part where
   overlap with the literature has not even been suspected.
3. **AA2FR (row 13).** The project's own constraint, for which no external
   source was found. This is also a warning: the language is the
   project's own definition (FORBID4, row 9), so "not in the literature"
   may also mean "not of interest to anyone else".

---

## 5. Maintenance rule

A row is added here only once **the source has been opened and the search
terms recorded**. The "Found" column accepts only three values:

- **yes** — found, cited in `MATH_CLAIMS.md`
- **open** — the source explicitly states the question is open, citation
  in the ledger
- **not found** — not found in the opened sources, search terms recorded

**There is no fourth value, "does not exist."** If someone wants to claim
that, it requires an exhaustive search, and none has been done in this
project.

---

## 6. Novelty status

*This section formalises the `NOVELTY_STATUS` token already used in §2d. It
adds a vocabulary and a default; it does not create a second ledger.
`MATH_CLAIMS.md` remains the claim authority, this file remains the prior-art
authority, and novelty is tracked here because it is a statement about the
literature, not about the mathematics.*

**Every potentially novel result originating in this project starts at
`NOVELTY_STATUS = NOT_ESTABLISHED`**, and stays there until an adversarial
review is documented here. The default is not pessimism; it is the only status
the evidence supports before anyone has looked.

| Value | Meaning |
|---|---|
| `NOT_ESTABLISHED` | **the default.** No adversarial prior-art review is documented. Nothing may be called new. |
| `UNDER_REVIEW` | a review is in progress; the search scope so far is recorded, and the queue of unopened leads is visible (§2d is exactly this state) |
| `REVIEWED_RESIDUAL_RISK` | an adversarial review is documented, including a subsumption attack, with its search scope stated and its residual risk acknowledged |

**There is no value meaning "proved novel", for the same reason §5 has no
value meaning "does not exist."** Historical priority is not a property this
project's resources can establish.

### What does not move the status

- model confidence;
- the absence of a citation;
- a model failing to recall a source;
- several AI systems agreeing that a result is new — correlated models are not
  independent witnesses to provenance (`EPISTEMIC_DISCIPLINE.md` §5);
- a derivation carried out in the current session, which says nothing about
  whether the result was in prior literature or in training data;
- correctness of any kind. A fully proved theorem may be a rediscovery.

The failure mode here is **unrecoverable provenance, not deception**: a model
may reconstruct prior mathematical structure with no traceable source. The
correct sentence is *"provenance is not recoverable"*, never *"the source was
concealed"*.

### The subsumption attack

An adversarial review asks the question in the harder direction. Not *"can
related work be found?"* but:

> **Assume this result is already known. Find the strongest known theorem that
> would subsume it.**

Search mathematical structure, not only this project's terminology: exact
formulation, synonyms and translated terminology, equivalent formulations,
stronger theorems, adjacent fields, bibliography chaining in both directions,
and primary sources actually opened. Procedure and gate integration:
`docs/research/PAPER_LIFECYCLE.md` §3.6, Gate 4.

### Residual risk is recorded, not implied

Reaching `REVIEWED_RESIDUAL_RISK` reduces prior-art risk and does not eliminate
it. Prior art may use different terminology, sit in an adjacent field, appear
only as a corollary, be buried inside a proof, be poorly indexed, be old or
non-English, be inaccessible, or have influenced model training without
recoverable attribution.

The strongest permitted phrasing is *"to the best of our knowledge, within the
documented search scope …"*, with the scope stated in the sentence rather than
left to the reader — the same discipline §1 already applies to
*"checked in source X"* versus *"not in the literature"*.

**This section changes no existing entry's status.** Promoting a source from
`INDIRECT`, or opening anything in the §2d audit queue, is separate evidence
work governed by `AGENTS.md` rule 1 (*cite before you code*), and may not be
done from memory.
