# PAPER 6 — LITERATURE AND NOVELTY AUDIT v0.1
**Date:** 2026-08-30  
**Scope:** Paper 6 v2.0 theory core  
**Purpose:** A strict prior-art review before further theorem building.  
**Epistemic status:** Targeted literature audit, not proof of absence from the literature.

---

## 1. Executive verdict

The review did **not** find a paper that subsumes the complete current Paper-6 program.

That is the positive result.

The equally important negative result is that much of the conceptual language surrounding Paper 6 is already classical or has close prior art. In particular, Paper 6 must not claim novelty for:

- weighted automata or rational series;
- Hankel-rank minimality;
- Krylov/minimal recurrence methods;
- signed linear state representations;
- predictive-state representations (PSR);
- observable operator models (OOM);
- finite full-rank Hankel basis selection;
- transfer matrices or Perron growth;
- entropy/growth of repetition-avoiding languages;
- Abelian/additive template methods;
- linear bulk plus bounded prefix/suffix correction under morphisms;
- choosing among multiple safe equal-length substitution images;
- set-valued/random substitution entropy;
- move-to-front or recency ordering of alphabet symbols.

The strongest currently defensible novelty candidate is substantially narrower:

> **An Abelian-specific exact structural-observability and semantic-anatomy result for survival counting inside an externally prescribed equal-length block codebook.**

The current strongest finite-system theorem is the exact Q2 hierarchy

\[
218298
\longrightarrow
2691
\longrightarrow
2689
\longrightarrow
1179
=
12+1167,
\]

together with the raw-history measurement theorem:

\[
\boxed{
4\text{ recent block Parikh profiles}
+
6\text{-state recency alphabet frame}
+
1\text{ adjacency bit}
}
\]

whose aggregate family measurements have exact rational rank

\[
1179/1179
\]

on the complete statewise continuation-count future and

\[
1167/1167
\]

on its persistent part.

No exact prior construction of this form was located in the targeted search.

That is **not proof of novelty**. It is the claim that deserves the next, deeper citation-chain audit and mathematical replication.

---

## 2. Paper-6 claims being audited

The present Paper-6 program contains several logically distinct claims. They must not be bundled into one vague novelty statement.

### P6-A — selected-library survival problem

Fix an externally selected equal-length block library

\[
B\subseteq\Sigma^L.
\]

Let \(A_n\) be the number of block assemblies in \(B^n\) whose concatenation is globally Abelian-safe (or finite-cutoff safe).

Study:

\[
\lambda_B=\lim A_n^{1/n}
\]

when appropriate, and relative survival against the ambient independent-choice space \(|B|^n\).

### P6-B — finite-cutoff transfer dynamics

For finite half-period cutoff \(K_{\max}\), encode continuation counts by an exact finite weighted transition system and derive recurrence/growth information.

### P6-C — boundary-affine / bounded-defect decomposition

For

\[
K=qL+r,
\]

write the Abelian half-difference as

\[
D_q+E,
\]

where \(D_q\) is the long-range block-profile component and \(E\) is a bounded local boundary correction.

### P6-D — cut-profile family compiler

Represent local boundary effects by prefix/suffix Parikh descriptors and generate family transfer operators by coefficient extraction / character operators.

### P6-E — semantic hierarchy

Separate:

1. literal/future-language history semantics;
2. stable weighted/equitable semantics;
3. all-horizon total-count equivalence;
4. minimal linear/Krylov/Hankel future semantics.

At Q2:

\[
2691\to2689\to1179.
\]

### P6-F — signed response and latent-memory phenomena

Use current response families as candidate relations, form signed successor defects, and classify historical differences according to whether they are:

- irrelevant;
- finite/nilpotent;
- persistently injected into future branching.

### P6-G — structural observability

Construct physically interpretable raw-history families whose aggregate sums are injective on the exact future-count space.

Current strongest instance:

\[
4\text{ profiles}+\text{recency frame}+1\text{ bit}.
\]

