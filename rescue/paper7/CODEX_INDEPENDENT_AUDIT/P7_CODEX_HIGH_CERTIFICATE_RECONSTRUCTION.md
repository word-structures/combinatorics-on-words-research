# Paper 7 v0.2 — Clean-Room Certificate Reconstruction

Audit date: 2026-09-03  
Status of new computations: `LEVEL_1_INTERNAL_CHECKSUM`  
Input policy: the submitted verifier and CSV files were not read by the clean-room generator. The four displayed morphism images and the displayed boundary word were transcribed as mathematical inputs. Comparisons with submitted data were performed only after reconstruction stabilized.

## Scope fence

| Preserved interface or artifact | Status |
|---|---|
| Original ZIP | Unmodified |
| Unpacked submitted files | Unmodified |
| Submitted verifier and CSV formats | Unmodified |
| Canonical morphism data, manuscript, and public APIs | Unmodified |
| New work | Confined to `CODEX_INDEPENDENT_AUDIT/`; uncommitted |

## Mathematical inputs

| Object | Definition or value | Independent check |
|---|---|---|
| Alphabet | $\Sigma_4=\{a,b,c,d\}$ | Every displayed image uses only these symbols |
| Witness | $s=\texttt{abacabadc}$ | Direct Abelian-square scan found no violation in the 9-symbol word |
| Boundary word | $C=\texttt{abacabadcdb}$ | Direct scan found no violation in the 11-symbol word |
| Morphism | The four 85-symbol images embedded in `P7_CODEX_CLEANROOM_VERIFIER.py` | Lengths $85,85,85,85$; cyclic image relation holds |
| Incidence matrix | $M=(P(g(a)),P(g(b)),P(g(c)),P(g(d)))$ | $((19,21,27,18),(18,19,21,27),(27,18,19,21),(21,27,18,19))$ |
| Exact invertibility | $\det M=43435$ | Integer Gaussian elimination; no floating point |

