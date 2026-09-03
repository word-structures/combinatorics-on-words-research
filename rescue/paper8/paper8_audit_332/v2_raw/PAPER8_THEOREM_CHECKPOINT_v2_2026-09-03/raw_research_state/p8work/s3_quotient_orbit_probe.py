import numpy as np, itertools, json, sys
pid=int(sys.argv[1]); Q=np.load(f'/mnt/data/h8cp/quotient_pid{pid}.npz'); cls=Q['cls']; rep=Q['rep']; K=len(Q['sizes'])
D=np.load('/mnt/data/H8_PROFILE_RESPONSE_CHECKPOINT_v3_2026-09-02/data/H8_L7_LIFTED_GRAPH_CHECKPOINT.npz');states=D['states'];giant=D['giant_global'];codes=states[giant]
# map ternary code -> local giant index
maxcode=int(states.max())+1; idx=np.full(maxcode,-1,dtype=np.int32); idx[codes]=np.arange(len(codes),dtype=np.int32)
def perm_code(code,p,n=15):
 digs=[0]*n
 for k in range(n-1,-1,-1):digs[k]=code%3;code//=3
 z=0
 for a in digs:z=3*z+p[a]
 return z
perms=list(itertools.permutations([0,1,2]))
# class maps under perms
maps=[]
for p in perms:
 mp=np.empty(K,dtype=np.int32)
 for c,i in enumerate(rep):
  pc=perm_code(int(codes[i]),p);j=idx[pc]
  if j<0:raise RuntimeError('permuted state not giant')
  mp[c]=cls[j]
 # verify representative-independence by random/sample full vectorized slower; sample first member each enough plus partition symmetry expected
 maps.append(mp)
# orbit union
seen=np.zeros(K,bool);orbits=[]
for c in range(K):
 if seen[c]:continue
 orb=sorted(set(int(mp[c]) for mp in maps));
 # close (should already)
 changed=True
 while changed:
  changed=False
  for z in list(orb):
   for mp in maps:
    w=int(mp[z])
    if w not in orb:orb.append(w);changed=True
  orb=sorted(set(orb))
 seen[orb]=True;orbits.append(orb)
sizes=[len(o) for o in orbits]
out={'pid':pid,'profile':Q['profile'].tolist(),'quotient_states':K,'s3_orbits':len(orbits),'orbit_size_counts':{str(s):sizes.count(s) for s in sorted(set(sizes))},'free_orbits':sum(s==6 for s in sizes)}
print(json.dumps(out,indent=2));open(f'/mnt/data/h8cp/s3_orbit_meta_pid{pid}.json','w').write(json.dumps(out,indent=2))
np.savez_compressed(f'/mnt/data/h8cp/s3_orbits_pid{pid}.npz',maps=np.stack(maps),orbit_id=np.concatenate([np.full(len(o),j,dtype=np.int32) for j,o in enumerate(orbits)]) if False else np.array([]))
