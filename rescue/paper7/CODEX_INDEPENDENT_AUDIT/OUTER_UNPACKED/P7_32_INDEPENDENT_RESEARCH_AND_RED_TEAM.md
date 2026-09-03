# P7_32 Independent Research and Manuscript Red-Team

**Date:** 2026-09-03  
**Input reviewed:** `P7_Manuscript_Package.zip` / manuscript v0.1 and release bundle v0.1  
**Purpose:** independent hostile audit of the theorem package, literature positioning, and manuscript.

## Executive verdict

### v0.1 release package

**THEOREM NEEDS REPAIR.**

The explicit left-death witness is correct, and the overall theorem strategy remains viable, but the v0.1 residual-state layer and verifier do **not** justify the claims made in the v0.1 manuscript and README as written.

### corrected proof architecture

A repaired residual semantics and a fresh exact verifier produce a coherent finite reduction with:

- 99 seed-alignment rows;
- **35** unique residual states (not 36);
- **17** recursive residual transitions (not the v0.1 transition system);
- a fixed 190-letter base window;
- exact left-death witnesses for all four letters;
- direct regression checks for `W1` and the boundary-crossing part of `W2`.

The corrected proof establishes the theorem **subject to the classical input from Keränen (1992) that the 85-uniform morphism maps every Abelian-square-free word to an Abelian-square-free word**.

Current recommended internal status:

`THEOREM SURVIVES AFTER PROOF REPAIR`

Novelty status remains:

`NO PRIOR RESOLUTION FOUND — NOVELTY PROVISIONAL`

This is not external peer review.

---

## 1. The theorem under audit

Let \(\mathcal A_4\) be the factorial language of finite Abelian-square-free words over \(\{a,b,c,d\}\), and let

\[
s=\texttt{abacabadc}.
\]

The target result is

\[
s\in re(\mathcal A_4)\setminus le(\mathcal A_4),
\]

hence also

\[
re(\mathcal A_4)\setminus e(\mathcal A_4)\neq\varnothing.
\]

The negative half is elementary. The positive half uses

\[
C=\texttt{abacabadcdb},\qquad F(V)=C\,g_{85}(V),
\]

and the nested tower

\[
W_0=C,\qquad W_{n+1}=F(W_n).
\]

---

## 2. What survives unchanged

### 2.1 The witness is Abelian-square-free

A direct-definition checker finds no Abelian square in

`abacabadc`.

### 2.2 Immediate left death is correct

All four one-letter left extensions contain an Abelian square:

| added letter | Abelian square | half-period |
|---|---|---:|
| `a` | `a | a` | 1 |
| `b` | `ba | ba` | 2 |
| `c` | `caba | caba` | 4 |
| `d` | `dabac | abadc` | 5 |

Therefore \(s\notin le(\mathcal A_4)\).

### 2.3 The tower algebra is correct

Because \(g_{85}\) is a morphism,

\[
W_n=C\,g(C)\,g^2(C)\cdots g^n(C),
\]

so \(W_n\) is a prefix of \(W_{n+1}\).

### 2.4 Classical morphic input is supported

Keränen's 1992 result states more than existence of one fixed point: the 85-uniform morphism itself is Abelian-square-free, i.e. it sends every Abelian-square-free finite word to an Abelian-square-free word. This is exactly the external theorem required to handle factors wholly inside \(g(V)\).

---

## 3. Fatal defects in the v0.1 proof package as written

These defects require a new release version. They should **not** be silently patched inside v0.1.

### R1 — residual-state definition is algebraically inconsistent

**Severity:** FATAL to v0.1 proof exposition  
**Type:** CORRECTNESS / DEFINITION

`RESIDUAL_STATE_DEFINITION.md` defines

\[
V=W_U c_{mid}W_{gap}c_{end}X
\]

and then writes

\[
P(W_U)-P(W_Uc_{mid}W_{gap})=q.
\]

The right term contains \(W_U\), so this expression equals

\[
-P(c_{mid}W_{gap}),
\]

which is coordinatewise nonpositive. The v0.1 state table contains positive discrepancy coordinates. Thus the written definition cannot describe the table it claims to define.

**Required action:** replace the state semantics completely.

---

### R2 — the generic closure lemma in manuscript v0.1 is false

