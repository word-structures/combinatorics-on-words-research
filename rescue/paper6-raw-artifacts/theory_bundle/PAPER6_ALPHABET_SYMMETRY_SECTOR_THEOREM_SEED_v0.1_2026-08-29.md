# PAPER 6 — ALPHABET-SYMMETRY SECTOR THEOREM SEED v0.1
**Date:** 2026-08-29  
**Status:** theorem seed + exact/modular audit; not a manuscript

## 1. Motivation

The symmetric Paper-6 pilot libraries show large future-dynamics compression.

Part of that compression has a simple structural explanation:

> the aa2fr safety rule and several selected libraries are invariant under
> permutation of the ternary alphabet.

The resulting transfer operator commutes with the \(S_3\) action.

This gives a rigorous first decomposition of “compression caused by symmetry”
versus “compression caused by deeper future dynamics”.

---

# 2. General equivariance theorem

Let a finite group \(G\) act on the alphabet \(\Sigma\).

Assume:

1. the finite-cutoff safety property is \(G\)-invariant;
2. the selected block library \(B\) is \(G\)-invariant.

Let \(U_g\) be the permutation representation induced by \(g\) on history
states/functions.

For letter transition matrices,

\[
U_g A_\sigma U_g^{-1}=A_{g\sigma}.
\]

For a block word \(w\),

\[
U_g A_w U_g^{-1}=A_{gw}.
\]

Therefore the selected-library transfer operator

\[
M_B=\sum_{w\in B}A_w
\]

satisfies

\[
\boxed{
U_g M_B U_g^{-1}=M_B.
}
\]

Thus \(M_B\) commutes with the group action.

---

# 3. Corollary — future counts are constant on alphabet orbits

The terminal observable

\[
\mathbf1
\]

is \(G\)-invariant.

Since \(M_B\) commutes with every \(U_g\),

\[
M_B^n\mathbf1
\]

is \(G\)-invariant for every \(n\).

Hence if states \(s,t\) lie in the same alphabet-permutation orbit,

\[
\boxed{
c_n(s)=c_n(t)
\quad\text{for every }n.
}
\]

Therefore every \(G\)-orbit lies inside an exact all-horizon count class.

Alphabet-orbit quotienting is thus a **provably sound** first counting
compression whenever the library is group-invariant.

---

# 4. Dimension bound

Let

\[
\operatorname{Fix}(G)
\]

be the invariant function space.

Then the exact unary future-count Krylov space obeys

\[
\boxed{
V_{\rm cnt}\subseteq\operatorname{Fix}(G).
}
\]

For a finite permutation action,

\[
\dim\operatorname{Fix}(G)
=
\#\{\text{state orbits under }G\}.
\]

Thus

\[
\boxed{
\dim V_{\rm cnt}
\le
\#(S/G).
}
\]

This is an exact representation-theoretic upper bound that requires no
look-ahead counting experiment.

---

# 5. Profile operators transform covariantly

Let \(M_p\) be the profile-conditioned operator for block profile \(p\).

Then

\[
\boxed{
U_gM_pU_g^{-1}=M_{gp}.
}
\]

Hence the whole profile future space

\[
V_{\rm prof}
=
\operatorname{span}
\{
M_{p_1}\cdots M_{p_n}\mathbf1
\}
\]

is \(G\)-stable, but it need not lie in the invariant sector.

This gives a structural explanation for the observed hierarchy

\[
\dim V_{\rm prof}
\gg
\dim V_{\rm cnt}.
\]

Retaining the profile labels allows nontrivial representation sectors to be
excited.

Erasing the profile labels replaces the family by

\[
M=\sum_pM_p,
\]

which is group-invariant and keeps the unary orbit of \(\mathbf1\) inside the
trivial sector.

---

# 6. Exact BAL3 L4, Kmax=4 sector decomposition

For the BAL3 profile-selected library:

- raw cutoff states: 78;
- exact profile future linear dimension: 16;
- exact unary counting dimension: 3.

The \(S_3\) decomposition of the exact 16-dimensional profile future space is

\[
\boxed{
16
=
5_{\rm trivial}
+
1_{\rm sign}
+
10_{\rm standard}.
}
\]

Because the standard irreducible representation of \(S_3\) has dimension 2,
the standard component consists of five copies of that representation.

The total-count Krylov space has dimension

\[
\boxed{3}
\]

and lies inside the 5-dimensional trivial component.

Therefore the collapse

\[
16\to3
\]

has a precise first explanation:

