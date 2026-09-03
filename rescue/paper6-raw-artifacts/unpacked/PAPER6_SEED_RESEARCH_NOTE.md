# VEIKKO BLOCK-SURVIVAL RESEARCH SEED
## Preliminary Paper-6 line — not a manuscript
**Date:** 2026-08-29

## 1. What was investigated

The proposed object is not the search-tree "survival function".
It is an actual mathematical language:

> choose blocks from a fixed finite library `B`, concatenate them according
> to a declared assembly law, and count how many resulting block sequences
> still satisfy aa2f / aa2fr globally.

For independent uniform blocks,

    P_n = A_n / |B|^n,

where `A_n` is the number of globally safe `n`-block assemblies.

This is exactly the mathematical version of Veikko's probability question.

## 2. First exact result

The exponential survival rate exists.

If `lambda_B = lim A_n^(1/n)`, then

    lim P_n^(1/n) = lambda_B / |B|.

Hence, when `lambda_B < |B|`,

    P_n = exp(-D_B n + o(n)),
    D_B = log(|B|/lambda_B) > 0.

So "how fast does the fraction of good long assemblies disappear?" has a
well-defined exact exponential-scale answer before any Monte Carlo modelling.

The proof is in `THEOREM_SEED.md`.

## 3. Veikko's huge adjacency matrix is useful — but only as the first upper bound

Let the vertices be blocks in `B`, and draw

    b -> c

when the aligned two-block concatenation `bc` is safe.

Every globally safe block sequence is a path in this graph.  Therefore its
Perron root gives a rigorous upper bound on the true survival growth rate.

But this adjacency graph is not exact: a forbidden abelian square can start
inside one block and end after crossing more than one block boundary.
This is precisely where carry/cutpoint geometry matters.

The correct hierarchy is

    pair graph
      -> 3-block transfer graph
      -> 4-block transfer graph
      -> ...
      -> exact global block language.

The corresponding spectral radii decrease monotonically to the true
block-survival growth rate.

This gives a clean mathematical interpretation of Veikko's adjacency idea:
**the huge sparse adjacency matrix is not the final solution, but it is the
first rigorous transfer-operator upper bound.**

## 4. Exact pilot with the real aa2f definition

A small calibration was run over the ternary alphabet with block length `L=4`.

Definitions used:

- aa2f: no abelian square with half-period `K>=2`;
- aa2fr: aa2f plus
  `abbc, accb, baac, bcca, caab, cbba`.

The full length-4 libraries contain:

- aa2f: **66** blocks;
- aa2fr: **60** blocks.

### Block-window transfer hierarchy

| mode | window m | states | edges | spectral radius | root survival upper bound |
|---|---:|---:|---:|---:|---:|
| aa2f | 2 | 66 | 1572 | 24.546768001 | 0.371920727 |
| aa2f | 3 | 1572 | 20454 | 14.244834804 | 0.215830830 |
| aa2fr | 2 | 60 | 696 | 12.435741946 | 0.207262366 |
| aa2fr | 3 | 696 | 4350 | 7.048903841 | 0.117481731 |

This is already structurally informative:

- the pair graph is a substantial but loose upper bound;
- adding exact 3-block windows lowers the exponential root bound sharply;
- aa2fr is substantially more restrictive in this calibration;
- the state space expands rapidly, so an uncompressed L=40 transfer operator
  will be impractical.

### Exact calibration counts

For aa2f:

    A_1 = 66
    A_2 = 1572
    A_3 = 20454

For aa2fr:

    A_1 = 60
    A_2 = 696
    A_3 = 4350

For aa2f with the *complete* L=4 library these are exactly the ordinary aa2f
counts at character lengths 4, 8 and 12.  This is the expected calibration:
using every length-L aa2f block merely recodes the global aa2f language.

## 5. Character-level cutoff hierarchy

A second exact hierarchy forbids only half-periods `2..Kmax`.
Its finite suffix memory is `2*Kmax-1` characters (plus FORBID4 memory for aa2fr).

The machine results for `Kmax=2..6` are in `HALFPERIOD_CUTOFF_SFT.csv`.

The important observation is not any single number but the monotone mechanism:

    lambda_Kmax ↓ lambda_exact.

At `L=4`, the state counts already grow from tens to thousands by `Kmax=6`.
This confirms the expected killer for Veikko's L=40 data:
**literal suffix state is exact but will explode.**

That is exactly the opening for Paper 4 / Paper 5 compression.

## 6. Relation to Paper 4 and Paper 5

### Paper 4 contribution to this line

A naive aligned block graph misses offset windows.

Paper 4 classifies the physical cutpoint/carry geometries of such cross-boundary
constraints.  In a large-block transfer calculation it can therefore compile
the character-level forbidden-window checks without treating every offset as an
unstructured special case.

### Paper 5 contribution if the current theory survives independent validation

When many literal blocks share a profile or partial prefix data, exact
reachable-set queries can decide whether a constraint is possible over a whole
family without enumerating every literal completion.

For Paper 6 this suggests a possible state quotient:

    literal block histories
      -> support / profile / reachable response classes
      -> weighted transfer operator.

Whether that quotient is exact enough for counting is **open** and must be
attacked, not assumed.

## 7. Critical novelty boundary

The project already has a proved upper bound on the growth rate of the **whole
aa2f language**.  General factorial-language entropy and finite-type
approximations are classical symbolic dynamics.

Therefore Paper 6 cannot claim novelty for:

- Fekete's lemma;
- existence of entropy for factorial languages;
- transfer matrices / Perron roots;
- finite-type approximation in general;
- the global aa2f growth problem itself.

The potentially new research object is:

> **relative survival entropy inside a selected aa2f/aa2fr block library,
> especially Veikko's trimmed length-40 family, together with an exact
> compressed computation of that entropy using the physical constraint
> structure.**

That is a genuinely different question from counting all aa2f words.

## 8. Current verdict

**A — SEED IS MATHEMATICALLY REAL.**

There is already a clean theorem-level answer at exponential scale, a rigorous
transfer hierarchy, and a small exact calibration.

But there is not yet evidence for a Paper 6.

The decisive next input is Veikko's actual trimmed L=40 block list (and, if the
assembly is not uniform independent choice, the exact contact/selection law).

With that data the first real experiment is:

1. verify every supplied block independently as aa2f / aa2fr;
2. record `|B|`, profile histogram and symmetry reduction;
3. compute or stream the pair-transfer operator;
4. obtain `rho(A_2)/|B|`, the first rigorous exponential upper bound;
5. compile all offset windows requiring 3-block context;
6. compute the 3-block upper bound without materializing a gigantic dense
   matrix;
7. compare the reduction with Paper-4 physical classes and Paper-5 response
   classes.

If the pair / 3-block bounds are already far below 1, Veikko's observed
"small fraction survives" becomes a theorem-shaped exponential rarity result.
If they stay close to 1, the interesting structure lives at genuinely long
block ranges.
