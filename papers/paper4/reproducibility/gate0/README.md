# Paper 4 — Gate 0 (Discovery) evidence package

Canonical evidence for the Gate 0 row in `papers/paper4/PAPER_STATUS.md`.

Until 2026-09-03 that row cited `scratch/structure-discovery-2026-08-29/`, an
**untracked** path. A canonical `PASS` therefore rested on evidence that was not
in the repository and could not be seen from a fresh clone. This directory
closes that gap. **The scientific result is unchanged; only its provenance
moved.**

## Layout, and what each part is

| Path | Role |
|---|---|
| `inputs/test_word_400.txt` | **INPUT.** Canonical copy of the external dependency the producers read. Byte-identical to the original |
| `replayed/macro_alphabet.json` | **ACTIVE Stage-1 result** for this chain — 42 blocks, reproduced from the canonical input by the preserved producer |
| `as-found/` | **HISTORICAL producer artifacts.** The three generator scripts and their three outputs, byte-identical to the originals. Not edited, not reformatted, not repaired. **`as-found/macro_alphabet.json` is stale for this chain — see below** |
| `replay_gate0.js` | **Canonical replay wrapper.** New file, tooling, not evidence |
| `SHA256SUMS.txt` | Hashes of everything above |

### The three concepts, kept apart

```
INPUT                inputs/test_word_400.txt                         (400 letters)

ACTIVE REPLAY CHAIN  replayed/macro_alphabet.json      42 blocks      <- authoritative Stage 1
                       -> as-found/transition_dag.json  42 blocks
                       -> as-found/paper4_compiled_system.json  42 profiles

HISTORICAL           as-found/macro_alphabet.json      66 blocks      <- NOT authoritative here
```

The distinction matters: `as-found/` is evidence and must not be "cleaned up";
`replay_gate0.js` is tooling and may be changed freely.

## The chain

```
inputs/test_word_400.txt
    └─ find_macro_alphabet.js        → macro_alphabet.json
         └─ extract_transition_dag.js     → transition_dag.json
              └─ compile_to_paper4_algebra.js → paper4_compiled_system.json
```

## Why the scripts were not edited

All three hard-code absolute paths from the machine that ran them
(`C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/...`), so
from a fresh clone they cannot run unmodified. Rewriting those literals would
have altered preserved evidence to make provenance look tidier.

Instead `replay_gate0.js` rewrites the path prefix **in memory only**, runs each
stage against `inputs/`, writes to a temporary directory, and compares the
result with `as-found/`. Nothing under `as-found/` is read-write.

```bash
cd papers/paper4/reproducibility/gate0
node replay_gate0.js
```

A pass means **packaging integrity**: the preserved producers, on the preserved
input, still yield the preserved outputs. It is not new scientific evidence and
does not re-derive the Paper 4 theorem — see `../README.md`, "Scientific Scope".

## Stage-1 authority — which file governs, and which does not

Replaying stage 1 exposed an inconsistency **inside the original evidence set**:

| Artifact | Blocks | Reproduces from `test_word_400.txt`? |
|---|---|---|
| `as-found/macro_alphabet.json` | **66** | **No** |
| alphabet embedded in `as-found/transition_dag.json` | **42** | **Yes — exactly** |
| `as-found/paper4_compiled_system.json` | 42 profiles | **Yes — byte-identical** |

Replaying `find_macro_alphabet.js` on the canonical input yields **42** blocks,
and that 42-block set is **exactly equal** to the alphabet inside the as-found
`transition_dag.json`. The 42 are a strict subset of the 66; no block appears in
the replay that is absent from the as-found file.

The conclusion supported by the evidence: **`as-found/macro_alphabet.json` is a
stale artifact from a different, larger input**, while the two downstream
outputs correspond to `test_word_400.txt` and reproduce byte-identically.

**Resolved as follows — this is a settled authority question, not an open choice
between 42 and 66:**

1. **`replayed/macro_alphabet.json` (42 blocks) is the active Stage-1 result** for
   this Gate 0 chain. It is regenerated from `inputs/test_word_400.txt` by the
   preserved producer, and its 42 blocks are **exactly** the alphabet that
   `as-found/transition_dag.json` consumes. Reproduction is deterministic: repeated
   runs give the identical file.
2. **`as-found/macro_alphabet.json` (66 blocks) is preserved historical material and
   is *not* authoritative for this chain.** It must **not** be substituted for the
   42-block replay output in any future reproduction.
3. **Keeping the stale file is deliberate forensic provenance**, not an unresolved
   decision. An as-found inconsistency is evidence about how the work was done, and
   deleting it would destroy that evidence.

**What is *not* claimed.** The repository does not record which input produced the
66-block file. It is a strict superset of the 42, which is *consistent with* a longer
word, but no artifact here establishes that, and none is invented. Its origin is
simply **unknown**.

`replay_gate0.js` checks Stage 1 against both the DAG alphabet and
`replayed/macro_alphabet.json`, and prints the staleness on every run rather than
hiding it.

**This does not adjudicate Gate 0's scientific status.** Gate 0 is *Discovery*; the
`L ≥ 5` theorem is proved symbolically, not by this chain. Nothing here re-proves the
Paper 4 theorem, and nothing here changes it.

## Provenance

| Field | Value |
|---|---|
| Original source worktree | `C:\abc-worktrees\profile-response-baseline-h2-h7-2026-08-25` |
| Original evidence path | `scratch/structure-discovery-2026-08-29/` |
| Original dependency path | `scratch/paper4-to-recordhunt-transfer-2026-08-29/test_word_400.txt` |
| Canonical dependency location | `inputs/test_word_400.txt` (this directory) |
| Source rescue branch | `rescue/paper4-structure-discovery-evidence-2026-09-03` |
| Source rescue commit | `3ae87afc798779148531cf59477cfbe6d26fd6b4` |
| Canonical promotion branch | `paper4/gate0-provenance-closure-2026-09-03` |
| Promotion base | `origin/main` `892b8c62f55150ee3b7355fdc9d696b7bb177058` |

Hashes, verified identical from the rescue ref to this directory:

```
6e543a34d7936f2146a33544b48b21cc3859abc1741af9407df1a390c588f155  as-found/find_macro_alphabet.js
1043b8476c6da3ad31730c21654a81e661f5a2223b8b55da6f7991abf3047c7a  as-found/macro_alphabet.json
4d4fe9616c17e08b4c5363df585bcde548e99ce6505bf72efe6554741d9b80f1  as-found/extract_transition_dag.js
3999e492e6422727a33af1fe41b6fe8e0a004f7ad90bbf2edbe7168850a86055  as-found/transition_dag.json
24989de287c8861ca51f6b8b7a1537f23b8eb9415252337761242d370f3870ce  as-found/compile_to_paper4_algebra.js
a166af92c6780ccb774e107987569b2b4edf88bcb0c62ddb3e45fbc74942cdcd  as-found/paper4_compiled_system.json
f1302159fbbe52eb056eb7e6c8c90de74a49846466fe34b5b770b8a652a10093  inputs/test_word_400.txt
```

Regenerated Stage-1 artifact (produced here, not preserved from the source):

```
37a68aeae3d46a4dfdd100e2a05b7ffa33a458d1a20fe45cd839ab328ba21ea5  replayed/macro_alphabet.json
```

No third-party or copyrighted material is included, and no toolchain or
generated environment is required — Node.js alone.
