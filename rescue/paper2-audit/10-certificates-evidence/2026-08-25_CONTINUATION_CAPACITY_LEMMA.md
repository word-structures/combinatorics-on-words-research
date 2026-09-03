# Continuation-Capacity Lemma for Parry transitions

**Date:** 2026-08-25  
**Status:** GENERAL MATHEMATICAL LEMMA / STANDARD PF CONSEQUENCE USED AS A NEW
PROJECT BRIDGE  
**Novelty:** the lemma itself is NOT claimed as new.

Let \(A\) be a primitive 0-1 adjacency matrix, with Perron root
\(\lambda\) and positive right eigenvector \(r\).

Define

\[
N_m=A^m\mathbf1,
\]

so \(N_m(i)\) is the number of admissible length-\(m\) continuations from
state \(i\).

For an allowed edge \(i\to j\), define

\[
Q_m(i,j)=\frac{N_m(j)}{N_{m+1}(i)}.
\]

The Parry transition is

\[
P_{ij}=\frac{r_j}{\lambda r_i}.
\]

## Lemma 1 — asymptotic capacity ratio

\[
\boxed{Q_m(i,j)\to P_{ij}.}
\]

Proof: Perron-Frobenius gives
\(N_m=c\lambda^m r+o(\lambda^m)\), and the ratio follows.

## Lemma 2 — finite projective enclosure

Let

\[
u_m(i)=N_m(i)/r_i
\]

and

\[
R_m=\max_i u_m(i)/\min_i u_m(i).
\]

Then

\[
\boxed{
Q_m/R_m\le P_{ij}\le R_mQ_m.
}
\]

Proof:

\[
\frac{Q_m}{P_{ij}}
=
\frac{u_m(j)}
{\sum_\ell P_{i\ell}u_m(\ell)},
\]

and the denominator is a convex combination of values lying between
\(\min u_m\) and \(\max u_m\).

## Research use

This lets a continuation-echo certificate replace an opaque Perron
transition floor with:

1. finite combinatorial extension counts \(N_m\);
2. a rigorous projective error factor \(R_m\).

The latter can be certified by standard Perron/Birkhoff machinery.

Thus the project-specific bridge is:

\[
\text{forbidden continuation tree}
\to
\text{finite extension counts}
\to
\text{Parry probability enclosure}
\to
\text{echo certificate}.
\]

Do not claim the Perron-Frobenius ingredients as novel.
