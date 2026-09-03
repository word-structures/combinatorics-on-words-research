# Paper 4 reachable-set clean-room closure summary

**Purpose:** supporting evidence for the new Section 4.2 insertion only. This is not manuscript text and must not be converted into benchmark or speedup claims.

The Layer-C clean-room audit independently reconstructed the window mapper in Python and compared it against the JavaScript implementation over the declared finite test range.

Reported closure results:

- target block lengths tested: \(L=5,6,7,8\);
- both \(q=0\) and \(q\ge 1\) geometric regimes exercised;
- all **34** physical domain/mask patterns exercised;
- `physical_domain_mismatches = 0`;
- `role_mask_mismatches = 0`;
- `signature_mismatches = 0`;
- `bulk_target_mismatches = 0`;
- `algebra_decomposition_mismatches = 0`;
- `no_family_match = 0`;
- `multiple_family_matches = 0`;
- `wrong_family_assignments = 0`;
- `unexercised_patterns = 0`;
- **3370** windows checked by the end-to-end safe-elision audit;
- `false_safe_elisions = 0`.

The manuscript insertion deliberately retains only the mathematical one-window feasibility statement and does **not** import record-hunt, timing, speedup, or empirical converse material.

Claude should judge the insertion on mathematical correctness, proportion, and exposition. The audit above is supporting validation, not a novelty claim.
