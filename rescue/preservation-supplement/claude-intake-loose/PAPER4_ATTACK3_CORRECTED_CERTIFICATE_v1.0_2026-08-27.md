# Paper 4 — Corrected Attack 3 Certificate and Regression

**Version 1.0 — 2026-08-27**  
**Status:** `EXACT-CHECKED / CORRECTED GATES`

## 1. Discovery

Random A screening seed:

```text
82722553
```

The run stopped after 8 AF-hit seeds, reached after 4,463 screened A words.

Their complete swap components have sizes

\[
118,\quad1,\quad1,\quad23,\quad21,\quad55,\quad2,\quad10.
\]

## 2. Exact classification

Complete first-hit/no-hit AF screening over every vertex, followed by complete
F enumeration for every hit A, gives:

| component | A | hit A | AF | AFD |
|---|---:|---:|---:|---:|
| A3-1 | 118 | 2 | 6 | 0 |
| A3-2 | 1 | 1 | 1 | 0 |
| A3-3 | 1 | 1 | 2 | 0 |
| A3-4 | 23 | 2 | 2 | 0 |
| A3-5 | 21 | 3 | 12 | 0 |
| A3-6 | 55 | 10 | 10 | 0 |
| A3-7 | 2 | 2 | 3 | 0 |
| A3-8 | 10 | 1 | 3 | 0 |

Every one of the 39 exact AF modules is AFD-dead.

No ABCF search is required.

## 3. Exact duplicate regression

A3-6, the size-55 component, is exactly equal as a vertex set to the
size-55 component N2 from Corrected Attack 1.

Both runs independently produce

\[
\boxed{
55\ A\to10\ AF\to0\ AFD.
}
\]

This is an exact cross-run reproducibility check of:
- component enumeration;
- AF first-hit/no-hit classification;
- complete F enumeration;
- AFD elimination.

## 4. Definitely new components

Relative to all component vertex sets currently mounted and to the historical
size ledger:

- A3-2, size 1: definitely new;
- A3-3, size 1: definitely new;
- A3-4, size 23: definitely new;
- A3-5, size 21: definitely new;
- A3-7, size 2: definitely new.

These five contribute

\[
\boxed{
48\ A\to20\ AF\to0\ AFD.
}
\]

A3-1 (size 118) is soundly closed but is excluded from the unique-component
aggregate because historical C3/C4 also have size 118 and their raw vertex
sets are not mounted.

A3-8 (size 10) is soundly closed but is excluded from the unique aggregate
because historical components of size 10 exist and their raw sets are not
mounted.

A3-6 is the exact duplicate noted above.

## 5. Component hashes

- A3-1: size 118, SHA256 `4380a3fb6826eb0940c761d271a01b5a2bee47dff297f50ba265d601b5ae8449`
- A3-2: size 1, SHA256 `900a2a13cd55d2227dbc6b7e65a595ea10b2cec2b7becdaec8e73bd633574339`
- A3-3: size 1, SHA256 `12bc1ad9870b6536d7d476fa19b3b672b4d7d42aa5dc177b1df7d55f1c8ece92`
- A3-4: size 23, SHA256 `887094c801b23e5d4ed2972420bcffc79990bdd79b29aefb6e65d778ba011f3b`
- A3-5: size 21, SHA256 `a28ad3ab00470e61db1fe08a3eb72ee739838446e0763c8e949433e6d279eb35`
- A3-6: size 55, SHA256 `09c12afc0c00e61664a8366554a357b6edd193c1d076e08c4e07fab75a869194`
- A3-7: size 2, SHA256 `b7cd5d01dd26acf429c384d2fd93cb715c5202570e70e876d382c0651545d30b`
- A3-8: size 10, SHA256 `704851c7d3721640894a096adfe42c9242cff4f668fc2eca37c834b217ac7ee1`

## 6. Epistemic status

All eight components are `EXACT-CHECKED` as individual negative certificates.

Only the five definitely-new components are added to the publication-safe
unique-component aggregate.
