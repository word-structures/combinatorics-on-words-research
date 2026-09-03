from itertools import product, permutations
from collections import Counter
from decimal import Decimal, localcontext, ROUND_HALF_EVEN, ROUND_FLOOR, ROUND_CEILING, getcontext
from fractions import Fraction

PREC=55; H=4; TARGET=(2,1,1)

def parikh(w): return tuple(w.count(i) for i in range(3))
def has_absq(w,klo,khi):
    n=len(w)
    for K in range(klo,khi+1):
        for i in range(n-2*K+1):
            if parikh(w[i:i+K])==parikh(w[i+K:i+2*K]): return True
    return False
PERMS=list(permutations(range(3)))
def canon_orbit(w): return min(tuple(p[x] for x in w) for p in PERMS)
# 5 block quotient
states5=[w for w in product(range(3),repeat=5) if not has_absq(w,2,2)]
idx5={w:i for i,w in enumerate(states5)}
adj5=[]
for w in states5:
    outs=[]
    for s in range(3):
        nw=w[1:]+(s,)
        if nw in idx5 and not has_absq(w+(s,),3,3): outs.append(nw)
    adj5.append(outs)
orbits={}
for w in states5: orbits.setdefault(canon_orbit(w),[]).append(w)
orb_list=sorted(orbits); orb_idx={c:i for i,c in enumerate(orb_list)}
Q=[[0]*27 for _ in range(27)]
for a,c in enumerate(orb_list):
    w=orbits[c][0]; cnt=Counter(canon_orbit(nw) for nw in adj5[idx5[w]])
    for oc,n in cnt.items(): Q[a][orb_idx[oc]]=n
with localcontext() as ctx:
    ctx.prec=100; ctx.rounding=ROUND_HALF_EVEN
    x=[Decimal(1)]*27
    for _ in range(600):
        y=[sum(Decimal(Q[i][j])*x[j] for j in range(27)) for i in range(27)]
        mx=max(y); x=[v/mx for v in y]
    SCALE=10**70
    X=[int((v*Decimal(SCALE)).to_integral_value(rounding=ROUND_HALF_EVEN)) for v in x]
# 7 block
states7=[w for w in product(range(3),repeat=7) if not has_absq(w,2,3)]
idx7={w:i for i,w in enumerate(states7)}
def orb5(w): return orb_idx[canon_orbit(w)]
target_orbit=set(permutations(TARGET))
trans=[]
for w in states7:
    outs=[]; ws=[]; gs=[]
    for s in range(3):
        nw=w[1:]+(s,)
        if nw not in idx7: continue
        j=idx7[nw]; a=X[orb5(nw[-5:])]
        word8=w+(s,)
        g=int(parikh(word8[:4])==parikh(word8[4:]) and parikh(word8[:4]) in target_orbit)
        outs.append((j,a,g,s)) ; ws.append(a)
    den=sum(ws)
    trans.append([(j,a,den,g,s) for (j,a,g,s) in outs])
# point pstar rational approx
with localcontext() as ctx:
    ctx.prec=80; ctx.rounding=ROUND_HALF_EVEN
    P=[[(j,Decimal(a)/Decimal(d),g,s) for j,a,d,g,s in row] for row in trans]
    pp=[Decimal(1)/Decimal(786)]*786
    for _ in range(300):
        qq=[Decimal(0)]*786
        for i,pi in enumerate(pp):
            for j,p,g,s in P[i]: qq[j]+=pi*p
        pp=qq
    SPI=10**60
    PINT=[int((v*Decimal(SPI)).to_integral_value(rounding=ROUND_HALF_EVEN)) for v in pp]
    PTOT=sum(PINT)
    pi=[Decimal(a)/Decimal(PTOT) for a in PINT]
# interval helpers for S7

def div_iv(num,den,prec=PREC):
    with localcontext() as c: c.prec=prec;c.rounding=ROUND_FLOOR; lo=Decimal(num)/Decimal(den)
    with localcontext() as c: c.prec=prec;c.rounding=ROUND_CEILING; hi=Decimal(num)/Decimal(den)
    return lo,hi
def add(a,b):
    with localcontext() as c: c.prec=PREC;c.rounding=ROUND_FLOOR; lo=a[0]+b[0]
    with localcontext() as c: c.prec=PREC;c.rounding=ROUND_CEILING; hi=a[1]+b[1]
    return lo,hi
