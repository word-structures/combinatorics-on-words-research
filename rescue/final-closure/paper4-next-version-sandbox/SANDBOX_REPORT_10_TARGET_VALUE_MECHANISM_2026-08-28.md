# Sandbox Report 10 — H/R target-value mechanism

**Date:** 2026-08-28
**Status:** sandbox only. No canonical edit. No Git mutation. No promotion.
**Preregistration:** `PREREGISTRATION_TARGET_VALUE_CENSUS_2026-08-28.md`,
sha256 `c06c0d144c5f47de6d09eea628616f4ade0a47b6e400ec9ff24281643e8b13dc`,
**written and hashed before the census ran.**

The deprecated per-signature greedy UNSAT-core extraction was **not** resumed.
Its stale background job (PID 28680, `run_r_cores.js`, ~2.5 h, empty output)
was terminated.

---

## 1. Instrumented solves — one exact DFS per case

`work/target_mechanism.js` → `runs/target_mechanism_probes.json`.
Three cases, all pre-existing Report-7/8 objects. `H_NEGATIVE` and `H_POSITIVE`
**share the same E**, so they are matched on E exactly.

| case | E | A | verdict | death depth | nodes | extinction nodes | distinct killer σ |
|---|---|---|---|---:|---:|---:|---:|
| `R_NEARMISS` | `933c0dee15dd32a3` | `8dfaaf7687802e0f` | UNSAT | **35** | 154,255 | 42,836 | 600 |
| `H_NEGATIVE` | `bbbbf8344484b388` | `3c206f1d7cff6e1d` | UNSAT | **32** | 7,622 | 2,084 | 414 |
| `H_POSITIVE` | `bbbbf8344484b388` | `77b6a08e535d6dd5` | **SAT** | — | 2,868 | 736 | 312 |

### 1.1 Which target buckets become simultaneously incompatible

At an *extinction node* every remaining letter is rejected immediately by some
bucket. Sampled frontier, `R_NEARMISS`, depth 20, prefix `aaabaaacaaabbbaaacaa`:

| letter | killing signature | forbidden value hit | in FAF | in AFE |
|---|---|---|---|---|
| `a` | `1*x3 + -2*x12 + 1*x21` | `(0,0,0)` | yes | yes |
| `b` | `1*x5 + -2*x13 + 1*x21` | `(0,0,0)` | yes | yes |
| `c` | `1*x17 + -2*x19 + 1*x21` | `(0,0,0)` | yes | yes |

Three **different** signatures, all sharing the top depth `x21` — the variable
just assigned — each forbidding the *same* value `(0,0,0)`, and each forbidden
by **both** families at once.

### 1.2 The five requested distinctions

| dimension | finding |
|---|---|
| **support shape** | not discriminating. Killers are ordinary arity-2 and arity-3 signatures; the shape mix differs only in proportion. Report 9 §4 explains why the skeleton itself cannot discriminate: it is fixed by the occurrence mask. |
| **target value** | overwhelmingly `(0,0,0)`. Constraints die by hitting the *zero* forbidden target, i.e. an exactly-vanishing second difference. |
| **target multiplicity** | R's top killers are all **singleton** buckets (1 FAF target, 1 AFE target) of arity 3. H's top killers include **high-multiplicity unary** buckets — `1*x24` with 21 FAF / 19 AFE targets. Qualitatively different death modes. |
| **FAF/AFE collision** | dominant everywhere: `bothSameValue` accounts for **95.4 %** of R's rejections (188,855/197,968), **78.2 %** of H-negative's, **89.0 %** of H-positive's. Consistent with Report 8's finding that FAF-only and AFE-only are individually SAT while the union is UNSAT. |
| **prefix depth of extinction** | R's extinction mass peaks at depth **32** (5,951 nodes) and survives to 35. H-negative peaks at **23** (293) and dies at 32. H-positive's is diffuse and never terminal. |

### 1.3 A qualitative difference worth recording

`R_NEARMISS`'s single largest extinction pattern is **one signature killing every
remaining letter by itself**: `1*x36` alone accounts for 1,774 extinction nodes.
H-negative has no such dominant unary; its top patterns are three-signature
combinations. R dies to a sharp late unary obstruction; H dies to diffuse
mixed combinations. This is descriptive, from one pair per group.

