#!/usr/bin/env python3
"""
Independent exact verifier for the current Block Assembly length-40 candidate H.

Checks only:
  Gate S: prescribed Parikh vectors.
  Gate L: no Abelian square of half-length 2,3,4,5 inside the six blocks
          or across any of the 14 allowed h6 seams.
  Gate K: incidence matrix equals the prescribed affine lift of Rao-Rosenfeld g3,
          hence has the same kernel (checked by exact rational RREF).

This script DOES NOT certify Gate T (long periods > 5).
It performs NO h=8 computation and uses NO D40 data.
"""

from fractions import Fraction

H = {
    "a": "ccaaacbbabbbcaabbbacbbbaaacccbaaacbccaab",
    "b": "aaaccbacccaabcccbbbccabcbbabbcccacbaaccb",
    "c": "bbacaaabaccbcccabbbcccbbbabcccabacabbccc",
    "d": "bbacccbccaabcbabccacccbaacabcccaaabcccab",
    "e": "acccbbbcabaaacabbbaaccbbbccaabbbacbbaacb",
    "f": "bbaaacccbaaacaabcbabccaaabaaacaabaaccbbb",
}

ROLES = {
    "a": (15,14,11),
    "b": (11,12,17),
    "c": (10,14,16),
    "d": (12,10,18),
    "e": (13,16,11),
    "f": (19,11,10),
}

BIGRAMS = [
    "ac","ad","af","bc","bd","cb","ce",
    "dc","df","ea","eb","fa","fb","fe"
]

G3 = [
    [5,1,0,2,3,9],
    [4,2,4,0,6,1],
    [1,7,6,8,1,0],
]

LETTERS = "abc"
MACROS = "abcdef"

def parikh(s):
    return tuple(s.count(ch) for ch in LETTERS)

def has_small_abelian_square(s):
    n = len(s)
    for k in range(2,6):
        for i in range(n - 2*k + 1):
            if parikh(s[i:i+k]) == parikh(s[i+k:i+2*k]):
                return True, (i,k,s[i:i+2*k])
    return False, None

def rref(mat):
    A = [[Fraction(x) for x in row] for row in mat]
    m, n = len(A), len(A[0])
    row = 0
    pivots = []
    for col in range(n):
        pivot = next((r for r in range(row,m) if A[r][col] != 0), None)
        if pivot is None:
            continue
        A[row], A[pivot] = A[pivot], A[row]
        p = A[row][col]
        A[row] = [x/p for x in A[row]]
        for r in range(m):
            if r != row and A[r][col] != 0:
                f = A[r][col]
                A[r] = [A[r][c] - f*A[row][c] for c in range(n)]
        pivots.append(col)
        row += 1
        if row == m:
            break
    return A, pivots

print("BLOCK ASSEMBLY CANDIDATE H — EXACT GATE S/L/K CHECK")
print("NO D40. NO h=8. Gate T is NOT checked here.")
print()

# Gate S
print("Gate S — prescribed length-40 Parikh roles")
for x in MACROS:
    got = parikh(H[x])
    print(f"  {x}: len={len(H[x])}, Parikh={got}, expected={ROLES[x]}")
    assert len(H[x]) == 40
    assert got == ROLES[x]
print("Gate S: PASS")
print()

# Gate L, inside
print("Gate L1 — internal periods 2..5")
for x in MACROS:
    bad, witness = has_small_abelian_square(H[x])
    print(f"  {x}: {'PASS' if not bad else 'FAIL'}")
    assert not bad, (x,witness)
print("Gate L1: PASS")
print()

# Gate L, seams
print("Gate L2 — 14 allowed seams, periods 2..5")
for xy in BIGRAMS:
    s = H[xy[0]] + H[xy[1]]
    bad, witness = has_small_abelian_square(s)
    print(f"  {xy}: {'PASS' if not bad else 'FAIL'}")
    assert not bad, (xy,witness)
print("Gate L2: PASS")
print()

# Gate K: M' = M_g3 + (10,10,10) 1^T
M = [[ROLES[x][r] for x in MACROS] for r in range(3)]
expected = [[G3[r][c] + 10 for c in range(6)] for r in range(3)]
print("Gate K — incidence / kernel")
print("  M_H =", M)
print("  expected affine lift =", expected)
assert M == expected

r1,p1 = rref(G3)
r2,p2 = rref(M)
assert p1 == p2
assert r1 == r2
print("  exact RREF(M_g3) == RREF(M_H): PASS")
print("Gate K: PASS")
print()

print("SUMMARY")
print("  Gate S: PASS")
print("  Gate L: PASS")
print("  Gate K: PASS")
print("  Gate T: NOT YET CERTIFIED")
print("CANDIDATE_STATUS = S_L_K_CERTIFIED__T_OPEN")
