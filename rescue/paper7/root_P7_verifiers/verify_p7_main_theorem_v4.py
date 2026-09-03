#!/usr/bin/env python3
from itertools import product
from collections import defaultdict

ALPH='abcd'
C='abacabadcdb'
s='abacabadc'
G={
'a':'abcacdcbcdcadcdbdabacabadbabcbdbcbacbcdcacbabdabacadcbcdcacdbcbacbcdcacdcbdcdadbdcbca',
'b':'bcdbdadcdadbadacabcbdbcbacbcdcacdcbdcdadbdcbcabcbdbadcdadbdacdcbdcdadbdadcadabacadcdb',
'c':'cdacabadabacbabdbcdcacdcbdcdadbdadcadabacadcdbcdcacbadabacabdadcadabacabadbabcbdbadac',
'd':'dabdbcbabcbdcbcacdadbdadcadabacabadbabcbdbadacdadbdcbabcbdbcabadbabcbdbcbacbcdcacbabd'
}
DET=43435
ADJ=[[-701,-2316,4059,-531],[-531,-701,-2316,4059],[4059,-531,-701,-2316],[-2316,4059,-531,-701]]

def par(w):
    return tuple(w.count(c) for c in ALPH)

def add(a,b): return tuple(x+y for x,y in zip(a,b))
def sub(a,b): return tuple(x-y for x,y in zip(a,b))

