# Stationary profile-kernel tail lemma — repaired route

Fix the stationary Parry chain and an S3-invariant target event `g` supported on
positions `I={-15,...,0}`.  Let

\[
K(r,s)=E[f_r f_s\mid g]-E[f_r f_s],
\]

where `f=1_a-1/3`, so `|f|<=2/3`, `osc(f)=1`, and `E f=0`.
Assume the 44-step forward and reverse Parry kernels have Dobrushin coefficient
at most `tau=1/10` uniformly in the soft parameter.

Write

\[
w(d)=\tau^{\lfloor d/44\rfloor},\qquad d\ge1.
\]

## Same-side pair

For `1<=r<=s` on the same side of the event, conditioning on the event changes
the boundary distribution seen at the nearer point by TV at most `w(r)`.  With
`d=s-r`,

\[
\operatorname{osc}\bigl(f\,P^d f\bigr)
\le \frac43 w(d).
\]

Hence

\[
|K(r,s)|\le \frac43 w(r)w(s-r).
\]

The reverse-time statement is identical on the left.

## Event-support / outside pair

For `r in I` and an outside point at distance `d` from the corresponding event
boundary, both the target-conditioned and baseline terms are bounded using
`|f|<=2/3` and one-sided mixing.  Thus

\[
|K(r,s)|\le \frac43 w(d).
\]

There are 16 event-support positions and two ordered orientations.

## Left/right cross pair

For points outside on opposite sides, at distances `r,s>=1` from the event
support, the target-conditioned term contracts independently from the two event
boundaries, while the baseline covariance contracts over the full separation.
The safe combined bound is

\[
|K(-r,s)|\le \frac53 w(r)w(s).
\]

The factor `5/3` is deliberately non-sharp: `1` for the conditioned product plus
`2/3` for the baseline covariance.

## Exact shell summation

The scored window is `[-308,308]`.  Relative to event support `[-15,0]`, it
contains left outside distances `1,...,293` and right outside distances
`1,...,308`.

For

\[
A=\sum_{d\ge1}w(d)=43+44\frac\tau{1-\tau},
\]

all same-side, support/outside, and cross-side ordered pairs with at least one
index outside the scored window can be summed exactly as geometric series.  The
stored rational result is

\[
\boxed{
E_{kernel}
\le
\frac{1770821092673}{24300000000000}
=0.07287329599477366\ldots
}.
\]

The calculation is reproduced by `kernel_tail_bound_332.py` and stored in
`KERNEL_TAIL_332_SAFE.json`.

This bound contains the polynomial/shell multiplicity explicitly.  It does not
use, imply, or depend on the rejected pure `4 K tau^B` finite-boundary tail.
