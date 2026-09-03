# Paper 8 next research plan

## Priority 0 — freeze this checkpoint

Do not modify the stored master package. Work in a new copy/worktree. H9 stays closed.

## Priority 1 — first rigorous continuum certificate: profile (5,2,1)

Why first: its S3 target ranks are only 8 (trivial) and 16 (standard), while the observed sign margin is very large.

Target theorem:

\[
C_{521}(x)>0\quad\forall x\in[0,1].
\]

Preferred route:

1. factor the hard-graph perturbations exactly as U V^T in trivial and standard blocks;
2. express Perron branch by the finite return kernel K_T(lambda);
3. express standard susceptibility through Woodbury with the 16-dimensional defect matrix;
4. use interval arithmetic / residual-certified linear solves on a finite subdivision in x;
5. handle x=0 by the stored isolated hard Perron SCC formula;
6. preserve explicit enclosures, not just point values.

## Priority 2 — scale certificates

If (5,2,1) succeeds:

1. (4,2,2): ranks 49/98;
2. (4,3,1): ranks 73/146; exploit the strong S3-orbit curvature positivity found numerically;
3. (3,3,2): ranks 480/960 and mixed orbit signs; leave this hardest case last.

## Priority 3 — prove the structural propositions cleanly

Write theorem/lemma-grade proofs for:

- full-shift B/S curvature formula;
- constrained local threshold formula;
- strong lumping / quotient preservation;
- S3 trivial + standard decomposition;
- standard-susceptibility variance formula;
- low-rank determinant / return-kernel identity;
- hard-endpoint one-sided perturbation.

The paper should not depend on a reader trusting a 104,520-state numerical black box.

## Priority 4 — mechanism, not just certification

Use the return kernel to identify which returns/overlaps control the correction Gamma. Relate this to pattern correlation / autocorrelation matrices where appropriate. The goal is to explain the response, not merely certify four signs.

## Priority 5 — literature kill

Search aggressively before any novelty statement:

- thermodynamic formalism and derivatives of Gibbs/Parry measures;
- pressure Hessians / susceptibility / Green-Kubo response;
- perturbation of Markov additive functionals;
- group inverse / Drazin inverse response formulas;
- forbidden word correlation polynomials and Guibas-Odlyzko-type matrices;
- cluster method / return kernels;
- representation theory in symmetric subshifts / transfer operators;
- recent forbidden-pattern frequency papers.

Classify each component as standard, adapted, or apparently new.

## Priority 6 — manuscript gate

A Paper 8 manuscript should start only after either:

A. a general structural theorem of independent interest is cleanly proved; or
B. at least one nontrivial continuum sign certificate is genuinely rigorous and the novelty audit says the mechanism is publishable.

Do not turn the paper into a 19/19 empirical report if the theorem/mechanism program fails.

## Future H9 gate

Do not open H9 merely to get another data point. Freeze a discriminating prediction protocol first. H9 should be used only if it can distinguish competing mechanisms.
