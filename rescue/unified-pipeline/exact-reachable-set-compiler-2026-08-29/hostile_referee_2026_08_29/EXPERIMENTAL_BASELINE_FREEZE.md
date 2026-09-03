# EXPERIMENTAL BASELINE FREEZE
**Date:** 2026-08-29
**Script:** experimental_suite.js

## 1. Defects Found in Prior Scripts

### Defect 1: Profile/Block Mismatch (sandbox_phase1_scaling.js)
- **Role c:** declared profile [2,2,1], actual block "01122" has Parikh [1,2,2].
- **Impact:** All t-vector computations for windows crossing a resolved role-c block were incorrect.
- **Correction:** Changed block for role c from "01122" to "00112" (Parikh [2,2,1]).

### Defect 2: Non-deterministic PRNG (profile_feasibility_engine.js)
- Used Math.random() without seed. Results not reproducible.
- **Correction:** All experiments in this suite use seeded xorshift128+ PRNG (seed=42).

## 2. Corrected Baseline Comparison

### Old (buggy) vs New (corrected) Phase 1 Scaling
| K Range | Old Safe% | New Safe% | Difference |
| :--- | :--- | :--- | :--- |
| 10-19 | 87.5% | 88.5% | +1.0pp |
| 20-29 | 90.3% | 91.9% | +1.6pp |
| 30-39 | 92.7% | 94.3% | +1.6pp |
| 40-49 | 96.1% | 97.6% | +1.5pp |
| 50-59 | 96.9% | 97.0% | +0.1pp |
| 60-69 | 98.1% | 98.2% | +0.1pp |
| 70-79 | 96.8% | 97.7% | +0.9pp |
| 80-89 | 97.4% | 97.9% | +0.5pp |
| 90-99 | 97.7% | 98.1% | +0.4pp |
| 100-109 | 97.8% | 98.4% | +0.6pp |

### Totals
- **Old:** 43166/45500 safe (94.9%)
- **New:** 43555/45500 safe (95.7%)

## 3. Frozen Parameters
- **Source:** h6^6(a), length 729 roles
- **L:** 5
- **Alphabet size:** 3 (characters 0,1,2)
- **Unresolved role:** 'a', profile [2,1,2]
- **Profiles:** {"a":[2,1,2],"b":[1,2,2],"c":[2,2,1],"d":[3,1,1],"e":[1,3,1],"f":[1,1,3]}
- **Concrete blocks:** {"a":"00122","b":"01221","c":"00112","d":"00012","e":"01112","f":"01222"}
- **PRNG seed:** 42
- **K range:** 10..100
- **Start positions:** 0..99
- **Offsets u:** 0..4
