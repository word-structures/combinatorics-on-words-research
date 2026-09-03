# Paper 4 — A36 Frontier Complete Closure

**Version 1.0 — 2026-08-27**  
**Status:** `EXACT-CHECKED / COMPLETE POPULATION CLOSURE`

A frontier expansion from an F-role word admitting 36 compatible A-role
words produced 3088 clean F states.  Exactly 992 of these lie outside the
previous 32126-word exclusion union.

Complete fixed-F A enumeration gives

\[
992F\to38F^+\to139AF.
\]

All 139 AF pairs pass an independent clean-room verifier.

The pairwise no-C extension search initially closes 117 pairs under standard
limits.  Twenty-two pairs are then replayed in the complementary E
orientation; fourteen close there and eight still reach the B-search cap.
Those eight are treated as unresolved and rerun at enlarged exact limits.
All eight terminate with zero caps and zero ABDEF scaffolds.

Hence

\[
\boxed{139AF\to0ABDEF}
\]

and every one of the 992 new F states is globally impossible as \(H(f)\).

The population is disjoint from the previous union, so

\[
\boxed{32126+992=33118}
\]

distinct length-40 F-role words are now globally excluded.

No exact ABDEF scaffold is known.

**Label:** `EXACT-CHECKED LOWER BOUND / COMPLETE POPULATION CLOSURE`.