**Severity:** FATAL to v0.1 theorem proof  
**Type:** CORRECTNESS

The manuscript states a class essentially of “ASF words avoiding the residual states” and claims

\[
V\in\mathcal C_C\Longrightarrow Cg(V)\in\mathcal C_C.
\]

Without a fixed-prefix condition this is false. For example, \(V=\texttt{b}\) is ASF and vacuously avoids long residual configurations, but \(Cg(b)\) begins across the boundary with a forbidden `bb` occurrence.

**Required action:** the invariant must include the condition that \(V\) begins with \(C\).

---

### R3 — the v0.1 verifier does not verify strict descent

**Severity:** MAJOR  
**Type:** COMPUTATION / REPRODUCIBILITY

The verifier prints `strict descent: PASS`, but the relevant source code contains only the comment that the inequality “trivially holds”; it does not validate a transition-by-transition descent certificate.

**Required action:** replace this claim with an explicitly verified mathematical descent.

---

### R4 — the v0.1 verifier does not verify invariant membership of C

**Severity:** MAJOR  
**Type:** COMPUTATION

The verifier checks that `C` is ASF and that a supplied W1 prefix is ASF. It does **not** test that `C` avoids the residual state universe, despite printing `C invariant membership: PASS`.

**Required action:** verifier must check residual-state absence directly.

---

### R5 — v0.1 36-state / transition semantics do not match the correct word-level recursion

**Severity:** FATAL to v0.1 finite certificate  
**Type:** COMPLETENESS

Re-deriving the residual reduction from an explicit factorization of the source word changes the finite system. The repaired direct semantics produce 35 states and 17 recursive rows. The old 36-state system should not be retained as the proof kernel.

---

### R6 — independence wording is overstated

**Severity:** MODERATE  
**Type:** REPRODUCIBILITY / EXPOSITION

`INDEPENDENCE.md` calls the old verifier “pristine” and “mathematically complete”. Those claims are not supported after R1–R5.

**Required action:** describe independence in terms of actual shared inputs and separately implemented logic.

---

### R7 — v0.1 literature paragraph contains a citation error

**Severity:** MODERATE  
**Type:** CITATION

The maximal-word paragraph attributes the relevant line to “Korn (2003) / Currie (2004)”. The directly relevant sources located are Cummings–Mays (2001), Korn (2003), and Bullock (2004). Currie should not be used as a substitute citation here.

---

### R8 — “definitive answer” is too strong for the current novelty status

**Severity:** MODERATE  
**Type:** NOVELTY / EXPOSITION

Mathematical correctness and prior-art status must remain separate. Until an external citation audit is complete, the introduction should say that the theorem *gives the phenomenon asked for in the located Keränen source*, not that it is definitively the first solution.

---

## 4. Corrected residual semantics

The repaired proof uses a direct word-level state.

For \(q\in\mathbb Z^4\) and \(x,y\in\Sigma_4\), say that \(R(q,x,y)\) occurs in a word \(V\) if

\[
V=A\,x\,B\,y\,D
\]

for some words \(A,B,D\), with the displayed occurrences of \(x\) and \(y\) distinct and in this order, and

\[
P(A)-P(B)=q.
\]

This definition is directly testable from the word and has no prefix-cancellation ambiguity.

Define \(Q\) as the finite state set generated by the exact crossing-square reduction below.

The corrected invariant class is

\[
\mathcal C^*=
\{V:\ C\preceq V,\;V\in\mathcal A_4,\;V\text{ contains no }R(q,x,y)\text{ with }(q,x,y)\in Q\}.
\]

The fixed prefix \(C\preceq V\) is load-bearing.

---

## 5. Exact finite reduction

Use row Parikh vectors. The incidence matrix of \(g_{85}\) is

\[
M=
\begin{pmatrix}
19&21&27&18\\
18&19&21&27\\
27&18&19&21\\
21&27&18&19
\end{pmatrix},
\qquad \det M=43435\neq0.
\]

Thus any integral preimage discrepancy is unique.

### 5.1 Crossing Abelian squares

Consider an Abelian square in

\[
F(V)=C g(V)
\]

which is not wholly contained in \(g(V)\). Its start lies at some position \(i\in\{0,\dots,10\}\) of \(C\).

