# REPRODUCIBILITY MANIFEST — v0.6.1

All paths below are **relative to this package directory**
(`C:\abc\scratch\paper-submission-v0.6.1-2026-08-24\`).
No entry points outside this directory. No entry points into another worktree.

Provenance levels are used restrictively; see Appendix E for the definitions.

| Scientific claim | Artifact (package-relative) | Provenance level |
|---|---|---|
| Boundary counts, `\|E(H)\|`, `nu(H)=tau(H)=102`, restricted pool `84+18=102`, `S3` and reversal optima | `verify_scissor_and_symmetry.js` → `VERIFIER_OUTPUT.txt`, `excursion_cover_certificate.json`, `symmetry_orbits_certificate.json` | Package-local, re-executed |
| Period and lattice certificates, `h=2..6` | printed in full in `appendix_A_certificates.tex` | Independent re-derivation (every walk re-checked edge by edge) |
| Raw / valid / essential state counts | `evidence/sft-container.js` | Copied, hash differs from upstream |
| Perron roots and variance rates `a_h` | `evidence/spectral_certifier.js` | Reconstructed |
| `K=5` ablation constants | `evidence/ablation_certifier.js` | Reconstructed |
| Finite-`n` controls, `h=2,3,4,5` | `evidence/independent_dp.js` | Reconstructed |
| Finite-`n` data, `h=6`, and the correction audit | `evidence/exact_h6_collision_dp.js` | Copied, hash differs; all five denominators independently re-derived |

## Reproduction command

```
node verify_scissor_and_symmetry.js
```

Exits 0 and prints 31 `PASS` lines. It rebuilds the memory-9 window graph from
first principles and reads no data file.

## Hash record

| file | packaged SHA-256 | located upstream SHA-256 |
|---|---|---|
| `evidence/sft-container.js` | `def436906535ca12…` | `6dcf2a08252eba0b…` (repo `src/`) |
| `evidence/exact_h6_collision_dp.js` | `cada95990b11f3e9…` | `bcaf8eabff09877e…` |
| `evidence/spectral_certifier.js` | `dfccc7c75ebf506c…` | not located |
| `evidence/ablation_certifier.js` | `3f7e8aa9530187c7…` | not located |
| `evidence/independent_dp.js` | `6802da24fa551d31…` | not located |

Where an upstream file was located, its hash **differs** from the packaged
copy. We therefore do not claim that any packaged evidence script is
byte-for-byte the code that originally produced the reported numbers. Where no
upstream was located, no historical provenance claim is made at all.

This is the reason the load-bearing quantities — the `h=2..6` certificates,
the whole of Appendices C and D, and all five `h=6` denominators — were
independently re-derived rather than inherited from these scripts.

## Environment

Node.js, single-threaded, exact integer arithmetic (`BigInt`) where counts
exceed 2^53. No LaTeX engine is available in the construction environment, so
the TeX has not been compiled here.
