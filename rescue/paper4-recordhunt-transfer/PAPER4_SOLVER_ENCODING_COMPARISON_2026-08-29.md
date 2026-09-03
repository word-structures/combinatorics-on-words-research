# PAPER4_SOLVER_ENCODING_COMPARISON_2026-08-29

## Objective
Evaluate if Paper 4's support/target compiler materially simplifies SAT/CSP/ILP solver formulations compared to naive position-level encodings.

## Comparison Models

### A. Naive Position-Level Encoding (SAT/SMT)
- **Variables**: Boolean x_{i,a}, x_{i,b}, x_{i,c} for each position i from 1 to N.
- **Constraints**: For every length 2h, the sum of variables in the left half must not equal the right half.
- **Complexity**: Computing sums requires Boolean adder circuits. The number of adders grows as O(N^2). For N=400, this generates millions of clauses and intermediate carry variables, choking standard SAT solvers.

### B. Paper-4 Support-Family Encoding (ILP/SMT)
- **Variables**: Integer/Categorical variables B_j for the j-th macro block of length L.
- **Short Squares**: K < 2L are encoded naively, but bounded to small local windows, generating very few clauses.
- **Long Squares**: K >= 2L are mapped to the 19 families.
- **Constraints**: Instead of building adders for letters, the solver only tracks the macroscopic block Parikh vectors. The constraint is an affine integer inequality:
  sigma(B) != 0 for all 19 support families.
- **Complexity**: The number of variables is reduced by a factor of L. The constraints are native linear integer arithmetic rather than Boolean circuits.

## Verdict
**ILP FEASIBILITY TRANSFER IS PROMISING.**
Paper 4 fundamentally changes the computational complexity class of the long-range abelian square problem from deep Boolean circuit satisfiability (SAT) to Integer Linear Programming (ILP) or SMT(LIA). By compiling the combinatorial character matching into 19 affine inequalities on block vectors, the solver only needs to balance macroscopic counts, drastically reducing memory and solver time for large N.
