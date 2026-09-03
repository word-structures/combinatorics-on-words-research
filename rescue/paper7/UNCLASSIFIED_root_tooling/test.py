import json
labels = json.load(open('scratch/claude-intake/paper6/checkpoint_v2.6/P6_Q2_RECENCY_PROFILE_ONEBIT_LABELS_v0.1_2026-08-30.json'))
no_bit_seen = {}
for i, l in enumerate(labels):
    # l looks like: "(((3, 1, 0), (3, 0, 1), (3, 1, 0), (2, 2, 0)), 1)"
    # parse it:
    import ast
    parsed = ast.literal_eval(l)
    no_bit = parsed[0]
    if no_bit not in no_bit_seen:
        no_bit_seen[no_bit] = len(no_bit_seen)

print("Unique NO_BIT groups:", len(no_bit_seen))
