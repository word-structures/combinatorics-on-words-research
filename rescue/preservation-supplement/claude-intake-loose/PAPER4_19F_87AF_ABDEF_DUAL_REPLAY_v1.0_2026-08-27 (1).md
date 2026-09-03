# Paper 4 — Dual-Orientation ABDEF Closure of 19 F Words / 87 AF Pairs

**Version 1.0 — 2026-08-27**  
**Status:** `EXACT-CHECKED / DUAL-ORIENTATION REPLAY`

## Input population

The 19 AF-positive F words from the 4242-F population were exhaustively
enumerated over the full A-profile by the independent fixed-F A engine.

The exact A counts sum to

\[
\boxed{87}
\]

distinct \((F,A)\) pairs.

A separate clean-room verifier checks all 87 pairs for:
- \(\Psi(F)=(19,11,10)\);
- \(\Psi(A)=(15,14,11)\);
- internal F and A cleanliness;
- exact cleanliness of \(AF\), \(FA\), and \(FAF\).

Result:

\[
\boxed{87/87\text{ PASS}.}
\]

## ABDEF target

For every \((F,A)\), search role-correct \(E,B,D\) satisfying every actual
\(h_6\) bigram/trigram condition not involving C.

The required no-C conditions include

\[
EA,\ FE,\ FB,\ EB,
\]

\[
AFE,\ EAF,\ FAF,\ FEA,
\]

\[
AD,\ BD,\ DF,
\]

and

\[
ADF,\ BDF,\ DFA,\ DFB,\ EAD,\ EBD,\ FAD,\ FBD.
\]

## Forward-E orientation

Across all 87 pairs, the forward E search completes with no cap and no ABDEF
scaffold.

Combined exact counts:

\[
3\,033\,535\ E\text{-completions},
\]

\[
489\,057\ B\text{-completions},
\]

\[
1\,614\ D\text{-completions},
\]

and

\[
\boxed{0\text{ ABDEF}}.
\]

## Reverse-E independent replay

The opposite E orientation makes the complementary E seam incremental.

It also completes with no cap and gives

\[
690\,327\ E\text{-completions},
\]

\[
489\,057\ B\text{-completions},
\]

\[
1\,614\ D\text{-completions},
\]

and again

\[
\boxed{0\text{ ABDEF}}.
\]

The B- and D-completion totals agree exactly across the two orientations.

## Consequence

All A possibilities for these 19 F words have been exhausted, and every one
fails already at the no-C ABDEF scaffold.

Hence all 19 F words are globally impossible as \(H(f)\).

**Label:** `EXACT-CHECKED / DUAL-ORIENTATION POPULATION CLOSURE`.
