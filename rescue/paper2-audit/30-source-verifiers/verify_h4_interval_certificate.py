#!/usr/bin/env python3
"""
Rigorous-certificate candidate for the negative initial soft response
h=4, target half-profile orbit (2,1,1), over the baseline L_3 shift.

Scope fence: h=8 is neither constructed nor inspected.

Method:
  * exact combinatorial construction of L_3;
  * S3 quotient of its 5-block presentation;
  * exact Birkhoff/Hilbert projective certificate for the Perron right vector;
  * directed Decimal lower bounds for a 15-step common minorization;
  * directed Decimal interval arithmetic for the finite derivative prefix;
  * explicit perturbation error budget from the exact projective residual;
  * Dobrushin tail bound for all lags after 150.

No external packages are required.
"""
from itertools import product, permutations
from collections import Counter, deque
from fractions import Fraction
from decimal import Decimal, localcontext, ROUND_FLOOR, ROUND_CEILING, ROUND_HALF_EVEN, getcontext
from math import gcd

PREC = 55
H = 4
TARGET = (2,1,1)
assert H == 4  # scope fence

# ---------- combinatorics ----------
def parikh(w):
    return tuple(w.count(i) for i in range(3))

def has_absq(w, klo, khi):
    n = len(w)
    for K in range(klo, khi + 1):
        for i in range(n - 2*K + 1):
            if parikh(w[i:i+K]) == parikh(w[i+K:i+2*K]):
                return True
    return False

PERMS = list(permutations(range(3)))
def perm_word(w,p):
    return tuple(p[x] for x in w)
def canon_orbit(w):
    return min(perm_word(w,p) for p in PERMS)

# Minimal 5-block presentation of L_3: states avoid K=2; edges also avoid K=3.
states5 = [w for w in product(range(3), repeat=5) if not has_absq(w,2,2)]
assert len(states5) == 162
idx5 = {w:i for i,w in enumerate(states5)}
adj5 = []
for w in states5:
    outs = []
    for s in range(3):
        nw = w[1:] + (s,)
        if nw in idx5 and not has_absq(w+(s,),3,3):
            outs.append(nw)
    adj5.append(outs)

# Strong connectivity + period 1 of the full 5-block graph.
def reachable(start, reverse=False):
    if not reverse:
        adj = [[idx5[nw] for nw in outs] for outs in adj5]
    else:
        adj = [[] for _ in states5]
        for i,outs in enumerate(adj5):
            for nw in outs: adj[idx5[nw]].append(i)
    seen={start}; q=deque([start])
    while q:
        u=q.popleft()
        for v in adj[u]:
            if v not in seen: seen.add(v);q.append(v)
    return seen
assert len(reachable(0)) == 162 and len(reachable(0,True)) == 162

depth=[-1]*162; depth[0]=0; q=deque([0])
while q:
    u=q.popleft()
    for nw in adj5[u]:
        v=idx5[nw]
        if depth[v] < 0:
            depth[v]=depth[u]+1; q.append(v)
period=0
for u,outs in enumerate(adj5):
    for nw in outs:
        v=idx5[nw]
        period=gcd(period, abs(depth[u]+1-depth[v]))
assert period == 1

# S3 equitable quotient: 27 orbits, each of size 6.
orbits={}
for w in states5: orbits.setdefault(canon_orbit(w),[]).append(w)
assert len(orbits)==27 and all(len(v)==6 for v in orbits.values())
orb_list=sorted(orbits)
orb_idx={c:i for i,c in enumerate(orb_list)}
Q=[[0]*27 for _ in range(27)]
for a,c in enumerate(orb_list):
    w=orbits[c][0]
    cnt=Counter(canon_orbit(nw) for nw in adj5[idx5[w]])
    for oc,n in cnt.items(): Q[a][orb_idx[oc]]=n
    # equitability check across the whole orbit
    base=[cnt.get(oc,0) for oc in orb_list]
    for ww in orbits[c][1:]:
        cc=Counter(canon_orbit(nw) for nw in adj5[idx5[ww]])
        assert [cc.get(oc,0) for oc in orb_list] == base

# Exact Q^6 and Birkhoff cross ratio.
def matmul_int(A,B):
    n=len(A); m=len(B[0]); k=len(B)
    return [[sum(A[i][t]*B[t][j] for t in range(k)) for j in range(m)] for i in range(n)]
M=[[1 if i==j else 0 for j in range(27)] for i in range(27)]
for _ in range(6): M=matmul_int(M,Q)
assert all(M[i][j] > 0 for i in range(27) for j in range(27))
theta=Fraction(1,1)
for i in range(27):
    for j in range(27):
        for k in range(27):
            for l in range(27):
                r=Fraction(M[i][k]*M[j][l], M[i][l]*M[j][k])
                if r>theta: theta=r
