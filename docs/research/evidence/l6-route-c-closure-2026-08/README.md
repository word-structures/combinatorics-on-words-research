# Route-C L=6 Full Closure Evidence Capsule

## Mathematical Scope
This artifact preserves the exact computational evidence proving that the uniform L=6 Route-C coding family for Mäkelä's conjecture is completely closed.

Specifically: For any uniform morphism g : Sigma_6 -> Sigma_3^6, if g(h6^omega(a)) avoids all Abelian squares with half-length K in [2,5], then it necessarily contains an explicit Abelian square with K >= 6. In established terminology: S_small(6) n S_large(6) = empty.

**Claim Boundary:**
* PROVED: No uniform L=6 coding of h6 yields an aa2f word.
* NOT PROVED: S_large(6) = empty.
* NOT PROVED: L* > 6.
* NOT PROVED: Anything regarding L >= 7, non-uniform codings, or other aspects of Mäkelä's overarching conjecture.

## h6 Identity
The base morphism h6 is exactly the standard project primitive validated against Rao & Rosenfeld (arXiv:1511.05875).

## Population Definition and Locality Reduction
For uniform L=6, any Abelian square of K <= 5 (length <= 10) intersects at most 3 consecutive source blocks. The exhaustive constraint generation over all length-2 and length-3 factors of h6^omega(a) forms S_small(6).
Exact independently verified exhaustions:
* Concrete codings: 1,200,636
* S3-canonical classes: 200,106

## Stage-A Soundness Partition
For two consecutive h6 source factors of length m with Parikh difference d, if the Parikh matrix Mg satisfies Mg d = 0, the corresponding two image halves have perfectly equal Parikh vectors, constituting a structural Abelian square of length 2K (where K = 6m >= 6).
This exact algebraic kernel elimination eliminates all but a bounded residue class.
* Stage-A eliminated: 1,200,288
* Residue class R: 348

## Residue Verification
The remaining 348 codings are serialized and hashed to ensure strict population immutability (SHA-256: 15c89ab72a8d8a2ebc782884e308b195454188d30da2dd87c554889a7189e18f).
Each is independently materialized directly to strings, identifying an earliest exact terminal witness bounded strictly by K in [6,10] ending before or at position 34. The verifier exactly checks that the halves have identical Parikh vectors and exist at the stated bounds.

## Verification Command
A deterministic top-level verifier is provided to independently prove the full chain:
`node verify_closure.js`
This script reproduces the exact F2 and F3 from $h_6$, regenerates the $K \in [2,5]$ small population exactly, derives the Stage-A obstructions, computes the exact elimination and residue subsets, verifies that the regenerated residue equals the certificates file, hashes the residue, and dynamically checks all 348 explicit string witnesses.

## Audit Failure Mode
During early Stage-A auditing, an enumeration implementation serialized variable components in evaluation topology order (a,c,e,b,d,f), while the consuming analyzer incorrectly assumed strict alphabetical indexing (a,b,c,d,e,f). The independent cross-model audit explicitly exposed this mismatch. To permanently guarantee silent masking cannot occur, this evidence capsule strictly encodes the string serialization explicitly mapping a,b,c,d,e,f order per artifact. The verify_residue.js tool dynamically reconstructs the exact mapped dictionary on verification against these invariants.
