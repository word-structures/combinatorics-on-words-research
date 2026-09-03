# Paper 4 — master closure report

**Date:** 2026-08-29 · sandbox only · no canonical edit, no `MATH_CLAIMS` edit,
no Git mutation, no promotion. Mäkelä **OPEN**. `NOVELTY_UNRESOLVED`.

---

## 0. Baseline and hash gate

| artifact | sha256 | status |
|---|---|---|
| `PAPER4_v0.33_CANONICAL_PROMOTION_CANDIDATE_2026-08-29.zip` | `886a3bde12685ffa1a4fbc219c43d36caad3f10665a0ad61df5cdb8e0e477c4e` | — |
| `PAPER4_MANUSCRIPT_v0.33_CANONICAL_PROMOTION_CANDIDATE_2026-08-29.md` | `bf06dea9c8f10f7c4afb6da0cb69aa949e9d51f5c7dafa229dbdb04aa4a0e82d` | **MATCHES the expected hash** |
| `PAPER4_v0.33_FINAL_PROMOTION_NOTE_2026-08-29.md` | `ad76f802f35c759a25ebbe333b20b78a409b60fb96c6b1efd7156ce0e409c681` | — |

Diffed against the version I refereed: the candidate applies my P1–P3 patches
verbatim (AFE cross-check wording, conservative removal of the orphaned Keränen
bullet, appendix version labels) plus a new Appendix E. **No unreviewed
mathematical change was introduced.**

## 1. The main deliverable — the proof gap is closed

`PAPER4_SIX_DOMAIN_19_FAMILY_FULL_PROOF_2026-08-29.md` supplies what the
manuscript's own §17.2 admits is missing. New in this session, none of it
previously written down:

- **Lemma 4.1 (boundary lemma), now proved.** `P ∖ P_t = {(L−2, L−1, 0)}` and
  `M ∖ M_t = {(L−1, 0, 1)}` — *exactly one point each* — by elimination on
  `v − u ∈ {…, −1, 0, 1}`. The manuscript asserted this; it is now derived.
- **Lemmas 6.1–6.2, the real content of "zero-depth reduction."** Removing `p⁺`
  changes the family for the mask `χ = 110` and for **no other** `P_t` mask.
  The reason is explicit: under `χ = 111` the *same* reduced form
  `x_{L−2} − 2x_{L−1}` is produced by `(0, L−1, L−2) ∈ P_t`, whose `i₀ = 0`
  drops instead. The mirror witness on the `M` side is `(1, 0, L−1)`. The
  manuscript's "follows by symmetry" is replaced by named witness points.
- **All nineteen cardinalities derived**, each from integer inequalities, with
  the even/odd split done explicitly. Two examples of real content:
  `P-O = L−1` rather than `L` because `w = 2v − L − u ≤ L−2` in `P`; and
  `Z-A` counts unordered same-parity pairs because in `Z` any coincidence among
  `u, v, w` forces all three equal.
- **Theorem 6.3** counts the collapse arithmetically: `34 − 5 − 6 − 3 − 3 + 2 = 19`.
- **Hypothesis audit** (Phase 4): `|Σ| = 3` and the fixed block profile are
  **NOT NEEDED** — profiles enter only the targets. Constant `L`, one unresolved
  role, and three cutpoints are **ESSENTIAL**.

Checks (falsification layers, not proof steps): boundary lemma `L = 4..120`,
0 failures; all nineteen cardinalities `L = 5..200`, 0 failures; distinctness
`L = 5..60`, 0 unseparated pairs; 34 patterns at every `L` tested.

**One honest residue.** Pairwise distinctness is proved for all `L` only in its
*cardinality* half. The shape-spectrum half is verified for `L = 5..60`. 252
pairs per `L` are separated by cardinality alone and 643 by shape alone, so
**both invariants are genuinely required** — and the shape half is not yet a
theorem. The manuscript must say so.

## 2. Novelty (Phase 1) — the blocker

Full detail in `SANDBOX_REPORT_PAPER4_PRIMARY_LITERATURE_NOVELTY_AUDIT_2026-08-29.md`
and `PAPER4_NOVELTY_KILL_MATRIX_2026-08-29.csv`.

**Cleared by direct fetch:** Eyidoğan–Göral–Tanısalı 2026 (no carries, no
cutpoint case-split, no support catalogue — the collision was terminological)
and Currie–Rampersad 2012 (a decision procedure, explicitly not an enumeration
of coefficient pattern classes).

**Not cleared:** Carpi 1993 is paywalled and the 2026 restatement's PDF failed
to extract on exactly the relevant section. The sharp open question is whether
Paper 4's carry curvature `δ = c₁ − c₀ ∈ {−1,0,+1}` is Carpi's condition-(C3)
parameter `δ_j ∈ {0,1}` under another normalisation.

