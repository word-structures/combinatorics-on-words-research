# PAPER 6 — THEORY PIVOT RESEARCH PLAN v0.1
**Date:** 2026-08-29  
**Status:** active research plan; not a manuscript  
**Purpose:** replace the record-hunt-centered framing with a theory-first program on exact counting semantics, structural compression, and relative survival entropy.

---

## 0. One-sentence thesis

Paper 6 should ask:

> **How much information about a block-history is actually necessary to count, exactly or asymptotically, its future Abelian-square-free continuations?**

The record hunt becomes an application and stress test, not the reason the paper exists.

---

# 1. What is already established in the Paper-6 seed

Let `B` be a finite library of equal-length blocks and let `A_n` be the number of length-`n` block assemblies whose concatenation remains globally safe.

For a factorial assembly language and factorial safety property:

- the exponential safe growth rate exists;
- relative survival has an exact exponential rate;
- finite block-window relaxations give monotone upper bounds converging to the exact growth rate;
- finite half-period cutoff automata give another monotone convergent hierarchy.

For independent uniform block choice:

\[
P_n=\frac{A_n}{|B|^n},
\qquad
\lim_{n\to\infty}P_n^{1/n}
=
\frac{\lambda_{\rm safe}}{|B|}.
\]

Thus Paper 6 already has a mathematically clean observable: **relative survival entropy / entropy deficit**.

---

# 2. The profile projection result survives and should remain a structural layer

For equal-length blocks `b_i`, write

\[
p_i=\Psi(b_i).
\]

If two adjacent runs of the same number of blocks have equal aggregate profile,

\[
p_r+\cdots+p_{r+m-1}
=
p_{r+m}+\cdots+p_{r+2m-1},
\]

then the corresponding character factors have equal length and equal Parikh vector, hence form an Abelian square.

Therefore every globally aa2f block assembly projects to an additive-square-free sequence of block profiles.

In particular,

\[
\Psi(u)=\Psi(v)
\Longrightarrow
uv
\text{ contains an aligned Abelian square.}
\]

This is a universal necessary condition independent of the internal letter order of the blocks.

The profile layer is not the whole answer: the L=4 full aa2fr pilot had 3192 ordered pairs surviving the aligned profile obstruction but only 696 genuinely safe pairs.

So the correct architecture is not “profile solves the problem”, but

\[
\text{profile/additive obstruction}
+
\text{offset/cutpoint geometry}
+
\text{future-count semantics}.
\]

---

# 3. Critical correction: there are several different notions of “same future”

The previous pilot correctly falsified

\[
\text{same profile}
\Rightarrow
\text{same future count}
\]

and also

\[
\text{same one-step literal response}
\Rightarrow
\text{same future count}.
\]

However, the next distinction is equally important.

For a finite nonnegative transition matrix `M`, define for state `x`

\[
c_n(x)=e_x^\top M^n\mathbf 1,
\]

the number of legal length-`n` continuations.

We must distinguish at least the following semantics.

### A. Future-language equivalence

Two states have exactly the same legal continuation words.

This is the strongest notion relevant here.

### B. Stable equitable / weighted-bisimulation equivalence

Two states have the same total outgoing weight into every current quotient class, recursively to stability.

This gives a genuine quotient transition matrix and therefore supports recursive dynamic programming on quotient classes.

### C. Walk/count equivalence

\[
x\equiv_{\rm count}y
\quad\Longleftrightarrow\quad
c_n(x)=c_n(y)
\quad\text{for every }n\ge0.
\]

This remembers only total continuation counts, not how those continuations are distributed among successor classes.

### D. Linear realization equivalence / Krylov-Hankel compression

If the goal is only the scalar counting series, states need not even remain literal equivalence classes. The future-count process can sometimes be represented exactly in a lower-dimensional linear space.

This is the classical weighted-automata / rational-series viewpoint.

The important hierarchy is therefore approximately

\[
\text{language semantics}
\;\Longrightarrow\;
\text{equitable/bisimulation semantics}
\;\Longrightarrow\;
\text{count semantics},
\]

but the converses need not hold.

A still smaller exact **linear** realization may exist beneath any state-merging quotient.

---

# 4. New theorem seed P6-T4 — finite test for exact count equivalence

Let `M` be an `N × N` transition matrix and define