For half-period \(K<85\), the whole square lies inside the first 179 letters, hence inside the fixed 190-letter base window.

For \(K\ge85\), write the source around the midpoint and end as

\[
V=A\,x\,B\,y\,D.
\]

Let the midpoint occur at offset \(r\) in \(g(x)\), and the square end at offset \(t\) in \(g(y)\). Equality of the two Parikh vectors gives

\[
qM=
P(g(x)[r:])+P(g(y)[:t])
-P(C[i:])-P(g(x)[:r]),
\]

where

\[
q=P(A)-P(B).
\]

Exact enumeration of the finite choices \(i,x,r,y,t\), with exact integer inversion through \(M\), gives:

- 99 valid parameter rows;
- 35 unique states \(R(q,x,y)\).

Allowing the possible final endpoint offset \(t=85\) produces no additional integral row.

Therefore every large crossing square forces one of the 35 residual states in the source word.

### 5.2 Recursive residual closure

Suppose a target state \(R(q,x,y)\in Q\) occurs in \(F(V)\), and the two marked letters lie in distinct image blocks \(g(h)\) and \(g(k)\), at offsets \(r\) and \(t\). Writing

\[
V=A\,h\,B\,k\,D,
\qquad q'=P(A)-P(B),
\]

gives the exact equation

\[
q'M=q-P(C)-P(g(h)[:r])+P(g(h)[r+1:])+P(g(k)[:t]).
\]

