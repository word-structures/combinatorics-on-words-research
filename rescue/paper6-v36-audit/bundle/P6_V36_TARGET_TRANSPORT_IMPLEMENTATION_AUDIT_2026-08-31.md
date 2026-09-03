# P6 v3.6 — TARGET TRANSPORT IMPLEMENTATION AUDIT
**Date:** 2026-08-31

The first implementation of the preregistered one-block near-source formula
asserted that the required old-history suffix length

    n = j + 2h - L

always existed.

That is false for short startup histories. A near-root candidate exists only
when its complete factor fits in `s+b`, equivalently `n <= |s|` after removing
the appended block.

The first run therefore stopped on an assertion before producing a PASS/FAIL
result. No theorem conclusion was drawn from that run.

Correction: skip a near-source candidate when `n > |s|`, exactly matching the
factor-existence condition. No other formula or preregistered success criterion
was changed.

The corrected full test suite then ran from the beginning.
