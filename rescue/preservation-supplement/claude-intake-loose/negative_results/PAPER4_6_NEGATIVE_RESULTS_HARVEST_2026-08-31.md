# Research Dead Ends, Negative Results, and Lessons Learned from Papers 4–6

**Date:** 2026-08-31  
**Status:** Research-summary / negative-results harvest candidate  
**Repository:** `word-structures/combinatorics-on-words-research`  
**Purpose:** Preserve what has been learned from the Paper 4–6 research cycle, especially the long sequence of falsified or demoted hypotheses in Paper 6, so that future researchers and AI agents do not repeat already-tested routes.

> **Core principle:** A failed theorem story is not failed research.  
> A disproved mechanism, a non-generalizing identity, or a novelty claim killed by prior art is reusable mathematical information.

---

## 1. Why this document exists

The repository already contains `NEGATIVE_RESULTS.md`, whose stated purpose is to archive ideas that were proven wrong, insufficient, context-dependent, or simply not worth pursuing further.

That file is now substantially behind the actual research frontier.

The Paper 4–6 research cycle, and especially Paper 6, has generated a large body of negative and adversarial results that should be preserved before further work begins. The purpose of this document is to collect those lessons in one place before they are converted into permanent numbered entries in `NEGATIVE_RESULTS.md`.

This is **not** a claim ledger and does not promote unreviewed Paper 6 findings to canonical mathematical claims. Exact numerical findings that remain outside `MATH_CLAIMS.md` should continue to be treated as research-checkpoint material until separately promoted.

---

# 2. The main lesson of the Paper 4–6 cycle

The strongest methodological lesson is:

\[
\boxed{
\text{computational surprise}
\neq
\text{mechanism}
\neq
\text{general theorem}
\neq
\text{historical novelty}
}
\]

These four levels repeatedly appeared to coincide during discovery and then separated under adversarial testing.

A result may be:

1. **exactly computed but representation-dependent;**
2. **structurally real but instance-specific;**
3. **general but already known under different terminology;**
4. **mathematically correct but too weak for a paper;**
5. **historically novel but not yet proved;**
6. **proved but not historically novel.**

The Paper 6 research program has been valuable precisely because it has repeatedly forced these distinctions.

---

# 3. Paper 4 as the positive control

Paper 4 provides the clearest example of what a successful theorem line looks like.

Its final mathematical core did not remain a collection of suggestive computations. It converged to a compact general classification:

- 6 physical carry domains;
- 34 physically realizable domain/mask patterns;
- 19 equivalence classes of complete reduced unresolved-support sets;
- valid for every \(L \ge 5\) under the stated one-unresolved-role setting.

The result then survived:

- proof closure;
- independent kill testing;
- novelty review;
- reproducibility closure;
- hostile-referee review;
- artifact closure.

This gives an important comparison point for Paper 6:

> **A paper does not emerge because many exact phenomena have been found. It emerges when one mathematical statement survives mechanism analysis, generalization, adversarial testing, and novelty review.**

Paper 4 survived that pipeline.

The current Paper 6 candidate stories have not yet done so.

---

# 4. Paper 3 / profile-response line: an important parallel warning

The current profile-response research direction contains a striking finite observation:

- in the audited \(h=2,\ldots,7\) profile family, the sign of the hard-deletion asymptotic-variance response splits perfectly between the minimum-\(B\) profiles and the remaining profiles.

However, the repository correctly keeps the mechanism unresolved.

The current research authority explicitly distinguishes:

\[
\text{composition geometry}
\]

from

\[
\text{overlap / return / correlation dynamics}
\]

and forbids promoting \(B(v)\) from classifier to cause without a derivation.

This is the same methodological lesson that Paper 6 has repeatedly reinforced:

\[
\boxed{
\text{perfect finite classification}
\neq
\text{causal mechanism}
}
\]

and

\[
\boxed{
\text{exact algebraic fit}
\neq
\text{general theorem}.
}
\]

