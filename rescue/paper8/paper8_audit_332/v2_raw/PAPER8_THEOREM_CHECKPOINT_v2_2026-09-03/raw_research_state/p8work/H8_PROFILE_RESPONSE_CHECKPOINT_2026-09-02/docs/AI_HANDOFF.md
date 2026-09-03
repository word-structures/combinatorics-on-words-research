# AI handoff — resume H8 profile-response mechanism research here

You are resuming a combinatorics-on-words / thermodynamic-formalism research line.
Do **not** rely on prior chat context. Everything essential is in this checkpoint.

## Research status

H8 has been intentionally opened as exploratory discovery data. It is not a blind holdout anymore. H9 has not been opened. Novelty is NOT_ESTABLISHED.

The central observed hard-deletion phenomenon over h=2,...,8 is still a perfect finite-family minimum-B sign split (19/19), but the current mechanism explanation is no longer "B is causal".

The strongest mechanism is:

\[
L_v=q_v\left(V_{2h}(L_{h-1})-\frac43B(v)\right),
\]

plus a correlation correction

\[
\Gamma_v=a'_v(0)-L_v.
\]

For H8, all four profiles satisfy numerically \(|\Gamma_v|<|L_v|\), and all four exact-resolvent soft derivatives have the same sign as their local terms.

## Exact resolvent formula

Read `docs/GAMMA_RESOLVENT_RETURN_KERNEL_DERIVATION.md` first.
The key sparse formula is

\[
a'(0)=\pi P'v+2\langle w,P'u\rangle_\pi,
\]

with the definitions in that file.

It has been independently finite-difference checked for all four H8 profiles to ~1e-10 or better.

## H8 numbers you must preserve

Baseline lifted L7:

- lambda = 1.7776384757455823
- a = 0.08282382651723189
- V16 = 1.862298121616395
- Bc(8) = 1.3967235912122962

Profiles:

- (3,3,2): local +0.03237221375090959; Gamma -0.013427443317538992; a'(0) +0.018944770433370596; hard delta +0.017262485154849835
- (4,2,2): local -0.004377041475916327; Gamma +0.0007795817808082372; a'(0) -0.00359745969510809; hard delta -0.002991888299664361
- (4,3,1): local -0.010141450016857916; Gamma +0.002775806461786416; a'(0) -0.0073656435550715; hard delta -0.0049442132838203035
- (5,2,1): local -0.0050566797937385485; Gamma +0.0018047635057421955; a'(0) -0.003251916287996353; hard delta -0.002181423292746676

## Strongest new H8 inference

The local term dominates Gamma numerically at epsilon=0:

- max |Gamma|/|local| = 0.414783 (profile 3,3,2)
- all four ratios < 1

This is a strong finite H8 numerical dominance statement, NOT yet a rigorous interval proof.

## Soft-to-hard evidence

On epsilon grid

0, .05, .1, .25, .5, 1, 2, 4, 8

every secant has the hard-response sign for every H8 profile. epsilon=8 is already close to the hard-deletion result.

This strongly supports sign preservation but does not prove that a'(epsilon) never crosses zero between grid nodes.

## Next actions, in order

1. **Rigorous Gamma certificate.** Turn the floating-point resolvent decomposition into a computer-assisted inequality. Preferred routes:
   - residual + inverse-norm bounds for Poisson solves, or
   - a certified block-mixing constant and the explicit tail formula in the derivation note.

2. **Soft-path sign certificate.** Adaptively subdivide epsilon and certify the sign of a'(epsilon), then control the epsilon -> infinity tail.

3. **Return-kernel structure.** Compute/derive the profile-conditioned kernel
   \(K_v(r,s)=E[f_rf_s|g]-E[f_rf_s]\) and identify which sectors of the kernel make Gamma positive/negative.

4. **Literature kill.** Search thermodynamic formalism, pressure Hessian response, Markov additive functionals, forbidden-pattern correlation polynomials, and higher cumulant response. Do not claim novelty until this is exhausted.

5. **Do not open H9 yet.** A future level should only be opened after a discriminating protocol is frozen.

## Replay

Fast integrity check:

```bash
./RUN_FAST.sh
```

Core files:

- `data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz`
- `data/H8_RESOLVENT_SOFT_DERIVATIVES.json`
- `calculators/pf_and_resolvent.py`
- `calculators/finite_difference_soft_check.py`