\[
c_n(x)=e_x^\top M^n\mathbf 1.
\]

Then

\[
x\equiv_{\rm count}y
\]

if and only if

\[
e_x^\top M^k\mathbf 1
=
e_y^\top M^k\mathbf 1
\]

for

\[
k=0,1,\ldots,N-1.
\]

## Proof seed

By Cayley–Hamilton, every power `M^n` with `n >= N` is a linear combination of

\[
I,M,\ldots,M^{N-1}.
\]

Hence equality of the first `N` continuation counts forces equality for every later horizon.

### Consequence

For a finite cutoff/window automaton, “same future count for all lengths” is not an infinite experimental condition. It has a finite exact certificate.

This theorem is linear-algebraic/classical in nature and must not be claimed as a new general theorem. Its role in Paper 6 is to make the Abelian-avoidance counting semantics exact and testable.

---

# 5. New correction P6-T5 — equitable equivalence is sufficient but not necessary for count equivalence

A stable equitable partition guarantees count equivalence inside each cell.

But the converse is false in general.

A four-state directed 0/1 example is

\[
M=
\begin{pmatrix}
0&1&0&1\\
1&1&1&1\\
1&0&1&0\\
0&0&0&0
\end{pmatrix}.
\]

States 0 and 2 have identical total continuation counts:

\[
1,2,4,8,\ldots
\]

and hence are count-equivalent.

But relative to the count classes

\[
\{0,2\},\{1\},\{3\},
\]

their successor multiplicities differ:

- state 0 sends `(0,1,1)` transitions to these classes;
- state 2 sends `(2,0,0)` transitions to these classes.

Therefore they cannot be merged by an equitable quotient even though every horizon count agrees.

This example must be independently replayed before manuscript use.

### Immediate implication for our pilot

The observed equality

> exact counting classes = weighted equitable classes

in the current L=4 cutoff experiments is an **empirical structural phenomenon of those automata**, not a universal identity.

That coincidence itself is now worth measuring.

---

# 6. New theorem/program seed P6-T6 — Krylov dimension as a deeper exact counting complexity

Define the Krylov space

\[
\mathcal K(M,\mathbf1)
=
\operatorname{span}\{
\mathbf1,
M\mathbf1,
M^2\mathbf1,
\ldots
\}.
\]

For an `N × N` matrix this stabilizes by dimension at most `N`.

Let

\[
r=\dim \mathcal K(M,\mathbf1).
\]

Then every state continuation sequence `c_n(x)` is generated by an order-at-most-`r` linear recurrence.

This gives a second complexity measure besides the number of quotient classes:

\[
N_{\rm raw},
\quad
N_{\rm right-context},
\quad
N_{\rm equitable},
\quad
N_{\rm count-classes},
\quad
r_{\rm Krylov}.
\]

For a fixed initial distribution, the minimal scalar realization may be smaller still and is naturally connected with Hankel rank / minimal weighted automata.

Again, the general linear theory is classical. The Paper-6 question is whether Abelian-avoidance automata exhibit **systematic, explainable collapse** in these quantities, and whether Paper-4/Paper-5 descriptors predict or construct it.

---

# 7. Revised universal target

The universal object should not be “one finite automaton that solves every Abelian-square problem”.

The defensible universal target is a **certified compiler / hierarchy**:

\[
\boxed{\text{selected block library }B}
\]

\[
\downarrow
\]

### Layer I — additive-profile projection

Remove aligned impossibilities using only block Parikh profiles.

\[
\downarrow
\]

### Layer II — physical boundary geometry

Compile the offset/cutpoint/carry obstruction families exposed by Paper 4.

\[
\downarrow
\]

### Layer III — finite exact relaxation

Choose block-window `m` or half-period cutoff `Kmax` and construct the exact finite transition system for that relaxation.

\[
\downarrow
\]

### Layer IV — semantics-aware compression

Measure separately:

1. right-context quotient;
2. stable equitable / bisimulation quotient;
3. exact walk/count partition;
4. Krylov / Hankel linear dimension.

\[
\downarrow
\]

### Layer V — spectral/counting output

Compute exact finite-horizon counts and Perron/growth data.

\[
\downarrow
\]

### Layer VI — certified convergence

Increase `m` or `Kmax` to obtain monotone bounds converging to the exact selected-library survival growth.

