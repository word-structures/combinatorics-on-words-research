# PAPER 6 — SELECTED-LIBRARY SYMMETRY GAUGE PRINCIPLE v0.1
**Date:** 2026-08-30  
**Status:** classical equivariance principle specialized to Paper 6; supporting lemma, not novelty claim

Let \(B\subseteq\Sigma^L\) be the selected block library and let \(G_B\) be the alphabet-permutation group preserving the complete selected transition problem.

If \(g\in G_B\), then:

- \(gB=B\);
- Abelian-square safety is preserved because Parikh equality is equivariant under coordinate permutation;
- the fixed FORBID4 family used here is also alphabet-permutation invariant;
- hence legal block continuation is equivariant:
  \[
  b\text{ legal after }s
  \iff
  gb\text{ legal after }gs.
  \]
- therefore all-horizon total continuation counts satisfy
  \[
  c_n(gs)=c_n(s).
  \]

Consequently a history alphabet gauge may quotient/canonicalize by \(G_B\) without losing total-count information merely from that symmetry identification.

It is not generally sound to quotient by a larger group.

The HASH30 control demonstrates the practical consequence:

\[
G_{\rm HASH30}=\{\mathrm{id}\},
\]

and forcing a full \(S_3\) recency canonicalization reduces the measured future rank, whereas fixed alphabet orientation recovers the exact future dimension.

For the symmetric libraries used in the current Paper-6 pilots:

\[
G_{\rm FULL\,L4}
=
G_{\rm BAL3\,L4}
=
G_{\rm INTERIOR\,L5}
=
S_3.
\]

This lemma is ordinary group equivariance. It should be cited/used as structural hygiene, not sold as a new theorem.
