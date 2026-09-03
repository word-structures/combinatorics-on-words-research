# Paper 4 — Exact Closure of Six A-Swap Components

**Date:** 2026-08-27  
**Status:** `EXACT-CHECKED / COMPONENT-LOCAL`  
**Novelty status:** `NOT_ESTABLISHED`

## 1. Purpose

This certificate records a stronger finite result than random-pool screening.

The state space considered here is the graph whose vertices are internally
period-\(2,\ldots,20\)-clean A-role words of length 40 with Parikh vector

\[
(15,14,11),
\]

and whose edges join words differing by one transposition of two unequal
positions.  Such a transposition preserves the A-role Parikh vector.

Starting from A words that had produced exact AFD witnesses, the complete
connected components under this move were enumerated by BFS.

Every vertex of every component below was then treated by exact finite
backtracking, not by random sampling.

## 2. The six closed components

| Component | A vertices | Exact AF modules | AFD survivors | Final obstruction |
|---|---:|---:|---:|---|
| C1 | 26 | 209 | 14 | 14/14 ABCF-dead |
| C2 | 475 | 24 | 16 | 16/16 ABCF-dead |
| C3 | 118 | 8 | 0 | AFD gate |
| C4 | 118 | 8 | 0 | AFD gate |
| C5 | 16 | 20 | 6 | full D join kills 6/6 |
| C6 | 16 | 20 | 0 | AFD gate |

Total A vertices:

\[
26+475+118+118+16+16
=
\boxed{769}.
\]

The six components are disjoint in the recorded enumeration.

## 3. Component C1

BFS size:
\[
26.
\]

Complete F enumeration over all 26 A vertices produced:

- exact AF modules: **209**
- A vertices with at least one AFD module: **3**
- exact AFD modules: **14**

All 14 AFD modules were sent through the ABCF conditional extension.
Result:

\[
\boxed{0\ \text{ABCF survivors}.}
\]

Primary files:

- `136_A_component_1.txt`
- `138_exact_component_AFD.cpp`
- `139_component1_AFD_output.txt`
- `139_component1_AFD.tsv`
- `141_component1_ABCF_output.txt`

## 4. Component C2

BFS size:
\[
475.
\]

An exact first-hit/no-hit AF scan over all 475 vertices established:

- **473** A vertices have no AF module at all;
- exactly **2** A vertices have at least one AF module.

Those two A vertices were re-run with complete F enumeration:

- complete F candidates: **5,058**
- exact AF modules: **24**

The exact AFD gate gave:

\[
8\ \text{AFD-dead}
+
16\ \text{AFD survivors}.
\]

All 16 AFD survivors were sent to ABCF.
Result:

\[
\boxed{0\ \text{ABCF survivors}.}
\]

Primary files:

- `136_A_component_2.txt`
- `142_component2_AF_firsthit_output.txt`
- `144_component2_all_AF_modules.tsv`
- `145_component2_all_F_output.txt`
- `147_component2_AFD_output.txt`
- `149_component2_ABCF_output.txt`

## 5. Components C3–C6

These four components were discovered from a new A pool that explicitly
excluded the two earlier closed components.

BFS sizes:

\[
118,\quad118,\quad16,\quad16.
\]

Exact AF first-hit/no-hit screening over all 268 vertices found only

\[
6+6+2+2=16
\]

A vertices with any AF module.

Complete F enumeration over those 16 A vertices produced exactly

\[
56
\]

AF modules, distributed by component as:

- C3: 8
- C4: 8
- C5: 20
- C6: 20

The AFD gate retained only 6 modules, all belonging to **one A vertex in C5**.

Thus:

- C3: 0 AFD survivors;
- C4: 0 AFD survivors;
- C5: 6 AFD survivors;
- C6: 0 AFD survivors.

All six C5 AFD modules independently passed the ABCF extension gate, producing
the same B/C core with six nearby F choices.

This was the first nonempty intersection between the separate AFD and ABCF
gates.

## 6. Full D join for the C5 intersection

The AFD gate had stored only the first D witness for each AF module.  Those
stored witnesses were not compatible with the B/C core: an independent
ABCDF verifier found a `bd` period-8 obstruction.

Therefore the correct test was to discard the stored witness and enumerate D
again **from scratch** while simultaneously enforcing the known A/B/C/F
contexts.

For each of the six C5 ABCF cores, D was constructed under the prefix
constraints

\[
AD,\quad BD,\quad CBD,\quad FAD,\quad FBD,
\]

with final exact checks of all D-containing \(h_6\) bigrams and trigrams over
\(\{a,b,c,d,f\}\):

bigrams:
```text
ad bd dc df
```

trigrams:
```text
adf bdc bdf cbd dcb dfa dfb fad fbd
```

For every one of the six cores:

- D DFS nodes: **635**
- complete D words: **0**
- true ABCDF survivors: **0**

Hence:

\[
\boxed{\text{C5 is also exactly closed}.}
\]

Primary files:

- `161_fresh5_components_AFD_survivors.tsv`
- `164_fresh5_components_ABCF_output.txt`
- `165_independent_ABCDF_verify.txt`
- `166_exact_full_D_join.cpp`
- `168_full_D_join_output.txt`

## 7. Exact component-local conclusion

Every A vertex in all six enumerated connected components has been excluded
from a full six-role length-40 coding by exact necessary finite gates.

Therefore:

\[
\boxed{
769\ \text{A vertices in six complete swap components}
\quad\Longrightarrow\quad
0\ \text{possible full codings}.
}
\]

This is stronger than sampling 769 isolated A words because the complete
connected components under the specified Parikh-preserving one-swap move are
closed.

## 8. What this does NOT prove

It does not prove that:

- these six components are all components of the clean A-role state graph;
- no length-40 coding exists;
- every AFD island is connected to one of these components;
- Mäkelä's problem has a negative answer.

The next exact search strategy is therefore:

\[
\boxed{
\text{sample an unseen A}
\to
\text{find AF/AFD seed}
\to
\text{enumerate its entire swap component}
\to
\text{close or extend the component}.
}
\]

## 9. Epistemic label

`EXACT-CHECKED / COMPONENT-LOCAL`