def solve_row(y):
    # x M = y, with M the 4x4 incidence matrix of G (rows Parikh(G(letter))).
    nums=[]
    for j in range(4):
        n=sum(y[i]*ADJ[i][j] for i in range(4))
        if n%DET: return None
        nums.append(n//DET)
    return tuple(nums)

def first_square(w):
    n=len(w)
    pref=[[0,0,0,0] for _ in range(n+1)]
    for i,ch in enumerate(w):
        pref[i+1]=pref[i].copy(); pref[i+1][ALPH.index(ch)]+=1
    for i in range(n):
        for K in range(1,(n-i)//2+1):
            p1=tuple(pref[i+K][t]-pref[i][t] for t in range(4))
            p2=tuple(pref[i+2*K][t]-pref[i+K][t] for t in range(4))
            if p1==p2:
                return i,K,w[i:i+K],w[i+K:i+2*K],p1
    return None

def morph(w): return ''.join(G[c] for c in w)

# Direct residual-state semantics used in the repaired proof:
# R(q,x,y) occurs in V iff V=A x B y D with Parikh(A)-Parikh(B)=q.
def residual_occurrences(w,Q,limit=1):
    n=len(w)
    pref=[(0,0,0,0)]*(n+1)
    cur=[0,0,0,0]
    for i,ch in enumerate(w):
        cur=cur.copy(); cur[ALPH.index(ch)]+=1; pref[i+1]=tuple(cur)
    positions={c:defaultdict(list) for c in ALPH}
    for k,ch in enumerate(w): positions[ch][pref[k]].append(k)
    import bisect
    unit={c:tuple(1 if t==ALPH.index(c) else 0 for t in range(4)) for c in ALPH}
    out=[]
    for q,x,y in Q:
        for j,ch in enumerate(w):
            if ch!=x: continue
            # q=P(A)-P(B)=2*pref[j]+e_x-pref[k]
            target=tuple(2*pref[j][t]+unit[x][t]-q[t] for t in range(4))
            lst=positions[y].get(target)
            if not lst: continue
            z=bisect.bisect_right(lst,j)
            if z<len(lst):
                out.append((q,x,y,j,lst[z]))
                if len(out)>=limit: return out
    return out

# Incidence sanity.
assert all(len(G[c])==85 for c in ALPH)
M=[par(G[c]) for c in ALPH]
assert M==[(19,21,27,18),(18,19,21,27),(27,18,19,21),(21,27,18,19)]

# 1. Human-checkable negative half.
assert first_square(s) is None
left=[]
for c in ALPH:
    sq=first_square(c+s)
    assert sq is not None
    left.append((c,sq))

# 2. Seed reduction: any crossing square with half-length >=85 produces one of these
# source residual states. We intentionally over-enumerate algebraically possible alignments;
# over-enumeration is safe for completeness.
pC=par(C)
Q=set()
seed_rows=[]
for i in range(len(C)):
    c_suffix=par(C[i:])
    for x in ALPH:
      gx=G[x]
      for r in range(85):
        Uend=par(gx[:r]); Vstart=par(gx[r:])
        for y in ALPH:
          gy=G[y]
          for t in range(86):  # t=85 covers a possible final block-boundary endpoint
            Vend=par(gy[:t])
            len_diff=(len(C)-i)+r-(85-r)-t
            if len_diff%85: continue
            rhs=tuple(Vstart[k]+Vend[k]-c_suffix[k]-Uend[k] for k in range(4))
            q=solve_row(rhs)
            if q is None: continue
            if sum(q)!=-len_diff//85: continue
            Q.add((q,x,y)); seed_rows.append((i,x,r,y,t,q))

assert len(seed_rows)==99, len(seed_rows)
assert not any(row[4]==85 for row in seed_rows), 'unexpected final-boundary seed row'
assert len(Q)==35, len(Q)
assert {sum(q) for q,_,_ in Q} <= {-1,0,1}

# 3. Recursive residual closure under the actual word-level semantics.
# If R(q,x,y) occurs in C g(V) with both marked letters lying beyond C in
# distinct G-blocks, then V contains R(q',h,k), where h,k are the containing
# preimage letters. Every exact integral possibility must remain inside Q.
rec_rows=[]
for q,x,y in sorted(Q):
  for h in ALPH:
    for r,ch in enumerate(G[h]):
      if ch!=x: continue
      pre_h=par(G[h][:r])
      post_h=par(G[h][r+1:])   # exclude the marked target letter x itself
      for k in ALPH:
        for t,ch2 in enumerate(G[k]):
          if ch2!=y: continue
          pre_k=par(G[k][:t])
          rhs=tuple(q[z]-pC[z]-pre_h[z]+post_h[z]+pre_k[z] for z in range(4))
          qp=solve_row(rhs)
          if qp is None: continue
          rec_rows.append((q,x,y,h,r,k,t,qp))
          assert (qp,h,k) in Q, (q,x,y,h,r,k,t,qp)
assert len(rec_rows)==17, len(rec_rows)

# 4. Finite base window. For crossing squares with K<85, start i<=10 gives exclusive end<=178.
# For a residual state R(q,x,y), sum(q)=j-|B| and k=j+1+|B|=2j+1-sum(q).
# If the first mark lies in C, k<=22. If both marks lie in one 85-block, k<=170.
# Thus the first 190 letters safely contain every non-recursive base configuration.
W1=C+morph(C)
BASE=190
base=W1[:BASE]
assert first_square(base) is None, first_square(base)
assert residual_occurrences(base,Q,1)==[], residual_occurrences(base,Q,1)
assert residual_occurrences(C,Q,1)==[]

# 5. Regression checks on first tower levels, not used as extrapolation.
W2=C+morph(W1)
assert first_square(W1) is None
# Efficiently check only crossing squares in W2; interior morphic part is safe because G is an ASF endomorphism.
def crossing_square(F):
    n=len(F)
    pref=[[0,0,0,0] for _ in range(n+1)]
    for i,ch in enumerate(F):
        pref[i+1]=pref[i].copy(); pref[i+1][ALPH.index(ch)]+=1
    for i in range(len(C)):
        for K in range(1,(n-i)//2+1):
            if all(pref[i+K][z]-pref[i][z]==pref[i+2*K][z]-pref[i+K][z] for z in range(4)):
                return i,K
    return None
assert crossing_square(W2) is None

print('P7 V2 FINITE CERTIFICATE: PASS')
print('left death: 4/4')
print('seed parameter rows:',len(seed_rows))
print('residual states:',len(Q))
print('recursive transition rows:',len(rec_rows))
print('base window:',BASE,'symbols - no Abelian-square or residual violation found')
print('W1:',len(W1),'ASF')
print('W2:',len(W2),'no crossing square (interior protected by Keranen endomorphism)')
print('FINITE CERTIFICATE RECONSTRUCTED AND VERIFIED')
print('not checked here: Keranen preservation theorem, prose invariant proof, or novelty')
