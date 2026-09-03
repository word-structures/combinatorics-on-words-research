# Reproduction helper for Paper-6 profile pushforward audit.
# Requires p6_semantics_audit.py in the same directory.
from collections import defaultdict, Counter
from pathlib import Path
import importlib.util
import json

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("p6", HERE / "p6_semantics_audit.py")
p6 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(p6)

def colored_equitable(states, labels, B, color_func):
    states = sorted(states)
    colors = sorted(set(color_func(b) for b in B))
    ci = {c:i for i,c in enumerate(colors)}
    part = {s:0 for s in states}
    while True:
        nc = max(part.values()) + 1
        keys, new, nxt = {}, {}, 0
        for s in states:
            arr = [[0]*nc for _ in colors]
            for b,t in labels.get(s,{}).items():
                arr[ci[color_func(b)]][part[t]] += 1
            key = (part[s], tuple(tuple(row) for row in arr))
            if key not in keys:
                keys[key] = nxt
                nxt += 1
            new[s] = keys[key]
        if p6.same_partition(part,new,states):
            return new
        part = new

def main():
    B4 = p6.library(4)
    profiles = {(2,1,1),(1,2,1),(1,1,2)}
    B = [w for w in B4 if p6.parikh(w) in profiles]
    K = 4

    states, edges, labels, init = p6.build(B,K)
    right = p6.right_context(states,labels,B)
    prof = colored_equitable(states,labels,B,p6.parikh)
    cnt = p6.equitable(states,edges)
    Q,groups,rem = p6.quotient(states,edges,cnt)
    rank,coeff,_ = p6.krylov_exact_rank(Q)

    assert len(states) == 78
    assert len(set(right.values())) == 19
    assert len(set(prof.values())) == 16
    assert len(set(cnt.values())) == 5
    assert rank == 3
    assert Q == [
        [2,1,0,0,0],
        [2,0,0,0,0],
        [0,0,2,2,0],
        [0,0,1,0,0],
        [0,0,0,0,0],
    ]
    assert [int(x) for x in coeff] == [0,2,2]

    # Strict literal -> profile witness.
    s,t = "abbbaca","abcb"
    assert prof[s] == prof[t]
    assert right[s] != right[t]
    assert "bacc" in labels[s] and "bacc" not in labels[t]
    assert "abcc" not in labels[s] and "abcc" in labels[t]
    assert p6.parikh("bacc") == p6.parikh("abcc") == (1,1,2)
    assert prof[labels[s]["bacc"]] == prof[labels[t]["abcc"]]

    # Strict profile -> total-count witness.
    u,v = "aabc","aacb"
    assert cnt[u] == cnt[v]
    assert prof[u] != prof[v]
    cu = Counter(p6.parikh(b) for b in labels[u])
    cv = Counter(p6.parikh(b) for b in labels[v])
    assert cu != cv
    assert cu[(1,1,2)] == 2 and cu[(1,2,1)] == 1
    assert cv[(1,1,2)] == 1 and cv[(1,2,1)] == 2

    print("PASS")
    print("semantic ladder: 78 -> 19 -> 16 -> 5 -> 3")
    print("Q =", Q)
    print("recurrence: A[n+3] = 2*A[n+2] + 2*A[n+1]")

if __name__ == "__main__":
    main()
