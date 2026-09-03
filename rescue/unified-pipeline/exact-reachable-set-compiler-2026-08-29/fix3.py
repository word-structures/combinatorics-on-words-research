with open("run_cleanroom_audit.py", "r") as f:
    text = f.read()

old_algebra = """        left_str = "".join(tc['concreteBlocks'])[tc['start'] : tc['start'] + tc['K']]
        right_str = "".join(tc['concreteBlocks'])[tc['start'] + tc['K'] : tc['start'] + 2*tc['K']]
        pL = get_parikh(left_str)
        pR = get_parikh(right_str)"""

new_algebra = """        test_blocks = tc['concreteBlocks'].copy()
        for i, r in enumerate(tc['sourceRoles']):
            if r == tc['unresolvedRole']:
                test_blocks[i] = all_words[0]
        left_str = "".join(test_blocks)[tc['start'] : tc['start'] + tc['K']]
        right_str = "".join(test_blocks)[tc['start'] + tc['K'] : tc['start'] + 2*tc['K']]
        pL = get_parikh(left_str)
        pR = get_parikh(right_str)
        tc['concreteBlocks'] = test_blocks"""

text = text.replace(old_algebra, new_algebra)

with open("run_cleanroom_audit.py", "w") as f:
    f.write(text)
