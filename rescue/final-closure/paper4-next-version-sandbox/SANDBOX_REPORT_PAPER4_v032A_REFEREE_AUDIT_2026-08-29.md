# Adversarial referee audit — Paper 4 manuscript v0.32a

**Date:** 2026-08-29
**Role:** hostile-but-constructive referee and reproducibility auditor.
**Status:** sandbox audit only. **No manuscript mutation. No canonical promotion.
No `MATH_CLAIMS` edit. No Git mutation.** Mäkelä **OPEN**. `NOVELTY_UNRESOLVED`.

Companion artifacts: `PAPER4_v032A_CLAIM_AUDIT_MATRIX_2026-08-29.csv`,
`PAPER4_v032A_REQUIRED_PATCHES_2026-08-29.md`.

---

## 0. Provenance of the audited object

| artifact | sha256 | manifest |
|---|---|---|
| `PAPER4_MANUSCRIPT_v0.32a_EDITORIAL_SANDBOX_2026-08-29.zip` | `fdd1f36b1868e8a308328d36ecf85c80e11063c9e12efa9dc52b4d9f73668829` | — |
| `PAPER4_MANUSCRIPT_v0.32a_EDITORIAL_SANDBOX_2026-08-29.md` | `0d03775a30c067a297df02a58c4e218362e460f4b0673113f0bf2923a953c5f5` | **MATCH** |
| `V032A_PRECISION_PATCH.md` | `c572699c1fa0c9ae2b6f01b24f2cb4c68e4af230110b022b533d7351c455e3d4` | **MATCH** |

Unpacked read-only to `_v032a_audit/`. Source zip untouched.

**Run-state check.** Another session voided run `afexRX` for concurrent writers
and superseded it with `afexRX2` (exclusive `O_EXCL` lock). I verified on disk
rather than assuming: `afexRX2` is `AF_COMPLETED` with 75,111 trials, 137
AF-positive, 36 E represented, 17 E with AF-positive, **0 unresolved**, 6 capped
re-decided; `bcdRX` is `COMPLETED` with 0 AFE, 0 joint, 0 P40, 0 capped. The
manuscript's RX numbers come from the clean run, not the voided one.

---

## 1. What I verified independently

I re-derived and re-computed the central objects rather than trusting the
supporting reports.

### 1.1 Theorem 8.1 — fully reproduced

Built from the §8 domain descriptions alone
(`work/v032a_sixdomain_check.js`):

| L | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 12 | 40 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| patterns | 34 | 34 | 34 | 34 | 34 | 34 | 34 | 34 | 34 |
| families | 9 | 15 | 19 | 19 | 19 | 19 | 19 | 19 | **19** |

- **34 patterns** at every `L` — matches `2+4+4+8+8+8`.
- **19 families for `L ≥ 4`**, stable, matching §8.1's `9, 15, 19, 19, 19, 19`.
- **All nineteen Table-1 cardinalities match exactly** at `L = 40` as a multiset:
  `1, 20, 20, 39, 39, 40, 40, 210, 210, 210, 210, 342, 381, 399, 399, 400, 400, 420, 800`.
- `P ∖ P_t` and `M ∖ M_t` are each **exactly one lattice point**, as §8 claims.

*My own defect, recorded:* my first run reported `8, 14, 18` at `L = 2,3,4`
because my family key conflated the **empty set of signatures** with the **set
containing the empty signature**. After fixing the key the manuscript's numbers
reproduce exactly. The manuscript was right and I was wrong.

### 1.2 Phase-II weighted frontier-DAG — clean-room verified

The task designated this untrusted. I froze my own derivation first, then
implemented it independently (`work/v032a_phase2_cleanroom.js`) on scaled-down
profiles with brute-force ground truth: **360 systems, 6 profiles**.

| claim | verdict |
|---|---|
| **A** blocked child mass × multiplicity `N` is valid | **HOLDS** |
| **B** quotient preserves first-hit semantics | **HOLDS** |
| **C** `Z + Σ_d M_d = |W_h|` exact | **HOLDS** |
| **D** `A_surv = Σ_{d=0}^{39} S_d = E[T]` | **HOLDS** |
| **E** `N_eff` from quotient multiplicities (`N w²`, not `(N w)²`) | **HOLDS** |
| **F** `Z = 0` certifies UNSAT | **HOLDS** |

