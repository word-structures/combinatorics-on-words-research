# PAPER 6 — STRUCTURAL OBSERVABILITY CROSS-INSTANCE AUDIT v0.1
**Date:** 2026-08-30  
**Status:** exact finite-system replication + negative controls  
**Purpose:** Test whether the v2.0 Q2 one-bit observability result is a reusable Abelian phenomenon or a single-automaton accident.

---

# 1. Executive result

The **structural-observability principle replicates**, but the literal v2.0 formula

\[
4\text{ profiles}
+
\text{recency frame}
+
1\text{ bit}
\]

is **not universal**.

Across five exact calibrations, the correct picture is:

\[
\boxed{
\text{small recent block-profile measurements often suffice}
}
\]

but

\[
\boxed{
\text{the required depth, boundary bit, and alphabet gauge are library/range dependent}.
}
\]

This is scientifically stronger than blindly replicating the same descriptor.

It gives both:

- a positive cross-instance phenomenon; and
- a sharp negative control telling us what a general theorem must assume.

---

# 2. Exact calibration table

All measurement ranks below were reproduced modulo both odd primes

\[
65521,\qquad65519.
\]

The exact rational future dimensions are independently certified by exact Krylov relations/minors, so a full modular measurement rank certifies the corresponding rational observability rank.

| instance | raw | weighted/equitable | exact future | persistent | first successful tested structural family |
|---|---:|---:|---:|---:|---|
| BAL3 L4, Q1 | 354 | 10 | \(4\) | \(2\) | 2 recency profiles; or 1 profile + bit |
| FULL L4, Q1 | 10,782 | 252 | \(153\) | \(146\) | 3 recency profiles |
| FULL L4, Q2 | 218,298 | 2,691 | \(1179\) | \(1167\) | 4 recency profiles + adjacency bit |
| INTERIOR L5, Q1 | 5,496 | 119 | \(72\) | \(64\) | 3 recency profiles |
| HASH30 L4, K5 | 323 | 76 | \(47\) | \(42\) | 2 **fixed-orientation** profiles |

This is the strongest current evidence that the dual-measurement idea is not merely a peculiarity of the FULL-L4 Q2 automaton.

---

# 3. BAL3 L4, Q1

The selected library consists of the 30 L4 aa2fr blocks containing all three letters.

It is invariant under all six alphabet permutations.

The exact finite system is

\[
354\text{ raw histories}
\to
10\text{ weighted states}.
\]

The complete statewise future-count Krylov dimension is

\[
\boxed{4}.
\]

The exact Krylov recurrence has two initial zero coefficients, so:

\[
\boxed{
4=2+2
}
\]

splits into 2 transient and 2 persistent dimensions.

## Measurements

### One recency-canonicalized block profile

\[
3\text{ families}
\]

gives

\[
3/4
\]

on the full future but already

\[
2/2
\]

on the persistent future.

### One profile + adjacency bit

\[
4\text{ families}
\]

gives

\[
\boxed{4/4}.
\]

### Two profiles, no bit

\[
8\text{ families}
\]

also gives

\[
\boxed{4/4}.
\]

## Consequence

The one-bit correction is **not universally required**.

In this simpler selected library, the full future can be observed either by:

- one recent profile plus the bit; or
- two recent profiles without it.

The persistent future needs even less.

---

# 4. FULL L4, Q1

This is the lower-range control for the same 60-block library used in the v2.0 Q2 theorem.

The exact system is

\[
10782\to252.
\]

The exact vector future dimension is

\[
\boxed{
153=7+146.
}
\]

## Measurement depth

### 1 profile

\[
6/153.
\]

### 2 profiles

\[
51/153.
\]

Adding the adjacency bit raises this only to

\[
62/153.
\]

### 3 profiles

\[
\boxed{
153/153
}
\]

and persistent:

\[
\boxed{
146/146.
}
\]

The result is identical modulo both odd primes.

## Consequence

For the **same selected library**:

\[
Q1:
\quad
3\text{ profiles are sufficient},
\]

whereas the previously certified Q2 result is

\[
Q2:
\quad
4\text{ profiles}+1\text{ bit are sufficient}.
\]

This is the first direct evidence that the structural measurement complexity genuinely increases with block range \(Q\).

---

# 5. INTERIOR L5, Q1 — cross-block-length replication

The selected library contains all 90 internally aa2fr length-5 blocks that use all three letters.

It is fully \(S_3\)-invariant.

The exact system is:

\[
5496\to119
\]

with exact vector future dimension

\[
\boxed{
72=8+64.
}
\]

## Measurement depth

### 1 profile

\[
5/72.
\]

### 2 profiles

\[
26/72
\]

without the bit and

\[
34/72
\]

with it.

### 3 profiles

\[
\boxed{
72/72
}
\]

and persistent

\[
\boxed{
64/64
}.
\]

Again the result is identical modulo 65521 and 65519.

## Consequence

The observability phenomenon crosses block length:

\[
L=4\longrightarrow L=5.
\]

The exact one-bit correction does not replicate here; a depth-three profile window alone suffices.

This is good evidence against overfitting the Q2 bit while supporting the more general structural-measurement program.

