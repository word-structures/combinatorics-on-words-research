const fs = require('fs');

const indexRows = [
  "| 2026-08-31 | [§34](#34-binary-obstacle-layer-reachability-as-paper-6-main-theorem) | **CONTEXTUAL** | Binary exact subset reachability | The reachability is mathematically exact but not currently selected as the Paper 6 theorem core. |",
  "| 2026-08-31 | [§33](#33-polynomial-parikh-dp-extension-compiler-as-a-novel-algorithm) | **CONTEXTUAL** | The Parikh-composition DP | Once the finite obstacle formulation is given, the dynamic-programming step is generic and by itself does not establish standalone algorithmic novelty. |",
  "| 2026-08-31 | [§32](#32-bounded-parikh-obstacle-hierarchy-as-a-novel-theorem-by-itself) | **CONTEXTUAL** | Target-transport hierarchy novelty | The second-difference boundary-correction ingredients overlap substantially with established template/ancestor methods; standalone novelty was not established. |",
  "| 2026-08-31 | [§31](#31-local-coarse-to-fine-fiber-proportionality) | **NECESSARY** | Fiberwise rank-1 refinement | FULL-L4/Q2 produced rank-2 fibers, breaking local factorization. |",
  "| 2026-08-31 | [§30](#30-one-step-response-aliasing-as-the-mechanism) | **NECESSARY** | One-step legal continuation | One-step kernel is much larger than the true semantic future-equivalence kernel. |",
  "| 2026-08-31 | [§29](#29-small-exact-l5-identities-as-a-universal-law) | **NECESSARY** | Simple exact local relations | Perturbations and FULL-L5 broke the universality of INTERIOR-L5/Q1 identities. |",
  "| 2026-08-31 | [§28](#28-profile-incidence-rank-collapse-as-the-direct-semantic-mechanism) | **CONTEXTUAL** | Static profile incidence collapse | Collapse is real (e.g. 197 raw profile proportional relations), but explained largely by structural aliasing, not deep future semantics. |",
  "| 2026-08-31 | [§27](#27-the-35-dimensional-static-hidden-sector-as-a-startup-artifact) | **NECESSARY** | Startup phase explaining hidden rank | Saturated Q2 measurements showed an even larger rank deficiency (326 dims). |",
  "| 2026-08-31 | [§26](#26-near-optimal-space-time-observability) | **CONTEXTUAL** | Observability indices as Abelian-special | Generic linear algebra bounds achieve these indices, making this unviable as a standalone Abelian structural theorem. |",
  "| 2026-08-31 | [§25](#25-future-count-dimension-as-the-theorem-core) | **CONTEXTUAL** | Large exact rank implies new theorem | Dimension bounds are generic Hankel-rank/observability consequences. |"
].join('\n');

