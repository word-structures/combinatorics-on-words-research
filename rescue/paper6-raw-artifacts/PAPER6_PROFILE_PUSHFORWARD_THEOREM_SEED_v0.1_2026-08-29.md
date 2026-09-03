# PAPER 6 — PROFILE PUSHFORWARD THEOREM SEED v0.1
**Date:** 2026-08-29  
**Status:** clean-room research seed; not a manuscript  
**Role:** P6-C2 structural explanation

## Executive result

A natural intermediate semantics exists between literal future language and total continuation counting:

\[
\boxed{
\text{literal block future}
\;\longrightarrow\;
\text{profile-conditioned weighted future}
\;\longrightarrow\;
\text{total future count}.
}
\]

For the BAL3 `L=4`, `aa2fr`, `Kmax=4` calibration, all three levels are
strictly different, and linear minimization gives a further strict collapse:

\[
\boxed{
78
\to
19
\to
16
\to
5
\to
3.
}
\]

Interpretation:

| quantity | value | semantics |
|---|---:|---|
| raw suffix states | 78 | literal cutoff memory |
| literal right-context classes | 19 | exact legal future block words |
| profile-conditioned state classes | 16 | exact weighted future profile words |
| total-count state classes | 5 | exact all-horizon continuation counts |
| total-count linear dimension | 3 | exact Krylov/Hankel realization |

This is the first clean exact example in which the intended Paper-4/5/6 bridge
appears as a genuine semantics hierarchy rather than as an implementation
heuristic.

---

# 1. General construction

Let `B` be a finite equal-length block library and let `S` be a finite exact
cutoff/window state system.

For each literal block `b in B`, define its transition matrix

\[
T_b,
\]

where `T_b[s,t]=1` when appending `b` takes state `s` to state `t`, and is zero
otherwise.  (The construction also works with weighted literal transitions.)

Let

\[
\psi:B\to P
\]

be any block descriptor.  For Paper 6 the principal choice is the Parikh
profile

\[
\psi(b)=\Psi(b).
\]

For every profile `p in P`, aggregate the literal matrices:

\[
T_p=\sum_{\psi(b)=p}T_b.
\]

Then for a profile word

\[
\pi=p_1p_2\cdots p_n,
\]

define

\[
F_s(\pi)
=
e_s^\top T_{p_1}T_{p_2}\cdots T_{p_n}\mathbf 1.
\]

`F_s(pi)` is exactly the number of legal literal block continuations from `s`
whose sequence of block profiles is `pi`.

This is the **profile-conditioned weighted future**.

The ordinary total continuation count is obtained by forgetting the profile
word:

\[
c_n(s)
=
\sum_{\pi\in P^n}F_s(\pi).
\]

Equivalently, with

\[
M=\sum_{p\in P}T_p=\sum_{b\in B}T_b,
\]

we recover

\[
c_n(s)=e_s^\top M^n\mathbf1.
\]

Thus literal, profile-conditioned, and total-count semantics are related by
successive information-forgetting maps.

---

# 2. Theorem seed P6-P1 — semantic implication chain

For states `s,t` define:

1. `s ≡lit t` if they admit exactly the same future literal block words;
2. `s ≡prof t` if
   \[
   F_s(\pi)=F_t(\pi)
   \]
   for every future profile word `pi`;
3. `s ≡cnt t` if
   \[
   c_n(s)=c_n(t)
   \]
   for every `n>=0`.

Then

\[
\boxed{
s\equiv_{\rm lit}t
\Longrightarrow
s\equiv_{\rm prof}t
\Longrightarrow
s\equiv_{\rm cnt}t.
}
\]

## Proof

Literal future equality gives equality after grouping future literal words by
their profile word, proving the first implication.

For the second implication, sum the common profile-conditioned counts over all
profile words of length `n`.

Neither converse is true in general, and both converses fail already in the
BAL3 `L=4`, `Kmax=4` calibration below.

The implication itself is elementary/general weighted-automata theory; the
research content is its use as a structural decomposition for Abelian
avoidance.

---

# 3. Theorem seed P6-P2 — nested linear future spaces

Define the backward/reachable future spaces

\[
V_{\rm lit}
=
\operatorname{span}\{
T_{b_1}\cdots T_{b_n}\mathbf1
:
n\ge0,\ b_i\in B
\},
\]

\[
V_{\rm prof}
=
\operatorname{span}\{
T_{p_1}\cdots T_{p_n}\mathbf1
:
n\ge0,\ p_i\in P
\},
\]

and

