# Structural Evidence Manifest (2026-08-15)

## RESULT_ID: G005_EXTINCTION_WIDTH_7
* **question**: Does $h(w,t) \le 3$ for all doomed words?
* **exact scope**: Finite word $w = \texttt{abacccaaacbc}$, $t=4$
* **source commit**: `ee1d058689a35824d76c1ac529dee6a3684f61f3` (base) + uncommitted dirty working tree.
* **script filename + sha256**: `verify_g005.js` (SHA256: 68FB6C874B2CE39AD3C5FE12D1D0F33198836D22042AF71732DC7772806DC1D1)
* **command**: `node verify_g005.js > verify_g005.out`
* **runtime/environment**: Node.js v22.18.0, Windows
* **input identity**: Hardcoded string $w = \texttt{abacccaaacbc}$
* **raw output**: `verify_g005.out` (SHA256: EBBCCE0660F912C9AEB4E332DC9391A72FAFD49283E90889F20BBB5660D87AE2)
* **witness**: $w = \texttt{abacccaaacbc}$
* **independent check + independence axes**: Direct naïve javascript re-implementation on 2026-08-16.
* **known shared assumptions**: $K \ge 2$ standard aa2f check.
* **claim boundary**: Exact finite counterexample refutes G005 universal bound. No infinite-existence conclusion.
* **storage class**: PERMANENT EVIDENCE

## RESULT_ID: G006_HALL_PROPERTY_REFUTATION
* **question**: Does Hall's condition hold for obstruction scales in all forced corridors?
* **exact scope**: Finite word $W = \texttt{abccaabacbbaaabbbaa}$
* **source commit**: `ee1d058689a35824d76c1ac529dee6a3684f61f3`
* **script filename + sha256**: 
  - `probe_local_hall.js` (SHA256: 93948DA42EDC749515B8B9CB70FA740969EA836AF8992428FC9D5C85479E66EF)
  - `probe_tail_chase.js` (SHA256: C3E1AD869C1C80CBD12C3004E68918E7A7D3604BB29C4C7DCBEC603243DD81A6)
* **command**: UNKNOWN / NOT RECORDED
* **runtime/environment**: Node.js v22.18.0
* **input identity**: UNKNOWN / NOT RECORDED
* **raw output**: 
  - `probe_local_hall.out` (SHA256: 14FA8E1DDB7DB07180F1FB85ECD3BEA0A9F3FFE76A911A4ECAAFAAE85A0AEF59)
  - `probe_tail_chase.out` (SHA256: D6A9093C884990581C9208E0BF489D39AF133043D1AEE6C2BB535B52F4038A32)
* **witness**: $W = \texttt{abccaabacbbaaabbbaa}$
* **independent check + independence axes**: UNKNOWN / NOT RECORDED
* **known shared assumptions**: Standard ternary aa2f rule ($K \ge 2$).
* **claim boundary**: Exact complete finite corridor refutes Hall variants. Does not refute PSC.
* **storage class**: PERMANENT EVIDENCE
