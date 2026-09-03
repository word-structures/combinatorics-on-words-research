# Paper 4 — Claude Audit Manifest v1.8

**Date:** 2026-08-27  
**Canonical manuscript:** `PAPER4_MANUSCRIPT_v0.30_2026-08-27.md`  
**Canonical handoff:** `PAPER4_CONTEXT_HANDOFF_v2.3_2026-08-27.md`

## Audit priority

Claude should audit the following in order:

1. **Epistemic correction:** verify that explicit ABFE records really imply exact AEF existence, and that v0.30 no longer treats AEF existence as open.
2. **702-population census:** independently check the chunk bookkeeping, the timeout closure for rows 151--200, the 14266 ABFE count, and the 15-AF / 7-F / 8-A support counts.
3. **Factor-language completeness:** verify that the A-side and B-side context lists over fixed D,E,F are exactly the actual no-C h6 factors and omit nothing relevant.
4. **BDF-first closure:** verify the 3 BDF -> 36 BDEF -> 0 A and 8 D -> 5 BDF -> 74 BDEF -> 0 A claims from source artifacts.
5. **Finite-grid wording:** confirm that 800 DEF -> 0 A is described only as a finite tested grid, never a global negative theorem.
6. **Fail-closed handling:** confirm all timeout/cap branches are marked incomplete and never counted as exclusions.
7. **Global claim discipline:** confirm ABDEF, complete H, novelty and Mäkelä remain OPEN / NOT_ESTABLISHED.
8. **Regression against earlier documents:** identify every statement in v0.29/v2.2 that is superseded by v0.30/v2.3, especially the old `AEF OPEN` wording.

## Critical files and hashes

