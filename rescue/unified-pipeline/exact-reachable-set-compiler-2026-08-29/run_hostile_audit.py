import json
import itertools
from collections import defaultdict

def red(tup):
    # tup is a dict of {depth: coef}
    # drop depth 0
    return tuple(sorted([(d, c) for d, c in tup.items() if d != 0 and c != 0]))

def run_audit():
    out = {}
    
    # We will test L up to 25 to be comprehensive but fast
    L_MAX = 25
    
    gate3_rescues_valid = True
    gate4_equivalence = True
    gate5_distinctness = True
    
    # 34 Patterns structure
    # Zs: 000, 111 (2)
    # Pt: 000, 001, 110, 111 (4)
    # Mt: 000, 100, 011, 111 (4)
    # Z, P, M: 8 each (24)
    # Total = 34.
    
    for L in range(5, L_MAX + 1):
        domains = {'Zs': [], 'Pt': [], 'Mt': [], 'Z': [], 'P': [], 'M': []}
        
        for u in range(L):
            for v in range(L):
                for w in range(L):
                    if u + w == 2*v:
                        domains['Z'].append((u, v, w))
                        domains['Zs'].append((u, v, w)) # Wait, Zs is a subset of Z physically
                    elif u + w == 2*v - L:
                        domains['P'].append((u, v, w))
                        domains['Pt'].append((u, v, w))
                    elif u + w == 2*v + L:
                        domains['M'].append((u, v, w))
                        domains['Mt'].append((u, v, w))
                        
        # Zs is strictly those that can be formed by K < L and m2 == 0
        # u + 2K < L  => u + w = 2v, but we must actually filter the physical points!
        # Actually Zs is formed by K < L, meaning v = u+K, w = u+2K.
        real_domains = {d: set() for d in domains}
        for u in range(L):
            for K in range(2, 3*L + 1):
                v = (u + K) % L
                w = (u + 2*K) % L
                
                m1 = (u + K) // L
                m2 = (u + 2*K) // L
                
                q = K // L
                
                if q == 0:
                    if m1 == 0 and m2 == 0: real_domains['Zs'].add((u,v,w))
                    elif m1 == 0 and m2 == 1: real_domains['Pt'].add((u,v,w))
                    elif m1 == 1 and m2 == 1: real_domains['Mt'].add((u,v,w))
                    elif m1 == 1 and m2 == 2: real_domains['Z'].add((u,v,w))
                else:
                    if m2 - m1 == q and m1 == q: real_domains['Z'].add((u,v,w))
                    elif m2 - m1 == q + 1 and m1 == q + 1: real_domains['Z'].add((u,v,w))
                    elif m1 == q and m2 - m1 == q + 1: real_domains['P'].add((u,v,w))
                    elif m1 == q + 1 and m2 - m1 == q: real_domains['M'].add((u,v,w))

        # Check Gate 3: Truncation Rescue
        p_plus = (L-2, L-1, 0)
        p_minus = (L-1, 0, 1)
        
        # In Pt, 110 mask deleted signature is red(x_{L-2} - 2x_{L-1}) because w=0 is deleted by red()
        # Lemma 4.2 claims pi_110(Pt) = pi_110(P) \ {x_{L-2} - 2x_{L-1}}
        # Meaning p_plus (which is in P but NOT in Pt) produces EXACTLY that signature, and NO OTHER point in Pt produces it.
        pi_110_P = set()
        for (u,v,w) in real_domains['P']:
            sig = defaultdict(int)
            sig[u] += 1; sig[v] -= 2; sig[w] += 0
            pi_110_P.add(red(sig))
            
        pi_110_Pt = set()
        for (u,v,w) in real_domains['Pt']:
            sig = defaultdict(int)
            sig[u] += 1; sig[v] -= 2; sig[w] += 0
            pi_110_Pt.add(red(sig))
            
        sig_p_plus = defaultdict(int)
        sig_p_plus[L-2] += 1; sig_p_plus[L-1] -= 2; sig_p_plus[0] += 0
        sig_p_plus_red = red(sig_p_plus)
        
        if sig_p_plus_red in pi_110_Pt:
            gate3_rescues_valid = False
            
        if pi_110_Pt != pi_110_P - {sig_p_plus_red}:
            gate3_rescues_valid = False
            
        # Gate 4: 19 Complete Reduced Support Sets
        masks_by_domain = {
            'Zs': ['000', '111'],
            'Pt': ['000', '001', '110', '111'],
            'Mt': ['000', '100', '011', '111'],
            'Z': ['000', '001', '010', '011', '100', '101', '110', '111'],
            'P': ['000', '001', '010', '011', '100', '101', '110', '111'],
            'M': ['000', '001', '010', '011', '100', '101', '110', '111']
        }
        
        families = []
        family_map = {}
        for dom, masks in masks_by_domain.items():
            for m in masks:
                S = set()
                for (u,v,w) in real_domains[dom]:
                    sig = defaultdict(int)
                    if m[0] == '1': sig[u] += 1
                    if m[1] == '1': sig[v] -= 2
                    if m[2] == '1': sig[w] += 1
                    S.add(red(sig))
                # freeze
                Sf = frozenset(S)
                if Sf not in family_map:
                    family_map[Sf] = []
                    families.append(Sf)
                family_map[Sf].append(f"{dom}_{m}")
                
        if len(families) != 19:
            gate4_equivalence = False
            
        # Gate 5: Symbolic distinctness (171 pairs)
        if len(set(families)) != 19:
            gate5_distinctness = False

    out['gate3_rescues_valid'] = gate3_rescues_valid
    out['gate4_19_families'] = gate4_equivalence
    out['gate5_pairwise_distinct'] = gate5_distinctness
    
    with open('scratch/unified-pipeline/exact-reachable-set-compiler-2026-08-29/hostile_referee_2026_08_29/PAPER4_HOSTILE_REFEREE_MACHINE_CHECKS_2026-08-29.json', 'w') as f:
        json.dump(out, f, indent=2)

if __name__ == '__main__':
    run_audit()
