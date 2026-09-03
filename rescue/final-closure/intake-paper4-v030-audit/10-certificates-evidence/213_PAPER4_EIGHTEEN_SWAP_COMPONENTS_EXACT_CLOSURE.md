# Paper 4 — Exact Closure of Eighteen A-Swap Components

**Date:** 2026-08-27  
**Status:** `EXACT-CHECKED / COMPONENT-LOCAL`

## Current exact ledger

The internally clean A-role one-swap graph has now been explored through
eighteen complete connected components discovered from independent AF-hit seeds.

Previous twelve components:

\[
853\ A,\qquad 375\ AF,\qquad 39\ AFD,\qquad 0\ \text{full candidates}.
\]

Fresh8 contributed six new components of sizes

\[
10,\ 10,\ 10,\ 10,\ 89,\ 89,
\]

for a total of

\[
218
\]

new A vertices.

Exact AF first-hit/no-hit screening over every vertex in the six components
identified 38 A vertices with any AF continuation.

Complete F enumeration over those 38 A vertices produced exactly

\[
76
\]

AF modules.

The exact AFD gate classified all 76 as dead:

\[
\boxed{76\ \text{AFD-dead},\qquad 0\ \text{AFD survivors}.}
\]

Therefore no ABCF work was required for these six components.

## Combined exact component-local total

Across all eighteen complete components:

\[
\boxed{
1071\ A\text{-states}
\longrightarrow
451\ \text{exact AF modules}
\longrightarrow
39\ \text{AFD modules}
\longrightarrow
0\ \text{full candidates}.
}
\]

All 18 connected components are completely classified under the current exact
finite gates.

## Fresh8 provenance

Fresh A pool:

- `200_a_fresh8_6000.txt`
- generation seed `82722110`
- all previous A pools and all 12 previously closed components explicitly excluded.

Exact component BFS:

- `205_fresh8_component_1.txt` — 10 vertices
- `205_fresh8_component_2.txt` — 10 vertices
- `205_fresh8_component_3.txt` — 10 vertices
- `205_fresh8_component_4.txt` — 10 vertices
- `205_fresh8_component_5.txt` — 89 vertices
- `205_fresh8_component_6.txt` — 89 vertices
- `206_fresh8_components_output.txt`

Exact AF screening and enumeration:

- `207_fresh8_component*_AF_firsthit_output.txt`
- `208_fresh8_component_hit_A_list.txt`
- `209_fresh8_components_all_AF_modules.tsv`
- `210_fresh8_components_all_F_output.txt`

Exact AFD gate:

- `211_exact_AFD_fresh8_components.cpp`
- `212_fresh8_components_AFD_output.txt`

## Scope limitation

This remains a component-local finite result. It does not establish that the
18 components exhaust the clean A-role state graph, nor that no length-40
coding exists.

`OPEN`: whether an unvisited component contains a full candidate.

## Epistemic label

`EXACT-CHECKED / COMPONENT-LOCAL`
