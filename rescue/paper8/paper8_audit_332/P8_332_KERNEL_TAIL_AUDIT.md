# External Audit Report: Kernel Tail Lemma (Phase C)

**Target:** `PAPER8_332_REPAIRED_THEOREM_CHECKPOINT_v1_2026-09-03`
**Component:** `KERNEL_TAIL_LEMMA.md` & `kernel_tail_bound_332.py`
**Auditor:** Antigravity (Independent Verification)

## 1. Goal
The objective is to verify that the kernel tail lemma rigorously bounds the stationary profile-kernel tail $E[f_r f_s \mid g] - E[f_r f_s]$ across the infinite chain by explicitly enumerating all polynomial/shell-count prefactors, without relying on an unproven $O(B^2 \tau^B)$ generic boundary analytic continuation.

## 2. Step-by-Step Verification

### 2.1 Function Bounds
The score function is $f = 1_a - 1/3$. Its values are strictly in $[-1/3, 2/3]$, making $|f| \le 2/3$ and $\operatorname{osc}(f) = 1$.
The Dobrushin contraction gives $\operatorname{osc}(P^d f) \le w(d) = \tau^{\lfloor d/44 \rfloor}$.
Because $E[P^d f] = 0$, its values must cross zero, so its absolute maximum is bounded by its oscillation. Thus $|P^d f| \le w(d)$.
The product oscillation $\operatorname{osc}(f P^d f)$ is bounded by:
$$ \operatorname{osc}(f \cdot P^d f) \le 2 \times \max|f| \times \max|P^d f| \le 2 \times \frac{2}{3} \times w(d) = \frac{4}{3} w(d)$$
This establishes the base contraction scale. (Verified).

### 2.2 Same-Side Pair
For points $r, s$ on the same side of the event support $g$, conditioning on $g$ alters the distribution at $r$ by at most $w(r)$ in Total Variation. 
The expected value of $H = f_r E[f_s \mid x_r] = f_r P^{s-r} f(x_r)$ shifts by at most $\operatorname{osc}(H) w(r)$.
Using the bound from 2.1, this is $\frac{4}{3} w(s-r) w(r)$. (Verified).

### 2.3 Support/Outside Pair
For $r$ inside the event support and an outside point at distance $d$, conditioning on $g$ gives $E[f_r f_s \mid g] = E[f_r P^d f(x_r) \mid g]$.
Since $|f_r| \le 2/3$ and $|P^d f| \le w(d)$, the absolute value is $\le \frac{2}{3} w(d)$.
The baseline $E[f_r f_s]$ is similarly bounded by $\frac{2}{3} w(d)$. The difference is at most $\frac{4}{3} w(d)$. (Verified).

### 2.4 Left/Right Cross Pair
For opposite-side points at distances $r, s \ge 1$ from the event support, the event $g$ provides conditional independence.
$$ |E[f_{-r} f_s \mid g]| = |E[f_{-r} \mid g]| |E[f_s \mid g]| \le w(r) w(s) $$
The baseline covariance satisfies $|E[f_{-r} f_s]| \le \frac{2}{3} w(r + s + \text{support size}) \le \frac{2}{3} w(r) w(s)$.
The sum of absolute values gives $\frac{5}{3} w(r) w(s)$. (Verified).

### 2.5 Exact Shell Summation
For profile (3,3,2), the scored window is $[-308, 308]$, meaning left distance $RL = 293$ and right distance $RR = 308$.
The geometric series over the step-function weights $w(d)$ is strictly $A = \sum_{d \ge 1} w(d) = 43 + 44 \frac{\tau}{1-\tau}$.

I independently ran `kernel_tail_bound_332.py`, which computes the complementary sums exactly using Python's exact `fractions.Fraction`.
The combined exact rational summation yields:
$$E_{kernel} \le \frac{1770821092673}{24300000000000} \approx 0.07287329599$$

## 3. Conclusion
The new Kernel Tail Lemma correctly and safely bounds the stationary variance tails by counting exact shells up to infinity. The geometric series over the Dobrushin step-function is resolved precisely with explicit counting factors. The proof logic is fully valid and requires no analytic continuation claims. 

**AUDIT RESULT: PASS**
