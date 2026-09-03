with open("run_cleanroom_audit.py", "r") as f:
    text = f.read()

import re
old_block = """    with open('../../claude-intake/_paper4-master-closure-2026-08-29/runs/sixdomain_full.json') as f:
        cat = json.load(f)['table']
        
    frozen_families = {}
    for row in cat:
        cid = row['classId']
        # The JS array contains empty strings for 0:0, we mapped them to "" in python too
        frozen_families[cid] = set(row['shapeSpectrum'])"""

new_block = """    def get_frozen_families(L_str):
        fams = {}
        if L_str in compiledData:
            for cid_str, rho_dict in compiledData[L_str].items():
                rho_key = list(rho_dict.keys())[0]
                S = set([obj['signature'] for obj in rho_dict[rho_key]])
                fams[int(cid_str)] = S
        return fams"""

text = text.replace(old_block, new_block)

old_loop = """        S_gen = generate_support_set(L, dom, chi)
        matches = []
        for cid, S_frozen in frozen_families.items():
            if S_gen == S_frozen:
                matches.append(cid)"""

new_loop = """        S_gen = generate_support_set(L, dom, chi)
        fams = get_frozen_families(str(L))
        matches = []
        for cid, S_frozen in fams.items():
            if S_gen == S_frozen:
                matches.append(cid)"""

text = text.replace(old_loop, new_loop)

old_loop2 = """        S_gen = generate_support_set(L, dom, chi)
        cid = None
        for c, S_frozen in frozen_families.items():
            if S_gen == S_frozen:
                cid = c
                break"""

new_loop2 = """        S_gen = generate_support_set(L, dom, chi)
        fams = get_frozen_families(str(L))
        cid = None
        for c, S_frozen in fams.items():
            if S_gen == S_frozen:
                cid = c
                break"""

text = text.replace(old_loop2, new_loop2)

with open("run_cleanroom_audit.py", "w") as f:
    f.write(text)