---

# 3. Weighted automata, rational series and Hankel rank

## 3.1 Classical result

The Hankel matrix of a sequence function/rational series is a classical tool for minimal weighted-linear representations.

The Carlyle–Paz / Fliess line establishes the equivalence between finite Hankel rank and rational/recognizable series. Modern weighted-automata work, including Balle–Panangaden–Precup, uses this directly for canonical forms, minimization and approximation.

Therefore all of the following are established mathematical infrastructure:

\[
\dim \operatorname{span}
\{\mathbf1,Q\mathbf1,Q^2\mathbf1,\ldots\}
\]

as a minimal linear future dimension;

signed linear combinations of state futures;

minimal recurrence polynomials;

Hankel rank;

Krylov spaces;

and the possibility that linear dimension is much smaller than the number of deterministic/equitable states.

## 3.2 Consequence for Paper 6

Paper 6 must **not** claim:

> “we introduce a new linear semantics smaller than the automaton,”

or:

> “we discover that Hankel rank can be smaller than a state quotient.”

That is classical.

What can still be scientifically important is the exact Abelian instance:

\[
2691\to2689\to1179,
\]

with independently replayable witnesses and certificates.

### Novelty classification

**General mechanism:** CLASSICAL.  
**Exact Abelian Q2 semantic hierarchy:** PLAUSIBLY NEW SYSTEM-SPECIFIC RESULT.

---

# 4. Predictive State Representations and Observable Operator Models

This is the closest conceptual neighboring theory to the newest structural-measurement language.

Singh–James–Rudary define a system-dynamics matrix with histories on one axis and future tests on the other. A finite-rank system admits linearly independent **core tests**, and all other future-test predictions are linear functions of their predictions.

Observable Operator Models and multiplicity/weighted automata sit in the same broad finite-dimensional sequential-system framework. Thon–Jaeger explicitly develop links among multiplicity automata, OOMs and PSRs.

Spectral-learning work similarly selects finite full-rank Hankel blocks; Quattoni–Carreras–Gallé study compact basis selection using structural rank.

## Consequence

The abstract statement

> “a finite collection of measurements can determine the complete finite-rank future without being a Markov-state partition”

is not new.

Nor is the idea that observable coordinates may be signed/linear.

The potentially new Paper-6 result is much more concrete:

> a particular Abelian combinatorial family defined from recent Parikh blocks, an alphabet frame and one literal bit is a complete exact measurement family for the continuation-count future of the selected Q2 system.

### Novelty classification

**Observable/core-test philosophy:** CLASSICAL.  
**Specific Abelian structural family:** STRONG CURRENT NOVELTY CANDIDATE.

---

# 5. Abelian/additive templates: the highest-risk overlap

This literature is the main prior-art danger for Paper 6's boundary geometry.

## 5.1 Currie–Rampersad template framework

The template method encodes Parikh differences among consecutive pieces and studies parent/ancestor relations through a morphism.

## 5.2 Rao–Rosenfeld 2018

Rao and Rosenfeld generalize the template machinery to a broader class and additive repetitions.

A parent relation has the structural form

\[
d_i
=
M_h d'_i
+
\Psi(s_{i+1}p_{i+2})
-
\Psi(s_i p_{i+1}).
\]

This is directly recognizable as

\[
\boxed{
\text{linear / aggregate bulk term}
+
\text{bounded prefix/suffix boundary correction}.
}
\]

That is conceptually close to the Paper-6

\[
D_q+E
\]

decomposition.

## 5.3 2026 template-sieve work

Eyidoğan–Göral–Tanısalı explicitly introduce a sieve technique intended to reduce the parent-template search required by the Currie–Rampersad method.

This matters because “compressing the set of Abelian template candidates” is not an untouched direction.

## Consequence for Paper 6

The abstract statement

> “long Abelian repetition decomposes into a bulk Parikh term plus bounded boundary terms”

must be presented as a selected-uniform-block specialization of template logic, not as an entirely new conceptual mechanism.