- 11 dimensions are nontrivial symmetry sectors and are unavailable to the
  unary total-count orbit from \(\mathbf1\);
- a further \(5\to3\) reduction occurs **inside the trivial sector** and must
  come from deeper counting dynamics.

This is the first exact structural decomposition of a previously observed
Paper-6 semantic compression.

---

# 7. Larger symmetry audits

## BAL3 L4, Kmax=6

- raw states: 210
- \(S_3\) orbits: 35
- every orbit has size 6
- exact count classes: 16
- exact unary Krylov rank: 7
- operator equivariance checks: 2,484
- mismatches: 0

Compression ladder:

\[
\boxed{
210\to35\to16\to7.
}
\]

The current modular profile-space decomposition candidate is

\[
64
=
12_{\rm trivial}
+
10_{\rm sign}
+
42_{\rm standard}.
\]

The 64-dimensional profile rank and its sector dimensions still require an
exact rational certificate before manuscript use.

## INTERIOR L5, Kmax=5

- raw states: 438
- \(S_3\) orbits: 73
- every orbit has size 6
- exact count classes: 34
- exact unary Krylov rank: 27
- operator equivariance checks: 14,688
- mismatches: 0

Compression ladder:

\[
\boxed{
438\to73\to34\to27.
}
\]

Modular profile-space candidate:

\[
154
=
28_{\rm trivial}
+
24_{\rm sign}
+
102_{\rm standard}.
\]

Again, this larger profile decomposition is currently modular/candidate-level.

## ALL L4 aa2fr, Kmax=6

- raw states: 3402
- \(S_3\) orbits: 567
- every orbit has size 6
- exact count classes: 152
- exact unary Krylov rank: 97
- operator equivariance checks: 121,752
- mismatches: 0

Thus

\[
\boxed{
3402\to567\to152\to97.
}
\]

Alphabet symmetry explains an exact factor 6 of the raw-state compression.

But after symmetry reduction there remains

\[
567\to97,
\]

a further factor of approximately \(5.85\).

Therefore the small future dimension is emphatically **not just alphabet
symmetry**.

---

# 8. Asymmetric negative control

The deterministic HASH30 L4 selected library is not \(S_3\)-invariant.

At \(K_{\max}=5\):

\[
323\text{ raw states}
\to
76\text{ exact count classes}
\to
47\text{ exact unary dimensions}.
\]

There is no global alphabet-symmetry quotient explaining this.

Thus substantial exact linear future compression survives even after the
symmetry explanation is deliberately removed.

This is an important control.

---

# 9. Full L4, Kmax=4 profile-sector calibration

For the full symmetric L4 library at \(K_{\max}=4\), the current modular
profile-future decomposition is

\[
159
=
29_{\rm trivial}
+
24_{\rm sign}
+
106_{\rm standard}.
\]

The exact unary Krylov dimension is also

\[
29.
\]

This strongly suggests that in this calibration the unary future space fills
the entire trivial component of the profile future space.

However, because the 159-dimensional profile rank is currently only
modularly certified, this equality should remain a research observation until
an exact rational profile-space certificate is produced.

---

# 10. Interpretation

The profile-to-total collapse has at least two mathematically distinct sources.

### Symmetry projection

For \(S_3\)-invariant libraries, nontrivial representation sectors present in
profile-labelled dynamics are inaccessible to the unary total-count orbit
from \(\mathbf1\).

### Internal trivial-sector compression

Even within the invariant sector, the cyclic future space can be smaller.

BAL3 K4 shows this exactly:

\[
5_{\rm trivial}\to3_{\rm unary}.
\]

That residual reduction is where the obstruction-generated linear recurrence
structure remains to be explained.

---

# 11. Consequence for Paper 6

The semantic hierarchy can now be refined as

\[
V_{\rm prof}
=
V_{\rm triv}
\oplus
V_{\rm sign}
\oplus
V_{\rm standard}
\]

for symmetric ternary libraries, while

\[
\boxed{
V_{\rm cnt}\subseteq V_{\rm triv}.
}
\]

This gives a principled decomposition of the problem before any numerical
minimization.

The next theory target should therefore study the **cyclic dynamics inside the
trivial sector**, and compare it with the asymmetric control where no such
group reduction is available.

---

## Current verdict

**Real structural explanation found.**

Alphabet symmetry explains a rigorous, quantifiable part of Paper-6
compression, and the profile-conditioned layer naturally carries the
nontrivial representation sectors that disappear in total counting.

But symmetry is only the first layer.

The remaining reduction after orbit quotienting is still large and is the
next obstruction-dynamics problem.
