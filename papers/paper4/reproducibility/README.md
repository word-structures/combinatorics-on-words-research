# Paper 4 Reproducibility Package

This directory contains the frozen replay and verification package for Paper 4.

## Structure
* `gate0/`: Gate 0 (Discovery) evidence — the structure-discovery producers, their
  outputs, the canonical copy of their input, and a replay wrapper. Canonical since
  2026-09-03; see `gate0/README.md`.
* `checkers/`: The verified, standalone Node.js validation scripts.
* `lib/`: Shared modules required by the checkers.
* `fixtures/`: Static datasets required by the checkers.
* `runs/`: Generated data outputs from pipeline stages (e.g. AFE bounds).
* `expected/`: Frozen expected output logs for regression testing.
* `PAPER4_REPRODUCIBILITY_MANIFEST_2026-08-29.json`: Complete mapping of every computational/replay-dependent claim to its canonical input, checker script, exact command, and expected output.
* `PAPER4_REPLAY_COMMANDS_2026-08-29.md`: Human-readable list of replay commands.
* `SANDBOX_REPORT_PAPER4_REPRODUCIBILITY_CLOSURE_2026-08-29.md`: The final closure report for the local reproducibility capture.
* `PAPER4_VOIDED_RUNS_2026-08-29.md`: Record of voided runs that must not be used as scientific evidence.
* `PAPER4_REPRODUCIBILITY_SHA256SUMS_2026-08-29.txt`: Hashes for all captured reproducibility artifacts.

## Usage
* **Working directory:** Navigate to `papers/paper4/reproducibility/checkers` before running commands.
* **Expected-output encoding:** the files in `expected/` are UTF-16 LE with CRLF (they
  were captured by PowerShell redirection). A byte comparison against fresh UTF-8 stdout
  will fail on encoding alone — decode before diffing.
* **`afe_263_run.js` reports a wall-clock `seconds` field** that necessarily differs
  between runs. Every other value is deterministic; compare on those.

* **`afe_263_run.js` writes into `runs/`.** Running it overwrites
  `runs/afe_263_crosscheck.json`, whose only volatile field is the same wall-clock
  `seconds`. After a replay, `git status` will show that file modified; restore it
  with `git restore` rather than committing the timing churn.

### The two `afe_263_run` expected files

`expected/` holds both `afe_263_run_output.txt` and `afe_263_run_output_NEW.txt`.
The distinction is mechanically established, not guessed:

* the two differ in **exactly one line** — `"seconds": 129.8` versus
  `"seconds": 151.9`. Every scientific value is identical, including
  `witnessFailures: 0`, `deadAFEinstances: 0`, `jointPositive: 44`, and the
  `SUCCESS CONDITION (sec=86, agree=263, unresolved=0): true` line;
* `PAPER4_REPRODUCIBILITY_MANIFEST_2026-08-29.json` names
  `expectedfe_263_run_output.txt` as the `canonical_output`;
* nothing in `checkers/`, `lib/` or the manifest references the `_NEW` file.

So `_NEW` is a **second capture of the same run**, differing only in timing, and it
is **not** an updated expectation. **The canonical expected output is
`afe_263_run_output.txt`.** Both files are retained — a duplicate capture is
harmless, and deleting evidence to tidy a directory is not a trade this project
makes.
* **Requirements:** Node.js (tested on v22.18).
* **Expected outputs:** Compare the stdout of each command to the corresponding file in `expected/`.

## Scientific Scope
The all-L >= 5 theorem is proved symbolically.
Finite replay (the scripts here) is validation/falsification evidence, not the proof premise itself.