The sharp special bound

\[
\|E\|_\infty\le2L-2
\]

may still be a useful technical lemma if it is not already implicit in a more general template bound.

Likewise, the finite cut-profile compiler may be a worthwhile synthesis/application but needs conservative wording.

### Novelty classification

**Template algebra:** CLASSICAL / CLOSE PRIOR ART.  
**Sharp equal-block defect specialization:** POSSIBLY NEW TECHNICAL LEMMA.  
**Selected-library compiler synthesis:** POSSIBLE CONTRIBUTION; requires careful comparison.

---

# 6. Counting and growth of Abelian-power-free words

Counting/growth is firmly established.

Currie proved exponential growth for binary Abelian fourth-power-free words.

Carpi studied counts of Abelian-square-free words over four letters.

Samsonov–Shur and Shur study growth rates / thresholds / regular approximations for power-free and Abelian-power-free languages.

Therefore Paper 6 must not claim novelty merely because it:

- counts avoiding words;
- obtains an exponential growth rate;
- defines an entropy-like quantity;
- approximates growth using finite automata.

### Novelty classification

**Counting / exponential growth / entropy:** CLASSICAL.

---

# 7. Multi-valued substitutions: very close to "many allowed blocks"

This is one of the most important findings of the review.

Currie–Mol–Rampersad–Shallit define multi-valued substitutions

\[
\theta:\Sigma^*\to2^{\Sigma^*},
\]

and use letter-wise uniform substitutions with several possible images to generate exponentially many Abelian-4-power-free words.

Their counting argument converts the number of possible image choices into an exponential lower bound.

Keränen's powerful Abelian-square-free substitution has multiple image words (12 per source letter in the cited construction).

Currie's earlier counting work also uses multi-valued substitutions.

## Consequence

The idea

> “choose among several equal-length safe block images and get many Abelian-free words”

is **not** new.

Paper 6 must distinguish its setup:

- the block library \(B\) is externally prescribed;
- every \(n\)-block word of \(B^n\) belongs to the ambient product space;
- global cross-boundary Abelian safety is a filter on that ambient space;
- the object of interest is exact/relative survival and its future semantics,
  not only the construction of an Abelian-preserving substitution.

No exact prior formulation matching this entire selected-codebook survival problem was located.

### Novelty classification

**Multiple safe image choices:** KNOWN.  
**Arbitrary external codebook survival formulation:** DISTINCT IN SEARCH, NOVELTY UNPROVED.

---

# 8. Random/set-valued substitutions and entropy

The broader symbolic-dynamics literature studies set-valued/random substitutions, including constant-length systems.

Established topics include:

- word complexity;
- topological entropy;
- measure-theoretic entropy;
- measures of maximal entropy;
- language growth from multiple possible substitution images.

Thus words such as **entropy**, **random/set-valued choice**, or **constant-length multiple images** must not carry Paper-6 novelty.

The useful distinction remains:

> Paper 6 starts with an ambient selected codebook and applies a global Abelian avoidance constraint, rather than defining the legal language by iterating the set-valued substitution itself.

### Novelty classification

**Set-valued/random substitution entropy:** CLASSICAL NEIGHBOR.  
**Relative survival under global Abelian filtering:** POTENTIALLY DISTINCT.

---

# 9. Constrained coding and finite-state capacity

Finite forbidden-pattern systems are standard constrained systems.

Their capacity/growth can be computed through adjacency/transfer matrices and Perron–Frobenius theory. Exact cardinalities can also be obtained with generating-function and cluster methods.

Therefore each finite Abelian cutoff is naturally a constrained-system calculation.

The genuinely different point is that unrestricted Abelian avoidance is not finite type; Paper 6 uses a monotone sequence of finite-memory cutoffs/block ranges toward a global constraint.

### Novelty classification

**Finite cutoff transfer/Perron calculation:** CLASSICAL.  
**Abelian selected-codebook cutoff hierarchy:** USEFUL SPECIALIZATION / SYNTHESIS.

