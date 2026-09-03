# PAPER 6 — THEORY CORE STATUS v2.2
**Date:** 2026-08-30  
**Status:** cross-instance observability replication checkpoint

## Replication result

The structural-observability principle now holds in several exact finite calibrations.

### BAL3 L4, Q1

\[
354\to10,\qquad
\dim V_{\rm cnt}=4=2+2.
\]

Two recency-canonicalized block profiles give full rank \(4/4\).
One profile + adjacency bit also gives \(4/4\).

### FULL L4, Q1

\[
10782\to252,\qquad
\dim V_{\rm cnt}=153=7+146.
\]

Three recency-canonicalized block profiles give:

\[
153/153,\qquad146/146.
\]

### FULL L4, Q2

Previously certified:

\[
218298\to2691,\qquad
1179=12+1167.
\]

Four profiles alone give 1144/1179; one adjacency bit closes the gap:

\[
1179/1179,\qquad1167/1167.
\]

### INTERIOR L5, Q1

\[
5496\to119,\qquad
72=8+64.
\]

Three recency-canonicalized L5 block profiles give:

\[
72/72,\qquad64/64.
\]

This is a cross-block-length replication.

### HASH30 L4, K5 asymmetric control

\[
323\to76,\qquad
47=5+42.
\]

HASH30 has trivial alphabet symmetry group.

Forcing full recency/S3 canonicalization fails:

\[
44/47
\]

even with the adjacency bit.

Keeping fixed \(a,b,c\) orientation and using two recent block profiles gives:

\[
47/47,\qquad42/42.
\]

## Revised principle

The structural measurement family must respect the actual selected-library alphabet symmetry group

\[
G_B.
\]

The current empirical form is:

\[
\boxed{
G_B\text{-aware alphabet gauge}
+
\text{bounded recent profile window}
+
\text{range-dependent boundary decoration}.
}
\]

The one-bit Q2 theorem is a specific hard-instance calibration, not a universal formula.

## Novelty impact

This materially strengthens the Abelian-specific novelty case after the literature review:

- replication across libraries;
- replication across L=4 and L=5;
- same-library Q1 -> Q2 progression;
- asymmetric negative control;
- exact two-prime rank replication.

The remaining missing ingredient is a general theorem predicting the required measurement depth/decorations.

## Next gate

Derive the profile-window depth / boundary-decoration requirements from the affine bounded-defect geometry, rather than discovering them by rank search.

That is now the clearest path from finite calibrations to a publishable general statement.
