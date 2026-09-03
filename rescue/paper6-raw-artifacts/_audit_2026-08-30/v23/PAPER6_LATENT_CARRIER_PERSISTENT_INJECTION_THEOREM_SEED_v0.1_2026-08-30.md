# PAPER 6 — LATENT CARRIER / PERSISTENT INJECTION THEOREM SEED v0.1
**Date:** 2026-08-30  
**Status:** proved shift lemma + exact Q2 counterexample; not a manuscript novelty claim

## Executive result

The previous transient-fringe interpretation was too narrow.

A latent obstruction difference can be:

1. invisible in the current selected-library response;
2. carried only for finitely many matched block steps;
3. nevertheless become active before disappearing;
4. inject new **non-sterile** branches into the future transfer dynamics;
5. thereby change the persistent continuation-count process.

Thus:

\[
\boxed{
\text{nilpotent geometric carrier}
\not\Rightarrow
\text{nilpotent counting effect}.
}
\]

The carrier itself may die, while the branch difference it creates survives in
the persistent future.

This is the key distinction between the two earlier Q2 count merges and the new
counterexample.

---

# 1. Matched-block shift lemma

Let the block length be \(L\).

For a history \(s\), define the suffix-Parikh ladder

\[
S_r(s)=\Psi(\operatorname{suf}_r(s)).
\]

Let two histories \(s,t\) be extended by the **same** block \(b\), producing
\(s',t'\).

Define their ladder difference

\[
\delta_r=S_r(s)-S_r(t).
\]

Then:

### For \(r\le L\)

the last \(r\) symbols lie entirely inside the common appended block, so

\[
\boxed{
\delta'_r=0.
}
\]

### For \(r>L\)

the suffix consists of the common whole block plus the preceding \(r-L\)
characters. Hence

