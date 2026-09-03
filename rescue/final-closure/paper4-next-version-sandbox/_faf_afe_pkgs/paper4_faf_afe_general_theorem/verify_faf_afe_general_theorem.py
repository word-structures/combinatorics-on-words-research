#!/usr/bin/env python3
from collections import defaultdict
import argparse, json

def variable_cut(roleword, pos, L):
    q,u=divmod(pos,L)
    if q < len(roleword) and roleword[q]=="f" and 0<u<L:
        return u
    return None

def signature(roleword,s,K,L):
    coeff=defaultdict(int)
    for c,pos in ((1,s),(-2,s+K),(1,s+2*K)):
        j=variable_cut(roleword,pos,L)
        if j is not None:
            coeff[j]+=c
    return tuple(sorted((j,c) for j,c in coeff.items() if c))

def signature_set(roleword,L,kmax):
    return {signature(roleword,s,K,L)
            for K in range(2,kmax+1)
            for s in range(3*L-2*K+1)}

def midpoint_family(L):
    out=set()
    for i in range(1,L):
        for j in range(i,L):
            if (i-j)%2==0:
                out.add(((i,2),) if i==j else ((i,1),(j,1)))
    return out

def primal_edges(signatures):
    edges=set()
    for sig in signatures:
        ds=[j for j,c in sig]
        for a in range(len(ds)):
            for b in range(a+1,len(ds)):
                i,j=ds[a],ds[b]
                edges.add((min(i,j),max(i,j)))
    return edges

def check_L(L):
    if L<4:
        raise ValueError("L must be at least 4.")
    afe=signature_set("afe",L,L)
    faf=signature_set("faf",L,(3*L)//2)
    mid=midpoint_family(L)
    free_pairs={(i,j) for i in range(1,L) for j in range(i+1,L)}
    adjacent={(i,i+1) for i in range(1,L-1)}
    ae=primal_edges(afe); fe=primal_edges(faf)
    odd=sum(i%2 for i in range(1,L)); even=(L-1)-odd
    midpoint_count=odd*(odd+1)//2+even*(even+1)//2
    out={
        "L":L,
        "AFE_signatures":len(afe),
        "FAF_signatures":len(faf),
        "AFE_subset_FAF":afe<=faf,
        "FAF_minus_AFE_equals_midpoint":faf-afe==mid,
        "midpoint_count":len(mid),
        "floor_L2_over_4":L*L//4,
        "midpoint_disjoint_AFE":mid.isdisjoint(afe),
        "same_affine_primal_graph":ae==fe,
        "AFE_edges_are_all_nonadjacent_pairs":ae==free_pairs-adjacent,
        "unit_steps_complete_K_Lminus1":(ae|adjacent)==free_pairs,
        "treewidth_with_unit_steps":L-2,
    }
    assert out["AFE_subset_FAF"]
    assert out["FAF_minus_AFE_equals_midpoint"]
    assert out["midpoint_count"]==midpoint_count==out["floor_L2_over_4"]
    assert out["midpoint_disjoint_AFE"]
    assert out["same_affine_primal_graph"]
    assert out["AFE_edges_are_all_nonadjacent_pairs"]
    assert out["unit_steps_complete_K_Lminus1"]
    return out

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--L",type=int)
    ap.add_argument("--range",nargs=2,type=int,metavar=("LO","HI"))
    args=ap.parse_args()
    if args.L is not None:
        print(json.dumps(check_L(args.L),indent=2)); return
    lo,hi=(4,200) if args.range is None else args.range
    rec=[check_L(L) for L in range(lo,hi+1)]
    print(json.dumps({"range":[lo,hi],"all_pass":True,"count":len(rec),"records":rec},indent=2))

if __name__=="__main__":
    main()