def sub(a,b):
    with localcontext() as c: c.prec=PREC;c.rounding=ROUND_FLOOR; lo=a[0]-b[1]
    with localcontext() as c: c.prec=PREC;c.rounding=ROUND_CEILING; hi=a[1]-b[0]
    return lo,hi
def mul(a,b):
    lows=[]; highs=[]
    for aa in a:
      for bb in b:
       with localcontext() as c: c.prec=PREC;c.rounding=ROUND_FLOOR; lows.append(aa*bb)
       with localcontext() as c: c.prec=PREC;c.rounding=ROUND_CEILING; highs.append(aa*bb)
    return min(lows),max(highs)
def neg(a): return -a[1],-a[0]
def abs_up(a): return max(abs(a[0]),abs(a[1]))
ZERO=(Decimal(0),Decimal(0))
trans_iv=[[(j,div_iv(a,d),g) for j,a,d,g,s in row] for row in trans]
pstar_iv=[div_iv(a,PTOT,70) for a in PINT]
# M=450, N=7
M=450; N=7
e=[]
for row in trans_iv:
    s=ZERO
    for j,p,g in row:
        if g: s=add(s,p)
    e.append(s)
q=ZERO
for i in range(786): q=add(q,mul(pstar_iv[i],e[i]))
b=[sub(q,e[i]) for i in range(786)]
def Pcol_iv(v):
    out=[]
    for row in trans_iv:
        s=ZERO
        for j,p,g in row: s=add(s,mul(p,v[j]))
        out.append(s)
    return out
u=[ZERO]*786; vv=b[:]
for _ in range(M):
    u=[add(u[i],vv[i]) for i in range(786)]; vv=Pcol_iv(vv)
dtrans=[]; beta=Decimal(0)
for i,row in enumerate(trans_iv):
    rr=[]; l1=Decimal(0)
    for j,p,g in row:
        z=add(sub(u[j],u[i]),q); z=sub(z,(Decimal(g),Decimal(g))); dp=mul(p,z)
        rr.append((j,p,g,dp)); l1+=abs_up(dp)
    beta=max(beta,l1); dtrans.append(rr)
r=[ZERO]*786
for i,row in enumerate(dtrans):
    for j,p,g,dp in row: r[j]=add(r[j],mul(pstar_iv[i],dp))
def rowP_iv(mu):
    out=[ZERO]*786
    for i,row in enumerate(trans_iv):
        for j,p,g in row: out[j]=add(out[j],mul(mu[i],p))
    return out
dpi=[ZERO]*786; rv=r[:]
for _ in range(M):
    dpi=[add(dpi[i],rv[i]) for i in range(786)]; rv=rowP_iv(rv)
one3=div_iv(1,3); two3=div_iv(2,3)
fiv=[two3 if w[-1]==0 else neg(one3) for w in states7]
vk=fiv[:]; dv=[ZERO]*786; S=ZERO
for k in range(N+1):
    cp=ZERO
    for i in range(786):
        cp=add(cp,mul(dpi[i],mul(fiv[i],vk[i])))
        cp=add(cp,mul(pstar_iv[i],mul(fiv[i],dv[i])))
    Dk=cp if k==0 else mul((Decimal(2),Decimal(2)),cp)
    S=add(S,Dk)
    if k<N:
        nvk=[]; ndv=[]
        for i,row in enumerate(dtrans):
            sv=ZERO; sd=ZERO
            for j,p,g,dp in row:
                sv=add(sv,mul(p,vk[j])); sd=add(sd,add(mul(dp,vk[j]),mul(p,dv[j])))
            nvk.append(sv);ndv.append(sd)
        vk,dv=nvk,ndv
