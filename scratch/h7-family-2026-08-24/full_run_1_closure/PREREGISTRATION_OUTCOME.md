# Preregistration Outcome

- valid(L7) = 37698
- essential(L7) = 32976
- lambda_7 ˜ 1.77763847574558
- a_7 ˜ 0.08282382651726
- C_7 ˜ 1.10944100388571

## Predictions
- P1 (valid count 37,698): CONFIRMED
- P2 (recurrent-state loss): CONFIRMED (32976 < 37698)
- P3 (a_7 in [0.065, 0.080]): OUT_OF_RANGE (0.08282...)
- P4 (C_7 in [1.15, 1.40] and C_7 > C_6): OUT_OF_RANGE (1.10944... is outside [1.15, 1.40], though C_7 > C_6 holds since 1.109 > 0.996)
- P5 (lambda_7 in [1.75, 1.80]): CONFIRMED (1.7776...)
- P6 (Structural hypotheses: unique SCC, period 1, det = 1): CONFIRMED

## Falsification Conditions
- F1 (h=7 loses states and C_7 < C_6): NOT TRIGGERED
- F2 (no state loss): NOT TRIGGERED
- F3 (Multiple dominant SCCs, period > 1, or covolume > 1): NOT TRIGGERED
- F4 (Structural hypotheses hold, C_7 > C_6, but C_7 falls outside [1.15, 1.40]): TRIGGERED

F4_TRIGGERED = YES
PREREGISTRATION_RESULT = MIXED
