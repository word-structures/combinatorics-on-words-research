# Structural source of the h=4 (2,1,1) lag-9/10 anomaly

**Date:** 2026-08-25  
**Status:** EXPLORATORY / POST-HOC / NOT A CANONICAL CLAIM  
**Scope:** exposed h=2,...,7 profile-response family only  
**h=8:** NOT COMPUTED / NOT INSPECTED

## Executive result

The large negative lag-9 and lag-10 response in h=4, profile (2,1,1), is not primarily produced by a target-square window sitting between the two letter observations.

Instead, about **94.2%** of the combined lag-9/10 negative response comes from target-square windows that contain **exactly one** of the two letter observations.

This identifies the dominant mechanism as a **one-sided continuation / precursor memory effect**.

The strongest special case is a target 8-letter Abelian-square block anchored on one observation. Such a block leaves a strong delayed "echo" of its first letter 2–3 steps after the square ends.

The h=4 anomaly appears to be a quantitative resonance of three effects rather than a unique new path class:

1. target events are relatively frequent;
2. the local positive response margin is unusually small;
3. the event-conditioned delayed letter echo is strong.

## 1. Exact boundary fact

Let

\[
x_0x_1\dots x_{2h-1}
\]

be an h-Abelian-square block inside the baseline language \(L_{h-1}\).

The first and last symbols cannot be equal.

Indeed, if

\[
x_0=x_{2h-1},
\]

then subtracting that common symbol from the two equal Parikh vectors of the h-halves gives

\[
\Psi(x_1\dots x_{h-1})
=
\Psi(x_h\dots x_{2h-2}),
\]

so

\[
x_1\dots x_{2h-2}
\]

would contain an Abelian square of half-length \(h-1\), contradicting membership in \(L_{h-1}\).

Therefore every target h-square carries a built-in boundary anti-correlation:

\[
x_0\neq x_{2h-1}.
\]

For the three controls checked computationally, this was also seen on every target edge:

- h=3: 0 / 24 target edges had first=last;
- h=4: 0 / 156;
- h=5: 0 / 222.

## 2. Hidden memory of the dropped first symbol

After the target square has been completed, the state memory contains positions

\[
x_1,\dots,x_{2h-1}.
\]

Although \(x_0\) has dropped out of the explicit state window, it is recoverable on a target event from the Parikh equality:

\[
\Psi(x_0\dots x_{h-1})
=
\Psi(x_h\dots x_{2h-1}).
\]

Hence

\[
\Psi(x_0)
=
\Psi(x_h\dots x_{2h-1})
-
\Psi(x_1\dots x_{h-1}).
\]

So the completed target event leaves a **hidden color label** in the state: the identity of the lost first symbol.

The continuation dynamics can therefore retain and later reveal information about that first symbol.

## 3. Lag 9 and 10 are mostly one-sided memory, not bridging

For h=4 the target window has length

\[
W=8.
\]

The two anomalous lags are

\[
k=9=W+1,\qquad k=10=W+2.
\]

The linear-response contribution at a fixed lag can be decomposed according to where the penalized target window lies relative to the two letter observations.

### h=4, lag 9

\[
D_9\approx -0.01834632745.
\]

Contributions:

- target window contains exactly one endpoint:
  \[
  -0.01662331281
  \]
- target window lies strictly between the endpoints:
  \[
  -0.00191815520
  \]
- target window lies completely outside:
  \[
  +0.00019514054
  \]

Thus about **90.6%** of the lag-9 negative response comes from one-endpoint-overlap placements.

### h=4, lag 10

\[
D_{10}\approx -0.01855698443.
\]

Contributions:

- target window contains exactly one endpoint:
  \[
  -0.01814518890
  \]
- strictly between:
  \[
  -0.00072152224
  \]
- completely outside:
  \[
  +0.00030972670
  \]

Thus about **97.8%** of the lag-10 negative response comes from one-endpoint-overlap placements.

Combined:

\[
D_9+D_{10}
\approx -0.03690331188,
\]

of which

\[
-0.03476850172
\]

comes from one-endpoint-overlap placements.

That is

\[
\boxed{94.2\%}
\]

of the combined lag-9/10 negative mass.

So the large anomaly is **not mainly a target square bridging the gap**. It is mainly a target square overlapping one observed letter and changing the probability of the other letter several steps later.

## 4. Boundary-anchored echo

The most interpretable placement is a target block occupying positions

\[
0,\dots,W-1
\]

with the first observed letter at the left boundary.

For post-square distance \(d\), compare

\[
P(x_{W-1+d}=x_0\mid g_v)
\]

with the ordinary baseline same-letter probability at that lag.

### Relative controls

| case | post distance | baseline same-letter P | given target square | uplift |
|---|---:|---:|---:|---:|
| h=3 (1,1,1) | 2 | 0.318244 | 0.372985 | +0.054741 |
| h=3 (1,1,1) | 3 | 0.334204 | 0.382823 | +0.048619 |
| **h=4 (2,1,1)** | **2** | **0.314613** | **0.390140** | **+0.075527** |
| **h=4 (2,1,1)** | **3** | **0.338394** | **0.438527** | **+0.100133** |
| h=5 (2,2,1) | 2 | 0.329672 | 0.369436 | +0.039764 |
| h=5 (2,2,1) | 3 | 0.345851 | 0.440560 | +0.094709 |

