from itertools import product
from collections import defaultdict, deque, Counter
import json, csv, math
from fractions import Fraction
import sys
sys.setrecursionlimit(20000)

ALPH='abc'
FORBID4={"abbc","accb","baac","bcca","caab","cbba"}


def parikh(s):
    return tuple(s.count(c) for c in ALPH)

def safe_cutoff(s,K):
    if any(f in s for f in FORBID4):
        return False
    n=len(s)
    for k in range(2,min(K,n//2)+1):
        for i in range(n-2*k+1):
            a=s[i:i+k]; b=s[i+k:i+2*k]
            if parikh(a)==parikh(b):
                return False
    return True

def library(L):
    return [''.join(x) for x in product(ALPH, repeat=L) if safe_cutoff(''.join(x), L//2)]

def build(B,K):
    mem=max(2*K-1,3)
    init={w[-mem:] for w in B}
    seen=set(init); q=deque(init)
    edges=defaultdict(lambda: defaultdict(int)); labels=defaultdict(dict)
    while q:
        s=q.popleft()
        for b in B:
            z=s+b
            if not safe_cutoff(z,K):
                continue
            t=z[-mem:]
            edges[s][t]+=1
            labels[s][b]=t
            if t not in seen:
                seen.add(t); q.append(t)
    return seen,edges,labels,init

def same_partition(p,q,states):
    sigp={}; sigq={}
    # canonicalize by ordered state list
    mp={}; mq={}; np=nq=0
    cp=[]; cq=[]
    for s in states:
        if p[s] not in mp: mp[p[s]]=np; np+=1
        if q[s] not in mq: mq[q[s]]=nq; nq+=1
        cp.append(mp[p[s]]); cq.append(mq[q[s]])
    return cp==cq

def equitable(states,edges):
    states=sorted(states); part={s:0 for s in states}
    while True:
        nc=max(part.values())+1
        keys={}; new={}; nxt=0
        for s in states:
            v=[0]*nc
            for t,w in edges.get(s,{}).items(): v[part[t]]+=w
            key=(part[s],tuple(v))
            if key not in keys: keys[key]=nxt; nxt+=1
            new[s]=keys[key]
        if same_partition(part,new,states): return new
        part=new

def count_horizon_to_target(states,edges,target,maxh=1000):
    states=sorted(states); v={s:1 for s in states}; sig={s:[1] for s in states}
    hist=[]
    for h in range(maxh+1):
        keys={}; p={}; nxt=0
        for s in states:
            key=tuple(sig[s])
            if key not in keys: keys[key]=nxt; nxt+=1
            p[s]=keys[key]
        hist.append(nxt)
        if same_partition(p,target,states): return h,hist
        nv={s:sum(w*v[t] for t,w in edges.get(s,{}).items()) for s in states}
        v=nv
        for s in states: sig[s].append(v[s])
    return None,hist

def right_context(states,labels,B):
    DEAD=None; states=sorted(states); allst=states+[DEAD]
    part={s:(1 if s is DEAD else 0) for s in allst}
    while True:
        keys={}; new={}; nxt=0
        for s in allst:
            if s is DEAD:
                key=(1, tuple(part[DEAD] for _ in B))
            else:
                key=(0, tuple(part[labels.get(s,{}).get(b,DEAD)] for b in B))
            if key not in keys: keys[key]=nxt; nxt+=1
            new[s]=keys[key]
        if same_partition(part,new,allst):
            part=new; break
        part=new
    # living only canonical
    mp={}; out={}; nxt=0
    for s in states:
        c=part[s]
        if c not in mp: mp[c]=nxt; nxt+=1
        out[s]=mp[c]
    return out

def tarjan(states,edges):
    idx=0; stack=[]; on=set(); I={}; L={}; comps=[]
    def go(v):
        nonlocal idx
        I[v]=L[v]=idx; idx+=1; stack.append(v); on.add(v)
        for w in edges.get(v,{}):
            if w not in I: go(w); L[v]=min(L[v],L[w])
            elif w in on: L[v]=min(L[v],I[w])
        if L[v]==I[v]:
            c=[]
            while True:
                w=stack.pop(); on.remove(w); c.append(w)
                if w==v: break
            comps.append(c)
    for s in states:
        if s not in I: go(s)
    return comps

def recurrent(states,edges):
    out=set()
    for c in tarjan(states,edges):
        if len(c)>1: out.update(c)
        elif c[0] in edges.get(c[0],{}): out.add(c[0])
    return out

def quotient(states,edges,part):
    groups=defaultdict(list)
    for s,c in part.items(): groups[c].append(s)
    cs=sorted(groups); rem={c:i for i,c in enumerate(cs)}; q=len(cs)
    Q=[[0]*q for _ in range(q)]
    for c in cs:
        reps=groups[c]; base=None
        for s in reps:
            row=[0]*q
            for t,w in edges.get(s,{}).items(): row[rem[part[t]]]+=w
            if base is None: base=row
            elif row!=base: raise AssertionError('not equitable')
        Q[rem[c]]=base
    return Q,groups,rem

def matvec(Q,v):
    return [sum(a*b for a,b in zip(row,v)) for row in Q]

def mod_rank_and_pivots(A,p):
    if not A: return 0,[],[]
    M=[[x%p for x in row] for row in A]
    m=len(M); n=len(M[0]); r=0; prow=[]; pcol=[]
    for c in range(n):
        piv=next((i for i in range(r,m) if M[i][c]),None)
        if piv is None: continue
        M[r],M[piv]=M[piv],M[r]
        inv=pow(M[r][c],p-2,p)
        M[r]=[(x*inv)%p for x in M[r]]
        for i in range(m):
            if i!=r and M[i][c]:
                f=M[i][c]
                M[i]=[(M[i][j]-f*M[r][j])%p for j in range(n)]
        prow.append(r); pcol.append(c); r+=1
        if r==m: break
    return r,prow,pcol

def det_bareiss(A):
    A=[list(map(int,row)) for row in A]; n=len(A)
    if n==0: return 1
    sign=1; prev=1
    for k in range(n-1):
        if A[k][k]==0:
            sw=next((i for i in range(k+1,n) if A[i][k]!=0),None)
            if sw is None: return 0
            A[k],A[sw]=A[sw],A[k]; sign*=-1
        piv=A[k][k]
        for i in range(k+1,n):
            for j in range(k+1,n):
                A[i][j]=(A[i][j]*piv-A[i][k]*A[k][j])//prev
        prev=piv
        for i in range(k+1,n): A[i][k]=0
        for j in range(k+1,n): A[k][j]=A[k][j]
    return sign*A[n-1][n-1]

def solve_fraction(A,b):
    n=len(A); M=[[Fraction(x) for x in A[i]]+[Fraction(b[i])] for i in range(n)]
    for c in range(n):
        piv=next(i for i in range(c,n) if M[i][c])
        M[c],M[piv]=M[piv],M[c]
        z=M[c][c]; M[c]=[x/z for x in M[c]]
        for i in range(n):
            if i!=c and M[i][c]:
                f=M[i][c]; M[i]=[M[i][j]-f*M[c][j] for j in range(n+1)]
    return [M[i][-1] for i in range(n)]

def krylov_exact_rank(Q):
    q=len(Q); vecs=[]; v=[1]*q
    for _ in range(q+1):
        vecs.append(v); v=matvec(Q,v)
    # K rows q, cols q
    K=[[vecs[j][i] for j in range(q)] for i in range(q)]
    primes=[1000000007,1000000009,998244353]
    ranks=[mod_rank_and_pivots(K,p)[0] for p in primes]
    r=max(ranks)
    # lower bound: find independent rows of first r columns modulo a prime with rank r
    A0=[[vecs[j][i] for j in range(r)] for i in range(q)]
    # select independent rows via transpose pivot columns
    Rt=[list(col) for col in zip(*A0)]
    rr,_,rowidx=mod_rank_and_pivots(Rt,primes[ranks.index(r)])
    rowidx=rowidx[:r]
    minor=[[A0[i][j] for j in range(r)] for i in rowidx]
    det=det_bareiss(minor)
    if det==0: raise AssertionError('failed exact lower-bound minor')
    # upper bound: solve v_r combination using same rows and verify all coordinates
    coeff=solve_fraction(minor,[vecs[r][i] for i in rowidx])
    for i in range(q):
        if sum(coeff[j]*vecs[j][i] for j in range(r)) != vecs[r][i]:
            raise AssertionError('candidate Krylov relation failed')
    return r, coeff, ranks

def initial_alpha(B,mem,part,rem):
    a=[0]*len(rem)
    for b in B:
        s=b[-mem:]
        a[rem[part[s]]]+=1
    return a

def scalar_rank_exact(Q,alpha):
    q=len(Q); v=[1]*q; seq=[]
    # s_n = alpha^T Q^n 1, enough through 2q+r; generate 3q+2
    for _ in range(3*q+3):
        seq.append(sum(alpha[i]*v[i] for i in range(q)))
        v=matvec(Q,v)
    H=[[seq[i+j] for j in range(q)] for i in range(q)]
    primes=[1000000007,1000000009,998244353]
    ranks=[mod_rank_and_pivots(H,p)[0] for p in primes]
    r=max(ranks); p=primes[ranks.index(r)]
    # A[n,i] = seq[n+i], n=0..q-1, i=0..r-1
    A=[[seq[n+i] for i in range(r)] for n in range(q)]
    Rt=[list(col) for col in zip(*A)]
    rr,_,rowidx=mod_rank_and_pivots(Rt,p); rowidx=rowidx[:r]
    minor=[[A[n][i] for i in range(r)] for n in rowidx]
    det=det_bareiss(minor)
    if det==0: raise AssertionError('scalar lower minor zero')
    coeff=solve_fraction(minor,[seq[n+r] for n in rowidx])
    # verify q consecutive error terms; then Cayley-Hamilton of Q propagates forever
    for n in range(q):
        if sum(coeff[i]*seq[n+i] for i in range(r)) != seq[n+r]:
            raise AssertionError('scalar recurrence failed')
    return r,coeff,ranks,seq[:min(12,len(seq))]

def audit(name,B,K):
    states,edges,labels,init=build(B,K)
    eq=equitable(states,edges)
    rc=right_context(states,labels,B)
    rec=recurrent(states,edges)
    h,hist=count_horizon_to_target(states,edges,eq)
    Q,groups,rem=quotient(states,edges,eq)
    rk,_,rkmods=krylov_exact_rank(Q)
    alpha=initial_alpha(B,max(2*K-1,3),eq,rem)
    rs,_,rsmods,seq=scalar_rank_exact(Q,alpha)
    return {
        'library':name,'Kmax':K,'block_count':len(B),'raw_states':len(states),
        'recurrent_states':len(rec),'right_context_classes':len(set(rc.values())),
        'equitable_classes':len(set(eq.values())),'count_classes':len(set(eq.values())),
        'count_prefix_horizon_certifying_equality_with_equitable':h,
        'count_prefix_class_history':hist,
        'krylov_rank_exact':rk,'scalar_hankel_rank_exact':rs,
        'krylov_modular_crosschecks':rkmods,'scalar_modular_crosschecks':rsmods,
        'assembly_counts_A1_onward_sample':seq,
        'distinct_graph_edges':sum(len(d) for d in edges.values()),
        'weighted_label_transitions':sum(sum(d.values()) for d in edges.values())
    }

def main():
    B4=library(4)
    Bbal=[w for w in B4 if parikh(w) in {(2,1,1),(1,2,1),(1,1,2)}]
    datasets=[('BAL3_L4_AA2FR',Bbal,range(2,7)),('ALL_L4_AA2FR',B4,range(2,7))]
    B5=library(5)
    datasets.append(('ALL_L5_AA2FR',B5,range(2,5)))
    out=[]
    for name,B,Ks in datasets:
        print(name,'blocks',len(B),flush=True)
        for K in Ks:
            print(' K',K,flush=True)
            r=audit(name,B,K); out.append(r); print(r,flush=True)
    with open('/mnt/data/P6_SEMANTICS_AUDIT_RESULTS.json','w') as f: json.dump(out,f,indent=2)
    fields=list(out[0].keys())
    with open('/mnt/data/P6_SEMANTICS_AUDIT_RESULTS.csv','w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=fields); w.writeheader(); w.writerows(out)

if __name__=='__main__': main()
