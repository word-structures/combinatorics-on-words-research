# Evidence capsule — Abelian-square density in the bounded-avoidance family `L_2 … L_6`

**Date:** 2026-08-24
**Source commit at time of run:** `1541ed561a4a1e1e873344815f53a91e807d4c42`
**Runtime:** Node.js v22.18.0, Windows 11, single-threaded
**Storage class:** PERMANENT EVIDENCE

> **CAPSULE_STATUS = CLOSED_WITH_DOCUMENTED_GAPS**
> 
> INTENDED_PAYLOAD_FILES = 20
> RECOVERED_EXACT_HASH_FILES = 14
> UNRECOVERED_HISTORICAL_AUDIT_FILES = 6
> 
> The missing six files affect historical audit provenance, not the presence
> of the manuscript, Appendices A-F, or the package-local Appendix C/D
> certificates and verifier.

---

## 1. Promotion trigger

Per `docs/evidence/CAPSULE_TEMPLATE.md`, this run qualifies on three grounds:

- it preserves **reusable finite certificates** (period and lattice witnesses
  for five languages; an explicit matching and vertex cover of size 102);
- it **supports future accepted claims** (proposed `MATH_CLAIMS.md` rows
  113–117, not yet approved);
- it **changes `CURRENT_FOCUS.md`** (from the Route-C closure thread to
  manuscript preparation and a literature gate).

---

## 2. Question

For `h ≥ 2` let `L_h` be the ternary words containing no Abelian square of
half-length `K ∈ {2,…,h}` (half-length 1 permitted, so `aa`, `bb`, `cc` are
allowed). Among words of `L_h` of length `2n`, what fraction are themselves
Abelian squares — i.e. have `Ψ(X) = Ψ(Y)` for the two halves `XY`?

---

## 3. Exact scope

Certified for **`h ∈ {2,3,4,5,6}` only**. Every statement below is a finite
computation on the memory-`(2h−1)` window presentation, or an asymptotic
derived under hypotheses that were themselves certified on those five graphs.

**Not covered, and not claimed:** `h ≥ 7`; monotonicity of `C_h` in general;
any causal law linking recurrent-state loss to collision amplification; any
statement about the existence of an infinite ternary word avoiding all
nontrivial Abelian squares (Mäkelä).

---

## 4. Results preserved

### 4.1 Finite graph geometry

| `h` | `m` | raw `3^m` | valid | essential | essential edges |
|---:|---:|---:|---:|---:|---:|
| 2 | 3 | 27 | 27 | 27 | 66 |
| 3 | 5 | 243 | 162 | 162 | 360 |
| 4 | 7 | 2187 | 786 | 786 | 1572 |
| 5 | 9 | 19683 | 3114 | 2844 | 5418 |
| 6 | 11 | 177147 | 11070 | 10128 | 18774 |

The first strict `valid > essential` loss occurs at `h = 5`.

### 4.2 Period and lattice certificates (the reusable witnesses)

For each `h`: two closed walks of coprime length at an explicit root (period 1),
and three equal-length closed walks at the same root whose projected Parikh
differences have `|det| = 1` (covolume 1).

| `h` | root | coprime returns | `L` | `det` |
|---:|---|---|---:|---:|
| 2 | `aaa` | 4 (`baaa`), 5 (`bcaaa`) | 6 | `+1` |
| 3 | `aabaa` | 6 (`caabaa`), 7 (`acaabaa`) | 9 | `−1` |
| 4 | `aaabaaa` | 8 (`caaabaaa`), 11 (`cabcaaabaaa`) | 13 | `−1` |
| 5 | `aaabaaaca` | 8 (`aabaaaca`), 13 (`abccaaabaaaca`) | 13 | `+1` |
| 6 | `abbbcaaaccb` | 12 (`babbbcaaaccb`), 17 (`acccaaabbbcaaaccb`) | 17 | `+1` |

Full walk strings and Parikh vectors: `manuscript/appendix_A_certificates.tex`.

### 4.3 Constants

| `h` | `λ_h` | `a_h` | `C_h` | `C_h/C_free` |
|---:|---|---|---|---|
| 2 | 2.4511095375 | 0.1489852192 | 0.616760 | 1.4916 |
| 3 | 2.2288029013 | 0.1534007516 | 0.599007 | 1.4486 |
| 4 | 2.0666349657 | 0.1614154912 | 0.569265 | 1.3767 |
| 5 | 1.9441605457 | 0.1200310311 | 0.765537 | 1.8514 |
| 6 | 1.8483339782 | 0.0921960033 | 0.996661 | 2.4103 |

`C_h = 1/(2√3·π·a_h)`; `C_h/C_free = (2/9)/a_h` identically, by `S₃`-equivariance.
`C_free = 3√3/(4π) = 0.413496…`, obtained directly from the unrestricted
ternary multinomial model.

