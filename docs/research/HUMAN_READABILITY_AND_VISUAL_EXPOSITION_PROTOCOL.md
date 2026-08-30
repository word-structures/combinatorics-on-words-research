# HUMAN_READABILITY_AND_VISUAL_EXPOSITION_PROTOCOL.md

**Status:** canonical process document.
**Scope:** how results are *written* so that a mathematician outside the
discovery context can use them. It governs exposition only. It changes no
mathematics, no claim status, and no novelty position.

Operational rules live in `AGENTS.md`, "Human comprehension and visual
exposition". Gate integration lives in `docs/research/PAPER_LIFECYCLE.md`
(Stage 6H, Stage 7, Stage 8). This document is the reasoning behind both.

---

## 1. Why this exists

Paper 4 had passed all technical gates through Stage 8 — mathematical audit,
independent kill, novelty kill, reproducibility, manuscript architecture,
hostile referee, artifact closure — with only Stage 9 owner promotion
outstanding, and an external mathematician still reported that the setup and
terminology were harder to enter than necessary.

That is not a contradiction. It is a predictable asymmetry:

> The authors watched `carry domain`, `support family`, `unresolved role`,
> `affine target` and `mask` appear one at a time over months. The reader meets
> all five on page two.

Correctness and usability are independent quality axes. This protocol adds the
second one.

**The principle.** Every important abstraction must have a return path to a
concrete mathematical object. That path may be a figure, a table, a worked
example, a contrast pair, or a hand-checkable calculation — but it must exist,
and it must be in the paper.

**The hard constraint.** *No AI-only semantics.* If the conceptual bridge from
object to abstraction can only be reconstructed by handing the paper to an AI,
the paper is not exposition-complete. An AI can recover context from filenames,
code, prior sessions and project memory. A reader cannot.

---

## 2. The exposition ladder

Central concepts and theorems are introduced in this dependency order. It is a
dependency rule, not a page template — sections may interleave, but a later rung
may not silently depend on a skipped earlier one.

```
motivation  ->  concrete instance  ->  annotated visual  ->  vocabulary
     ->  notation  ->  local mechanism  ->  formal statement
     ->  proof map  ->  proof  ->  boundary / non-example  ->  interpretation
```

**Motivation** states the problem the concept solves, before the concept exists.

*Not:* "Define the reduced unresolved support signature by …"

*Instead:* "A candidate Abelian square can cross block boundaries in only a few
geometric ways. We need a record of which pieces of the unresolved block
actually contribute to the Parikh difference. The support signature is exactly
that record."

**Concrete instance** shows an actual object before any symbol names it:

```
source roles:       A        X        B        A
coded word:     |--------|--------|--------|--------|
                         ^        ^        ^
                        x0       x1       x2
```

**Noun before symbol.** The reader must know what an object *is* before it is
given `sigma`, `Delta`, `Q`, `kappa` or any other symbol.

---

## 3. CVAS — four coordinated views

Every major mechanism needs enough support in four views, and the reader must be
able to travel between them **in both directions**:

```
Concrete  <->  Visual  <->  Algebraic  <->  Structural
```

| view | what it is |
|---|---|
| Concrete | an actual word, block decomposition, state, or finite instance |
| Visual | a figure showing location, overlap, boundary crossing, flow, or identification |
| Algebraic | the Parikh equation, affine difference, matrix action, recurrence, or signed relation |
| Structural | the general object: family, quotient, equivalence, invariant space, operator |

If only one direction works — picture to equation but not equation to picture —
the representations are not yet integrated.

---

## 4. First-use contract for terminology

Every project-specific term creates definition debt. Pay it where the term first
appears:

1. why it is needed;
2. plain-language meaning;
3. one example;
4. a visual, where it helps;
5. the formal definition;
6. a non-example or boundary;
7. what it retains, and what it discards.

A glossary is for lookup. **A glossary is not a concept introduction.**

Internal research labels (`Q2`, `AFE`, `RX`, `latent carrier`, `BAL3`) must not
reach a manuscript before a descriptive mathematical referent exists.

