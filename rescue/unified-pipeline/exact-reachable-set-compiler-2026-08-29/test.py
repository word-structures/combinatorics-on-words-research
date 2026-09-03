import json
with open('../../claude-intake/_paper4-master-closure-2026-08-29/runs/sixdomain_full.json') as f:
    cat = json.load(f)['table']
print(cat[0])
