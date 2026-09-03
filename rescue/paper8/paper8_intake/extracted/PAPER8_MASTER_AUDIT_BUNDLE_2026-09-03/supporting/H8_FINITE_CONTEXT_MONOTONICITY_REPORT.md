# H8 finite-context curvature monotonicity — internal exact result

For each canonical H8 profile, the exact finite-context curvature rational function `C_v^(L)(x)` has strictly positive derivative on `[0,1]`. The derivative numerator was converted to the global Bernstein basis using an exact integer identity; every coefficient is strictly positive. This statement is about the finite-context certificate object, not yet a theorem that the infinite-context susceptibility itself is monotone.

| profile | L | derivative numerator degree | C_L(0) | C_L(1) | endpoint finite bound used | existing tail | improved infinite sign margin |
|---|---:|---:|---:|---:|---:|---:|---:|
| (3, 3, 2) | 220 | 1172 | -0.656836665117 | -0.569655649554 | 0.569655649554 | 0.275386008230 | 0.294269641323 |
| (4, 2, 2) | 220 | 438 | 1.144454184753 | 1.391676411016 | 1.144454184753 | 0.455271146731 | 0.689183038023 |
| (4, 3, 1) | 176 | 626 | 2.318662458752 | 3.166573497741 | 2.318662458752 | 1.760711366552 | 0.557951092200 |
| (5, 2, 1) | 180 | 320 | 5.971801558230 | 6.233667746256 | 5.971801558230 | 0.320896453984 | 5.650905104245 |

For `(3,3,2)`, `C_L<0` and increasing, hence `-C_L` is minimized at `x=1`. For the other three profiles `C_L>0` and increasing, hence the lower bound is the hard endpoint `x=0`.

Audit boundary: the existing finite-to-infinite tail inequality and interval-minorization rounding audit remain separate obligations. Novelty is not established. H9 was not opened.