Keränen's primary 1992 abstract states, “the morphism g itself is a-2-free” (opened 2026-09-03; [DOI 10.1007/3-540-55719-9_62](https://doi.org/10.1007/3-540-55719-9_62)). The author's current source also gives the displayed $g_{85}(a)$ and the cyclic construction of the other images ([Keränen's g85 page](https://algebra.fi/keranen/research/g85structures.html), opened 2026-09-03).

## Definitions reconstructed from the word geometry

| Item | Mathematical definition |
|---|---|
| Residual occurrence | A state $R(q,x,y)$ occurs in $V$ exactly when $V=A x B y D$ for words $A,B,D\in\Sigma_4^*$, marked letters $x,y\in\Sigma_4$, and $q=P(A)-P(B)\in\mathbb Z^4$. |
| Empty factors | $A$, $B$, and $D$ may be empty. The marked occurrences $x$ and $y$ are distinct and ordered; $B$ may have length zero. |
| Sign convention | Prefix minus intervening gap: $q=P(A)-P(B)$. |
| Position identity | If the marked positions are zero-based $j<k$, then $\sum q=2j+1-k$, hence $k=2j+1-\sum q$. |
| Invariant class | $\mathcal C^*=\{V:C\preceq V,\ V\in\mathcal A_4,\text{ and no }R(q,x,y)\in Q\text{ occurs in }V\}$. |
| Occurrence complexity | $\mu=j$, the absolute zero-based position of the first marked letter in the current word. |

This is a word-level object, not a code record. Internal order in $A$ and $B$ is deliberately absent because the two exact equations below use only $P(A)-P(B)$. Alignment information is not discarded: every legal image letter and every occurrence offset are separately enumerated.

## Boundary-square derivation

For a square starting at $i<|C|$ with half-period $K\ge85$, its midpoint lies in an image $g(x)$ at offset $r\in\{0,\ldots,84\}$ and its end lies at prefix length $t\in\{0,\ldots,85\}$ of an image $g(y)$. Writing the source word as $V=A x B y D$, equality of the two Parikh vectors gives

$$
qM=P(g(x)[r:])+P(g(y)[:t])-P(C[i:])-P(g(x)[:r]),
\qquad q=P(A)-P(B).
$$

| Completeness component | Exact finite range |
|---|---:|
| Boundary start $i$ | $0\le i\le10$ |
| Midpoint source letter $x$ | 4 choices |
| Midpoint offset $r$ | $0\le r\le84$ |
| End source letter $y$ | 4 choices |
| End prefix length $t$ | $0\le t\le85$ |
| Integrality test | Solve $qM=\mathrm{rhs}$ using $\operatorname{adj}(M)/43435$ and retain exactly integral $q$ |

The ranges are finite because $C$ and each image are finite and the two cut positions determine the only partial blocks. The clean-room enumeration found 99 integral geometry rows and 35 unique states. Both endpoint cases $t=0$ and $t=85$ were enumerated; neither produced an integral row.

## Recursive transition derivation

Suppose a target state $R(q,x,y)$ occurs in $Cg(V)$ and the two marked letters lie in distinct blocks $g(h)$ and $g(k)$ at offsets $r$ and $t$. If $V=A h B k D$, exact expansion gives

$$
q'M=q-P(C)-P(g(h)[:r])+P(g(h)[r+1:])+P(g(k)[:t]),
\qquad q'=P(A)-P(B).
$$

| Check | Clean-room result |
|---|---:|
| Integral transition rows | 17 |
| Transition source states outside $Q$ | 0 |
| Maximum legal integral alignments for one target state | 3 |
| Target states with multiple alignments | $(0,0,-1,1,c,d)$: 2; $(0,1,0,-1,d,b)$: 3; $(1,0,0,0,a,b)$: 2 |
| State-only cyclic strongly connected components | 1 |
| Cyclic component | $\{R((0,0,-1,0),c,b),R((0,1,0,-1),d,b)\}$ |

The state quotient survives the hostile checks. Equal Parikh data with different internal orders have the same equation by morphism additivity. Different image alignments are not identified: all are enumerated, including the three multiply aligned targets above. Same-block cases, marks in $C$, and short-period cases are not forced into recursion; they terminate in the fixed base regime.

## Exact descent

For a transition with source vector $q'$, the smallest possible lengths of $A$ and $B$ are

$$
|A|_{\min}=\sum_i\max(q'_i,0),\qquad
|B|_{\min}=\sum_i\max(-q'_i,0).
$$

If the first target mark is at offset $r$ in $g(h)$, then its smallest possible absolute position is $j=11+85|A|_{\min}+r$. The source occurrence has first marked position $|A|_{\min}$. Therefore the exact descent margin is $j-|A|_{\min}$.

| Result | Value |
|---|---|
| Minimum descent margin over all 17 rows | 79 |
| Worst target state | $R((0,1,0,-1),d,b)$ |
| Worst alignment | $h=b,r=68,k=b,t=63$ |
| Source state | $R((0,0,0,0),b,b)$ |
| Algebraic lower bound on the source span | 2 symbols; this is a constraint bound, not a claim that the two-symbol word belongs to the invariant class |
| Transition with $\mu'\ge\mu$ | None |

The state-only graph does contain the two-state cycle listed above. It is harmless: a realized traversal follows occurrences, and every traversal decreases the nonnegative integer $\mu$ by at least 79. Thus no realized infinite recursive chain or nondecreasing cycle exists.

## Base threshold reconstructed independently

| Configuration class | Independent bound | Reason |
|---|---:|---|
| Crossing square with $K<85$ | exclusive end at most 178 | $i\le10$ and $2K\le168$ |
| First residual mark in $C$ | second mark $k\le22$ | $j\le10$ and $k=2j+1-\sum q$ |
| Both residual marks in one image block | second mark $k\le168$ | block distance at most 84 and $\sum q\in\{-1,0,1\}$ |
| Common sufficient prefix length | 178 | Maximum of the preceding exclusive bounds |
| Submitted window | 190 | Safe, with 12 symbols of slack; no minimality claim |

The prefix condition $C\preceq V$ is load-bearing. It makes the first 190 symbols of every $Cg(V)$ in the invariant class equal to the first 190 symbols of $Cg(C)$. The single checked window therefore represents every nonrecursive case; it is not an observed tower-only surrogate for arbitrary short configurations.

Within this fixed 190-symbol window, the direct checker found no Abelian square and no occurrence of any of the 35 residual states. It also found no residual state in $C$ itself.

## Generic closure

| Hypothetical violation in $Cg(V)$ for $V\in\mathcal C^*$ | Exhaustive disposition |
|---|---|
| Abelian square wholly inside $g(V)$ | Excluded by Keränen's preservation theorem and $V\in\mathcal A_4$ |
| Boundary-crossing square with $K<85$ | Contained in the fixed 190-symbol window; direct scan found no violation there |
| Boundary-crossing square with $K\ge85$ | The complete seed equation induces a state of $Q$ in $V$, contradicting the invariant |
| Residual occurrence with a mark in $C$ | Contained in the fixed window; absent there |
| Residual occurrence with both marks in one image block | Contained in the fixed window; absent there |
| Residual occurrence with marks in distinct image blocks | One of all legal alignments in the transition enumeration; it desubstitutes to a state of $Q$ in $V$ |

All possible square and residual positions fall into exactly one of the rows above. Hence the reconstruction establishes the universal implication $V\in\mathcal C^*\Rightarrow Cg(V)\in\mathcal C^*$, conditional only on the opened external preservation theorem.

## Construction and finite-to-infinite step

| Claim | Reconstruction |
|---|---|
| $C\in\mathcal C^*$ | The 11-symbol word has no Abelian square and no $Q$-occurrence, and begins with itself |
| Tower lengths | $|W_0|=11$, $|W_1|=946$, $|W_2|=80421$ |
| Nestedness | $W_{n+1}=Cg(W_n)=C g(C)\cdots g^{n+1}(C)$, so $W_n\preceq W_{n+1}$ |
| Induction | Base membership plus generic closure gives $W_n\in\mathcal C^*$ for all $n$ |
| Infinite limit | Nested prefixes define $W_\infty$ |
| Infinite ASF proof | Any finite Abelian square in $W_\infty$ would lie in some finite prefix $W_n$, contradicting $W_n\in\mathcal A_4$ |

The direct checks on $W_1$ and the boundary of $W_2$ found no violation in those bounded words. They are regression checks only and are not used as an infinity proof.

## Left-death reconstruction

| Prepended letter | Start | Half-period | Exact factor | Halves | Common Parikh vector |
|---|---:|---:|---|---|---|
| $a$ | 0 | 1 | `aa` | `a` / `a` | $(1,0,0,0)$ |
| $b$ | 0 | 2 | `baba` | `ba` / `ba` | $(1,1,0,0)$ |
| $c$ | 0 | 4 | `cabacaba` | `caba` / `caba` | $(2,1,1,0)$ |
| $d$ | 0 | 5 | `dabacabadc` | `dabac` / `abadc` | $(2,1,1,1)$ |

Positions are zero-based. Together with the no-violation scan of $s$, this gives $L_1(s)=\varnothing$ directly from the definition.

## v0.1 failure mode and repair

| Item | Result |
|---|---|
| Old residual defect | The old expression subtracted a word containing the same prefix, algebraically cancelling information while its table contained incompatible positive coordinates. |
| Concrete prefixless counterexample | $V=b$ is Abelian-square-free and vacuously residual-free, but $Cg(b)$ has `bb` at start 10 with half-period 1. |
| v0.2 repair | The word-level factorization $A x B y D$ fixes the sign/meaning of $q$; the condition $C\preceq V$ excludes $V=b$ and makes all short cases share the checked prefix. |
| Stale 36-state support used | No |

## Raw-output evidence

| Command | Representative output read directly |
|---|---|
| `python CODEX_INDEPENDENT_AUDIT/P7_CODEX_CLEANROOM_VERIFIER.py` | `seed parameter rows (t=0..85): 99`; `unique residual states: 35`; `recursive transition rows: 17`; `transition sources outside Q: 0`; `minimum exact descent margin: 79`; `independently sufficient common prefix length: 178`; `base residual hits: 0 []` |
| `python CODEX_INDEPENDENT_AUDIT/P7_CODEX_COMPARE_CERTIFICATES.py` | Exact seed/state/transition set equality: `True`; missing/extra/duplicate rows: zero; all StateID mismatches: zero; all morphism representations equal: `True` |
| Submitted verifier | `P7 V2 CERTIFICATE: PASS`; this output was read, but its scope is assessed separately in the audit report |

## Independent digests

The digest input is a newline-separated sequence of canonical, compact JSON rows after independent sorting.

| Reconstructed object | Count | SHA-256 |
|---|---:|---|
| Seed geometry rows | 99 | `ac17abf357c0642584e8143ed8b5cedc1003caf0d067cb6e70f764ad3cfd1aa5` |
| Residual states | 35 | `7ec5d3451f67193ab5606f7ba68c2e3e411c2f4e2d84bc8c0cf9d8fd0e8eaab7` |
| Recursive transitions | 17 | `f67cdb0e2c0c2f9f26a3ae1592c20a1490749ecb935befb3efba54dddbb4be3d` |

## Reconstruction verdict

| Claim | Source | Reproduced? | Matches? |
|---|---|---:|---:|
| $99\to35\to17$ finite reduction | Clean-room equations and exact integer enumeration | Yes | Yes |
| Strict occurrence descent | Exact integer bounds over all 17 reconstructed rows | Yes | Yes |
| 190-symbol base sufficiency | Independent bound of 178 plus direct 190-symbol scan | Yes | Yes |
| Universal invariant closure | Exhaustive mathematical case split plus opened external preservation theorem | Yes | Yes |
| Main theorem | Combined left-death, right-infinite construction, and language definitions | Yes | Yes |

**Exact verdict: `THEOREM INDEPENDENTLY REPRODUCED`.**
