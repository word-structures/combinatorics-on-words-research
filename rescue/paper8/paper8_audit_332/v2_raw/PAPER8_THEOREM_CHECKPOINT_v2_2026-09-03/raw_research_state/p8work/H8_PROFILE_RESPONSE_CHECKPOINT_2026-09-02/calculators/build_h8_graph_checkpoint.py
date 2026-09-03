import numpy as np, time, json
from scipy.sparse import csr_matrix
from scipy.sparse.csgraph import connected_components
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'data'
OUT.mkdir(exist_ok=True)
H=8; KMAX=7; M=15; RAW=3**M; POW=3**(M-1)

def bad_suffix(w):
    n=len(w)
    for k in range(2,min(KMAX,n//2)+1):
        ca=[0,0,0]; cb=[0,0,0]
        for x in w[n-2*k:n-k]: ca[x]+=1
        for x in w[n-k:n]: cb[x]+=1
        if ca==cb:return True
    return False
states=[]; w=[]
def dfs(d,code):
    if d==M:
        states.append(code); return
    for s in range(3):
        w.append(s)
        if not bad_suffix(w): dfs(d+1,code*3+s)
        w.pop()

def decode(code,n):
    a=[0]*n
    for i in range(n-1,-1,-1): a[i]=code%3; code//=3
    return a

t=time.time();dfs(0,0);print('states',len(states),'sec',time.time()-t,flush=True)
states=np.asarray(states,dtype=np.int32)
idx=np.full(RAW,-1,dtype=np.int32); idx[states]=np.arange(len(states),dtype=np.int32)
rows=[]; cols=[]; target_profile=[]
prof_counts_all={}
for i,code in enumerate(states.tolist()):
    suffix=code%POW
    base15=None
    for s in range(3):
        nc=suffix*3+s; j=int(idx[nc])
        if j<0: continue
        rows.append(i); cols.append(j)
        # K=8 target test on the 16-word code + s
        if base15 is None: base15=decode(code,M)
        ww=base15+[s]
        c1=[0,0,0]; c2=[0,0,0]
        for x in ww[:H]: c1[x]+=1
        for x in ww[H:]: c2[x]+=1
        if c1==c2:
            p=tuple(sorted(c1,reverse=True))
            target_profile.append(p)
            prof_counts_all[p]=prof_counts_all.get(p,0)+1
        else:
            target_profile.append(None)
rows=np.asarray(rows,dtype=np.int32); cols=np.asarray(cols,dtype=np.int32)
A=csr_matrix((np.ones(len(rows),dtype=np.int8),(rows,cols)),shape=(len(states),len(states)))
nscc,labels=connected_components(A,directed=True,connection='strong',return_labels=True)
sizes=np.bincount(labels,minlength=nscc)
gid=int(np.argmax(sizes)); giant=np.flatnonzero(labels==gid).astype(np.int32)
mask=(labels[rows]==gid)&(labels[cols]==gid)
grows=rows[mask]; gcols=cols[mask]
# local remap
remap=np.full(len(states),-1,dtype=np.int32); remap[giant]=np.arange(len(giant),dtype=np.int32)
lu=remap[grows]; lv=remap[gcols]
# profiles internal to giant
prof_g={}; prof_edge_codes=[]
for keep,p in zip(np.flatnonzero(mask).tolist(), [target_profile[k] for k in np.flatnonzero(mask)]):
    if p is not None: prof_g[p]=prof_g.get(p,0)+1
# encode profile id 0 none, 1.. sorted
profiles=sorted(prof_g)
pid={p:i+1 for i,p in enumerate(profiles)}
edge_pid=np.zeros(len(lu),dtype=np.int8)
orig_idxs=np.flatnonzero(mask)
for z,k in enumerate(orig_idxs.tolist()):
    p=target_profile[k]
    if p is not None: edge_pid[z]=pid[p]
np.savez_compressed(OUT/'H8_L7_LIFTED_GRAPH_CHECKPOINT.npz',
    states=states, giant_global=giant, u=lu, v=lv, edge_profile_id=edge_pid,
    profiles=np.asarray(profiles,dtype=np.int8))
meta={
 'h':H,'memory':M,'raw_states':RAW,'valid_states':int(len(states)),
 'all_edges':int(len(rows)),'scc_count':int(nscc),'giant_states':int(len(giant)),
 'giant_edges':int(len(lu)),'profile_counts_all':{','.join(map(str,k)):v for k,v in prof_counts_all.items()},
 'profile_counts_giant':{','.join(map(str,k)):v for k,v in prof_g.items()},
 'profiles': [list(p) for p in profiles]
}
(OUT/'GRAPH_CHECKPOINT_META.json').write_text(json.dumps(meta,indent=2))
print(json.dumps(meta,indent=2),flush=True)