Ordering: `C_2 > C_3 > C_4 < C_5 < C_6`, and `C_h > C_free` for all five.

### 4.4 The `K=5` scissor

Memory-9 `L_4`: CORE 2844 / LOST 270; boundary `180 + 180 = 360`; excursion
graph `H` with 366 edges; `ν(H) = τ(H) = 102`. Restricted to the 132
`K=5`-rejected type-`(3,1,1)` boundary transitions the minimum is also 102
`= 84 forced + 18 binary conflicts`, with 12 redundant. Under `S₃`: 22 orbits
of size 6, minimum 17 orbits = 102 transitions, exactly 8 optima. Under
`S₃`+reversal: 11 reversal pairs, minimum 9 pairs = 108 transitions, exactly
2 optima.

---

## 5. Independence axes

The value of this capsule is that the load-bearing quantities were **not**
inherited from the scripts that first produced them.

| quantity | independent check | axis of independence |
|---|---|---|
| state/edge counts | builder reimplemented from first principles (`audit/famlib.js`); identical state codes, adjacency and essential sets to `src/sft-container.js` for `h=3..6` | separate implementation |
| word counts | brute-force enumeration over `Σ^n` at three lengths per `h`; `h=6` gives 11070 / 20454 / 37698 at `n=11,12,13`, matching the ternary `K≥2` survivor sequence already in `MATH_CLAIMS.md` | brute force vs. transfer matrix, plus an external anchor |
| `a_h` | two structurally different methods — Green–Kubo on the Parry chain, and an exact-moment DP over words using no Perron vectors and no tilting — agreeing to `9e−14 … 1.4e−12` | different mathematics, not just different code |
| `a_4` | computed on memory 7 (786 states) and memory 9 (3114 states); agree to `1.5e−15` | presentation invariance |
| `C_free` | closed-form `Σ_p (multinomial/3^n)²` reproduces `3√3/(4π)` to `2e−16` | analytic control |
| scissor numbers | 31/31 checks in a self-contained verifier; cover/essentiality equivalence spot-checked by *actually deleting edges and re-essentializing* — 102/102 single-edge removals leave LOST states essential; 30/30 random size-102 sets agree with the vertex-cover predicate | semantic check, not just combinatorial |
| `h=6` counts | all five denominators reproduced by an independent BigInt DP | exact integer arithmetic |

---

## 6. Known shared assumptions

Both the original and the independent builder implement the same *definition*
of `L_h`. A common misreading of that definition would not be caught by any
check listed above. The strongest remaining validation would be an
implementation written from the manuscript's definitions alone, by someone who
has not seen this code.

All computations assume the memory-`(2h−1)` window presentation is complete —
that every abelian square of half-length `≤ h` is visible inside one
`2h`-letter window. The argument for this is in the manuscript, §2.

---

## 7. Claim boundary

**What this establishes:** a finite family of exactly-computed graph
invariants and certificates, and, under the hypotheses those certificates
verify, an asymptotic `R_n^(h) ~ C_h/n` for five specific languages.

**What it does not establish:**
- anything about `h ≥ 7`;
- that the non-monotonicity pattern continues, or that it is caused by
  recurrent-state loss;
- any literature novelty — see §9;
- anything about Mäkelä's conjecture.

**Evidence-level asymmetry to carry forward:** `C_6` is the largest and most
quotable constant in the family and is the **only** member whose asymptotic
has no finite-`n` confirmation. Its `n=40,50` numerators were never
independently recomputed (storage-audited only). Treat it accordingly.

---

## 8. Payload inventory (to be copied; hashes recorded now)

Source: `scratch/paper-submission-v0.6.1-2026-08-24/`

```
manuscript/
  4bf78c731f72ebcc3a8e7ebc6b22bbd5aea128892913e251285ebeb3c904bea8  manuscript_v0.6.1.tex
  bcae3d2753a8b2afb3623fbf1bcadbc645b8cbf505c5063313e3dcc7419d9623  appendix_A_certificates.tex
  8a9046a8bc949ac4d7bc40095795b5bb587a97136a682f36bf59f399dfba8201  appendix_B_finite_n.tex
  ae0263d15428f4a09ae9939639fd5ba52852a71b03d16314a6286d362a884db1  appendix_C_scissor_certificates.tex
  b2cb5321cde578b640d166777b61749521ace398b50eda9ff3627a58e170ecb0  appendix_D_symmetry.tex
  bbb9c2cc152292acac54b047f7a01f639e1e04c59db4eb3653b73b997ca91f65  appendix_E_reproducibility.tex
  11a07ea791730eeede5650620db63cc8c403ce6bcc1e612fc2ace58199b6d311  appendix_F_llt_details.tex
  9444162dd8c07969e80750fbdc847712b8361cfc59072fb3290fc300c9600bf8  references.bib
  cc5bad64d55d1d745e492fdf8012ff06aaa464e7a7e4527d9e830ffe806b4084  REFERENCE_AUDIT.md
  32e541984f71bd0b7c7409e4a9055acf99caccbb455f9251d8388814186c87c5  REPRODUCIBILITY_MANIFEST.md

certificates/
  11456aeebd0aa800df0e2799ced612a8fcc1bdc522fe5a7a7b1c6154847a77fd  verify_scissor_and_symmetry.js
  ec5174ecb7a667090e31769634fb1c35606d58e08bff6415bfbf8c5ffe6b0097  VERIFIER_OUTPUT.txt
  888ed97a01ed2cda3f3315cf83f2b9a946ff0b2f275e6d00641c810f23746466  excursion_cover_certificate.json
  1db4213098fbb64430e431bf5b94443126169a9db724894e3a1a4cb2997a37cb  symmetry_orbits_certificate.json
```

