import numpy as np, scipy.sparse as sp, scipy.sparse.linalg as sla, json,sys,time
pid=int(sys.argv[1]);x=float(sys.argv[2])
load=lambda n:sp.load_npz(f'/mnt/data/h8cp/s3_{n}_pid{pid}.npz')
Atri=load('Atri')+x*load('Btri');Astd=load('Astd')+x*load('Bstd')
# centered first tilt cross blocks = a-edge cross blocks; total A has zero cross block
Dts=load('Aats')+x*load('Bats') # trivial rows, standard cols
Dst=load('Aast')+x*load('Bast') # standard rows, trivial cols
n=Atri.shape[0]
r=np.ones(n);l=np.ones(n)
for it in range(5000):
 nr=Atri@r;nl=Atri.T@l;nr/=nr.max();nl/=nl.max();er=max(abs(nr-r).max(),abs(nl-l).max());r,l=nr,nl
 if er<3e-14:break
Ar=Atri@r;lam=float(np.dot(l,Ar)/np.dot(l,r));l=l/np.dot(l,r)
rhs=Dst@r
M=sp.eye(Astd.shape[0],format='csr')*lam-Astd
z,info=sla.gmres(M,rhs,rtol=1e-12,atol=1e-14,restart=200,maxiter=2000)
res=float(np.max(np.abs(M@z-rhs)))
term=float(l@(Dts@z));a=2/9+2*term/lam
out={'pid':pid,'x':x,'lambda':lam,'a_s3':a,'term':term,'trivial_dim':n,'standard_dim':Astd.shape[0],'pf_err':float(er),'gmres_info':int(info),'linear_res_sup':res}
print(json.dumps(out,indent=2));open(f'/mnt/data/h8cp/s3_variance_pid{pid}_x{x}.json','w').write(json.dumps(out,indent=2))
