# L6 rigorous residual-tail certificate candidate

**Date:** 2026-08-25  
**Status:** INTERNAL RIGOROUS CERTIFICATE CANDIDATE — PASSES  
**Independent audit:** REQUIRED  
**h=8:** NOT COMPUTED / NOT INSPECTED

## 1. Target

The PEX-C4 h=7 prospective battery exposed a precise blocker:

> the continuation mechanism looked strong enough numerically, but the
> frozen protocol correctly refused `NEGATIVE_CERTIFIED` because the L6
> residual tail had not been rigorously bounded.

That blocker is now closed internally.

The result is a scalable certificate architecture for the L6 baseline.

---

# 2. Minimal L6 presentation

The h=7 target was originally represented on 13-block states so that a
14-symbol target is a single edge.

For mixing, this is unnecessarily large.

The baseline L6 process only needs the last 11 symbols to decide whether the
next symbol creates an Abelian square of half-length

\[
K=2,3,4,5,6.
\]

The minimal dominant presentation has:

\[
\boxed{10128\text{ states}}
\]

and

\[
18774\text{ edges}.
\]

The Perron root is

\[
\lambda\approx1.848333978184317.
\]

The S3 color action has exactly

\[
\boxed{1688}
\]

orbits, each of size 6.

---

# 3. Exact S3 quotient and Perron enclosure

Let \(Q\) be the exact integer adjacency quotient on the 1688 color orbits.

It has 3129 nonzero entries.

An exact integer computation gives

\[
\boxed{Q^{23}>0}
\]

entrywise, with

\[
1\le (Q^{23})_{ij}\le5981.
\]

This gives a deliberately crude Birkhoff contraction bound.

Now take the exact finite-continuation vector

\[
x=Q^{300}\mathbf1.
\]

The exact projective residual under \(Q^{23}\) satisfies

\[
R-1
=
6.9884158139168004949\ldots\times10^{-31}.
\]

Combining the positive-power contraction with this residual gives a true
Perron-vector projective enclosure

\[
\boxed{
E<1+3\times10^{-27}.
}
\]

Thus the finite continuation-ratio chain

\[
\widehat P_{ij}
=
\frac{N_{300}(j)}{N_{301}(i)}
\]

has the same support as the true Parry chain and, edgewise,

\[
\boxed{
E^{-1}\widehat P_{ij}
\le
P_{ij}
\le
E\widehat P_{ij}.
}
\]

This is the rigorous form of the continuation-capacity idea.

---

# 4. Rigorous 40-step mixing bound

One representative column from each S3 orbit was propagated for 40 steps
under the rational continuation-count proxy.

Every floating multiply and add in the propagation was rounded explicitly
downward.

The resulting common-mass lower bound is

\[
\widehat\alpha_{40}
>
0.9882571136822208.
\]

Transferring through the edgewise projective factor \(E\) gives

\[
\alpha_{40}(P)
>
0.9882571136822208\ldots.
\]

For a simple paper-facing bound we deliberately weaken this to

\[
\boxed{
\alpha_{40}>0.988.
}
\]

Therefore the Dobrushin contraction coefficient of the minimal L6 chain obeys

\[
\boxed{
\tau(P^{40})<0.012.
}
\]

This is the key scalable tail result.

---

# 5. Lift to the 13-block presentation

A 13-block state after two future steps is a deterministic function of:

1. the 11-block state two steps earlier;
2. the following two Markov transitions.

Consequently total variation cannot increase under this lift, and for
\(n\ge2\),

\[
\boxed{
\tau_{13}(n)
\le
\tau_{11}(n-2).
}
\]

Hence

\[
\tau_{13}(n)
\le
0.012^{\lfloor(n-2)/40\rfloor}.
\]

The total contraction budget is therefore

\[
\sum_{n\ge0}\tau_{13}(n)
\le
2+\frac{40}{1-0.012}
=
42.4858299595\ldots.
\]

---

# 6. Universal perturbation envelopes

For a 0/1 target-edge potential,

\[
(I-P)u=q\mathbf1-e,
\]

and

\[
\operatorname{osc}(q-e)\le1.
\]

Therefore

\[
\operatorname{osc}(u)
\le
\sum_n\tau_n.
\]

For

\[
\dot P_{ij}
=
P_{ij}[-g_{ij}+u_j-u_i+q],
\]

this gives the conservative row norm bound

\[
\beta
=
\max_i\sum_j|\dot P_{ij}|
<
44.486.
\]

We use

\[
\boxed{\beta<45}.
\]

Likewise

\[
\dot\pi
=
\sum_{n\ge0}(\pi\dot P)P^n
\]

gives

\[
A=\|\dot\pi F\|_1<1260.02.
\]

We deliberately use

\[
\boxed{A<1300}.
\]

These constants are intentionally very loose.  The actual H05/H06 values are
orders of magnitude smaller.

---

# 7. Exact infinite tail after lag 400

Using

\[
|D_k|
\le
A\tau_k
+
\alpha\beta
\sum_{j=0}^{k-1}\tau_j\tau_{k-1-j},
\qquad
\alpha=\frac49,
\]

and the exact staircase bound

\[
\tau_k\le0.012^{\lfloor(k-2)/40\rfloor},
\]

the remaining infinite tail after lag 400 can be summed with rational
arithmetic.

The two exact tail factors are

\[
T_1
=
7.6665562315\ldots\times10^{-18},
\]

and

\[
T_2
=
7.2577184233\ldots\times10^{-14}.
\]

Thus

\[
\boxed{
\sum_{k>400}|D_k|
<
1.461510207752\times10^{-12}.
}
\]