Exhaustive exact inversion produces 17 integral parameter rows, and every resulting source state \(R(q',h,k)\) belongs again to \(Q\).

Hence every non-base residual occurrence descends to a residual occurrence in the preimage word.

---

## 6. Correct base bound and descent

For an occurrence

\[
V=A\,x\,B\,y\,D
\]

with marked positions \(j<k\),

\[
\sum q=|A|-|B|=j-(k-j-1)=2j+1-k,
\]

so

\[
k=2j+1-\sum q.
\]

For the 35 states,

\[
\sum q\in\{-1,0,1\}.
\]

If the first marked letter lies in \(C\), then \(j<11\), so \(k\le22\).

If both marked letters lie in the same 85-letter image block, then \(k-j\le84\), which gives \(j\le84\) and \(k\le170\).

Therefore every non-recursive residual case is contained in the first 171 letters. A 190-letter window is a safe fixed base certificate.

For a genuinely recursive occurrence, the first marked position \(j\ge11\) lies in an image block whose preimage position is

\[
a=\left\lfloor\frac{j-11}{85}\right\rfloor.
\]

Thus

\[
a<j,
\]

which is an explicit integer-valued strict descent. No approximate contraction statement is needed.

Because every word in \(\mathcal C^*\) begins with \(C\), the first 190 letters of \(F(V)\) are the same fixed prefix of

\[
W_1=Cg(C).
\]

The corrected verifier checks that this 190-letter word is ASF and contains no state from \(Q\).

---

## 7. Corrected induction

The exact verifier confirms:

1. \(C\) is ASF and avoids all 35 residual states;
2. the fixed 190-letter base window is ASF and residual-free;
3. every large crossing Abelian square induces a state in \(Q\);
4. every recursive occurrence of a state in \(Q\) descends to a state in \(Q\) in the preimage;
5. the descent is strict.

Now let \(V\in\mathcal C^*\).

- Since \(V\) is ASF, the classical Keränen theorem implies \(g(V)\) is ASF.
- A new Abelian square crossing \(C\mid g(V)\) is either a finite base case or induces a residual state in \(V\); both are impossible.
- A residual state in \(F(V)\) is either a finite base case or descends to a residual state in \(V\); both are impossible.
- \(F(V)\) begins with \(C\).

Therefore \(F(V)\in\mathcal C^*\).

Since \(C\in\mathcal C^*\), all \(W_n\) lie in \(\mathcal C^*\subseteq\mathcal A_4\). Their nested limit \(W_\infty\) is Abelian-square-free. Because \(s\) is a prefix of \(C\), \(s\in re(\mathcal A_4)\).

Combined with the elementary left death,

\[
s\in re(\mathcal A_4)\setminus le(\mathcal A_4).
\]

---

## 8. Independent exact verification performed in this audit

A fresh verifier was written from the corrected mathematical definitions rather than the v0.1 residual CSV semantics.

Observed output:

```text
P7 V2 CERTIFICATE: PASS
left death: 4/4
seed parameter rows: 99
residual states: 35
recursive transition rows: 17
base window: 190 letters — ASF and residual-free
W1: 946 ASF
W2: 80421 no crossing square (interior protected by Keranen endomorphism)
THEOREM LOGIC CERTIFIED SUBJECT TO THE CLASSICAL INPUT: G85 maps every ASF word to an ASF word.
```

The W1/W2 tests are regression checks, not finite extrapolation used in the all-depth induction.

Files produced:

- `verify_p7_main_theorem_v2.py`
- `P7_V2_RESIDUAL_STATES.csv`
- `P7_V2_SEED_ROWS.csv`
- `P7_V2_RECURSIVE_TRANSITIONS.csv`

---

## 9. Literature audit

### Keränen 1992

The located record for *Abelian squares are avoidable on 4 letters* states that the 85-uniform morphism itself is a-2-free: \(g(w)\) is a-2-free whenever \(w\) is a-2-free. This is the precise classical theorem required by the repaired proof.

### Keränen 2010

The located primary article defines an unfavorable factor as an ASF word that cannot occur as a proper factor of an infinite ASF word. It explicitly notes the possibility that such a factor might be extendable without bound in one direction and says that the existence of such factors remained an open question at that time.

The present theorem gives exactly such a phenomenon, in the stronger form that the displayed witness admits no one-letter extension on the opposite side.

The safe historical wording remains:

> In the primary sources located, the one-sided-extension phenomenon was posed as open; no later equivalent resolution was found in the literature searched through 2026-09-03.

This is not a proof of novelty.

### Shur 2008

Shur defines right-, left-, and two-sided extendable parts by the existence of infinitely many corresponding extensions. The explicit infinite right continuation constructed here is sufficient for membership in \(re(\mathcal A_4)\), while one-step left death immediately excludes membership in \(le(\mathcal A_4)\).

### Maximal-word literature

Cummings–Mays (2001), Korn (2003), and Bullock (2004) concern finite maximal ASF words. They are nearby prior art but do not supply the right-infinite/left-dead phenomenon established here.

### Novelty verdict

`NO PRIOR RESOLUTION FOUND — NOVELTY PROVISIONAL`

---

## 10. Manuscript red-team issue register

| ID | Severity | Type | Issue | v0.2 action |
|---|---|---|---|---|
| R1 | FATAL | correctness | malformed residual definition | replaced by direct `A x B y D` semantics |
| R2 | FATAL | correctness | closure class omitted fixed prefix C | invariant now explicitly requires `C` prefix |
| R3 | MAJOR | computation | old verifier printed descent without checking it | explicit preimage-position descent |
| R4 | MAJOR | computation | old verifier did not check C residual-free | v2 checks directly |
| R5 | FATAL | completeness | old 36-state graph not correct proof kernel | replaced by 35-state / 17-row exact closure |
| R6 | MODERATE | reproducibility | independence wording overstated | downgraded and made precise |
| R7 | MODERATE | citation | wrong maximal-word citation line | corrected bibliography |
| R8 | MODERATE | novelty | “definitive answer” too strong | cautious historical wording |
| R9 | MINOR | exposition | no conventional bibliography | added formal references |
| R10 | MINOR | exposition | v0.1 descent formula vague | replaced with exact integer descent |

---

## 11. Final red-team classifications

### Original manuscript v0.1

**Theorem status:** `THEOREM NEEDS REPAIR`  
**Manuscript recommendation:** `MAJOR REVISION`  
**Novelty:** `NO PRIOR RESOLUTION FOUND — NOVELTY PROVISIONAL`

### Corrected proof / manuscript v0.2 prepared from this audit

**Theorem status:** `THEOREM SURVIVES CURRENT INDEPENDENT AUDIT`  
**Manuscript recommendation:** `READY FOR A NEW EXTERNAL-STYLE RED TEAM`  
**Novelty:** `NO PRIOR RESOLUTION FOUND — NOVELTY PROVISIONAL`

The v0.1 release should remain archived as a failed/obsolete proof package rather than being overwritten.
