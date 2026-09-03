# Record-hunt transfer plan

The five things below are routinely conflated. They are not the same statement,
they need different theorems, and only two of them are currently justified.

---

## The five levels

| # | level | what it asserts | status |
|---|---|---|---|
| 1 | **window-safe elision** | this one declared window cannot become an Abelian square for any ordering of profile `ρ` | **JUSTIFIED** — Paper 4 Cor. 7.1, exact and one-way |
| 2 | **profile-branch rejection** | no assignment of profiles of this shape can work | **NOT justified** — needs a theorem quantifying over all orderings *and* all windows simultaneously |
| 3 | **block-role construction pruning** | this partial block assignment cannot be completed | **PARTLY** — justified only for the declared window set (Theorem A), never beyond it |
| 4 | **search-tree pruning** | this branch of the record search can be cut | **NOT justified** — see §2 |
| 5 | **global Abelian-square certification** | the resulting infinite word avoids Abelian squares | **NOT justified** — long periods untouched |

Level 1 is exact and cheap. Level 3 is exact but only relative to `𝒲`. Levels 2,
4 and 5 are where the transfer would actually pay, and none of them follows from
what is proved.

## 2. The theorem required before any branch may be pruned

A record search cuts a branch when *no completion* of the current partial
assignment can succeed. Elision gives the opposite polarity: it says a
*particular window* is harmless. Harmless windows do not cut branches — they
shrink the constraint set.

To prune, one needs:

> **Required theorem (not proved).** Let `𝒲_complete` be the set of *all* windows
> relevant to the target property. If the joint CSP of Theorem A over
> `𝒲_complete` is infeasible, the branch may be cut.

Theorem A already gives this **provided `𝒲` is complete**. So the real
requirement is a *completeness* theorem:

> **Completeness gap.** Exhibit a finite `𝒲` such that satisfying `𝒲` implies
> the property for *all* half-periods, including `K ≥ 2L`.

Paper 4 supplies this only for squares whose minimal macro support lies inside
an assigned subset (its complete subset gates). Outside that, no finite `𝒲` is
known. **Until the completeness gap is closed, elision may reduce work but must
never be allowed to cut a branch** — doing so would be unsound, and would look
like a speedup while silently discarding solutions.

This is the single most important line in this document.

## 3. What elision *can* soundly do today

- **Shrink the constraint set fed to a solver.** Sound, because removing a
  constraint that no ordering can violate does not change the solution set. This
  is the only safe use.
- **Order the search.** Windows that survive elision are the binding ones;
  scheduling them first is a heuristic with no soundness risk.
- **Reject a profile assignment when a window is elided in the *opposite*
  direction** — i.e. when the bulk target is *forced* into the reachable set for
  every ordering. That would be a genuine level-2 result, but it needs a
  *lower*-bound statement about `R_σ(ρ)` which we do not have; the current box
  bound is an upper bound only.

## 4. Where the payoff would actually be

Not in bounded-`K` record hunting. The measured crossover is at block gap
`g ≈ 16–32`, i.e. `K ≈ 640–1280` at `L = 40`; a record hunt working at
`K ≤ 100` sees **no elision at all** at that block length. The filter is
inactive precisely in the regime record hunts occupy.

The payoff, if any, is at the **long-period end**, which is where Paper 4 is
explicitly incomplete. There the measured density gives

```
Θ(G) windows up to gap G   →   Θ(√G) survivors.
```

That is a real asymptotic thinning of exactly the set Paper 4 cannot currently
certify. It is not finiteness, so it does not by itself close the gap — but it is
the only place in this architecture where the mathematics is pushing against a
genuine open problem rather than optimizing a solved one.

## 5. Sequencing

1. Run **E0** of the experiment plan. Until the disputed observation is
   re-measured with `L` and `g` reported separately, no transfer claim should be
   made at all.
2. Run **E1**. If the exact reachable set adds nothing over the free box bound,
   the transfer story reduces to a one-line filter and should be scoped as such.
3. Attack the **completeness gap** (§2). This is the gate for levels 2, 4 and 5.
4. Only then consider integrating anything into a record search, and only as a
   constraint-set reduction with the solution set verified identical against an
   unfiltered baseline.

## 6. Hard prohibitions

- Do not describe elision as pruning. It is not.
- Do not report a speedup without the identical-solution-set check.
- Do not let a `0` false-safe count over a finite test range be read as
  soundness; soundness comes from Corollary 7.1, and the count is only a
  falsification layer.
- Do not claim any of this bears on long-period certification until the
  completeness gap is closed.
