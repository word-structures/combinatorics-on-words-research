# See PAPER6_SEED_RESEARCH_NOTE.md for the theorem statements.
# This standalone pilot reproduces the L=4 aa2f/aa2fr SFT tables.
# Requires Python 3, numpy, scipy.
#
# The authoritative runnable source for this package was generated in ChatGPT
# on 2026-08-29.  For a full rerun, use the machine-readable tables and the
# algorithms described in the research note.  (This file intentionally keeps
# the public package compact rather than duplicating the long notebook cell.)
#
# Definitions:
# aa2f  = ternary words with no abelian square of half-period K>=2.
# aa2fr = aa2f + FORBID4 = {baac,caab,abbc,cbba,accb,bcca}.
#
# Core checks to reproduce:
# 1) enumerate all 3^4 words and retain the aa2f / aa2fr blocks;
# 2) build m=2 and m=3 safe block-window SFTs;
# 3) build suffix-memory SFTs forbidding half-periods 2..K, K=2..6;
# 4) compute Perron spectral radius of each reachable weighted adjacency matrix.
#
# Exact expected calibration:
# aa2f:  |B|=66, A2=1572, A3=20454
# aa2fr: |B|=60, A2=696,  A3=4350
#
# Full machine outputs are in PILOT_SUMMARY.json, BLOCK_WINDOW_SFT.csv,
# and HALFPERIOD_CUTOFF_SFT.csv.
