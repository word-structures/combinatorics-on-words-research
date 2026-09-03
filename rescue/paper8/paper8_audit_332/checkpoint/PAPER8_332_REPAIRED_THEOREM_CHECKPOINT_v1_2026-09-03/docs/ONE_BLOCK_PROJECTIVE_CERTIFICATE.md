# One-block boundary/Perron projective certificate — profile (3,3,2)

This note supplies the numerical hypothesis used by `BURN_BRIDGE_LEMMA.md`.
It reuses the already stored 302-interval bidirectional 44-step cover, but it
uses that cover for a different purpose than the rejected old tail lemma.

## Tropical orientations

Let `A(x)` be the raw soft-deletion quotient.  For the forward and reverse
orientations choose the hard-endpoint tropical distance `d` and diagonal
`D(x)=diag(x^d)`.  The scaled matrix

\[
M(x)=D(x)^{-1}A(x)D(x)
\]

has only nonnegative powers of `x` (for pid1 the exponents are 0,1,2), hence is
entrywise monotone on `[0,1]` and regular at `x=0`.

The right boundary is represented in the forward scaling by

\[
z^R_0=1_G,
\qquad z^R_1=M_f(x)^{44}z^R_0,
\]

where `G` is the 9756-state hard dominant SCC.

The left boundary is represented after transposition in the reverse scaling by

\[
z^L_0=s_G,
\qquad z^L_1=M_{rev}(x)^{44}z^L_0,
\]

where `s_G` contains the quotient class sizes on `G` and zero elsewhere.
These scaled ratios are exactly the raw boundary/Perron likelihood ratios after
cancelling the tropical powers.

At `x=0`, one 44-step block makes both scaled boundary messages strictly
positive on all 10191 tropical states; the raw central support is exactly the
9756-state dominant SCC.

## Perron enclosure on an interval

For a stored interval `[a,b]`, let `r` be the positive midpoint comparison
vector and

\[
q_i(x)=\frac{(M(x)^{44}r)_i}{r_i}.
\]

The cover gives endpoint bounds whose ratio is `kappa`, and a common
minorization `alpha_Q` for the associated row-stochastic surrogate `Q`.
Writing the true Perron vector as `h_i=r_i z_i`, the fixed-point equation gives

\[
z_i \propto q_i (Qz)_i.
\]

If `R=max z/min z`, common minorization yields

\[
R\le \kappa[\alpha_Q+(1-\alpha_Q)R].
\]

Therefore, whenever the denominator is positive,

\[
\boxed{
R_{PF}\le
\frac{\kappa\alpha_Q}
{1-\kappa(1-\alpha_Q)}
}.
\]

This is the `R` field already stored in every fixed-cover record.

## Boundary ratio on the same interval

Because `M(x)` and the scaled boundary vector are nonnegative-power objects,

\[
z_1(a)\le z_1(x)\le z_1(b)
\]

componentwise.  Hence

\[
\rho_1(x)
=\frac{\max_i z_{1,i}(x)/h_i(x)}
       {\min_i z_{1,i}(x)/h_i(x)}
\]

is bounded by

\[
\boxed{
\rho_1
\le
R_{PF}
\frac{\max_i z_{1,i}(b)/r_i}
     {\min_i z_{1,i}(a)/r_i}
}.
\]

The computation is reproduced by `boundary_projective_cert_332.py`.

Across all 302 intervals the observed stored upper maxima are

\[
\rho^L_1\le 1.0443249625756679,
\]

\[
\rho^R_1\le 1.0772235341787708.
\]

The theorem deliberately discards this precision and uses only

\[
\boxed{
\rho^L_1\le 1.07,
\qquad
\rho^R_1\le 1.10.
}
\]

Even multiplying every computed one-block bound by `1.01` still leaves both
inside these theorem bounds.

## Audit boundary

The algebra above is exact.  The stored interval generator currently uses
IEEE arithmetic with explicit outward padding rather than a separate
directed-rounding/ball-arithmetic implementation.  Consequently the numerical
one-block enclosure remains marked `external directed-rounding audit pending`,
just as the existing H8 mixing cover does.  The theorem bounds have percent-level
slack relative to the stored values; this is an audit margin, not a substitute
for a future independent interval implementation.
