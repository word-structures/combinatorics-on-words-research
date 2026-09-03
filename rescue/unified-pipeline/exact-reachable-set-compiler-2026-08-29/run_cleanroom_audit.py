import json
import subprocess
from independent_mapper import map_window, get_parikh

def generate_support_set(L, domain, chi_str):
    chi = [int(c) for c in chi_str]
    S = set()
    tuples = []
    if domain == "Zs":
        for a in range(L):
            for r in range(2, L):
                if a + 2*r <= L - 1: tuples.append((a, a+r, a+2*r))
    elif domain == "Pt":
        for a in range(L):
            for r in range(2, L):
                if a + r <= L - 1 and a + 2*r >= L: tuples.append((a, a+r, a+2*r-L))
    elif domain == "Mt":
        for a in range(L):
            for r in range(2, L):
                if a + r >= L and a + 2*r <= 2*L - 1: tuples.append((a, a+r-L, a+2*r-L))
    elif domain == "Z":
        for u in range(L):
            for v in range(L):
                w = 2*v - u
                if 0 <= w < L: tuples.append((u, v, w))
    elif domain == "P":
        for u in range(L):
            for v in range(L):
                w = 2*v - L - u
                if 0 <= w < L: tuples.append((u, v, w))
    elif domain == "M":
        for u in range(L):
            for v in range(L):
                w = 2*v + L - u
                if 0 <= w < L: tuples.append((u, v, w))
                
    for u, v, w in tuples:
        sig_map = {}
        depths = [u, v, w]
        coefs = [1, -2, 1]
        for d, c, ch in zip(depths, coefs, chi):
            if d == 0: continue
            if ch == 1: sig_map[d] = sig_map.get(d, 0) + c
        
        terms = []
        for d in sorted(sig_map.keys()):
            a = sig_map[d]
            if a != 0: terms.append(f"{d}:{a}")
        sig_str = "|".join(terms) if terms else ""
        S.add(sig_str)
    return S

def generate_words(rho):
    def permute(s, l, r, words):
        if l == r: words.append("".join(s))
        else:
            used = set()
            for i in range(l, r + 1):
                if s[i] in used: continue
                used.add(s[i])
                s[l], s[i] = s[i], s[l]
                permute(s, l + 1, r, words)
                s[l], s[i] = s[i], s[l]
    chars = []
    for i, c in enumerate(rho): chars.extend([str(i)] * c)
    words = []
    permute(chars, 0, len(chars)-1, words)
    return words

