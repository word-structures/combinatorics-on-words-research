# Paper 4 — Theorem and Novelty Ledger

**Version 0.2 — 2026-08-27**  
**Purpose:** map every load-bearing manuscript statement to its epistemic status,
closest prior art, and remaining closure work.

| ID | Statement / object | Status | Closest prior art | What remains |
|---|---|---|---|---|
| T0 | Mäkelä asks for an infinite ternary word whose only Abelian squares have period 1 | KNOWN / OPEN | Rao–Rosenfeld 2018; Fici–Puzynina 2023 | final 2026 citation audit |
| T1 | \(h_6^\omega(a)\) is Abelian-square-free | KNOWN | Rao–Rosenfeld, Theorem 5 | cite exact theorem |
| T2 | \(g_3(h_6^\omega(a))\) avoids periods \(>5\) | KNOWN | Rao–Rosenfeld, Theorem 10 | cite exact theorem |
| T3 | Long outer-coding avoidance is decidable under \(E_e(M_h)\cap\ker M_g=\{0\}\) | KNOWN | Rao–Rosenfeld Prop. 9–10, Thm. 3 | implement for final \(H\) |
| T4 | No universal Abelian-square-free morphism \(\Sigma_6^*\to\Sigma_3^*\) exists | KNOWN COROLLARY | Carpi 1993, commutative-bijectivity necessity for \(|\Sigma|\ge6\) | primary-source locator in final bibliography |
| T5 | Therefore the fixed \(h_6\) factor language is structurally essential | DERIVED INTERPRETATION | T4 + Rao–Rosenfeld fixed-core construction | wording audit; not present as “new theorem” |
| T6 | Constant-length output square admits boundary-correction equation \(M_H(\Psi(V)-\Psi(U))+\beta=0\) | PROVED / PROJECT DERIVATION | close to template/parent formalism | clean-room proof; compare notation line-by-line to Currie–Rampersad |
| T7 | A bare finite contact graph cannot be the complete infinite certificate | PROVED / ELEMENTARY | periodicity of finite directed graph cycles | formal 3-line lemma |
| T8 | \(M'=sM+u\mathbf1^T\) preserves the kernel under equal-column-length differences | PROVED / ELEMENTARY | linear algebra | rename “rank-one incidence lift”; no novelty claim |
| T9 | Length-40 role vectors are \(M_{g_3}+(10,10,10)^T\mathbf1^T\) | EXACT-CHECKED | project specialization of T8 | independent arithmetic table |
| T10 | For \(K\le40\), any square lies in at most three consecutive 40-blocks | PROVED / ELEMENTARY | locality of uniform coding | formal lemma |
| T11 | Exact \(K=2,\ldots,40\) gate reduces to the 22 length-3 factors of \(h_6^\omega(a)\) | PROVED + EXACT-CHECKED factor language | finite factor language of primitive morphism | independent factor-set proof/check |
| T12 | AF/AFD/ABCF gates are necessary finite constraints | PROVED / PROJECT ARCHITECTURE | no exact counterpart found in audited sources | state only as algorithmic factorization unless novelty closes |
| T13 | One-swap component closure gives exact negative certificates component-by-component | EXACT-CHECKED COMPUTATIONAL METHOD | exhaustive finite-state search methodology | define graph formally; archive hashes and code |
| T14 | Current 18-component ledger: 1071 A states → 451 AF → 39 AFD → 0 full candidates | EXACT-CHECKED / COMPONENT-LOCAL | project computation | independent replay package |
| T15 | A full six-block \(H\) passing T11 and T3 solves Mäkelä positively | PROVED CONDITIONAL | direct definition + Rao–Rosenfeld | find such \(H\); verify open status before claim |

## The main novelty risk

The manuscript should **not** currently claim novelty for:

- templates, parents, ancestors;
- finite parent sieves;
- outer morphic coding;
- kernel conditions;
- universal morphism tests;
- “affine morphisms” as terminology.

The strongest potentially new package is narrower:

\[
\boxed{
\text{fixed }h_6\text{ core}
+
\text{rank-one length-40 role design}
+
\text{exact local block synthesis}
+
\text{component-wise finite certificates}.
}
\]

Whether that package is publishably new remains `NOVELTY_UNRESOLVED`.

## Three closure tasks that most improve the paper

### C1 — clean-room theorem proof packet

Rewrite T6, T8, T10 and T11 as short formal lemmas without reference to search
code.  Each lemma should have a mathematical proof and then a separate
computational corollary.

### C2 — database-quality novelty audit

Obtain a forward citation list for Rao–Rosenfeld 2018 and a cited-by list for
Carpi 1993 / Currie–Rampersad template work.  Manually inspect plausible
matches.  Web search alone is not enough for a final novelty claim.

### C3 — convert the component search from “evidence” to a theorem-friendly algorithm

Define the A-swap graph formally:
- vertex set;
- edge relation;
- exact local predicates;
- component BFS;
- certificate format.

Then state a finite theorem:

> Given a component \(C\), the algorithm returns either a surviving partial
> coding or an independently checkable certificate that no \(A\in C\) can occur
> in a full length-40 coding.

This would make the computational contribution mathematically reusable even if
the final Mäkelä construction is not found.


## Audit update — 2026-08-27

- T8 kernel lemma corrected: besides \(s\ne0\) and nonzero original common
  column sum \(L\), require new common column sum
  \(sL+\mathbf1^Tu\ne0\).  The Paper-4 specialization has value 40.
- T11 received a clean-room factor-language closure proof and independent
  exact 14-bigram / 22-trigram recheck.
- Gate T outer-parent enumeration now has an exact h6-specific finite
  coordinate system \(Q\) with factor-difference bounds \((4,4,2)\).
- g3 structural regression: 11,023 exact bounded parent templates.
- H40 performance regression: 40,425 parents on the already-falsified first
  candidate; outer enumeration is not a performance blocker.
- New blocker G1: generic h6 realizability of a **batch of nonzero outer-parent
  templates**.
- New audit warning G2: `proposition11-targets.js` appears to apply a
  single-factor contracting bound directly to a factor-difference vector.
  Do not use that helper as a Gate-T soundness dependency until repaired or
  independently justified.
