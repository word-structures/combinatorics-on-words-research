# Paper 4 boundary projection v0.2

Run:

```powershell
python verify_full_eafea_longband_projection.py --selftest
python verify_full_eafea_longband_projection.py --E <40-letter-E> --A <40-letter-A>
```

Add `--F <40-letter-F>` for a full 3600-window direct regression on one triple.

The DP is exact for `eafea`, K=41..100, but remains only a necessary filter for complete-AEF because `fafea` and the short gate remain.
