# Paper 4 — Positive-H Search Milestone

**Version 1.0 — 2026-08-27**  
**Status:** `ACTIVE POSITIVE SEARCH / NO FINITE-ZERO H YET`

## 1. Audit correction

The first incremental min-conflicts engine reported a false zero.  The
independent one-command certifier immediately rejected that output at the
finite gate.  The bug was traced to swap-index normalization combined with an
un-normalized symbol-sign update.

The corrected engine now performs periodic full recomputation of all 67,782
finite windows and fails closed on any mismatch.

## 2. Current exact search record

Restricting all six roles to internally period-\(2,\ldots,20\)-clean blocks
and using coordinate/pair/triple pool moves reduced the exact finite violation
count to

\[
\boxed{146}.
\]

The current record has zero internal-block violations.

Independent final-certifier result:

```text
profile/kernel PASS
finite gate    FAIL
trigram        ace
start          37
half-period    2
factor         baba
```

Thus the record is a failing search point, not a candidate theorem.

## 3. Bigram pair-CSP experiment

Exact pair-CSP over the 14 actual h6 bigrams:

### 2500 words / role

\[
87\,500\,000\text{ pair checks}
\to10\,898\text{ compatible pairs}
\to\text{arc-consistency EMPTY at C}.
\]

### 3000 words / role

\[
126\,000\,000\text{ pair checks}
\to16\,396\text{ compatible pairs}
\to\text{arc-consistency EMPTY at C}.
\]

These are finite random/structured-pool diagnostics only.

## 4. E obstruction

For the recorded bridge-rich populations:

- 106-state F component:
  \[
  1662\text{ bridge records},\quad554\text{ unique }(A,B,F),\quad0E;
  \]
- F96:
  \[
  325\text{ bridge records},\quad241\text{ unique }(A,B,F),\quad0E.
  \]

Hence E must enter early in positive synthesis.

## 5. Recorded AF population closure

A canonical population of 702 exact \(AF/FA/FAF\) pairs was exhaustively
extended through E, B and D with dual E orientations.

\[
\boxed{702AF\to0ABDEF}.
\]

All initial caps were closed by the complementary orientation and a final
20-pair high-cap replay.

This is a recorded-population closure, not a global nonexistence theorem.

## 6. New direct positive architecture

Current priority:

\[
\boxed{
F\to E\to A\to B\to D\to C\to H.
}
\]

The direct generator enforces E and A/F/E trigrams before paying B/D cost.

A first 300-F discovery sweep outside the current exact F-exclusion union
found no ABDEF scaffold.  Some F seeds were capped, so this is not a theorem.

## 7. Trigger condition

The first complete H produced by any search path is sent immediately to

```text
PAPER4_H40_FINAL_CERTIFIER_v1.0.py
```

and is scientifically interesting only if it passes

\[
p=2,\ldots,40
\]

and then Gate T.

Current status:

\[
\boxed{\text{finite-zero H = OPEN}.}
\]