assert theta == 8
# Birkhoff coefficient = (sqrt(8)-1)/(sqrt(8)+1) < 1/2 because sqrt(8)<3.

# Generate a high-precision approximate quotient Perron vector; certify it afterwards.
with localcontext() as ctx:
    ctx.prec=100; ctx.rounding=ROUND_HALF_EVEN
    x=[Decimal(1)]*27
    for _ in range(600):
        y=[sum(Decimal(Q[i][j])*x[j] for j in range(27)) for i in range(27)]
        mx=max(y); x=[v/mx for v in y]
    SCALE=10**70
    X=[int((v*Decimal(SCALE)).to_integral_value(rounding=ROUND_HALF_EVEN)) for v in x]
Y=[sum(M[i][j]*X[j] for j in range(27)) for i in range(27)]
rat=[Fraction(Y[i],X[i]) for i in range(27)]
R=max(rat)/min(rat)
E=R*R
assert E < Fraction(10**70+3,10**70)
ETA=Decimal('3e-70')  # certified row-l1 P-vs-Phat bound

# ---------- 7-block higher presentation used by the h=4 edge potential ----------
states7=[w for w in product(range(3), repeat=7) if not has_absq(w,2,3)]
assert len(states7)==786
idx7={w:i for i,w in enumerate(states7)}
def orb5(w): return orb_idx[canon_orbit(w)]
target_orbit=set(permutations(TARGET))
trans=[] # (j, integer numerator, integer denominator, g)
for w in states7:
    outs=[]; ws=[]; gs=[]
    for s in range(3):
        nw=w[1:]+(s,)
        if nw not in idx7: continue
        j=idx7[nw]
        weight=X[orb5(nw[-5:])]
        word8=w+(s,)
        g=int(parikh(word8[:4])==parikh(word8[4:]) and parikh(word8[:4]) in target_orbit)
        outs.append(j); ws.append(weight); gs.append(g)
    den=sum(ws)
    trans.append([(j,a,den,g) for j,a,g in zip(outs,ws,gs)])
assert sum(len(r) for r in trans)==1728

# ---------- directed Decimal helpers ----------
def div_iv(num,den,prec=PREC):
    with localcontext() as c:
        c.prec=prec;c.rounding=ROUND_FLOOR; lo=Decimal(num)/Decimal(den)
    with localcontext() as c:
        c.prec=prec;c.rounding=ROUND_CEILING; hi=Decimal(num)/Decimal(den)
    return lo,hi

def add(a,b):
    with localcontext() as c:
        c.prec=PREC;c.rounding=ROUND_FLOOR; lo=a[0]+b[0]
    with localcontext() as c:
        c.prec=PREC;c.rounding=ROUND_CEILING; hi=a[1]+b[1]
    return lo,hi

def sub(a,b):
    with localcontext() as c:
        c.prec=PREC;c.rounding=ROUND_FLOOR; lo=a[0]-b[1]
    with localcontext() as c:
        c.prec=PREC;c.rounding=ROUND_CEILING; hi=a[1]-b[0]
    return lo,hi

def mul(a,b):
    lows=[]; highs=[]
    for aa in a:
        for bb in b:
            with localcontext() as c:
                c.prec=PREC;c.rounding=ROUND_FLOOR; lows.append(aa*bb)
            with localcontext() as c:
                c.prec=PREC;c.rounding=ROUND_CEILING; highs.append(aa*bb)
    return min(lows),max(highs)

def neg(a): return (-a[1],-a[0])
def abs_up(a): return max(abs(a[0]),abs(a[1]))
ZERO=(Decimal(0),Decimal(0))

trans_iv=[[(j,div_iv(a,d),g) for j,a,d,g in row] for row in trans]

# ---------- rigorous 15-step common minorization for Phat ----------
def common_minorization_15_lower():
    with localcontext() as ctx:
        ctx.prec=60;ctx.rounding=ROUND_FLOOR
        pL=[[(j,Decimal(a)/Decimal(d)) for j,a,d,g in row] for row in trans]
        mins=[None]*786
        for src in range(786):
            probs={src:Decimal(1)}
            for _ in range(15):
                nxt={}
                for i,pi in probs.items():
                    for j,p in pL[i]:
                        nxt[j]=nxt.get(j,Decimal(0))+pi*p
                probs=nxt
            for j in range(786):
                v=probs.get(j,Decimal(0))
                if mins[j] is None or v<mins[j]: mins[j]=v
        return sum(mins,Decimal(0))
minor_hat=common_minorization_15_lower()
assert minor_hat > Decimal('0.7910278246825')
# True path probabilities are at least E^-15 times their Phat counterparts.
with localcontext() as c:
    c.prec=80;c.rounding=ROUND_CEILING
    Edec=Decimal(E.numerator)/Decimal(E.denominator)
    E15=Edec**15
