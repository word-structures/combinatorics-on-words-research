# HUMAN-FIRST MATHEMATICAL RESEARCH PROTOCOL
## Readability, Visualization, Human Traceability, and Proof Communication

**Version:** v0.1  
**Date:** 2026-08-30  
**Purpose:** proposed Word Structures project protocol for making mathematically rigorous work maximally understandable to human readers.

---

## 0. Core principle

A mathematical result is not fully useful merely because it is correct.

A strong research paper should allow a mathematically competent reader to reconstruct the chain

\[
oxed{	ext{problem}	o	ext{concrete object}	o	ext{example}	o	ext{visual model}	o	ext{notation}	o	ext{mechanism}	o	ext{theorem}	o	ext{proof}	o	ext{boundary}	o	ext{consequence}}
\]

The project therefore adopts two independent quality requirements:

1. **Mathematical correctness:** the theorem, proof, computation, and scope are right.
2. **Human interpretability:** a reader can see what the objects mean, why the definitions exist, how the mechanism works, and what the theorem does and does not say.

\[
oxed{	ext{scientific integrity}=	ext{correctness}+	ext{human traceability}}
\]

An AI may understand omitted context from previous sessions, code, filenames, or project memory. A paper reader cannot be expected to do so.

> **No AI-only semantics:** a paper is not exposition-complete if an AI intermediary is required to reconstruct its conceptual bridges.

---

# 1. Why this protocol exists

The immediate motivation is external expert feedback on Paper 4.

The mathematics appeared broadly sound, but the setup and some terminology were difficult to enter because the paper assumed too much prior understanding. The problem is structurally predictable in a long-running technical project: authors and AI agents have lived through the discovery process, while the reader enters only at the finished paper.

The author therefore has hidden context:

\[
C_{	ext{author}}\gg C_{	ext{reader}}.
\]

Good exposition deliberately closes this gap.

This matters especially for Paper 6, whose current concepts include future-count semantics, equitable states, count equivalence, signed response cocycles, Krylov spaces, transient/persistent decompositions, latent carriers, and signed structural observables. These concepts can be exact yet become human-inaccessible if they are introduced in discovery order rather than comprehension order.

---

# 2. Literature basis and epistemic boundary

This protocol is informed by several adjacent traditions:

- mathematical exposition;
- mathematics education research on examples and proof reading;
- research on multiple representations;
- visualization in mathematics;
- cognitive-load work on integrated diagrams and worked examples;
- expertise and the “expert blind spot”;
- comparison and contrast in mathematical learning.

The evidence base does **not** directly prove an optimal format for professional combinatorics papers. Much empirical work concerns learners or instructional materials rather than journal research writing.

Therefore the project uses the literature as a **design basis**, not as a theorem about reader behavior.

\[
oxed{	ext{evidence-informed writing rule}
eq	ext{theorem about mathematicians}}
\]

Relevant sources include Halmos on mathematical exposition; Duval on semiotic representations; Ainsworth on multiple representations; Arcavi on visualization; Sweller and Cooper plus Atkinson et al. on worked examples; Chandler and Sweller on split attention; Kalyuga et al. on expertise reversal; Nathan and Petrosino on expert blind spots; Inglis and Alcock on expert/novice proof reading; Rittle-Johnson and Star on comparison; Watson and Mason on exemplification; and Mayer on coherent signaling in multimedia instruction.

---

# 3. Human Traceability Principle

Every important abstraction must have a return path to a concrete mathematical object.

For every central object \(X\), the reader should be able to answer:

1. What is \(X\) in ordinary mathematical language?
2. Why is \(X\) needed?
3. What is the smallest nontrivial example?
4. Where can I see \(X\) in a word, block decomposition, graph, table, or diagram?
5. What information does \(X\) retain?
6. What information does \(X\) discard?
7. What operation is performed on \(X\)?
8. What theorem becomes expressible because \(X\) exists?
9. What nearby interpretation would be wrong?
10. How does \(X\) connect to the main result?

A formal definition alone usually answers only part of this.

---

# 4. Master exposition ladder

Central concepts and theorems should, when feasible, be introduced in this order:

