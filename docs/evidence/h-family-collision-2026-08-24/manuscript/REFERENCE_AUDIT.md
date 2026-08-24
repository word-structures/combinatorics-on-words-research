# REFERENCE AUDIT — v0.6.1

Eight scientific references, matching the citation list of the authoritative
v0.5 text. Scientific identity of every entry has been checked against the
v0.5 reference list. **No source was opened during preparation of this
package** (web tooling unavailable), so no bibliographic detail below is
claimed as verified against the publication itself.

## Status flags

```
BIBLIOGRAPHY_SCIENTIFIC_IDENTITY = CLEAN
ALGEBRAIC_NORMALIZATION          = VERIFIED
RICHMOND_SHALLIT_SOURCE_MATCH    = PENDING
```

## Richmond–Shallit and the free constant

The algebraic normalization is verified **as algebra**, not as an attribution.
From the asymptotic form

```
f_k(n) ~ k^(2n + k/2) * (4 pi n)^((1-k)/2)
```

setting `k = 3` gives `f_3(n) ~ 3^(2n + 3/2) * (4 pi n)^(-1)`, hence

```
f_3(n) / 3^(2n) ~ 3^(3/2) / (4 pi n) = (3 sqrt(3) / (4 pi)) / n,
```

so `C_free = 3 sqrt(3) / (4 pi)`. This derivation was checked independently.

**What is not established:** that the displayed asymptotic form, or any
particular theorem number, appears in Richmond and Shallit (2009). That is a
literature-verification step and remains `PENDING`. The manuscript accordingly
obtains `C_free` directly from the unrestricted ternary multinomial model and
treats Richmond–Shallit as the natural published benchmark rather than as an
assumption (Remark 6.6, and the closing paragraph of Section 10).

An earlier version of this audit stated that the source match had been
verified. That statement was withdrawn; it was not supported by any opened
source.

## Metadata gaps (bibliographic only, not scientific)

These do not affect any mathematical claim and are listed separately:

- `Rao2018` — volume, number and pages not filled in; carries an explicit
  `note` to that effect.
- No DOIs are recorded for any entry. None were fabricated.
- `Grigorchuk2026` — forthcoming-volume details not independently confirmed.
- `Petrova2021` — recorded as an arXiv preprint (`@misc` with `eprint`); if a
  journal version exists it has not been checked.

## Citation coverage

Every entry is cited at least once in `manuscript_v0.6.1.tex`:
`Bertoni2003`, `Goldwurm2023`, `Grigorchuk2026`, `Herve2010`, `Petrova2021`,
`Rao2018`, `Richmond2009`, `Shur2012`. In particular `Rao2018` is now cited in
the Mäkelä discussion, where it carries the closest positive avoidance result.
