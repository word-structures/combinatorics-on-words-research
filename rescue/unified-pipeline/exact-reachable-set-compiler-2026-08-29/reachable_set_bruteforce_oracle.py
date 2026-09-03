import json
import itertools
from collections import defaultdict

def generate_words(rho):
    elements = ['0']*rho[0] + ['1']*rho[1] + ['2']*rho[2]
    for p in set(itertools.permutations(elements)):
        yield "".join(p)

def prefix_parikh(word):
    # Returns a list where index d is the Parikh vector of prefix of length d
    prefs = [[0,0,0]]
    for char in word:
        nxt = list(prefs[-1])
        nxt[int(char)] += 1
        prefs.append(nxt)
    return prefs

def evaluate_signature(sig_str, prefs):
    # sig_str e.g. "1:-1|2:2|3:-1"
    res = [0,0,0]
    if not sig_str:
        return res
    for term in sig_str.split('|'):
        d, a = term.split(':')
        d, a = int(d), int(a)
        for i in range(3):
            res[i] += a * prefs[d][i]
    return res

def run_oracle():
    with open('compiled_sets.json', 'r') as f:
        data = json.load(f)
    
    false_members = 0
    missing_members = 0
    total_checks = 0

    # L is a string in json
    for L_str, families in data.items():
        L = int(L_str)
        print(f"Verifying L={L}")
        for cid, profiles_data in families.items():
            for rho_str, signatures in profiles_data.items():
                rho = list(map(int, rho_str.split(',')))
                
                # Brute force literal sets for this rho
                literal_words = list(generate_words(rho))
                word_prefs = [prefix_parikh(w) for w in literal_words]
                
                for sig_data in signatures:
                    sig_str = sig_data['signature']
                    js_reachable = set(sig_data['reachable'])
                    
                    literal_reachable = set()
                    for prefs in word_prefs:
                        v = evaluate_signature(sig_str, prefs)
                        literal_reachable.add(f"{v[0]},{v[1]},{v[2]}")
                    
                    false = js_reachable - literal_reachable
                    missing = literal_reachable - js_reachable
                    
                    false_members += len(false)
                    missing_members += len(missing)
                    total_checks += 1
                    
                    if false or missing:
                        print(f"Mismatch at L={L}, fam={cid}, rho={rho_str}, sig={sig_str}")
                        return
    
    print(f"Verification complete. Total signatures checked: {total_checks}")
    print(f"False members: {false_members}")
    print(f"Missing members: {missing_members}")
    
    out = {
        "status": "PASS" if false_members == 0 and missing_members == 0 else "FAIL",
        "total_signatures_checked": total_checks,
        "false_members": false_members,
        "missing_members": missing_members,
        "L_range": "2..8"
    }
    with open('REACHABLE_SET_EXHAUSTIVE_PARITY_2026-08-29.json', 'w') as f:
        json.dump(out, f, indent=2)

if __name__ == '__main__':
    run_oracle()