*Coverage correction, recorded:* my first pass produced **SAT 360 / UNSAT 0**,
so claim **F was never exercised**. I added targeted constraint generation to
force UNSAT and re-ran: **SAT 270 / UNSAT 90**, all six claims still hold. A
result from the first pass would have been vacuous for F.

**Why A is valid, and why it is tight.** The `N` prefixes sharing a frontier
state have the *same* `X_d`, because `X_d` is part of the state
`S_d(u) = (X_d(u), (X_i(u))_{i∈A_d})`. Appending the same letter therefore gives
children with identical current Parikh and hence identical cylinder cardinality
`C_h(p)`; the children are distinct words, and by Lemma 12.1 their cylinders are
disjoint. **If `X_d` were dropped from the state the identity would fail** — the
theorem is correct precisely because the manuscript includes it.

**Why D is correct.** With `T ∈ {1,…,40}` and `T = 40` for words with no earlier
hit, `S_d = P(T > d)` and `E[T] = Σ_{d≥0} P(T>d) = Σ_{d=0}^{39} S_d`. The
identity depends on the stated censoring convention; if `T` were `41` or `∞`
for SAT words it would fail. **The convention is load-bearing and must stay.**

### 1.3 Computational provenance — §13 verified exactly

Every headline number reproduces from the frozen run artifacts:

| quantity | manuscript | measured | verdict |
|---|---:|---:|---|
| RX trials / E represented | 75,111 / 36 | 75,111 / 36 | ✅ |
| RX AF-positive / E with AF+ | 137 / 17 | 137 / 17 | ✅ |
| RX AFE / joint / P40 | 0 / 0 / 0 | 0 / 0 / 0 | ✅ |
| RX unresolved | zero | 0 | ✅ |
| H trials / E | 31,775 / 9 | 31,775 / 9 | ✅ |
| H AF+ / AFE / joint / P40 | 263 / 86 / 44 / 34 | 263 / 86 / 44 / 34 | ✅ |
| RX-5000-EQ | 10 E, 50,000, 63 → 0 | identical | ✅ |
| H-5000-EQ | 4 E, 20,000, 78 → 36 → 24 | identical | ✅ |
| RX-1000-EQ | 21 E, 21,000, 45 → 0 | identical | ✅ |
| H-1000-EQ | 8 E, 8,000, 40 → 19 → 0 | identical | ✅ |
| `\|W_h\|` | 46,305,405,961,214,400 | identical | ✅ |

No unresolved cases are hidden in any denominator; quota definitions match the
preregistration; the old single-E R result is **not** reused anywhere; the
finite-population language in §13.2 is correct and no probability reading
appears.

### 1.4 Other spot checks that passed

- §3: all six length-40 profiles reproduce from `M_{g_3} + 10·1ᵀ`, `L' = 40`.
- §5: cover ceilings `60 / 100 / 340` and individual no-C ceilings `100 / 260 / 340`.
- §9: `361 / 419 / 380`, constant across all 69 frozen E (my Report 13).
- §14: the depth-37 `(0,3,0)` corridor does have cylinder mass 1.

---

## 2. Defects found

### D1 — SOURCE MISMATCH: the "263/263 two-solver agreement" validates the wrong predicate ⚠ **major**

§13 states, immediately after the AFE-focused tables:

> "The bucket-gate DFS and the independently written stage DFS agree on all
> 263/263 quota-matched canonical H pairs."

`SANDBOX_REPORT_12` line 86 states the agreement is
**`sat ⇔ AF_AND_AFE_EXISTS`** — the *joint* predicate, whose count is **44**.
Report 12's entire analysis is on the joint predicate (its extinction table
reads "H (219 UNSAT of 263)", and `263 − 219 = 44`).

Since §13.1 now elevates **`AFE_EXISTS`** (86) to the headline, a reader will
naturally take the cross-check to validate the 86. **It does not.** The headline
AFE number currently has **no stated independent-solver validation**.

The 86 is not in doubt — I verified it from the run artifacts — but the
*validation claim attached to it* is misattributed.

### D2 — the quotient-DAG compression claim is false for the actual L=40 system ⚠ **major**