The decision to keep \(h=8\) on HOLD until a mechanism-focused preregistered test is therefore an important positive example of research discipline.

---

# 5. Paper 6: what was tried, what failed, and what survived

Paper 6 has been a particularly productive source of negative results.

The following chronology summarizes the principal theorem stories that were proposed, tested, and then either falsified, demoted, or reformulated.

---

## 5.1 Future-count dimension as the theorem core

### Initial idea

Build an exact finite-state future-count model and treat the dimension of the rational future space as the central structural result.

This produced highly nontrivial exact quantities:

- transition/equitable quotients;
- all-horizon count equivalence;
- Krylov/future-space dimensions;
- transient and persistent decomposition.

### What happened

The calculations were real and valuable, but a large part of the surrounding interpretation belonged to established linear algebra, weighted automata, observability, Hankel-rank, and realization theory.

### Lesson

\[
\boxed{
\text{large exact rank}
\neq
\text{new combinatorial theorem}
}
\]

Future-count dimension is useful machinery, but its abstract existence and observability interpretation cannot carry the novelty claim by themselves.

---

## 5.2 Near-optimal space–time observability

### Initial idea

Parikh-profile measurements appeared to achieve extremely efficient space–time observability indices.

This initially looked like a special structural property of the Abelian system.

### Kill test

Compare the observed indices to generic row-count lower bounds and to random covectors/partitions.

### Result

Much of the apparent optimality was what generic linear algebra already predicts once the number of measurement rows is taken into account.

### Status

**Demoted as a Paper 6 novelty story.**

### Lesson

A numerically optimal observability index can be mathematically correct and still be almost completely non-special.

---

## 5.3 The 35-dimensional static hidden sector as a startup artifact

### Initial hypothesis

The original FULL-L4/Q2 static profile measurement had a 35-dimensional hidden sector. A plausible explanation was that the defect came from mixed startup/saturated phase information.

### Kill test

Remove startup entirely and work on saturated and persistent subsystems.

### Result

The degeneracy did **not** disappear.

It became substantially larger.

### Status

The startup-artifact explanation was falsified.

### Lesson

This was a genuine negative result in the productive sense:

> a plausible simplifying explanation failed, proving that the phenomenon was deeper than the original representation artifact.

---

## 5.4 Profile-incidence rank collapse as the direct mechanism

### Initial idea

The profile-to-state incidence matrix already showed a large rank collapse before future dynamics were introduced.

This suggested that the core phenomenon might be a static "profile-incidence screening" law.

### Kill tests

The relation space was decomposed and examined for:

- dead-state contributions;
- proportional rows;
- local suffix structure;
- different semantic quotients.

### Result

A substantial part of the first large kernel was explained by comparatively trivial structure such as dead states and proportional incidence rows.

A nontrivial remainder survived, but the original headline interpretation was too strong.

### Status

**Partial survival, major demotion.**

### Lesson

A large nullspace must be decomposed before it is interpreted.

The nullity itself is not a mechanism.

---

## 5.5 Right-context semantics as the missing invariant

### Initial idea

Perhaps the aliasing that survived profile-incidence analysis was really a language-theoretic future-equivalence phenomenon.

### Tests

Replace or compare weighted/counting semantics with deterministic right-context semantics.

### Result

Some exact relation structure survived, but not all of it.

Different semantics preserved different portions of the original relation basis.

This exposed another trap:

> individual basis relations are not basis-invariant evidence of a shared mechanism.

A later kernel-intersection analysis was needed to identify the actual common subspace.

### Lesson

\[
\boxed{
\text{relation basis}
\neq
\text{invariant relation space}
}
\]

Cross-semantics comparison must be performed at the subspace level.

---

## 5.6 Beautiful small L5 identities as a universal law

### Initial observation

In INTERIOR-L5/Q1, several exact low-support linear identities appeared between profile families.

