# EXACT PROFILE SAFE-ELISION THEOREM
**Date:** 2026-08-29

## 1. Theorem
Let $W$ be an unresolved candidate window spanning one or more blocks under a fixed $q$-uniform target profile assignment. Let $\sigma(X)$ be the specific abstract geometric signature (derived from the block boundaries) governing this window, and let $\rho$ be the fixed Parikh profile of the target blocks.
Let $t = \Delta_{bulk}$ be the constant Parikh target originating from the bulk blocks fully contained within $W$.

Under the fixed algebraic convention $\sigma(X) + t = 0$, if:
$$ -t \notin \mathcal{R}_\sigma(\rho) $$
then **no concrete letter ordering** of the unresolved blocks (subject to profile $\rho$) can possibly make $W$ an abelian square.

## 2. Proof
By definition, $\mathcal{R}_\sigma(\rho)$ is the set of all possible Parikh vectors that the linear combination of prefixes $\sigma(X)$ can evaluate to, over all valid concrete words satisfying the profile $\rho$.
If $-t \notin \mathcal{R}_\sigma(\rho)$, then for every possible concrete ordering, $\sigma(X) \neq -t$.
Thus, the boundary contribution can never cancel the bulk contribution $t = \Delta_{bulk}$.
Therefore, $P(W_{left}) - P(W_{right}) = \Delta_{bulk} + \sigma(X) = t + \sigma(X) \neq 0$.
The window $W$ cannot be an abelian square. $\blacksquare$

## 3. The Converse (Crucial Restriction)
If $-t \in \mathcal{R}_\sigma(\rho)$, it only means that **some** profile-compatible word exists that could realize the required Parikh correction.
It does **NOT** mean:
- The exact concrete block currently being tested actually realizes it.
- The entire candidate assignment contains a square.
- The whole morphism is invalid.

It only means this window has entered the "Danger Zone" and cannot be mathematically elided at the profile level. The literal character-by-character check must be performed.