---

# 6. Asymmetric HASH30 — decisive gauge control

Define HASH30 as the 30 full-L4 aa2fr blocks with lexicographically smallest SHA-256 digest.

This construction intentionally ignores continuation semantics and is asymmetric.

Its alphabet automorphism group is exactly

\[
\boxed{
G_B=\{\mathrm{id}\}.
}
\]

By contrast, FULL L4, BAL3 L4 and INTERIOR L5 all have the full symmetry group

\[
S_3.
\]

The HASH30 K5 system is:

\[
323\to76
\]

with exact vector future dimension

\[
\boxed{
47=5+42.
}
\]

## Incorrect gauge: full recency canonicalization

Using the same S3-style recency frame as in the symmetric libraries:

### two profiles

\[
41/47,
\qquad
39/42\text{ persistent}.
\]

### two profiles + adjacency bit

\[
44/47,
\qquad
41/42.
\]

So the measurement remains incomplete.

## Correct gauge: fixed alphabet orientation

Because HASH30 has trivial alphabet symmetry, retain the actual \(a,b,c\) orientation.

Two recent oriented block profiles then give:

\[
\boxed{
47/47
}
\]

and persistent:

\[
\boxed{
42/42.
}
\]

## Consequence

This is a strong negative control.

Alphabet canonicalization is not a harmless generic trick.

The gauge must respect the actual selected-library symmetry group.

A general structural theorem should be parameterized by

\[
\boxed{
G_B
=
\{g\in S_\Sigma:\ gB=B\}
}
\]

(or the corresponding symmetry group of the full weighted selected system).

---

# 7. Exact symmetry groups in the tested libraries

Direct enumeration gives:

### FULL L4

\[
|G_B|=6.
\]

### BAL3 L4

\[
|G_B|=6.
\]

### INTERIOR L5

\[
|G_B|=6.
\]

### HASH30 L4

\[
|G_B|=1.
\]

This matches the measurement results exactly at the qualitative level:

- recency/canonical alphabet gauge is useful in the \(S_3\)-invariant systems;
- quotienting by nonexistent S3 symmetry loses information in HASH30.

The general group-equivariance statement is classical symmetry reasoning and is **not** a novelty claim.

Its role here is to prevent a false universalization of the recency-frame construction.

---

# 8. Revised one-bit theorem interpretation

The v2.0 theorem remains exact:

> FULL L4, Q2 has complete raw-history future observability from four recency-canonicalized profiles plus one adjacency bit.

The cross-instance audit changes its interpretation.

Do **not** write:

> “four profiles plus one bit form the universal Abelian state/measurement.”

Instead:

> “In the Q2 calibration, a one-bit boundary decoration closes an otherwise 35-dimensional observability gap. Cross-instance controls show that the required profile depth and decoration are range- and library-dependent.”

That is both more accurate and more interesting.

---

# 9. Emerging empirical law

The present data suggest the following **research hypothesis**, not a theorem.

For a selected library with alphabet symmetry group \(G_B\):

1. quotient/canonicalize only by \(G_B\);
2. retain a bounded recent block-profile window;
3. add a small number of boundary-phase/gauge decorations when required;
4. aggregate raw histories by these structural labels;
5. the resulting family sums may have full continuation-Krylov rank.

In the symmetric Q1 pilots:

- BAL3 L4: depth \(\le2\);
- FULL L4: depth 3;
- INTERIOR L5: depth 3.

For FULL L4 Q2:

- depth 4 alone is insufficient;
- one adjacency bit closes the rank gap.

For asymmetric HASH30 K5:

- fixed orientation + depth 2 suffices;
- inappropriate S3 recency quotient does not.

The next theorem should explain this pattern from boundary geometry rather than merely fit the table.

---

# 10. What this does to novelty confidence

The literature audit established that generic observability is classical.

The present replication gives the Abelian-specific result a stronger scientific basis:

- it now crosses libraries;
- it crosses block lengths;
- it has a same-library Q1/Q2 progression;
- it has an asymmetric negative control;
- it tells us exactly when the alphabet gauge is invalid.

This materially reduces the risk that the v2.0 theorem is merely an accidental rank coincidence.

It does **not** yet establish a universal structural-observability theorem.

---

# 11. Next theorem target

The highest-value next mathematical statement is now:

> **Selected-library symmetry-gauged structural observability.**

A useful theorem would give explicit sufficient conditions under which a family of the form

\[
(\text{recent block Parikh data},
\text{boundary decoration},
G_B\text{-gauge})
\]

has full continuation-Hankel rank.

The proof should use Abelian boundary geometry to derive the required window/decorations.

A weaker but still valuable next step is to identify a cross-instance rule for the required profile depth and the emergence of the Q2 adjacency bit.

---

## Verdict

**Replication gate: PASS, with an important correction.**

The general phenomenon survives:

\[
\boxed{
\text{small combinatorial family measurements can exactly observe the future space}.
}
\]

The literal v2.0 descriptor does not universalize.

The correct emerging object is:

\[
\boxed{
\text{library-symmetry-aware profile measurement}
+
\text{range-dependent boundary decoration}.
}
\]
