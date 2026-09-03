from collections import Counter
from itertools import product
import time
import json

ROLES = list("abcdef")
OUT = list("abc")
H6 = {'a':'ace','b':'adf','c':'bdf','d':'bdc','e':'afe','f':'bce'}
G3 = {
    'a':'bbbaabaaac','b':'bccacccbcc','c':'ccccbbbcbc',
    'd':'ccccccccaa','e':'bbbbbcabaa','f':'aaaaaaabaa'
}
PROFILES = {r: tuple(G3[r].count(c) for c in OUT) for r in ROLES}

def pv(w): return tuple(w.count(c) for c in OUT)
def add(a,b): return tuple(a[i]+b[i] for i in range(3))
def sub(a,b): return tuple(a[i]-b[i] for i in range(3))

def all_words(rho):
    L=sum(rho); out=[]
    def rec(pref,rem):
        if len(pref)==L:
            out.append(''.join(pref)); return
        for i,c in enumerate(OUT):
            if rem[i]:
                rr=list(rem); rr[i]-=1
                rec(pref+c,tuple(rr))
    rec('',tuple(rho))
    return out

# Real RR certificate check
# Load precomputed valid parents for fixed target g3?
# The RR framework works on a FULLY specified target morphism H_x.
# A parent witness is a factorization of some H_x(w) into prefixes/suffixes of H_h^2(a,b,c).
# In our FULL_RR experiment, the parent states were precisely described by v = Parikh(target) in Q-nullspace.
# We have `parents.txt` which contains all the `(a1, a2, a3, (d1, d2, d3, d4, d5, d6))` valid parent states for G3.
# A full RR certificate would check if these parents can tile the word.
# Actually, the user asked to run an ACTUAL fixed-target RR parent/ancestor criterion.
# If H is known, how do we check it?
# The partial target parent bridge established exactly this:
# parent possible iff -M_H d - C_G in sum_r R_{sigma_r}(rho_r)
# When the word is fully specified (literal), R_sigma(rho) is just { sigma(x) }.
# So we can just evaluate `sigma(x)` for the specific word, and see if ANY parent gives a valid match!
# A target morphism H_x is accepted by the RR parent criterion if it admits at least one valid parent witness.
# To be absolutely exact, a valid parent for H_x is one where v = Mg(x)*d exactly matches the required geometry.

# Wait, the parent condition is for one occurrence.
# A morphism admits a parent if *every* occurrence admits a parent? No, "a genuine RR outer-parent witness of the target zero 2-template".
# Let's read the exact logic from FULL_RR cleanroom.