Some had very simple coefficients and looked highly theorem-like.

### Tempting interpretation

These might reflect a local Parikh/cutpoint mechanism that generalizes across systems.

### Adversarial transfer tests

Freeze the identities and test them without coefficient refitting under:

- \(K=8\);
- \(K=10\);
- FULL-L5 at \(K=9\).

### Result

The frozen identities failed outside the original setting.

### Status

\[
\boxed{\text{exact finite identities, not a universal law}}
\]

### Lesson

A beautiful coefficient identity may be instance-specific even when it is exact.

Small support is not evidence of universality.

---

## 5.7 One-step response aliasing as the mechanism

### Initial idea

The surviving semantic relations might already be explained by equality or linear dependence of complete legal-next-block response sets.

### Result

The one-step response kernel was much larger than the semantically stable kernel.

Therefore one-step aliasing alone did not explain which relations survive into full future semantics.

### Status

**Falsified as the complete mechanism.**

### Lesson

\[
\text{same one-step response}
\not\Rightarrow
\text{same full semantic relation structure}.
\]

---

## 5.8 Weighted state + one-step response as sufficient closure

### Initial idea

Perhaps weighted/equitable state plus complete one-step legal response already captured everything relevant to the full future-language relation space.

### Result

It did not.

An additional recurrent/raw-cyclic distinction was needed in the tested finite systems.

### Status

**Original closure hypothesis falsified.**

A stronger descriptor happened to reproduce the same family-rank in several instances, but later analysis showed that rank neutrality could arise from ordinary column-space saturation rather than a deep semantic factorization.

### Lesson

A successful low-dimensional descriptor is not automatically a theorem mechanism.

One must prove why refinement adds no rank.

---

## 5.9 Local coarse-to-fine fiber proportionality

### Initial idea

If a coarse descriptor and a much finer future partition have the same family rank, perhaps every coarse fiber has rank one after refinement.

That would give a clean local factorization theorem.

### Result

FULL-L4/Q2 produced rank-2 fibers.

The local factorization failed.

A depth-2 repair also failed for one residual case.

### Status

**Falsified.**

### Lesson

Global rank equality can result from nonlocal column-space dependencies even when no simple fiberwise factorization exists.

---

## 5.10 True-grid rank neutrality as special Parikh/future alignment

### Initial idea

The true Parikh grid might align with future refinement in a uniquely special way.

### Kill tests

- conditional random split controls;
- alternate anchor grids;
- direct coordinate-span analysis.

### Result

The same rank-neutrality persisted under randomized fine splits once the coarse family column space was held fixed.

Other anchors could also be rank-neutral.

The explanation was largely ordinary column-space saturation.

### Status

**Falsified as a special Parikh/future-alignment mechanism.**

### Lesson

A natural structured measurement may look special because of a linear-algebraic saturation property that survives randomization.

---

## 5.11 Bounded Parikh-obstacle hierarchy as the new theorem

### New direction

After repeated rank-based failures, the research returned to the Abelian-square definition itself.

For a history \(s\), continuation prefix length \(j\), and half-period \(k\), the long-root obstruction can be written through a second-difference target of the form

\[
R_{k,j}(s)
=
S_{2k-j}(s)-2S_{k-j}(s).
\]

This leads naturally to finite target sets \(T_j(s)\) controlling which Parikh-prefix vectors of a bounded continuation are forbidden.

A graded transport law describes how deeper target layers move toward the active boundary under block extension.

### Mathematical result

This machinery is general and exact.

### Novelty kill

The underlying second-difference / Parikh-boundary machinery is closely related to established template/ancestor methods and to earlier project work on symbolic suffixes and FORBID4.

In particular, the main algebraic identity can be viewed as a reparameterization of a second-difference formulation already present in the project's earlier research.

### Status

\[
\boxed{
\text{mathematics survives; proposed novelty mostly does not}
}
\]

### Lesson

