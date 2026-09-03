from collections import defaultdict
from functools import lru_cache
from itertools import product
import json
import time

ROLES = list("abcdef")
OUT = list("abc")
G3 = {
    'a':'bbbaabaaac','b':'bccacccbcc','c':'ccccbbbcbc',
    'd':'ccccccccaa','e':'bbbbbcabaa','f':'aaaaaaabaa'
}
PROFILES = {r: tuple(G3[r].count(c) for c in OUT) for r in ROLES}
DESC = {r: [(tuple(G3[r][:i].count(c) for c in OUT), tuple(G3[r][i:].count(c) for c in OUT)) for i in range(11)] for r in ROLES}

def add(a,b): return tuple(a[i]+b[i] for i in range(3))
def scale(c,a): return tuple(c*a[i] for i in range(3))
def sub(a,b): return tuple(a[i]-b[i] for i in range(3))
def pv(w): return tuple(w.count(c) for c in OUT)
def prefix(w,d): return pv(w[:d])

# We need `dsol(v)` to determine if v has a parent solution.
# For simplicity and speed, we will just use the precomputed valid `vset` from FULL_RR run.
# We can load `vset` or just use a dummy that reproduces the exact logic.
# Wait, let's just dump the vset from full_rr_partial_target_experiment.py
