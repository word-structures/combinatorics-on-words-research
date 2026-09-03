import numpy as np, scipy.sparse as sp, scipy.sparse.linalg as sla, json,sys
pid=int(sys.argv[1]);x=float(sys.argv[2]);load=lambda n:sp.load_npz(f'/mnt/data/h8cp/s3_{n}_pid{pid}.npz')
T0=load('Atri');T1=load('Btri');S0=load('Astd');S1=load('Bstd');U0=load('Aats');U1=load('Bats');V0=load('Aast');V1=load('Bast')
T=T0+x*T1;S=S0+x*S1;U=U0+x*U1;V=V0+x*V1;n=T.shape[0]
# PF trivial
r=np.ones(n);l=np.ones(n)
for it in range(5000):
 nr=T@r;nl=T.T@l;nr/=nr.max();nl/=nl.max();er=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
 if er<3e-14:break
Tr=T@r;lam=float(np.dot(l,Tr)/np.dot(l,r));l=l/np.dot(l,r);lamx=float(l@(T1@r));q=lamx/lam
# standard solve z=R V r
Ms=sp.eye(S.shape[0],format='csr')*lam-S
z,info=sla.gmres(Ms,V@r,rtol=5e-13,atol=1e-14,restart=200,maxiter=2000)
N=float(l@(U@z));a=2/9+2*N/lam
# trivial derivative solves with rank-one gauge correction
base=sp.eye(n,format='csr')*lam-T
def Mmv(y):return base@y + r*float(l@y)
Mop=sla.LinearOperator((n,n),matvec=Mmv,rmatvec=lambda y: base.T@y + l*float(r@y),dtype=float)
rhsr=T1@r-lamx*r
rx,ir=sla.gmres(Mop,rhsr,rtol=5e-13,atol=1e-14,restart=200,maxiter=2000)
rhsl=T1.T@l-lamx*l
lx,il=sla.gmres(Mop.T,rhsl,rtol=5e-13,atol=1e-14,restart=200,maxiter=2000)
# z derivative
rhsz=V1@r+V@rx + S1@z-lamx*z
zx,iz=sla.gmres(Ms,rhsz,rtol=5e-13,atol=1e-14,restart=200,maxiter=2000)
Nx=float(lx@(U@z)+l@(U1@z)+l@(U@zx))
C=2/lam*(Nx/q-N)
# residuals
res={'z':float(np.max(abs(Ms@z-V@r))),'rx':float(np.max(abs(Mmv(rx)-rhsr))),'lx':float(np.max(abs(Mop.T@lx-rhsl))),'zx':float(np.max(abs(Ms@zx-rhsz)))}
out={'pid':pid,'x':x,'lambda':lam,'lambda_x':lamx,'q':q,'a':a,'N':N,'N_x':Nx,'C':C,'gauges':{'l_rx':float(l@rx),'lx_r':float(lx@r)},'residuals':res,'pf_err':float(er),'solver_info':[int(info),int(ir),int(il),int(iz)]}
print(json.dumps(out,indent=2));open(f'/mnt/data/h8cp/s3_C_pid{pid}_x{x}.json','w').write(json.dumps(out,indent=2))