This became one of the clearest examples of the new AI-novelty governance principle:

> An AI-generated derivation can be mathematically correct while rediscovering known mathematics or even earlier work from the same project.

---

## 5.12 Polynomial Parikh-DP extension compiler

### Result

Once target layers are known, safe continuations of fixed length can be counted through a Parikh-composition dynamic program rather than literal enumeration.

For fixed alphabet size, the number of Parikh-prefix states grows polynomially in the extension length.

### Assessment

This is a useful algorithmic consequence.

However, it follows naturally from the target formulation and does not currently appear strong enough to carry Paper 6 by itself.

### Lesson

A useful algorithmic corollary is not automatically a paper-level novelty contribution.

---

## 5.13 Binary obstacle-layer reachability

### Result

The binary case produced an exact reachability characterization for individual target layers.

The resulting subset enumeration connects to a known Fibonacci-type subset-counting sequence.

### Novelty assessment

The classification may still be mathematically useful, but the counting structure itself is known and the result appears too modest to serve as Paper 6's main theorem.

### Lesson

A clean exact theorem can still be the wrong theorem for the paper.

---

## 5.14 Ternary single-layer reachability

### Initial hope

The binary reachability restriction might generalize to the ternary case.

### Result

For the smallest tested ternary layer, every possible subset was realizable.

### Status

The direct ternary analogue of the binary restriction was killed.

### Lesson

The interesting constraints, if any, must arise from **cross-layer compatibility**, not from that single layer alone.

---

## 5.15 Ternary cross-layer reachability

### Current open observation

For a small \((T_1,T_2)\) test space there are 512 theoretically possible pairs.

Search found 491.

21 remained unfound.

### Governance status

\[
\boxed{
\text{not found}
\neq
\text{impossible}
}
\]

No theorem is currently authorized from this gap.

### Why it remains interesting

This is one of the few current Paper 6 directions that is still genuinely open rather than already falsified or novelty-demoted.

A worthwhile theorem would require:

1. a coefficient-free necessary compatibility condition;
2. a proof that it excludes the missing patterns;
3. a construction for every allowed pattern;
4. only then a novelty review.

---

# 6. Candidate additions to `NEGATIVE_RESULTS.md`

The following entries should be considered for permanent numbered inclusion after evidence/path audit.

The numbering below is provisional and assumes the existing file currently ends at §24.

---

## Candidate §25 — Near-optimal observability as evidence of special combinatorial structure

**Hypothesis:** The observed profile-space–time spectrum is special because the natural Parikh measurement reaches nearly minimal observability depth.

**Why it collapsed:** The first three depths were largely forced by row-count lower bounds and behaved like generic covectors.

**Finality:** likely **CONTEXTUAL / NECESSARY as a novelty claim**.

**Permanent lesson:** Compare structured measurements against generic dimensional baselines before attributing combinatorial meaning to an optimal rank profile.

---

## Candidate §26 — Static hidden dimensions as a startup-phase artifact

**Hypothesis:** The original profile-rank deficiency was caused by mixed startup/saturated states.

**Why it collapsed:** Saturated and persistent analyses retained, and in some cases enlarged, the hidden sector.

**Finality:** **NECESSARY** for the tested explanation.

**Permanent lesson:** Startup phase is not the underlying cause of the observed profile aliasing.

---

## Candidate §27 — Raw profile-incidence nullity as the mechanism

**Hypothesis:** The full incidence nullity directly measures a deep Parikh screening law.

**Why it collapsed:** Large parts were attributable to dead-state and proportional-row structure.

**Finality:** **CONTEXTUAL**.

**Permanent lesson:** Decompose nullspaces into trivial, proportional, and genuinely additive sectors before structural interpretation.

---

## Candidate §28 — One-step legal-response aliasing as the complete future mechanism

**Hypothesis:** The stable future relation kernel is exactly the one-step-response kernel.

**Why it collapsed:** The one-step kernel was much larger in all tested systems.