\[
oxed{	ext{Motivation}	o	ext{Concrete instance}	o	ext{Annotated visual}	o	ext{Vocabulary}	o	ext{Notation}	o	ext{Local mechanism}	o	ext{Formal statement}	o	ext{Proof map}	o	ext{Proof}	o	ext{Boundary / counterexample}	o	ext{Interpretation}}
\]

This is a dependency rule, not a rigid page template.

## 4.1 Motivation
Explain what problem the new concept solves.

Bad:
> Define the reduced unresolved support signature by …

Better:
> A candidate Abelian square can cross block boundaries in only a few geometric ways. We first need a record of which pieces of the unresolved block actually contribute to the Parikh difference. The support signature records exactly that information.

## 4.2 Concrete instance
Show an actual object.

```text
source roles:       A        X        B        A
coded word:     |--------|--------|--------|--------|
                         ^        ^        ^
                        x0       x1       x2
```

## 4.3 Annotated visual
Mark blocks, cuts, candidate halves, boundary crossings, unresolved occurrences, signs, or coefficients.

## 4.4 Vocabulary
Give the object a stable noun after the reader has seen it.

## 4.5 Notation
Use the rule:

\[
oxed{	ext{noun before symbol}}
\]

## 4.6 Local mechanism
Work through one complete small case.

## 4.7 Formal statement
Only now state the full theorem.

## 4.8 Proof map
Explain proof architecture before details.

## 4.9 Boundary
State what the theorem does not claim and, where possible, show a non-example or near miss.

## 4.10 Interpretation
Translate the result back into ordinary mathematical language.

---

# 5. CVAS: four coordinated views

Every major mechanism should have enough support in four views:

\[
oxed{	ext{Concrete}\leftrightarrow	ext{Visual}\leftrightarrow	ext{Algebraic}\leftrightarrow	ext{Structural}}
\]

## Concrete
An actual word, block decomposition, state, or finite example.

## Visual
A figure exposing location, overlap, boundary crossing, flow, or identification.

## Algebraic
The Parikh equation, affine difference, matrix action, recurrence, or signed relation.

## Structural
The general object: family, quotient, equivalence, invariant space, or operator.

A competent reader should be able to move between these representations in both directions.

---

# 6. First-use contract for terminology

Every project-specific term creates definition debt. Pay it at first use.

For each major new term:

1. explain why it is needed;
2. give a plain-language meaning;
3. show one example;
4. show it visually when useful;
5. give the formal definition;
6. show a non-example or boundary;
7. state what it retains and forgets.

A glossary is useful for lookup, but:

\[
oxed{	ext{glossary}
eq	ext{concept introduction}}
\]

Avoid leaking internal research labels such as “Q2”, “AFE”, “RX”, or “latent carrier” into the paper before a descriptive mathematical referent exists.

---

# 7. Example architecture

A paper should have an **example system**, not isolated examples.

## 7.1 Running example
Choose one example that survives several sections and becomes increasingly abstract.

## 7.2 Toy example
Use the smallest case that reveals the mechanism.

## 7.3 Real example
Show a genuine object from the target system after the toy model.

## 7.4 Boundary example
Show where the regime changes.

## 7.5 Non-example
Clarify what the definition excludes.

## 7.6 Counterexample to the tempting stronger claim
Use a small counterexample to explain scope.

## 7.7 Contrast pair
When two notions are easily confused, show them side by side.

Examples relevant to Papers 4–6:

- legal vs illegal window;
- support vs target;
- same current response vs same future counts;
- equitable equivalence vs count equivalence;
- state merging vs linear dependence;
- finite validation vs symbolic proof.

---

# 8. Paper-and-pencil witness rule

Computer-assisted papers need a human witness layer.

\[
oxed{	extbf{If a key mechanism is real, show the smallest instance a reader can inspect by hand.}}
\]

This does not mean replacing exhaustive computation with hand checking.

It means the semantics of the computation must be inspectable by hand.

For a classification:
- show one raw object;
- derive its class step by step.

For a quotient:
- show two distinct raw states that merge;
- show a near pair that does not.

For a recurrence:
- show a few terms;
- verify one recurrence equation manually.

For a rank result:
- give a tiny analogue first.

Example:

