with open("run_cleanroom_audit.py", "r") as f:
    text = f.read()

import re

# We will define rho based on L inside the loop
old_rho_decl = """    unresolvedRole = 'a'
    rho = [2, 1, 2]
    all_words = generate_words(rho)
    
    test_cases = []
    for L in range(5, 9):"""

new_rho_decl = """    unresolvedRole = 'a'
    
    test_cases = []
    for L in range(5, 9):
        if L == 5: rho = [2, 1, 2]
        elif L == 6: rho = [2, 2, 2]
        elif L == 7: rho = [3, 2, 2]
        elif L == 8: rho = [3, 3, 2]
        all_words = generate_words(rho)
"""

text = text.replace(old_rho_decl, new_rho_decl)

# Also need to update the all_words used in the test case loop
old_algebra = """        test_blocks = tc['concreteBlocks'].copy()
        for i, r in enumerate(tc['sourceRoles']):
            if r == tc['unresolvedRole']:
                test_blocks[i] = all_words[0]"""

new_algebra = """        test_blocks = tc['concreteBlocks'].copy()
        rho_tc = tc['rho']
        all_words_tc = generate_words(rho_tc)
        for i, r in enumerate(tc['sourceRoles']):
            if r == tc['unresolvedRole']:
                test_blocks[i] = all_words_tc[0]"""

text = text.replace(old_algebra, new_algebra)

old_check = """            any_square = False
            for word in all_words:"""

new_check = """            any_square = False
            all_words_tc = generate_words(tc['rho'])
            for word in all_words_tc:"""

text = text.replace(old_check, new_check)

with open("run_cleanroom_audit.py", "w") as f:
    f.write(text)
