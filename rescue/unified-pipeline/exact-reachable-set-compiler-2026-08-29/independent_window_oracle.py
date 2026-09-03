# independent_window_oracle.py
import json

def get_parikh(s):
    p = [0, 0, 0]
    for c in s:
        p[int(c)] += 1
    return p

def evaluate_sigma(sigma, concrete_blocks, unresolved_role, source_roles):
    # Find the block index that has the unresolved role
    # Assuming all blocks with unresolved role are IDENTICAL in audit mode
    # (Because they are projected from the same role)
    # We just need ONE instance to evaluate X_d.
    idx = -1
    for i, r in enumerate(source_roles):
        if r == unresolved_role:
            idx = i
            break
            
    if idx == -1 and len(sigma) > 0:
        raise Exception("Signature has terms but no unresolved block found")
        
    res = [0, 0, 0]
    for term in sigma:
        d = term['d']
        a = term['a']
        prefix = concrete_blocks[idx][:d]
        p = get_parikh(prefix)
        for j in range(3):
            res[j] += a * p[j]
    return res

def run_oracle():
    # We will generate test cases and pipe them to JS, or just implement both in JS.
    # To keep languages independent, we can read a JSON of test cases.
    pass

if __name__ == '__main__':
    run_oracle()