\[
f_3=f_1+f_2.
\]

There are three distinct future functions but only a two-dimensional span. This should precede a result such as

\[
2689	ext{ count states}	o1179	ext{ linear dimensions}.
\]

---

# 9. Visualization protocol

A figure is an external working memory for the reader.

A good figure answers a question.

A bad figure merely decorates notation.

## Figure types

### A. Object anatomy
What is the basic object made of?

### B. Mechanism
What changes, crosses, cancels, or activates?

### C. Classification map
How do cases split and merge?

### D. Quotient map
How do raw objects map to semantic classes?

### E. Dependency graph
How do definitions/lemmas/theorems depend on each other?

### F. Contrast figure
Which tiny difference causes different behavior?

### G. Dynamics figure
How do transitions, operators, or signed differences act?

### H. Scale figure
What part is finite and what part remains unbounded?

## Direct labeling
Place labels close to what they label. Avoid unnecessary legend lookup.

## Notation consistency
A variable shown in a figure must use the same symbol as the text.

## Caption contract
A caption should answer:
1. what is shown;
2. what to notice;
3. what conclusion it supports;
4. what it does **not** prove.

## Visual proof vs illustration
Explicitly distinguish:
- illustration;
- proof diagram;
- computed visualization.

Visualization supports reasoning. It does not replace proof unless the diagram is itself formally part of the proof.

---

# 10. Proof readability protocol

A correct proof can still be hard to follow.

## 10.1 Proof strategy first
For nontrivial proofs, begin with a roadmap.

## 10.2 Explain representation changes
Whenever the proof changes representation, state why.

Examples:
- word condition → Parikh equality;
- Parikh equality → affine difference;
- literal state → quotient class;
- quotient class → future-count vector;
- future-count vectors → Krylov space.

## 10.3 Expose hidden warrants
Name the conceptual fact connecting non-obvious lines.

## 10.4 Separate bookkeeping from ideas
Explicitly distinguish symbolic proof from finite falsification/validation.

## 10.5 Local summaries
After a difficult lemma, state in one sentence what has now been established.

---

# 11. Reader model and prerequisite budget

Each manuscript should declare its intended reader during drafting.

Suggested default:

> A research mathematician comfortable with combinatorics on words, finite-state methods, and linear algebra, but unfamiliar with the project’s internal terminology and discovery history.

The paper must not silently require:
- scratch-run names;
- prior AI conversations;
- internal abbreviations;
- code architecture;
- unpublished notes;
- all previous papers unless explicitly summarized.

Use layered exposition:

1. orientation;
2. exact definitions;
3. theorem/proof;
4. implementation/certificate.

Experts can skim orientation. New readers cannot invent missing orientation.

---

# 12. Manuscript architecture by reading speed

## 30 seconds
Title + abstract + first figure answer:
- object;
- problem;
- result;
- significance.

## 3 minutes
Headings + theorem statements + figures reveal the story.

## 15 minutes
Reader understands:
- running example;
- central definitions;
- mechanism;
- theorem hierarchy;
- scope boundaries.

## Full read
Specialist can audit every proof and computation.

---

# 13. Human Comprehension subgate

Do **not** renumber the current Paper Lifecycle.

Instead extend Stage 6 with:

## Stage 6H — Human Comprehension

Before Stage 6 closes:

- primary reader is defined;
- prerequisite budget is explicit;
- central project-specific terms are motivated before formal use;
- at least one running example exists;
- central mechanisms have adequate CVAS coverage;
- computer-assisted headlines have paper-and-pencil witnesses;
- at least one boundary/non-example/counterexample clarifies scope;
- figure sequence reconstructs the conceptual story;
- a competent outsider can explain the main theorem without AI assistance.

---

# 14. Reader referee in Stage 7

Add a fourth referee role:

**Reader / exposition referee**

This reader should be:
- mathematically mature;
- outside the discovery context;
- unfamiliar with internal project history.

The referee must paraphrase:
- research object;
- main question;
- running example;
- each central new term;
- main theorem;
- proof architecture;
- symbolic/computational boundary;
- strongest non-claim.

Mis-paraphrases are evidence of exposition defects.

---

