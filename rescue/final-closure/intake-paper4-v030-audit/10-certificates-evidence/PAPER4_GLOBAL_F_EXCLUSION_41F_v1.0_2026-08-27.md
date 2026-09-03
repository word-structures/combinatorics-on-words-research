# Paper 4 — Global Exclusion Certificate for 41 F-Role Blocks

**Version 1.0 — 2026-08-27**  
**Status:** `EXACT-CHECKED / GLOBAL-IN-A FOR FIXED F`

## 1. Result

Forty-one distinct role-correct F blocks have now been exhaustively classified
over the **entire** A-role profile space.

For each fixed F:

1. enumerate every A with
   \[
   AF,\ FA,\ FAF
   \]
   clean;
2. enumerate every AFD-compatible D using
   \[
   AD,\ DF,\ ADF,\ DFA,\ FAD;
   \]
3. retain D with C-support via
   \[
   AC,\ DC;
   \]
4. test B-support via
   \[
   FB,\ BDF,\ DFB,\ FBD.
   \]

A full coding requires the same D to survive both support branches.

## 2. Aggregate

Across the 41 fixed-F families:

\[
\boxed{465}
\]

family-counted AF-compatible A words,

\[
\boxed{976}
\]

complete AFD-compatible D records,

\[
\boxed{468}
\]

C-supporting D records,

and

\[
\boxed{0}
\]

D-bridges.

The exact B-support searches traversed

\[
\boxed{178\,289\,853}
\]

B-DFS nodes over the C-supporting D population.

Hence:

\[
\boxed{
H(f)\notin\{F_1,\ldots,F_{41}\}
}
\]

for every complete solution H of the prescribed length-40 role system.

## 3. Composition of the 41 families

### First 17 F families

These are the 17 distinct F blocks already present among the 40 sound AFD
modules in the corrected component ledger.

Aggregate:

\[
200\ AF\text{-A}
\to
892\ AFD\text{-D}
\to
424\ C\text{-supporting D}
\to
0\ D\text{-bridges}.
\]

### Additional 24 F families

These are distinct AF-witness F blocks recovered from later independent random
component-discovery runs and not contained in the first 17.

Aggregate:

\[
265\ AF\text{-A}
\to
84\ AFD\text{-D}
\to
44\ C\text{-supporting D}
\to
0\ D\text{-bridges}.
\]

Of these 24 families:

- 23 are globally AFD-empty;
- one family has
  \[
  83\ AF\text{-A}\to84\ AFD\text{-D}\to44\ C\text{-supporting D}\to0\text{ bridge}.
  \]

## 4. Theorem used

The fixed-F global exclusion theorem is:

> If, over the complete A-profile space for a fixed F, no AFD-compatible D has
> both C-support and B-support, then no complete coding can have \(H(f)=F\).

The proof is by inserting the true images \(H(a),H(d),H(c),H(b)\) of a
hypothetical full coding into the exhaustive sets.  Every gate condition is an
actual factor of \(h_6^\omega(a)\).

## 5. Why this is stronger than component exclusion

Component exclusion proves:

> no solution has \(H(a)\) in a particular closed A-swap component.

The fixed-F theorem proves:

> no solution has this particular \(H(f)=F\), regardless of the A-swap
> component.

Thus these 41 exclusions are global in A for their fixed F values.

## 6. Reproducibility files

First 17:
- `PAPER4_DBRIDGE_17F_AGGREGATE.tsv`
- `PAPER4_F_CONDITIONED_GLOBAL_EXCLUSION_17F_v1.0_2026-08-27.md`

Additional 24:
- `PAPER4_NEW24F_AGGREGATE.tsv`
- `PAPER4_NEW_F_FAMILY_CANDIDATES.tsv`
- `PAPER4_NEWF_<i>_A_OUTPUT.txt`
- `PAPER4_NEWF_<i>_D_OUTPUT.txt`
- `PAPER4_NEWF_<i>_ACD_OUTPUT.txt`
- `PAPER4_NEWF_<i>_BRIDGE_OUTPUT.txt`
- corresponding AF-A / AFD-D / ACD-D / bridge TSV files.

## 7. Epistemic boundary

This is a finite exact exclusion of 41 concrete F words.

It is not:
- a classification of all role-correct F words;
- a proof that only finitely many F candidates exist;
- a global nonexistence theorem;
- a positive solution of Mäkelä's conjecture.

Status:

\[
\boxed{\texttt{EXACT-CHECKED}}
\]

Novelty:

\[
\boxed{\texttt{NOVELTY\_UNRESOLVED}}.
\]