---

## 2. Preregistered census

`work/target_census.js` → `runs/target_census.json`. 437 pairs, **1.5 s**.
A join-key mismatch (`af_positive.jsonl` stores a full sha, `pairs.jsonl` a
16-hex slice) was caught by the fail-closed guard rather than silently
producing wrong rows.

### 2.1 Results

| statistic | H (379 pairs) | R (58 pairs) |
|---|---|---|
| S1 active signatures | 1560 – 1560 | 1560 – 1560 |
| S2 shared signatures | 1160 – 1160 | 1160 – 1160 |
| S3 colliding signatures | 780 – 868, mean **802.9** | 780 – 847, mean **816.7** |
| S4 colliding target values | 1107 – 1234, mean **1157.0** | 1104 – 1235, mean **1191.0** |
| S5 total union targets | 2942 – 3173, mean 3046.9 | 2984 – 3108, mean 3048.9 |
| S6 mean union size | 1.886 – 2.034 | 1.913 – 1.992 |
| S7 singleton buckets | 1121 – 1205, mean 1142.9 | 1123 – 1184 |
| S8 max union size | 28 – 35 | — |
| dead A/E-only | 0 | 0 |

### 2.2 Hypothesis verdicts

**H1 — skeleton invariance: SUPPORTED, exactly.**
`S1 ≡ 1560` and `S2 ≡ 1160` for **all 437 pairs**, 0 violations. Report 8
established this for 10 probed pairs; it now holds at population scale, and it
is exactly what Report 9 §4 predicts structurally.

**H2 — collision discriminator: NOT SUPPORTED.**
The preregistered bar was **disjoint ranges**. Observed:

```
S4:  H [1107, 1234]      R [1104, 1235]      overlap: essentially total
S3:  H [ 780,  868]      R [ 780,  847]      overlap: R contained in H
```

The three-probe signal that motivated H2 (R 1233 vs H 1135/1133) sat **inside
H's own range** (H max 1234). Means do differ (S4: 1191 vs 1157; medians 1190
vs 1154), but per the rule fixed in advance a mean shift with overlapping
ranges is **NOT SUPPORTED**, and no post-hoc threshold is fitted.

**H3 — no separation within H: SUPPORTED.**
H-positive S4 [1131, 1225] mean 1161.2 (n=48) vs H-negative [1107, 1234] mean
1156.4 (n=331). Ranges overlap almost completely.

**H4 — exposure asymmetry: SUPPORTED, exactly.** See §3.

### 2.3 What this eliminates

FAF/AFE **target collision count is not the H/R discriminator**, and does not
separate positive from negative pairs within H either. Together with earlier
work this closes four mechanisms:

| mechanism | status |
|---|---|
| support skeleton / topology | eliminated (Report 8; now population-scale, §2.2 H1) |
| long-band `eafea` projection | eliminated (Report 4: 17.02 % vs 16.27 %) |
| midpoint (FAF-only) family | eliminated (Report 8: irrelevant in all 10 probes) |
| **target-value collision count** | **eliminated here** |

---

## 3. A population-design finding that bounds the 48-vs-0 claim

While fixing the census population I measured `S10 = #{E in the population's
E-pool : A ∈ Aset(E)}` and then checked the population construction directly.

### 3.1 Measurements

| | AF-positive A | E-pool | S10 range | S10 mean | histogram |
|---|---:|---:|---|---:|---|
| H | 202 | 9 | 1 – 4 | **1.876** | 1:94, 2:51, 3:45, 4:12 |
| R | 58 | 60 | 1 – 1 | **1.000** | 1:58 |

Sampling 3,019 A words evenly from each evaluated population (not just the
AF-positive ones):

| | mean S10 | lowest compatible E index |
|---|---:|---|
| H | 1.537 | spread over indices 0,1,2,3,4,5,6,7 |
| R | 1.000 | **index 0 for all 3,019** |

### 3.2 Exact cause

