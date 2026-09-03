with open("run_cleanroom_audit.py", "r") as f:
    text = f.read()

text = text.replace("if len(matches) == 0:\n            no_family_match += 1", """if len(matches) == 0:
            no_family_match += 1
            print("No match for L=", L, "dom=", dom, "chi=", chi)""")

with open("run_cleanroom_audit.py", "w") as f:
    f.write(text)