The infinite tail is therefore completely negligible relative to the h=7
mechanism margins.

---

# 8. Finite-prefix numerical certification

The rational proxy chain was used for the lag-0,...,400 prefix.

High-precision Decimal residual checks give:

### stationary law

\[
\|p\widehat P-p\|_1
=
1.31724\ldots\times10^{-15}.
\]

### H05 Poisson solve

\[
\|r_u\|_\infty
=
1.95306\ldots\times10^{-13},
\]

\[
\|r_{\dot\pi}\|_1
=
9.08655\ldots\times10^{-13}.
\]

### H06 Poisson solve

\[
\|r_u\|_\infty
=
1.10428\ldots\times10^{-13},
\]

\[
\|r_{\dot\pi}\|_1
=
1.25047\ldots\times10^{-12}.
\]

Using the contraction budget above, we deliberately replace these by the
coarse contracts

\[
\delta_\pi<10^{-10},
\]

\[
\operatorname{osc}(\delta u)<8.5\times10^{-11},
\]

\[
\|\delta\dot P\|_{\rm row}<2\times10^{-10},
\]

\[
\|\delta\dot\pi\|_1<2.1\times10^{-7}.
\]

A telescoping norm bound on all lag terms through 400 is below
approximately \(4.1\times10^{-4}\).

After adding a large allowance for Float64 propagation, selected-mechanism
evaluation, and true-vs-proxy transfer, the certificate uses the simple
blanket budget

\[
\boxed{
\varepsilon_{\rm prefix}=7.5\times10^{-4}.
}
\]

This is intentionally much larger than the observed numerical uncertainty.

---

# 9. Residual-compensation closure

The frozen PEX-C4 selected mechanism is removed from the total response and
everything else is called \(C_{\rm rest}\).

For the exact continuation-count proxy, the lag-0,...,400 complement is:

### H04

\[
C_{\rm rest}^{(400)}
\approx
+0.00573757887448.
\]

### H05

\[
C_{\rm rest}^{(400)}
\approx
-0.00302814944817.
\]

### H06

\[
C_{\rm rest}^{(400)}
\approx
-0.00204453664869.
\]

After adding the full \(7.5\times10^{-4}\) finite-prefix uncertainty and the
\(1.47\times10^{-12}\) infinite tail, the true residual upper bounds are:

### H05

\[
\boxed{
C_{\rm rest}
<
-0.0022781494467
<0.
}
\]

### H06

\[
\boxed{
C_{\rm rest}
<
-0.0012945366472
<0.
}
\]

H04 remains positive on this bound and is not negative-certified.

---

# 10. PEX-C4 structural lower bound robustness

For the frozen PEX-C4 positive placements, the smallest observed lower
kernels were:

- H05: \(1.26\times10^{-4}\);
- H06: \(3.09\times10^{-4}\).

The true-vs-proxy stationary error and finite-path transfer imply a
per-placement kernel uncertainty far below \(10^{-6}\).

The certificate deliberately subtracts

\[
10^{-6}
\]

from every credited positive kernel and \(10^{-10}\) from target probability.

This still gives:

### H05

\[
\boxed{
\underline E_{\rm PEX-C4}
>
0.00212532853797.
}
\]

### H06

\[
\boxed{
\underline E_{\rm PEX-C4}
>
0.00024436606819.
}
\]

The mechanism remains strictly negative.

---

# 11. Combined post-reveal mechanism certificate

Using

\[
A'(0)
\le
C_{\rm rest}
-
\underline E_{\rm PEX-C4},
\]

we obtain the internal certificate bounds

### H05

\[
A'(0)
<
-0.0044034779847.
\]

### H06

\[
A'(0)
<
-0.0015389027154.
\]

Both are strictly negative.

These are conservative mechanism-aware upper bounds, not tight estimates.

The independently computed actual derivatives were approximately

\[
-0.00522843171
\]

and

\[
-0.00229553940.
\]

---

# 12. What has and has not been achieved

## Achieved internally

The exact blocker identified by the prospective PEX-C4 battery is now closed:

\[
\boxed{
\text{scalable L6 rigorous residual-tail certificate candidate exists}.
}
\]

It uses:

\[
\text{finite continuation counts}
\to
\text{Perron enclosure}
\to
\text{Doeblin/Dobrushin mixing}
\to
\text{exact infinite-tail bound}.
\]

H05 and H06 now have mechanism-aware negative-response certificate
candidates.

## Not achieved retroactively

The original frozen H05/H06 predictions remain `INCONCLUSIVE`.

The residual certificate was completed **after response reveal**.

Therefore we must not rewrite history and call H05/H06 prospective certified
successes.

## What this enables

For the next fresh non-h8 battery we can now freeze **both** pieces in
advance:

1. PEX-C4 continuation mechanism;
2. the L6-scale rigorous residual-tail procedure.

That is the first setup capable of producing a genuinely prospective
`NEGATIVE_CERTIFIED` result.

---

# 13. Epistemic status

Current strongest language:

**L6 RESIDUAL-TAIL COMPUTER-ASSISTED CERTIFICATE CANDIDATE — INTERNAL
ARITHMETIC PASSES — CLEAN-ROOM AUDIT REQUIRED.**

Before publication-level theorem language, independently audit:

1. the 11-block/13-block mixing lift;
2. S3 quotient equitability;
3. the Birkhoff projective enclosure;
4. directed IEEE lower propagation;
5. finite-prefix sensitivity inequalities;
6. PEX-C4 structural lower-bound transfer;
7. an independent implementation.

No h=8.
