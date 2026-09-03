#!/usr/bin/env python3
from pathlib import Path
import json, numpy as np
ROOT=Path(__file__).resolve().parents[1]
meta=json.loads((ROOT/'data/GRAPH_CHECKPOINT_META.json').read_text())
assert meta['valid_states']==120084
assert meta['scc_count']==15565
assert meta['giant_states']==104520
assert meta['giant_edges']==184200
assert meta['profile_counts_giant']=={'5,2,1':72,'4,2,2':516,'4,3,1':480,'3,3,2':4434}
D=np.load(ROOT/'data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz')
assert len(D['giant_global'])==104520
assert len(D['u'])==184200
res=json.loads((ROOT/'data/H8_RESOLVENT_SOFT_DERIVATIVES.json').read_text())
assert abs(res['lambda']-1.7776384757455823)<1e-12
assert abs(res['V16']-1.862298121616395)<1e-12
for z in res['profiles']:
    assert abs(z['Gamma']) < abs(z['local'])
fd=json.loads((ROOT/'data/H8_SOFT_DERIVATIVE_FINITE_DIFFERENCE_CHECK_ALL.json').read_text())
assert max(z['abs_diff'] for z in fd)<1e-9
print('CHECKPOINT_VERIFICATION = PASS')
