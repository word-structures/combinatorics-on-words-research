# Phase B: The Six Admissible Carpi Selector Triples

**Date:** 2026-08-29
**Status:** ADVERSARIAL — Version 2

## Enumeration

We enumerate all (delta_0, delta_1, delta_2) in {0,1}^3 and compute D_C = delta_0 - 2delta_1 + delta_2.

| (delta_0, delta_1, delta_2) | D_C | Admissible? (D_C in {-1,0,+1}) |
|---|---|---|
| 000 |  0 | YES |
| 001 | +1 | YES |
| 010 | -2 | NO  |
| 011 | -1 | YES |
| 100 | +1 | YES |
| 101 | +2 | NO  |
| 110 | -1 | YES |
| 111 |  0 | YES |

The single-square arithmetic-progression specialization forces D_C = -Delta.
Since Delta in {-1, 0, +1}, D_C must be in {-1, 0, +1}.
This rigorously excludes the triples 010 and 101.
We are left with exactly SIX selector triples:
- D_C =  0: 000, 111
- D_C = -1: 011, 110
- D_C = +1: 001, 100

## The Crucial Question

Are these six selector triples equivalent to Paper 4's six carry domains (Z_s, P_t, M_t, Z, P, M)?

**NO.** The common number six is a combinatorial coincidence caused by two different reductions of different algebraic spaces resolving the same three-valued curvature.

- Carpi: 2^3 = 8 binary triples, minus 2 impossible values (-2, +2) = 6 triples.
- Paper 4: 2 values of q (0 vs >=1) times 4 carry pairs (00, 01, 10, 11) = 8 combinations. One is kinematically impossible (q=0 with c_0=1, c_1=1), and one is merged into the Z domain (q>=1 with c_0=1, c_1=1 has Delta=0, same as c_0=0, c_1=0), leaving 6 geometric domains.

These are different mathematical objects. The next phase will prove this via explicit counterexample.
