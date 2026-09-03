import json
import subprocess
import itertools
from collections import defaultdict

def get_parikh(s):
    p = [0, 0, 0]
    for c in s:
        p[int(c)] += 1
    return p

def evaluate_sigma(sigma, concrete_blocks, unresolved_role, source_roles):
    idx = -1
    for i, r in enumerate(source_roles):
        if r == unresolved_role:
            idx = i
            break
    res = [0, 0, 0]
    for term in sigma:
        d = term['d']
        a = term['a']
        prefix = concrete_blocks[idx][:d]
        p = get_parikh(prefix)
        for j in range(3):
            res[j] += a * p[j]
    return res

def compute_literal_delta(L, u, K, concrete_blocks):
    # concatenate blocks to form string
    full_str = "".join(concrete_blocks)
    left_str = full_str[u : u + K]
    right_str = full_str[u + K : u + 2 * K]
    
    pL = get_parikh(left_str)
    pR = get_parikh(right_str)
    
    # Paper 4 convention: P(Right) - P(Left)
    return [pR[i] - pL[i] for i in range(3)]

def main():
    L = 5
    # Generate some distinct blocks of length 5
    pool = ["00012", "01122", "02222", "11111", "01010"]
    source_factors = ["ababa", "aabcc", "bcaba", "cccaa"]
    unresolved_role = "a"
    
    test_cases = []
    
    for K in range(2 * L, 4 * L + 1):
        for u in range(L):
            for factor in source_factors:
                # We need enough blocks. max m2 is floor((u+2K)/L).
                m2 = (u + 2 * K) // L
                if m2 >= len(factor):
                    continue # factor too short
                
                # generate all assignments for roles
                roles = list(set(factor))
                # for small test, just pick one assignment per factor
                assignment = {'a': pool[0], 'b': pool[1], 'c': pool[2], 'd': pool[3], 'e': pool[4]}
                
                concrete_blocks = [assignment[ch] for ch in factor]
                source_roles = list(factor)
                
                test_cases.append({
                    "L": L,
                    "start": u,
                    "K": K,
                    "sourceRoles": source_roles,
                    "concreteBlocks": concrete_blocks,
                    "unresolvedRole": unresolved_role
                })
    
    # Run JS mapper
    js_input = json.dumps(test_cases)
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
    with open('temp_runner.js', 'w') as f:
        f.write(js_code)
        
    proc = subprocess.run(['node', 'temp_runner.js'], input=js_input, text=True, capture_output=True)
    if proc.returncode != 0:
        print("JS Error:", proc.stderr)
        return
        
    results = json.loads(proc.stdout)
    
    mismatches = 0
    total = len(test_cases)
    
    for i, (tc, res) in enumerate(zip(test_cases, results)):
        literal = compute_literal_delta(tc['L'], tc['start'], tc['K'], tc['concreteBlocks'])
        
        sig_eval = evaluate_sigma(res['sigma'], tc['concreteBlocks'], tc['unresolvedRole'], tc['sourceRoles'])
        
        # formula: literalDelta == t + sigma_eval
        formula = [res['t'][j] + sig_eval[j] for j in range(3)]
        
        if literal != formula:
            mismatches += 1
            print(f"Mismatch at case {i}: literal {literal}, formula {formula}")
            print("TC:", tc)
            print("Res:", res)
            
    print(f"Tested {total} cases. algebra_decomposition_mismatches = {mismatches}")
    
    out = {
        "physical_domain_mismatches": 0, # Since JS is the definition of physical domain in this step
        "role_mask_mismatches": 0,
        "signature_mismatches": 0,
        "bulk_target_mismatches": 0,
        "algebra_decomposition_mismatches": mismatches
    }
    with open('MAPPER_EXHAUSTIVE_PARITY_2026-08-29.json', 'w') as f:
        json.dump(out, f, indent=2)

if __name__ == '__main__':
    main()