| File | Bytes | SHA256 |
|---|---:|---|
| `PAPER4_MANUSCRIPT_v0.30_2026-08-27.md` | 78741 | `94e64367e7e4424102a6efa3d3ef328f2cc23b38e8be563f799e8fc1df62d416` |
| `PAPER4_MANUSCRIPT_v0.30_CONSISTENCY_CHECK.txt` | 340 | `ec588647c7d3146e50c320cc8da07ef5c5a8d774635273261accb61822fa7ca2` |
| `PAPER4_MANUSCRIPT_v0.30_NEWCLAIMS_EVIDENCE_MATRIX.md` | 2257 | `d3590d08e2a57706a0afac29b659552fe0b68b57b92677a44eef874c9c4d5364` |
| `PAPER4_CONTEXT_HANDOFF_v2.3_2026-08-27.md` | 4170 | `542c68d2e059d960af1c64fb980392ddc273394caa582c9d52e090f6dc4c1000` |
| `PAPER4_CURRENT_CANONICAL_CHECKPOINT_v0.30_2026-08-27.md` | 644 | `615fdd1e30c00758a497b7597c4321680e084dda3353f83f5409f97b9a08191c` |
| `PAPER4_GLOBAL_F_EXCLUDED_UNION_38118.txt` | 1562838 | `ea82395a9f7a471045f53622280ab1b95d55788a50fde761c36e05f1622ef764` |
| `PAPER4_GLOBAL_F_UNION_38118_CHECK.txt` | 300 | `85d8b892cffb83dd2fe6b7d08ddc0dc4fff496d4c703f88138d3bdd3a39331e5` |
| `PAPER4_702_FULLNOC_ABFE_CENSUS_CERTIFICATE_v1.0_2026-08-27.md` | 1306 | `0c402e20c8eb9d9cee0b2df6c626ca1b7aad603513f47aefc618a166997981ee` |
| `PAPER4_BDFFIRST_DEF_FACTORIZED_MILESTONE_v1.0_2026-08-27.md` | 1674 | `36c786a7973c9136103db740a129b881f35db242ae8ec845b88af9f87431d529` |
| `PAPER4_KNOWN_EXACT_AF_PAIRS.tsv` | 57564 | `299edaf5180bd10df62a949c676b66daca11295e76f9e99c6e7cbeed642a97f4` |
| `PAPER4_702_CHUNK_RESULTS.json` | 3828 | `c3ad27c13129e547a7cba40556d15666ddd0a24953ba47764d4e4b2784c2970e` |
| `PAPER4_702_151_200_SUB_RESULTS.json` | 2694 | `13c36589eab66630d0b976c23ee1f2ee16e43a703ea8047a514e276057127a42` |
| `PAPER4_702_FULLNOC_ALL_ABFE_14266.tsv` | 2396688 | `ad4aec2e3282823de429f5fa3804c571cca026cee98eee7466e3236c1ef1e6d6` |
| `PAPER4_702_ABFE_DISTRIBUTION.txt` | 199 | `d76451ed694c1acd2f68b26550f45482e2f7c619775120b8b7d449d0f46b6844` |
| `PAPER4_AF_TO_ABDEF_FULL_NOC_EXPORT_ABFE_v3.cpp` | 6902 | `4ac515175ec538b016cfb3574be8d5a55eef1671daea53458dc60137b48e7e69` |
| `PAPER4_FULLNOC_87_ABFE_SCAFFOLDS.tsv` | 2171 | `0f327e11d54753c9770ed00e3fa0cd76f71229e64c855bae66adc2aa17229808` |
| `PAPER4_ABFE13_DIRECTD_RESULTS.json` | 4322 | `bd36fa94c86669177a0ab07d125829e6bda0cb333407a78801a91f376b8bf9f5` |
| `PAPER4_FIXED_ABDF_DIRECT_E_CONSTRAINT_DFS_v1.cpp` | 4270 | `c780ec6aa39f326564530d201b3b3519349f874c53a717ff73149ac17233e40e` |
| `PAPER4_GENERIC_SINGLE_ROLE_ENUM_v1.cpp` | 4965 | `9144b35af8e84b0d2280f2810858f89598882ce3464d41cf04ba674342a3a61d` |
| `PAPER4_BDFFIRST_CORE1_E100_OUTPUT.txt` | 115 | `d0b3acccb93a8ac8c30ede57e27b496d602683152ca6462321ac666ae9e9136f` |
| `PAPER4_BDFFIRST_CORE1_E100_A_RESULTS.json` | 1269 | `64326b5375f6aa1b7c3aac62188d8fd031cf69eba8e957e20e7e9f90ec0624c4` |
| `PAPER4_BDFFIRST_UNIQ_CORE23_E_RESULTS.json` | 1843 | `0fada43fd7b2d30acd17a55fe18da723d5c43e0be821b4c915d5198f5d70322f` |
| `PAPER4_BDFFIRST_UNIQ_CORE23_A_RESULTS.json` | 6783 | `b55c4328fc16d689cf51cb2cb05cd1934de1043ef4f7e43e8e7f65c0aca5a697` |
| `PAPER4_DF_HAMMING4_D_POOL_v1.cpp` | 1759 | `e8f18ef6bd0b5c745655599ec8f02d4f19d599d0b1b582858cfdbc24ac43e52e` |
| `PAPER4_DF_H4_DPOOL_RESULTS.json` | 480 | `04c0011b5488cd1d8e5380a2ec020ec3831422e07022014113a8d64361002910` |
| `PAPER4_DLOCAL_B_RESULTS.json` | 1484 | `ed248630c34cebd30b698b5da1bca45ef72103f7c3d3c17d71085c4203853395` |
| `PAPER4_DLOCAL_BDF.tsv` | 625 | `38838816a4823075516f889561e06e1476dc9abc9232a93c55977ec959c63541` |
| `PAPER4_DLOCAL_BDF_E_RESULTS.json` | 5082 | `1ff6ada66f4670a525d5aa648b4f5e877aedeca2e56cedd214f74b351fc636e0` |
| `PAPER4_DLOCAL_BDEF_A_RESULTS.json` | 20677 | `b43e8d4427850f787c8ebd4e5212a48fc3af8aa5e7f33a5d88ed2ee2c53f5e40` |
| `PAPER4_DEFGRID_8x100_OUTPUT.txt` | 397 | `43bf413cb5fc60f19af2724d44f4f0e76015161a9a82438f9455451903a07e27` |
| `PAPER4_H40_FINAL_CERTIFIER_v1.0.py` | 13494 | `8edb9cafe4311001c9945222344a664c5dbe832299f1b6199c63c17fb79eead2` |

Missing critical files: **0**

`STATUS: READY_FOR_CLAUDE_AUDIT`