This is a general research framework. Veikko L=40 is then a large-scale application.

---

# 8. The next decisive experiment

## Gate P6-C1 — SEMANTICS HIERARCHY AUDIT

Extend the existing counting-equivalence experiment so that for every pilot automaton it reports:

| quantity | meaning |
|---|---|
| `N_raw` | recurrent literal states |
| `N_right` | exact future-language classes |
| `N_equitable` | coarsest stable weighted equitable classes |
| `N_count` | exact all-horizon count classes |
| `rank_K` | Krylov dimension of `(M,1)` |
| `rank_scalar` | minimal reachable-observable/Hankel dimension for the declared initial counting problem |

For each pair of successive semantics, record:

- whether equality happens;
- compression factor;
- explicit witness when the finer and coarser notions differ;
- whether Paper-4/Paper-5 descriptors refine or violate the exact count partition.

### Required libraries

At minimum:

1. `BAL3_L4_AA2FR`, `Kmax=2..6`;
2. `ALL_L4_AA2FR`, `Kmax=2..6` where computationally feasible;
3. at least one independent L=5 or structurally different selected library.

### Kill conditions

The experiment must actively search for:

- count-equivalent states separated by equitable refinement;
- states equal for the first `h` continuation counts but split later;
- descriptor classes that merge distinct count classes;
- cases where Krylov rank is not substantially smaller than raw state count;
- cases where the apparent compression disappears under a larger cutoff.

Negative results are part of the result.

---

# 9. Descriptor audit should now be reframed

The existing descriptor audit is no longer asking

> “Is this descriptor the final quotient?”

Instead, for each descriptor `D`, ask two independent questions:

### Soundness

Does every `D`-class lie inside an exact count class?

If not, it is unsafe as an exact counting merge.

### Usefulness

If sound, how much does it reduce the initial partition or the cost of reaching the exact semantics?

A descriptor may be mathematically valuable even when it is much finer than the final count partition.

This is especially relevant to:

- last-block profile;
- next-profile feasibility;
- next-profile counts;
- one-step literal response;
- alphabet-symmetry orbit;
- Paper-4 support/cutpoint response;
- Paper-5 reachable-family descriptors.

---

# 10. Novelty boundary after literature check

The following are classical and must be presented as tools, not claimed as Paper-6 inventions:

- Fekete-type entropy existence for factorial/submultiplicative languages;
- transfer matrices and Perron roots;
- Myhill–Nerode / future-language minimization;
- weighted automata and formal power series;
- partition refinement / weighted bisimulation / lumpability;
- equitable partitions and spectral preservation;
- Hankel-rank / minimal linear realization theory;
- Krylov/linear-recurrence facts.

The potentially new Paper-6 contribution is their **Abelian-avoidance-specific synthesis**, especially if we can prove or demonstrate:

1. a universal additive-profile projection theorem for selected equal-length block libraries;
2. a systematic boundary-geometry compiler from Paper 4;
3. unexpectedly small exact counting/linear semantics for these avoidance transfer systems;
4. structural reasons for the collapse;
5. provably convergent selected-library survival bounds at scales where literal automata are infeasible;
6. a practical L=40 demonstration without making record performance the scientific claim.

---

# 11. Proposed Paper-6 central question

> **How much of an Abelian-avoidance history must be remembered to preserve its future counting dynamics?**

Equivalent computational version:

> Given a selected library of equal-length blocks, can its globally constrained survival language be reduced from literal histories to a much smaller exact counting representation by separating additive profile obstructions, boundary geometry, and future-count semantics?

---

# 12. Proposed title directions

Working titles only:

- **Counting Futures in Abelian-Avoiding Block Languages**
- **Relative Survival Entropy and Counting Quotients for Abelian Avoidance**
- **From Block Geometry to Future Counts in Abelian-Avoiding Languages**
- **Semantics-Aware Compression of Abelian-Avoidance Transfer Systems**

Do not lock the title until Gate P6-C1 is complete.

---

# 13. Immediate action

Do **not** start an L=40 record-optimization campaign yet.

Run Gate P6-C1 first.

If the semantic compression hierarchy remains strong across independent libraries and larger cutoffs, Paper 6 has a theory-first core independent of record success.

If the compression collapses, that is also decisive: the universal claim must be weakened before expensive large-scale work.

