with open("run_cleanroom_audit.py", "r") as f:
    text = f.read()

old_filter = """    filtered_tuples = []
    for u, v, w in tuples:
        is_p_plus = (u == L - 2 and v == L - 1 and w == 0)
        is_p_minus = (u == L - 1 and v == 0 and w == 1)
        if (is_p_plus or is_p_minus) and chi_str == "110":
            continue
        filtered_tuples.append((u, v, w))
        
    for u, v, w in filtered_tuples:"""

new_filter = """    for u, v, w in tuples:"""

text = text.replace(old_filter, new_filter)

with open("run_cleanroom_audit.py", "w") as f:
    f.write(text)
