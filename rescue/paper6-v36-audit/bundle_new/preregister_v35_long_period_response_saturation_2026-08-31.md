# PAPER 6 v3.5 — PREREGISTRATION: LONG-PERIOD RESPONSE SATURATION
**Date:** 2026-08-31
**Status:** preregistered before implementation tests; novelty unassessed

## Candidate theorem (to prove algebraically before interpreting computationally)

Let `s` be an arbitrary history over an alphabet of size `d`, let `b` be a
candidate block of fixed length `L`, and let `P_j(b)` be the Parikh vector of
its prefix of length `j`.

For `k >= L` and `1 <= j <= L`, whenever `2k-j <= |s|`, define

    R_{k,j}(s) = Psi(first k letters of suf_{2k-j}(s))
                 - Psi(last k-j letters of suf_{2k-j}(s)).

Equivalently,

    R_{k,j}(s) = S_{2k-j}(s) - 2 S_{k-j}(s).

Define the finite target set

    T_j(s) = { R_{k,j}(s) : k >= L, 2k-j <= |s|, R_{k,j}(s) >= 0 coordinatewise }.

Since every such vector has coordinate sum `j`, `T_j(s)` is a subset of the
finite composition set

    P_j(d) = {u in N^d : sum u = j}.

The candidate theorem is:

> Appending `b` creates no Abelian square of half-period `k >= L` if and only if
> `P_j(b) notin T_j(s)` for every `j=1,...,L`.

Hence for a selected block library `B`, the complete long-period legal response
set is

    Resp_long(s) = B \ union_{j=1}^L union_{u in T_j(s)} {b in B : P_j(b)=u}.

Therefore the unbounded family of long-period crossing tests factors through
`T(s)=(T_1(s),...,T_L(s))`, whose ambient signature space has cardinality at
most

    2^( binom(L+d,d) - 1 ).

This is a statement about the *current one-block response*. It does NOT assert
that `T(s)` is update-closed, Markov, sufficient for all-horizon future
semantics, or that the infinite avoidance language is regular.

## Proof obligations

1. Derive the crossing decomposition directly from the two halves, without
   using rank, automaton quotient, or fitted coefficients.
2. Prove `sum R_{k,j}=j`, so only nonnegative composition vectors can match.
3. Prove the response-set formula.
4. Prove the cardinality bound by hockey-stick identity.

## Independent implementation tests

A. Exhaustive direct-vs-signature comparison on small alphabets/lengths.
B. Random/direct comparison on L4/L5 selected libraries.
C. Explicitly search for a counterexample to update-closure:
   histories `s,t` with the same current theorem descriptor/response signature
   but a common legal block `b` for which successor signatures differ.
   Finding such a counterexample is desirable because it prevents accidental
   overclaiming of finite-state sufficiency.

## Kill conditions

- Any direct long-period crossing square not represented by some `T_j` -> theorem FAIL.
- Any `T_j` match that does not correspond to the claimed crossing square -> theorem FAIL.
- If proof requires a finite half-period cutoff -> theorem must be demoted; the
  intended claim is unbounded in `k` for current response.
- If literature search finds this exact response-saturation theorem or a
  stronger theorem that directly subsumes it -> novelty must be demoted even if
  the theorem remains useful.

## Novelty status

NOVELTY UNASSESSED. No wording such as "new", "first", or "novel" is allowed
until adversarial equivalence search is completed.
