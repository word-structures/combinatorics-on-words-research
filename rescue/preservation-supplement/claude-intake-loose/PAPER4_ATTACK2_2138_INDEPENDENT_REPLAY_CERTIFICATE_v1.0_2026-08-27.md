# Paper 4 — Independent Replay Certificate for the 2138-State Component

**Version 1.0 — 2026-08-27**  
**Status:** `INDEPENDENT REPLAY PASS`

## 1. Component BFS

Seed:

```text
ccacccbccaaabacaaabbbaaaccbbabbcbbbaaabb
```

An independently written Python BFS used only:

- role-A Parikh vector \((15,14,11)\);
- one transposition of two unequal positions per edge;
- internal Abelian-square cleanliness for half-periods \(2,\ldots,20\).

Result:

\[
\boxed{2138\text{ vertices}}
\]

with

\[
19724
\]

directed adjacency incidences.

The independently generated sorted vertex set has SHA256

```text
531a1189eec63492ad1ae44a9f767222ec03fe75ef89965c2013bd51161c4797
```

which exactly equals the primary component file.

## 2. Independent AF classification

A separately written C++ scanner used a different symbol traversal order and
re-enumerated the complete F continuation tree for every one of the 2138 A
vertices.

Result:

\[
\boxed{29\text{ AF-hit A}}
\]

and

\[
\boxed{2109\text{ exact AF-no-hit A}}.
\]

The set of 29 hit A words is exactly equal to the primary result.

Total independent F-search work:

\[
78,327,393\text{ DFS nodes},
\qquad
312,962\text{ complete F leaves}.
\]

## 3. Complete independent AF and AFD replay

Every one of the 29 hit A words was re-run without first-hit stopping.

Result:

\[
\boxed{39\text{ exact AF modules}}.
\]

A separately implemented AFD gate then found exactly

\[
\boxed{5\text{ AFD modules}}.
\]

The five \((A,F)\) survivor pairs are exactly equal to the primary result.

## 4. Independent corrected ABCF replay

For every one of the five AFD modules, a separate implementation:

1. enumerated all B satisfying `FB`;
2. enumerated C under `AC` and `BC`;
3. required exactly the actual remaining language contexts
   \[
   CB,\quad CBC.
   \]

No `BCB` condition was used.

Each module has

\[
18,901
\]

FB-compatible B words.

Results:

\[
\boxed{5/5\text{ exact ABCF-dead}}.
\]

Independent C-search node counts:

\[
1,978,971,\quad
2,263,723,\quad
3,783,433,\quad
2,304,103,\quad
3,877,505.
\]

Total:

\[
14,207,735\text{ C DFS nodes}.
\]

## 5. End-to-end replay verdict

\[
\boxed{
2138\ A
\to
29\text{ hit A}
\to
39\ AF
\to
5\ AFD
\to
0\ ABCF.
}
\]

Every load-bearing finite classification in the primary 2138-state
certificate has now been independently replayed.

## 6. Primary replay files

- `PAPER4_ATTACK2_2138_INDEPENDENT_PYTHON_BFS_REPLAY.txt`
- `PAPER4_ATTACK2_2138_INDEPENDENT_AF_SCAN_OUTPUT.txt`
- `PAPER4_ATTACK2_2138_INDEPENDENT_AF_COMPARISON.txt`
- `PAPER4_ATTACK2_2138_INDEPENDENT_FULL_AF_AFD_OUTPUT.txt`
- `PAPER4_ATTACK2_2138_INDEPENDENT_FULL_AF_AFD_COMPARISON.txt`
- `PAPER4_ATTACK2_2138_INDEPENDENT_CORRECTED_ABCF_OUTPUT.txt`

## 7. Epistemic status

\[
\boxed{\texttt{EXACT-CHECKED + INDEPENDENTLY REPLAYED}}
\]
