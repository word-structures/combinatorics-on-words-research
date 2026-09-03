# Paper 4 — Corrected Sound Component Ledger

**Version 1.3 — 2026-08-27**  
**Purpose:** publication-safe lower-bound ledger after the cyclic-BC correction.

## 1. Historical sound subset

After corrected replay of C1 and C2, 16 of the historical 18 components are
soundly closed.

The two still pending are C5 and C8.

Historical sound subset:

\[
\boxed{
16\text{ components},
\quad
1030\ A,
\quad
404\ AF,
\quad
30\ AFD,
\quad
0\ ABCF.
}
\]

C5 and C8 are deliberately excluded from this ledger.

## 2. Corrected Attack 1 — definitely new subset

Seven components were closed under the corrected gate pipeline.

Six have component sizes absent from the historical ledger:

\[
2,\quad55,\quad60,\quad1,\quad162,\quad108.
\]

These six are definitely new and contribute

\[
\boxed{
6\text{ components},
\quad
388\ A,
\quad
249\ AF,
\quad
5\ AFD,
\quad
5\ ABCF,
\quad
0\ ABCDF.
}
\]

A seventh size-4 component is soundly closed but is omitted from the
**unique-component** aggregate until it is compared with historical C12.

## 3. Corrected Attack 2

Four definitely new components:

\[
2138,\quad5,\quad9,\quad5.
\]

They contribute

\[
\boxed{
4\text{ components},
\quad
2157\ A,
\quad
46\ AF,
\quad
5\ AFD,
\quad
0\ ABCF.
}
\]

## 4. Publication-safe unique lower bound

Combining only components whose distinctness is established:

\[
\boxed{
26\text{ distinct sound closed components}
}
\]

containing

\[
\boxed{
3575\text{ distinct A-role states}.
}
\]

Exact staged counts across these 26 components:

\[
\boxed{
3575\ A
\to
699\ AF
\to
40\ AFD
\to
5\ ABCF
\to
0\ ABCDF.
}
\]

This is a **lower bound** on the number of soundly closed distinct components
and states currently known.

It excludes:
- historical C5 and C8 pending corrected replay;
- one sound new size-4 component pending deduplication against C12.

## 5. Current research state

- positive H40 coding: `OPEN`;
- no ABCDF survivor currently known;
- Gate T mechanism ready and independently regression-tested;
- component theorem sound under actual-language gates;
- novelty: `NOVELTY_UNRESOLVED`.

## 6. Audit rule

Never merge an item into this ledger unless both conditions hold:

1. its exclusion uses only sound necessary gates;
2. its component identity is known not to duplicate an already-counted
   component.


## 7. Corrected Attack 3 update

Attack 3 produced eight soundly closed components.

One size-55 component is an exact duplicate of a previously counted component
and reproduces its exact \(55\to10\to0\) staged counts.

Two other sound components (sizes 118 and 10) are conservatively excluded from
the unique aggregate because historical components of those sizes exist and
their raw vertex sets are not available in the current runtime.

Five components are definitely new:

\[
1,\quad1,\quad23,\quad21,\quad2,
\]

contributing

\[
48\ A\to20\ AF\to0\ AFD.
\]

### Updated publication-safe lower bound

\[
\boxed{
31\text{ distinct sound closed components}
}
\]

\[
\boxed{
3623\text{ distinct A-role states}
}
\]

with staged counts

\[
\boxed{
3623\ A
\to
719\ AF
\to
40\ AFD
\to
5\ ABCF
\to
0\ ABCDF.
}
\]

This remains a conservative lower bound.


## 8. D-aware gate update

All 40 sound AFD modules represented in this ledger were reclassified under
the complete D-aware gate order.

\[
40\ AFD
\to
407\text{ AFD-compatible D}
\to
2\ ABDF
\to
0\ ABCDF.
\]

This does not change the component count, but it supplies a stronger and much
cheaper terminal classification for the currently sound AFD population.

The 407-D set, the two ABDF pairs, and the zero C extensions all have
independent replay evidence.


## 9. Corrected Attack 4 update

Attack 4 independently rediscovered two already closed components:
- size 55;
- size 2138.

Six other components were classified, all with zero AFD survivors.

Five are definitely new:

\[
73,\quad8,\quad30,\quad1,\quad157.
\]

They contribute

\[
269\ A\to147\ AF\to0\ AFD.
\]

The sound size-10 component is omitted from the unique count pending
deduplication against historical size-10 components.

### Updated publication-safe lower bound

\[
\boxed{
36\text{ distinct sound closed components}
}
\]

\[
\boxed{
3892\text{ distinct A-role states}
}
\]

with

\[
\boxed{
3892\ A
\to
866\ AF
\to
40\ AFD
\to
2\ ABDF
\to
0\ ABCDF.
}
\]

The 40 AFD -> 2 ABDF -> 0 ABCDF classification has independent replay
evidence at the D, B and C layers.
