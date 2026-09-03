#!/usr/bin/env python3
"""Paper-6 v2.4 descriptor-degeneracy replay.

Default:
  * rebuilds the Q2 mod-65521 future Krylov matrix from the sparse quotient;
  * rebuilds all 16 phase-anchor descriptors from the 218,298 raw histories;
  * compiles the shipped independent C++ finite-field rank implementation;
  * verifies the 15/16 exact-rank pattern;
  * verifies grid+phase full observability;
  * verifies the minimal 35-family phase repair.

Optional --exact-grid:
  * verifies the 652 rational grid-family relations against all 1179 exact
    integer future columns, proving rank_Q(grid) <= 1144.

Exact rational conclusions use the independently certified target dimension
1179 contained in P6_Q2_VECTOR_KRYLOV_EXACT_CERT_v0.1_2026-08-30.json.
"""
from pathlib import Path
import argparse, json, subprocess, tempfile
import numpy as np
from scipy.sparse import coo_matrix, csr_matrix, load_npz

ROOT=Path(__file__).resolve().parent
P=65521
DIM=1179

def recency_canon(s):
    order=[]
    for ch in reversed(s):
        if ch not in order:
            order.append(ch)
        if len(order)==3:
            break
    for ch in "abc":
        if ch not in order:
            order.append(ch)
    mp={order[i]:"abc"[i] for i in range(3)}
    return "".join(mp[c] for c in s)

def parikh(w):
    return (w.count("a"),w.count("b"),w.count("c"))

def window_label(t,a):
    bs=[t[i:i+4] for i in range(a,len(t),4) if i+4<=len(t)]
    ps=[parikh(b) for b in bs[-4:]]
    while len(ps)<4:
        ps.insert(0,None)
    return tuple(ps)

def build_Q():
    D=json.loads((ROOT/"P6_Q2_EQUITABLE_QUOTIENT_SPARSE_v0.1_2026-08-30.json").read_text())
    rows=D["rows"]; rr=[];cc=[];dd=[]
    for i,row in enumerate(rows):
        for j,w in row:
            rr.append(i);cc.append(j);dd.append(w)
    return csr_matrix((np.array(dd,dtype=np.int64),(rr,cc)),shape=(len(rows),len(rows))), rows

def build_V(Q):
    N=Q.shape[0]
    V=np.empty((N,DIM),dtype=np.int64)
    v=np.ones(N,dtype=np.int64)
    for h in range(DIM):
        V[:,h]=v
        v=np.asarray(Q.dot(v)).ravel()%P
    return V

def build_cpp():
    src=ROOT/"rank_mod_u16.cpp"
    exe=ROOT/"_rank_mod_u16_v24"
    subprocess.run(["g++","-O3","-std=c++17",str(src),"-o",str(exe)],check=True)
    return exe

def aggregation(labels,classes,N):
    mp={};g=np.empty(len(labels),dtype=np.int32)
    for i,x in enumerate(labels):
        if x not in mp:
            mp[x]=len(mp)
        g[i]=mp[x]
    G=coo_matrix((np.ones(len(g),dtype=np.int64),(g,classes)),shape=(len(mp),N)).tocsr()
    G.sum_duplicates()
    return G,len(mp),g

def cpp_rank(G,V,exe,tag):
    A=(np.asarray(G.dot(V),dtype=np.int64)%P).astype(np.uint16)
    with tempfile.NamedTemporaryFile(prefix=f"p6v24_{tag}_",suffix=".u16",delete=False) as f:
        fn=Path(f.name)
    try:
        A.tofile(fn)
        proc=subprocess.run([str(exe),str(fn),str(A.shape[0]),str(A.shape[1]),str(P)],
                            capture_output=True,text=True,check=True)
        return int(proc.stdout.strip().splitlines()[-1])
    finally:
        fn.unlink(missing_ok=True)