Source: session scratchpad (temporary; will be lost if not copied)

```
audit/
  0a2d6bd6e2fda55ab53b0505aac68345f4433639b9a5e2077d82de37a8dea164  famlib.js
  924ccce3ada264f65255c7d5ce89433a7e1d0dbeea2745133b495810bbc75fb1  fam_run.js
  56eb3bd00cb562906cef43e2d46e8db46573d79d551275aff704af7f380b94ae  fam_run2.js
  0eff18a85957c4d7c8aa25fb4c87747666f8ee4626ec5134eeb8e864d24b14a2  fam_run3.js
  27c6c1ec34863569998b1e0032e393edc5a625b647219275798bf461b72fb4cf  verify_h6_bigint.js
  3571552930127c26bbe52ea6f02dc9d18c24f4be6cf863979f5708ebb6cbd151  parseA2.js
```

### Reproduction command

```
node certificates/verify_scissor_and_symmetry.js
```

Exits 0, prints 31 `PASS` lines, rebuilds the memory-9 graph from first
principles, reads no data file and no path outside its own directory.

### Deliberately excluded

Three scripts shipped in the v0.6 package as `evidence/` — `spectral_certifier.js`,
`ablation_certifier.js`, `independent_dp.js` — are **not** carried into this
capsule. No upstream original could be located for any of them, nothing
load-bearing depends on them, and including them would invite a reader to
treat them as provenance they do not have.

---

## Historical audit artifacts not recovered

These six files were part of the intended 20-file capsule payload.
An exact-name recursive search was performed across the available repository,
alternate worktree, Antigravity brain/session directories, Desktop,
Downloads, Documents, and visible worktree locations.
Zero hash-matching copies and zero hash-mismatching copies were found.
The files are therefore not included.
They were NOT reconstructed.
Their expected SHA-256 values are preserved for possible future recovery.

- famlib.js
  expected SHA-256: 0a2d6bd6e2fda55ab53b0505aac68345f4433639b9a5e2077d82de37a8dea164
  recovery status = NOT_FOUND

- fam_run.js
  expected SHA-256: 924ccce3ada264f65255c7d5ce89433a7e1d0dbeea2745133b495810bbc75fb1
  recovery status = NOT_FOUND

- fam_run2.js
  expected SHA-256: 56eb3bd00cb562906cef43e2d46e8db46573d79d551275aff704af7f380b94ae
  recovery status = NOT_FOUND

- fam_run3.js
  expected SHA-256: 0eff18a85957c4d7c8aa25fb4c87747666f8ee4626ec5134eeb8e864d24b14a2
  recovery status = NOT_FOUND

- verify_h6_bigint.js
  expected SHA-256: 27c6c1ec34863569998b1e0032e393edc5a625b647219275798bf461b72fb4cf
  recovery status = NOT_FOUND

- parseA2.js
  expected SHA-256: 3571552930127c26bbe52ea6f02dc9d18c24f4be6cf863979f5708ebb6cbd151
  recovery status = NOT_FOUND


## 9. Literature status

```
ALGEBRAIC_NORMALIZATION       = VERIFIED
RICHMOND_SHALLIT_SOURCE_MATCH = PENDING
NOVELTY                       = NOT_FOUND_IN_TARGETED_CHECKED_SOURCES
```

**The set of checked sources is very nearly empty.** Web tooling returned a
monthly spend limit throughout the session in which this work was done; no
primary source was opened. The novelty phrase above is a statement about the
author's awareness, not about the literature. Per `LITERATURE_COVERAGE.md`,
"does not exist" is not an available value and is not claimed.

---

## 10. Correction record

See `CORRECTION_NOTICE.md` in this directory. One reported figure was wrong by
roughly fifteen orders of magnitude and is preserved there rather than
silently removed.
