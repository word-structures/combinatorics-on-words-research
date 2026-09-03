# Paper 4 boundary projection — independent package

Copy this directory into the existing Paper-4 next-version sandbox when Claude is available.

Run:

```powershell
python verify_eaf_boundary_projection.py --selftest
python verify_eaf_boundary_projection.py --json-regimes
```

For a concrete 40-letter E and A:

```powershell
python verify_eaf_boundary_projection.py --E <E> --A <A>
```

Optionally add F:

```powershell
python verify_eaf_boundary_projection.py --E <E> --A <A> --F <F>
```

Interpretation: DP-empty is a rigorous rejection for the projected EAF family. DP-nonempty is not a complete-AEF hit.