\[
S_r(s')=S_{r-L}(s)+\Psi(b),
\]

\[
S_r(t')=S_{r-L}(t)+\Psi(b),
\]

and therefore

\[
\boxed{
\delta'_r=\delta_{r-L}.
}
\]

After \(h\) identical appended blocks,

\[
\boxed{
\delta^{(h)}_r=
\begin{cases}
0,&r\le hL,\\[2mm]
\delta_{r-hL},&r>hL.
\end{cases}
}
\]

For a finite memory \(M\), the raw matched-path ladder difference therefore
vanishes after at most

\[
\lceil M/L\rceil
\]

matched blocks.

This is a genuine nilpotent shift register.

---

# 2. Why this does NOT imply transient counting semantics

The transfer system is not a single matched path.

At each state, legality is determined by nonlinear indicators

\[
\chi(s,b)\in\{0,1\}.
\]

Before the carrier disappears, a shifted latent difference can change one of
those indicators:

\[
\chi(s_h,b)\ne\chi(t_h,b).
\]

At that moment the two histories no longer have the same branching measure.

The resulting extra/missing successor state can have an arbitrarily long
future.

Thus a finite-lived carrier can inject a component into the nonzero-spectrum
future dynamics.

Schematically:

\[
\boxed{
\text{latent carrier}
\to
\text{legality bifurcation}
\to
\text{persistent branch injection}.
}
\]

---

# 3. Exact Q2 counterexample

Use the full L4 aa2fr library at

\[
Q=2,\qquad K_{\max}=11.
\]

Consider the two exact equitable states represented by

```text
A = aaabaaacaaabbbcabccca
B = aaabaaacaaabbbcbaccca
```

They differ only in the second-most-recent complete block:

```text
A: ... | bcab | ccca
B: ... | bcba | ccca
```

and

\[
\Psi(\texttt{bcab})
=
\Psi(\texttt{bcba})
=
(1,2,1).
\]

Their last five complete block profiles are identical, in the same order:

\[
(1,0,3),
(1,2,1),
(2,2,0),
(3,0,1),
(3,1,0).
\]

Most importantly, their **exact current legal literal block set is identical**:

```text
aaba
aabb
aabc
aacb
aacc
```

So this is stronger than a same-profile or same-response-orbit example.

The current exact literal response itself is equal.

---

# 4. Current latent difference is response redundant

The two histories have six differing affine boundary requirements.

The first visible differences occur at old-character depth five.

For geometry

\[
(k,j)=(3,1),
\]

state B has an attainable mask hitting 20 library blocks while state A's
corresponding affine value hits none.

For

\[
(k,j)=(4,3),
\]

B's mask hits two blocks while A's hits none.

However all of those blocks are already forbidden by the common core
constraints.

Hence:

\[
\boxed{
H_{\rm fringe}(A)\setminus H_{\rm core}=0,
\qquad
H_{\rm fringe}(B)\setminus H_{\rm core}=0.
}
\]

The remaining differing affine coordinates are currently unattainable.

Thus the internal-order difference is genuinely latent at time zero.

---

# 5. One matched block activates the carrier

Append the same legal block to both histories.

### Append `aaba`

The next responses become:

\[
6\quad\text{vs.}\quad7
\]

legal blocks.

State B gains the extra legal block

```text
cccb
```

which is forbidden from A by the shifted geometry

\[
\boxed{(k,j)=(6,3)}
\]

using nine old characters.

After taking this extra branch, the successor still has three legal next
blocks:

```text
abbb
bbaa
bbab
```

so the injected branch is not sterile.

### Append `aabc`

B gains

```text
accc
```

and the injected successor has two further legal continuations.

### Append `aacb`

B gains

```text
accc
cacb
cacc
```

whose successors have respectively 1, 2 and 2 legal next blocks.

Thus the first activated response defect is already feeding live future
branches, not merely a dead-end transient state.

---

# 6. Persistent future counts differ

Despite:

- identical exact current legal block response;
- identical ordered last-five block profiles;

the continuation counts after the 12-step transient scale are already:

\[
\boxed{
c_{12}(A)=6\,867\,627,
}
\]

\[
\boxed{
c_{12}(B)=8\,737\,466.
}
\]

At the next horizons:

\[
c_{13}(A)=25\,468\,722,
\qquad
c_{13}(B)=32\,446\,851,
\]

\[
c_{14}(A)=94\,642\,975,
\qquad
c_{14}(B)=120\,488\,590.
\]

The difference is therefore emphatically not a short-lived dead-end effect.

The latent internal-order information has injected into the persistent future
dynamics.

---

# 7. Contrast with the two Q2 count merges

The earlier count-equivalent/non-equitable pairs also carried latent fringe
differences.

But there, after response activation, the only nonmatching branch defects were

\[
+e_4,\qquad-e_4
\]

into the unique sterile class.

They cancelled exactly:

\[
(e_s-e_t)Q^2=0.
\]

So the two phenomena share the same physical first stage:

\[
\text{latent response-redundant fringe}.
\]

They differ only in what the activation injects.

### Nilpotent balancing case

\[
\text{fringe}
\to
\text{sterile impulses}
\to
\text{cancellation}
\to
\text{count equivalence}.
\]

### Persistent injection case

\[
\text{fringe}
\to
\text{live branch asymmetry}
\to
\text{persistent future difference}.
\]

This is the correct general picture.

---

# 8. Persistent local-descriptor kill

A separate exact GF(2) observable-span audit tests whether recent profile data
plus response information can contain the persistent future-count space.

For Q2 the persistent cyclic space has GF(2) rank

\[
\boxed{1167}.
\]

Selected categorical feature spaces fail as follows:

| descriptor | categories | persistent dimensions still missing |
|---|---:|---:|
| last block profile | 12 | 1167 |
| \(D_1\) | 37 | 1167 |
| \(D_2\) | 80 | 1167 |
| joint \(D_1,D_2\) | 789 | 1167 |
| twisted response orbit | 422 | 1167 |
| response + \(D_1,D_2\) | 2208 | **400** |
| response + last 4 block profiles | 2373 | **253** |
| response + last 5 block profiles | 2400 | **236** |

Even a 2400-category local descriptor on only 2691 quotient states fails to
contain the persistent future space.

This is a strong negative result:

\[
\boxed{
\text{persistent dynamics is not a function of a small recent-profile window
plus current response}.
}
\]

---

# 9. The state variable we actually need

The latent carrier result says that raw historical information should not be
classified only by whether it affects the **current** response.

We need its future injection operator.

For a latent difference \(\delta\), define schematically

\[
\boxed{
J(\delta)
=
\text{future branch defect created before the carrier dies}.
}
\]

Then there are three qualitatively different possibilities:

1. \(J(\delta)=0\): genuinely irrelevant history;
2. \(J(\delta)\) is nilpotent/sterile: transient history;
3. \(J(\delta)\) has nonzero persistent projection: asymptotically relevant
   history.

The Q2 count merges realize case 2.

The new counterexample realizes case 3.

This is a much sharper semantic classification than
active/inactive obstruction memory.

---

# 10. Consequence for the Paper-6 architecture

The previous statement

> “response/fringe structure is a transient preconditioner”

must be weakened.

The correct statement is:

> response structure identifies **currently redundant** history directions;
> a fringe-update calculation must then decide whether their future injection
> is zero, nilpotent, or persistent.

Thus the Paper-4/5/6 bridge becomes

\[
\boxed{\text{P4: latent geometric carrier}}
\]

\[
\downarrow
\]

\[
\boxed{\text{P5: current response redundancy}}
\]

\[
\downarrow
\]

\[
\boxed{\text{P6: future injection classification}}
\]

\[
\begin{cases}
0,\\
\text{nilpotent},\\
\text{persistent}.
\end{cases}
\]

That is now the strongest candidate for the structural semantics layer.

---

## Verdict

**Major correction and stronger mechanism found.**

The raw latent carrier is finite-lived under matched shifts.

Its **effect** need not be.

The missing Paper-6 object is therefore not the fringe coordinate itself, but
the transfer of that fringe into future branching:

\[
\boxed{
\textbf{latent-fringe injection operator}.
}
\]

This is the next object to construct at family level.