Even in the worst case this would narrow §7, **not** the `34 → 19` quotient,
for which no equivalent was found in any formulation. But it is unresolved, and
`NOVELTY_UNRESOLVED` therefore stands. **Reading Carpi 1993 pp. 151–168 is the
single highest-value next action for this paper — a library task, not research.**

## 3. Computational evidence (Phase 8) — reconfirmed

All nineteen headline numbers re-checked against run artifacts this session:
RX `75,111 / 137 / 0 / 17 / 0 unresolved`; H `31,775 / 263 / 86 / 44 / 34`; all
four strata (`45→0`, `40→19`, `63→0`, `78→36→24`); and the AFE cross-check
`263/263, 86 positive, 0 unresolved, 0 witness failures`. **19 of 19 OK.**

No probability, p-value, frequency or confidence language appears anywhere, and
none should.

## 4. Phase 9 — does the H/RX experiment belong?

**Decision: B, secondary demonstration — and it must be re-framed as a
capability demonstration, not a discovery.**

Reasons. The structural theorem stands entirely without it. The separation's
*mechanism* is unexplained, and four candidate mechanisms have been eliminated
(support skeleton, long-band projection, midpoint family, target-collision
count), so the paper cannot say why it happens. What the experiment does earn is
a demonstration that the compiler runs exactly at realistic scale and that its
verdicts survive two independent solvers plus literal-word validation. That is a
legitimate and useful secondary contribution.

Against removal (option D): deleting it would leave the compiler untested on
anything real. Against centrality (option A): a referee would ask what the
separation *means*, and the honest answer is currently "unknown."

## 5. Phase 19 — referee simulation

### Referee 1 — combinatorics-on-words specialist → **MAJOR REVISION**

*Strongest reason:* "The novelty case rests on a negative literature search in
which the single most relevant source, Carpi 1993, was not read. Condition (C3)
of that paper reportedly carries an integer parameter in `{0,1}` playing the
role of your `δ`. Until that is checked directly I cannot evaluate the
contribution." Secondary: Theorem 5.1 is a five-line observation presented with
the weight of a theorem; demote it.

### Referee 2 — pure combinatorics proof specialist → **MINOR REVISION**

*Strongest reason (against the version I was given, v0.33):* "The paper asserts
nineteen cardinalities and a `34 → 19` collapse without deriving any of them,
and says 'the remaining cases follow by symmetry' without defining the
symmetry." **This criticism is answered** by the full proof document: the
symmetry is defined (outer swap `i₀ ↔ i₂` with `χ₀ ↔ χ₂`, under which `Z`, `P`,
`M` are set-invariant), the truncation transfer is proved with explicit witness
points, and every cardinality is derived. *Residual:* the shape-spectrum half of
distinctness is still finite-range verification, and the paper must not call it
proved.

### Referee 3 — computer-assisted mathematics specialist → **MINOR REVISION**

*Strongest reason:* "Reproducibility is asserted but no runnable package is
supplied: no input hashes, commands, expected outputs, runtimes, or independent
checker are given for the enumerations, the `E→A` counts, the AFE compilation
counts, or the `263/263` cross-check." Secondary, and to the paper's credit: the
denominators and selection chronology are exemplary — preregistrations hashed
before execution, a voided run retained and documented rather than deleted, and
caps never read as UNSAT.

### Repairs applied in this pass

Referee 2's principal objection is now closed by the proof document. Referee 1's
and Referee 3's are **not** closed and are carried into the blocker list.

## 6. Phase 20 — contribution test

1. **What is new?** The exact classification of the reduced support skeleton of
   an Abelian-square constraint system under a partial uniform block assignment:
   six carry domains, 34 realizable role/domain patterns, 19 complete support
   families for `L ≥ 5` with closed cardinalities — plus the separation of
   support geometry from affine targets as a compiler.
2. **What was already known?** The `(+1,−2,+1)` prefix-Parikh algebra (Carpi),
   template/parent boundary corrections (Currie–Rampersad), the `h₆`/`g₃`
   ancestry (Rao–Rosenfeld), sieving (Eyidoğan et al.), mechanical-word carries,
   and all first-hit/frontier/counting-DAG machinery. All are disclaimed.
3. **What is technically difficult?** The truncation transfer — establishing
   that removing one lattice point changes exactly one of four masks, and
   identifying the rescuing witness. Everything else is careful but routine.
4. **What is conceptually surprising?** That the support layer is *finite and
   `L`-independent in cardinality of classes* (always 19) while the instance
   data moves only the targets; and, separately, the measured fact that the
   `L = 40` AFE system is maximally history-dependent (frontier = whole prefix,
   multiplicity 1), which is the opposite of what a compression theorem invites
   you to expect.
5. **What is reusable?** The compiler applies to any constant-length partial
   assignment; `|Σ| = 3` and the fixed profile are not used.
6. **What is merely computational evidence?** The entire §13 H/RX separation.
7. **Why one paper?** Because a single object — the carry geometry of three
   equally spaced cutpoints across uniform blocks — generates the classification,
   the `E→A` decomposition, and the AFE compiler. That is a spine, not a
   collection.

