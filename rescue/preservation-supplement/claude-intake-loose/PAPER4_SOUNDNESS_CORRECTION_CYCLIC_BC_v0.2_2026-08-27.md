# Paper 4 — Soundness Correction: Cyclic-BC Gate

**Version 0.2 — 2026-08-27**  
**Severity:** `BLOCKING FOR HISTORICAL COMPONENT CERTIFICATES`  
**Global problem status:** unchanged; positive construction still `OPEN`.

## 1. Issue

An earlier ABCF implementation used a cyclic-80 test on \(BC\).

That test certifies, among other things,

\[
BC,\quad CB,\quad BCB,\quad CBC
\]

through half-period 40.

However the exact length-3 factor set of \(h_6^\omega(a)\) contains

\[
cbc
\]

but **does not contain**

\[
bcb.
\]

Therefore `BCB clean` is an additional restriction that is not justified by
the actual \(h_6\) factor language.

A necessary gate in the component-exclusion theorem may not impose such an
extra condition: doing so could discard a hypothetical valid coding.

## 2. Correct ABCF necessary gate

For an exact AF pair \((A,F)\):

1. enumerate every B with the correct role Parikh vector satisfying
   \[
   FB\ \text{clean};
   \]
2. enumerate every C with the correct role Parikh vector satisfying
   \[
   AC,\quad BC,\quad CB,\quad CBC
   \]
   through periods \(2,\ldots,40\).

The already-certified AF contexts are

\[
AF,\quad FA,\quad FAF.
\]

No `BCB` condition is imposed.

## 3. Historical impact

The previous 18-component aggregate

\[
1071\ A\to451\ AF\to39\ AFD\to0\ \text{full}
\]

must **not** currently be presented as one publication-level
`EXACT-CHECKED` component ledger.

The components whose closure occurred already at the AFD gate are unaffected.

Unconditionally sound historical subset:

| Components | A states | AF modules | AFD survivors |
|---|---:|---:|---:|
| C3, C4, C6, C7, C9, C10, C11, C12, C13–C18 | 529 | 171 | 0 |

These components require no ABCF argument.

Historical components requiring corrected ABCF replay:

| Component | A | AF | AFD |
|---|---:|---:|---:|
| C1 | 26 | 209 | 14 |
| C2 | 475 | 24 | 16 |
| C5 | 16 | 20 | 6 |
| C8 | 25 | 27 | 3 |
| **Total** | **542** | **280** | **39** |

No publication-level exclusion claim should be made for C1, C2, C5 or C8
until their 39 AFD modules are replayed with the corrected gate.

## 4. New corrected attack

A new random A screening run (seed `82722331`) produced seven swap components
of sizes

\[
2,\ 55,\ 60,\ 4,\ 1,\ 162,\ 108,
\]

totaling

\[
392
\]

A states.

Complete exact AF/AFD enumeration gave:

| new component | A | AF | AFD |
|---|---:|---:|---:|
| N1 | 2 | 3 | 0 |
| N2 | 55 | 10 | 0 |
| N3 | 60 | 180 | 0 |
| N4 | 4 | 1 | 0 |
| N5 | 1 | 1 | 0 |
| N6 | 162 | 39 | 5 |
| N7 | 108 | 16 | 0 |
| **Total** | **392** | **250** | **5** |

Only N6 reached ABCF.

Using the corrected actual-language gate, all five N6 AFD modules produced an
ABCF survivor.

All five then failed the simultaneous full-D join:

\[
\boxed{
5\ \mathrm{ABCF}
\to
0\ \mathrm{ABCDF}.
}
\]

The full-D DFS visited exactly two nodes per core and no complete D word.

An independently written Python replay reproduces the same result.

Thus all seven new components are soundly excluded under the corrected gate
sequence.

## 5. Distinctness from historical components

Six new component sizes

\[
2,\ 55,\ 60,\ 1,\ 162,\ 108
\]

did not occur among the historical 18 component sizes, so those six
components are definitely new.

The new size-4 component is not the independently replayed historical C11
component.  Its equality/inequality with historical C12 has not yet been
checked because the C12 vertex list is not mounted in the current runtime.

Safe claim:

\[
\boxed{\text{at least six definitely new closed components, 388 A states}.}
\]

Do not add the full seven components to a global unique-component count until
C12 is checked.

## 6. Epistemic correction

Previous label:
`18 COMPONENTS EXACT-CHECKED`.

Correct current label:

- 14 historical AFD-zero components: `EXACT-CHECKED`;
- historical C1/C2/C5/C8: `CORRECTED REPLAY REQUIRED`;
- seven components from the new run: `EXACT-CHECKED UNDER CORRECTED GATES`;
- global length-40 problem: `OPEN`.

## 7. Audit lesson

A stronger local condition is not automatically a sound pruning condition.

For a negative certificate, every pruning predicate must be either:

1. an actual necessary factor-language condition; or
2. accompanied by a proof that it is implied by the actual necessary
   conditions.

This rule is now a hard requirement for every future gate.


## 8. Corrected replay update

C1 and C2 have now been reconstructed and replayed completely.

### C1

\[
26\ A\to209\ AF\to14\ AFD\to0\ ABCF.
\]

### C2

\[
475\ A\to24\ AF\to16\ AFD\to0\ ABCF.
\]

The corrected gate used only

\[
FB,\ AC,\ BC,\ CB,\ CBC.
\]

No `BCB` condition was imposed.

Therefore C1 and C2 are restored to publication-level
`EXACT-CHECKED / COMPONENT-LOCAL`.

Remaining historical replay debt:

\[
\boxed{
C_5:\ 16\ A,\ 20\ AF,\ 6\ AFD;
\qquad
C_8:\ 25\ A,\ 27\ AF,\ 3\ AFD.
}
\]

Thus 16 of the original 18 components are currently soundly closed.

Primary corrected-replay files:

- `PAPER4_REPLAY_C1C2_ENUM_OUTPUT.txt`
- `PAPER4_REPLAY_C1C2_AF_AFD_OUTPUT.txt`
- `PAPER4_REPLAY_C1C2_AFD_SURVIVORS.tsv`
- `PAPER4_REPLAY_C1C2_CORRECTED_ABCF_OUTPUT.txt`