# 15. Stage 8 visual-semantic checks

Artifact closure should also inspect:

- figure labels;
- notation consistency;
- caption meaning;
- figure/equation proximity;
- rendered correspondence;
- visual reading order;
- unnecessary split attention.

Artifact correctness is not only “nothing overlaps.” It also includes whether the visible object still communicates the intended mathematics.

---

# 16. Human-readable theorem package

Each main theorem should ideally include:

1. one-sentence informal theorem;
2. setup diagram or example;
3. formal theorem;
4. proof strategy;
5. proof;
6. sanity-check witness;
7. scope boundary;
8. consequence.

A theorem should not be the reader’s first encounter with several of its main nouns.

---

# 17. “Show me the noun” test

For every important noun, ask:

> Can I point to it?

Examples:
- block → substring;
- cut → position;
- carry → boundary crossing;
- mask → selected unresolved occurrences;
- support → surviving unresolved fragments;
- target → contribution from assigned blocks;
- state → retained history/semantic object;
- future count → number of legal continuations;
- signed defect → difference between successor sums;
- Krylov vector → concrete future-count vector.

Highly abstract objects may not be literally drawable, but their construction should remain traceable.

---

# 18. “Show me the equation” test

Every important equation needs a semantic reading.

Example:

\[
\Delta=(e_s-e_t)Q
\]

should be accompanied by:

> Put one unit of mass at state \(s\), subtract one unit at state \(t\), and apply one transition step. The resulting signed vector records the difference between their successor distributions.

Then show the transition diagram.

---

# 19. “Show me the failure” test

A new abstraction is often best explained by showing what simpler idea fails.

For Paper 6:

```text
current response
    fails
      |
finite response trees
    fail
      |
bisimulation
    fails
      |
rich static obstruction signatures
    fail
      |
partition refinement
    fails structurally
      |
signed linear semantics becomes necessary
```

This is not a chronology dump. It is logically selected motivation.

---

# 20. Paper 6: required human-first architecture

Paper 6 should begin with a human question, not large state counts.

Suggested opening:

> If two different block histories allow the same continuations now, can they still have different numbers of legal continuations later?

Then show a concrete witness.

## Required conceptual figures

### Figure 1 — What is a state?
Literal block history with retained suffix information.

### Figure 2 — Current legal responses
Outgoing legal next blocks.

### Figure 3 — Same current response, different future
A certified witness where present behavior agrees but future counts diverge.

### Figure 4 — Equitable vs count equivalence
Two all-horizon count-equivalent states whose transition structure differs.

### Figure 5 — Semantic hierarchy

```text
literal histories
      |
      v
218298 raw histories
      |
      | equitable / weighted quotient
      v
2691 transition states
      |
      | exact all-horizon count merging
      v
2689 count states
      |
      | linear dependence of future-count functions
      v
1179-dimensional future space
```

Every number must have a noun.

### Figure 6 — Why 2689 ≠ 1179
Toy example:

\[
f_3=f_1+f_2.
\]

Three distinct future functions, two-dimensional linear span.

Then state:

\[
oxed{	ext{state merging}
eq	ext{future-dynamics minimization}}
\]

### Figure 7 — Signed response cocycle

```text
state s                          state t
  |                                |
  +-- a --> s_a                    +-- a --> t_a
  +-- b --> s_b                    +-- b --> t_b
  +-- c --> s_c                    +-- c --> t_c

             signed successor difference
                       |
                       v
                     Delta
```

Then define the algebra.

### Figure 8 — Partition-refinement no-go
Show a true count-equivalent pair already split by the structural partition. Refinement cannot recreate the merge.

### Figure 9 — Transient/persistent split

\[
1179=12+1167.
\]

```text
future space (1179)
├── transient zero-root sector (12)
└── persistent sector (1167)
```

### Figure 10 — Target architecture

```text
P4/P5 structural observables
          |
          | signed combinations
          v
candidate structural feature space
          |
          | invariant closure
          v
1179-dimensional future space
          |
          | remove transient sector
          v
1167-dimensional persistent dynamics
```

---

# 21. Paper 6 terminology order

Suggested order:

1. literal block history;
2. legal continuation;
3. future-count function;
4. current response;
5. equitable state;
6. all-horizon count equivalence;
7. count state;
8. future-count vector;
9. linear span;
10. Krylov space;
11. signed response defect;
12. cocycle;
13. transient/persistent decomposition;
14. structural observable basis.

Do not lead with “Krylov”, “cocycle”, or “persistent injection.” First make the reader feel the problem those concepts solve.

---

# 22. Computational headlines need semantics

Every large computational result should answer four questions.

### What was computed?
Not just the script name.

### On what mathematical object?
States, profiles, matrix, suffixes, etc.

### What does the output mean?
Example:

> Rank 1179 means all statewise future-count sequences lie in a 1179-dimensional linear space.

### What does it not mean?
Example:

> It does not mean there are only 1179 count-equivalence classes.

---

# 23. Exact certificates need a human anatomy

A full certificate may be huge, but the paper should expose its structure:

```text
certificate
├── object hash
├── mathematical object definition
├── recurrence / polynomial / matrix relation
├── exact residual check
└── replay command
```

Show one representative residual equation in the paper. Store the full artifact in the repository.

---

# 24. AI and human roles

AI is good at:
- remembering many definitions;
- tracing long dependencies;
- exhaustive enumeration;
- consistency audits;
- generating candidate figures;
- mapping between representations once context is available.

But AI success does not establish human readability.

An AI may infer context from filenames, prior sessions, code, project memory, and hidden conventions.

A paper reader should not need any of these.

---

# 25. Outsider paraphrase test

Ask an external reader:

- What object is studied?
- What is the main problem?
- What does this term mean in your own words?
- What does the central figure show?
- What does the theorem say informally?
- What would be false if the theorem were false?
- What does the theorem *not* claim?
- Which part is symbolic proof and which part is computation?

A correct paraphrase is stronger evidence of readability than “looks clear.”

---

# 26. Reverse-translation test

The reader should be able to move:

\[
	ext{picture}	o	ext{words}	o	ext{equation}
\]

and

\[
	ext{equation}	o	ext{words}	o	ext{picture}.
\]

If only one direction works, the representations are not yet integrated.

---

# 27. Hidden-assumption audit

For each section ask:

> What does the author know here that the reader has not yet been told?

Common hidden assumptions:
- indexing convention;
- block order;
- empty-fragment convention;
- literal vs Parikh equality;
- multiplicities;
- label semantics;
- whether empty continuation counts;
- row/column vector convention;
- what “state” means;
- what “minimal” means.

---

# 28. Terminology-collision audit

Generic words such as state, profile, support, class, response, target, family, rank, and minimal carry many standard meanings.

Prefer qualified terms:
- equitable state;
- count state;
- support family;
- future-count space;
- support-set minimality.

---

# 29. Negative results as explanatory scaffolding

The project has a strong falsification culture. Use it to explain why the final abstraction is necessary.

Do not dump the chronological research history. Select the smallest failures that logically motivate the final concept.

---

# 30. Anti-pattern catalogue

### Definition avalanche
Fix: problem → example → definitions.

### Symbol-first exposition
Fix: noun before symbol.

### Glossary absolution
Fix: explain at first use.

### Figure after the damage
Fix: put orientation figure before/with the abstraction.

### Data without semantics
Bad: `218298 → 2691 → 2689 → 1179`.  
Fix: attach nouns and operations to every arrow.

### Code-native definition
Fix: paper owns the mathematics; code implements it.

### Internal abbreviation leakage
Fix: descriptive concept name first.

### Proof/computation conflation
Fix: explicitly separate symbolic proof from finite validation.

### Universal minimality
Fix: name the equivalence/category under which minimality holds.

### AI-context leakage
Fix: clean-room outsider test.

---

# 31. Practical templates

## New concept template

### Why needed
### Smallest useful example
### Picture
### Informal meaning
### Formal definition
### What it retains
### What it forgets
### Boundary/non-example
### Role in theorem

## Theorem template

### Informal theorem
### Setup diagram
### Formal theorem
### Proof strategy
### Proof
### Sanity-check witness
### Scope boundary
### Consequence

## Computational headline template

