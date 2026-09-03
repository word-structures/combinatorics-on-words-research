# PAPER 6 — LATENT OBSTRUCTION MEMORY KILL TEST v0.1
**Date:** 2026-08-29  
**Status:** clean-room negative result; not a manuscript  
**Gate:** P6-C4

## Executive verdict

The most natural attempt to remove literal suffix states is **not Markov
sufficient**.

Keeping only:

- the short literal suffix needed for FORBID4;
- and those affine Abelian boundary requirements that can be triggered by a
  block **right now**

loses information needed by future profile-conditioned counting.

The missing information is **latent obstruction memory**:

> an affine obstruction value that is unattainable at the present step can
> shift into an attainable obstruction after one or more future blocks.

This is the exact geometric analogue of the earlier result that one-step
literal response does not determine future counts.

---

# 1. Candidate structural datum that was killed

For every boundary geometry `(k,j)`, let `r_(k,j)(s)` be the state-dependent
affine requirement.

Define a candidate state datum `G_active(s)` containing:

1. `suf_3(s)` for FORBID4;
2. the exact value `r_(k,j)(s)` when at least one current library block can hit
   that value;
3. a generic `INACTIVE` marker when no current block can hit it;
4. an `ABSENT` marker when the history is not yet long enough to instantiate
   that geometry.

This datum preserves all *currently active* Abelian boundary equations.

It is still not sufficient.

---

# 2. Exact BAL3 K=6 counterexample

Use the 30-block BAL3 `L=4` aa2fr library and `Kmax=6`.

Consider

```text
s = aabcccab
t = abacccab
```

They have the same short literal memory:

```text
suf_3(s) = suf_3(t) = cab.
```

They also have exactly the same currently active affine requirements under the
library.

Their one-step legal profile response is identical:

\[
d(s)=d(t)
\]

and consists of exactly two legal blocks, both with profile

\[
(1,2,1).
\]

The legal blocks are

```text
bbac
bbca
```

from both states.

Yet the states are not profile-future equivalent.

After one block of profile `(1,2,1)`, the number of legal second blocks of
profile `(1,1,2)` is

\[
0
\]

from `s` and

\[
1
\]

from `t`.

Thus the profile word

\[
(1,2,1),(1,1,2)
\]

distinguishes them at depth two.

---

# 3. Where the hidden distinction lives

The two states differ in exactly two affine requirements that are *currently
inactive*.

For geometry `(k,j)=(4,2)`:

```text
s: (-1, 0, 3)   inactive
t: ( 0,-1, 3)   inactive
```

For geometry `(k,j)=(5,4)`:

```text
s: (1, 0, 3)    inactive
t: (2,-1, 3)    inactive
```

Because neither value is currently hit by a BAL3 block, an active-only state
description throws the distinction away.

But after the next block shift, these dormant values affect different future
boundary equations.

Therefore:

\[
\boxed{
\text{currently unattainable}
\not\Rightarrow
\text{future irrelevant}.
}
\]

---

# 4. Full-library failure

The same phenomenon is not special to BAL3.

For full `L=4`, `Kmax=6` aa2fr:

- raw states: `3402`;
- an active-value-plus-FORBID4 datum gives `1986` structural classes;
- that datum still merges states belonging to different exact profile-future
  classes;
- it is not autonomous under profile-labelled transitions.

One explicit witness is

```text
aaabaaac
abbbaaac
```

for the `ABSENT/INACTIVE/ACTIVE` version of the datum.

Thus simply keeping more detailed current activation status does not repair
the problem.

---

# 5. Keeping every exact obstruction value is not a compression either

At the opposite extreme, retain the exact raw affine requirement at every
geometry.

For full `L=4`, `Kmax=6`, this complete obstruction signature has exactly

\[
3402
\]

distinct values on the `3402` reachable literal states.

So the full exact obstruction-coordinate map is injective on this pilot.

It is an excellent **change of coordinates**, but not a state compression.

A greedy coordinate-deletion test could discard many redundant coordinates
while still uniquely encoding all 3402 states; the remaining coordinate set
was still injective. This is not a minimality proof, but it reinforces the
point:

> physical obstruction coordinates can re-encode the literal suffix rather
> than eliminate its information.

---

# 6. Consequence

The correct Paper-6 move is neither

> discard all dormant obstruction values

nor

> retain every dormant value literally.

What is needed is a **semantic quotient of latent obstruction data**:

two latent configurations should be identified when all their future weighted
profile responses agree, even if their raw affine coordinates differ.

This is precisely where the weighted/profile future semantics belongs.

Paper 4 supplies the physical coordinates.

Paper 6 must quotient or linearize their future action.

---

# 7. Revised target

The next mathematical object should be the future action of the obstruction
coordinates, not the coordinates themselves.

For a structural state `G`, define its profile-conditioned future series

\[
F_G(p_1\cdots p_n).
\]

The desired equivalence is

\[
G\sim G'
\quad\Longleftrightarrow\quad
F_G(w)=F_{G'}(w)
\text{ for all profile words }w.
\]

The corresponding minimal linear representation can be smaller still.

Thus the theory has reached the following division of labour:

\[
\boxed{\text{geometry = coordinates}}
\]

\[
\boxed{\text{weighted future = semantics}}
\]

\[
\boxed{\text{linear realization = minimal counting dynamics}}.
\]

---

## Current verdict

**The active-obstruction shortcut is killed.**

This is useful progress, not a setback: it identifies the precise information
loss that any universal Paper-6 construction must control.

The new keyword is:

\[
\boxed{\textbf{latent obstruction memory}.}
\]
