# Replay notes

All paths below are relative to the package root.

## Fast binding certificate replay

1. Compile the exact global Bernstein threshold checker:

```bash
g++ -O3 -std=c++17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow \
  calculators/certify_half_global_gmp.cpp -lgmpxx -lgmp -o /tmp/certify_half
/tmp/certify_half data/BURNED_L220_R308_POLY.txt /tmp/BURNED_HALF_CERT.json
```

Expected stderr summary:

```text
degree 1409 positive 1410 zero 0 negative 0 first_bad -1
```

2. Re-run the root verifier:

```bash
python3 RUN_REPAIRED_332_VERIFY.py
```

Expected final field: `"PASS": true`.

## Modular replay

Compile:

```bash
g++ -O3 -march=native -fopenmp -std=c++17 \
  -Wall -Wextra -Wpedantic -Wconversion -Wshadow \
  calculators/modular_burned_giant_staged_fast.cpp -o /tmp/modburn
```

For each of the four primes `1000000007`, `1000000009`, `998244353`, `1004535809`, run

```bash
OMP_NUM_THREADS=8 /tmp/modburn \
  data/pid1_edges.bin data/pid1_sizes_giant.bin data/pid1_giant_mask.bin \
  220 308 558 705 PRIME /tmp/MODULAR_PRIME.txt
```

Then compare to the exact GMP polynomial with `calculators/crosscheck_burned_modular.py` or the package root verifier. The preserved four modular outputs are already checked coefficient-by-coefficient.

## Full binding GMP recomputation

Compile `calculators/exact_burned_context_gmp_giant_staged.cpp` against GMP/GMPXX and run with

```text
pid1_edges.bin pid1_sizes_giant.bin pid1_giant_mask.bin 220 308 558 705 OUTFILE
```

The preserved binding run used four OpenMP threads, exited 0, took about 1128 s wall time and peaked at about 3.31 GB RSS. The resulting polynomial SHA-256 is recorded by the threshold and modular certificates.

## Numerical audit boundary

The one-block projective interval generator still uses IEEE arithmetic with explicit outward padding rather than independently implemented directed rounding / ball arithmetic. The checkpoint deliberately retains this as an external audit item. The theorem one-block bounds 1.07 and 1.10 have percent-level slack over the stored maxima.
