# Paper 4 — Claim / Prior-Art / Evidence Matrix

**Version 0.5 — 2026-08-27**  
**Purpose:** adversarial audit index for Claude or a human referee.

| ID | Claim | Epistemic status | Closest prior art | Project evidence | Claude attack |
|---|---|---|---|---|---|
| C01 | Mäkelä original ternary conjecture remains unresolved in sources checked | LITERATURE-VERIFIED TO SEARCH DATE, not exhaustive | Fici–Puzynina 2023; Rao–Rosenfeld 2018 | literature audit v0.5 | Find any 2024–2026 counter-source |
| C02 | Universal 6→3 Abelian-square-free morphism preservation is impossible | KNOWN COROLLARY | Carpi 1993 | manuscript §5 | Verify exact Carpi theorem hypotheses |
| C03 | Fixed \(h_6\) language avoids the universal barrier | KNOWN PARADIGM + interpretation | Rao–Rosenfeld 2018 | manuscript §5 | Check wording does not imply new theorem |
| C04 | rank-one incidence lift preserves kernel under stated nonzero column-sum hypotheses | PROVED / ELEMENTARY | linear algebra | clean-room proof audit | Search for missing exceptional case |
| C05 | 14 bigrams / 22 trigrams are exact \(h_6^\omega(a)\) factor sets | EXACT-CHECKED | source morphism | factor-language recheck | independently regenerate closure |
| C06 | \(K\le40\) square lies in ≤3 H40 blocks | PROVED | elementary uniform-code locality | clean-room proof | attack off-by-one at block boundaries |
| C07 | checking all 22 H-trigrams is iff for \(2\le K\le40\) | PROVED + EXACT | template/locality context | clean-room proof | attack missing 1/2-block factors |
| C08 | boundary second-difference formula is exact | PROVED PROJECT DERIVATION | Currie–Rampersad templates | proof audit | attack signs, carries, equal-length normalization |
| C09 | ambient fixed-Parikh swap graph is classic | KNOWN | Chase 1973 | literature audit | ensure manuscript cites Chase |
| C10 | clean A-role graph is induced subgraph of Chase \(G(15,14,11)\) | PROVED DEFINITIONAL | Chase 1973 | component spec | check internal-clean predicate |
| C11 | exhaustive negative extension logic has prior art | KNOWN METHODOLOGY | Keränen 2007/2010 | literature audit | prevent novelty overclaim |
| C12 | finite component exclusion theorem is sound | PROVED | nearest: Chase + Keränen, but not same composition | component theorem v0.1 | construct hypothetical full H and trace every gate |
| C13 | Historical 18-component aggregate | PARTIALLY INVALIDATED | project computation | soundness correction | C1/C2/C5/C8 require corrected ABCF replay; 14 AFD-zero components remain exact |
| C14 | one 4-state component independently replays as 4→12→0 | EXACT-CHECKED INDEPENDENT | project | independent replay C11 | reimplement again / compare AF list hash |
| C15 | \(Q M_{h_6}^2=0\) and \(|Qd|\le(4,4,2)\) | PROVED + EXACT | Rao–Rosenfeld spectral framework | Gate-T readiness | recompute Q and factor boundary ranges |
| C16 | g3 outer-parent regression yields 11023 bounded parent templates | EXACT-CHECKED STRUCTURAL | Rao–Rosenfeld published ≤16214 realizable-parent superset | Gate-T prototype | explain non-equality; verify no omission |
| C17 | g3 source-realizability regression returns none | EXACT-CHECKED | Rao–Rosenfeld Theorem 10 | regression output | independent implementation |
| C18 | bad H40 positive control gives realizable witness `cbce` | EXACT-CHECKED | project falsified candidate | fail-closed output | verify witness directly |
| C19 | Gate T source certifier is fail-closed under dynamic bounds | PROVED + REGRESSION | Rao–Rosenfeld Prop. 9–10 | fail-closed milestone/code | attack all expanding/contracting bounds |
| C20 | project component/gate composition is novel | NOVELTY_UNRESOLVED | Chase; Keränen; Shur; Grytczuk–Stankiewicz | literature audit | actively search for exact precedent |
| C21 | h6-specific Q-coordinate Gate-T specialization is novel | NOVELTY_UNRESOLVED | Rao–Rosenfeld; 2026 sieve | literature audit | search spectral-coordinate parent enumeration prior art |
| C22 | positive Mäkelä solution exists in project | FALSE / NOT ACHIEVED | — | no H passes both gates yet | reject any accidental wording implying solution |