print('S7_hat_iv',S)
# perturbation error through 7 using parent-certified constants
getcontext().prec=70
eta=Decimal('3e-70'); q0=Decimal('0.209'); resB=Decimal('1.6e-28')
delta_pi=(resB+Decimal(15)*eta)/(1-q0); delta_q=delta_pi+eta; delta_b=delta_q+eta
T450=Decimal(15)*(q0**30)/(1-q0)
delta_udiff=Decimal(2)*(Decimal(450)*delta_b + eta*Decimal(450*449//2))+Decimal(2)*T450
Zmax=Decimal(2)+Decimal(15)/(1-q0)
delta_dP=eta*Zmax+delta_udiff+delta_q
BETA_SAFE=Decimal('1.201')
delta_r=delta_pi*BETA_SAFE+delta_dP
delta_dpi=Decimal(450)*delta_r+BETA_SAFE*eta*Decimal(450*449//2)+Decimal(2)*BETA_SAFE*T450
alpha_star=Decimal('0.445'); Astar_safe=Decimal('0.200'); f_inf=Decimal(2)/3
prefix_err7=Decimal(0)
for k in range(8):
    e1=delta_dpi*f_inf*f_inf + Astar_safe*Decimal(k)*eta*f_inf
    e2=Decimal(0)
    for j in range(k):
        l=k-1-j
        term=delta_pi*f_inf*BETA_SAFE*f_inf
        term+=alpha_star*Decimal(j)*eta*BETA_SAFE*f_inf
        term+=alpha_star*delta_dP*f_inf
        term+=alpha_star*BETA_SAFE*Decimal(l)*eta*f_inf
        e2+=term
    ck=e1+e2; prefix_err7 += ck if k==0 else Decimal(2)*ck
print('prefix_err7',prefix_err7)
print('S7_true enclosure conservative',S[0]-prefix_err7,S[1]+prefix_err7)
# point baseline q,b9,b10,joints using pstar, Phat
def Pcol_point(v):
    out=[Decimal(0)]*786
    for i,row in enumerate(P):
        s=Decimal(0)
        for j,p,g,sym in row: s+=p*v[j]
        out[i]=s
    return out
# future color vectors d=0..10
color_vec={}
for c in range(3):
    arr=[Decimal(1) if w[-1]==c else Decimal(0) for w in states7]
    color_vec[(c,0)]=arr
    for d in range(1,11):
        arr=Pcol_point(arr); color_vec[(c,d)]=arr
# b_k
bks={}
for k in (9,10):
    val=Decimal(0)
    for c in range(3):
        arr=color_vec[(c,k)]
        for i,w in enumerate(states7):
            if w[-1]==c: val += pi[i]*arr[i]
    bks[k]=val
# q
qpt=Decimal(0)
for i,row in enumerate(P):
    for j,p,g,sym in row:
        if g: qpt+=pi[i]*p
# joints sum per lag across r
sumj={9:Decimal(0),10:Decimal(0)}
for k in (9,10):
  for rpos in range(8):
    d=k-7+rpos
    joint=Decimal(0)
    for i,row in enumerate(P):
        w=states7[i]
        for j,p,g,sym in row:
            if not g: continue
            c = w[rpos] if rpos<7 else sym
            joint += pi[i]*p*color_vec[(c,d)][j]
    sumj[k]+=joint
Ehat=(Decimal(4)/3)*((sumj[9]-Decimal(8)*qpt*bks[9])+(sumj[10]-Decimal(8)*qpt*bks[10]))
print('qhat',qpt,'b9',bks[9],'b10',bks[10])
print('sumj9',sumj[9],'sumj10',sumj[10])
print('E_OE_hat',Ehat)
# conservative path expectation model error
# any path event length <= 10 error <= delta_pi + 10eta; q len1; b <=10
patherr=delta_pi+Decimal(10)*eta
qerr=delta_pi+eta
b9err=delta_pi+Decimal(9)*eta
b10err=delta_pi+Decimal(10)*eta
# product |qb-qhbh| <= qerr + berr + qerr*berr since quantities <=1
bracket_err=Decimal(16)*patherr + Decimal(8)*(qerr+b9err+qerr*b9err) + Decimal(8)*(qerr+b10err+qerr*b10err)
Eerr=(Decimal(4)/3)*bracket_err + Decimal('1e-60')
print('E_OE_error',Eerr)
print('E_OE_true upper',Ehat+Eerr)
# derive residual bound from parent S150/Btail
S150_up=Decimal('-0.0073373261710930020479110390566442074830477786090969')
prefix_err150=Decimal('1.0231233793716803e-14')
Btail=Decimal('0.0006989956115298716348751361284066')
S7_low=S[0]-prefix_err7
finite8_150_up=(S150_up+prefix_err150)-S7_low
tail8_inf_up=finite8_150_up+Btail
Crest_up=tail8_inf_up+(Ehat+Eerr)
print('finite8_150_up',finite8_150_up)
print('tail8_inf_up',tail8_inf_up)
print('Crest_up',Crest_up)
print('budget',Decimal('0.0252097724714242'),'margin',Decimal('0.0252097724714242')-Crest_up)
