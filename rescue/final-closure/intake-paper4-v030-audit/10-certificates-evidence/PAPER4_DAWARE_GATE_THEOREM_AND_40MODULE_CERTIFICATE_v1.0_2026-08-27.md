# Paper 4 — D-Aware Gate Theorem and 40-Module Certificate

**Version 1.0 — 2026-08-27**  
**Status:** theorem `PROVED`; current 40-module instance `EXACT-CHECKED + INDEPENDENT REPLAY`.

## 1. Motivation

The earlier pipeline treated D and the B/C join mostly separately:

\[
AF\to AFD\to ABCF\to\text{full-D}.
\]

Exact search data show that D is usually the strongest obstruction.

The gate order can be reorganized without changing soundness.

## 2. Exact AFD-D set

For an exact AF module \((A,F)\), define

\[
\mathcal D(A,F)
\]

to be the set of every role-correct D satisfying the actual \(h_6\) contexts
over \(\{a,d,f\}\):

\[
AD,\quad DF,\quad ADF,\quad DFA,\quad FAD.
\]

If
\[
\mathcal D(A,F)=\varnothing,
\]
the AF module is impossible.

This is the complete AFD gate, not merely a first witness.

## 3. ABDF gate

For \(D\in\mathcal D(A,F)\), a role-correct B in a complete coding must satisfy

\[
FB
\]

and the actual \(h_6\) trigrams

\[
BDF,\quad DFB,\quad FBD.
\]

These three trigrams also contain the required \(BD\) and \(DF\) bigrams as
subfactors.

Define
\[
\mathcal{BD}(A,F)
\]
as all pairs \((B,D)\) satisfying these conditions.

### Lemma

If
\[
\mathcal{BD}(A,F)=\varnothing,
\]
then no complete six-role coding can extend \((A,F)\).

### Proof

Assume a complete coding H exists with the fixed A and F.  Set

\[
B=H(b),\qquad D=H(d).
\]

Because \(ad,df,adf,dfa,fad\) are actual factors of the macro language,
\(D\in\mathcal D(A,F)\).

Likewise \(fb,bdf,dfb,fbd\) are actual factors.  Therefore the true B and D
form a pair in \(\mathcal{BD}(A,F)\), contradicting emptiness. \(\square\)

## 4. ABCDF C gate

For an ABDF pair \((A,B,D,F)\), C must satisfy the actual bigram contexts

\[
AC,\quad BC,\quad CB,\quad DC
\]

and the actual trigrams

\[
CBC,\quad BDC,\quad CBD,\quad DCB.
\]

If no role-correct C satisfies these contexts, the ABDF core cannot extend to
ABCDF.

No absent macro context is used.

## 5. Gate trace

Every pruning word in the D-aware pipeline occurs in the exact
\(h_6^\omega(a)\) language:

### AF
\[
af,\ fa,\ faf.
\]

### AFD
\[
ad,\ df,\ adf,\ dfa,\ fad.
\]

### ABDF
\[
fb,\ bdf,\ dfb,\ fbd.
\]

### C extension
\[
ac,\ bc,\ cb,\ dc,\ cbc,\ bdc,\ cbd,\ dcb.
\]

Hence the reordered pipeline uses only necessary factor-language constraints.

## 6. Complete 40-module experiment

The publication-safe component ledger currently contains exactly

\[
40
\]

sound AFD modules for which the underlying AF pairs are available in the
runtime:

- 30 from corrected historical C1/C2;
- 5 from Corrected Attack 1;
- 5 from the 2138-state Corrected Attack 2 component.

For all 40 AF pairs, every AFD-compatible D was exhaustively enumerated.

Result:

\[
\boxed{407\text{ AFD-compatible D words}}.
\]

Per-module D-pool sizes range from

\[
1\text{ to }29.
\]

A second independently written D enumerator, using reverse symbol traversal,
produced exactly the same 407 records.

## 7. ABDF result

Across the 40 modules, exact `FB` enumeration produced

\[
\boxed{1,120,209}
\]

module-counted FB-compatible B words.

Testing every B against every complete AFD-D pool under

\[
BDF,\quad DFB,\quad FBD
\]

left only

\[
\boxed{2\text{ exact }(B,D)\text{ pairs}}.
\]

They occur in modules 22 and 30.

A second implementation reversed the search:

\[
D\to B
\]

and traversed

\[
165,931,663
\]

B-DFS nodes.  It found exactly the same two pairs and no others.

Thus

\[
\boxed{
40\ AFD\text{ modules}
\to407\ D
\to2\ ABDF\text{ pairs}.
}
\]

## 8. C result

The two ABDF pairs were independently tested for C under

\[
AC,\ BC,\ CB,\ DC,\ CBC,\ BDC,\ CBD,\ DCB.
\]

They die after:

\[
1103
\]

and

\[
834
\]

C-search nodes, respectively, with no complete C word.

An independently written Python replay reproduces the same node counts and
zero-completion result.

Therefore

\[
\boxed{
40\ AFD
\to2\ ABDF
\to0\ ABCDF.
}
\]

## 9. Algorithmic consequence

The preferred exact finite search order is now

\[
\boxed{
AF
\to
\text{all AFD-D}
\to
ABDF
\to
ABCDF
\to
E.
}
\]

This is strictly better adapted to the observed obstruction structure than
performing the expensive C join before checking common B/D compatibility.

This is an algorithmic conclusion from the current finite data, not a theorem
that ABDF is always the strongest gate.

## 10. Epistemic status

- gate soundness: `PROVED`;
- 407-D enumeration: `EXACT-CHECKED + INDEPENDENT REPLAY`;
- two ABDF pairs: `EXACT-CHECKED + INDEPENDENT REPLAY`;
- zero C extensions: `EXACT-CHECKED + INDEPENDENT PYTHON REPLAY`;
- global length-40 problem: `OPEN`;
- novelty of the gate ordering: `NOVELTY_UNRESOLVED`.
