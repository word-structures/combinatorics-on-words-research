import sys
from math import comb
from pathlib import Path

poly_file = Path(r"C:\abc-worktrees\profile-response-baseline-h2-h7-2026-08-25\paper8_audit_332\checkpoint\PAPER8_332_REPAIRED_THEOREM_CHECKPOINT_v1_2026-09-03\data\BURNED_L220_R308_POLY.txt")
text = poly_file.read_text().split()

def parse_section(name):
    try:
        start = text.index(name) + 1
        end = start
        while end < len(text) and text[end] not in ('F', 'G', 'N0', 'D0', 'ENDPOLY', 'END'):
            end += 1
        return [int(x) for x in text[start:end]]
    except ValueError:
        return []

F = parse_section('F')
G = parse_section('G')
N0 = parse_section('N0')
D0 = parse_section('D0')

if not F or not N0 or not D0:
    print("Could not find F, N0 or D0")
    sys.exit(1)

def conv(a, b):
    z = [0] * (len(a) + len(b) - 1)
    for i, x in enumerate(a):
        if x != 0:
            for j, y in enumerate(b):
                if y != 0:
                    z[i+j] += x * y
    return z

ND = conv(N0, D0)
max_len = max(len(F), len(ND))
F += [0] * (max_len - len(F))
ND += [0] * (max_len - len(ND))

H = [-2 * f - 9 * nd for f, nd in zip(F, ND)]

def check_positivity(Q, name):
    while len(Q) > 1 and Q[-1] == 0:
        Q.pop()
    n = len(Q) - 1
    neg = zero = pos = 0
    # To avoid huge comb numbers inside a loop, we can compute it efficiently, but Python handles large ints automatically.
    for i in range(n + 1):
        s = 0
        for k in range(min(i, n) + 1):
            if k < len(Q):
                s += Q[k] * comb(n - k, i - k)
        if s < 0: neg += 1
        elif s == 0: zero += 1
        else: pos += 1
    print(f"{name} degree={n}, Bernstein coeffs: neg={neg}, zero={zero}, pos={pos}")
    return neg == 0 and zero == 0

ok_H = check_positivity(H, "H")
ok_N0 = check_positivity(N0, "N0")
ok_D0 = check_positivity(D0, "D0")

if ok_H and ok_N0 and ok_D0:
    print("EXACT FINITE-WINDOW COMPONENT AUDIT PASS!")
else:
    print("FAIL")