**Terminology collision.** Generic words — state, profile, support, class,
response, target, family, rank, minimal — already carry standard meanings.
Qualify them: *equitable state*, *count state*, *support family*,
*future-count space*, *support-set minimality*.

---

## 5. Witnesses — and three kinds that must never be conflated

> **Every headline needs a human-scale semantic route, and its exact epistemic
> status must stay visible.**

The requirement is *not* that a computer-assisted result be re-provable by hand.
Conflating the two is the fastest way to overclaim. Three distinct things:

| # | Category | What the reader can actually do | Honest phrasing |
|---|---|---|---|
| 1 | **Human-inspectable semantic witness** | see what the object and the mechanism *mean* on a concrete instance | "here is what the objects are" |
| 2 | **Paper-and-pencil verifiable witness** | check the stated small claim manually, start to finish | "the reader can verify this by hand" |
| 3 | **Machine-certified exact witness** | read and understand the object; the exact claim rests on a reproducible computation or certificate | "concrete and readable; the exact statement is machine-certified — see the replay command" |

**Category 3 is never described as "checkable by hand".** If a witness is
concrete and readable but its claim was established by computation, say so in
the same sentence that presents it. The certificate is the evidence; the witness
is the route to understanding what the certificate is about.

Every computer-assisted headline needs at least category 1. Category 2 is
strongly preferred for the *conceptual core* of a result — the toy analogue that
explains why the machinery is needed — and is often available there even when the
full theorem is far out of hand reach.

| result type | required witness | typical category |
|---|---|---|
| a classification | one raw object, carried through to its class step by step | 1, often 2 |
| a quotient | two raw states that merge, and a near pair that does not | 1 or 3 |
| a recurrence | a few terms, and one recurrence equation verified by hand | 2 |
| a rank / dimension result | a tiny analogue first; then the real statement | 2 for the analogue, 3 for the result |
| a no-go / counterexample | the smallest failing instance, in full | 1 or 2 |
| an all-horizon or exhaustive equivalence | the pair shown literally; equality itself certified | **3, always** |

**Worked instance of the rule.** Before writing `2689 count states -> 1179
linear dimensions`, show three future-count functions with

```
f3 = f1 + f2
```

Three distinct states, a two-dimensional span. The reader then understands why
distinct states need not mean distinct dimensions — *before* meeting a Krylov
space.

**Every large number needs a noun and a non-interpretation.** `1179` alone is
not a result. "The statewise future-count sequences span a 1179-dimensional
rational space; this does *not* say there are 1179 count-equivalence classes" is.

---

## 6. Figures

A figure is external working memory for the reader. **A good figure answers a
question; a bad figure decorates notation.**

Useful figure types: object anatomy; mechanism; classification map; quotient
map; dependency graph; contrast pair; dynamics; scale.

**Caption contract.** Every caption answers four things: what is shown; what to
notice; what conclusion it supports; what it does **not** prove.

**Direct labelling.** Put labels next to what they label. Every symbol in a
figure uses the same glyph as the text.

**Say which kind of figure it is.** Illustration, proof diagram, and computed
visualization are three different epistemic objects. A visualization supports
reasoning; it does not replace proof unless the diagram is formally part of the
proof.

---

## 7. Proof readability

- **Strategy before detail.** Non-trivial proofs open with a roadmap.
- **Name every representation change**, and say why it is made: word condition
  to Parikh equality; Parikh equality to affine difference; literal state to
  quotient class; quotient class to future-count vector; future-count vectors to
  invariant subspace.
- **Expose hidden warrants.** Name the fact that connects two non-obvious lines.
- **Keep symbolic proof and finite validation visibly separate** — this is
  already `AGENTS.md` rule 3 and `EPISTEMIC_DISCIPLINE.md` §3; exposition must
  not blur what the ledger keeps apart.
- **Local summaries.** After a hard lemma, one sentence on what now holds.

---

## 8. Reader model

