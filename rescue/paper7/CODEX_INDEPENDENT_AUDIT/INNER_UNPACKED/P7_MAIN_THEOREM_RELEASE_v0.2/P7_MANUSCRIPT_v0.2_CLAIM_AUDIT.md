# P7 Manuscript v0.2 Claim Audit

**Date:** 2026-09-03

| Claim | Status | Basis |
|---|---|---|
| `abacabadc` is ASF | PROVED / DIRECT-CHECKED | direct finite definition check |
| no letter can precede `abacabadc` | PROVED / HUMAN-CHECKABLE | four explicit Abelian-square witnesses |
| `s notin le(A4)` | PROVED IN PAPER | immediate from one-step left death |
| Keränen `g85` maps ASF words to ASF words | EXTERNAL CITATION | Keränen 1992 |
| incidence matrix and determinant | EXACT-CHECKED | recomputed from frozen `g85` images |
| crossing squares with K>=85 induce residual states | PROVED IN PAPER + FINITE ENUMERATION | equation (5.4), 99 rows, 35 states |
| residual recursion closes in Q | PROVED IN PAPER + FINITE ENUMERATION | equation (6.1), 17 integral rows |
| all nonrecursive residual cases fit in first 190 letters | PROVED IN PAPER | exact position identity and `sum(q)` bound |
| fixed 190-letter base window is ASF and Q-free | SUPPORTED BY EXACT VERIFIER | `verify_p7_main_theorem_v2.py` |
| `C` is in corrected invariant class | SUPPORTED BY EXACT VERIFIER | direct ASF + residual absence check |
| `F(V)=Cg(V)` preserves corrected invariant | PROVED IN PAPER + CERTIFICATE | Propositions/Lemmas 5-8 |
| every `W_n` is ASF | PROVED IN PAPER | induction |
| `W_infinity` is ASF | PROVED IN PAPER | nested finite-factor argument |
| `s in re(A4)` | PROVED IN PAPER | explicit infinite right extension |
| `s in re(A4) \ le(A4)` | PROVED IN PAPER | main theorem |
| `re(A4) \ e(A4)` nonempty | PROVED IN PAPER | `e subset le` corollary |
| Keränen 2010 posed one-sided unfavorable-factor phenomenon as open | EXTERNAL CITATION | Keränen 2010 primary source |
| no later equivalent resolution found through 2026-09-03 | LITERATURE AUDIT / PROVISIONAL | current searches; not theorem content |
| witness length 9 is minimal | NOT CLAIMED | intentionally uninvestigated |
| theorem is first/new | NOT CLAIMED | novelty remains provisional |

## Audit verdict

`MANUSCRIPT v0.2 — CLAIM AUDIT PASS SUBJECT TO EXTERNAL KERÄNEN 1992 INPUT`

The historical v0.1 residual proof is superseded and should not be cited as the proof kernel.