### Exact claim
### Mathematical object
### Human-scale witness
### Algorithm/certificate
### Exact output
### Interpretation
### Non-interpretation
### Reproduction path

## Figure-design template

**Figure question:**  
**Objects shown:**  
**Variables shown:**  
**Reader action:**  
**Conclusion supported:**  
**Not proved by figure:**  
**Text/theorem link:**

---

# 32. Reader-friction ledger

During drafting, maintain a temporary ledger:

| Location | Friction type | Reader question | Severity | Fix |
|---|---|---|---|---|
| §2.1 | undefined term | “What is a role?” | high | example + definition |
| Fig. 3 | split attention | “Which cut is \(x_1\)?” | medium | direct label |
| Thm. A | hidden scope | “Does L=40 matter?” | high | state \(L\ge5\) first |
| §7 | symbol overload | “Is Q a quotient or matrix?” | high | rename |

Possible friction types:
- undefined term;
- notation overload;
- forward meaning;
- hidden prerequisite;
- implicit warrant;
- visual mismatch;
- split attention;
- unexplained abstraction;
- unexplained number;
- scope ambiguity;
- proof/computation conflation;
- project-internal jargon.

---

# 33. Human-ready acceptance checklist

A central theorem is human-ready only if:

- [ ] problem can be explained without internal abbreviations;
- [ ] basic object is shown concretely;
- [ ] main mechanism is visible in a figure or hand-checkable calculation;
- [ ] project-specific terms are motivated before formal use;
- [ ] theorem nouns are introduced before the theorem;
- [ ] proof has a strategy map;
- [ ] representation changes are explained;
- [ ] one witness can be checked without code;
- [ ] symbolic proof is separated from finite validation;
- [ ] a boundary/non-example clarifies scope;
- [ ] every large number has a noun and interpretation;
- [ ] outsider can paraphrase theorem correctly;
- [ ] outsider can state strongest non-claim;
- [ ] figure captions reconstruct the conceptual story;
- [ ] AI assistance is optional, not required.

---

# 34. Integration with existing governance

Do not replace the current claim/artifact lifecycle.

Instead:

## Stage 6 — Manuscript Architecture
Add Human Comprehension subgate.

## Stage 7 — Hostile Referee
Add reader/exposition referee.

## Stage 8 — Artifact Closure
Add visual-semantic inspection.

## AGENTS.md
Add compact operational rules and link to this long protocol.

Recommended rules:

1. NOUN BEFORE SYMBOL.
2. MOTIVATE BEFORE DEFINE.
3. ONE RUNNING EXAMPLE FOR EACH CENTRAL MECHANISM.
4. EVERY COMPUTER-ASSISTED HEADLINE NEEDS A HUMAN-SCALE WITNESS.
5. CENTRAL MECHANISMS NEED REPRESENTATIONAL BRIDGES.
6. FIGURES MUST ANSWER QUESTIONS.
7. SYMBOLIC PROOF ≠ FINITE VALIDATION.
8. EVERY LARGE NUMBER NEEDS A NOUN AND NON-INTERPRETATION.
9. READER REFEREE MUST BE OUTSIDE DISCOVERY CONTEXT.
10. NO AI-ONLY SEMANTICS.

---

# 35. Paper 4 treatment

Do not reopen the frozen Paper 4 artifact solely because of this feedback.

Record the lesson in project governance.

If Paper 4 later receives a journal revision or v1.2, prioritize:

- better orientation;
- terminology motivation;
- one running worked example;
- one visual `3 → 6 → 34 → 19` map;
- explicit “what is being classified?” prose.

---

# 36. Discovery notes should carry an exposition seed

Whenever a new theorem seed is created, also record:

1. exact claim;
2. smallest witness;
3. why it matters;
4. one-sentence human explanation;
5. possible figure;
6. likely reader confusion;
7. tempting stronger claim that is false.

This can remain in scratch during discovery.

It prevents later manuscript reconstruction from depending on AI memory.

---

# 37. Literature-to-rule map

