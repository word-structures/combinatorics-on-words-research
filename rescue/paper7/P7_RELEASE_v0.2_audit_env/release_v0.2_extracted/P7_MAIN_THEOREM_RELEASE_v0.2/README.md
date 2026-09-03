# P7 Main Theorem — Corrected Release v0.2

This package supersedes the v0.1 residual-state proof package.

## Theorem

For `s = abacabadc`,

` s in re(A4) \ le(A4) `,

where `A4` is the four-letter Abelian-square-free language.

## Important correction from v0.1

The v0.1 residual definition and verifier were found defective under hostile review. The corrected proof uses:

- 35 direct word-level residual states;
- 99 seed alignment rows;
- 17 recursive transition rows;
- an invariant that explicitly requires the fixed prefix `C = abacabadcdb`;
- a 190-letter exact base window.

See `P7_32_INDEPENDENT_RESEARCH_AND_RED_TEAM.md` for the full issue register.

## Verify

```bash
python verify_p7_main_theorem_v2.py
```

Expected opening line:

`P7 V2 CERTIFICATE: PASS`

The proof also uses the classical external theorem of Keränen (1992) that the specified 85-uniform morphism maps every Abelian-square-free word to an Abelian-square-free word.

## Novelty

`NO PRIOR RESOLUTION FOUND — NOVELTY PROVISIONAL`

No minimality, uniqueness, or unconditional “first solution” claim is made.