**Finality:** **NECESSARY** for the tested systems.

**Permanent lesson:** One-step equality is a necessary clue but not a sufficient explanation of all-horizon semantic relations.

---

## Candidate §29 — Fixed-last-two profile locality as a universal screening theorem

**Hypothesis:** All nontrivial relation structure is generated inside fibers with the two newest Parikh profiles fixed.

**Why it collapsed:** FULL-L4/Q1 retained genuinely nonlocal additive dimensions after proportional relations were removed.

**Finality:** **NECESSARY** as a universal statement.

**Permanent lesson:** Locality observed in Q2 and L5 does not generalize automatically across profile systems.

---

## Candidate §30 — Small exact L5 identities as universal obstruction laws

**Hypothesis:** The low-support L5 relations encode a general Abelian cutpoint identity.

**Why it collapsed:** Frozen identities failed under nearby \(K\)-perturbations and FULL/INTERIOR changes.

**Finality:** **NECESSARY** as a universal law; the original finite identities remain exact.

**Permanent lesson:** Exact low-support identities require transfer tests before being interpreted as general mechanisms.

---

## Candidate §31 — Weighted state plus one-step response as complete future semantics

**Hypothesis:** Weighted/equitable class plus the full one-block legal response determines all family-relevant full-future distinctions.

**Why it collapsed:** The descriptor was insufficient without additional recurrent-stratum information, and later full-refinement equality was explained partly by column-space saturation rather than a local semantic theorem.

**Finality:** **CONTEXTUAL / NECESSARY for the stated descriptor**.

---

## Candidate §32 — Fiberwise rank-one refinement as the reason coarse and full future ranks agree

**Hypothesis:** Every coarse semantic cell splits into full-future cells in family-independent proportions.

**Why it collapsed:** Exact rank-2 fibers occurred.

**Finality:** **NECESSARY**.

**Permanent lesson:** Equal global rank does not imply local rank-one factorization.

---

## Candidate §33 — True-grid rank neutrality as special Parikh/future alignment

**Hypothesis:** The natural grid uniquely aligns with deeper future semantics so that refinement adds no rank.

**Why it collapsed:** Conditional randomized refinements preserved rank, and other anchor grids could also be neutral.

**Finality:** **NECESSARY** for the claimed special mechanism.

**Permanent lesson:** Hold the coarse column space fixed before attributing rank neutrality to natural semantic alignment.

---

## Candidate §34 — Bounded Parikh-obstacle hierarchy as a new theorem by itself

**Hypothesis:** The finite target-layer and graded transport formulation is the new Paper 6 theorem.

**Why it collapsed as a novelty claim:** The central second-difference and boundary-correction machinery overlaps strongly with existing Abelian template/ancestor mathematics and with earlier project symbolic-suffix work.

**Finality:** **CONTEXTUAL as mathematics; NECESSARY as an unsupported novelty claim**.

**Permanent lesson:** A clean new formulation is not necessarily a new theorem.

---

## Candidate §35 — Binary obstacle-layer reachability as a sufficiently strong Paper 6 theorem

**Hypothesis:** The binary reachability characterization could serve as the main new result.

**Why it was demoted:** The result is exact but appears modest, and its counting consequence belongs to a known Fibonacci subset-enumeration family.

**Finality:** **CONTEXTUAL**.

**Permanent lesson:** A theorem can be correct and elegant yet too weak or too close to known combinatorics to justify the intended paper.

---

# 7. Cross-paper lessons worth preserving

The Paper 4–6 cycle has produced several project-wide research rules that should be retained independently of any specific theorem.

### 7.1 Exact arithmetic does not guarantee correct interpretation

An exact rank, exact certificate, or zero residual proves the computed statement under the implemented model.

It does not prove:

- that the model is the right semantic object;
- that the chosen normalization is harmless;
- that a basis has invariant meaning;
- that the phenomenon is general;
- that the result is novel.