\[
V_{\rm cnt}
=
\operatorname{span}\{
M^n\mathbf1:n\ge0
\}.
\]

Then

\[
\boxed{
V_{\rm cnt}\subseteq V_{\rm prof}\subseteq V_{\rm lit}.
}
\]

Hence

\[
\boxed{
\dim V_{\rm cnt}
\le
\dim V_{\rm prof}
\le
\dim V_{\rm lit}.
}
\]

## Proof

Each profile transition matrix is a sum of literal transition matrices:

\[
T_p=\sum_{\psi(b)=p}T_b.
\]

Expanding a product of profile matrices therefore writes every
profile-conditioned future vector as a linear combination of literal-word
future vectors.  Hence `V_prof ⊆ V_lit`.

Likewise

\[
M=\sum_pT_p,
\]

so every `M^n 1` expands into a sum of profile-word future vectors.  Hence
`V_cnt ⊆ V_prof`.

This is a general linear-algebra fact.  In Paper 6 the nontrivial question is
how much collapse occurs for Abelian-avoidance transfer systems and whether
Paper-4 obstruction geometry explains it.

---

# 4. Exact strict witness I — literal future is finer than profile future

Use the selected BAL3 length-4 aa2fr block library

\[
\Psi(b)\in
\{(2,1,1),(1,2,1),(1,1,2)\}
\]

and cutoff `Kmax=4`.

Consider the two cutoff states

```text
s = abbbaca
t = abcb
```

They have different literal future languages.

At one step:

```text
s: bacc is legal, abcc is illegal
t: abcc is legal, bacc is illegal
```

but

\[
\Psi(\texttt{bacc})
=
\Psi(\texttt{abcc})
=
(1,1,2).
\]

Moreover, the two legal transitions land in the same recursively stable
profile-conditioned class.

Therefore the literal identities `bacc` and `abcc` distinguish the states, but
after pushing the transition system through the Parikh-profile map the
distinction disappears.

Machine result:

\[
19\text{ literal right-context classes}
\quad\to\quad
16\text{ exact profile-conditioned classes}.
\]

This proves that the profile layer is genuinely intermediate; it is not merely
another name for literal language equivalence.

---

# 5. Exact strict witness II — profile future is finer than total count future

In the same automaton consider

```text
u = aabc
v = aacb
```

Their one-step profile multiplicities differ:

For `u`:

\[
(1,1,2):2,\qquad (1,2,1):1.
\]

For `v`:

\[
(1,1,2):1,\qquad (1,2,1):2.
\]

Thus their profile-conditioned future series are different already at length
one.

Nevertheless they lie in the same exact all-horizon total-count class.  Their
total continuation sequence begins

\[
1,\ 3,\ 8,\ 22,\ 60,\ldots
\]

from the state boundary.

Therefore

\[
\boxed{
\equiv_{\rm prof}
\text{ is strictly finer than }
\equiv_{\rm cnt}.
}
\]

The exact class counts are

\[
16\to5.
\]

---

# 6. Exact strict witness III — state merging is finer than linear counting semantics

The five exact total-count state classes have quotient transition matrix

\[
Q=
\begin{pmatrix}
2&1&0&0&0\\
2&0&0&0&0\\
0&0&2&2&0\\
0&0&1&0&0\\
0&0&0&0&0
\end{pmatrix}.
\]

Canonical machine representatives for these five classes are:

```text
C0: aabc
C1: abac
C2: abacabb
C3: abbbaca
C4: abca
```

Their future-count sequences are not linearly independent.

Two exact identities valid at every horizon are

\[
-2f_{C0}+f_{C1}+f_{C2}=0,
\]

and

\[
f_{C0}-2f_{C1}+f_{C3}=0.
\]

Consequently the five state classes span only a three-dimensional counting
space:

\[
\boxed{5\to3}.
\]

The exact minimal recurrence polynomial for the total-count future is

\[
x(x^2-2x-2).
\]

Thus the positive-growth component obeys

\[
A_{n+3}=2A_{n+2}+2A_{n+1}.
\]

For the 30-block initial library the assembly counts begin

\[
30,\ 60,\ 168,\ 456,\ 1248,\ 3408,\ldots
\]

and satisfy the recurrence exactly.

The dominant growth root is therefore

\[
\boxed{1+\sqrt3},
\]

matching the independently computed cutoff spectral radius

\[
2.732050807568\ldots
\]

for this calibration.

---

# 7. Larger pilots — profile-linear compression is visible beyond the toy witness

A modular invariant-subspace audit was run for the profile transition matrices.

