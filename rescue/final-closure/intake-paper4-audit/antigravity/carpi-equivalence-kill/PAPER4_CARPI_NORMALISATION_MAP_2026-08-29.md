# Phase A: Normalisation Map — Carpi C3 vs Paper 4 §7

**Date:** 2026-08-29
**Status:** ADVERSARIAL — attempting to kill novelty

## 1. Carpi's Framework (1993)

Carpi considers a uniform morphism h: Gamma* -> Sigma* of block length L.
For a word w = a_0 a_1 ... a_{n-1} over Gamma, the coded word is h(w) = h(a_0) h(a_1) ... h(a_{n-1}).

An abelian k-power in h(w) is a factor U_1 ... U_k where Psi(U_1) = ... = Psi(U_k).

For a 2-power (abelian square) with half-period K, the factor starts at some position s in the coded word. Write:
  s = b_0 L + i_0, 0 <= i_0 < L.

The three cutpoints of the square are at positions s, s+K, s+2K.

**Carpi's key parameters:**
For each cutpoint t_j = b_j L + i_j, Carpi's boundary/interior indicator is whether i_j = 0 (cutpoint at a block boundary) or i_j > 0 (cutpoint inside a block). Carpi then classifies the possible configurations by the prefix/suffix decomposition at each boundary.

For a uniform morphism of length L and half-period K = qL + r (0 <= r < L):

**Carpi's delta parameters:** In Carpi's treatment, delta_j indicates whether the cutpoint falls at a block boundary (delta_j = 0, i.e. i_j = 0) or strictly inside a block (delta_j = 1, i.e. i_j > 0).

This is NOT the same object as Paper 4's carry c_j or curvature Delta_j.

## 2. Paper 4's Framework

Paper 4 uses the same decomposition t_j = b_j L + i_j but defines:

  c_j = floor((i_j + r)/L) in {0, 1}

This is the Euclidean carry bit: whether adding the remainder r to the current intra-block position i_j causes a block-boundary crossing.

The curvature is:
  Delta = c_1 - c_0 in {-1, 0, +1}

## 3. Critical Distinction

| Object       | Carpi delta_j        | Paper 4 c_j                 | Paper 4 Delta      |
|-------------|----------------------|----------------------------|--------------------|
| Definition  | 1[i_j > 0]          | floor((i_j + r)/L)         | c_1 - c_0          |
| Domain      | {0, 1}              | {0, 1}                     | {-1, 0, +1}        |
| Information | cutpoint at boundary | step causes carry           | macro gap difference|
| Depends on r? | NO                 | YES                        | YES                 |

**This is the critical mapping failure:**

Carpi's delta_j is a *static* property of the cutpoint position (boundary vs interior).
Paper 4's c_j is a *dynamic* property of the Euclidean step (carry vs no carry).

They are NOT the same variable.

Carpi's delta_j = 0 iff i_j = 0.
Paper 4's c_j = 1 iff i_j + r >= L, i.e. iff i_j >= L - r.

These coincide only when r = 0 (integer period), in which case c_j = 0 for all j and the carry structure is trivial.

## 4. Frozen Mapping

| Carpi               | Paper 4                         | Relationship                     |
|---------------------|--------------------------------|----------------------------------|
| delta_j = 1[i_j>0] | c_j = floor((i_j+r)/L)         | Different binary variables       |
| boundary/interior   | carry/no-carry partition        | Different partitions of same space|
| does not depend on K mod L | depends entirely on r = K mod L | Fundamental structural difference|
| Counts boundary types | Governs macro-block gap arithmetic | Different mathematical purposes |

FROZEN. Proceeding to Phase B with this mapping.
