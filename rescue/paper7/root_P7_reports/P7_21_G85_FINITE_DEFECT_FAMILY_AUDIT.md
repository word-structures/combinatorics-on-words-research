# P7_21 — G85 FINITE-DEFECT FAMILY AUDIT

We evaluated whether the exceptional-boundary paradigm $B \cdot g_{85}^\omega(a)$ can structurally yield a proven one-sided separation $w \in re(\mathcal{A}_4) \setminus e(\mathcal{A}_4)$ at the family level, or if the strategy fundamentally lacks a certifiable all-depth extinction mechanism.

## 1. Frozen Seven-Boundary Status

| Boundary | Escape Length | Infinity Status | G85 Backward | Left Survival | Balanced Survival |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `cbd` | 1 | FINITE-ONLY | NO G85 BACKWARD | Tested (min 392 at d=12) | Tested (min 419 at d=7) |
| `bdb` | 2 | FINITE-ONLY | NO G85 BACKWARD | Tested (min 787 at d=12) | Tested (min 2013 at d=7) |
| `ad` | 3 | PROVED (P7_16) | NO G85 BACKWARD | 200+ (expanding) | 18+ (expanding exponentially) |
| `bad` | 3 | FINITE-ONLY | NO G85 BACKWARD | Tested (min 697 at d=12) | Tested (min 1160 at d=7) |
| `cad` | 3 | PROVED (P7_20) | NO G85 BACKWARD | Tested (min 514 at d=12) | 15+ (expanding exponentially) |
| `dbd` | 3 | PROVED (P7_20) | NO G85 BACKWARD | Tested (min 312 at d=12) | 19+ (expanding exponentially) |
| `adb` | 4 | FINITE-ONLY | NO G85 BACKWARD | Tested (min 633 at d=12) | Tested (min 2687 at d=7) |

## 2. Two-Sided State Definition (Scope A)

To certify bi-infinite completions using the P7_16 methodology, a two-sided state must capture exact desubstitution alignment.
**Definition:** A two-sided boundary state is a tuple $(c_{-1}, k_{-1}, c_1, k_1, \Delta W')$, where:
*   $c_{-1}, c_1 \in \{a,b,c,d\}$ are the left and right boundary blocks.
*   $k_{-1}, k_1 \in \{0, \dots, 85\}$ are the alignment offsets into the blocks.
*   $\Delta W' \in \mathbb{Z}^4$ is the integral Parikh discrepancy vector required to balance crossing squares.

**Completeness:** This state definition is mathematically past- and future-complete **only for substitutions governed by $g_{85}$**. Any two words mapping to the same state will have exactly the same legal $g_{85}$ predecessor/successor lifts. 

## 3. The Empty Graph and Scope Limitation

When we attempt to map the seven frozen boundaries into this exact state graph to find recurrent Strongly Connected Components (SCCs):
*   **Result:** The left-side predecessor mapping is **EMPTY**. As proven in P7_18 and P7_19, none of the boundaries are valid suffixes of any $g_{85}$ block, nor can they be formed by cross-boundary junctions. 
*   **Conclusion:** None of the boundaries admit a bi-infinite completion *inside the $g_{85}$ orbit*. 

## 4. Critical Scope Audit

Does the P7_21 state system characterize:
*   **Scope A:** only G85-morphic/preimage completions?
*   **Scope B:** all possible four-letter ASF left/right completions?

**Answer: Strictly Scope A.** 
The state system relies on exact block parsing, the strict determinant of $M_{85}$, and Mossé's theorem for unique alignment. It inherently assumes the completion is formed by $g_{85}$ blocks.

However, the empirical evidence from `ad`, `dbd`, and `cad` demonstrates robust, exponentially expanding left and balanced survival (e.g., `ad` surviving to depth 200+ leftwards). These surviving completions *must* be non-morphic (or non-$g_{85}$-morphic), effectively stitching an unstructured/hybrid ASF left-tail onto the G85 right-core. 

## 5. Mathematical Scope B Failure

To prove $w \notin e(\mathcal{A}_4)$, we would need to certify that *no* completion exists—morphic or unstructured. Doing so requires a finite quotient capturing **Scope B** (all possible ASF contexts). 
Because the language of all ASF words is not context-free and requires unbounded memory to track arbitrary non-morphic square-avoidance, no finite future/past-complete quotient can be constructed for Scope B. We cannot leverage the compact exactness of the $g_{85}$ state graph to rule out unstructured completions.

Without a Scope B quotient, the observed balanced expansion of our strongest candidates (`dbd`, `cad`, `ad`) cannot be mathematically bounded or proven to extinguish at an arbitrary depth. 

## 6. Final Classification

Because no practical finite e-certificate architecture can be constructed for unstructured tails, and the finite-defect strategy empirically generates non-morphic survivors rather than clean balanced extinctions, the current construction paradigm is structurally unsuited for this proof.

`NO FAMILY-LEVEL e-CERTIFICATE ARCHITECTURE`