with localcontext() as c:
    c.prec=80;c.rounding=ROUND_FLOOR
    minor_true=minor_hat/E15
assert minor_true > Decimal('0.791')
QBLOCK=Decimal('0.209')

# ---------- construct and certify a rational approximate stationary law of Phat ----------
with localcontext() as ctx:
    ctx.prec=80;ctx.rounding=ROUND_HALF_EVEN
    pp=[Decimal(1)/Decimal(786)]*786
    ppoint=[[(j,Decimal(a)/Decimal(d)) for j,a,d,g in row] for row in trans]
    for _ in range(300):
        qq=[Decimal(0)]*786
        for i,pi in enumerate(pp):
            for j,p in ppoint[i]: qq[j]+=pi*p
        pp=qq
    SPI=10**60
    PINT=[int((v*Decimal(SPI)).to_integral_value(rounding=ROUND_HALF_EVEN)) for v in pp]
PTOT=sum(PINT)
pstar_iv=[div_iv(a,PTOT,70) for a in PINT]

# directed interval propagation of pstar under Phat^15
def propagate_pstar_15():
    lows=[x[0] for x in pstar_iv]; highs=[x[1] for x in pstar_iv]
    pL=[[(j,div_iv(a,d,70)[0]) for j,a,d,g in row] for row in trans]
    pU=[[(j,div_iv(a,d,70)[1]) for j,a,d,g in row] for row in trans]
    for _ in range(15):
        nl=[Decimal(0)]*786; nh=[Decimal(0)]*786
        with localcontext() as c:
            c.prec=70;c.rounding=ROUND_FLOOR
            for i,li in enumerate(lows):
                for j,p in pL[i]: nl[j]+=li*p
        with localcontext() as c:
            c.prec=70;c.rounding=ROUND_CEILING
            for i,hi in enumerate(highs):
                for j,p in pU[i]: nh[j]+=hi*p
        lows,highs=nl,nh
    return lows,highs
ql,qh=propagate_pstar_15()
residual=Decimal(0)
for j,a in enumerate(PINT):
    plo,phi=div_iv(a,PTOT,70)
    residual += max(abs(ql[j]-plo),abs(ql[j]-phi),abs(qh[j]-plo),abs(qh[j]-phi))
assert residual < Decimal('1.6e-28')

# ---------- interval finite-prefix computation for Phat ----------
def interval_prefix(M=450,N=150):
    e=[]
    for row in trans_iv:
        s=ZERO
        for j,p,g in row:
            if g: s=add(s,p)
        e.append(s)
    q=ZERO
    for i in range(786): q=add(q,mul(pstar_iv[i],e[i]))
    b=[sub(q,e[i]) for i in range(786)]
    def Pcol(v):
        out=[]
        for row in trans_iv:
            s=ZERO
            for j,p,g in row: s=add(s,mul(p,v[j]))
            out.append(s)
        return out
    u=[ZERO]*786; v=b[:]
    for _ in range(M):
        u=[add(u[i],v[i]) for i in range(786)]
        v=Pcol(v)
    dtrans=[]; beta=Decimal(0)
    for i,row in enumerate(trans_iv):
        rr=[]; l1=Decimal(0)
        for j,p,g in row:
            z=add(sub(u[j],u[i]),q)
            z=sub(z,(Decimal(g),Decimal(g)))
            dp=mul(p,z); rr.append((j,p,g,dp)); l1+=abs_up(dp)
        beta=max(beta,l1); dtrans.append(rr)
    r=[ZERO]*786
    for i,row in enumerate(dtrans):
        for j,p,g,dp in row: r[j]=add(r[j],mul(pstar_iv[i],dp))
    def rowP(mu):
        out=[ZERO]*786
        for i,row in enumerate(trans_iv):
            for j,p,g in row: out[j]=add(out[j],mul(mu[i],p))
        return out
    dpi=[ZERO]*786; rv=r[:]
    for _ in range(M):
        dpi=[add(dpi[i],rv[i]) for i in range(786)]
        rv=rowP(rv)
    one3=div_iv(1,3); two3=div_iv(2,3)
    f=[two3 if w[-1]==0 else neg(one3) for w in states7]
    A=Decimal(0)
    for i in range(786): A+=abs_up(mul(dpi[i],f[i]))
    vk=f[:]; dv=[ZERO]*786; S=ZERO
    for k in range(N+1):
        cp=ZERO
        for i in range(786):
            cp=add(cp,mul(dpi[i],mul(f[i],vk[i])))
            cp=add(cp,mul(pstar_iv[i],mul(f[i],dv[i])))
        Dk=cp if k==0 else mul((Decimal(2),Decimal(2)),cp)
        S=add(S,Dk)
        if k<N:
            nvk=[];ndv=[]
            for i,row in enumerate(dtrans):
                sv=ZERO;sd=ZERO
                for j,p,g,dp in row:
                    sv=add(sv,mul(p,vk[j]))
                    sd=add(sd,add(mul(dp,vk[j]),mul(p,dv[j])))
                nvk.append(sv);ndv.append(sd)
            vk,dv=nvk,ndv
    return q,beta,A,S
