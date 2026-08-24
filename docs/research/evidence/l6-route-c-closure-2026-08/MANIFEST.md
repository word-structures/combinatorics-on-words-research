# MANIFEST — Route-C L=6 Full Closure Evidence Capsule

Completed 2026-08-17 during the Thursday intake promotion pass. This manifest was
added to an already-existing capsule. The original source hashes are preserved below;
current hashes are listed for the promoted copies. summary.json and residue_certificates.jsonl
remain byte-identical; README.md, verify_closure.js and verify_residue.js differ from
the originals only by trailing-whitespace removal.

## Global provenance

| Field | Value |
|---|---|
| Verification command | `node verify_closure.js` (run from this directory) |
| Node version | v22.18.0 |
| OS / platform | Windows 11 Pro 10.0.26200 (`win32`) |
| Source commit of the capsule's originating run | `1541ed561a4a1e1e873344815f53a91e807d4c42` (tree `70384d1d4bafc5cb290eb1d05b2583c014de22ed`) |
| Commit this capsule is being promoted onto | `57807349eadec1e19414fbc4072a6e259e784f60` (`origin/main`) — content-identical tree |
| Reference tree the files were copied from | `C:\abc\docs\research\evidence\l6-route-c-closure-2026-08\` |
| Source word identity | `h6` = `a:ace, b:adf, c:bdf, d:bdc, e:afe, f:bce`, from `src/morphisms.js` (checksum-verified against Rao & Rosenfeld, arXiv:1511.05875 §5.1/§5.4) |
| Inputs | `h6` only. No dictionary, no seed word, no external dataset. The population is regenerated from `h6` by the verifier; nothing is read from a precomputed population file. |
| Generator identity | population/Stage-A enumeration scripts under `scratch/` in the reference tree (not promoted; experimental material) |
| Verifier identity | `verify_closure.js` (this capsule), which regenerates everything from `h6` |
| Raw output | see "Raw verifier output" below |

## Preserved files

Original source hashes (prior to trailing-whitespace normalization):
- `README.md`: `52b7dc3193d7e0a7179c86402e4cc61cdbf2beb1c9f5957a6671e9ce08af248e`
- `verify_closure.js`: `206e7721ca852dd13609cd741a54a54b01a6ff39dcca64e25bc02298598972ab`
- `verify_residue.js`: `4d07588820a12691506afa5ed03b1e65f0b68170731d249d4e7e7248c2f3c1ab`

| Relative path | SHA-256 | Role | Status |
|---|---|---|---|
| `README.md` | `3F2D10EB9E94513E1B6AF36ED88F8C75AF073E327405F7F0B9F85BD9D8900199` | capsule description, claim boundary, audit-failure note | source — trailing-whitespace normalization only |
| `summary.json` | `36f9e8023eae52882b606fce7a12447a59630e2fca230ab6dbed9adbf6fab5f6` | counts, residue hash, serialization convention | generated |
| `residue_certificates.jsonl` | `195f2f12967845e7717cb76b1b6b6a015899c8d285fbf6b862d607ba27286614` | 348 residue codings, each with an explicit death witness | generated |
| `verify_closure.js` | `69279D11370EDE0A58EAF032D75DFC7924CC980D0F048BBAEE963ED7C6C0A8E6` | top-level verifier; regenerates from `h6` | source — trailing-whitespace normalization only |
| `verify_residue.js` | `284A550FC83FC2EBF42CDC2A36795E4B010901710BB68F2798FEC1B6E42D2738` | residue serialization/hash checker | source — trailing-whitespace normalization only |
| `MANIFEST.md` | *(this file)* | provenance | added in this pass |

`residue_certificates.jsonl` contains **348 distinct codings**. Note that `wc -l`
reports 347 because the file has no trailing newline; this is a formatting property,
not a missing record. Distinct-coding count was verified by parsing.

## Verification independence

| Axis | Assessment |
|---|---|
| GENERATOR CODE LINEAGE | enumeration scripts under `scratch/` (reference tree), AI-authored |
| VERIFIER CODE LINEAGE | `verify_closure.js`, separately written; regenerates `F2`/`F3` and the population from `h6` rather than reading the generator's output |
| SHARED HELPERS | none imported between generator and verifier; both independently re-implement the aa2f predicate |
| SHARED INPUTS | **yes** — both start from the same `h6` definition. This is unavoidable: `h6` is the object under study. |
| ALGORITHM INDEPENDENCE | **partial** — both use the same locality reduction (`B(6)=3` blocks) and the same Stage-A kernel condition `M_g d = 0`. The verifier differs in enumeration order and in materialising residue codings directly to strings. |
| DATA-REPRESENTATION INDEPENDENCE | **yes** — generator works on Parikh matrices; verifier re-materialises concrete image strings and checks halves character-wise |
| SECOND REPRODUCTION | **not preserved in this capsule.** An independently derived locality reproduction was observed in an earlier session, but it exists only in ephemeral session scratch outside this repository. It is therefore **not evidence for this commit** and nothing here relies on it. |
| REP STATUS | **PASS.** The capsule verifier is fully replayable: `node verify_closure.js` regenerates the population, Stage-A partition and residue from `h₆` alone and reproduces every stated figure. Re-running the same verifier, or running it in another worktree, counts toward **reproducibility only** — not toward independence. |
| IND STATUS | **PARTIAL / NOT FULLY PRESERVED.** Generator and verifier differ in algorithm, data representation and enumeration order, but share the `h₆` input, the locality derivation, and the language/runtime/author lineage. No independently derived reproduction is preserved in this capsule. The shared locality argument is the component an outside check would need to hit. |

## Raw verifier output

```
--- L=6 ROUTE-C CLOSURE VERIFICATION ---
Regenerating population... done
population .......... 1,200,636 PASS
canonical ...........   200,106 PASS
Stage-A eliminated .. 1,200,288 PASS
residue .............       348 PASS
residue hash ........ PASS
explicit deaths ..... 348/348 PASS
combined survivors .. 0 PASS
ROUTE_C_L6_CLOSURE_CERTIFICATE_PASS
```

## Claim boundary

**Proved:** For every uniform coding `g : Sigma_6 -> Sigma_3^6` applied to the fixed
source `h6^omega(a)`, if the image avoids all abelian squares of half-length
`K in [2,5]`, then the image contains an explicit abelian square of half-length
`K >= 6`. Equivalently `S_small(6) n S_large(6) = empty`, so no uniform `L=6`
coding of `h6` yields an aa2f word.

**Not proved, and must not be inferred:**

- `S_large(6) = empty`. The capsule only examines codings that already lie in
  `S_small(6)`; codings outside it are untested here.
- Any change to `L*`, which remains in `{6,...,10}`.
- Anything about `L >= 7`. No inference from `L=6` to `L=7` is available.
- Anything about non-uniform codings, other source morphisms, or other
  construction families.
- Mäkelä's conjecture.

**Window sufficiency.** The `K in [2,5]` condition is decided exactly by a finite
CSP over the 22 length-3 factors of `h6^omega(a)` (locality bound `B(6)=3`); no
prefix-length cutoff is involved. Stage-A eliminations are exact algebraic kernel
conditions, not window scans. The 348 residue deaths are exhibited as explicit
abelian squares with `K in [6,10]` ending at or before image position 34.