The h=4 event therefore produces a strong delayed reappearance of its first symbol.

At distance 3 the effect is about **+10.0 percentage points** relative to the h=4 baseline.

The h=5 control also has a comparably strong distance-3 echo, which is important: the echo motif itself is **not unique to h=4**.

## 5. Why h=4 is still the one that flips

For the nearest balanced/minimum-B controls:

| case | target probability \(q_v\) | local response / q | tail response / q | final tail/local |
|---|---:|---:|---:|---:|
| h=3 (1,1,1) | 0.081838 | +1.006028 | -0.272824 | -0.271 |
| **h=4 (2,1,1)** | **0.087972** | **+0.499292** | **-0.582697** | **-1.167** |
| h=5 (2,2,1) | 0.026962 | +0.941475 | -0.374955 | -0.398 |

This gives a much sharper picture.

### h=3

The target event is common, but:

- the delayed echo is weaker;
- the local positive margin per target event is about twice the h=4 margin.

The tail cannot overturn the local term.

### h=5

The distance-3 echo is almost as strong as h=4, but:

- the target event is about 3.26 times rarer;
- the local positive margin per event is almost twice as large as h=4.

Again the tail cannot overturn the local term.

### h=4

It simultaneously has:

- high target-event frequency \(q_v\);
- strong 2–3 step delayed echo;
- an unusually thin positive local margin.

This is currently the best quantitative explanation for why only h=4 crosses.

## 6. Singleton-start subfamily

The profile (2,1,1) has two singleton letters and one doubled letter in each half.

Among the 156 h=4 target edges:

- 102 / 156 = **65.4%** start with a letter that is a singleton in the half-profile;
- under the baseline Parry event measure these singleton-start events carry about **69.7%** of the target-event probability mass.

For h=5 profile (2,2,1):

- only 42 / 222 = **18.9%** of target edges start with the singleton letter;
- their Parry event mass is about **28.9%**.

For h=4, boundary-anchored lag \(W+1\) response is especially concentrated in singleton-start target events:

- total anchored pair at post-distance 2:
  \[
  -0.00885903192
  \]
- singleton-start contribution:
  \[
  -0.00861125156
  \]

So about **97.2%** of that anchored negative response comes from singleton-start events.

At post-distance 3, singleton-start events still provide about **77.5%** of the anchored negative response.

This suggests a more specific candidate mechanism:

> the h=4 (2,1,1) target family places unusually large equilibrium mass on a "singleton-deficit" boundary state, and the constrained continuation dynamics tends to reproduce that hidden singleton color 2–3 steps after the square ends.

This is a candidate mechanism, not yet a theorem.

## 7. A useful exact response formula for the anchored pair

Let

\[
\Delta_d
=
P(x_{W-1+d}=x_0\mid g_v)
-
P(x_{W-1+d}=x_0).
\]

For a fixed-letter centered indicator, the two time-reversed boundary-anchored placements contribute

\[
D^{\mathrm{anch}}_{W-1+d}
=
-\frac{4q_v}{3}\Delta_d.
\]

For h=4:

### d=2 / lag 9

\[
\Delta_2\approx0.07552689,
\]

hence

\[
D^{\mathrm{anch}}_9
\approx -0.00885903192.
\]

### d=3 / lag 10

\[
\Delta_3\approx0.10013333,
\]

hence

\[
D^{\mathrm{anch}}_{10}
\approx -0.01174527814.
\]

The boundary-anchored pair alone accounts for about **55.8%** of the combined lag-9/10 negative response.

The broader one-endpoint-overlap family accounts for 94.2%.

## 8. What this does and does not explain

### Strongly supported computational mechanism

The present analysis supports:

1. target h-squares necessarily have different first and last symbols;
2. the completed target state retains an inferable hidden label for the lost first symbol;
3. h=4 target paths show a strong delayed same-letter echo after 2–3 steps;
4. lag-9/10 response is overwhelmingly generated by target windows containing one observation, not by windows bridging the observations;
5. h=4 combines high event frequency, a thin local margin, and a strong delayed echo;
6. singleton-start target events dominate an important part of the h=4 boundary response.

### Not established

This is not yet a proof that a single graph motif causes the entire crossing.

The h=5 control demonstrates that a strong distance-3 echo can exist without a sign reversal.

Therefore the safest current interpretation is:

\[
\boxed{
\text{crossing} =
\text{thin local margin}
+
\text{high target-event mass}
+
\text{strong one-sided delayed echo}
+
\text{additional endpoint-overlap correlations}
}
\]

rather than "one unique h=4 motif."

## 9. Best next theorem/mechanism target

The next mathematically useful object is the **hidden-color continuation kernel**:

\[
K_v(d)
=
P(x_{2h-1+d}=x_0\mid g_v)-P(x_{2h-1+d}=x_0).
\]

For h=4 (2,1,1), its first large positive peak occurs at \(d=2,3\).

A theoretical explanation of the shape of \(K_v(d)\), especially split by
the multiplicity of \(x_0\) in the target half-profile, could turn the present
numerical mechanism into a tractable lemma.

The most promising concrete question is:

> Given an \(L_{h-1}\)-admissible target h-square with profile v, how do the
> smaller-square avoidance constraints determine the probability or allowed
> support for the hidden first color to reappear in the next few symbols?

That question is narrower and more structural than another epsilon sweep.
