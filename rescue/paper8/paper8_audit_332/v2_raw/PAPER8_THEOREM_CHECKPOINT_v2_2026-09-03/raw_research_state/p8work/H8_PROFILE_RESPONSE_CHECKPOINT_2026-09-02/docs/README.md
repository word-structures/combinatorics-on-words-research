# H8 Profile-Response Checkpoint

This ZIP is intended to survive context loss. It contains the current H8 exploratory mechanism state, the compressed graph checkpoint, numerical outputs, derivations, and replay calculators.

## Fast resume

Read in this order:

1. `docs/CHECKPOINT.md`
2. `docs/GAMMA_RESOLVENT_RETURN_KERNEL_DERIVATION.md`
3. `docs/H8_PROFILE_RESPONSE_MECHANISM_REPORT_v2_2026-09-02.md`
4. `data/H8_RESOLVENT_SOFT_DERIVATIVES.json`
5. `data/H8_SOFT_PATH_ALL_PROFILES_SUMMARY.json`

## Calculators

### Rebuild the lifted H8 graph

```bash
python calculators/build_h8_graph_checkpoint.py
```

Expected structural output:

- valid states: 120084
- SCCs: 15565
- dominant states: 104520
- dominant edges: 184200
- target edge counts in dominant SCC: 4434, 516, 480, 72

### Recompute baseline + exact-resolvent soft derivatives

Place/run the calculator next to `H8_L7_LIFTED_GRAPH_CHECKPOINT.npz` or adjust the path.

```bash
python calculators/pf_and_resolvent.py
```

### Independent finite-difference check

```bash
python calculators/finite_difference_soft_check.py
```

### Soft path

```bash
python calculators/soft_path_all_profiles.py
```

This is heavier than the fast resolvent replay.

### Full hard-deletion replay

```bash
python calculators/hard_deletion_recompute.py
```

This is intentionally kept as the heavy replay path. In the ChatGPT container the full run exceeded the short execution window; the stored hard-deletion values were already independently cross-checked by Green--Kubo and moment-growth calculations in the discovery run.

## Python dependencies

- Python 3.11+
- NumPy
- SciPy

No internet access is required once this ZIP has been extracted.

## Critical caution

H8 is exploratory discovery data, not a blind validation set. Novelty is not established.
