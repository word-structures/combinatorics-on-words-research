# Paper 4 — Claude Audit Manifest

**Version 1.8 — 2026-08-27**

| File | SHA256 |
|---|---|
| `PAPER4_MANUSCRIPT_v0.26_2026-08-27.md` | `4b2e4b8eb584f56387dc38787720ebf6caffd419314c9777901de8106fa26724` |
| `PAPER4_MANUSCRIPT_v0.26_CONSISTENCY_CHECK.txt` | `da729c3e350d0188aa15a4082a737e388843abffc2f20f1e951c66d3ad898552` |
| `PAPER4_4242F_DIRECT_A_INDEPENDENT_REPLAY_v1.0_2026-08-27.md` | `73dda4097b8aed80dd9f935951f45485dd85329fa78226ae533742ab526520b5` |
| `PAPER4_19F_87AF_ABDEF_DUAL_REPLAY_v1.0_2026-08-27.md` | `7ffad46c3a6e0e11be2bf718f72d8783c9ab01af3b80fb2815d03826551534f7` |
| `PAPER4_GLOBAL_F_EXCLUSION_LEDGER_9693_v4.0_2026-08-27.md` | `f26dedd976605a3f048c46cca6d2bdd65b8ab77d464f21bfb4157177e11ebaec` |
| `PAPER4_GLOBAL_F_UNION_9693_CHECK.txt` | `d15fd42395e596ed146346a9c952fa3f2ed31b7a0b5a5a1bb1482b0633c3736d` |
| `PAPER4_GLOBAL_F_EXCLUDED_UNION_9693.txt` | `a8bd7d9801dd814f3bd885e1960d524ab2cdaff8f9c94b5fc1ffe32799d172f7` |
| `PAPER4_ALL19F_EXHAUSTIVE_87_AF_PAIRS.tsv` | `2d49c2c37526cddc87b6070d822c6d612ebb6930092770ef1af4d62daf6fc9cc` |
| `PAPER4_ALL87_AF_CLEANROOM_VERIFICATION.txt` | `3fe3027b21b7346667bd88702408dd0db3c1774ebfa64b136544bd150c2d109a` |
| `PAPER4_ALL87_AF_ABDEF_REVERSE_OUTPUT.txt` | `6c31b89a342f20c3de96040849749688f4290cd5f20184a9ba16c6fec073abcd` |
| `PAPER4_ALL84_AF_ABDEF_OUTPUT.txt` | `d9dcd6eabd4985d8b2b11f0b2f62f8d00cb9352c3da5d7c5b523c6f88c9563fd` |
| `PAPER4_F3590_ALLA_ABDEF_OUTPUT.txt` | `a3824a5d319d09c3bb5a8f397fda7e9ac7d82551868d73f89a7383014dd0cffb` |
| `PAPER4_4242F_INDEPENDENT_REPLAY_EXPECTED.tsv` | `cbfce7a2d2b94f236ec38ef0fc071b58092c413b5363a69df602ad7de4a4f092` |
| `PAPER4_REPLAY300_ALL.json` | `be178d4edd89daed27e907961dedda2d2df1dd692efb8c7581ac7123d14e3d79` |


## Current canonical state

- Mäkelä: `OPEN`;
- complete positive H: `NOT FOUND`;
- current exact failing complete-H search record: 146 finite windows;
- globally excluded F-role lower bound: **9693 distinct words**;
- current generated internally-clean F pool: **4544/4544 excluded**;
- 4242-F direct-A population: **4242/4242 independent A-count replay**;
- classification: **4223 F with 0 A; 19 F with 87 total A choices**;
- 87 AF pairs: clean-room **87/87 PASS**;
- 87 AF pairs: dual E orientation **0 ABDEF, 0 caps**;
- Gate T: fail-closed two-sided regression PASS;
- novelty: `NOVELTY_UNRESOLVED`.

## Positive-search implication

The current generated F pool is exhausted.  New positive search must begin
from genuinely new internally-clean F words outside the 9693-word exclusion
union, then enumerate all A choices before ABDEF/C/final certification.