---

### 7.2 Basis-level beauty is dangerous

A few short relations with small coefficients can be visually persuasive.

The correct invariant question is about:

- the relation subspace;
- quotient by trivial/proportional sectors;
- transfer under semantic changes;
- transfer under parameter perturbations.

---

### 7.3 Random controls must preserve the right nuisance structure

A weak random partition can exaggerate the apparent specialness of the natural partition.

The strongest controls used in Paper 6 preserved increasingly much of the nuisance structure:

- family sizes;
- recent profile;
- membership strata;
- semantic support masks;
- coarse incidence.

This repeatedly changed the interpretation of positive results.

---

### 7.4 Cross-instance transfer is a theorem gate

No finite identity should be promoted to a mechanism until it survives a preregistered perturbation where the coefficients and classification rule are frozen in advance.

Paper 6 repeatedly showed why.

---

### 7.5 Novelty review must be adversarial

The correct question is not:

> "Can we find papers that look different from ours?"

It is:

> "Assume our result is old. Under what other vocabulary, field, or stronger theorem would it already exist?"

Paper 6's obstacle hierarchy survived mathematically but was strongly demoted under exactly this test.

---

### 7.6 Negative results must be recorded before the next idea

Otherwise AI-assisted research has a strong tendency to rediscover an old dead end with new terminology.

The repository's `NEGATIVE_RESULTS.md` is therefore not historical decoration. It is an active search-space constraint.

---

# 8. What remains genuinely open

The negative-results harvest should not give the impression that all Paper 6 directions are closed.

Several questions remain legitimate.

### A. Ternary cross-layer realizability

Can the joint target layers \((T_1,T_2,\ldots)\) be characterized by explicit compatibility laws?

The current 491/512 observation is only a search observation.

### B. Partial-target realizability / Paper 5 bridge

A recurring unresolved distinction throughout Paper 6 is:

\[
\boxed{
\text{algebraically admissible}
\quad\text{vs.}\quad
\text{realizable by an actual word / morphic configuration}.
}
\]

This may be exactly the missing interface that the planned Paper 5 partial-target / parent-feasibility theory was supposed to address.

A Paper 5 theorem-core audit is therefore a high-information next step.

### C. New avoidance consequences

The obstacle machinery may still be useful if it proves something genuinely new about:

- guaranteed safe extensions;
- lower bounds on extension counts;
- dead-end impossibility;
- reachable obstruction hierarchies;
- or FORBID4 / Mäkelä-oriented constructions.

The machinery itself should no longer be treated as the novelty.

---

# 9. Recommended immediate repository action

Before starting new theorem search:

1. audit the evidence paths for the candidate §25–§35 entries;
2. decide finality (`NECESSARY`, `BOUNDED`, `CONTEXTUAL`) entry by entry;
3. append only those whose evidence is stable enough to `NEGATIVE_RESULTS.md`;
4. preserve superseded/invalidated Paper 6 checkpoint artifacts rather than silently replacing them;
5. link each negative result to the certificate, preregistration, or audit that killed it;
6. then perform the Paper 5 theorem-core / novelty / dependency audit.

The goal is not bureaucracy.

The goal is to make it difficult for any future human or AI researcher to accidentally restart one of these already-tested routes.

---

# 10. Final assessment

Paper 6 has so far produced many more falsified theorem stories than surviving theorem candidates.

That is not a weakness of the research process.

It is evidence that the project is doing something unusually important correctly:

\[
\boxed{
\text{we are allowing attractive explanations to die.}
}
\]

The strongest current lesson is therefore not a Paper 6 theorem.

It is a research discipline:

> **Do not promote an exact phenomenon until its mechanism survives transfer, its semantics survives adversarial reformulation, and its novelty survives prior-art attack.**

Paper 4 shows what happens when a result survives.

Paper 6 shows how much work is sometimes required before we know that a result has not.

Both are valuable outcomes.
