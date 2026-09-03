# PAPER 6 — BLACK-BOX RECURRENCE SOLVER AUDIT v0.1
**Date:** 2026-08-29  
**Status:** exact research result + algorithm seed; not a manuscript

## Executive result

For the total selected-library survival problem, an explicit counting quotient
is **not necessary** to recover the exact finite-cutoff future dynamics.

It is enough to provide a black-box operation

\[
v\longmapsto Mv
\]

for the exact selected-library transfer operator and to observe the scalar
sequence

\[
A_n=\alpha^\top M^n\mathbf1.
\]

That scalar sequence is linearly recurrent.

Its minimal recurrence can be recovered over finite fields by
Berlekamp–Massey / black-box Krylov methods and then lifted exactly by CRT.

This route recovered all previously certified scalar dimensions and, in the
largest current pilot, reconstructed the exact 97th-order integer recurrence
without using the counting quotient in the discovery step.

---

# 1. General theorem seed

Let \(M\) be a finite matrix, \(\alpha\) an initial vector and \(\beta\) a
terminal observable.

Define

\[
s_n=\alpha^\top M^n\beta.
\]

Then \((s_n)\) satisfies a linear recurrence of order at most \(\dim M\).

The minimal recurrence order is the scalar Hankel rank / minimal scalar
realization dimension associated with the pair \((\alpha,\beta)\).

This is classical weighted-automata / linear-systems theory.

For Paper 6,

\[
\beta=\mathbf1
\]

and \(M=M_{B,K}\) is the selected-library Abelian cutoff transfer operator.

---

# 2. Matrix-free discovery route

Suppose the implementation exposes only an exact multiplication oracle

\[
\operatorname{Apply}(v)=Mv.
\]

Then:

1. initialize \(v_0=\mathbf1\);
2. generate
   \[
   v_{n+1}=Mv_n;
   \]
3. record
   \[
   s_n=\alpha^\top v_n;
   \]
4. reduce the sequence modulo a prime \(p\);
5. run Berlekamp–Massey on the scalar sequence;
6. repeat over independent primes;
7. lift the recurrence coefficients by CRT/rational reconstruction;
8. verify the lifted recurrence on additional exact integer terms.

No dense matrix is required.

No equitable/counting partition is required.

No state-merging hypothesis is required.

The only required primitive is the exact action of the transfer operator.

---

# 3. Clean-room modular recovery

The recurrence was discovered independently over

\[
p_1=1\,000\,000\,007,
\]

\[
p_2=1\,000\,000\,009,
\]

and

\[
p_3=998\,244\,353.
\]

All three primes returned the same minimal degree in every tested library.

| library | Kmax | black-box BM degree | prior exact scalar Hankel rank |
|---|---:|---:|---:|
| BAL3 L4 | 6 | **6** | 6 |
| INTERIOR L5 | 5 | **27** | 27 |
| HASH30 L4 | 5 | **47** | 47 |
| ALL L4 | 6 | **97** | 97 |

Thus the black-box scalar method reproduced every independent exact
cross-check.

The asymmetric HASH30 result is particularly important:

\[
76\text{ count states}
\to
47\text{ scalar dimensions},
\]

and the 47-dimensional recurrence is recovered without attempting to merge the
76 count states.

---

# 4. Exact quotient-free reconstruction at full L4, Kmax=6

For the full L4 aa2fr library at \(K_{\max}=6\), scalar counts begin

\[
60,\ 696,\ 4350,\ 24648,\ 134466,\ 766080,\ldots
\]

The two primes \(1\,000\,000\,007\) and \(1\,000\,000\,009\) independently
return degree

\[
\boxed{97}.
\]

Their connection-polynomial coefficients were combined by CRT.

The combined modulus has 60 bits, while the largest recovered signed
coefficient has magnitude

\[
1\,210\,553\,747.
\]

The lifted integer recurrence was checked on 123 additional exact integer
terms beyond the recurrence order:

\[
\boxed{0\text{ errors}.}
\]

Finally, after translating coefficient conventions, the independently
reconstructed recurrence is **identical coefficient-for-coefficient** to the
previous exact 97-dimensional scalar certificate obtained from the explicit
counting quotient.

Thus:

\[
\boxed{
\text{scalar sequence}
\Longrightarrow
\text{exact 97th-order recurrence}
}
\]

was achieved without using the quotient to discover the recurrence.

---

# 5. Why this matters for Paper 6

Earlier work focused on finding a small exact state quotient.

The black-box result changes the computational target.

For total survival entropy and total assembly counts, the necessary object is
not necessarily a minimized state graph.

It can be an exact **operator-action oracle**.

This is much more compatible with Papers 4 and 5.

Paper 4 can compile obstruction geometry.

Paper 5 can evaluate whole block families / reachable families.

Paper 6 can consume only the resulting action

\[
v\mapsto Mv
\]

and recover the small recurrence/future dynamics by Krylov methods.

---

# 6. Revised scalable architecture

The strongest current algorithmic architecture is:

\[
\boxed{
\text{selected-library recognizer}
+
\text{Abelian obstruction compiler}
}
\]

\[
\downarrow
\]

\[
\boxed{
\text{matrix-free exact Apply}(v)=Mv
}
\]

\[
\downarrow
\]

\[
\boxed{
\text{scalar Krylov sequence }
\alpha^\top M^n\mathbf1
}
\]

\[
\downarrow
\]

\[
\boxed{
\text{Berlekamp--Massey over several primes}
}
\]

\[
\downarrow
\]

\[
\boxed{
\text{CRT exact recurrence}
}
\]

\[
\downarrow
\]

\[
\boxed{
\text{dominant growth root / survival entropy}.
}
\]

The explicit state quotient remains scientifically useful because it explains
structure, but it is no longer a mandatory computational bottleneck.

---

# 7. Certification strategy

A robust large-scale run should distinguish:

### Discovery

Use one or more finite fields and black-box sequence generation.

### Degree stability

Require the same recurrence degree across several independent primes.

### Exact lifting

Use enough CRT modulus to exceed a proven or empirical coefficient bound.

### Exact verification

Generate additional integer terms independently and check the recurrence.

### Independent implementation

For manuscript-grade results, replay the sequence and recurrence with an
independent checker.

This mirrors the evidence-closure philosophy already used elsewhere in the
project.

---

# 8. Relation to classical theory

The following are classical tools and not Paper-6 novelty:

- scalar Krylov sequences;
- Berlekamp–Massey;
- Wiedemann-style black-box minimal-polynomial methods;
- Hankel rank and minimal linear realization.

The Paper-6 contribution would have to be the combination with:

- selected Abelian-avoiding block languages;
- the exact \(\Delta_{k,j}\) boundary compiler;
- profile/library polynomial operators;
- convergent half-period cutoff hierarchy;
- and a scalable matrix-free structural implementation.

---

# 9. Next gate P6-C6

The next decisive implementation question is now sharper:

> **Can Papers 4 and 5 implement \(v\mapsto M_{B,K}v\) directly on structural
> families, without materializing all state–block transitions?**

If yes, the project would have a route to exact large-scale survival dynamics
that bypasses both:

- the huge dense/contact matrix;
- and explicit quotient construction.

That is a substantially stronger target than record-search acceleration.

---

## Current verdict

**Major algorithmic simplification found.**

For the scalar survival problem:

\[
\boxed{
\textbf{the quotient can be replaced by a certified black-box recurrence
pipeline.}
}
\]

The scientific problem now concentrates exactly where it should:

\[
\boxed{
\textbf{construct the operator action from Abelian geometry efficiently.}
}
\]
