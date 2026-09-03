# Partial-Target Outer-Parent Theorem v0.2 — scope corrected
**Date:** 2026-08-29

## Scope correction

A Paper-4 physical window with q=0 may put two cutpoints in the same source-block
occurrence. Such a geometry is a valid direct target constraint, but it is not
automatically one ordinary Rao–Rosenfeld parent witness.

The bridge theorem is therefore stated only for a **genuine outer-parent witness**
whose three boundary letters correspond to source occurrences. Every uniform
q>=1 equal-half-period window has this property.

## Theorem

Let H be an L-uniform target coding and suppose every image profile is fixed.
Let U be the unresolved roles, each ranging over words of its prescribed profile.

For a genuine Rao–Rosenfeld parent witness of the target zero 2-template, let d
be the source-template difference vector. Split the target boundary correction as

    C_G + sum_r sigma_{G,r}(x_r),

where C_G contains fixed-profile and assigned-word terms, and sigma_{G,r} is the
Paper-4 role projection for unresolved role r.

Then the parent witness is realizable by some profile-compatible completion iff

    -M_H d - C_G

belongs to the Minkowski sum of the role-wise exact reachable sets

    sum_r R_{sigma_{G,r}}(rho_r).

## Proof

The published parent equation is

    0 = M_H d + Psi(s2 p3) - Psi(s1 p2).

For uniform target blocks the boundary term is

    rho(b1)-rho(b0) + P0 - 2 P1 + P2.

Partition the three prefix terms by target role. Assigned terms are constants.
Each unresolved role contributes exactly its Paper-4 support signature. The set
of values attainable by one unresolved role is its fixed-profile reachable set.
Distinct unresolved roles are independent choices, so attainable sums are the
Minkowski sum. Rearranging proves the criterion.

## Nonclaims

- q=0 same-occurrence windows are not identified with one RR parent step.
- The 19 support families are not ancestor states.
- No state-space compression is claimed.
- Several constraints requiring one common target word need a joint constraint system.
- The theorem does not replace the RR ancestor/realizability computation.