---

# 10. Alphabet symmetry and recency ordering

Alphabet permutation symmetry is standard in combinatorics on words.

Canonical representatives under renaming are common.

The latest Paper-6 **recency frame** also has an obvious classical algorithmic neighbor: move-to-front / recency ranking. Bentley–Sleator–Tarjan–Wei's locally adaptive compression scheme orders symbols according to recent use; later descriptions explicitly refer to move-to-front as recency ranking.

Therefore:

\[
\boxed{
\text{ordering the alphabet by recency is not itself new.}
}
\]

What the search did **not** find is the exact composition:

\[
\text{recency alphabet frame}
+
4\text{ recent Parikh block profiles}
+
\mathbf1[s_{-1}=s_{-2}]
\]

as a full-rank observable family for selected-library Abelian continuation counts.

### Novelty classification

**Recency ordering:** CLASSICAL.  
**Abelian observability use of recency frame:** NO EXACT PRIOR FOUND.  
**One-bit full Q2 measurement theorem:** STRONGEST CURRENT SPECIFIC CANDIDATE.

---

# 11. Signed response cocycles and bisimulation

Weighted automata already provide linear equivalence theory and signed state combinations.

Thus the criterion

\[
\Delta Q^k\mathbf1=0
\]

for future-count invisibility is standard finite-dimensional linear algebra.

Paper 6 should not introduce a supposedly new general notion of signed bisimulation from this alone.

What may be distinctive is how the signed defect is **generated combinatorially**:

- start with an Abelian current-response correspondence;
- match legal blocks under alphabet permutation;
- form the signed successor defect;
- use it as a candidate/count-equivalence certificate.

The natural Q2 examples in which positive response trees differ while signed sterile impulses cancel are strong explicit system-specific examples.

### Novelty classification

**Linear criterion:** CLASSICAL.  
**Abelian response-defect generator / Q2 examples:** PLAUSIBLY NEW SYSTEM-SPECIFIC.

---

# 12. Latent obstruction memory and persistent injection

The targeted search did not locate a result matching the exact Paper-6 counterexample:

- same current exact selected-block response;
- same recent block-profile history;
- different older internal order;
- current obstruction difference response-redundant;
- a future shift activates the latent difference;
- the resulting branch is non-sterile and feeds persistent future-count dynamics.

The generic lesson that coarse aggregation can lose future information is not new.

The value here is the exact Abelian geometric mechanism and its use as a no-go theorem against static local descriptors.

### Novelty classification

**Generic hidden-memory phenomenon:** CLASSICAL IN SPIRIT.  
**Exact Abelian latent-injection witnesses:** PLAUSIBLY NEW SYSTEM-SPECIFIC NEGATIVE RESULTS.

---

# 13. Black-box recurrence methods

Berlekamp–Massey, Wiedemann/Krylov methods, modular minimal-polynomial discovery and CRT reconstruction are established algebraic-computation methods.

Paper 6 should present these as exact certification/reproducibility tools.

### Novelty classification

**Algorithms:** CLASSICAL.  
**Integration and certificates for this Abelian system:** REPRODUCIBILITY VALUE.

---

# 14. Claim-by-claim novelty matrix

