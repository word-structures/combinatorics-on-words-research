# Paper 4 — Global F-Role Exclusion Ledger: 9693 Words

**Version 4.0 — 2026-08-27**  
**Status:** `EXACT-CHECKED LOWER BOUND / INDEPENDENT REPLAY`

The current exact exclusion union is the pairwise-disjoint union

\[
5151\;\dot\cup\;300\;\dot\cup\;4242.
\]

## Previous exact union

\[
5151
\]

globally excluded F-role words from complete swap-component and fixed-F
certificates.

## Independent 300-F direct-A population

The separate 300-F discovery population is disjoint from the 5151 union.

Primary direct-A search gives zero compatible A words for all 300 F words.
A second exhaustive fixed-F A enumerator independently replays all 300:

\[
\boxed{300/300\to0A}.
\]

## 4242-F population

The 4242-F population is disjoint from both earlier sets.

Full population replay gives

\[
4223F\to0A
\]

and 19 AF-positive F words with 87 total A choices.

Dual-orientation ABDEF closure gives

\[
87AF\to0ABDEF.
\]

Therefore every one of the 4242 F words is globally excluded.

## Exact union

The three sets have exact pairwise intersections

\[
0,\quad0,\quad0.
\]

Hence

\[
\boxed{
5151+300+4242=9693
}
\]

distinct length-40 F-role words are globally impossible as \(H(f)\).

Canonical set:

`PAPER4_GLOBAL_F_EXCLUDED_UNION_9693.txt`

Exact union check:

`PAPER4_GLOBAL_F_UNION_9693_CHECK.txt`

## Current generated F pool

The current internally clean F pool contains 4544 distinct words, and

\[
\boxed{4544/4544}
\]

are already contained in the 9693 exclusion union.

Thus the current generated pool is completely exhausted for positive-H
search.  Further positive search must generate genuinely new F words outside
the union.

This is still a lower bound on the global F-role profile space, not a global
nonexistence theorem.

**Label:** `EXACT-CHECKED LOWER BOUND / INDEPENDENT REPLAY`.
