# Micro-Capsule Evidence Template

## RESULT_ID: AA2F-LARGE-SCALE-BLOCKER-DENSITY-MICROPROBE-1
* **question**: Does mu-based large-scale essential forcing decay on existing aa2f record words?
* **exact scope**: Finite bounds tested on available valid pure aa2f record words (lengths 200 and 2000). Evaluated deterministic properties of mu(i) for all h up to |W|/2.
* **source commit**: HEAD
* **script filename + sha256**: aa2f_measurement.js (c479c44dc64dcd96d0b62dde7ffef85a2ee8cdfb5cb41f721ed3fb2d585b3ab5)
* **command**: `node docs/evidence/structural-2026-08-16/aa2f_measurement.js`
* **runtime/environment**: Node.js
* **input identity**: `record_word_200.txt` and `record_word_2000.txt`. 
* **raw output**: `docs/evidence/structural-2026-08-16/aa2f_measurement.out`
* **witness**: The D_h statistic measured on the length-2000 prefix decreases from 1.0 down to 0.012 at h=100 (where W/h = 20), indicating structural decay away from the boundary.
* **independent check + independence axes**: Microcheck passed on canonical G006 first state. Re-verified raw words for aa2f properties.
* **known shared assumptions**: Assumes the K-based algebraic formulation perfectly captures structural suffix properties up to half length.
* **claim boundary**: The measurement shows that the mechanism SURVIVED BOUNDED MEASUREMENT because D_h decays as h grows away from the boundary regime. It DOES NOT mathematically establish a theorem, nor does it guarantee behavior for infinite sequences.
* **storage class**: PERMANENT EVIDENCE
