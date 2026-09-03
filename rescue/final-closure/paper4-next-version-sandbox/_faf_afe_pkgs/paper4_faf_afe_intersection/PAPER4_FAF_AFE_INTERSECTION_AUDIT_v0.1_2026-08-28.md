# PAPER 4 — exact `FAF ∩ AFE` intersection structure

**Version:** v0.1  
**Date:** 2026-08-28  
**Status:** independent sandbox mathematics; no current Paper-4 population data used

## Executive result

Let `x_j = p_F(j)` with fixed endpoints `x_0=0` and `x_40=m(F)`.

After endpoint substitution, the entire **AFE F-variable structural signature set is already contained in FAF**. FAF has exactly **400 additional signatures**, and those 400 form one explicit same-parity midpoint-contact family.

Therefore adding AFE to complete-AF does **not** add new prefix-variable graph topology. It adds additional forbidden affine target values on linear forms/supports already present in FAF.

This suggests a sharper interpretation of the observed `AF_AND_AFE_EXISTS` effect: if the preregistered separation replicates, the mechanism should be sought in **compatibility of affine target sets on a shared prefix skeleton**, not in AFE creating a new interaction graph.

## 1. Exact compilation and regression

- `H(faf)`, `K=2..60`: **3481** windows.
- `H(afe)`, `K=2..40`: **3081** windows.

Every window is compiled from `P(s+2K)-2P(s+K)+P(s)=0` into `sum_j c_j x_j + C(A,E)=0`.

Direct-vs-compiled regression:
```json
{
  "seed": 20260828,
  "trials": 100,
  "comparisons": 656200,
  "genuine_squares_seen": 26265,
  "branch_counts": {
    "('afe', 0)": 72400,
    "('afe', 1)": 127500,
    "('afe', 2)": 75800,
    "('afe', 3)": 32400,
    "('faf', 0)": 36400,
    "('faf', 1)": 95300,
    "('faf', 2)": 151600,
    "('faf', 3)": 64800
  },
  "status": "PASS"
}
```

## 2. Reconciliation with Report #6 arity counts

There are two useful notions of arity.

**Geometric cut-point arity** counts how many of the three cuts lie in the F block. For AFE this independently reproduces Report #6 exactly:

| cut-point arity | windows |
|---:|---:|
| 0 | 703 |
| 1 | 1238 |
| 2 | 798 |
| 3 | 342 |

For algebraic solving, substitute `x_0=0`, `x_40=m(F)` and combine equal depths. The remaining **free-variable arity** is:

| arity | AFE | FAF |
|---:|---:|---:|

| 0 | 724 | 364 |
| 1 | 1275 | 953 |
| 2 | 758 | 1516 |
| 3 | 324 | 648 |

This is not a contradiction. Boundary cuts at prefix depth 0 or 40 stop being free variables after the endpoint equations are substituted.

## 3. Structural signature inclusion

Define a structural signature as the coefficient/depth pattern `((j_1,c_1),...)` after endpoint substitution, before inserting the A/E-dependent constant.

Exact L=40 symbolic enumeration gives:

- AFE signatures: **1161**
- FAF signatures: **1561**
- `S_AFE ⊆ S_FAF`: **TRUE**
- FAF-only signatures: **400**

The inclusion is about the linear forms, not the forbidden constants. Thus AFE is not redundant: the same linear form can receive new forbidden target values depending on E.

## 4. Exact FAF-only midpoint family

For `1 <= i <= j <= 39` with `i` and `j` of the same parity, put `a=(i+j)/2`.

The FAF window whose three cuts are at F-prefix depth `i`, A-prefix depth `a`, and F-prefix depth `j` has equality

`x_i + x_j - 2 p_A(a) + m(A) - m(F) = 0`.

Equivalently,

`x_i + x_j = 2 p_A((i+j)/2) + m(F) - m(A)`.

For `i=j` this becomes the doubled-prefix unary relation `2x_i + ... = 0`. For `i<j`, the symmetric half-periods `K=40 ± (j-i)/2` give the same affine equality.

Counts:

- diagonal `i=j`: **39**
- off-diagonal same-parity pairs: **361**
- total: **400**

There are 20 odd and 19 even internal depths, hence `20*21/2 + 19*20/2 = 400`.

Exact symbolic set equality holds:

`S_FAF \ S_AFE = midpoint-family`.

The midpoint formula was also checked directly on **20,000** randomized `(A,F,i,j)` instances with zero disagreements.

