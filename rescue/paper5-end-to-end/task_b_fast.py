from collections import Counter
from itertools import product
import time
import json
import sys

ROLES = list("abcdef")
OUT = list("abc")
H6 = {'a':'ace','b':'adf','c':'bdf','d':'bdc','e':'afe','f':'bce'}
G3_baseline = {
    'a':'bbbaabaaac','b':'bccacccbcc','c':'ccccbbbcbc',
    'd':'ccccccccaa','e':'bbbbbcabaa','f':'aaaaaaabaa'
}
PROFILES = {r: tuple(G3_baseline[r].count(c) for c in OUT) for r in ROLES}

def pv(w): return tuple(w.count(c) for c in OUT)
def add(a,b): return tuple(a[i]+b[i] for i in range(3))
def sub(a,b): return tuple(a[i]-b[i] for i in range(3))
def scale(c,a): return tuple(c*a[i] for i in range(3))
def prefix(w,d): return pv(w[:d])

# We can find all the valid 'v' values quickly by scanning the actual bounded space of `x`.
# Mg * x == v
Mg = [[G3_baseline[c].count(r) for c in OUT] for r in ROLES]
Mg = [[Mg[j][i] for j in range(6)] for i in range(3)]

# We need the real valid `v` set.
valid_v_set = set()
for x in product(range(-4, 5), repeat=6):
    v0 = sum(Mg[0][i]*x[i] for i in range(6))
    v1 = sum(Mg[1][i]*x[i] for i in range(6))
    v2 = sum(Mg[2][i]*x[i] for i in range(6))
    valid_v_set.add((v0, v1, v2))

def valid_v(v):
    return v in valid_v_set

def is_abelian_square_free(w):
    for i in range(len(w)):
        for L in range(1, (len(w)-i)//2 + 1):
            if Counter(w[i:i+L]) == Counter(w[i+L:i+2*L]): return False
    return True

src = "a"
for _ in range(4): src = "".join(H6[c] for c in src)
sf_words = set()
for L in range(1, 4):
    for i in range(len(src)-L):
        w = src[i:i+L]
        if is_abelian_square_free(w): sf_words.add(w)

def check_short(H):
    for w in sf_words:
        hw = "".join(H[c] for c in w)
        if not is_abelian_square_free(hw): return False
    return True

def check_target_RR(H):
    DESC_x = {r: [(pv(H[r][:i]), pv(H[r][i:])) for i in range(11)] for r in ROLES}
    for a1,a2,a3 in product(ROLES,repeat=3):
        for p1,s1 in DESC_x[a1]:
            for p2,s2 in DESC_x[a2]:
                for p3,s3 in DESC_x[a3]:
                    v = tuple(s1[j]+p2[j]-s2[j]-p3[j] for j in range(3))
                    if valid_v(v): return False
    return True

def geom(a1,a2,a3,i1,i2,i3,u):
    C = sub(PROFILES[a1], PROFILES[a2])
    dd = {}
    for coef, r, d in zip((-1, 2, -1), (a1, a2, a3), (i1, i2, i3)):
        if r == u:
            if d == 0: pass
            elif d == 10: C = add(C, scale(coef, PROFILES[r]))
            else: dd[d] = dd.get(d, 0) + coef
        else:
            C = add(C, scale(coef, prefix(G3_baseline[r], d)))
    return C, tuple(sorted((d, c) for d, c in dd.items() if c))

def reach_chain_with_prefix(rho, norm, z):
    d_z = len(z)
    pv_z = pv(z)
    for i in range(3):
        if pv_z[i] > rho[i]: return frozenset()
    choices = []
    for d, c in norm:
        if d <= d_z:
            choices.append([prefix(z, d)])
        else:
            valid_y = []
            for a in range(rho[0] - pv_z[0] + 1):
                for b in range(rho[1] - pv_z[1] + 1):
                    cc = (d - d_z) - a - b
                    if 0 <= cc <= rho[2] - pv_z[2]:
                        valid_y.append((pv_z[0]+a, pv_z[1]+b, pv_z[2]+cc))
            choices.append(valid_y)
    out = set()
    for ys in product(*choices):
        if not all(all(ys[j][i] <= ys[j+1][i] for i in range(3)) for j in range(len(ys)-1)):
            continue
        v = (0,0,0)
        for y, (d,c) in zip(ys, norm):
            v = add(v, scale(c, y))
        out.add(v)
    return frozenset(out)

def get_parent_states(role):
    states = set()
    for a1,a2,a3 in product(ROLES, repeat=3):
        for i1,i2,i3 in product(range(11), repeat=3):
            C, norm = geom(a1, a2, a3, i1, i2, i3, role)
            if norm:
                states.add((C, norm))
    return states

def run_task_b(role):
    rho = PROFILES[role]
    states = get_parent_states(role)
    
    metrics = {
        "guided_prefix_nodes": 0,
        "guided_reachable_queries": 0,
        "guided_infeasibility_prunes": 0,
        "guided_complete_words": 0,
        "guided_final_certificate_calls": 0,
        "accepted": [],
        "rejections": {}
    }
    
    def search(z, rem):
        metrics["guided_prefix_nodes"] += 1
        if len(z) < sum(rho):
            pruned = False
            for C, norm in states:
                metrics["guided_reachable_queries"] += 1
                R = reach_chain_with_prefix(rho, norm, z)
                if not R: continue
                if all(valid_v(add(C, rv)) for rv in R):
                    metrics["guided_infeasibility_prunes"] += 1
                    pruned = True
                    break
            if pruned: return
            for i, c in enumerate(OUT):
                if rem[i] > 0:
                    rr = list(rem); rr[i] -= 1
                    search(z + c, tuple(rr))
        else:
            metrics["guided_complete_words"] += 1
            H_x = G3_baseline.copy()
            H_x[role] = z
            if not check_short(H_x):
                metrics["rejections"][z] = "REJECTED_SHORT"
                return
            metrics["guided_final_certificate_calls"] += 1
            if not check_target_RR(H_x):
                metrics["rejections"][z] = "REJECTED_LONG_PARENT"
                return
            metrics["accepted"].append(z)

    start = time.time()
    search("", rho)
    metrics["guided_wall_clock"] = time.time() - start
    
    with open(f"TASK_B_ROLE_{role}_MACHINE.json", "w") as f:
        json.dump(metrics, f, indent=2)
    print(f"Role {role} (Guided) Accepted:", metrics["accepted"])

run_task_b("f")
run_task_b("d")