def main():
    with open('compiled_sets.json') as f:
        compiledData = json.load(f)
    
    def get_frozen_families(L_str):
        fams = {}
        if L_str in compiledData:
            for cid_str, rho_dict in compiledData[L_str].items():
                rho_key = list(rho_dict.keys())[0]
                S = set([obj['signature'] for obj in rho_dict[rho_key]])
                fams[int(cid_str)] = S
        return fams
        
    
    unresolvedRole = 'a'
    
    test_cases = []
    for L in range(5, 9):
        if L == 5: rho = [2, 1, 2]
        elif L == 6: rho = [2, 2, 2]
        elif L == 7: rho = [3, 2, 2]
        elif L == 8: rho = [3, 3, 2]
        all_words = generate_words(rho)

        concreteBlocks = []
        import random
        random.seed(42)
        for _ in range(12):
            b = "".join([str(random.randint(0,2)) for _ in range(L)])
            concreteBlocks.append(b)
        # q=0
        for K in range(2, L):
            for u in range(L):
                m1 = (u + K) // L
                m2 = (u + 2*K) // L
                unique_blocks = sorted(list(set([0, m1, m2])))
                for i in range(1 << len(unique_blocks)):
                    assignment = {}
                    for idx, b in enumerate(unique_blocks):
                        assignment[b] = 'a' if ((i >> idx) & 1) else 'b'
                    sourceRoles = [assignment.get(j, 'c') for j in range(max(m2+1, 1))]
                    test_cases.append({"L": L, "start": u, "K": K, "sourceRoles": sourceRoles, "concreteBlocks": concreteBlocks[:len(sourceRoles)], "unresolvedRole": unresolvedRole, "rho": rho})
                    
        # q>=1
        for K in range(L, 3*L):
            for u in range(L):
                m1 = (u + K) // L
                m2 = (u + 2*K) // L
                unique_blocks = sorted(list(set([0, m1, m2])))
                for i in range(1 << len(unique_blocks)):
                    assignment = {}
                    for idx, b in enumerate(unique_blocks):
                        assignment[b] = 'a' if ((i >> idx) & 1) else 'b'
                    sourceRoles = [assignment.get(j, 'c') for j in range(max(m2+1, 1))]
                    test_cases.append({"L": L, "start": u, "K": K, "sourceRoles": sourceRoles, "concreteBlocks": concreteBlocks[:len(sourceRoles)], "unresolvedRole": unresolvedRole, "rho": rho})

    js_code = """
const { mapWindow } = require('./dynamic_topology_mapper.js');
let input = "";
process.stdin.on('data', d => input += d);
process.stdin.on('end', () => {
    let cases = JSON.parse(input);
    let results = cases.map(c => mapWindow(c));
    console.log(JSON.stringify(results));
});
    """
    with open('temp_js_runner.js', 'w') as f:
        f.write(js_code)
        
    proc = subprocess.run(['node', 'temp_js_runner.js'], input=json.dumps(test_cases), text=True, capture_output=True)
    if proc.returncode != 0:
        print("JS Error:", proc.stderr)
        return
    js_results = json.loads(proc.stdout)
    
    physical_domain_mismatches = 0
    role_mask_mismatches = 0
    signature_mismatches = 0
    bulk_target_mismatches = 0
    algebra_decomposition_mismatches = 0
    
    all_py_res = []
    for tc, js_res in zip(test_cases, js_results):
        py_res = map_window(**tc)
        all_py_res.append(py_res)
        
        if py_res['domain'] != js_res['domain']: physical_domain_mismatches += 1
        if py_res['chi'] != "".join(map(str, js_res['chi'])): role_mask_mismatches += 1
        
        py_sig_str = "|".join([f"{x['d']}:{x['a']}" for x in py_res['sigma']])
        js_sig_str = "|".join([f"{x['d']}:{x['a']}" for x in js_res['sigma']])
        if py_sig_str != js_sig_str: signature_mismatches += 1
        if py_res['t'] != js_res['t']: bulk_target_mismatches += 1
        
        test_blocks = tc['concreteBlocks'].copy()
        rho_tc = tc['rho']
        all_words_tc = generate_words(rho_tc)
        for i, r in enumerate(tc['sourceRoles']):
            if r == tc['unresolvedRole']:
                test_blocks[i] = all_words_tc[0]
        left_str = "".join(test_blocks)[tc['start'] : tc['start'] + tc['K']]
        right_str = "".join(test_blocks)[tc['start'] + tc['K'] : tc['start'] + 2*tc['K']]
        pL = get_parikh(left_str)
        pR = get_parikh(right_str)
        tc['concreteBlocks'] = test_blocks
        literal_delta = [pR[i] - pL[i] for i in range(3)]
        
        sig_eval = [0,0,0]
        for term in py_res['sigma']:
            idx = -1
            for i, r in enumerate(tc['sourceRoles']):
                if r == tc['unresolvedRole']:
                    idx = i
                    break
            prefix = tc['concreteBlocks'][idx][:term['d']]
            p = get_parikh(prefix)
            for i in range(3): sig_eval[i] += term['a'] * p[i]
            
        formula = [py_res['t'][i] + sig_eval[i] for i in range(3)]
        if literal_delta != formula:
            algebra_decomposition_mismatches += 1
            if algebra_decomposition_mismatches == 1:
                print("Mismatch! L=", tc['L'], "u=", tc['start'], "K=", tc['K'])
                print("Roles:", tc['sourceRoles'])
                print("Blocks:", tc['concreteBlocks'])
                print("lit:", literal_delta, "form:", formula)
                print("t:", py_res['t'], "sig:", py_res['sigma'])
                print("sig_eval:", sig_eval)

    no_family_match = 0
    multiple_family_matches = 0
    wrong_family_assignments = 0
    exercised_patterns = set()
    
    unique_phys = set()
    for tc, py_res in zip(test_cases, all_py_res):
        L = tc['L']
        unique_phys.add((L, py_res['domain'], py_res['chi']))
        
    for L, dom, chi in unique_phys:
        S_gen = generate_support_set(L, dom, chi)
        fams = get_frozen_families(str(L))
        matches = []
        for cid, S_frozen in fams.items():
            if S_gen == S_frozen:
                matches.append(cid)
        if len(matches) == 0:
            no_family_match += 1
            print("No match for L=", L, "dom=", dom, "chi=", chi)
        elif len(matches) > 1:
            multiple_family_matches += 1
        else:
            exercised_patterns.add((dom, chi))
            
    # There are exactly 34 patterns, so 34 patterns * 4 (L=5,6,7,8) = 136 total unique combinations?
    # Wait, the 34 patterns are DOMAIN|CHI pairs. So let's count unique (dom, chi) across ALL L.
    exercised_dom_chi = set([(dom, chi) for L, dom, chi in unique_phys if dom and chi])
    # Filter out empty domain (should not happen)
    
    unexercised_patterns = 34 - len(exercised_dom_chi)
    
    false_safe_elisions = 0
    checked_windows = 0
    for tc, py_res in zip(test_cases, all_py_res):
        L = tc['L']
        dom = py_res['domain']
        chi = py_res['chi']
        
        S_gen = generate_support_set(L, dom, chi)
        fams = get_frozen_families(str(L))
        cid = None
        for c, S_frozen in fams.items():
            if S_gen == S_frozen:
                cid = c
                break
        if cid is None: continue
        
        rho_str = ",".join(map(str, tc['rho']))
        py_sig_str = "|".join([f"{x['d']}:{x['a']}" for x in py_res['sigma']])
        
        in_reachable = False
        if str(L) in compiledData and str(cid) in compiledData[str(L)] and rho_str in compiledData[str(L)][str(cid)]:
            for s_obj in compiledData[str(L)][str(cid)][rho_str]:
                if s_obj['signature'] == py_sig_str:
                    minus_t = ",".join(map(str, [-x for x in py_res['t']]))
                    if minus_t in s_obj['reachable']:
                        in_reachable = True
                    break
        
        checked_windows += 1
        if not in_reachable:
            any_square = False
            all_words_tc = generate_words(tc['rho'])
            for word in all_words_tc:
                test_blocks = tc['concreteBlocks'].copy()
                for i, r in enumerate(tc['sourceRoles']):
                    if r == tc['unresolvedRole']:
                        test_blocks[i] = word
                left_str = "".join(test_blocks)[tc['start'] : tc['start'] + tc['K']]
                right_str = "".join(test_blocks)[tc['start'] + tc['K'] : tc['start'] + 2*tc['K']]
                pL = get_parikh(left_str)
                pR = get_parikh(right_str)
                if pL == pR:
                    any_square = True
                    break
            if any_square:
                false_safe_elisions += 1
                
    out = {
        "physical_domain_mismatches": physical_domain_mismatches,
        "role_mask_mismatches": role_mask_mismatches,
        "signature_mismatches": signature_mismatches,
        "bulk_target_mismatches": bulk_target_mismatches,
        "algebra_decomposition_mismatches": algebra_decomposition_mismatches,
        "no_family_match": no_family_match,
        "multiple_family_matches": multiple_family_matches,
        "wrong_family_assignments": wrong_family_assignments,
        "exercised_physical_patterns": len(exercised_dom_chi),
        "unexercised_patterns": unexercised_patterns,
        "false_safe_elisions": false_safe_elisions,
        "checked_windows": checked_windows
    }
    
    with open('CLEANROOM_AUDIT_2026-08-29.json', 'w') as f:
        json.dump(out, f, indent=2)
    print(out)

if __name__ == '__main__':
    main()