def exact_grid_relations(qrows):
    R=json.loads((ROOT/"P6_Q2_PROFILE_ONLY_ROW_RELATIONS_RECONSTRUCTED_v0.1_2026-08-30.json").read_text())
    piv=R["pivot_rows"];dep=R["dependent_rows"];rels=R["relations"]
    G=load_npz(ROOT/"P6_Q2_RECENCY_PROFILE_NO_BIT_GROUP_TO_QUOTIENT_v0.1_2026-08-30.npz").tocsr()
    rel_q=[]
    for j,rel in enumerate(rels):
        d={}
        terms=[(dep[j],rel["dependent_coefficient"])]+[
            (piv[pos],c) for pos,c in zip(rel["pivot_positions"],rel["pivot_coefficients"])
        ]
        for grow,c in terms:
            for kk in range(G.indptr[grow],G.indptr[grow+1]):
                q=int(G.indices[kk])
                d[q]=d.get(q,0)+int(G.data[kk])*int(c)
        rel_q.append({q:c for q,c in d.items() if c})
    Q=[[(int(j),int(w)) for j,w in row] for row in qrows]
    v=[1]*len(Q)
    for h in range(DIM):
        for ri,d in enumerate(rel_q):
            val=sum(c*v[q] for q,c in d.items())
            if val:
                raise AssertionError(f"exact grid relation failure relation={ri} h={h} residual={val}")
        if h<DIM-1:
            v=[sum(w*v[j] for j,w in row) for row in Q]
    return len(rel_q)

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--exact-grid",action="store_true")
    args=ap.parse_args()

    states=[x.decode("ascii").rstrip("\x00") for x in np.load(ROOT/"P6_Q2_RAW_STATES_S21.npy")]
    classes=np.load(ROOT/"P6_Q2_RAW_TO_EQUITABLE_CLASS_U16.npy").astype(np.int32)
    Q,qrows=build_Q()
    V=build_V(Q)
    exe=build_cpp()

    canon=[recency_canon(s) for s in states]
    phase=np.array([len(s)%4 for s in states],dtype=np.int8)
    labels_by_anchor=[[window_label(t,a) for t in canon] for a in range(4)]

    results=[]
    grid_ids=None
    for a0 in range(4):
        for a1 in range(4):
            labels=[labels_by_anchor[a1][i] if phase[i]==1 else labels_by_anchor[a0][i]
                    for i in range(len(states))]
            G,groups,gids=aggregation(labels,classes,Q.shape[0])
            r=cpp_rank(G,V,exe,f"a{a0}_{a1}")
            expected=1144 if (a0,a1)==(0,1) else 1179
            assert r==expected,(a0,a1,r,expected)
            results.append({"policy":[a0,a1],"groups":groups,"rank":r})
            if (a0,a1)==(0,1):
                grid_ids=gids.copy()
                grid_G=G

    # phase augmentation
    phase_labels=[(int(grid_ids[i]),int(phase[i])) for i in range(len(states))]
    Gp,gp,_=aggregation(phase_labels,classes,Q.shape[0])
    rp=cpp_rank(Gp,V,exe,"grid_phase")
    assert (gp,rp)==(3024,1179),(gp,rp)

    # minimal 35 selected phase splits
    sel=set(json.loads((ROOT/"P6_Q2_MINIMAL_35_PHASE_REFINEMENT_BASIS_MOD65521_v0.1_2026-08-30.json").read_text())
            ["selected_35_grid_family_ids"])
    min_labels=[(int(grid_ids[i]),int(phase[i]) if int(grid_ids[i]) in sel else 0)
                for i in range(len(states))]
    Gm,gm,_=aggregation(min_labels,classes,Q.shape[0])
    rm=cpp_rank(Gm,V,exe,"minimal35")
    assert (gm,rm)==(1831,1179),(gm,rm)

    exact_relations=None
    if args.exact_grid:
        exact_relations=exact_grid_relations(qrows)
        assert exact_relations==652

    out={
        "status":"PASS",
        "anchor_policies":results,
        "grid_plus_phase":{"groups":gp,"rank":rp},
        "minimal35":{"groups":gm,"rank":rm},
        "exact_grid_relations_verified":exact_relations
    }
    print(json.dumps(out,indent=2))

if __name__=="__main__":
    main()