Declare the intended reader while drafting. Project default:

> A research mathematician comfortable with combinatorics on words, finite-state
> methods and linear algebra, who has never seen this project's internal
> terminology or discovery history.

The manuscript may not silently require scratch-run names, prior AI
conversations, internal abbreviations, code architecture, unpublished notes, or
unsummarized earlier papers.

---

## 9. Hidden-assumption audit

Per section, ask: *what does the author know here that the reader has not been
told?* The recurring offenders in this project:

indexing convention · block order · empty-fragment convention · literal versus
Parikh equality · multiplicities · label semantics · whether the empty
continuation counts · row versus column vectors · what "state" means · what
"minimal" means.

---

## 10. Reader-friction ledger (drafting aid, stays in `scratch/`)

| Location | Friction type | Reader question | Severity | Fix |
|---|---|---|---|---|
| §2.1 | undefined term | "What is a role?" | high | example + definition |
| Fig. 3 | split attention | "Which cut is `x1`?" | medium | direct label |
| Thm A | hidden scope | "Does `L=40` matter?" | high | state `L>=5` first |

Friction types: undefined term · notation overload · forward meaning · hidden
prerequisite · implicit warrant · visual mismatch · split attention ·
unexplained abstraction · unexplained number · scope ambiguity ·
proof/computation conflation · project-internal jargon.

---

## 11. Anti-patterns

| Anti-pattern | Fix |
|---|---|
| Definition avalanche | problem, then example, then definitions |
| Symbol-first exposition | noun before symbol |
| Glossary absolution | explain at first use |
| Figure after the damage | orientation figure before or with the abstraction |
| Data without semantics (`218298 -> 2691 -> 2689 -> 1179`) | a noun and an operation on every arrow |
| Code-native definition | the paper owns the mathematics; code implements it |
| Internal abbreviation leakage | descriptive concept name first |
| Proof/computation conflation | separate symbolic proof from finite validation |
| Universal minimality | name the equivalence under which minimality holds |
| AI-context leakage | clean-room outsider test |

---

## 12. Templates

**New concept:** why needed · smallest useful example · picture · informal
meaning · formal definition · what it retains · what it forgets · boundary or
non-example · role in the theorem.

**Theorem:** informal statement · setup diagram · formal statement · proof
strategy · proof · sanity-check witness · scope boundary · consequence.

*A theorem must not be the reader's first encounter with several of its own
nouns.*

**Computational headline:** exact claim · mathematical object · human-scale
witness · algorithm or certificate · exact output · interpretation ·
non-interpretation · reproduction path.

**Figure design:** figure question · objects shown · variables shown · reader
action · conclusion supported · not proved by this figure · text/theorem link.

---

## 13. Discovery notes carry an exposition seed

Every theorem seed also records, while the work is fresh:

```
Exact claim
Smallest witness
Why it matters
One-sentence human explanation
Possible figure
Likely reader confusion
Tempting stronger claim that is false
```

This may stay in `scratch/` during discovery. Its purpose is to stop later
manuscript work from having to reconstruct exposition out of AI memory — which
is precisely the failure mode `No AI-only semantics` forbids.

---

## 14. Gate integration

No new gates, no renumbering. Three existing gates gain a component; see
`docs/research/PAPER_LIFECYCLE.md`.

| gate | addition |
|---|---|
| **Stage 6H** — Human Comprehension, inside Stage 6 | reader declared; central terms motivated before formal use; running example; CVAS coverage for central mechanisms; paper-and-pencil witnesses; at least one boundary or non-example; figure sequence reconstructs the story |
| **Stage 7** — a fourth referee role | reader / exposition referee, who must *paraphrase* rather than approve |
| **Stage 8** — visual-semantic checks | figure labels legible; notation matches text; captions state purpose; figure/equation correspondence survives rendering; no unnecessary split attention |

The reader referee is defined in `docs/research/READABILITY_REFEREE_TEMPLATE.md`.

**A mis-paraphrase by a competent reader is an exposition defect, even when the
definition is formally correct.** That is the whole point of the role.

