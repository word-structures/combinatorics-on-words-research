with open("run_cleanroom_audit.py", "r") as f:
    text = f.read()

text = text.replace("if literal_delta != formula: algebra_decomposition_mismatches += 1", """if literal_delta != formula:
            algebra_decomposition_mismatches += 1
            if algebra_decomposition_mismatches == 1:
                print("Mismatch! L=", tc['L'], "u=", tc['start'], "K=", tc['K'])
                print("Roles:", tc['sourceRoles'])
                print("Blocks:", tc['concreteBlocks'])
                print("lit:", literal_delta, "form:", formula)
                print("t:", py_res['t'], "sig:", py_res['sigma'])
                print("sig_eval:", sig_eval)""")

with open("run_cleanroom_audit.py", "w") as f:
    f.write(text)