**Assessment: the answers to 1, 3, 5 and 7 are strong; 4 is genuinely
interesting; 2 is honestly handled. Answer 6 is the weak point and is why §13
should be secondary.**

## 7. Phase 21 — quality score

| dimension | score | note |
|---|---:|---|
| mathematical correctness | **9.5** | nothing false found across four audit passes; every checkable claim reproduced independently |
| proof completeness | **8.5** | the 34→19 and cardinality gap is now closed; shape-half of distinctness still finite-range |
| novelty confidence | **4.0** | no equivalent found, but the most relevant source was not read |
| significance | **6.5** | exact and reusable, but a classification result in a niche setting |
| clarity | **7.0** | spine is coherent; §§12–15 still overfull |
| literature positioning | **6.0** | disclaimers are honest and thorough; one key source unread |
| reproducibility | **6.0** | evidence is exemplary internally; no external package spec |
| editorial quality | **7.5** | v0.33 repaired all eleven referee defects |
| computational rigor | **9.5** | preregistration, hashed protocols, three independent routes, voided run retained, caps never read as UNSAT |
| submission readiness | **5.5** | two blockers remain |

**Overall: 6.9 / 10.** Not averaged away: novelty confidence at 4.0 is the
binding constraint, and no amount of polish moves it. This is a paper with
strong, verified mathematics and an unresolved positioning question.

## 8. What I did not do, and why

The program specified 22 phases and ~12 deliverables. I completed Phases 0–4,
8–9, 19–21 and the parts of 1, 16–17 that could be done honestly. I did **not**
produce:

- `PAPER4_REFERENCES_VERIFIED.bib` / `PAPER4_REFERENCE_AUDIT` — I can reach
  arXiv but not paywalled publisher records, so I cannot verify volume/issue/
  page/DOI for Carpi 1993, Keränen ICALP 1992, or Fici–Puzynina. The instruction
  was explicit: do not reconstruct uncertain metadata from memory. Producing a
  `.bib` of unverified entries would be worse than producing none.
- `PAPER4_REPRODUCIBILITY_SPEC` — this is real work (input hashes, commands,
  expected outputs, runtimes per artifact) and is Referee 3's blocker. It is
  deferrable but should not be faked.
- Phases 10–15 (architecture, title, abstract, introduction, figures, notation)
  and `PAPER4_MANUSCRIPT_SUBMISSION_CANDIDATE_v1.0` — rewriting the manuscript
  around a novelty claim that is still unresolved would bake in a framing that
  the Carpi check may force to change. **Sequencing matters here:** read Carpi
  first, then write the paper once.

This is a scoping judgement, stated plainly rather than papered over with thin
files.

## 9. Final verdict

> ## **B. STRONG PAPER — NOVELTY AUDIT STILL BLOCKING**

The mathematics is sound and, as of this session, complete where it matters: the
`34 → 19` quotient, the boundary lemma, the truncation transfer and all nineteen
cardinalities are now derived rather than asserted, and every computational
headline survives independent replay. No mathematical defect was found in four
successive adversarial passes, and no central claim collapsed under attack.

It is **B** and not **A** for one reason: the single most relevant prior source
was not read. It is not **D** — no prior art was found for the classification —
but that is a negative search result, and the honest label for it is
`NOVELTY_UNRESOLVED`, not novelty.

### Blockers, in priority order

1. **Read Carpi 1993, pp. 151–168** and compare condition (C3)'s parameter with
   the carry curvature. This gates the framing of the whole paper.
2. **Write the reproducibility package** (Referee 3's blocker).
3. **Finish the shape-spectrum half of distinctness** symbolically, or state it
   in the paper as finite-range verification.
4. Then, and only then, rewrite architecture/title/abstract/introduction around
   whatever novelty claim survives step 1.

### Artifacts produced

| file | role |
|---|---|
| `PAPER4_SIX_DOMAIN_19_FAMILY_FULL_PROOF_2026-08-29.md` | complete derivation; closes the §17.2 gap |
| `PAPER4_34_PATTERN_TO_19_FAMILY_TABLE_2026-08-29.csv` | 34 rows, class ids, shape spectra |
| `PAPER4_MASTER_CLAIM_LEDGER_2026-08-29.csv` | 46 classified claims |
| `PAPER4_NOVELTY_KILL_MATRIX_2026-08-29.csv` | 14 attacked formulations |
| `SANDBOX_REPORT_PAPER4_PRIMARY_LITERATURE_NOVELTY_AUDIT_2026-08-29.md` | novelty audit with explicit limits |
| `work/sixdomain_full.js` | independent checker for every count above |
| `runs/sixdomain_full.json` | machine-readable results |

All are **SCRATCH** under `_paper4-master-closure-2026-08-29/`. No existing
evidence was overwritten. No root-level files.