| Paper-6 claim | Current literature status | Safe positioning |
|---|---|---|
| Finite cutoff transfer matrix | Classical | Standard machinery |
| Perron root / capacity / entropy | Classical | Standard machinery |
| Hankel/Krylov minimal dimension | Classical | Standard theorem |
| Signed linear future semantics | Classical | Standard linear representation |
| PSR/OOM observability | Classical | Interpretation, not novelty |
| Full-rank Hankel basis selection | Classical | Do not claim |
| Abelian template/ancestor method | Classical | Cite prominently |
| Bulk + boundary correction | Close direct prior art | Selected-block specialization |
| Sharp \(2L-2\) defect bound | No exact match found | Possible technical lemma |
| Cut-profile coefficient compiler | Generic algebra + Abelian specialization | Possible synthesis contribution |
| Growth of Abelian-free words | Classical | Do not claim |
| Multiple allowed image blocks | Known | Multi-valued substitution prior art |
| Random/set-valued substitution entropy | Known | Neighboring framework |
| External selected-library relative survival | No exact match located | Distinct formulation, novelty uncertain |
| Q2 \(2691\to2689\to1179\) | General distinction classical | New exact system-specific theorem candidate |
| Natural count≠equitable Q2 pairs | Custom-system result | New system-specific evidence |
| Signed response candidate sieve | Linear core classical | Abelian-specific generator may be new |
| Latent persistent-injection witness | No exact prior found | Strong negative theorem candidate |
| Recency ranking | Classical move-to-front idea | Gauge tool only |
| 4 profiles + recency + one bit full observability | No exact prior found | **Strongest current novelty candidate** |
| Universal structural-observability theorem | Not established | Do not claim |
| Direct sparse structural future operator | Not obtained | Open research target |

---

# 15. The paper story that the literature supports

## Risky story — avoid

> We introduce a new observable/Hankel/template framework for Abelian avoidance,
> use entropy and state compression, and derive a recurrence.

A knowledgeable referee could correctly object that most of those ingredients are established.

## Defensible story

> We study exact survival counting inside a prescribed equal-length block
> codebook under global Abelian-square constraints. Classical Abelian-template
> geometry is used to compile local boundary effects, and classical
> weighted-automata/Hankel semantics is used to characterize future counting.
> The contributions are an exact semantic anatomy of the selected system,
> strict natural separation between weighted, count and linear semantics,
> no-go counterexamples to plausible local state representations, and an
> explicit Abelian structural family whose aggregate measurements have complete
> exact future observability.

That story is technically honest and leaves novelty where the current evidence is strongest.

---

# 16. Strongest novelty candidate after this review

The strongest candidate is **not** the number 1179 in isolation.

Hankel rank is classical.

The candidate is the conjunction of facts:

1. the ambient object is an externally selected equal-length block codebook;
2. global Abelian constraints act across arbitrary block boundaries;
3. deterministic local/history descriptors are provably inadequate in natural ways;
4. exact statewise future semantics has dimension 1179;
5. raw-history families defined by
   \[
   4\text{ recent Parikh block profiles}
   +6\text{-state recency frame}
   +1\text{ adjacency bit}
   \]
   give exact rational rank \(1179/1179\);
6. removing the one bit drops the rank to 1144;
7. the persistent 1167-dimensional future is also fully observed.

No equivalent theorem was located in the targeted sources.

## Critical limitation

This remains one finite calibration:

- L4;
- full aa2fr library;
- Q2 / \(K_{\max}=11\).

A referee can reasonably ask whether this is:

- a reusable Abelian phenomenon; or
- a beautiful property of one finite automaton.

That is now the most important mathematical question.

---

# 17. Highest-value next mathematics

The literature review strongly suggests **not** spending effort re-proving generic observability/Hankel theory.

A high-value next theorem would be one of the following.

## A. General structural-measurement theorem

Under explicit assumptions on \(L,Q,B\), construct a combinatorial measurement family and bound its size/rank without generic Gaussian basis selection.

## B. Cross-instance law

Replicate the structural observability phenomenon across:

- Q1 and Q2;
- another block length;
- BAL3/INTERIOR/asymmetric selected libraries;
- ideally Q3 or an L40 pilot;

and identify a rule for required profile depth / gauge bits.

## C. Direct structural Apply

Compute the future-coordinate action from template/cut-profile family data without constructing the semantic suffix automaton.

This would be the strongest bridge from Abelian geometry to classical minimal linear semantics.

## D. General no-go theorem

Turn the many current counterexamples into a theorem of the form:

> every deterministic state descriptor in class \(\mathcal C\) is either
> unsound for future counting or must retain a large amount of literal
> history, while a signed/dual linear representation has smaller dimension.