These are **candidate/rank-lower-bound computations unless separately exact
certified**; the BAL3 K=4 full-rank result is exact because the computed rank
equals the 16-dimensional profile-state space.

Selected results:

| library | Kmax | profile-state classes | profile-linear rank candidate | total count classes | exact unary rank |
|---|---:|---:|---:|---:|---:|
| BAL3 L4 | 4 | 16 | **16 exact** | 5 | **3** |
| BAL3 L4 | 6 | 91 | 64 | 16 | **7** |
| INTERIOR L5 | 5 | 193 | 154 | 34 | **27** |
| ALL L4 | 6 | 907 | 661 | 152 | **97** |

The direction of collapse is therefore consistent with

\[
\text{profile-word information}
\gg
\text{total-count information},
\]

while both remain much smaller than a naive literal-history computation in
the larger examples.

The 64/154/661 profile ranks still require exact rational certification before
manuscript-level claims.

---

# 8. Connection with the profile-projection theorem

The profile pushforward is not merely a generic compression device.

For equal-length blocks, the Parikh profile has direct obstruction meaning.

If adjacent runs of the same number of blocks have equal aggregate profile,

\[
p_r+\cdots+p_{r+m-1}
=
p_{r+m}+\cdots+p_{r+2m-1},
\]

then the corresponding aligned character factors have equal length and equal
Parikh vectors and hence form an Abelian square.

Therefore every globally safe block assembly projects to an
additive-square-free profile word.

This gives the profile layer two simultaneous roles:

1. **semantic aggregation:** it forgets literal block identity while retaining
   weighted future profile information;
2. **mathematical obstruction layer:** additive squares in the profile sequence
   certify aligned Abelian squares in the character word.

That dual role is specific to the Parikh map and is the main reason this
intermediate semantics is promising for Paper 6.

---

# 9. Revised Paper-4 → Paper-5 → Paper-6 architecture

The emerging architecture is now:

\[
\boxed{\text{Paper 4: physical/cutpoint obstruction geometry}}
\]

\[
\downarrow
\]

\[
\boxed{\text{Paper 5: profile/reachable-family response}}
\]

\[
\downarrow
\]

\[
\boxed{\text{Paper 6a: profile-conditioned weighted future}}
\]

\[
\downarrow
\]

\[
\boxed{\text{Paper 6b: total-count / entropy dynamics}}
\]

\[
\downarrow
\]

\[
\boxed{\text{minimal linear realization / recurrence}}
\]

The profile-conditioned layer is the missing bridge: it is weak enough to
forget irrelevant literal identities, but strong enough to remember which
Parikh-profile futures remain possible and with what multiplicities.

---

# 10. Next gate — P6-C3: can geometry construct the profile matrices directly?

The next experiment should not begin from all literal suffix states.

Instead ask whether the matrices

\[
T_p
\]

can be constructed directly from Paper-4/Paper-5 obstruction data.

For each state/history family, determine:

1. which next block profiles are possible;
2. how many literal blocks of each profile survive each cutpoint/carry
   obstruction;
3. which structural response class each surviving block reaches.

The decisive question is:

> **Can the profile-conditioned weighted automaton be built without first
> enumerating the literal automaton?**

If yes, then the theory pivot has produced a genuine scalable construction,
not just a post-hoc minimization.

The strongest desired theorem form is:

> For fixed block length and avoidance cutoff, a finite family of
> Parikh-difference/cutpoint observables determines the profile-conditioned
> transition operators exactly.

That would connect the Paper-4 geometry directly to the Paper-6 weighted
future dynamics.

---

# 11. Literature boundary

The following general machinery is classical and should be cited rather than
claimed as new:

- weighted finite automata / rational noncommutative series;
- linear representations by letter-indexed transition matrices;
- Hankel rank and minimal weighted realizations (Carlyle–Paz / Fliess line);
- algebraic minimization of weighted automata.

The potential novelty lies in the Abelian-avoidance-specific decomposition:

\[
\text{literal block}
\to
\text{Parikh-profile weighted future}
\to
\text{total survival count},
\]

together with the additive-square obstruction meaning of the profile alphabet,
the Paper-4 boundary geometry, and an exact scalable construction for selected
block libraries.

---

## Current verdict

**P6-C2 has produced a real structural bridge.**

The strongest immediate research target is no longer merely

> explain why `152 -> 97`,

but

> **construct the profile-conditioned operators from Abelian obstruction
> geometry, and then derive total-count dynamics as their unary projection.**

This is substantially closer to a universal theory-first Paper 6.
