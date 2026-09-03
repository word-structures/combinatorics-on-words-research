# Paper 4 — Global Exclusion of Seven F-Swap Components (2761 States)

**Version 1.0 — 2026-08-27**  
**Status:** `EXACT-CHECKED`; all seven component vertex sets independently replayed by an alternative BFS.

## 1. Components

The 17 fixed-F blocks in the original D-bridge ledger lie in seven distinct
connected components of the internally period-\(2,\ldots,20\)-clean
fixed-content F-role transposition graph.

The complete component sizes are

\[
1273,\quad1076,\quad242,\quad106,\quad60,\quad2,\quad2.
\]

They are pairwise disjoint, so together they contain

\[
\boxed{2761}
\]

distinct F-role states.

A separately written alternative BFS reproduces the exact vertex set of every
one of the seven components.

## 2. Global-in-A classification

For every F state in every component, the search is exhaustive over the entire
A-role profile space.

The common exact pipeline is

\[
F
\to
(AF,FA,FAF)\text{-compatible A}
\to
(AD,DF,ADF,DFA,FAD)\text{-compatible D}
\to
C\text{-support }(AC,DC)
\to
B\text{-support }(FB,BDF,DFB,FBD)
\to
\text{full C}.
\]

Only actual \(h_6\)-factor constraints are used.

## 3. Exact component table

| component | F states | AF-positive F | AF-A | AFD-D | C-support | D-bridges | ABCDF |
|---|---:|---:|---:|---:|---:|---:|---:|
| C1273 | 1273 | 17 | 58 | 154 | 0 | 0 | 0 |
| C1076 | 1076 | 18 | 61 | 158 | 56 | 0 | 0 |
| C242 | 242 | 22 | 104 | 18 | 8 | 0 | 0 |
| C106 | 106 | 30 | 204 | 657 | 214 | 1662 | 0 |
| C60 | 60 | 2 | 6 | 81 | 31 | 0 | 0 |
| C2a | 2 | 2 | 8 | 142 | 46 | 0 | 0 |
| C2b | 2 | 2 | 35 | 491 | 317 | 0 | 0 |
| **total** | **2761** | **93** | **476** | **1701** | **672** | **1662** | **0** |

Thus

\[
\boxed{
2761F
\to93\text{ AF-positive }F
\to476\text{ AF-A}
\to1701\text{ AFD-D}
\to672\text{ C-support}
\to1662\text{ D-bridges}
\to0\text{ ABCDF}.
}
\]

## 4. Largest components

### 1273-state component

\[
\boxed{
1273F\to17F^+\to58AF\text{-A}\to154D\to0C\text{-support}.
}
\]

The component is globally excluded before B construction.

### 1076-state component

\[
\boxed{
1076F\to18F^+\to61AF\text{-A}\to158D
\to56C\text{-support}\to0D\text{-bridge}.
}
\]

### 106-state bridge-rich component

This component contains the only D-bridges among the seven:

\[
106F\to30F^+\to204AF\text{-A}\to657D
\to214C\text{-support}\to1662\text{ bridges}.
\]

Every bridge is sent to the full C gate.  The exact search finds

\[
\boxed{0\text{ prefix-complete C words}}
\]

and therefore zero ABCDF cores.

## 5. Independent component replay

Alternative-BFS SHA256 values:

```text
C1273 6c554de91b67e92671c6d358750eb727950a9e841cc320557a6225dd6e5fad00
C1076 c63d59f1f6579fa4c2d6cd1fae028922c6f2678527d87693fab7b896129bb5c6
C2a   f00fa7f6e90a23a8e6540175a396dcfb64c2661469a623f5fc53d113442103bc
C60   c6400c42da8439b0ea1699a2d5ab5602442b81c7e0cc9cd9f23b012b063447fe
C242  2a82a81c24ee67ac5372f4a197e7732375f0b25cb95e863579cb61d1fd678ee6
C106  ca6a1ebd7472f9e27481ec0646dd2ab673730b9454fad87a5a49736cdccb9114
C2b   90a174596334cadf13a92fdbf31a0a2d1d6edf0e54e3eba1a1cd5d046e590160
```

The alternative BFS vertex sets equal the primary sets exactly.

## 6. Scope

The theorem excludes all F states in these seven complete components,
independently of the A-swap component.

It does not claim that these seven components exhaust the internally clean
F-role graph.

**Epistemic label:** `EXACT-CHECKED / GLOBAL-IN-A FOR THESE F COMPONENTS`.

**Novelty:** `NOVELTY_UNRESOLVED`.