---

# 18. Publication positioning

## Avoid in title/abstract

Do not say:

- "a new theory of observability";
- "the first entropy method for Abelian avoidance";
- "a new Hankel representation";
- "the first template compression";
- "the first multiple-block construction";
- "a new recency-ranking method".

## Better title directions

**Exact Future Semantics in Selected-Block Abelian Avoidance**

or

**Structural Measurements for Exact Survival Counting under Abelian Constraints**

or, if the structural theorem generalizes:

**Selected-Block Abelian Avoidance: Boundary Templates, Exact Future Semantics, and Structural Observability**

---

# 19. Critical grade after the literature audit

The audit lowers the generic-framework novelty while preserving the mathematical quality.

| Component | Critical score |
|---|---:|
| Research question | 9.4/10 |
| Exact/certified mathematics | 9.5/10 |
| Falsification discipline | 10/10 |
| Generic framework novelty | 5–6/10 |
| Abelian-specific result novelty | 8–9/10 provisional |
| Manuscript novelty confidence | ~8/10 |
| **Overall current research-paper grade** | **8.9–9.2/10** |

A genuine generalization or direct structural operator could move the paper substantially above 9.5.

---

# 20. Search limitations

This was a targeted web literature review conducted on 2026-08-30.

Search topics included combinations of:

- Abelian/additive power;
- template/ancestor/morphism;
- Mäkelä;
- multi-valued substitution;
- Abelian-free counting/growth;
- random substitution entropy;
- weighted automata/rational series;
- Hankel rank/minimal realization;
- predictive state/core tests;
- observable operator;
- spectral basis selection;
- constrained coding/capacity;
- alphabet permutation;
- move-to-front/recency ranking;
- codebook/block library/Parikh automaton.

No exact match for the v2.0 one-bit Abelian observability theorem was located.

This is **not proof of absence**.

Before submission, the novelty audit should additionally use:

1. MathSciNet;
2. zbMATH Open;
3. Google Scholar cited-by chains;
4. backward and forward citations of Rao–Rosenfeld 2018;
5. Currie–Rampersad 2012;
6. Keränen 2009;
7. Currie–Mol–Rampersad–Shallit 2024;
8. Fici–Puzynina 2023;
9. PSR/OOM/WFA basis-selection literature;
10. constant-length random/set-valued substitution literature.

Particularly useful search phrases:

- "Abelian constrained code";
- "Abelian codebook";
- "Parikh state automaton";
- "weighted Abelian template";
- "counting Abelian templates";
- "Hankel Parikh";
- "feature Hankel basis";
- "aggregated Hankel rows";
- "random substitution Abelian power";
- "constant length set-valued substitution entropy".

---

# 21. Core references

1. **Balle, B.; Panangaden, P.; Precup, D.**  
   *A Canonical Form for Weighted Automata and Applications to Approximate Minimization.* LICS 2015.  
   arXiv:1501.06841.

2. **Singh, S.; James, M. R.; Rudary, M. R.**  
   *Predictive State Representations: A New Theory for Modeling Dynamical Systems.* UAI 2004.

3. **Thon, M.; Jaeger, H.**  
   *Links Between Multiplicity Automata, Observable Operator Models and Predictive State Representations — a Unified Learning Framework.*  
   JMLR 16:103–147, 2015.

4. **Quattoni, A.; Carreras, X.; Gallé, M.**  
   *A Maximum Matching Algorithm for Basis Selection in Spectral Learning.*  
   PMLR 54:1477–1485, 2017.

5. **Carpi, A.**  
   *On Abelian Power-Free Morphisms.*  
   International Journal of Algebra and Computation 3(2):151–168, 1993.  
   DOI: 10.1142/S0218196793000123.

6. **Currie, J. D.; Rampersad, N.**  
   *Fixed Points Avoiding Abelian k-Powers.*  
   Journal of Combinatorial Theory, Series A 119(5):942–948, 2012.  
   DOI: 10.1016/j.jcta.2012.01.006.

