# Paper 4 v1.2 corollary insertion note — 2026-08-29

This pre-Claude revision makes one mathematically substantive addition to the
reader-first v1.1 manuscript and otherwise preserves the frozen Paper-4
architecture.

## Added in Section 4.2

For a prescribed Parikh profile \(\rho\) and a reduced support signature
\(\sigma=\sum_j a_jx_{d_j}\), define

\[
\mathcal R_\sigma(\rho)
=
\left\{\sum_j a_j\Psi(w[0..d_j)):
 w\in\Sigma^L,\ \Psi(w)=\rho\right\}.
\]

The revision adds:

- **Lemma 4.3 (prefix-Parikh chain realizability):** a finite collection of
  prefix Parikh vectors at depths \(d_1<\cdots<d_m\) is realizable by a word
  of profile \(\rho\) iff the vectors have the correct coordinate sums and
  form a componentwise monotone chain bounded by \(\rho\).
- **Corollary 4.4 (exact target feasibility):** if a target-loaded window is
  \(\sigma(x)=\tau\), then some ordering of the unresolved block with
  profile \(\rho\) completes that single window to an Abelian square iff
  \(\tau\in\mathcal R_\sigma(\rho)\).

The manuscript explicitly states that this is a **single-window** criterion; it
does not certify the whole coding, replace the simultaneous reachability
problem of Section 10, or close long periods.

## Editorial intent

The addition is meant to sharpen the support/target interface exposed by the
19-family classification.  It contains no record-hunt material, benchmark
claim, speedup claim, or empirical converse claim.

Claude should decide whether the material belongs in the main text as written,
should be compressed, or should be moved later.  It must not be promoted with
stronger novelty language merely because it has an executable interpretation.
