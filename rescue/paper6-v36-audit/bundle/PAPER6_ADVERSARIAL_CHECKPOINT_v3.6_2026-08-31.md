# PAPER 6 — ADVERSARIAL CHECKPOINT v3.6
**Date:** 2026-08-31  
**Status:** coefficient-free graded transport theorem proved; novelty not promoted

## Headline

v3.5's finite current-response obstacle layers are not update-closed. v3.6
identifies exactly why.

For the generalized suffix target

\[
R_{k,J}(s)=S_{2k-J}(s)-2S_{k-J}(s),
\]

any continuation \(U\) of \(qL\) symbols transports a sufficiently deep target
by

\[
\boxed{
R_{k,j}(sU)=R_{k,j+qL}(s)-\Psi(U).
}
\]

For one appended block \(b\), each active target layer satisfies the exact set
update

\[
\boxed{
T_j(sb)=N_j(s,b)\cup(T_{j+L}(s)-\Psi(b))_{\ge0}.
}
\]

The source term \(N_j\) uses only the appended block and bounded old suffix
fragments; the far term comes from the next target grade.

Thus current response grades \(1,\ldots,L\) fail to be Markov because one
block later they draw information from grades \(L+1,\ldots,2L\). More generally
q-block continuation draws from grade \(j+qL\).

This gives a semi-infinite graded obstruction transport system rather than an
ad hoc finite decoration.

## Validation

All preregistered pointwise and target-set tests passed after one implementation
bounds bug was caught before any result and documented separately.

No rank fitting, quotient semantics, or profile-family coefficients enter the
theorem.

## Paper-6 implication

The most credible theorem architecture now is:

\[
\boxed{
\text{bounded defect / cut generation}
\to
\text{graded Parikh-obstacle transport}
\to
\text{finite prefix-DAG response compiler}.
}
\]

This is substantially more robust than the demoted v2.6--v3.4 observability
stories, but historical novelty remains unresolved.

## Status

\[
\boxed{\text{EXACT GENERAL THEOREM SEED — NOVELTY UNASSESSED}.}
\]

The next gate is a direct equivalence attack against classical Abelian-template
ancestor machinery before any manuscript novelty promotion.