7. **Rao, M.; Rosenfeld, M.**  
   *Avoiding Two Consecutive Blocks of Same Size and Same Sum over \(\mathbb Z^2\).*  
   SIAM Journal on Discrete Mathematics 32(4):2381–2397, 2018.  
   DOI: 10.1137/17M1149377.

8. **Eyidoğan, S.; Göral, H.; Tanısalı, N.**  
   *Box Progressions, Abelian Power-Free Morphisms and A Sieve Technique for the Template Method.*  
   arXiv:2605.20504, 2026.

9. **Fici, G.; Puzynina, S.**  
   *Abelian Combinatorics on Words: a Survey.*  
   Computer Science Review 47 (2023), 100532.  
   arXiv:2207.09937.

10. **Currie, J. D.**  
    *The Number of Binary Words Avoiding Abelian Fourth Powers Grows Exponentially.*  
    Theoretical Computer Science 319 (2004), 441–446.  
    DOI: 10.1016/j.tcs.2004.02.005.

11. **Keränen, V.**  
    *A Powerful Abelian Square-Free Substitution over 4 Letters.*  
    Theoretical Computer Science 410 (2009), 3893–3900.  
    DOI: 10.1016/j.tcs.2009.05.027.

12. **Currie, J.; Mol, L.; Rampersad, N.; Shallit, J.**  
    *Extending Dekking's Construction of an Infinite Binary Word Avoiding Abelian 4-Powers.*  
    SIAM Journal on Discrete Mathematics 38(4):2913–2925, 2024.  
    DOI: 10.1137/23M1558513.  
    arXiv:2111.07857.

13. **Samsonov, A. V.; Shur, A. M.**  
    *On Abelian Repetition Threshold.*  
    RAIRO — Theoretical Informatics and Applications 46(1):147–163, 2012.

14. **Shur, A. M.**  
    *Growth Rates of Complexity of Power-Free Languages.*  
    Theoretical Computer Science 411 (2010), 3209–3223.

15. **Mitchell, A.**  
    *On Word Complexity and Topological Entropy of Random Substitution Subshifts.*  
    Proceedings of the American Mathematical Society, 2024.  
    DOI: 10.1090/proc/16893.

16. **Gohlke, P.; Mitchell, A.; Rust, D.; Samuel, T.**  
    *Measure Theoretic Entropy of Random Substitution Subshifts.*  
    Annales Henri Poincaré, 2023.  
    arXiv:2105.11224.

17. **Shen, Y.; Shangguan, C.; Lin, Z.; Ge, G.**  
    *Constrained Coding Upper Bounds via Goulden–Jackson Cluster Theorem.*  
    arXiv:2407.16449, 2024.

18. **Bentley, J. L.; Sleator, D. D.; Tarjan, R. E.; Wei, V. K.**  
    *A Locally Adaptive Data Compression Scheme.*  
    Communications of the ACM 29(4):320–330, 1986.  
    DOI: 10.1145/5684.5688.

---

# 22. Final novelty boundary

The safest current partition is:

\[
\boxed{\text{CLASSICAL INFRASTRUCTURE}}
\]

- weighted automata;
- rational/Hankel minimality;
- PSR/OOM observability;
- basis selection;
- transfer/Perron entropy;
- Abelian templates;
- morphic boundary corrections;
- multi-valued substitutions;
- recency ranking;

combined with

\[
\boxed{\text{POTENTIALLY NEW ABELIAN-SPECIFIC RESULTS}}
\]

- exact selected-library semantic hierarchy;
- natural count/equitable separation inside the Q2 system;
- latent persistent-injection counterexamples;
- no-go results for static local state descriptors;
- recency-frame + four-profile + one-bit full statewise observability.

Paper 6 should cite the classical layer aggressively and locate its scientific
claims in the explicit Abelian structure, exact certificates, negative
theorems, and any generalization of the one-bit structural measurement result.