| Project rule | Supporting literature | Use here |
|---|---|---|
| Write for an explicit audience | Halmos; Higham | paper architecture |
| Coordinate multiple representations | Duval; Ainsworth | CVAS |
| Use visualization deliberately | Arcavi | mechanism figures |
| Use worked examples | Sweller & Cooper; Atkinson et al. | running examples |
| Avoid split attention | Chandler & Sweller | integrated figure labels |
| Layer support by expertise | Kalyuga et al. | orientation + expert layers |
| Audit expert assumptions | Nathan & Petrosino | outsider review |
| Make proof warrants visible | Inglis & Alcock | proof maps |
| Use comparison to expose distinctions | Rittle-Johnson & Star | contrast pairs |
| Treat examples as mathematical tools | Watson & Mason | example architecture |
| Use coherent signaling | Mayer | figures/captions |

---

# 38. Bibliography

Ainsworth, S. (2006). “DeFT: A conceptual framework for considering learning with multiple representations.” *Learning and Instruction*, 16(3), 183–198. DOI: 10.1016/j.learninstruc.2006.03.001.

Arcavi, A. (2003). “The role of visual representations in the learning of mathematics.” *Educational Studies in Mathematics*, 52, 215–241. DOI: 10.1023/A:1024312321077.

Atkinson, R. K., Derry, S. J., Renkl, A., & Wortham, D. (2000). “Learning from examples: Instructional principles from the worked examples research.” *Review of Educational Research*, 70(2), 181–214. DOI: 10.3102/00346543070002181.

Chandler, P., & Sweller, J. (1991). “Cognitive load theory and the format of instruction.” *Cognition and Instruction*, 8(4), 293–332. DOI: 10.1207/s1532690xci0804_2.

Duval, R. (2006). “A cognitive analysis of problems of comprehension in a learning of mathematics.” *Educational Studies in Mathematics*, 61, 103–131. DOI: 10.1007/s10649-006-0400-z.

Halmos, P. R. (1970). “How to Write Mathematics.” *L’Enseignement Mathématique*, 16, 123–152.

Higham, N. J. *Handbook of Writing for the Mathematical Sciences*. SIAM.

Inglis, M., & Alcock, L. (2012). “Expert and novice approaches to reading mathematical proofs.” *Journal for Research in Mathematics Education*, 43(4), 358–390. DOI: 10.5951/jresematheduc.43.4.0358.

Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). “The expertise reversal effect.” *Educational Psychologist*, 38(1), 23–31. DOI: 10.1207/S15326985EP3801_4.

Mayer, R. E. (2008). “Applying the science of learning: Evidence-based principles for the design of multimedia instruction.” *American Psychologist*, 63(8), 760–769. DOI: 10.1037/0003-066X.63.8.760.

Nathan, M. J., & Petrosino, A. (2003). “Expert blind spot among preservice teachers.” *American Educational Research Journal*, 40(4), 905–928. DOI: 10.3102/00028312040004905.

Rittle-Johnson, B., & Star, J. R. (2007). “Does comparing solution methods facilitate conceptual and procedural knowledge? An experimental study on learning to solve equations.” *Journal of Educational Psychology*, 99(3), 561–574. DOI: 10.1037/0022-0663.99.3.561.

Sweller, J., & Cooper, G. A. (1985). “The use of worked examples as a substitute for problem solving in learning algebra.” *Cognition and Instruction*, 2(1), 59–89. DOI: 10.1207/s1532690xci0201_3.

Watson, A., & Mason, J. (2005). *Mathematics as a Constructive Activity: Learners Generating Examples*. Lawrence Erlbaum Associates.

---

# 39. Final project philosophy

Future Word Structures papers should aim to be:

\[
oxed{	ext{exact}\land	ext{auditable}\land	ext{reproducible}\land	ext{visualizable}\land	ext{explainable}\land	ext{human-usable}}
\]

The guiding rules are:

\[
oxed{	extbf{Do not merely prove the object exists. Make the reader able to see what object has been proved to exist.}}
\]

and:

\[
oxed{	extbf{Do not merely certify the answer. Make the reader able to reconstruct what question the certificate answers.}}
\]

For every future paper ask two independent questions.

### Scientific question
> Is this true?

### Human question
> Can a mathematically competent reader who was not present during discovery see what is true, why the definitions exist, and how the proof connects to a concrete object?

The paper is not ready until both answers are yes.