## Required audit verdicts

For every row Claude must return exactly one of:

- `PASS`;
- `FAIL`;
- `NEEDS_SOURCE`;
- `NEEDS_INDEPENDENT_REPLAY`;
- `NOVELTY_UNRESOLVED`;
- `OUT_OF_SCOPE`.

No generic "looks good" verdict is acceptable.

## Hard failure conditions

Any of these is manuscript-blocking:

1. a missing hypothesis in C04/C06/C07/C08/C12/C19;
2. a realizable parent in the claimed negative g3 regression;
3. a component gate that can discard a hypothetical valid H;
4. a 2024–2026 source solving Mäkelä;
5. wording that treats Chase's transposition graph or Keränen's exhaustive
   negative search as project inventions;
6. any claim that the 18 components exhaust the global A-role graph;
7. any claim that current computations constitute a positive Mäkelä solution.


## Soundness correction S1

Historical cyclic-BC pruning required `BCB` although `bcb` is not in the
\(h_6\) trigram language.

Required Claude verdict:
- verify that negative-certificate gates use only actual necessary contexts;
- treat any unproved stronger pruning condition as `FAIL`;
- replay C1/C2/C5/C8 with the corrected gate before restoring their exact
  status.

New corrected run:
\[
392 A\to250 AF\to5 AFD\to5 ABCF\to0 ABCDF.
\]


## Replay update R1

Historical corrected status:

- C1: `PASS` under corrected ABCF, 14/14 dead.
- C2: `PASS` under corrected ABCF, 16/16 dead.
- C5: `NEEDS_CORRECTED_REPLAY`.
- C8: `NEEDS_CORRECTED_REPLAY`.

New corrected attack:

\[
392 A\to250 AF\to5 AFD\to5 ABCF\to0 ABCDF.
\]

Independent Python full-D replay:
`PASS`.

Any aggregate count presented to a referee must explicitly exclude C5/C8
until their corrected replay is complete.


## Corrected ledger update R2

Publication-safe lower bound:

\[
26\text{ distinct sound components}
\]
\[
3575 A\to699 AF\to40 AFD\to5 ABCF\to0 ABCDF.
\]

Largest exact corrected component:
\[
2138 A\to39 AF\to5 AFD\to0 ABCF.
\]

Claude must verify:
- the 2138-state BFS is complete;
- all 2109 non-hit A states have exhaustive no-AF certificates;
- all 29 hit A states received complete F enumeration;
- the 5 AFD modules were checked only against actual-language ABCF contexts.


## D-aware and replay update R3

New primary audit claims:

- 2138-state component has full independent replay:
  \[
  2138A\to39AF\to5AFD\to0ABCF.
  \]
- all 40 sound AFD modules have complete D enumeration:
  \[
  407\text{ D records}.
  \]
- independent D enumeration reproduces the same 407 records;
- B-first and D-first ABDF searches both produce exactly two identical
  \((B,D)\) pairs;
- independent Python C replay gives zero C extensions;
- preferred gate order:
  \[
  AF\to\text{all AFD-D}\to ABDF\to ABCDF\to E.
  \]
- conservative sound ledger:
  \[
  36\text{ components},\quad
  3892A\to866AF\to40AFD\to2ABDF\to0ABCDF.
  \]

Claude must attack the ABDF factor trace:
`fb,bdf,dfb,fbd`, and the C trace:
`ac,bc,cb,dc,cbc,bdc,cbd,dcb`.