const entries = `

## 25. Future-count dimension as the theorem core

**Hypothesis:** An exact finite-state future-count model producing a highly nontrivial rational future space dimension (e.g. FULL-L4/Q2) is a central structural theorem.

**Test / attack:** Evaluate whether the rank phenomenon implies a new combinatorial constraint.

**Why it failed or was insufficient:** The large exact rank is a generic consequence of linear algebra, weighted automata, and Hankel-rank observability theory.

**What remains true:** The transition/equitable quotients and Krylov dimensions are exactly correct finite computational measurements.

**Finality:** CONTEXTUAL

**Evidence:** \`docs/research/intakes/2026-08-27_CLAUDE_PROFILE_RESPONSE_MECHANISM_INTAKE.md\`

**Do not retry as:** A claim that a large exact state-space dimension alone constitutes a new combinatorial theorem on words.

## 26. Near-optimal space-time observability

**Hypothesis:** The extremely efficient space-time observability indices of FULL-L4/Q2 Parikh-profile measurements prove a special structural property of the Abelian system.

**Test / attack:** Compare the observed indices to generic row-count lower bounds and random partition controls.

**Why it failed or was insufficient:** The apparent optimality largely matches generic linear algebra predictions once the number of measurement rows is factored in, killing the special Abelian novelty interpretation.

**What remains true:** The Abelian system does achieve these indices, making it computationally tractable.

**Finality:** CONTEXTUAL

**Evidence:** \`docs/research/intakes/2026-08-27_CLAUDE_PROFILE_RESPONSE_MECHANISM_INTAKE.md\`

**Do not retry as:** A novelty claim about Abelian structure based purely on optimal linear-algebraic index bounds.

## 27. The 35-dimensional static hidden sector as a startup artifact

**Hypothesis:** The FULL-L4/Q2 static profile measurement's 35-dimensional hidden sector is a defect caused by mixed startup/transient phase information.

**Test / attack:** Remove the startup sequence entirely and measure saturated/persistent subsystems.

**Why it failed or was insufficient:** The saturated subsystem exhibited an even more profound rank deficiency (rank 850 vs space 1176, or 326 hidden dimensions).

**What remains true:** The original 35-dimensional deficiency and the saturated 326-dimensional deficiency are both exact mathematical realities.

**Finality:** NECESSARY

**Evidence:** \`docs/research/intakes/2026-08-27_CLAUDE_PROFILE_RESPONSE_MECHANISM_INTAKE.md\`

**Do not retry as:** An assumption that static rank deficiencies can be "cleaned up" by simply ignoring early history blocks.

## 28. Profile-incidence rank collapse as the direct semantic mechanism

**Hypothesis:** The large rank collapse in the profile-to-state incidence matrix provides the direct underlying semantic law of future equivalence.

**Test / attack:** Decompose the raw profile relation space and analyze dead states and exact local aliasing.

**Why it failed or was insufficient:** The incidence collapse is heavily driven by structural dead states and rational proportional aliasing (exactly 197 two-row raw proportional relations found) rather than universally deep language-theoretic future equivalence.

**What remains true:** The raw incidence matrix accurately measures the constrained subspace of the dynamic system.

**Finality:** CONTEXTUAL

**Evidence:** \`docs/research/intakes/2026-08-27_CLAUDE_PROFILE_RESPONSE_MECHANISM_INTAKE.md\`

**Do not retry as:** A claim that static incidence rank collapse is identical to true right-context equivalence.

## 29. Small exact L5 identities as a universal law

**Hypothesis:** The highly attractive low-support linear identities between profile families in INTERIOR-L5/Q1 reflect a universal local cutpoint mechanism.

**Test / attack:** Generalize the identities across different K values and the FULL-L5 space.

**Why it failed or was insufficient:** Global boundary perturbations and full L5 conditions destroyed the exact universality of the isolated identities.

**What remains true:** The identities remain exactly mathematically true in their original bounded INTERIOR-L5/Q1 setting.

**Finality:** NECESSARY

**Evidence:** \`scratch/SANDBOX_REPORT_PHASE_A_CORRECTED.md\`

**Do not retry as:** A claim that a beautiful finite identity found at one length universally generalizes without explicit boundary-repair proofs.

## 30. One-step response aliasing as the mechanism

**Hypothesis:** Equality or linear dependence of complete one-step legal-next-block response sets completely explains future semantic equivalence.

**Test / attack:** Compare the one-step response kernel with the semantically stable long-range future kernel.

**Why it failed or was insufficient:** The one-step response kernel was significantly larger; one-step aliasing fails to capture long-range constraints.

**What remains true:** All frozen semantic relations tested continue to annihilate the one-step response space (it is a valid super-kernel).

**Finality:** NECESSARY

**Evidence:** \`docs/research/intakes/2026-08-27_CLAUDE_PROFILE_RESPONSE_MECHANISM_INTAKE.md\`

**Do not retry as:** A theorem that one-step future behavior implies infinite future equivalence.

## 31. Local coarse-to-fine fiber proportionality

**Hypothesis:** Coarse descriptors refine into fine future partitions via uniform rank-one fibers, yielding a clean local factorization theorem.

**Test / attack:** Directly measure fiber ranks for FULL-L4/Q2 coarse states.

**Why it failed or was insufficient:** The measurements found robust rank-2 fibers, mathematically falsifying universal rank-1 factorization.

**What remains true:** The global rank equality between descriptor spaces holds, but is achieved through a more complex distributed overlap rather than local fibers.

**Finality:** NECESSARY

**Evidence:** \`docs/research/intakes/2026-08-27_CLAUDE_PROFILE_RESPONSE_MECHANISM_INTAKE.md\`

**Do not retry as:** A universal local rank-1 factorization hypothesis.

## 32. Bounded Parikh-obstacle hierarchy as a novel theorem by itself

**Hypothesis:** The formulation of Abelian-square long-root obstructions as a hierarchy of second-difference bounded target layers is a novel theorem.

**Test / attack:** Adversarial novelty kill against combinatorial literature.

**Why it failed or was insufficient:** The second-difference / Parikh boundary-correction ingredients overlap substantially with established template/ancestor methods; standalone novelty for this formulation was therefore not established.

**What remains true:** The mathematical identities and derivations of the target hierarchy are perfectly correct and algorithmically valid.

**Finality:** CONTEXTUAL

**Evidence:** \`docs/research/intakes/2026-08-27_CLAUDE_PROFILE_RESPONSE_MECHANISM_INTAKE.md\`

**Do not retry as:** A primary claim of novelty for Paper 6 without shifting the focus to its dynamic state-space/observability implications.

## 33. Polynomial Parikh-DP extension compiler as a novel algorithm

**Hypothesis:** Counting safe continuations via a Parikh-composition dynamic program represents a novel algorithmic compiler technique.

**Test / attack:** Adversarial novelty kill against formal languages literature.

**Why it failed or was insufficient:** Once the finite obstacle formulation is given, the dynamic-programming step is generic and by itself does not establish standalone algorithmic novelty.

**What remains true:** The polynomial bound on prefix-Parikh states for fixed alphabet size is exactly correct.

**Finality:** CONTEXTUAL

**Evidence:** \`docs/research/intakes/2026-08-27_CLAUDE_PROFILE_RESPONSE_MECHANISM_INTAKE.md\`

**Do not retry as:** A standalone algorithmic breakthrough independent of the specific Abelian target setup.

## 34. Binary obstacle-layer reachability as Paper 6 main theorem

**Hypothesis:** The exact binary subset reachability restriction provides a strong enough main theorem for Paper 6.

**Test / attack:** Editorial/project impact kill.

**Why it failed or was insufficient:** Binary reachability is exact, but not currently selected as the Paper 6 theorem core due to its limited scope compared to the broader Abelian-square framework.

**What remains true:** The reachability restriction, subset enumeration, and Fibonacci-type subset-counting sequences are mathematically proven.

**Finality:** CONTEXTUAL

**Evidence:** \`docs/research/intakes/2026-08-27_CLAUDE_PROFILE_RESPONSE_MECHANISM_INTAKE.md\`

**Do not retry as:** The central capstone result for the Paper 6 research arc.
`;

let content = fs.readFileSync('NEGATIVE_RESULTS.md', 'utf8');

// Strip out everything after the §24 index entry in the table, and after ## 24 in the body.
// But we need to keep §24 itself.
// The safe way is to regex out the old additions (I know I added | 2026-08-31 | [§35]... to the top of the table).
const tableHeader = "|---|---|---|---|---|";
const insertPos = content.indexOf(tableHeader) + tableHeader.length;

// Find the line that has | 2026-08-14 | [§24]
const idx24 = content.indexOf("| 2026-08-14 | [&#167;24]"); // Actually in MD it's [§24] or [24]. Let's just find "2026-08-14"
const idx24Pos = content.indexOf("| 2026-08-14 |");
let newTableStart = content.substring(0, insertPos) + '\n' + indexRows + '\n' + content.substring(idx24Pos);

// Now truncate the body at ## 25. Future-count dimension
const idx25Body = newTableStart.indexOf("## 25. Future-count dimension");
if (idx25Body !== -1) {
    newTableStart = newTableStart.substring(0, idx25Body);
}

// Append new entries
newTableStart += entries;

fs.writeFileSync('NEGATIVE_RESULTS.md', newTableStart, 'utf8');
console.log("Updated NEGATIVE_RESULTS.md");
