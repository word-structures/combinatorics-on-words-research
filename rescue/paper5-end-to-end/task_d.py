from collections import Counter
from itertools import product
import time
import json
import sympy as sp
from sympy import ZZ
from sympy.polys.matrices import DomainMatrix
from sympy.polys.matrices.normalforms import smith_normal_decomp
import hashlib

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

Mg = [[G3_baseline[c].count(r) for c in OUT] for r in ROLES]
Mg = [[Mg[j][i] for j in range(6)] for i in range(3)]
valid_v_set = set()
for x in product(range(-4, 5), repeat=6):
    v0 = sum(Mg[0][i]*x[i] for i in range(6))
    v1 = sum(Mg[1][i]*x[i] for i in range(6))
    v2 = sum(Mg[2][i]*x[i] for i in range(6))
    valid_v_set.add((v0, v1, v2))

def valid_v(v): return v in valid_v_set

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

# Baseline Task D
def run_baseline_d():
    words_f = all_words(PROFILES['f'])
    words_d = all_words(PROFILES['d'])
    accepted = []
    
    for wf, wd in product(words_f, words_d):
        H_x = G3_baseline.copy()
        H_x['f'] = wf
        H_x['d'] = wd
        if not check_short(H_x): continue
        if not check_target_RR(H_x): continue
        accepted.append((wf, wd))
    return accepted

base_acc = run_baseline_d()

# Joint Guided Solver
def run_guided_d():
    rho_f = PROFILES['f']
    rho_d = PROFILES['d']
    
    # We need states that depend on BOTH f and d, or just all parent templates?
    # The condition is: target in R_sigma1(rho1) + R_sigma2(rho2)...
    # Actually, the user says "Run the joint guided solver independently."
    # We can just run the DFS on (wf, wd) jointly.
    
    def geom_fd(a1,a2,a3,i1,i2,i3):
        C = sub(PROFILES[a1], PROFILES[a2])
        dd_f = {}
        dd_d = {}
        for coef, r, d in zip((-1, 2, -1), (a1, a2, a3), (i1, i2, i3)):
            if r == 'f':
                if d == 0: pass
                elif d == 10: C = add(C, scale(coef, PROFILES[r]))
                else: dd_f[d] = dd_f.get(d, 0) + coef
            elif r == 'd':
                if d == 0: pass
                elif d == 10: C = add(C, scale(coef, PROFILES[r]))
                else: dd_d[d] = dd_d.get(d, 0) + coef
            else:
                C = add(C, scale(coef, prefix(G3_baseline[r], d)))
        return C, tuple(sorted((d, c) for d, c in dd_f.items() if c)), tuple(sorted((d, c) for d, c in dd_d.items() if c))

    states = []
    for a1,a2,a3 in product(ROLES, repeat=3):
        for i1,i2,i3 in product(range(11), repeat=3):
            C, norm_f, norm_d = geom_fd(a1, a2, a3, i1, i2, i3)
            if norm_f or norm_d:
                states.append((C, norm_f, norm_d))
                
    def reach_chain(rho, norm, z):
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
        
    accepted = []
    
    def search(zf, zd, rem_f, rem_d):
        if len(zf) < 10:
            pruned = False
            for C, norm_f, norm_d in states:
                Rf = reach_chain(rho_f, norm_f, zf)
                Rd = reach_chain(rho_d, norm_d, zd)
                if not Rf or not Rd: continue
                # We need all combinations rv_f + rv_d to be valid_v
                # if so, pruned
                if all(valid_v(add(C, add(rvf, rvd))) for rvf in Rf for rvd in Rd):
                    pruned = True
                    break
            if pruned: return
            
            for i, c in enumerate(OUT):
                if rem_f[i] > 0:
                    rr = list(rem_f); rr[i] -= 1
                    search(zf + c, zd, tuple(rr), rem_d)
        elif len(zd) < 10:
            pruned = False
            for C, norm_f, norm_d in states:
                Rf = reach_chain(rho_f, norm_f, zf)
                Rd = reach_chain(rho_d, norm_d, zd)
                if not Rf or not Rd: continue
                if all(valid_v(add(C, add(rvf, rvd))) for rvf in Rf for rvd in Rd):
                    pruned = True
                    break
            if pruned: return
            
            for i, c in enumerate(OUT):
                if rem_d[i] > 0:
                    rr = list(rem_d); rr[i] -= 1
                    search(zf, zd + c, rem_f, tuple(rr))
        else:
            H_x = G3_baseline.copy()
            H_x['f'] = zf
            H_x['d'] = zd
            if not check_short(H_x): return
            if not check_target_RR(H_x): return
            accepted.append((zf, zd))
            
    search("", "", PROFILES['f'], PROFILES['d'])
    return accepted

guided_acc = run_guided_d()

print(f"Baseline pairs: {len(base_acc)}")
print(f"Guided pairs: {len(guided_acc)}")

b_set = set(base_acc)
g_set = set(guided_acc)
literal_only = len(b_set - g_set)
guided_only = len(g_set - b_set)

res = {
    "literal_only": literal_only,
    "guided_only": guided_only,
    "pairs_sha256": hashlib.sha256(str(sorted(list(b_set))).encode()).hexdigest(),
    "base_count": len(base_acc)
}

with open("TASK_D_MACHINE.json", "w") as f:
    json.dump(res, f, indent=2)

print("Done")
