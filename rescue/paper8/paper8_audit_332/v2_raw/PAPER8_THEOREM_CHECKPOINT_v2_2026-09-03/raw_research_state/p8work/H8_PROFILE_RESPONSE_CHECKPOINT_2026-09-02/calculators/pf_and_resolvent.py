import numpy as np, json, time
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/'data'
D=np.load(DATA/'H8_L7_LIFTED_GRAPH_CHECKPOINT.npz')
states=D['states']; giant=D['giant_global']; u=D['u']; v=D['v']; ep=D['edge_profile_id']; profiles=D['profiles']
N=len(giant); codes=states[giant]

def A_mv(x,mask=None):
    if mask is None:
        return np.bincount(u, weights=x[v], minlength=N)
    return np.bincount(u[mask], weights=x[v[mask]], minlength=N)
def AT_mv(x,mask=None):
    if mask is None:
        return np.bincount(v, weights=x[u], minlength=N)
    return np.bincount(v[mask], weights=x[u[mask]], minlength=N)

def pf(mask=None,tol=2e-14,maxit=20000):
    r=np.ones(N); l=np.ones(N)
    lam=0.0
    for it in range(maxit):
        nr=A_mv(r,mask); nl=AT_mv(l,mask)
        sr=nr.max(); sl=nl.max(); nr/=sr; nl/=sl
        err=max(np.max(np.abs(nr-r)),np.max(np.abs(nl-l)))
        r,l=nr,nl
        if it%1000==0: print('pf',it,err,flush=True)
        if err<tol: break
    # Rayleigh-like exact lambda from l A r / l r
    Ar=A_mv(r,mask)
    lam=float(np.dot(l,Ar)/np.dot(l,r))
    l=l/np.dot(l,r)
    pi=l*r; pi/=pi.sum()
    return lam,l,r,pi,it,err

lam,l,r,pi,it,err=pf()
print('lambda',lam,'it',it,'err',err,'pisum',pi.sum())
# edge probabilities derivative ingredients
pedge=l[u]*r[v]/lam  # stationary edge mass
print('edge mass',pedge.sum())
for i,p in enumerate(profiles,1):
    print(tuple(p),pedge[ep==i].sum())

# state observable: last symbol of 15-word (0=a)
f=(codes%3==0).astype(float)-1/3
print('mean f',np.dot(pi,f),'var state',np.dot(pi,f*f))

def P_mv(x):
    return np.bincount(u,weights=(r[v]/(lam*r[u]))*x[v],minlength=N)
def Pstar_mv(x):
    return np.bincount(v,weights=(l[u]/(lam*l[v]))*x[u],minlength=N)

def poisson(rhs, adjoint=False, tol=2e-13, maxit=200000):
    # fixed point x = rhs + P x for mean-zero rhs; enforce mean zero gauge
    x=np.zeros(N)
    mv=Pstar_mv if adjoint else P_mv
    for it in range(maxit):
        nx=rhs+mv(x)
        nx-=np.dot(pi,nx)
        err=np.max(np.abs(nx-x))
        x=nx
        if it%1000==0 and it>0: print('pois',adjoint,it,err,flush=True)
        if err<tol: break
    return x,it,err

uPois,itp,erp=poisson(f)
wPois,itw,erw=poisson(f,adjoint=True)
a=2*np.dot(pi,f*uPois)-np.dot(pi,f*f)
print('a',a,'poisson',itp,erp,itw,erw)

# baseline block variance for 16 consecutive state-observable letters.
# V_n = n*C0 + 2 sum_{k=1}^{n-1}(n-k) Ck
x=f.copy(); C=[float(np.dot(pi,f*f))]
for k in range(1,16):
    x=P_mv(x); C.append(float(np.dot(pi,f*x)))
V16=16*C[0]+2*sum((16-k)*C[k] for k in range(1,16))
print('C',C)
print('V16',V16,'Bc',0.75*V16)

# Exact derivative of P, pi, and asymptotic variance for edge potential -g.
# psi solves (I-P)psi = q - gbar.
# P'ij = Pij[-gij + q + psi_j - psi_i].
# pi' = pi P' Z.
# a' = pi'·(2 f uPois - f^2) + 2 <f, Z P' uPois>_pi.

def soft_derivative(profile_id):
    g=(ep==profile_id).astype(float)
    # row expectation gbar via P edge weights
    transw=r[v]/(lam*r[u])
    gbar=np.bincount(u,weights=transw*g,minlength=N)
    q=float(np.dot(pi,gbar))
    rhs=q-gbar
    psi,_,_=poisson(rhs)
    d=-g+q+psi[v]-psi[u]
    # P' action on vector x
    def Pprime_mv(x):
        return np.bincount(u,weights=transw*d*x[v],minlength=N)
    # stationary derivative row represented density hpi = pi'/pi.
    # pi' H = pi P' Z H. Compute as needed directly.
    H=2*f*uPois-f*f
    Hc=H-np.dot(pi,H)
    zH,_,_=poisson(Hc)
    term_pi=float(np.dot(pi,Pprime_mv(zH)))
    y=Pprime_mv(uPois)
    y-=np.dot(pi,y)
    zy,_,_=poisson(y)
    term_z=2*float(np.dot(pi,f*zy))
    aprime=term_pi+term_z
    B=float(sum((int(x)-8/3)**2 for x in profiles[profile_id-1]))
    local=q*(V16-4*B/3)
    return dict(profile=profiles[profile_id-1].tolist(),q=q,B=B,local=local,a_prime=aprime,Gamma=aprime-local,term_pi=term_pi,term_z=term_z)

outs=[]
for pid in range(1,len(profiles)+1):
    t=time.time(); z=soft_derivative(pid); print(z,'sec',time.time()-t,flush=True);outs.append(z)
DATA/'H8_RESOLVENT_SOFT_DERIVATIVES_REPLAY.json'.write_text(json.dumps({'lambda':lam,'a':a,'V16':V16,'Bc':0.75*V16,'profiles':outs},indent=2))