§12.2 closes with:

> "This theorem permits exact first-hit geometry without requiring explicit
> enumeration of every prefix."

I computed the frontier `A_d` for the real AFE constraint system
(`work/v032a_impl_semantics.js`):

```
|A_d| by depth: 0,1,2,...,37,38,28,0
max |A_d| = 38
|A_d| = d for 38 of the 40 depths
```

Attribution: **the 342 ternary constraints alone** (the E-independent "F is
abelian-square-free" family) already force `|A_d| = d` for 38 of 40 depths;
binary alone gives 37.

`A_d = {1,…,d}` means the frontier state carries `X_1,…,X_d`, and consecutive
differences of those are unit vectors — so **the state determines the prefix
word exactly**. Every frontier state has multiplicity **1**, and the quotient
DAG is isomorphic to the full legal prefix trie. There is **no compression at
all** for the object the paper is actually about.

The theorem remains true and my clean-room run confirms it. What fails is the
stated *benefit*. §18 ("makes its exact mass, survival curve, and concentration
computable without identifying those quantities with DFS behavior") and
Appendix B item 9 inherit the same overstatement.

This is recoverable and arguably interesting: it says the AFE system is
*maximally history-dependent*, which is itself a finding worth stating.

### D3 — numbering collision ⚠ **must fix**

`### Theorem 12.4 — weighted frontier-DAG identity` (line 902) and
`### Proposition 12.4 — translation-invariant pure-square mass` (line 1030)
carry the **same number**, and `Corollary 12.5` follows the latter. Any
cross-reference to "12.4" is ambiguous.

### D4 — §8's written proof does not prove what §17.1 claims ⚠ **promotion gate**

§17.1 lists under **"Proved from definitions"**:

> "exact 34→19 support-family quotient and the 19 closed cardinalities;
> pairwise distinctness of the 19 support families for L≥5"

The §8 proof establishes the six domains and the 34 patterns rigorously. But:

- the 34→19 collapse is asserted — *"Exact equality of these complete sets
  produces the 19 classes listed in Table 1"* — with the residue waved through
  as *"the remaining pattern equalities follow from outer symmetry and
  zero-depth reduction"*;
- **not one of the nineteen closed cardinalities in Table 1 is derived
  anywhere in the manuscript**;
- distinctness is argued as *"follows from their coefficient-shape spectra
  together with their exact cardinalities"* without exhibiting the spectra.

All three are **true** — I verified every one computationally. But a document
that labels them *proved from definitions* while containing no derivation will
not survive refereeing. Either supply the derivations or relabel these rows.

### D5 — §10's affine form omits the degenerate class

§10: *"Each AFE Abelian-square window becomes an affine prefix condition of the
form `Σ αᵢXᵢ ∈ T`."* Measured on a real `(A,E)`: of 3,081 windows, **703 are
arity-0** (no F cutpoint at all) and are pure `(A,E)` conditions — the solver's
`dead` flag, which makes the instance immediately unsatisfiable. Formally these
are the empty sum with `T = {0}`, and §6 does declare the zero signature
legitimate, but §10 does not, and §10 is where the model is set up.

### D6 — Lemma 11.1's illustrating constraint is not an AFE constraint

The example uses `X_1 − 2X_2 + X_3 = 0`, i.e. half-period **1**. AFE constraints
have `K ≥ 2`, so no such constraint exists in the system. The lemma is true and
the arithmetic is correct, but a referee will object that the witness is outside
the model. A `K ≥ 2` example should replace it.

### D7 — §8.1 "at L=4 the count has reached 19"

True as a count, misleading as a statement: at `L = 4`, `Z_s = ∅`, so the
`Z_s`-A family is the *empty set of signatures*, a different object from the
`L ≥ 5` family. The 19 classes at `L = 4` are **not** the 19 of Table 1. (This
is exactly the distinction my own first implementation got wrong — see §1.1.)

### D8 — "Gate T" is undefined

The term appears **exactly once**, at the end of the §15 architecture chain, and
is never defined anywhere in the manuscript.

### D9 — the ADEF stage has no cover

The architecture in §5 and §15 both include `ADEF_complete`, but the §5 cover
table supplies covers only for `{A,F}`, `{A,E,F}` and `Γ∖{C}`. The stage is
promised without the finite object that makes it complete.

### D10 — §2's Carpi attribution is imprecise

*"Carpi's necessary rank condition for the relevant preservation problem forces
a commutatively bijective incidence structure, which is impossible for six
image-Parikh vectors in `Z³`."* This is load-bearing — it justifies working in
the restricted macro language — and is attributed with no proposition number or
precise statement.

### D11 — window counts versus effective constraint counts

The 1,238 unary windows collapse to **443** distinct `(depth, target)` pairs in
the compiled solver, and 652 unary windows are dropped as unreachable (soundly:
their target is not a legal prefix state). The manuscript never distinguishes
window counts from effective constraint counts; if `703/1238/798/342` are quoted
anywhere downstream, the distinction matters.

---

## 3. Implementation-semantics gate (Task 3) — **PASSES**

Traced path: `stage_bcd.stageDFS(A,E,'AFE',cap)` → `afe_csp.compile(A,E)` → DFS
checking, at each new depth `d+1`: `selfClean` (ternary), `cc.unary.get(d+1)`,
`byMax.get(d+1)` (binary).

| class | count | affine form | notes |
|---|---:|---|---|
| ternary | 342 | `X_{i} − 2X_{j} + X_{k} ∈ {0}` | macro contribution verified **exactly zero**; no A/E terms |
| unary | 1,238 windows → 443 pairs | `X_d ∈ T_d` | 652 dropped as unreachable — sound |
| binary | 798 | `c_i X_i + c_j X_j ∈ {−C}` | |
| arity-0 | 703 | empty sum, `T = {0}` | the `dead` flag (see D5) |

Every live constraint **is** representable as `Σ αᵢXᵢ ∈ T`. Each is evaluated
exactly at its closing depth, which is precisely §10's "closed at the largest
prefix depth appearing in its support". The AFE path does **not** apply the AF
`endClean` check (that is gated on `mode !== 'AFE'`), so AF and AFE are cleanly
separated. **No mismatch found; the promotion gate passes**, subject to D5's
wording fix.

---

## 4. Editorial assessment (Task 5)

The candidate spine **does** hold together as one paper-sized story, and the
manuscript follows it.

**Essential:** §§1–3 (setup), §5 (subset gates), §§6–8 (carry geometry + 19
families — the centrepiece), §9 (E→A), §§10–12.4 (AFE reachability), §13
(experiment), §§16–17 (positioning and status).

**Move to appendix:** §12.5 (pure-square mass), §12.6 (union bound), §8.2
(mechanical corollary), §4.2 (long-period gate, currently a stub). Appendix C
already sits correctly in the appendix.

**Compress or remove:** §15 largely restates §5's staged diagram and adds the
undefined "Gate T" (D8); §14's first paragraph duplicates §13.2. One of the two
architecture diagrams should go.

**Not lost from v0.30 that matters:** the demotion of the 38,118-F exclusion
ledger is deliberate and §17.2 retains a pointer to the archived certificates —
acceptable. I found nothing scientifically necessary that was dropped.

---

## 5. Novelty boundary (Task 6)

`NOVELTY_UNRESOLVED` is retained and is correct. Two additions:

1. **The cutset/frontier formalism of §§10–12 is generic.** First-hit antichain
   = prefix-free cut; frontier sufficiency = a Myhill–Nerode-style congruence;
   the weighted DAG = a standard layered counting DP. §16 disclaims
   "finite-state paths with Parikh counters", which covers this only obliquely.
   It should be disclaimed explicitly, with only the *application* claimed.
2. **The finite subset-gate theorem (§5) is elementary infrastructure**, not a
   headline theorem — its proof is five lines. Framing it as a numbered theorem
   alongside Theorem 8.1 overstates it; "Lemma" or "Observation" is more honest.

Whether the six-domain / 19-family quotient exists in prior art under other
terminology is **still unresolved**; nothing in this audit changes that, and I
did not run new literature searches (WebSearch summaries have been wrong twice
in this project, and no primary PDF for these claims is open in the sandbox).

---

## 6. Reference audit (Task 7)

I did **not** invent or "correct" any bibliographic data. Every entry below
needs checking against the primary source before submission.

| entry | status |
|---|---|
| Carpi, IJAC 3 (1993), 151–168 | consistent with the project's own audits; **verify** |
| Currie & Rampersad, JCTA 119 (2012), 942–948 | plausible; **unverified** |
| Eyidoğan–Göral–Tanısalı, *Math. Comp.* (2026), DOI 10.1090/mcom/4246 | **flagged** — the project's deep-research report cites arXiv:2605.20504; journal, volume and DOI unconfirmed here |
| Fici & Puzynina, *Comp. Sci. Review* 47 (2023), 100532 | plausible; **unverified** |
| Keränen, ICALP (1992) | **incomplete** — no volume/pages (commonly LNCS 623, 41–52) |
| Keränen, *The Mathematica Journal* 11 (2010) | **flagged** — project audits refer to Keränen 2002/2003 and 2009; title/volume/year unconfirmed |
| Rao & Rosenfeld, SIDMA 32 (2018), 2381–2397 | plausible; **unverified** |

---

## 7. Verdict

> ## **A. READY FOR v0.33 REPAIR PASS**

Every claim I could check independently is correct: Theorem 8.1 and all nineteen
Table-1 cardinalities reproduce exactly, the Phase-II identities A–F survive
clean-room verification with genuine UNSAT coverage, the implementation matches
the abstract model, and every §13 headline number matches its run artifact to
the digit. **No mathematical error was found.**

This is **A** rather than **C** only because the defects are provenance,
wording and presentation rather than broken mathematics. Two qualifications:

- If the v0.33 pass cannot supply derivations for the 34→19 collapse and the
  nineteen cardinalities (**D4**), the correct label for those rows is
  **COMPUTATIONALLY VERIFIED**, not *proved from definitions*, and that
  relabelling is **mandatory**, not optional.
- **D2** must be repaired, not softened. The compression benefit is not merely
  overstated; it is absent for the actual L=40 system.

### Prioritized repair list

**Blocking (must precede any promotion)**

1. **D1** — restate the 263/263 cross-check as validating `AF_AND_AFE_EXISTS`,
   or run the cross-check on `AFE_EXISTS` and report that instead. As written it
   attaches a validation to the headline number that does not cover it.
2. **D2** — replace §12.2's compression sentence. Report `max |A_d| = 38` and
   multiplicity 1, and state the positive finding: the AFE system is maximally
   history-dependent, so the quotient coincides with the prefix trie here.
   Propagate to §18 and Appendix B item 9.
3. **D4** — supply the derivations, or relabel §17.1 and Appendix A rows.

**High**

4. **D3** — renumber the duplicate 12.4.
5. **D5** — state the arity-0 degenerate class in §10.
6. **D8/D9** — define "Gate T" or delete it; supply the ADEF cover or drop that
   stage from both architecture diagrams.
7. **D10** — give Carpi's condition a precise citation.

**Medium**

8. **D6** — replace the `K = 1` example in Lemma 11.1.
9. **D7** — correct the `L = 4` wording.
10. **D11** — distinguish window counts from effective constraint counts.
11. §16 — explicitly disclaim the cutset/frontier formalism as generic; demote
    §5's theorem to a lemma.

**Editorial**

12. Move §§12.5–12.6, §8.2, §4.2 to an appendix; merge §15 into §5; trim §14's
    duplicated framing.
13. Complete or flag every reference (§6 above).

---

## 8. Artifacts produced

| file | role |
|---|---|
| `work/v032a_sixdomain_check.js` | independent Theorem 8.1 + Table 1 verification |
| `work/v032a_phase2_cleanroom.js` | clean-room Phase-II claims A–F, with forced UNSAT coverage |
| `work/v032a_impl_semantics.js` | constraint-class trace and frontier-size measurement |
| `runs/v032a_sixdomain_check.json` | family counts and cardinalities by L |
| `runs/v032a_phase2_cleanroom.json` | 360-system audit result |
| `runs/v032a_impl_semantics.json` | class counts and `\|A_d\|` profile |
| `PAPER4_v032A_CLAIM_AUDIT_MATRIX_2026-08-29.csv` | 64-row claim classification |
| `PAPER4_v032A_REQUIRED_PATCHES_2026-08-29.md` | exact patch text |

No manuscript was modified. No supplied package was modified. Git untouched.
