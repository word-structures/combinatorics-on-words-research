# Block-Language Survival Entropy — theorem seed

## Scope

Let `B` be a finite set of equal-length blocks, each of length `L`.
Let `C ⊆ B*` be a factorial assembly language: if a block sequence is allowed,
every contiguous block factor of it is also allowed.

Let `F` be a factorial character-level safety property.  For the intended
application:

- `aa2f`: forbid every abelian square with half-period `K >= 2`;
- `aa2fr`: aa2f plus the six FORBID4 factors.

For `n >= 1`, define

    T_n = number of length-n block sequences in C,

and

    A_n = number of those sequences whose concatenated character word is safe.

The survival probability under the uniform distribution on the allowed
length-n assemblies is

    P_n = A_n / T_n.

For the simplest independent-block model `C=B*`, `T_n = |B|^n`.

---

## Theorem S1 — survival growth rate exists

`(A_n)` and `(T_n)` are submultiplicative:

    A_{m+n} <= A_m A_n
    T_{m+n} <= T_m T_n.

Therefore, with the convention that an eventually empty language has growth
rate zero,

    lambda_safe = lim_{n->infinity} A_n^(1/n)
                = inf_n A_n^(1/n),

and

    lambda_all  = lim_{n->infinity} T_n^(1/n)
                = inf_n T_n^(1/n)

exist.

If `lambda_all > 0`, then

    lim_{n->infinity} P_n^(1/n)
      = lambda_safe / lambda_all.

Equivalently,

    (1/n) log P_n
      -> log(lambda_safe) - log(lambda_all).

For independent uniform blocks,

    lambda_all = |B|,

so the exponential survival rate per block is

    r_B = lambda_safe / |B| <= 1.

Per character, along lengths `N=nL`,

    lim (1/N) log P_N
      = [log(lambda_safe)-log|B|] / L.

### Proof

A safe allowed sequence of `m+n` blocks maps injectively to its first `m`
blocks and last `n` blocks.  Factoriality of both the assembly rule and the
safety property makes both pieces valid.  Hence `A_{m+n} <= A_m A_n`.
The same argument gives the inequality for `T_n`.

Apply Fekete's lemma to `log A_n` and `log T_n` (using extended value `-∞`
if a language dies).  Taking nth roots of `P_n=A_n/T_n` gives the ratio
of the two root limits.

---

## Corollary S1a — exact exponential answer to Veikko's probability question

If

    lambda_safe < lambda_all,

then

    P_n = exp(-D n + o(n))

with the positive entropy deficit

    D = log(lambda_all/lambda_safe) > 0.

Thus the fraction of good assemblies decays exponentially in the number of
blocks, even though `A_n` itself may still grow exponentially.

This distinction is important:

> "Good words become exponentially rare" does not imply
> "there are only a few good words."

---

## Theorem S2 — finite block-window transfer operators give monotone upper bounds

For `m >= 2`, define the `m`-window relaxation `S^[m]` as the block sequences
for which every contiguous block factor of length at most `m` concatenates to
a safe character word.

This is a finite-memory language.  Its states can be taken to be safe
`(m-1)`-block histories, with an edge

    (b_1,...,b_{m-1}) -> (b_2,...,b_m)

exactly when the `m`-block concatenation is safe.

Let `M_m` be its adjacency matrix and

    lambda_m = rho(M_m)

for the reachable recurrent part.

Then

    lambda_2 >= lambda_3 >= ... >= lambda_safe

and, in fact,

    lim_{m->infinity} lambda_m = lambda_safe.

### Proof

Each `(m+1)`-window-safe sequence is `m`-window-safe, so the languages are
nested and the growth rates decrease.

For every fixed block length `n`, once `m >= n`, the `m`-window relaxation
is exact on length-n block sequences.  Write `A_n^[m]` for its count.
By Fekete,

    lambda_m = inf_n (A_n^[m])^(1/n).

Since `A_n^[m]` decreases to `A_n` for every fixed `n`,

    inf_m lambda_m
      = inf_m inf_n (A_n^[m])^(1/n)
      = inf_n inf_m (A_n^[m])^(1/n)
      = inf_n A_n^(1/n)
      = lambda_safe.

Because `lambda_m` is monotone, its limit equals this infimum.

---

## Theorem S3 — half-period cutoff transfer operators

For aa2f, fix `Kmax` and forbid only abelian squares with half-period

    2 <= K <= Kmax.

At character level this condition needs only the last `2*Kmax-1` symbols
when a new symbol is appended.  Hence for a finite block library and a
finite-state contact rule it is a shift of finite type / finite automaton.

Let `lambda_(Kmax)` be its block growth rate. Then

    lambda_(2) >= lambda_(3) >= ... >= lambda_safe,

and

    lambda_(Kmax) -> lambda_safe.

For aa2fr, the fixed length-4 FORBID4 condition is added to the same automaton;
the memory is `max(2*Kmax-1,3)`.

The convergence follows by exactly the same infimum argument as Theorem S2.

---

## Calibration theorem — when the block library is not actually a restriction

Let `B_L` be the set of **all** aa2f words of length `L`, and let `p(N)` be
the number of all ternary aa2f words of character length `N`.

Then

    A_n(B_L) = p(nL).

This is a bijection: a globally aa2f word of length `nL` has a unique
partition into `L`-blocks, and every such block is itself aa2f.

Therefore, if

    alpha = lim_N p(N)^(1/N)

is the global aa2f growth rate, then

    lambda_(B_L) = alpha^L.

### Consequence

If Veikko's block library were *all* length-40 aa2f words, the survival
entropy question would be only a 40-block recoding of the already-known
global aa2f growth problem.

The genuinely new object is therefore a **proper selected library**:

- a trimmed/extendable list,
- aa2fr blocks,
- a profile-selected family,
- a contact-compatible family,
- or another physically/computationally defined subset.

That selected-library distinction is the central novelty boundary for the
proposed Paper-6 line.
