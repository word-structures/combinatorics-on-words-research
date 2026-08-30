# Paper 4 Reproducibility Package

This directory contains the frozen replay and verification package for Paper 4.

## Structure
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
* **Requirements:** Node.js (tested on v22.18).
* **Expected outputs:** Compare the stdout of each command to the corresponding file in `expected/`.

## Scientific Scope
The all-L >= 5 theorem is proved symbolically. 
Finite replay (the scripts here) is validation/falsification evidence, not the proof premise itself.
