# GLOBAL CERTIFICATE INTERFACE
**Date:** 2026-08-29

## 1. The True Global Certificate
For a complete candidate morphism G : Gamma -> {a,b,c}^L applied to a source word x in Gamma^omega, the global avoidance of long abelian squares (K >= 2L) is traditionally certified by a **pullback (ancestor) theorem**.
Specifically:
If an abelian square of half-period K >= 2L exists in G(x), it pulls back to a specific combinatorial or algebraic obstruction in the source word x (e.g., an abelian square with bounded boundary offsets, or a specific Parikh vector relation in the source language).
The global certificate is the proof that NO such obstruction exists in x.

## 2. The Interface to Paper 4
The 19 families in Paper 4 mathematically formalize this pullback topology. They enumerate the exact boundary fractional domains (the six domains) and support masks that a target abelian square imposes on the source word.

**The Unified Interface:**
`LOCAL SOURCE-FACTOR GATE` (Verifies K < 2L using exactly 4L-3 memory over F_5(x))
+
`PAPER-4 PARTIAL-ASSIGNMENT COMPILER` (Rejects block assignments whose Parikh profiles algebraically satisfy the pullback equations)
+
`GLOBAL PULLBACK CERTIFICATE` (The formal proof that the 19 families exhaustively cover all K >= 2L overlaps for the chosen uniform grid, ensuring that avoiding these families is mathematically sufficient).

## 3. Operational Value of Paper 4
Can Paper 4 make the global certificate cheaper?
**YES, exponentially so.**
Without Paper 4, one must fully instantiate a block assignment G, generate a massive word, and run a heavy template-checking algorithm (like the Rauzy graph or ancestor-box method).
With Paper 4, the global certificate is decomposed into affine support schemas. These schemas can be evaluated on *partial* block assignments (e.g., just assigning B_a, B_b, and B_c) and on *Parikh profiles alone* (before letter permutations are chosen).
This allows the solver to prune impossible branches of the morphism search space at the profile level, rendering the traditionally impossible global search space computationally tractable.