q_iv,beta_hat,A_hat,S_hat=interval_prefix()
assert beta_hat < Decimal('1.200294')
assert A_hat < Decimal('0.199308')

# ---------- explicit true-vs-Phat perturbation budget ----------
getcontext().prec=70
eta=Decimal('3e-70')
q0=Decimal('0.209')
resB=Decimal('1.6e-28')
delta_pi=(resB+Decimal(15)*eta)/(Decimal(1)-q0)
delta_q=delta_pi+eta
delta_b=delta_q+eta
# Sum_{n>=450} tau_n <= 15*q^30/(1-q).
T450=Decimal(15)*(q0**30)/(Decimal(1)-q0)
delta_udiff=Decimal(2)*(Decimal(450)*delta_b + eta*Decimal(450*449//2)) + Decimal(2)*T450
Zmax=Decimal(2)+Decimal(15)/(Decimal(1)-q0)
delta_dP=eta*Zmax+delta_udiff+delta_q
BETA_SAFE=Decimal('1.201')
delta_r=delta_pi*BETA_SAFE+delta_dP
delta_dpi=Decimal(450)*delta_r + BETA_SAFE*eta*Decimal(450*449//2) + Decimal(2)*BETA_SAFE*T450
assert A_hat + (Decimal(2)/Decimal(3))*delta_dpi < Decimal('0.200')
assert beta_hat + delta_dP < BETA_SAFE

# Prefix sensitivity bound through N=150.
alpha_star=Decimal('0.445')
Astar_safe=Decimal('0.200')
f_inf=Decimal(2)/Decimal(3)
prefix_err=Decimal(0)
for k in range(151):
    e1=delta_dpi*f_inf*f_inf + Astar_safe*Decimal(k)*eta*f_inf
    e2=Decimal(0)
    for j in range(k):
        l=k-1-j
        term=delta_pi*f_inf*BETA_SAFE*f_inf
        term+=alpha_star*Decimal(j)*eta*BETA_SAFE*f_inf
        term+=alpha_star*delta_dP*f_inf
        term+=alpha_star*BETA_SAFE*Decimal(l)*eta*f_inf
        e2+=term
    ck=e1+e2
    prefix_err += ck if k==0 else Decimal(2)*ck
assert prefix_err < Decimal('2e-14')

# ---------- infinite tail after lag 150 ----------
# tau_n <= q^floor(n/15).  For N=150:
# T1 = sum_{k>150} tau_k = 14q^10 + 15q^11/(1-q).
# T2 = sum_{k>150} sum_{j=0}^{k-1} tau_j tau_{k-1-j}
#    = 10*105*q^9 + 225*sum_{t>=10}(t+1)q^t.
qF=Fraction(209,1000)
T1=Fraction(14)*qF**10 + Fraction(15)*qF**11/(1-qF)
sumt=qF**10*(Fraction(11)-Fraction(10)*qF)/(1-qF)**2
T2=Fraction(10*105)*qF**9 + Fraction(225)*sumt
Btail=Fraction(1,5)*T1 + Fraction(4,9)*Fraction(1201,1000)*T2
BtailD=Decimal(Btail.numerator)/Decimal(Btail.denominator)
assert BtailD < Decimal('0.000699')

# Final certified upper bound.
TOTAL_UPPER=S_hat[1]+prefix_err+BtailD
assert TOTAL_UPPER < 0

print('H4 (2,1,1) RIGOROUS CERTIFICATE CANDIDATE')
print('h=8 touched: NO')
print('5-block states:', len(states5), '7-block states:', len(states7))
print('Q^6 positive: YES; exact Birkhoff cross ratio theta =', theta)
print('Perron projective E-1 < 3e-70: YES')
print('directed lower common mass Phat^15 =', minor_hat)
print('true tau(P^15) <= 0.209: YES')
print('stationary residual upper =', residual)
print('beta_hat upper =', beta_hat)
print('A_hat upper =', A_hat)
print('S_150 interval =', S_hat)
print('true-vs-approx prefix error <=', prefix_err)
print('infinite tail after lag 150 <=', BtailD)
print('FINAL UPPER BOUND FOR a_prime(0) =', TOTAL_UPPER)
print('CERTIFICATE INEQUALITY: PASS')