## 5. Incremental AFE on top of complete-AF

AFE contains 361 internal-A, 361 internal-F and 361 internal-E windows. In the staged search, A/E internal square-freeness is upstream and complete-AF already enforces F's internal square-freeness.

That leaves **1998** cross-boundary AFE windows.

After endpoint substitution:

- 2 become profile-only nonzero equalities (`m(F)-m(A)` and `m(E)-m(F)`), so they are automatically inactive;
- **1996** remain genuinely F-dependent.

Those 1996 windows occupy only **800 distinct variable signatures**:

- 78 unary;
- 722 binary.

Every one of these 800 signatures already occurs in FAF.

Thus AFE can be added to a complete-AF compiler as **extra forbidden target vectors attached to existing FAF signature buckets**.

## 6. Combined target-bucket formulation

For a signature `sigma=((j_1,c_1),...,(j_r,c_r))`, define the vector-valued linear form

`L_sigma(x) = c_1 x_{j_1} + ... + c_r x_{j_r}`.

Each concrete FAF or AFE window is simply a forbidden equality

`L_sigma(x) = T`

for one target vector `T`.

For fixed A,E, let `T_FAF(sigma;A)` and `T_AFE(sigma;A,E)` be the target sets. The exact intersection condition is

`L_sigma(x) not in T_FAF(sigma;A) union T_AFE(sigma;A,E)`

for every signature, together with the prefix-path endpoint and unit-step conditions.

So the combined gate is naturally a **same-linear-form / enlarged-target-set** problem.

## 7. Exact primal-graph theorem

After eliminating endpoints, the free variables are `x_1,...,x_39`.

For any `1 <= i < j <= 39` with `j-i >= 2`, choose the AFE window whose first cut inside F is at depth `i` and whose half-period is `K=j-i`. Its second cut is at depth `j`, so `x_i` and `x_j` occur together in one affine constraint.

Hence the AFE affine graph contains every pair of non-adjacent internal depths. The only missing pairs are the 38 adjacent pairs `(j,j+1)`.

But the prefix path has the unit-step relations `x_{j+1}-x_j in {e_a,e_b,e_c}`, supplying exactly those adjacent edges.

Therefore the full free-variable primal graph is exactly **K_39**, and its treewidth is exactly **38**.

This makes the earlier “active window 38” observation precise: a generic tree-decomposition DP on the raw prefix variables has no width reduction available. This does not rule out algebraic compression in a different representation.

## 8. General structural check

A purely structural implementation was checked for every `L=4..80`. In every case:

- `S_AFE ⊆ S_FAF`;
- `S_FAF \ S_AFE` is exactly the same-parity midpoint family;
- its cardinality is `floor(L^2/4)`;
- AFE supplies every non-adjacent free-variable edge;
- unit-step edges complete the primal graph to `K_(L-1)`.

The midpoint formula and primal-graph statement have direct proofs above. A fully general publication claim for the complete signature-set inclusion should still receive a clean written case proof rather than relying only on the L=4..80 computation.

## 9. What to do after the preregistered run

Do not touch the running population experiment.

If `AF_AND_AFE_EXISTS` remains selective, the next structural statistic should be computed on the preregistered real population:

- target-set overlap on each shared signature;
- target-set union size;
- which signatures/depths eliminate the last feasible F path;
- whether a small exact subset of signature buckets certifies incompatibility.

The key falsifiable hypothesis becomes:

**historical/productive (E,A) pairs leave a jointly feasible path through the union of FAF and AFE target sets, while nonproductive pairs accumulate incompatible target values on the same support skeleton.**

No claim is made yet that this is true.

## 10. Epistemic status

**PROVED / EXACT AT L=40**
- exact FAF and AFE affine compilation;
- `S_AFE ⊆ S_FAF`;
- 400 FAF-only signatures = midpoint-contact family;
- midpoint-contact equation;
- 1996 genuinely F-dependent incremental AFE cross-boundary windows;
- 800 incremental AFE signatures = 78 unary + 722 binary;
- all 800 already occur in FAF;
- combined support topology equals FAF topology;
- free-variable primal graph with path steps is `K_39`, treewidth 38.

**INDEPENDENT REGRESSION**
- direct-vs-compiled checks above, zero disagreements;
- 20,000 midpoint-formula direct checks, zero disagreements.

**NOT ESTABLISHED**
- that affine target-set incompatibility explains the H/R separation;
- a production-solver speedup;
- complete-AEF existence;
- L=40 impossibility;
- novelty.