`|Aset(E₀ᴿ)| = 129,911`, and the first entry of `distinctA_R.json` **not** in
`Aset(E₀ᴿ)` is at index **129,911**. The evaluated R population is
`indices 0…72,453`, so it lies **entirely inside a single random E's A-set** —
55.8 % of it.

### 3.3 Consequence — a claim-boundary correction, not a refutation

The numbers 202/72,454, 58/72,454, and 48-vs-0 are exact and unaffected. What
changes is their **scope**:

- H's evaluated population is the **union over all 9 canonical E** (complete).
- R's evaluated population is a **55.8 % prefix of one random E's A-set**. The
  other **59 random E contribute nothing** to it, and all 58 evaluated R pairs
  use that single E.
- So the pair-level comparison is 379 H trials across 9 E against **58 R trials
  across 1 E** — not exposure-matched.

The Report-7 preregistration honestly disclosed the delimitation (“R: indices
0…72,453”, “a deterministic prefix, not a sample”). What was not known is that
this prefix is one E's set. **Therefore “R = 60 random non-canonical E”
describes the pool the population was drawn from, not the coverage that was
evaluated, and should not be used to describe the evidence.** Defensible
phrasing:

> At matched N = 72,454, A-words compatible with at least one of the 9 canonical
> E yield 202 AF-positive and 48 AF∩AFE-positive pairs, while A-words compatible
> with one specific random E (seed 7788, index 0) yield 58 AF-positive and 0.

This is a **priority change and a claim-boundary correction** under the
`RESEARCH STATE CHANGE CHECK`: exposure-matching R is now the highest-value
cheap experiment, and it is not one I am authorized to launch here.

---

## 4. Strict summary

**A. What the instrumented solves showed.** Death is by *simultaneous* FAF and
AFE prohibition of the **same** value — usually `(0,0,0)` — at the depth just
assigned, by several distinct signatures at once. 78–95 % of all rejections are
such collisions. R and H die differently in kind: R by singleton arity-3 buckets
plus one dominant late unary (`1*x36`, 1,774 extinction nodes), H by
high-multiplicity unary buckets in diffuse combinations.

**B. What the census showed.** Skeleton invariance is now exact at population
scale (437/437). The collision-count hypothesis those probes motivated was
preregistered and **refuted** — ranges overlap almost totally. Three probes were
not enough to see this; the preregistration is what prevented reporting a mean
shift as a discriminator.

**C. What is now eliminated.** Four candidate mechanisms (support skeleton,
long-band projection, midpoint family, target-collision count). The
discriminator is **not** in the static target geometry of `(A,E)`.

**D. Where the discriminator must now lie.** Since S1/S2 are constant, S3–S8
overlap, and both families are individually SAT, what remains is the
**interaction between forbidden targets and prefix-path feasibility** — i.e. an
ordering/reachability property of the F-side DFS, not a static count. The
instrumented traces point at *depth-localized* structure (R's extinction mass at
depth 32–35 versus H's at 23) rather than at aggregate counts.

**E. What must NOT be concluded.** Nothing here bears on Mäkelä, on `L = 40`
impossibility, or on novelty. With 58 R pairs from a single E, the null result
in §2.2 is **weak evidence**, exactly as the preregistration said it would be.
The 48-vs-0 separation is **not** refuted — it is re-scoped by §3.

**F. Commissioned item still open.** The minimal UNSAT core (Report 8
Q1/Q2/Q3/Q5) is **not** delivered. The instrumented solve gives the *killer sets
at extinction nodes* — for R, 600 distinct killer signatures and a dominant
single-signature pattern — which is the trace-based substitute Report 8 §13
proposed, but it is **not** a certified minimal core and is not reported as one.

---

## 5. Files produced

| file | role |
|---|---|
| `PREREGISTRATION_TARGET_VALUE_CENSUS_2026-08-28.md` | statistics + hypotheses, hashed before the run |
| `runs/PREREG_CENSUS.sha256` | that hash |
| `work/target_mechanism.js` | instrumented exact DFS |
| `work/target_census.js` | preregistered census |
| `runs/target_mechanism_probes.json` | per-case traces, frontier samples |
| `runs/target_census.json` | full per-pair rows + verdicts |