Per `PAPER_LIFECYCLE.md` §5, the agent that writes an exposition repair may not
be the agent that signs it off.

---

## 15. Epistemic boundary of this protocol

These rules are **design guidance informed by adjacent research**, not a theorem
about how research mathematicians read.

Most of the empirical work below concerns learners and instructional materials,
not journal articles in combinatorics. It does not establish an optimal format
for a research paper, and this protocol must never be cited as if it did.

Safe: *"This protocol is informed by adjacent research on mathematical
comprehension, examples, multiple representations, cognitive load, visualization
and expertise."*

Not safe: *"Cognitive science proves that every theorem must have a diagram."*

Two further limits, stated so they are not lost:

- **Picturability is not a truth criterion.** Some correct mathematics has no
  useful picture. The requirement is a traceability route, not a drawing.
- **Not every theorem needs a figure.** It needs *a* human-scale route: figure,
  table, worked example, contrast case, or hand calculation.

### Design-basis reading

Verification is recorded in `docs/research/HUMAN_READABILITY_SOURCE_LEDGER.md`,
with the passage, the date opened, and the scope caveat for each item.

Only three sources were opened in the verification session, and **only those
three carry a rule mapping**:

| Source | DOI | Informs |
|---|---|---|
| Atkinson, R., Derry, S., Renkl, A., & Wortham, D. (2000). *Learning from Examples: Instructional Principles from the Worked Examples Research.* Review of Educational Research 70(2), 181–214. | 10.3102/00346543070002181 | §5 — an example *system*, not isolated examples |
| Nathan, M., & Petrosino, A. (2003). *Expert Blind Spot Among Preservice Teachers.* American Educational Research Journal 40(4), 905–928. | 10.3102/00028312040004905 | §14 — why a reader outside the discovery context is needed at all |
| Inglis, M., & Alcock, L. (2012). *Expert and Novice Approaches to Reading Mathematical Proofs.* Journal for Research in Mathematics Education 43(4), 358–390. | 10.5951/jresematheduc.43.4.0358 | §7 — name the implicit warrant; §14 — competent readers do diverge |

Eight further works (Ainsworth 2006; Duval 2006; Arcavi 2003; Sweller & Cooper
1985; Chandler & Sweller 1991; Kalyuga et al. 2003; Rittle-Johnson & Star 2007;
Mayer 2008) had their bibliographic metadata confirmed but **their texts could
not be opened** — publisher pages returned authentication redirects or HTTP 403.
They are listed in the ledger as contextual reading with **no rule mapping**.
Halmos 1970 and Watson & Mason 2005 have no verified record at all.

**Crossref metadata is not content verification.** A source that appears only in
the ledger's unverified table may not be cited in support of any rule until it
has actually been opened.

The three verified items concern learners, preservice teachers, and proof
validation behaviour. None of them is about writing research papers in
combinatorics, and none of this protocol's rules rests on them: the rules come
from a concrete project failure, and the literature records the adjacent
tradition.

Two further works are commonly cited in this area and are **not** listed above
because no DOI record was verified in this session: Halmos, *How to Write
Mathematics* (L'Enseignement Mathématique 16, 1970), and Watson & Mason,
*Mathematics as a Constructive Activity* (2005). Verify before citing either.

---

## 16. Relation to existing governance

This document adds a layer; it replaces nothing.

| concern | owner |
|---|---|
| mathematical claims and verification levels | `MATH_CLAIMS.md` |
| prior art and novelty status | `LITERATURE_COVERAGE.md` |
| rules earned from past failures | `EPISTEMIC_DISCIPLINE.md` |
| protocol, placement, artifact, exposition rules | `AGENTS.md` |
| paper-level gates and release | `docs/research/PAPER_LIFECYCLE.md` |
| how results are written for humans | **this document** |

Nothing here licenses softening a claim, widening a quantifier, or presenting
finite validation as proof. Exposition improves the route to a result; it never
changes the result.
